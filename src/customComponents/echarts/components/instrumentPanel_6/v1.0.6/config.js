const componentDefaultConfig = {
  "id": "", //组件ID
  "uniqueTag": "", // ========= 24e1b3a2-60e0-4cef-8a5d-f04fd645f14b
  "name": "定制仪表盘", //图层名称
  "parentId": "0", // 父组件 像是2D地图、3D地图 =================
  "dashboardId": "", //画布id

  "moduleType": "indicator",
  "moduleName": "instrumentPanel_6", //组件标识
  "moduleVersion": "1.0.6", //组件版本号

  "createTime":"2022-11-24 17:00",
  "updateTime":"2022-11-24 17:00",

  "createdAt": "2022-04-02T07:22:31.290Z", // =========
  "updatedAt": "2022-04-02T07:22:39.798Z", // =========

  "autoUpdate": {"isAuto": false, "interval": 10}, // =========
  "thumb": "", // 缩略图 // =========

  "dataFrom": 0,
  "dataConfig": {}, //数据源配置
  "dataType": "static", //数据类型：static;mysql;api;clickhouse
  "dataContainers": [],
  triggers: [ // 下面是合集
    {
      name: "当请求完成或数据变化时",
      value: "dataChange",
    },
    {
      name: "鼠标点击",
      value: "click",
    },
    {
      name: "鼠标移入",
      value: "mouseEnter",
    },
    {
      name: "鼠标移出",
      value: "mouseLeave",
    }
  ],
  staticData: {
    data: [
      {
        title: "已整改单位占比",
        value: 91,
        unit:"%"
      },
    ],
    fields: [
      {
        name: "title",
        value: "title",
      },
      {
        name: "value",
        value: "value",
      },
      {
        name:"unit",
        value:"unit"
      }
    ],
  },
  useFilter: false,
  filters: [],
  events: [],
  "config": [
    {
      displayName: "位置尺寸",
      name: "dimension",
      type: "dimensionGroup",
      config: {
        lock: false,
      },
      value: [
        {
          displayName: "X轴坐标",
          name: "left",
          value: 267,
        },
        {
          displayName: "Y轴坐标",
          name: "top",
          value: 73,
        },
        {
          displayName: "宽度",
          name: "width",
          value: 600,
        },
        {
          displayName: "高度",
          name: "height",
          value: 600,
        },
      ],
    },
    {
      displayName: "默认隐藏",
      name: "hideDefault",
      type: "checkBox",
      value: false,
    },
    {
      name:"allSettings",
      displayName:"全部设置",
      type:"tabs",
      activeKey:"1", // 默认选中第一项
      options:[
        {
          key:"biaopan",
          name:"圆环",
          value:[
            {
              "name": "radius",
              "displayName": "半径",
              "value": 80,
              "type":"range",
              "config": {
                  "min": 0,
                  "max": 100,
                  "step": 1,
                  "suffix":""  // 输入框后缀
              }
            },
            {
              "name": "axisLine",
              "displayName": "仪表盘轴线",
              "type": "collapse",
              "hasSwitch":false, // 是否有切换按钮
              "defaultExpand":false,  // 是否默认展开
              "value":[
                {	// 如果有后面的按钮，则该项必须放在第一个
                  "name": "showTitleStyles",
                  "displayName": "",
                  "value": true,
                  "type": "switch",
                },
                {
                  "name": "axisLineWidth",
                  "displayName": "宽度",
                  "value": 20,
                  "type":"number",
                  "config": {
                      "min": 0,
                      "max": 100,
                      "step": 1,
                      "suffix":""  // 输入框后缀
                  }
                },
                {
                  "displayName": "颜色",
                  "name": "axisLineColor",
                  "type": "color",
                  "value": "#08389d",
                }
              ]
            },
            {
              "name": "progress",
              "displayName": "进度条",
              "type": "collapse",
              "hasSwitch":false, // 是否有切换按钮
              "defaultExpand":false,  // 是否默认展开
              "value":[
                {	// 如果有后面的按钮，则该项必须放在第一个
                  "name": "showProgresstyles",
                  "displayName": "",
                  "value": true,
                  "type": "switch",
                },
                {
                  "name": "progressWidth",
                  "displayName": "宽度",
                  "value": 20,
                  "type":"number",
                  "config": {
                      "min": 0,
                      "max": 100,
                      "step": 1,
                      "suffix":""  // 输入框后缀
                  }
                },
                {
                  "name": "color",
                  "displayName": "颜色",
                  "type": "collapse",
                  "hasSwitch":true, // 是否有切换按钮
                  "defaultExpand":false,  // 是否默认展开
                  "value":[
                    {
                      "name": "show",
                      "displayName": "",
                      "value": true,
                      "type": "switch",
                    },
                    {
                      "displayName": "颜色一",
                      "name": "colorOne",
                      "type": "color",
                      "value": "#6648FF",
                    },
                    {
                      "displayName": "颜色二",
                      "name": "colorTwo",
                      "type": "color",
                      "value": "#18FFE5",
                    },
                  ]
                }
              ]
            }
          ]
        },
        {
          key:"kedu",
          name:"刻度",
          value:[
            {
              "name": "keduDistance",
              "displayName": "与轴线距离",
              "value": 10,
              "type":"number",
              "config": {
                  "min": 0,
                  "max": 100,
                  "step": 1,
                  "suffix":"",  // 输入框后缀
              }
            },
            {
              "displayName": "颜色",
              "name": "keduColor",
              "type": "color",
              "value": "#ffffff",
            },
            {
              "name": "axisTick",
              "displayName": "刻度",
              "type": "collapse",
              "hasSwitch":true, // 是否有切换按钮
              "defaultExpand":false,  // 是否默认展开
              "value":[
                {
                  "name": "show",
                  "displayName": "",
                  "value": true,
                  "type": "switch",
                },
                {
                  "name": "axisTickNum",
                  "displayName": "刻度数",
                  "value": 5,
                  "type":"range",
                  "config": {
                      "min": 0,
                      "max": 10,
                      "step": 1,
                      "suffix":""  // 输入框后缀
                  }
                },
                {
                  "name": "axisTickLength",
                  "displayName": "长度",
                  "value": 6,
                  "type":"number",
                  "config": {
                    "min": 0,
                    "max": 10,
                    "step": 1,
                    "suffix":"",  // 输入框后缀
                  }
                },
                {
                  "name": "axisTickWidth",
                  "displayName": "宽度",
                  "value": 1,
                  "type":"number",
                  "config": {
                    "min": 0,
                    "max": 10,
                    "step": 1,
                    "suffix":""  // 输入框后缀
                  }
                },
              ]
            },
            {
              "name": "splitLine",
              "displayName": "分割线",
              "type": "collapse",
              "hasSwitch":true, // 是否有切换按钮
              "defaultExpand":false,  // 是否默认展开
              "value":[
                {
                  "name": "show",
                  "displayName": "",
                  "value": true,
                  "type": "switch",
                },
                {
                  "name": "splitLineLength",
                  "displayName": "长度",
                  "value": 15,
                  "type":"number",
                  "config": {
                    "min": 0,
                    "max": 100,
                    "step": 1,
                    "suffix":"",  // 输入框后缀
                  }
                },
                {
                  "name": "splitLineWidth",
                  "displayName": "宽度",
                  "value": 2,
                  "type":"number",
                  "config": {
                    "min": 0,
                    "max": 10,
                    "step": 1,
                    "suffix":""  // 输入框后缀
                  }
                },
              ]
            },
            {
              "name": "axisLabel",
              "displayName": "标签",
              "type": "collapse",
              "hasSwitch":true, // 是否有切换按钮
              "defaultExpand":false,  // 是否默认展开
              "value":[
                {
                  "name": "show",
                  "displayName": "",
                  "value": true,
                  "type": "switch",
                },
                {
                  "name": "distance",
                  "displayName": "与轴线距离",
                  "value": 40,
                  "type":"number",
                  "config": {
                      "min": 0,
                      "max": 100,
                      "step": 1,
                      "suffix":"",  // 输入框后缀
                  }
                },
                {
                  "name":"axisLabelText",
                  "displayName":"文本样式",
                  "type":"chartText",
                  "themeColor":"themeAssistColor", // 非必填项，可选值themePureColor themeGradientColorStart等主题配置变量
                  "value":{
                      "fontFamily":"sans-serif",
                      "fontSize":24,
                      "color":"#ffffff",
                      "fontWeight":"normal" // bold bolder lighter
                  }
                }
              ]
            },
            {
              name:"numberRange",
              displayName:"数值范围",
              type:"inputNumber2",
              showDetail:true, // 是否展示下面的文字说明
              value:[
                {
                  name:"min",
                  displayName:"最小值",
                  type:"number",
                  value:0,
                  config:{
                    suffix:"",  // 输入框后缀
                  }
              },
              {
                  name:"max",
                  displayName:"最大值",
                  type:"number",
                  value:100,
                  config:{
                    suffix:"",  // 输入框后缀
                  }
                },
              ]
            },
          ]
        },
        {
          key:"zhizhen",
          name:"指针",
          value:[
            {
              "name": "anchorSize",
              "displayName": "固定点大小",
              "value": 30,
              "type":"number",
              "config": {
                "min": 0,
                "max": 100,
                "step": 1,
                "suffix":""  // 输入框后缀
              }
            },
            {
              "displayName": "固定点颜色",
              "name": "anchorColor",
              "type": "color",
              "value": "#ffffff",
            },
            {
              "name": "anchorBorder",
              "displayName": "固定点描边",
              "type":"border",
              "themeColor":"themeAssistColor", // 非必填项，可选值themePureColor themeGradientColorStart等主题配置变量
              "value":{
                "type":"solid", // dotted 
                "width":5,
                "color":"#18FFE5" // rgba(0,0,0,0)
              }
            }
          ]
        },
        {
          key:"shuzhi",
          name:"数值",
          value:[
            {
              "name": "numberStyles",
              "displayName": "数字",
              "type": "collapse",
              "hasSwitch":false, // 是否有切换按钮
              "defaultExpand":false,  // 是否默认展开
              "value":[
                {	// 如果有后面的按钮，则该项必须放在第一个
                    "name": "showNumberStyles",
                    "displayName": "",
                    "value": true,
                    "type": "switch",
                },
                {
                  "name": "textStylerNumber",
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
                      "value": 48
                    },
                    {
                      "name": "themeTextColor",
                      "displayName": "",
                      "type": "color",
                      "value": "#ffffff"
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
                      "value": 48
                    }
                  ]
                },
                {
                  name:"offset",
                  displayName:"偏移",
                  type:"inputNumber2",
                  showDetail:true, // 是否展示下面的文字说明
                  value:[
                    {
                      name:"horizontal",
                      displayName:"水平",
                      type:"number",
                      value:0,
                      config:{
                        suffix:"px",  // 输入框后缀
                      }
                  },
                  {
                      name:"vertical",
                      displayName:"垂直",
                      type:"number",
                      value:120,
                      config:{
                        suffix:"px",  // 输入框后缀
                      }
                    },
                  ]
                },
              ]
            },
            {
              "name": "unitStyles",
              "displayName": "单位",
              "type": "collapse",
              "hasSwitch":false, // 是否有切换按钮
              "defaultExpand":false,  // 是否默认展开
              "value":[
                {	// 如果有后面的按钮，则该项必须放在第一个
                    "name": "showUnitStyles",
                    "displayName": "",
                    "value": true,
                    "type": "switch",
                },
                {
                  "name": "textStyleUnit",
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
                      "name": "themeTextColor",
                      "displayName": "",
                      "type": "color",
                      "value": "#ffffff"
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
                  name:"padding",
                  displayName:"边距",
                  type:"padding",
                  value:{
                      top:30,
                      right:0,
                      bottom:0,
                      left:0
                  }
              }
              ]
            }
          ]
        },
        {
          key:"biaoti",
          name:"标题",
          value:[
            {
              "name": "textStyleTitle",
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
                  "value": 28
                },
                {
                  "name": "themeTextColor",
                  "displayName": "",
                  "type": "color",
                  "value": "#ffffff"
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
              name:"offset",
              displayName:"偏移",
              type:"inputNumber2",
              showDetail:true, // 是否展示下面的文字说明
              value:[
                {
                  name:"horizontal",
                  displayName:"水平",
                  type:"number",
                  value:0,
                  config:{
                    suffix:"px",  // 输入框后缀
                  }
              },
              {
                  name:"vertical",
                  displayName:"垂直",
                  type:"number",
                  value:0,
                  config:{
                    suffix:"px",  // 输入框后缀
                  }
                },
              ]
            },
          ]
        },
      ]
    }
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
