import React from 'react';
import EC from '../../EC';
import * as echarts from 'echarts';
import worldJson from "@/customComponents/echarts/components/world.json";
import debounce from 'lodash/debounce';
import ComponentDefaultConfig from './config'

let mapChart = null;


var chinaGeoCoordMap = {
  黑龙江: [127.9688, 45.368],
  内蒙古: [110.3467, 41.4899],
  吉林: [125.8154, 44.2584],
  北京市: [116.4551, 40.2539],
  辽宁: [123.1238, 42.1216],
  河北: [114.4995, 38.1006],
  天津: [117.4219, 39.4189],
  山西: [112.3352, 37.9413],
  陕西: [109.1162, 34.2004],
  甘肃: [103.5901, 36.3043],
  宁夏: [106.3586, 38.1775],
  青海: [101.4038, 36.8207],
  新疆: [87.9236, 43.5883],
  西藏: [91.11, 29.97],
  四川: [103.9526, 30.7617],
  重庆: [108.384366, 30.439702],
  山东: [117.1582, 36.8701],
  河南: [113.4668, 34.6234],
  江苏: [118.8062, 31.9208],
  安徽: [117.29, 32.0581],
  湖北: [114.3896, 30.6628],
  浙江: [119.5313, 29.8773],
  福建: [119.4543, 25.9222],
  江西: [116.0046, 28.6633],
  湖南: [113.0823, 28.2568],
  贵州: [106.6992, 26.7682],
  云南: [102.9199, 25.4663],
  广东: [113.12244, 23.009505],
  广西: [108.479, 23.1152],
  海南: [110.3893, 19.8516],
  上海: [121.4648, 31.2891],
}
// 飞线点数据
var chinaDatas = [
  [
    {
      name: '黑龙江',
      value: 0,
    },
  ],
  [
    {
      name: '内蒙古',
      value: 0,
    },
  ],
  [
    {
      name: '吉林',
      value: 0,
    },
  ],
  [
    {
      name: '辽宁',
      value: 0,
    },
  ],
  [
    {
      name: '河北',
      value: 0,
    },
  ],
  [
    {
      name: '天津',
      value: 0,
    },
  ],
  [
    {
      name: '山西',
      value: 0,
    },
  ],
  [
    {
      name: '陕西',
      value: 0,
    },
  ],
  [
    {
      name: '甘肃',
      value: 0,
    },
  ],
  [
    {
      name: '宁夏',
      value: 0,
    },
  ],
  [
    {
      name: '青海',
      value: 0,
    },
  ],
  [
    {
      name: '新疆',
      value: 0,
    },
  ],
  [
    {
      name: '西藏',
      value: 0,
    },
  ],
  [
    {
      name: '四川',
      value: 0,
    },
  ],
  [
    {
      name: '山东',
      value: 0,
    },
  ],
  [
    {
      name: '河南',
      value: 0,
    },
  ],
  [
    {
      name: '江苏',
      value: 0,
    },
  ],
  [
    {
      name: '安徽',
      value: 0,
    },
  ],
  [
    {
      name: '湖北',
      value: 0,
    },
  ],
  [
    {
      name: '浙江',
      value: 0,
    },
  ],
  [
    {
      name: '福建',
      value: 0,
    },
  ],
  [
    {
      name: '江西',
      value: 0,
    },
  ],
  [
    {
      name: '湖南',
      value: 0,
    },
  ],
  [
    {
      name: '贵州',
      value: 0,
    },
  ],
  [
    {
      name: '广西',
      value: 0,
    },
  ],
  [
    {
      name: '海南',
      value: 0,
    },
  ],
  [
    {
      name: '上海',
      value: 1,
    },
  ],
]
let formdata = '重庆' // 中心点

var convertData = function (data) {
  var res = []
  for (var i = 0; i < data.length; i++) {
    console.log(data[i])
    var dataItem = data[i]
    var fromCoord = chinaGeoCoordMap[dataItem[0].name]
    var toCoord = [108.384366, 30.439702] //中心点地理坐标
    if (fromCoord && toCoord) {
      res.push([
        {
          // 飞线从哪里出发
          coord: toCoord,
        },
        {
          // 飞线去往哪里
          coord: fromCoord,
          value: dataItem[0].value,
        },
      ])
    }
  }
  return res
}
var series = [];

[[formdata, chinaDatas]].forEach(function (item, i) {
  console.log(item)
  series.push(
    {
      type: 'lines',
      coordinateSystem: 'geo',
      zlevel: 2,
      effect: {
        show: true,
        period: 4, //箭头指向速度，值越小速度越快
        trailLength: 0, //特效尾迹长度[0,1]值越大，尾迹越长重
        symbol: 'arrow', //箭头图标
        symbolSize: 5, //图标大小
        color: '#fcdd6e', // 图标颜色
      },
      lineStyle: {
        normal: {
          show: true,
          width: 1, //尾迹线条宽度
          opacity: 1, //尾迹线条透明度
          curveness: 0.3, //尾迹线条曲直度
          color: '#fcdd6e', // 飞线颜色
        },
        color: '#fcdd6e',
      },
      data: convertData(item[1]),
    },
    {
      type: 'effectScatter',
      coordinateSystem: 'geo',
      zlevel: 2,
      rippleEffect: {
        //涟漪特效
        period: 4, //动画时间，值越小速度越快
        brushType: 'stroke', //波纹绘制方式 stroke, fill
        scale: 3, //波纹圆环最大限制，值越大波纹越大
        color: '#fcdd6e',
      },
      label: {
        normal: {
          show: false,
          position: 'right', //显示位置
          offset: [5, 0], //偏移设置
          formatter: function (params) {
            //圆环显示文字
            return params.data.name
          },
          fontSize: 13,
        },
        emphasis: {
          show: false,
        },
      },
      symbol: 'circle',
      symbolSize: function (val) {
        return 5 //圆环大小
      },
      itemStyle: {
        normal: {
          show: false,
          color: '#fce182',
        },
      },
      data: item[1].map(function (dataItem) {
        return {
          //在这里定义你所要展示的数据
          // name: dataItem[0].name,
          // value: chinaGeoCoordMap[dataItem[0].name].concat([dataItem[0].value]),
          name: dataItem[0].name,
          value: chinaGeoCoordMap[dataItem[0].name].concat([dataItem[0].value]),
        }
      }),
    },
    //中心点
    {
      type: 'effectScatter',
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
          value: chinaGeoCoordMap[item[0]].concat([10]),
        },
      ],
    }
  )
})
var options = {
  // bgColor: '#1a1e45',
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
    // color: ['#1a1e45'],
  },
  geo: {
    map: 'world',
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
        color: '#1a1e45', //地图背景色
        borderColor: '#22ccfb', //省市边界线00fcff 516a89
        borderWidth: 1,
        textStyle: '#fff',
      },
      emphasis: {
        color: '#22ccfb', //悬浮背景
      },
    },
    data: [],
  },
  series: series,
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
    // this.getOption();
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeDebounce);
  }

  chartsResize = () => {
    if (mapChart) {
      mapChart.resize(); //实例 的resize
    }
  };

  // getOption = () => ({
  //   // backgroundColor: "#fff",   
  //   title: {
  //     show: false,
  //     text: "世界地图",
  //     left: "left",
  //     textStyle: {
  //       fontSize: 16,
  //       fontWeight: "bold",
  //       marginLeft: 10,
  //     },
  //   },
  //   //地理坐标系组件用于地图的绘制，支持在地理坐标系上绘制散点图，线集。
  //   geo: {
  //     show: true, //是否显示地理坐标系组件
  //     roam: true, //是否允许鼠标滚动放大，缩小
  //     map: "world",
  //     itemStyle: {
  //       normal: {
  //         areaColor: '#16377185',
  //         shadowColor: '#329edf',
  //         shadowBlur: 1,
  //         shadowOffsetX: 1,
  //         shadowOffsetY: 1,
  //         color: '#fff',
  //       }
  //     },
  //     emphasis: {
  //       //高亮状态下的多边形和标签样式。
  //       label: {
  //         color: '#fff',
  //         show: true,
  //       },
  //       itemStyle: {
  //         areaColor: "#2253ab",
  //       },
  //     },
  //     // center: [100.4, 35.9], //视图中心，展示在中国
  //     zoom: 1, //起始缩放比例
  //     // nameMap: nameMap, //世界各国名中英文对应
  //   },
  //   tooltip: {
  //     show: false, // 鼠标hover显示小弹窗
  //     formatter: function (params) {
  //       return `${params.name}  ${params.value[2]}%`;
  //     },
  //   },
  //   //是视觉映射组件，用于进行『视觉编码』，也就是将数据映射到视觉元素（视觉通道）。
  //   visualMap: {
  //     show: false, // 左下角范围
  //     type: "piecewise", // 定义为连续型 visualMap
  //     min: 0, //最小值
  //     max: 10, //最大值
  //     calculable: true, //是否显示拖拽用的手柄（手柄能拖拽调整选中范围）。
  //     textStyle: {
  //       color: "blue",
  //     },
  //     // inRange: {
  //     //   color: ['#f60','green']
  //     // }
  //   },
  //   series: [
  //     {
  //       type: "effectScatter",
  //       coordinateSystem: "geo", //该系列使用的坐标系
  //       mapType: "world",
  //       data: data,
  //       label: {
  //         formatter: params => {
  //           const { data = {} } = params;
  //           return `${data.name} \n ${data.value[2]}%`;
  //         },
  //         position: "insideLeft", //bottom
  //         show: true,
  //         color: "#333"
  //       },
  //       //标记的大小,可以设置数组或者函数返回值的形式，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10。
  //       symbolSize: 8,
  //       rippleEffect: {
  //         //涟漪特效相关配置。
  //         brushType: "stroke" //波纹的绘制方式
  //       },
  //       hoverAnimation: true //鼠标移入放大圆
  //     },
  //     {
  //       //射线效果图层
  //       type: "lines", //类型：射线
  //       zlevel: 3, //类似图层效果
  //       effect: {
  //         show: true, //是否显示图标
  //         symbol: "arrow", //箭头图标
  //         symbolSize: 5, //图标大小
  //         trailLength: 0.2 //特效尾迹长度[0,1]值越大，尾迹越长重
  //       },
  //       label: {
  //         show: true
  //       },
  //       lineStyle: {
  //         color: "#000",
  //         normal: {
  //           color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
  //             {
  //               offset: 1,
  //               color: "rgba(159,201,255,1)" // 0% 处的颜色
  //             },
  //             {
  //               offset: 0.3,
  //               color: "rgba(102,153,255,1)" // 100% 处的颜色
  //             },
  //             {
  //               offset: 1,
  //               color: "rgba(159,201,255,1)" // 100% 处的颜色
  //             }
  //           ]),
  //           width: 4, //尾迹线条宽度
  //           opacity: 0.5, //尾迹线条透明度
  //           curveness: 0.2 //尾迹线条曲直度
  //         }
  //       },
  //       // //提示框信息
  //       // tooltip: {
  //       //   formatter: function(param) {
  //       //     return (
  //       //       param.data.fromName +
  //       //       ">" +
  //       //       param.data.toName +
  //       //       "<br>数量：" +
  //       //       param.data.count
  //       //     );
  //       //   }
  //       // },
  //       data: res //拿到射线的起始点和结束点
  //     }
  //   ]

  //   // series: [
  //   //   {
  //   //     //射线效果图层
  //   //     type: "lines", //类型：射线
  //   //     zlevel: 1, //类似图层效果
  //   //     effect: {
  //   //       show: true,//是否显示图标
  //   //       symbol: "arrow",//箭头图标
  //   //       symbolSize: 5,//图标大小
  //   //       trailLength: 0.02,//特效尾迹长度[0,1]值越大，尾迹越长重
  //   //     },
  //   //     label: {
  //   //       show: true,
  //   //     },
  //   //     lineStyle: {
  //   //       color: "#fff",
  //   //       normal: {
  //   //         color: "#fff",
  //   //         width: 4,//尾迹线条宽度
  //   //         opacity: 0.5,//尾迹线条透明度
  //   //         curveness: 0.1,//尾迹线条曲直度
  //   //       },
  //   //     },
  //   //     //提示框信息
  //   //     tooltip: {
  //   //       formatter: function (param) {
  //   //         return (
  //   //           param.data.fromName +
  //   //           ">" +
  //   //           param.data.toName +
  //   //           "<br>数量：" +
  //   //           param.data.count
  //   //         );
  //   //       },
  //   //     },
  //   //     data: res
  //   //   },
  //   //   {
  //   //     type: "effectScatter",
  //   //     coordinateSystem: "geo", //该系列使用的坐标系
  //   //     mapType: "world",
  //   //     data: data,
  //   //     label: {
  //   //       formatter: (params) => {
  //   //         const { data = {} } = params;
  //   //         return `${data.name} \n ${data.value[2]}%`;
  //   //       },
  //   //       position: "insideLeft", //bottom
  //   //       show: true,
  //   //       color: "#333",
  //   //     },
  //   //     //标记的大小,可以设置数组或者函数返回值的形式，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10。
  //   //     // label: {
  //   //     //   normal: {
  //   //     //     show: true, //省份名显示隐藏
  //   //     //     position: "right", //省份名显示位置
  //   //     //     offset: [5, 0], //省份名偏移设置
  //   //     //     formatter: function (params) {
  //   //     //       //圆环显示省份名
  //   //     //       return params.name;  //这个名字是根据data中的name来显示的
  //   //     //     },
  //   //     //     fontSize: 12,//文字大小
  //   //     //   },
  //   //     //   emphasis: {
  //   //     //     show: true,
  //   //     //   },
  //   //     // },
  //   //     symbolSize: 8,
  //   //     rippleEffect: {
  //   //       //涟漪特效相关配置。
  //   //       brushType: "stroke", //波纹的绘制方式
  //   //     },
  //   //     hoverAnimation: true, //鼠标移入放大圆
  //   //   },
  //   //   // {
  //   //   //   type: "effectScatter",//散点图
  //   //   //   coordinateSystem: "geo",//这个不能删，删了不显示
  //   //   //   zlevel: 1,
  //   //   //   rippleEffect: {
  //   //   //     //涟漪特效
  //   //   //     period: 4, //动画时间，值越小速度越快
  //   //   //     brushType: "stroke", //波纹绘制方式 stroke, fill
  //   //   //     scale: 4, //波纹圆环最大限制，值越大波纹越大
  //   //   //   },
  //   //   //   //设置文字部分
  //   //   //   label: {
  //   //   //     normal: {
  //   //   //       show: true, //省份名显示隐藏
  //   //   //       position: "right", //省份名显示位置
  //   //   //       offset: [5, 0], //省份名偏移设置
  //   //   //       formatter: function (params) {
  //   //   //         //圆环显示省份名
  //   //   //         return params.name;  //这个名字是根据data中的name来显示的
  //   //   //       },
  //   //   //       fontSize: 12,//文字大小
  //   //   //     },
  //   //   //     emphasis: {
  //   //   //       show: true,
  //   //   //     },
  //   //   //   },
  //   //   //   symbol: "circle",//散点图
  //   //   //   symbolSize: 5,//散点大小
  //   //   //   itemStyle: {//散点样式
  //   //   //     normal: {
  //   //   //       show: true,
  //   //   //       color: "#fff",
  //   //   //     },
  //   //   //   },
  //   //   //   data: [
  //   //   //     {
  //   //   //       name: "西藏", value: [87.8695, 31.6846],
  //   //   //     },
  //   //   //     {
  //   //   //       name: "青海", value: [95.2402, 35.4199],
  //   //   //     },
  //   //   //     {
  //   //   //       name: "新疆", value: [86.9023, 41.148],
  //   //   //     }
  //   //   //   ], //处理好后的散点图坐标数组
  //   //   // },

  //   // ],
  // });


  createMap = (initOption) => {
    const dom = document.getElementById(this.props.componentConfig.id);
    const mapChart = echarts.init(dom);
    echarts.registerMap("world", worldJson); // 注册world地图    
    // const options = initOption || this.getOption();
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
        option={options}
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
