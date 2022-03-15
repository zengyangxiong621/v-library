const componentConfig = {
  dashboardId: '1',
  id: '1',
  name: '文字组件',
  parentId: '0', // 父子组件
  dataStatic: {
    data: [{
      text: '我是文字组件'
    }],
    fields: [{
      field: '字符串'
    }]
  },
  styles: {
    bgColor: '#000',
    textColor: '#333'
  },
  customEvents: [
    {
      name: "鼠标点击",
      value: "click"
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

export { componentConfig } 