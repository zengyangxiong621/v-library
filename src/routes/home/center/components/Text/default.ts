export const defaultStyleConfig = [
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
      },
      {
        'name': 'top',
        'displayName': 'Y轴坐标',
        'value': 100,
      },
      {
        'name': 'width',
        'displayName': '宽度',
        'value': 100,
      },
      {
        'name': 'height',
        'displayName': '高度',
        'value': 100,
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
    'type': 'shadow',
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
        'type': 'outsideShadow',
        'value': {
          'color': '#0075FF', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
          'vShadow': 0, // 垂直阴影的位置
          'hShadow': 0, // 水平阴影的位置
          'blur': 8, // 模糊的距离
        },
      },
    ],
  },
]

export const defaultStaticData = {
  data: [
    {
      text: '我是文字组件',
    },
  ],
  fields: [
    {
      desc: '文本',
      name: 'text',
      value: 'text',
    },
  ],
}
