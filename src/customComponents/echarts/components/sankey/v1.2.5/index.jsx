import React from "react";
import EC from "../../../EC";

import ComponentDefaultConfig from "./config";

// 深拷贝
const deepClone = (obj) => {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  const result = Array.isArray(obj) ? [] : {};
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      result[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
    }
  } else if (typeof obj === "object") {
    Object.keys(obj).forEach((k) => {
      result[k] = typeof obj[k] === "object" ? deepClone(obj[k]) : obj[k];
    });
  }
  return result;
};

// 随机生成rgb颜色
function rgb() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  var rgb = `rgb(${r},${g},${b})`;
  return rgb;
}


const Sankey = (props) => {
  const componentConfig = props.componentConfig || ComponentDefaultConfig;
  const { config } = componentConfig;
  const { data } = componentConfig.staticData;
  // 最新字段
  const finalFieldsArr = props.fields || ["nodes", "links"];
  // 组件静态或者传入组件的数据
  const originData = props.comData || data;
  // originData中有多项数据，只取第一项
  const firstData = originData[0] || [ { "nodes": [],"links": [] }
  ];
  const nodes = deepClone(firstData[finalFieldsArr[0]]);
  const links = deepClone(firstData[finalFieldsArr[1]]);

  // 主题颜色配置
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

  const { globalStyle, margin, label, linksLineStyle, tooltip, dataSeries } = getTargetConfig(config);
  const { nodeWidth, nodeGap, emphasis, draggable } = globalStyle;
  const { left, top, right, bottom } = margin;
  const { labelTextStyle, numberLabel, offset: { x, y }, position } = label;
  const { color, opacity, curveness, customColor: { customColorShow, styleColor } } = linksLineStyle;
  const { backgroundColor, tooltipTextStyle } = tooltip;

  const dataSeriesValues = Object.values(dataSeries);
  const dataSeriesObj = {};
  dataSeriesValues.forEach(item => {
    dataSeriesObj[item.fieldName] = item.barColor;
  });

  links.forEach((item) => {
    item.lineStyle = {
      color: !customColorShow ? color : styleColor, // target 或 自定义
      opacity: "0.1", // 0.1
      curveness: "0.5"// 0-1
    };
  });
  const allSource = links.map(item => item.source);
  const surce = [...new Set(allSource)];
  nodes.forEach((item, index) => {
    if (surce.includes(item.name)) {
      item.label = {
        position: "right"
      };
    }
    item.itemStyle = {
      color: componentThemeConfig ?
        componentThemeConfig.pureColors[index % 7]
        : dataSeriesObj[item.name] || rgb()
    };
  });


  const getOption = () => ({
    tooltip: {
      trigger: "item",
      triggerOn: "mousemove",
    },
    series: {
      type: "sankey",
      nodeWidth,
      nodeGap,
      draggable,
      left,
      top,
      right,
      bottom,
      emphasis: {
        focus: emphasis ? "adjacency" : "none",
      },
      tooltip: {
        backgroundColor,
        textStyle: {
          color: tooltipTextStyle.color,
          fontFamily: tooltipTextStyle.fontFamily,
          fontSize: tooltipTextStyle.fontSize,
          fontWeight: tooltipTextStyle.fontWeight
        }
      },
      label: {
        show: true,
        position,
        offset: [x, y],
        color: componentThemeConfig
          ? componentThemeConfig.textColor
          : labelTextStyle.color,
        fontFamily: labelTextStyle.fontFamily,
        fontSize: labelTextStyle.fontSize,
        fontWeight: labelTextStyle.fontWeight,
      },
      nodes,
      links

    }
  });

  const onChartReady = echarts => {
    // console.log();
  };
  const onChartClick = (param, echarts) => {
    // console.log();
  };
  let onEvents = {
    click: onChartClick
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
  Sankey,
  ComponentDefaultConfig
};

export default Sankey;