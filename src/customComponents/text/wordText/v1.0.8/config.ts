const componentDefaultConfig = {
  id: "121", //组件ID
  uniqueTag: "24e1b3a2-60e0-4cef-8a5d-f04fd645f14b", // =========
  name: "多行文本", //图层名称
  parentId: "0", // 父组件 像是2D地图、3D地图 =================
  dashboardId: "11", //画布id
  moduleType: "text",
  moduleName: "wordText", //组件标识
  moduleVersion: "1.0.8", //组件版本号

  createdAt: "2022-04-02T07:22:31.290Z", // =========
  updatedAt: "2022-04-02T07:22:39.798Z", // =========

  autoUpdate: { isAuto: false, interval: 10 }, // =========
  thumb: "", // 缩略图 // =========

  dataConfig: {}, //数据源配置
  dataType: "static", //数据类型：static;mysql;api;clickhouse
  dataFrom: 0,
  dataContainers: [], // 默认选中容器
  triggers: [ // 下面是合集
    {
      name: "当请求完成或数据变化时",
      value: "dataChange",
    },
    {
      name: "鼠标点击",
      value: "click",
    },
    {
      name: "鼠标移入",
      value: "mouseEnter",
    },
    {
      name: "鼠标移出",
      value: "mouseLeave",
    }
  ],
  staticData: {
    //静态数据
    data: [
      {
        text: "文字组件",
      },
    ],
    fields: [
      {
        name: "text",
        value: "text",
        desc: "文本",
        status: true, // 状态
      },
    ],
  },

  useFilter: false, // =========
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
          value: 500,
        },
        {
          name: "height",
          displayName: "高度",
          value: 200,
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
          name: "color",
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
          value: "48",
        },
      ],
    },
    {
      name: "align",
      displayName: "对齐方式",
      type: "alignFull",
      value: [
        {
          name: "textAlign",
          displayName: "水平对齐",
          range: ["left", "center", "right"],
          type: "align",
          value: "left", // left , center, right,bothEnds
        },
      ],
    },
    {
      name: "autoplay",
      displayName: "自动轮播",
      type: "radioGroup",
      direction: "horizontal,vertical", // 方向
      value: false,
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
    },
    {
      name: "speed",
      displayName: "轮播速度",
      value: 10000,
      type: "number",
      config: {
        min: 500,
        step: 500,
        suffix: "s", // 输入框后缀
      },
    },
    {
      name: "shadow",
      displayName: "阴影",
      type: "collapse",
      hasSwitch: true,
      defaultExpand: true,
      value: [
        {
          name: "show",
          displayName: "",
          value: false,
          type: "switch",
        },
        {
          name: "shadow",
          displayName: "文本阴影",
          type: "boxShadow",
          value: {
            color: "#0075FF", // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
            vShadow: 0, // 垂直阴影的位置
            hShadow: 0, // 水平阴影的位置
            blur: 8, // 模糊的距离
          },
        },
      ],
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
