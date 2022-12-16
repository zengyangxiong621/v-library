const ComponentDefaultConfig = {
  id: "", //组件ID
  uniqueTag: "24e1b3a2-60e0-4cef-8a5d-f04fd645f14b", // =========
  name: "排行条形图", //图层名称
  parentId: "", // 父组件 像是2D地图、3D地图 =================
  dashboardId: "", //画布id

  moduleName: "rankingBar", //组件标识
  moduleVersion: "1.1.7", //组件版本号
  moduleType: "chart",

  createdAt: "2022-04-02T07:22:31.290Z", // =========
  updatedAt: "2022-04-02T07:22:39.798Z", // =========
  triggers: [
    // 下面是合集
    {
      name: "当请求完成或数据变化时",
      value: "dataChange",
    },
    {
      name: "鼠标点击",
      value: "click",
    },
  ],

  autoUpdate: { isAuto: false, interval: 10 }, // =========
  thumb: "", // 缩略图 // =========
  dataFrom: 0,
  dataConfig: {}, //数据源配置
  dataType: "static", //数据类型：static;mysql;api;clickhouse
  dataContainers: [],
  staticData: {
    data: [
      {
        classify: "河北",
        numerical: 13830,
      },
      {
        classify: "北京",
        numerical: 18200,
      },
      {
        classify: "江苏",
        numerical: 17000,
      },
      {
        classify: "广东",
        numerical: 15900,
      },
      {
        classify: "浙江",
        numerical: 17100,
      },
    ],
    fields: [
      {
        name: "classify",
        value: "classify",
        desc: "分类",
      },
      {
        name: "numerical",
        value: "numerical",
        desc: "数值",
      },
    ],
  },
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
          value: 267,
        },
        {
          displayName: "Y轴坐标",
          name: "top",
          value: 73,
        },
        {
          displayName: "宽度",
          name: "width",
          value: 800,
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
      name: "allSettings",
      displayName: "全部设置",
      type: "tabs",
      activeKey: "1",
      options: [
        {
          key: "tubiao",
          name: "图表",
          value: [
            {
              name: "batteryStyle",
              displayName: "电池风格",
              type: "switch",
              value: true,
            },
            {
              name: "spacing",
              displayName: "边距",
              type: "padding",
              value: {
                top: 50,
                right: 50,
                bottom: 50,
                left: 50,
              },
            },
            {
              name: "autoSort",
              displayName: "自动排序",
              type: "checkBox",
              value: false,
            },
            {
              name: "sortOrder",
              displayName: "排序方式",
              type: "select",
              value: "DESC",
              options: [
                {
                  name: "降序",
                  value: "DESC",
                },
                {
                  name: "升序",
                  value: "ASC",
                },
              ],
            },
            {
              name: "maxBars",
              displayName: "最大条数",
              value: 5,
              type: "number",
              config: {
                min: 1,
                step: 1,
                suffix: "条", // 输入框后缀
              },
            },
            {
              name: "animation",
              displayName: "轮播动画",
              type: "collapse",
              hasSwitch: true,
              defaultExpand: false,
              value: [
                {
                  name: "show",
                  displayName: "",
                  value: true,
                  type: "switch",
                },
                {
                  name: "intervalTime",
                  displayName: "间隔时间",
                  type: "number",
                  value: 5,
                  config: {
                    min: 1,
                    max: 1000,
                    suffix: "s",
                  },
                },
              ],
            },
            {
              name: "hyperlinks",
              displayName: "超链接",
              type: "collapse",
              hasSwitch: true,
              defaultExpand: false,
              value: [
                {
                  name: "show",
                  displayName: "",
                  value: false,
                  type: "switch",
                },
                {
                  name: "baseUrl",
                  displayName: "baseUrl",
                  type: "input",
                  value: "",
                },
                {
                  name: "field",
                  displayName: "参数字段",
                  type: "input",
                  value: "",
                },
              ],
            },
          ],
        },
        {
          key: "wenben",
          name: "文本",
          value: [
            {
              name: "classify",
              displayName: "类目",
              type: "collapse",
              hasSwitch: false,
              defaultExpand: false,
              value: [
                {
                  name: "show",
                  displayName: "",
                  value: true,
                  type: "switch",
                },
                {
                  name: "font",
                  displayName: "文本样式",
                  type: "textFullStyleGroup",
                  value: [
                    {
                      name: "fontFamily",
                      displayName: "",
                      value: "Microsoft Yahei",
                    },
                    {
                      name: "fontSize",
                      displayName: "",
                      value: 12,
                    },
                    {
                      name: "themeTextColor",
                      displayName: "",
                      type: "color",
                      value: "#fff",
                    },
                    {
                      name: "bold",
                      displayName: "",
                      value: false,
                    },
                    {
                      name: "italic",
                      displayName: "",
                      value: false,
                    },
                    {
                      name: "letterSpacing",
                      displayName: "字距",
                      value: 0,
                    },
                    {
                      name: "lineHeight",
                      displayName: "行距",
                      value: 20,
                    },
                  ],
                },
                {
                  name: "offset",
                  displayName: "偏移",
                  type: "inputNumber2",
                  showDetail: true,
                  value: [
                    {
                      name: "offsetX",
                      displayName: "X",
                      type: "number",
                      value: -30,
                      config: {
                        min: -10000,
                        max: 10000,
                        suffix: "px",
                      },
                    },
                    {
                      name: "offsetY",
                      displayName: "Y",
                      type: "number",
                      value: 40,
                      config: {
                        min: -10000,
                        max: 10000,
                        suffix: "%",
                      },
                    },
                  ],
                },
              ],
            },
            {
              name: "numerical",
              displayName: "数值",
              type: "collapse",
              hasSwitch: false,
              defaultExpand: false,
              value: [
                {
                  name: "show",
                  displayName: "",
                  value: true,
                  type: "switch",
                },
                {
                  name: "font",
                  displayName: "文本样式",
                  type: "textFullStyleGroup",
                  value: [
                    {
                      name: "fontFamily",
                      displayName: "",
                      value: "Microsoft Yahei",
                    },
                    {
                      name: "fontSize",
                      displayName: "",
                      value: 12,
                    },
                    {
                      name: "themeTextColor",
                      displayName: "",
                      type: "color",
                      value: "#fff",
                    },
                    {
                      name: "bold",
                      displayName: "",
                      value: false,
                    },
                    {
                      name: "italic",
                      displayName: "",
                      value: false,
                    },
                    {
                      name: "letterSpacing",
                      displayName: "字距",
                      value: 0,
                    },
                    {
                      name: "lineHeight",
                      displayName: "行距",
                      value: 20,
                    },
                  ],
                },
                {
                  name: "offset",
                  displayName: "偏移",
                  type: "inputNumber2",
                  showDetail: true,
                  value: [
                    {
                      name: "offsetX",
                      displayName: "X",
                      type: "number",
                      value: 102,
                      config: {
                        min: -10000,
                        max: 10000,
                        suffix: "%",
                      },
                    },
                    {
                      name: "offsetY",
                      displayName: "Y",
                      type: "number",
                      value: 0,
                      config: {
                        min: -10000,
                        max: 10000,
                        suffix: "px",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          key: "barSetting",
          name: "柱状",
          value: [
            {
              name: "barWidth",
              displayName: "柱状宽度",
              type: "collapse",
              hasSwitch: false, // 是否有切换按钮
              defaultExpand: false, // 是否默认展开
              value: [
                {
                  // 如果有后面的按钮，则该项必须放在第一个
                  name: "show",
                  displayName: "",
                  value: true,
                  type: "switch",
                },
                {
                  name: "unit",
                  displayName: "宽度单位",
                  type: "radioGroup",
                  direction: "horizontal", // 方向
                  value: "%",
                  options: [
                    {
                      name: "px",
                      value: "px",
                    },
                    {
                      name: "百分比",
                      value: "%",
                    },
                  ],
                },
                {
                  name: "width",
                  displayName: "宽度",
                  value: 30,
                  type: "number",
                  config: {
                    min: 1,
                    max: 100,
                    step: 1,
                    suffix: "", // 输入框后缀
                  },
                },
              ],
            },
            {
              name: "symbolMargin",
              displayName: "分割宽度",
              value: 2,
              type: "number",
              config: {
                min: 1,
                max: 10000,
                step: 1,
                suffix: "px", // 输入框后缀
              },
            },
            {
              name: "colorSetting",
              displayName: "颜色",
              type: "collapse",
              hasSwitch: false,
              defaultExpand: false,
              value: [
                {
                  name: "show",
                  displayName: "",
                  value: true,
                  type: "switch",
                },
                {
                  name: "bySystem",
                  displayName: "系统自定",
                  type: "switch",
                  value: true,
                },
                {
                  name: "barColor",
                  displayName: "柱状颜色",
                  type: "collapse",
                  hasSwitch: false, // 是否有切换按钮
                  defaultExpand: false, // 是否默认展开
                  value: [
                    {
                      // 如果有后面的按钮，则该项必须放在第一个
                      name: "show",
                      displayName: "",
                      value: true,
                      type: "switch",
                    },
                    {
                      name: "type",
                      displayName: "颜色类型",
                      type: "radioGroup",
                      direction: "horizontal", // 方向
                      value: "pure",
                      options: [
                        {
                          name: "纯色",
                          value: "pure",
                        },
                        {
                          name: "渐变色",
                          value: "gradient",
                        },
                      ],
                    },
                    {
                      name: "themePureColor",
                      displayName: "纯色",
                      value: "#1890ff",
                      type: "color",
                    },
                    {
                      name: "themeGradientColorStart",
                      displayName: "渐变色(始)",
                      value: "#335DA3",
                      type: "color",
                    },
                    {
                      name: "themeGradientColorEnd",
                      displayName: "渐变色(末)",
                      value: "#95D0FF",
                      type: "color",
                    },
                    {
                      name: "splitLineColor",
                      displayName: "分割线",
                      value: "#102862",
                      type: "color",
                    },
                  ],
                },
                {
                  name: "bgColor",
                  displayName: "背景颜色",
                  value: "rgba(230,247,255,0.1)",
                  type: "color",
                },
              ],
            },
            {
              name: "isRadius",
              displayName: "圆角柱状",
              type: "switch",
              value: false,
            },
            {
              name: "highLight",
              displayName: "头部高亮",
              type: "collapse",
              hasSwitch: true,
              defaultExpand: false,
              value: [
                {
                  name: "show",
                  displayName: "",
                  value: false,
                  type: "switch",
                },
                {
                  name: "icon",
                  displayName: "图标",
                  type: "image",
                  value:
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAMAAADWZboaAAAAZlBMVEUAAABe3uVe3+Vf3uVf3+Zf3uVg3+Zg3+Zf3+Vi4OZh4OZg3+Z86/Bh3+Zi4Odj4Odi4OZ86/B76/B86/Bj4ed56+9x5+xn4umB7/N87PB36e+A7/N+7fF/7vJ/7vJ+7fGA7/OB7/PReX+lAAAAIXRSTlMABQkVDREmIhk3MR10LEFFPHh7cUprXE35h2XnqMLAp+mHAG9cAAAB5ElEQVRIx83WjU7CMBQFYIoiKMqU/XUboHv/l/Tce7t2XamDNSacETEmX86tlK2rx4py150o+MstMBLwWRfHKo6JCVxLnvmFGBjFQ58oF1//sUZhGy/ClSTWObgnL4O+bkeN4nY2okfNMbkRt9/vtxz8InoTsWplJSCzFxPmO8+GpSIByX3YQAuGDWtRKhKjCnxDXhF6Z4yxnZ20Wgko7BMRDmxtSGVaI4kdTIgb+zTYoJQlIMlDlmUFgrcDWWC201qSayqlTkiCddWWeV62VU0YlnpRi9VOKaSUsiyq/N0krwq2Ugt7lVpZl5BfHNiytjagMi+XYp0kCR45hMlivVQrE/uU5pXSrCB5bM6d1t2lOZItMqmliT3q5uVxqxzyW/ccfYLNKx7ZTeykMvNyac2yt2Fbc61MHLSC0rwoxbiNdlQ3GBm1NLHQsHUrtEXppR/ljNpW6DbSCoqlFiVoN6YdaFlgsSFVPs1BdT8OaB5QyQzVcaqWDows/zepxR8ObLglTrdtCRVuRNj4Rrxh+//0ke2f8KVL+Kon3GCSbmsJN9OUW3j6g0Ns+LgCij2u0h+Sghc8mlMPBMgdx5DFh59VmOVHrvmDnoNxCz3J7MFWsMuaLyR089xz/xhlfijvwutR8gv3zk6BLUUeCgAAAABJRU5ErkJggg==", // 有背景图则返回背景图的url，没有背景图返回空或者null
                },
                {
                  name: "radius",
                  displayName: "半径",
                  value: 60,
                  type: "number",
                  config: {
                    min: 0,
                    max: 1000,
                    step: 1,
                    suffix: "px", // 输入框后缀
                  },
                },
                {
                  name: "offset",
                  displayName: "偏移",
                  value: 20,
                  type: "number",
                  config: {
                    min: 0,
                    max: 1000,
                    step: 1,
                    suffix: "px", // 输入框后缀
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],

  useFilter: false,
  filters: [],
  events: [],
  callbackArgs: [],
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

export default ComponentDefaultConfig;
