import React, { memo, useState, useEffect } from 'react'
import { connect } from 'dva'
import './index.less'

import CodeEditor from '../codeEditor'
import CusSelect from '../cusSelect'
import DataConfigDrawer from '../dataConfigDrawer'
import StaticData from './staticData'
import SelectDataSource from './selectDataSource'
import APIDataSource from './apiDataSource'
import { http } from '../../../../../services/request'

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
      value: 'elasticSearch'
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

const DataSourceConfig = ({ bar, dispatch, ...props }) => {
  // 判断是内置组件还是公共组件，如果 type 为 component 则是 公共组件
  const componentType = props.type
  const _data = props.data
  const [dataSourceTypes, setDataSourceTypes] = useState(selectData)
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [filterFlag, setFilterFlag] = useState(_data.useFilter)
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
    if (['elasticSearch'].includes(_data.dataType)) {
      const esDataNew = { ...esData }
      if (_data.dataConfig[_data.dataType]) {
        const query = _data.dataConfig[_data.dataType].data.query_script
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
    if (componentType !== 'component') {
      await http({
        url: '/visual/module/updateDatasource',
        method: 'post',
        body: {
          id: _data.id,
          dataType: dataSourceTypes.value,
        },
      })
    }
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
    queryComponentData()
  }

  const onStaticDataChange = data => {
    props.onStaticDataChange(JSON.parse(data))
  }

  const saveDataSource = async (key, data) => {
    const dataConfig = cloneDeep(_data.dataConfig)
    if (dataConfig[dataSourceTypes.value]) {
      dataConfig[dataSourceTypes.value].data[key] = data.value
    } else {
      dataConfig[dataSourceTypes.value] = {
        data: {
          [key]: data.value
        }
      }
    }
    if (componentType !== 'component') {
      await http({
        url: '/visual/module/updateDatasource',
        method: 'post',
        body: {
          id: _data.id,
          data: dataConfig[dataSourceTypes.value].data,
          dataType: dataSourceTypes.value,
        },
      })
    }
    props.onDataSourceChange(dataConfig)
    queryComponentData()
  }

  const queryComponentData = async () => {
    if (componentType !== 'component') {
      const data = await http({
        url: '/visual/module/getData',
        method: 'post',
        body: {
          moduleId: _data.id,
          dataType: dataSourceTypes.value,
        },
      },true)
      if (data.code === 10000 && data.data) {
        dispatch({
          type: 'bar/save',
          payload: {
            componentData: {
              ...bar.componentData,
              [_data.id]: dataSourceTypes.value !== 'static' ? data.data : data.data.data,
            },
          },
        })
      } else {
        dispatch({
          type: 'bar/save',
          payload: {
            componentData: {
              ...bar.componentData,
              [_data.id]: {}
            },
          },
        })
        message.error('数据源请求失败')
      }
    }
  }

  // csv,json,excel,postgresql,mysql，es 数据源选择回调
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
      console.log('err', err)
      message.error('格式错误')
      return
    }
    saveDataSource('query_script', esData)
  }

  const filterBoxChange =async(e)=> {
    setFilterFlag(e.target.checked)
    await http({
      url:'/visual/module/updateDatasource',
      method:'post',
      body:{
        id:_data.id,
        useFilter:e.target.checked,
        dataType: dataSourceTypes.value,
      }
    })
  }

  const showFilterDrawer = () => {
    setDrawerVisible(true)
  }

  const drawerClose = () => {
    setDrawerVisible(false)
  }

  const drawerSave = filters => {
    // todo
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
            <StaticData data={_data} onChange={onStaticDataChange} />
            : ['csv', 'excel', 'json'].includes(dataSourceTypes.value) ?
              <SelectDataSource
                data={_data}
                key={_data.id}
                type={dataSourceTypes.value}
                onChange={dataSourceChange}
              />
              : dataSourceTypes.value === 'api' ?
                <APIDataSource
                  data={_data}
                  onDataSourceChange={props.onDataSourceChange}
                />
                : ['postgresql', 'mysql', 'elasticSearch'].includes(dataSourceTypes.value) ?
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
          {_data.filters.length
            ?
            <span disabled={!filterFlag} className="filter-num" onClick={showFilterDrawer}>已添加{_data.filters.length}个过滤器</span>
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

export default connect(({ bar }) => ({
  bar
}))(DataSourceConfig)
