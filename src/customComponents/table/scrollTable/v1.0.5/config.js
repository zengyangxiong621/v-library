const ComponentDefaultConfig = {
  'id': '121',
  'uniqueTag': '24e1b3a2-60e0-4cef-8a5d-f04fd645f14b',
  'name': '轮播表格',
  'parentId': '0',
  'dashboardId': '11',
  'moduleName': 'scrollTable',
  'moduleType': 'table',
  'moduleVersion': '1.0.1',
  'autoUpdate': { 'isAuto': false, 'interval': 10 },
  'thumb': '',
  'dataConfig': {},
  'dataType': 'static',
  'dataFrom': 0,
  'dataContainers': [],
  'staticData': {
    'data': [{ 'column1': '北京', 'column2': 87.2, 'column3': '超预期' }, {
      'column1': '上海',
      'column2': 80.5,
      'column3': '达标',
    }, { 'column1': '杭州', 'column2': 72.3, 'column3': '达标' }, {
      'column1': '重庆',
      'column2': 65.5,
      'column3': '未达标',
    }, { 'column1': '成都', 'column2': 58.4, 'column3': '未达标' }, {
      'column1': '厦门',
      'column2': 52.5,
      'column3': '未达标',
    }, { 'column1': '云南', 'column2': 40.2, 'column3': '未达标' }],
    'fields': [{ 'name': 'column1', 'value': 'column1', 'desc': '文本' }, {
      'name': 'column2',
      'value': 'column2',
      'desc': '文本',
    }, { 'name': 'column3', 'value': 'column3', 'desc': '文本' }, {
      'name': 'column4',
      'value': 'column4',
      'desc': '文本',
    }, { 'name': 'column5', 'value': 'column5', 'desc': '文本' }],
  },
  'useFilter': false,
  'filters': [],
  'config': [{
    'name': 'dimension',
    'displayName': '位置尺寸',
    'type': 'dimensionGroup',
    'config': { 'lock': false },
    'value': [{ 'name': 'left', 'displayName': 'X轴坐标', 'value': 100 }, {
      'name': 'top',
      'displayName': 'Y轴坐标',
      'value': 100,
    }, { 'name': 'width', 'displayName': '宽度', 'value': 600 }, {
      'name': 'height',
      'displayName': '高度',
      'value': 600,
    }],
  }, { 'name': 'hideDefault', 'displayName': '默认隐藏', 'type': 'checkBox', 'value': false }, {
    'name': 'allGlobal',
    'displayName': '全局',
    'type': 'collapse',
    'hasSwitch': false,
    'defaultExpand': true,
    'value': [{ 'name': 'show', 'displayName': '', 'value': false, 'type': 'switch' }, {
      'name': 'rowNums',
      'displayName': '表格行数',
      'type': 'number',
      'config': { 'min': 0, 'max': 24, 'step': 1, 'suffix': '' },
      'value': 5,
    }, {
      'name': 'fontFamily',
      'displayName': '字体',
      'type': 'select',
      'options': [{ 'name': '宋体', 'value': '宋体' }, { 'name': '微软雅黑', 'value': 'Microsoft Yahei' }, {
        'name': '黑体',
        'value': 'SimHei',
      }],
      'value': 'Microsoft Yahei',
    }],
  }, {
    'name': 'animation',
    'displayName': '动画',
    'type': 'collapse',
    'hasSwitch': false,
    'defaultExpand': true,
    'value': [{ 'name': 'show', 'displayName': '', 'value': true, 'type': 'switch' }, {
      'name': 'animationModel',
      'displayName': '动画模式',
      'type': 'select',
      'options': [{ 'name': '逐条滚动', 'value': 'single' }, { 'name': '整页滚动', 'value': 'page' }],
      'value': 'single',
    }, {
      'name': 'scrollInterval',
      'displayName': '轮播间隔',
      'type': 'number',
      'config': { 'min': 0, 'max': 24000, 'step': 1000, 'suffix': 'ms' },
      'value': 5000,
    }],
  }, {
    'name': 'tableHeader',
    'displayName': '表头',
    'type': 'collapse',
    'hasSwitch': true,
    'defaultExpand': false,
    'value': [
      { 'name': 'show', 'displayName': '', 'value': true, 'type': 'switch' },
      { 'name': 'bgColor', 'displayName': '背景颜色', 'value': '#222430', 'type': 'color' },
      {
        'name': 'gradientOrigin',
        'displayName': '渐变色方向',
        'type': 'origin',
        'config': {
          'type': 'direction',
        },
        'value': 'unset',
      },
      { 'name': 'gradientStartColor', 'displayName': '渐变色-开始', 'value': '#222430', 'type': 'color' },
      { 'name': 'gradientEndColor', 'displayName': '渐变色-结束', 'value': '#222430', 'type': 'color' },
      {
        'name': 'textAlign',
        'displayName': '文本对齐',
        'type': 'alignFull',
        'value': [{
          'name': 'textAlign',
          'displayName': '水平对齐',
          'type': 'align',
          'range': ['left', 'center', 'right'],
          'value': 'left',
        }],
      },
      {
        'displayName': '文本样式',
        'name': 'textStyle',
        'type': 'textFullStyleGroup',
        'value': [{ 'displayName': '', 'name': 'fontFamily', 'value': 'Microsoft Yahei' }, {
          'displayName': '',
          'name': 'fontSize',
          'value': 14,
        }, { 'displayName': '', 'name': 'color', 'type': 'color', 'value': '#fff' }, {
          'displayName': '',
          'name': 'bold',
          'value': false,
        }, { 'displayName': '', 'name': 'italic', 'value': false }, {
          'displayName': '字距',
          'name': 'letterSpacing',
          'value': 0,
        }, { 'displayName': '行距', 'name': 'lineHeight', 'config': { 'disabled': true }, 'value': 'unset' }],
      }],
  }, {
    'name': 'tableRow',
    'displayName': '行配置',
    'type': 'collapse',
    'hasSwitch': true,
    'defaultExpand': false,
    'value': [{ 'name': 'show', 'displayName': '', 'value': true, 'type': 'switch' }, {
      'name': 'evenBgColor',
      'displayName': '奇行背景色',
      'value': '#222430',
      'type': 'color',
    }, { 'name': 'oddBgColor', 'displayName': '偶行背景色', 'value': '#2a2d3c', 'type': 'color' }],
  }, {
    'name': 'tableIndex',
    'displayName': '序号列',
    'type': 'collapse',
    'hasSwitch': true,
    'defaultExpand': false,
    'value': [{ 'name': 'show', 'displayName': '', 'value': true, 'type': 'switch' }, {
      'name': 'title',
      'displayName': '标题',
      'value': '#',
      'type': 'input',
    },
      {
        'name': 'textAlign',
        'displayName': '文本对齐',
        'type': 'alignFull',
        'value': [{
          'name': 'textAlign',
          'displayName': '水平对齐',
          'type': 'align',
          'range': ['left', 'center', 'right'],
          'value': 'left',
        }],
      },
      {
        'displayName': '文本样式',
        'name': 'textStyle',
        'type': 'textFullStyleGroup',
        'value': [{ 'displayName': '', 'name': 'fontFamily', 'value': 'Microsoft Yahei' }, {
          'displayName': '',
          'name': 'fontSize',
          'value': 14,
        }, { 'displayName': '', 'name': 'color', 'type': 'color', 'value': '#fff' }, {
          'displayName': '',
          'name': 'bold',
          'value': false,
        }, { 'displayName': '', 'name': 'italic', 'value': false }, {
          'displayName': '字距',
          'name': 'letterSpacing',
          'value': 0,
        }, {
          'displayName': '行距', 'name': 'lineHeight',
          'config': {
            'disabled': true,
          }, 'value': 'unset',
        }],
      },
      {
        'name': 'indexColumnCustomStyle',
        'displayName': '样式指定',
        'type': 'tabArray',
        'defaultActiveKey': '1',
        'config': {
          'template': [
            {
              'key': '1',
              'displayName': '行1',
              'name': 'tab',
              'type': 'object',
              'value': [
                {
                  'displayName': '文本样式',
                  'name': 'textStyle',
                  'type': 'textFullStyleGroup',
                  'value': [
                    {
                      'displayName': '',
                      'name': 'fontFamily',
                      'value': 'Microsoft Yahei',
                    },
                    {
                      'displayName': '',
                      'name': 'fontSize',
                      'value': 14,
                    },
                    {
                      'displayName': '',
                      'name': 'color',
                      'type': 'color',
                      'value': '#fff',
                    },
                    {
                      'displayName': '',
                      'name': 'bold',
                      'value': false,
                    },
                    {
                      'displayName': '',
                      'name': 'italic',
                      'value': false,
                    },
                    {
                      'displayName': '字距',
                      'name': 'letterSpacing',
                      'value': 0,
                    },
                    {
                      'displayName': '行距',
                      'name': 'lineHeight',
                      'config': {
                        'disabled': true,
                      },
                      'value': 'unset',
                    },
                  ],
                },
                {
                  'displayName': '背景大小',
                  'name': 'bgSize',
                  'type': 'input2',
                  'showDetail': true,
                  'value': [
                    {
                      'displayName': '宽度',
                      'name': 'width',
                      'type': 'input',
                      'value': '20',
                      'config': {
                        'suffix': 'px',
                      },
                    },
                    {
                      'displayName': '高度',
                      'name': 'height',
                      'type': 'input',
                      'value': '20',
                      'config': {
                        'suffix': 'px',
                      },
                    },
                  ],
                },
                {
                  'name': 'bgColor',
                  'displayName': '背景色',
                  'value': '#06104a',
                  'type': 'color',
                },
                {
                  'name': 'bgImg',
                  'displayName': '背景图',
                  'type': 'image',
                  'value': 'data:image/png;base64,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',
                },
              ],
            },
          ],
        },
        'value': [
          {
            'key': '1',
            'displayName': '行1',
            'name': 'tab',
            'type': 'object',
            'value': [
              {
                'displayName': '文本样式',
                'name': 'textStyle',
                'type': 'textFullStyleGroup',
                'value': [
                  {
                    'displayName': '',
                    'name': 'fontFamily',
                    'value': 'Microsoft Yahei',
                  },
                  {
                    'displayName': '',
                    'name': 'fontSize',
                    'value': 14,
                  },
                  {
                    'displayName': '',
                    'name': 'color',
                    'type': 'color',
                    'value': '#fff',
                  },
                  {
                    'displayName': '',
                    'name': 'bold',
                    'value': false,
                  },
                  {
                    'displayName': '',
                    'name': 'italic',
                    'value': false,
                  },
                  {
                    'displayName': '字距',
                    'name': 'letterSpacing',
                    'value': 0,
                  },
                  {
                    'displayName': '行距',
                    'name': 'lineHeight',
                    'config': {
                      'disabled': true,
                    },
                    'value': 'unset',
                  },
                ],
              },
              {
                'displayName': '背景大小',
                'name': 'bgSize',
                'type': 'input2',
                'showDetail': true,
                'value': [
                  {
                    'displayName': '宽度',
                    'name': 'width',
                    'type': 'input',
                    'value': '20',
                    'config': {
                      'suffix': 'px',
                    },
                  },
                  {
                    'displayName': '高度',
                    'name': 'height',
                    'type': 'input',
                    'value': '20',
                    'config': {
                      'suffix': 'px',
                    },
                  },
                ],
              },
              {
                'name': 'bgColor',
                'displayName': '背景色',
                'value': '#06104a',
                'type': 'color',
              },
              {
                'name': 'bgImg',
                'displayName': '背景图',
                'type': 'image',
                'value': 'data:image/png;base64,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',
              },
            ],
          },
        ],
      },
    ],
  },
    {
      'name': 'customColumn',
      'displayName': '自定义列',
      'type': 'tabArray',
      'defaultActiveKey': '1',
      'config': {
        'template': [
          {
            'key': '1',
            'displayName': '列1',
            'name': 'tab',
            'type': 'object',
            'value': [{
              'displayName': '映射',
              'name': 'mapping',
              'type': 'input2',
              'value': [{
                'displayName': '字段名',
                'name': 'filedName',
                'type': 'input',
                'value': 'column1',
              }, { 'displayName': '显示名', 'name': 'displayName', 'type': 'input', 'value': '销售地区' }],
            }, {
              'name': 'align',
              'displayName': '对齐方式',
              'type': 'alignFull',
              'value': [{
                'name': 'textAlign',
                'displayName': '水平对齐',
                'type': 'align',
                'range': ['left', 'center', 'right'],
                'value': 'left',
              }],
            }, {
              'name': 'overflowType',
              'displayName': '文字溢出',
              'type': 'select',
              'options': [{ 'name': '省略号', 'value': 'ellipsis' }, { 'name': '换行', 'value': 'wrap' }],
              'value': 'ellipsis',
            }, {
              'displayName': '文本样式',
              'name': 'textStyle',
              'type': 'textFullStyleGroup',
              'value': [{ 'displayName': '', 'name': 'fontFamily', 'value': 'Microsoft Yahei' }, {
                'displayName': '',
                'name': 'fontSize',
                'value': 14,
              }, { 'displayName': '', 'name': 'color', 'type': 'color', 'value': '#fff' }, {
                'displayName': '',
                'name': 'bold',
                'value': false,
              }, { 'displayName': '', 'name': 'italic', 'value': false }, {
                'displayName': '字距',
                'name': 'letterSpacing',
                'value': 0,
              }, { 'displayName': '行距', 'name': 'lineHeight', 'config': { 'disabled': true }, 'value': 'unset' }],
            },
              {
                'name': 'customStyle',
                'displayName': '样式指定',
                'type': 'tabArray',
                'defaultActiveKey': '1',
                'config': {
                  'template': [
                    {
                      'key': '1',
                      'displayName': '1',
                      'name': 'tab',
                      'type': 'object',
                      'value': [{
                        'name': 'filedValue',
                        'displayName': '字段值',
                        'type': 'input',
                        'value': '',
                      }, {
                        'displayName': '文本样式',
                        'name': 'textStyle',
                        'type': 'textFullStyleGroup',
                        'value': [{ 'displayName': '', 'name': 'fontFamily', 'value': 'Microsoft Yahei' }, {
                          'displayName': '',
                          'name': 'fontSize',
                          'value': 14,
                        }, { 'displayName': '', 'name': 'color', 'type': 'color', 'value': '#fff' }, {
                          'displayName': '',
                          'name': 'bold',
                          'value': false,
                        }, { 'displayName': '', 'name': 'italic', 'value': false }, {
                          'displayName': '字距',
                          'name': 'letterSpacing',
                          'value': 0,
                        }, { 'displayName': '行距', 'name': 'lineHeight', 'value': 'unset' }],
                      }],
                    },
                  ],
                },
                'value': [{
                  'key': '1',
                  'displayName': '1',
                  'name': 'tab',
                  'type': 'object',
                  'value': [{
                    'name': 'filedValue',
                    'displayName': '字段值',
                    'type': 'input',
                    'value': '',
                  }, {
                    'displayName': '文本样式',
                    'name': 'textStyle',
                    'type': 'textFullStyleGroup',
                    'value': [{ 'displayName': '', 'name': 'fontFamily', 'value': 'Microsoft Yahei' }, {
                      'displayName': '',
                      'name': 'fontSize',
                      'value': 14,
                    }, { 'displayName': '', 'name': 'color', 'type': 'color', 'value': '#fff' }, {
                      'displayName': '',
                      'name': 'bold',
                      'value': false,
                    }, { 'displayName': '', 'name': 'italic', 'value': false }, {
                      'displayName': '字距',
                      'name': 'letterSpacing',
                      'value': 0,
                    }, { 'displayName': '行距', 'name': 'lineHeight', 'config': { 'disabled': true }, 'value': 'unset' }],
                  }],
                }],
              },
            ],
          },
        ],
      },
      'value': [{
        'key': '1',
        'displayName': '列1',
        'name': 'tab',
        'type': 'object',
        'value': [{
          'displayName': '映射',
          'name': 'mapping',
          'type': 'input2',
          'value': [{
            'displayName': '字段名',
            'name': 'filedName',
            'type': 'input',
            'value': 'column1',
          }, { 'displayName': '显示名', 'name': 'displayName', 'type': 'input', 'value': '销售地区' }],
        }, {
          'name': 'align',
          'displayName': '对齐方式',
          'type': 'alignFull',
          'value': [{
            'name': 'textAlign',
            'displayName': '水平对齐',
            'type': 'align',
            'range': ['left', 'center', 'right'],
            'value': 'left',
          }],
        }, {
          'name': 'overflowType',
          'displayName': '文字溢出',
          'type': 'select',
          'options': [{ 'name': '省略号', 'value': 'ellipsis' }, { 'name': '换行', 'value': 'wrap' }],
          'value': 'ellipsis',
        }, {
          'displayName': '文本样式',
          'name': 'textStyle',
          'type': 'textFullStyleGroup',
          'value': [{ 'displayName': '', 'name': 'fontFamily', 'value': 'Microsoft Yahei' }, {
            'displayName': '',
            'name': 'fontSize',
            'value': 14,
          }, { 'displayName': '', 'name': 'color', 'type': 'color', 'value': '#fff' }, {
            'displayName': '',
            'name': 'bold',
            'value': false,
          }, { 'displayName': '', 'name': 'italic', 'value': false }, {
            'displayName': '字距',
            'name': 'letterSpacing',
            'value': 0,
          }, { 'displayName': '行距', 'name': 'lineHeight', 'value': 'unset' }],
        }, {
          'name': 'customStyle',
          'displayName': '样式指定',
          'type': 'tabArray',
          'defaultActiveKey': '1',
          'config': {
            'template': [
              {
                'key': '1',
                'displayName': '1',
                'name': 'tab',
                'type': 'object',
                'value': [{
                  'name': 'filedValue',
                  'displayName': '字段值',
                  'type': 'input',
                  'value': '',
                }, {
                  'displayName': '文本样式',
                  'name': 'textStyle',
                  'type': 'textFullStyleGroup',
                  'value': [{ 'displayName': '', 'name': 'fontFamily', 'value': 'Microsoft Yahei' }, {
                    'displayName': '',
                    'name': 'fontSize',
                    'value': 14,
                  }, { 'displayName': '', 'name': 'color', 'type': 'color', 'value': '#fff' }, {
                    'displayName': '',
                    'name': 'bold',
                    'value': false,
                  }, { 'displayName': '', 'name': 'italic', 'value': false }, {
                    'displayName': '字距',
                    'name': 'letterSpacing',
                    'value': 0,
                  }, { 'displayName': '行距', 'name': 'lineHeight', 'config': { 'disabled': true }, 'value': 'unset' }],
                }],
              },
            ],
          },
          'value': [{
            'key': '1',
            'displayName': '1',
            'name': 'tab',
            'type': 'object',
            'value': [{
              'name': 'filedValue',
              'displayName': '字段值',
              'type': 'input',
              'value': '',
            }, {
              'displayName': '文本样式',
              'name': 'textStyle',
              'type': 'textFullStyleGroup',
              'value': [{ 'displayName': '', 'name': 'fontFamily', 'value': 'Microsoft Yahei' }, {
                'displayName': '',
                'name': 'fontSize',
                'value': 14,
              }, { 'displayName': '', 'name': 'color', 'type': 'color', 'value': '#fff' }, {
                'displayName': '',
                'name': 'bold',
                'value': false,
              }, { 'displayName': '', 'name': 'italic', 'value': false }, {
                'displayName': '字距',
                'name': 'letterSpacing',
                'value': 0,
              }, { 'displayName': '行距', 'name': 'lineHeight', 'config': { 'disabled': true }, 'value': 'unset' }],
            }],
          }],
        }],
      }, {
        'key': '2',
        'displayName': '列2',
        'name': 'tab',
        'type': 'object',
        'value': [{
          'displayName': '映射',
          'name': 'mapping',
          'type': 'input2',
          'value': [{
            'displayName': '字段名',
            'name': 'filedName',
            'type': 'input',
            'value': 'column2',
          }, { 'displayName': '显示名', 'name': 'displayName', 'type': 'input', 'value': '完成率' }],
        }, {
          'name': 'align',
          'displayName': '对齐方式',
          'type': 'alignFull',
          'value': [{
            'name': 'textAlign',
            'displayName': '水平对齐',
            'type': 'align',
            'range': ['left', 'center', 'right'],
            'value': 'left',
          }],
        }, {
          'name': 'overflowType',
          'displayName': '文字溢出',
          'type': 'select',
          'options': [{ 'name': '省略号', 'value': 'ellipsis' }, { 'name': '换行', 'value': 'wrap' }],
          'value': 'ellipsis',
        }, {
          'displayName': '文本样式',
          'name': 'textStyle',
          'type': 'textFullStyleGroup',
          'value': [{ 'displayName': '', 'name': 'fontFamily', 'value': 'Microsoft Yahei' }, {
            'displayName': '',
            'name': 'fontSize',
            'value': 14,
          }, { 'displayName': '', 'name': 'color', 'type': 'color', 'value': '#fff' }, {
            'displayName': '',
            'name': 'bold',
            'value': false,
          }, { 'displayName': '', 'name': 'italic', 'value': false }, {
            'displayName': '字距',
            'name': 'letterSpacing',
            'value': 0,
          }, { 'displayName': '行距', 'name': 'lineHeight', 'config': { 'disabled': true }, 'value': 'unset' }],
        }, {
          'name': 'customStyle',
          'displayName': '样式指定',
          'type': 'tabArray',
          'defaultActiveKey': '1',
          'config': {
            'template': [
              {
                'key': '1',
                'displayName': '1',
                'name': 'tab',
                'type': 'object',
                'value': [{
                  'name': 'filedValue',
                  'displayName': '字段值',
                  'type': 'input',
                  'value': '',
                }, {
                  'displayName': '文本样式',
                  'name': 'textStyle',
                  'type': 'textFullStyleGroup',
                  'value': [{ 'displayName': '', 'name': 'fontFamily', 'value': 'Microsoft Yahei' }, {
                    'displayName': '',
                    'name': 'fontSize',
                    'value': 14,
                  }, { 'displayName': '', 'name': 'color', 'type': 'color', 'value': '#fff' }, {
                    'displayName': '',
                    'name': 'bold',
                    'value': false,
                  }, { 'displayName': '', 'name': 'italic', 'value': false }, {
                    'displayName': '字距',
                    'name': 'letterSpacing',
                    'value': 0,
                  }, { 'displayName': '行距', 'name': 'lineHeight', 'config': { 'disabled': true }, 'value': 'unset' }],
                }],
              },
            ],
          },
          'value': [{
            'key': '1',
            'displayName': '1',
            'name': 'tab',
            'type': 'object',
            'value': [{
              'name': 'filedValue',
              'displayName': '字段值',
              'type': 'input',
              'value': '',
            }, {
              'displayName': '文本样式',
              'name': 'textStyle',
              'type': 'textFullStyleGroup',
              'value': [{ 'displayName': '', 'name': 'fontFamily', 'value': 'Microsoft Yahei' }, {
                'displayName': '',
                'name': 'fontSize',
                'value': 14,
              }, { 'displayName': '', 'name': 'color', 'type': 'color', 'value': '#fff' }, {
                'displayName': '',
                'name': 'bold',
                'value': false,
              }, { 'displayName': '', 'name': 'italic', 'value': false }, {
                'displayName': '字距',
                'name': 'letterSpacing',
                'value': 0,
              }, { 'displayName': '行距', 'name': 'lineHeight', 'config': { 'disabled': true }, 'value': 'unset' }],
            }],
          }],
        }],
      }, {
        'key': '3',
        'displayName': '列3',
        'name': 'tab',
        'type': 'object',
        'value': [{
          'displayName': '映射',
          'name': 'mapping',
          'type': 'input2',
          'value': [{
            'displayName': '字段名',
            'name': 'filedName',
            'type': 'input',
            'value': 'column3',
          }, { 'displayName': '显示名', 'name': 'displayName', 'type': 'input', 'value': '完成情况' }],
        }, {
          'name': 'align',
          'displayName': '对齐方式',
          'type': 'alignFull',
          'value': [{
            'name': 'textAlign',
            'displayName': '水平对齐',
            'type': 'align',
            'range': ['left', 'center', 'right'],
            'value': 'left',
          }],
        }, {
          'name': 'overflowType',
          'displayName': '文字溢出',
          'type': 'select',
          'options': [{ 'name': '省略号', 'value': 'ellipsis' }, { 'name': '换行', 'value': 'wrap' }],
          'value': 'ellipsis',
        }, {
          'displayName': '文本样式',
          'name': 'textStyle',
          'type': 'textFullStyleGroup',
          'value': [{ 'displayName': '', 'name': 'fontFamily', 'value': 'Microsoft Yahei' }, {
            'displayName': '',
            'name': 'fontSize',
            'value': 14,
          }, { 'displayName': '', 'name': 'color', 'type': 'color', 'value': '#fff' }, {
            'displayName': '',
            'name': 'bold',
            'value': false,
          }, { 'displayName': '', 'name': 'italic', 'value': false }, {
            'displayName': '字距',
            'name': 'letterSpacing',
            'value': 0,
          }, { 'displayName': '行距', 'name': 'lineHeight', 'config': { 'disabled': true }, 'value': 'unset' }],
        }, {
          'name': 'customStyle',
          'displayName': '样式指定',
          'type': 'tabArray',
          'defaultActiveKey': '1',
          'config': {
            'template': [
              {
                'key': '1',
                'displayName': '1',
                'name': 'tab',
                'type': 'object',
                'value': [{
                  'name': 'filedValue',
                  'displayName': '字段值',
                  'type': 'input',
                  'value': '',
                }, {
                  'displayName': '文本样式',
                  'name': 'textStyle',
                  'type': 'textFullStyleGroup',
                  'value': [{ 'displayName': '', 'name': 'fontFamily', 'value': 'Microsoft Yahei' }, {
                    'displayName': '',
                    'name': 'fontSize',
                    'value': 14,
                  }, { 'displayName': '', 'name': 'color', 'type': 'color', 'value': '#fff' }, {
                    'displayName': '',
                    'name': 'bold',
                    'value': false,
                  }, { 'displayName': '', 'name': 'italic', 'value': false }, {
                    'displayName': '字距',
                    'name': 'letterSpacing',
                    'value': 0,
                  }, { 'displayName': '行距', 'name': 'lineHeight', 'config': { 'disabled': true }, 'value': 'unset' }],
                }],
              },
            ],
          },
          'value': [{
            'key': '1',
            'displayName': '1',
            'name': 'tab',
            'type': 'object',
            'value': [{
              'name': 'filedValue',
              'displayName': '字段值',
              'type': 'input',
              'value': '',
            }, {
              'displayName': '文本样式',
              'name': 'textStyle',
              'type': 'textFullStyleGroup',
              'value': [{ 'displayName': '', 'name': 'fontFamily', 'value': 'Microsoft Yahei' }, {
                'displayName': '',
                'name': 'fontSize',
                'value': 14,
              }, { 'displayName': '', 'name': 'color', 'type': 'color', 'value': '#fff' }, {
                'displayName': '',
                'name': 'bold',
                'value': false,
              }, { 'displayName': '', 'name': 'italic', 'value': false }, {
                'displayName': '字距',
                'name': 'letterSpacing',
                'value': 0,
              }, { 'displayName': '行距', 'name': 'lineHeight', 'config': { 'disabled': true }, 'value': 'unset' }],
            }],
          }],
        }],
      }],
    },
  ],
  'themes': [{ 'id': 'theme-default', 'name': '系统默认' }, {
    'id': 'theme-light',
    'name': '浅色风格',
  }, { 'id': 'theme-gov-blue', 'name': '政务蓝' }],
}


export default ComponentDefaultConfig
