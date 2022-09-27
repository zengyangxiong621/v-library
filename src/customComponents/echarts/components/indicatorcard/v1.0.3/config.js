const componentDefaultConfig = {
  "id": "",
  "uniqueTag": "",
  "name": "指标卡",
  "parentId": "0",
  "dashboardId": "",
  "moduleType": "indicator",
  "moduleName": "indicatorcard",
  "moduleVersion": "1.0.3",
  "autoUpdate": {
    "isAuto": false,
    "interval": 10
  },
  "thumb": "",
  "dataConfig": {},
  "dataType": "static",
  "dataFrom": 0,
  "dataContainers": [],
  "staticData": {
    "data": [
      {
        "value": "30",
      }
    ],
    "fields": [
      {
        "name": "value",
        "value": "value"
      },
    ]
  },
  "useFilter": false,
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
          "value": 100
        },
        {
          "name": "top",
          "displayName": "Y轴坐标",
          "value": 200
        },
        {
          "name": "width",
          "displayName": "宽度",
          "value": 200
        },
        {
          "name": "height",
          "displayName": "高度",
          "value": 200
        }
      ]
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
          "value": true
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
          "value": "48px"
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
      "displayName": "环图颜色",
      "name": "circleColor",
      "type": "color",
      "value": "#5470c6"
    },
    {
      "displayName": "环图宽度",
      "name": "circleWidth",
      "type": "number",
      "value": 15,
      "config": {
        "min": 0,
        "max": 100,
        "step": 1,
        suffix: "",  // 输入框后缀
      }
    },
    {
      "displayName": "威胁等级",
      "name": "dangerLevel",
      type: "select",
      value: "低危",
      options: [
        {
          name: "严重",
          value: "严重"
        },
        {
          name: "高危",
          value: "高危"
        },
        {
          name: "中危",
          value: "中危"
        },
        {
          name: "低危",
          value: "低危"
        },
      ]
    }
  ],
  "themes": [
    {
      "id": "theme-default",
      "name": "系统默认"
    },
    {
      "id": "theme-light",
      "name": "浅色风格"
    },
    {
      "id": "theme-gov-blue",
      "name": "政务蓝"
    }
  ]
};

export default componentDefaultConfig;