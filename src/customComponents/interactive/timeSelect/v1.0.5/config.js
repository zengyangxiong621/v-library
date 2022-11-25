const ComponentDefaultConfig = {
  "name": "时间选择器",
  "moduleName": "timeSelect",
  "moduleVersion": "1.0.5",
  "lastModuleVersion": "1.0.4",
  "moduleType": "interactive",
  "config": [
    {
      "displayName": "位置尺寸",
      "name": "dimension",
      "type": "dimensionGroup",
      "config": {
        "lock": false
      },
      "value": [
        {
          "displayName": "X轴坐标",
          "name": "left",
          "value": 100
        },
        {
          "displayName": "Y轴坐标",
          "name": "top",
          "value": 100
        },
        {
          "displayName": "宽度",
          "name": "width",
          "value": 300
        },
        {
          "displayName": "高度",
          "name": "height",
          "value": 50
        }
      ]
    },
    {
      "displayName": "默认隐藏",
      "name": "hideDefault",
      "type": "checkBox",
      "value": false
    },
    {
      "hasSwitch": false,
      "defaultExpand": false,
      "displayName": "全局",
      "name": "allGlobal",
      "type": "collapse",
      "value": [
        {
          "displayName": "",
          "name": "show",
          "type": "switch",
          "value": false
        },
        {
          "displayName": "选择器类型",
          "name": "selectType",
          "options": [
            {
              "name": "基础选择器",
              "value": "date"
            },
            {
              "name": "范围选择器",
              "value": "range"
            }
          ],
          "type": "select",
          "value": "range"
        },
        {
          "displayName": "范围类型",
          "name": "pickerType",
          "options": [
            {
              "name": "日期",
              "value": "date"
            },
            {
              "name": "时间",
              "value": "time"
            },
            {
              "name": "周",
              "value": "week"
            },
            {
              "name": "月",
              "value": "month"
            },
            {
              "name": "季度",
              "value": "quarter"
            },
            {
              "name": "年",
              "value": "year"
            }
          ],
          "type": "select",
          "value": "date"
        },
        {
          "displayName": "日期格式",
          "name": "dateFormat",
          "options": [
            {
              "name": "YYYY-MM-DD HH:mm:ss",
              "value": "1"
            },
            {
              "name": "YYYY-MM-DD",
              "value": "2"
            },
            {
              "name": "HH:mm:ss",
              "value": "3"
            },
            {
              "name": "YYYY/MM/DD HH:mm:ss",
              "value": "4"
            },
            {
              "name": "YYYY/MM/DD",
              "value": "5"
            }
          ],
          "type": "select",
          "value": "2"
        }
      ]
    },
    {
      "hasSwitch": false,
      "defaultExpand": false,
      "displayName": "选择器",
      "name": "selector",
      "type": "collapse",
      "value": [
        {
          "displayName": "",
          "name": "show",
          "type": "switch",
          "value": false
        },
        {
          "displayName": "文本样式",
          "name": "textStyle",
          "type": "textFullStyleGroup",
          "value": [
            {
              "displayName": "",
              "name": "fontFamily",
              "value": "Microsoft Yahei"
            },
            {
              "displayName": "",
              "name": "fontSize",
              "value": 14
            },
            {
              "displayName": "",
              "name": "color",
              "type": "color",
              "value": "#fff"
            },
            {
              "displayName": "",
              "name": "bold",
              "value": false
            },
            {
              "displayName": "",
              "name": "italic",
              "value": false
            },
            {
              "displayName": "字距",
              "name": "letterSpacing",
              "value": 0
            },
            {
              "displayName": "行距",
              "name": "lineHeight",
              "value": 0
            }
          ]
        },
        {
          "displayName": "背景色",
          "name": "selectBgColor",
          "type": "color",
          "value": "#2e4af1"
        },
        {
          "displayName": "边框颜色",
          "name": "selectBorderColor",
          "type": "color",
          "value": "#fff"
        }
      ]
    }
  ],
  "dataConfig": {},
  "autoUpdate": {},
  "dataType": "static",
  "staticData": {
    "data": [
      {
        "cookieTime": "2022-06-08",
        "sleepTime": "2023-06-08"
      }
    ],
    "fields": [
      {
        "name": "startTime",
        "value": "cookieTime",
        "desc": "开始时间",
        "status": true
      },
      {
        "name": "endTime",
        "value": "sleepTime",
        "desc": "结束时间",
        "status": true
      }
    ]
  },
  "events": [],
  "triggers": [],
  "useFilter": false,
  "filters": [],
  "actions": [],
  "parent": null,
  "dataContainers": [],
  "dataFrom": 0,
  "callbackArgs": [],
  "drillDownArr": [],
  "websocketConfig": []
}
export default ComponentDefaultConfig
