import React from "react";
import * as echarts from "echarts";
import ComponentDefaultConfig from "./config";
import { nodes, labelNodes, linesData, dashedLinesData, bgImage } from "./dataConfig.js";
class FlowChart extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      myChart: null,
    };
  }

  remToPx = (res) => {
    const componentConfig = this.props.componentConfig || ComponentDefaultConfig;
    const { config } = componentConfig;
    const dimension = this.formatConfig([this.getStyleData(config, "dimension")], []);
    const clientWidth = dimension.width;
    if (!clientWidth) return;
    const fontSize = 100 * (clientWidth / 1920);
    return res * fontSize;
  };

  componentDidMount() {
    this.initChart();
  }

  // 格式化获取
  formatCustom = (config) => {
    let obj = {};
    config.value.map((item) => {
      obj[item.key] = {};
      item.value.map((subItem) => {
        obj[item.key][subItem.name] = subItem.value;
      });
    });
    return obj;
  };

  // 修改默认数据颜色
  formatDefaultData(nodes, labelNodes, linesData, dashedLinesData, changeColor, config) {
    // const labelOffset = this.getStyleData(config, "labelOffset")
    //   ? this.formatConfig([this.getStyleData(config, "labelOffset")], [])
    //   : {};
    // console.log(labelOffset, "labelOffset");
    nodes.map((item) => {
      if (item.type) {
        item.startColor = changeColor[item.type].nodeStartColor;
        item.endColor = changeColor[item.type].nodeEndColor;
      }
    });
    labelNodes.map((item) => {
      if (item.type) {
        item.bgColor = changeColor[item.type].labelBgColor;
      }
    });
    linesData.map((item) => {
      if (item.type) {
        item.lineColor = changeColor[item.type].lineColor;
      }
    });
  }
  getgGraphOptions = (options, config) => {
    // 下钻-- 请求回来的数据可能时错误体(error对象),暂时这样兼容一哈
    options = Array.isArray(options) ? options : [];
    const { fields } = this.props;
    // 标签文字
    const labelFont = this.formatConfig([this.getStyleData(config, "labelFont")], []).labelFont;
    const nodeFont = this.formatConfig([this.getStyleData(config, "nodeFont")], []).nodeFont;
    const warningConfig = this.formatConfig([this.getStyleData(config, "warningConfig")], []);
    const customColumnConfig = config.find((item) => item.name === "customColumn");
    const customColumndata = this.formatCustom(customColumnConfig);
    // 获取获取设置标签的大小
    const labelSize = this.getStyleData(config, "labelSize")
      ? this.formatConfig([this.getStyleData(config, "labelSize")], [])
      : null;
    // 修改node,labelNodes,linesData,dashedLinesData
    this.formatDefaultData(nodes, labelNodes, linesData, dashedLinesData, customColumndata);
    const charts = {
      nodes: [],
      labelNodes: [],
      linesData: [],
      dashedLinesData,
    };
    const backgroundColor = this.formatConfig([this.getStyleData(config, "backgroundColor")], [])
      .backgroundColor;
    for (let j = 0; j < nodes.length; j++) {
      const { x, y, nodeName, type, svgPath, symbolSize, startColor, endColor } = nodes[j];
      const match =
        Array.isArray(options) &&
        options.find((item) => item[fields[0]] === nodeName && item[fields[1]] === type);
      // 是否告警
      const sColor = match && match[fields[3]] ? warningConfig.nodeStartColor : startColor;
      const eColor = match && match[fields[3]] ? warningConfig.nodeEndColor : endColor;
      var node = {
        nodeName,
        value: [x, y],
        symbolSize: symbolSize || this.remToPx(1.34),
        symbol: "path://M737 122.289H287L62 512l225 389.711h450L962 512z",
        symbolKeepAspect: true,
        label: {
          position: "inside",
          color: nodeFont.color,
          fontWeight: nodeFont.fontWeight,
          fontSize: nodeFont.fontSize,
          fontFamily: nodeFont.fontFamily,
          type,
        },
        itemStyle: {
          color: {
            type: "radial", // 径向渐变
            x: 0.5, // 圆心坐标（中心）
            y: 0.5,
            r: 1, // 半径长度
            colorStops: [
              {
                offset: 0,
                color: sColor || "#3887de", // 0% 处的颜色
              },
              {
                offset: 1,
                color: eColor || "#cae3fe", // 100% 处的颜色
              },
            ],
          },
          shadowBlur: this.remToPx(0.03),
          shadowColor: sColor,
        },
      };
      charts.nodes.push(node);
    }
    for (let i = 0; i < labelNodes.length; i++) {
      let { x, y, name, bgColor, type, customData } = labelNodes[i];
      customData.count_unit = "";
      customData.rate_unit = "";
      const matchNode = options.find(
        (item) => item[fields[0]] === name && item[fields[1]] === type
      );
      customData =
        matchNode && matchNode[fields[2]]
          ? JSON.parse(JSON.stringify(matchNode[fields[2]]))
          : customData;
      var node = {
        nodeName: name,
        value: [x, y],
        symbolSize: labelSize
          ? [labelSize.labelWidth, labelSize.labelHeight]
          : [this.remToPx(1.6), this.remToPx(0.7)],
        symbol: "rect",
        itemStyle: {
          color: bgColor, // 注释的背景颜色
          type,
          ...customData,
        },
      };
      charts.labelNodes.push(node);
    }

    for (let j = 0; j < linesData.length; j++) {
      const { type, coords } = linesData[j];
      const match = options.find((item) => item[fields[1]] === type);
      // 是否告警
      const lineColor =
        match && match[fields[4]] ? warningConfig.lineColor : linesData[j].lineColor;
      const label = {
        coords,
        lineStyle: {
          type: linesData[j].lineType || "solid",
          width: 3,
          color: lineColor || "blue",
          curveness: 0.8,
          join: "round",
        },
      };
      charts.linesData.push(label);
    }

    return {
      backgroundColor,
      grid: {
        left: "5%",
        right: "5%",
        bottom: "5%",
        top: "12%",
        containLabel: true,
      },
      xAxis: {
        min: 0,
        max: 1800,
        show: false,
        type: "value",
      },
      yAxis: {
        min: 0,
        max: 600,
        show: false,
        type: "value",
      },
      series: [
        {
          type: "lines",
          polyline: true,
          coordinateSystem: "cartesian2d",
          data: charts.linesData,
        },
        {
          type: "lines",
          polyline: true,
          coordinateSystem: "cartesian2d",
          animation: false,
          effect: {
            show: true,
            trailLength: 0.1,
            symbol: "circle",
            symbolSize: 6,
            constantSpeed: 100,
          },
          zlevel: 0,
          data: charts.linesData,
        },
        {
          type: "graph",
          coordinateSystem: "cartesian2d",
          label: {
            show: true,
            position: "bottom",
            color: "yellow",
            formatter(item) {
              return item.data.nodeName;
            },
          },
          data: charts.nodes,
        },
        {
          type: "graph",
          coordinateSystem: "cartesian2d",
          zlevel: 2,
          label: {
            show: true,
            position: 'inside',
            distance:0,
            color: labelFont.color, // 标签字体颜色
            fontSize: labelFont.fontSize,
            fontFamily: labelFont.fontFamily,
            fontWeight: labelFont.fontWeight,
            lineHeight: 20,
            width: labelSize.labelWidth,
            height: labelSize.labelHeight,
            backgroundColor: {  // 处理标签背景图
              image: bgImage
            },
            formatter(item) {
              const { count, rate, type, count_unit, rate_unit } = item.data.itemStyle;
              if (type === "send") {
                return `发送量：${count}${count_unit}条\n发送速率：${rate}${rate_unit}条/秒`;
              }
              if (type === "access") {
                return `接入量：${count}${count_unit}条\n接入速率：${rate}${rate_unit}条/秒`;
              }
              if (type === "forward") {
                return `转发量：${count}${count_unit}条\n转发速率：${rate}${rate_unit}条/秒`;
              }
              if (type === "process") {
                return `加工量：${count}${count_unit}条\n加工速率：${rate}${rate_unit}条/秒`;
              }
            },
          },
          data: charts.labelNodes,
        },
        {
          type: "lines",
          polyline: true,
          coordinateSystem: "cartesian2d",
          data: charts.dashedLinesData.map((item) => ({
            ...item,
            lineStyle: {
              type: item.lineType || "solid",
              width: 3,
              color: item.lineColor || "blue",
              curveness: 0.8,
              join: "round",
            },
          })),
        },
      ],
    };
  };

  getOptions() {
    const { comData, fields } = this.props;
    const componentConfig = this.props.componentConfig || ComponentDefaultConfig;
    const { config, staticData } = componentConfig;
    // 组件静态或者传入组件的数据
    let originData = comData || staticData.data;
    const options = this.getgGraphOptions(originData, config);
    return options;
  }

  initChart() {
    const dom = document.getElementById(`${this.props.componentConfig.id}`);
    const myChart = echarts.init(dom);
    myChart.setOption(this.getOptions());
    this.setState({
      myChart,
    });
  }

  // 通过name获取config中对应的数据
  getStyleData = (config, name, data = null) => {
    config.forEach((item) => {
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

  // 将某个配置项的值转成键值对的形式
  formatConfig = (config, exclude) => {
    return config
      .filter((item) => exclude.indexOf(item.name) == -1)
      .reduce((pre, cur) => {
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

  render() {
    const { myChart } = this.state;
    const { comData, fields } = this.props;
    const componentConfig = this.props.componentConfig || ComponentDefaultConfig;
    const { config, staticData } = componentConfig;
    const dimension = this.formatConfig([this.getStyleData(config, "dimension")], []);
    if (myChart) {
      myChart.resize();
      myChart.setOption(this.getOptions());
    }
    return (
      <div
        className="flow-chart"
        id={this.props.componentConfig.id}
        style={{
          width: dimension.width,
          height: dimension.height,
        }}
      ></div>
    );
  }
}

export { FlowChart, ComponentDefaultConfig };
export default FlowChart;
