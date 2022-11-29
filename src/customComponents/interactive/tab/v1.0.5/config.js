const componentDefaultConfig = {
  "id": "",
  "uniqueTag": "",
  "name": "选项卡",
  "parentId": "0",
  "dashboardId": "",
  "moduleName": "tab",
  "moduleType": "interactive",
  "moduleVersion": "1.0.1",
  "autoUpdate": {
    "isAuto": false,
    "interval": 10,
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
        "content": "选项一",
      },
      {
        "s": "2",
        "content": "选项二",
      },
      {
        "s": "3",
        "content": "选项三",
      }
    ],
    "fields": [
      {
        "name": "s",
        "value": "s",
      },
      {
        "name": "content",
        "value": "content",
      },
    ],
  },
  "useFilter": false,
  "filters": [],
  "events": [],
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
          "displayName": "默认选中",
          "name": "defaultSelectedKey",
          "type": "number",
          "value": 1,
          "config": {
            "min": 0,
            "max": 50,
            "step": 1
          }
        },
        {
          "displayName": "对齐方式",
          "name": "align",
          "type": "alignFull",
          "value": [
            {
              "displayName": "水平对齐",
              "name": "textAlign",
              "range": [
                "left",
                "center",
                "right"
              ],
              "type": "align",
              "value": "center"
            }
          ]
        },
        {
          "hasSwitch": false,
          "defaultExpand": false,
          "displayName": "网格布局",
          "name": "gridLayout",
          "type": "collapse",
          "value": [
            {
              "displayName": "",
              "name": "show",
              "type": "switch",
              "value": false
            },
            {
              "displayName": "布局",
              "name": "layout",
              "type": "inputNumber2",
              "value": [
                {
                  "displayName": "行数",
                  "name": "rowNums",
                  "type": "number",
                  "value": 1,
                  "config": {
                    "min": 0,
                    "max": 20,
                    "step": 1
                  }
                },
                {
                  "displayName": "列数",
                  "name": "colNums",
                  "type": "number",
                  "value": 3,
                  "config": {
                    "min": 0,
                    "max": 20,
                    "step": 1
                  }
                }
              ],
              "showDetail": true
            },
            {
              "displayName": "间距",
              "name": "spacing",
              "type": "inputNumber2",
              "value": [
                {
                  "displayName": "行距",
                  "name": "rowSpacing",
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
                  "displayName": "列距",
                  "name": "colSpacing",
                  "type": "number",
                  "value": 0,
                  "config": {
                    "min": 0,
                    "max": 1000,
                    "step": 1,
                    "suffix": "px"
                  }
                }
              ],
              "showDetail": true
            }
          ]
        },
        {
          "hasSwitch": true,
          "defaultExpand": false,
          "displayName": "自动轮播",
          "name": "isScroll",
          "type": "collapse",
          "value": [
            {
              "displayName": "",
              "name": "show",
              "type": "switch",
              "value": false
            },
            {
              "displayName": "间隔时长",
              "name": "interval",
              "type": "number",
              "config": {
                "min": 1000,
                "max": 24000,
                "step": 1000,
                "suffix": "ms"
              },
              "value": 1000
            },
            {
              "displayName": "点击停留",
              "name": "clickStay",
              "type": "number",
              "config": {
                "min": 0,
                "max": 24000,
                "step": 1000,
                "suffix": "ms"
              },
              "value": 0
            }
          ]
        }
      ]
    },
    {
      "hasSwitch": false,
      "defaultExpand": false,
      "displayName": "样式",
      "name": "style",
      "type": "collapse",
      "value": [
        {
          "displayName": "",
          "name": "show",
          "type": "switch",
          "value": true
        },
        {
          "displayName": "样式tab栏",
          "name": "styleTabs",
          "options": [
            {
              "name": "未选中",
              "value": [
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
                      "value": "#a39e9e"
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
                },
                {
                  "displayName": "背景",
                  "name": "bgColor",
                  "type": "color",
                  "value": "#191b25"
                },
                {
                  "displayName": "背景图",
                  "name": "bgImg",
                  "type": "image",
                  "value": ""
                },
                {
                  "displayName": "描边",
                  "name": "border",
                  "range": [
                    "topLeft",
                    "topRight",
                    "bottomRight",
                    "bottomLeft"
                  ],
                  "type": "borderRadius",
                  "value": {
                    "color": "#a39e9e",
                    "width": 1,
                    "type": "solid",
                    "radius": [
                      0,
                      0,
                      0,
                      0
                    ]
                  }
                }
              ],
              "key": "1"
            },
            {
              "name": "选中",
              "value": [
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
                      "value": "#2593b0"
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
                },
                {
                  "displayName": "背景",
                  "name": "bgColor",
                  "type": "color",
                  "value": "#1a2943"
                },
                {
                  "displayName": "背景图",
                  "name": "bgImg",
                  "type": "image",
                  "value": ""
                },
                {
                  "displayName": "描边",
                  "name": "border",
                  "range": [
                    "topLeft",
                    "topRight",
                    "bottomRight",
                    "bottomLeft"
                  ],
                  "type": "borderRadius",
                  "value": {
                    "color": "#a39e9e",
                    "width": 1,
                    "type": "solid",
                    "radius": [
                      0,
                      0,
                      0,
                      0
                    ]
                  }
                }
              ],
              "key": "2"
            }
          ],
          "activeKey": "1",
          "type": "tabs"
        }
      ]
    },
    {
      "displayName": "数据系列",
      "name": "dataSeries",
      "type": "tabArray",
      "defaultActiveKey": "1",
      "defaultExpand": false,
      "config": {
        "template": [
          {
            "displayName": "系列1",
            "name": "tab",
            "type": "object",
            "value": [
              {
                "displayName": "s",
                "name": "filed",
                "type": "input",
                "value": ""
              },
              {
                "displayName": "整体偏移",
                "name": "totalOffset",
                "type": "inputNumber2",
                "value": [
                  {
                    "displayName": "X",
                    "name": "offsetX",
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
                    "displayName": "Y",
                    "name": "offsetY",
                    "type": "number",
                    "value": 0,
                    "config": {
                      "min": 0,
                      "max": 1000,
                      "step": 1,
                      "suffix": "px"
                    }
                  }
                ],
                "showDetail": true
              },
              {
                "displayName": "文字偏移",
                "name": "textOffset",
                "type": "inputNumber2",
                "value": [
                  {
                    "displayName": "X",
                    "name": "offsetX",
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
                    "displayName": "Y",
                    "name": "offsetY",
                    "type": "number",
                    "value": 0,
                    "config": {
                      "min": 0,
                      "max": 1000,
                      "step": 1,
                      "suffix": "px"
                    }
                  }
                ],
                "showDetail": true
              },
              {
                "displayName": "宽度权重比",
                "name": "widthProportion",
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
                "displayName": "默认背景色",
                "name": "bgColor",
                "type": "color",
                "value": "#fff"
              },
              {
                "displayName": "默认背景图",
                "name": "bgImg",
                "type": "image",
                "value": ""
              },
              {
                "displayName": "选中背景色",
                "name": "selectedBgColor",
                "type": "color",
                "value": "#fff"
              },
              {
                "displayName": "选中背景图",
                "name": "selectedBgImg",
                "type": "image",
                "value": ""
              }
            ],
            "key": "1"
          }
        ]
      },
      "value": [
        {
          "displayName": "系列1",
          "name": "tab",
          "type": "object",
          "value": [
            {
              "displayName": "s",
              "name": "filed",
              "type": "input",
              "value": ""
            },
            {
              "displayName": "整体偏移",
              "name": "totalOffset",
              "type": "inputNumber2",
              "value": [
                {
                  "displayName": "X",
                  "name": "offsetX",
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
                  "displayName": "Y",
                  "name": "offsetY",
                  "type": "number",
                  "value": 0,
                  "config": {
                    "min": 0,
                    "max": 1000,
                    "step": 1,
                    "suffix": "px"
                  }
                }
              ],
              "showDetail": true
            },
            {
              "displayName": "文字偏移",
              "name": "textOffset",
              "type": "inputNumber2",
              "value": [
                {
                  "displayName": "X",
                  "name": "offsetX",
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
                  "displayName": "Y",
                  "name": "offsetY",
                  "type": "number",
                  "value": 0,
                  "config": {
                    "min": 0,
                    "max": 1000,
                    "step": 1,
                    "suffix": "px"
                  }
                }
              ],
              "showDetail": true
            },
            {
              "displayName": "宽度权重比",
              "name": "widthProportion",
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
              "displayName": "默认背景色",
              "name": "bgColor",
              "type": "color",
              "value": "#fff"
            },
            {
              "displayName": "默认背景图",
              "name": "bgImg",
              "type": "image",
              "value": ""
            },
            {
              "displayName": "选中背景色",
              "name": "selectedBgColor",
              "type": "color",
              "value": "#fff"
            },
            {
              "displayName": "选中背景图",
              "name": "selectedBgImg",
              "type": "image",
              "value": ""
            }
          ],
          "key": "1"
        }
      ]
    }
  ],
  "themes": [
    {
      "id": "theme-default",
      "name": "系统默认",
    },
    {
      "id": "theme-light",
      "name": "浅色风格",
    },
    {
      "id": "theme-gov-blue",
      "name": "政务蓝",
    },
  ],
};

export default componentDefaultConfig;
