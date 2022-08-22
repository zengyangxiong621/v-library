const componentDefaultConfig = {
  id: "", //组件ID
  uniqueTag: "", // =========
  name: "世界地图", //图层名称
  parentId: "", // 父组件 像是2D地图、3D地图 =================
  dashboardId: "", //画布id

  moduleType: "map",
  moduleName: "worldMap", //组件标识
  moduleVersion: "1.0.0", //组件版本号

  createdAt: "2022-04-02T07:22:31.290Z", // =========
  updatedAt: "2022-04-02T07:22:39.798Z", // =========

  autoUpdate: { isAuto: false, interval: 10 }, // =========
  thumb: "", // 缩略图 // =========

  dataFrom: 0,
  dataConfig: {}, // 数据源配置
  dataType: "static", // 数据类型：static;mysql;api;clickhouse
  dataContainers: [],
  staticData: {
    // 静态数据
    data: [
      {
        centerPoint:{
          北京区域中心: [116.536989, 39.777354]
        },
        coordData: {
          昌平数据中心: [116.249193, 40.168238],
          勘探院数据中心: [116.357544, 39.992995],
          吉林数据中心: [126.539923, 43.941828],
          克拉玛依数据中心: [84.902321, 45.580525],
          北京区域中心: [116.536989, 39.777354],
          辽河区域中心: [123.479261, 41.79233],
          吉林区域中心: [126.567982, 43.823481],
          大庆区域中心: [125.268447, 45.704549],
          西安区域中心: [108.979039, 34.273485],
          兰州区域中心: [103.672554, 36.505049],
          新疆区域中心: [87.520211, 43.860104],
          西南区域中心: [104.098755, 30.678152],
          华南区域中心: [113.341111, 23.02494],
          华东区域中心: [120.186041, 30.290762],
          大连区域中心: [121.653164, 38.979666],
          美国: [-93.310319, 36.908779],
          丹麦: [9.1577, 56.1388],
          瑞士: [8.6649, 47.5276],
        },
        flyLineArr: [
          [
            {
              name: "昌平数据中心",
              value: 10000,
            },
          ],
          [
            {
              name: "勘探院数据中心",
              value: 0,
            },
          ],
          [
            {
              name: "吉林数据中心",
              value: 0,
            },
          ],
          [
            {
              name: "克拉玛依数据中心",
              value: 0,
            },
          ],
          [
            {
              name: "北京区域中心",
              value: 5,
            },
          ],
          [
            {
              name: "辽河区域中心",
              value: 1,
            },
          ],
          [
            {
              name: "吉林区域中心",
              value: 1,
            },
          ],
          [
            {
              name: "大庆区域中心",
              value: 1,
            },
          ],
          [
            {
              name: "西安区域中心",
              value: 1,
            },
          ],
          [
            {
              name: "兰州区域中心",
              value: 1,
            },
          ],
          [
            {
              name: "新疆区域中心",
              value: 1,
            },
          ],
          [
            {
              name: "西南区域中心",
              value: 1,
            },
          ],
          [
            {
              name: "华南区域中心",
              value: 1,
            },
          ],
          [
            {
              name: "华东区域中心",
              value: 1,
            },
          ],
          [
            {
              name: "大连区域中心",
              value: 1,
            },
          ],
          [
            {
              name: "美国",
              value: 10000,
            },
          ],
          [
            {
              name: "丹麦",
              value: 0,
            },
          ],
          [
            {
              name: "瑞士",
              value: 0,
            },
          ],
        ],
        ipData: [
          {
            name: "华东区域中心",
            value: "192.168.100.120",
          },
          {
            name: "美国",
            value: "12.13.14.15",
          },
          {
            name: "丹麦",
            value: "12.13.14.15",
          },
          {
            name: "瑞士",
            value: "12.13.14.15",
          },
        ],
        ipCoordData: {
          华东区域中心: [120.186041, 30.290762],
          美国: [-93.310319, 36.908779],
          丹麦: [9.1577, 56.1388],
          瑞士: [8.6649, 47.5276],
          新疆区域中心: [87.520211, 43.860104],
        },
      },
    ],
    fields: [
      {
        name: "centerPoint",
        value: "centerPoint",
        desc: "飞线中心点",
      },
      {
        name: "coordData",
        value: "coordData",
        desc: "坐标数据",
      },
      {
        name: "flyLineArr",
        value: "flyLineArr",
        desc: "飞线数据",
      },
      {
        name: "ipData",
        value: "ipData",
        desc: "IP数据",
      },
      {
        name: "ipCoordData",
        value: "ipCoordData",
        desc: "IP坐标数据",
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
          value: 1000,
        },
        {
          name: "height",
          displayName: "高度",
          value: 600,
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
      name: "displayMode",
      displayName: "显示方式",
      type: "radioGroup",
      direction: "horizontal", // 方向
      value: 0,
      options: [
        {
          name: "飞线",
          value: 0,
        },
        {
          name: "IP地址",
          value: 1,
        },
      ],
    },
    {
      name: "mapStyle",
      displayName: "地图样式",
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
          name: "bgColor",
          displayName: "地图背景色",
          value: "#14376c",
          type: "color",
        },
        {
          name: "selectColor",
          displayName: "选中背景色",
          value: "#22ccfb",
          type: "color",
        },
        // {
        //   name: "pointColor",
        //   displayName: "标点颜色",
        //   value: "#fce182",
        //   type: "color",
        // },
        {
          name: "borderColor",
          displayName: "边缘颜色",
          value: "#36a0e1",
          type: "color",
        },
      ],
    },
    {
      name: "flyStyle",
      displayName: "飞线样式",
      type: "collapse",
      hasSwitch: false,
      defaultExpand: true,
      value: [
        {
          name: "flyShow",
          displayName: "",
          value: true,
          type: "switch",
        },
        {
          name: "flyDirection",
          displayName: "飞线方向",
          type: "radioGroup",
          direction: "horizontal", // 方向
          value: 0,
          options: [
            {
              name: "聚拢",
              value: 0,
            },
            {
              name: "发散",
              value: 1,
            },
          ],
        },
        {
          name: "flyColor",
          displayName: "飞线颜色",
          value: "#B1FFFE",
          type: "color",
        },
        {
          name: "iconColor",
          displayName: "图标颜色",
          value: "#ade9f4",
          type: "color",
        },
        {
          name: "rippleColor",
          displayName: "涟漪颜色",
          value: "#ade9f4",
          type: "color",
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
