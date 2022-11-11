import React from "react";
import EC from "../../../EC";

import * as echarts from "echarts";
import ComponentDefaultConfig from "./config";

import bc from "./bc.png";
import "./index.less";


const InstrumentPanel = (props) => {
  const componentConfig = props.componentConfig || ComponentDefaultConfig;
  const { config } = componentConfig;
  const { data } = componentConfig.staticData;
  // 最新字段
  const finalFieldsArr = props.fields || ["text", "value", "name"];

  // 组件静态或者传入组件的数据
  const originData = props.comData || data;
  // originData中有多项数据，只取第一项
  const firstData = originData[0];
  const titleText = firstData[finalFieldsArr[0]];
  const numberValue = firstData[finalFieldsArr[1]];
  const unitText = firstData[finalFieldsArr[2]];
  // 转换好后要放入 echartOptions->'gauge'项里 作为 data
  const chartData = [{
    value: numberValue,
    name: unitText
  }];

  // 配置主题颜色
  const componentThemeConfig = props.themeConfig;
  const replaceThemeColor = (arr, colorIndex = 0) => {
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
          replaceThemeColor(value, index);
        } else {
          if (type === "color") {
            switch (name) {
              case "themePureColors":
                item.value = componentThemeConfig.pureColors[0];
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
          if (type === "chartText" && name === "labelTextStyle") {
            item.value.color = componentThemeConfig.textColor;
          }
        }
      } else if (Array.isArray(options) && options.length) {
        replaceThemeColor(options, index);
      }
    });
  };
  if (componentThemeConfig) {
    const configOfTheme = JSON.parse(JSON.stringify(config));
    replaceThemeColor(configOfTheme);
    props.onThemeChange({
      id: componentConfig.id,
      name: componentConfig.name,
      moduleName: componentConfig.moduleName,
      moduleVersion: componentConfig.moduleVersion,
      config: configOfTheme
    });
  }

  // 获取config中的配置
  const getTargetConfig = (Arr) => {
    let targetConfig = {};
    Arr.forEach((item) => {
      let { name, value, options, flag, displayName } = item;
      if (Object.prototype.hasOwnProperty.call(item, "value")) {
        // 对 系列一栏 做特殊处理
        if (flag === "specialItem") {
          name = displayName;
        }
        if (Array.isArray(value)) {
          targetConfig[name] = getTargetConfig(value);
        } else {
          targetConfig[name] = value;
        }
      } else if (Array.isArray(options) && options.length) {
        targetConfig[name] = getTargetConfig(options);
      }
    });
    return targetConfig;
  };
  const hadFilterArr = config.filter((item) => item.name !== "dimension");
  const { allSettings } = getTargetConfig(hadFilterArr);
  // console.log('allSettings',allSettings)
  const { innerRadius, outerRadius, radiusSize } = allSettings ? allSettings["表盘"] : {};
  const {
    numberRange,
    numberStyles: { textStylerNumber, offset: numberOffset },
    unitStyles: { textStylerUnit, offset: unitOffset }
  } = allSettings ? allSettings["指标"] : {};
  const { titleStyles: { showTitleStyles, offset, textStyleTitle } } = allSettings ? allSettings["标题"] : {};
  const { axisLine: { axisLineColor } } = allSettings ? allSettings["圆环"] : {};


  const getOption1 = () => ({
    title: {
      show: true,
      text: titleText,
      left: "50%",
      top: "90%",
      textAlign: "center",
      textStyle: {
        color: componentThemeConfig
          ? componentThemeConfig.textColor
          : textStyleTitle.themeTextColor,
        fontSize: textStyleTitle.fontSize,
        fontFamily: textStyleTitle.fontFamily,
        fontWeight: textStyleTitle.bold ? "bold" : "normal",
        fontStyle: textStyleTitle.italic ? "italic" : "normal",
      },
      padding: [offset.vertical, offset.horizontal],
    },
    series: [
      // 基本仪表盘
      {
        type: "gauge",
        radius: radiusSize * 100 + "%",
        z: 2,
        startAngle: 245,
        endAngle: -65,
        center: ["50%", "50%"],
        min: 0,
        max: numberValue * 3,
        // splitNumber: 10,
        detail: {
          valueAnimation: true,
          formatter: function (value) {
            return "{num|" + value + "}";
          },
          rich: {
            num: {
              color: componentThemeConfig
                ? componentThemeConfig.textColor
                : textStylerNumber.themeTextColor,
              fontSize: textStylerNumber.fontSize,
              fontFamily: textStylerNumber.fontFamily,
              fontWeight: textStylerNumber.bold ? "bold" : "normal",
              fontStyle: textStylerNumber.italic ? "italic" : "normal",
            },
          },
          offsetCenter: [numberOffset.horizontal, numberOffset.vertical],
        },
        title: {
          color: componentThemeConfig
            ? componentThemeConfig.textColor
            : textStylerUnit.themeTextColor,
          fontSize: textStylerUnit.fontSize,
          fontFamily: textStylerUnit.fontFamily,
          fontWeight: textStylerUnit.bold ? "bold" : "normal",
          fontStyle: textStylerUnit.italic ? "italic" : "normal",
          offsetCenter: [unitOffset.horizontal, unitOffset.vertical],
        },
        data: chartData,
        axisLine: {
          show: true,
          lineStyle: {
            color: [
              [1, axisLineColor]
            ],
            width: outerRadius * 100
          }
        },
        progress: {
          show: true,
          width: outerRadius * 100,
          itemStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#6648FF" // 0% 处的颜色
                },
                {
                  offset: 0.17,
                  color: "#6648FF" // 100% 处的颜色
                },
                {
                  offset: 0.9,
                  color: "#18FFE5" // 100% 处的颜色
                },
                {
                  offset: 1,
                  color: "#18FFE5" // 100% 处的颜色
                }
              ],
              global: false // 缺省为 false
            }
          }
        },
        pointer: {
          show: true,
          length: "110%",
          width: 6,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              {
                offset: 0,
                color: "rgba(0, 102, 255,0)" // 0% 处的颜色
              },
              {
                offset: 0.5,
                color: "rgba(0, 102, 255,0)"
              },
              {
                offset: 0.7,
                color: "rgba(115, 250, 246,0.3)"
              },
              {
                offset: 1,
                color: "#73faf6"
              }
            ]),
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          show: false
        },
      },
    ]
  });

  const onChartReady = echarts => {
    console.log();
  };
  const onChartClick = (param, echarts) => {
    console.log();
  };
  let onEvents = {
    click: onChartClick
  };
  return (
    <div className='ip-mapping222'>
      <img className='bg-one' src={bc} alt="背景图片" />
      <EC
        option={getOption1()}
        onChartReady={onChartReady}
        onEvents={onEvents}
      />
    </div>
  );

};

export {
  InstrumentPanel,
  ComponentDefaultConfig
};

export default InstrumentPanel;