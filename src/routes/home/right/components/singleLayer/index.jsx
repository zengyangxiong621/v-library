import React, { memo, useState, useEffect } from 'react'
import { connect } from 'dva'
import './index.less'
import { deepClone } from '../../../../../utils'
import LoadAnimation from '../loadAnimation'
import { EditableTable } from '../fieldMapTable'
import ComponentCard from '../componentCard'
import CodeEditor from '../codeEditor'
import CusSelect from '../cusSelect'
import CusEvent from '../cusEvent'

import componentLib from '../index'

import {
  Tabs,
  Checkbox,
  Button
} from 'antd';
import {
  PlusOutlined,
  RedoOutlined
} from '@ant-design/icons';

import debounce from 'lodash/debounce';
import { useFetch } from '../../../../tempDataSource/tool/useFetch'

const componentConfig = {
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
      'hasSwitch': true,
      'defaultExpand': true,
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
    {
      'name': 'xxx',
      'displayName': '旋转角度',
      type: 'rotate',
      value: {
        angle: 0, // 角度
        direction: 'horizontal' // 方向
      }
    },
    {
      'name': 'xxx',
      'displayName': '饼图描边',
      type: 'border',
      value: {
        type: 'solid', // dotted 
        width: 1,
        color: '#000000' // rgba(0,0,0,0)
      }
    },
    {
      name: 'xxx',
      displayName: 'xxx',
      type: 'padding',
      value: {
        top: 1,
        right: 1,
        bottom: 1,
        left: 1
      }
    },
    {
      name: "xxx",
      displayName: 'xxx',
      type: 'select',
      value: 'a',
      options: [
        {
          name: 'a',
          value: 'a'
        },
        {
          name: 'b',
          value: 'b'
        },
      ]
    },
    {
      name: "xxx",
      displayName: 'xxx',
      type: 'chartText',
      value: {
        fontFamily: 'bolder',
        fontSize: 12,
        color: '#000000',
        fontWeight: 'normal' // bold bolder lighter
      }
    },
    {
      name: "xxx",
      displayName: 'xxx',
      type: 'inputNumber2',
      showDetail: true, // 是否展示下面的文字说明
      value: [
        {
          name: 'a',
          displayName: '粗细',
          type: 'number',
          value: 1,
          config: {
            min: 0,
            suffix: 'px',  // 输入框后缀
          }
        },
        {
          name: 'b',
          displayName: '长度',
          type: 'number',
          value: 20,
          config: {
            min: 0,
            suffix: 'px',  // 输入框后缀
          }
        },
      ]
    },
    {
      name: "xxx",
      displayName: 'xxx',
      type: 'textStroke',
      value: {
        width: 1,
        color: '#000000'
      }
    },
    {
      name: "xxx",
      displayName: 'xxx',
      type: 'radioGroup',
      direction: 'horizontal', // 方向
      value: 'a',
      options: [
        {
          name: 'a',
          value: 'a'
        },
        {
          name: 'b',
          value: 'b'
        },
      ]
    },
    {
      name: "xxx",
      displayName: 'xxx',
      type: 'input',
      value: 'a',
    },
    {
      name: 'xxx',
      displayName: 'xxx',
      type: 'checkBoxGroup',
      direction: 'horizontal', // 方向
      value: ['a'],
      options: [
        {
          name: 'a',
          value: 'a'
        },
        {
          name: 'b',
          value: 'b'
        },
      ]
    },
    {
      name: 'xxx',
      dispalyName: 'xxx',
      type: 'tabs',
      activeKey: '1', // 默认选中第一项
      options: [
        {
          key: '1',
          name: 'tab1',
          value: [
            {
              name: 'xxx',
              displayName: 'xxx',
              type: 'checkBoxGroup',
              direction: 'horizontal', // 方向
              value: ['a'],
              options: [
                {
                  name: 'a',
                  value: 'a'
                },
                {
                  name: 'b',
                  value: 'b'
                },
              ]
            },
          ]
        },
        {
          key: '2',
          name: 'tab2',
          value: [
            {
              name: 'xxx',
              displayName: 'xxx',
              type: 'checkBoxGroup',
              direction: 'horizontal', // 方向
              value: ['a'],
              options: [
                {
                  name: 'a',
                  value: 'a'
                },
                {
                  name: 'b',
                  value: 'b'
                },
              ]
            },
          ]
        }
      ]
    }
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
}

const codeData = {
  readOnly: false,
  language: 'javascript',
  value: `function onLoad(editor) {
    console.log("i've loaded");
  }
  function onLoad(editor) {
    console.log("i've loaded");
  }
  function onLoad(editor) {
    console.log("i've loaded");
  }
  function onLoad(editor) {
    console.log("i've loaded");
  }
  function onLoad(editor) {
    console.log("i've loaded");
  }
  function onLoad(editor) {
    console.log("i've loaded");
  }
  function onLoad(editor) {
    console.log("i've loaded");
  }
  function onLoad(editor) {
    console.log("i've loaded");
  }
  function onLoad(editor) {
    console.log("i've loaded");
  }`,
  showExpand: true
};

const selectData = {
  name: "xxx",
  displayName: '',
  type: 'select',
  value: 'static',
  options: [
    {
      name: '静态数据',
      value: 'static'
    },
    {
      name: '动态数据',
      value: 'dynamic'
    },
  ]
}

const SingleLayer = ({ bar, dispatch, ...props }) => {
  const { TabPane } = Tabs;
  const formItemLayout = {
    labelAlign: 'left'
  };
  const componentConfig = deepClone(bar.componentConfig)
  const styleConfig = componentConfig.config
  const interactionConfig = componentConfig.interaction
  const dataConfig = componentConfig.staticData

  const settingsChange = () => {
    dispatch({
      type: 'bar/setComponentConfig',
      payload: componentConfig
    })
  }

  const styleChange = debounce(() => {
    console.log('style change', componentConfig)
    dispatch({
      type: 'bar/setComponentConfig',
      payload: componentConfig
    })
    saveStyleData()
  }, 300)

  const saveStyleData = async () => {
    // todo 替换假数据
    const params = {
      configs: [{
        id: '1513704667434328066' || componentConfig.id,
        name: 'cdb-空白应用组件' || componentConfig.name,
        moduleName: 'cdb-component-1' || componentConfig.moduleName,
        moduleVersion: 'cdb-v-1.1' || componentConfig.moduleVersion,
        config: componentConfig.config,
      }],
      dashboardId: "1513702962304577537"
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await useFetch('/visual/module/update', {
      body: JSON.stringify(params)
    })
  }

  return (
    <div className="SingleLayer-wrap">
      <div className="content">
        <Tabs defaultActiveKey="1" type="card" className="custom-tabs">
          <TabPane tab="样式" key="1">
            <ComponentCard data={componentConfig}>
              {styleConfig.map((item, index) => {
                if (!(item.type && componentLib[item.type])) {
                  return null;
                }
                const TagName = componentLib[item.type];
                return (
                  <TagName data={item} onChange={styleChange} key={index} />
                )
              })}
            </ComponentCard>
          </TabPane>
          <TabPane tab="数据" key="2">
            <ComponentCard data={componentConfig}>
              <div className="data-config" style={{ marginTop: 0 }}>
                <div className="data-header">
                  <label className="data-name">数据接口</label>
                  <span className="data-interface"><i></i>配置完成</span>
                </div>
                <div className="data-content">
                  <EditableTable data={dataConfig} onChange={settingsChange} />
                </div>
              </div>
              <div className="data-config">
                <div className="data-header">
                  <label className="data-name">数据源类型</label>
                  <CusSelect data={selectData} onChange={settingsChange} style={{ width: '207px' }} />
                </div>
                <div className="data-content">
                  <div style={{ width: '300px', height: '198px', marginTop: '16px' }}>
                    <CodeEditor data={codeData} onChange={settingsChange} />
                  </div>
                </div>
                <div className="data-footer">
                  <Checkbox>数据过滤器</Checkbox>
                  <Button icon={<PlusOutlined />}>添加过滤器</Button>
                </div>
              </div>
              <div className="data-config">
                <div className="data-header">
                  <label className="data-name">数据响应结果（只读）</label>
                  <Button icon={<RedoOutlined />} style={{ border: 0, background: 'transparent' }} />
                </div>
                <div className="data-content">
                  <div style={{ width: '300px', height: '198px', marginTop: '16px' }}>
                    <CodeEditor data={codeData} onChange={settingsChange} />
                  </div>
                </div>
              </div>
            </ComponentCard>
          </TabPane>
          <TabPane tab="交互" key="3">
            <ComponentCard data={componentConfig}>
              <LoadAnimation data={interactionConfig} onChange={settingsChange} />
              <CusEvent />
            </ComponentCard>
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default connect(({ bar }) => ({
  bar
}))(SingleLayer)
