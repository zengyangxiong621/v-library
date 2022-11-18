/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
import { ComponentDefaultConfig } from "./config";
import * as echarts from "echarts";
import EC from "@/customComponents/echarts/EC";
import React, { memo } from "react";

const BasicLine = (props) => {
  const componentConfig = props.componentConfig || ComponentDefaultConfig;
  // const componentConfig = ComponentDefaultConfig
  const { config } = componentConfig;
  const { data } = componentConfig.staticData;
  let componentData = props.comData || data; // 过滤后的数据
  const fieldKey = props.fields || ["x", "y", "s"];

  // 配置es数据源的时候，在没有用过滤器将结果转成数组前，需要将componentData先赋值为[]以兼容这种情况
  if (!Array.isArray(componentData)) {
    componentData = [];
  }
  // <<<获取X轴数据>>>
  //传入的数据的每个对象中都有x, 当有多个系列时，x会重复
  // {x:'01/11', y:'2', s:'系列一'}、{x:'01/11', y:'20', s:'系列二'}
  const axisArr = componentData.map((item) => item[fieldKey[0]]);
  let axisData = [...new Set(axisArr)];

  // <<<获取每条折线的 数据 的map>>>
  // 此时的 seriesMap <===> {'系列一' => {data:[1,2,3]}, '系列二' => {data:[4,5,6]}}
  // @Mark 后面还需要根据用户在“系列设置”中定义的<映射字段>再处理一次seriesMap
  let seriesMap = new Map();
  componentData.forEach((item) => {
    const seriesKey = item[fieldKey[2]];
    const newValue = item[fieldKey[1]];
    if (!seriesMap.has(seriesKey)) {
      seriesMap.set(seriesKey, { data: [newValue] });
    } else {
      //@Mark newValue 需要放在后面，不然最后的得到的每条折线的data会颠倒
      const val = seriesMap.get(seriesKey);
      const lineData = val.data || [];
      seriesMap.set(seriesKey, { data: [...lineData, newValue] });
    }
  });

  /***********************主题切换************************/
  const componentThemeConfig = props.themeConfig;
  // 如果 选择的了 主题风格, 着手替换config中的颜色
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
  /**
   ** description: 获取组件右侧可供用户操作的配置项
   */
  const getTargetConfig = (Arr) => {
    let targetConfig = {};
    Arr.forEach((item) => {
      let { name, value, options, flag, displayName, type } = item;
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
  const { legendSettings, outerMargin, spacing } = allSettings ? allSettings["图表"] : {};
  const { axisSettings } = allSettings ? allSettings["坐标轴"] : {};
  const { dataSeries } = allSettings ? allSettings["系列"] : {};
  const { indicator, tooltip } = allSettings ? allSettings["辅助"] : {};
  // ----------------OOOOOOOOOOOOOOOOOO------------------------- //
  // 图例配置
  const { gap, legendTextStyle, offset, iconSize, show: isUseLegend } = legendSettings || {};
  // 系列--比较特殊
  const dataSeriesValues = dataSeries ? Object.values(dataSeries) : [];
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
  // 指示器
  const { indicatorWidth, indicatorStyleColor } = indicator || {};
  // 提示框
  const {
    tooltipShow,
    tooltipBackColor,
    // tooltipOffset: { tooltipOffsetX, tooltipOffsetY },
    tooltipBorderColor,
    tooltipTextStyle,
    tooltipPadding,
    tooltipSymbolShape,
  } = tooltip || {};
  // 轴
  const {
    xAxisLabel: {
      // 暂时不做隐藏
      // show: xAxisLabelShow = false,
      xAxisLabelRotate = 0,
      xAxisLabelTextStyle = {},
    },
    xAxisLine: {
      show: xAxisLineShow = true,
      themeAssistColor: xAxisLineColor,
      // xAxisLineColor,
      xAxisLineWeight,
    },
    blankOfSides,
    xGridLine: {
      showXGridLine,
      xGridLineType,
      themeGridColor: xGridLineColor,
      // xGridLineColor,
      xGridLineWeight,
    },
  } = axisSettings ? axisSettings["X轴"] : {};
  const {
    yAxisLabel: {
      // show: yAxisLabelShow = false,
      yAxisLabelRotate = 0,
      yAxisLabelTextStyle = {},
    },
    yAxisLine: {
      show: yAxisLineShow = true,
      themeGridColor: yAxisLineColor,
      // yAxisLineColor,
      yAxisLineWeight,
    },
    yAxisUnit: { yAxisUnitShow, yAxisUnitOffset = {}, yAxisUnitText, yAxisUnitTextStyle = {} },
    yGridLine: {
      showYGridLine,
      yGridLineType,
      themeGridColor: yGridLineColor,
      // yGridLineColor,
      yGridLineWeight,
    },
  } = axisSettings ? axisSettings["Y轴"] : {};
  // ----------------OOOOOOOOOOOOOOOOOO------------------------- //

  /**
   ** description: 通过不同的配置来获取不同的折线的渲染配置
   */
  const getSingleSeriesData = (options) => {
    const {
      isShowSymbolWhileHover,
      symbolShape,
      symbolShapeColor,
      symbolBorderColor,
      symbolBorderWidth,
      symbolSize,
      isSmooth,
      lineColor,
      lineWeight,
      areaShow,
      themeGradientColorStart: areaStartColor,
      themeGradientColorEnd: areaEndColor,
      // areaStartColor,
      // areaEndColor,
      areaGradientDirection,
    } = options || {};

    // 处理 线性渐变 的方向
    const colorDirection = {
      x: areaGradientDirection === "right2left" ? 1 : 0,
      y: areaGradientDirection === "bottom2top" ? 1 : 0,
      x2: areaGradientDirection === "left2right" ? 1 : 0,
      y2: areaGradientDirection === "top2bottom" ? 1 : 0,
    };
    const everyLineOptions = {
      name: "basicLine",
      type: "line",
      // 如果 false 则只有在 tooltip hover 的时候显示每条折线上的小标记图形
      showSymbol: !isShowSymbolWhileHover,
      showAllSymbol: true,
      // 折线上每个标记的形状
      symbol: symbolShape,
      symbolSize: symbolSize,
      smooth: isSmooth,
      data: [],
      lineStyle: {
        width: lineWeight,
        color: lineColor,
      },
      itemStyle: {
        color: symbolShapeColor,
        borderColor: symbolBorderColor,
        borderWidth: symbolBorderWidth,
      },
      [areaShow && "areaStyle"]: {
        // color: areaColor,
        color: {
          type: "linear",
          ...colorDirection,
          colorStops: [
            {
              offset: 0.1,
              color: componentThemeConfig
                ? componentThemeConfig.gradientColors[0][0].color
                : areaStartColor || "rgba(51, 104, 206,0.6)",
            },
            {
              offset: 1,
              color: areaEndColor || "rgba(180, 21, 177,0.1)",
            },
          ],
        },
      },
    };
    return everyLineOptions;
  };
  // @Mark 需要动态的计算折线图的数量, 最终将使用dynamicSeries来作为折线图的series属性的值
  const dynamicSeries = [];
  // @Mark 图例文本的映射 {'系列一': '我是图例文本silieyi' }
  const legendTextReflect = {};
  // description: 从已经处理好的seriesMap中拿到对应的<每条折线的最终渲染配置>和<图例文本的映射>

  seriesMap.forEach((value, key) => {
    // 假如：系列设置中用户设置了多个'系列一'
    // 利用find只返回第一个 key为'系列一'的特性即可实现“先设置者先生效”
    const targetObj = dataSeriesValues.find((k) => {
      return k.mapping.fieldName === key;
    });
    let singleSeriesData = {};
    // 假如：数据中只有“系列一、二”，但是用户可以定义出“系列三、s系列……”，所以此时targetObj一定不存在
    if (targetObj) {
      // 获取 面积区域/折线 相关设置
      const singleAreaSettings = targetObj.areaStyle || {};
      const singleLineSettings = targetObj.lineSettings || {};
      const singleSymbolSettings = targetObj.symbolSettings || {};

      const isShowSymbol = singleSymbolSettings.symbolShow;
      const isShowArea = singleAreaSettings.areaShow;

      // 整合 最终折线绘制的配置
      let singleSeriesOptions = singleLineSettings;
      if (isShowArea) {
        singleSeriesOptions = { ...singleSeriesOptions, ...singleAreaSettings };
      }
      if (isShowSymbol) {
        singleSeriesOptions = { ...singleSeriesOptions, ...singleSymbolSettings };
      }
      singleSeriesData = getSingleSeriesData(singleSeriesOptions);
      // 获取 最终每个图例应该展示的文本
      const { displayName } = targetObj.mapping || { displayName: key };
      legendTextReflect[key] = displayName;
    } else {
      legendTextReflect[key] = key;
    }

    const lineData = value.data;
    const composeObj = { ...singleSeriesData, name: key, data: lineData };
    dynamicSeries.push(composeObj);
  });
  /**
   ** description: 整合之前所得到的所有参数以生成最终的 echarts Option
   */
  const getOption = () => {
    const { top, left, right, bottom } = tooltipPadding || {};
    const res = {
      tooltip: {
        show: tooltipShow,
        backgroundColor: tooltipBackColor,
        borderColor: tooltipBorderColor,
        trigger: "axis",
        formatter: (params) => {
          const { axisValue } = params[0];
          let targetStr = "<div>";
          params.forEach((item) => {
            const { seriesName, value, color } = item;
            if (tooltipSymbolShape !== "none") {
              // 只有两种，后续加了再改
              const borderRadius = tooltipSymbolShape === "circle" ? "50%" : "none";
              targetStr += `<span style="display:inline-block;margin-right:4px;border-radius:${borderRadius};width:10px;height:10px;background-color:${color};"></span>`;
            }
            targetStr += `<span>${seriesName}</span> <span>${value}</span>`;
            targetStr += "</div>";
          });
          const htmlStr =
            `<div>
            <span>${axisValue}</span>
            <div style="display: 'flex'">` +
            targetStr +
            `</div>
          </div>`;
          return htmlStr;
        },
        axisPointer: {
          type: "line",
          lineStyle: {
            width: indicatorWidth,
            color: indicatorStyleColor,
            type: "solid",
          },
        },
        textStyle: {
          color: tooltipTextStyle && tooltipTextStyle.color,
          fontSize: tooltipTextStyle && tooltipTextStyle.fontSize,
          fontFamily: tooltipTextStyle && tooltipTextStyle.fontFamily,
          fontWeight: tooltipTextStyle && (tooltipTextStyle.bold ? "bold" : "normal"),
        },
        padding: [top, right, bottom, left],
      },
      [isUseLegend && "legend"]: {
        // data: legendTextReflect,
        formatter: function (name) {
          return legendTextReflect[name];
        },
        align: "auto",
        left: `${offset && offset.legendOffsetX}px`,
        top: `${offset && offset.legendOffsetY}px`,
        // right: 'auto',
        // bottom: 'auto',
        // 图例列表布局朝向
        // orient: 'vertical', // horizontal
        itemGap: gap,
        itemWidth: iconSize.iconWidth,
        itemHeight: iconSize.iconHeight,
        textStyle: {
          color: legendTextStyle && legendTextStyle.themeTextColor,
          fontSize: legendTextStyle && legendTextStyle.fontSize,
          fontFamily: legendTextStyle && legendTextStyle.fontFamily,
          fontWeight: legendTextStyle && (legendTextStyle.bold ? "bold" : "normal"),
          fontStyle: legendTextStyle && (legendTextStyle.italic ? "italic" : "normal"),
        },
      },
      xAxis: {
        // x轴上暂时不加单位
        // name: '年/月',
        type: "category",
        data: axisData,
        axisLine: {
          show: xAxisLineShow,
          lineStyle: {
            width: xAxisLineWeight,
            color: xAxisLineColor,
          },
        },
        axisLabel: {
          show: true,
          color: xAxisLabelTextStyle.themeTextColor,
          rotate: xAxisLabelRotate,
          fontSize: xAxisLabelTextStyle.fontSize,
          fontStyle: xAxisLabelTextStyle.italic ? "italic" : "normal",
          fontWeight: xAxisLabelTextStyle.bold ? "bold" : "normal",
        },
        splitLine: {
          show: showXGridLine,
          lineStyle: {
            type: xGridLineType,
            color: xGridLineColor,
            width: xGridLineWeight,
          },
        },
        boundaryGap: blankOfSides,
      },
      yAxis: {
        type: "value",
        [yAxisUnitShow && "name"]: yAxisUnitText,
        [yAxisUnitShow && "nameGap"]: yAxisUnitOffset.yAxisUnitOffsetY,
        [yAxisUnitShow && "nameTextStyle"]: {
          padding: [0, 0, 0, yAxisUnitOffset.yAxisUnitOffsetX],
          color: yAxisUnitTextStyle.themeTextColor,
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
          color: yAxisLabelTextStyle.themeTextColor,
          rotate: yAxisLabelRotate,
          fontSize: yAxisLabelTextStyle.fontSize,
          fontStyle: yAxisLabelTextStyle.italic ? "italic" : "normal",
          fontWeight: yAxisLabelTextStyle.bold ? "bold" : "normal",
        },
        splitLine: {
          show: showYGridLine,
          lineStyle: {
            type: yGridLineType,
            color: yGridLineColor,
            width: yGridLineWeight,
          },
        },
      },
      // 组件边距(padding)
      grid: {
        x: `${+spacing.left}`,
        x2: `${+spacing.right}`,
        y: `${+spacing.top}`,
        y2: `${+spacing.bottom}`,
      },
      series: dynamicSeries,
    };
    return res;
  };

  const onChartClick = (param) => {
    const  {name, seriesName, data, seriesType} = param
    const finalPostData = {
      name, seriesName, data, seriesType
    }
    if (Array.isArray(componentConfig.drillDownArr) && componentConfig.drillDownArr.length) {
      // drillDownArr长度不为零, 需要下钻
      if (typeof props.onChange === "function") {
        props.onChange(finalPostData);
      }
    } else {
      // do something
    }
  };
  const onChartReady = (echarts) => {
    // todo
  };
  let onEvents = {
    click: onChartClick,
  };
  return <EC option={getOption()} onChartReady={onChartReady} onEvents={onEvents} />;
};

export { BasicLine, ComponentDefaultConfig };
export default memo(BasicLine);
