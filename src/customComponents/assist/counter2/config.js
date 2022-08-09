const componentDefaultConfig = {
  "id": '121', //组件ID
  "uniqueTag": "24e1b3a2-60e0-4cef-8a5d-f04fd645f14b", // =========
  "name": "翻牌器", //图层名称
  "parentId": "0", // 父组件 像是2D地图、3D地图 =================
  "dashboardId": "11", //画布id

  "moduleName": "counter", //组件标识
  "moduleVersion": "1.0.1", //组件版本号

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
        "name": "翻牌器标题",
        "value": "-1121.23"
      }
    ],
    "fields": [
      {
        "name": "name",
        "value": "name",
        "desc": "文本",
        "status": true // 状态
      },
      {
        "name": "value",
        "value": "value",
        "desc": "数值",
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
          "value": 743
        },
        {
          "name": "top",
          "displayName": "Y轴坐标",
          "value": 247
        },
        {
          "name": "width",
          "displayName": "宽度",
          "value": 400
        },
        {
          "name": "height",
          "displayName": "高度",
          "value": 100
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
      name:'commonConfig',
      displayName:'基础配置',
      type:'tabs',
      activeKey:'overall', // 默认选中第一项
      options:[
          {
            key:'overall',
            name:'全局配置',
            value:[
              {
                name:"sortedBy",
                displayName:'排列方式',
                type:'select',
                value:'up',
                options:[
                    {name:'标题在上',value:'up'},
                    {name: "标题在下", value: "down"},
                    {name: "标题在左", value: "left"},
                    {name: "标题在右", value: "right"}
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
                "name": "title",
                "displayName": "标题",
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
                        "value": '48'
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
                            value:0,
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
                  }
                ]
              }
            ]
          },
          {
            key:'counter',
            name:'翻牌器',
            value:[
              {
                name:'xxx',
                displayName:'xxx',
                type:'tabs',
                activeKey:'prefixConfig', // 默认选中第一项
                options:[
                  {
                    key:'prefixConfig',
                    name:'前缀',
                    value:[
                      {
                        "name": "support",
                        "displayName": "开启",
                        "type": "checkBox",
                        "value": true
                      },
                      {
                        'name':"content",
                        'displayName':'内容',
                        'type':'input',
                        'value':'￥',
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
                            "value": 24
                          },
                          {
                            "name": "color",
                            "displayName": "",
                            "type": "color",
                            "value": "#999" // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
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
                            "value": '48'
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
                                value:0,
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
                      }
                    ]
                  },
                  {
                      key:'numberConfig',
                      name:'数值',
                      value:[
                      {
                        'name': 'dataRangConfig',
                        'displayName': '数值样式',
                        'type': 'collapse',
                        'hasSwitch':false, // 是否有切换按钮
                        'defaultExpand':false,  // 是否默认展开
                        'value':[
                          {
                            "name": "show",
                            "displayName": "",
                            "value": true,
                            "type": "switch"
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
                            "name": "numShadow",
                            "displayName": "阴影",
                            "type": 'collapse',
                            "hasSwitch": true,
                            "defaultExpand": false,
                            "value": [
                              {
                                "name": "show",
                                "displayName": "",
                                "value": false,
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
                        'name': 'formateConfig',
                        'displayName': '格式化',
                        'type': 'collapse',
                        'hasSwitch':false, // 是否有切换按钮
                        'defaultExpand':false,  // 是否默认展开
                        'value':[
                          {
                            "name": "numShow",
                            "displayName": "",
                            "value": true,
                            "type": "switch"
                          },
                          {
                            name:'decimalCount',
                            displayName:'小数位位数',
                            type:'number',
                            value:2,
                            config:{
                                min:0,
                                max:10,
                            }
                          },
                          {
                            name:"splitCount",
                            displayName:'千分位分割',
                            type:'radioGroup',
                            direction:'horizontal,vertical', // 方向
                            value:true,
                            options:[
                              {
                                name:'是',
                                value:true
                              },
                              {
                                name:'否',
                                value:false
                              }
                            ]
                          }
                        ]
                      },
                      {
                        name:'duration',
                        displayName:'动画时间',
                        type:'number',
                        value:2,
                        config:{
                            min:1,
                            suffix:'s',  // 输入框后缀
                        }
                      }
                    ]
                  },
                  {
                    key:'suffixConfig',
                    name:'后缀',
                    value:[
                      {
                        "name": "support",
                        "displayName": "开启",
                        "type": "checkBox",
                        "value": true
                      },
                      {
                        'name':"content",
                        'displayName':'内容',
                        'type':'input',
                        'value':'/单位',
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
                            "value": 18
                          },
                          {
                            "name": "color",
                            "displayName": "",
                            "type": "color",
                            "value": "#0F92FF" // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
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
                            "value": '48'
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
                                value:0,
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
                      }
                    ]
                  }
                ]
              }
            ]
          }
      ]
    },
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