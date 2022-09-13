const ComponentDefaultConfig = {
  "id": "", //组件ID
  "uniqueTag": "24e1b3a2-60e0-4cef-8a5d-f04fd645f14b", // =========
  "name": "柱状图", //图层名称
  "parentId": "", // 父组件 像是2D地图、3D地图 =================
  "dashboardId": "", //画布id

  "moduleName": "bar", //组件标识
  "moduleVersion": "1.0.0", //组件版本号

  "createdAt": "2022-04-02T07:22:31.290Z", // =========
  "updatedAt": "2022-04-02T07:22:39.798Z", // =========

  "autoUpdate": { "isAuto": false, "interval": 10 }, // =========
  "thumb": "", // 缩略图 // =========
  "dataFrom": 0,
  "dataConfig": {}, //数据源配置
  "dataType": "static", //数据类型：static;mysql;api;clickhouse
  "dataContainers": [],
  "staticData": {
    //静态数据
    "data": [
      {
        "x": "1月",
        "y": 5,
      },
      {
        "x": "2月",
        "y": 8,
      },
      {
        "x": "3月",
        "y": 6,
      },
      {
        "x": "4月",
        "y": 10,
      },
    ],
    "fields": [
      {
        "name": "x",
        "value": "x",
        "desc": "类目",
      },
      {
        "name": "y",
        "value": "y",
        "desc": "值",
      },
    ]
  },

  "useFilter": false,
  "filters": [],
  "events": [],
  "callbackArgs": [],
  "config": [
    // 样式配置
    {
      "name": "dimension",
      "displayName": "位置尺寸",
      "type": "dimensionGroup",
      "config": {
        "lock": false
      },
      "value": [
        {
          "name": "left",
          "displayName": "X轴坐标",
          "value": 100
        },
        {
          "name": "top",
          "displayName": "Y轴坐标",
          "value": 100
        },
        {
          "name": "width",
          "displayName": "宽度",
          "value": 600
        },
        {
          "name": "height",
          "displayName": "高度",
          "value": 400
        }
      ]
    },
    {
      "name": "hideDefault",
      "displayName": "默认隐藏",
      "type": "checkBox",
      "value": false
    },
    {
      name: "direction",
      displayName: "图表方向",
      type: "radioGroup",
      direction: "horizontal", // 方向
      value: "vertical",
      options: [
        {
          name: "纵向",
          value: "vertical"
        },
        {
          name: "横向",
          value: "horizontal"
        },
      ]
    }
  ],
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