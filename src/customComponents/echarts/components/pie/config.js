const ComponentDefaultConfig = {
  id: "", //组件ID
  uniqueTag: "", // =========
  name: "饼图", //图层名称
  parentId: "", // 父组件 像是2D地图、3D地图 =================
  dashboardId: "", //画布id

  moduleName: "pie", //组件标识
  moduleVersion: "1.0.0", //组件版本号

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
          value: 267,
        },
        {
          displayName: "Y轴坐标",
          name: "top",
          value: -73,
        },
        {
          displayName: "宽度",
          name: "width",
          value: 400,
        },
        {
          displayName: "高度",
          name: "height",
          value: 400,
        },
      ],
    },
    {
      displayName: "文本样式",
      name: "textStyle",
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
    {
      displayName: "默认隐藏",
      name: "hideDefault",
      type: "checkBox",
      value: false,
    },
    {
      displayName: "文本设置",
      name: "textSetting",
      hasSwitch: false,
      defaultExpand: false,
      type: "collapse",
      value: [
        {
          displayName: "",
          name: "show",
          type: "switch",
          value: true,
        },
        {
          displayName: "水平位置",
          name: "textHorizontal",
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
          displayName: "垂直位置",
          name: "textVertical",
          type: "number",
          value: 50,
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
      displayName: "图表半径",
      hasSwitch: false,
      defaultExpand: false,
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
          value: 80,
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
          value: 60,
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
      displayName: "标签样式",
      hasSwitch: false,
      defaultExpand: false,
      name: "labelSetting",
      type: "collapse",
      value: [
        {
          displayName: "",
          name: "show",
          type: "switch",
          value: false,
        },
        {
          displayName: "文字大小",
          name: "labelSize",
          type: "number",
          value: 24,
          config: {
            min: 0,
            max: 300,
            step: 1,
            suffix: "px",
          },
        },
        {
          displayName: "line-width",
          name: "lineWidth",
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
          value: 0,
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
      displayName: "标签显示字段",
      hasSwitch: false,
      defaultExpand: false,
      name: "labelShowFields",
      type: "collapse",
      value: [
        {
          displayName: "",
          name: "show",
          type: "switch",
          value: false,
        },
        {
          displayName: "系列名",
          name: "labelSeriesName",
          value: false,
          options: [
            {
              name: "显示",
              value: true,
            },
            {
              name: "隐藏",
              value: false,
            },
          ],
          type: "radioGroup",
          direction: "horizontal",
        },
        {
          displayName: "数据名",
          name: "labelDataName",
          value: true,
          options: [
            {
              name: "显示",
              value: true,
            },
            {
              name: "隐藏",
              value: false,
            },
          ],
          type: "radioGroup",
          direction: "horizontal",
        },
        {
          displayName: "数据值",
          name: "labelDataValue",
          value: true,
          options: [
            {
              name: "显示",
              value: true,
            },
            {
              name: "隐藏",
              value: false,
            },
          ],
          type: "radioGroup",
          direction: "horizontal",
        },
        {
          displayName: "百分比",
          name: "labelPercentage",
          value: true,
          options: [
            {
              name: "显示",
              value: true,
            },
            {
              name: "隐藏",
              value: false,
            },
          ],
          type: "radioGroup",
          direction: "horizontal",
        },
      ],
    },
    {
      displayName: "显示标签",
      name: "showLabel",
      options: [
        {
          name: "显示",
          value: true,
        },
        {
          name: "隐藏",
          value: false,
        },
      ],
      type: "radioGroup",
      value: false,
      direction: "horizontal",
    },
    {
      displayName: "汇总数据",
      name: "showTotal",
      options: [
        {
          name: "显示",
          value: true,
        },
        {
          name: "隐藏",
          value: false,
        },
      ],
      type: "radioGroup",
      value: true,
      direction: "horizontal",
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
