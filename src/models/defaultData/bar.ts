export const defaultData = {
  moduleDefaultConfig: [
    {
      "id": "121",
      "uniqueTag": "24e1b3a2-60e0-4cef-8a5d-f04fd645f14b",
      "name": "轮播表格",
      "parentId": "0",
      "dashboardId": "11",
      "moduleName": "scrollTable",
      "moduleType": "scrollTable",
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
            "column1": "北京",
            "column2": 87.2,
            "column3": "超预期"
          },
          {
            "column1": "上海",
            "column2": 80.5,
            "column3": "达标"
          },
          {
            "column1": "杭州",
            "column2": 72.3,
            "column3": "达标"
          },
          {
            "column1": "重庆",
            "column2": 65.5,
            "column3": "未达标"
          },
          {
            "column1": "成都",
            "column2": 58.4,
            "column3": "未达标"
          },
          {
            "column1": "厦门",
            "column2": 52.5,
            "column3": "未达标"
          },
          {
            "column1": "云南",
            "column2": 40.2,
            "column3": "未达标"
          }
        ],
        "fields": [
          {
            "name": "column1",
            "value": "column1",
            "desc": "文本"
          },
          {
            "name": "column2",
            "value": "column2",
            "desc": "文本"
          },
          {
            "name": "column3",
            "value": "column3",
            "desc": "文本"
          },
          {
            "name": "column4",
            "value": "column4",
            "desc": "文本"
          },
          {
            "name": "column5",
            "value": "column5",
            "desc": "文本"
          }
        ]
      },
      "useFilter": false,
      "filters": [],
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
              "value": 600
            },
            {
              "name": "height",
              "displayName": "高度",
              "value": 600
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
              "name": "rowNums",
              "displayName": "表格行数",
              "type": "number",
              "config": {
                "min": 0,
                "max": 24,
                "step": 1,
                "suffix": ""
              },
              "value": 5
            },
            {
              "name": "fontFamily",
              "displayName": "字体",
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
              ],
              "value": "Microsoft Yahei"
            }
          ]
        },
        {
          "name": "animation",
          "displayName": "动画",
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
              "name": "animationModel",
              "displayName": "动画模式",
              "type": "select",
              "options": [
                {
                  "name": "逐条滚动",
                  "value": "single"
                },
                {
                  "name": "整页滚动",
                  "value": "page"
                }
              ],
              "value": "single"
            },
            {
              "name": "scrollInterval",
              "displayName": "轮播间隔",
              "type": "number",
              "config": {
                "min": 0,
                "max": 24000,
                "step": 1000,
                "suffix": "ms"
              },
              "value": 5000
            }
          ]
        },
        {
          "name": "tableHeader",
          "displayName": "表头",
          "type": "collapse",
          "hasSwitch": true,
          "defaultExpand": false,
          "value": [
            {
              "name": "show",
              "displayName": "",
              "value": true,
              "type": "switch"
            },
            {
              "name": "lineHeight",
              "displayName": "行高",
              "value": 35,
              "type": "range",
              "config": {
                "min": 0,
                "max": 100,
                "step": 1,
                "suffix": "px"
              }
            },
            {
              "name": "bgColor",
              "displayName": "背景颜色",
              "value": "#222430",
              "type": "color"
            },
            {
              "name": "textAlign",
              "displayName": "文本对齐",
              "type": "select",
              "options": [
                {
                  "name": "左对齐",
                  "value": "left"
                },
                {
                  "name": "居中",
                  "value": "center"
                },
                {
                  "name": "右对齐",
                  "value": "right"
                }
              ],
              "value": "left"
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
                  "value": "35px"
                }
              ]
            }
          ]
        },
        {
          "name": "tableRow",
          "displayName": "行配置",
          "type": "collapse",
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
              "name": "evenBgColor",
              "displayName": "奇行背景色",
              "value": "#222430",
              "type": "color"
            },
            {
              "name": "oddBgColor",
              "displayName": "偶行背景色",
              "value": "#2a2d3c",
              "type": "color"
            }
          ]
        },
        {
          "name": "tableIndex",
          "displayName": "序号列",
          "type": "collapse",
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
              "name": "title",
              "displayName": "标题",
              "value": "#",
              "type": "input"
            },
            {
              "name": "bgColor",
              "displayName": "背景颜色",
              "value": "#222430",
              "type": "color"
            },
            {
              "name": "textAlign",
              "displayName": "文本对齐",
              "type": "select",
              "options": [
                {
                  "name": "左对齐",
                  "value": "left"
                },
                {
                  "name": "居中",
                  "value": "center"
                },
                {
                  "name": "右对齐",
                  "value": "right"
                }
              ],
              "value": "left"
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
                  "value": "48px"
                }
              ]
            }
          ]
        },
        {
          "name": "customColumn",
          "displayName": "自定义列",
          "type": "tabArray",
          "defaultActiveKey": "1",
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
                  "value": [
                    {
                      "displayName": "字段名",
                      "name": "filedName",
                      "type": "input",
                      "value": "column1"
                    },
                    {
                      "displayName": "显示名",
                      "name": "displayName",
                      "type": "input",
                      "value": "销售地区"
                    }
                  ]
                },
/*                {
                  "name": "width",
                  "displayName": "列宽",
                  "type": "number",
                  "config": {
                    "min": 0,
                    "max": 1000,
                    "step": 1,
                    "suffix": "px"
                  },
                  "value": 0
                },
                {
                  "name": "spacing",
                  "displayName": "列间距",
                  "type": "number",
                  "config": {
                    "min": 0,
                    "max": 1000,
                    "step": 1,
                    "suffix": "px"
                  },
                  "value": 0
                },
                {
                  "displayName": "列偏移",
                  "name": "offset",
                  "type": "inputNumber2",
                  "value": [
                    {
                      "displayName": "X",
                      "name": "X",
                      "type": "number",
                      "value": 0
                    },
                    {
                      "displayName": "Y",
                      "name": "Y",
                      "type": "number",
                      "value": 0
                    }
                  ]
                },
                {
                  "name": "textType",
                  "displayName": "内容类型",
                  "type": "select",
                  "options": [
                    {
                      "name": "逐条滚动",
                      "value": "single"
                    },
                    {
                      "name": "整页滚动",
                      "value": "page"
                    }
                  ],
                  "value": "single"
                },
                {
                  "name": "textOverflowType",
                  "displayName": "文字溢出",
                  "type": "select",
                  "options": [
                    {
                      "name": "逐条滚动",
                      "value": "single"
                    },
                    {
                      "name": "整页滚动",
                      "value": "page"
                    }
                  ],
                  "value": "single"
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
                      "value": "35px"
                    }
                  ]
                }*/
              ]
            },
            {
              "key": "2",
              "displayName": "列2",
              "name": "tab",
              "type": "object",
              "value": [
                {
                  "displayName": "映射",
                  "name": "mapping",
                  "type": "input2",
                  "value": [
                    {
                      "displayName": "字段名",
                      "name": "filedName",
                      "type": "input",
                      "value": "column2"
                    },
                    {
                      "displayName": "显示名",
                      "name": "displayName",
                      "type": "input",
                      "value": "完成率"
                    }
                  ]
                },
      /*          {
                  "name": "width",
                  "displayName": "列宽",
                  "type": "number",
                  "config": {
                    "min": 0,
                    "max": 1000,
                    "step": 1,
                    "suffix": "px"
                  },
                  "value": 0
                },
                {
                  "name": "spacing",
                  "displayName": "列间距",
                  "type": "number",
                  "config": {
                    "min": 0,
                    "max": 1000,
                    "step": 1,
                    "suffix": "px"
                  },
                  "value": 0
                },
                {
                  "displayName": "列偏移",
                  "name": "offset",
                  "type": "inputNumber2",
                  "value": [
                    {
                      "displayName": "X",
                      "name": "X",
                      "type": "number",
                      "value": 0
                    },
                    {
                      "displayName": "Y",
                      "name": "Y",
                      "type": "number",
                      "value": 0
                    }
                  ]
                },
                {
                  "name": "textType",
                  "displayName": "内容类型",
                  "type": "select",
                  "options": [
                    {
                      "name": "逐条滚动",
                      "value": "single"
                    },
                    {
                      "name": "整页滚动",
                      "value": "page"
                    }
                  ],
                  "value": "single"
                },
                {
                  "name": "textOverflowType",
                  "displayName": "文字溢出",
                  "type": "select",
                  "options": [
                    {
                      "name": "逐条滚动",
                      "value": "single"
                    },
                    {
                      "name": "整页滚动",
                      "value": "page"
                    }
                  ],
                  "value": "single"
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
                      "value": "35px"
                    }
                  ]
                }*/
              ]
            },
            {
              "key": "3",
              "displayName": "列3",
              "name": "tab",
              "type": "object",
              "value": [
                {
                  "displayName": "映射",
                  "name": "mapping",
                  "type": "input2",
                  "value": [
                    {
                      "displayName": "字段名",
                      "name": "filedName",
                      "type": "input",
                      "value": "column3"
                    },
                    {
                      "displayName": "显示名",
                      "name": "displayName",
                      "type": "input",
                      "value": "完成情况"
                    }
                  ]
                },
/*                {
                  "name": "width",
                  "displayName": "列宽",
                  "type": "number",
                  "config": {
                    "min": 0,
                    "max": 1000,
                    "step": 1,
                    "suffix": "px"
                  },
                  "value": 0
                },
                {
                  "name": "spacing",
                  "displayName": "列间距",
                  "type": "number",
                  "config": {
                    "min": 0,
                    "max": 1000,
                    "step": 1,
                    "suffix": "px"
                  },
                  "value": 0
                },
                {
                  "displayName": "列偏移",
                  "name": "offset",
                  "type": "inputNumber2",
                  "value": [
                    {
                      "displayName": "X",
                      "name": "X",
                      "type": "number",
                      "value": 0
                    },
                    {
                      "displayName": "Y",
                      "name": "Y",
                      "type": "number",
                      "value": 0
                    }
                  ]
                },
                {
                  "name": "textType",
                  "displayName": "内容类型",
                  "type": "select",
                  "options": [
                    {
                      "name": "逐条滚动",
                      "value": "single"
                    },
                    {
                      "name": "整页滚动",
                      "value": "page"
                    }
                  ],
                  "value": "single"
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
                      "value": "35px"
                    }
                  ]
                }*/
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
    },
    {
      "id": "",
      "uniqueTag": "",
      "name": "选项卡（测试）",
      "parentId": "0",
      "dashboardId": "",
      "moduleName": "tab（test）",
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
            },
            {
              "name": "gridLayout",
              "displayName": "网格布局",
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
                  "name":"layout",
                  "displayName": "布局",
                  "type": "inputNumber2",
                  "showDetail": true,
                  "value": [
                    {
                      "name": "rowNums",
                      "displayName": "行数",
                      "type": "number",
                      "value": 1,
                      "config": {
                        "min": 0,
                        "max": 20,
                        "step": 1
                      }
                    },
                    {
                      "name": "colNums",
                      "displayName": "列数",
                      "type": "number",
                      "value": 4,
                      "config": {
                        "min": 0,
                        "max": 20,
                        "step": 1
                      }
                    }
                  ]
                },
                {
                  "name":"spacing",
                  "displayName": "间距",
                  "type": "inputNumber2",
                  "showDetail": true,
                  "value": [
                    {
                      "name": "rowSpacing",
                      "displayName": "行距",
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
                      "name": "colSpacing",
                      "displayName": "列距",
                      "type": "number",
                      "value": 0,
                      "config": {
                        "min": 0,
                        "max": 1000,
                        "step": 1,
                        "suffix": "px"
                      }
                    }
                  ]
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
                          "value": 14
                        },
                        {
                          "name": "color",
                          "displayName": "",
                          "type": "color",
                          "value": "#000"
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
                      "range": ["topLeft", "topRight", "bottomRight", "bottomLeft"],
                      "value": {
                        "type": "solid",
                        "width": 1,
                        "color": "#000",
                        "radius": [0, 0, 0, 0]
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
                      "name": "bgColor",
                      "displayName": "背景",
                      "type": "color",
                      "value": "#ff0000"
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
                      "range": ["topLeft", "topRight", "bottomRight", "bottomLeft"],
                      "value": {
                        "type": "solid",
                        "width": 1,
                        "color": "#000",
                        "radius": [0, 0, 0, 0]
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
  ],
  dashboardId: '',
  dashboardName: '',
  currentDblTimes: 0,
  isCanClearAllStatus: true,
  key: [],
  isShowRightMenu: false,
  rightMenuInfo: { x: 0, y: 0, id: null, isFolder: false },
  lastRightClick: '',
  isMultipleTree: false,
  operate: '',
  treeData: [],
  selectedComponentOrGroup: [],
  isSupportMultiple: false,
  selectedComponentIds: [],
  allComponentRefs: {},
  allComponentDOMs: {},
  selectedComponents: [],
  selectedComponentRefs: {},
  selectedComponentDOMs: {},
  dragStatus: '',
  dataContainerList: [],
  dataContainerDataList: [],
  supportLinePositionInfo: {
    x: 100,
    y: 200,
  },
  supportLinesRef: null,
  scaleDragCompRef: null,
  scaleDragData: {
    position: {
      x: 0,
      y: 0,
    },
    style: {
      display: 'none',
      width: 100,
      height: 100,
    },
  },
  components: [],
  componentLayers: [],
  treeRef: null,
  canvasScaleValue: 0,
  canvasDraggablePosition: {
    x: 0,
    y: 0,
  },
  dashboardConfig: [
    {
      name: 'recommend',
      displayName: '屏幕大小',
      value: '0',
      options: [
        {
          name: '大屏推荐尺寸1920*1080',
          value: '0',
        },
        {
          name: 'web最常见尺寸1366*768',
          value: '1',
        },
        {
          name: 'web最小尺寸1024*768',
          value: '2',
        },
        {
          name: '自定义',
          value: '4',
        },
      ],
      width: 1920,
      height: 1080,
    },
    {
      name: 'styleColor',
      displayName: '背景',
      value: '#222430', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
    },
    {
      name: 'backgroundImg',
      displayName: '背景图',
      value: '', // 有背景图则返回背景图的url，没有背景图返回空或者null
    },
    {
      name: 'gridSpacing',
      displayName: '栅格间距',
      value: 5,
      type: 'number',
      config: {
        min: 0,
        step: 1,
        suffix: '', // 输入框后缀
      },
    },
    {
      name: 'zoom',
      displayName: '缩放设置',
      value: '0',
      type: 'radioGroup',
      direction: 'vertical', // 方向
      options: [
        {
          name: '按屏幕比例适配',
          value: '0',
        },
        {
          name: '强制铺满',
          value: '1',
        },
        {
          name: '原比例展示溢出滚动',
          value: '2',
        },
      ],
    },
    {
      name: 'thumbImg',
      displayName: '封面',
      value: '',
    },
  ],
  groupConfig: [
    {
      name: 'dimension',
      displayName: '位置尺寸',
      config: {
        lock: false,
      },
      value: [
        {
          name: 'left',
          displayName: 'X轴坐标',
          value: 900,
          type: 'number',
          config: {
            suffix: 'X',
          },
        },
        {
          name: 'top',
          displayName: 'Y轴坐标',
          value: 900,
          type: 'number',
          config: {
            suffix: 'Y',
          },
        },
        {
          name: 'width',
          displayName: '宽度',
          value: 100,
          type: 'number',
          config: {
            suffix: 'W',
          },
        },
        {
          name: 'height',
          displayName: '高度',
          value: 100,
          type: 'number',
          config: {
            suffix: 'H',
          },
        },
      ],
    },
    {
      name: 'hideDefault',
      displayName: '默认隐藏',
      value: false,
    },
    {
      name: 'opacity',
      displayName: '透明度',
      value: 100,
    },
    {
      name: 'interaction',
      displayName: '交互',
      value: {
        // 该部分实际上来自于layers设置
        mountAnimation: {
          // 如果不存在载入动画，该项为null
          delay: 2, // 延迟
          direction: 'right', // 方向
          duration: 304, // 持续时间(ms)
          opacityOpen: true, // 渐隐渐现
          timingFunction: 'ease', // 速率
          type: 'slide', // 动画类型
        },
      },
    },
  ],
  componentConfig: {},
  sizeChange: {
    change: false,
    config: {
      left: 100,
      top: 100,
      width: 100,
      height: 100,
    },
  },
  isAreaChoose: false,
  rulerLines: [
    // {
    //   position: {
    //     x: 0,
    //     y: 0,
    //   },
    //   direction: 'horizon',
    //   display: 'block',
    // },
    // {
    //   position: {
    //     x: 0,
    //     y: 0,
    //   },
    //   direction: 'vertical',
    //   display: 'block',
    // },
  ],
  leftMenuWidth: 250,
  componentData: {},
  componentFilters: [],
  callbackArgs: {},
  callbackParamsList: [],
  systemMaterialClass: {}, // 获取系统素材分类数据
  systemMaterialList: [] // 获取系统素材数据
}

export interface IBarState {
  moduleDefaultConfig: any[],
  dashboardId: string;
  dashboardName: string;
  key: string[];
  isShowRightMenu: boolean;
  rightMenuInfo: any;
  operate: string;
  lastRightClick: string;
  treeData: any[];
  components: any[];
  isSupportMultiple: boolean;
  selectedComponentOrGroup: any[];
  selectedComponentIds: string[];
  componentLayers: any;
  selectedComponentRefs: any;
  selectedComponentDOMs: any;
  supportLinesRef: any;
  scaleDragCompRef: any;
  selectedComponents: any;
  scaleDragData: any;
  componentConfig: any;
  groupConfig: any;
  isMultipleTree: boolean;
  allComponentRefs: any;
  allComponentDOMs: any;
  isAreaChoose: boolean;
  rulerLines: Array<{
    position: {
      x: number;
      y: number;
    };
    direction: 'horizon' | 'vertical';
    display: 'none' | 'block';
  }>;
  currentDblTimes: number;
  isCanClearAllStatus: boolean;
  leftMenuWidth: number;
  canvasDraggablePosition: {
    x: number,
    y: number
  };
  componentData: any;
  dataContainerList: any;
  dataContainerDataList: any;
  componentFilters: any;
  callbackArgs: any;
  callbackParamsList: any;
  systemMaterialClass: any;
  systemMaterialList: any;
}
