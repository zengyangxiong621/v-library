const ComponentDefaultConfig = {
  id: "", //组件ID
  uniqueTag: "", // =========
  name: "饼图", //图层名称
  parentId: "", // 父组件 像是2D地图、3D地图 =================
  dashboardId: "", //画布id

  moduleName: "pie", //组件标识
  moduleVersion: "1.1.5", //组件版本号
  moduleType: "chart",

  createdAt: "2022-04-02T07:22:31.290Z", // =========
  updatedAt: "2022-04-02T07:22:39.798Z", // =========

  autoUpdate: { isAuto: false, interval: 10 }, // =========
  thumb: "", // 缩略图 // =========
  dataFrom: 0,
  dataConfig: {}, //数据源配置
  dataType: "static", //数据类型：static;mysql;api;clickhouse
  dataContainers: [],
  staticData: {
    //静态数据
    data: [
      {
        s: "系列1",
        y: 20,
      },
      {
        s: "系列2",
        y: 20,
      },
      {
        s: "系列3",
        y: 20,
      },
      {
        s: "系列4",
        y: 20,
      },
      {
        s: "系列5",
        y: 20,
      },
      {
        s: "系列6",
        y: 20,
      },
    ],
    fields: [
      {
        name: "s",
        value: "s",
        desc: "类目",
      },
      {
        name: "y",
        value: "y",
        desc: "值",
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
          value: 231,
        },
        {
          displayName: "Y轴坐标",
          name: "top",
          value: 232,
        },
        {
          displayName: "宽度",
          name: "width",
          value: 800,
        },
        {
          displayName: "高度",
          name: "height",
          value: 500,
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
      displayName: "饼图设置",
      name: "pieSetting",
      options: [
        {
          name: "标题设置",
          value: [
            {
              hasSwitch: true,
              defaultExpand: true,
              displayName: "主标题设置",
              name: "mainTextSetting",
              type: "collapse",
              value: [
                {
                  displayName: "",
                  name: "showMainTextSetting",
                  type: "switch",
                  value: true,
                },
                {
                  displayName: "水平位置",
                  name: "mainTextHorizontal",
                  type: "range",
                  value: 50,
                  config: {
                    min: 0,
                    max: 100,
                    step: 1,
                    suffix: "%",
                  },
                },
                {
                  displayName: "垂直位置",
                  name: "mainTextVertical",
                  type: "range",
                  value: 47,
                  config: {
                    min: 0,
                    max: 100,
                    step: 1,
                    suffix: "%",
                  },
                },
                {
                  displayName: "文本样式",
                  name: "mainTextStyle",
                  type: "textFullStyleGroup",
                  value: [
                    {
                      displayName: "",
                      name: "fontFamily",
                      value: "Microsoft Yahei",
                    },
                    {
                      displayName: "",
                      name: "fontSize",
                      value: 32,
                    },
                    {
                      displayName: "",
                      name: "textColor",
                      type: "color",
                      value: "#3ad4e8",
                    },
                    {
                      displayName: "",
                      name: "bold",
                      value: false,
                    },
                    {
                      displayName: "",
                      name: "italic",
                      value: false,
                    },
                    {
                      displayName: "字距",
                      name: "letterSpacing",
                      value: 0,
                    },
                    {
                      displayName: "行距",
                      name: "lineHeight",
                      value: 0,
                    },
                  ],
                },
              ],
            },
            {
              hasSwitch: true,
              defaultExpand: true,
              displayName: "副标题设置",
              name: "subTextSetting",
              type: "collapse",
              value: [
                {
                  displayName: "",
                  name: "showSubTextSetting",
                  type: "switch",
                  value: true,
                },
                {
                  displayName: "标题文本",
                  name: "subText",
                  type: "input",
                  value: "总量",
                },
                {
                  displayName: "水平位置",
                  name: "subTextHorizontal",
                  type: "range",
                  value: 50,
                  config: {
                    min: 0,
                    max: 100,
                    step: 1,
                    suffix: "%",
                  },
                },
                {
                  displayName: "垂直位置",
                  name: "subTextVertical",
                  type: "range",
                  value: 36,
                  config: {
                    min: 0,
                    max: 100,
                    step: 1,
                    suffix: "%",
                  },
                },
                {
                  displayName: "文本样式",
                  name: "subTextStyle",
                  type: "textFullStyleGroup",
                  value: [
                    {
                      displayName: "",
                      name: "fontFamily",
                      value: "Microsoft Yahei",
                    },
                    {
                      displayName: "",
                      name: "fontSize",
                      value: 32,
                    },
                    {
                      displayName: "",
                      name: "textColor",
                      type: "color",
                      value: "#fff",
                    },
                    {
                      displayName: "",
                      name: "bold",
                      value: true,
                    },
                    {
                      displayName: "",
                      name: "italic",
                      value: false,
                    },
                    {
                      displayName: "字距",
                      name: "letterSpacing",
                      value: 0,
                    },
                    {
                      displayName: "行距",
                      name: "lineHeight",
                      value: "48px",
                    },
                  ],
                },
              ],
            },
          ],
          key: "1",
        },
        {
          name: "环形属性",
          value: [
            {
              hasSwitch: false,
              defaultExpand: true,
              displayName: "环形位置",
              name: "ringPosition",
              type: "collapse",
              value: [
                {
                  displayName: "",
                  name: "showRingPosition",
                  type: "switch",
                  value: true,
                },
                {
                  displayName: "水平位置",
                  name: "ringPositionX",
                  type: "range",
                  value: 50,
                  config: {
                    min: 0,
                    max: 100,
                    step: 1,
                    suffix: "%",
                  },
                },
                {
                  displayName: "垂直位置",
                  name: "ringPositionY",
                  type: "range",
                  value: 40,
                  config: {
                    min: 0,
                    max: 100,
                    step: 1,
                    suffix: "%",
                  },
                },
              ],
            },
            {
              hasSwitch: false,
              defaultExpand: false,
              displayName: "环形半径",
              name: "Radius",
              type: "collapse",
              value: [
                {
                  displayName: "",
                  name: "show",
                  type: "switch",
                  value: true,
                },
                {
                  displayName: "外层半径",
                  name: "outerRadius",
                  type: "number",
                  value: 50,
                  config: {
                    min: 0,
                    max: 100,
                    step: 1,
                    suffix: "%",
                  },
                },
                {
                  displayName: "内层半径",
                  name: "innerRadius",
                  type: "number",
                  value: 40,
                  config: {
                    min: 0,
                    max: 100,
                    step: 1,
                    suffix: "%",
                  },
                },
              ],
            },
            {
              hasSwitch: true,
              defaultExpand: false,
              displayName: "区块样式",
              name: "blockStyle",
              type: "collapse",
              value: [
                {
                  displayName: "",
                  name: "showBlockStyle",
                  type: "switch",
                  value: true,
                },
                {
                  displayName: "圆角弧度",
                  name: "blockRadius",
                  type: "range",
                  value: 0,
                  config: {
                    min: 0,
                    max: 100,
                    step: 1,
                    suffix: "px",
                  },
                },
                {
                  displayName: "阴影颜色",
                  name: "blockStrokeColor",
                  type: "color",
                  value: "#5ab9b9",
                },
                {
                  displayName: "模糊半径",
                  name: "blurRadius",
                  type: "range",
                  value: 15,
                  config: {
                    min: 0,
                    max: 100,
                    step: 1,
                    suffix: "px",
                  },
                },
                {
                  displayName: "区块间距",
                  name: "blockGap",
                  type: "number",
                  value: 2,
                  config: {
                    step: 1,
                    suffix: "",
                  },
                },
              ],
            },
            {
              displayName: "环形系列",
              name: "ringSeries",
              type: "tabArray",
              defaultActiveKey: "1",
              config: {
                template: [
                  {
                    flag: "specialItem",
                    displayName: "系列1",
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
                            disabled: true,
                            type: "input",
                            value: "",
                          },
                        ],
                      },
                      {
                        displayName: "颜色",
                        name: "themePureColor",
                        type: "color",
                        value: "#d11212",
                      },
                    ],
                    key: "1",
                  },
                ],
              },
              value: [
                {
                  flag: "specialItem",
                  displayName: "系列1",
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
                          disabled: true,
                          type: "input",
                          value: "",
                        },
                      ],
                    },
                    {
                      displayName: "颜色",
                      name: "themePureColor",
                      type: "color",
                      value: "#d11212",
                    },
                  ],
                  key: "1",
                },
                {
                  flag: "specialItem",
                  displayName: "系列2",
                  name: "series2",
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
                          value: "系列二",
                        },
                        {
                          displayName: "显示名",
                          name: "displayName",
                          disabled: true,
                          type: "input",
                          value: "",
                        },
                      ],
                    },
                    {
                      displayName: "颜色",
                      name: "themePureColor",
                      type: "color",
                      value: "#db9006",
                    },
                  ],
                  key: "2",
                },
                {
                  flag: "specialItem",
                  displayName: "系列3",
                  name: "series3",
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
                          value: "系列三",
                        },
                        {
                          displayName: "显示名",
                          name: "displayName",
                          disabled: true,
                          type: "input",
                          value: "",
                        },
                      ],
                    },
                    {
                      displayName: "颜色",
                      name: "themePureColor",
                      type: "color",
                      value: "#f0f35d",
                    },
                  ],
                  key: "3",
                },
                {
                  flag: "specialItem",
                  displayName: "系列4",
                  name: "series4",
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
                          value: "系列四",
                        },
                        {
                          displayName: "显示名",
                          name: "displayName",
                          disabled: true,
                          type: "input",
                          value: "",
                        },
                      ],
                    },
                    {
                      displayName: "颜色",
                      name: "themePureColor",
                      type: "color",
                      value: "#15bc38",
                    },
                  ],
                  key: "4",
                },
                {
                  flag: "specialItem",
                  displayName: "系列5",
                  name: "series5",
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
                          value: "系列五",
                        },
                        {
                          displayName: "显示名",
                          name: "displayName",
                          disabled: true,
                          type: "input",
                          value: "",
                        },
                      ],
                    },
                    {
                      displayName: "颜色",
                      name: "themePureColor",
                      type: "color",
                      value: "#87ceeb",
                    },
                  ],
                  key: "5",
                },
                {
                  flag: "specialItem",
                  displayName: "系列6",
                  name: "series6",
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
                          value: "系列六",
                        },
                        {
                          displayName: "显示名",
                          name: "displayName",
                          disabled: true,
                          type: "input",
                          value: "",
                        },
                      ],
                    },
                    {
                      displayName: "颜色",
                      name: "themePureColor",
                      type: "color",
                      value: "#1814c3",
                    },
                  ],
                  key: "6",
                },
              ],
            },
          ],
          key: "2",
        },
        {
          name: "标签设置",
          value: [
            {
              hasSwitch: true,
              defaultExpand: true,
              displayName: "标签样式",
              name: "labelSetting",
              type: "collapse",
              value: [
                {
                  displayName: "",
                  name: "showLabel",
                  type: "switch",
                  value: true,
                },
                {
                  displayName: "line-width",
                  name: "lineWidth",
                  type: "number",
                  value: 2,
                  config: {
                    min: 0,
                    max: 100,
                    step: 1,
                    suffix: "px",
                  },
                },
                {
                  displayName: "line1-length",
                  name: "line1Length",
                  type: "number",
                  value: 20,
                  config: {
                    min: 0,
                    max: 500,
                    step: 1,
                    suffix: "px",
                  },
                },
                {
                  displayName: "line2-length",
                  name: "line2Length",
                  type: "number",
                  value: 10,
                  config: {
                    min: 0,
                    max: 500,
                    step: 1,
                    suffix: "px",
                  },
                },
              ],
            },
            {
              hasSwitch: false,
              defaultExpand: false,
              displayName: "标签字段",
              name: "labelShowFields",
              type: "collapse",
              value: [
                {
                  displayName: "",
                  name: "show",
                  type: "switch",
                  value: true,
                },
                {
                  displayName: "系列名",
                  name: "labelSeriesName",
                  type: "switch",
                  value: false,
                },
                {
                  displayName: "    ",
                  name: "labelSeriesNameTextStyle",
                  themeColor:"themeTextColor",
                  type: "chartText",
                  value: {
                    fontFamily: "微软雅黑",
                    color: "#fff",
                    fontSize: 14,
                    fontWeight: "normal",
                  },
                },
                {
                  displayName: "跟随系列",
                  name: "seriesNameUseSeriesColor",
                  type: "checkBox",
                  value: true,
                },
                {
                  displayName: "数据名",
                  name: "labelDataName",
                  type: "switch",
                  value: true,
                },
                {
                  displayName: "    ",
                  name: "labelDataNameTextStyle",
                  type: "chartText",
                  themeColor:"themeTextColor",
                  value: {
                    fontFamily: "微软雅黑",
                    color: "#fff",
                    fontSize: 14,
                    fontWeight: "normal",
                  },
                },
                {
                  displayName: "跟随系列",
                  name: "dataNameUseSeriesColor",
                  type: "checkBox",
                  value: true,
                },
                {
                  displayName: "数据值",
                  name: "labelDataValue",
                  type: "switch",
                  value: true,
                },
                {
                  displayName: "    ",
                  name: "labelDataValueTextStyle",
                  type: "chartText",
                  themeColor:"themeTextColor",
                  value: {
                    fontFamily: "微软雅黑",
                    color: "#fff",
                    fontSize: 14,
                    fontWeight: "normal",
                  },
                },
                {
                  displayName: "跟随系列",
                  name: "dataValueUseSeriesColor",
                  type: "checkBox",
                  value: true,
                },
                {
                  displayName: "百分比",
                  name: "labelPercentage",
                  type: "switch",
                  value: true,
                },
                {
                  displayName: "    ",
                  name: "labelPercentageTextStyle",
                  type: "chartText",
                  themeColor:"themeTextColor",
                  value: {
                    fontFamily: "微软雅黑",
                    color: "#fff",
                    fontSize: 14,
                    fontWeight: "normal",
                  },
                },
                {
                  displayName: "跟随系列",
                  name: "percentageUseSeriesColor",
                  type: "checkBox",
                  value: true,
                },
              ],
            },
          ],
          key: "3",
        },
        {
          name: "图例设置",
          value: [
            {
              hasSwitch: true,
              defaultExpand: true,
              displayName: "图例样式",
              name: "legendStyle",
              type: "collapse",
              value: [
                {
                  displayName: "",
                  name: "showLegend",
                  type: "switch",
                  value: true,
                },
                {
                  displayName: "偏移",
                  name: "legendOffset",
                  type: "inputNumber2",
                  value: [
                    {
                      displayName: "X",
                      name: "legendOffsetX",
                      type: "number",
                      value: 200,
                      config: {
                        min: -1000,
                        max: 1000,
                        suffix: "px",
                      },
                    },
                    {
                      displayName: "Y",
                      name: "legendOffsetY",
                      type: "number",
                      value: 400,
                      config: {
                        min: -1000,
                        max: 1000,
                        suffix: "px",
                      },
                    },
                  ],
                  showDetail: true,
                },
                {
                  displayName: "布局朝向",
                  name: "legendOrient",
                  options: [
                    {
                      name: "水平",
                      value: "horizontal",
                    },
                    {
                      name: "垂直",
                      value: "vertical",
                    },
                  ],
                  type: "select",
                  value: "horizontal",
                },
                {
                  displayName: "图例间距",
                  name: "legendItemGap",
                  type: "number",
                  value: 10,
                  config: {
                    min: -1000,
                    max: 1000,
                    step: 1,
                    suffix: "px",
                  },
                },
                {
                  displayName: "图形宽度",
                  name: "legendItemWidth",
                  type: "number",
                  value: 20,
                  config: {
                    min: 0,
                    max: 500,
                    step: 1,
                    suffix: "px",
                  },
                },
                {
                  displayName: "图形高度",
                  name: "legendItemHeight",
                  type: "number",
                  value: 15,
                  config: {
                    min: 0,
                    max: 500,
                    step: 1,
                    suffix: "px",
                  },
                },
              ],
            },
            {
              displayName: "文本样式",
              name: "legendTextStyle",
              type: "chartText",
              themeColor:"themeTextColor",
              value: {
                fontFamily: "微软雅黑",
                color: "#fff",
                fontSize: 12,
                fontWeight: "normal",
              },
            },
            {
              displayName: "标记图形",
              name: "symbolShape",
              options: [
                {
                  name: "emptyCircle",
                  value: "emptyCircle",
                },
                {
                  name: "circle",
                  value: "circle",
                },
                {
                  name: "rect",
                  value: "rect",
                },
                {
                  name: "roundRect",
                  value: "roundRect",
                },
                {
                  name: "triangle",
                  value: "triangle",
                },
                {
                  name: "diamond",
                  value: "diamond",
                },
                {
                  name: "pin",
                  value: "pin",
                },
                {
                  name: "arrow",
                  value: "arrow",
                },
                {
                  name: "none",
                  value: "none",
                },
              ],
              type: "select",
              value: "rect",
            },
            {
              displayName: "数量显示",
              name: "numberFormat",
              options: [
                {
                  name: "具体数量",
                  value: "specificNumber",
                },
                {
                  name: "百分比",
                  value: "percent",
                },
                {
                  name: "不作显示",
                  value: "noDisplay",
                },
              ],
              type: "select",
              value: "noDisplay",
            },
          ],
          key: "4",
        },
      ],
      activeKey: "1",
      type: "tabs",
    },
  ],
  useFilter: false,
  filters: [],
  events: [],
  callbackArgs: [],
  drillDownArr: [],
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
