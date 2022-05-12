import React, { memo, useState, useEffect } from 'react'
import { connect } from 'dva'
import './index.less'

import { EditableTable } from '../fieldMapTable'
import DataSourceConfig from './dataSourceConfig'
import DataResult from './dataResult'

import { http } from '../../../../../models/utils/request'

const DataConfig = ({ bar, dispatch, ...props }) => {
  const _data = props.data;
  const [resultData, setResultData] = useState([])
  const [fieldkeys, setFieldkeys] = useState([])
  const [fieldsData, setFieldsData] = useState([])

  useEffect(() => {
    console.log('componentData', bar.componentData)
    if (bar.componentData[_data.id]) {
      setResultData(bar.componentData[_data.id])
      const keys = getKeys(bar.componentData[_data.id])
      console.log('keys', keys)
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
      console.log('keys', keys)
      setFieldkeys(keys)
    }
  }, [bar.componentData])

  useEffect(() => {
    const data = _data.dataConfig[_data.dataType]
    if(data && data.fields){
      setFieldsData(data.fields)
    }else{
      setFieldsData(_data.staticData.fields)
    }
  },[_data.dataConfig])

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

  const fieldsChange = async(fields) => {
    console.log('fields', fields)
    await http({
      url: '/visual/module/updateDatasource',
      method: 'post',
      body: {
        id: _data.id,
        dataType: _data.dataType,
        fields
      }
    })
    props.onFiledsChange(fields)
  }

  const resultDataChange = data => {
    setResultData(data)
  }

  return (
    <React.Fragment>
      <div className="data-config" style={{ marginTop: 0 }}>
        <div className="data-header">
          <label className="data-name">数据接口</label>
          <span className="data-interface"><i></i>配置完成</span>
        </div>
        <div className="data-content">
          <EditableTable
            key={fieldkeys.toString()}
            fieldsKeys={fieldkeys}
            data={fieldsData}
            onChange={fieldsChange} />
        </div>
      </div>
      <DataSourceConfig
        data={_data}
        onDataTypeChange={props.onDataTypeChange}
        onStaticDataChange={props.onStaticDataChange}
        onDataSourceChange={props.onDataSourceChange}
        onResultDataChange={resultDataChange}
      />
      <DataResult data={_data} resultData={resultData} />
    </React.Fragment>
  )
}

export default connect(({ bar }) => ({
  bar
}))(DataConfig)