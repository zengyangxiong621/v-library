const componentDefaultConfig = {
  "id": '', //组件ID
  "uniqueTag": "", // ========= 24e1b3a2-60e0-4cef-8a5d-f04fd645f14b
  "name": "定制指标卡1", //图层名称
  "parentId": "0", // 父组件 像是2D地图、3D地图 =================
  "dashboardId": "", //画布id

  "moduleType": "indicator",

  "moduleName": "instrumentPanel_1", //组件标识
  "moduleVersion": "1.3.2", //组件版本号

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
        text: "风险IP",
        value: 34567,
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
      displayName: '位置尺寸',
      name: 'dimension',
      type: 'dimensionGroup',
      config: {
        lock: false,
      },
      value: [
        {
          displayName: 'X轴坐标',
          name: 'left',
          value: 267,
        },
        {
          displayName: 'Y轴坐标',
          name: 'top',
          value: 73,
        },
        {
          displayName: '宽度',
          name: 'width',
          value: 500,
        },
        {
          displayName: '高度',
          name: 'height',
          value: 500,
        },
      ],
    },
    {
      displayName: '默认隐藏',
      name: 'hideDefault',
      type: 'checkBox',
      value: false,
    },
    {
      name:'allSettings',
      displayName:'全部设置',
      type:'tabs',
      activeKey:'1', // 默认选中第一项
      options:[
        {
          key:'biaopan',
          name:'表盘',
          value:[
            {
              'name': 'outerRadius',
              'displayName': '外圆半径',
              'value': 0.25,
              type:'range',
              "config": {
                  "min": 0,
                  "max": 1,
                  "step": 0.01,
                   suffix:'',  // 输入框后缀
              }
            },
            {
              'name': 'innerRadius',
              'displayName': '内圆半径',
              'value': 0.5,
              type:'range',
              "config": {
                  "min": 0,
                  "max": 1,
                  "step": 0.01,
                   suffix:'',  // 输入框后缀
              }
            },
          ]
        },
        {
          key:'zhibiao',
          name:'指标',
          value:[
            // {
            //   name:"numberRange",
            //   displayName:'数值范围',
            //   type:'inputNumber2',
            //   showDetail:true, // 是否展示下面的文字说明
            //   value:[
            //     {
            //       name:'min',
            //       displayName:'最小值',
            //       type:'number',
            //       value:0,
            //       config:{
            //         suffix:'',  // 输入框后缀
            //       }
            //   },
            //   {
            //       name:'max',
            //       displayName:'最大值',
            //       type:'number',
            //       value:50000,
            //       config:{
            //         suffix:'',  // 输入框后缀
            //       }
            //     },
            //   ]
            // },
            {
              'name': 'numberStyles',
              'displayName': '数值',
              'type': 'collapse',
              hasSwitch:false, // 是否有切换按钮
              defaultExpand:false,  // 是否默认展开
              value:[
                {	// 如果有后面的按钮，则该项必须放在第一个
                    'name': 'showNumberStyles',
                    'displayName': '',
                    'value': true,
                    'type': 'switch',
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
                      "value": 64
                    },
                    {
                      "name": "color",
                      "displayName": "",
                      "type": "color",
                      "value": '#ffffff'
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
                  displayName:'偏移',
                  type:'inputNumber2',
                  showDetail:true, // 是否展示下面的文字说明
                  value:[
                    {
                      name:'horizontal',
                      displayName:'水平',
                      type:'number',
                      value:0,
                      config:{
                        suffix:'px',  // 输入框后缀
                      }
                  },
                  {
                      name:'vertical',
                      displayName:'垂直',
                      type:'number',
                      value:0,
                      config:{
                        suffix:'px',  // 输入框后缀
                      }
                    },
                  ]
                },
              ]
            }
          ]
        },
        {
          key:'biaoti',
          name:'标题',
          value:[
            {
              'name': 'titleStyles',
              'displayName': '数值',
              'type': 'collapse',
              hasSwitch:false, // 是否有切换按钮
              defaultExpand:false,  // 是否默认展开
              value:[
                {	// 如果有后面的按钮，则该项必须放在第一个
                    'name': 'showTitleStyles',
                    'displayName': '',
                    'value': true,
                    'type': 'switch',
                },
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
                      "value": 36
                    },
                    {
                      "name": "color",
                      "displayName": "",
                      "type": "color",
                      "value": '#ffffff'
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
                  displayName:'偏移',
                  type:'inputNumber2',
                  showDetail:true, // 是否展示下面的文字说明
                  value:[
                    {
                      name:'horizontal',
                      displayName:'水平',
                      type:'number',
                      value:0,
                      config:{
                        suffix:'px',  // 输入框后缀
                      }
                  },
                  {
                      name:'vertical',
                      displayName:'垂直',
                      type:'number',
                      value:0,
                      config:{
                        suffix:'px',  // 输入框后缀
                      }
                    },
                  ]
                },
              ]
            }
          ]
        },
        {
          key:'yuanhuanyanse',
          name:'圆环',
          value:[
            {
              'name': 'axisLine',
              'displayName': '仪表盘轴线',
              'type': 'collapse',
              hasSwitch:false, // 是否有切换按钮
              defaultExpand:false,  // 是否默认展开
              value:[
                {	// 如果有后面的按钮，则该项必须放在第一个
                  'name': 'showTitleStyles',
                  'displayName': '',
                  'value': true,
                  'type': 'switch',
                },
                {
                  displayName: "颜色",
                  name: "axisLineColor",
                  type: "color",
                  value: "#150c71",
                }
              ]
            },
            // {
            //   'name': 'progress',
            //   'displayName': '进度条',
            //   'type': 'collapse',
            //   hasSwitch:false, // 是否有切换按钮
            //   defaultExpand:false,  // 是否默认展开
            //   value:[
            //     {	// 如果有后面的按钮，则该项必须放在第一个
            //       'name': 'showTitleStyles',
            //       'displayName': '',
            //       'value': true,
            //       'type': 'switch',
            //     },
            //     {
            //       displayName: "渐变颜色1",
            //       name: "progressColor1",
            //       type: "color",
            //       value: "#73f3f5",
            //     },
            //     {
            //       displayName: "渐变颜色2",
            //       name: "progressColor2",
            //       type: "color",
            //       value: "#6332ec",
            //     }
            //   ]
            // },
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
