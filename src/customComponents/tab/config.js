const componentDefaultConfig = {
  "id": "",
  "uniqueTag": "",
  "name": "滚动选择器",
  "parentId": "0",
  "dashboardId": "",
  "moduleName": "scrollSelect",
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
      },
      {
        "s": "5",
        "content": "选项五"
      },
      {
        "s": "6",
        "content": "选项六"
      },
      {
        "s": "7",
        "content": "选项七"
      },
      {
        "s": "8",
        "content": "选项八"
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
              "range": [ "left", "center", "right"],
              "value": "left"
            }
          ]
        },
        {
          "name": "defaultSelectedKey",
          "displayName": "默认选中",
          "type": "number",
          "value": 1,
          "config": {
            "min": 0,
            "max": 50,
            "step": 1
          }
        },
        {
          "name": "displayNums",
          "displayName": "显示数",
          "type": "number",
          "value": 7,
          "config": {
            "min": 0,
            "max": 50,
            "step": 1
          }
        },
        {
          "name": "spacing",
          "displayName": "选项间距",
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
          "name": "directionType",
          "displayName": "排列方式",
          "type": "radioGroup",
          "direction": "horizontal",
          "value": "horizontal",
          "options": [
            {
              "name": "竖值排列",
              "value": "horizontal"
            },
            {
              "name": "横向排列",
              "value": "vertical"
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
                  "name": "fontFamily",
                  "displayName": "字体",
                  "value": "Microsoft Yahei",
                  "type": "select",
                  "options": [
                    {
                      "name": "宋体",
                      "value": "宋体"
                    },
                    {
                      "name": "微软雅黑",
                      "value": "Microsoft Yahei"
                    },
                    {
                      "name": "黑体",
                      "value": "SimHei"
                    }
                  ]
                },
                {
                  "name": "fontSizeRange",
                  "displayName": "字号范围",
                  "type": "inputNumber2",
                  "showDetail": true,
                  "value":[
                    {
                      "name": "min",
                      "displayName": "最小值",
                      "type": "number",
                      "value": 0,
                      "config": {
                        "min": 0,
                        "max": 100,
                        "step": 1,
                        "suffix": "px"
                      }
                    },
                    {
                      "name": "max",
                      "displayName": "最大值",
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
                  "name": "colorStep",
                  "displayName": "颜色梯度",
                  "type": "color",
                  "value": "#e11717"
                },
                {
                  "name": "shadow",
                  "displayName": "阴影",
                  "type": "boxShadow",
                  "value": {
                    "color": "#0075FF",
                    "vShadow": 0,
                    "hShadow": 0,
                    "blur": 8
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
                  "name": "shadow",
                  "displayName": "阴影",
                  "type": "boxShadow",
                  "value": {
                    "color": "#0075FF",
                    "vShadow": 0,
                    "hShadow": 0,
                    "blur": 8
                  }
                }
              ]
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
