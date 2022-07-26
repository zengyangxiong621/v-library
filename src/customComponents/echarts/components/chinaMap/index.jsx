import React, { Component } from 'react';
import * as echarts from 'echarts';
import chinaJson from "./china.json";
// import outline from "./chinaoutline.json";
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
    // 标牌位置调整，做判断删去“昌平”
    if(!dataCenter){return}
    if(dataCenter.length > 1){ dataCenter = dataCenter.slice(2) }
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
    if (!dataCenter) { return }
    const maxValue = Math.max(
      ...dataCenter.map((item) => item.times)
    );

    return 5 / maxValue; // 调解max柱状长度
  }
  // 柱状体的主干
  lineData = (dataCenter, ipCoordData) => {
    if (!dataCenter) { return }
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
    if (!dataCenter) { return }
    return dataCenter.map((item) => {
      return [
        ipCoordData[item.name][0],
        ipCoordData[item.name][1] + item.times * this.lineMaxHeight(dataCenter),
      ];
    });
  }
  // 柱状体的底部
  scatterData2 = (dataCenter, ipCoordData) => {
    if (!dataCenter) { return }
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
    console.log(finalData[0].dataCenter,'123123');
    const dataCenter = finalData[0].dataCenter;
    const dataCenter2 = finalData[0].dataCenter?.slice(0,1);
    const dataCenter3 = finalData[0].dataCenter?.slice(1,2);
    const ipCoordData = finalData[0].ipCoordData;


    const options = {
      tooltip: {
        backgroundColor: "rgba(0,0,0,0)",
        trigger: "axis",
      },
      legend: {
        show: false,
      },
      geo: {
        silent: true,
        radius: '100%',
        map: "china",
        zoom: 1.20,
        // zoom: 0.8,
        // top: "-6%",
        label: {
          normal: {
            show: false,
            textStyle: {
              color: "#fff",
            },
          },
          emphasis: {
            textStyle: {
              color: "#fff",
            },
          },
        },
        roam: false,
        itemStyle: {
          normal: {
            areaColor: "rgba(0,255,255,.02)",
            borderColor: {
              type: 'linear',
              x: 0,
              y: 1,
              x2: .5,
              y2: 0,
              colorStops: [{
                offset: 0, color: '#f7e914'
              }, {
                offset: 0.5, color: '#fbaa0e'
              }, {
                offset: 1, color: '#306a9f'
              }],
              global: false
            },
            borderWidth: 4.5,
            shadowColor: "#35a8ff",
            // shadowColor: "#3071a7",
            shadowOffsetX: 0,
            shadowOffsetY: 38,
            shadowBlur: 38,
          },
          emphasis: {
            areaColor: "transparent", //悬浮背景
            textStyle: {
              color: "#fff",
            },
          },
        },
      },
      series: [
        // 地图
        {
          map: 'china',
          type: 'map',
          radius: '100%',
          zoom: 1.19,
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
              // color: bgColor, //地图背景色
              areaColor: bgColor, //地图背景色
              borderColor: borderColor, //内边缘颜色
              borderWidth: 2,
              textStyle: '#fff',
            },
            emphasis: {
              // areaColor: selectColor, //悬浮背景
              areaColor: "#315b8f", //悬浮背景
            },
          },
          data: [],
        },
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
          symbolSize: [30, 15],
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
                  // backgroundColor: "#f7c91c",
                  backgroundColor: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 0,
                    colorStops: [{
                        offset: 0, color: '#f7c91c' // 0% 处的颜色
                    }, {
                        offset: 1, color: '#ffffff00' // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false                
                  },
                  // margin: [0, 20],
                  lineHeight: 72,
                  fontSize: 42,
                  width: 500,
                  height: 80,
                },
                tline: {
                  padding: [0, 25],
                  color: "#fff",
                  fontSize: 36,
                  lineHeight: 60,
                  width: 500,
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
          symbolSize: [600, 240],
          symbolOffset: [360, -150],
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
                let value = params.value[2];
                let text = `{fline|${value}}`;
                return text;
              },
              color: "#fff",
              rich: {
                fline: {
                  padding: [-30, -75, 84, -45], // 调整标牌文字位置
                  color: "#00d3ff",
                  fontSize: 42,
                  fontWeight: 400,
                },
                tline: {
                  padding: [0, 27],
                  color: "#ABF8FF",
                  fontSize: 36,
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
          // symbolSize: [44, 70], 
          symbolSize: [132, 210],
          symbolOffset: [0, -90],
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
            width: 60, // 尾迹线条宽度
            // color: "#f60", //柱状颜色
            color: {
              type: 'linear', // 线性渐变
              x: 0,             // x:  从左向右 1 ——> 0
              y: 0,             // y:  从上向下 1 ——> 0
              x2: 0,            // x2: 从右向左 1 ——> 0
              y2: 1,            // y2: 从下向上 1 ——> 0
              colorStops: [
                { offset: 0, color: '#ffd43c' },
                { offset: 1, color: '#bf5b2d' }
              ]
            },
            opacity: .8, // 尾迹线条透明度
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
          symbolSize: [60, 96],
          symbolOffset: [0, -30],
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
            fontSize: 36,
            distance: 10,
            show: true,
          },
          symbol: "circle",
          symbolSize: [60, 30],
          itemStyle: {
            color: '#f60',
            opacity: .6,
          },
          silent: true,
          data: this.scatterData2(dataCenter, ipCoordData),
        },
        // 昌平
        {
          type: "scatter",
          coordinateSystem: "geo",
          label: {
            normal: {
              // position: 'top',
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
                  // backgroundColor: "#f7c91c",
                  backgroundColor: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 0,
                    colorStops: [{
                        offset: 0, color: '#f7c91c' // 0% 处的颜色
                    }, {
                        offset: 1, color: '#ffffff00' // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false                
                  },
                  // margin: [0, 20],
                  lineHeight: 72,
                  fontSize: 42,
                  width: 500,
                  height: 80,
                },
                tline: {
                  padding: [0, 25],
                  color: "#fff",
                  fontSize: 36,
                  lineHeight: 60,
                  width: 500,
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
          symbolSize: [600, 240],
          symbolOffset: [0, -320],
          // symbolOffset: [-360, -150],
          z: 999,
          data: this.convertIPData2(dataCenter2, ipCoordData),
        },
        // 勘探院
        {
          type: "scatter",
          coordinateSystem: "geo",
          label: {
            normal: {
              // position: 'top',
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
                  // backgroundColor: "#f7c91c",
                  backgroundColor: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 0,
                    colorStops: [{
                        offset: 0, color: '#f7c91c' // 0% 处的颜色
                    }, {
                        offset: 1, color: '#ffffff00' // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false                
                  },
                  // margin: [0, 20],
                  lineHeight: 72,
                  fontSize: 42,
                  width: 500,
                  height: 80,
                },
                tline: {
                  padding: [0, 25],
                  color: "#fff",
                  fontSize: 36,
                  lineHeight: 60,
                  width: 500,
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
          symbolSize: [600, 240],
          symbolOffset: [360, 0],
          z: 999,
          data: this.convertIPData2(dataCenter3, ipCoordData),
        },
      ],
    };

    const dom = document.getElementById(componentConfig.id);
    var mapChart = echarts.init(dom);
    echarts.registerMap("china", chinaJson);
    // echarts.registerMap("outline", outline);
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
    let dataCenter2 = finalData[0].dataCenter?.slice(0,1);
    let dataCenter3 = finalData[0].dataCenter?.slice(1,2);

    let ipCoordData = finalData[0].ipCoordData;

    let style = this.formatConfig(config, [])
    console.log(finalData, '#finalData');
    const { bgColor, selectColor, pointColor, borderColor, flyColor, iconColor, rippleColor } = style
    if (mapChart) {
      options.series[0].itemStyle.normal.areaColor = bgColor;
      options.series[0].itemStyle.normal.borderColor = borderColor;
      // options.series[0].itemStyle.emphasis.areaColor = selectColor;

      options.series[1].data = this.convertIPData(ipData, ipCoordData);
      options.series[2].data = this.convertIPData2(dataCenter, ipCoordData);
      options.series[3].data = this.convertIPData(ipData, ipCoordData);
      options.series[4].data = this.lineData(dataCenter, ipCoordData);
      options.series[5].data = this.scatterData(dataCenter, ipCoordData);
      options.series[6].data = this.scatterData2(dataCenter, ipCoordData);
      options.series[7].data = this.convertIPData2(dataCenter2, ipCoordData);
      options.series[8].data = this.convertIPData2(dataCenter3, ipCoordData);
      mapChart.setOption(options);
      mapChart.resize();
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
