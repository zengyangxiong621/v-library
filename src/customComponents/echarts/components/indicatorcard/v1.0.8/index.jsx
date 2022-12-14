import React, { useRef, useEffect, useState } from "react";
import ComponentDefaultConfig from "./config";
import EC from "../../../EC";

const IndicatorCard = (props) => {
  const componentConfig = props.componentConfig || ComponentDefaultConfig;
  const { config } = componentConfig;
  const { data } = componentConfig.staticData;

  // 接收传入的主题配置信息
  const componentThemeConfig = props.themeConfig;
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
  const { themePureColor, fontSize, italic, letterSpacing, bold, fontFamily, lineHeight, themeTextColor, circleWidth, dangerLevel } = getConfig(config);
  console.log(getConfig(config), "look");
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
              borderColor: componentThemeConfig ? componentThemeConfig.pureColors[0] : themePureColor || "#5470c6",
              color: componentThemeConfig ? componentThemeConfig.pureColors[0] : themePureColor || "#5470c6",
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
            color: componentThemeConfig
              ? componentThemeConfig.textColor
              : themeTextColor || "#fff",
            fontFamily: fontFamily,
          },
          detail: { // 环内百分比样式
            width: 50,
            height: 18,
            color: componentThemeConfig ? componentThemeConfig.pureColors[0] : themePureColor || "#5470c6",
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

  useEffect(() => {
    props.onDataChange && props.onDataChange({value, ...originData[0]})
  }, [originData])
  
  const handleClick = (e) => {
    props.onClick && props.onClick(e, {value, ...originData[0]})
  }
  const handleMouseEnter = (e) => {
    props.onMouseEnter && props.onMouseEnter(e, {value, ...originData[0]})
  }
  const handleMouseLeave = (e) => {
    props.onMouseLeave && props.onMouseLeave(e, {value, ...originData[0]})
  }

  let size = {
    width: "100%",
    height: "100%"
  };
  return (
    <EC
      size={size}
      option={getOption()}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
};

export {
  IndicatorCard,
  ComponentDefaultConfig
};

export default IndicatorCard;