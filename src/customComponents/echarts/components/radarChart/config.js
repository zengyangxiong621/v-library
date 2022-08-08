const componentDefaultConfig = {
  "id": '', //组件ID
  "uniqueTag": "", // =========
  "name": "雷达图", //图层名称
  "parentId": "", // 父组件 像是2D地图、3D地图 =================
  "dashboardId": "", //画布id

  "moduleName": "radarChart", //组件标识
  "moduleVersion": "1.0.0", //组件版本号

  "createdAt": "2022-04-02T07:22:31.290Z", // =========
  "updatedAt": "2022-04-02T07:22:39.798Z", // =========

  "autoUpdate": {"isAuto": false, "interval": 10}, // =========
  "thumb": "", // 缩略图 // =========

  "dataFrom": 0,
  "dataConfig": {}, // 数据源配置
  "dataType": "static", // 数据类型：static;mysql;api;clickhouse
  "dataContainers": [],
  "staticData": {
    // 静态数据
    "data": [
      {
        list: [
          {name:'安全管理'},
          {name:'网络安全'},
          {name:'终端安全'},
          {name:'应用安全'},
          {name:'数据安全'}
        ],
        seriesData: [
          {name: '系列一',value: [1,2,4,5,7]},
          {name: '系列二',value: [3,2,6,9,5]},
        ]
      }
    ],
    "fields": [
      {
        "name": "list",
        "value": "list",
        "desc": "维度",
        "status": true // 状态
      },
      {
        "name": "seriesData",
        "value": "seriesData",
        "desc": "数值",
        "status": true // 状态
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
          "value": 1000
        },
        {
          "name": "height",
          "displayName": "高度",
          "value": 600
        }
      ]
    },
    // {
    //   "name": "hideDefault",
    //   "displayName": "默认隐藏",
    //   "type": "checkBox",
    //   "value": false
    // },
    {
      "name": "layoutColor",
      "displayName": "布局",
      "type": "collapse",
      "hasSwitch": false,
      "defaultExpand": false,
      "value": [
        {
          "name": "show",
          "displayName": "",
          "value": true,
          "type": "switch"
        },
        {
          'name': 'color',
          'displayName': '颜色',
          'value': '#0D2753', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
          'type':'color'
        },
        {
          'name': 'radius',
          'displayName': '半径',
          'value': 50,
          'type':'number',
          "config": {
            min: 0,
            max: 100,
            step: 1,
            suffix: "%",
          }
        },
      ]
    },
    {
      "name": "outsideValue",
      "displayName": "外围字体",
      "type": "collapse",
      "hasSwitch": false,
      "defaultExpand": false,
      "value": [
        {
          "name": "show",
          "displayName": "",
          "value": true,
          "type": "switch"
        },
        {
          'name': 'color',
          'displayName': '颜色',
          'value': '#fff', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
          'type':'color'
        },
        {
          'name': 'fontSize',
          'displayName': '大小',
          'value': 24,
          'type':'number',
          "config": {
              "min": 12,
              "step": 1,
          }
        },
        {
          name:"fontFamily",
          displayName:'字体',
          type:'select',
          value:'Microsoft Yahei',
          options:[
            {
              name:'微软雅黑',
              value:'Microsoft Yahei'
            },
            {
              name:'宋体',
              value:'宋体'
            },
            {
              name:'黑体',
              value:'SimHei'
            },
          ]
        },
        {
          name:"fontWeight",
          displayName:'字体粗细',
          type:'select',
          value:'normal',
          options:[
            {
              name:'正常',
              value:'normal'
            },
            {
              name:'加粗',
              value:'bold'
            },
          ]
        }
        // {
        //   "name": "textStyle",
        //   "displayName": "文本样式",
        //   "type": "textFullStyleGroup",
        //   "value": [
        //     {
        //       "name": "fontFamily",
        //       "displayName": "",
        //       "value": "Microsoft Yahei"
        //     },
        //     {
        //       "name": "fontSize",
        //       "displayName": "",
        //       "value": 32
        //     },
        //     {
        //       "name": "color",
        //       "displayName": "",
        //       "type": "color",
        //       "value": "#fff" // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
        //     },
        //     {
        //       "name": "bold",
        //       "displayName": "",
        //       "value": false
        //     },
        //     {
        //       "name": "italic",
        //       "displayName": "",
        //       "value": false
        //     },
        //     {
        //       "name": "letterSpacing",
        //       "displayName": "间距",
        //       "value": 100
        //     },
        //     {
        //       "name": "lineHeight",
        //       "displayName": "行距",
        //       "value": '10'
        //     }
        //   ]
        // },
      ]
    },
    {
      "name": "lineAxis",
      "displayName": "极轴",
      "type": "collapse",
      "hasSwitch": false,
      "defaultExpand": false,
      "value": [
        {
          "name": "show",
          "displayName": "",
          "value": true,
          "type": "switch"
        },
        {
          'name': 'axisColor',
          'displayName': '颜色',
          'value': '#1b3483', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
          'type':'color'
        },
        {
          'name': 'thick',
          'displayName': '粗细',
          'value': 1,
          'type':'number',
          "config": {
              "min": 0,
              "step": 1,
          }
        },
        {
          "name": "axisLabel",
          "displayName": "极轴数值",
          "type": "collapse",
          "hasSwitch": true,
          "defaultExpand": false,
          "value": [
            {
              "name": "show",
              "displayName": "",
              "value": true,
              "type": "switch"
            },
            {
              'name': 'axisLabelColor',
              'displayName': '颜色',
              'value': '#fff', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
              'type':'color'
            },
            {
              'name': 'fontSize',
              'displayName': '大小',
              'value': 12,
              'type':'number',
              "config": {
                  "min": 12,
                  "step": 1,
              }
            }
          ]
        }
      ]
    },
    {
      "name": "circleAxis",
      "displayName": "坐标轴",
      "type": "collapse",
      "hasSwitch": false,
      "defaultExpand": false,
      "value": [
        {
          "name": "show",
          "displayName": "",
          "value": true,
          "type": "switch"
        },
        {
          name:"shape",
          displayName:'形状',
          type:'select',
          value:'polygon',
          options:[
              {
                name: "圆",
                value: "circle"
              },
              {
                name: "多边形",
                value: "polygon"
              }
          ]
        },
        {
          'name': 'fillColor',
          'displayName': '边颜色',
          'value': '#1b3483', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
          'type':'color'
        },
        {
          'name': 'fillCircleColor',
          'displayName': '填充颜色',
          'value': '#042075', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
          'type':'color'
        },
        {
          'name': 'thickness',
          'displayName': '边宽',
          'value': 1,
          'type':'number',
          "config": {
              "min": 0,
              "step": 1,
          }
        },
      ]
    },
    {
      "name": "wave",
      "displayName": "最值",
      "type": "collapse",
      "hasSwitch": false,
      "defaultExpand": false,
      "value": [
        {
          "name": "show",
          "displayName": "",
          "value": true,
          "type": "switch"
        },
        {
          'name': 'min',
          'displayName': '最小值',
          'value': 0,
          'type':'number',
          "config": {
              "min": 0,
              "step": 1,
          }
        },
        {
          'name': 'max',
          'displayName': '最大值',
          'value': 10,
          'type':'number',
          "config": {
              "min": 0,
              "step": 1,
          }
        }
      ]
    },
    {
      "name": "dataSeries",
      "displayName": "数据系列",
      "type": "tabArray",
      "disabled": false, // 如果改项配置为true，则后面的添加和删除不可用
      "defaultActiveKey": "1",
      "value": [
        {
          "key": "1",
          "displayName": "系列1",
          "name": "tab",
          "type": "object",
          "value": [
            {
              'name':"name",
              'displayName':'系列名',
              'type':'input',
              'value':'系列一',
            },
            {
              'name': 'areaColor',
              'displayName': '区域颜色',
              'value': '#1890FF', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
              type:'color'
            },
            {
              'name': 'line',
              'displayName': '折线',
              'type': 'collapse',
              hasSwitch:true, // 是否有切换按钮
              defaultExpand:true,  // 是否默认展开
              value:[
                {	// 如果有后面的按钮，则该项必须放在第一个
                  'name': 'show',
                  'displayName': '',
                  'value': true,
                  'type': 'switch',
                },
                {
                  name:"lineType",
                  displayName:'样式',
                  type:'select',
                  value:'solid',
                  options:[
                      {
                        name: "实线",
                        value: "solid"
                      },
                      {
                        name: "虚线",
                        value: "dashed"
                      }
                  ]
                },
                {
                  'name': 'color',
                  'displayName': '颜色',
                  'value': '#1890FF', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
                  type:'color'
                },
                {
                  'name': 'lineWidth',
                  'displayName': '粗细',
                  'value': 2,
                  type:'number',
                  "config": {
                      "min": 0,
                      "step": 1
                  }
                },
                // {
                //   'name': 'curve',
                //   'displayName': '曲线',
                //   'type': 'checkBox',
                //   'value': false,
                // }
              ]
            }
          ]
        },
        {
          "key": "2",
          "displayName": "系列2",
          "name": "tab",
          "type": "object",
          "value": [
            {
              'name':"name",
              'displayName':'系列名',
              'type':'input',
              'value':'系列二',
            },
            {
              'name': 'areaColor',
              'displayName': '区域颜色',
              'value': '#004483', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
              type:'color'
            },
            {
              'name': 'line',
              'displayName': '折线',
              'type': 'collapse',
              hasSwitch:true, // 是否有切换按钮
              defaultExpand:true,  // 是否默认展开
              value:[
                {	// 如果有后面的按钮，则该项必须放在第一个
                  'name': 'show',
                  'displayName': '',
                  'value': true,
                  'type': 'switch',
                },
                {
                  name:"lineType",
                  displayName:'样式',
                  type:'select',
                  value:'solid',
                  options:[
                      {
                        name: "实线",
                        value: "solid"
                      },
                      {
                        name: "虚线",
                        value: "dash"
                      }
                  ]
                },
                {
                  'name': 'color',
                  'displayName': '颜色',
                  'value': '#1890FF', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
                  type:'color'
                },
                {
                  'name': 'lineWidth',
                  'displayName': '粗细',
                  'value': 2,
                  type:'number',
                  "config": {
                      "min": 0,
                      "step": 1
                  }
                },
                // {
                //   'name': 'curve',
                //   'displayName': '曲线',
                //   'type': 'checkBox',
                //   'value': false,
                // }
              ]
            }
          ]
        }
      ]
    }
  ],
  themes: [{
    id: 'theme-default',
    name: '系统默认'
  }, {
    id: 'theme-light',
    name: '浅色风格'
  }, {
    id: 'theme-gov-blue',
    name: '政务蓝'
  }]
}

export default componentDefaultConfig