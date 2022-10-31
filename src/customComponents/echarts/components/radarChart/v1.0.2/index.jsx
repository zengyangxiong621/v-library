import React from "react";
import * as echarts from "echarts";
import ComponentDefaultConfig from "./config";
const debounce = (fn, delay = 200) => {
  let timer = null;
  return function () {
    if (timer) clearTimeout(timer); // 因为防抖是最后一次才执行，所以只要timer存在就清除定时器重新赋值
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null;
    }, delay);
  };
};
class RadarChart extends React.PureComponent {
  constructor(props) {
    super(props);
    this.resizeDebounce = debounce(this.chartsResize, 250);
    this.canvasDom = null;
    this.state = {
      chartDom: null
    };
  }
  chartsResize = () => {
    if (this.state.chartDom) {
      this.state.chartDom.resize(); //实例 的resize
    }
  };
  // 将某个配置项的值转成键值对的形式
  formatConfig = (config, exclude) => {
    return config.filter((item) => exclude.indexOf(item.name) == -1).reduce((pre, cur) => {
      if (Array.isArray(cur.value)) {
        const obj = this.formatConfig(cur.value, []);
        pre = {
          ...pre,
          ...obj,
        };
      } else {
        pre[cur.name] = cur.value;
      }
      return pre;
    }, {});
  };
  // 通过name获取config中对应的数据
  getStyleData = (config, name, data = null) => {
    config.forEach(item => {
      if (item.name === name) {
        data = item;
      } else if (Array.isArray(item.options)) {
        let res = this.getStyleData(item.options, name);
        data = res ? res : data;
      } else if (Array.isArray(item.value)) {
        let res1 = this.getStyleData(item.value, name);
        data = res1 ? res1 : data;
      }
    });
    if (data) {
      return data;
    }
  };
  // 数据系列数据处理，
  formatDataSeries(dataSeries, data) {
    let arr = [];
    if (data && data.length) {
      // 默认设置
      let defaultData = {
        name: "名称",
        type: "radar",
        symbol: "circle",
        symbolSize: 0,
        areaStyle: {
          color: "1890FF"
        },
        lineStyle: {
          width: 2,
          color: "#05D5FF",
          type: "solid"
        },
        // itemStyle:{
        //   borderType: 'solid',
        //   borderColor:'1890FF',
        //   borderWidth: 2
        // },
        data: []
      };
      data.map(item => {
        const itemData = dataSeries.value.find(subitem => subitem.value[0].value === item.name);
        let obj = JSON.parse(JSON.stringify(defaultData));
        if (itemData) {
          const dataSeriesConfig = this.formatConfig([itemData], []);
          obj.name = dataSeriesConfig.name;
          obj.areaStyle.color = dataSeriesConfig.areaColor;
          obj.lineStyle = {
            width: dataSeriesConfig.show ? dataSeriesConfig.lineWidth : 0,
            color: dataSeriesConfig.color,
            type: dataSeriesConfig.lineType
          };
          obj.data = [{ value: item.value }];
        } else {
          obj.name = item.name;
          obj.data = [{ value: item.value }];
        }
        arr.push(obj);
      });
    }
    return arr;
  }
  // 设置option
  getOption(config, list) {
    const layoutColor = this.formatConfig([this.getStyleData(config, "layoutColor")], []);
    // 坐标轴
    const circleAxis = this.formatConfig([this.getStyleData(config, "circleAxis")], []);
    // 极轴
    const lineAxis = this.formatConfig([this.getStyleData(config, "lineAxis")], []);
    // 外围字体配置
    const outsideValue = this.formatConfig([this.getStyleData(config, "outsideValue")], []);
    let seriesData = [];
    return {
      backgroundColor: layoutColor.show ? layoutColor.color : "",
      tooltip: {
        //雷达图的tooltip不会超出div，也可以设置position属性，position定位的tooltip 不会随着鼠标移动而位置变化，不友好
        confine: true,
        enterable: true, //鼠标是否可以移动到tooltip区域内
      },
      radar: {
        name: {
          textStyle: {
            fontFamily: outsideValue.fontFamily,
            color: outsideValue.color,
            fontSize: outsideValue.fontSize,
            fontWeight: outsideValue.fontWeight,
          },
        },
        shape: circleAxis.shape,
        center: ["50%", "50%"],
        radius: `${layoutColor.radius}%`,
        startAngle: 90,
        scale: true,
        axisLine: {
          show: lineAxis.show,
          lineStyle: {
            color: lineAxis.axisColor,
            width: lineAxis.thick
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            width: circleAxis.thickness,
            color: circleAxis.fillColor, // 设置网格的颜色
          },
        },
        indicator: list,
        splitArea: {
          show: true,
          areaStyle: {
            color: circleAxis.fillCircleColor
          }
        },
      },
      grid: {
        position: "center",
      },
      polar: {
        center: ["50%", "50%"], // 默认全局居中
        radius: "0%",
      },
      angleAxis: {
        min: 0,
        interval: 5,
        clockwise: false,
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
      radiusAxis: {
        min: 0,
        interval: 20,
        splitLine: {
          show: false,
        },
      },
      series: seriesData,
    };
  }
  // 处理维度数据
  formatChartData(data, config) {
    const { fields } = this.props;
    const wave = this.formatConfig([this.getStyleData(config, "wave")], []);
    const axisLabel = this.formatConfig([this.getStyleData(config, "axisLabel")], []);
    let list = [];
    if (data.length) {
      list = data[0][fields[0]] || [];
      list.map((item, index) => {
        if (!index && axisLabel.show) {
          item.axisLabel = {
            show: true,
            color: axisLabel.axisLabelColor,
            fontSize: axisLabel.fontSize
          };
        }
        item.min = wave.min;
        item.max = wave.max;
      });
    }
    return list;
  }
  componentDidMount() {
    this.initChart();
  }

  initChart() {
    this.canvasDom = document.getElementById(this.props.componentConfig.id);
    const radarChart = echarts.init(this.canvasDom);
    this.setState({
      chartDom: radarChart
    });
  }
  render() {
    const { comData, fields } = this.props;
    const componentConfig = this.props.componentConfig || ComponentDefaultConfig;
    const { config, staticData } = componentConfig;
    const { chartDom } = this.state;
    const dimension = this.formatConfig([this.getStyleData(config, "dimension")], []);
    // 组件静态或者传入组件的数据
    let originData = comData || staticData.data;
    // 数据系类
    if (!originData.length) {
      chartDom.clear();
    } else {
      const dataSeries = this.getStyleData(config, "dataSeries");
      const seriesData = this.formatDataSeries(dataSeries, originData[0][fields[1]]);
      const list = this.formatChartData(originData, config);
      const option = this.getOption(config, list);
      option.series = seriesData;
      if (chartDom && option) {
        chartDom.clear();
        chartDom.setOption(option);
        this.resizeDebounce();
      }
    }
    return (
      <div
        id={this.props.componentConfig.id}
        style={{
          width: dimension.width,
          height: dimension.height
        }}
      />
    );
  }
}

export {
  RadarChart,
  ComponentDefaultConfig
};
export default RadarChart;
