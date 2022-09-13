const ComponentDefaultConfig = {
  "id": "", //组件ID
  "uniqueTag": "", // =========
  "name": "按钮组3", //图层名称
  "parentId": "", // 父组件 像是2D地图、3D地图 =================
  "dashboardId": "", //画布id

  "moduleName": "buttonGroup3", //组件标识
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
        "text": "按钮A"
      },
      {
        "text": "按钮B"
      },
      {
        "text": "按钮C"
      }
    ],
    "fields": [
      {
        "name": "text",
        "value": "text",
        "desc": "按钮文字",
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
          "value": 126
        },
        {
          "name": "height",
          "displayName": "高度",
          "value": 32
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
      "name": "defaultSelect",
      "displayName": "默认选中",
      "value": 1,
      "type": "number",
      "config": {
        "min": 1,
        "step": 1,
      }
    },
    {
      "name": "defaultStyle",
      "displayName": "默认样式",
      "type": "collapse",
      hasSwitch: false, // 是否有切换按钮
      defaultExpand: true,  // 是否默认展开
      value: [
        {	// 如果有后面的按钮，则该项必须放在第一个
          "name": "show",
          "displayName": "",
          "value": false,
          "type": "switch",
        },
        {
          "name": "defaultBgColor",
          "displayName": "背景",
          "value": "#fff", // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
          type: "color"
        },
        {
          name: "defaultBgImg",
          displayName: "背景图",
          type:"image",
          value: "", // 有背景图则返回背景图的url，没有背景图返回空或者null
        },
        {
          name: "defaultFont",
          displayName: "文本",
          type: "chartText",
          value: {
            fontFamily: "微软雅黑",
            fontSize: 12,
            color: "#000",
            fontWeight: "normal" // bold bolder lighter
          }
        },
        {
          "name": "defaultBorder",
          "displayName": "边框",
          type: "border",
          value: {
            type: "solid", // dotted 
            width: 1,
            color: "#666" // rgba(0,0,0,0)
          }
        }
      ]
    },
    {
      "name": "selectedStyle",
      "displayName": "选中样式",
      "type": "collapse",
      hasSwitch: false, // 是否有切换按钮
      defaultExpand: true,  // 是否默认展开
      value: [
        {	// 如果有后面的按钮，则该项必须放在第一个
          "name": "show",
          "displayName": "",
          "value": false,
          "type": "switch",
        },
        {
          "name": "selectedBgColor",
          "displayName": "背景",
          "value": "#fff", // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
          type: "color"
        },
        {
          name: "selectedBgImg",
          displayName: "背景图",
          type:"image",
          value: "", // 有背景图则返回背景图的url，没有背景图返回空或者null
        },
        {
          name: "selectedFont",
          displayName: "文本",
          type: "chartText",
          value: {
            fontFamily: "微软雅黑",
            fontSize: 12,
            color: "#1890ff",
            fontWeight: "normal" // bold bolder lighter
          }
        },
        {
          "name": "selectedBorder",
          "displayName": "边框",
          type: "border",
          value: {
            type: "solid", // dotted 
            width: 1,
            color: "#1890ff" // rgba(0,0,0,0)
          }
        }
      ]
    },
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