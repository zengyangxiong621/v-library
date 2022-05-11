import React, { memo, useState, useEffect } from 'react'
import './index.less'

import CodeEditor from '../codeEditor'
import CusSelect from '../cusSelect'
import DataConfigDrawer from '../dataConfigDrawer'
import StaticData from './staticData'
import SelectDataSource from './selectDataSource'
import APIDataSource from './apiDataSource'
import { http } from '../../../../../models/utils/request'

import cloneDeep from 'lodash/cloneDeep'


import {
  Checkbox,
  Button,
  message
} from 'antd';
import {
  PlusOutlined,
} from '@ant-design/icons';

const selectData = {
  name: "xxx",
  displayName: '',
  type: 'select',
  value: '',
  options: [
    {
      name: '静态数据',
      value: 'static'
    },
    {
      name: 'JSON数据',
      value: 'json'
    },
    {
      name: 'CSV数据',
      value: 'csv'
    },
    {
      name: 'EXCEL数据',
      value: 'excel'
    },
    {
      name: 'API数据',
      value: 'api'
    },
    {
      name: 'MYSQL数据',
      value: 'mysql'
    },
    {
      name: 'PostgreSQL数据',
      value: 'postgresql'
    },
    {
      name: 'ES数据',
      value: 'elastic_search'
    },
  ]
}

const _sqlDataConfig = {
  readOnly: false,
  language: 'mysql',
  value: `SELECT * FROM`,
  showExpand: false
}

const _esDataConfig = {
  readOnly: false,
  language: 'json',
  value: ``,
  showExpand: false
}

const DataSourceConfig = props => {
  const _data = props.data;
  const [dataSourceTypes, setDataSourceTypes] = useState(selectData)
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [filterFlag, setFilterFlag] = useState(false)
  const [filters, setFilters] = useState([])
  const [sqlData, setSqlData] = useState(_sqlDataConfig)
  const [esData, setEsData] = useState(_esDataConfig)

  useEffect(() => {
    const newDataSourceTypes = { ...dataSourceTypes }
    newDataSourceTypes.value = _data.dataType || 'static'
    setDataSourceTypes(newDataSourceTypes)
    if (['mysql', 'postgresql'].includes(_data.dataType)) {
      const newSqlData = { ...sqlData }
      if (_data.dataConfig[_data.dataType]) {
        const sql = _data.dataConfig[_data.dataType].data.sql
        if (sql) {
          newSqlData.value = sql
          setSqlData(newSqlData)
        }
      }
    }
    if (['elastic_search'].includes(_data.dataType)) {
      const esDataNew = { ...esData }
      if (_data.dataConfig[_data.dataType]) {
        const query = _data.dataConfig[_data.dataType].data.query
        if (query) {
          esDataNew.value = query
          setEsData(esDataNew)
        }
      }
    }
  }, [_data.dataType])

  const dataSourceTypeChange = async () => {
    const newDataSourceTypes = Object.assign({}, dataSourceTypes)
    setDataSourceTypes(newDataSourceTypes)
    await http({
      url: '/visual/module/updateDatasource',
      method: 'post',
      body: {
        id: _data.id,
        dataType: dataSourceTypes.value
      }
    })
    props.onDataTypeChange(dataSourceTypes.value)

    const type = dataSourceTypes.value
    if (['mysql', 'postgresql'].includes(type)) {
      const newSqlData = { ...sqlData }
      if (_data.dataConfig[type]) {
        const sql = _data.dataConfig[type].data.sql
        if (sql) {
          newSqlData.value = sql
          setSqlData(newSqlData)
        } else {
          setSqlData(_sqlDataConfig)
        }
      } else {
        setSqlData(_sqlDataConfig)
      }
    }

  }

  const onStaticDataChange = data => {
    props.onStaticDataChange(JSON.parse(data))
  }

  const saveDataSource = async (key, data) => {
    const dataConfig = cloneDeep(_data.dataConfig)
    if (dataConfig[_data.dataType]) {
      dataConfig[_data.dataType].data[key] = data.value
    } else {
      dataConfig[_data.dataType] = {
        data: {
          [key]: data.value
        }
      }
    }
    await http({
      url: '/visual/module/updateDatasource',
      method: 'post',
      body: {
        id: _data.id,
        data: dataConfig[_data.dataType].data,
        dataType: _data.dataType
      }
    })
    props.onDataSourceChange(dataConfig)
  }

  // csv,json,excel,postgresql,mysql 数据源选择回调
  const dataSourceChange = (data) => {
    console.log('data', data)
    saveDataSource('data_id', data)
  }

  const sqlDataChange = () => {
    console.log('sqlData', sqlData)
    saveDataSource('sql', sqlData)
  }

  const esDataChange = () => {
    console.log('esData', esData)
    try {
      JSON.parse(esData.value)
    } catch (err) {
      console.log('err',err)
      message.error('格式错误')
      return
    }
    saveDataSource('query', esData)
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
      <div className="data-config">
        <div className="data-header">
          <label className="data-name">数据源类型</label>
          <CusSelect key={dataSourceTypes.value} data={dataSourceTypes} onChange={dataSourceTypeChange} style={{ width: '221px' }} />
        </div>
        <div className="data-content">
          {dataSourceTypes.value === 'static' ?
            <StaticData data={_data.staticData.data} onChange={onStaticDataChange} />
            : ['csv', 'excel', 'json'].includes(dataSourceTypes.value) ?
              <SelectDataSource
                data={_data}
                key={dataSourceTypes.value}
                type={dataSourceTypes.value}
                onChange={dataSourceChange}
              />
              : dataSourceTypes.value === 'api' ?
                <APIDataSource data={_data} onDataSourceChange={props.onDataSourceChange} />
                : ['postgresql', 'mysql', 'elastic_search'].includes(dataSourceTypes.value) ?
                  <React.Fragment key={dataSourceTypes.value}>
                    <SelectDataSource
                      data={_data}
                      type={dataSourceTypes.value}
                      onChange={dataSourceChange}
                    />
                    {
                      ['postgresql', 'mysql'].includes(dataSourceTypes.value) ?
                        <div style={{ width: '300px', height: '198px', marginTop: '16px' }}>
                          <CodeEditor data={sqlData} onChange={sqlDataChange} />
                        </div>
                        : <div className="es-query">
                          <label className="data-name">查询语句（JSON格式）</label>
                          <div style={{ width: '300px', height: '198px', marginTop: '16px' }}>
                            <CodeEditor data={esData} onChange={esDataChange} />
                          </div>
                        </div>
                    }

                  </React.Fragment>
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
      <DataConfigDrawer
        visible={drawerVisible}
        onClose={drawerClose}
        onSave={drawerSave}
      />
    </React.Fragment>
  )
}

export default memo(DataSourceConfig)
