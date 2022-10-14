const ComponentDefaultConfig = {
  id: "",
  uniqueTag: "",
  name: "立体柱状图",
  parentId: "",
  dashboardId: "", //画布id

  moduleName: "stereoscopicBar",
  moduleVersion: "1.0.1",

  createdAt: "2022-04-02T07:22:31.290Z",
  updatedAt: "2022-04-02T07:22:39.798Z",

  autoUpdate: { isAuto: false, interval: 10 },
  thumb: "",
  dataFrom: 0,
  dataConfig: {}, //数据源配置
  dataType: "static", //数据类型：static;mysql;api;clickhouse
  dataContainers: [],
  staticData: {
    data: [
      {
        x: "01/01",
        y: 320,
        s: "系列一",
      },
      {
        x: "02/01",
        y: 200,
        s: "系列一",
      },
      {
        x: "03/01",
        y: 60,
        s: "系列一",
      },
      {
        x: "04/01",
        y: 280,
        s: "系列一",
      },
      {
        x: "05/01",
        y: 200,
        s: "系列一",
      },
      {
        x: "06/01",
        y: 200,
        s: "系列一",
      },
      // {
      //   x: "01/01",
      //   y: 180,
      //   s: "系列二",
      // },
      // {
      //   x: "02/01",
      //   y: 100,
      //   s: "系列二",
      // },
      // {
      //   x: "03/01",
      //   y: 215,
      //   s: "系列二",
      // },
      // {
      //   x: "04/01",
      //   y: 107,
      //   s: "系列二",
      // },
      // {
      //   x: "05/01",
      //   y: 110,
      //   s: "系列二",
      // },
      // {
      //   x: "06/01",
      //   y: 110,
      //   s: "系列二",
      // },
      // {
      //   x: "01/01",
      //   y: 220,
      //   s: "系列3",
      // },
      // {
      //   x: "02/01",
      //   y: 220,
      //   s: "系列3",
      // },
      // {
      //   x: "03/01",
      //   y: 222,
      //   s: "系列3",
      // },
      // {
      //   x: "04/01",
      //   y: 227,
      //   s: "系列3",
      // },
      // {
      //   x: "05/01",
      //   y: 220,
      //   s: "系列3",
      // },
      // {
      //   x: "06/01",
      //   y: 220,
      //   s: "系列3",
      // },
    ],
    fields: [
      {
        name: "x",
        value: "x",
        desc: "类目",
      },
      {
        name: "y",
        value: "y",
        desc: "值",
      },
      {
        name: "s",
        value: "s",
        desc: "系列",
      },
    ],
  },
  config: [
    {
      displayName: "位置尺寸",
      name: "dimension",
      type: "dimensionGroup",
      config: {
        lock: false,
      },
      value: [
        {
          displayName: "X轴坐标",
          name: "left",
          value: 267,
        },
        {
          displayName: "Y轴坐标",
          name: "top",
          value: 73,
        },
        {
          displayName: "宽度",
          name: "width",
          value: 800,
        },
        {
          displayName: "高度",
          name: "height",
          value: 600,
        },
      ],
    },
    {
      displayName: "默认隐藏",
      name: "hideDefault",
      type: "checkBox",
      value: false,
    },
    {
      name: "allSettings",
      displayName: "全部设置",
      type: "tabs",
      activeKey: "1",
      options: [
        {
          key: "tubiao",
          name: "图表",
          value: [
            {
              name: "spacing",
              displayName: "边距",
              type: "padding",
              value: {
                top: 50,
                right: 20,
                bottom: 20,
                left: 40,
              },
            },
            {
              displayName: "起始颜色",
              // name: "areaStartColor",
              name: "themeGradientColorStart",
              type: "color",
              value: "rgba(51, 104, 206,0.6)",
            },
            {
              displayName: "结束颜色",
              // name: "areaEndColor",
              name: "themeGradientColorEnd",
              type: "color",
              value: "rgba(180, 21, 177,0.1)",
            },
            // 暂时不要外间距
            // {
            //   name: "outerMargin",
            //   displayName: "外间距",
            //   value: 20,
            //   type: "range",
            //   config: {
            //     min: 0,
            //     max: 50,
            //     step: 1,
            //     suffix: "%",
            //   },
            // },
            // {
            //   name: "legendSettings",
            //   displayName: "图例",
            //   type: "collapse",
            //   hasSwitch: true,
            //   defaultExpand: true,
            //   value: [
            //     {
            //       name: "show",
            //       displayName: "",
            //       value: true,
            //       type: "switch",
            //     },
            //     {
            //       name: "legendTextStyle",
            //       displayName: "文本样式",
            //       type: "textFullStyleGroup",
            //       value: [
            //         {
            //           name: "fontFamily",
            //           displayName: "",
            //           value: "Microsoft Yahei",
            //         },
            //         {
            //           name: "fontSize",
            //           displayName: "",
            //           value: 20,
            //         },
            //         {
            //           name: "color",
            //           displayName: "",
            //           type: "color",
            //           value: "#fff",
            //         },
            //         {
            //           name: "bold",
            //           displayName: "",
            //           value: false,
            //         },
            //         {
            //           name: "italic",
            //           displayName: "",
            //           value: false,
            //         },
            //         {
            //           name: "letterSpacing",
            //           displayName: "字距",
            //           value: 0,
            //         },
            //         {
            //           name: "lineHeight",
            //           displayName: "行距",
            //           value: 0,
            //         },
            //       ],
            //     },
            //     {
            //       name: "iconSize",
            //       displayName: "图标尺寸",
            //       type: "inputNumber2",
            //       showDetail: true,
            //       value: [
            //         {
            //           name: "iconWidth",
            //           displayName: "宽度",
            //           type: "number",
            //           value: 30,
            //           config: {
            //             min: 0,
            //             suffix: "px",
            //           },
            //         },
            //         {
            //           name: "iconHeight",
            //           displayName: "高度",
            //           type: "number",
            //           value: 20,
            //           config: {
            //             min: 0,
            //             suffix: "px",
            //           },
            //         },
            //       ],
            //     },
            //     {
            //       name: "gap",
            //       displayName: "间距",
            //       value: 25,
            //       type: "number",
            //       config: {
            //         min: -10000,
            //         max: 10000,
            //         step: 1,
            //         suffix: "px",
            //       },
            //     },
            //     {
            //       name: "offset",
            //       displayName: "偏移",
            //       type: "inputNumber2",
            //       showDetail: true,
            //       value: [
            //         {
            //           name: "legendOffsetX",
            //           displayName: "X",
            //           type: "number",
            //           value: 250,
            //           config: {
            //             min: -10000,
            //             suffix: "px",
            //           },
            //         },
            //         {
            //           name: "legendOffsetY",
            //           displayName: "Y",
            //           type: "number",
            //           value: 50,
            //           config: {
            //             min: -10000,
            //             suffix: "px",
            //           },
            //         },
            //       ],
            //     },
            //   ],
            // },
          ],
        },
        {
          key: "zuobiaozhou",
          name: "坐标轴",
          value: [
            {
              name: "axisSettings",
              displayName: "坐标轴设置",
              type: "tabs",
              activeKey: "1",
              options: [
                {
                  key: "axisX",
                  name: "X轴",
                  value: [
                    {
                      name: "xAxisLabel",
                      displayName: "轴标签",
                      type: "collapse",
                      hasSwitch: false,
                      defaultExpand: false,
                      value: [
                        {
                          name: "show",
                          displayName: "",
                          value: true,
                          type: "switch",
                        },
                        {
                          name: "xAxisLabelTextStyle",
                          displayName: "文本样式",
                          type: "textFullStyleGroup",
                          value: [
                            {
                              name: "fontFamily",
                              displayName: "",
                              value: "Microsoft Yahei",
                            },
                            {
                              name: "fontSize",
                              displayName: "",
                              value: 20,
                            },
                            {
                              // name: "color",
                              name: "themeTextColor",
                              displayName: "",
                              type: "color",
                              value: "#fff",
                            },
                            {
                              name: "bold",
                              displayName: "",
                              value: false,
                            },
                            {
                              name: "italic",
                              displayName: "",
                              value: false,
                            },
                            {
                              name: "letterSpacing",
                              displayName: "字距",
                              value: 0,
                            },
                            {
                              name: "lineHeight",
                              displayName: "行距",
                              value: 0,
                            },
                          ],
                        },
                        {
                          name: "xAxisLabelRotate",
                          displayName: "角度",
                          value: 0,
                          type: "range",
                          config: {
                            min: 0,
                            max: 360,
                            step: 1,
                            suffix: "deg",
                          },
                        },
                      ],
                    },
                    {
                      name: "xAxisLine",
                      displayName: "轴线",
                      type: "collapse",
                      hasSwitch: true,
                      defaultExpand: true,
                      value: [
                        {
                          name: "show",
                          displayName: "",
                          value: true,
                          type: "switch",
                        },
                        {
                          // name: "xAxisLineColor",
                          name: "themeAssistColor",
                          displayName: "颜色",
                          type: "color",
                          value: "#fff",
                        },
                        {
                          name: "xAxisLineWeight",
                          displayName: "粗细",
                          value: 2,
                          type: "number",
                          config: {
                            min: 0,
                            max: 100,
                            step: 1,
                            suffix: "px",
                          },
                        },
                      ],
                    },
                    {
                      name: "blankOfSides",
                      displayName: "两边留白",
                      type: "switch",
                      value: true,
                    },
                    {
                      hasSwitch: true,
                      defaultExpand: true,
                      displayName: '网格线',
                      name: 'xGridLine',
                      type: 'collapse',
                      value: [
                        {
                          displayName: '',
                          name: 'showXGridLine',
                          type: 'switch',
                          value: false,
                        },
                        {
                          name: 'xGridLineType',
                          displayName: '线条类型',
                          type: 'select',
                          value: 'solid',
                          options: [
                            {
                              name: 'solid',
                              value: 'solid',
                            },
                            {
                              name: 'dashed',
                              value: 'dashed',
                            },
                            {
                              name: 'dotted',
                              value: 'dotted',
                            },
                          ],
                        },
                        {
                          displayName: '颜色',
                          // name: 'xGridLineColor',
                          name: "themeGridColor",
                          type: 'color',
                          value: '#fff',
                        },
                        {
                          displayName: '粗细',
                          name: 'xGridLineWeight',
                          type: 'number',
                          value: 1,
                          config: {
                            min: 0,
                            max: 100,
                            step: 1,
                            suffix: 'px',
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  key: "axisY",
                  name: "Y轴",
                  value: [
                    {
                      name: "yAxisLabel",
                      displayName: "轴标签",
                      type: "collapse",
                      hasSwitch: false,
                      defaultExpand: false,
                      value: [
                        {
                          name: "show",
                          displayName: "",
                          value: true,
                          type: "switch",
                        },
                        {
                          name: "yAxisLabelTextStyle",
                          displayName: "文本样式",
                          type: "textFullStyleGroup",
                          value: [
                            {
                              name: "fontFamily",
                              displayName: "",
                              value: "Microsoft Yahei",
                            },
                            {
                              name: "fontSize",
                              displayName: "",
                              value: 20,
                            },
                            {
                              // name: "color",
                              name: "themeTextColor",
                              displayName: "",
                              type: "color",
                              value: "#fff",
                            },
                            {
                              name: "bold",
                              displayName: "",
                              value: false,
                            },
                            {
                              name: "italic",
                              displayName: "",
                              value: false,
                            },
                            {
                              name: "letterSpacing",
                              displayName: "字距",
                              value: 0,
                            },
                            {
                              name: "lineHeight",
                              displayName: "行距",
                              value: 0,
                            },
                          ],
                        },
                        {
                          name: "yAxisLabelRotate",
                          displayName: "角度",
                          value: 0,
                          type: "range",
                          config: {
                            min: 0,
                            max: 360,
                            step: 1,
                            suffix: "deg",
                          },
                        },
                      ],
                    },
                    {
                      name: "yAxisUnit",
                      displayName: "轴单位",
                      type: "collapse",
                      hasSwitch: true,
                      defaultExpand: false,
                      value: [
                        {
                          name: "yAxisUnitShow",
                          displayName: "",
                          value: false,
                          type: "switch",
                        },
                        {
                          name: "yAxisUnitText",
                          displayName: "内容",
                          value: "单位",
                          type: "input",
                        },
                        {
                          name: "yAxisUnitTextStyle",
                          displayName: "文本样式",
                          type: "textFullStyleGroup",
                          value: [
                            {
                              name: "fontFamily",
                              displayName: "",
                              value: "Microsoft Yahei",
                            },
                            {
                              name: "fontSize",
                              displayName: "",
                              value: 20,
                            },
                            {
                              // name: "color",
                              name: "themeTextColor",
                              displayName: "",
                              type: "color",
                              value: "#fff",
                            },
                            {
                              name: "bold",
                              displayName: "",
                              value: false,
                            },
                            {
                              name: "italic",
                              displayName: "",
                              value: false,
                            },
                            {
                              name: "letterSpacing",
                              displayName: "字距",
                              value: 0,
                            },
                            {
                              name: "lineHeight",
                              displayName: "行距",
                              value: 0,
                            },
                          ],
                        },
                        {
                          name: "yAxisUnitOffset",
                          displayName: "偏移",
                          type: "inputNumber2",
                          showDetail: true,
                          value: [
                            {
                              name: "yAxisUnitOffsetX",
                              displayName: "X",
                              type: "number",
                              value: 0,
                              config: {
                                min: -10000,
                                max: 10000,
                                suffix: "px",
                              },
                            },
                            {
                              name: "yAxisUnitOffsetY",
                              displayName: "Y",
                              type: "number",
                              value: 30,
                              config: {
                                min: -10000,
                                max: 10000,
                                suffix: "px",
                              },
                            },
                          ],
                        },
                      ],
                    },
                    {
                      name: "yAxisLine",
                      displayName: "轴线",
                      type: "collapse",
                      hasSwitch: true,
                      defaultExpand: true,
                      value: [
                        {
                          name: "show",
                          displayName: "",
                          value: true,
                          type: "switch",
                        },
                        {
                          // name: "yAxisLineColor",
                          name: "themeAssistColor",
                          displayName: "颜色",
                          type: "color",
                          value: "#666",
                        },
                        {
                          name: "yAxisLineWeight",
                          displayName: "粗细",
                          value: 2,
                          type: "number",
                          config: {
                            min: 0,
                            max: 100,
                            step: 1,
                            suffix: "px",
                          },
                        },
                      ],
                    },
                    {
                      hasSwitch: true,
                      defaultExpand: true,
                      displayName: '网格线',
                      name: 'yGridLine',
                      type: 'collapse',
                      value: [
                        {
                          displayName: '',
                          name: 'showYGridLine',
                          type: 'switch',
                          value: true,
                        },
                        {
                          name: 'yGridLineType',
                          displayName: '线条类型',
                          type: 'select',
                          value: 'solid',
                          options: [
                            {
                              name: 'solid',
                              value: 'solid',
                            },
                            {
                              name: 'dashed',
                              value: 'dashed',
                            },
                            {
                              name: 'dotted',
                              value: 'dotted',
                            },
                          ],
                        },
                        {
                          displayName: '颜色',
                          // name: 'yGridLineColor',
                          name: "themeGridColor",
                          type: 'color',
                          value: '#585252',
                        },
                        {
                          displayName: '粗细',
                          name: 'yGridLineWeight',
                          type: 'number',
                          value: 1,
                          config: {
                            min: 0,
                            max: 100,
                            step: 1,
                            suffix: 'px',
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          key: "fuzhu",
          name: "辅助",
          value: [
            {
              name: "indicator",
              displayName: "指示器",
              type: "collapse",
              hasSwitch: false,
              defaultExpand: false,
              value: [
                {
                  name: "show",
                  displayName: "",
                  value: true,
                  type: "switch",
                },
                {
                  name: "indicatorWidth",
                  displayName: "粗细",
                  value: 100,
                  type: "number",
                  config: {
                    min: 0,
                    max: 100,
                    step: 1,
                    suffix: "%",
                  },
                },
                {
                  name: "indicatorStyleColor",
                  displayName: "背景",
                  value: "rgba(255,255,255,0.1)",
                  type: "color",
                },
              ],
            },
            {
              name: "tooltip",
              displayName: "提示框",
              type: "collapse",
              hasSwitch: false,
              defaultExpand: false,
              value: [
                {
                  name: "tooltipShow",
                  displayName: "",
                  value: true,
                  type: "switch",
                },
                {
                  name: "tooltipBackColor",
                  displayName: "背景颜色",
                  value: "#fff",
                  type: "color",
                },
                {
                  name: "tooltipBorderColor",
                  displayName: "边框颜色",
                  value: "#fff",
                  type: "color",
                },
                {
                  name: "tooltipOffset",
                  displayName: "偏移",
                  type: "inputNumber2",
                  showDetail: true, // 是否展示下面的文字说明
                  value: [
                    {
                      name: "tooltipOffsetX",
                      displayName: "X",
                      type: "number",
                      value: 0,
                      config: {
                        min: 0,
                        suffix: "px", // 输入框后缀
                      },
                    },
                    {
                      name: "tooltipOffsetY",
                      displayName: "Y",
                      type: "number",
                      value: 0,
                      config: {
                        min: 0,
                        suffix: "px", // 输入框后缀
                      },
                    },
                  ],
                }
              ],
            },
          ],
        },
      ],
    },
  ],
  useFilter: false,
  filters: [],
  events: [],
  callbackArgs: [],
  themes: [
    {
      id: "theme-default",
      name: "系统默认",
    },
    {
      id: "theme-light",
      name: "浅色风格",
    },
    {
      id: "theme-gov-blue",
      name: "政务蓝",
    },
  ],
};

export default ComponentDefaultConfig;
