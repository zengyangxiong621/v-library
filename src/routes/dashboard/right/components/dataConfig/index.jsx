import React, { memo, useState, useEffect } from 'react'
import './index.less'

import { EditableTable } from '../fieldMapTable'
import CodeEditor from '../codeEditor'
import CusSelect from '../cusSelect'
import DataConfigDrawer from '../dataConfigDrawer'

import {
  Checkbox,
  Button
} from 'antd';
import {
  PlusOutlined,
  RedoOutlined
} from '@ant-design/icons';

const codeData = {
  readOnly: false,
  language: 'javascript', 
  value: `function onLoad(editor) {
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

const staticData = {
  //静态数据
  "data": [
    {
      "text": "我是文字组件111"
    }
  ],
  "fields": [
    {
      "name": "text",
      "value": "text",
      "desc": "文本",
      "status": true // 状态
    }
  ]
}

const DataConfig = ({ bar, dispatch, ...props }) => {
  const _data = props.data;
  const [drawerVisible,setDrawerVisible] = useState(false)

  const settingsChange = () => {

  }

  const addDataFilters = () => {
    setDrawerVisible(true)
  }

  const drawerClose = () => {
    setDrawerVisible(false)
  }

  return (
    <React.Fragment>
      <div className="data-config" style={{ marginTop: 0 }}>
        <div className="data-header">
          <label className="data-name">数据接口</label>
          <span className="data-interface"><i></i>配置完成</span>
        </div>
        <div className="data-content">
          <EditableTable data={staticData} onChange={settingsChange} />
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
          <Checkbox onClick={addDataFilters}>数据过滤器</Checkbox>
          <Button onClick={addDataFilters} icon={<PlusOutlined />}>添加过滤器</Button>
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
      <DataConfigDrawer
        visible={drawerVisible}
        onClose={drawerClose}
      />
    </React.Fragment>
  )
}

export default memo(DataConfig)
