import React from "react";
import EC from "components/Charts/ECharts/EC";
import * as echarts from "echarts";
// import worldJson from "echarts/map/json/world.json";
import nameMap from "./nameMap.json";
import worldJson from "../../../components/charts/echarts/components/world4.json"; //自定义的地图文件   世界地图+中国各省地图
import debounce from 'lodash/debounce';

// import 'echarts/lib/chart/map';
// import 'echarts/lib/component/tooltip';
// import 'echarts/lib/component/title';
// require('echarts/map/js/world.js');

const data = [
  //散点数据  value:[纬度，经度，数据]
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

const symbolSize = {
  small: false, //小号图标
  large: true, //大号图标
  no: false, //没有图标
};

let mapChart = null;

export default class MapChart extends React.PureComponent {
  constructor(props) {
    super(props);
    // debounce是防抖方法
    this.resizeDebounce = debounce(this.chartsResize, 250);
  }

  componentDidMount() {
    mapChart = this.createMap();
    // 监听浏览器resize
    window.addEventListener("resize", this.resizeDebounce);
  }

  componentWillUnmount() {
    // 别忘了取消监听
    window.removeEventListener("resize", this.resizeDebounce);
  }

  chartsResize = () => {
    if (mapChart) {
      mapChart.resize(); //实例 的resize
    }
  };

  getOption = () => {
    return {
      backgroundColor: "#fff",
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
        emphasis: {
          //高亮状态下的多边形和标签样式。
          label: {
            //文本
            // color: '#ADA',
            show: true,
          },
          itemStyle: {
            //区域
            areaColor: "#ccc",
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
          color: "#fff",
        },
        textStyle: {
          color: "#000",
        },
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
    };
  };

  createMap = (initOption) => {
    const dom = document.getElementById("chart");
    const mapChart = echarts.init(dom);

    echarts.registerMap("world", worldJson); /* 注册world地图 */
    const options = initOption || this.getOption();
    mapChart.setOption(options);
    mapChart.on("georoam", () => {
      // 监听地图缩放事件
      const { center, zoom } = mapChart.getOption().geo[0];

      // 这个缩放范围是自己定的
      if ((zoom > 2 && zoom < 6) || zoom === 2) {
        if (!symbolSize.small) {
          const option = this.getOption();
          // 重新设置图标大小和 当前的缩放比例 视图中心
          option.series[0].symbolSize = 2;
          option.series[0].label.fontSize = 8;
          option.geo.zoom = zoom;
          option.geo.center = center;
          this.createMap(option);
          symbolSize.small = true;
          symbolSize.large = false;
          symbolSize.no = false;
        }
      } else if ((zoom > 0 && zoom < 2) || zoom === 0) {
        if (!symbolSize.no) {
          const option = this.getOption();
          option.series[0].symbolSize = 0;
          option.geo.zoom = zoom;
          option.geo.center = center;
          this.createMap(option);
          symbolSize.small = false;
          symbolSize.large = false;
          symbolSize.no = true;
        }
      } else {
        if (!symbolSize.large) {
          const option = this.getOption();
          option.series[0].symbolSize = 10;
          option.series[0].label.fontSize = 14;
          option.geo.zoom = zoom;
          option.geo.center = center;
          this.createMap(option);
          symbolSize.small = false;
          symbolSize.large = true;
          symbolSize.no = false;
        }
      }
    });
    return mapChart;
  };

  render() {
    return <EC option={this.getOption()} />;
    //return ( <div id="chart" ></div> )

  }
}
