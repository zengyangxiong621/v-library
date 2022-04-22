import React, { memo, useState, useEffect } from 'react'
import './index.less'

import { EditableTable } from '../fieldMapTable'
import CodeEditor from '../codeEditor'
import CusSelect from '../cusSelect'
import DataConfigDrawer from '../dataConfigDrawer'
import debounce from 'lodash/debounce';

import {
  Checkbox,
  Button,
  message
} from 'antd';
import {
  PlusOutlined,
  RedoOutlined
} from '@ant-design/icons';

const sourceCodeData = {
  readOnly: false,
  language: 'json',
  value: ``,
  showExpand: true
};

const resultCodeData = {
  readOnly: true,
  language: 'json',
  value: ``,
  showExpand: false
}

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

const DataConfig = ({ bar, dispatch, ...props }) => {
  const _data = props.data;
  const _fields = _data.staticData.fields
  const [dataSourceTypes, setDataSourceTypes] = useState(selectData)
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [filterFlag, setFilterFlag] = useState(false)
  const [filters, setFilters] = useState([])
  const [staticData, setStaticData] = useState(sourceCodeData)
  const [resultData, setResultData] = useState(resultCodeData)

  useEffect(() => {
    selectData.value = _data.dataType
    setDataSourceTypes(selectData)
  }, [_data.dataType])

  useEffect(() => {
    sourceCodeData.value = JSON.stringify(_data.staticData?.data) || ''
    setStaticData(sourceCodeData)
  }, [_data.staticData])

  useEffect(() => {
    const newData = Object.assign({}, resultData, {
      value: staticData.value
    })
    setResultData(newData)
  }, [staticData])

  const fieldsChange = () => {
    console.log('_fields', _fields)
  }

  const dataSourceTypeChange = () => {
    if (selectData.value !== 'static') {
      message.warning('其他数据源类型开发中')
      selectData.value = 'static'
      setDataSourceTypes(selectData)
    }
    // TODO: 调用接口保存
  }

  const staticDataChange = debounce(() => {
    const staDa = { ...staticData }
    setStaticData(staDa)
    try{
      const data = JSON.parse(staticData.value)
      props.onDataChange(data)
    }catch(e){
      message.error('格式错误')
    }
  }, 300)

  const resultDataChange = () => {
    // not do anything
  }

  const filterBoxChange = e => {
    setFilterFlag(e.target.checked)
  }

  const showFilterDrawer = () => {
    setDrawerVisible(true)
  }

  const drawerClose = () => {
    setDrawerVisible(false)
  }

  const drawerSave = filters => {
    setFilters(filters)
  }

  return (
    <React.Fragment>
      <div className="data-config" style={{ marginTop: 0 }}>
        <div className="data-header">
          <label className="data-name">数据接口</label>
          <span className="data-interface"><i></i>配置完成</span>
        </div>
        <div className="data-content">
          <EditableTable data={_fields} onChange={fieldsChange} />
        </div>
      </div>
      <div className="data-config">
        <div className="data-header">
          <label className="data-name">数据源类型</label>
          <CusSelect data={dataSourceTypes} onChange={dataSourceTypeChange} style={{ width: '207px' }} />
        </div>
        <div className="data-content">
          <div style={{ width: '300px', height: '198px', marginTop: '16px' }}>
            <CodeEditor data={staticData} onChange={staticDataChange} />
          </div>
        </div>
        <div className="data-footer">
          <Checkbox defaultChecked={filterFlag} onChange={filterBoxChange}>数据过滤器</Checkbox>
          {filters.length
            ?
            <span disabled={!filterFlag} className="filter-num" onClick={showFilterDrawer}>已添加{filters.length}个过滤器</span>
            :
            <Button disabled={!filterFlag} onClick={showFilterDrawer} icon={<PlusOutlined />}>添加过滤器</Button>
          }
        </div>
      </div>
      <div className="data-config">
        <div className="data-header">
          <label className="data-name">数据响应结果（只读）</label>
          <Button icon={<RedoOutlined />} style={{ border: 0, background: 'transparent' }} />
        </div>
        <div className="data-content">
          <div style={{ width: '300px', height: '198px', marginTop: '16px' }}>
            <CodeEditor data={resultData} onChange={resultDataChange} />
          </div>
        </div>
      </div>
      <DataConfigDrawer
        visible={drawerVisible}
        onClose={drawerClose}
        onSave={drawerSave}
      />
    </React.Fragment>
  )
}

export default memo(DataConfig)
