import React, { memo, useState, useEffect } from 'react'
import { connect } from 'dva'
import './index.less'
import { getComDataWithFilters } from '../.../../../../../../utils/data'

import { v4 as uuidv4 } from 'uuid';
import { EditableTable } from '../fieldMapTable'
import DataSourceConfig from './dataSourceConfig'
import DataContainerConfig from './dataContainerConfig'
import DataResult from './dataResult'
import { SwapOutlined } from '@ant-design/icons';

import { http } from '../../../../../services/request'
import DataFilter from "@/routes/dashboard/right/components/dataConfig/dataFilter";

const DataConfig = ({ bar, dispatch, ...props }) => {
  const _data = props.data;
  const [tableKey, setTableKey] = useState(uuidv4())
  const [fieldkeys, setFieldkeys] = useState([])
  const [fieldsData, setFieldsData] = useState([])
  const [componentResultData, setComponentResultData] = useState({})
  const [componentType, setComponentType] = useState('')

  useEffect(() => {
    const currentData = getComDataWithFilters(bar.componentData, bar.componentConfig, bar.componentFilters, bar.dataContainerDataList, bar.dataContainerList, bar.callbackArgs)
    if (currentData) {
      const keys = getKeys(currentData)
      setFieldkeys(keys)
    } else {
      dispatch({
        type: 'bar/save',
        payload: {
          componentData: {
            ...bar.componentData,
            [_data.id]: _data.staticData.data
          }
        },
      })
      const keys = getKeys(_data.staticData.data)
      setFieldkeys(keys)
    }
    setTableKey(uuidv4())
  }, [bar.componentData, bar.componentConfig.filters, bar.componentFilters, bar.componentConfig.useFilter, bar.componentConfig.dataFrom, bar.componentConfig.dataContainers])

  useEffect(() => {
    const data = _data.dataConfig[_data.dataType]
    if (data && data.fields) {
      setFieldsData(data.fields)
    } else {
      setFieldsData(_data.staticData.fields)
    }
    setTableKey(uuidv4())
  }, [_data.dataConfig])

  useEffect(() => {
    if (_data.dataFrom === 1) {
      setDataContainerResult()
    }
  }, [_data.dataContainers])

  // 一切到数据 tab 栏时，渲染出的数据响应结果
  const changeDataFromCallback = async () => {
    const { dataFrom } = _data
    if (dataFrom === 0) {
      await setDataSourceResult()
    } else {
      await setDataContainerResult()
    }
  }

  const setDataSourceResult = async () => {
    // 数据源
    const data = await http({
      url: '/visual/module/getData',
      method: 'post',
      body: {
        moduleId: _data.id,
        dataType: _data.dataType,
        callBackParamValues:bar.callbackArgs
      }
    }, true)
    if (data.code === 10000 && data.data) {
      dispatch({
        type: 'bar/save',
        payload: {
          componentData: {
            ...bar.componentData,
            [_data.id]: _data.dataType !== 'static' ? data.data : data.data.data,
          },
        },
      })
    }

  }

  const setDataContainerResult = () => {
    // 数据容器
    const dataContainerIds = _data.dataContainers.map(item => item.id)
    const dataList = bar.dataContainerDataList.reduce((pre, cur) => {
      if (dataContainerIds.includes(cur.id)) {
        pre.push(cur.data)
      }
      return pre
    }, [])
  }

  useEffect(async () => {
    setComponentType(_data.dataFrom === 0 ? '' : 'component')
    await changeDataFromCallback()
  }, [_data.dataFrom])

  const getKeys = (data) => {
    if (Object.prototype.toString.call(data) === '[object Object]') {
      return Object.keys(data)
    } else if (Object.prototype.toString.call(data) === '[object Array]') {
      if (data.length) {
        if (Object.prototype.toString.call(data[0]) === '[object Object]') {
          return Object.keys(data[0])
        } else if (Object.prototype.toString.call(data[0]) === '[object Array]') {
          return getKeys(data[0])
        }
      } else {
        return []
      }
    } else {
      return []
    }
  }

  const fieldsChange = async (fields) => {
    await http({
      url: '/visual/module/updateDatasource',
      method: 'post',
      body: {
        id: _data.id,
        dataType: _data.dataType,
        fields
      }
    })
    props.onFiledsChange(fields, _data.dataType)
  }

  const onDataTypeChange = async (data) => {
    await http({
      url: '/visual/module/updateDatasource',
      method: 'post',
      body: {
        id: _data.id,
        dataType: data
      }
    })
    props.onDataTypeChange(data)
  }

  const dataFromChange = async () => {
    const data = await http({
      url: '/visual/module/updateDataFrom',
      method: 'post',
      body: {
        id: _data.id,
        dataFrom: _data.dataFrom === 1 ? 0 : 1
      }
    })

    if (data) {
      props.onDataFromChange(_data.dataFrom === 1 ? 0 : 1)
    }
  }

  const filterBoxChange = async (e) => {
    await http({
      url: '/visual/module/updateDatasource',
      method: 'post',
      body: {
        id: _data.id,
        useFilter: e.target.checked,
        dataType: _data.dataType,
      }
    })
    props.onUseFilterChange(e.target.checked)
  }
  // 处理过滤器


  return (
    <React.Fragment>
      <div className="data-config" style={{ marginTop: 0 }}>
        <div className="data-header">
          <label className="data-name">数据接口</label>
          <span className="data-interface"><i></i>配置完成</span>
        </div>
        <div className="data-content">
          <EditableTable
            key={tableKey}
            fieldsKeys={fieldkeys}
            data={fieldsData}
            onChange={fieldsChange} />
        </div>
      </div>
      <div className="data-type g-mt-4">
        <div>
          关联{_data.dataFrom ? '容器' : '数据源'}
        </div>
        <a
          className="g-pr-4 g-flex g-items-center"
          onClick={dataFromChange}>
          <SwapOutlined className="g-mr-2" />
          {_data.dataFrom ? '数据源' : '容器'}
        </a>
      </div>
      {
        _data.dataFrom ? <DataContainerConfig
          data={_data}
          onDataContainerChange={props.onDataContainerChange}
        />
          : <DataSourceConfig
            data={_data}
            onDataTypeChange={onDataTypeChange}
            onStaticDataChange={props.onStaticDataChange}
            onDataSourceChange={props.onDataSourceChange}
          />
      }
      <DataFilter data={_data} onFilterBoxChange={filterBoxChange} />
      <DataResult data={_data} />
    </React.Fragment>
  )
}

export default connect(({ bar }) => ({
  bar
}))(DataConfig)
