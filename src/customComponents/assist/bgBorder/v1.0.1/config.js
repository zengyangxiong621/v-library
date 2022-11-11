const componentDefaultConfig = {
  id: "", //组件ID
  uniqueTag: "", // =========
  name: "背景边框", //图层名称
  parentId: "0", // 父组件 像是2D地图、3D地图 =================
  dashboardId: "", //画布id

  moduleName: "bgBorder", //组件标识
  moduleVersion: "1.0.1", //组件版本号
  moduleType: "assist",

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
        text: "text",
      },
    ],
    fields: [
      {
        name: "text",
        value: "text",
        desc: "文本",
      },
    ],
  },

  useFilter: false,
  filters: [],

  events: [],

  config: [
    // 样式配置
    {
      name: "dimension",
      displayName: "位置尺寸",
      type: "dimensionGroup",
      config: {
        lock: false,
      },
      value: [
        {
          name: "left",
          displayName: "X轴坐标",
          value: 100,
        },
        {
          name: "top",
          displayName: "Y轴坐标",
          value: 100,
        },
        {
          name: "width",
          displayName: "宽度",
          value: 661,
        },
        {
          name: "height",
          displayName: "高度",
          value: 261,
        },
      ],
    },
    {
      name: "hideDefault",
      displayName: "默认隐藏",
      type: "checkBox",
      value: false,
    },
    {
      name: "border",
      displayName: "边框",
      type: "border",
      value: {
        type: "solid",
        width: 1,
        color: "rgba(45,153,255,1)",
      },
    },
    {
      name: "bgColor",
      displayName: "背景色",
      value: "rgba(0,33,135,0.24)",
      type: "color",
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

export default componentDefaultConfig;
