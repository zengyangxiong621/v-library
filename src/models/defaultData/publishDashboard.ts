export const defaultData = {
  dashboardId: "",
  dashboardName: "",
  treeData: [],
  components: [],
  panels: [],
  canvasScaleValue: 0,
  dataContainerList: [],
  dataContainerDataList: [],
  dashboardConfig: [
    {
      name: "recommend",
      displayName: "屏幕大小",
      value: "0",
      options: [
        {
          name: "大屏推荐尺寸1920*1080",
          value: "0",
        },
        {
          name: "web最常见尺寸1366*768",
          value: "1",
        },
        {
          name: "web最小尺寸1024*768",
          value: "2",
        },
        {
          name: "自定义",
          value: "4",
        },
      ],
      width: 1920,
      height: 1080,
    },
    {
      name: "styleColor",
      displayName: "背景",
      value: "#222430", // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
    },
    {
      name: "backgroundImg",
      displayName: "背景图",
      value: "", // 有背景图则返回背景图的url，没有背景图返回空或者null
    },
    {
      name: "gridSpacing",
      displayName: "栅格间距",
      value: 5,
      type: "number",
      config: {
        min: 0,
        step: 1,
        suffix: "", // 输入框后缀
      },
    },
    {
      name: "zoom",
      displayName: "缩放设置",
      value: "0",
      type: "radioGroup",
      direction: "vertical", // 方向
      options: [
        {
          name: "按屏幕比例适配",
          value: "0",
        },
        {
          name: "强制铺满",
          value: "1",
        },
        {
          name: "原比例展示溢出滚动",
          value: "2",
        },
      ],
    },
    {
      name: "thumbImg",
      displayName: "封面",
      value: "",
    },
  ],
  componentData: {}, // 组件数据，存放方式为{componentId: data}
  currentActiveCompoentData: {},  // 组件当前状态下的数据，用于编辑时画布中的回调参数，存放方式为{componentId: data}
  componentFilters: [],
  callbackArgs: {},
  callbackParamsList: [],
  pass: '',
}
