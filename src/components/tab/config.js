const componentDefaultConfig = {
  "id": "",
  "uniqueTag": "",
  "name": "选项卡",
  "parentId": "0",
  "dashboardId": "",
  "moduleName": "tab",
  "moduleType": "assist",
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
        "s": "1",
        "content": "选项一"
      },
      {
        "s": "2",
        "content": "选项二"
      },
      {
        "s": "3",
        "content": "选项三"
      },
      {
        "s": "4",
        "content": "选项四"
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
      }
    ]
  },
  "useFilter": false,
  "filters": [],
  "events": [],
  "config": [
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
          "value": 620
        },
        {
          "name": "height",
          "displayName": "高度",
          "value": 60
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
          "name": "color",
          "displayName": "",
          "type": "color",
          "value": "#fff"
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

      "name": "allGlobal",
      "displayName": "全局",
      "type": "collapse",
      "hasSwitch": false,
      "defaultExpand": true,
      "value": [
        {
          "name": "show",
          "displayName": "",
          "value": false,
          "type": "switch"
        },
        {
          "name": "align",
          "displayName":"对齐方式",
          "type": "alignFull",
          "value":[
            {
              "name":"textAlign",
              "displayName":"水平对齐",
              "type":"align",
              "range": ["left", "center", "right"],
              "value": "left"
            }
          ]
        }
      ]
    },
    {
      "name": "style",
      "displayName": "样式",
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
          "name": "styleTabs",
          "displayName": "样式tab栏",
          "type": "tabs",
          "activeKey": "1",
          "options": [
            {
              "key": "1",
              "name": "未选中",
              "value": [
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
                      "value": "#fff"
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
                  "name": "bgColor",
                  "displayName": "背景",
                  "type": "color",
                  "value": "#fff"
                },
                {
                  "name": "bgImg",
                  "displayName": "背景图",
                  "type": "image",
                  "value": ""
                },
                {
                  "name": "border",
                  "displayName": "描边",
                  "type": "borderRadius",
                  "value": {
                    "type": "solid",
                    "width": 1,
                    "color": "#000",
                    "radius": 0
                  }
                }
              ]
            },
            {
              "key": "2",
              "name": "选中",
              "value": [
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
                      "value": "#fff"
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
                  "name": "bgColor",
                  "displayName": "背景",
                  "type": "color",
                  "value": "#fff"
                },
                {
                  "name": "bgImg",
                  "displayName": "背景图",
                  "type": "image",
                  "value": ""
                },
                {
                  "name": "border",
                  "displayName": "描边",
                  "type": "borderRadius",
                  "value": {
                    "type": "solid",
                    "width": 1,
                    "color": "#000",
                    "radius": 0
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "name": "dataSeries",
      "displayName": "数据系列",
      "type": "tabArray",
      "defaultActiveKey": "1",
      "value": [
        {
          "key": "1",
          "displayName": "系列1",
          "name": "tab",
          "type": "object",
          "value": [
            {
              "name": "filed",
              "displayName": "s",
              "value": "",
              "type": "input"
            },
            {
              "name": "totalOffset",
              "displayName": "整体偏移",
              "type": "inputNumber2",
              "showDetail": true,
              "value":[
                {
                  "name": "offsetX",
                  "displayName": "X",
                  "type": "number",
                  "value": 0,
                  "config": {
                    "min": 0,
                    "max": 1000,
                    "step": 1,
                    "suffix": "px"
                  }
                },
                {
                  "name": "offsetY",
                  "displayName": "Y",
                  "type": "number",
                  "value": 0,
                  "config":{
                    "min": 0,
                    "max": 1000,
                    "step": 1,
                    "suffix": "px"
                  }
                }
              ]
            },
            {
              "name": "textOffset",
              "displayName": "文字偏移",
              "type": "inputNumber2",
              "showDetail": true,
              "value":[
                {
                  "name": "offsetX",
                  "displayName": "X",
                  "type": "number",
                  "value": 0,
                  "config": {
                    "min": 0,
                    "max": 1000,
                    "step": 1,
                    "suffix": "px"
                  }
                },
                {
                  "name": "offsetY",
                  "displayName": "Y",
                  "type": "number",
                  "value": 0,
                  "config":{
                    "min": 0,
                    "max": 1000,
                    "step": 1,
                    "suffix": "px"
                  }
                }
              ]
            },
            {
              "name": "widthProportion",
              "displayName": "宽度权重比",
              "type": "number",
              "value": 1,
              "config": {
                "min": 1,
                "max": 100,
                "step": 1,
                "suffix": ""
              }
            },
            {
              "name": "bgColor",
              "displayName": "默认背景色",
              "type": "color",
              "value": "#fff"
            },
            {
              "name": "bgImg",
              "displayName": "默认背景图",
              "type": "image",
              "value": ""
            },
            {
              "name": "selectedBgColor",
              "displayName": "选中背景色",
              "type": "color",
              "value": "#fff"
            },
            {
              "name": "selectedBgImg",
              "displayName": "选中背景图",
              "type": "image",
              "value": ""
            }
          ]
        }
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
}

export default componentDefaultConfig
