import React, {useEffect} from "react";
import EC from "../../../EC";

import * as echarts from "echarts";
import ComponentDefaultConfig from "./config";
// import bottom from './bottom.png';


const InstrumentPanel = (props) => {
  const componentConfig = props.componentConfig || ComponentDefaultConfig;
  const { config } = componentConfig;
  const { data } = componentConfig.staticData;
  // 最新字段
  const finalFieldsArr = props.fields || ["text", "value"];

  // 组件静态或者传入组件的数据
  const originData = props.comData || data;
  // originData中有多项数据，只取第一项
  const firstData = originData[0];
  const titleText = firstData === undefined ? "" : firstData[finalFieldsArr[0]];
  const numberValue = firstData === undefined ? 0 : firstData[finalFieldsArr[1]];
  const chartData = [{
    value: numberValue,
    // name: "Percent"
  }];

  useEffect(() => {
    props.onDataChange && props.onDataChange(originData);
  }, [originData]);

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
              case "barColor":
                item.value = componentThemeConfig.pureColors[index % 7];
                break;
              case "colorOne":
                item.value = componentThemeConfig.gradientColors[0][0].color;
                break;
              case "colorTwo":
                item.value = componentThemeConfig.gradientColors[0][1].color;
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
          if (type === "chartText" && name === "textStyleAxisLabel") {
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
  const { innerRadius, outerRadius, axisLine: { axisLineColor }, progress: { colorOne, colorTwo } } = allSettings ? allSettings["圆环"] : {};
  const { numberRange: { min, max }, numberStyles: { textStylerNumbe, offset: numberOffset },
    unitStyles: { textStyleUnit, padding }, axisLabelStyles: { textStyleAxisLabel }
  } = allSettings ? allSettings["指标"] : {};
  const { offset, textStyleTitle } = allSettings ? allSettings["标题"] : {};


  const getOption1 = () => ({
    title: {
      show: true,
      text: titleText,
      left: "50%",
      top: "60%",
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
      {
        type: "gauge",
        radius: "85%",
        center: ["50%", "50%"],
        startAngle: 225,
        endAngle: -45,
        min,
        max,
        splitNumber: 1,
        z: 3,
        detail: {
          valueAnimation: true,
          formatter: function (value) {
            return "{num|" + value + "}" + "{unit|%}";
          },
          rich: {
            num: {
              color: componentThemeConfig
                ? componentThemeConfig.textColor
                : textStylerNumbe.themeTextColor,
              fontSize: textStylerNumbe.fontSize,
              fontFamily: textStylerNumbe.fontFamily,
              fontWeight: textStylerNumbe.bold ? "bold" : "normal",
              fontStyle: textStylerNumbe.italic ? "italic" : "normal",
            },
            unit: {
              color: componentThemeConfig
                ? componentThemeConfig.textColor
                : textStyleUnit.themeTextColor,
              fontSize: textStyleUnit.fontSize,
              fontFamily: textStyleUnit.fontFamily,
              fontWeight: textStyleUnit.bold ? "bold" : "normal",
              fontStyle: textStyleUnit.italic ? "italic" : "normal",
              padding: [padding.top, padding.right, padding.bottom, padding.left],
            },
          },
          offsetCenter: [numberOffset.horizontal, numberOffset.vertical],
        },
        data: chartData,
        progress: {
          show: true,
          width: outerRadius * 100,
          itemStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: componentThemeConfig ?
                    componentThemeConfig.gradientColors[0][0].color
                    : colorOne // 0% 处的颜色
                },

                {
                  offset: 1,
                  color: componentThemeConfig ?
                    componentThemeConfig.gradientColors[0][1].color
                    : colorTwo // 100% 处的颜色
                }
              ],
              global: false // 缺省为 false
            }
          }
        },
        axisLine: {
          lineStyle: {
            width: outerRadius * 100,
            color: [[1, axisLineColor]]
          }
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          length: -60,
          lineStyle: {
            color: "#FFFFFF",
            width: 0,
            type: "solid",
          },
        },
        axisLabel: {
          show: true,
          formatter: function (value) { return value; },
          fontSize: textStyleAxisLabel.fontSize,
          color: textStyleAxisLabel.color,
          fontFamily: textStyleAxisLabel.fontFamily,
          fontWeight: textStyleAxisLabel.fontWeight
        },
        pointer: {
          show: false
        },
        anchor: {
          show: false
        },
        title: {
          show: false
        }
      },
      {
        type: "gauge",
        radius: "95%",
        center: ["50%", "50%"],
        startAngle: 270,
        endAngle: -90,
        min: 0,
        max: 100,
        axisLine: {
          show: true,
          lineStyle: {
            width: outerRadius * 100 + 30,
            color: [
              [1, {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0, color: "rgba(0, 35, 124,0.8)" // 0% 处的颜色
                  },
                  {
                    offset: 0.5, color: "rgba(0, 35, 124,0.5)" // 0% 处的颜色
                  },
                  {
                    offset: 0.9, color: "rgba(0, 35, 124,0)" // 0% 处的颜色
                  },
                  {
                    offset: 1, color: "rgba(0, 35, 124,0)" // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }]
            ]
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
        detail: {
          show: false
        },
        progress: {
          show: false,
        },
        pointer: {
          show: false
        },
      },
      {
        type: "gauge",
        radius: innerRadius * 100 + "%",
        center: ["50%", "50%"],
        startAngle: 270,
        endAngle: -90,
        min: 0,
        max: 100,
        // title:{
        //   show:true,
        //   offsetCenter:[0, '120%'],
        //   backgroundColor: {
        //     image: bottom
        //   },
        //   width:330,
        //   height:120,
        // },
        data: [{
          value: 100
        }],
        axisLine: {
          show: true,
          lineStyle: {
            width: 3,
            color: [
              [1, {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0, color: "rgba(64, 161, 242,0.5)" // 0% 处的颜色
                  },
                  {
                    offset: 0.5, color: "rgba(64, 161, 242,0.1)" // 0% 处的颜色
                  },
                  {
                    offset: 0.8, color: "rgba(64, 161, 242,0)" // 0% 处的颜色
                  },
                  {
                    offset: 1, color: "rgba(64, 161, 242,0)" // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }]
            ]
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
        detail: {
          show: false
        },
        progress: {
          show: false,
        },
        pointer: {
          show: false
        },
      }
    ]
  });

  const onChartReady = echarts => {
    console.log();
  };
  const onChartClick = (params, echarts) => {
    console.log();
  };


  const handleClick = (e) => {
    props.onClick && props.onClick(e, props.comData);
  };
  const handleMouseEnter = (e) => {
    props.onMouseEnter && props.onMouseEnter(e, props.comData);
  };
  const handleMouseLeave = (e) => {
    props.onMouseLeave && props.onMouseLeave(e, props.comData);
  };

  let onEvents = {
    click: onChartClick,
  };
  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
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