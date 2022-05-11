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

const DataSourceConfig = props => {
  const _data = props.data;
  const [dataSourceTypes, setDataSourceTypes] = useState(selectData)
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [filterFlag, setFilterFlag] = useState(false)
  const [filters, setFilters] = useState([])
  const [sqlData, setSqlData] = useState(_sqlDataConfig)

  useEffect(() => {
    const newDataSourceTypes = {...dataSourceTypes}
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
  }, [_data.dataType])

  const dataSourceTypeChange = async () => {
    console.log('dataSourceTypes.value', dataSourceTypes.value)
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
  }

  const onStaticDataChange = data => {
    props.onStaticDataChange(JSON.parse(data))
  }

  // csv,json,excel 数据源选择回调
  const dataSourceChange = async (data) => {
    const dataConfig = cloneDeep(_data.dataConfig)
    if (dataConfig[_data.dataType]) {
      dataConfig[_data.dataType].data.data_id = data.value
    } else {
      dataConfig[_data.dataType] = {
        data: {
          data_id: data.value
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

  // api 数据源设置变化
  const onAPIDataSourceChange = (dataConfig) => {
    props.onDataSourceChange(dataConfig)
  }

  // postgresql,mysql 数据源选择回调
  const sqlSourceChange = data => {
    // todo 设置数据源 保存
  }

  const sqlDataChange = () => {
    console.log('sqlData', sqlData)
    // todo 保存
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
                <APIDataSource data={_data} onDataSourceChange={onAPIDataSourceChange}/>
                : ['postgresql', 'mysql'].includes(dataSourceTypes.value) ?
                  <React.Fragment key={dataSourceTypes.value}>
                    <SelectDataSource
                      data={_data}
                      type={dataSourceTypes.value}
                      onChange={sqlSourceChange}
                    />
                    <div style={{ width: '300px', height: '198px', marginTop: '16px' }}>
                      <CodeEditor data={sqlData} onChange={sqlDataChange} />
                    </div>
                  </React.Fragment>
                  : dataSourceTypes.value === 'elastic_search' ?
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
      <DataConfigDrawer
        visible={drawerVisible}
        onClose={drawerClose}
        onSave={drawerSave}
      />
    </React.Fragment>
  )
}

export default memo(DataSourceConfig)
