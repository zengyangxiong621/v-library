const componentDefaultConfig = {
  "id": "",
  "uniqueTag": "",
  "name": "序号列表",
  "parentId": "",
  "dashboardId": "",
  "moduleName": "rankingList2",
  "moduleVersion": "1.0.2",
  "moduleType": 'assist',
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
        "column1": "2022.03.15 12:30:00",
        "column2": '车辆管理系统',
        "column3": "受攻击:21",
      },
      {
        "column1": "2022.03.15 12:30:00",
        "column2": '车辆管理系统',
        "column3": "受攻击:21",
      },
      {
        "column1": "2022.03.15 12:30:00",
        "column2": '车辆管理系统',
        "column3": "受攻击:21",
      },
      {
        "column1": "2022.03.15 12:30:00",
        "column2": '车辆管理系统',
        "column3": "受攻击:21",
      },
      {
        "column1": "2022.03.15 12:30:00",
        "column2": '车辆管理系统',
        "column3": "受攻击:21",
      },
    ],
    "fields": [
      {
        "name": "column1",
        "value": "column1"
      },
      {
        "name": "column2",
        "value": "column2"
      },
      {
        "name": "column3",
        "value": "column3"
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
          "value": '800px'
        },
        {
          "name": "height",
          "displayName": "高度",
          "value": '400px'
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
          "value": 14
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
          "value": '48'
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
      'name': 'backgroundColor',
      'displayName': '背景色',
      'value': '#000000', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
      type: 'color'
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
}

export default componentDefaultConfig