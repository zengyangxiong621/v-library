const componentDefaultConfig = {
  id: "",
  uniqueTag: "",
  name: "桑基图",
  parentId: "0",
  dashboardId: "",
  moduleType: "chart",
  moduleName: "sankey",
  moduleVersion: "1.2.4",
  autoUpdate: {
    isAuto: false,
    interval: 10,
  },
  thumb: "",
  dataConfig: {},
  dataType: "static",
  dataFrom: 0,
  dataContainers: [],
  staticData: {
    data: [
      {
        "nodes": [
          {
            "name": "北京",
            "value": 100
          },
          {
            "name": "深圳",
            "value": 117
          },
          {
            "name": "上海",
            "value": 141
          },
          {
            "name": "广州",
            "value": 227
          },
          {
            "name": "西安",
            "value": 161
          },
          {
            "name": "苏州",
            "value": 273
          },
          {
            "name": "成都",
            "value": 122
          }
        ],
        "links": [
          {
            "source": "北京",
            "target": "深圳",
            "value": 117
          },
          {
            "source": "北京",
            "target": "上海",
            "value": 141
          },
          {
            "source": "北京",
            "target": "广州",
            "value": 227
          },
          {
            "source": "北京",
            "target": "西安",
            "value": 161
          },
          {
            "source": "北京",
            "target": "苏州",
            "value": 273
          },
          {
            "source": "北京",
            "target": "成都",
            "value": 122
          }
        ]
      }
    ],
    fields: [
      {
        name: "nodes",
        value: "nodes",// 节点
      },
      {
        name: "links",
        value: "links",// 线条
      },
    ],
  },
  useFilter: false,
  filters: [],
  events: [],
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
          "value": 660
        },
        {
          "name": "top",
          "displayName": "Y轴坐标",
          "value": 340
        },
        {
          "name": "width",
          "displayName": "宽度",
          "value": 600
        },
        {
          "name": "height",
          "displayName": "高度",
          "value": 400
        }
      ]
    },
    {
      displayName: "默认隐藏",
      name: "hideDefault",
      type: "checkBox",
      value: false,
    },
    {
      "name": "globalStyle",
      "displayName": "全局样式",
      "type": "collapse",
      hasSwitch: false,
      defaultExpand: false,  // 是否默认展开
      value: [
        {	// 如果有后面的按钮，则该项必须放在第一个
          "name": "globalStyleShow",
          "displayName": "",
          "value": true,
          "type": "switch",
        },
        {
          "name": "nodeWidth",
          "displayName": "节点宽度",
          "value": 20,
          type: "number",
          "config": {
            "step": 1,
            suffix: "",  // 输入框后缀
          }
        },
        {
          "name": "nodeGap",
          "displayName": "节点间隔",
          "value": 8,
          type: "number",
          "config": {
            "step": 1,
            suffix: "",  // 输入框后缀
          }
        },
        {
          "name": "draggable",
          "displayName": "可拖拽",
          "type": "checkBox",
          "value": true,
        },
        {
          "name": "emphasis",
          "displayName": "交互高亮",
          "type": "checkBox",
          "value": true,
        }
      ]
    },
    {
      "name": "margin",
      "displayName": "边距",
      "type": "collapse",
      hasSwitch: false,
      defaultExpand: false,  // 是否默认展开
      value: [
        {	// 如果有后面的按钮，则该项必须放在第一个
          "name": "marginShow",
          "displayName": "",
          "value": true,
          "type": "switch",
        },
        {
          name:"top",
          displayName:"上边距",
          type:"input",
          value:"50",
        },
        {
          name:"left",
          displayName:"左边距",
          type:"input",
          value:"50",
        },
        {
          name:"bottom",
          displayName:"下边距",
          type:"input",
          value:"50",
        },
        {
          name:"right",
          displayName:"右边距",
          type:"input",
          value:"50",
        },
      ]
    },
    {
      "name": "label",
      "displayName": "标签",
      "type": "collapse",
      hasSwitch: false,
      defaultExpand: false,  // 是否默认展开
      value: [
        {	// 如果有后面的按钮，则该项必须放在第一个
          "name": "labelShow",
          "displayName": "",
          "value": true,
          "type": "switch",
        },
        // {
        //   'name': 'numberLabel',
        //   'displayName': '数值标签',
        //   'type': 'checkBox',
        //   'value': false,
        // },
        {
          name:"position",
          displayName:"位置",
          type:"select",
          value:"right",
          options:[
            {
              name:"上侧",
              value:"top"
            },
            {
              name:"左侧",
              value:"left"
            },
            {
              name:"下侧",
              value:"bottom"
            },
            {
              name:"右侧",
              value:"right"
            },
            {
              name:"内侧",
              value:"inside"
            },
          ]
        },
        {
          name:"offset",
          displayName:"偏移",
          type:"inputNumber2",
          showDetail:true, // 是否展示下面的文字说明
          value:[
              {
                name:"x",
                displayName:"x轴",
                type:"number",
                value:0,
                config:{
                  suffix:"",  // 输入框后缀
                }
              },
              {
                name:"y",
                displayName:"y轴",
                type:"number",
                value:0,
                config:{
                  suffix:"",  // 输入框后缀
                }
              },
          ]
        },
        {
          name:"labelTextStyle",
          displayName:"文字样式",
          type:"chartText",
          value:{
            fontFamily: "Microsoft Yahei",
            fontSize: 16,
            color: "#ffffff",
            fontWeight: "normal" // bold bolder lighter
          }
        }
      ]
    },
    {
      "name": "linksLineStyle",
      "displayName": "线样式",
      "type": "collapse",
      hasSwitch: false,
      defaultExpand: false,  // 是否默认展开
      value: [
        {	// 如果有后面的按钮，则该项必须放在第一个
          "name": "linksLineStyleShow",
          "displayName": "",
          "value": true,
          "type": "switch",
        },
        {
          name:"color",
          displayName:"取色方式",
          type:"select",
          value:"source",
          options:[
            {
              name:"source",
              value:"source"
            },
            {
              name:"target",
              value:"target"
            },
          ]
        },
        {
          "name": "customColor",
          "displayName": "自定义取色",
          "type": "collapse",
          hasSwitch: true, // 是否有切换按钮
          defaultExpand: false,  // 是否默认展开
          value:[
            {	// 如果有后面的按钮，则该项必须放在第一个
              "name": "customColorShow",
              "displayName": "",
              "value": false,
              "type": "switch",
            },
            {
              "name": "styleColor",
              "displayName": "颜色",
              "value": "#0075ff", // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
              "type":"color"
            },
          ]
        },
        {
          "name": "opacity",
          "displayName": "透明度",
          "value": 0.1,
          type:"range",
          "config": {
            "min": 0,
            "max": 1,
            "step": 0.01,
              suffix:"",  // 输入框后缀
          }
        },
        {
          "name": "curveness",
          "displayName": "曲度",
          "value": 0.5,
          type:"range",
          "config": {
            "min": 0,
            "max": 1,
            "step": 0.01,
              suffix:"",  // 输入框后缀
          }
        }
      ]
    },
    {
      "name": "tooltip",
      "displayName": "提示框",
      "type": "collapse",
      hasSwitch: false,
      defaultExpand: false,  // 是否默认展开
      value: [
        {	// 如果有后面的按钮，则该项必须放在第一个
          "name": "tooltipShow",
          "displayName": "",
          "value": true,
          "type": "switch",
        },
        {
          "name": "backgroundColor",
          "displayName": "背景色",
          "value": "#333333", // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
          type:"color"
        },
        {
          name:"tooltipTextStyle",
          displayName:"文本样式",
          type:"chartText",
          value:{
            fontFamily: "Microsoft Yahei",
            fontSize: 12,
            color:"#ffffff",
            fontWeight: "normal" // bold bolder lighter
          }
        }
      ]
    },
    {
      name: "dataSeries",
      displayName: "数据系列",
      type: "tabArray",
      defaultActiveKey: "1",
      value: [
        {
          key: "1",
          displayName: "系列1",
          flag: "specialItem",
          name: "series1",
          type: "object",
          value: [
            {
              displayName: "字段名",
              name: "fieldName",
              type: "input",
              value: "北京",
            },
            {
              name: "barColor",
              displayName: "颜色",
              type: "color",
              value: "#336bd7",
            }
          ],
        },
        {
          key: "2",
          displayName: "系列2",
          flag: "specialItem",
          name: "series1",
          type: "object",
          value: [
            {
              displayName: "字段名",
              name: "fieldName",
              type: "input",
              value: "深圳",
            },
            {
              name: "barColor",
              displayName: "颜色",
              type: "color",
              value: "#f21d10",
            }
          ],
        },
        {
          key: "3",
          displayName: "系列3",
          flag: "specialItem",
          name: "series1",
          type: "object",
          value: [
            {
              displayName: "字段名",
              name: "fieldName",
              type: "input",
              value: "上海",
            },
            {
              name: "barColor",
              displayName: "颜色",
              type: "color",
              value: "#fc850b",
            }
          ],
        },
        {
          key: "4",
          displayName: "系列4",
          flag: "specialItem",
          name: "series1",
          type: "object",
          value: [
            {
              displayName: "字段名",
              name: "fieldName",
              type: "input",
              value: "广州",
            },
            {
              name: "barColor",
              displayName: "颜色",
              type: "color",
              value: "#c1e71e",
            }
          ],
        },
        {
          key: "5",
          displayName: "系列5",
          flag: "specialItem",
          name: "series1",
          type: "object",
          value: [
            {
              displayName: "字段名",
              name: "fieldName",
              type: "input",
              value: "西安",
            },
            {
              name: "barColor",
              displayName: "颜色",
              type: "color",
              value: "#1ee731",
            }
          ],
        },
        {
          key: "6",
          displayName: "系列6",
          flag: "specialItem",
          name: "series1",
          type: "object",
          value: [
            {
              displayName: "字段名",
              name: "fieldName",
              type: "input",
              value: "成都",
            },
            {
              name: "barColor",
              displayName: "颜色",
              type: "color",
              value: "#1e8ce7",
            }
          ],
        },
        {
          key: "7",
          displayName: "系列7",
          flag: "specialItem",
          name: "series1",
          type: "object",
          value: [
            {
              displayName: "字段名",
              name: "fieldName",
              type: "input",
              value: "苏州",
            },
            {
              name: "barColor",
              displayName: "颜色",
              type: "color",
              value: "#b01ee7",
            }
          ],
        },
      ],
    },
  ],
  themes: [
    {
      id: "theme-default",
      name: "系统默认",
    },
    {
      id: "theme-light",
      name: "浅色风格",
    },
    {
      id: "theme-gov-blue",
      name: "政务蓝",
    },
  ],
};

export default componentDefaultConfig;
