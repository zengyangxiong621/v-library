const ComponentDefaultConfig = {
  id: "", //组件ID
  uniqueTag: "", // =========
  name: "基础折线图", //图层名称
  parentId: "", // 父组件 像是2D地图、3D地图 =================
  dashboardId: "", //画布id

  moduleType: "chart",

  moduleName: "basicLine", //组件标识
  moduleVersion: "1.2.6", //组件版本号

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
        x: "01/01",
        y: 180,
        s: "系列二",
      },
      {
        x: "02/01",
        y: 200,
        s: "系列一",
      },
      {
        x: "02/01",
        y: 100,
        s: "系列二",
      },
      {
        x: "03/01",
        y: 60,
        s: "系列一",
      },
      {
        x: "03/01",
        y: 215,
        s: "系列二",
      },
      {
        x: "04/01",
        y: 280,
        s: "系列一",
      },
      {
        x: "04/01",
        y: 107,
        s: "系列二",
      },
      {
        x: "05/01",
        y: 200,
        s: "系列一",
      },
      {
        x: "05/01",
        y: 110,
        s: "系列二",
      },
      {
        x: "06/01",
        y: 200,
        s: "系列一",
      },
      {
        x: "06/01",
        y: 110,
        s: "系列二",
      },
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
          value: 401,
        },
        {
          displayName: "Y轴坐标",
          name: "top",
          value: 235,
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
      displayName: "全部设置",
      name: "allSettings",
      options: [
        {
          name: "图表",
          value: [
            {
              displayName: "边距",
              name: "spacing",
              type: "padding",
              value: {
                top: 150,
                left: 80,
                bottom: 50,
                right: 50,
              },
            },
            {
              hasSwitch: true,
              defaultExpand: true,
              displayName: "图例",
              name: "legendSettings",
              type: "collapse",
              value: [
                {
                  displayName: "",
                  name: "show",
                  type: "switch",
                  value: true,
                },
                {
                  displayName: "文本样式",
                  name: "legendTextStyle",
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
                      value: 20,
                    },
                    {
                      displayName: "",
                      name: "themeTextColor",
                      type: "color",
                      value: "#fff",
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
                {
                  displayName: "图标尺寸",
                  name: "iconSize",
                  type: "inputNumber2",
                  value: [
                    {
                      displayName: "宽度",
                      name: "iconWidth",
                      type: "number",
                      value: 30,
                      config: {
                        min: 0,
                        suffix: "px",
                      },
                    },
                    {
                      displayName: "高度",
                      name: "iconHeight",
                      type: "number",
                      value: 20,
                      config: {
                        min: 0,
                        suffix: "px",
                      },
                    },
                  ],
                  showDetail: true,
                },
                {
                  displayName: "间距",
                  name: "gap",
                  type: "number",
                  value: 25,
                  config: {
                    min: -10000,
                    max: 10000,
                    step: 1,
                    suffix: "px",
                  },
                },
                {
                  displayName: "偏移",
                  name: "offset",
                  type: "inputNumber2",
                  value: [
                    {
                      displayName: "X",
                      name: "legendOffsetX",
                      type: "number",
                      value: 250,
                      config: {
                        min: -10000,
                        suffix: "px",
                      },
                    },
                    {
                      displayName: "Y",
                      name: "legendOffsetY",
                      type: "number",
                      value: 50,
                      config: {
                        min: -10000,
                        suffix: "px",
                      },
                    },
                  ],
                  showDetail: true,
                },
              ],
            },
          ],
          key: "tubiao",
        },
        {
          name: "坐标轴",
          value: [
            {
              displayName: "坐标轴设置",
              name: "axisSettings",
              options: [
                {
                  name: "X轴",
                  value: [
                    {
                      hasSwitch: false,
                      defaultExpand: false,
                      displayName: "轴标签",
                      name: "xAxisLabel",
                      type: "collapse",
                      value: [
                        {
                          displayName: "",
                          name: "show",
                          type: "switch",
                          value: true,
                        },
                        {
                          displayName: "文本样式",
                          name: "xAxisLabelTextStyle",
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
                              value: 20,
                            },
                            {
                              displayName: "",
                              name: "themeTextColor",
                              type: "color",
                              value: "#fff",
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
                        {
                          displayName: "角度",
                          name: "xAxisLabelRotate",
                          type: "range",
                          value: 0,
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
                      hasSwitch: true,
                      defaultExpand: true,
                      displayName: "轴线",
                      name: "xAxisLine",
                      type: "collapse",
                      value: [
                        {
                          displayName: "",
                          name: "show",
                          type: "switch",
                          value: true,
                        },
                        {
                          displayName: "颜色",
                          // name: "xAxisLineColor",
                          name: "themeAssistColor",
                          type: "color",
                          value: "#666",
                        },
                        {
                          displayName: "粗细",
                          name: "xAxisLineWeight",
                          type: "number",
                          value: 2,
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
                      displayName: "网格线",
                      name: "xGridLine",
                      type: "collapse",
                      value: [
                        {
                          displayName: "",
                          name: "showXGridLine",
                          type: "switch",
                          value: false,
                        },
                        {
                          displayName: "线条类型",
                          name: "xGridLineType",
                          options: [
                            {
                              name: "solid",
                              value: "solid",
                            },
                            {
                              name: "dashed",
                              value: "dashed",
                            },
                            {
                              name: "dotted",
                              value: "dotted",
                            },
                          ],
                          label: "dashed",
                          type: "select",
                          value: "dashed",
                        },
                        {
                          displayName: "颜色",
                          // name: "xGridLineColor",
                          name: "themeGridColor",
                          type: "color",
                          value: "#fff",
                        },
                        {
                          displayName: "粗细",
                          name: "xGridLineWeight",
                          type: "number",
                          value: 1,
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
                      displayName: "两边留白",
                      name: "blankOfSides",
                      type: "switch",
                      value: false,
                    },
                  ],
                  key: "axisX",
                },
                {
                  name: "Y轴",
                  value: [
                    {
                      hasSwitch: false,
                      defaultExpand: false,
                      displayName: "轴标签",
                      name: "yAxisLabel",
                      type: "collapse",
                      value: [
                        {
                          displayName: "",
                          name: "show",
                          type: "switch",
                          value: true,
                        },
                        {
                          displayName: "文本样式",
                          name: "yAxisLabelTextStyle",
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
                              value: 20,
                            },
                            {
                              displayName: "",
                              name: "themeTextColor",
                              type: "color",
                              value: "#fff",
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
                        {
                          displayName: "角度",
                          name: "yAxisLabelRotate",
                          type: "range",
                          value: 0,
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
                      hasSwitch: true,
                      defaultExpand: false,
                      displayName: "轴单位",
                      name: "yAxisUnit",
                      type: "collapse",
                      value: [
                        {
                          displayName: "",
                          name: "yAxisUnitShow",
                          type: "switch",
                          value: true,
                        },
                        {
                          displayName: "内容",
                          name: "yAxisUnitText",
                          type: "input",
                          value: "单位",
                        },
                        {
                          displayName: "文本样式",
                          name: "yAxisUnitTextStyle",
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
                              value: 20,
                            },
                            {
                              displayName: "",
                              name: "themeTextColor",
                              type: "color",
                              value: "#fff",
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
                        {
                          displayName: "偏移",
                          name: "yAxisUnitOffset",
                          type: "inputNumber2",
                          value: [
                            {
                              displayName: "X",
                              name: "yAxisUnitOffsetX",
                              type: "number",
                              value: 0,
                              config: {
                                min: -10000,
                                max: 10000,
                                suffix: "px",
                              },
                            },
                            {
                              displayName: "Y",
                              name: "yAxisUnitOffsetY",
                              type: "number",
                              value: 30,
                              config: {
                                min: -10000,
                                max: 10000,
                                suffix: "px",
                              },
                            },
                          ],
                          showDetail: true,
                        },
                      ],
                    },
                    {
                      hasSwitch: true,
                      defaultExpand: true,
                      displayName: "轴线",
                      name: "yAxisLine",
                      type: "collapse",
                      value: [
                        {
                          displayName: "",
                          name: "show",
                          type: "switch",
                          value: false,
                        },
                        {
                          displayName: "颜色",
                          // name: "yAxisLineColor",
                          name: "themeGridColor",
                          type: "color",
                          value: "#fff",
                        },
                        {
                          displayName: "粗细",
                          name: "yAxisLineWeight",
                          type: "number",
                          value: 2,
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
                      displayName: "网格线",
                      name: "yGridLine",
                      type: "collapse",
                      value: [
                        {
                          displayName: "",
                          name: "showYGridLine",
                          type: "switch",
                          value: true,
                        },
                        {
                          displayName: "线条类型",
                          name: "yGridLineType",
                          options: [
                            {
                              name: "solid",
                              value: "solid",
                            },
                            {
                              name: "dashed",
                              value: "dashed",
                            },
                            {
                              name: "dotted",
                              value: "dotted",
                            },
                          ],
                          label: "dashed",
                          type: "select",
                          value: "dashed",
                        },
                        {
                          displayName: "颜色",
                          // name: "yGridLineColor",
                          name: "themeGridColor",
                          type: "color",
                          value: "rgba(255,255,255,0.2)",
                        },
                        {
                          displayName: "粗细",
                          name: "yGridLineWeight",
                          type: "number",
                          value: 1,
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
                  key: "axisY",
                },
              ],
              activeKey: "1",
              type: "tabs",
            },
          ],
          key: "zuobiaozhou",
        },
        {
          name: "系列",
          value: [
            {
              displayName: "数据系列",
              name: "dataSeries",
              disabled: false,
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
                        displayName: "图例映射",
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
                        hasSwitch: false,
                        defaultExpand: true,
                        displayName: "折线",
                        name: "lineSettings",
                        type: "collapse",
                        value: [
                          {
                            displayName: "",
                            name: "show",
                            type: "switch",
                            value: true,
                          },
                          {
                            displayName: "颜色",
                            name: "lineColor",
                            type: "color",
                            value: "#336bd7",
                          },
                          {
                            displayName: "粗细",
                            name: "lineWeight",
                            type: "number",
                            value: 4,
                            config: {
                              min: 0,
                              max: 100,
                              step: 1,
                              suffix: "px",
                            },
                          },
                          {
                            displayName: "平滑曲线",
                            name: "isSmooth",
                            options: [
                              {
                                name: "是",
                                value: true,
                              },
                              {
                                name: "否",
                                value: false,
                              },
                            ],
                            type: "radioGroup",
                            value: true,
                            direction: "horizontal",
                          },
                        ],
                      },
                      {
                        hasSwitch: true,
                        defaultExpand: true,
                        displayName: "标记",
                        name: "symbolSettings",
                        type: "collapse",
                        value: [
                          {
                            displayName: "",
                            name: "symbolShow",
                            type: "switch",
                            value: true,
                          },
                          {
                            displayName: "hover时显示",
                            name: "isShowSymbolWhileHover",
                            options: [
                              {
                                name: "是",
                                value: true,
                              },
                              {
                                name: "否",
                                value: false,
                              },
                            ],
                            type: "radioGroup",
                            value: true,
                            direction: "horizontal",
                          },
                          {
                            displayName: "标记大小",
                            name: "symbolSize",
                            type: "number",
                            value: 8,
                            config: {
                              min: 0,
                              max: 100,
                              step: 1,
                              suffix: "px",
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
                            value: "circle",
                          },
                          {
                            displayName: "图形颜色",
                            // TODO
                            name: "symbolShapeColor",
                            type: "color",
                            value: "#fff",
                          },
                          {
                            displayName: "边框颜色",
                            // TODO
                            name: "symbolBorderColor",
                            type: "color",
                            value: "#fff",
                          },
                          {
                            displayName: "边框宽度",
                            name: "symbolBorderWidth",
                            type: "number",
                            value: 4,
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
                        displayName: "区域样式",
                        name: "areaStyle",
                        type: "collapse",
                        value: [
                          {
                            displayName: "",
                            name: "areaShow",
                            type: "switch",
                            value: true,
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
                          {
                            displayName: "渐变方向",
                            name: "areaGradientDirection",
                            options: [
                              {
                                name: "从左至右",
                                value: "left2right",
                              },
                              {
                                name: "从上至下",
                                value: "top2bottom",
                              },
                              {
                                name: "从右至左",
                                value: "right2left",
                              },
                              {
                                name: "从下至上",
                                value: "bottom2top",
                              },
                            ],
                            type: "select",
                            value: "top2bottom",
                          },
                        ],
                      },
                    ],
                  },
                ], // 这个 template 就是 每一列 的模板，防止删除完了后不能添加，
              },
              value: [
                {
                  flag: "specialItem",
                  displayName: "系列1",
                  name: "series1",
                  type: "object",
                  value: [
                    {
                      displayName: "图例映射",
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
                      hasSwitch: false,
                      defaultExpand: true,
                      displayName: "折线",
                      name: "lineSettings",
                      type: "collapse",
                      value: [
                        {
                          displayName: "",
                          name: "show",
                          type: "switch",
                          value: true,
                        },
                        {
                          displayName: "颜色",
                          name: "lineColor",
                          type: "color",
                          value: "#336bd7",
                        },
                        {
                          displayName: "粗细",
                          name: "lineWeight",
                          type: "number",
                          value: 4,
                          config: {
                            min: 0,
                            max: 100,
                            step: 1,
                            suffix: "px",
                          },
                        },
                        {
                          displayName: "平滑曲线",
                          name: "isSmooth",
                          options: [
                            {
                              name: "是",
                              value: true,
                            },
                            {
                              name: "否",
                              value: false,
                            },
                          ],
                          type: "radioGroup",
                          value: true,
                          direction: "horizontal",
                        },
                      ],
                    },
                    {
                      hasSwitch: true,
                      defaultExpand: true,
                      displayName: "标记",
                      name: "symbolSettings",
                      type: "collapse",
                      value: [
                        {
                          displayName: "",
                          name: "symbolShow",
                          type: "switch",
                          value: true,
                        },
                        {
                          displayName: "hover时显示",
                          name: "isShowSymbolWhileHover",
                          options: [
                            {
                              name: "是",
                              value: true,
                            },
                            {
                              name: "否",
                              value: false,
                            },
                          ],
                          type: "radioGroup",
                          value: true,
                          direction: "horizontal",
                        },
                        {
                          displayName: "标记大小",
                          name: "symbolSize",
                          type: "number",
                          value: 8,
                          config: {
                            min: 0,
                            max: 100,
                            step: 1,
                            suffix: "px",
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
                          value: "circle",
                        },
                        {
                          displayName: "图形颜色",
                          name: "symbolShapeColor",
                          type: "color",
                          value: "#fff",
                        },
                        {
                          displayName: "边框颜色",
                          name: "symbolBorderColor",
                          type: "color",
                          value: "#fff",
                        },
                        {
                          displayName: "边框宽度",
                          name: "symbolBorderWidth",
                          type: "number",
                          value: 4,
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
                      displayName: "区域样式",
                      name: "areaStyle",
                      type: "collapse",
                      value: [
                        {
                          displayName: "",
                          name: "areaShow",
                          type: "switch",
                          value: true,
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
                          name: "themeGradientColorEnd",
                          // name: "areaEndColor",
                          type: "color",
                          value: "rgba(180, 21, 177,0.1)",
                        },
                        {
                          displayName: "渐变方向",
                          name: "areaGradientDirection",
                          options: [
                            {
                              name: "从左至右",
                              value: "left2right",
                            },
                            {
                              name: "从上至下",
                              value: "top2bottom",
                            },
                            {
                              name: "从右至左",
                              value: "right2left",
                            },
                            {
                              name: "从下至上",
                              value: "bottom2top",
                            },
                          ],
                          type: "select",
                          value: "top2bottom",
                        },
                      ],
                    },
                  ],
                },
                {
                  flag: "specialItem",
                  displayName: "系列2",
                  name: "series2",
                  type: "object",
                  value: [
                    {
                      displayName: "图例映射",
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
                          type: "input",
                          value: "系列二",
                        },
                      ],
                    },
                    {
                      hasSwitch: false,
                      defaultExpand: true,
                      displayName: "折线",
                      name: "lineSettings",
                      type: "collapse",
                      value: [
                        {
                          displayName: "",
                          name: "show",
                          type: "switch",
                          value: true,
                        },
                        {
                          displayName: "颜色",
                          name: "lineColor",
                          type: "color",
                          value: "#21d572",
                        },
                        {
                          displayName: "粗细",
                          name: "lineWeight",
                          type: "number",
                          value: 4,
                          config: {
                            min: 0,
                            max: 100,
                            step: 1,
                            suffix: "px",
                          },
                        },
                        {
                          displayName: "平滑曲线",
                          name: "isSmooth",
                          options: [
                            {
                              name: "是",
                              value: true,
                            },
                            {
                              name: "否",
                              value: false,
                            },
                          ],
                          type: "radioGroup",
                          value: false,
                          direction: "horizontal",
                        },
                      ],
                    },
                    {
                      hasSwitch: true,
                      defaultExpand: true,
                      displayName: "标记",
                      name: "symbolSettings",
                      type: "collapse",
                      value: [
                        {
                          displayName: "",
                          name: "symbolShow",
                          type: "switch",
                          value: true,
                        },
                        {
                          displayName: "hover时显示",
                          name: "isShowSymbolWhileHover",
                          options: [
                            {
                              name: "是",
                              value: true,
                            },
                            {
                              name: "否",
                              value: false,
                            },
                          ],
                          type: "radioGroup",
                          value: true,
                          direction: "horizontal",
                        },
                        {
                          displayName: "标记大小",
                          name: "symbolSize",
                          type: "number",
                          value: 8,
                          config: {
                            min: 0,
                            max: 100,
                            step: 1,
                            suffix: "px",
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
                          value: "circle",
                        },
                        {
                          displayName: "图形颜色",
                          name: "symbolShapeColor",
                          type: "color",
                          value: "#fff",
                        },
                        {
                          displayName: "边框颜色",
                          name: "symbolBorderColor",
                          type: "color",
                          value: "#fff",
                        },
                        {
                          displayName: "边框宽度",
                          name: "symbolBorderWidth",
                          type: "number",
                          value: 4,
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
                      displayName: "区域样式",
                      name: "areaStyle",
                      type: "collapse",
                      value: [
                        {
                          displayName: "",
                          name: "areaShow",
                          type: "switch",
                          value: true,
                        },
                        {
                          displayName: "起始颜色",
                          // name: "areaStartColor",
                          name: "themeGradientColorStart",
                          type: "color",
                          value: "rgba(36, 185, 101,0.6)",
                        },
                        {
                          displayName: "结束颜色",
                          name: "themeGradientColorEnd",
                          // name: "areaEndColor",
                          type: "color",
                          value: "rgba(40, 39, 49,0.1)",
                        },
                        {
                          displayName: "渐变方向",
                          name: "areaGradientDirection",
                          options: [
                            {
                              name: "从左至右",
                              value: "left2right",
                            },
                            {
                              name: "从上至下",
                              value: "top2bottom",
                            },
                            {
                              name: "从右至左",
                              value: "right2left",
                            },
                            {
                              name: "从下至上",
                              value: "bottom2top",
                            },
                          ],
                          type: "select",
                          value: "top2bottom",
                        },
                      ],
                    },
                  ],
                  key: "2",
                },
              ],
              key: "1",
            },
          ],
          key: "xilie",
        },
        {
          name: "辅助",
          value: [
            {
              hasSwitch: false,
              defaultExpand: false,
              displayName: "指示器",
              name: "indicator",
              type: "collapse",
              value: [
                {
                  displayName: "",
                  name: "show",
                  type: "switch",
                  value: true,
                },
                {
                  displayName: "粗细",
                  name: "indicatorWidth",
                  type: "number",
                  value: 100,
                  config: {
                    min: 0,
                    max: 100,
                    step: 1,
                    suffix: "%",
                  },
                },
                {
                  displayName: "背景",
                  name: "indicatorStyleColor",
                  type: "color",
                  value: "rgba(255,255,255,0.1)",
                },
              ],
            },
            {
              hasSwitch: false,
              defaultExpand: false,
              displayName: "提示框",
              name: "tooltip",
              type: "collapse",
              value: [
                {
                  displayName: "",
                  name: "tooltipShow",
                  type: "switch",
                  value: true,
                },
                {
                  displayName: "背景颜色",
                  name: "tooltipBackColor",
                  type: "color",
                  value: "#fff",
                },
                {
                  displayName: "边框颜色",
                  name: "tooltipBorderColor",
                  type: "color",
                  value: "#fff",
                },
                {
                  displayName: "文本样式",
                  name: "tooltipTextStyle",
                  type: "chartText",
                  value: {
                    fontFamily: "微软雅黑",
                    color: "#000",
                    fontSize: 12,
                    fontWeight: "normal",
                  },
                },
                {
                  displayName: "内边距",
                  name: "tooltipPadding",
                  type: "padding",
                  value: {
                    top: 5,
                    left: 10,
                    bottom: 5,
                    right: 10,
                  },
                },
                {
                  displayName: "标记图形",
                  name: "tooltipSymbolShape",
                  options: [
                    {
                      name: "circle",
                      value: "circle",
                    },
                    {
                      name: "rect",
                      value: "rect",
                    },
                    {
                      name: "none",
                      value: "none",
                    },
                  ],
                  type: "select",
                  value: "circle",
                },
              ],
            },
          ],
          key: "fuzhu",
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
  showFieldInBreadcrumbs: "", // 点击该组件时，通过该字段去取对应的值展示到面包屑上
  triggers: [
    {
      name: "当请求完成或数据变化时",
      value: "dataChange",
    },
    {
      name: "鼠标点击",
      value: "click",
    },
  ],
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

export { ComponentDefaultConfig };
