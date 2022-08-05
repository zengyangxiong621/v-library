const componentDefaultConfig = {
  "id": '', //组件ID
  "uniqueTag": "", // ========= 24e1b3a2-60e0-4cef-8a5d-f04fd645f14b
  "name": "定制指标卡2-背景图", //图层名称
  "parentId": "0", // 父组件 像是2D地图、3D地图 =================
  "dashboardId": "", //画布id

  "moduleName": "instrumentPanel_2-1", //组件标识
  "moduleVersion": "1.1.0", //组件版本号

  "createdAt": "2022-04-02T07:22:31.290Z", // =========
  "updatedAt": "2022-04-02T07:22:39.798Z", // =========

  "autoUpdate": {"isAuto": false, "interval": 10}, // =========
  "thumb": "", // 缩略图 // =========

  "dataFrom": 0,
  "dataConfig": {}, //数据源配置
  "dataType": "static", //数据类型：static;mysql;api;clickhouse
  "dataContainers": [],
  staticData: {
    data: [],
    fields: [],
  },
  useFilter: false,
  filters: [],
  events: [],
  "config": [
    {
      displayName: '位置尺寸',
      name: 'dimension',
      type: 'dimensionGroup',
      config: {
        lock: false,
      },
      value: [
        {
          displayName: 'X轴坐标',
          name: 'left',
          value: 267,
        },
        {
          displayName: 'Y轴坐标',
          name: 'top',
          value: 73,
        },
        {
          displayName: '宽度',
          name: 'width',
          value: 350,
        },
        {
          displayName: '高度',
          name: 'height',
          value: 400,
        },
      ],
    },
    {
      displayName: '默认隐藏',
      name: 'hideDefault',
      type: 'checkBox',
      value: false,
    },
  ],
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

export default componentDefaultConfig;
