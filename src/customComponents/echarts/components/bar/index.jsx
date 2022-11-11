import React from "react";
import EC from "../../EC";
import ComponentDefaultConfig from "./config";
import * as echarts from "echarts";

const Bar = (props) => {
  const componentConfig = props.componentConfig || ComponentDefaultConfig;
  const { config } = componentConfig;
  const componentData = props.comData; // 过滤后的数据
  const fieldKey = props.fields;

  const style = config.filter((item) => item.name !== "dimension").reduce((pre, cur) => {
    if (Array.isArray(cur.value)) {
      const obj = cur.value.reduce((p, c) => {
        p[c.name] = c.value;
        return p;
      }, {});
      pre = {
        ...pre,
        ...obj,
      };
    } else {
      pre[cur.name] = cur.value;
    }
    return pre;
  }, {});
  let barXData = [];
  let barYData = [];
  let barYMaxData = [];
  if (componentData && componentData.length) {
    componentData.forEach(item => {
      barXData.push(item[fieldKey[0]]);
      barYData.push(item[fieldKey[1]]);
      barYMaxData.push(0);
    });
  }
  const maxYdata = Math.max(...barYData) + 40;
  barYMaxData.fill(maxYdata, 0, barYData.length);
  let lineY = [];
  let lineT = [];
  for (var i = 0; i < barXData.length; i++) {
    var x = i;
    if (x > 1) {
      x = 2;
    }
    var data = {
      name: barXData[i],
      value: barYData[i],
      barGap: "-100%",
      itemStyle: {
        normal: {
          show: true,
          color: "#91bdec",
          barBorderRadius: 10,
        },
        emphasis: {
          shadowBlur: 15,
          shadowColor: "rgba(0, 0, 0, 0.1)",
        },
      },
    };
    var data1 = {
      value: barYMaxData[0],
      itemStyle: {
        color: "#001235",
        barBorderRadius: 10,
      },
    };
    lineY.push(data);
    lineT.push(data1);
  }
  const getOption = () => {
    const _VerTicalOption = {
      color: ["#3398DB"],
      grid: {
        left: "0%",
        right: "0%",
        bottom: "5%",
        top: "7%",
        height: "85%",
        containLabel: true,
        z: 22,
      },
      xAxis: [
        {
          type: "category",
          gridIndex: 0,
          data: barXData,
          axisTick: {
            alignWithLabel: true,
          },
          axisLabel: {
            interval: 0,
            textStyle: {
              color: "#fff",
            },
          },
          axisLine: {
            lineStyle: {
              color: "#666",
            },
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          gridIndex: 0,
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            color: "rgb(170,170,170)",
            formatter: "{value}",
          },
        },
        {
          type: "value",
          gridIndex: 0,
          splitNumber: 12,
          splitLine: {
            show: false,
            lineStyle: {
              type: "dashed",
              color: "#666"
            }
          },
          axisLine: {
            show: true,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },

        },
      ],
      series: [
        {
          type: "bar",
          barWidth: "30%",
          xAxisIndex: 0,
          yAxisIndex: 0,
          label: {
            normal: {
              show: true,
              position: "top",
              textStyle: {
                color: "#93dfeb",
                fontSize: 20,
              },
            },
          },
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#00feff",
                },
                {
                  offset: 0.5,
                  color: "#027eff",
                },
                {
                  offset: 1,
                  color: "#0286ff",
                },
              ]),
            },
          },
          data: barYData,
          z: 0,
          zlevel: 11,
        },
        {
          type: "pictorialBar",
          barWidth: "30%",
          itemStyle: {
            color: "rgba(0,63,119,1)", //数据的间隔颜色
          },
          symbolRepeat: true,
          symbolMargin: 3,
          symbol: "rect",
          symbolSize: ["100%", 4],
          symbolPosition: "start",
          symbolOffset: ["-16%", 0],
          data: barYData,
          z: 1,
          zlevel: 11,
        },
        {
          name: "背景",
          type: "bar",
          barWidth: "50%",
          xAxisIndex: 0,
          yAxisIndex: 1,
          barGap: "-135%",
          data: barYMaxData,
          itemStyle: {
            normal: {
              color: "rgba(255,255,255,0.1)",
            },
          },
          zlevel: 9,
        },
      ],
    };
    const _HorizontalOption = {
      title: {
        show: false,
      },
      grid: {
        borderWidth: 0,
        top: "10%",
        left: "5%",
        right: "15%",
        bottom: "3%",
      },
      yAxis: [
        {
          type: "category",
          inverse: true,
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
            inside: false,
          },
          data: barXData,
        },
        {
          type: "category",
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: true,
            inside: true,
            verticalAlign: "bottom",
            lineHeight: "40",
            textStyle: {
              color: "#b3ccf8",
              fontSize: "14",
              fontFamily: "PingFangSC-Regular",
            },
          },
          splitArea: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          data: barYData.reverse(),
        },
      ],
      xAxis: {
        type: "value",
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
      },
      series: [
        {
          name: "total",
          type: "bar",
          zlevel: 1,
          barGap: "-100%",
          barWidth: "10px",
          data: lineT,
          legendHoverLink: false,
        },
        {
          name: "bar",
          type: "bar",
          zlevel: 2,
          barWidth: "10px",
          data: lineY,
          label: {
            normal: {
              color: "#b3ccf8",
              show: true,
              position: [0, "-24px"],
              textStyle: {
                fontSize: 16,
              },
              formatter: function (a) {
                return `${a.name}`;
              },
            },
          },
        },
      ],
    };
    return style.direction === "vertical" ? _VerTicalOption : _HorizontalOption;
  };
  const onChartClick = (param, echarts) => {
    console.log(param, echarts);
  };

  const onChartLegendselectchanged = (param, echart) => {
    console.log(param, echart);
  };

  const onChartReady = echarts => {
    console.log("echart is ready", echarts);
  };
  let onEvents = {
    click: onChartClick,
    legendselectchanged: onChartLegendselectchanged
  };
  return (
    <EC
      option={getOption()}
      onChartReady={onChartReady}
      onEvents={onEvents}
    />
  );
};

export {
  Bar,
  ComponentDefaultConfig
};
export default Bar;
