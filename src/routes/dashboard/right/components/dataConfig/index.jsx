import React, { memo, useState, useEffect } from 'react'
import { connect } from 'dva'
import './index.less'

import { EditableTable } from '../fieldMapTable'
import DataSourceConfig from './dataSourceConfig'
import DataContainerConfig from './dataContainerConfig'
import DataResult from './dataResult'
import { SwapOutlined } from '@ant-design/icons';

import { http } from '../../../../../services/request'

const DataConfig = ({ bar, dispatch, ...props }) => {
  const _data = props.data;
  const [resultData, setResultData] = useState([])
  const [fieldkeys, setFieldkeys] = useState([])
  const [fieldsData, setFieldsData] = useState([])

  useEffect(() => {
    if (bar.componentData[_data.id]) {
      setResultData(bar.componentData[_data.id])
      const keys = getKeys(bar.componentData[_data.id])
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
  }, [bar.componentData])

  useEffect(() => {
    const data = _data.dataConfig[_data.dataType]
    if(data && data.fields){
      setFieldsData(data.fields)
    }else{
      setFieldsData(_data.staticData.fields)
    }
  },[_data.dataConfig])

  useEffect(() => {
    setDataContainerResult()
  }, [_data.dataContainers])


  // 一切到数据 tab 栏时，渲染出的数据响应结果
  const changeDataFromCallback = async () => {
    const { dataFrom } = _data
    if (dataFrom === 0) {
      console.log('dataFrom', dataFrom)
      await setDataSourceResult()
    } else {
      await setDataContainerResult()
    }
  }

  const setDataSourceResult = async () => {
    // 数据源
    const data = await http({
      url:'/visual/module/getData',
      method: 'post',
      body:{
        moduleId: _data.id,
        dataType: _data.dataType
      }
    })
    console.log('setDataSourceResult', setDataSourceResult)
    setResultData(data)
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
    setResultData(dataList)
  }

  useEffect(async () => {
    await changeDataFromCallback()
  }, [])


  useEffect(async () => {
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

  const fieldsChange = async(fields) => {
    await http({
      url: '/visual/module/updateDatasource',
      method: 'post',
      body: {
        id: _data.id,
        dataType: _data.dataType,
        fields
      }
    })
    props.onFiledsChange(fields,_data.dataType)
  }

  const resultDataChange = data => {
    setResultData(data)
  }

  const onDataTypeChange = async(data) => {
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

  const dataFromChange = async() => {
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


  // 处理过滤器

  // useEffect(async () => {
  //   console.log('_data.dataFrom', _data.dataFrom)
  //   const data = await http({
  //     url: '/visual/module/getData',
  //     method: 'post',
  //     body: {
  //       moduleId: _data.id,
  //       dataType: _data.dataType,
  //     },
  //   })
  //   console.log('data', data)
  // }, [_data.dataFrom])


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
          onResultDataChange={resultDataChange}
        />
      }

      <DataResult data={_data} resultData={resultData} />
    </React.Fragment>
  )
}

export default connect(({ bar }) => ({
  bar
}))(DataConfig)
