const componentDefaultConfig = {
  "id": "", //组件ID
  "uniqueTag": "", // ========= 24e1b3a2-60e0-4cef-8a5d-f04fd645f14b
  "name": "时间器", //图层名称
  "parentId": "0", // 父组件 像是2D地图、3D地图 =================
  "dashboardId": "", //画布id

  "moduleType": "assist",
  "moduleName": "date1", //组件标识
  "moduleVersion": "1.1.8", //组件版本号

  "createdAt": "2022-04-02T07:22:31.290Z", // =========
  "updatedAt": "2022-04-02T07:22:39.798Z", // =========

  "autoUpdate": {"isAuto": false, "interval": 10}, // =========
  "thumb": "", // 缩略图 // =========

  "dataFrom": 0,
  "dataConfig": {}, //数据源配置
  "dataType": "static", //数据类型：static;mysql;api;clickhouse
  "dataContainers": [],
  "staticData": {
    //静态数据
    "data": [
      {
        "date":"14:10:59 2022.05.24 星期二",
      }
    ],
    "fields": [
      {
        "name": "date",
        "value": "date",
      },
    ],
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
          "value": 600
        },
        {
          "name": "height",
          "displayName": "高度",
          "value": 100
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
      "name": "textStyle",
      "displayName": "文本样式",
      "type": "textFullStyleGroup",
      "value": [
        {
          "name": "fontFamily",
          "displayName": "",
          "value": "Microsoft Yahei"
        },
        {
          "name": "fontSize",
          "displayName": "",
          "value": 32
        },
        {
          "name": "themeTextColor",
          "displayName": "",
          "type": "color",
          "value": "#fff" // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
        },
        {
          "name": "bold",
          "displayName": "",
          "value": false
        },
        {
          "name": "italic",
          "displayName": "",
          "value": false
        },
        {
          "name": "letterSpacing",
          "displayName": "字距",
          "value": 0
        },
        {
          "name": "lineHeight",
          "displayName": "行距",
          "value": 32
        }
      ]
    },
    {
      "name": "spacing",
      "displayName": "间距",
      "value": 20,
      type:"number",
      "config": {
          "step": 1,
          suffix:"px",  // 输入框后缀
      }
    },
    {
      "name": "align",
      "displayName": "对齐方式",
      "type": "alignFull",
      "value": [
        {
          "name": "textAlign",
          "displayName": "水平对齐",
          "type": "align",
          "value": "left" // left , center, right,bothEnds
        },
        {
          "name": "textVertical",
          "displayName": "垂直对齐",
          "type": "vertical",
          "value": "top" // top bottom vertical
        },
      ]
    },
    {
      "name": "shadow",
      "displayName": "阴影",
      "type": "collapse",
      "hasSwitch": true,
      "defaultExpand": true,
      "value": [
        {
          "name": "show",
          "displayName": "",
          "value": false,
          "type": "switch"
        },
        {
          "name": "shadow",
          "displayName": "外阴影",
          "type": "boxShadow",
          "value": {
            "color": "#0075FF", // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
            "vShadow": 0, // 垂直阴影的位置
            "hShadow": 0, // 水平阴影的位置
            "blur": 8 // 模糊的距离
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

export default componentDefaultConfig;