const componentDefaultConfig = {
  "id": "121", //组件ID
  "uniqueTag": "24e1b3a2-60e0-4cef-8a5d-f04fd645f14b", // =========
  "name": "分页", //图层名称
  "parentId": "0", // 父组件 像是2D地图、3D地图 =================
  "dashboardId": "11", //画布id

  "moduleName": "paginationComp", //组件标识
  "moduleVersion": "1.2.5", //组件版本号
  "moduleType":"interactive",

  "createTime":"2022-11-25 17:00",
  "updateTime":"2022-11-25 17:00",

  "createdAt": "2022-04-02T07:22:31.290Z", // =========
  "updatedAt": "2022-04-02T07:22:39.798Z", // =========

  "autoUpdate": {"isAuto": false, "interval": 10}, // =========
  "thumb": "", // 缩略图 // =========

  "dataConfig": {}, //数据源配置
  "dataType": "static", //数据类型：static;mysql;api;clickhouse
  "dataContainers": [],
  "triggers": [ // 下面是合集
    {
      "name": "当请求完成或数据变化时",
      "value": "dataChange",
    },
    {
      "name": "鼠标点击",
      "value": "click",
    },
    {
      "name": "鼠标移入",
      "value": "mouseEnter",
    },
    {
      "name": "鼠标移出",
      "value": "mouseLeave",
    },
    {
      "name": "状态变化",
      "value": "statusChange",
    }
  ],
  "staticData": {
    //静态数据
    "data":[
      {
        "total":100
      }
    ],
    "fields": [
      {
        "name":"total",
        "value":"total"
      }
    ]
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
          "value": 700
        },
        {
          "name": "height",
          "displayName": "高度",
          "value": 50
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
      "name":"paginationConfig",
      "displayName":"分页配置",
      "type":"tabs",
      "activeKey":"1", // 默认选中第一项
      "options":[
        {
          "key":"1",
          "name":"全局",
          "value":[
            {
              "name": "pageDesc",
              "displayName": "文字描述",
              "type": "checkBox",
              "value": true
            },
            {
              "name": "quickJump",
              "displayName": "快速跳转",
              "type": "checkBox",
              "value": true
            },
            {
              "name": "pageSizeSwitch",
              "displayName": "页数切换器",
              "type": "checkBox",
              "value": true
            },
            {
              "name":"pageSizeOptions",
              "displayName":"每页条数",
              "type":"input",
              "value":"10;20;50;100"
            },
            {
              "name":"size",
              "displayName":"尺寸",
              "type":"select",
              "value":"default",
              "options":[
                {
                  "name":"默认",
                  "value":"default"
                },
                {
                  "name":"小尺寸",
                  "value":"small"
                }
              ]
            },
            {
              "name": "borderRadius",
              "displayName": "圆角",
              "value": 50,
              "type":"range",
              "config": {
                "min": 0,
                "max": 100,
                "step": 1,
                "suffix":"%",  // 输入框后缀
              }
            }
          ]
        },
        {
          "key":"2",
          "name":"样式",
          "value":[
            {
              "name": "defaultStyle",
              "displayName": "默认",
              "type": "collapse",
              "hasSwitch": false,
              "defaultExpand": true,
              "value": [
                { 
                  "name": "show", 
                  "displayName": "", 
                  "value": false, 
                  "type": "switch" 
                },{
                  "name": "pageBgColor",
                  "displayName": "背景",
                  "value": "rgba(144,172,201,0.15)", // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
                  "type":"color"
                },{
                  "name": "pageTextStyle",
                  "displayName": "文本样式",
                  "type": "textFullStyleGroup",
                  "value": [
                      {
                          "name": "fontFamily",
                          "displayName": "",
                          "value": "Microsoft Yahei",
                      },
                      {
                          "name": "fontSize",
                          "displayName": "",
                          "value": 12,
                      },
                      {
                          "name": "themeTextColor",
                          "displayName": "",
                          "type": "color",
                          "value": "#B3CDE0", // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
                      },
                      {
                          "name": "bold",
                          "displayName": "",
                          "value": false,
                      },
                      {
                          "name": "italic",
                          "displayName": "",
                          "value": false,
                      },
                      {
                          "name": "letterSpacing",
                          "displayName": "字距",
                          "value": 0,
                      },
                      {
                          "name": "lineHeight",
                          "displayName": "行距",
                          "value": 24,
                      },
                  ],
                },{
                  "name":"pageBorder",
                  "displayName":"描边",
                  "type":"textStroke",
                  "value":{
                    "width":1,
                    "color":"#90ACC9"
                  }
                }
              ]
            },
            {
              "name": "hoverStyle",
              "displayName": "悬浮",
              "type": "collapse",
              "hasSwitch": false,
              "defaultExpand": true,
              "value": [
                { 
                  "name": "show", 
                  "displayName": "", 
                  "value": false, 
                  "type": "switch" 
                },{
                  "name": "pageBgColor",
                  "displayName": "背景",
                  "value": "#222430", // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
                  "type":"color"
                },{
                  "name": "pageTextStyle",
                  "displayName": "文本样式",
                  "type": "textFullStyleGroup",
                  "value": [
                      {
                          "name": "fontFamily",
                          "displayName": "",
                          "value": "Microsoft Yahei",
                      },
                      {
                          "name": "fontSize",
                          "displayName": "",
                          "value": 12,
                      },
                      {
                          "name": "themeColor",
                          "displayName": "",
                          "type": "color",
                          "value": "#E6F7FF", // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
                      },
                      {
                          "name": "bold",
                          "displayName": "",
                          "value": false,
                      },
                      {
                          "name": "italic",
                          "displayName": "",
                          "value": false,
                      },
                      {
                          "name": "letterSpacing",
                          "displayName": "字距",
                          "value": 0,
                      },
                      {
                          "name": "lineHeight",
                          "displayName": "行距",
                          "value": 24,
                      },
                  ],
                },{
                  "name":"themePageBorder",
                  "displayName":"描边",
                  "type":"textStroke",
                  "value":{
                    "width":1,
                    "color":"#7DDCFF"
                  }
                }
              ]
            },
            {
              "name": "activeStyle",
              "displayName": "选中",
              "type": "collapse",
              "hasSwitch": false,
              "defaultExpand": true,
              "value": [
                { 
                  "name": "show", 
                  "displayName": "", 
                  "value": false, 
                  "type": "switch" 
                },{
                  "name": "pageBgColor",
                  "displayName": "背景",
                  "value": "rgba(19,98,184,0.3)", // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
                  "type":"color"
                },{
                  "name": "pageTextStyle",
                  "displayName": "文本样式",
                  "type": "textFullStyleGroup",
                  "value": [
                      {
                          "name": "fontFamily",
                          "displayName": "",
                          "value": "Microsoft Yahei",
                      },
                      {
                          "name": "fontSize",
                          "displayName": "",
                          "value": 12,
                      },
                      {
                          "name": "themeColor",
                          "displayName": "",
                          "type": "color",
                          "value": "#E6F7FF", // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
                      },
                      {
                          "name": "bold",
                          "displayName": "",
                          "value": true,
                      },
                      {
                          "name": "italic",
                          "displayName": "",
                          "value": false,
                      },
                      {
                          "name": "letterSpacing",
                          "displayName": "字距",
                          "value": 0,
                      },
                      {
                          "name": "lineHeight",
                          "displayName": "行距",
                          "value": 24,
                      },
                  ],
                },{
                  "name":"themePageBorder",
                  "displayName":"描边",
                  "type":"textStroke",
                  "value":{
                    "width":1,
                    "color":"#B3EAFF"
                  }
                }
              ]
            },
            {
              "name": "pageSelect",
              "displayName": "页数选择器",
              "type": "collapse",
              "hasSwitch": false,
              "defaultExpand": true,
              "value":[
                { 
                  "name": "show", 
                  "displayName": "", 
                  "value": false, 
                  "type": "switch" 
                },{
                  "name": "pageSelectBgColor",
                  "displayName": "背景",
                  "value": "rgba(144,172,201,0.15)", // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
                  "type":"color"
                },{
                  "name": "pageSelectTextStyle",
                  "displayName": "文本样式",
                  "type": "textFullStyleGroup",
                  "value": [
                      {
                          "name": "fontFamily",
                          "displayName": "",
                          "value": "Microsoft Yahei",
                      },
                      {
                          "name": "fontSize",
                          "displayName": "",
                          "value": 12,
                      },
                      {
                          "name": "themeTextColor",
                          "displayName": "",
                          "type": "color",
                          "value": "#B3CDE0", // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
                      },
                      {
                          "name": "bold",
                          "displayName": "",
                          "value": true,
                      },
                      {
                          "name": "italic",
                          "displayName": "",
                          "value": false,
                      },
                      {
                          "name": "letterSpacing",
                          "displayName": "字距",
                          "value": 0,
                      },
                      {
                          "name": "lineHeight",
                          "displayName": "行距",
                          "value": 24,
                      },
                  ],
                },{
                  "name":"pageSelectBorder",
                  "displayName":"描边",
                  "type":"textStroke",
                  "value":{
                    "width":1,
                    "color":"#B3EAFF"
                  }
                }
              ]
            },
            {
              "name": "pageInfoText",
              "displayName": "分页信息描述",
              "type": "collapse",
              "hasSwitch": false,
              "defaultExpand": true,
              "value":[
                { 
                  "name": "show", 
                  "displayName": "", 
                  "value": false, 
                  "type": "switch" 
                },{
                  "name": "pageInfoTextStyle",
                  "displayName": "文本样式",
                  "type": "textFullStyleGroup",
                  "value": [
                      {
                          "name": "fontFamily",
                          "displayName": "",
                          "value": "Microsoft Yahei",
                      },
                      {
                          "name": "fontSize",
                          "displayName": "",
                          "value": 12,
                      },
                      {
                          "name": "themeTextColor",
                          "displayName": "",
                          "type": "color",
                          "value": "#E6F7FF", // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
                      },
                      {
                          "name": "bold",
                          "displayName": "",
                          "value": true,
                      },
                      {
                          "name": "italic",
                          "displayName": "",
                          "value": false,
                      },
                      {
                          "name": "letterSpacing",
                          "displayName": "字距",
                          "value": 0,
                      },
                      {
                          "name": "lineHeight",
                          "displayName": "行距",
                          "value": 24,
                      },
                  ],
                }
              ]
            },
          ]
        }
      ]
    }

  ],
  "themes": [{
    "id": "theme-default",
    "name": "系统默认"
  }, {
    "id": "theme-light",
    "name": "浅色风格"
  }, {
    "id": "theme-gov-blue",
    "name": "政务蓝"
  }]
};

export default componentDefaultConfig;