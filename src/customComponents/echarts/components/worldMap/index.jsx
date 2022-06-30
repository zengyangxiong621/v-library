import React from 'react';
// import EC from '../../EC';
import * as echarts from 'echarts';
import worldJson from "@/customComponents/echarts/components/world.json";
import { debounce } from "@/utils/common";
import ComponentDefaultConfig from './config'

let mapChart = null;

// 坐标数据
let coordData = {
  昌平数据中心: [116.249193,40.168238],
  勘探院数据中心: [116.357544,39.992995],
  吉林数据中心: [126.539923,43.941828],
  克拉玛依数据中心: [84.902321,45.580525],
  北京区域中心: [116.536989,39.777354],
  辽河区域中心: [123.479261,41.79233],
  吉林区域中心: [126.567982,43.823481],
  大庆区域中心: [125.268447,45.704549],
  西安区域中心: [108.979039,34.273485],
  兰州区域中心: [103.672554,36.505049],
  新疆区域中心: [87.520211,43.860104],
  西南区域中心: [104.098755,30.678152],
  华南区域中心: [113.341111,23.02494],
  华东区域中心: [120.186041,30.290762],
  大连区域中心: [121.673286,38.928873],
  美国: [-93.310319, 36.908779],
  丹麦: [9.1577, 56.1388,],
  瑞士: [8.6649, 47.5276]
}
// 飞线点数据
let flyLineArr = [
  [
    {
      name: '昌平数据中心',
      value: 0,
    },
  ],
  [
    {
      name: '勘探院数据中心',
      value: 0,
    },
  ],
  [
    {
      name: '吉林数据中心',
      value: 0,
    },
  ],
  [
    {
      name: '克拉玛依数据中心',
      value: 0,
    },
  ],
  [
    {
      name: '北京区域中心',
      value: 5,
    },
  ],
  [
    {
      name: '辽河区域中心',
      value: 1,
    },
  ],
  [
    {
      name: '吉林区域中心',
      value: 1,
    },
  ],
  [
    {
      name: '大庆区域中心',
      value: 1,
    },
  ],
  [
    {
      name: '西安区域中心',
      value: 1,
    },
  ],
  [
    {
      name: '兰州区域中心',
      value: 1,
    },
  ],
  [
    {
      name: '新疆区域中心',
      value: 1,
    },
  ],
  [
    {
      name: '西南区域中心',
      value: 1,
    },
  ],
  [
    {
      name: '华南区域中心',
      value: 1,
    },
  ],
  [
    {
      name: '华东区域中心',
      value: 1,
    },
  ],
  [
    {
      name: '大连区域中心',
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
    let toCoord = [116.536989,39.777354] //中心点地理坐标
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

let centerPoint = '北京区域中心' // 中心点
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
            return params.data.name //圆环显示文字
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
