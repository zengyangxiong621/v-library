const ComponentDefaultConfig = {
  "id": "121",
  "uniqueTag": "24e1b3a2-60e0-4cef-8a5d-f04fd645f14b",
  "name": "轮播表格",
  "parentId": "0",
  "dashboardId": "11",
  "moduleName": "scrollTable",
  "moduleType": "table",
  "moduleVersion": "1.0.1",
  "autoUpdate": { "isAuto": false, "interval": 10 },
  "thumb": "",
  "dataConfig": {},
  "dataType": "static",
  "dataFrom": 0,
  "dataContainers": [],
  "staticData": {
    "data": [{ "column1": "北京", "column2": 87.2, "column3": "超预期" }, {
      "column1": "上海",
      "column2": 80.5,
      "column3": "达标",
    }, { "column1": "杭州", "column2": 72.3, "column3": "达标" }, {
      "column1": "重庆",
      "column2": 65.5,
      "column3": "未达标",
    }, { "column1": "成都", "column2": 58.4, "column3": "未达标" }, {
      "column1": "厦门",
      "column2": 52.5,
      "column3": "未达标",
    }, { "column1": "云南", "column2": 40.2, "column3": "未达标" }],
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
  "config": [{
    "name": "dimension",
    "displayName": "位置尺寸",
    "type": "dimensionGroup",
    "config": { "lock": false },
    "value": [{ "name": "left", "displayName": "X轴坐标", "value": 100 }, {
      "name": "top",
      "displayName": "Y轴坐标",
      "value": 100,
    }, { "name": "width", "displayName": "宽度", "value": 600 }, {
      "name": "height",
      "displayName": "高度",
      "value": 600,
    }],
  }, { "name": "hideDefault", "displayName": "默认隐藏", "type": "checkBox", "value": false }, {
    "name": "allGlobal",
    "displayName": "全局",
    "type": "collapse",
    "hasSwitch": false,
    "defaultExpand": true,
    "value": [{ "name": "show", "displayName": "", "value": false, "type": "switch" }, {
      "name": "rowNums",
      "displayName": "表格行数",
      "type": "number",
      "config": { "min": 0, "max": 24, "step": 1, "suffix": "" },
      "value": 5,
    }, {
      "name": "fontFamily",
      "displayName": "字体",
      "type": "select",
      "options": [{ "name": "宋体", "value": "宋体" }, { "name": "微软雅黑", "value": "Microsoft Yahei" }, {
        "name": "黑体",
        "value": "SimHei",
      }],
      "value": "Microsoft Yahei",
    }],
  }, {
    "name": "animation",
    "displayName": "动画",
    "type": "collapse",
    "hasSwitch": false,
    "defaultExpand": true,
    "value": [{ "name": "show", "displayName": "", "value": true, "type": "switch" }, {
      "name": "animationModel",
      "displayName": "动画模式",
      "type": "select",
      "options": [{ "name": "逐条滚动", "value": "single" }, { "name": "整页滚动", "value": "page" }],
      "value": "single",
    }, {
      "name": "scrollInterval",
      "displayName": "轮播间隔",
      "type": "number",
      "config": { "min": 0, "max": 24000, "step": 1000, "suffix": "ms" },
      "value": 5000,
    }],
  }, {
    "name": "tableHeader",
    "displayName": "表头",
    "type": "collapse",
    "hasSwitch": true,
    "defaultExpand": false,
    "value": [
      { "name": "show", "displayName": "", "value": true, "type": "switch" },
      { "name": "bgColor", "displayName": "背景颜色", "value": "#222430", "type": "color" },
      {
        "name": "gradientOrigin",
        "displayName": "渐变色方向",
        "type": "origin",
        "config": {
          "type": "direction",
        },
        "value": "unset",
      },
      { "name": "gradientStartColor", "displayName": "渐变色-开始", "value": "#222430", "type": "color" },
      { "name": "gradientEndColor", "displayName": "渐变色-结束", "value": "#222430", "type": "color" },
      {
        "name": "textAlign",
        "displayName": "文本对齐",
        "type": "alignFull",
        "value": [{
          "name": "textAlign",
          "displayName": "水平对齐",
          "type": "align",
          "range": ["left", "center", "right"],
          "value": "left",
        }],
      },
      {
        "displayName": "文本样式",
        "name": "textStyle",
        "type": "textFullStyleGroup",
        "value": [{ "displayName": "", "name": "fontFamily", "value": "Microsoft Yahei" }, {
          "displayName": "",
          "name": "fontSize",
          "value": 14,
        }, { "displayName": "", "name": "color", "type": "color", "value": "#fff" }, {
          "displayName": "",
          "name": "bold",
          "value": false,
        }, { "displayName": "", "name": "italic", "value": false }, {
          "displayName": "字距",
          "name": "letterSpacing",
          "value": 0,
        }, { "displayName": "行距", "name": "lineHeight", "config": { "disabled": true }, "value": "unset" }],
      }],
  }, {
    "name": "tableRow",
    "displayName": "行配置",
    "type": "collapse",
    "hasSwitch": true,
    "defaultExpand": false,
    "value": [{ "name": "show", "displayName": "", "value": true, "type": "switch" }, {
      "name": "evenBgColor",
      "displayName": "奇行背景色",
      "value": "#222430",
      "type": "color",
    }, { "name": "oddBgColor", "displayName": "偶行背景色", "value": "#2a2d3c", "type": "color" }],
  }, {
    "name": "tableIndex",
    "displayName": "序号列",
    "type": "collapse",
    "hasSwitch": true,
    "defaultExpand": false,
    "value": [{ "name": "show", "displayName": "", "value": true, "type": "switch" }, {
      "name": "title",
      "displayName": "标题",
      "value": "#",
      "type": "input",
    },
      {
        "name": "textAlign",
        "displayName": "文本对齐",
        "type": "alignFull",
        "value": [{
          "name": "textAlign",
          "displayName": "水平对齐",
          "type": "align",
          "range": ["left", "center", "right"],
          "value": "left",
        }],
      },
      {
        "displayName": "文本样式",
        "name": "textStyle",
        "type": "textFullStyleGroup",
        "value": [{ "displayName": "", "name": "fontFamily", "value": "Microsoft Yahei" }, {
          "displayName": "",
          "name": "fontSize",
          "value": 14,
        }, { "displayName": "", "name": "color", "type": "color", "value": "#fff" }, {
          "displayName": "",
          "name": "bold",
          "value": false,
        }, { "displayName": "", "name": "italic", "value": false }, {
          "displayName": "字距",
          "name": "letterSpacing",
          "value": 0,
        }, {
          "displayName": "行距", "name": "lineHeight",
          "config": {
            "disabled": true,
          }, "value": "unset",
        }],
      },
      {
        "name": "indexColumnCustomStyle",
        "displayName": "样式指定",
        "type": "tabArray",
        "defaultActiveKey": "1",
        "config": {
          "template": [
            {
              "key": "1",
              "displayName": "行1",
              "name": "tab",
              "type": "object",
              "value": [
                {
                  "displayName": "文本样式",
                  "name": "textStyle",
                  "type": "textFullStyleGroup",
                  "value": [
                    {
                      "displayName": "",
                      "name": "fontFamily",
                      "value": "Microsoft Yahei",
                    },
                    {
                      "displayName": "",
                      "name": "fontSize",
                      "value": 14,
                    },
                    {
                      "displayName": "",
                      "name": "color",
                      "type": "color",
                      "value": "#fff",
                    },
                    {
                      "displayName": "",
                      "name": "bold",
                      "value": false,
                    },
                    {
                      "displayName": "",
                      "name": "italic",
                      "value": false,
                    },
                    {
                      "displayName": "字距",
                      "name": "letterSpacing",
                      "value": 0,
                    },
                    {
                      "displayName": "行距",
                      "name": "lineHeight",
                      "config": {
                        "disabled": true,
                      },
                      "value": "unset",
                    },
                  ],
                },
                {
                  "displayName": "背景大小",
                  "name": "bgSize",
                  "type": "input2",
                  "showDetail": true,
                  "value": [
                    {
                      "displayName": "宽度",
                      "name": "width",
                      "type": "input",
                      "value": "20",
                      "config": {
                        "suffix": "px",
                      },
                    },
                    {
                      "displayName": "高度",
                      "name": "height",
                      "type": "input",
                      "value": "20",
                      "config": {
                        "suffix": "px",
                      },
                    },
                  ],
                },
                {
                  "name": "bgColor",
                  "displayName": "背景色",
                  "value": "#06104a",
                  "type": "color",
                },
                {
                  "name": "bgImg",
                  "displayName": "背景图",
                  "type": "image",
                  "value": "",
                },
              ],
            },
          ],
        },
        "value": [
          {
            "key": "1",
            "displayName": "行1",
            "name": "tab",
            "type": "object",
            "value": [
              {
                "displayName": "文本样式",
                "name": "textStyle",
                "type": "textFullStyleGroup",
                "value": [
                  {
                    "displayName": "",
                    "name": "fontFamily",
                    "value": "Microsoft Yahei",
                  },
                  {
                    "displayName": "",
                    "name": "fontSize",
                    "value": 14,
                  },
                  {
                    "displayName": "",
                    "name": "color",
                    "type": "color",
                    "value": "#fff",
                  },
                  {
                    "displayName": "",
                    "name": "bold",
                    "value": false,
                  },
                  {
                    "displayName": "",
                    "name": "italic",
                    "value": false,
                  },
                  {
                    "displayName": "字距",
                    "name": "letterSpacing",
                    "value": 0,
                  },
                  {
                    "displayName": "行距",
                    "name": "lineHeight",
                    "config": {
                      "disabled": true,
                    },
                    "value": "unset",
                  },
                ],
              },
              {
                "displayName": "背景大小",
                "name": "bgSize",
                "type": "input2",
                "showDetail": true,
                "value": [
                  {
                    "displayName": "宽度",
                    "name": "width",
                    "type": "input",
                    "value": "20",
                    "config": {
                      "suffix": "px",
                    },
                  },
                  {
                    "displayName": "高度",
                    "name": "height",
                    "type": "input",
                    "value": "20",
                    "config": {
                      "suffix": "px",
                    },
                  },
                ],
              },
              {
                "name": "bgColor",
                "displayName": "背景色",
                "value": "#06104a",
                "type": "color",
              },
              {
                "name": "bgImg",
                "displayName": "背景图",
                "type": "image",
                "value": "",
              },
            ],
          },
        ],
      },
    ],
  },
    {
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
            "value": [{
              "displayName": "映射",
              "name": "mapping",
              "type": "input2",
              "value": [{
                "displayName": "字段名",
                "name": "filedName",
                "type": "input",
                "value": "column1",
              }, { "displayName": "显示名", "name": "displayName", "type": "input", "value": "销售地区" }],
            }, {
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
            }, {
              "name": "overflowType",
              "displayName": "文字溢出",
              "type": "select",
              "options": [{ "name": "省略号", "value": "ellipsis" }, { "name": "换行", "value": "wrap" }],
              "value": "ellipsis",
            }, {
              "displayName": "文本样式",
              "name": "textStyle",
              "type": "textFullStyleGroup",
              "value": [{ "displayName": "", "name": "fontFamily", "value": "Microsoft Yahei" }, {
                "displayName": "",
                "name": "fontSize",
                "value": 14,
              }, { "displayName": "", "name": "color", "type": "color", "value": "#fff" }, {
                "displayName": "",
                "name": "bold",
                "value": false,
              }, { "displayName": "", "name": "italic", "value": false }, {
                "displayName": "字距",
                "name": "letterSpacing",
                "value": 0,
              }, { "displayName": "行距", "name": "lineHeight", "config": { "disabled": true }, "value": "unset" }],
            },
              {
                "name": "customStyle",
                "displayName": "样式指定",
                "type": "tabArray",
                "defaultActiveKey": "1",
                "config": {
                  "template": [
                    {
                      "key": "1",
                      "displayName": "1",
                      "name": "tab",
                      "type": "object",
                      "value": [{
                        "name": "filedValue",
                        "displayName": "字段值",
                        "type": "input",
                        "value": "",
                      }, {
                        "displayName": "文本样式",
                        "name": "textStyle",
                        "type": "textFullStyleGroup",
                        "value": [{ "displayName": "", "name": "fontFamily", "value": "Microsoft Yahei" }, {
                          "displayName": "",
                          "name": "fontSize",
                          "value": 14,
                        }, { "displayName": "", "name": "color", "type": "color", "value": "#fff" }, {
                          "displayName": "",
                          "name": "bold",
                          "value": false,
                        }, { "displayName": "", "name": "italic", "value": false }, {
                          "displayName": "字距",
                          "name": "letterSpacing",
                          "value": 0,
                        }, { "displayName": "行距", "name": "lineHeight", "value": "unset" }],
                      }],
                    },
                  ],
                },
                "value": [{
                  "key": "1",
                  "displayName": "1",
                  "name": "tab",
                  "type": "object",
                  "value": [{
                    "name": "filedValue",
                    "displayName": "字段值",
                    "type": "input",
                    "value": "",
                  }, {
                    "displayName": "文本样式",
                    "name": "textStyle",
                    "type": "textFullStyleGroup",
                    "value": [{ "displayName": "", "name": "fontFamily", "value": "Microsoft Yahei" }, {
                      "displayName": "",
                      "name": "fontSize",
                      "value": 14,
                    }, { "displayName": "", "name": "color", "type": "color", "value": "#fff" }, {
                      "displayName": "",
                      "name": "bold",
                      "value": false,
                    }, { "displayName": "", "name": "italic", "value": false }, {
                      "displayName": "字距",
                      "name": "letterSpacing",
                      "value": 0,
                    }, { "displayName": "行距", "name": "lineHeight", "config": { "disabled": true }, "value": "unset" }],
                  }],
                }],
              },
            ],
          },
        ],
      },
      "value": [{
        "key": "1",
        "displayName": "列1",
        "name": "tab",
        "type": "object",
        "value": [{
          "displayName": "映射",
          "name": "mapping",
          "type": "input2",
          "value": [{
            "displayName": "字段名",
            "name": "filedName",
            "type": "input",
            "value": "column1",
          }, { "displayName": "显示名", "name": "displayName", "type": "input", "value": "销售地区" }],
        }, {
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
        }, {
          "name": "overflowType",
          "displayName": "文字溢出",
          "type": "select",
          "options": [{ "name": "省略号", "value": "ellipsis" }, { "name": "换行", "value": "wrap" }],
          "value": "ellipsis",
        }, {
          "displayName": "文本样式",
          "name": "textStyle",
          "type": "textFullStyleGroup",
          "value": [{ "displayName": "", "name": "fontFamily", "value": "Microsoft Yahei" }, {
            "displayName": "",
            "name": "fontSize",
            "value": 14,
          }, { "displayName": "", "name": "color", "type": "color", "value": "#fff" }, {
            "displayName": "",
            "name": "bold",
            "value": false,
          }, { "displayName": "", "name": "italic", "value": false }, {
            "displayName": "字距",
            "name": "letterSpacing",
            "value": 0,
          }, { "displayName": "行距", "name": "lineHeight", "value": "unset" }],
        }, {
          "name": "customStyle",
          "displayName": "样式指定",
          "type": "tabArray",
          "defaultActiveKey": "1",
          "config": {
            "template": [
              {
                "key": "1",
                "displayName": "1",
                "name": "tab",
                "type": "object",
                "value": [{
                  "name": "filedValue",
                  "displayName": "字段值",
                  "type": "input",
                  "value": "",
                }, {
                  "displayName": "文本样式",
                  "name": "textStyle",
                  "type": "textFullStyleGroup",
                  "value": [{ "displayName": "", "name": "fontFamily", "value": "Microsoft Yahei" }, {
                    "displayName": "",
                    "name": "fontSize",
                    "value": 14,
                  }, { "displayName": "", "name": "color", "type": "color", "value": "#fff" }, {
                    "displayName": "",
                    "name": "bold",
                    "value": false,
                  }, { "displayName": "", "name": "italic", "value": false }, {
                    "displayName": "字距",
                    "name": "letterSpacing",
                    "value": 0,
                  }, { "displayName": "行距", "name": "lineHeight", "config": { "disabled": true }, "value": "unset" }],
                }],
              },
            ],
          },
          "value": [{
            "key": "1",
            "displayName": "1",
            "name": "tab",
            "type": "object",
            "value": [{
              "name": "filedValue",
              "displayName": "字段值",
              "type": "input",
              "value": "",
            }, {
              "displayName": "文本样式",
              "name": "textStyle",
              "type": "textFullStyleGroup",
              "value": [{ "displayName": "", "name": "fontFamily", "value": "Microsoft Yahei" }, {
                "displayName": "",
                "name": "fontSize",
                "value": 14,
              }, { "displayName": "", "name": "color", "type": "color", "value": "#fff" }, {
                "displayName": "",
                "name": "bold",
                "value": false,
              }, { "displayName": "", "name": "italic", "value": false }, {
                "displayName": "字距",
                "name": "letterSpacing",
                "value": 0,
              }, { "displayName": "行距", "name": "lineHeight", "config": { "disabled": true }, "value": "unset" }],
            }],
          }],
        }],
      }, {
        "key": "2",
        "displayName": "列2",
        "name": "tab",
        "type": "object",
        "value": [{
          "displayName": "映射",
          "name": "mapping",
          "type": "input2",
          "value": [{
            "displayName": "字段名",
            "name": "filedName",
            "type": "input",
            "value": "column2",
          }, { "displayName": "显示名", "name": "displayName", "type": "input", "value": "完成率" }],
        }, {
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
        }, {
          "name": "overflowType",
          "displayName": "文字溢出",
          "type": "select",
          "options": [{ "name": "省略号", "value": "ellipsis" }, { "name": "换行", "value": "wrap" }],
          "value": "ellipsis",
        }, {
          "displayName": "文本样式",
          "name": "textStyle",
          "type": "textFullStyleGroup",
          "value": [{ "displayName": "", "name": "fontFamily", "value": "Microsoft Yahei" }, {
            "displayName": "",
            "name": "fontSize",
            "value": 14,
          }, { "displayName": "", "name": "color", "type": "color", "value": "#fff" }, {
            "displayName": "",
            "name": "bold",
            "value": false,
          }, { "displayName": "", "name": "italic", "value": false }, {
            "displayName": "字距",
            "name": "letterSpacing",
            "value": 0,
          }, { "displayName": "行距", "name": "lineHeight", "config": { "disabled": true }, "value": "unset" }],
        }, {
          "name": "customStyle",
          "displayName": "样式指定",
          "type": "tabArray",
          "defaultActiveKey": "1",
          "config": {
            "template": [
              {
                "key": "1",
                "displayName": "1",
                "name": "tab",
                "type": "object",
                "value": [{
                  "name": "filedValue",
                  "displayName": "字段值",
                  "type": "input",
                  "value": "",
                }, {
                  "displayName": "文本样式",
                  "name": "textStyle",
                  "type": "textFullStyleGroup",
                  "value": [{ "displayName": "", "name": "fontFamily", "value": "Microsoft Yahei" }, {
                    "displayName": "",
                    "name": "fontSize",
                    "value": 14,
                  }, { "displayName": "", "name": "color", "type": "color", "value": "#fff" }, {
                    "displayName": "",
                    "name": "bold",
                    "value": false,
                  }, { "displayName": "", "name": "italic", "value": false }, {
                    "displayName": "字距",
                    "name": "letterSpacing",
                    "value": 0,
                  }, { "displayName": "行距", "name": "lineHeight", "config": { "disabled": true }, "value": "unset" }],
                }],
              },
            ],
          },
          "value": [{
            "key": "1",
            "displayName": "1",
            "name": "tab",
            "type": "object",
            "value": [{
              "name": "filedValue",
              "displayName": "字段值",
              "type": "input",
              "value": "",
            }, {
              "displayName": "文本样式",
              "name": "textStyle",
              "type": "textFullStyleGroup",
              "value": [{ "displayName": "", "name": "fontFamily", "value": "Microsoft Yahei" }, {
                "displayName": "",
                "name": "fontSize",
                "value": 14,
              }, { "displayName": "", "name": "color", "type": "color", "value": "#fff" }, {
                "displayName": "",
                "name": "bold",
                "value": false,
              }, { "displayName": "", "name": "italic", "value": false }, {
                "displayName": "字距",
                "name": "letterSpacing",
                "value": 0,
              }, { "displayName": "行距", "name": "lineHeight", "config": { "disabled": true }, "value": "unset" }],
            }],
          }],
        }],
      }, {
        "key": "3",
        "displayName": "列3",
        "name": "tab",
        "type": "object",
        "value": [{
          "displayName": "映射",
          "name": "mapping",
          "type": "input2",
          "value": [{
            "displayName": "字段名",
            "name": "filedName",
            "type": "input",
            "value": "column3",
          }, { "displayName": "显示名", "name": "displayName", "type": "input", "value": "完成情况" }],
        }, {
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
        }, {
          "name": "overflowType",
          "displayName": "文字溢出",
          "type": "select",
          "options": [{ "name": "省略号", "value": "ellipsis" }, { "name": "换行", "value": "wrap" }],
          "value": "ellipsis",
        }, {
          "displayName": "文本样式",
          "name": "textStyle",
          "type": "textFullStyleGroup",
          "value": [{ "displayName": "", "name": "fontFamily", "value": "Microsoft Yahei" }, {
            "displayName": "",
            "name": "fontSize",
            "value": 14,
          }, { "displayName": "", "name": "color", "type": "color", "value": "#fff" }, {
            "displayName": "",
            "name": "bold",
            "value": false,
          }, { "displayName": "", "name": "italic", "value": false }, {
            "displayName": "字距",
            "name": "letterSpacing",
            "value": 0,
          }, { "displayName": "行距", "name": "lineHeight", "config": { "disabled": true }, "value": "unset" }],
        }, {
          "name": "customStyle",
          "displayName": "样式指定",
          "type": "tabArray",
          "defaultActiveKey": "1",
          "config": {
            "template": [
              {
                "key": "1",
                "displayName": "1",
                "name": "tab",
                "type": "object",
                "value": [{
                  "name": "filedValue",
                  "displayName": "字段值",
                  "type": "input",
                  "value": "",
                }, {
                  "displayName": "文本样式",
                  "name": "textStyle",
                  "type": "textFullStyleGroup",
                  "value": [{ "displayName": "", "name": "fontFamily", "value": "Microsoft Yahei" }, {
                    "displayName": "",
                    "name": "fontSize",
                    "value": 14,
                  }, { "displayName": "", "name": "color", "type": "color", "value": "#fff" }, {
                    "displayName": "",
                    "name": "bold",
                    "value": false,
                  }, { "displayName": "", "name": "italic", "value": false }, {
                    "displayName": "字距",
                    "name": "letterSpacing",
                    "value": 0,
                  }, { "displayName": "行距", "name": "lineHeight", "config": { "disabled": true }, "value": "unset" }],
                }],
              },
            ],
          },
          "value": [{
            "key": "1",
            "displayName": "1",
            "name": "tab",
            "type": "object",
            "value": [{
              "name": "filedValue",
              "displayName": "字段值",
              "type": "input",
              "value": "",
            }, {
              "displayName": "文本样式",
              "name": "textStyle",
              "type": "textFullStyleGroup",
              "value": [{ "displayName": "", "name": "fontFamily", "value": "Microsoft Yahei" }, {
                "displayName": "",
                "name": "fontSize",
                "value": 14,
              }, { "displayName": "", "name": "color", "type": "color", "value": "#fff" }, {
                "displayName": "",
                "name": "bold",
                "value": false,
              }, { "displayName": "", "name": "italic", "value": false }, {
                "displayName": "字距",
                "name": "letterSpacing",
                "value": 0,
              }, { "displayName": "行距", "name": "lineHeight", "config": { "disabled": true }, "value": "unset" }],
            }],
          }],
        }],
      }],
    },
  ],
  "themes": [{ "id": "theme-default", "name": "系统默认" }, {
    "id": "theme-light",
    "name": "浅色风格",
  }, { "id": "theme-gov-blue", "name": "政务蓝" }],
};


export default ComponentDefaultConfig;
