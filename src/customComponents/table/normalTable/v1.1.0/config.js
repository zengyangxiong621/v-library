const ComponentDefaultConfig = {
  "id": "121",
  "uniqueTag": "24e1b3a2-60e0-4cef-8a5d-f04fd645f14b",
  "name": "常规表格",
  "parentId": "0",
  "dashboardId": "11",
  "moduleName": "normalTable",
  "moduleType": "table",
  "moduleVersion": "1.1.0",
  "createTime":"2022-11-24 17:00",
  "updateTime":"2022-11-24 17:00",
  "thumb": "",
  "dataConfig": {},
  "dataType": "static",
  "dataFrom": 0,
  "dataContainers": [],
  "staticData": {
    "data": [
      {
        "id":"1",
        "column1": "北京",
        "column2": 87.2, 
        "column3": "超预期" 
      }, {
        "id":"2",
        "column1": "上海",
        "column2": 80.5,
        "column3": "达标",
      }, {
        "id":"3",
        "column1": "杭州", 
        "column2": 72.3, 
        "column3": "达标" 
      }, {
        "id":"4",
        "column1": "重庆",
        "column2": 65.5,
        "column3": "未达标",
      }, {
        "id":"5",
        "column1": "成都", 
        "column2": 58.4, 
        "column3": "未达标" 
      }, {
        "id":"6",
        "column1": "厦门",
        "column2": 52.5,
        "column3": "未达标",
      }, {
        "id":"7",
        "column1": "云南", 
        "column2": 40.2, 
        "column3": "未达标" 
      }
    ],
    "fields": [{ "name": "column1", "value": "column1", "desc": "文本" }, {
      "name": "column2",
      "value": "column2",
      "desc": "文本",
    }, { "name": "column3", "value": "column3", "desc": "文本" }, {
      "name": "column4",
      "value": "column4",
      "desc": "文本",
    }, { "name": "column5", "value": "column5", "desc": "文本" }],
  },
  "useFilter": false,
  "filters": [],
  "config": [
    {
      "name": "dimension",
      "displayName": "位置尺寸",
      "type": "dimensionGroup",
      "config": { "lock": false },
      "value": [
        { 
          "name": "left", 
          "displayName": "X轴坐标", 
          "value": 100 
        }, {
          "name": "top",
          "displayName": "Y轴坐标",
          "value": 100,
        }, { 
          "name": "width", 
          "displayName": "宽度",
          "value": 600 
        }, {
          "name": "height",
          "displayName": "高度",
          "value": 600,
        }
      ],
    },{
      "name": "hideDefault",
      "displayName": "默认隐藏",
      "type": "checkBox",
      "value": false
    },{
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
        }, {
        "name": "tableSize",
        "displayName": "表格大小",
        "type": "select",
        "value":"default",
        "options":[
          {
            "name":"默认",
            "value":"default"
          },
          {
            "name":"中",
            "value":"middle"
          },
          {
            "name":"小",
            "value":"small"
          }
        ]
        }, {
          "name": "haveBorder",
          "displayName": "开启边框",
          "type": "switch",
          "value": false
        },{
          "name": "haveScroll",
          "displayName": "显示滚动条",
          "type": "collapse",
          "hasSwitch": true,
          "defaultExpand": true,
          "value":[
            {
              "name": "show",
              "displayName": "",
              "value": true,
              "type": "switch"
            },
            {
              "name": "scrollTrack",
              "displayName": "轨道颜色",
              "value": "#222430",
              "type": "color"
            },
            {
              "name": "scrollThumb",
              "displayName": "滑块颜色",
              "value": "#fff",
              "type": "color"
            }
          ]
        }
      ],
    },{
      "name": "expand",
      "displayName": "可展开",
      "type": "collapse",
      "hasSwitch": true,
      "defaultExpand": false,
      "value":[
        {
          "name": "show",
          "displayName": "",
          "value": true,
          "type": "switch"
        },
        {
          "name":"expandField",
          "displayName":"展开字段",
          "type":"input",
          "value":"column1",
        },
        {
          "name": "expandBgColor",
          "displayName": "展开行背景",
          "value": "#222430",
          "type": "color"
        },
        {
          "displayName": "文本样式",
          "name": "expandTextStyle",
          "type": "textFullStyleGroup",
          "value": [{ "displayName": "", "name": "fontFamily", "value": "Microsoft Yahei" }, {
            "displayName": "",
            "name": "fontSize",
            "value": 14,
          }, { "displayName": "", "name": "color", "type": "color", "value": "#333" }, {
            "displayName": "",
            "name": "bold",
            "value": false,
          }, { "displayName": "", "name": "italic", "value": false }, {
            "displayName": "字距",
            "name": "letterSpacing",
            "value": 0,
          }, { "displayName": "行距", "name": "lineHeight", "value": "14" }],
        }
      ]
    },{
      "name": "tableRow",
      "displayName": "行配置",
      "type": "collapse",
      "hasSwitch": true,
      "defaultExpand": false,
      "value": [
        { 
          "name": "show", 
          "displayName": "", 
          "value": true, 
          "type": "switch"
        }, {
          "name": "evenBgColor",
          "displayName": "奇行背景色",
          "value": "#222430",
          "type": "color"
        }, {
          "name": "oddBgColor", 
          "displayName": "偶行背景色", 
          "value": "#2a2d3c", 
          "type": "color" 
        },{
          "name": "themeHoverBgColor", 
          "displayName": "悬浮背景色", 
          "value": "#2a2d3c", 
          "type": "color" 
        },{
          "name": "dragerSort",
          "displayName": "拖拽排序",
          "type": "switch",
          "value": false
        }
      ],
    },{
      "name": "tableHeader",
      "displayName": "表头",
      "type": "collapse",
      "hasSwitch": true,
      "defaultExpand": false,
      "value": [
        { "name": "show", "displayName": "", "value": true, "type": "switch" },
        { "name": "bgColor", "displayName": "背景颜色", "value": "#fff", "type": "color" },
        {
          "displayName": "文本样式",
          "name": "textStyle",
          "type": "textFullStyleGroup",
          "value": [{ "displayName": "", "name": "fontFamily", "value": "Microsoft Yahei" }, {
            "displayName": "",
            "name": "fontSize",
            "value": 14,
          }, { "displayName": "", "name": "color", "type": "color", "value": "#333" }, {
            "displayName": "",
            "name": "bold",
            "value": false,
          }, { "displayName": "", "name": "italic", "value": false }, {
            "displayName": "字距",
            "name": "letterSpacing",
            "value": 0,
          }, { "displayName": "行距", "name": "lineHeight", "value": "unset" }],
        }],
    },{
        "name": "customColumn",
        "displayName": "自定义列",
        "type": "tabArray",
        "defaultActiveKey": "1",
        "config": {
          "template": [
            {
              "key": "1",
              "displayName": "列1",
              "name": "tab",
              "type": "object",
              "value": [
                {
                  "displayName": "映射",
                  "name": "mapping",
                  "type": "input2",
                  "value": [{
                    "displayName": "字段名",
                    "name": "fieldName",
                    "type": "input",
                    "value": "column1",
                  }, { "displayName": "显示名", "name": "displayName", "type": "input", "value": "销售地区" }],
                },{
                  "name":"width",
                  "displayName":"宽度",
                  "type":"input",
                  "value":"auto",
                  "config":{
                    "suffix":"px",  // 输入框后缀
                  }
                },{
                  "name": "align",
                  "displayName": "对齐方式",
                  "type": "alignFull",
                  "value": [{
                    "name": "textAlign",
                    "displayName": "水平对齐",
                    "type": "align",
                    "range": ["left", "center", "right"],
                    "value": "left",
                  }],
                },{
                  "name": "overflowType",
                  "displayName": "文字溢出",
                  "type": "select",
                  "options": [{ "name": "省略号", "value": "ellipsis" }, { "name": "换行", "value": "wrap" }],
                  "value": "ellipsis",
                },{
                  "name": "fixedColumn",
                  "displayName": "是否固定列",
                  "type": "collapse",
                  "hasSwitch": true,
                  "defaultExpand": false,
                  "value":[
                    { "name": "show", "displayName": "", "value": true, "type": "switch" },
                    {
                      "name": "align",
                      "displayName": "固定方式",
                      "type": "alignFull",
                      "value": [{
                        "name": "textAlign",
                        "displayName": "水平对齐",
                        "type": "align",
                        "range": ["left", "right"],
                        "value": "left",
                      }],
                    }
                  ]
                },{
                  "name": "sortable",
                  "displayName": "开启排序",
                  "type": "collapse",
                  "hasSwitch": true,
                  "defaultExpand": false,
                  "value":[
                    { "name": "show", "displayName": "", "value": true, "type": "switch" },
                    {
                      "name": "sortType",
                      "displayName": "默认排序方式",
                      "type": "select",
                      "value": "",
                      "options":[{
                        "name":"升序",
                        "value":"ascend"
                      },{
                        "name":"降序",
                        "value":"descend"
                      },{
                        "name":"无",
                        "value":"0"
                      }]
                    },
                    {
                      "name":"",
                      "displayName":"",
                      "type":"checkBoxGroup",
                      "direction":"horizontal,vertical", // 方向
                      "value":["descend"],
                      "options":[{
                          "name":"升序",
                          "value":"ascend"
                        },{
                          "name":"降序",
                          "value":"descend"
                        }]
                    }
                  ]
                },{
                  "name": "isFilter",
                  "displayName": "开启筛选",
                  "type": "switch",
                  "value": true
                },{
                  "displayName": "文本样式",
                  "name": "textStyle",
                  "type": "textFullStyleGroup",
                  "value": [{ "displayName": "", "name": "fontFamily", "value": "Microsoft Yahei" }, {
                    "displayName": "",
                    "name": "fontSize",
                    "value": 14,
                  }, { "displayName": "", "name": "themeColor", "type": "color", "value": "#fff" }, {
                    "displayName": "",
                    "name": "bold",
                    "value": false,
                  }, { "displayName": "", "name": "italic", "value": false }, {
                    "displayName": "字距",
                    "name": "letterSpacing",
                    "value": 0,
                  }, { "displayName": "行距", "name": "lineHeight","config":{"disabled":true}, "value": "unset" }],
                }
              ],
            },
          ],
        },
        "value": [
          {
            "key": "1",
            "displayName": "列1",
            "name": "tab",
            "type": "object",
            "value": [
              {
                "displayName": "映射",
                "name": "mapping",
                "type": "input2",
                "value": [{
                  "displayName": "字段名",
                  "name": "fieldName",
                  "type": "input",
                  "value": "column1",
                }, { "displayName": "显示名", "name": "displayName", "type": "input", "value": "销售地区" }],
              },{
                "name":"width",
                "displayName":"宽度",
                "type":"input",
                "value":"150",
                "config":{
                  "suffix":"px",  // 输入框后缀
                }
              },{
                "name": "align",
                "displayName": "对齐方式",
                "type": "alignFull",
                "value": [{
                  "name": "textAlign",
                  "displayName": "水平对齐",
                  "type": "align",
                  "range": ["left", "center", "right"],
                  "value": "left",
                }],
              },{
                "name": "overflowType",
                "displayName": "文字溢出",
                "type": "select",
                "options": [{ "name": "省略号", "value": "ellipsis" }, { "name": "换行", "value": "wrap" }],
                "value": "ellipsis",
              },{
                "name": "fixedColumn",
                "displayName": "是否固定列",
                "type": "collapse",
                "hasSwitch": true,
                "defaultExpand": false,
                "value":[
                  { "name": "show", "displayName": "", "value": true, "type": "switch" },
                  {
                    "name": "align",
                    "displayName": "固定方式",
                    "type": "alignFull",
                    "value": [{
                      "name": "fixedAlign",
                      "displayName": "水平对齐",
                      "type": "align",
                      "range": ["left", "right"],
                      "value": "left",
                    }],
                  }
                ]
              },{
                "name": "sortable",
                "displayName": "开启排序",
                "type": "collapse",
                "hasSwitch": true,
                "defaultExpand": false,
                "value":[
                  { "name": "show", "displayName": "", "value": false, "type": "switch" },
                  {
                    "name": "defaultSortType",
                    "displayName": "默认排序",
                    "type": "select",
                    "value": "0",
                    "options":[{
                      "name":"升序",
                      "value":"ascend"
                    },{
                      "name":"降序",
                      "value":"descend"
                    },{
                      "name":"无",
                      "value":"0"
                    }]
                  },
                  {
                    "name":"sortType",
                    "displayName":"排序方式",
                    "type":"checkBoxGroup",
                    "direction":"horizontal,vertical", // 方向
                    "value":["descend"],
                    "options":[{
                        "name":"升序",
                        "value":"ascend"
                      },{
                        "name":"降序",
                        "value":"descend"
                      }]
                  }
                ]
              },{
                "name": "filter",
                "displayName": "开启筛选",
                "type": "switch",
                "value": true
              },{
                "displayName": "文本样式",
                "name": "textStyle",
                "type": "textFullStyleGroup",
                "value": [{ "displayName": "", "name": "fontFamily", "value": "Microsoft Yahei" }, {
                  "displayName": "",
                  "name": "fontSize",
                  "value": 14,
                }, { "displayName": "", "name": "themeColor", "type": "color", "value": "#fff" }, {
                  "displayName": "",
                  "name": "bold",
                  "value": false,
                }, { "displayName": "", "name": "italic", "value": false }, {
                  "displayName": "字距",
                  "name": "letterSpacing",
                  "value": 0,
                }, { "displayName": "行距", "name": "lineHeight", "value": "unset" }],
              }
            ],
          }, {
            "key": "2",
            "displayName": "列2",
            "name": "tab",
            "type": "object",
            "value": [
              {
                "displayName": "映射",
                "name": "mapping",
                "type": "input2",
                "value": [{
                  "displayName": "字段名",
                  "name": "fieldName",
                  "type": "input",
                  "value": "column2",
                }, { "displayName": "显示名", "name": "displayName", "type": "input", "value": "完成率" }],
              },{
                "name":"width",
                "displayName":"宽度",
                "type":"input",
                "value":"auto",
                "config":{
                  "suffix":"px",  // 输入框后缀
                }
              },{
                "name": "align",
                "displayName": "对齐方式",
                "type": "alignFull",
                "value": [{
                  "name": "textAlign",
                  "displayName": "水平对齐",
                  "type": "align",
                  "range": ["left", "center", "right"],
                  "value": "left",
                }],
              },{
                "name": "overflowType",
                "displayName": "文字溢出",
                "type": "select",
                "options": [{ "name": "省略号", "value": "ellipsis" }, { "name": "换行", "value": "wrap" }],
                "value": "ellipsis",
              },{
                "name": "fixedColumn",
                "displayName": "是否固定列",
                "type": "collapse",
                "hasSwitch": true,
                "defaultExpand": false,
                "value":[
                  { "name": "show", "displayName": "", "value": false, "type": "switch" },
                  {
                    "name": "align",
                    "displayName": "固定方式",
                    "type": "alignFull",
                    "value": [{
                      "name": "fixedAlign",
                      "displayName": "水平对齐",
                      "type": "align",
                      "range": ["left", "right"],
                      "value": "left",
                    }],
                  }
                ]
              },{
                "name": "sortable",
                "displayName": "开启排序",
                "type": "collapse",
                "hasSwitch": true,
                "defaultExpand": false,
                "value":[
                  { "name": "show", "displayName": "", "value": true, "type": "switch" },
                  {
                    "name": "defaultSortType",
                    "displayName": "默认排序",
                    "type": "select",
                    "value": "0",
                    "options":[{
                      "name":"升序",
                      "value":"ascend"
                    },{
                      "name":"降序",
                      "value":"descend"
                    },{
                      "name":"无",
                      "value":"0"
                    }]
                  },
                  {
                    "name":"sortType",
                    "displayName":"排序方式",
                    "type":"checkBoxGroup",
                    "direction":"horizontal,vertical", // 方向
                    "value":["descend","ascend"],
                    "options":[{
                        "name":"升序",
                        "value":"ascend"
                      },{
                        "name":"降序",
                        "value":"descend"
                      }]
                  }
                ]
              },{
                "name": "filter",
                "displayName": "开启筛选",
                "type": "switch",
                "value": true
              },{
                "displayName": "文本样式",
                "name": "textStyle",
                "type": "textFullStyleGroup",
                "value": [{ "displayName": "", "name": "fontFamily", "value": "Microsoft Yahei" }, {
                  "displayName": "",
                  "name": "fontSize",
                  "value": 14,
                }, { "displayName": "", "name": "themeColor", "type": "color", "value": "#fff" }, {
                  "displayName": "",
                  "name": "bold",
                  "value": false,
                }, { "displayName": "", "name": "italic", "value": false }, {
                  "displayName": "字距",
                  "name": "letterSpacing",
                  "value": 0,
                }, { "displayName": "行距", "name": "lineHeight", "config": { "disabled": true }, "value": "unset" }],
              }
            ],
          }, {
            "key": "3",
            "displayName": "列3",
            "name": "tab",
            "type": "object",
            "value": [
              {
                "displayName": "映射",
                "name": "mapping",
                "type": "input2",
                "value": [{
                  "displayName": "字段名",
                  "name": "fieldName",
                  "type": "input",
                  "value": "column3",
                }, { "displayName": "显示名", "name": "displayName", "type": "input", "value": "完成情况" }],
              },{
                "name":"width",
                "displayName":"宽度",
                "type":"input",
                "value":"150",
                "config":{
                  "suffix":"px",  // 输入框后缀
                }
              },{
                "name": "align",
                "displayName": "对齐方式",
                "type": "alignFull",
                "value": [{
                  "name": "textAlign",
                  "displayName": "水平对齐",
                  "type": "align",
                  "range": ["left", "center", "right"],
                  "value": "left",
                }],
              },{
                "name": "overflowType",
                "displayName": "文字溢出",
                "type": "select",
                "options": [{ "name": "省略号", "value": "ellipsis" }, { "name": "换行", "value": "wrap" }],
                "value": "ellipsis",
              },{
                "name": "fixedColumn",
                "displayName": "是否固定列",
                "type": "collapse",
                "hasSwitch": true,
                "defaultExpand": false,
                "value":[
                  { "name": "show", "displayName": "", "value": true, "type": "switch" },
                  {
                    "name": "align",
                    "displayName": "固定方式",
                    "type": "alignFull",
                    "value": [{
                      "name": "fixedAlign",
                      "displayName": "水平对齐",
                      "type": "align",
                      "range": ["left", "right"],
                      "value": "right",
                    }],
                  }
                ]
              },{
                "name": "sortable",
                "displayName": "开启排序",
                "type": "collapse",
                "hasSwitch": true,
                "defaultExpand": false,
                "value":[
                  { "name": "show", "displayName": "", "value": false, "type": "switch" },
                  {
                    "name": "defaultSortType",
                    "displayName": "默认排序",
                    "type": "select",
                    "value": "0",
                    "options":[{
                      "name":"升序",
                      "value":"ascend"
                    },{
                      "name":"降序",
                      "value":"descend"
                    },{
                      "name":"无",
                      "value":"0"
                    }]
                  },
                  {
                    "name":"sortType",
                    "displayName":"排序方式",
                    "type":"checkBoxGroup",
                    "direction":"horizontal,vertical", // 方向
                    "value":["descend"],
                    "options":[{
                        "name":"升序",
                        "value":"ascend"
                      },{
                        "name":"降序",
                        "value":"descend"
                      }]
                  }
                ]
              },{
                "name": "filter",
                "displayName": "开启筛选",
                "type": "switch",
                "value": true
              },{
                "displayName": "文本样式",
                "name": "textStyle",
                "type": "textFullStyleGroup",
                "value": [{ "displayName": "", "name": "fontFamily", "value": "Microsoft Yahei" }, {
                  "displayName": "",
                  "name": "fontSize",
                  "value": 14,
                }, { "displayName": "", "name": "themeColor", "type": "color", "value": "#fff" }, {
                  "displayName": "",
                  "name": "bold",
                  "value": false,
                }, { "displayName": "", "name": "italic", "value": false }, {
                  "displayName": "字距",
                  "name": "letterSpacing",
                  "value": 0,
                }, { "displayName": "行距", "name": "lineHeight", "config": { "disabled": true }, "value": "14" }],
              }
            ],
          }
        ],
    },
  ],
  "themes": [{ "id": "theme-default", "name": "系统默认" }, {
    "id": "theme-light",
    "name": "浅色风格",
  }, { "id": "theme-gov-blue", "name": "政务蓝" }],
};


export default ComponentDefaultConfig;
