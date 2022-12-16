const componentDefaultConfig = {
  "id": "121", //组件ID
  "uniqueTag": "24e1b3a2-60e0-4cef-8a5d-f04fd645f14b", // =========
  "name": "翻牌器", //图层名称
  "parentId": "0", // 父组件 像是2D地图、3D地图 =================
  "dashboardId": "11", //画布id

  "moduleName": "counter", //组件标识
  "moduleVersion": "1.1.3", //组件版本号

  "createdAt": "2022-04-02T07:22:31.290Z", // =========
  "updatedAt": "2022-04-02T07:22:39.798Z", // =========

  "autoUpdate": {
    "isAuto": false,
    "interval": 10
  }, // =========
  "thumb": "", // 缩略图 // =========

  "dataConfig": {}, //数据源配置
  "dataType": "static", //数据类型：static;mysql;api;clickhouse
  "dataFrom": 0,
  "dataContainers": [],
  triggers: [ // 下面是合集
    {
      name: "当请求完成或数据变化时",
      value: "dataChange",
    },
    {
      name: "鼠标点击",
      value: "click",
    },
    {
      name: "鼠标移入",
      value: "mouseEnter",
    },
    {
      name: "鼠标移出",
      value: "mouseLeave",
    },
  ],
  "staticData": {
    //静态数据
    "data": [{
      "name": "翻牌器标题",
      "value": "-1121.23",
      "unit": "万"
    }],
    "fields": [{
        "name": "name",
        "value": "name",
        "desc": "文本",
        "status": true // 状态
      },
      {
        "name": "value",
        "value": "value",
        "desc": "数值",
        "status": true // 状态
      },
      {
        "name": "unit",
        "value": "unit",
        "desc": "单位",
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
          "value": 743
        },
        {
          "name": "top",
          "displayName": "Y轴坐标",
          "value": 247
        },
        {
          "name": "width",
          "displayName": "宽度",
          "value": 400
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
      name: "commonConfig",
      displayName: "基础配置",
      type: "tabs",
      activeKey: "overall", // 默认选中第一项
      options: [{
          key: "overall",
          name: "全局配置",
          value: [{
              name: "sortedBy",
              displayName: "排列方式",
              type: "select",
              value: "up",
              options: [{
                  name: "标题在上",
                  value: "up"
                },
                {
                  name: "标题在下",
                  value: "down"
                },
                {
                  name: "标题在左",
                  value: "left"
                },
                {
                  name: "标题在右",
                  value: "right"
                }
              ]
            },
            {
              "name": "align",
              "displayName": "对齐方式",
              "type": "alignFull",
              "value": [{
                "name": "textAlign",
                "displayName": "水平对齐",
                "type": "align",
                "value": "left" // left , center, right,bothEnds
              }]
            },
            {
              "name": "title",
              "displayName": "标题",
              "type": "collapse",
              "hasSwitch": true,
              "defaultExpand": false,
              "value": [{
                  "name": "show",
                  "displayName": "",
                  "value": true,
                  "type": "switch"
                },
                {
                  "name": "content",
                  "displayName": "内容",
                  "type": "input",
                  "value": "翻牌器标题",
                },
                {
                  "name": "textStyle",
                  "displayName": "文本样式",
                  "type": "textFullStyleGroup",
                  "value": [{
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
                      "value": "48"
                    }
                  ]
                },
                {
                  name: "offsetConfig",
                  displayName: "偏移",
                  type: "inputNumber2",
                  showDetail: true, // 是否展示下面的文字说明
                  value: [{
                      name: "x",
                      displayName: "X",
                      type: "number",
                      value: 0,
                      config: {
                        min: 0,
                        suffix: "px", // 输入框后缀
                      }
                    },
                    {
                      name: "y",
                      displayName: "Y",
                      type: "number",
                      value: 0,
                      config: {
                        min: 0,
                        suffix: "px", // 输入框后缀
                      }
                    },
                  ]
                }
              ]
            },
            {
              "name": "plusMinusConfig",
              "displayName": "正负值配置翻牌器",
              "type": "collapse",
              "hasSwitch": true,
              "defaultExpand": false,
              "value": [{
                  "name": "show",
                  "displayName": "",
                  "value": false,
                  "type": "switch"
                },
                {
                  "name": "positiveColor",
                  "displayName": "正值",
                  "value": "#ee0c0c", // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
                  "type": "color"
                },
                {
                  "name": "negativeColor",
                  "displayName": "负值",
                  "value": "#08f111", // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
                  "type": "color"
                }
              ]
            }
          ]
        },
        {
          key: "counter",
          name: "翻牌器",
          value: [{
            name: "xxx",
            displayName: "xxx",
            type: "tabs",
            activeKey: "prefixConfig", // 默认选中第一项
            options: [{
                key: "prefixConfig",
                name: "前缀",
                value: [{
                    "name": "support",
                    "displayName": "开启",
                    "type": "checkBox",
                    "value": true
                  },
                  {
                    "name": "content",
                    "displayName": "内容",
                    "type": "input",
                    "value": "￥",
                  },
                  {
                    "name": "textStyle",
                    "displayName": "文本样式",
                    "type": "textFullStyleGroup",
                    "value": [{
                        "name": "fontFamily",
                        "displayName": "",
                        "value": "Microsoft Yahei"
                      },
                      {
                        "name": "fontSize",
                        "displayName": "",
                        "value": 24
                      },
                      {
                        "name": "color",
                        "displayName": "",
                        "type": "color",
                        "value": "#999" // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
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
                        "value": "48"
                      }
                    ]
                  },
                  {
                    name: "offsetConfig",
                    displayName: "偏移",
                    type: "inputNumber2",
                    showDetail: true, // 是否展示下面的文字说明
                    value: [{
                        name: "x",
                        displayName: "X",
                        type: "number",
                        value: 0,
                        config: {
                          min: 0,
                          suffix: "px", // 输入框后缀
                        }
                      },
                      {
                        name: "y",
                        displayName: "Y",
                        type: "number",
                        value: 0,
                        config: {
                          min: 0,
                          suffix: "px", // 输入框后缀
                        }
                      },
                    ]
                  }
                ]
              },
              {
                key: "numberConfig",
                name: "数值",
                value: [{
                    "name": "dataRangConfig",
                    "displayName": "数值样式",
                    "type": "collapse",
                    "hasSwitch": false, // 是否有切换按钮
                    "defaultExpand": false, // 是否默认展开
                    "value": [{
                        "name": "show",
                        "displayName": "",
                        "value": true,
                        "type": "switch"
                      },
                      {
                        "name": "textStyle",
                        "displayName": "文本样式",
                        "type": "textFullStyleGroup",
                        "value": [{
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
                            "value": 48
                          }
                        ]
                      },
                      {
                        "name": "numShadow",
                        "displayName": "阴影",
                        "type": "collapse",
                        "hasSwitch": true,
                        "defaultExpand": false,
                        "value": [{
                            "name": "show",
                            "displayName": "",
                            "value": false,
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
                    ]
                  },
                  {
                    "name": "formateConfig",
                    "displayName": "格式化",
                    "type": "collapse",
                    "hasSwitch": false, // 是否有切换按钮
                    "defaultExpand": false, // 是否默认展开
                    "value": [{
                        "name": "numShow",
                        "displayName": "",
                        "value": true,
                        "type": "switch"
                      },
                      {
                        name: "decimalCount",
                        displayName: "小数位位数",
                        type: "number",
                        value: 2,
                        config: {
                          min: 0,
                          max: 10,
                        }
                      },
                      {
                        name: "splitCount",
                        displayName: "千分位分割",
                        type: "radioGroup",
                        direction: "horizontal,vertical", // 方向
                        value: true,
                        options: [{
                            name: "是",
                            value: true
                          },
                          {
                            name: "否",
                            value: false
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "name": "symbolsConfig",
                    "displayName": "自定义符号",
                    "type": "collapse",
                    "hasSwitch": true, // 是否有切换按钮
                    "defaultExpand": false, // 是否默认展开
                    "value": [{
                        "name": "show",
                        "displayName": "",
                        "value": false,
                        "type": "switch"
                      },
                      {
                        name: "position",
                        displayName: "位置",
                        type: "radioGroup",
                        direction: "horizontal,vertical", // 方向
                        value: "before",
                        options: [{
                            name: "数值前",
                            value: "before"
                          },
                          {
                            name: "数值后",
                            value: "after"
                          }
                        ]
                      },
                      {
                        name: "iconType",
                        displayName: "类型",
                        type: "tabs",
                        activeKey: "increase", // 默认选中第一项
                        options: [{
                            key: "increase",
                            name: "增长",
                            value: [{
                                "name": "image",
                                "displayName": "图标",
                                "type": "image",
                                "value": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAoCAYAAAACJPERAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAHaADAAQAAAABAAAAKAAAAAC3uiGnAAADyklEQVRYCbVXSWwUVxCt+t32LGyXBBAkwIGbZ0yMhQCBmLEtNgXlBMohCSCEkkicOESCA5uQkBAHbggSLpxBiQLCIcE4I+FIkYhZMpZCgsSB9WBfDHH3MMsvqgfPuJf/u3ts05f59V69el2arpppgGlcOTvzVc7KPOkpdWydhhywVVFfKbO5KuE6ELWx+jWabZsK7ffvt1KnJdO+N5nOapVus8H8pgnCiwTgut/SI0+bWMRBRPBNutdatbRW4w7dhg5LsKRM0L+d1k7dSFOlPsQy/Yw2zKtRrZ+IPlKVIaCMbf//49fU3abi/VikaZ7y5rg1foVb6vSL3TER9P1nlX5wY7pzpClZYxfYcIuugBsngD25iY4Tbkx1DjXtsbNH2XCfShiCHc3b2b0hvH5keuyO3VLCpTCxlkOsmAI+vZUcuanKUY5Mr93ZWyN5oz6LKlU87FWbKTYOJIpFf3rANP+mMwNVOcRP5AJ/cqsxIj4TYKwbTD947tZ6vtPNE11LqCb7Z8PQMXFGTFLtujNySlMejbkVKDvr7WN3wkzP3MAqZ+Sc0WvUqndaB6zRy/zIf9IgZveTtrwbvXdV66ZojZ5jw22za+SvRvtydvaIgyL/TB0GSaf8Ke8rRiG+FCDh4PsyUNYl2m8aBqwnMlYoExgkkl38FJ7R8X4cEYZ4Dg8hmBU/58SplHwUmFNVYt7KVNnYUHF+DEF8W5hT5H2tvzxzqkrbRbuMuIaOXiAFNpC/bqTpOPyb9Iu0MUJZpj64q+UniUhThDmJqCINHgHvFLBQasS6z0jTSqnkWWG6QnWcoBDKT5KRpkByUZxCTg53+lOc3OY+1CXzQ7RYx3lwxMe/p4vDHkwTRHYqBcXqFIEuazwCcGSnvCJXBFQ+gH83a6bA732wNozslDtYrVVPEVcGksXHU2H4KdKUALvDSwCYpnE6KsfNh5r22l3Left+6BYEzojXBtof3AvgIUCoKUHlixCtQ73izXEgIidAa02dnSuJvgkoXIAA8V0rL04NqdZ0zHq4g1+OljUSA58Ig4Ppv2O9Rvi1SlPusl0CnfQnN2LePCOYSn7Oo8L/clq/lKaj1j/O60RWVY6NHranRV8Bh8dUfBws8CPeM5HtJqQ/ef0FFwfCo2QqmfsVh1/GKa7L8XSaL61eyYY/Kw0BfkmkjI0zNXRupNmpYwiyXGDDpd47xFGOjxXSxfPT/Q699SZN87RmMdj2Xx5DxKcC8eK85PyzV/GP137hTOL692aU7YVVgjQg3hFAQyjwxqbEzoHjeFzOpLhO+xZrCD4FYkKvaAAAAABJRU5ErkJggg=="
                              },
                              {
                                name: "sizeConfig",
                                displayName: "尺寸",
                                type: "inputNumber2",
                                showDetail: true, // 是否展示下面的文字说明
                                value: [{
                                    name: "width",
                                    displayName: "宽度",
                                    type: "number",
                                    value: 30,
                                    config: {
                                      min: 10,
                                      suffix: "px", // 输入框后缀
                                    }
                                  },
                                  {
                                    name: "height",
                                    displayName: "高度",
                                    type: "number",
                                    value: 30,
                                    config: {
                                      min: 10,
                                      suffix: "px", // 输入框后缀
                                    }
                                  },
                                ]
                              },
                              {
                                name: "imgOffsetConfig",
                                displayName: "偏移",
                                type: "inputNumber2",
                                showDetail: true, // 是否展示下面的文字说明
                                value: [{
                                    name: "x",
                                    displayName: "X",
                                    type: "number",
                                    value: 0,
                                    config: {
                                      min: 0,
                                      suffix: "px", // 输入框后缀
                                    }
                                  },
                                  {
                                    name: "y",
                                    displayName: "Y",
                                    type: "number",
                                    value: 0,
                                    config: {
                                      min: 0,
                                      suffix: "px", // 输入框后缀
                                    }
                                  },
                                ]
                              }
                            ]
                          },
                          {
                            key: "even",
                            name: "持平",
                            value: [{
                                "name": "image",
                                "displayName": "图标",
                                "type": "image",
                                "value": ""
                              },
                              {
                                name: "sizeConfig",
                                displayName: "尺寸",
                                type: "inputNumber2",
                                showDetail: true, // 是否展示下面的文字说明
                                value: [{
                                    name: "width",
                                    displayName: "宽度",
                                    type: "number",
                                    value: 30,
                                    config: {
                                      min: 10,
                                      suffix: "px", // 输入框后缀
                                    }
                                  },
                                  {
                                    name: "height",
                                    displayName: "高度",
                                    type: "number",
                                    value: 30,
                                    config: {
                                      min: 10,
                                      suffix: "px", // 输入框后缀
                                    }
                                  },
                                ]
                              },
                              {
                                name: "imgOffsetConfig",
                                displayName: "偏移",
                                type: "inputNumber2",
                                showDetail: true, // 是否展示下面的文字说明
                                value: [{
                                    name: "x",
                                    displayName: "X",
                                    type: "number",
                                    value: 0,
                                    config: {
                                      min: 0,
                                      suffix: "px", // 输入框后缀
                                    }
                                  },
                                  {
                                    name: "y",
                                    displayName: "Y",
                                    type: "number",
                                    value: 0,
                                    config: {
                                      min: 0,
                                      suffix: "px", // 输入框后缀
                                    }
                                  },
                                ]
                              }
                            ]
                          },
                          {
                            key: "reduce",
                            name: "减少",
                            value: [{
                                "name": "image",
                                "displayName": "图标",
                                "type": "image",
                                "value": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAoCAYAAAACJPERAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAHaADAAQAAAABAAAAKAAAAAC3uiGnAAADfUlEQVRYCa1Y20uUQRSfs7uuyyoFUhFZuK6lgRakCD4ISS89+FTZW2EPpdA/EAiZFRE9+RQE3SjqIXwNuioL9dBDN0wRL6vhdrWnErF095t+863ud5v5LusODHvmnPM7v+/Md2a+mSWGxmtr9zPOU4xoBsNX6M9Yd/dLGhjQhL3UjURA3ti4nS0tvYVYXSAgyuBBbrHy8kGanFws6Esg6KQiDq+r281yuRREg1gYiH6hX2Dp9A0i4kK10VYgFYGUxHmWJywcPkXp9EJJSdeIW5imvcHURhzBiaZZLHaQJia+O2wBFCG7LzJ5B901u14fc76HLS+PYEa2Se0+lQ5SHRePX8J7/KSIsRczMczr67co7J5qKSmNj69ges8r0Zw3sZWVR5xzS00o/W0GKanu09r6GNnO2/zNw0MsmTxjVviVXZ8Um0YfMr6iDEb0h4VCTaiDjNJHYlBnmnd+KMEYKs434f1eNxT+JNdMRQhku4Bst7qGi0SaaWbmg6uPyeiVKVi5WELuLZc75+5gtXqTEr23QiQjzruwhJISi1TlTcrYZynSqgyzbLbHqlKP/JD+VMNNFk07bhq5in5If7hGMIxJbI8txlAt+SH1l6ng0LQjairD4k0ajwf5gHcYodWSN2ks9lcNd1haeUdHzKG1KbxJk8l/Nox6yHmUZTLNaoe8xZOUhoZycBXdX8vl9nk5RvRFnc3WKh05P4BdKay02w1EJ1DFYyiqVbtJH1dWTpOvvVWKLlqZCuGbOVg0vBgg0e0Qzc5eBfHNYvCBMUT9NDf3IF9INTVnEeBp4CDBAHdAeFlAdFJKpbKsokLsnR+DxfHpTfScJRK9696WjzhvaNiBA5c48+5ad9jwL9Eoi0bbzVcTC6kgQLk3odxfg3hzCQi/sLKyNpqa+mqO5dgccMgaw2HrKIpLvs7MaDdZHNoY67QTCoiDVChBPIKf00IuquUfuAuFMyrDS0mFIwD3kW2/DOSpI+oF/oXKT0kqAGslflcFlupDoYtY+64YV1I9aCLRg4yVT20hJroHwgGLTjLwJNXXcDR6DMTS91OISTTMqqp8XTMcS6YQxCbga1TNVlfFGt5pM+E90Bh6O7L87bBJFL5JBVb/Q0T8ESKuE0b7hht6W5D7jOf0GrH1whJT3IWs8muYaBGLvzMIoTleIBkZn0Sf54nE4UDANef/CCYBuDd1l8MAAAAASUVORK5CYII="
                              },
                              {
                                name: "sizeConfig",
                                displayName: "尺寸",
                                type: "inputNumber2",
                                showDetail: true, // 是否展示下面的文字说明
                                value: [{
                                    name: "width",
                                    displayName: "宽度",
                                    type: "number",
                                    value: 30,
                                    config: {
                                      min: 10,
                                      suffix: "px", // 输入框后缀
                                    }
                                  },
                                  {
                                    name: "height",
                                    displayName: "高度",
                                    type: "number",
                                    value: 30,
                                    config: {
                                      min: 10,
                                      suffix: "px", // 输入框后缀
                                    }
                                  },
                                ]
                              },
                              {
                                name: "imgOffsetConfig",
                                displayName: "偏移",
                                type: "inputNumber2",
                                showDetail: true, // 是否展示下面的文字说明
                                value: [{
                                    name: "x",
                                    displayName: "X",
                                    type: "number",
                                    value: 0,
                                    config: {
                                      min: 0,
                                      suffix: "px", // 输入框后缀
                                    }
                                  },
                                  {
                                    name: "y",
                                    displayName: "Y",
                                    type: "number",
                                    value: 0,
                                    config: {
                                      min: 0,
                                      suffix: "px", // 输入框后缀
                                    }
                                  },
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    name: "animate",
                    displayName: "动画开关",
                    type: "radioGroup",
                    direction: "horizontal", // 方向
                    value: "close",
                    options: [{
                        name: "打开",
                        value: "open"
                      },
                      {
                        name: "关闭",
                        value: "close"
                      }
                    ]
                  },
                  {
                    name: "duration",
                    displayName: "动画时间",
                    type: "number",
                    value: 2,
                    config: {
                      min: 1,
                      suffix: "s", // 输入框后缀
                    }
                  },
                ]
              },
              {
                key: "suffixConfig",
                name: "后缀",
                value: [{
                    "name": "support",
                    "displayName": "开启",
                    "type": "checkBox",
                    "value": true
                  },
                  {
                    "name": "content",
                    "displayName": "内容",
                    "type": "input",
                    "value": "/单位",
                  },
                  {
                    "name": "textStyle",
                    "displayName": "文本样式",
                    "type": "textFullStyleGroup",
                    "value": [{
                        "name": "fontFamily",
                        "displayName": "",
                        "value": "Microsoft Yahei"
                      },
                      {
                        "name": "fontSize",
                        "displayName": "",
                        "value": 18
                      },
                      {
                        "name": "themePureColor",
                        "displayName": "",
                        "type": "color",
                        "value": "#0F92FF" // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
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
                        "value": "48"
                      }
                    ]
                  },
                  {
                    name: "offsetConfig",
                    displayName: "偏移",
                    type: "inputNumber2",
                    showDetail: true, // 是否展示下面的文字说明
                    value: [{
                        name: "x",
                        displayName: "X",
                        type: "number",
                        value: 0,
                        config: {
                          min: 0,
                          suffix: "px", // 输入框后缀
                        }
                      },
                      {
                        name: "y",
                        displayName: "Y",
                        type: "number",
                        value: 0,
                        config: {
                          min: 0,
                          suffix: "px", // 输入框后缀
                        }
                      },
                    ]
                  }
                ]
              }
            ]
          }]
        }
      ]
    },
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