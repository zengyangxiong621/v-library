const componentDefaultConfig = {
  "id": "", //组件ID
  "uniqueTag": "", // ========= 24e1b3a2-60e0-4cef-8a5d-f04fd645f14b
  "name": "定制指标卡4", //图层名称
  "parentId": "0", // 父组件 像是2D地图、3D地图 =================
  "dashboardId": "", //画布id

  "moduleType": "indicator",
  "moduleName": "instrumentPanel_4", //组件标识
  "moduleVersion": "1.2.5", //组件版本号

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
        value: 123456,
        unit: "次",
        title:"受攻击数量",
      },
    ],
    fields: [
      {
        name: "value",
        value: "value",
      },
      {
        name: "unit",
        value: "unit",
      },
      {
        name: "title",
        value: "title",
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
          "value": 254
        },
        {
          "name": "top",
          "displayName": "Y轴坐标",
          "value": 91
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
      displayName: "默认隐藏",
      name: "hideDefault",
      type: "checkBox",
      value: false,
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
          "name": "textNumberStyle",
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
              "value": 80
            },
            {
              "name": "themePureColors",
              "displayName": "",
              "type": "color",
              "value": "#ff7021"
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
              "value": 80
            }
          ]
        },
        {
          name:"offsetNumber",
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
          "name": "textUnitStyle",
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
              "value": 35
            },
            {
              "name": "themePureColors",
              "displayName": "",
              "type": "color",
              "value": "#ffae40"
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
              "value": 35
            }
          ]
        },
        {
          name:"offsetUnit",
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
              value:-10,
              config:{
                suffix:"px",  // 输入框后缀
              }
            },
          ]
        },
      ]
    },
    {
      "name": "titleStyles",
      "displayName": "标题",
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
          "name": "textTitleStyle",
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
              "value": 40
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
              "value": 40
            }
          ]
        },
        {
          name:"offsetTitle",
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
