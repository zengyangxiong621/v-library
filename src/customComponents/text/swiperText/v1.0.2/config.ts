const componentDefaultConfig = {
  "id": '121', //组件ID
  "uniqueTag": "24e1b3a2-60e0-4cef-8a5d-f04fd645f14b", // =========
  "name": "滚动文本", //图层名称
  "parentId": "0", // 父组件 像是2D地图、3D地图 =================
  "dashboardId": "11", //画布id

  "moduleName": "swiperText", //组件标识
  "moduleVersion": "1.0.0", //组件版本号

  "createdAt": "2022-04-02T07:22:31.290Z", // =========
  "updatedAt": "2022-04-02T07:22:39.798Z", // =========

  "autoUpdate": { "isAuto": false, "interval": 10 }, // =========
  "thumb": "", // 缩略图 // =========

  "dataConfig": {}, //数据源配置
  "dataType": "static", //数据类型：static;mysql;api;clickhouse
  "dataFrom": 0,
  "dataContainers": [], // 容器默认为空
  "staticData": {
    //静态数据
    "data": [
      {
        "text": "https:/ /workspace .easyv.cloud/create/851601",
        "url": 'https://mbd.baidu.com/newspage/data/landingsuper?context=%7B%22nid%22%3A%22news_10029027259472790743%22%7D&n_type=-1&p_from=-1'
      },
      {
        'text': 'https:/ /workspace.easyv.cloud/create/851601勒索软件',
        "url": 'https://mbd.baidu.com/newspage/data/landingsuper?context=%7B%22nid%22%3A%22news_10029027259472790743%22%7D&n_type=-1&p_from=-1'
      },
      {
        'text': 'https:/ /workspace.easyv.cloud/create/ 851601挖矿',
        "url": 'https:/ /workspace .easyv.cloud/create/851601'
      },
      {
        'text': 'Ahttps:/ /workspace.easyv.cloud create/851601PT/勒索软件',
        "url": 'https:/ /workspace .easyv.cloud/create/851601'
      },
      {
        'text': 'https://workspace easyv.cloud/ create/851601网页篡改',
        "url": 'https:/ /workspace .easyv.cloud/create/851601'
      },
      {
        'text': 'https:/ /workspace.easyv.cloud/ create/851601VPN',
        "url": 'https:/ /workspace .easyv.cloud/create/851601'
      },
      {
        'text': ' https://workspace easyv.cloud/create/851601',
        "url": 'https:/ /workspace .easyv.cloud/create/851601'
      }
    ],
    "fields": [
      {
        "name": "text",
        "value": "text",
        "desc": "文本",
        "status": true // 状态
      },
      {
        "name": "url",
        "value": "url",
        "desc": "超链接",
        "status": true // 状态
      }
    ]
  },

  "useFilter": false,// =========
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
          "value": 500
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
          "value": "#fff" // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
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
          "value": '48px'
        }
      ]
    },
    {
      'name':"autoplay",
      'displayName':'自动轮播',
      'type':'radioGroup',
      'direction':'horizontal', // 方向
      'value':true,
      'options':[
        {
          'name':'是',
          'value':true
        },
        {
          'name':'否',
          'value':false
        },
      ]
  },
  {
    'name': 'delay',
    'displayName': '轮播速度',
    'value': 500,
    'type':'number',
    "config": {
        "min": 300,
        "max": 10000,
        "step": 100,
        'suffix':'ms',  // 输入框后缀
    }
  },
  {
    'name': 'slidesNum',
    'displayName': '展示行',
    'value': 3,
    'type':'number',
    "config": {
        "min": 3,
        "max": 100,
        "step": 1,
        'suffix':'',  // 输入框后缀
    }
  },
  //   {
  //     name:"isLoop",
  //     displayName:'无限循环',
  //     type:'radioGroup',
  //     direction:'horizontal', // 方向
  //     value:true,
  //     options:[
  //       {
  //         name:'是',
  //         value:true
  //       },
  //       {
  //         name:'否',
  //         value:false
  //       },
  //     ]
  // },
  {
    'name': 'lineSpace',
    'displayName': '行间距',
    'value': 10,
    'type':'number',
    "config": {
        "min": 0,
        "max": 100,
        "step": 1,
        'suffix':'px',  // 输入框后缀
    }
  },
  {
    "name": "shadow",
    "displayName": "阴影",
    "type": 'collapse',
    "hasSwitch": true,
    "defaultExpand": true,
    "value": [
      {
        "name": "show",
        "displayName": "",
        "value": false,
        "type": "switch"
      },
      {
        "name": "shadow",
        "displayName": "文本阴影",
        "type": "boxShadow",
        "value": {
          "color": "#0075FF", // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
          "vShadow": 0, // 垂直阴影的位置
          "hShadow": 0, // 水平阴影的位置
          "blur": 8 // 模糊的距离
        }
      }
    ]
  },
  {
    "name": "hyperlinks",
    "displayName": "链接设置",
    "type": 'collapse',
    "hasSwitch": true,
    "defaultExpand": true,
    "value": [
      {
        "name": "showLink",
        "displayName": "",
        "value": false,
        "type": "switch"
      },
      {
        "name": "openNew",
        "displayName": "打开新窗口",
        "type": "checkBox",
        "value": false
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