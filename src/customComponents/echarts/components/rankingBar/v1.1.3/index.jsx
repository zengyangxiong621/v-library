/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import ComponentDefaultConfig from "./config";;
import * as echarts from "echarts";;
import EC from "../../../EC";;
import React from "react";;

// 数据升降序排序
const sortFn = (arr, sortOrder = "DESC") => {
  return arr.sort((a, b) => {
    return a.numerical > b.numerical
      ? sortOrder === "DESC"
        ? -1
        : 1
      : sortOrder === "DESC"
        ? 1
        : -1;;
  });
};
const getSymbolData = (data) => {
  let arr = [];
  for (var i = 0; i < data.length; i++) {
    arr.push({
      value: data[i],
      symbolPosition: "end",
    });
  }
  return arr;
};

const RankingBar = (props) => {
  const componentConfig = props.componentConfig || ComponentDefaultConfig;
  const { config } = componentConfig;
  const { data } = componentConfig.staticData;
  const componentData = props.comData || data; // 过滤后的数据
  const fieldKey = props.fields || ["classify", "numerical"];
  const componentThemeConfig = props.themeConfig;

  const replaceThemeColor = (arr, colorIndex = 0) => {
    arr.forEach((item) => {
      let index = colorIndex || 0;
      let { name, value, options, flag, type, key } = item;
      if (Object.prototype.hasOwnProperty.call(item, "value")) {
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
                ).color;;
                break;
              case "themeGradientColorEnd":
                item.value = componentThemeConfig.gradientColors[index % 7].find(
                  (item) => item.offset === 100
                ).color;;
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
          // 对 bySystem 做特殊处理
          if (name === "bySystem") {
            item.value = false;
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

  // 获取样式配置信息
  const getTargetConfig = (Arr) => {
    let targetConfig = {};
    Arr.forEach((item) => {
      let { name, value, options } = item;
      if (Object.prototype.hasOwnProperty.call(item, "value")) {
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
  const { autoSort, sortOrder, maxBars, spacing, batteryStyle, animation, hyperlinks } =
    allSettings["图表"];;
  const { classify, numerical } = allSettings["文本"];
  const { barWidth, colorSetting, isRadius, highLight, symbolMargin } = allSettings["柱状"];
  if (componentThemeConfig) {
    colorSetting && (colorSetting.bySystem = false);
  }
  let resultTempData = Array.isArray(componentData)
    ? componentData.reduce((pre, cur) => {
      return pre.concat({
        classify: cur[fieldKey[0]],
        numerical: cur[fieldKey[1]],
      });;
    }, [])
    : [];;

  if (autoSort) {
    resultTempData = sortFn(resultTempData, sortOrder);
  }
  const resultData = resultTempData;

  const salvProName = resultData.map((item) => item.classify);;
  const salvProValue = resultData.map((item) => item.numerical);;
  const maxData = Math.max(...salvProValue) * 1.5;
  const salvProMax = new Array(resultData.length).fill(maxData);

  const groupNum = Math.ceil(resultData.length / maxBars);
  const arrGroup = [];
  for (let i = 0; i < resultData.length; i += maxBars) {
    //数据按个数分组存储
    arrGroup.push(resultData.slice(i, i + maxBars));
  }

  let options = [];
  for (let i = 0; i < groupNum; i++) {
    const salvProName = arrGroup[i].map((item) => item.classify);;
    const salvProValue = arrGroup[i].map((item) => item.numerical);;
    const salvProMax = new Array(arrGroup[i].length).fill(maxData);
    let temp = {
      yAxis: [{ data: salvProName }, { data: salvProName }],
      series: [
        !batteryStyle && { data: salvProValue },
        { data: salvProMax },
        highLight.show && { data: getSymbolData(salvProValue) },
        batteryStyle && { data: salvProValue },
      ],
    };
    if (batteryStyle && !colorSetting?.bySystem && colorSetting?.barColor?.type === "gradient") {
      temp = {
        yAxis: [{ data: salvProName }, { data: salvProName }],
        series: [
          { data: salvProValue },
          highLight.show && { data: getSymbolData(salvProValue) },
          { data: salvProValue },
          { data: salvProMax },
        ],
      };
    }
    options.push(temp);
  }

  /**
   ** description: 整合之前所得到的所有参数以生成最终的 echarts Option
   */
  const getOption = () => {
    let series = [
      !batteryStyle && {
        name: "值",
        type: "bar",
        zlevel: 1,
        label: {
          normal: {
            show: true,
            position: [`${classify.offset.offsetX}px`, `${classify.offset.offsetY}%`],
            formatter: "{b}",
            textStyle: {
              color: componentThemeConfig
                ? componentThemeConfig.textColor
                : classify?.font?.themeTextColor || "#fff",
              fontSize: classify.font.fontSize,
              fontFamily: classify.font.fontFamily,
              fontWeight: classify.font.bold ? "bold" : "normal",
              fontStyle: classify.font.italic ? "italic" : "normal",
            },
          },
        },
        itemStyle: {
          normal: {
            barBorderRadius: isRadius ? 30 : 0,
            color: function (params) {
              var colorList = ["rgba(72,255,156,1)", "rgba(72,168,255, 1)", "rgba(255,251,116, 1)", "rgba(255,115,104, 1)", "rgba(113,129,226, 1)"];
              return colorSetting?.bySystem
                ? colorList[params?.dataIndex % 5]
                : colorSetting?.barColor?.type === "pure"
                  ? componentThemeConfig
                    ? componentThemeConfig.pureColors[0]
                    : colorSetting?.barColor?.themePureColor || "#1890ff"
                  : colorSetting?.barColor?.type === "gradient"
                    ? new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0,
                        color: componentThemeConfig
                          ? componentThemeConfig.gradientColors[0].find((item) => item.offset === 0)
                            .color
                          : colorSetting?.barColor?.themeGradientColorStart || "#335DA3",
                      },
                      {
                        offset: 1,
                        color: componentThemeConfig
                          ? componentThemeConfig.gradientColors[0].find((item) => item.offset === 100)
                            .color
                          : colorSetting?.barColor?.themeGradientColorEnd || "#95D0FF",
                      },
                    ])
                    : "#1890ff";
            },
          },
        },
        barWidth: barWidth?.unit === "%" ? `${barWidth?.width}%` : barWidth?.width || "30%",
        data: salvProValue,
      },
      {
        name: "背景",
        type: "bar",
        barWidth: barWidth?.unit === "%" ? `${barWidth?.width}%` : barWidth?.width || "30%",
        barGap: "-100%",
        data: salvProMax,
        label: {
          normal: {
            show: true,
            position: [`${numerical.offset.offsetX}%`, `${numerical.offset.offsetY}px`],
            formatter: (data) => salvProValue[salvProName.indexOf(data.name)],
            textStyle: {
              color: componentThemeConfig
                ? componentThemeConfig.textColor
                : numerical?.font?.themeTextColor || "#fff",
              fontSize: numerical.font.fontSize,
              fontFamily: numerical.font.fontFamily,
              fontWeight: numerical.font.bold ? "bold" : "normal",
              fontStyle: numerical.font.italic ? "italic" : "normal",
            },
          },
        },
        itemStyle: {
          normal: {
            color: function (params) {
              var colorList = ["rgba(72,255,156, .4)", "rgba(72,168,255, .4)", "rgba(255,251,116, .4)", "rgba(255,115,104, .4)", "rgba(113,129,226, .4)"];
              return colorSetting?.bySystem
                ? colorList[params.dataIndex % 5]
                : colorSetting?.bgColor;
            },
            barBorderRadius: isRadius ? 30 : 0,
          },
        },
      },
      highLight.show && {
        name: "外圆",
        type: "pictorialBar",
        hoverAnimation: false,
        data: getSymbolData(salvProValue),
        symbol: `image://${highLight.icon}`,
        symbolSize: [highLight.radius, highLight.radius],
        symbolOffset: [highLight.offset, 0],
        zlevel: 2,
      },
      batteryStyle && {
        type: "pictorialBar",
        itemStyle: {
          color: function (params) {
            var colorList = ["rgba(72,255,156, 1)", "rgba(72,168,255, 1)", "rgba(255,251,116, 1)", "rgba(255,115,104, 1)", "rgba(113,129,226, 1)"];
            return colorSetting?.bySystem
              ? colorList[params.dataIndex % 5]
              : colorSetting?.barColor?.type === "pure"
                ? componentThemeConfig
                  ? componentThemeConfig.pureColors[0]
                  : colorSetting?.barColor?.themePureColor || "#1890ff"
                : colorSetting?.barColor?.type === "gradient"
                  ? new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    {
                      offset: 0,
                      color: componentThemeConfig
                        ? componentThemeConfig.gradientColors[0].find((item) => item.offset === 0)
                          .color
                        : colorSetting?.barColor?.themeGradientColorStart || "#335DA3",
                    },
                    {
                      offset: 1,
                      color: componentThemeConfig
                        ? componentThemeConfig.gradientColors[0].find((item) => item.offset === 100)
                          .color
                        : colorSetting?.barColor?.themeGradientColorEnd || "#95D0FF",
                    },
                  ])
                  : "#1890ff";
          },
        },
        label: {
          normal: {
            show: true,
            position: [`${classify.offset.offsetX}px`, `${classify.offset.offsetY}%`],
            formatter: "{b}",
            textStyle: {
              color: componentThemeConfig
                ? componentThemeConfig.textColor
                : classify?.font?.themeTextColor || "#fff",
              fontSize: classify.font.fontSize,
              fontFamily: classify.font.fontFamily,
              fontWeight: classify.font.bold ? "bold" : "normal",
              fontStyle: classify.font.italic ? "italic" : "normal",
            },
          },
        },
        symbolRepeat: "fixed",
        symbolMargin: symbolMargin,
        symbol: "roundRect",
        symbolClip: true,
        symbolSize: [
          barWidth?.unit === "%" ? `${barWidth?.width * 0.2}%` : barWidth?.width * 0.2,
          barWidth?.unit === "%" ? `${barWidth?.width * 0.4}%` : barWidth?.width * 0.4,
        ],
        symbolPosition: "start",
        symbolOffset: [
          barWidth?.unit === "%" ? `${barWidth?.width * 0.2}%` : barWidth?.width * 0.2,
          0,
        ],
        data: salvProValue,
        zlevel: 2,
      },
    ];
    if (batteryStyle && !colorSetting?.bySystem && colorSetting?.barColor?.type === "gradient") {
      series = [
        {
          name: "值",
          type: "bar",
          label: {
            normal: {
              show: true,
              position: [`${classify.offset.offsetX}px`, `${classify.offset.offsetY}%`],
              formatter: "{b}",
              textStyle: {
                color: componentThemeConfig
                  ? componentThemeConfig.textColor
                  : classify?.font?.themeTextColor || "#fff",
                fontSize: classify.font.fontSize,
                fontFamily: classify.font.fontFamily,
                fontWeight: classify.font.bold ? "bold" : "normal",
                fontStyle: classify.font.italic ? "italic" : "normal",
              },
            },
          },
          itemStyle: {
            normal: {
              barBorderRadius: isRadius ? 30 : 0,
              color: function (params) {
                var colorList = ["rgba(72,255,156,1)", "rgba(72,168,255, 1)", "rgba(255,251,116, 1)", "rgba(255,115,104, 1)", "rgba(113,129,226, 1)"];
                return colorSetting?.bySystem
                  ? colorList[params?.dataIndex % 5]
                  : colorSetting?.barColor?.type === "pure"
                    ? componentThemeConfig
                      ? componentThemeConfig.pureColors[0]
                      : colorSetting?.barColor?.themePureColor || "#1890ff"
                    : colorSetting?.barColor?.type === "gradient"
                      ? new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                        {
                          offset: 0,
                          color: componentThemeConfig
                            ? componentThemeConfig.gradientColors[0].find((item) => item.offset === 0)
                              .color
                            : colorSetting?.barColor?.themeGradientColorStart || "#335DA3",
                        },
                        {
                          offset: 1,
                          color: componentThemeConfig
                            ? componentThemeConfig.gradientColors[0].find(
                              (item) => item.offset === 100
                            ).color
                            : colorSetting?.barColor?.themeGradientColorEnd || "#95D0FF",
                        },
                      ])
                      : "#1890ff";
              },
            },
          },
          barWidth: barWidth?.unit === "%" ? `${barWidth?.width * 0.4}%` : barWidth?.width * 0.4,
          data: salvProValue,
          z: 1,
        },
        highLight.show && {
          name: "外圆",
          type: "pictorialBar",
          hoverAnimation: false,
          data: getSymbolData(salvProValue),
          symbol: `image://${highLight.icon}`,
          symbolSize: [highLight.radius, highLight.radius],
          symbolOffset: [highLight.offset, 0],
          z: 12,
        },
        //分隔
        {
          type: "pictorialBar",
          itemStyle: {
            color: colorSetting?.barColor?.splitLineColor || "#102862",
          },
          symbolRepeat: "fixed",
          symbolMargin: symbolMargin,
          symbol: "rect",
          symbolClip: true,
          symbolSize: [
            barWidth?.unit === "%" ? `${barWidth?.width * 0.2}%` : barWidth?.width * 0.2,
            barWidth?.unit === "%" ? `${barWidth?.width * 0.4}%` : barWidth?.width * 0.4,
          ],
          symbolPosition: "start",
          symbolOffset: [0, 0],
          data: salvProValue,
          z: 2,
        },
        {
          name: "背景",
          type: "bar",
          yAxisIndex: 1,
          barWidth: barWidth?.unit === "%" ? `${barWidth?.width}%` : barWidth?.width,
          barGap: "-100%",
          data: salvProMax,
          label: {
            normal: {
              show: true,
              position: [`${numerical.offset.offsetX}%`, `${numerical.offset.offsetY}px`],
              formatter: (data) => salvProValue[salvProName.indexOf(data.name)],
              textStyle: {
                color: componentThemeConfig
                  ? componentThemeConfig.textColor
                  : numerical?.font?.themeTextColor || "#fff",
                fontSize: numerical.font.fontSize,
                fontFamily: numerical.font.fontFamily,
                fontWeight: numerical.font.bold ? "bold" : "normal",
                fontStyle: numerical.font.italic ? "italic" : "normal",
              },
            },
          },
          itemStyle: {
            normal: {
              color: function (params) {
                var colorList = ["rgba(72,255,156, .4)", "rgba(72,168,255, .4)", "rgba(255,251,116, .4)", "rgba(255,115,104, .4)", "rgba(113,129,226, .4)"];
                return colorSetting?.bySystem
                  ? colorList[params.dataIndex % 5]
                  : colorSetting?.bgColor;
              },
              barBorderRadius: isRadius ? 30 : 0,
            },
          },
        },
      ];
    }

    const res = {
      baseOption: {
        timeline: {
          show: false,
          axisType: "category",
          autoPlay: animation?.show || false,
          playInterval: animation?.intervalTime * 1000 || 5000,
          data: arrGroup,
          label: {
            formatter: function (s) {
              return "";
            },
          },
          currentIndex: 0,
        },
        grid: {
          left: `${+spacing.left}`,
          right: `${+spacing.right}`,
          bottom: `${+spacing.bottom}`,
          top: `${+spacing.top}`,
          containLabel: true,
        },
        xAxis: {
          show: false,
          type: "value",
        },
        yAxis: [
          {
            type: "category",
            inverse: true,
            axisLabel: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            data: salvProName,
          },
          {
            show: false,
            data: salvProName,
            inverse: true,
            axisLine: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series,
      },
      options,
    };
    return res;
  };

  const isEmpty = (str) => {
    let res = false;
    if (!str) {
      res = true;
    } else if (str && !str.trim()) {
      res = true;
    }
    return res;
  };

  const onChartClick = (param, echarts) => {
    const target = componentData.find((item) => item[fieldKey[0]] === param.name);;
    props.onChange(target);
    if (hyperlinks.show && !isEmpty(hyperlinks.baseUrl) && !isEmpty(hyperlinks.field)) {
      window.open(`${hyperlinks.baseUrl}?param=${target[hyperlinks.field]}`, "_blank");
    }
  };
  const onChartReady = (echarts) => {
    // todo
  };;
  let onEvents = {
    click: onChartClick,
  };
  return <EC option={getOption()} onChartReady={onChartReady} onEvents={onEvents} />;;
};

export { RankingBar, ComponentDefaultConfig };
export default RankingBar;
