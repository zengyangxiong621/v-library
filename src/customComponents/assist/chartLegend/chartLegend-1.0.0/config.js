const componentDefaultConfig = {
  id: "", //组件ID
  uniqueTag: "", // =========
  name: "图例", //图层名称
  parentId: "0", // 父组件 像是2D地图、3D地图 =================
  dashboardId: "", //画布id

  moduleName: "chartLegend", //组件标识
  moduleVersion: "1.0.0", //组件版本号

  createdAt: "2022-04-02T07:22:31.290Z", // =========
  updatedAt: "2022-04-02T07:22:39.798Z", // =========

  autoUpdate: { isAuto: false, interval: 10 }, // =========
  thumb: "", // 缩略图 // =========

  dataFrom: 0,
  dataConfig: {}, //数据源配置
  dataType: "static", //数据类型：static;mysql;api;clickhouse
  dataContainers: [],
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
          value: 412,
        },
        {
          displayName: "Y轴坐标",
          name: "top",
          value: 266,
        },
        {
          displayName: "宽度",
          name: "width",
          value: 400,
        },
        {
          displayName: "高度",
          name: "height",
          value: 40,
        },
      ],
    },
    {
      name: "textStyle",
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
          value: 32,
        },
        {
          name: "themeTextColor",
          displayName: "",
          type: "color",
          value: "#fff", // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
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
          value: "unset",
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
      displayName: "图例设置",
      name: "legendSettings",
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
          displayName: "图例颜色",
          // name: "legendColor",
          name: "themePureColor",
          value: "#177ddc", // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
          type: "color",
        },
        {
          name: "legendSize",
          displayName: "图例大小",
          value: 20,
          type: "number",
          config: {
            min: 0,
            max: 1000,
            step: 1,
            suffix: "px",
          },
        },
        {
          displayName: "图例形状",
          name: "legendShape",
          type: "select",
          value: "square",
          options: [
            {
              name: "square",
              value: "square",
            },
            {
              name: "circle",
              value: "circle",
            },
          ],
        },
      ],
    },
  ],
  staticData: {
    data: [
      {
        text: "一级",
        value: "1228",
      },
    ],
    fields: [
      {
        name: "text",
        value: "text",
        desc: "文本",
      },
      {
        name: "value",
        value: "value",
        desc: "文本",
      },
    ],
  },

  useFilter: false, // =========
  filters: [],
  events: [],
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

export default componentDefaultConfig;
