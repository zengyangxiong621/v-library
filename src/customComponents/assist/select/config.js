const componentDefaultConfig = {
  "id": "",
  "uniqueTag": "24e1b3a2-60e0-4cef-8a5d-f04fd645f14b",
  "name": "下拉框",
  "parentId": "",
  "dashboardId": "",
  "moduleName": "select",
  "moduleType": "select",
  "moduleVersion": "1.0.0",
  "createdAt": "2022-04-02T07:22:31.290Z",
  "updatedAt": "2022-04-02T07:22:39.798Z",
  "autoUpdate": {"isAuto": false, "interval": 10},
  "thumb": "",
  "dataFrom": 0,
  "dataConfig": {},
  "dataType": "static",
  "dataContainers": [],
  "staticData": {
    "data": [{"option": "A-1"}, {"option": "A-2"}],
    "fields": [{"name": "option", "value": "option", "desc": "选项"}]
  },
  "useFilter": false,
  "filters": [],
  "events": [],
  "callbackArgs": [],
  "config": [{
    "name": "dimension",
    "displayName": "位置尺寸",
    "type": "dimensionGroup",
    "config": {"lock": false},
    "value": [{"name": "left", "displayName": "X轴坐标", "value": 100}, {
      "name": "top",
      "displayName": "Y轴坐标",
      "value": 100
    }, {"name": "width", "displayName": "宽度", "value": 126}, {"name": "height", "displayName": "高度", "value": 32}]
  }, {"name": "hideDefault", "displayName": "默认隐藏", "type": "checkBox", "value": false}, {
    "name": "defaultSelect",
    "displayName": "默认选中",
    "value": 1,
    "type": "number",
    "config": {"min": 1, "step": 1}
  }],
  "themes": [{"id": "theme-default", "name": "系统默认"}, {"id": "theme-light", "name": "浅色风格"}, {
    "id": "theme-gov-blue",
    "name": "政务蓝"
  }]
}

export default componentDefaultConfig