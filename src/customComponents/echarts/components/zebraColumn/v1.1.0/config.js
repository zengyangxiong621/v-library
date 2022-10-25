const ComponentDefaultConfig = {
  id: "", //组件ID
  uniqueTag: "24e1b3a2-60e0-4cef-8a5d-f04fd645f14b", // =========
  name: "斑马纹理柱状图", //图层名称
  parentId: "", // 父组件 像是2D地图、3D地图 =================
  dashboardId: "", //画布id

  moduleName: "zebraColumn", //组件标识
  moduleVersion: "1.1.0", //组件版本号

  createdAt: "2022-04-02T07:22:31.290Z", // =========
  updatedAt: "2022-04-02T07:22:39.798Z", // =========

  autoUpdate: { isAuto: false, interval: 10 }, // =========
  thumb: "", // 缩略图 // =========
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
                top: 100,
                right: 50,
                bottom: 50,
                left: 80,
              },
            },
            {
              name: "bar",
              displayName: "柱状样式",
              type: "collapse",
              hasSwitch: false,
              defaultExpand: false,
              value: [
                {
                  name: "show",
                  displayName: "",
                  value: false,
                  type: "switch",
                },
                {
                  name: "barBgColor",
                  displayName: "柱子背景",
                  value: "rgba(0,0,0,0.4)", // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
                  type: "color",
                },
              ],
            },
            {
              name: "legendSettings",
              displayName: "图例",
              type: "collapse",
              hasSwitch: true,
              defaultExpand: false,
              value: [
                {
                  name: "show",
                  displayName: "",
                  value: true,
                  type: "switch",
                },
                {
                  name: "legendTextStyle",
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
                  name: "iconSize",
                  displayName: "图标尺寸",
                  type: "inputNumber2",
                  showDetail: true,
                  value: [
                    {
                      name: "iconWidth",
                      displayName: "宽度",
                      type: "number",
                      value: 30,
                      config: {
                        min: 0,
                        suffix: "px",
                      },
                    },
                    {
                      name: "iconHeight",
                      displayName: "高度",
                      type: "number",
                      value: 20,
                      config: {
                        min: 0,
                        suffix: "px",
                      },
                    },
                  ],
                },
                {
                  name: "gap",
                  displayName: "间距",
                  value: 25,
                  type: "number",
                  config: {
                    min: -10000,
                    max: 10000,
                    step: 1,
                    suffix: "px",
                  },
                },
                {
                  name: "offset",
                  displayName: "偏移",
                  type: "inputNumber2",
                  showDetail: true,
                  value: [
                    {
                      name: "legendOffsetX",
                      displayName: "X",
                      type: "number",
                      value: 250,
                      config: {
                        min: -10000,
                        suffix: "px",
                      },
                    },
                    {
                      name: "legendOffsetY",
                      displayName: "Y",
                      type: "number",
                      value: 20,
                      config: {
                        min: -10000,
                        suffix: "px",
                      },
                    },
                  ],
                },
              ],
            },
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
                              value: 12,
                            },
                            {
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
                              value: 20,
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
                      defaultExpand: false,
                      value: [
                        {
                          name: "show",
                          displayName: "",
                          value: true,
                          type: "switch",
                        },
                        {
                          name: "themeAssistColor",
                          displayName: "颜色",
                          type: "color",
                          value: "#fff",
                        },
                        {
                          name: "xAxisLineWeight",
                          displayName: "粗细",
                          value: 1,
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
                              value: 12,
                            },
                            {
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
                          value: true,
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
                              value: 12,
                            },
                            {
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
                      defaultExpand: false,
                      value: [
                        {
                          name: "show",
                          displayName: "",
                          value: true,
                          type: "switch",
                        },
                        {
                          name: "themeAssistColor",
                          displayName: "颜色",
                          type: "color",
                          value: "#fff",
                        },
                        {
                          name: "yAxisLineWeight",
                          displayName: "粗细",
                          value: 1,
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
                      name: "ySplitLine",
                      displayName: "网格线",
                      type: "collapse",
                      hasSwitch: true,
                      defaultExpand: false,
                      value: [
                        {
                          name: "show",
                          displayName: "",
                          value: true,
                          type: "switch",
                        },
                        {
                          name: "themeGridColor",
                          displayName: "颜色",
                          type: "color",
                          value: "#ccc",
                        },
                        {
                          name: "ySplitLineWeight",
                          displayName: "粗细",
                          value: 1,
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
                  ],
                },
              ],
            },
          ],
        },
        {
          key: "xilie",
          name: "系列",
          value: [
            {
              name: "dataSeries",
              displayName: "数据系列",
              type: "tabArray",
              disabled: true,
              defaultActiveKey: "1",
              value: [
                {
                  key: "1",
                  displayName: "系列1",
                  flag: "specialItem",
                  name: "series1",
                  type: "object",
                  value: [
                    {
                      displayName: "映射",
                      name: "mapping",
                      type: "input2",
                      value: [
                        {
                          displayName: "字段名",
                          name: "fieldName",
                          type: "input",
                          value: "系列一",
                        },
                        {
                          displayName: "显示名",
                          name: "displayName",
                          type: "input",
                          value: "系列一",
                        },
                      ],
                    },
                    {
                      name: "barWidth",
                      displayName: "柱状宽度",
                      type: "collapse",
                      hasSwitch: false, // 是否有切换按钮
                      defaultExpand: false, // 是否默认展开
                      value: [
                        {
                          // 如果有后面的按钮，则该项必须放在第一个
                          name: "show",
                          displayName: "",
                          value: true,
                          type: "switch",
                        },
                        {
                          name: "unit",
                          displayName: "宽度单位",
                          type: "radioGroup",
                          direction: "horizontal", // 方向
                          value: "px",
                          options: [
                            {
                              name: "px",
                              value: "px",
                            },
                            {
                              name: "百分比",
                              value: "%",
                            },
                          ],
                        },
                        {
                          name: "width",
                          displayName: "宽度",
                          value: 40,
                          type: "number",
                          config: {
                            min: 1,
                            max: 1000,
                            step: 1,
                            suffix: "", // 输入框后缀
                          },
                        },
                      ],
                    },
                    {
                      name: "barColor",
                      displayName: "柱状颜色",
                      type: "collapse",
                      hasSwitch: false, // 是否有切换按钮
                      defaultExpand: false, // 是否默认展开
                      value: [
                        {
                          // 如果有后面的按钮，则该项必须放在第一个
                          name: "show",
                          displayName: "",
                          value: true,
                          type: "switch",
                        },
                        {
                          name: "type",
                          displayName: "颜色类型",
                          type: "radioGroup",
                          direction: "horizontal", // 方向
                          value: "gradient",
                          options: [
                            {
                              name: "纯色",
                              value: "pure",
                            },
                            {
                              name: "渐变色",
                              value: "gradient",
                            },
                          ],
                        },
                        {
                          name: "themePureColor",
                          displayName: "纯色",
                          value: "#1890ff",
                          type: "color",
                        },
                        {
                          name: "themeGradientColorStart",
                          displayName: "渐变色(始)",
                          value: "#3074FF",
                          type: "color",
                        },
                        {
                          name: "themeGradientColorEnd",
                          displayName: "渐变色(末)",
                          value: "#1CCCFF",
                          type: "color",
                        },
                      ],
                    },
                    {
                      name: "splitLineColor",
                      displayName: "分割线颜色",
                      value: "#1E4081",
                      type: "color",
                    },
                    {
                      name: "barLabel",
                      displayName: "数值标签",
                      type: "collapse",
                      hasSwitch: true,
                      defaultExpand: false,
                      value: [
                        {
                          name: "show",
                          displayName: "",
                          value: true,
                          type: "switch",
                        },
                        {
                          name: "font",
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
                              value: 12,
                            },
                            {
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
              defaultExpand: true,
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
                  value: 60,
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
