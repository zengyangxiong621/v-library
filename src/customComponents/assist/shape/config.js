const componentDefaultConfig = {
  "id": '', //组件ID
  "uniqueTag": "", // ========= 24e1b3a2-60e0-4cef-8a5d-f04fd645f14b
  "name": "形状组件", //图层名称
  "parentId": "0", // 父组件 像是2D地图、3D地图 =================
  "dashboardId": "", //画布id

  "moduleName": "shape", //组件标识
  "moduleVersion": "1.0.0", //组件版本号

  "createdAt": "2022-04-02T07:22:31.290Z", // =========
  "updatedAt": "2022-04-02T07:22:39.798Z", // =========

  "autoUpdate": {"isAuto": false, "interval": 10}, // =========
  "thumb": "", // 缩略图 // =========

  "dataFrom": 0,
  "dataConfig": {}, //数据源配置
  "dataType": "static", //数据类型：static;mysql;api;clickhouse
  "dataContainers": [],
  "staticData": {
    //静态数据
    "data": [],
    "fields": [],
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
          "value": 600
        },
        {
          "name": "height",
          "displayName": "高度",
          "value": 100
        }
      ]
    },
    {
      'name': 'bgColor',
      'displayName': '背景',
      'value': 'rgba(18,137,221,0.2)', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
      'type':'color'
    },
    {
      "name": "border",
      "displayName": "描边",
      "type": "borderRadius",
      "range": ["topLeft", "topRight", "bottomRight", "bottomLeft"], // 可配置哪一个方向存在
      "value": {
        "type": "solid",
        "width": 2,
        "color": "#ffffff",
        "radius": [0, 0, 0, 0] // 这里靠下标依次对应
        // range 属性不存在时 radius 的值为 number 类型
      }
    },
    {
      'name': 'shadow',
      'displayName': '阴影',
      'type': 'collapse',
      'hasSwitch':true, // 是否有切换按钮
      'defaultExpand':true,  // 是否默认展开
      'value':[
        {	// 如果有后面的按钮，则该项必须放在第一个
          'name': 'show',
          'displayName': '',
          'value': false,
          'type': 'switch',
        },
        {
          'name': 'shadowConfig',
          'displayName': '外阴影',
          'type': 'boxShadow',
          'value': {
            'color': '#0075FF', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
            'vShadow': 0, // 垂直阴影的位置
            'hShadow': 0, // 水平阴影的位置
            'blur': 8, // 模糊的距离
          },
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