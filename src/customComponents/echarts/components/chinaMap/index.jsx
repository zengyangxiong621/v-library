import React, { Component } from 'react';
import * as echarts from 'echarts';
import chinaJson from "./china.json";
import ComponentDefaultConfig from './config';
import img from './img'

class ChinaMap extends Component {
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

  // IP显示-数据转换
  convertIPData = (data, gdGeoCoordMap) => {
    let res = [];
    for (let i = 0; i < data.length; i++) {
      let geoCoord = gdGeoCoordMap[data[i].name];
      if (geoCoord) {
        res.push({
          name: data[i].name,
          value: geoCoord.concat(data[i].value),
          times: data[i]?.times,
          system: data[i]?.system,
        });
      }
    }
    return res;
  };

  // IP显示-数据转换
  convertIPData2 = (dataCenter, gdGeoCoordMap) => {
    let res = [];
    console.log(dataCenter, '#datac');
    for (let i = 0; i < dataCenter.length; i++) {
      let geoCoord = gdGeoCoordMap[dataCenter[i].name];
      if (geoCoord) {
        res.push({
          name: dataCenter[i].name,
          value: geoCoord.concat(dataCenter[i].value),
          times: dataCenter[i].times,
          system: dataCenter[i].system,
        });
      }
    }
    return res;
  };


  // 动态计算柱形图的高度（定一个max）
  lineMaxHeight = (dataCenter) => {
    const maxValue = Math.max(
      ...dataCenter.map((item) => item.times)
    );

    return 6 / maxValue; // 调解max柱状长度
  }
  // 柱状体的主干
  lineData = (dataCenter, ipCoordData) => {
    return dataCenter.map((item) => {
      return {
        coords: [
          ipCoordData[item.name],
          [
            ipCoordData[item.name][0],
            ipCoordData[item.name][1] + item.times * this.lineMaxHeight(dataCenter),
          ],
        ],
      };
    });
  }

  // 柱状体的顶部
  scatterData = (dataCenter, ipCoordData) => {
    return dataCenter.map((item) => {
      return [
        ipCoordData[item.name][0],
        ipCoordData[item.name][1] + item.times * this.lineMaxHeight(dataCenter),
      ];
    });
  }
  // 柱状体的底部
  scatterData2 = (dataCenter, ipCoordData) => {
    return dataCenter.map((item) => {
      return {
        name: item.name,
        value: ipCoordData[item.name],
      };
    });
  }


  createMap = () => {
    const { comData, componentConfig, fields } = this.props
    const { config, staticData } = componentConfig || ComponentDefaultConfig
    const mainData = this.formatConfig(config, [])
    console.log(mainData, '#mainData');
    const { bgColor, selectColor, pointColor, borderColor, flyColor, iconColor, rippleColor } = mainData
    const originData = comData || staticData.data
    // 根据传入的fields来映射对应的值 
    const fields2ValueMap = {}
    const initColumnsName = fields
    fields.forEach((item, index) => {
      fields2ValueMap[initColumnsName[index]] = item
    })
    const finalData = this.formatData(originData, fields2ValueMap)

    // IP地址数据
    const ipData = finalData[0].ipData;
    const dataCenter = finalData[0].dataCenter;
    // const dataCenter = [
    //   {
    //     name: "昌平",
    //     value: "昌平",
    //     times: "1000",
    //     system: "3123",
    //   },
    //   {
    //     name: "勘探院",
    //     value: "勘探院",
    //     times: "1000",
    //     system: "3123",
    //   },
    //   {
    //     name: "吉林",
    //     value: "吉林",
    //     times: "2223",
    //     system: "2123",
    //   },
    //   {
    //     name: "克拉玛依",
    //     value: "克拉玛依",
    //     times: "3123",
    //     system: "3123",
    //   },
    // ];
    const ipCoordData = finalData[0].ipCoordData;

    // const ipCoordData = {
    //   昌平: [116.249193, 40.168238],
    //   勘探院: [116.357544, 39.992995],
    //   吉林: [126.539923, 43.941828],
    //   克拉玛依: [84.902321, 45.580525],
    //   北京: [116.536989, 39.777354],
    //   辽河: [123.479261, 41.79233],
    //   吉林: [126.567982, 43.823481],
    //   大庆: [125.268447, 45.704549],
    //   西安: [108.979039, 34.273485],
    //   兰州: [103.672554, 36.505049],
    //   新疆: [87.520211, 43.860104],
    //   西南: [104.098755, 30.678152],
    //   华南: [113.341111, 23.02494],
    //   华东: [120.186041, 30.290762],
    //   大连: [121.653164, 38.979666],
    // };

    const options = {
      tooltip: {
        backgroundColor: "rgba(0,0,0,0)",
        trigger: "axis",
      },
      legend: {
        show: false,
      },
      geo: {
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
        // 点位
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
          symbolSize: [10, 5],
          data: this.convertIPData(ipData, ipCoordData),
          zlevel: 1,
        },

        // 下标 暂不需要
        // {
        //   type: "scatter",
        //   coordinateSystem: "geo",
        //   itemStyle: {
        //     color: "#00FFF6",  // 光标颜色
        //   },
        //   symbol: img.arrow,
        //   // symbol: 'arrow',
        //   symbolSize: [44, 34],
        //   symbolOffset: [0, -10],
        //   // symbolRotate: 180,
        //   z: 999,
        //   data: this.convertIPData(ipData, ipCoordData),
        // },

        // 黄色标牌
        {
          type: "scatter",
          coordinateSystem: "geo",
          label: {
            normal: {
              show: true,
              formatter: function (params) {
                let value = params.value[2];
                let times = params.data.times;
                let system = params.data.system;
                let text = `{fline|中国石油数据中心（${value}）}\n{tline|攻击总量：${times} 次}\n{tline|攻击系统：${system} 个}`;
                return text;
              },
              color: "#fff",
              rich: {
                fline: {
                  padding: [0, 25], // 调整标牌文字位置
                  // color: "#fff",  // 优化
                  lineHeight: 24,
                  fontSize: 14,
                },
                tline: {
                  padding: [0, 27],
                  color: "#fff",
                  fontSize: 12,
                  lineHeight: 16
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
          symbol: img.yellow,
          symbolSize: [200, 80],
          symbolOffset: [120, -50],
          z: 999,
          data: this.convertIPData2(dataCenter, ipCoordData),
        },

        // 蓝色标牌
        {
          type: "scatter",
          coordinateSystem: "geo",
          label: {
            normal: {
              show: true,
              formatter: function (params) {
                console.log(params, '#p');
                let name = params.name;
                let value = params.value[2];
                let text = `{fline|${value}}`;
                return text;
              },
              color: "#fff",
              rich: {
                fline: {
                  padding: [-10, -25, 28, -15], // 调整标牌文字位置
                  color: "#00d3ff",
                  fontSize: 14,
                  fontWeight: 400,
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
          symbol: img.blue,
          // symbol: "roundRect",
          symbolSize: [44, 70],
          symbolOffset: [0, -32],
          z: 999,
          data: this.convertIPData(ipData, ipCoordData),
        },

        // 柱状体的主干
        {
          type: "lines",
          zlevel: 5,
          effect: {
            show: false,
            // period: 4, //箭头指向速度，值越小速度越快
            // trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
            // symbol: 'arrow', //箭头图标
            // symbol: imgDatUrl,
            symbolSize: 5, // 图标大小
          },
          lineStyle: {
            width: 20, // 尾迹线条宽度
            color: "#f60", //##柱状颜色
            opacity: .6, // 尾迹线条透明度
            curveness: 0, // 尾迹线条曲直度
          },
          label: {
            show: 0,
            position: "end",
            formatter: "245",
          },
          silent: true,
          data: this.lineData(dataCenter, ipCoordData),
        },
        // 柱状体的顶部
        {
          type: "scatter",
          coordinateSystem: "geo",
          // geoIndex: 0,
          // zlevel: 5,
          label: {
            normal: {
              show: true,
              formatter: () => { return ''; },
              color: "#fff",
            },
            emphasis: {
              show: true,
            },
          },
          itemStyle: {
            color: "#fff", //##柱状顶部颜色
            // opacity: .9,
          },
          symbol: img.orange,
          symbolSize: [20, 32],
          symbolOffset: [1, -10],
          z: 999,
          // silent: true,
          data: this.scatterData(dataCenter, ipCoordData),
        },
        // 柱状体的底部
        {
          type: "scatter",
          coordinateSystem: "geo",
          geoIndex: 0,
          zlevel: 4,
          label: {
            formatter: "{b}",
            position: "bottom",
            color: "#fff",
            fontSize: 12,
            distance: 10,
            show: true,
          },
          symbol: "circle",
          symbolSize: [20, 10],
          itemStyle: {
            color: '#f60',
            opacity: .6,
          },
          silent: true,
          data: this.scatterData2(dataCenter, ipCoordData),
        },
      ],
    };

    const dom = document.getElementById(componentConfig.id);
    var mapChart = echarts.init(dom);
    echarts.registerMap("china", chinaJson);
    this.setState({ options });
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
    let ipData = finalData[0].ipData;
    let dataCenter = finalData[0].dataCenter;
    // let dataCenter = [
    //   {
    //     name: "昌平",
    //     value: "昌平",
    //     times: "1000",
    //     system: "3123",
    //   },
    //   {
    //     name: "勘探院",
    //     value: "勘探院",
    //     times: "1000",
    //     system: "3123",
    //   },
    //   {
    //     name: "吉林",
    //     value: "吉林",
    //     times: "2223",
    //     system: "2123",
    //   },
    //   {
    //     name: "克拉玛依",
    //     value: "克拉玛依",
    //     times: "3123",
    //     system: "3123",
    //   },
    // ];
    let ipCoordData = finalData[0].ipCoordData;
    // let ipCoordData = {
    //   昌平: [116.249193, 40.168238],
    //   勘探院: [116.357544, 39.992995],
    //   吉林: [126.539923, 43.941828],
    //   克拉玛依: [84.902321, 45.580525],
    //   北京: [116.536989, 39.777354],
    //   辽河: [123.479261, 41.79233],
    //   吉林: [126.567982, 43.823481],
    //   大庆: [125.268447, 45.704549],
    //   西安: [108.979039, 34.273485],
    //   兰州: [103.672554, 36.505049],
    //   新疆: [87.520211, 43.860104],
    //   西南: [104.098755, 30.678152],
    //   华南: [113.341111, 23.02494],
    //   华东: [120.186041, 30.290762],
    //   大连: [121.653164, 38.979666],
    // };
    let style = this.formatConfig(config, [])
    console.log(finalData, '#finalData');
    const { bgColor, selectColor, pointColor, borderColor, flyColor, iconColor, rippleColor } = style
    if (mapChart) {
      options.geo.itemStyle.normal.color = bgColor;
      options.geo.itemStyle.normal.borderColor = borderColor;
      options.geo.itemStyle.emphasis.areaColor = selectColor;

      options.series[0].data = this.convertIPData(ipData, ipCoordData);
      options.series[1].data = this.convertIPData2(dataCenter, ipCoordData);
      options.series[2].data = this.convertIPData(ipData, ipCoordData);
      options.series[3].data = this.lineData(dataCenter, ipCoordData);
      options.series[4].data = this.scatterData(dataCenter, ipCoordData);
      options.series[5].data = this.scatterData2(dataCenter, ipCoordData);
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
  ChinaMap,
  ComponentDefaultConfig
}
export default ChinaMap
