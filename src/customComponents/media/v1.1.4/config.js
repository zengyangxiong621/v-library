const componentDefaultConfig = {
  "id": "121", //组件ID
  "uniqueTag": "24e1b3a2-60e0-4cef-8a5d-f04fd645f14b", // =========
  "name": "音视频组件", //图层名称
  "parentId": "0", // 父组件 像是2D地图、3D地图 =================
  "dashboardId": "11", //画布id

  "moduleName": "media", //组件标识
  "moduleVersion": "1.1.4", //组件版本号
  "moduleType":"assist",

  "createTime":"2022-11-24 17:00",
  "updateTime":"2022-11-24 17:00",
  
  "createdAt": "2022-04-02T07:22:31.290Z", // =========
  "updatedAt": "2022-04-02T07:22:39.798Z", // =========

  "autoUpdate": {"isAuto": false, "interval": 10}, // =========
  "thumb": "", // 缩略图 // =========

  "dataConfig": {}, //数据源配置
  "dataType": "static", //数据类型：static;mysql;api;clickhouse
  "dataContainers": [{// =========
    "enable": true,
    "id": 2744,
    "rank": 0
  }],
  "staticData": {
    //静态数据
    "data": [
      {
        "url":"https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218093206z8V1JuPlpe.mp4"
      }
    ],
    "fields": [
      {
        "name": "url",
        "value": "url",
        "desc": "视频链接",
        "status":true
      }
    ]
  },

  "useFilter": false,// =========
  "filters": [],
  "events":[],
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
          "value": 1200
        },
        {
          "name": "height",
          "displayName": "高度",
          "value": 800
        }
      ]
    },
    {
      "name": "mediaFile",
      "displayName": "视频上传",
      "type": "media",
      "value": "https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218093206z8V1JuPlpe.mp4", // 有背景图则返回背景图的url，没有背景图返回空或者null
    },
    {
      "name": "hideDefault",
      "displayName": "默认隐藏",
      "type": "checkBox",
      "value": false
    },
    {
      "name": "controls",
      "displayName": "开启控制条",
      "type": "checkBox",
      "value": false
    },
    {
      "name": "Muted",
      "displayName": "静音",
      "type": "checkBox",
      "value": false
    },
    {
      "name": "Loop",
      "displayName": "循环播放",
      "type": "checkBox",
      "value": true
    },
    {
      "name": "autoPlaying",
      "displayName": "自动播放",
      "type": "checkBox",
      "value": false
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

export default componentDefaultConfig;