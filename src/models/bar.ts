/* eslint-disable import/no-anonymous-default-export */
import {
  selectSingleComponent,
  findParentNode,
  calculateGroupPosition,
  findNode,
  moveChildrenComponents,
  mergeComponentLayers,
  layerComponentsFlat,
} from '../utils'

import {
  generateTreeData,
  placeTop,
  placeBottom,
  moveUp,
  moveDown,
  remove,
  // copy,
  lock,
  singleShowLayer,
  group,
  cancelGroup,
  reName,
  showInput,
  hidden,
} from '../utils/sideBar'

interface IBarState {
  key: string[];
  isFolder: boolean;
  operate: string;
  lastRightClick: string;
  treeData: any[];
  components: any[];
  isSupportMultiple: boolean;
  selectedComponentOrGroup: any[];
  selectedComponentIds: string[];
  componentLayers: any;
  selectedComponentRefs: any;
  supportLinesRef: any;
  selectedComponents: any;
  scaleDragData: any;
  componentConfig:any
}

export default {
  namespace: 'bar',
  state: {
    key: [],
    isFolder: false,
    lastRightClick: '',
    operate: '',
    treeData: [],
    selectedComponentOrGroup: [],
    isSupportMultiple: false,
    selectedComponentIds: [],
    allComponentRefs: {},
    selectedComponents: [],
    selectedComponentRefs: {},
    dragStatus: '',
    supportLinePositionInfo: {
      x: 100,
      y: 200,
    },
    supportLinesRef: null,
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
    components: [
      {
        'config': [
          // 样式配置
          {
            'name': 'dimension',
            'displayName': '位置尺寸',
            'type': 'dimensionGroup',
            'config': {
              'lock': false,
            },
            'value': [
              {
                'name': 'left',
                'displayName': 'X轴坐标',
                'value': 100,
                type: 'number',
                config: {
                  suffix: 'X'
                }
              },
              {
                'name': 'top',
                'displayName': 'Y轴坐标',
                'value': 100,
                type: 'number',
                config: {
                  suffix: 'Y'
                }
              },
              {
                'name': 'width',
                'displayName': '宽度',
                'value': 100,
                type: 'number',
                config: {
                  suffix: 'W'
                }
              },
              {
                'name': 'height',
                'displayName': '高度',
                'value': 100,
                type: 'number',
                config: {
                  suffix: 'H'
                }
              },
            ],
          },
          {
            'name': 'hideDefault',
            'displayName': '默认隐藏',
            'type': 'checkBox',
            'value': false,
          },
          {
            'name': 'textStyle',
            'displayName': '文本样式',
            'type': 'textFullStyleGroup',
            'value': [
              {
                'name': 'fontFamily',
                'displayName': '',
                'value': 'Microsoft Yahei',
              },
              {
                'name': 'fontSize',
                'displayName': '',
                'value': 32,
              },
              {
                'name': 'color',
                'displayName': '',
                'type': 'color',
                'value': '#000', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
              },
              {
                'name': 'bold',
                'displayName': '',
                'value': false,
              },
              {
                'name': 'italic',
                'displayName': '',
                'value': false,
              },
              {
                'name': 'letterSpacing',
                'displayName': '字距',
                'value': 0,
              },
              {
                'name': 'lineHeight',
                'displayName': '行距',
                'value': 'unset',
              },
            ],
          },
          {
            'name': 'align',
            'displayName': '对齐方式',
            'type': 'alignFull',
            'value': [
              {
                'name': 'textAlign',
                'displayName': '水平对齐',
                'type': 'align',
                'value': 'left', // left , center, right,bothEnds
              },
              {
                'name': 'textVertical',
                'displayName': '垂直对齐',
                'type': 'vertical',
                'value': 'top', // top bottom vertical
              },
            ],
          },
          {
            'name': 'shadow',
            'displayName': '阴影',
            'type': 'collapse',
            'hasSwitch':true,
            'defaultExpand':true,
            'value': [
              {
                'name': 'show',
                'displayName': '',
                'value': true,
                'type': 'switch',
              },
              {
                'name': 'shadow',
                'displayName': '外阴影',
                'type': 'boxShadow',
                'value': {
                  'color': '#0075FF', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
                  'vShadow': 0, // 垂直阴影的位置
                  'hShadow': 0, // 水平阴影的位置
                  'blur': 8, // 模糊的距离
                },
              },
            ],
          },
        ],
        'dataConfig': {}, //数据源配置
        'dataType': 'static', //数据类型：static;mysql;api;clickhouse
        'id': 'components_1-2', //组件ID
        'moduleName': 'textV2', //组件标识
        'moduleVersion': '1.1.0', //组件版本号
        'name': '标题', //图层名称
        'parent': '', //组件父级配置
        'dashboardId': '11', //画布id
        'staticData': {
          //静态数据
          'data': [
            {
              'text': '我是文字组件111',
            },
          ],
          'fields': [
            {
              'name': 'text',
              'value': 'text',
              'desc': '文本',
              'status': true, // 状态
            },
          ],
        },
        'interaction': { // 交互
          'mountAnimation': {
            // 如果不存在载入动画，该项为null
            'delay': 2, // 延迟
            'direction': 'right', // 方向
            'duration': 304, // 持续时间(ms)
            'opacityOpen': true, // 渐隐渐现
            'timingFunction': 'ease', // 速率
            'type': 'slide', // 动画类型
          },
        },
      },
      {
        'config': [
          // 样式配置
          {
            'name': 'dimension',
            'displayName': '位置尺寸',
            'type': 'dimensionGroup',
            'config': {
              'lock': false,
            },
            'value': [
              {
                'name': 'left',
                'displayName': 'X轴坐标',
                'value': 100,
                type: 'number',
                config: {
                  suffix: 'X'
                }
              },
              {
                'name': 'top',
                'displayName': 'Y轴坐标',
                'value': 100,
                type: 'number',
                config: {
                  suffix: 'Y'
                }
              },
              {
                'name': 'width',
                'displayName': '宽度',
                'value': 100,
                type: 'number',
                config: {
                  suffix: 'W'
                }
              },
              {
                'name': 'height',
                'displayName': '高度',
                'value': 100,
                type: 'number',
                config: {
                  suffix: 'H'
                }
              },
            ],
          },
          {
            'name': 'hideDefault',
            'displayName': '默认隐藏',
            'type': 'checkBox',
            'value': false,
          },
          {
            'name': 'textStyle',
            'displayName': '文本样式',
            'type': 'textFullStyleGroup',
            'value': [
              {
                'name': 'fontFamily',
                'displayName': '',
                'value': 'Microsoft Yahei',
              },
              {
                'name': 'fontSize',
                'displayName': '',
                'value': 32,
              },
              {
                'name': 'color',
                'displayName': '',
                'type': 'color',
                'value': '#000', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
              },
              {
                'name': 'bold',
                'displayName': '',
                'value': false,
              },
              {
                'name': 'italic',
                'displayName': '',
                'value': false,
              },
              {
                'name': 'letterSpacing',
                'displayName': '字距',
                'value': 0,
              },
              {
                'name': 'lineHeight',
                'displayName': '行距',
                'value': 'unset',
              },
            ],
          },
          {
            'name': 'align',
            'displayName': '对齐方式',
            'type': 'alignFull',
            'value': [
              {
                'name': 'textAlign',
                'displayName': '水平对齐',
                'type': 'align',
                'value': 'left', // left , center, right,bothEnds
              },
              {
                'name': 'textVertical',
                'displayName': '垂直对齐',
                'type': 'vertical',
                'value': 'top', // top bottom vertical
              },
            ],
          },
          {
            'name': 'shadow',
            'displayName': '阴影',
            'type': 'collapse',
            'hasSwitch':true,
            'defaultExpand':true,
            'value': [
              {
                'name': 'show',
                'displayName': '',
                'value': true,
                'type': 'switch',
              },
              {
                'name': 'shadow',
                'displayName': '外阴影',
                'type': 'boxShadow',
                'value': {
                  'color': '#0075FF', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
                  'vShadow': 0, // 垂直阴影的位置
                  'hShadow': 0, // 水平阴影的位置
                  'blur': 8, // 模糊的距离
                },
              },
            ],
          },
        ],
        'dataConfig': {}, //数据源配置
        'dataType': 'static', //数据类型：static;mysql;api;clickhouse
        'id': 'components_1-3', //组件ID
        'moduleName': 'textV2', //组件标识
        'moduleVersion': '1.1.0', //组件版本号
        'name': '标题', //图层名称
        'parent': '', //组件父级配置
        'dashboardId': '11', //画布id
        'staticData': {
          //静态数据
          'data': [
            {
              'text': '我是文字组件111',
            },
          ],
          'fields': [
            {
              'name': 'text',
              'value': 'text',
              'desc': '文本',
              'status': true, // 状态
            },
          ],
        },
        'interaction': { // 交互
          'mountAnimation': {
            // 如果不存在载入动画，该项为null
            'delay': 2, // 延迟
            'direction': 'right', // 方向
            'duration': 304, // 持续时间(ms)
            'opacityOpen': true, // 渐隐渐现
            'timingFunction': 'ease', // 速率
            'type': 'slide', // 动画类型
          },
        },
      },
      {
        'config': [
          // 样式配置
          {
            'name': 'dimension',
            'displayName': '位置尺寸',
            'type': 'dimensionGroup',
            'config': {
              'lock': false,
            },
            'value': [
              {
                'name': 'left',
                'displayName': 'X轴坐标',
                'value': 100,
                type: 'number',
                config: {
                  suffix: 'X'
                }
              },
              {
                'name': 'top',
                'displayName': 'Y轴坐标',
                'value': 100,
                type: 'number',
                config: {
                  suffix: 'Y'
                }
              },
              {
                'name': 'width',
                'displayName': '宽度',
                'value': 100,
                type: 'number',
                config: {
                  suffix: 'W'
                }
              },
              {
                'name': 'height',
                'displayName': '高度',
                'value': 100,
                type: 'number',
                config: {
                  suffix: 'H'
                }
              },
            ],
          },
          {
            'name': 'hideDefault',
            'displayName': '默认隐藏',
            'type': 'checkBox',
            'value': false,
          },
          {
            'name': 'textStyle',
            'displayName': '文本样式',
            'type': 'textFullStyleGroup',
            'value': [
              {
                'name': 'fontFamily',
                'displayName': '',
                'value': 'Microsoft Yahei',
              },
              {
                'name': 'fontSize',
                'displayName': '',
                'value': 32,
              },
              {
                'name': 'color',
                'displayName': '',
                'type': 'color',
                'value': '#000', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
              },
              {
                'name': 'bold',
                'displayName': '',
                'value': false,
              },
              {
                'name': 'italic',
                'displayName': '',
                'value': false,
              },
              {
                'name': 'letterSpacing',
                'displayName': '字距',
                'value': 0,
              },
              {
                'name': 'lineHeight',
                'displayName': '行距',
                'value': 'unset',
              },
            ],
          },
          {
            'name': 'align',
            'displayName': '对齐方式',
            'type': 'alignFull',
            'value': [
              {
                'name': 'textAlign',
                'displayName': '水平对齐',
                'type': 'align',
                'value': 'left', // left , center, right,bothEnds
              },
              {
                'name': 'textVertical',
                'displayName': '垂直对齐',
                'type': 'vertical',
                'value': 'top', // top bottom vertical
              },
            ],
          },
          {
            'name': 'shadow',
            'displayName': '阴影',
            'type': 'collapse',
            'hasSwitch':true,
            'defaultExpand':true,
            'value': [
              {
                'name': 'show',
                'displayName': '',
                'value': true,
                'type': 'switch',
              },
              {
                'name': 'shadow',
                'displayName': '外阴影',
                'type': 'boxShadow',
                'value': {
                  'color': '#0075FF', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
                  'vShadow': 0, // 垂直阴影的位置
                  'hShadow': 0, // 水平阴影的位置
                  'blur': 8, // 模糊的距离
                },
              },
            ],
          },
        ],
        'dataConfig': {}, //数据源配置
        'dataType': 'static', //数据类型：static;mysql;api;clickhouse
        'id': 'components_1-1-2', //组件ID
        'moduleName': 'textV2', //组件标识
        'moduleVersion': '1.1.0', //组件版本号
        'name': '标题', //图层名称
        'parent': '', //组件父级配置
        'dashboardId': '11', //画布id
        'staticData': {
          //静态数据
          'data': [
            {
              'text': '我是文字组件111',
            },
          ],
          'fields': [
            {
              'name': 'text',
              'value': 'text',
              'desc': '文本',
              'status': true, // 状态
            },
          ],
        },
        'interaction': { // 交互
          'mountAnimation': {
            // 如果不存在载入动画，该项为null
            'delay': 2, // 延迟
            'direction': 'right', // 方向
            'duration': 304, // 持续时间(ms)
            'opacityOpen': true, // 渐隐渐现
            'timingFunction': 'ease', // 速率
            'type': 'slide', // 动画类型
          },
        },
      },
      {
        'config': [
          // 样式配置
          {
            'name': 'dimension',
            'displayName': '位置尺寸',
            'type': 'dimensionGroup',
            'config': {
              'lock': false,
            },
            'value': [
              {
                'name': 'left',
                'displayName': 'X轴坐标',
                'value': 100,
                type: 'number',
                config: {
                  suffix: 'X'
                }
              },
              {
                'name': 'top',
                'displayName': 'Y轴坐标',
                'value': 100,
                type: 'number',
                config: {
                  suffix: 'Y'
                }
              },
              {
                'name': 'width',
                'displayName': '宽度',
                'value': 100,
                type: 'number',
                config: {
                  suffix: 'W'
                }
              },
              {
                'name': 'height',
                'displayName': '高度',
                'value': 100,
                type: 'number',
                config: {
                  suffix: 'H'
                }
              },
            ],
          },
          {
            'name': 'hideDefault',
            'displayName': '默认隐藏',
            'type': 'checkBox',
            'value': false,
          },
          {
            'name': 'textStyle',
            'displayName': '文本样式',
            'type': 'textFullStyleGroup',
            'value': [
              {
                'name': 'fontFamily',
                'displayName': '',
                'value': 'Microsoft Yahei',
              },
              {
                'name': 'fontSize',
                'displayName': '',
                'value': 32,
              },
              {
                'name': 'color',
                'displayName': '',
                'type': 'color',
                'value': '#000', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
              },
              {
                'name': 'bold',
                'displayName': '',
                'value': false,
              },
              {
                'name': 'italic',
                'displayName': '',
                'value': false,
              },
              {
                'name': 'letterSpacing',
                'displayName': '字距',
                'value': 0,
              },
              {
                'name': 'lineHeight',
                'displayName': '行距',
                'value': 'unset',
              },
            ],
          },
          {
            'name': 'align',
            'displayName': '对齐方式',
            'type': 'alignFull',
            'value': [
              {
                'name': 'textAlign',
                'displayName': '水平对齐',
                'type': 'align',
                'value': 'left', // left , center, right,bothEnds
              },
              {
                'name': 'textVertical',
                'displayName': '垂直对齐',
                'type': 'vertical',
                'value': 'top', // top bottom vertical
              },
            ],
          },
          {
            'name': 'shadow',
            'displayName': '阴影',
            'type': 'collapse',
            'hasSwitch':true,
            'defaultExpand':true,
            'value': [
              {
                'name': 'show',
                'displayName': '',
                'value': true,
                'type': 'switch',
              },
              {
                'name': 'shadow',
                'displayName': '外阴影',
                'type': 'boxShadow',
                'value': {
                  'color': '#0075FF', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
                  'vShadow': 0, // 垂直阴影的位置
                  'hShadow': 0, // 水平阴影的位置
                  'blur': 8, // 模糊的距离
                },
              },
            ],
          },
        ],
        'dataConfig': {}, //数据源配置
        'dataType': 'static', //数据类型：static;mysql;api;clickhouse
        'id': 'components_1-1-3', //组件ID
        'moduleName': 'textV2', //组件标识
        'moduleVersion': '1.1.0', //组件版本号
        'name': '标题', //图层名称
        'parent': '', //组件父级配置
        'dashboardId': '11', //画布id
        'staticData': {
          //静态数据
          'data': [
            {
              'text': '我是文字组件111',
            },
          ],
          'fields': [
            {
              'name': 'text',
              'value': 'text',
              'desc': '文本',
              'status': true, // 状态
            },
          ],
        },
        'interaction': { // 交互
          'mountAnimation': {
            // 如果不存在载入动画，该项为null
            'delay': 2, // 延迟
            'direction': 'right', // 方向
            'duration': 304, // 持续时间(ms)
            'opacityOpen': true, // 渐隐渐现
            'timingFunction': 'ease', // 速率
            'type': 'slide', // 动画类型
          },
        },
      },
      {
        'config': [
          // 样式配置
          {
            'name': 'dimension',
            'displayName': '位置尺寸',
            'type': 'dimensionGroup',
            'config': {
              'lock': false,
            },
            'value': [
              {
                'name': 'left',
                'displayName': 'X轴坐标',
                'value': 100,
                type: 'number',
                config: {
                  suffix: 'X'
                }
              },
              {
                'name': 'top',
                'displayName': 'Y轴坐标',
                'value': 100,
                type: 'number',
                config: {
                  suffix: 'Y'
                }
              },
              {
                'name': 'width',
                'displayName': '宽度',
                'value': 100,
                type: 'number',
                config: {
                  suffix: 'W'
                }
              },
              {
                'name': 'height',
                'displayName': '高度',
                'value': 100,
                type: 'number',
                config: {
                  suffix: 'H'
                }
              },
            ],
          },
          {
            'name': 'hideDefault',
            'displayName': '默认隐藏',
            'type': 'checkBox',
            'value': false,
          },
          {
            'name': 'textStyle',
            'displayName': '文本样式',
            'type': 'textFullStyleGroup',
            'value': [
              {
                'name': 'fontFamily',
                'displayName': '',
                'value': 'Microsoft Yahei',
              },
              {
                'name': 'fontSize',
                'displayName': '',
                'value': 32,
              },
              {
                'name': 'color',
                'displayName': '',
                'type': 'color',
                'value': '#000', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
              },
              {
                'name': 'bold',
                'displayName': '',
                'value': false,
              },
              {
                'name': 'italic',
                'displayName': '',
                'value': false,
              },
              {
                'name': 'letterSpacing',
                'displayName': '字距',
                'value': 0,
              },
              {
                'name': 'lineHeight',
                'displayName': '行距',
                'value': 'unset',
              },
            ],
          },
          {
            'name': 'align',
            'displayName': '对齐方式',
            'type': 'alignFull',
            'value': [
              {
                'name': 'textAlign',
                'displayName': '水平对齐',
                'type': 'align',
                'value': 'left', // left , center, right,bothEnds
              },
              {
                'name': 'textVertical',
                'displayName': '垂直对齐',
                'type': 'vertical',
                'value': 'top', // top bottom vertical
              },
            ],
          },
          {
            'name': 'shadow',
            'displayName': '阴影',
            'type': 'collapse',
            'hasSwitch':true,
            'defaultExpand':true,
            'value': [
              {
                'name': 'show',
                'displayName': '',
                'value': true,
                'type': 'switch',
              },
              {
                'name': 'shadow',
                'displayName': '外阴影',
                'type': 'boxShadow',
                'value': {
                  'color': '#0075FF', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
                  'vShadow': 0, // 垂直阴影的位置
                  'hShadow': 0, // 水平阴影的位置
                  'blur': 8, // 模糊的距离
                },
              },
            ],
          },
        ],
        'dataConfig': {}, //数据源配置
        'dataType': 'static', //数据类型：static;mysql;api;clickhouse
        'id': 'components_1-1-1-2', //组件ID
        'moduleName': 'textV2', //组件标识
        'moduleVersion': '1.1.0', //组件版本号
        'name': '标题', //图层名称
        'parent': '', //组件父级配置
        'dashboardId': '11', //画布id
        'staticData': {
          //静态数据
          'data': [
            {
              'text': '我是文字组件111',
            },
          ],
          'fields': [
            {
              'name': 'text',
              'value': 'text',
              'desc': '文本',
              'status': true, // 状态
            },
          ],
        },
        'interaction': { // 交互
          'mountAnimation': {
            // 如果不存在载入动画，该项为null
            'delay': 2, // 延迟
            'direction': 'right', // 方向
            'duration': 304, // 持续时间(ms)
            'opacityOpen': true, // 渐隐渐现
            'timingFunction': 'ease', // 速率
            'type': 'slide', // 动画类型
          },
        },
      },
      {
        'config': [
          // 样式配置
          {
            'name': 'dimension',
            'displayName': '位置尺寸',
            'type': 'dimensionGroup',
            'config': {
              'lock': false,
            },
            'value': [
              {
                'name': 'left',
                'displayName': 'X轴坐标',
                'value': 100,
                type: 'number',
                config: {
                  suffix: 'X'
                }
              },
              {
                'name': 'top',
                'displayName': 'Y轴坐标',
                'value': 100,
                type: 'number',
                config: {
                  suffix: 'Y'
                }
              },
              {
                'name': 'width',
                'displayName': '宽度',
                'value': 100,
                type: 'number',
                config: {
                  suffix: 'W'
                }
              },
              {
                'name': 'height',
                'displayName': '高度',
                'value': 100,
                type: 'number',
                config: {
                  suffix: 'H'
                }
              },
            ],
          },
          {
            'name': 'hideDefault',
            'displayName': '默认隐藏',
            'type': 'checkBox',
            'value': false,
          },
          {
            'name': 'textStyle',
            'displayName': '文本样式',
            'type': 'textFullStyleGroup',
            'value': [
              {
                'name': 'fontFamily',
                'displayName': '',
                'value': 'Microsoft Yahei',
              },
              {
                'name': 'fontSize',
                'displayName': '',
                'value': 32,
              },
              {
                'name': 'color',
                'displayName': '',
                'type': 'color',
                'value': '#000', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
              },
              {
                'name': 'bold',
                'displayName': '',
                'value': false,
              },
              {
                'name': 'italic',
                'displayName': '',
                'value': false,
              },
              {
                'name': 'letterSpacing',
                'displayName': '字距',
                'value': 0,
              },
              {
                'name': 'lineHeight',
                'displayName': '行距',
                'value': 'unset',
              },
            ],
          },
          {
            'name': 'align',
            'displayName': '对齐方式',
            'type': 'alignFull',
            'value': [
              {
                'name': 'textAlign',
                'displayName': '水平对齐',
                'type': 'align',
                'value': 'left', // left , center, right,bothEnds
              },
              {
                'name': 'textVertical',
                'displayName': '垂直对齐',
                'type': 'vertical',
                'value': 'top', // top bottom vertical
              },
            ],
          },
          {
            'name': 'shadow',
            'displayName': '阴影',
            'type': 'collapse',
            'hasSwitch':true,
            'defaultExpand':true,
            'value': [
              {
                'name': 'show',
                'displayName': '',
                'value': true,
                'type': 'switch',
              },
              {
                'name': 'shadow',
                'displayName': '外阴影',
                'type': 'boxShadow',
                'value': {
                  'color': '#0075FF', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
                  'vShadow': 0, // 垂直阴影的位置
                  'hShadow': 0, // 水平阴影的位置
                  'blur': 8, // 模糊的距离
                },
              },
            ],
          },
        ],
        'dataConfig': {}, //数据源配置
        'dataType': 'static', //数据类型：static;mysql;api;clickhouse
        'id': 'components_1-1-1-3', //组件ID
        'moduleName': 'textV2', //组件标识
        'moduleVersion': '1.1.0', //组件版本号
        'name': '标题', //图层名称
        'parent': '', //组件父级配置
        'dashboardId': '11', //画布id
        'staticData': {
          //静态数据
          'data': [
            {
              'text': '我是文字组件111',
            },
          ],
          'fields': [
            {
              'name': 'text',
              'value': 'text',
              'desc': '文本',
              'status': true, // 状态
            },
          ],
        },
        'interaction': { // 交互
          'mountAnimation': {
            // 如果不存在载入动画，该项为null
            'delay': 2, // 延迟
            'direction': 'right', // 方向
            'duration': 304, // 持续时间(ms)
            'opacityOpen': true, // 渐隐渐现
            'timingFunction': 'ease', // 速率
            'type': 'slide', // 动画类型
          },
        },
      },
      {
        'config': [
          // 样式配置
          {
            'name': 'dimension',
            'displayName': '位置尺寸',
            'type': 'dimensionGroup',
            'config': {
              'lock': false,
            },
            'value': [
              {
                'name': 'left',
                'displayName': 'X轴坐标',
                'value': 100,
                type: 'number',
                config: {
                  suffix: 'X'
                }
              },
              {
                'name': 'top',
                'displayName': 'Y轴坐标',
                'value': 100,
                type: 'number',
                config: {
                  suffix: 'Y'
                }
              },
              {
                'name': 'width',
                'displayName': '宽度',
                'value': 100,
                type: 'number',
                config: {
                  suffix: 'W'
                }
              },
              {
                'name': 'height',
                'displayName': '高度',
                'value': 100,
                type: 'number',
                config: {
                  suffix: 'H'
                }
              },
            ],
          },
          {
            'name': 'hideDefault',
            'displayName': '默认隐藏',
            'type': 'checkBox',
            'value': false,
          },
          {
            'name': 'textStyle',
            'displayName': '文本样式',
            'type': 'textFullStyleGroup',
            'value': [
              {
                'name': 'fontFamily',
                'displayName': '',
                'value': 'Microsoft Yahei',
              },
              {
                'name': 'fontSize',
                'displayName': '',
                'value': 32,
              },
              {
                'name': 'color',
                'displayName': '',
                'type': 'color',
                'value': '#000', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
              },
              {
                'name': 'bold',
                'displayName': '',
                'value': false,
              },
              {
                'name': 'italic',
                'displayName': '',
                'value': false,
              },
              {
                'name': 'letterSpacing',
                'displayName': '字距',
                'value': 0,
              },
              {
                'name': 'lineHeight',
                'displayName': '行距',
                'value': 'unset',
              },
            ],
          },
          {
            'name': 'align',
            'displayName': '对齐方式',
            'type': 'alignFull',
            'value': [
              {
                'name': 'textAlign',
                'displayName': '水平对齐',
                'type': 'align',
                'value': 'left', // left , center, right,bothEnds
              },
              {
                'name': 'textVertical',
                'displayName': '垂直对齐',
                'type': 'vertical',
                'value': 'top', // top bottom vertical
              },
            ],
          },
          {
            'name': 'shadow',
            'displayName': '阴影',
            'type': 'collapse',
            'hasSwitch':true,
            'defaultExpand':true,
            'value': [
              {
                'name': 'show',
                'displayName': '',
                'value': true,
                'type': 'switch',
              },
              {
                'name': 'shadow',
                'displayName': '外阴影',
                'type': 'boxShadow',
                'value': {
                  'color': '#0075FF', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
                  'vShadow': 0, // 垂直阴影的位置
                  'hShadow': 0, // 水平阴影的位置
                  'blur': 8, // 模糊的距离
                },
              },
            ],
          },
        ],
        'dataConfig': {}, //数据源配置
        'dataType': 'static', //数据类型：static;mysql;api;clickhouse
        'id': 'components_1-1-1-1-2', //组件ID
        'moduleName': 'textV2', //组件标识
        'moduleVersion': '1.1.0', //组件版本号
        'name': '标题', //图层名称
        'parent': '', //组件父级配置
        'dashboardId': '11', //画布id
        'staticData': {
          //静态数据
          'data': [
            {
              'text': '我是文字组件111',
            },
          ],
          'fields': [
            {
              'name': 'text',
              'value': 'text',
              'desc': '文本',
              'status': true, // 状态
            },
          ],
        },
        'interaction': { // 交互
          'mountAnimation': {
            // 如果不存在载入动画，该项为null
            'delay': 2, // 延迟
            'direction': 'right', // 方向
            'duration': 304, // 持续时间(ms)
            'opacityOpen': true, // 渐隐渐现
            'timingFunction': 'ease', // 速率
            'type': 'slide', // 动画类型
          },
        },
      },
      {
        'config': [
          // 样式配置
          {
            'name': 'dimension',
            'displayName': '位置尺寸',
            'type': 'dimensionGroup',
            'config': {
              'lock': false,
            },
            'value': [
              {
                'name': 'left',
                'displayName': 'X轴坐标',
                'value': 100,
                type: 'number',
                config: {
                  suffix: 'X'
                }
              },
              {
                'name': 'top',
                'displayName': 'Y轴坐标',
                'value': 100,
                type: 'number',
                config: {
                  suffix: 'Y'
                }
              },
              {
                'name': 'width',
                'displayName': '宽度',
                'value': 100,
                type: 'number',
                config: {
                  suffix: 'W'
                }
              },
              {
                'name': 'height',
                'displayName': '高度',
                'value': 100,
                type: 'number',
                config: {
                  suffix: 'H'
                }
              },
            ],
          },
          {
            'name': 'hideDefault',
            'displayName': '默认隐藏',
            'type': 'checkBox',
            'value': false,
          },
          {
            'name': 'textStyle',
            'displayName': '文本样式',
            'type': 'textFullStyleGroup',
            'value': [
              {
                'name': 'fontFamily',
                'displayName': '',
                'value': 'Microsoft Yahei',
              },
              {
                'name': 'fontSize',
                'displayName': '',
                'value': 32,
              },
              {
                'name': 'color',
                'displayName': '',
                'type': 'color',
                'value': '#000', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
              },
              {
                'name': 'bold',
                'displayName': '',
                'value': false,
              },
              {
                'name': 'italic',
                'displayName': '',
                'value': false,
              },
              {
                'name': 'letterSpacing',
                'displayName': '字距',
                'value': 0,
              },
              {
                'name': 'lineHeight',
                'displayName': '行距',
                'value': 'unset',
              },
            ],
          },
          {
            'name': 'align',
            'displayName': '对齐方式',
            'type': 'alignFull',
            'value': [
              {
                'name': 'textAlign',
                'displayName': '水平对齐',
                'type': 'align',
                'value': 'left', // left , center, right,bothEnds
              },
              {
                'name': 'textVertical',
                'displayName': '垂直对齐',
                'type': 'vertical',
                'value': 'top', // top bottom vertical
              },
            ],
          },
          {
            'name': 'shadow',
            'displayName': '阴影',
            'type': 'collapse',
            'hasSwitch':true,
            'defaultExpand':true,
            'value': [
              {
                'name': 'show',
                'displayName': '',
                'value': true,
                'type': 'switch',
              },
              {
                'name': 'shadow',
                'displayName': '外阴影',
                'type': 'boxShadow',
                'value': {
                  'color': '#0075FF', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
                  'vShadow': 0, // 垂直阴影的位置
                  'hShadow': 0, // 水平阴影的位置
                  'blur': 8, // 模糊的距离
                },
              },
            ],
          },
        ],
        'dataConfig': {}, //数据源配置
        'dataType': 'static', //数据类型：static;mysql;api;clickhouse
        'id': 'components_1-1-1-1-3', //组件ID
        'moduleName': 'textV2', //组件标识
        'moduleVersion': '1.1.0', //组件版本号
        'name': '标题', //图层名称
        'parent': '', //组件父级配置
        'dashboardId': '11', //画布id
        'staticData': {
          //静态数据
          'data': [
            {
              'text': '我是文字组件111',
            },
          ],
          'fields': [
            {
              'name': 'text',
              'value': 'text',
              'desc': '文本',
              'status': true, // 状态
            },
          ],
        },
        'interaction': { // 交互
          'mountAnimation': {
            // 如果不存在载入动画，该项为null
            'delay': 2, // 延迟
            'direction': 'right', // 方向
            'duration': 304, // 持续时间(ms)
            'opacityOpen': true, // 渐隐渐现
            'timingFunction': 'ease', // 速率
            'type': 'slide', // 动画类型
          },
        },
      },
    ],
    componentLayers: [],
    treeRef: null,
    canvasScaleValue: 0,
    pageConfig: [
      {
        'name': 'recommend',
        'displayName': '屏幕大小',
        'value': '0',
        'options': [
          {
            'name': '大屏推荐尺寸1920*1080',
            'value': '0',
          },
          {
            'name': 'web最常见尺寸1366*768',
            'value': '1',
          },
          {
            'name': 'web最小尺寸1024*768',
            'value': '2',
          },
          {
            'name': '自定义',
            'value': '4',
          },
        ],
        'width': 1920,
        'height': 1080,
      },
      {
        'name': 'styleColor',
        'displayName': '背景',
        'value': '#222430', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
      },
      {
        'name': 'backgroundImg',
        'displayName': '背景图',
        'value': '', // 有背景图则返回背景图的url，没有背景图返回空或者null
      },
      {
        'name': 'gridSpacing',
        'displayName': '栅格间距',
        'value': 5,
        type: 'number',
        "config": {
          "min": 0,
          "step": 1,
          suffix:'',  // 输入框后缀
      }
      },
      {
        'name': 'zoom',
        'displayName': '缩放设置',
        'value': '0',
        type:'radioGroup',
        direction:'vertical', // 方向
        'options': [
          {
            'name': '按屏幕比例适配',
            'value': '0',
          },
          {
            'name': '强制铺满',
            'value': '1',
          },
          {
            'name': '原比例展示溢出滚动',
            'value': '2',
          },
        ],
      },
    ],
    groupConfig: [
      {
        'name': 'dimension',
        'displayName': '位置尺寸',
        'type': 'dimensionGroup',
        'config': {
          'lock': false,
        },
        'value': [
          {
            'name': 'left',
            'displayName': 'X轴坐标',
            'value': 100,
            type: 'number',
            config: {
              suffix: 'X'
            }
          },
          {
            'name': 'top',
            'displayName': 'Y轴坐标',
            'value': 100,
            type: 'number',
            config: {
              suffix: 'Y'
            }
          },
          {
            'name': 'width',
            'displayName': '宽度',
            'value': 100,
            type: 'number',
            config: {
              suffix: 'W'
            }
          },
          {
            'name': 'height',
            'displayName': '高度',
            'value': 100,
            type: 'number',
            config: {
              suffix: 'H'
            }
          },
        ],
      },
      {
        'name': 'hideDefault',
        'displayName': '默认隐藏',
        'value': false,
        'type':'checkBox'
      },
      {
        'name': 'opacity',
        'displayName': '透明度',
        'value': 0.7,
        'type':'range',
        "config": {
            "min": 0,
            "max": 1,
            "step": 0.01,
            'suffix':'%',  // 输入框后缀
        }
      },
      {
        'name': 'interaction',
        'displayName': '交互',
        'value': {
          // 该部分实际上来自于layers设置
          'mountAnimation': {
            // 如果不存在载入动画，该项为null
            'delay': 2, // 延迟
            'direction': 'right', // 方向
            'duration': 304, // 持续时间(ms)
            'opacityOpen': true, // 渐隐渐现
            'timingFunction': 'ease', // 速率
            'type': 'slide', // 动画类型
          },
        },
      },
    ],
    componentConfig: {
      'config': [
        // 样式配置
        {
          'name': 'dimension',
          'displayName': '位置尺寸',
          'type': 'dimensionGroup',
          'config': {
            'lock': false,
          },
          'value': [
            {
              'name': 'left',
              'displayName': 'X轴坐标',
              'value': 100,
              type: 'number',
              config: {
                suffix: 'X'
              }
            },
            {
              'name': 'top',
              'displayName': 'Y轴坐标',
              'value': 100,
              type: 'number',
              config: {
                suffix: 'Y'
              }
            },
            {
              'name': 'width',
              'displayName': '宽度',
              'value': 100,
              type: 'number',
              config: {
                suffix: 'W'
              }
            },
            {
              'name': 'height',
              'displayName': '高度',
              'value': 100,
              type: 'number',
              config: {
                suffix: 'H'
              }
            },
          ],
        },
        {
          'name': 'hideDefault',
          'displayName': '默认隐藏',
          'type': 'checkBox',
          'value': false,
        },
        {
          'name': 'textStyle',
          'displayName': '文本样式',
          'type': 'textFullStyleGroup',
          'value': [
            {
              'name': 'fontFamily',
              'displayName': '',
              'value': 'Microsoft Yahei',
            },
            {
              'name': 'fontSize',
              'displayName': '',
              'value': 32,
            },
            {
              'name': 'color',
              'displayName': '',
              'type': 'color',
              'value': '#000', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
            },
            {
              'name': 'bold',
              'displayName': '',
              'value': false,
            },
            {
              'name': 'italic',
              'displayName': '',
              'value': false,
            },
            {
              'name': 'letterSpacing',
              'displayName': '字距',
              'value': 0,
            },
            {
              'name': 'lineHeight',
              'displayName': '行距',
              'value': 48,
            },
          ],
        },
        {
          'name': 'align',
          'displayName': '对齐方式',
          'type': 'alignFull',
          'value': [
            {
              'name': 'textAlign',
              'displayName': '水平对齐',
              'type': 'align',
              'value': 'left', // left , center, right,bothEnds
            },
            {
              'name': 'textVertical',
              'displayName': '垂直对齐',
              'type': 'vertical',
              'value': 'top', // top bottom vertical
            },
          ],
        },
        {
          'name': 'shadow',
          'displayName': '阴影',
          'type': 'collapse',
          'hasSwitch':true,
          'defaultExpand':true,
          'value': [
            {
              'name': 'show',
              'displayName': '',
              'value': true,
              'type': 'switch',
            },
            {
              'name': 'shadow',
              'displayName': '外阴影',
              'type': 'boxShadow',
              'value': {
                'color': '#0075FF', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
                'vShadow': 0, // 垂直阴影的位置
                'hShadow': 0, // 水平阴影的位置
                'blur': 8, // 模糊的距离
              },
            },
          ],
        },
      ],
      'dataConfig': {}, //数据源配置
      'dataType': 'static', //数据类型：static;mysql;api;clickhouse
      'id': 111, //组件ID
      'moduleName': 'textV2', //组件标识
      'moduleVersion': '1.1.0', //组件版本号
      'name': '标题', //图层名称
      'parent': '', //组件父级配置
      'dashboardId': '11', //画布id
      'staticData': {
        //静态数据
        'data': [
          {
            'text': '我是文字组件111',
          },
        ],
        'fields': [
          {
            'name': 'text',
            'value': 'text',
            'desc': '文本',
            'status': true, // 状态
          },
        ],
      },
      'interaction': { // 交互
        'mountAnimation': {
          // 如果不存在载入动画，该项为null
          'delay': 2, // 延迟
          'direction': 'right', // 方向
          'duration': 304, // 持续时间(ms)
          'opacityOpen': true, // 渐隐渐现
          'timingFunction': 'ease', // 速率
          'type': 'slide', // 动画类型
        },
      },
    },
    sizeChange:{
      change:false,
      config:{
        left:100,
        top:100,
        width:100,
        height: 100,
      }
    }

  } as IBarState,
  subscriptions: {
    init({ dispatch }: any) {
      const treeData = generateTreeData()
      dispatch({
        type: 'initTreeData',
        payload: treeData,
      })
    },
    setup({ dispatch, history }: { dispatch: any; history: any }) {
      // eslint-disable-line
      history.listen((location: any) => {
        // console.log("location", location);
      })
    },
    onResize({ dispatch, history }: any) {
      window.onresize = (e) => {
      }
    },
    keyEvent({ dispatch, history }: any) {
      document.onkeydown = (e) => {
      }
    },
  },

  effects: {
    * fetch({ payload }: any, { call, put }: any): any {
      // eslint-disable-line
      yield put({ type: 'selectedNode', payload })
    },
  },

  reducers: {
    initTreeData(state: IBarState, { payload }: any) {
      return { ...state, treeData: payload }
    },
    selectedNode(state: IBarState, { payload }: any) {
      // const items = state.draggableItems;
      // selectSingleComponent(items, payload.key[0]);
      return { ...state, ...payload }
    },
    // 选中节点时，保存住整个node对象
    setNodeList(state: IBarState, { payload }: any) {
      state.selectedComponentOrGroup.forEach(item => {
        item.selected = false
      })
      state.selectedComponentOrGroup = payload
      state.selectedComponentOrGroup.forEach(item => {
        item.selected = true
      })
      return { ...state }
    },
    // 在已经多选的情况下，点击右键时应该是往已选择节点[]里添加，而不是上面那种替换
    pushToSelectedNode(state: IBarState, { payload }: any) {
      const { key, isFolder } = payload
      const newArr = [ ...(new Set(state.key.concat(key)) as any) ]
      return { key: newArr, isFolder }
    },
    // 点击icon或者右键菜单里的操作
    selectOperate(state: IBarState, { payload }: any) {
      return { ...state, ...payload }
    },
    findNode(state: IBarState, { payload: { id, callback } }: any) {
      callback(id)
      return { ...state }
    },
    selectSingleNode(state: IBarState, { payload: id }: any) {
      // const items = state.draggableItems;
      // selectSingleComponent(items, id);
      return { ...state }
    },
    testDrag(state: IBarState, { payload: { parentId } }: any) {
      // console.log('parentId', parentId)
      const ids = [ '1-1', '1-1-1', '1-1-1-1' ]
      const copyState: IBarState = JSON.parse(JSON.stringify(state))
      // let childrenComponents = findParentNode(
      //   copyState.draggableItems,
      //   ids
      // ).filter((item: any) => item);
      // calculateGroupPosition(childrenComponents.reverse());
      return copyState
    },
    moveGroupPosition(
      state: IBarState,
      { payload: { id, xMoveLength, yMoveLength } }: any,
    ) {
      // const node = findNode(state.draggableItems, id);
      // moveChildrenComponents(node.components, xMoveLength, yMoveLength);
      // console.log("node", node);
      return { ...state }
    },
    // 多选时候，记录最后一次被右键点击的节点
    saveLastRightClickKey(state: IBarState, { payload }: any) {
      return { ...state, lastRightClick: payload }
    },
    // 置顶
    placedTop(state: IBarState, { payload }: any) {
      const newTreeData = placeTop(state.treeData, state.key)
      return { ...state, treeData: newTreeData }
    },
    // 置底
    placeBottom(state: IBarState, { payload }: any) {
      const newTreeData = placeBottom(state.treeData, state.key)
      return { ...state, treeData: newTreeData }
    },
    // 上移
    moveUp(state: IBarState, { payload }: any) {
      const newTree = moveUp(state.treeData, state.key)
      return { ...state, treeData: newTree }
    },
    // 下移
    moveDown(state: IBarState, { payload }: any) {
      const newTree = moveDown(state.treeData, state.key)
      return { ...state, treeData: newTree }
    },
    // 成组
    group(state: IBarState, { payload }: any) {
      const newTree = group(state.treeData, state.key, state.lastRightClick)
      console.log('newTree', newTree)
      return { ...state, treeData: newTree }
    },
    // 取消成组
    cancelGroup(state: IBarState, { payload }: any) {
      const newTree = cancelGroup(state.treeData, state.key)
      return { ...state, treeData: newTree }
    },
    // TODO 粘贴
    // paste(state: IBarState, { payload }: any) {
    //   return { ...state };
    // },
    // 锁定
    lock(state: IBarState, { payload }: any) {
      const newTree = lock(state.treeData, state.key, payload.value)
      return { ...state, treeData: newTree }
    },
    // 删除
    delete(state: IBarState, { payload }: any) {
      const newTree = remove(state.treeData, state.key)
      return { ...state, treeData: newTree }
    },
    // 复制
    copy(state: IBarState, { payload }: any) {
      // const newTree = copy(state.treeData, state.key);
      // return { ...state, treeData: newTree };
      return { ...state }
    },
    //单独显示图层
    singleShowLayer(state: IBarState, { payload }: any) {
      const newTree = singleShowLayer(
        state.treeData,
        state.key,
        payload.singleShowLayer,
      )
      return { ...state, treeData: newTree }
    },
    // 隐藏
    hidden(state: IBarState, { payload }: any) {
      // 此处只能用payload.key,因为eyes图标在没有任何节点被选中时也要能响应点击
      const newTree = hidden(state.treeData, payload.key, payload.value)
      return { ...state, treeData: newTree }
    },
    // 改变重命名输入框的显示状态
    reName(state: IBarState, { payload }: any) {
      const newTree = showInput(state.treeData, state.key, payload.value)
      return { ...state, treeData: newTree }
    },
    // 真正改变名字的地方
    changeName(state: IBarState, { payload }: any) {
      const newTree = reName(state.treeData, state.key, payload.newName)
      return { ...state, treeData: newTree }
    },
    mergeComponentLayers(state: IBarState, { payload }: any) {
      state.componentLayers = mergeComponentLayers(state.components, state.treeData)
      return { ...state }
    },
    test(state: IBarState, { payload }: any) {
      return { ...state }
    },
    test2(state: IBarState) {

      return { ...state }
    },
    testDelete(state: IBarState) {
      state.components.pop()
      state.treeData.pop()
      return { ...state }
    },
    save(state: IBarState, { payload }: any) {
      return { ...state, ...payload }
    },
    selectComponentOrGroup(state: IBarState, {
      payload: {
        layer,
        config,
      },
    }: any) {
      // 这里的 layer 代表的是 group / component
      // 是否支持多选
      if(state.isSupportMultiple) {
        // 多选
        layer.selected = true
        // 如果 selectedComponentOrGroup 里不存在当前点击的组件/分组的话，就添加
        if(!state.selectedComponentOrGroup.find(item => item.id === layer.id)) {
          (state.selectedComponentOrGroup as any).push(layer)
        }
      } else {
        // 单选
        // 单选分为单选组件、单选分组
        // 单选的话，将其他组件的 select 状态取消掉
        state.selectedComponentOrGroup.forEach(item => {
          item.selected = false
        })
        // 再将自己的 select 状态设置为 true
        layer.selected = true
        // 再重新赋值 selectedComponentOrGroup 长度为 1
        state.selectedComponentOrGroup = [ layer ]
      }
      // 将选中的 layer 中的包含的所有 component 的 id 提取出来
      state.key = state.selectedComponentOrGroup.map(item => item.id)
      state.selectedComponentIds = layerComponentsFlat(state.selectedComponentOrGroup)
      console.log('state.selectedComponentIds', state.selectedComponentIds)

      return {
        ...state,
      }
    },
    // 清除所有状态
    clearAllStatus(state: IBarState, payload: any) {
      // 先将选中的 layer 的 select 状态清除
      state.selectedComponentOrGroup.forEach(layer => {
        layer.selected = false
      })
      // 清空 selectedComponentOrGroup、selectedComponentIds、selectedComponents
      state.selectedComponentOrGroup.length = 0
      state.selectedComponentIds.length = 0
      state.selectedComponents.length = 0
      state.selectedComponentRefs = {}
      state.isSupportMultiple = false
      state.scaleDragData.style.display = 'none'
      state.key.length = 0
      state.isFolder = false
      state.supportLinesRef.handleSetPosition(0, 0, 'none')
      return { ...state }
    },
    setComponentConfig(state: IBarState, { payload }: any) {
      const componentConfig = payload
      state.componentConfig = payload
      console.log('payload', payload)
      // console.log('componentConfig', componentConfig)
      const index = state.components.findIndex((item: any) => {
        return item.id === componentConfig.id
      })
      state.components.splice(index, 1, componentConfig)
      console.log('index', index)
      return { ...state }
    },
  },
}
