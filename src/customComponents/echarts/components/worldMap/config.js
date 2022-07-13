const componentDefaultConfig = {
  "id": '', //组件ID
  "uniqueTag": "", // =========
  "name": "世界地图2", //图层名称
  "parentId": "", // 父组件 像是2D地图、3D地图 =================
  "dashboardId": "", //画布id

  "moduleName": "worldMap2", //组件标识
  "moduleVersion": "1.0.2", //组件版本号

  "createdAt": "2022-04-02T07:22:31.290Z", // =========
  "updatedAt": "2022-04-02T07:22:39.798Z", // =========

  "autoUpdate": {"isAuto": false, "interval": 10}, // =========
  "thumb": "", // 缩略图 // =========

  "dataFrom": 0,
  "dataConfig": {}, // 数据源配置
  "dataType": "static", // 数据类型：static;mysql;api;clickhouse
  "dataContainers": [],
  "staticData": {
    // 静态数据
    "data": [
      {
        "text": "世界地图"
      }
    ],
    "fields": [
      {
        "name": "text",
        "value": "text",
        "desc": "文本",
        "status": true // 状态
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
          "value": 1000
        },
        {
          "name": "height",
          "displayName": "高度",
          "value": 600
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
      "name": "mapStyle",
      "displayName": "地图样式",
      "type": "collapse",
      "hasSwitch": false,
      "defaultExpand": true,
      "value": [
        {
          "name": "show",
          "displayName": "",
          "value": true,
          "type": "switch"
        },
        {
          "name": "bgColor",
          "displayName": "地图背景色",
          "value": "#14376c",
          "type": "color"
        },
        {
          "name": "selectColor",
          "displayName": "选中背景色",
          "value": "#22ccfb",
          "type": "color"
        },        
        {
          "name": "pointColor",
          "displayName": "标点颜色",
          "value": "#fce182",
          "type": "color"
        },
        {
          "name": "borderColor",
          "displayName": "边缘颜色",
          "value": "#2a2d3c",
          "type": "color"
        }
      ]
    },
    {
      "name": "flyStyle",
      "displayName": "飞线样式",
      "type": "collapse",
      "hasSwitch": true,
      "defaultExpand": true,
      "value": [
        {
          "name": "flyShow",
          "displayName": "",
          "value": true,
          "type": "switch"
        },
        {
          "name": "flyColor",
          "displayName": "飞线颜色",
          "value": "#ade9f4",
          "type": "color"
        },
        {
          "name": "iconColor",
          "displayName": "图标颜色",
          "value": "#ade9f4",
          "type": "color"
        },
        {
          "name": "rippleColor",
          "displayName": "涟漪颜色",
          "value": "#ade9f4",
          "type": "color"
        }
      ]
    },
  ],
  themes: [{
    id: 'theme-default',
    name: '系统默认'
  }, {
    id: 'theme-light',
    name: '浅色风格'
  }, {
    id: 'theme-gov-blue',
    name: '政务蓝'
  }]
}

export default componentDefaultConfig