import React, { Component } from 'react';
import * as echarts from 'echarts';
import worldJson from "./world.json";
import ComponentDefaultConfig from './config'

class WorldMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {},
      mapChart: null,
    };
  }

  componentDidMount() {
    this.createMap();
  }

  // 转换飞线
  convertData = (data, coordData) => {
    let res = []
    for (let i = 0; i < data.length; i++) {
      let dataItem = data[i]
      let fromCoord = coordData[dataItem[0].name]
      let toCoord = [116.536989, 39.777354] //中心点地理坐标 优化
      if (fromCoord && toCoord) {
        res.push([ //调换即可调整飞线攻击方向
          {
            coord: fromCoord, // 飞线去往哪里
            value: dataItem[0].value,
          }, {
            coord: toCoord, // 飞线从哪里出发
          },
        ])
      }
    }
    return res
  }
  getSeries = (centerPoint, mainData, flyLineArr, coordData) => {
    let series = [];
    [[centerPoint, flyLineArr]].forEach((item, i) => {
      series.push(
        {
          type: 'lines',
          coordinateSystem: 'geo',
          zlevel: 2,
          effect: {
            show: true,
            period: 5, //箭头指向速度，值越小速度越快
            trailLength: 0, //特效尾迹长度[0,1]值越大，尾迹越长重
            symbol: 'arrow', //箭头图标
            symbolSize: 5, //图标大小
            color: mainData.iconColor, // 图标颜色
          },
          lineStyle: {
            normal: {
              show: true,
              width: 1, //尾迹线条宽度
              opacity: 1, //尾迹线条透明度
              curveness: 0.3, //尾迹线条曲直度
              color: mainData.flyColor, // 飞线颜色 - 细线
            },
          },
          data: this.convertData(item[1], coordData),
        },
        {
          type: 'effectScatter',
          radius: '100%',
          coordinateSystem: 'geo',
          zlevel: 2,
          rippleEffect: { //涟漪特效
            period: 4, //动画时间，值越小速度越快
            brushType: 'stroke', //波纹绘制方式 stroke, fill
            scale: 3, //波纹圆环最大限制，值越大波纹越大
            color: mainData.rippleColor,
          },
          label: {
            normal: {
              show: false,
              position: 'right', //显示位置
              offset: [5, 0], //偏移设置
              formatter: (params) => {
                return params.data.name //圆环显示文字
              },
              fontSize: 13,
            },
            emphasis: {
              show: false,
            },
          },
          symbol: 'circle',
          symbolSize: (val) => {
            return 5 //圆环大小
          },
          itemStyle: {
            normal: {
              show: false,
              // areaColor: mainData.pointColor,
              color: mainData.pointColor,
            },
            emphasis: {
              areaColor: mainData.pointColor,
            },
          },
          data: item[1].map((dataItem) => {
            return {
              //在这里定义你所要展示的数据
              name: dataItem[0].name,
              value: coordData[dataItem[0].name]?.concat([dataItem[0].value]),
            }
          }),
        },
        //中心点
        {
          type: 'effectScatter',
          radius: '100%',
          coordinateSystem: 'geo',
          zlevel: 15,
          rippleEffect: {
            period: 4,
            brushType: 'stroke',
            scale: 4,
            color: '#38ff85',
          },
          label: {
            normal: {
              show: false,
              position: 'right',
              //offset:[5, 0],
              color: '#38ff85',
              formatter: '{b}',
              textStyle: {
                color: '#38ff85',
              },
            },
            emphasis: {
              show: false,
              color: '#38ff85',
            },
          },
          symbol: 'circle',
          symbolSize: 5,
          itemStyle: {
            color: '#38ff85',
          },
          data: [
            {
              name: item[0],
              value: coordData[item[0]]?.concat([10]),
            },
          ],
        }
      )
    })
    return series
  };

  createMap = () => {
    const { comData, componentConfig, fields } = this.props
    const { config, staticData } = componentConfig || ComponentDefaultConfig
    const mainData = this.formatConfig(config, [])
    const { bgColor, selectColor, pointColor, borderColor, flyColor, iconColor, rippleColor } = mainData
    const originData = comData || staticData.data
    // 根据传入的fields来映射对应的值 
    const fields2ValueMap = {}
    const initColumnsName = fields
    fields.forEach((item, index) => {
      fields2ValueMap[initColumnsName[index]] = item
    })
    const finalData = this.formatData(originData, fields2ValueMap)

    const centerPoint = '北京区域中心';
    const coordData = finalData[0].x
    const flyLineArr = finalData[0].y
    const options = {
      // bgColor: '#1a1e45',
      radius: '100%',
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'horizontal', //图例的排列方向
        // textStyle: { color: '#1a1e45' },
        x: 'left', //图例的位置
        y: '-20000000000000',
      },
      visualMap: {
        //颜色的设置  dataRange
        // textStyle: { color: '#1a1e45' },
        x: 'left',
        y: 'bottom',
        // splitList: [{ start: 0, end: 150000 }],
        show: false,
        // text:['高','低'],// 文本，默认为数值文本
        color: [flyColor],
      },
      geo: {
        map: 'world',
        type: 'map',
        zoom: 1.2,
        label: {
          normal: {
            show: false,
            textStyle: {
              color: '#FFFFFF',
            },
          },
          emphasis: {
            show: false,
          },
        },
        roam: false, //是否允许缩放
        itemStyle: {
          normal: {
            color: bgColor, //地图背景色
            borderColor: borderColor, //省市边界线00fcff 516a89
            borderWidth: 1,
            textStyle: '#fff',
          },
          emphasis: {
            areaColor: selectColor, //悬浮背景
          },
        },
        data: [],
      },
      series: this.getSeries(centerPoint, mainData, flyLineArr, coordData),
    }

    const dom = document.getElementById(componentConfig.id);
    var mapChart = echarts.init(dom);
    echarts.registerMap("world", worldJson);
    this.setState({ options })
    mapChart.setOption(options);
    this.setState({ mapChart })
  };

  // 匹配数据
  formatData = (data, fields2ValueMap) => {
    const arr = Array.isArray(data) ? data.map((item) => {
      let res = {}
      for (let k in item) {
        res[k] = item[fields2ValueMap[k]]
      }
      return res
    }) : []
    return arr
  }

  // 获取样式配置
  formatConfig = (config, exclude) => {
    return config.filter((item) => exclude.indexOf(item.name) == -1).reduce((pre, cur) => {
      if (Array.isArray(cur.value)) {
        const obj = cur.value.reduce((p, c) => {
          p[c.name] = c.value
          return p
        }, {})
        pre = {
          ...pre,
          ...obj,
        }
      } else {
        pre[cur.name] = cur.value
      }
      return pre
    }, {})
  }

  render() {
    // ----------- 更新数据 -----------
    const { fields, comData, componentConfig } = this.props
    const { config, staticData } = componentConfig || ComponentDefaultConfig
    let { mapChart, options } = this.state
    // 组件静态或者传入组件的数据
    const originData = comData || staticData.data
    // 根据传入的fields来映射对应的值 
    const fields2ValueMap = {}
    const initColumnsName = fields
    fields.forEach((item, index) => { // 优化
      fields2ValueMap[initColumnsName[index]] = item
    })
    const finalData = this.formatData(originData, fields2ValueMap)
    // 配置飞线数据
    let centerPoint = '北京区域中心';
    let coordData = finalData[0].x;
    let flyLineArr = finalData[0].y;
    let style = this.formatConfig(config, [])
    const { bgColor, selectColor, pointColor, borderColor, flyColor, iconColor, rippleColor } = style
    if (mapChart) {
      options.geo.itemStyle.normal.color = bgColor;
      options.geo.itemStyle.normal.borderColor = borderColor;
      options.geo.itemStyle.emphasis.areaColor = selectColor;
      options.series = this.getSeries(centerPoint, style, flyLineArr, coordData)
      options.series[0].effect.color = iconColor;
      mapChart.setOption(options);
    }

    let mapSize = {
      width: '100%',
      height: '100%'
    };

    return (
      <div
        id={this.props.componentConfig.id}
        style={mapSize}
        option={options}
      />
    );
  }
}

export {
  WorldMap,
  ComponentDefaultConfig
}
export default WorldMap
