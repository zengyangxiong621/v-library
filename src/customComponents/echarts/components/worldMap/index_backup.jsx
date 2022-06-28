import React from 'react';
import EC from '../../EC';
import * as echarts from 'echarts';
import worldJson from "@/customComponents/echarts/components/world.json";
import debounce from 'lodash/debounce';
import ComponentDefaultConfig from './config'


//散点数据  value:[纬度，经度，数据]
var data = [
  { name: "浙江省", value: [122.6953, 30.8936, 10] },
  { name: "江苏省", value: [117.5977, 34.4531, 0.1] },
  { name: "宁夏", value: [106.9629, 38.9795, 0.2] },
  { name: "天津", value: [117.334, 40.1221, 0.5] },
  { name: "湖北", value: [110.5664, 33.2666, 2.3] },
  { name: "辽宁", value: [123.1348, 42.8027, 1.6] },
  { name: "美国", value: [-93.310319, 36.908779, 0.015] },
  { name: "丹麦", value: [9.1577, 56.1388, 0.275] },
  { name: "瑞士", value: [8.6649, 47.5276, 0.0354] },
];

var lineData = [
  {
    val: 32, //数据
    blat: [122.6953, 30.8936, 10], //发射点
    elon: [8.6649, 47.5276, 0.0354], //接收点
    bcitysim: "浙江省", //发射省的名字
    ecitysim: "瑞士" //接收省的名字
  },
  {
    val: 32,
    blat: [122.6953, 30.8936, 10],
    elon: [9.1577, 56.1388, 0.275],
    bcitysim: "浙江",
    ecitysim: "丹麦"
  },
  {
    val: 32,
    blat: [86.9023, 41.148],
    elon: [-93.310319, 36.908779, 0.015],
    bcitysim: "新疆",
    ecitysim: "美国"
  }
];

let mapChart = null;
var res = [];
var province = [];
for (var i = 0; i < lineData.length; i++) {
  province.push(lineData[i].bcitysim); //存进去每个省的名字
  province.push(lineData[i].ecitysim); //存进去每个省的名字
  res.push({
    fromName: lineData[i].bcitysim, //发射的省名，保存用于弹框显示
    toName: lineData[i].ecitysim, //接收的省名，保存用于弹框显示
    coords: [
      lineData[i].blat, //发射
      lineData[i].elon //接收
    ],
    count: lineData[i].val //数据
  });
}

class WorldMap extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cnt: 0
    };
    this.resizeDebounce = debounce(this.chartsResize, 250);



  }

  componentDidMount() {
    mapChart = this.createMap();
    // 监听浏览器resize
    window.addEventListener("resize", this.resizeDebounce);
    this.getOption();
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeDebounce);
  }

  chartsResize = () => {
    if (mapChart) {
      mapChart.resize(); //实例 的resize
    }
  };

  getOption = () => ({
    // backgroundColor: "#fff",   
    title: {
      show: false,
      text: "世界地图",
      left: "left",
      textStyle: {
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 10,
      },
    },
    //地理坐标系组件用于地图的绘制，支持在地理坐标系上绘制散点图，线集。
    geo: {
      show: true, //是否显示地理坐标系组件
      roam: true, //是否允许鼠标滚动放大，缩小
      map: "world",
      itemStyle: {
        normal: {
          areaColor: '#16377185',
          shadowColor: '#329edf',
          shadowBlur: 1,
          shadowOffsetX: 1,
          shadowOffsetY: 1,
          color: '#fff',
        }
      },
      emphasis: {
        //高亮状态下的多边形和标签样式。
        label: {
          color: '#fff',
          show: true,
        },
        itemStyle: {
          areaColor: "#2253ab",
        },
      },
      // center: [100.4, 35.9], //视图中心，展示在中国
      zoom: 1, //起始缩放比例
      // nameMap: nameMap, //世界各国名中英文对应
    },
    tooltip: {
      show: false, // 鼠标hover显示小弹窗
      formatter: function (params) {
        return `${params.name}  ${params.value[2]}%`;
      },
    },
    //是视觉映射组件，用于进行『视觉编码』，也就是将数据映射到视觉元素（视觉通道）。
    visualMap: {
      show: false, // 左下角范围
      type: "piecewise", // 定义为连续型 visualMap
      min: 0, //最小值
      max: 10, //最大值
      calculable: true, //是否显示拖拽用的手柄（手柄能拖拽调整选中范围）。
      textStyle: {
        color: "blue",
      },
      // inRange: {
      //   color: ['#f60','green']
      // }
    },
    series: [
      {
        type: "effectScatter",
        coordinateSystem: "geo", //该系列使用的坐标系
        mapType: "world",
        data: data,
        label: {
          formatter: params => {
            const { data = {} } = params;
            return `${data.name} \n ${data.value[2]}%`;
          },
          position: "insideLeft", //bottom
          show: true,
          color: "#333"
        },
        //标记的大小,可以设置数组或者函数返回值的形式，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10。
        symbolSize: 8,
        rippleEffect: {
          //涟漪特效相关配置。
          brushType: "stroke" //波纹的绘制方式
        },
        hoverAnimation: true //鼠标移入放大圆
      },
      {
        //射线效果图层
        type: "lines", //类型：射线
        zlevel: 3, //类似图层效果
        effect: {
          show: true, //是否显示图标
          symbol: "arrow", //箭头图标
          symbolSize: 5, //图标大小
          trailLength: 0.2 //特效尾迹长度[0,1]值越大，尾迹越长重
        },
        label: {
          show: true
        },
        lineStyle: {
          color: "#000",
          normal: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              {
                offset: 1,
                color: "rgba(159,201,255,1)" // 0% 处的颜色
              },
              {
                offset: 0.3,
                color: "rgba(102,153,255,1)" // 100% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(159,201,255,1)" // 100% 处的颜色
              }
            ]),
            width: 4, //尾迹线条宽度
            opacity: 0.5, //尾迹线条透明度
            curveness: 0.2 //尾迹线条曲直度
          }
        },
        // //提示框信息
        // tooltip: {
        //   formatter: function(param) {
        //     return (
        //       param.data.fromName +
        //       ">" +
        //       param.data.toName +
        //       "<br>数量：" +
        //       param.data.count
        //     );
        //   }
        // },
        data: res //拿到射线的起始点和结束点
      }
    ]

    // series: [
    //   {
    //     //射线效果图层
    //     type: "lines", //类型：射线
    //     zlevel: 1, //类似图层效果
    //     effect: {
    //       show: true,//是否显示图标
    //       symbol: "arrow",//箭头图标
    //       symbolSize: 5,//图标大小
    //       trailLength: 0.02,//特效尾迹长度[0,1]值越大，尾迹越长重
    //     },
    //     label: {
    //       show: true,
    //     },
    //     lineStyle: {
    //       color: "#fff",
    //       normal: {
    //         color: "#fff",
    //         width: 4,//尾迹线条宽度
    //         opacity: 0.5,//尾迹线条透明度
    //         curveness: 0.1,//尾迹线条曲直度
    //       },
    //     },
    //     //提示框信息
    //     tooltip: {
    //       formatter: function (param) {
    //         return (
    //           param.data.fromName +
    //           ">" +
    //           param.data.toName +
    //           "<br>数量：" +
    //           param.data.count
    //         );
    //       },
    //     },
    //     data: res
    //   },
    //   {
    //     type: "effectScatter",
    //     coordinateSystem: "geo", //该系列使用的坐标系
    //     mapType: "world",
    //     data: data,
    //     label: {
    //       formatter: (params) => {
    //         const { data = {} } = params;
    //         return `${data.name} \n ${data.value[2]}%`;
    //       },
    //       position: "insideLeft", //bottom
    //       show: true,
    //       color: "#333",
    //     },
    //     //标记的大小,可以设置数组或者函数返回值的形式，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10。
    //     // label: {
    //     //   normal: {
    //     //     show: true, //省份名显示隐藏
    //     //     position: "right", //省份名显示位置
    //     //     offset: [5, 0], //省份名偏移设置
    //     //     formatter: function (params) {
    //     //       //圆环显示省份名
    //     //       return params.name;  //这个名字是根据data中的name来显示的
    //     //     },
    //     //     fontSize: 12,//文字大小
    //     //   },
    //     //   emphasis: {
    //     //     show: true,
    //     //   },
    //     // },
    //     symbolSize: 8,
    //     rippleEffect: {
    //       //涟漪特效相关配置。
    //       brushType: "stroke", //波纹的绘制方式
    //     },
    //     hoverAnimation: true, //鼠标移入放大圆
    //   },
    //   // {
    //   //   type: "effectScatter",//散点图
    //   //   coordinateSystem: "geo",//这个不能删，删了不显示
    //   //   zlevel: 1,
    //   //   rippleEffect: {
    //   //     //涟漪特效
    //   //     period: 4, //动画时间，值越小速度越快
    //   //     brushType: "stroke", //波纹绘制方式 stroke, fill
    //   //     scale: 4, //波纹圆环最大限制，值越大波纹越大
    //   //   },
    //   //   //设置文字部分
    //   //   label: {
    //   //     normal: {
    //   //       show: true, //省份名显示隐藏
    //   //       position: "right", //省份名显示位置
    //   //       offset: [5, 0], //省份名偏移设置
    //   //       formatter: function (params) {
    //   //         //圆环显示省份名
    //   //         return params.name;  //这个名字是根据data中的name来显示的
    //   //       },
    //   //       fontSize: 12,//文字大小
    //   //     },
    //   //     emphasis: {
    //   //       show: true,
    //   //     },
    //   //   },
    //   //   symbol: "circle",//散点图
    //   //   symbolSize: 5,//散点大小
    //   //   itemStyle: {//散点样式
    //   //     normal: {
    //   //       show: true,
    //   //       color: "#fff",
    //   //     },
    //   //   },
    //   //   data: [
    //   //     {
    //   //       name: "西藏", value: [87.8695, 31.6846],
    //   //     },
    //   //     {
    //   //       name: "青海", value: [95.2402, 35.4199],
    //   //     },
    //   //     {
    //   //       name: "新疆", value: [86.9023, 41.148],
    //   //     }
    //   //   ], //处理好后的散点图坐标数组
    //   // },

    // ],
  });


  createMap = (initOption) => {
    const dom = document.getElementById(this.props.componentConfig.id);
    const mapChart = echarts.init(dom);
    echarts.registerMap("world", worldJson); // 注册world地图    
    const options = initOption || this.getOption();
    mapChart.setOption(options);
    return mapChart;
  };


  onChartClick = (param, echarts) => {
    console.log(param, echarts);
    alert('chart click');
    this.setState({
      cnt: this.state.cnt + 1
    });
  };

  onChartReady = echarts => {
    console.log('echart is ready', echarts);
  };

  render() {
    let onEvents = {
      click: this.onChartClick,
    };

    return (
      <EC
        id={this.props.componentConfig.id}
        type="map"
        option={this.getOption()}
        onChartReady={this.onChartReady}
        onEvents={onEvents}
        createMap={this.createMap}
      />
    );
  }
}

export {
  WorldMap,
  ComponentDefaultConfig
}
export default WorldMap
