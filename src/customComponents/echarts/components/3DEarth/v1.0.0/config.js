const ComponentDefaultConfig = {
  "id": "", //组件ID
  "uniqueTag": "", // =========
  "name": "3D地图", //图层名称
  "parentId": "", // 父组件 像是2D地图、3D地图 =================
  "dashboardId": "", //画布id

  "moduleType": "map",
  "moduleName": "3DEarth", //组件标识
  "moduleVersion": "1.0.1", //组件版本号

  "createdAt": "2022-04-02T07:22:31.290Z", // =========
  "updatedAt": "2022-04-02T07:22:39.798Z", // =========

  "autoUpdate": { "isAuto": false, "interval": 10 }, // =========
  "thumb": "", // 缩略图 // =========
  "dataFrom": 0,
  "dataConfig": {}, //数据源配置
  "dataType": "static", //数据类型：static;mysql;api;clickhouse
  "dataContainers": [],
  "staticData": {
    data: [
      {
        dataCenter: [
          {
            name: "昌平",
            value: "昌平",
            times: "1223",
            system: "3123",
          },
          {
            name: "勘探院",
            value: "勘探院",
            times: "1333",
            system: "3123",
          },
          {
            name: "吉林",
            value: "吉林",
            times: "2223",
            system: "2123",
          },
          {
            name: "克拉玛依",
            value: "克拉玛依",
            times: "3123",
            system: "3123",
          },
        ],
        ipData: [
          {
            name: "北京",
            value: "北京",
          },
          {
            name: "辽河",
            value: "辽河",
          },
          {
            name: "吉林2",
            value: "吉林",
          },
          {
            name: "大庆",
            value: "大庆",
          },
          {
            name: "西安",
            value: "西安",
          },
          {
            name: "兰州",
            value: "兰州",
          },
          {
            name: "新疆",
            value: "新疆",
          },
          {
            name: "西南",
            value: "西南",
          },
          {
            name: "华南",
            value: "华南",
          },
          {
            name: "华东",
            value: "华东",
          },
          {
            name: "大连",
            value: "大连",
          },
        ],
        ipCoordData: {
          昌平: [114.249193, 40.168238],
          勘探院: [118.357544, 36.992995],
          吉林: [129.539923, 43.941828],
          克拉玛依: [84.902321, 42.280525],
          北京: [116.536989, 39.777354],
          辽河: [123.779261, 41.79233],
          吉林2: [127.067982, 45.223481],
          大庆: [124.268447, 47.704549],
          西安: [108.979039, 34.273485],
          兰州: [103.672554, 36.505049],
          新疆: [ 85.520211, 36.860104],
          西南: [104.098755, 30.678152],
          华南: [113.341111, 23.02494],
          华东: [120.186041, 30.290762],
          大连: [121.653164, 40.079666],
        },
      },
    ],
  },
  "config": [
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
  ],

  "useFilter": false,
  "filters": [],
  "events": [],
  "callbackArgs": [],
  themes: [{
    id: "theme-default",
    name: "系统默认"
  }, {
    id: "theme-light",
    name: "浅色风格"
  }, {
    id: "theme-gov-blue",
    name: "政务蓝"
  }]
};

export default ComponentDefaultConfig;