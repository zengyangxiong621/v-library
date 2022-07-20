import { DOMElement, useEffect, useRef, useState } from 'react'
import { connect } from 'dva'
import { Button } from 'antd'
import { useSetState } from 'ahooks'
import CustomDraggable from '../../routes/dashboard/center/components/CustomDraggable'
import { http } from '@/services/request'
import * as React from 'react'

interface State {
  states: string[];

  [key: string]: any;
}

const DynamicPanel = ({ bar, id }: any) => {

  const [ state, setState ] = useSetState<State>({
    states: [],
    defaultState: '',
    components: [],
    layers: [],
  })

  useEffect(() => {
    (async function() {
      const panelConfig = await http({
        url: `/visual/panel/detail/${ id }`,
        method: 'get',
      })
      console.log('panelConfig', panelConfig)
      // 获取面板想起接口
      const { states, config: recommendConfig } = panelConfig
      console.log('config', recommendConfig)
      const dom: HTMLElement | null = document.querySelector(`[data-id=panel_${id}]`)
      if (dom) {
        console.log('dom', dom)
        console.log('width', recommendConfig.width)
        console.log('height', recommendConfig.height)
        dom.style.width = recommendConfig.width + 'px'
        dom.style.height = recommendConfig.height + 'px'
        dom.style.transform = `translate(${recommendConfig.left}px, ${recommendConfig.top}px)`

      }
      // 默认取第一个
      const defaultState = states[0] || ''
      // 获取画布详情接口
      const config = {
        components: [
          {
            'id': '1549293939994894338',
            'name': '文字组件',
            'moduleName': 'wordText',
            'moduleVersion': '1.0.0',
            'lastModuleVersion': null,
            'moduleType': 'text',
            'config': [
              {
                'displayName': '位置尺寸',
                'name': 'dimension',
                'type': 'dimensionGroup',
                'config': {
                  'lock': false,
                },
                'value': [
                  {
                    'displayName': 'X轴坐标',
                    'name': 'left',
                    'value': 645.9286561378651,
                  },
                  {
                    'displayName': 'Y轴坐标',
                    'name': 'top',
                    'value': 372.5196952049515,
                  },
                  {
                    'displayName': '宽度',
                    'name': 'width',
                    'value': 476.7687456811188,
                  },
                  {
                    'displayName': '高度',
                    'name': 'height',
                    'value': 199.51762336354477,
                  },
                ],
              },
              {
                'displayName': '默认隐藏',
                'name': 'hideDefault',
                'type': 'checkBox',
                'value': false,
              },
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
                    'value': 32,
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
                    'value': '48',
                  },
                ],
              },
              {
                'displayName': '对齐方式',
                'name': 'align',
                'type': 'alignFull',
                'value': [
                  {
                    'displayName': '水平对齐',
                    'name': 'textAlign',
                    'type': 'align',
                    'value': 'bothEnds',
                  },
                  {
                    'displayName': '垂直对齐',
                    'name': 'textVertical',
                    'type': 'vertical',
                    'value': 'top',
                  },
                ],
              },
              {
                'hasSwitch': true,
                'defaultExpand': true,
                'displayName': '阴影',
                'name': 'shadow',
                'type': 'collapse',
                'value': [
                  {
                    'displayName': '',
                    'name': 'show',
                    'type': 'switch',
                    'value': false,
                  },
                  {
                    'displayName': '文本阴影',
                    'name': 'shadow',
                    'type': 'boxShadow',
                    'value': {
                      'color': '#0075FF',
                      'hShadow': 0,
                      'blur': 8,
                      'vShadow': 0,
                    },
                  },
                ],
              },
            ],
            'dataConfig': {},
            'autoUpdate': {},
            'dataType': 'static',
            'staticData': {
              'data': [
                {
                  'text': '文字组件',
                },
              ],
              'fields': [
                {
                  'name': 'text',
                  'value': 'text',
                  'desc': '文本',
                  'status': true,
                },
              ],
            },
            'events': [],
            'triggers': [],
            'useFilter': false,
            'filters': [],
            'actions': [],
            'parent': null,
            'dashboardId': '1547488985443020802',
            'dataContainers': [],
            'dataFrom': 0,
            'callbackArgs': [],
          },
          {
            'id': '1549580896234364929',
            'name': '轮播表格',
            'moduleName': 'scrollTable',
            'moduleVersion': '1.0.0',
            'lastModuleVersion': null,
            'moduleType': 'assist',
            'config': [
              {
                'displayName': '位置尺寸',
                'name': 'dimension',
                'type': 'dimensionGroup',
                'config': {
                  'lock': false,
                },
                'value': [
                  {
                    'displayName': 'X轴坐标',
                    'name': 'left',
                    'value': 668.9657958017326,
                  },
                  {
                    'displayName': 'Y轴坐标',
                    'name': 'top',
                    'value': 174.9972480750422,
                  },
                  {
                    'displayName': '宽度',
                    'name': 'width',
                    'value': 571.8087817862836,
                  },
                  {
                    'displayName': '高度',
                    'name': 'height',
                    'value': 598.5528700906344,
                  },
                ],
              },
              {
                'displayName': '默认隐藏',
                'name': 'hideDefault',
                'type': 'checkBox',
                'value': false,
              },
              {
                'hasSwitch': false,
                'defaultExpand': true,
                'displayName': '全局',
                'name': 'allGlobal',
                'type': 'collapse',
                'value': [
                  {
                    'displayName': '',
                    'name': 'show',
                    'type': 'switch',
                    'value': false,
                  },
                  {
                    'displayName': '表格行数',
                    'name': 'rowNums',
                    'type': 'number',
                    'config': {
                      'min': 0,
                      'max': 24,
                      'step': 1,
                      'suffix': '',
                    },
                    'value': 5,
                  },
                  {
                    'displayName': '字体',
                    'name': 'fontFamily',
                    'options': [
                      {
                        'name': '宋体',
                        'value': '宋体',
                      },
                      {
                        'name': '微软雅黑',
                        'value': 'Microsoft Yahei',
                      },
                      {
                        'name': '黑体',
                        'value': 'SimHei',
                      },
                    ],
                    'type': 'select',
                    'value': 'Microsoft Yahei',
                  },
                ],
              },
              {
                'hasSwitch': false,
                'defaultExpand': true,
                'displayName': '动画',
                'name': 'animation',
                'type': 'collapse',
                'value': [
                  {
                    'displayName': '',
                    'name': 'show',
                    'type': 'switch',
                    'value': true,
                  },
                  {
                    'displayName': '动画模式',
                    'name': 'animationModel',
                    'options': [
                      {
                        'name': '逐条滚动',
                        'value': 'single',
                      },
                      {
                        'name': '整页滚动',
                        'value': 'page',
                      },
                    ],
                    'type': 'select',
                    'value': 'single',
                  },
                  {
                    'displayName': '轮播间隔',
                    'name': 'scrollInterval',
                    'type': 'number',
                    'config': {
                      'min': 0,
                      'max': 24000,
                      'step': 1000,
                      'suffix': 'ms',
                    },
                    'value': 5000,
                  },
                ],
              },
              {
                'hasSwitch': true,
                'defaultExpand': false,
                'displayName': '表头',
                'name': 'tableHeader',
                'type': 'collapse',
                'value': [
                  {
                    'displayName': '',
                    'name': 'show',
                    'type': 'switch',
                    'value': true,
                  },
                  {
                    'displayName': '行高',
                    'name': 'lineHeight',
                    'type': 'range',
                    'value': 35,
                    'config': {
                      'min': 0,
                      'max': 100,
                      'step': 1,
                      'suffix': 'px',
                    },
                  },
                  {
                    'displayName': '背景颜色',
                    'name': 'bgColor',
                    'type': 'color',
                    'value': '#222430',
                  },
                  {
                    'displayName': '文本对齐',
                    'name': 'textAlign',
                    'options': [
                      {
                        'name': '左对齐',
                        'value': 'left',
                      },
                      {
                        'name': '居中',
                        'value': 'center',
                      },
                      {
                        'name': '右对齐',
                        'value': 'right',
                      },
                    ],
                    'type': 'select',
                    'value': 'left',
                  },
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
                        'value': '35px',
                      },
                    ],
                  },
                ],
              },
              {
                'hasSwitch': true,
                'defaultExpand': true,
                'displayName': '行配置',
                'name': 'tableRow',
                'type': 'collapse',
                'value': [
                  {
                    'displayName': '',
                    'name': 'show',
                    'type': 'switch',
                    'value': true,
                  },
                  {
                    'displayName': '奇行背景色',
                    'name': 'evenBgColor',
                    'type': 'color',
                    'value': '#222430',
                  },
                  {
                    'displayName': '偶行背景色',
                    'name': 'oddBgColor',
                    'type': 'color',
                    'value': '#2a2d3c',
                  },
                ],
              },
              {
                'hasSwitch': true,
                'defaultExpand': true,
                'displayName': '序号列',
                'name': 'tableIndex',
                'type': 'collapse',
                'value': [
                  {
                    'displayName': '',
                    'name': 'show',
                    'type': 'switch',
                    'value': true,
                  },
                  {
                    'displayName': '标题',
                    'name': 'title',
                    'type': 'input',
                    'value': '#',
                  },
                  {
                    'displayName': '背景颜色',
                    'name': 'bgColor',
                    'type': 'color',
                    'value': '#222430',
                  },
                  {
                    'displayName': '文本对齐',
                    'name': 'textAlign',
                    'options': [
                      {
                        'name': '左对齐',
                        'value': 'left',
                      },
                      {
                        'name': '居中',
                        'value': 'center',
                      },
                      {
                        'name': '右对齐',
                        'value': 'right',
                      },
                    ],
                    'type': 'select',
                    'value': 'left',
                  },
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
                        'value': '48px',
                      },
                    ],
                  },
                ],
              },
              {
                'displayName': '自定义列',
                'name': 'customColumn',
                'type': 'tabArray',
                'defaultActiveKey': '1',
                'value': [
                  {
                    'displayName': '列1',
                    'name': 'tab',
                    'type': 'object',
                    'value': [
                      {
                        'displayName': '映射',
                        'name': 'mapping',
                        'type': 'input2',
                        'value': [
                          {
                            'displayName': '字段名',
                            'name': 'filedName',
                            'type': 'input',
                            'value': 'column1',
                          },
                          {
                            'displayName': '显示名',
                            'name': 'displayName',
                            'type': 'input',
                            'value': '销售地区',
                          },
                        ],
                      },
                      {
                        'displayName': '对齐方式',
                        'name': 'align',
                        'type': 'alignFull',
                        'value': [
                          {
                            'displayName': '水平对齐',
                            'name': 'textAlign',
                            'range': [
                              'left',
                              'center',
                              'right',
                            ],
                            'type': 'align',
                            'value': 'left',
                          },
                        ],
                      },
                      {
                        'displayName': '文字溢出',
                        'name': 'overflowType',
                        'options': [
                          {
                            'name': '省略号',
                            'value': 'ellipsis',
                          },
                          {
                            'name': '换行',
                            'value': 'wrap',
                          },
                        ],
                        'type': 'select',
                        'value': 'ellipsis',
                      },
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
                            'value': '35px',
                          },
                        ],
                      },
                      {
                        'displayName': '样式指定',
                        'name': 'customStyle',
                        'type': 'tabArray',
                        'defaultActiveKey': '1',
                        'value': [
                          {
                            'displayName': '1',
                            'name': 'tab',
                            'type': 'object',
                            'value': [
                              {
                                'displayName': '字段值',
                                'name': 'filedValue',
                                'type': 'input',
                                'value': '北京',
                              },
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
                                    'value': '#f02a2a',
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
                                    'value': '35px',
                                  },
                                ],
                              },
                            ],
                            'key': '1',
                          },
                          {
                            'displayName': '2',
                            'name': 'tab',
                            'type': 'object',
                            'value': [
                              {
                                'displayName': '字段值',
                                'name': 'filedValue',
                                'type': 'input',
                                'value': '',
                              },
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
                                    'value': '35px',
                                  },
                                ],
                              },
                            ],
                            'key': '2',
                          },
                        ],
                      },
                    ],
                    'key': '1',
                  },
                  {
                    'displayName': '列2',
                    'name': 'tab',
                    'type': 'object',
                    'value': [
                      {
                        'displayName': '映射',
                        'name': 'mapping',
                        'type': 'input2',
                        'value': [
                          {
                            'displayName': '字段名',
                            'name': 'filedName',
                            'type': 'input',
                            'value': 'column2',
                          },
                          {
                            'displayName': '显示名',
                            'name': 'displayName',
                            'type': 'input',
                            'value': '完成率',
                          },
                        ],
                      },
                      {
                        'displayName': '对齐方式',
                        'name': 'align',
                        'type': 'alignFull',
                        'value': [
                          {
                            'displayName': '水平对齐',
                            'name': 'textAlign',
                            'range': [
                              'left',
                              'center',
                              'right',
                            ],
                            'type': 'align',
                            'value': 'left',
                          },
                        ],
                      },
                      {
                        'displayName': '文字溢出',
                        'name': 'overflowType',
                        'options': [
                          {
                            'name': '省略号',
                            'value': 'ellipsis',
                          },
                          {
                            'name': '换行',
                            'value': 'wrap',
                          },
                        ],
                        'type': 'select',
                        'value': 'ellipsis',
                      },
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
                            'value': '35px',
                          },
                        ],
                      },
                      {
                        'displayName': '样式指定',
                        'name': 'customStyle',
                        'type': 'tabArray',
                        'defaultActiveKey': '1',
                        'value': [
                          {
                            'displayName': '1',
                            'name': 'tab',
                            'type': 'object',
                            'value': [
                              {
                                'displayName': '字段值',
                                'name': 'filedValue',
                                'type': 'input',
                                'value': '',
                              },
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
                                    'value': '35px',
                                  },
                                ],
                              },
                            ],
                            'key': '1',
                          },
                        ],
                      },
                    ],
                    'key': '2',
                  },
                  {
                    'displayName': '列3',
                    'name': 'tab',
                    'type': 'object',
                    'value': [
                      {
                        'displayName': '映射',
                        'name': 'mapping',
                        'type': 'input2',
                        'value': [
                          {
                            'displayName': '字段名',
                            'name': 'filedName',
                            'type': 'input',
                            'value': 'column3',
                          },
                          {
                            'displayName': '显示名',
                            'name': 'displayName',
                            'type': 'input',
                            'value': '完成情况',
                          },
                        ],
                      },
                      {
                        'displayName': '对齐方式',
                        'name': 'align',
                        'type': 'alignFull',
                        'value': [
                          {
                            'displayName': '水平对齐',
                            'name': 'textAlign',
                            'range': [
                              'left',
                              'center',
                              'right',
                            ],
                            'type': 'align',
                            'value': 'left',
                          },
                        ],
                      },
                      {
                        'displayName': '文字溢出',
                        'name': 'overflowType',
                        'options': [
                          {
                            'name': '省略号',
                            'value': 'ellipsis',
                          },
                          {
                            'name': '换行',
                            'value': 'wrap',
                          },
                        ],
                        'type': 'select',
                        'value': 'ellipsis',
                      },
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
                            'value': '35px',
                          },
                        ],
                      },
                      {
                        'displayName': '样式指定',
                        'name': 'customStyle',
                        'type': 'tabArray',
                        'defaultActiveKey': '1',
                        'value': [
                          {
                            'displayName': '1',
                            'name': 'tab',
                            'type': 'object',
                            'value': [
                              {
                                'displayName': '字段值',
                                'name': 'filedValue',
                                'type': 'input',
                                'value': '',
                              },
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
                                    'value': '35px',
                                  },
                                ],
                              },
                            ],
                            'key': '1',
                          },
                        ],
                      },
                    ],
                    'key': '3',
                  },
                ],
              },
            ],
            'dataConfig': {},
            'autoUpdate': {},
            'dataType': 'static',
            'staticData': {
              'data': [
                {
                  'column1': '北京',
                  'column3': '超预期',
                  'column2': 87.2,
                },
                {
                  'column1': '上海',
                  'column3': '达标',
                  'column2': 80.5,
                },
                {
                  'column1': '杭州',
                  'column3': '达标',
                  'column2': 72.3,
                },
                {
                  'column1': '重庆',
                  'column3': '未达标',
                  'column2': 65.5,
                },
                {
                  'column1': '成都',
                  'column3': '未达标',
                  'column2': 58.4,
                },
                {
                  'column1': '厦门',
                  'column3': '未达标',
                  'column2': 52.5,
                },
                {
                  'column1': '云南',
                  'column3': '未达标',
                  'column2': 40.2,
                },
              ],
              'fields': [
                {
                  'name': 'column1',
                  'value': 'column1',
                  'desc': '文本',
                },
                {
                  'name': 'column2',
                  'value': 'column2',
                  'desc': '文本',
                },
                {
                  'name': 'column3',
                  'value': 'column3',
                  'desc': '文本',
                },
                {
                  'name': 'column4',
                  'value': 'column4',
                  'desc': '文本',
                },
                {
                  'name': 'column5',
                  'value': 'column5',
                  'desc': '文本',
                },
              ],
            },
            'events': [],
            'triggers': [],
            'useFilter': false,
            'filters': [],
            'actions': [],
            'parent': null,
            'dashboardId': '1547488985443020802',
            'dataContainers': [],
            'dataFrom': 0,
            'callbackArgs': [],
          },
          {
            'id': '1549590751520419842',
            'name': '文字组件',
            'moduleName': 'wordText',
            'moduleVersion': '1.0.0',
            'lastModuleVersion': null,
            'moduleType': 'text',
            'config': [
              {
                'displayName': '位置尺寸',
                'name': 'dimension',
                'type': 'dimensionGroup',
                'config': {
                  'lock': false,
                },
                'value': [
                  {
                    'displayName': 'X轴坐标',
                    'name': 'left',
                    'value': 1215,
                  },
                  {
                    'displayName': 'Y轴坐标',
                    'name': 'top',
                    'value': 57,
                  },
                  {
                    'displayName': '宽度',
                    'name': 'width',
                    'value': 166.97583081570997,
                  },
                  {
                    'displayName': '高度',
                    'name': 'height',
                    'value': 74.3081570996979,
                  },
                ],
              },
              {
                'displayName': '默认隐藏',
                'name': 'hideDefault',
                'type': 'checkBox',
                'value': false,
              },
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
                    'value': 32,
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
                    'value': '48',
                  },
                ],
              },
              {
                'displayName': '对齐方式',
                'name': 'align',
                'type': 'alignFull',
                'value': [
                  {
                    'displayName': '水平对齐',
                    'name': 'textAlign',
                    'type': 'align',
                    'value': 'bothEnds',
                  },
                  {
                    'displayName': '垂直对齐',
                    'name': 'textVertical',
                    'type': 'vertical',
                    'value': 'top',
                  },
                ],
              },
              {
                'hasSwitch': true,
                'defaultExpand': true,
                'displayName': '阴影',
                'name': 'shadow',
                'type': 'collapse',
                'value': [
                  {
                    'displayName': '',
                    'name': 'show',
                    'type': 'switch',
                    'value': false,
                  },
                  {
                    'displayName': '文本阴影',
                    'name': 'shadow',
                    'type': 'boxShadow',
                    'value': {
                      'color': '#0075FF',
                      'hShadow': 0,
                      'blur': 8,
                      'vShadow': 0,
                    },
                  },
                ],
              },
            ],
            'dataConfig': {},
            'autoUpdate': {},
            'dataType': 'static',
            'staticData': {
              'data': [
                {
                  'text': '文字组件',
                },
              ],
              'fields': [
                {
                  'name': 'text',
                  'value': 'text',
                  'desc': '文本',
                  'status': true,
                },
              ],
            },
            'events': [],
            'triggers': [],
            'useFilter': false,
            'filters': [],
            'actions': [],
            'parent': null,
            'dashboardId': '1547488985443020802',
            'dataContainers': [],
            'dataFrom': 0,
            'callbackArgs': [],
          },
        ],
        layers: [
          {
            'isLock': false,
            'name': '文字组件',
            'moduleName': 'wordText',
            'id': '1549590751520419842',
            'isShow': true,
          },
          {
            'isLock': false,
            'singleShowLayer': false,
            'name': '分组',
            'id': 'group_1658286227566',
            'title': '分组',
            'opacity': 100,
            'modules': [
              {
                'isLock': false,
                'singleShowLayer': false,
                'name': '文字组件',
                'moduleName': 'wordText',
                'id': '1549293939994894338',
                'selected': true,
                'isShow': true,
              },
              {
                'isLock': false,
                'singleShowLayer': false,
                'name': '轮播表格',
                'moduleName': 'scrollTable',
                'id': '1549580896234364929',
                'selected': true,
                'isShow': true,
              },
            ],
            'isShow': true,
          },
        ],
        dashboardConfig: {},
      }
      const { components, layers, dashboardConfig } = config
      setState({
        states,
        components,
        layers,
        dashboardConfig,
      })
    })()

  }, [])

  return (
    <div className="reference-panel">
      <CustomDraggable mouse={ 0 } treeData={ state.layers }/>
    </div>
  )
}

export default connect(({ bar }: any) => ({ bar }))(DynamicPanel)
