const componentDefaultConfig = {
  id: "",
  dashboardId: "",
  uniqueTag: "",
  name: "水位图",
  parentId: "0",
  moduleName: "hydrograph",
  moduleVersion: "1.0.1",
  moduleType: 'chart',
  autoUpdate: {
    isAuto: false,
    interval: 10,
  },
  thumb: "",
  dataConfig: {},
  dataType: "static",
  dataFrom: 0,
  dataContainers: [],
  staticData: {
    data: [
      {
        value: "0.7",
      },
    ],
    fields: [
      {
        name: "value",
        value: "value",
      },
    ],
  },
  useFilter: false,
  filters: [],
  events: [],
  config: [
    {
      displayName: "位置尺寸",
      name: "dimension",
      type: "dimensionGroup",
      config: {
        lock: false,
      },
      value: [
        {
          displayName: "X轴坐标",
          name: "left",
          value: 769,
        },
        {
          displayName: "Y轴坐标",
          name: "top",
          value: 277,
        },
        {
          displayName: "宽度",
          name: "width",
          value: 500,
        },
        {
          displayName: "高度",
          name: "height",
          value: 500,
        },
      ],
    },
    {
      displayName: "默认隐藏",
      name: "hideDefault",
      type: "checkBox",
      value: false,
    },
    {
      name: "allSettings",
      displayName: "allSettings",
      type: "tabs",
      activeKey: "1", // 默认选中第一项
      options: [
        {
          key: "1",
          name: "图表",
          value: [
            {
              name: "numericalType",
              displayName: "数值类型",
              type: "radioGroup",
              direction: "horizontal",
              value: "percent",
              options: [
                {
                  name: "百分比",
                  value: "percent",
                },
                {
                  name: "实际值",
                  value: "actualValue",
                },
              ],
              // 选择单选框中的某项后, 增加/删除组件
              updateEffect: {
                // 将父节点的路径信息保存,之后就不用通过递归来寻找其父节点
                parentPath: "2.options.0.value",
                // value 在这儿随便给单选框选项中的一个值就行,真正赋值的时候需要与当前选中的项保持一致
                value: "percent",
                updateType: {
                  percent: "delete",
                  actualValue: "add",
                },
                curIndex: 0,
                willAddObj: {
                  name: "capacity",
                  displayName: "容量",
                  value: 100,
                  type: "number",
                  config: {
                    min: 0,
                    max: 10000000000,
                    step: 1,
                  },
                },
              },
            },
            {
              name: "chartSize",
              displayName: "大小",
              value: 90,
              type: "range",
              config: {
                min: 0,
                max: 100,
                step: 1,
                suffix: "%", // 输入框后缀
              },
            },
            {
              name: "waveSeries",
              displayName: "波纹",
              type: "tabArray",
              disabled: false, // 如果改项配置为true，则后面的添加和删除不可用
              defaultActiveKey: "1",
              config: {
                template: [
                  {
                    key: "1",
                    displayName: "波纹1",
                    name: "waveSeries1",
                    type: "object",
                    flag: "specialItem",
                    value: [
                      {
                        displayName: "颜色",
                        name: "waveColor",
                        type: "color",
                        value: "#febb00",
                      },
                      {
                        name: "waveHeightSet",
                        displayName: "调整幅度",
                        value: 0.2,
                        type: "range",
                        config: {
                          min: -1,
                          max: 1,
                          step: 0.01,
                          suffix: "", // 输入框后缀
                        },
                      },
                      {
                        name: "waveSpeed",
                        displayName: "速度",
                        value: 0.2,
                        type: "range",
                        config: {
                          min: 0,
                          max: 1,
                          step: 0.01,
                          suffix: "", // 输入框后缀
                        },
                      },
                      {
                        displayName: "振幅",
                        name: "waveAmplitude",
                        type: "number",
                        value: 15,
                        config: {
                          min: 0,
                          max: 100,
                          step: 1,
                          suffix: "",
                        },
                      },
                      {
                        displayName: "相位弧度",
                        name: "wavePhase",
                        type: "number",
                        value: 15,
                        config: {
                          min: 0,
                          max: 1000,
                          step: 1,
                          suffix: "",
                        },
                      },
                      {
                        displayName: "方向",
                        name: "waveDirection",
                        options: [
                          {
                            name: "左",
                            value: "left",
                          },
                          {
                            name: "右",
                            value: "right",
                          },
                        ],
                        type: "select",
                        value: "right",
                      },
                    ],
                  },
                ], // 这个 template 就是 每一列 的模板，防止删除完了后不能添加，
                // 根据不同的组件，需要自定义
              },
              value: [
                {
                  key: "1",
                  displayName: "波纹1",
                  name: "waveSeries1",
                  type: "object",
                  flag: "specialItem",
                  value: [
                    {
                      displayName: "颜色",
                      name: "waveColor",
                      type: "color",
                      value: "#febb00",
                    },
                    {
                      name: "waveHeightSet",
                      displayName: "调整幅度",
                      value: 0.2,
                      type: "range",
                      config: {
                        min: -1,
                        max: 1,
                        step: 0.01,
                        suffix: "", // 输入框后缀
                      },
                    },
                    {
                      name: "waveSpeed",
                      displayName: "速度",
                      value: 0.2,
                      type: "range",
                      config: {
                        min: 0,
                        max: 1,
                        step: 0.01,
                        suffix: "", // 输入框后缀
                      },
                    },
                    {
                      displayName: "振幅",
                      name: "waveAmplitude",
                      type: "number",
                      value: 15,
                      config: {
                        min: 0,
                        max: 100,
                        step: 1,
                        suffix: "",
                      },
                    },
                    {
                      displayName: "相位弧度",
                      name: "wavePhase",
                      type: "number",
                      value: 15,
                      config: {
                        min: 0,
                        max: 1000,
                        step: 1,
                        suffix: "",
                      },
                    },
                    {
                      displayName: "方向",
                      name: "waveDirection",
                      options: [
                        {
                          name: "左",
                          value: "left",
                        },
                        {
                          name: "右",
                          value: "right",
                        },
                      ],
                      type: "select",
                      value: "right",
                    },
                  ],
                },
                {
                  key: "2",
                  displayName: "波纹2",
                  name: "waveSeries2",
                  type: "object",
                  flag: "specialItem",
                  value: [
                    {
                      displayName: "颜色",
                      name: "waveColor",
                      type: "color",
                      value: "#c91780",
                    },
                    {
                      name: "waveHeightSet",
                      displayName: "调整幅度",
                      value: 0,
                      type: "range",
                      config: {
                        min: -1,
                        max: 1,
                        step: 0.01,
                        suffix: "", // 输入框后缀
                      },
                    },
                    {
                      name: "waveSpeed",
                      displayName: "速度",
                      value: 0.2,
                      type: "range",
                      config: {
                        min: 0,
                        max: 1,
                        step: 0.01,
                        suffix: "", // 输入框后缀
                      },
                    },
                    {
                      displayName: "振幅",
                      name: "waveAmplitude",
                      type: "number",
                      value: 15,
                      config: {
                        min: 0,
                        max: 100,
                        step: 1,
                        suffix: "",
                      },
                    },
                    {
                      displayName: "相位弧度",
                      name: "wavePhase",
                      type: "number",
                      value: 15,
                      config: {
                        min: 0,
                        max: 1000,
                        step: 1,
                        suffix: "",
                      },
                    },
                    {
                      displayName: "方向",
                      name: "waveDirection",
                      options: [
                        {
                          name: "左",
                          value: "left",
                        },
                        {
                          name: "右",
                          value: "right",
                        },
                      ],
                      type: "select",
                      value: "right",
                    },
                  ],
                },
              ],
            },

            {
              name: "borderSettings",
              displayName: "边框",
              type: "collapse",
              hasSwitch: false,
              defaultExpand: true, // 是否默认展开
              isHide: false, //该属性设为true表示switch切换带显隐功能，也可不填
              value: [
                {
                  name: "showBorderSettings",
                  displayName: "",
                  value: false,
                  type: "switch",
                },
                {
                  displayName: "颜色",
                  name: "borderColor",
                  type: "color",
                  value: "#febb00",
                },
                {
                  displayName: "粗细",
                  name: "borderWidth",
                  type: "number",
                  value: 2,
                  config: {
                    min: 0,
                    max: 10000,
                    step: 1,
                    suffix: "px",
                  },
                },
                {
                  displayName: "边距",
                  name: "borderGap",
                  type: "number",
                  value: 7,
                  config: {
                    min: 0,
                    max: 1000,
                    step: 1,
                    suffix: "px",
                  },
                },
              ],
            },
          ],
        },
        {
          key: "2",
          name: "指标",
          value: [
            {
              name: "keepDigits",
              displayName: "小数位数",
              value: 2,
              type: "number",
              config: {
                min: 0,
                max: 6,
                step: 1,
              },
            },
            {
              displayName: "文本样式",
              name: "textStyle",
              type: "textFullStyleGroup",
              value: [
                {
                  displayName: "",
                  name: "fontFamily",
                  value: "Microsoft Yahei",
                },
                {
                  displayName: "",
                  name: "fontSize",
                  value: 32,
                },
                {
                  displayName: "",
                  name: "textColor",
                  type: "color",
                  value: "#fff",
                },
                {
                  displayName: "",
                  name: "bold",
                  value: true,
                },
                {
                  displayName: "",
                  name: "italic",
                  value: false,
                },
                {
                  displayName: "字距",
                  name: "letterSpacing",
                  value: 0,
                },
                {
                  displayName: "行距",
                  name: "lineHeight",
                  value: 0,
                },
              ],
            },
            {
              name: "indicatorOffset",
              displayName: "位置",
              type: "inputNumber2",
              showDetail: true, // 是否展示下面的文字说明
              value: [
                {
                  name: "offsetX",
                  displayName: "X",
                  type: "number",
                  value: 50,
                  config: {
                    min: 0,
                    suffix: "%", // 输入框后缀
                  },
                },
                {
                  name: "offsetY",
                  displayName: "Y",
                  type: "number",
                  value: 50,
                  config: {
                    min: 0,
                    suffix: "%", // 输入框后缀
                  },
                },
              ],
            },
            {
              name: "indicatorSuffix",
              displayName: "后缀",
              type: "collapse",
              hasSwitch: false, // 是否有切换按钮
              defaultExpand: true, // 是否默认展开
              isHide: false,
              value: [
                {
                  // 如果有后面的按钮，则该项必须放在第一个
                  name: "showIndicatorSuffix",
                  displayName: "",
                  value: false,
                  type: "switch",
                },
                {
                  name: "suffixText",
                  displayName: "文本",
                  type: "input",
                  value: "",
                },
                {
                  displayName: "文本样式",
                  name: "suffixTextStyle",
                  type: "textFullStyleGroup",
                  value: [
                    {
                      displayName: "",
                      name: "fontFamily",
                      value: "Microsoft Yahei",
                    },
                    {
                      displayName: "",
                      name: "fontSize",
                      value: 32,
                    },
                    {
                      displayName: "",
                      name: "textColor",
                      type: "color",
                      value: "#fff",
                    },
                    {
                      displayName: "",
                      name: "bold",
                      value: true,
                    },
                    {
                      displayName: "",
                      name: "italic",
                      value: false,
                    },
                    {
                      displayName: "字距",
                      name: "letterSpacing",
                      value: 0,
                      config: {
                        disabled: true,
                      },
                    },
                    {
                      displayName: "行距",
                      name: "lineHeight",
                      value: 30,
                      config: {
                        disabled: true,
                      },
                    },
                  ],
                },
                // {
                //   name: "suffixOffset",
                //   displayName: "位置",
                //   type: "inputNumber2",
                //   showDetail: true, // 是否展示下面的文字说明
                //   value: [
                //     {
                //       name: "suffixOffsetX",
                //       displayName: "X",
                //       type: "number",
                //       value: 50,
                //       config: {
                //         min: 0,
                //         suffix: "%", // 输入框后缀
                //       },
                //     },
                //     {
                //       name: "suffixOffsetY",
                //       displayName: "Y",
                //       type: "number",
                //       value: 50,
                //       config: {
                //         min: 0,
                //         suffix: "%", // 输入框后缀
                //       },
                //     },
                //   ],
                // },
              ],
            },
          ],
        },
      ],
    },
  ],
  themes: [
    {
      id: "theme-default",
      name: "系统默认",
    },
    {
      id: "theme-light",
      name: "浅色风格",
    },
    {
      id: "theme-gov-blue",
      name: "政务蓝",
    },
  ],
};

export default componentDefaultConfig;
