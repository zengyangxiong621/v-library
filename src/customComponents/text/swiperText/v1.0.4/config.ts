const componentDefaultConfig = {
  "id": '121', //组件ID
  "uniqueTag": "24e1b3a2-60e0-4cef-8a5d-f04fd645f14b", // =========
  "name": "滚动文本", //图层名称
  "parentId": "0", // 父组件 像是2D地图、3D地图 =================
  "dashboardId": "11", //画布id
  "moduleType": 'text',
  "moduleName": "swiperText", //组件标识
  "moduleVersion": "1.0.4", //组件版本号

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
          "value": '48'
        }
      ]
    },
    {
      "name":"textAlign",
      "displayName":"对齐方式",
      "type":"alignFull",
      "value":[ // 可以只有一种对齐方式
        {
          "name":"textAlign",
          "displayName":"水平对齐",
          "type":"align",
          "range": ["left","center", "right"],
          "value":"left"
        }
      ]
    },
    {
      'name':"specialType",
      'displayName':'特效样式',
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
    'value': 7,
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
    'value': 0,
    'type':'number',
    "config": {
        "min": 0,
        "max": 100,
        "step": 1,
        'suffix':'px',  // 输入框后缀
    }
  },
  {
    "name": "rowIcon",
    "displayName": "行图标",
    "type": 'collapse',
    "hasSwitch": true,
    "defaultExpand": false,
    "value": [
      {
        "name": "show",
        "displayName": "",
        "value": false,
        "type": "switch"
      },
      {
        'name': 'backgroundImg',
        'displayName': '上传图标',
        'type':'image',
        'value': 'data:image/png;base64,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'
      },
      {
        'name':"iconSize",
        'displayName':'图标尺寸',
        'type':'inputNumber2',
        'showDetail':true, // 是否展示下面的文字说明
        'value':[
            {
                'name':'width',
                'displayName':'宽度',
                'type':'number',
                'value':30,
                'config':{
                    'min':0,
                    'suffix':'px',  // 输入框后缀
                }
            },
            {
                'name':'height',
                'displayName':'长度',
                'type':'number',
                'value':30,
                'config':{
                    'min':0,
                    'suffix':'px',  // 输入框后缀
                }
            },
        ]
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
            value: 10,
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
      }
    ]
  },
  {
    "name": "backgroundConfig",
    "displayName": "背景颜色",
    "type": 'collapse',
    "hasSwitch": true,
    "defaultExpand": false,
    "value": [
      {
        "name": "show",
        "displayName": "",
        "value": false,
        "type": "switch"
      },
      {
        'name': 'backgroundColor',
        'displayName': '颜色',
        'value': '#222430', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
        'type':'color'
      }
    ]
  },
  {
    "name": "shadow",
    "displayName": "阴影",
    "type": 'collapse',
    "hasSwitch": true,
    "defaultExpand": false,
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
    "defaultExpand": false,
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