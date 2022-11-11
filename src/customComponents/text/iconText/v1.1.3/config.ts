const componentDefaultConfig = {
  "id": "121", //组件ID
  "uniqueTag": "24e1b3a2-60e0-4cef-8a5d-f04fd645f14b", // =========
  "name": "标准标题", //图层名称
  "parentId": "0", // 父组件 像是2D地图、3D地图 =================
  "dashboardId": "11", //画布id
  "moduleType": "text",
  "moduleName": "iconText", //组件标识
  "moduleVersion": "1.1.3", //组件版本号

  "createdAt": "2022-04-02T07:22:31.290Z", // =========
  "updatedAt": "2022-04-02T07:22:39.798Z", // =========

  "autoUpdate": { "isAuto": false, "interval": 10 }, // =========
  "thumb": "", // 缩略图 // =========

  "dataConfig": {}, //数据源配置
  "dataType": "static", //数据类型：static;mysql;api;clickhouse
  "dataFrom": 0,
  "dataContainers": [], // 默认选中容器
  "staticData": {
    //静态数据
    "data": [
      {
        "text": "文字组件",
      }
    ],
    "fields": [
      {
        "name": "text",
        "value": "text",
        "desc": "文本",
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
          "value": 500
        },
        {
          "name": "height",
          "displayName": "高度",
          "value": 200
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
          "value": "48px"
        }
      ]
    },
    {
      "name": "align",
      "displayName": "对齐方式",
      "type": "alignFull",
      "value": [
        {
          "name": "textAlign",
          "displayName": "水平对齐",
          "type": "align",
          "value": "left" // left , center, right,bothEnds
        },
        {
          "name": "textVertical",
          "displayName": "垂直对齐",
          "type": "vertical",
          "value": "top" // top bottom vertical
        }
      ]
    },
    // {
    //   'name':"underline",
    //   'displayName':'标题下划线',
    //   'type':'radioGroup',
    //   'direction':'horizontal', // 方向
    //   'value': false,
    //   'options': [
    //     {
    //       'name': '显示',
    //       'value': true
    //     },
    //     {
    //       'name': '隐藏',
    //       'value': false
    //     }
    //   ]
    // },
    {
      "name": "iconImg",
      "displayName": "上传图标",
      "type":"image",
      "value": ""
      // 'value': 'http://10.201.81.47:9000/soc-visualization-public/static/png/多边形-蓝色.png', // 有背景图则返回背景图的url，没有背景图返回空或者null
    },
    {
      "name":"iconSize",
      "displayName":"图标尺寸",
      "type":"inputNumber2",
      "showDetail":true, // 是否展示下面的文字说明
      "value":[
          {
              "name":"width",
              "displayName":"宽度",
              "type":"number",
              "value":20,
              "config":{
                  "min":0,
                  "suffix":"px",  // 输入框后缀
              }
          },
          {
              "name":"height",
              "displayName":"长度",
              "type":"number",
              "value":20,
              "config":{
                  "min":0,
                  "suffix":"px",  // 输入框后缀
              }
          },
      ]
    },
    {
      "name": "backgroundImg",
      "displayName": "标题背景图",
      "type":"image",
      "value": ""
      // 'value': 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202004%2F25%2F20200425173132_svsej.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658998305&t=e66659d4f05a9e35629aeb89425ad381', // 有背景图则返回背景图的url，没有背景图返回空或者null
    },
    {
      "name": "shadow",
      "displayName": "阴影",
      "type": "collapse",
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