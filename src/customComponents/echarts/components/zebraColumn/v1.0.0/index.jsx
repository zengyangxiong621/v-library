/* eslint-disable prettier/prettier */
/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
import ComponentDefaultConfig from "./config";
import * as echarts from "echarts";
import EC from "../../../EC";
import React from "react";

const ZebraColumn = (props) => {
  const componentConfig = props.componentConfig || ComponentDefaultConfig;
  const { config } = componentConfig;
  const { data } = componentConfig.staticData;
  const componentData = props.comData || data; // 过滤后的数据

  const fieldKey = props.fields || ["x", "y", "s"];

  // <<<获取X轴数据>>>
  //传入的数据的每个对象中都有x, 当有多个系列时，x会重复
  // {x:'01/11', y:'2', s:'系列一'}、{x:'01/11', y:'20', s:'系列二'}
  const axisArr = Array.isArray(componentData)
    ? componentData.map((item) => item[fieldKey[0]])
    : [];
  let axisData = [...new Set(axisArr)];

  // <<<获取每个系列 数据 的map>>>
  // 此时的 seriesMap <===> {'系列一' => {data:[1,2,3]}, '系列二' => {data:[4,5,6]}}
  // @Mark 后面还需要根据用户在“系列设置”中定义的<映射字段>再处理一次seriesMap
  let seriesMap = new Map();
  Array.isArray(componentData) &&
    componentData.forEach((item) => {
      const seriesKey = item[fieldKey[2]];
      const newValue = item[fieldKey[1]];
      if (!seriesMap.has(seriesKey)) {
        seriesMap.set(seriesKey, { data: [newValue] });
      } else {
        //@Mark newValue 需要放在后面，不然最后的得到的bar的data会颠倒
        const val = seriesMap.get(seriesKey);
        const barData = val.data || [];
        seriesMap.set(seriesKey, { data: [...barData, newValue] });
      }
    });
  /**
   ** description: 获取组件右侧可供用户操作的配置项
   */
  const getTargetConfig = (Arr) => {
    let targetConfig = {};
    Arr.forEach((item) => {
      let { name, value, options, flag, displayName } = item;
      if (item.hasOwnProperty("value")) {
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
  const { legendSettings, bar, spacing } = allSettings ? allSettings["图表"] : {};
  const { axisSettings } = allSettings ? allSettings["坐标轴"] : {};
  const { dataSeries } = allSettings ? allSettings["系列"] : {};
  const { indicator } = allSettings ? allSettings["辅助"] : {};
  // 指示器
  const { indicatorWidth, indicatorStyleColor } = indicator || {};

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
    xAxisLine: { show: xAxisLineShow = true, xAxisLineColor, xAxisLineWeight },
  } = axisSettings ? axisSettings["X轴"] : {};
  const {
    yAxisLabel: {
      // show: yAxisLabelShow = false,
      yAxisLabelRotate = 0,
      yAxisLabelTextStyle = {},
    },
    yAxisLine: { show: yAxisLineShow = true, yAxisLineColor, yAxisLineWeight },
    yAxisUnit: { yAxisUnitShow, yAxisUnitOffset = {}, yAxisUnitText, yAxisUnitTextStyle = {} },
    ySplitLine: { show: ySplitLineShow = true, ySplitLineColor, ySplitLineWeight },
  } = axisSettings ? axisSettings["Y轴"] : {};

  /**
   ** description: 通过不同的配置来获取不同的渲染配置
   */
  const getSingleSeriesData = (barWidth, barLabel, barColor, splitLineColor, name, value) => {
    const maxData = Math.max(...value) * 1.5;
    const maxValue = new Array(value.length).fill(maxData);
    const itemStyleColor =
      barColor?.type === "pure"
        ? barColor?.pureColor
        : barColor?.type === "gradient"
          ? new echarts.graphic.LinearGradient(0, 1, 0, 0, [
            {
              offset: 0,
              color: barColor?.gradientStart,
            },
            {
              offset: 1,
              color: barColor?.gradientEnd,
            },
          ])
          : "#1890ff";
    const everyLineOptions = [
      // 值
      {
        name,
        xAxisIndex: 1,
        type: "bar",
        itemStyle: {
          normal: {
            color: itemStyleColor,
          },
        },
        label: {
          normal: {
            show: barLabel.show,
            position: "top",
            offset: [0, -5],
            textStyle: {
              color: barLabel.font.color,
              fontSize: barLabel.font.fontSize,
              fontFamily: barLabel.font.fontFamily,
              fontWeight: barLabel.font.bold ? "bold" : "normal",
              fontStyle: barLabel.font.italic ? "italic" : "normal",
            },
          },
        },
        barWidth:
          barWidth?.unit === "%" ? `${barWidth?.width * 0.425}%` : barWidth?.width * 0.425 || 17,
        data: value,
        z: 2,
      },
      // 分割线
      {
        name,
        type: "pictorialBar",
        symbol: "rect",
        symbolSize: ["100%", 5],
        symbolRepeat: true,
        symbolMargin: "2!",
        itemStyle: {
          color: splitLineColor || "#102862",
        },
        label: {
          show: false,
        },
        barWidth:
          barWidth?.unit === "%" ? `${barWidth?.width * 0.425}%` : barWidth?.width * 0.425 || 17,
        data: value,
        z: 3,
      },
      // 背景
      {
        type: "bar",
        barWidth: barWidth?.unit === "%" ? `${barWidth?.width}%` : barWidth?.width || 40,
        showBackground: true,
        backgroundStyle: {
          color: bar.barBgColor,
        },
        barGap: "-100%",
        itemStyle: {
          normal: {
            color: "transparent",
          },
        },
        data: maxValue,
        z: 1,
      },
    ];
    return everyLineOptions;
  };

  // @Mark 需要动态的计算折线图的数量, 最终将使用dynamicSeries来作为最终的series属性的值
  const dynamicSeries = [];
  const legendTextReflect = {};
  let legendItemStyle = {};
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
      const { barLabel, barColor, splitLineColor, barWidth } = targetObj;
      singleSeriesData = getSingleSeriesData(
        barWidth,
        barLabel,
        barColor,
        splitLineColor,
        key,
        value.data
      );
      // 获取 最终每个图例应该展示的文本
      const { displayName } = targetObj.mapping || { displayName: key };
      legendTextReflect[key] = displayName;
      legendItemStyle = barColor;
    }
    dynamicSeries.push(...singleSeriesData);
  });

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
            width: indicatorWidth,
            color: indicatorStyleColor,
            type: "solid",
          },
        },
        formatter: "{b0}<br/>{c0}",
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
          color: legendTextStyle && legendTextStyle.color,
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
              color: xAxisLineColor,
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: true,
            fontFamily: xAxisLabelTextStyle.fontFamily,
            lineHeight: xAxisLabelTextStyle.lineHeight,
            color: xAxisLabelTextStyle.color,
            rotate: xAxisLabelRotate,
            fontSize: xAxisLabelTextStyle.fontSize,
            fontStyle: xAxisLabelTextStyle.italic ? "italic" : "normal",
            fontWeight: xAxisLabelTextStyle.bold ? "bold" : "normal",
          },
        },
        {
          type: "category",
          data: axisData,
          show: false,
        },
      ],
      yAxis: [
        {
          type: "value",
          [yAxisUnitShow && "name"]: yAxisUnitText,
          [yAxisUnitShow && "nameGap"]: yAxisUnitOffset.yAxisUnitOffsetY,
          [yAxisUnitShow && "nameTextStyle"]: {
            padding: [0, 0, 0, yAxisUnitOffset.yAxisUnitOffsetX],
            color: yAxisUnitTextStyle.color,
            fontSize: yAxisUnitTextStyle.fontSize,
            fontStyle: yAxisUnitTextStyle.italic ? "italic" : "normal",
            fontWeight: yAxisUnitTextStyle.bold ? "bold" : "normal",
            fontFamily: yAxisUnitTextStyle.fontFamily,
          },
          axisLine: {
            show: yAxisLineShow,
            lineStyle: {
              width: yAxisLineWeight,
              color: yAxisLineColor,
            },
          },
          axisLabel: {
            show: true,
            color: yAxisLabelTextStyle.color,
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
              color: [ySplitLineColor],
            },
          },
        },
      ],
      series: [...dynamicSeries],
    };
    return res;
  };

  const onChartClick = (param, echarts) => {
    // todo
  };
  const onChartReady = (echarts) => {
    // todo
  };
  let onEvents = {
    click: onChartClick,
  };
  return <EC option={getOption()} onChartReady={onChartReady} onEvents={onEvents} />;
};

export { ZebraColumn, ComponentDefaultConfig };
export default ZebraColumn;
