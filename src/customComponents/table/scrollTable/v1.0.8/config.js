const ComponentDefaultConfig = {
  moduleType: "table",
  name: "轮播表格",
  moduleName: "scrollTable",
  moduleVersion: "1.0.8",
  triggers: [
    {
      name: "当请求完成或数据变化时",
      value: "dataChange",
    },
    {
      name: "鼠标点击",
      value: "click",
    },
  ],
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
          value: 100,
        },
        {
          displayName: "Y轴坐标",
          name: "top",
          value: 100,
        },
        {
          displayName: "宽度",
          name: "width",
          value: 600,
        },
        {
          displayName: "高度",
          name: "height",
          value: 600,
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
      hasSwitch: false,
      defaultExpand: true,
      displayName: "全局",
      name: "allGlobal",
      type: "collapse",
      value: [
        {
          displayName: "",
          name: "show",
          type: "switch",
          value: false,
        },
        {
          displayName: "表格行数",
          name: "rowNums",
          type: "number",
          config: {
            min: 0,
            max: 24,
            step: 1,
            suffix: "",
          },
          value: 5,
        },
        {
          displayName: "字体",
          name: "fontFamily",
          options: [
            {
              name: "宋体",
              value: "宋体",
            },
            {
              name: "微软雅黑",
              value: "Microsoft Yahei",
            },
            {
              name: "黑体",
              value: "SimHei",
            },
          ],
          type: "select",
          value: "Microsoft Yahei",
        },
      ],
    },
    {
      hasSwitch: false,
      defaultExpand: true,
      displayName: "动画",
      name: "animation",
      type: "collapse",
      value: [
        {
          displayName: "",
          name: "show",
          type: "switch",
          value: true,
        },
        {
          displayName: "是否轮播",
          name: "isScroll",
          type: "switch",
          value: true,
        },
        {
          displayName: "动画模式",
          name: "animationModel",
          options: [
            {
              name: "逐条滚动",
              value: "single",
            },
            {
              name: "整页滚动",
              value: "page",
            },
          ],
          type: "select",
          value: "single",
        },
        {
          displayName: "轮播间隔",
          name: "scrollInterval",
          type: "number",
          config: {
            min: 0,
            max: 24000,
            step: 1000,
            suffix: "ms",
          },
          value: 5000,
        },
      ],
    },
    {
      hasSwitch: true,
      defaultExpand: false,
      displayName: "表头",
      name: "tableHeader",
      type: "collapse",
      value: [
        {
          displayName: "",
          name: "show",
          type: "switch",
          value: true,
        },
        {
          displayName: "背景颜色",
          name: "bgColor",
          type: "color",
          value: "#222430",
        },
        {
          displayName: "渐变色方向",
          name: "gradientOrigin",
          type: "origin",
          config: {
            type: "direction",
          },
          value: "unset",
        },
        {
          displayName: "渐变色-开始",
          name: "gradientStartColor",
          type: "color",
          value: "#222430",
        },
        {
          displayName: "渐变色-结束",
          name: "gradientEndColor",
          type: "color",
          value: "#222430",
        },
        {
          displayName: "文本对齐",
          name: "textAlign",
          type: "alignFull",
          value: [
            {
              displayName: "水平对齐",
              name: "textAlign",
              range: ["left", "center", "right"],
              type: "align",
              value: "left",
            },
          ],
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
              value: 14,
            },
            {
              displayName: "",
              name: "color",
              type: "color",
              value: "#fff",
            },
            {
              displayName: "",
              name: "bold",
              value: false,
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
              config: {
                disabled: true,
              },
              value: "unset",
            },
          ],
        },
      ],
    },
    {
      hasSwitch: true,
      defaultExpand: false,
      displayName: "行配置",
      name: "tableRow",
      type: "collapse",
      value: [
        {
          displayName: "",
          name: "show",
          type: "switch",
          value: true,
        },
        {
          displayName: "奇行背景色",
          name: "evenBgColor",
          type: "color",
          value: "#222430",
        },
        {
          displayName: "偶行背景色",
          name: "oddBgColor",
          type: "color",
          value: "#2a2d3c",
        },
        {
          displayName: "选中背景色",
          name: "selectedBgColor",
          type: "color",
          value: "#383d53",
        },
        {
          displayName: "选中背景图",
          name: "selectedBgImage",
          type: "image",
          value: "",
        },
      ],
    },
    {
      hasSwitch: true,
      defaultExpand: false,
      displayName: "序号列",
      name: "tableIndex",
      type: "collapse",
      value: [
        {
          displayName: "",
          name: "show",
          type: "switch",
          value: true,
        },
        {
          displayName: "标题",
          name: "title",
          type: "input",
          value: "#",
        },
        {
          displayName: "宽度",
          name: "width",
          type: "number",
          value: 150,
          config: {
            min: 0,
            step: 1,
            suffix: "px",
          },
        },
        {
          displayName: "文本对齐",
          name: "textAlign",
          type: "alignFull",
          value: [
            {
              displayName: "水平对齐",
              name: "textAlign",
              range: ["left", "center", "right"],
              type: "align",
              value: "center",
            },
          ],
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
              value: 14,
            },
            {
              displayName: "",
              name: "color",
              type: "color",
              value: "#fff",
            },
            {
              displayName: "",
              name: "bold",
              value: false,
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
              config: {
                disabled: true,
              },
              value: "unset",
            },
          ],
        },
        {
          displayName: "样式指定",
          name: "indexColumnCustomStyle",
          type: "tabArray",
          defaultActiveKey: "1",
          config: {
            template: [
              {
                displayName: "行1",
                name: "tab1",
                type: "object",
                value: [
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
                        value: 14,
                      },
                      {
                        displayName: "",
                        name: "color",
                        type: "color",
                        value: "#fff",
                      },
                      {
                        displayName: "",
                        name: "bold",
                        value: false,
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
                        config: {
                          disabled: true,
                        },
                        value: "unset",
                      },
                    ],
                  },
                  {
                    displayName: "背景大小",
                    name: "bgSize",
                    type: "input2",
                    value: [
                      {
                        displayName: "宽度",
                        name: "width",
                        type: "input",
                        value: "40",
                        config: {
                          suffix: "px",
                        },
                      },
                      {
                        displayName: "高度",
                        name: "height",
                        type: "input",
                        value: "40",
                        config: {
                          suffix: "px",
                        },
                      },
                    ],
                    showDetail: true,
                  },
                  {
                    displayName: "背景色",
                    name: "bgColor",
                    type: "color",
                    value: "rgba(6,16,74,0)",
                  },
                  {
                    displayName: "背景图",
                    name: "bgImg",
                    type: "image",
                    value: "",
                  },
                ],
                key: "1",
              },
            ],
          },
          value: [
            {
              displayName: "行1",
              name: "tab1",
              type: "object",
              value: [
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
                      value: 14,
                    },
                    {
                      displayName: "",
                      name: "color",
                      type: "color",
                      value: "#fff",
                    },
                    {
                      displayName: "",
                      name: "bold",
                      value: false,
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
                      config: {
                        disabled: true,
                      },
                      value: "unset",
                    },
                  ],
                },
                {
                  displayName: "背景大小",
                  name: "bgSize",
                  type: "input2",
                  value: [
                    {
                      displayName: "宽度",
                      name: "width",
                      type: "input",
                      value: "40",
                      config: {
                        suffix: "px",
                      },
                    },
                    {
                      displayName: "高度",
                      name: "height",
                      type: "input",
                      value: "40",
                      config: {
                        suffix: "px",
                      },
                    },
                  ],
                  showDetail: true,
                },
                {
                  displayName: "背景色",
                  name: "bgColor",
                  type: "color",
                  value: "rgba(6,16,74,0)",
                },
                {
                  displayName: "背景图",
                  name: "bgImg",
                  type: "image",
                  value: "",
                },
              ],
              key: "1",
            },
            {
              displayName: "行2",
              name: "tab2",
              type: "object",
              value: [
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
                      value: 14,
                    },
                    {
                      displayName: "",
                      name: "color",
                      type: "color",
                      value: "#fff",
                    },
                    {
                      displayName: "",
                      name: "bold",
                      value: false,
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
                      config: {
                        disabled: true,
                      },
                      value: "unset",
                    },
                  ],
                },
                {
                  displayName: "背景大小",
                  name: "bgSize",
                  type: "input2",
                  value: [
                    {
                      displayName: "宽度",
                      name: "width",
                      type: "input",
                      value: "40",
                      config: {
                        suffix: "px",
                      },
                    },
                    {
                      displayName: "高度",
                      name: "height",
                      type: "input",
                      value: "40",
                      config: {
                        suffix: "px",
                      },
                    },
                  ],
                  showDetail: true,
                },
                {
                  displayName: "背景色",
                  name: "bgColor",
                  type: "color",
                  value: "rgba(6,16,74,0)",
                },
                {
                  displayName: "背景图",
                  name: "bgImg",
                  type: "image",
                  value: "",
                },
              ],
              key: "2",
            },
            {
              displayName: "行3",
              name: "tab3",
              type: "object",
              value: [
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
                      value: 14,
                    },
                    {
                      displayName: "",
                      name: "color",
                      type: "color",
                      value: "#fff",
                    },
                    {
                      displayName: "",
                      name: "bold",
                      value: false,
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
                      config: {
                        disabled: true,
                      },
                      value: "unset",
                    },
                  ],
                },
                {
                  displayName: "背景大小",
                  name: "bgSize",
                  type: "input2",
                  value: [
                    {
                      displayName: "宽度",
                      name: "width",
                      type: "input",
                      value: "40",
                      config: {
                        suffix: "px",
                      },
                    },
                    {
                      displayName: "高度",
                      name: "height",
                      type: "input",
                      value: "40",
                      config: {
                        suffix: "px",
                      },
                    },
                  ],
                  showDetail: true,
                },
                {
                  displayName: "背景色",
                  name: "bgColor",
                  type: "color",
                  value: "rgba(6,16,74,0)",
                },
                {
                  displayName: "背景图",
                  name: "bgImg",
                  type: "image",
                  value: "",
                },
              ],
              key: "3",
            },
          ],
        },
      ],
    },
    {
      displayName: "自定义列",
      name: "customColumn",
      type: "tabArray",
      defaultActiveKey: "1",
      config: {
        template: [
          {
            displayName: "列1",
            name: "tab1",
            type: "object",
            value: [
              {
                displayName: "映射",
                name: "mapping",
                type: "input2",
                value: [
                  {
                    displayName: "字段名",
                    name: "filedName",
                    type: "input",
                    value: "column1",
                  },
                  {
                    displayName: "显示名",
                    name: "displayName",
                    type: "input",
                    value: "销售地区",
                  },
                ],
              },
              {
                displayName: "宽度",
                name: "width",
                type: "number",
                value: 150,
                config: {
                  min: 0,
                  step: 1,
                  suffix: "px",
                },
              },
              {
                displayName: "对齐方式",
                name: "align",
                type: "alignFull",
                value: [
                  {
                    displayName: "水平对齐",
                    name: "textAlign",
                    range: ["left", "center", "right"],
                    type: "align",
                    value: "left",
                  },
                ],
              },
              {
                displayName: "文字溢出",
                name: "overflowType",
                options: [
                  {
                    name: "省略号",
                    value: "ellipsis",
                  },
                  {
                    name: "换行",
                    value: "wrap",
                  },
                ],
                type: "select",
                value: "ellipsis",
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
                    value: 14,
                  },
                  {
                    displayName: "",
                    name: "color",
                    type: "color",
                    value: "#fff",
                  },
                  {
                    displayName: "",
                    name: "bold",
                    value: false,
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
                    config: {
                      disabled: true,
                    },
                    value: "unset",
                  },
                ],
              },
              {
                displayName: "样式指定",
                name: "customStyle",
                type: "tabArray",
                defaultActiveKey: "1",
                config: {
                  template: [
                    {
                      displayName: "1",
                      name: "tab1",
                      type: "object",
                      value: [
                        {
                          displayName: "字段值",
                          name: "filedValue",
                          type: "input",
                          value: "",
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
                              value: 14,
                            },
                            {
                              displayName: "",
                              name: "color",
                              type: "color",
                              value: "#fff",
                            },
                            {
                              displayName: "",
                              name: "bold",
                              value: false,
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
                              value: "unset",
                            },
                          ],
                        },
                      ],
                      key: "1",
                    },
                  ],
                },
                value: [
                  {
                    displayName: "1",
                    name: "tab1",
                    type: "object",
                    value: [
                      {
                        displayName: "字段值",
                        name: "filedValue",
                        type: "input",
                        value: "",
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
                            value: 14,
                          },
                          {
                            displayName: "",
                            name: "color",
                            type: "color",
                            value: "#fff",
                          },
                          {
                            displayName: "",
                            name: "bold",
                            value: false,
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
                            config: {
                              disabled: true,
                            },
                            value: "unset",
                          },
                        ],
                      },
                    ],
                    key: "1",
                  },
                ],
              },
            ],
            key: "1",
          },
        ],
      },
      value: [
        {
          displayName: "列1",
          name: "tab1",
          type: "object",
          value: [
            {
              displayName: "映射",
              name: "mapping",
              type: "input2",
              value: [
                {
                  displayName: "字段名",
                  name: "filedName",
                  type: "input",
                  value: "column1",
                },
                {
                  displayName: "显示名",
                  name: "displayName",
                  type: "input",
                  value: "销售地区",
                },
              ],
            },
            {
              displayName: "宽度",
              name: "width",
              type: "number",
              value: 150,
              config: {
                min: 0,
                step: 1,
                suffix: "px",
              },
            },
            {
              displayName: "对齐方式",
              name: "align",
              type: "alignFull",
              value: [
                {
                  displayName: "水平对齐",
                  name: "textAlign",
                  range: ["left", "center", "right"],
                  type: "align",
                  value: "left",
                },
              ],
            },
            {
              displayName: "文字溢出",
              name: "overflowType",
              options: [
                {
                  name: "省略号",
                  value: "ellipsis",
                },
                {
                  name: "换行",
                  value: "wrap",
                },
              ],
              type: "select",
              value: "ellipsis",
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
                  value: 14,
                },
                {
                  displayName: "",
                  name: "color",
                  type: "color",
                  value: "#fff",
                },
                {
                  displayName: "",
                  name: "bold",
                  value: false,
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
                  value: "unset",
                },
              ],
            },
            {
              displayName: "样式指定",
              name: "customStyle",
              type: "tabArray",
              defaultActiveKey: "1",
              config: {
                template: [
                  {
                    displayName: "1",
                    name: "tab1",
                    type: "object",
                    value: [
                      {
                        displayName: "字段值",
                        name: "filedValue",
                        type: "input",
                        value: "",
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
                            value: 14,
                          },
                          {
                            displayName: "",
                            name: "color",
                            type: "color",
                            value: "#fff",
                          },
                          {
                            displayName: "",
                            name: "bold",
                            value: false,
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
                            config: {
                              disabled: true,
                            },
                            value: "unset",
                          },
                        ],
                      },
                    ],
                    key: "1",
                  },
                ],
              },
              value: [
                {
                  displayName: "1",
                  name: "tab1",
                  type: "object",
                  value: [
                    {
                      displayName: "字段值",
                      name: "filedValue",
                      type: "input",
                      value: "",
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
                          value: 14,
                        },
                        {
                          displayName: "",
                          name: "color",
                          type: "color",
                          value: "#fff",
                        },
                        {
                          displayName: "",
                          name: "bold",
                          value: false,
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
                          config: {
                            disabled: true,
                          },
                          value: "unset",
                        },
                      ],
                    },
                  ],
                  key: "1",
                },
              ],
            },
          ],
          key: "1",
        },
        {
          displayName: "列2",
          name: "tab2",
          type: "object",
          value: [
            {
              displayName: "映射",
              name: "mapping",
              type: "input2",
              value: [
                {
                  displayName: "字段名",
                  name: "filedName",
                  type: "input",
                  value: "column2",
                },
                {
                  displayName: "显示名",
                  name: "displayName",
                  type: "input",
                  value: "完成率",
                },
              ],
            },
            {
              displayName: "宽度",
              name: "width",
              type: "number",
              value: 150,
              config: {
                min: 0,
                step: 1,
                suffix: "px",
              },
            },
            {
              displayName: "对齐方式",
              name: "align",
              type: "alignFull",
              value: [
                {
                  displayName: "水平对齐",
                  name: "textAlign",
                  range: ["left", "center", "right"],
                  type: "align",
                  value: "left",
                },
              ],
            },
            {
              displayName: "文字溢出",
              name: "overflowType",
              options: [
                {
                  name: "省略号",
                  value: "ellipsis",
                },
                {
                  name: "换行",
                  value: "wrap",
                },
              ],
              type: "select",
              value: "ellipsis",
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
                  value: 14,
                },
                {
                  displayName: "",
                  name: "color",
                  type: "color",
                  value: "#fff",
                },
                {
                  displayName: "",
                  name: "bold",
                  value: false,
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
                  config: {
                    disabled: true,
                  },
                  value: "unset",
                },
              ],
            },
            {
              displayName: "样式指定",
              name: "customStyle",
              type: "tabArray",
              defaultActiveKey: "1",
              config: {
                template: [
                  {
                    displayName: "1",
                    name: "tab1",
                    type: "object",
                    value: [
                      {
                        displayName: "字段值",
                        name: "filedValue",
                        type: "input",
                        value: "",
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
                            value: 14,
                          },
                          {
                            displayName: "",
                            name: "color",
                            type: "color",
                            value: "#fff",
                          },
                          {
                            displayName: "",
                            name: "bold",
                            value: false,
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
                            config: {
                              disabled: true,
                            },
                            value: "unset",
                          },
                        ],
                      },
                    ],
                    key: "1",
                  },
                ],
              },
              value: [
                {
                  displayName: "1",
                  name: "tab1",
                  type: "object",
                  value: [
                    {
                      displayName: "字段值",
                      name: "filedValue",
                      type: "input",
                      value: "",
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
                          value: 14,
                        },
                        {
                          displayName: "",
                          name: "color",
                          type: "color",
                          value: "#fff",
                        },
                        {
                          displayName: "",
                          name: "bold",
                          value: false,
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
                          config: {
                            disabled: true,
                          },
                          value: "unset",
                        },
                      ],
                    },
                  ],
                  key: "1",
                },
              ],
            },
          ],
          key: "2",
        },
        {
          displayName: "列3",
          name: "tab3",
          type: "object",
          value: [
            {
              displayName: "映射",
              name: "mapping",
              type: "input2",
              value: [
                {
                  displayName: "字段名",
                  name: "filedName",
                  type: "input",
                  value: "column3",
                },
                {
                  displayName: "显示名",
                  name: "displayName",
                  type: "input",
                  value: "完成情况",
                },
              ],
            },
            {
              displayName: "宽度",
              name: "width",
              type: "number",
              value: 150,
              config: {
                min: 0,
                step: 1,
                suffix: "px",
              },
            },
            {
              displayName: "对齐方式",
              name: "align",
              type: "alignFull",
              value: [
                {
                  displayName: "水平对齐",
                  name: "textAlign",
                  range: ["left", "center", "right"],
                  type: "align",
                  value: "left",
                },
              ],
            },
            {
              displayName: "文字溢出",
              name: "overflowType",
              options: [
                {
                  name: "省略号",
                  value: "ellipsis",
                },
                {
                  name: "换行",
                  value: "wrap",
                },
              ],
              type: "select",
              value: "ellipsis",
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
                  value: 14,
                },
                {
                  displayName: "",
                  name: "color",
                  type: "color",
                  value: "#fff",
                },
                {
                  displayName: "",
                  name: "bold",
                  value: false,
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
                  config: {
                    disabled: true,
                  },
                  value: "unset",
                },
              ],
            },
            {
              displayName: "样式指定",
              name: "customStyle",
              type: "tabArray",
              defaultActiveKey: "1",
              config: {
                template: [
                  {
                    displayName: "1",
                    name: "tab1",
                    type: "object",
                    value: [
                      {
                        displayName: "字段值",
                        name: "filedValue",
                        type: "input",
                        value: "",
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
                            value: 14,
                          },
                          {
                            displayName: "",
                            name: "color",
                            type: "color",
                            value: "#fff",
                          },
                          {
                            displayName: "",
                            name: "bold",
                            value: false,
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
                            config: {
                              disabled: true,
                            },
                            value: "unset",
                          },
                        ],
                      },
                    ],
                    key: "1",
                  },
                ],
              },
              value: [
                {
                  displayName: "1",
                  name: "tab1",
                  type: "object",
                  value: [
                    {
                      displayName: "字段值",
                      name: "filedValue",
                      type: "input",
                      value: "",
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
                          value: 14,
                        },
                        {
                          displayName: "",
                          name: "color",
                          type: "color",
                          value: "#fff",
                        },
                        {
                          displayName: "",
                          name: "bold",
                          value: false,
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
                          config: {
                            disabled: true,
                          },
                          value: "unset",
                        },
                      ],
                    },
                  ],
                  key: "1",
                },
              ],
            },
          ],
          key: "3",
        },
      ],
    },
  ],
  dataConfig: {},
  autoUpdate: {},
  dataType: "static",
  staticData: {
    data: [
      {
        column1: "北京",
        column3: "超预期",
        column2: 87.2,
      },
      {
        column1: "上海",
        column3: "达标",
        column2: 80.5,
      },
      {
        column1: "杭州",
        column3: "达标",
        column2: 72.3,
      },
      {
        column1: "重庆",
        column3: "未达标",
        column2: 65.5,
      },
      {
        column1: "成都",
        column3: "未达标",
        column2: 58.4,
      },
      {
        column1: "厦门",
        column3: "未达标",
        column2: 52.5,
      },
      {
        column1: "云南",
        column3: "未达标",
        column2: 40.2,
      },
    ],
    fields: [
      {
        name: "column1",
        value: "column1",
        desc: "文本",
      },
      {
        name: "column2",
        value: "column2",
        desc: "文本",
      },
      {
        name: "column3",
        value: "column3",
        desc: "文本",
      },
      {
        name: "column4",
        value: "column4",
        desc: "文本",
      },
      {
        name: "column5",
        value: "column5",
        desc: "文本",
      },
    ],
  },
  events: [],
  useFilter: false,
  filters: [],
  actions: [],
  parent: null,
  dataContainers: [],
  dataFrom: 0,
  callbackArgs: [],
  drillDownArr: [],
  websocketConfig: [],
};

export default ComponentDefaultConfig;
