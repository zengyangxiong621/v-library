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
    "events":[
      {
          "name":"事件1",
          "conditionType":"all",	// 满足全部条件 all  满足任意条件 random
          "trigger":"dataChange", // 事件类型 dataChange click  mouseEnter mouseLeave
          "id":"96c8d7d8-6620-48b4-be05-ab865ac0e26b",
          "conditions":[
              {
                  "compare":"==", // 判断条件 == != < > <= >= include exclude
                  "code":"return data",
                  "field":"", // 字段
                  "expected":"", // 期望的字段值
                  "name":"条件",
                  "id":"5d8a602a-a286-45f2-8e97-50a6f037cb1c",
                  "type":"field"  // field custom
              }
          ],
          "actions":[
              {
                  "rotate":{ // 旋转配置
                      "perspective":false, // 透视 true  false
                      "rotateX":0,
                      "rotateY":0,
                      "rotateZ":0
                  },
                  "component":['componentid','groupid'], // 组id 组件id
                  "name":"动作1",
                  "action":"show", // show hide show/hide translate scale rotate
                  "scale":{	// 缩放配置
                      "origin":"50% 50%", // 缩放原点
                      "x":1,	// x方向缩放比例
                      "lock":true, // 锁定x/y
                      "y":1	// y方向缩放比例
                  },
                  "id":"73c57ff6-3215-4eb4-b100-2ab0a3ef6472",
                  "componentScope":"current",	// 当前current 全局global
                  "translate":{ // 移动配置
                      "toX":0,
                      "toY":0
                  },
                  "animation":{	// 动画配置
                      "duration":1004,	// 动画时长
                      "delay":0,	// 延时
                      "type":"slideLeft",	// 动画类型opacity slideLeft slideRight slideTop slideBottom
                      "timingFunction":"ease" // 速率 linear ease ease-in ease-out ease-in-out
                  }
              }
          ]
      }
    ]
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