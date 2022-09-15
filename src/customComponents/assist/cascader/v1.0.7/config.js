const componentDefaultConfig = {
  "id": "121", //组件ID
  "uniqueTag": "24e1b3a2-60e0-4cef-8a5d-f04fd645f14b", // =========
  "name": "级联选择器", //图层名称
  "parentId": "0", // 父组件 像是2D地图、3D地图 =================
  "dashboardId": "11", //画布id

  "moduleType": "interactive",
  "moduleName": "cascader", //组件标识
  "moduleVersion": "1.0.7", //组件版本号

  "createdAt": "2022-04-02T07:22:31.290Z", // =========
  "updatedAt": "2022-04-02T07:22:39.798Z", // =========

  "autoUpdate": {"isAuto": false, "interval": 10}, // =========
  "thumb": "", // 缩略图 // =========

  "dataConfig": {}, //数据源配置
  "dataType": "static", //数据类型：static;mysql;api;clickhouse
  "dataContainers": [],
  "staticData": {
    //静态数据
    "data": [
      {
        value: "zhejiang",
        label: "Zhejiang",
        children: [
          {
            value: "hangzhou",
            label: "Hangzhou",
            children: [
              {
                value: "xihu",
                label: "West Lake",
              },
            ],
          },
        ],
      },
      {
        value: "jiangsu",
        label: "Jiangsu",
        children: [
          {
            value: "nanjing",
            label: "Nanjing",
            children: [
              {
                value: "zhonghuamen",
                label: "Zhong Hua Men",
              },
            ],
          },
        ],
      }
    ],
    "fields": [
      {
        name: "value",
        value: "value",// 节点
      },
      {
        name: "label",
        value: "label",// 节点
      },
      {
        name: "children",
        value: "children",// 节点
      },
    ]
  },

  "useFilter": false,// =========
  "filters": [],
  "events":[],
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
          "value": 100
        },
        {
          "name": "height",
          "displayName": "高度",
          "value": 40
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
      name:"cascaderStyle",
      displayName:"级联选择器",
      type:"tabs",
      activeKey:"1", // 默认选中第一项
      options:[
        {
          key:"1",
          name:"输入框",
          value:[
            {
              name:"defaultSelect",
              displayName:"默认选中值",
              type:"input",
              value:"第一个",
            },
            {
              "name": "borderStyle",
              "displayName": "边框样式",
              "type": "collapse",
              hasSwitch:false, // 是否有切换按钮
              defaultExpand:false,  // 是否默认展开
              value:[
                {	// 如果有后面的按钮，则该项必须放在第一个
                    "name": "show",
                    "displayName": "",
                    "value": true,
                    "type": "switch",
                },
                {
                  "name": "borderDefault",
                  "displayName": "默认样式",
                  type: "borderRadius",
                  value: {
                    type: "solid", // dotted
                    width: 1,
                    color: "#d9d9d9", // rgba(0,0,0,0)
                    radius: 3,
                  }
                },
                {
                  "name": "borderHover",
                  "displayName": "悬停样式",
                  type: "borderRadius",
                  value: {
                    type: "solid", // dotted
                    width: 1,
                    color: "#40a9ff", // rgba(0,0,0,0)
                    radius: 3,
                  }
                },
                {
                  "name": "borderFocus",
                  "displayName": "选中样式",
                  type: "borderRadius",
                  value: {
                    type: "solid", // dotted
                    width: 1,
                    color: "#40a9ff", // rgba(0,0,0,0)
                    radius: 3,
                  }
                },
              ]
            },
            {
              "name": "contentStyle",
              "displayName": "内容样式",
              "type": "collapse",
              hasSwitch:false, // 是否有切换按钮
              defaultExpand:false,  // 是否默认展开
              value:[
                {	// 如果有后面的按钮，则该项必须放在第一个
                    "name": "show",
                    "displayName": "",
                    "value": true,
                    "type": "switch",
                },
                {
                  "name": "align",
                  "displayName": "对齐方式",
                  "type": "alignFull",
                  "value": [ // 可以只有一种对齐方式
                    {
                      "name": "textAlign",
                      "displayName": "水平对齐",
                      "type": "align",
                      "range": ["left", "center", "right"],
                      "value": "left"
                    },
                  ]
                },
                {
                  "name": "bgColor",
                  "displayName": "背景颜色",
                  "value": "#9b9b9b",
                  type: "color"
                },
                {
                  name: "backgroundImg",
                  displayName: "背景图",
                  type:"image",
                  value: "", // 有背景图则返回背景图的url，没有背景图返回空或者null
                },
                {
                  name: "contentFont",
                  displayName: "文本样式",
                  type: "chartText",
                  value: {
                    fontFamily: "微软雅黑",
                    fontSize: 12,
                    color: "#000",
                    fontWeight: "normal" // bold bolder lighter
                  }
                },
                {
                  name: "tipsText",
                  displayName: "提示文本",
                  type: "input",
                  value: "请选择",
                }
              ]
            },
          ]
        },
        {
          key:"2",
          name:"下拉框",
          value:[
            {
              "name": "select",
              "displayName": "下拉菜单列",
              "type": "collapse",
              hasSwitch: false, // 是否有切换按钮
              defaultExpand: false,  // 是否默认展开
              value: [
                {	// 如果有后面的按钮，则该项必须放在第一个
                  "name": "show",
                  "displayName": "",
                  "value": false,
                  "type": "switch",
                },
                {
                  "name": "selectWidth",
                  "displayName": "宽度",
                  "value": 100,
                  type: "number",
                  "config": {
                    "min": 0,
                    "max": 1000,
                    "step": 1,
                    suffix: "px",  // 输入框后缀
                  }
                },
                {
                  "name": "selectHight",
                  "displayName": "高度",
                  "value": 40,
                  type: "number",
                  "config": {
                    "min": 0,
                    "max": 1000,
                    "step": 1,
                    suffix: "px",  // 输入框后缀
                  }
                }
              ]
            },
            {
              "name": "defaultStyle",
              "displayName": "默认样式",
              "type": "collapse",
              hasSwitch: false, // 是否有切换按钮
              defaultExpand: false,  // 是否默认展开
              value: [
                {	// 如果有后面的按钮，则该项必须放在第一个
                  "name": "show",
                  "displayName": "",
                  "value": false,
                  "type": "switch",
                },
                {
                  "name": "bgColor",
                  "displayName": "背景",
                  "value": "#fff", // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
                  type: "color"
                },
                {
                  name: "font",
                  displayName: "文本",
                  type: "chartText",
                  value: {
                    fontFamily: "微软雅黑",
                    fontSize: 12,
                    color: "#000",
                    fontWeight: "normal" // bold bolder lighter
                  }
                }
              ]
            },
            {
              "name": "hoverStyle",
              "displayName": "悬浮样式",
              "type": "collapse",
              hasSwitch: false, // 是否有切换按钮
              defaultExpand: false,  // 是否默认展开
              value: [
                {	// 如果有后面的按钮，则该项必须放在第一个
                  "name": "show",
                  "displayName": "",
                  "value": false,
                  "type": "switch",
                },
                {
                  "name": "bgColor",
                  "displayName": "背景",
                  "value": "#f5f5f5", // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
                  type: "color"
                },
                {
                  name: "font",
                  displayName: "文本",
                  type: "chartText",
                  value: {
                    fontFamily: "微软雅黑",
                    fontSize: 12,
                    color: "#000",
                    fontWeight: "normal" // bold bolder lighter
                  }
                }
              ]
            },
            {
              "name": "selectedStyle",
              "displayName": "选中样式",
              "type": "collapse",
              hasSwitch: false, // 是否有切换按钮
              defaultExpand: false,  // 是否默认展开
              value: [
                {	// 如果有后面的按钮，则该项必须放在第一个
                  "name": "show",
                  "displayName": "",
                  "value": false,
                  "type": "switch",
                },
                {
                  "name": "bgColor",
                  "displayName": "背景",
                  "value": "#e6f7ff", // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
                  type: "color"
                },
                {
                  name: "font",
                  displayName: "文本",
                  type: "chartText",
                  value: {
                    fontFamily: "微软雅黑",
                    fontSize: 12,
                    color: "#000",
                    fontWeight: "normal" // bold bolder lighter
                  }
                }
              ]
            },
          ]
        },
      ]
    }
  ],
  themes: [{
    id: "theme-default",
    name: "系统默认"
  }, {
    id: "theme-light",
    name: "浅色风格"
  }, {
    id: "theme-gov-blue",
    name: "政务蓝"
  }]
};

export default componentDefaultConfig;