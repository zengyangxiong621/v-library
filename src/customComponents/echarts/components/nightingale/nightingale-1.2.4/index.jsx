
import ComponentDefaultConfig from "./config";
import * as echarts from "echarts";
import EC from "@/customComponents/echarts/EC";
// import EC from '../../EC'
import React, { memo } from "react";

const formatNumber = (num, precision = 2, splitDesc = ",") => {
  if (typeof num === "number") {
    precision = +precision; // 这里为了处理precision传入null  +null=0
    const str = num.toFixed(precision);
    const reg =
      str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
    return str.replace(reg, "$1" + splitDesc);
  }
};

const Nightingale = (props) => {
  const componentConfig = props.componentConfig || ComponentDefaultConfig;
  const { config } = componentConfig;
  const { data } = componentConfig.staticData;
  const componentData = props.comData || data; // 过滤后的数据
  const fieldKey = props.fields || ["s", "y"];
  const componentThemeConfig = props.themeConfig;

  const replaceThemeColor = (arr, colorIndex = 0) => {
    arr.forEach((item) => {
      let index = colorIndex || 0;
      let { name, value, options, flag, type, key, themeColor } = item;
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
          if (themeColor) {
            switch (themeColor) {
              case "themePureColor":
                value["color"] = componentThemeConfig.pureColors[index % 7];
                break;
              case "themeGradientColorStart":
                value["color"] = componentThemeConfig.gradientColors[index % 7].find(item => item.offset === 0).color;
                break;
              case "themeGradientColorEnd":
                value["color"] = componentThemeConfig.gradientColors[index % 7].find(item => item.offset === 100).color;
                break;
              case "themeTextColor":
                value["color"] = componentThemeConfig.textColor;
                break;
              case "themeAssistColor":
                value["color"] = componentThemeConfig.assistColor;
                break;
              case "themeGridColor":
                value["color"] = componentThemeConfig.gridColor;
                break;
              default:
                break;
            }
          }
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
  // 过滤掉 dimension 属性
  const filterDimension = config.filter((item) => item.name !== "dimension");
  const targetConfig = getTargetConfig(filterDimension);
  // 获取对应的属性
  const { hideDefault, pieSetting } = targetConfig;
  const { mainTextSetting, subTextSetting } = pieSetting
    ? pieSetting["标题设置"]
    : {};
  // 主标题设置
  const {
    showMainTextSetting,
    mainTextVertical,
    mainTextHorizontal,
    mainTextStyle,
  } = mainTextSetting;
  // 副标题设置
  const {
    showSubTextSetting,
    subText,
    subTextHorizontal,
    subTextVertical,
    subTextStyle,
  } = subTextSetting;
  const {
    Radius: { outerRadius, innerRadius },
    blockStyle: {
      showBlockStyle,
      blockRadius,
      blockStrokeColor,
      blockGap,
      blurRadius,
    },
    ringPosition: { ringPositionX, ringPositionY },
    ringSeries,
  } = pieSetting ? pieSetting["环形属性"] : {};
  const {
    legendStyle: {
      legendItemGap,
      legendItemWidth,
      legendItemHeight,
      legendOffset,
      legendOrient,
      showLegend,
    },
    legendTextStyle,
    symbolShape,
    numberFormat,
  } = pieSetting ? pieSetting["图例设置"] : {};
  // 标签样式
  const { labelSetting, labelShowFields } = pieSetting
    ? pieSetting["标签设置"]
    : {};
  const { line1Length, line2Length, lineWidth, showLabel } =
    labelSetting;
  // 标签显示字段
  const { labelSeriesName, labelSeriesNameTextStyle, seriesNameUseSeriesColor, labelDataName, labelDataNameTextStyle, dataNameUseSeriesColor, labelDataValue, labelDataValueTextStyle, dataValueUseSeriesColor, labelPercentage, labelPercentageTextStyle, percentageUseSeriesColor, } =
    labelShowFields;
  // 根据 映射字段处理后的 图表数据, 后续还需进一步加工数据
  let originalPieData = [];
  if (componentData && componentData.length) {
    originalPieData = componentData.map((item) => {
      return {
        name: item[fieldKey[0]],
        value: item[fieldKey[1]],
      };
    });
  }

  const total =
    componentData && componentData.length
      ? componentData.reduce((pre, item) => {
        return pre + item[fieldKey[1]];
      }, 0)
      : 0;
  // 处理 主标题 显示的数字格式，也可以用toLocalString, 但是在某些情况下可能会出错
  const hadFormatTotal = formatNumber(total, 0);

  /** +++++++++++++++++ ↓↓ 玫瑰图自定义区块间距 ↓↓ ++++++++++++++++++ */
  /** =========================================================== */
  // 通过往originalPieData中添加对象来实现 <能够自定义饼图各块之间的间距> 的功能
  const canSetGapPieData = [];
  //
  const finalItemStyle = {
    itemStyle: {
      borderWidth: 0,
      [showBlockStyle && "shadowBlur"]: blurRadius,
      [showBlockStyle && "shadowColor"]: blockStrokeColor,
    },
  };
  for (let i = 0, len = originalPieData.length; i < len; i++) {
    const item = originalPieData[i];
    canSetGapPieData.push({
      ...item,
      ...finalItemStyle,
    });
    // 开启了区块样式后，才能设置区块间距
    if (showBlockStyle) {
      //加了这个对象后，是能够添加上 区块间距, 但是点击“区块样式” 开关时会改变图例布局的朝向, 为了解决这个问题，目前采用的方法是：
      // @o_O Mark-1  把下方我们push进canSetGapPieData中的对象(没错，说的就是下面这个name为空字符串的{}) 从canSetGapPieData里过滤掉后得到一个数组, 把它作为 legend.data 的值, 具体见getOption方法中 @o_O for Mark-1处
      canSetGapPieData.push({
        name: "",
        // 我只是一个制造区块间隔的工具data,我的value不配在标签中显示出来
        placeholderFlag: "placeholderFlag",
        value: blockGap,
        itemStyle: {
          normal: {
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            color: "rgba(0, 0, 0, 0)",
            borderColor: "rgba(0, 0, 0, 0)",
            borderWidth: 0,
          },
        },
      });
    }
  }

  /** +++++++++++++++++++ ↓↓ 系列颜色相关 ↓↓ ++++++++++++++++++++++ */
  /** =========================================================== */

  // filedName2series 目前单纯地用作<过滤重复系列名> 的工具，后续如果要增加自定义图例文本的功能它才不是 '工具Map'
  let filedName2series = new Map();
  // TODO 图例自定义文本功能, 敬请期待
  // let legendTextReflect = {}

  // @o_O Mark-2: 假如用户没有给可怜的"系列二"分配颜色,那么我们将赠予"系列二" 一次 <幸运十选一> 的机会 <<见finalColorArr方法>>
  let colorArr = [];
  const defaultColorArr = [
    "#5470c6",
    "#91cc75",
    "#fac858",
    "#ee6666",
    "#73c0de",
    "#3ba272",
    "#fc8452",
    "#9a60b4",
    "#ea7ccc",
    "#87ceeb",
  ];
  try {
    const seriesValue = Object.values(ringSeries);
    seriesValue.forEach((item, index) => {
      const {
        mapping: { fieldName, displayName },
        themePureColor,
      } = item;
      if (!filedName2series.has(fieldName)) {
        filedName2series.set(fieldName, "存在的证明");
        colorArr[index] = componentThemeConfig
          ? componentThemeConfig.pureColors[index % 7]
          : themePureColor || defaultColorArr[~~(Math.random() * 10)];
        // TODO 图例自定义文本
        // legendTextReflect[fieldName] = pieDataNames[index]
      } else {
        colorArr[index] = "noColor";
      }
    });
  } catch (error) {
    throw new Error("玫瑰图渡劫失败:  config-<环形系列>配置项格式不对");
  }
  // 为系列实现, “颜色平等”
  const finalColorArr = colorArr.map((color, i) => {
    if (color === "noColor") {
      color = componentThemeConfig
        ? componentThemeConfig.pureColors[(~~(Math.random() * 10)) % 7]
        : defaultColorArr[~~(Math.random() * 10)];
    }
    return color;
  });
  // 有可能用户数据中的系列数大于 静态数据中的系列数,所以需要手动给多出来的系列补上对应的颜色
  if (finalColorArr.length < originalPieData.length) {
    const lackValue = originalPieData.length - finalColorArr.length;
    for (let i = 0; i < lackValue; i++) {
      const randomColor = componentThemeConfig
        ? componentThemeConfig.pureColors[(~~(Math.random() * 10)) % 7]
        : defaultColorArr[~~(Math.random() * 10)];
      finalColorArr.push(randomColor);
    }
  }

  /** ++++++++++++++++++++++ ↓↓ 图例相关 ↓↓ ++++++++++++++++++++++ */
  /** =========================================================== */
  // 可以选择 图例后面是否显示 以及如果显示，显示的是该系列对应的具体数量还是百分比
  const seriesNumberReflect = {};
  switch (numberFormat) {
    // 这种情况直接给seriesNumberReflect里全部设置为空字符串
    // 直接去legend.formatter里根据 numberFormat === 'noDisplay' 的结果返回对应的值也可以,但是不推荐
    case "noDisplay":
      originalPieData.forEach((item) => {
        const { name } = item;
        seriesNumberReflect[name] = "";
      });
      break;
    case "percent":
      originalPieData.forEach((item) => {
        const { name, value } = item;
        const percentValue = `${+(value / total).toFixed(2) * 100}%`;
        seriesNumberReflect[name] = percentValue;
      });
      break;
    case "specificNumber":
      originalPieData.forEach((item) => {
        const { name, value } = item;
        seriesNumberReflect[name] = value;
      });
      break;
  }

  // 为了能够让 <图例部分> 百分比文本 对应上系列色, 自定义rich对象
  const fs = legendTextStyle.fontSize;
  const fw = legendTextStyle.fontWeight;
  const textColorRich = {
    text: {
      color: componentThemeConfig
        ? componentThemeConfig.textColor
        : legendTextStyle.color,
      fontSize: fs,
      fontWeight: fw,
    },
  };
  // 错误格式： { 恶意拦截: {color: 'red'} }
  // @o_O Mark-3 rich对象中用类似 “恶意拦截” 这样的字符串做key最后会不生效,所以这儿将 系列名 映射 成 0,1,2,3这样的数字，方便在legend.formatter中使用
  const seriesName2number = {};
  originalPieData.forEach(({ name }, index) => {
    textColorRich[index] = {
      color: finalColorArr[index],
      fontSize: fs,
      fontWeight: fw,
    };
    seriesName2number[name] = index;
  });


  /** ++++++++++++++++++++++ ↓↓ 标签相关 ↓↓++++++++++++++++++++++ */
  /** =========================================================== */
  // 整合标签富文本样式
  const themeTextColorObj = componentThemeConfig ? {
    color: componentThemeConfig.textColor
  } : {};
  const labelTextColorRich = {
    a: { ...labelSeriesNameTextStyle },
    b: { ...labelDataNameTextStyle },
    c: { ...labelDataValueTextStyle },
    d: { ...labelPercentageTextStyle }
  };
  // 将各个系列的颜色 加入到rich中
  finalColorArr.forEach((item, index) => {
    let finalFollowSeriesStyle = {
      color: item
    };
    // 若 “跟随系列”, 则系列的字体大小等属性也需要继承
    if (seriesNameUseSeriesColor) {
      finalFollowSeriesStyle = {
        ...labelSeriesNameTextStyle,
        color: item,
      };
      labelTextColorRich[index + "seriesName"] = finalFollowSeriesStyle;
    }
    if (dataNameUseSeriesColor) {
      finalFollowSeriesStyle = {
        ...labelDataNameTextStyle,
        color: item,
      };
      labelTextColorRich[index + "dataName"] = finalFollowSeriesStyle;
    }
    if (dataValueUseSeriesColor) {
      finalFollowSeriesStyle = {
        ...labelDataValueTextStyle,
        color: item,
      };
      labelTextColorRich[index + "dataValue"] = finalFollowSeriesStyle;
    }
    if (percentageUseSeriesColor) {
      finalFollowSeriesStyle = {
        ...labelPercentageTextStyle,
        color: item,
      };
      labelTextColorRich[index + "percentage"] = finalFollowSeriesStyle;
    }
    // labelTextColorRich[index] = finalFollowSeriesStyle
  });
  // console.log('转换后的labelTextColorRich', labelTextColorRich);

  const getOption = () => {
    // code for @o_O Mark-1
    const filterEmptyNameArr = canSetGapPieData.filter(
      (item) => item.name !== ""
    );
    return {
      color: finalColorArr,
      title: [
        {
          show: showMainTextSetting,
          text: hadFormatTotal,
          top: `${mainTextVertical}%`,
          left: `${mainTextHorizontal}%`,
          textAlign: "center",
          textVerticalAlign: "center",
          [showMainTextSetting && "textStyle"]: {
            fontFamily: mainTextStyle.fontFamily,
            color: mainTextStyle.textColor,
            fontSize: mainTextStyle.fontSize,
            fontWeight: mainTextStyle.bold ? "bold" : "normal",
            fontStyle: mainTextStyle.italic ? "italic" : "normal",
          },
          overflow: "breakAll",
        },
        {
          show: showSubTextSetting,
          text: subText,
          top: `${subTextVertical}%`,
          left: `${subTextHorizontal}%`,
          textAlign: "center",
          textVerticalAlign: "center",
          [showSubTextSetting && "textStyle"]: {
            fontFamily: subTextStyle.fontFamily,
            color: subTextStyle.textColor,
            fontSize: subTextStyle.fontSize,
            fontWeight: subTextStyle.bold ? "bold" : "normal",
            fontStyle: subTextStyle.italic ? "italic" : "normal",
          },
          overflow: "breakAll",
        },
      ],
      tooltip: {
        show: false,
      },
      legend: {
        width: "100%",
        height: "100%",
        data: filterEmptyNameArr,
        formatter: (name) => {
          return (
            `{text|${name}} ` +
            `{${seriesName2number[name]}| ${seriesNumberReflect[name]}}`
          );
        },
        icon: symbolShape,
        show: showLegend,
        itemGap: legendItemGap,
        itemWidth: legendItemWidth,
        itemHeight: legendItemHeight,
        orient: legendOrient,
        left: legendOffset.legendOffsetX,
        top: legendOffset.legendOffsetY,
        [showLegend && "textStyle"]: {
          fontFamily: legendTextStyle.fontFamily,
          color: finalColorArr,
          rich: textColorRich,
        },
      },
      series: [
        {
          name: "nightingaleChart",
          type: "pie",
          roseType: "radius",
          radius: [`${innerRadius}%`, `${outerRadius}%`],
          center: [`${ringPositionX}%`, `${ringPositionY}%`],
          avoidLabelOverlap: false,
          [showBlockStyle && "itemStyle"]: {
            borderRadius: blockRadius,
            borderColor: blockStrokeColor,
            // borderWidth: blockGap,
          },
          label: {
            show: showLabel,
            formatter: (params) => {
              const { placeholderFlag } = params.data;
              const { seriesName, name, value, percent } = params;
              // placeholderFlag 是在添加区块间隔占位数据时自定义的 占位标识
              if (placeholderFlag === "placeholderFlag") {
                return "";
              }
              // 如果没有选择“跟随系列”, 那么就用自定义的样式(即默认rich)
              let seriesNameStr = `{a|${labelSeriesName ? seriesName : ""}}`;
              let dataNameStr = `{b|${labelDataName ? name : ""}}`;
              let dataValueStr = `{c|${labelDataValue ? value : ""}}`;
              let percentageStr = `{d|${labelPercentage ? percent + "%" : ""}}`;
              //@Mark** echarts标签能展示的共有四个字段: 系列名、数据名、数据值、百分比。 <<每个字段都有被用户勾选上 ”跟随系列“ 的可能>>
              // 因为echarts  rich对象中的key不能有汉字,所以用'0','1'来作一层转换, 即通过 seriesName2number 将<系列1> 映射成了'0',
              // seriesName2number[name]最终取得的就是 0,1....这样的字符串, 这儿使用不直接使用'0','1',而是选择用<<数字>>拼接上<<字段名>>('0seriesName')是为了实现：在某个字段的颜色”跟随系列“的时候,让其保留原来的fontSize等属性
              if (seriesNameUseSeriesColor) {
                seriesNameStr = `{${seriesName2number[name] + "seriesName"}|${labelSeriesName ? seriesName : ""}}`;
              }
              if (dataNameUseSeriesColor) {
                dataNameStr = `{${seriesName2number[name] + "dataName"}|${labelDataName ? name : ""}}`;
              }
              if (dataValueUseSeriesColor) {
                dataValueStr = `{${seriesName2number[name] + "dataValue"}|${labelDataValue ? value : ""}}`;
              }
              if (percentageUseSeriesColor) {
                percentageStr = `{${seriesName2number[name] + "percentage"}|${labelPercentage ? percent + "%" : ""}}`;
              }
              return `${seriesNameStr}  ${dataNameStr}   ${dataValueStr}   ${percentageStr}`;
            },
            rich: labelTextColorRich
          },
          labelLine: {
            length: line1Length,
            length2: line2Length,
            lineStyle: {
              width: lineWidth,
            },
          },
          emphasis: {
            label: {
              show: showLabel,
            },
          },
          data: canSetGapPieData,
        },
      ],
    };
  };

  const onChartClick = (param) => {
    if (Array.isArray(componentConfig.drillDownArr) && componentConfig.drillDownArr.length) {
      const _data = componentData.find(item => item[fieldKey[0]] === param.name)
      // drillDownArray长度不为零, 需要下钻
      if (typeof props.onChange === 'function') {
        props.onChange(_data)
      }
    } else {
      // do something
    }
  }
  const onChartReady = (echarts) => { console.log(); };
  let onEvents = {
    click: onChartClick,
  };
  return (
    <EC option={getOption()} onChartReady={onChartReady} onEvents={onEvents} />
  );
};

export { Nightingale, ComponentDefaultConfig };
export default memo(Nightingale);
