const componentDefaultConfig = {
  "id": '121', //组件ID
  "uniqueTag": "24e1b3a2-60e0-4cef-8a5d-f04fd645f14b", // =========
  "name": "文字组件", //图层名称
  "parentId": "0", // 父组件 像是2D地图、3D地图 =================
  "dashboardId": "11", //画布id

  "moduleName": "wordCloud", //组件标识
  "moduleVersion": "1.1.0", //组件版本号

  "createdAt": "2022-04-02T07:22:31.290Z", // =========
  "updatedAt": "2022-04-02T07:22:39.798Z", // =========

  "autoUpdate": {"isAuto": false, "interval": 10}, // =========
  "thumb": "", // 缩略图 // =========

  "dataConfig": {}, //数据源配置
  "dataType": "static", //数据类型：static;mysql;api;clickhouse
  "dataContainers": [{// =========
    "enable": true,
    "id": 2744,
    "rank": 0
  }],
  "staticData": {
    //静态数据
    "data": [
      {
        "text": "文字组件"
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
  "filters": [{// =========
    "enable": true,
    "id": 362505
  }],

  "interaction":{ // 交互
    "mountAnimation": {
      // 如果不存在载入动画，该项为null
      "delay": 2, // 延迟
      "direction": "right", // 方向
      "duration": 304, // 持续时间(ms)
      "opacityOpen": true, // 渐隐渐现
      "timingFunction": "ease", // 速率
      "type": "slide" // 动画类型
    },
    "events":[{
        "trigger": "dataChange", // 事件类型 dataChange、click、mouseEnter、mouseLeave
        "name": "事件1",
        "id": "key",
        "conditions": [
            {
                "name": "条件",
                "type": "field", 
                "field": "a", 
                "compare": "==", 
                "expected": "a",
                "code": "return data",
                "id": "key"
            }
        ],
        "conditionType": "all", // 判断类型
        "actions": [
            {
                "id": "uuidv4()",
                "name": "动作",
                "action":"show", //动作 show hide
                "componentScope":"current",  //组件scope global\current
                "unmount":true, // 隐藏卸载
                "component": [], // 组件id数组
                "animation": {
                    "type": "slideLeft", // opacity\slideLeft\slideRight\slideTop\slideBottom
                    "timingFunction": "ease", // linear\ease\ease-in\ease-out\ease-in-out
                    "duration": 1000,
                    "delay": 0
                }
            }
        ]
    }]
  },
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
          "value": 100
        },
        {
          "name": "height",
          "displayName": "高度",
          "value": 100
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
          "value": true,
          "type": "switch"
        },
        {
          "name": "shadow",
          "displayName": "外阴影",
          "type": "outsideShadow",
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