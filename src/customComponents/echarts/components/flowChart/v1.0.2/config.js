import flowData from './data.json'
const componentDefaultConfig = {
  "id": '123', //组件ID
  "uniqueTag": "", // =========
  "name": "流程图", //图层名称
  "parentId": "", // 父组件 像是2D地图、3D地图 =================
  "dashboardId": "", //画布id
  "moduleType": 'chart',
  "moduleName": "flowChart", //组件标识
  "moduleVersion": "1.0.1", //组件版本号

  "createdAt": "2022-04-02T07:22:31.290Z", // =========
  "updatedAt": "2022-04-02T07:22:39.798Z", // =========

  "autoUpdate": {
    "isAuto": false,
    "interval": 10
  }, // =========
  "thumb": "", // 缩略图 // =========

  "dataFrom": 0,
  "dataConfig": {}, // 数据源配置
  "dataType": "static", // 数据类型：static;mysql;api;clickhouse
  "dataContainers": [],
  "staticData": {
    // 静态数据
    "data": flowData,
    "fields": [{
        "name": "name",
        "value": "name",
        "desc": "名称",
        "status": true // 状态
      },
      {
        "name": "type",
        "value": "type",
        "desc": "类型",
        "status": true // 状态
      },
      {
        "name": "data",
        "value": "data",
        "desc": "数值",
        "status": true // 状态
      },
      {
        "name": "alert",
        "value": "alert",
        "desc": "节点高亮状态",
        "status": true // 状态
      },
      {
        "name": "line_alert",
        "value": "line_alert",
        "desc": "线条高亮状态",
        "status": true // 状态
      }
    ]
  },

  "useFilter": false, // =========
  "filters": [],

  "events": [],
  "config": [
    // 样式配置
    {
      "name": "dimension",
      "displayName": "位置尺寸",
      "type": "dimensionGroup",
      "config": {
        "lock": false
      },
      "value": [{
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
          "value": 1500
        },
        {
          "name": "height",
          "displayName": "高度",
          "value": 800
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
      'name': 'backgroundColor',
      'displayName': '背景颜色',
      'value': '#ffffff', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
      'type': 'color'
    },
    {
      'name': 'warningConfig',
      'displayName': '警告高亮',
      'type': 'collapse',
      'hasSwitch': false, // 是否有切换按钮
      'defaultExpand': false, // 是否默认展开
      'isHide': false, //该属性设为true表示switch切换带显隐功能，也可不填
      'value': [{ // 如果有后面的按钮，则该项必须放在第一个
          'name': 'show',
          'displayName': '',
          'value': true,
          'type': 'switch',
        },
        {
          'name': 'nodeStartColor',
          'displayName': '节点色-开始',
          'value': '#ff0000', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
          'type': 'color'
        },
        {
          'name': 'nodeEndColor',
          'displayName': '节点色-结束',
          'value': '#ffffff', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
          'type': 'color'
        },
        {
          'name': 'lineColor',
          'displayName': '线条颜色',
          'value': '#FD7979', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
          'type': 'color'
        }
      ]
    },
    {
      'name': 'fontConfig',
      'displayName': '字体样式',
      'type': 'collapse',
      hasSwitch: false, // 是否有切换按钮
      defaultExpand: false, // 是否默认展开
      isHide: false, //该属性设为true表示switch切换带显隐功能，也可不填
      value: [{ // 如果有后面的按钮，则该项必须放在第一个
          'name': 'show',
          'displayName': '',
          'value': true,
          'type': 'switch',
        },
        {
          name: "nodeFont",
          displayName: '节点文字',
          type: 'chartText',
          value: {
            fontFamily: '微软雅黑',
            fontSize: 22,
            color: '#fff',
            fontWeight: 'normal' // bold bolder lighter
          }
        },
        {
          name: "labelFont",
          displayName: '标签文字',
          type: 'chartText',
          value: {
            fontFamily: '微软雅黑',
            fontSize: 12,
            color: '#333',
            fontWeight: 'normal' // bold bolder lighter
          }
        }
      ]
    },
    {
      'name': 'labelConfig',
      'displayName': '标签设置',
      'type': 'collapse',
      hasSwitch: false, // 是否有切换按钮
      defaultExpand: false, // 是否默认展开
      isHide: false, //该属性设为true表示switch切换带显隐功能，也可不填
      value: [{ // 如果有后面的按钮，则该项必须放在第一个
          'name': 'show',
          'displayName': '',
          'value': true,
          'type': 'switch',
        },
        {
          name: "labelSize",
          displayName: '标签大小',
          type: 'inputNumber2',
          showDetail: true, // 是否展示下面的文字说明
          value: [{
              name: 'labelWidth',
              displayName: '宽',
              type: 'number',
              value: 150,
              config: {
                min: 0,
                suffix: 'px', // 输入框后缀
              }
            },
            {
              name: 'labelHeight',
              displayName: '高',
              type: 'number',
              value: 70,
              config: {
                min: 0,
                suffix: 'px', // 输入框后缀
              }
            },
          ]
        }
      ]
    },
    {
      "name": "customColumn",
      "displayName": "颜色设置",
      "type": "tabArray",
      "disabled": true, // 如果改项配置为true，则后面的添加和删除不可用
      "defaultActiveKey": "send",
      "value": [{
          "key": "send",
          "displayName": "发送",
          "name": "tab1",
          "type": "object",
          "value": [{
              'name': 'nodeStartColor',
              'displayName': '节点色-开始',
              'value': '#96C6FE', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
              'type': 'color'
            },
            {
              'name': 'nodeEndColor',
              'displayName': '节点色-结束',
              'value': '#588CDB', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
              'type': 'color'
            },
            {
              'name': 'labelBgColor',
              'displayName': '标签背景色',
              'value': '#ebf3fc', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
              'type': 'color'
            },
            {
              'name': 'lineColor',
              'displayName': '线条颜色',
              'value': '#316bc4', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
              'type': 'color'
            },
            // {
            //   name: "labelOffset",
            //   displayName: '标签偏移',
            //   type: 'inputNumber2',
            //   showDetail: true, // 是否展示下面的文字说明
            //   value: [{
            //       name: 'labelX',
            //       displayName: 'X',
            //       type: 'number',
            //       value: 10,
            //       config: {
            //         min: 0,
            //         suffix: 'px', // 输入框后缀
            //       }
            //     },
            //     {
            //       name: 'labelY',
            //       displayName: 'y',
            //       type: 'number',
            //       value: 10,
            //       config: {
            //         min: 0,
            //         suffix: 'px', // 输入框后缀
            //       }
            //     },
            //   ]
            // }
          ]
        },
        {
          "key": "access",
          "displayName": "接入",
          "name": "tab2",
          "type": "object",
          "value": [{
              'name': 'nodeStartColor',
              'displayName': '节点色-开始',
              'value': '#ADE8FF', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
              'type': 'color'
            },
            {
              'name': 'nodeEndColor',
              'displayName': '节点色-结束',
              'value': '#67D4FF', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
              'type': 'color'
            },
            {
              'name': 'labelBgColor',
              'displayName': '标签背景色',
              'value': '#e4f6fe', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
              'type': 'color'
            },
            {
              'name': 'lineColor',
              'displayName': '线条颜色',
              'value': '#92defa', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
              'type': 'color'
            },
            // {
            //   name: "labelOffset",
            //   displayName: '标签偏移',
            //   type: 'inputNumber2',
            //   showDetail: true, // 是否展示下面的文字说明
            //   value: [{
            //       name: 'labelX',
            //       displayName: 'X',
            //       type: 'number',
            //       value: 0,
            //       config: {
            //         min: 0,
            //         suffix: 'px', // 输入框后缀
            //       }
            //     },
            //     {
            //       name: 'labelY',
            //       displayName: 'y',
            //       type: 'number',
            //       value: 0,
            //       config: {
            //         min: 0,
            //         suffix: 'px', // 输入框后缀
            //       }
            //     },
            //   ]
            // }
          ]
        },
        {
          "key": "forward",
          "displayName": "转发",
          "name": "tab3",
          "type": "object",
          "value": [{
              'name': 'nodeStartColor',
              'displayName': '节点色-开始',
              'value': '#b4efd7', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
              'type': 'color'
            },
            {
              'name': 'nodeEndColor',
              'displayName': '节点色-结束',
              'value': '#61DDAB', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
              'type': 'color'
            },
            {
              'name': 'labelBgColor',
              'displayName': '标签背景色',
              'value': '#dff8ee', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
              'type': 'color'
            },
            {
              'name': 'lineColor',
              'displayName': '线条颜色',
              'value': '#88dcb3', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
              'type': 'color'
            },
            // {
            //   name: "labelOffset",
            //   displayName: '标签偏移',
            //   type: 'inputNumber2',
            //   showDetail: true, // 是否展示下面的文字说明
            //   value: [{
            //       name: 'labelX',
            //       displayName: 'X',
            //       type: 'number',
            //       value: 0,
            //       config: {
            //         min: 0,
            //         suffix: 'px', // 输入框后缀
            //       }
            //     },
            //     {
            //       name: 'labelY',
            //       displayName: 'y',
            //       type: 'number',
            //       value: 0,
            //       config: {
            //         min: 0,
            //         suffix: 'px', // 输入框后缀
            //       }
            //     },
            //   ]
            // }
          ]
        },
        {
          "key": "process",
          "displayName": "加工",
          "name": "tab4",
          "type": "object",
          "value": [{
              'name': 'nodeStartColor',
              'displayName': '节点色-开始',
              'value': '#FFE8AB', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
              'type': 'color'
            },
            {
              'name': 'nodeEndColor',
              'displayName': '节点色-结束',
              'value': '#F8C12F', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
              'type': 'color'
            },
            {
              'name': 'labelBgColor',
              'displayName': '标签背景色',
              'value': '#fef3d6', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
              'type': 'color'
            },
            {
              'name': 'lineColor',
              'displayName': '线条颜色',
              'value': '#f9c541', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
              'type': 'color'
            },
            // {
            //   name: "labelOffset",
            //   displayName: '标签偏移',
            //   type: 'inputNumber2',
            //   showDetail: true, // 是否展示下面的文字说明
            //   value: [{
            //       name: 'labelX',
            //       displayName: 'X',
            //       type: 'number',
            //       value: 0,
            //       config: {
            //         min: 0,
            //         suffix: 'px', // 输入框后缀
            //       }
            //     },
            //     {
            //       name: 'labelY',
            //       displayName: 'y',
            //       type: 'number',
            //       value: 0,
            //       config: {
            //         min: 0,
            //         suffix: 'px', // 输入框后缀
            //       }
            //     },
            //   ]
            // }
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