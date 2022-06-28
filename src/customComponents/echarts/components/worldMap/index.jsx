import React from 'react';
// import EC from '../../EC';
import * as echarts from 'echarts';
import worldJson from "@/customComponents/echarts/components/world.json";
import { debounce } from "@/utils/common";
import ComponentDefaultConfig from './config'

let mapChart = null;

// 坐标数据
let coordData = {
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
  美国: [-93.310319, 36.908779],
  丹麦: [9.1577, 56.1388,],
  瑞士: [8.6649, 47.5276]
}
// 飞线点数据
let flyLineArr = [
  [
    {
      name: '内蒙古',
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
  [
    {
      name: '美国',
      value: 0,
    },
  ],
  [
    {
      name: '丹麦',
      value: 0,
    },
  ],
  [
    {
      name: '瑞士',
      value: 0,
    },
  ],
]
// 转换飞线
let convertData = function (data) {
  let res = []
  for (let i = 0; i < data.length; i++) {
    let dataItem = data[i]
    let fromCoord = coordData[dataItem[0].name]
    let toCoord = [108.384366, 30.439702] //中心点地理坐标
    if (fromCoord && toCoord) {
      res.push([
        {
          coord: toCoord, // 飞线从哪里出发
        },
        {
          coord: fromCoord, // 飞线去往哪里
          value: dataItem[0].value,
        },
      ])
    }
  }
  return res
}

let centerPoint = '重庆' // 中心点
let series = [];
[[centerPoint, flyLineArr]].forEach(function (item, i) {
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
          name: dataItem[0].name,
          value: coordData[dataItem[0].name].concat([dataItem[0].value]),
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
          value: coordData[item[0]].concat([10]),
        },
      ],
    }
  )
})
let options = {
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
    this.resizeDebounce = debounce(this.chartsResize, 250);
  }

  componentDidMount() {
    mapChart = this.createMap();
    window.addEventListener("resize", this.resizeDebounce);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeDebounce);
  }

  chartsResize = () => {
    if (mapChart) {
      mapChart.resize(); //实例 的resize
    }
  };

  createMap = () => {
    const dom = document.getElementById(this.props.componentConfig.id);
    const mapChart = echarts.init(dom);
    echarts.registerMap("world", worldJson);
    mapChart.setOption(options);
    return mapChart;
  };

  onChartClick = (param, echarts) => {
    console.log(param, echarts);
  };

  onChartReady = echarts => {
    console.log('echart is ready', echarts);
  };

  render() {
    let onEvents = {
      click: this.onChartClick,
    };
    let mapSize = {
      width: '1000px',
      height: '600px'
    };

    return (
      <div
        id={this.props.componentConfig.id}
        style={mapSize}
        option={options}
        onChartReady={this.onChartReady}
        onEvents={onEvents}
      />
    );
  }
}

export {
  WorldMap,
  ComponentDefaultConfig
}
export default WorldMap
