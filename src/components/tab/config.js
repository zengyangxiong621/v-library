const componentDefaultConfig = {
  "id": "",
  "uniqueTag": "",
  "name": "选项卡",
  "parentId": "0",
  "dashboardId": "",
  "moduleName": "tab",
  "moduleVersion": "1.0.0",
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
        s: '1',
        content: '选项一'
      },
      {
        s: '2',
        content: '选项二'
      },
      {
        s: '3',
        content: '选项三'
      },
      {
        s: '4',
        content: '选项四'
      }
    ],
    "fields": [
      {
        "name": "s",
        "value": "s"
      },
      {
        "name": "content",
        "value": "content"
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
          "value": '620px'
        },
        {
          "name": "height",
          "displayName": "高度",
          "value": '60px'
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
          "name": "color",
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
          "value": '48px'
        }
      ]
    },
    {
      "name": "hideDefault",
      "displayName": "默认隐藏",
      "type": "checkBox",
      "value": false
    },
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