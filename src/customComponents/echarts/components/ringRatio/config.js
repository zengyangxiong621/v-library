const componentDefaultConfig = {
  id: "",
  uniqueTag: "",
  name: "环形占比",
  parentId: "0",
  dashboardId: "",
  moduleName: "ringRatio",
  moduleVersion: "1.0.0",
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
        text: "已整改单位占比",
        value: 40,
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
          "value": 32
        },
        {
          "name": "color",
          "displayName": "",
          "type": "color",
          "value": "#007acc"
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
      "name": "hideDefault",
      "displayName": "默认隐藏",
      "type": "checkBox",
      "value": false
    },
    {
      "name": "textSetting",
      "displayName": "文本设置",
      "type": "collapse",
      hasSwitch: false,
      defaultExpand: false,  // 是否默认展开
      value: [
        {	// 如果有后面的按钮，则该项必须放在第一个
          "name": "show",
          "displayName": "",
          "value": true,
          "type": "switch",
        },
        {
          "name": "percentVertical",
          "displayName": "百分号位置",
          "value": 150,
          type: "number",
          "config": {
            "min": 0,
            "max": 1000,
            "step": 1,
            suffix: "%",  // 输入框后缀
          }
        },
        {
          "name": "textHorizontal",
          "displayName": "水平位置",
          "value": 50,
          type: "number",
          "config": {
            "min": 0,
            "max": 100,
            "step": 1,
            suffix: "%",  // 输入框后缀
          }
        },
        {
          "name": "textVertical",
          "displayName": "垂直位置",
          "value": 60,
          type: "number",
          "config": {
            "min": 0,
            "max": 100,
            "step": 1,
            suffix: "%",  // 输入框后缀
          }
        },
      ]
    },
    {
      name: "ringSetting",
      displayName: "环形设置",
      type: "collapse",
      hasSwitch: false, // 是否有切换按钮
      defaultExpand: true, // 是否默认展开
      value: [
        {
          // 如果有后面的按钮，则该项必须放在第一个
          name: "show",
          displayName: "",
          value: true,
          type: "switch",
        },
        {
          displayName: "环形颜色",
          name: "ringColor",
          type: "color",
          value: "#87ceeb",
        },
        {
          displayName: "环形宽度",
          name: "ringWidth",
          type: "number",
          value: 100,
          config: {
            min: 0,
            max: 200,
            step: 1,
            suffix: "%", // 输入框后缀
          },
        }
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
