const componentConfig = {
  id: '121',
  uniqueTag: "24e1b3a2-60e0-4cef-8a5d-f04fd645f14b",
  name: '文字组件',
  moduleName: "chinaMap2d",
  moduleVersion: "2.1.1",
  parentId: '0', // 父组件 像是2D地图、3D地图

  createdAt: "2022-04-02T07:22:31.290Z",
  updatedAt: "2022-04-02T07:22:39.798Z",

  autoUpdate: {isAuto: false, interval: 10},
  thumb: '', // 缩略图

  dataConfig: {}, // 
  dataFrom: 0, // 当数据来源于容器时，为1 ？？？？？？ 这里不确定其中的逻辑
  dataType: 'static', // 静态数据、API、CSV等
  dataContainers: [{
    enable: true,
    id: 2744,
    rank: 0
  }],
  dataStatic: {
    data: [{
      text: '我是文字组件'
    }],
    fields: [{
      field: '字符串'
    }]
  },

  useFilter: false,
  filters: [{
    enable: true,
    id: 362505
  }],

  customEvents: [
    {
      name: "鼠标点击",
      value: "click"
    }
  ],
  triggers: [
    {
      name: "鼠标点击",
      value: "click"
    }
  ],
  actions: [],
  
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