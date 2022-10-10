import React, { Component } from 'react';
import * as echarts from 'echarts';
import worldJson from "./world.json";
import chinaJson from "./china.json";
import ComponentDefaultConfig from './config'
import img from './img'

class WorldMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {},
      ipOptions: {},
      mapChart: null,
    };
  }

  componentDidMount() {
    this.createMap();
  }

  // 转换飞线
  convertData = (data, coordData, flyDirection, centerPointValue) => {
    if (!data) { return }
    let res = []
    for (let i = 0; i < data.length; i++) {
      let dataItem = data[i]
      let fromCoord = coordData[dataItem[0].name]
      // let toCoord = [116.536989, 39.777354] //中心点地理坐标 优化      
      let toCoord = centerPointValue //中心点地理坐标 优化      
      if (fromCoord && toCoord) {
        let coordArr = [{
          coord: fromCoord, // 飞线去往哪里
          value: dataItem[0].value,
        }, {
          coord: toCoord, // 飞线从哪里出发
        },
        ];
        res.push(flyDirection === 0 ? coordArr : coordArr.reverse())
      }
    }
    return res
  }
  // IP显示-数据转换
  convertIPData = (data, gdGeoCoordMap) => {
    // 校验
    if (!data) {
      return
    }
    let res = [];
    for (let i = 0; i < data.length; i++) {
      let geoCoord = gdGeoCoordMap[data[i].name];
      if (geoCoord) {
        res.push({
          name: data[i].name,
          value: geoCoord.concat(data[i].value),
        });
      }
    }
    return res;
  };

  getSeries = (centerPoint, mainData, flyLineArr, coordData, flyDirection) => {
    let series = [];
    // let centerPointName =  '北京区域中心';
    let centerPointName = Object.keys(centerPoint)[0] || '北京区域中心';
    let centerPointValue = Object.values(centerPoint)[0] || [116.536989, 39.777354];
    [[centerPointName, flyLineArr]].forEach((item, i) => {
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
          data: this.convertData(item[1], coordData, flyDirection, centerPointValue),
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
              show: true,
              // areaColor: mainData.pointColor,
              // color: mainData.pointColor,
              areaColor: "#ade9f4",
              color: "#ade9f4",
            },
            emphasis: {
              // areaColor: mainData.pointColor,
              areaColor: "#ade9f4",
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
            color: '#FFD246',
          },
          label: {
            normal: {
              show: false,
              position: 'right',
              //offset:[5, 0],
              color: '#FFD246',
              formatter: '{b}',
              textStyle: {
                color: '#FFD246',
              },
            },
            emphasis: {
              show: false,
              color: '#FFD246',
            },
          },
          symbol: 'circle',
          symbolSize: 5,
          itemStyle: {
            color: '#FFD246',
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
    // console.log(mainData, '#mainData');
    const { mapMode, displayMode, bgColor, selectColor, pointColor, flyDirection, borderColor, flyColor, iconColor, rippleColor } = mainData
    const originData = comData || staticData.data
    // 根据传入的fields来映射对应的值
    const fields2ValueMap = {}
    const initColumnsName = fields
    fields.forEach((item, index) => {
      fields2ValueMap[initColumnsName[index]] = item
    })
    const finalData = this.formatData(originData, fields2ValueMap)

    const centerPoint = finalData[0]?.centerPoint || { 北京区域中心: [116.536989, 39.777354] };
    const coordData = finalData[0]?.coordData || {};
    const flyLineArr = finalData[0]?.flyLineArr || [];

    // IP地址数据
    const ipData = finalData[0]?.ipData || [];
    const ipCoordData = finalData[0]?.ipCoordData || {};

    const ipOptions = {
      tooltip: {
        backgroundColor: "rgba(0,0,0,0)",
        trigger: "axis",
      },
      legend: {
        show: false,
      },
      geo: {
        // map: 'world',
        map: 'china',
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
      series: [
        {
          tooltip: {
            show: false,
          },

          type: "effectScatter",
          coordinateSystem: "geo",
          rippleEffect: {
            scale: 10,
            brushType: "stroke",
          },
          showEffectOn: "render",
          itemStyle: {
            normal: {
              color: "#00FFFF", //ip 涟漪颜色
            },
          },
          label: {
            normal: {
              color: "#fff",
            },
          },
          symbol: "circle",
          // symbolSize: [10, 5],
          symbolSize: [10, 5],
          data: this.convertIPData(ipData, ipCoordData),
          zlevel: 1,
        },
        {
          type: "scatter",
          coordinateSystem: "geo",
          itemStyle: {
            color: "#00FFF6",  // 光标颜色
          },
          symbol: img.arrow,
          // symbol: 'arrow',
          symbolSize: [44, 34],
          symbolOffset: [0, -10],
          // symbolRotate: 180,
          z: 999,
          data: this.convertIPData(ipData, ipCoordData),
        },
        {
          type: "scatter",
          coordinateSystem: "geo",
          label: {
            normal: {
              show: true,
              formatter: function (params) {
                let name = params.name;
                let value = params.value[2];
                let text = `{fline|${value}}`;
                return text;
              },
              color: "#fff",
              rich: {
                fline: {
                  padding: [0, 25],
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 600,
                },
                tline: {
                  padding: [0, 27],
                  color: "#ABF8FF",
                  fontSize: 12,
                },
              },
            },
            emphasis: {
              show: true,
            },
          },
          itemStyle: {
            color: "#00FFF6",
          },
          symbol: img.ipbg,
          // symbol: "roundRect",
          symbolSize: [125, 32],
          symbolOffset: [0, -35],
          z: 999,
          data: this.convertIPData(ipData, ipCoordData),
        },
      ],
    };

    const options = {
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
        // map: 'world',
        map: 'china',
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
      series: this.getSeries(centerPoint, mainData, flyLineArr, coordData, flyDirection),
    }

    const dom = document.getElementById(componentConfig.id);
    var mapChart = echarts.init(dom);
    echarts.registerMap("china", mapMode === 0 ? worldJson : chinaJson);
    // echarts.registerMap("world", worldJson);
    // console.log(mapMode, '###mapMode');
    // echarts.registerMap("china", chinaJson);
    this.setState({ options, ipOptions }); // 飞线、IP都存state
    mapChart.setOption(displayMode === 0 ? options : ipOptions);
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
    let { mapChart, options, ipOptions } = this.state
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
    // let centerPoint = '北京区域中心';
    let centerPoint = finalData[0]?.centerPoint || { 北京区域中心: [116.536989, 39.777354] };
    let coordData = finalData[0]?.coordData || {};
    let flyLineArr = finalData[0]?.flyLineArr || [];
    let ipData = finalData[0]?.ipData || [];
    let ipCoordData = finalData[0]?.ipCoordData || {};
    let style = this.formatConfig(config, [])
    // console.log(style, '#style render');
    const { mapMode, displayMode, bgColor, selectColor, pointColor, borderColor, flyDirection, flyColor, iconColor, rippleColor } = style
    if (mapChart) {
      options.geo.itemStyle.normal.color = bgColor;
      options.geo.itemStyle.normal.borderColor = borderColor;
      options.geo.itemStyle.emphasis.areaColor = selectColor;
      ipOptions.geo.itemStyle.normal.color = bgColor;
      ipOptions.geo.itemStyle.normal.borderColor = borderColor;
      ipOptions.geo.itemStyle.emphasis.areaColor = selectColor;
      // console.log(displayMode, 'displayMode ###');
      if (displayMode === 0) {
        options.series = this.getSeries(centerPoint, style, flyLineArr, coordData, flyDirection)
        options.series[0].effect.color = iconColor;
      } else {
        ipOptions.series.map(item => {
          item.data = this.convertIPData(ipData, ipCoordData);
        })
      }
      echarts.registerMap("china", mapMode === 0 ? worldJson : chinaJson);
      mapChart.setOption(displayMode === 0 ? options : ipOptions);
      mapChart.resize();
      // 配置点击下钻
      mapChart.on('click', (params, echarts) => {
        if (Array.isArray(componentConfig.drillDownArr) && componentConfig.drillDownArr.length) {
          const { name } = params
          const clickObj=flyLineArr.find(item=>item[0].name===name)
          if(!clickObj){
            return
          }
          const enName=clickObj && clickObj.length ? clickObj[0].flag:''
          const value=clickObj && clickObj.length ? clickObj[0].value:''
          // const provincesReflect = {
          //   "大连": "dl",
          //   "辽河": "lh",
          //   "大庆": "dq",
          //   "勘探院数据中心": "ktydc",
          //   "吉林": "jl",
          //   "克拉玛依数据中心": "klmydc",
          //   "华东": "hd",
          //   "西安": "xa",
          //   "兰州": "lz",
          //   "昌平数据中心": "cpdc",
          //   "新疆": "xj",
          //   "华南": "hn",
          //   "西南": "xn",
          //   "东直门石油大厦": "dzmdc",
          //   "吉林数据中心": "jldc",
          //   "青海": "qh",
          //   "四川": "sc",
          //   "西南区域中心": "xndc",
          // }
          const outgoingData = {
            // 省市名
            originalName: name,
            // 省市名 首字母缩写
            name: enName,
            value
          }
          // drillDownArray长度不为零, 需要下钻
          if (typeof this.props.onChange === 'function') {
            this.props.onChange(outgoingData, echarts)
          }
        } else {
          // do something
        }
      });
    }


    let mapSize = {
      width: '100%',
      height: '100%'
    };
    // 从组件配置中获取当前地图的大小后赋值给mapSize
    // toFix: 从下钻面板中被切换显示时 地图经过一段时间后才由100 *100变为正常大小
    const { value: dimensionValue } = config.find((item) => item.name === "dimension")
    if (dimensionValue) {
      dimensionValue.forEach(({ name, value }) => {
        if (name === 'width') {
          mapSize.width = value
        }
        if (name === 'height') {
          mapSize.height = value
        }
      })
    }

    return (
      <div
        id={this.props.componentConfig.id}
        style={mapSize}
        option={displayMode === 0 ? options : ipOptions}
      />
    );
  }
}

export {
  WorldMap,
  ComponentDefaultConfig
}
export default WorldMap
