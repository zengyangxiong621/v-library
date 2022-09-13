const componentDefaultConfig = {
  "id": "", //组件ID
  "uniqueTag": "", // =========
  "name": "图片", //图层名称
  "parentId": "0", // 父组件 像是2D地图、3D地图 =================
  "dashboardId": "", //画布id

  "moduleName": "image", //组件标识
  "moduleVersion": "1.0.0", //组件版本号

  "createdAt": "2022-04-02T07:22:31.290Z", // =========
  "updatedAt": "2022-04-02T07:22:39.798Z", // =========

  "autoUpdate": { "isAuto": false, "interval": 10 }, // =========
  "thumb": "", // 缩略图 // =========

  "dataConfig": {}, //数据源配置
  "dataType": "static", //数据类型：static;mysql;api;clickhouse
  "dataFrom": 0,
  "dataContainers": [],
  "staticData": {
    //静态数据
    "data": [
      {
        "imageUrl": ""
      }
    ],
    "fields": [
      {
        "name": "imageUrl",
        "value": "imageUrl",
        "desc": "URL地址",
        "status": true // 状态
      }
    ]
  },

  "useFilter": false,// =========
  "filters": [],

  "events": [],
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
          "value": 200
        },
        {
          "name": "top",
          "displayName": "Y轴坐标",
          "value": 200
        },
        {
          "name": "width",
          "displayName": "宽度",
          "value": 754
        },
        {
          "name": "height",
          "displayName": "高度",
          "value": 398
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
      name: "backgroundImg",
      displayName: "图片上传",
      type: "image",
      value: "data:image/png;base64,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", // 有背景图则返回背景图的url，没有背景图返回空或者null
    },
    {
      "name": "opacity",
      "displayName": "透明度",
      "value": 100,
      type: "range",
      "config": {
        "min": 0,
        "max": 100,
        "step": 1,
        suffix: "%",  // 输入框后缀
      }
    },
    {
      "name": "rotate",
      "displayName": "旋转角度",
      type: "rotate",
      value: {
        angle: 0, // 角度
        direction: "horizontal" // 方向
      }
    },
    {
      "name": "animation",
      "displayName": "动画",
      "type": "collapse",
      hasSwitch: true, // 是否有切换按钮
      defaultExpand: true,  // 是否默认展开
      value: [
        {	// 如果有后面的按钮，则该项必须放在第一个
          "name": "showAnimation",
          "displayName": "",
          "value": false,
          "type": "switch",
        },
        {
          name: "infinite",
          displayName: "播放方式",
          type: "checkBoxGroup",
          direction: "horizontal", // 方向
          value: [],
          options: [
            {
              name: "循环播放",
              value: "infinite"
            }
          ]
        },
        {
          name: "timingFunction",
          displayName: "速率",
          type: "select",
          value: "linear",
          options: [
            {
              name: "匀速",
              value: "linear"
            },
            {
              name: "慢快慢",
              value: "ease"
            },
          ]
        },
        {
          name: "type",
          displayName: "类型",
          type: "select",
          value: "opacity",
          options: [
            {
              name: "透明度",
              value: "opacity"
            },
            {
              name: "缩放",
              value: "scale"
            }
          ]
        },
        {
          "name": "duration",
          "displayName": "动画时长",
          "value": 3,
          type: "number",
          "config": {
            "min": 0,
            "step": 1,
            suffix: "s",  // 输入框后缀
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