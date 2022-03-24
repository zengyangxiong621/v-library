export const defaultStyleConfig = {
  'name': 'style',
  'displayName': '样式',
  'value': [
    {
      'name': 'dimension',
      'displayName': '位置尺寸',
      'type': 'dimensionInputGroup',
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
      'type': 'hideCheckBox',
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
          'value': 'left', // left , center, right,bothEnds
        },
        {
          'name': 'textVertical',
          'displayName': '垂直对齐',
          'value': 'top', // top bottom vertical
        },
      ],
    },
    {
      'name': 'shadow',
      'displayName': '阴影',
      'type': 'shadowOutSide',
      'value': [
        {
          'name': 'show',
          'displayName': '',
          'value': true,
        },
        {
          'name': 'shadow',
          'displayName': '外阴影',
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
}
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
