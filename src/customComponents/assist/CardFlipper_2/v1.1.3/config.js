const componentDefaultConfig = {
  "id": "", //组件ID
  "uniqueTag": "", // ========= 24e1b3a2-60e0-4cef-8a5d-f04fd645f14b
  "name": "定制翻牌器2", //图层名称
  "parentId": "0", // 父组件 像是2D地图、3D地图 =================
  "dashboardId": "", //画布id

  "dashboardId": "indicator", 

  "moduleName": "CardFlipper_2", //组件标识
  "moduleVersion": "1.1.3", //组件版本号

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
        value: 654321,
      },
    ],
    fields: [
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
          "value": 1100
        },
        {
          "name": "height",
          "displayName": "高度",
          "value": 200
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
      ]
    },
    {
      "name": "container",
      "displayName": "翻牌器",
      "type": "collapse",
      hasSwitch:false, // 是否有切换按钮
      defaultExpand:false,  // 是否默认展开
      value:[
        {	// 如果有后面的按钮，则该项必须放在第一个
          "name": "showContainer",
          "displayName": "",
          "value": true,
          "type": "switch",
        },
        {
          name:"containerCounter",
          displayName:"数量",
          type:"number",
          value:6,
          config:{
            min:1,
            suffix:"个",  // 输入框后缀
            }
        },
        {
          name:"containerSize",
          displayName:"大小",
          type:"number",
          value:150,
          config:{
            min:0,
            suffix:"px",  // 输入框后缀
          }
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
