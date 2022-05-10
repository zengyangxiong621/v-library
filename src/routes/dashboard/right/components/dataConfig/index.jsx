import React, { memo, useState, useEffect } from 'react'
import './index.less'

import { EditableTable } from '../fieldMapTable'
import CodeEditor from '../codeEditor'
import CusSelect from '../cusSelect'
import DataConfigDrawer from '../dataConfigDrawer'
import StaticData from './staticData'
import SelectDataSource from './selectDataSource'
import APIDataSource from './apiDataSource'


import {
  Checkbox,
  Button,
} from 'antd';
import {
  PlusOutlined,
  RedoOutlined
} from '@ant-design/icons';

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
      name: 'JSON数据',
      value: 'JSON'
    },
    {
      name: 'CSV数据',
      value: 'CSV'
    },
    {
      name: 'EXCEL数据',
      value: 'EXCEL'
    },
    {
      name: 'API数据',
      value: 'RESTFUL_API'
    },
    {
      name: 'MYSQL数据',
      value: 'MYSQL'
    },
    {
      name: 'PostgreSQL数据',
      value: 'POSTGRESQL'
    },
    {
      name: 'ES数据',
      value: 'ELASTIC_SEARCH'
    },
  ]
}

const sqlData = {
  readOnly: false,
  language: 'mysql',
  value: `SELECT * FROM`,
  showExpand: false
}

const DataConfig = ({ bar, dispatch, ...props }) => {
  const _data = props.data;
  const _fields = _data.staticData.fields
  const [dataSourceTypes, setDataSourceTypes] = useState(selectData)
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [filterFlag, setFilterFlag] = useState(false)
  const [filters, setFilters] = useState([])
  const [resultData, setResultData] = useState(resultCodeData)

  useEffect(() => {
    selectData.value = _data.dataType || 'static'
    setDataSourceTypes(selectData)
  }, [_data.dataType])

  useEffect(() => {
    const newData = Object.assign({}, resultData, {
      value: JSON.stringify(_data.staticData.data, null, 2) || ''
    })
    // todo 数据过滤之后再展示结果
    setResultData(newData)
  }, [_data.staticData.data])

  const fieldsChange = () => {
    console.log('_fields', _fields)
  }

  const dataSourceTypeChange = () => {
    console.log('dataSourceTypes.value', dataSourceTypes.value)
    const newDataSourceTypes = Object.assign({}, dataSourceTypes)
    setDataSourceTypes(newDataSourceTypes)
    // TODO: 调用接口保存
  }

  const onStaticDataChange = data => {
    const newData = Object.assign({}, resultData, {
      value: data
    })
    // todo 数据过滤之后再展示结果
    console.log('data', data)
    setResultData(newData)
    props.onDataChange(JSON.parse(data))
  }

  const sqlDataChange = () => {
    console.log('sqlData', sqlData)
  }

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
          {dataSourceTypes.value === 'static' ?
            <StaticData data={_data.staticData.data} onChange={onStaticDataChange} />
            : ['CSV', 'EXCEL', 'JSON'].includes(dataSourceTypes.value) ?
              <SelectDataSource key={dataSourceTypes.value} type={dataSourceTypes.value} />
              : dataSourceTypes.value === 'RESTFUL_API' ?
                <APIDataSource data={_data}/>
                : ['POSTGRESQL', 'MYSQL'].includes(dataSourceTypes.value) ?
                  <React.Fragment>
                    <SelectDataSource key={dataSourceTypes.value} type={dataSourceTypes.value} />
                    <div style={{ width: '300px', height: '198px', marginTop: '16px' }}>
                      <CodeEditor data={sqlData} onChange={sqlDataChange} />
                    </div>
                  </React.Fragment>
                  : dataSourceTypes.value === 'ELASTIC_SEARCH' ?
                    <div>es</div>
                    : null
          }
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
