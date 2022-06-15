export const defaultData = {
  moduleDefaultConfig: [],
  dashboardId: '',
  dashboardName: '',
  currentDblTimes: 0,
  isCanClearAllStatus: true,
  key: [],
  isShowRightMenu: false,
  rightMenuInfo: { x: 0, y: 0, id: null, isFolder: false },
  lastRightClick: '',
  isMultipleTree: false,
  operate: '',
  treeData: [],
  selectedComponentOrGroup: [],
  isSupportMultiple: false,
  selectedComponentIds: [],
  allComponentRefs: {},
  allComponentDOMs: {},
  selectedComponents: [],
  selectedComponentRefs: {},
  selectedComponentDOMs: {},
  dragStatus: '',
  dataContainerList: [],
  dataContainerDataList: [],
  supportLinePositionInfo: {
    x: 100,
    y: 200,
  },
  supportLinesRef: null,
  scaleDragCompRef: null,
  scaleDragData: {
    position: {
      x: 0,
      y: 0,
    },
    style: {
      display: 'none',
      width: 100,
      height: 100,
    },
  },
  components: [],
  componentLayers: [],
  treeRef: null,
  canvasScaleValue: 0,
  canvasDraggablePosition: {
    x: 0,
    y: 0,
  },
  dashboardConfig: [
    {
      name: 'recommend',
      displayName: '屏幕大小',
      value: '0',
      options: [
        {
          name: '大屏推荐尺寸1920*1080',
          value: '0',
        },
        {
          name: 'web最常见尺寸1366*768',
          value: '1',
        },
        {
          name: 'web最小尺寸1024*768',
          value: '2',
        },
        {
          name: '自定义',
          value: '4',
        },
      ],
      width: 1920,
      height: 1080,
    },
    {
      name: 'styleColor',
      displayName: '背景',
      value: '#222430', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
    },
    {
      name: 'backgroundImg',
      displayName: '背景图',
      value: '', // 有背景图则返回背景图的url，没有背景图返回空或者null
    },
    {
      name: 'gridSpacing',
      displayName: '栅格间距',
      value: 5,
      type: 'number',
      config: {
        min: 0,
        step: 1,
        suffix: '', // 输入框后缀
      },
    },
    {
      name: 'zoom',
      displayName: '缩放设置',
      value: '0',
      type: 'radioGroup',
      direction: 'vertical', // 方向
      options: [
        {
          name: '按屏幕比例适配',
          value: '0',
        },
        {
          name: '强制铺满',
          value: '1',
        },
        {
          name: '原比例展示溢出滚动',
          value: '2',
        },
      ],
    },
    {
      name: 'thumbImg',
      displayName: '封面',
      value: '',
    },
  ],
  groupConfig: [
    {
      name: 'dimension',
      displayName: '位置尺寸',
      config: {
        lock: false,
      },
      value: [
        {
          name: 'left',
          displayName: 'X轴坐标',
          value: 900,
          type: 'number',
          config: {
            suffix: 'X',
          },
        },
        {
          name: 'top',
          displayName: 'Y轴坐标',
          value: 900,
          type: 'number',
          config: {
            suffix: 'Y',
          },
        },
        {
          name: 'width',
          displayName: '宽度',
          value: 100,
          type: 'number',
          config: {
            suffix: 'W',
          },
        },
        {
          name: 'height',
          displayName: '高度',
          value: 100,
          type: 'number',
          config: {
            suffix: 'H',
          },
        },
      ],
    },
    {
      name: 'hideDefault',
      displayName: '默认隐藏',
      value: false,
    },
    {
      name: 'opacity',
      displayName: '透明度',
      value: 100,
    },
    {
      name: 'interaction',
      displayName: '交互',
      value: {
        // 该部分实际上来自于layers设置
        mountAnimation: {
          // 如果不存在载入动画，该项为null
          delay: 2, // 延迟
          direction: 'right', // 方向
          duration: 304, // 持续时间(ms)
          opacityOpen: true, // 渐隐渐现
          timingFunction: 'ease', // 速率
          type: 'slide', // 动画类型
        },
      },
    },
  ],
  componentConfig: {},
  sizeChange: {
    change: false,
    config: {
      left: 100,
      top: 100,
      width: 100,
      height: 100,
    },
  },
  isAreaChoose: false,
  rulerLines: [
    // {
    //   position: {
    //     x: 0,
    //     y: 0,
    //   },
    //   direction: 'horizon',
    //   display: 'block',
    // },
    // {
    //   position: {
    //     x: 0,
    //     y: 0,
    //   },
    //   direction: 'vertical',
    //   display: 'block',
    // },
  ],
  leftMenuWidth: 250,
  componentData: {},
  componentFilters: [],
  callbackArgs: {},
  callbackParamsList: [
    {
      "callbackParam": "startTime",   // 变量名
      "destinationModules": [  // 目标组件
        {
          "id": "1536257848293773314",
          "name": "时间选择器"
        },
        {
          "id": "1536550487244312577",
          "name": "时间选择器3"
        },
      ],
      "sourceModules": [ // 源组件
        {
          "id": "1536284085041025026",
          "name": "时间选择器2"
        }
      ]
    },
    {
      "callbackParam": "endTime",   // 变量名
      "destinationModules": [  // 目标组件
        {
          "id": "1536257848293773314",
          "name": "时间选择器"
        }
      ],
      "sourceModules": [ // 源组件
        {
          "id": "1536284085041025026",
          "name": "时间选择器2"
        }
      ]
    },
  ]
}

export interface IBarState {
  moduleDefaultConfig: any[],
  dashboardId: string;
  dashboardName: string;
  key: string[];
  isShowRightMenu: boolean;
  rightMenuInfo: any;
  operate: string;
  lastRightClick: string;
  treeData: any[];
  components: any[];
  isSupportMultiple: boolean;
  selectedComponentOrGroup: any[];
  selectedComponentIds: string[];
  componentLayers: any;
  selectedComponentRefs: any;
  selectedComponentDOMs: any;
  supportLinesRef: any;
  scaleDragCompRef: any;
  selectedComponents: any;
  scaleDragData: any;
  componentConfig: any;
  groupConfig: any;
  isMultipleTree: boolean;
  allComponentRefs: any;
  allComponentDOMs: any;
  isAreaChoose: boolean;
  rulerLines: Array<{
    position: {
      x: number;
      y: number;
    };
    direction: 'horizon' | 'vertical';
    display: 'none' | 'block';
  }>;
  currentDblTimes: number;
  isCanClearAllStatus: boolean;
  leftMenuWidth: number;
  canvasDraggablePosition: {
    x: number,
    y: number
  };
  componentData: any;
  dataContainerList: any;
  dataContainerDataList: any;
  componentFilters: any;
}