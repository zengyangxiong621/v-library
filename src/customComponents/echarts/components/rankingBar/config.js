const ComponentDefaultConfig = {
  "id": '', //组件ID
  "uniqueTag": "24e1b3a2-60e0-4cef-8a5d-f04fd645f14b", // =========
  "name": "排行条形图", //图层名称
  "parentId": "", // 父组件 像是2D地图、3D地图 =================
  "dashboardId": "", //画布id

  "moduleName": "rankingBar", //组件标识
  "moduleVersion": "1.0.0", //组件版本号

  "createdAt": "2022-04-02T07:22:31.290Z", // =========
  "updatedAt": "2022-04-02T07:22:39.798Z", // =========

  "autoUpdate": { "isAuto": false, "interval": 10 }, // =========
  "thumb": "", // 缩略图 // =========
  "dataFrom": 0,
  "dataConfig": {}, //数据源配置
  "dataType": "static", //数据类型：static;mysql;api;clickhouse
  "dataContainers": [],
  "staticData": {
    data: [
      {
        classify: '河北',
        numerical: 13830,
      },
      {
        classify: '北京',
        numerical: 18200,
      },
      {
        classify: '江苏',
        numerical: 17000,
      },
      {
        classify: '广东',
        numerical: 15900,
      },
      {
        classify: '浙江',
        numerical: 17100,
      },
    ],
    fields: [
      {
        name: 'classify',
        value: 'classify',
        desc: '分类',
      },
      {
        name: 'numerical',
        value: 'numerical',
        desc: '数值',
      }
    ],
  },
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
          value: 800,
        },
        {
          displayName: '高度',
          name: 'height',
          value: 600,
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
      name: 'allSettings',
      displayName: '全部设置',
      type: 'tabs',
      activeKey: '1',
      options: [
        {
          key: 'tubiao',
          name: '图表',
          value: [
            {
              "name": "batteryStyle",
              "displayName": "电池风格",
              "type": "switch",
              "value": true
            },
            {
              name: 'spacing',
              displayName: '边距',
              type: 'padding',
              value: {
                top: 50,
                right: 50,
                bottom: 50,
                left: 50,
              },
            },
            {
              'name': 'autoSort',
              'displayName': '自动排序',
              'type': 'checkBox',
              'value': false,
            },
            {
              name: "sortOrder",
              displayName: '排序方式',
              type: 'select',
              value: 'DESC',
              options: [
                {
                  name: '降序',
                  value: 'DESC'
                },
                {
                  name: '升序',
                  value: 'ASC'
                },
              ]
            },
            {
              'name': 'maxBars',
              'displayName': '最大条数',
              'value': 5,
              type: 'number',
              "config": {
                "min": 1,
                "step": 1,
                suffix: '条',  // 输入框后缀
              }
            }
          ],
        },
        {
          key: 'wenben',
          name: '文本',
          value: [
            {
              name: 'classify',
              displayName: '类目',
              type: 'collapse',
              hasSwitch: false,
              defaultExpand: false,
              value: [
                {
                  name: 'show',
                  displayName: '',
                  value: true,
                  type: 'switch',
                },
                {
                  name: 'font',
                  displayName: '文本样式',
                  type: 'textFullStyleGroup',
                  value: [
                    {
                      name: 'fontFamily',
                      displayName: '',
                      value: 'Microsoft Yahei',
                    },
                    {
                      name: 'fontSize',
                      displayName: '',
                      value: 12,
                    },
                    {
                      name: 'color',
                      displayName: '',
                      type: 'color',
                      value: '#fff',
                    },
                    {
                      name: 'bold',
                      displayName: '',
                      value: false,
                    },
                    {
                      name: 'italic',
                      displayName: '',
                      value: false,
                    },
                    {
                      name: 'letterSpacing',
                      displayName: '字距',
                      value: 0,
                    },
                    {
                      name: 'lineHeight',
                      displayName: '行距',
                      value: 20,
                    },
                  ],
                },
                {
                  name: 'offset',
                  displayName: '偏移',
                  type: 'inputNumber2',
                  showDetail: true,
                  value: [
                    {
                      name: 'offsetX',
                      displayName: 'X',
                      type: 'number',
                      value: -30,
                      config: {
                        min: -10000,
                        max: 10000,
                        suffix: 'px',
                      },
                    },
                    {
                      name: 'offsetY',
                      displayName: 'Y',
                      type: 'number',
                      value: 0,
                      config: {
                        min: -10000,
                        max: 10000,
                        suffix: 'px',
                      },
                    },
                  ],
                },
              ],
            },
            {
              name: 'numerical',
              displayName: '数值',
              type: 'collapse',
              hasSwitch: false,
              defaultExpand: false,
              value: [
                {
                  name: 'show',
                  displayName: '',
                  value: true,
                  type: 'switch',
                },
                {
                  name: 'font',
                  displayName: '文本样式',
                  type: 'textFullStyleGroup',
                  value: [
                    {
                      name: 'fontFamily',
                      displayName: '',
                      value: 'Microsoft Yahei',
                    },
                    {
                      name: 'fontSize',
                      displayName: '',
                      value: 12,
                    },
                    {
                      name: 'color',
                      displayName: '',
                      type: 'color',
                      value: '#fff',
                    },
                    {
                      name: 'bold',
                      displayName: '',
                      value: false,
                    },
                    {
                      name: 'italic',
                      displayName: '',
                      value: false,
                    },
                    {
                      name: 'letterSpacing',
                      displayName: '字距',
                      value: 0,
                    },
                    {
                      name: 'lineHeight',
                      displayName: '行距',
                      value: 20,
                    },
                  ],
                },
                {
                  name: 'offset',
                  displayName: '偏移',
                  type: 'inputNumber2',
                  showDetail: true,
                  value: [
                    {
                      name: 'offsetX',
                      displayName: 'X',
                      type: 'number',
                      value: 102,
                      config: {
                        min: -10000,
                        max: 10000,
                        suffix: '%',
                      },
                    },
                    {
                      name: 'offsetY',
                      displayName: 'Y',
                      type: 'number',
                      value: 0,
                      config: {
                        min: -10000,
                        max: 10000,
                        suffix: 'px',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          key: 'barSetting',
          name: '柱状',
          value: [
            {
              "name": "bySystem",
              "displayName": "系统自定",
              "type": "switch",
              "value": true
            },
            {
              "name": "isRadius",
              "displayName": "圆角柱状",
              "type": "switch",
              "value": false
            },
            {
              name: 'barColor',
              displayName: '柱状颜色',
              value: '#1890ff',
              type: 'color',
            },
            {
              name: 'bgColor',
              displayName: '背景颜色',
              value: 'rgba(230,247,255,0.1)',
              type: 'color',
            },
            {
              name: 'highLight',
              displayName: '头部高亮',
              type: 'collapse',
              hasSwitch: true,
              defaultExpand: false,
              value: [
                {
                  name: 'show',
                  displayName: '',
                  value: false,
                  type: 'switch',
                },
                {
                  'name': 'radius',
                  'displayName': '半径',
                  'value': 60,
                  type: 'number',
                  "config": {
                    "min": 0,
                    "max": 1000,
                    "step": 1,
                    suffix: 'px',  // 输入框后缀
                  }
                },
                {
                  'name': 'offset',
                  'displayName': '偏移',
                  'value': 20,
                  type: 'number',
                  "config": {
                    "min": 0,
                    "max": 1000,
                    "step": 1,
                    suffix: 'px',  // 输入框后缀
                  }
                },
              ]
            },
          ],
        },
      ],
    },
  ],

  "useFilter": false,
  "filters": [],
  "events": [],
  "callbackArgs": [],
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

export default ComponentDefaultConfig