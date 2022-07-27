const componentDefaultConfig = {
  "id": '121', //组件ID
  "uniqueTag": "24e1b3a2-60e0-4cef-8a5d-f04fd645f14b", // =========
  "name": "时间轴组件", //图层名称
  "parentId": "0", // 父组件 像是2D地图、3D地图 =================
  "dashboardId": "11", //画布id

  "moduleName": "timeline", //组件标识
  "moduleVersion": "1.0.0", //组件版本号

  "createdAt": "2022-04-02T07:22:31.290Z", // =========
  "updatedAt": "2022-04-02T07:22:39.798Z", // =========

  "autoUpdate": {"isAuto": false, "interval": 10}, // =========
  "thumb": "", // 缩略图 // =========

  "dataConfig": {}, //数据源配置
  "dataType": "static", //数据类型：static;mysql;api;clickhouse
  "dataContainers": [{// =========
    "enable": true,
    "id": 2744,
    "rank": 0
  }],
  "staticData": {
    //静态数据
    "data": [
      {
        'time':'12:03:04',
        'title':'123.456.789',
        'content':'Solve initial network problems 2015-09-01'
      },
      {
        'time':'12:03:04',
        'title':'123.456.789',
        'content':'Solve initial network problems 2015-09-01'
      },
      {
        'time':'12:03:04',
        'title':'123.456.789',
        'content':'1231312313131231434356565577777777777777777777777777777777777777777777777777777777777777777777777'
      }
    ],
    "fields": [
      {
        "name": "time",
        "value": "time",
        "desc": "时间结点",
        "status":true
      },
      {
        "name": "title",
        "value": "title",
        "desc": "内容标题",
        "status":true
      },
      {
        "name": "content",
        "value": "content",
        "desc": "内容正文",
        "status":true
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
          "value": 800
        },
        {
          "name": "height",
          "displayName": "高度",
          "value": 800
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
      "type": "tabs",
      'options':[
        {
          "name": "时间轴样式",
          "key":'labelStyle',
          'value':[{
            "name": "label",
            "displayName": "时间样式",
            "type": 'collapse',
            "hasSwitch": true,
            "defaultExpand": true,
            "isHide":true,
            "value":[
              {
                "name": "show",
                "displayName": "",
                "value": true,
                "type": "switch"
              },
              {
                "name": "styleController",
                "displayName": "时间样式",
                "type": "textFullStyleGroup",
                "value":[
                  {
                    "name": "fontFamily",
                    "displayName": "",
                    "value": "Microsoft Yahei"
                  },
                  {
                    "name": "fontSize",
                    "displayName": "",
                    "value": 24
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
                    "value": '24px'
                  }
                ]
              },
              {
                name:"offsetConfig",
                displayName:'偏移',
                type:'inputNumber2',
                showDetail:true, // 是否展示下面的文字说明
                value:[
                    {
                        name:'x',
                        displayName:'X',
                        type:'number',
                        value:-20,
                        config:{
                            min:0,
                            suffix:'px',  // 输入框后缀
                        }
                    },
                    {
                        name:'y',
                        displayName:'Y',
                        type:'number',
                        value:0,
                        config:{
                            min:0,
                            suffix:'px',  // 输入框后缀
                        }
                    },
                ]
              },
              {
                "name": "labelOutShadow",
                "displayName": "阴影",
                "type": 'collapse',
                "hasSwitch": true,
                "defaultExpand": true,
                "value": [
                  {
                    "name": "show",
                    "displayName": "",
                    "value": true,
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
              }
            ]
          }]
        },
        {
          "name": "内容样式",
          "key":'fontStyle',
          "value":[
            {
              "name":'title',
              "displayName": "标题",
              "type": 'collapse',
              "hasSwitch": false,
              "defaultExpand": true,
              "value":[
                {
                  "name": "show",
                  "displayName": "",
                  "value": true,
                  "type": "switch"
                },
                {
                  "name": "styleController",
                  "displayName": "标题样式",
                  "type": "textFullStyleGroup",
                  "value":[
                    {
                      "name": "fontFamily",
                      "displayName": "",
                      "value": "Microsoft Yahei"
                    },
                    {
                      "name": "fontSize",
                      "displayName": "",
                      "value": 28
                    },
                    {
                      "name": "color",
                      "displayName": "",
                      "type": "color",
                      "value": "rgba(86,232,232,1)" // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
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
                      "value": 48
                    }
                  ]
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
                    }
                  ]
                },
                {
                  "name": "outShadow",
                  "displayName": "阴影",
                  "type": 'collapse',
                  "hasSwitch": true,
                  "defaultExpand": true,
                  "value": [
                    {
                      "name": "show",
                      "displayName": "",
                      "value": true,
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
                }
              ]
            },
            {
              "name":'content',
              "displayName": "正文",
              "type": 'collapse',
              "hasSwitch": false,
              "defaultExpand": true,
              "value":[
                {
                  "name": "show",
                  "displayName": "",
                  "value": true,
                  "type": "switch"
                },
                {
                  "name": "styleController",
                  "displayName": "内容样式",
                  "type": "textFullStyleGroup",
                  "value":[
                    {
                      "name": "fontFamily",
                      "displayName": "",
                      "value": "Microsoft Yahei"
                    },
                    {
                      "name": "fontSize",
                      "displayName": "",
                      "value": 24
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
                      "value":48
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "name": "backgroundColor",
      "displayName": "背景颜色",
      "type": "color",
      "value": 'rgba(255,255,255,0.1)'
    },
    {
      "name":"spotStyle",
      "displayName":'圆点样式',
      "type":'textStroke',
      "value":{
        "width":20,
        "color":'#fff'
      }
    }
  ],
  themes: [{
    id: 'theme-default',
    name: '系统默认'
  }, {
    id: 'theme-light',
    name: '浅色风格'
  }, {
    id: 'theme-gov-blue',
    name: '政务蓝'
  }]
}

export default componentDefaultConfig