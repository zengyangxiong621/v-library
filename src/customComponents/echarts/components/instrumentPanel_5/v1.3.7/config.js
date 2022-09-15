const componentDefaultConfig = {
  "id": "", //组件ID
  "uniqueTag": "", // ========= 24e1b3a2-60e0-4cef-8a5d-f04fd645f14b
  "name": "仪表盘", //图层名称
  "parentId": "0", // 父组件 像是2D地图、3D地图 =================
  "dashboardId": "", //画布id

  "moduleType": "indicator",
  "moduleName": "instrumentPanel_5", //组件标识
  "moduleVersion": "1.3.7", //组件版本号

  "createdAt": "2022-04-02T07:22:31.290Z", // =========
  "updatedAt": "2022-04-02T07:22:39.798Z", // =========

  "autoUpdate": {"isAuto": false, "interval": 10}, // =========
  "thumb": "", // 缩略图 // =========

  "dataFrom": 0,
  "dataConfig": {}, //数据源配置
  "dataType": "static", //数据类型：static;mysql;api;clickhouse
  "dataContainers": [],
  staticData: {
    data: [
      {
        text: "已整改单位占比",
        value: 91,
      },
    ],
    fields: [
      {
        name: "text",
        value: "text",
      },
      {
        name: "value",
        value: "value",
      },
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
              "name": "outerRadius",
              "displayName": "外环半径",
              "value": 0.9,
              type:"range",
              "config": {
                  "min": 0,
                  "max": 2,
                  "step": 0.01,
                   suffix:"",  // 输入框后缀
              }
            },
            {
              "name": "innerRadius",
              "displayName": "内环半径",
              "value": 0.5,
              type:"range",
              "config": {
                  "min": 0,
                  "max": 1,
                  "step": 0.01,
                   suffix:"",  // 输入框后缀
              }
            },
            {
              "name": "axisLine",
              "displayName": "仪表盘轴线",
              "type": "collapse",
              hasSwitch:false, // 是否有切换按钮
              defaultExpand:false,  // 是否默认展开
              value:[
                {	// 如果有后面的按钮，则该项必须放在第一个
                  "name": "showTitleStyles",
                  "displayName": "",
                  "value": true,
                  "type": "switch",
                },
                {
                  displayName: "颜色",
                  name: "axisLineColor",
                  type: "color",
                  value: "#08389d",
                }
              ]
            },
            {
              "name": "progress",
              "displayName": "进度条颜色",
              "type": "collapse",
              hasSwitch:false, // 是否有切换按钮
              defaultExpand:false,  // 是否默认展开
              value:[
                {	// 如果有后面的按钮，则该项必须放在第一个
                  "name": "showProgresstyles",
                  "displayName": "",
                  "value": true,
                  "type": "switch",
                },
                {
                  displayName: "颜色一",
                  name: "colorOne",
                  type: "color",
                  value: "#6648FF",
                },
                {
                  displayName: "颜色二",
                  name: "colorTwo",
                  type: "color",
                  value: "#18FFE5",
                },
              ]
            },
          ]
        },
        {
          key:"zhibiao",
          name:"指标",
          value:[
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
            {
              "name": "numberStyles",
              "displayName": "数值",
              "type": "collapse",
              hasSwitch:false, // 是否有切换按钮
              defaultExpand:false,  // 是否默认展开
              value:[
                {	// 如果有后面的按钮，则该项必须放在第一个
                    "name": "showNumberStyles",
                    "displayName": "",
                    "value": true,
                    "type": "switch",
                },
                {
                  "name": "textStylerNumbe",
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
                      "value": 100
                    },
                    {
                      "name": "color",
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
                      value:-20,
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
              hasSwitch:false, // 是否有切换按钮
              defaultExpand:false,  // 是否默认展开
              value:[
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
                      "value": 50
                    },
                    {
                      "name": "color",
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
            },
            {
              "name": "axisLabelStyles",
              "displayName": "刻度标签",
              "type": "collapse",
              hasSwitch:false, // 是否有切换按钮
              defaultExpand:false,  // 是否默认展开
              value:[
                {	// 如果有后面的按钮，则该项必须放在第一个
                    "name": "showUnitStyles",
                    "displayName": "",
                    "value": true,
                    "type": "switch",
                },
                {
                  name:"textStyleAxisLabel",
                  displayName:"文本样式",
                  type:"chartText",
                  value:{
                      fontFamily:"Microsoft Yahei",
                      fontSize:38,
                      color:"#ffffff",
                      fontWeight:"normal" // bold bolder lighter
                  }
                },
              ]
            },
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
                  "name": "color",
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
