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
    const { componentThemeConfig } = this.props;
    let arr = [];
    if (data && data.length) {
      // 默认设置
      let defaultData = {
        name: "名称",
        type: "radar",
        symbol: "circle",
        symbolSize: 0,
        areaStyle: {
          color: "#1890FF"
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
      data.map((item, index) => {
        const itemData = dataSeries.value.find(subitem => subitem.value[0].value === item.name);
        let obj = JSON.parse(JSON.stringify(defaultData));
        if (itemData) {
          const dataSeriesConfig = this.formatConfig([itemData], []);
          obj.name = dataSeriesConfig.name;
          obj.areaStyle.color = itemData.value[1].value;
          obj.lineStyle = {
            width: dataSeriesConfig.show ? dataSeriesConfig.lineWidth : 0,
            color: componentThemeConfig ? componentThemeConfig.pureColors[index % 7] : dataSeriesConfig?.themePureColor || "#1890ff",
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
    const componentThemeConfig = this.props.themeConfig;
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
            color: componentThemeConfig ? componentThemeConfig.textColor : outsideValue?.themeTextColor || "#fff",
            fontSize: outsideValue.fontSize,
            fontWeight: outsideValue.fontWeight,
          },
        },
        shape: circleAxis.shape,
        center: ["50%", "50%"],
        radius: `${layoutColor.show ? layoutColor.radius : 50}%`,
        startAngle: 90,
        scale: true,
        axisLine: {
          show: lineAxis.show,
          lineStyle: {
            color: componentThemeConfig ? componentThemeConfig.assistColor : lineAxis?.themeAssistColor || "#1b3483",
            width: lineAxis.thick
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            width: circleAxis.thickness,
            color: componentThemeConfig ? componentThemeConfig.assistColor : circleAxis?.themeAssistColor || "#1b3483", // 设置网格的颜色
          },
        },
        indicator: list,
        splitArea: {
          show: true,
          areaStyle: {
            color: componentThemeConfig ? componentThemeConfig.gridColor : circleAxis?.themeGridColor || "#042075",
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
    const componentThemeConfig = this.props.themeConfig;
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
            color: componentThemeConfig ? componentThemeConfig.textColor : axisLabel?.themeTextColor || "#fff",
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

  componentDidUpdate(prevProps){
    if(JSON.stringify(prevProps.comData) !== JSON.stringify(this.props.comData)){
      this.props.onChange && this.props.onChange(this.props.comData)
    }
  }

  initChart() {
    this.canvasDom = document.getElementById(this.props.componentConfig.id);
    const radarChart = echarts.init(this.canvasDom);
    this.setState({
      chartDom: radarChart
    });
  }
  // 改变颜色
  changeThemeColor = (arr, color) => {
    arr.map(item => {
      if (item.type === "color") {
        item.value = color;
      }
    });
  };
  replaceThemeColor = (arr, colorIndex = 0) => {
    const componentThemeConfig = this.props.themeConfig;
    arr.forEach((item) => {
      let index = colorIndex || 0;
      let { name, value, options, flag, type, key } = item;
      if (Object.prototype.hasOwnProperty.call(item, "value")) {
        // 对 系列一栏 做特殊处理
        if (flag === "specialItem") {
          try {
            index = key ? parseInt(key) - 1 : 0;
          } catch (e) {
            index = 0;
          }
        }
        if (Array.isArray(value)) {
          this.replaceThemeColor(value, index);
        } else {
          if (type === "color") {
            switch (name) {
              case "themePureColor":
                item.value = componentThemeConfig.pureColors[index % 7];
                break;
              case "themeGradientColorStart":
                item.value = componentThemeConfig.gradientColors[index % 7].find(item => item.offset === 0).color;
                break;
              case "themeGradientColorEnd":
                item.value = componentThemeConfig.gradientColors[index % 7].find(item => item.offset === 100).color;
                break;
              case "themeTextColor":
                item.value = componentThemeConfig.textColor;
                break;
              case "themeAssistColor":
                item.value = componentThemeConfig.assistColor;
                break;
              case "themeGridColor":
                item.value = componentThemeConfig.gridColor;
                break;
              default:
                break;
            }
          }
        }
      } else if (Array.isArray(options) && options.length) {
        this.replaceThemeColor(options, index);
      }
    });
  };
  handleClick = (e) => {
    this.props.onClick && this.props.onClick(e, this.props.comData);
  };
  handleMouseEnter = (e) => {
    this.props.onMouseEnter && this.props.onMouseEnter(e, this.props.comData);
  };
  handleMouseLeave = (e) => {
    this.props.onMouseEnter && this.props.onMouseLeave(e, this.props.comData);
  };

  render() {
    const { comData, fields, themeConfig } = this.props;
    const componentConfig = this.props.componentConfig || ComponentDefaultConfig;
    const { config, staticData } = componentConfig;
    const { chartDom } = this.state;
    const configOfTheme = JSON.parse(JSON.stringify(config));
    if (themeConfig) {
      this.replaceThemeColor(configOfTheme);
      this.props.onThemeChange({
        id: componentConfig.id,
        name: componentConfig.name,
        moduleName: componentConfig.moduleName,
        moduleVersion: componentConfig.moduleVersion,
        config: configOfTheme
      });
    }
    const dimension = this.formatConfig([this.getStyleData(config, "dimension")], []);
    // 组件静态或者传入组件的数据
    let originData = comData || staticData.data;
    // 数据系类
    if (!originData.length) {
      chartDom.clear();
    } else {
      const dataSeries = this.getStyleData(themeConfig ? configOfTheme : config, "dataSeries");
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
        onClick={this.handleClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
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
