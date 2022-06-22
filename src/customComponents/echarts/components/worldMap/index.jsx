import React from 'react';
import EC from '../../EC';
import * as echarts from 'echarts';
import worldJson from "@/customComponents/echarts/components/world.json";
import debounce from 'lodash/debounce';
import ComponentDefaultConfig from './config'


//散点数据  value:[纬度，经度，数据]
const data = [
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

let mapChart = null;

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
        text: "世界地图",
        left: "left",
        textStyle: {
          fontSize: 16,
          fontWeight: "bold",
          marginLeft: 10,
        },
      },
      //地理坐标系组件用于地图的绘制，支持在地理坐标系上绘制散点图，线集。
      //要显示散点图，必须填写这个配置
      geo: {
        show: true, //是否显示地理坐标系组件
        roam: true, //是否允许鼠标滚动放大，缩小
        map: "world",
        itemStyle: {
          normal: {
            areaColor: '#00BCFF',
            shadowColor: '#00BCFF',
            shadowBlur: 1,
            shadowOffsetX: 0,
            shadowOffsetY: 5,
            color: '#00BCFF',
          }
        },
        emphasis: {
          //高亮状态下的多边形和标签样式。
          label: {
            //文本
            // color: '#ADA',
            show: true,
          },
          itemStyle: {
            //区域
            areaColor: "#f60",
          },
        },
        center: [100.4, 35.9], //视图中心，展示在中国
        zoom: 6, //起始缩放比例
        // nameMap: nameMap, //世界各国名中英文对应
      },
      tooltip: {
        show: true,
        formatter: function (params) {
          return `${params.name}  ${params.value[2]}%`;
        },
      },
      //是视觉映射组件，用于进行『视觉编码』，也就是将数据映射到视觉元素（视觉通道）。
      visualMap: {
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
            formatter: (params) => {
              const { data = {} } = params;
              return `${data.name} \n ${data.value[2]}%`;
            },
            position: "insideLeft", //bottom
            show: true,
            color: "#333",
          },
          //标记的大小,可以设置数组或者函数返回值的形式，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10。
          symbolSize: 8,
          rippleEffect: {
            //涟漪特效相关配置。
            brushType: "stroke", //波纹的绘制方式
          },
          hoverAnimation: true, //鼠标移入放大圆
        },
      ],
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
