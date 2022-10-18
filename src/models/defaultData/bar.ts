import {
  IPanel,
  IComponent,
} from "@/routes/dashboard/center/components/CustomDraggable/type"
import { ILayerPanel, ILayerComponent, ILayerGroup } from "../../routes/dashboard/center/components/CustomDraggable/type"
type IFullAmountLayers = Array<ILayerPanel & { modules: IFullAmountLayers } | ILayerComponent | ILayerGroup | { name: string, id: string, modules: IFullAmountLayers }>
type IFullAmountComponents = Array<IComponent>
type IFullAmountPanels = Array<IPanel>
export interface IPanelState {
  name: string;
  id: string;
}

export interface IFullAmountDashboardDetail {
  name: string;
  id: string;
  components?: Array<IComponent>;
  layers?: Array<ILayerComponent | ILayerGroup | ILayerPanel>;
  dashboardConfig?: Array<{ name: string; displayName: string; value: any;[key: string]: any }>;
  dashboardName?: string;
  states?: Array<{ name: string; id: string }>;
  type: 0 | 1 | 2;
  config?: {
    allowScroll: string;
    height: number;
    hideDefault: boolean;
    left: number;
    top: number;
    width: number;
  }
}
type IFullAmountDashboardDetails = Array<IFullAmountDashboardDetail>
export const defaultData = {
  moduleDefaultConfig: [
    {
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
        "value": [
          { "name": "show", "displayName": "", "value": true, "type": "switch" },
          {
            "name": "isScroll", "displayName": "是否轮播", "value": true, "type": "switch"
          },
          {
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
        "value": [
          { "name": "show", "displayName": "", "value": true, "type": "switch" },
          {
            "name": "evenBgColor",
            "displayName": "奇行背景色",
            "value": "#222430",
            "type": "color",
          },
          {
            "name": "oddBgColor",
            "displayName": "偶行背景色",
            "value": "#2a2d3c",
            "type": "color"
          },
          {
            "name": "selectedBgColor",
            "displayName": "选中背景色",
            "type": "color",
            "value": "#383d53",
          },
          {
            "name": "selectedBgImage",
            "displayName": "选中背景图",
            "type": "image",
            "value": "",
          },
        ],
      }, {
        "name": "tableIndex",
        "displayName": "序号列",
        "type": "collapse",
        "hasSwitch": true,
        "defaultExpand": false,
        "value": [
          { "name": "show", "displayName": "", "value": true, "type": "switch" }, {
            "name": "title",
            "displayName": "标题",
            "value": "#",
            "type": "input",
          },
          {
            "displayName": "宽度",
            "name": "width",
            "type": "number",
            "value": 150,
            "config": {
              "suffix": "px",
              "step": 1,
              "min": 0
            }
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
              "value": "center",
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
              }, "value": "unset"
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
                          "value": "40",
                          "config": {
                            "suffix": "px",
                          }
                        },
                        {
                          "displayName": "高度",
                          "name": "height",
                          "type": "input",
                          "value": "40",
                          "config": {
                            "suffix": "px",
                          }
                        },
                      ]
                    },
                    {
                      "name": "bgColor",
                      "displayName": "背景色",
                      "value": "rgba(6,16,74,0)",
                      "type": "color",
                    },
                    {
                      "name": "bgImg",
                      "displayName": "背景图",
                      "type": "image",
                      "value": "http://10.201.81.47:9000/soc-visualization-public/static/png/1%E5%A4%87%E4%BB%BD-HwFPT.png",
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
                        "value": "40",
                        "config": {
                          "suffix": "px",
                        }
                      },
                      {
                        "displayName": "高度",
                        "name": "height",
                        "type": "input",
                        "value": "40",
                        "config": {
                          "suffix": "px",
                        }
                      },
                    ]
                  },
                  {
                    "name": "bgColor",
                    "displayName": "背景色",
                    "value": "rgba(6,16,74,0)",
                    "type": "color",
                  },
                  {
                    "name": "bgImg",
                    "displayName": "背景图",
                    "type": "image",
                    "value": "http://10.201.81.47:9000/soc-visualization-public/static/png/1%E5%A4%87%E4%BB%BD-HwFPT.png",
                  },
                ],
              },
              {
                "key": "2",
                "displayName": "行2",
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
                        "value": "40",
                        "config": {
                          "suffix": "px",
                        }
                      },
                      {
                        "displayName": "高度",
                        "name": "height",
                        "type": "input",
                        "value": "40",
                        "config": {
                          "suffix": "px",
                        }
                      },
                    ]
                  },
                  {
                    "name": "bgColor",
                    "displayName": "背景色",
                    "value": "rgba(6,16,74,0)",
                    "type": "color",
                  },
                  {
                    "name": "bgImg",
                    "displayName": "背景图",
                    "type": "image",
                    "value": "http://10.201.81.47:9000/soc-visualization-public/static/png/1%E5%A4%87%E4%BB%BD-HwFPT.png",
                  },
                ],
              },
              {
                "key": "3",
                "displayName": "行3",
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
                        "value": "40",
                        "config": {
                          "suffix": "px",
                        }
                      },
                      {
                        "displayName": "高度",
                        "name": "height",
                        "type": "input",
                        "value": "40",
                        "config": {
                          "suffix": "px",
                        }
                      },
                    ]
                  },
                  {
                    "name": "bgColor",
                    "displayName": "背景色",
                    "value": "rgba(6,16,74,0)",
                    "type": "color",
                  },
                  {
                    "name": "bgImg",
                    "displayName": "背景图",
                    "type": "image",
                    "value": "http://10.201.81.47:9000/soc-visualization-public/static/png/1%E5%A4%87%E4%BB%BD-HwFPT.png",
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
              "value": [
                {
                  "displayName": "映射",
                  "name": "mapping",
                  "type": "input2",
                  "value": [{
                    "displayName": "字段名",
                    "name": "filedName",
                    "type": "input",
                    "value": "column1",
                  }, { "displayName": "显示名", "name": "displayName", "type": "input", "value": "销售地区" }],
                },
                {
                  "displayName": "宽度",
                  "name": "width",
                  "type": "number",
                  "value": 150,
                  "config": {
                    "suffix": "px",
                    "step": 1,
                    "min": 0
                  }
                },
                {
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
                },
                {
                  "name": "overflowType",
                  "displayName": "文字溢出",
                  "type": "select",
                  "options": [{ "name": "省略号", "value": "ellipsis" }, { "name": "换行", "value": "wrap" }],
                  "value": "ellipsis",
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
          },
          {
            "displayName": "宽度",
            "name": "width",
            "type": "number",
            "value": 150,
            "config": {
              "suffix": "px",
              "step": 1,
              "min": 0
            }
          },
          {
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
          },
          {
            "displayName": "宽度",
            "name": "width",
            "type": "number",
            "value": 150,
            "config": {
              "suffix": "px",
              "step": 1,
              "min": 0
            }
          },
          {
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
          },
          {
            "displayName": "宽度",
            "name": "width",
            "type": "number",
            "value": 150,
            "config": {
              "suffix": "px",
              "step": 1,
              "min": 0
            }
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
    },
    {
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
    },
    {
      "id": "",
      "uniqueTag": "",
      "name": "滚动选择器",
      "parentId": "0",
      "dashboardId": "",
      "moduleName": "scrollSelect",
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
          },
          {
            "s": "4",
            "content": "选项四",
          },
          {
            "s": "5",
            "content": "选项五",
          },
          {
            "s": "6",
            "content": "选项六",
          },
          {
            "s": "7",
            "content": "选项七",
          },
          {
            "s": "8",
            "content": "选项八",
          },
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
          "name": "dimension",
          "displayName": "位置尺寸",
          "type": "dimensionGroup",
          "config": {
            "lock": false,
          },
          "value": [
            {
              "name": "left",
              "displayName": "X轴坐标",
              "value": 100,
            },
            {
              "name": "top",
              "displayName": "Y轴坐标",
              "value": 200,
            },
            {
              "name": "width",
              "displayName": "宽度",
              "value": 150,
            },
            {
              "name": "height",
              "displayName": "高度",
              "value": 600,
            },
          ],
        },
        {
          "name": "hideDefault",
          "displayName": "默认隐藏",
          "type": "checkBox",
          "value": false,
        },
        {
          "name": "allGlobal",
          "displayName": "全局",
          "type": "collapse",
          "hasSwitch": false,
          "defaultExpand": false,
          "value": [
            {
              "name": "show",
              "displayName": "",
              "value": false,
              "type": "switch",
            },
            {
              "name": "defaultSelectedKey",
              "displayName": "默认选中",
              "type": "number",
              "value": 1,
              "config": {
                "min": 0,
                "max": 50,
                "step": 1,
              },
            },
            {
              "name": "displayNums",
              "displayName": "显示数",
              "type": "number",
              "value": 7,
              "config": {
                "min": 0,
                "max": 50,
                "step": 1,
              },
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
                "suffix": "px",
              },
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
                  "value": "horizontal",
                },
                {
                  "name": "横向排列",
                  "value": "vertical",
                },
              ],
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
          ],
        },
        {
          "name": "style",
          "displayName": "样式",
          "type": "collapse",
          "hasSwitch": false,
          "defaultExpand": false,
          "value": [
            {
              "name": "show",
              "displayName": "",
              "value": true,
              "type": "switch",
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
                          "value": "宋体",
                        },
                        {
                          "name": "微软雅黑",
                          "value": "Microsoft Yahei",
                        },
                        {
                          "name": "黑体",
                          "value": "SimHei",
                        },
                      ],
                    },
                    {
                      "name": "fontSizeRange",
                      "displayName": "字号范围",
                      "type": "inputNumber2",
                      "showDetail": true,
                      "value": [
                        {
                          "name": "min",
                          "displayName": "最小值",
                          "type": "number",
                          "value": 10,
                          "config": {
                            "min": 0,
                            "max": 100,
                            "step": 1,
                            "suffix": "px",
                          },
                        },
                        {
                          "name": "max",
                          "displayName": "最大值",
                          "type": "number",
                          "value": 22,
                          "config": {
                            "min": 20,
                            "max": 1000,
                            "step": 1,
                            "suffix": "px",
                          },
                        },
                      ],
                    },
                    {
                      "name": "colorStep",
                      "displayName": "颜色梯度",
                      "type": "color",
                      "value": "#918e8e",
                    },
                    {
                      "name": "shadow",
                      "displayName": "阴影",
                      "type": "boxShadow",
                      "value": {
                        "color": "rgba(0,183,255,0)",
                        "vShadow": 0,
                        "hShadow": 0,
                        "blur": 0,
                      },
                    },
                  ],
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
                          "value": "Microsoft Yahei",
                        },
                        {
                          "name": "fontSize",
                          "displayName": "",
                          "value": 28,
                        },
                        {
                          "name": "color",
                          "displayName": "",
                          "type": "color",
                          "value": "#fff",
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
                          "value": "48px",
                        },
                      ],
                    },
                    {
                      "name": "shadow",
                      "displayName": "文字阴影",
                      "type": "boxShadow",
                      "value": {
                        "color": "#0075FF",
                        "vShadow": 0,
                        "hShadow": 0,
                        "blur": 8,
                      },
                    }, {
                      "name": "bgColor",
                      "displayName": "背景",
                      "type": "color",
                      "value": "rgba(255,255,255,0)",
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
    },
    {
      "name": "时间选择器",
      "moduleName": "timeSelect",
      "moduleType": "assist",
      "moduleVersion": "1.0.1",
      "config": [
        {
          "displayName": "位置尺寸",
          "name": "dimension",
          "type": "dimensionGroup",
          "config": {
            "lock": false,
          },
          "value": [
            {
              "displayName": "X轴坐标",
              "name": "left",
              "value": 970,
            },
            {
              "displayName": "Y轴坐标",
              "name": "top",
              "value": 147,
            },
            {
              "displayName": "宽度",
              "name": "width",
              "value": 531.2420091324201,
            },
            {
              "displayName": "高度",
              "name": "height",
              "value": 88.26027397260275,
            },
          ],
        },
        {
          "displayName": "默认隐藏",
          "name": "hideDefault",
          "type": "checkBox",
          "value": false,
        },
        {
          "name": "allGlobal",
          "displayName": "全局",
          "type": "collapse",
          "hasSwitch": false,
          "defaultExpand": false,
          "value": [
            {
              "name": "show",
              "displayName": "",
              "value": false,
              "type": "switch",
            },
            {
              "displayName": "选择器类型",
              "name": "selectType",
              "options": [
                {
                  "name": "基础选择器",
                  "value": "date",
                },
                {
                  "name": "范围选择器",
                  "value": "range",
                },
              ],
              "type": "select",
              "value": "range",
            },
            {
              "displayName": "范围类型",
              "name": "pickerType",
              "options": [
                {
                  "name": "日期",
                  "value": "date",
                },
                {
                  "name": "时间",
                  "value": "time",
                },
                {
                  "name": "周",
                  "value": "week",
                },
                {
                  "name": "月",
                  "value": "month",
                },
                {
                  "name": "季度",
                  "value": "quarter",
                },
                {
                  "name": "年",
                  "value": "year",
                },
              ],
              "type": "select",
              "value": "date",
            },
            {
              "displayName": "日期格式",
              "name": "dateFormat",
              "options": [
                {
                  "name": "YYYY-MM-DD HH:mm:ss",
                  "value": "1",
                },
                {
                  "name": "YYYY-MM-DD",
                  "value": "2",
                },
                {
                  "name": "HH:mm:ss",
                  "value": "3",
                },
                {
                  "name": "YYYY/MM/DD HH:mm:ss",
                  "value": "4",
                },
                {
                  "name": "YYYY/MM/DD",
                  "value": "5",
                },
              ],
              "type": "select",
              "value": "2",
            },
          ],
        },
        {
          "name": "selector",
          "displayName": "选择器",
          "type": "collapse",
          "hasSwitch": false,
          "defaultExpand": false,
          "value": [
            {
              "name": "show",
              "displayName": "",
              "value": false,
              "type": "switch",
            },
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
                  "value": 25,
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
                  "value": 0,
                },
              ],
            },
            {
              "displayName": "背景色",
              "name": "selectBgColor",
              "type": "color",
              "value": "#2e4af1",
            },
            {
              "displayName": "边框颜色",
              "name": "selectBorderColor",
              "type": "color",
              "value": "#fff",
            },
          ],
        },
        // {
        //   "name": "calendarBox",
        //   "displayName": "日历框",
        //   "type": "collapse",
        //   "hasSwitch": true,
        //   "defaultExpand": true,
        //   "value": [
        //     {
        //       "name": "show",
        //       "displayName": "",
        //       "value": true,
        //       "type": "switch",
        //     },
        //     {
        //       "displayName": "背景色",
        //       "name": "bgColor",
        //       "type": "color",
        //       "value": "#fef",
        //     },
        //     {
        //       "displayName": "文本样式",
        //       "name": "textStyle",
        //       "type": "textFullStyleGroup",
        //       "value": [
        //         {
        //           "displayName": "",
        //           "name": "fontFamily",
        //           "value": "Microsoft Yahei",
        //         },
        //         {
        //           "displayName": "",
        //           "name": "fontSize",
        //           "value": 14,
        //         },
        //         {
        //           "displayName": "",
        //           "name": "color",
        //           "type": "color",
        //           "value": "#000",
        //         },
        //         {
        //           "displayName": "",
        //           "name": "bold",
        //           "value": false,
        //         },
        //         {
        //           "displayName": "",
        //           "name": "italic",
        //           "value": false,
        //         },
        //         {
        //           "displayName": "字距",
        //           "name": "letterSpacing",
        //           "value": 0,
        //         },
        //         {
        //           "displayName": "行距",
        //           "name": "lineHeight",
        //           "value": 0,
        //         },
        //       ],
        //     },
        //   ],
        // },
      ],
      "dataConfig": {},
      "autoUpdate": {},
      "dataType": "static",
      "staticData": {
        "data": [
          {
            "cookieTime": "2022-06-08",
            "sleepTime": "2023-06-08",
          },
        ],
        "fields": [
          {
            "name": "startTime",
            "value": "cookieTime",
            "desc": "开始时间",
            "status": true,
          },
          {
            "name": "endTime",
            "value": "sleepTime",
            "desc": "结束时间",
            "status": true,
          },
        ],
      },
      "events": [],
      "triggers": [],
      "useFilter": false,
      "filters": [],
      "actions": [],
      "dataContainers": [],
      "dataFrom": 0,
      "callbackArgs": [],
    },
  ],
  dashboardId: "",
  dashboardName: "",
  currentDblTimes: 0,
  isCanClearAllStatus: true,
  key: [],
  isShowRightMenu: false,
  isCopyComponentToDashboard: false,
  rightMenuInfo: { x: 0, y: 0, id: null, isFolder: false },
  lastRightClick: "",
  isMultipleTree: false,
  operate: "",
  layers: [],
  selectedComponentOrGroup: [],
  isSupportMultiple: false,
  selectedComponentIds: [],
  allComponentRefs: {},
  allComponentDOMs: {},
  selectedComponents: [],
  selectedComponentRefs: {},
  selectedComponentDOMs: {},
  dragStatus: "",
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
      display: "none",
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
      name: "recommend",
      displayName: "屏幕大小",
      value: "0",
      options: [
        {
          name: "大屏推荐尺寸1920*1080",
          value: "0",
        },
        {
          name: "web最常见尺寸1366*768",
          value: "1",
        },
        {
          name: "web最小尺寸1024*768",
          value: "2",
        },
        {
          name: "自定义",
          value: "4",
        },
      ],
      width: 1920,
      height: 1080,
    },
    {
      name: "styleColor",
      displayName: "背景",
      value: "#222430", // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
    },
    {
      name: "backgroundImg",
      displayName: "背景图",
      value: "", // 有背景图则返回背景图的url，没有背景图返回空或者null
    },
    {
      name: "gridSpacing",
      displayName: "栅格间距",
      value: 5,
      type: "number",
      config: {
        min: 0,
        step: 1,
        suffix: "", // 输入框后缀
      },
    },
    {
      name: "zoom",
      displayName: "缩放设置",
      value: "0",
      type: "radioGroup",
      direction: "vertical", // 方向
      options: [
        {
          name: "按屏幕比例适配",
          value: "0",
        },
        {
          name: "强制铺满",
          value: "1",
        },
        {
          name: "原比例展示溢出滚动",
          value: "2",
        },
      ],
    },
    {
      name: "thumbImg",
      displayName: "封面",
      value: "",
    },
  ],
  groupConfig: [
    {
      name: "dimension",
      displayName: "位置尺寸",
      config: {
        lock: false,
      },
      value: [
        {
          name: "left",
          displayName: "X轴坐标",
          value: 900,
          type: "number",
          config: {
            suffix: "X",
          },
        },
        {
          name: "top",
          displayName: "Y轴坐标",
          value: 900,
          type: "number",
          config: {
            suffix: "Y",
          },
        },
        {
          name: "width",
          displayName: "宽度",
          value: 100,
          type: "number",
          config: {
            suffix: "W",
          },
        },
        {
          name: "height",
          displayName: "高度",
          value: 100,
          type: "number",
          config: {
            suffix: "H",
          },
        },
      ],
    },
    {
      name: "hideDefault",
      displayName: "默认隐藏",
      value: false,
    },
    {
      name: "opacity",
      displayName: "透明度",
      value: 100,
    },
    {
      name: "interaction",
      displayName: "交互",
      value: {
        // 该部分实际上来自于layers设置
        mountAnimation: {
          // 如果不存在载入动画，该项为null
          delay: 2, // 延迟
          direction: "right", // 方向
          duration: 304, // 持续时间(ms)
          opacityOpen: true, // 渐隐渐现
          timingFunction: "ease", // 速率
          type: "slide", // 动画类型
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
  componentData: {}, // 组件数据，存放方式为{componentId: data}
  currentActiveCompoentData: {},  // 组件当前状态下的数据，用于编辑时画布中的回调参数，存放方式为{componentId: data}
  componentFilters: [],
  callbackArgs: {
    originalName: '新疆',
    name: 'xj',
  },
  callbackParamsList: [],
  systemMaterialClass: {}, // 获取系统素材分类数据
  systemMaterialList: [], // 获取系统素材数据
  isPanel: false,
  panels: [],
  curPanelType: 0,
  panelConfig: {},
  stateId: "123",
  panelStatesList: [],
  allDashboardList: [],
  componentThemeConfig: null,  // 当前的组件主题配置
  fullAmountLayers: [],
  fullAmountDashboardDetails: [],
  isDashboardInit: false,
  fullAmountDynamicAndDrillDownPanels: [],
  copyComponentConfigs: [],
  copyComponentKey: [],
  routeList: [], // 路由集合，只收集当前应用路由和面板路由
  drilldownStateLists: []
}

export interface IBarState {
  moduleDefaultConfig: any[],
  dashboardId: string;
  dashboardName: string;
  key: string[];
  isShowRightMenu: boolean;
  isCopyComponentToDashboard: boolean;
  rightMenuInfo: any;
  operate: string;
  lastRightClick: string;
  layers: any[];
  components: any[];
  isSupportMultiple: boolean;
  selectedComponentOrGroup: any[];
  selectedComponentIds: string[];
  componentLayers: any;
  selectedComponentRefs: any;
  selectedComponentDOMs: any;
  supportLinesRef: any;
  scaleDragCompRef: any;
  selectedComponents: Array<IComponent | IPanel>;
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
    direction: "horizon" | "vertical";
    display: "none" | "block";
  }>;
  currentDblTimes: number;
  isCanClearAllStatus: boolean;
  leftMenuWidth: number;
  canvasDraggablePosition: {
    x: number,
    y: number
  };
  componentData: any;
  currentActiveCompoentData: any;
  dataContainerList: any;
  dataContainerDataList: any;
  componentFilters: any;
  callbackArgs: any;
  callbackParamsList: any;
  systemMaterialClass: any;
  systemMaterialList: any;
  isPanel: boolean;
  curPanelType: 0 | 1 | 2;
  panels: Array<IPanel>;
  panelConfig: IPanel | {};
  panelStatesList: Array<IPanelState>;
  stateId: string;
  allDashboardList: Array<{ name: string, id: string, [key: string]: any }>;
  componentThemeConfig: any;
  fullAmountDashboardDetails: Array<IFullAmountDashboardDetails>
  fullAmountLayers: IFullAmountLayers;
  fullAmountComponents: IFullAmountComponents;
  fullAmountPanels: IFullAmountPanels;
  isDashboardInit: boolean;
  fullAmountDynamicAndDrillDownPanels: any;
  copyComponentConfigs: any
  copyComponentKey: any
  routeList: Array<{
    type: 'state' | 'dashboard',
    id: string,
    url: string
  }>,
  drilldownStateLists: any
}
