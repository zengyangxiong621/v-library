const componentDefaultConfig = {
  "id": "",
  "uniqueTag": "",
  "name": "时间选择器",
  "parentId": "0",
  "dashboardId": "",
  "moduleName": "timeSelect",
  "moduleVersion": "1.0.0",
  "createdAt": "2022-04-02T07:22:31.290Z",
  "updatedAt": "2022-04-02T07:22:39.798Z",
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
  "useFilter": false,
  "filters": [],

  "events":[],
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
          "value": 100
        },
        {
          "name": "width",
          "displayName": "宽度",
          "value": 288
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
      "name": "selectType",
      "displayName": "选择器类型",
      "type": "select",
      "value": "date",
      "options":[
        {
          "name": "基础选择器",
          "value": "date"
        },
        {
          "name": "范围选择器",
          "value": "range"
        }
      ]
    },
    {
      "name": "pickerType",
      "displayName": "范围类型",
      "type": "select",
      "value": "date",
      "options":[
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
      ]
    },
    {
      "name": "dateFormat",
      "displayName": "日期格式",
      "type": "select",
      "value": "2",
      "options":[
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
          "value": 16
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
          "value": 0
        }
      ]
    },
    {
      "name": "textIndent",
      "displayName": "缩进",
      "type": "input",
      "value": "",
    },
    {
      "name": "selectBgColor",
      "displayName": "背景色",
      "value": "#222430",
      "type":"color"
    }
    // ,
    // {
    //   "name": "calendarConfig",
    //   "displayName": "日历框",
    //   "type": "collapse",
    //   "hasSwitch": false,
    //   "defaultExpand": true,
    //   "value": [
    //     {
    //       "name": "show",
    //       "displayName": "",
    //       "value": true,
    //       "type": "switch"
    //     },
    //     {
    //       "name": "styleColor",
    //       "displayName": "背景色",
    //       "value": "#222430",
    //       "type":"color"
    //     }
    //   ]
    // }
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