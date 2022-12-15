/* eslint-disable react/prop-types */
import ComponentDefaultConfig from "./config";
import * as echarts from "echarts";
import EC from "../../../EC";
import React, { useEffect } from "react";

const BasicBar = (props) => {
  const componentConfig = props.componentConfig || ComponentDefaultConfig;
  const { config } = componentConfig;
  const { data } = componentConfig.staticData;
  const componentData = props.comData || data; // 过滤后的数据
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
              case "themePureColor":
                item.value = componentThemeConfig.pureColors[index % 7];
                break;
              case "themeGradientColorStart":
                item.value = componentThemeConfig.gradientColors[index % 7].find(
                  (item) => item.offset === 0
                ).color;
                break;
              case "themeGradientColorEnd":
                item.value = componentThemeConfig.gradientColors[index % 7].find(
                  (item) => item.offset === 100
                ).color;
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
      config: configOfTheme,
    });
  }

  const fieldKey = props.fields || ["x", "y", "s"];

  // <<<获取X轴数据>>>
  //传入的数据的每个对象中都有x, 当有多个系列时，x会重复
  // {x:'01/11', y:'2', s:'系列一'}、{x:'01/11', y:'20', s:'系列二'}
  const axisArr = Array.isArray(componentData)
    ? componentData.map((item) => item[fieldKey[0]])
    : [];
  let axisData = [...new Set(axisArr)];
  const valueData = Array.isArray(componentData)
    ? componentData.map((item) => item[fieldKey[1]])
    : [];
  const maxData = Math.max(...valueData) * 1.5;
  const maxList = new Array(axisData.length).fill(maxData);

  // <<<获取每个系列 数据 的map>>>
  // 此时的 seriesMap <===> {'系列一' => {data:[1,2,3]}, '系列二' => {data:[4,5,6]}}
  // @Mark 后面还需要根据用户在“系列设置”中定义的<映射字段>再处理一次seriesMap
  let seriesMap = new Map();
  let index = 0;
  Array.isArray(componentData) &&
    componentData.forEach((item) => {
      const seriesKey = item[fieldKey[2]];
      const newValue = item[fieldKey[1]];
      if (!seriesMap.has(seriesKey)) {
        seriesMap.set(seriesKey, { data: [newValue], index });
        index += 1;
      } else {
        //@Mark newValue 需要放在后面，不然最后的得到的bar的data会颠倒
        const val = seriesMap.get(seriesKey);
        const barData = val.data || [];
        const indexTem = val.index;
        seriesMap.set(seriesKey, { data: [...barData, newValue], index: indexTem });
      }
    });
  /**
   ** description: 获取组件右侧可供用户操作的配置项
   */
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
  // config中位置尺寸这项不需要,提取出来
  const hadFilterArr = config.filter((item) => item.name !== "dimension");
  const { allSettings } = getTargetConfig(hadFilterArr);
  // 四个 tab, 分别是 图表、坐标轴、系列、辅助
  const { legendSettings, bar, spacing, bgSetting } = allSettings ? allSettings["图表"] : {};
  const { axisSettings } = allSettings ? allSettings["坐标轴"] : {};
  const { dataSeries } = allSettings ? allSettings["系列"] : {};
  const { indicator, tooltipUnit } = allSettings ? allSettings["辅助"] : {};

  // 指示器
  const { indicatorWidth, indicatorStyleColor } = indicator || {};
  // tooltip单位设置
  const { tooltipUnitShow, tooltipUnitText } = tooltipUnit || {};

  // 图例配置
  const { gap, legendTextStyle, offset, iconSize, show: isUseLegend } = legendSettings || {};
  // 系列--比较特殊
  const dataSeriesValues = Object.values(dataSeries);
  // 拿到seriesMap里的所有key,每个key对应着一根折线(一个系列),
  const seriesMapKeys = seriesMap.keys();
  // 用数组保存这些key，便于下一步用索引取值
  const seriesMapKeysArr = [];
  for (const value of seriesMapKeys) {
    seriesMapKeysArr.push(value);
  }
  // 替换掉 默认config里的映射关系(mapping), 因为默认的是‘系列一对系列一’，‘系列二对系列二’，但真实数据可能是别的系列名
  dataSeriesValues.forEach(({ mapping }, index) => {
    const customSeriesName = seriesMapKeysArr[index];
    // @Mark 首次根据真实数据设置成功系列名后，后续就不可再走这个逻辑，否则即使右侧设置变更了，图表中也不会产生相应的变化
    if (mapping.fieldName !== customSeriesName) {
      mapping.fieldName = customSeriesName;
      mapping.displayName = customSeriesName;
    }
  });

  const {
    xAxisLabel: {
      // 暂时不做隐藏
      // show: xAxisLabelShow = false,
      xAxisLabelRotate = 0,
      xAxisLabelTextStyle = {},
    },
    xAxisLine: { show: xAxisLineShow = true, themeAssistColor: xAxisLineColor, xAxisLineWeight },
  } = axisSettings ? axisSettings["X轴"] : {};
  const {
    yAxisLabel: {
      // show: yAxisLabelShow = false,
      yAxisLabelRotate = 0,
      yAxisLabelTextStyle = {},
    },
    yAxisLine: { show: yAxisLineShow = true, themeAssistColor: yAxisLineColor, yAxisLineWeight },
    yAxisUnit: { yAxisUnitShow, yAxisUnitOffset = {}, yAxisUnitText, yAxisUnitTextStyle = {} },
    ySplitLine: { show: ySplitLineShow = true, themeGridColor: ySplitLineColor, ySplitLineWeight },
  } = axisSettings ? axisSettings["Y轴"] : {};

  /**
   ** description: 通过不同的配置来获取不同的渲染配置
   */
  const getSingleSeriesData = (barLabel, barColor, name, value, index) => {
    const itemStyleColor =
      barColor?.type === "pure"
        ? componentThemeConfig
          ? componentThemeConfig.pureColors[index % 7]
          : barColor?.themePureColor || "#1890ff"
        : barColor?.type === "gradient"
          ? new echarts.graphic.LinearGradient(0, 1, 0, 0, [
            {
              offset: 0,
              color: componentThemeConfig
                ? componentThemeConfig.gradientColors[index % 7][0].color
                : barColor?.themeGradientColorStart || "#1890ff",
            },
            {
              offset: 1,
              color: componentThemeConfig
                ? componentThemeConfig.gradientColors[index % 7].find((item) => item.offset === 100)
                  .color
                : barColor?.themeGradientColorEnd || "#1890ff",
            },
          ])
          : "#1890ff";
    const everyLineOptions = [
      {
        name,
        type: "bar",
        barGap: `${bar.barGap * 100}%`,
        barCategoryGap: `${bar.barCategoryGap * 10}%`,
        label: {
          normal: {
            show: barLabel.show,
            position: "top",
            textStyle: {
              color: componentThemeConfig
                ? componentThemeConfig.textColor
                : barLabel?.font?.themeTextColor || "#fff",
              fontSize: barLabel.font.fontSize,
              fontFamily: barLabel.font.fontFamily,
              fontWeight: barLabel.font.bold ? "bold" : "normal",
              fontStyle: barLabel.font.italic ? "italic" : "normal",
            },
          },
        },
        itemStyle: {
          normal: {
            color: itemStyleColor,
          },
        },
        data: value,
        z: 2,
      },
    ];
    return everyLineOptions;
  };

  // @Mark 需要动态的计算折线图的数量, 最终将使用dynamicSeries来作为最终的series属性的值
  const dynamicSeries = [];
  const legendTextReflect = {};
  seriesMap.forEach((value, key) => {
    // 假如：系列设置中用户设置了多个'系列一'
    // 利用find只返回第一个 key为'系列一'的特性即可实现“先设置者先生效”
    const targetObj = dataSeriesValues.find((k) => {
      return k.mapping.fieldName === key;
    });
    let singleSeriesData = [];
    // 假如：数据中只有“系列一、二”，但是用户可以定义出“系列三、s系列……”，所以此时targetObj一定不存在
    if (targetObj) {
      // 获取 最终折线绘制的配置
      const { barLabel, barColor } = targetObj;
      singleSeriesData = getSingleSeriesData(barLabel, barColor, key, value.data, value.index);
      // 获取 最终每个图例应该展示的文本
      const { displayName } = targetObj.mapping || { displayName: key };
      legendTextReflect[key] = displayName;
    }
    dynamicSeries.push(...singleSeriesData);
  });

  // 背景柱的数据
  const bgBarDataLength = dynamicSeries.reduce((pre, item) => {
    const preLength = typeof pre === "number" ? pre : pre.data.length;
    const curLength = item.data.length;
    return preLength >= curLength ? preLength : curLength;
  }, 0);

  // 计算指示器的宽度
  const echartsWidth = config
    .find((item) => item.name === "dimension")
    .value.find((item) => item.name === "width").value;
  const widthTmp1 = echartsWidth - spacing.left - spacing.right;
  const widthTmp2 = widthTmp1 - yAxisLabelTextStyle.fontSize;
  const widthTmp3 = widthTmp2 / maxList.length;
  const finalIndicatorWidth = Math.trunc((widthTmp3 * indicatorWidth) / 100);

  // 设置tooltip的fomatter
  let formaterStr = "{b0}<br />";
  let tooltipsUnitText = "";
  if (tooltipUnitShow) {
    tooltipsUnitText = `(${tooltipUnitText})`;
  }
  if (isUseLegend) {
    dynamicSeries.forEach((item, index) => {
      formaterStr += `{a${index}}: {c${index}} ${tooltipsUnitText}<br />`;
    });
  } else {
    dynamicSeries.forEach((item, index) => {
      formaterStr += `{c${index}} ${tooltipsUnitText}<br />`;
    });
  }

  /**
   ** description: 整合之前所得到的所有参数以生成最终的 echarts Option
   */
  const getOption = () => {
    const res = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "line",
          lineStyle: {
            width: finalIndicatorWidth,
            color: indicatorStyleColor,
            type: "solid",
          },
        },
        formatter: formaterStr,
      },
      [isUseLegend && "legend"]: {
        formatter: function (name) {
          return legendTextReflect[name];
        },
        align: "auto",
        left: `${offset && offset.legendOffsetX}px`,
        top: `${offset && offset.legendOffsetY}px`,
        itemGap: gap,
        itemWidth: iconSize.iconWidth,
        itemHeight: iconSize.iconHeight,
        textStyle: {
          color: componentThemeConfig
            ? componentThemeConfig.textColor
            : (legendTextStyle && legendTextStyle?.themeTextColor) || "#fff",
          fontSize: legendTextStyle && legendTextStyle.fontSize,
          fontFamily: legendTextStyle && legendTextStyle.fontFamily,
          fontWeight: legendTextStyle && (legendTextStyle.bold ? "bold" : "normal"),
          fontStyle: legendTextStyle && (legendTextStyle.italic ? "italic" : "normal"),
        },
      },
      grid: {
        left: `${+spacing.left}`,
        right: `${+spacing.right}`,
        bottom: `${+spacing.bottom}`,
        top: `${+spacing.top}`,
      },
      xAxis: [
        {
          type: "category",
          data: axisData,
          axisLine: {
            show: xAxisLineShow,
            lineStyle: {
              width: xAxisLineWeight,
              color: componentThemeConfig
                ? componentThemeConfig.assistColor
                : xAxisLineColor || "#fff",
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: true,
            fontFamily: xAxisLabelTextStyle.fontFamily,
            lineHeight: xAxisLabelTextStyle.lineHeight,
            color: componentThemeConfig
              ? componentThemeConfig.textColor
              : xAxisLabelTextStyle?.themeTextColor || "#fff",
            rotate: xAxisLabelRotate,
            fontSize: xAxisLabelTextStyle.fontSize,
            fontStyle: xAxisLabelTextStyle.italic ? "italic" : "normal",
            fontWeight: xAxisLabelTextStyle.bold ? "bold" : "normal",
          },
        },
        {
          data: axisData,
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          position: "bottom",
        },
      ],
      yAxis: [
        {
          type: "value",
          [yAxisUnitShow && "name"]: yAxisUnitText,
          [yAxisUnitShow && "nameGap"]: yAxisUnitOffset.yAxisUnitOffsetY,
          [yAxisUnitShow && "nameTextStyle"]: {
            padding: [0, 0, 0, yAxisUnitOffset.yAxisUnitOffsetX],
            color: componentThemeConfig
              ? componentThemeConfig.textColor
              : yAxisUnitTextStyle?.themeTextColor || "#fff",
            fontSize: yAxisUnitTextStyle.fontSize,
            fontStyle: yAxisUnitTextStyle.italic ? "italic" : "normal",
            fontWeight: yAxisUnitTextStyle.bold ? "bold" : "normal",
            fontFamily: yAxisUnitTextStyle.fontFamily,
          },
          axisLine: {
            show: yAxisLineShow,
            lineStyle: {
              width: yAxisLineWeight,
              color: componentThemeConfig
                ? componentThemeConfig.assistColor
                : yAxisLineColor || "#fff",
            },
          },
          axisLabel: {
            show: true,
            color: componentThemeConfig
              ? componentThemeConfig.textColor
              : yAxisLabelTextStyle?.themeTextColor || "#fff",
            rotate: yAxisLabelRotate,
            fontSize: yAxisLabelTextStyle.fontSize,
            fontStyle: yAxisLabelTextStyle.italic ? "italic" : "normal",
            fontWeight: yAxisLabelTextStyle.bold ? "bold" : "normal",
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: ySplitLineShow,
            lineStyle: {
              type: "dotted",
              width: ySplitLineWeight,
              color: [
                componentThemeConfig ? componentThemeConfig.gridColor : ySplitLineColor || "#fff",
              ],
            },
          },
        },
      ],
      series: [
        ...dynamicSeries,
        bgSetting?.show && {
          data: maxList,
          type: "bar",
          [dataSeriesValues.length === 1 && "barGap"]: "-100%",
          [dataSeriesValues.length !== 1 && "xAxisIndex"]: 1,
          silent: true,
          itemStyle: {
            normal: {
              color: bgSetting?.color || "rgba(255,255,255,0.2)",
            },
          },
          tooltip: {
            show: false,
          },
          z: 1,
        },
      ],
    };
    return res;
  };

  const handleClick = (e, data) => {
    props.onClick && props.onClick(e, data);
  };

  const onChartClick = (param, echarts) => {
    const _data = componentData.find(item => (item[fieldKey[0]] === param.name && item[fieldKey[2]] === param.seriesName))
    // TODO: 统一校验componentConfig中的数据类型
    if (componentConfig?.events?.length) {
      handleClick(param.event, _data)
    }

    if (Array.isArray(componentConfig.drillDownArr) && componentConfig.drillDownArr.length) {
      // drillDownArray长度不为零, 需要下钻
      props.onChange && props.onChange(_data)
    } else {
      // do something
    }
  };
  const onChartReady = (echarts) => {
    // todo
  };

  useEffect(() => {
    props.onDataChange && props.onDataChange([...componentData])
  }, [componentData])

  let onEvents = {
    click: onChartClick,
  };
  return <EC option={getOption()} onChartReady={onChartReady} onEvents={onEvents} />;
};

export { BasicBar, ComponentDefaultConfig };
export default BasicBar;
