import React from "react";
import ComponentDefaultConfig from "./config";
import EC from "../../../EC";

const Indicatorcard = (props) => {
  const componentConfig = props.componentConfig || ComponentDefaultConfig;
  const { config } = componentConfig;
  const { data } = componentConfig.staticData;

  const fieldKey = props.fields || ["value", "color"];
  // 组件静态或者传入组件的数据
  const originData = props.comData || data;
  // 根据对应的字段来转换data数据
  const finalData = Array.isArray(originData) ? originData.map(item => {
    return {
      value: item[fieldKey[0]],
      // color: item[fieldKey[1]]
    };
  }) : [];

  const { value } = (finalData.length && finalData[0]) || {};
  const percent = value || 0;
  // 获取 右侧需要 配置的项
  const getConfig = (Arr) => {
    const targetConfig = {};
    Arr.filter(item => item.name !== "dimension").forEach(({ name, value }) => {
      if (Array.isArray(value)) {
        value.forEach(({ name, value }) => {
          targetConfig[name] = value;
        });
      } else {
        targetConfig[name] = value;
      }
    });
    return targetConfig;
  };
  const { circleColor, fontSize, italic, letterSpacing, bold, fontFamily, lineHeight, textColor, circleWidth, dangerLevel } = getConfig(config);
  const gaugeData = [
    {
      value: percent,
      name: dangerLevel,
    },
  ];

  const getOption = () => (
    {
      series: [
        {
          type: "gauge",
          radius: "100%",
          startAngle: 90,
          endAngle: -270,
          pointer: {
            show: false
          },
          progress: {
            show: true,
            overlap: false,
            roundCap: true,
            clip: false,
            itemStyle: {
              borderWidth: 1,
              borderColor: circleColor,
              color: circleColor,
            }
          },
          axisLine: {
            lineStyle: {
              width: circleWidth, // 环形宽度 
              color: [[1, "#2e385f"]] // 环图背景色
            }
          },
          splitLine: {
            show: false,
            distance: 0,
            length: 10
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false,
            distance: 50
          },
          data: gaugeData,
          title: {
            offsetCenter: ["0%", "30%"],
            fontSize: fontSize,
            fontStyle: italic ? "italic" : "normal",
            fontWeight: bold ? "bold" : "normal",
            letterSpacing: letterSpacing,
            color: "#fff",
            fontFamily: fontFamily,
          },
          detail: { // 环内百分比样式
            width: 50,
            height: 18,
            color: circleColor,
            fontSize: fontSize,
            fontStyle: italic ? "italic" : "normal",
            fontWeight: bold ? "bold" : "normal",
            letterSpacing: letterSpacing,
            formatter: "{value}%",
            valueAnimation: true,
            offsetCenter: ["0%", "-20%"],
            fontFamily: fontFamily,
          }
        },
      ]
    }
  );

  const onChartReady = echarts => {
    // console.log('echart is ready', echarts);
  };
  const onChartClick = (param, echarts) => {
    console.log(param);
  };
  let onEvents = {
    click: onChartClick
  };
  let size = {
    width: "100%",
    height: "100%"
  };
  return (
    <EC
      size={size}
      option={getOption()}
      onChartReady={onChartReady}
      onEvents={onEvents}
    />
  );
};

export {
  Indicatorcard,
  ComponentDefaultConfig
};

export default Indicatorcard;