import React, {memo, useState, useEffect, useRef} from 'react'
import './index.less'
import {Drawer, Input, message} from 'antd'
import {connect} from 'dva'
import {http} from '../../../../../../services/request'
import DataSourceConfig from '../../../../right/components/dataConfig/dataSourceConfig'
import DataResult from '../../../../right/components/dataConfig/dataResult'
import {CloseOutlined, LeftOutlined} from '@ant-design/icons'
import useLoading from '@/components/useLoading'
import DataFilter from "@/routes/dashboard/right/components/dataConfig/dataFilter";

const testData = {
  'name': '容器名称', // 容器名字
  'dataConfig': {}, // 数据源配置
  'dataType': 'static', // 数据类型
  'autoUpdate': {}, // 更新配置
  'staticData': {
    'data': [
      {
        'text': '数据容器',
      },
    ],
    'fields': [
      {
        'name': 'text',
        'value': 'text',
        'desc': '文本',
        'status': true,
      },
    ],
  }, // 静态数据
  'data': {}, // 非静态数据
  'events': [],
  'triggers': [],
  'useFilter': false, // 是否启用过滤器
  'filters': [],
}
const UpdateContainerDrawer = ({bar, dispatch, ...props}) => {
  const inputRef = useRef(null)
  const [copyData, setCopyData] = useState(testData)
  const [resultData, setResultData] = useState([])
  const [loading, setLoading] = useLoading(false, document.querySelector('.loading-wrapper'))
  const visible = props.visible
  useEffect(async () => {
    if (Object.prototype.toString.call(props.data) === '[object Object]') {
      if (Object.keys(props.data).length === 0) {
        setCopyData(testData)
        // 新增
        const containerData = await http({
          method: 'post',
          url: '/visual/container/add',
          body: {
            dashboardId: bar.dashboardId,
          },
        })
        dispatch({
          type: 'bar/updateDataContainer',
          payload: {
            containerData,
            data: containerData.staticData.data
          }
        })
        setResultData(containerData.staticData.data)
        setCopyData(containerData)
      } else {
        // 编辑
        setCopyData(props.data)
        let data = bar.dataContainerDataList.find(item => item.id === props.data.id)
        let resultData = []
        if (data) {
          if (props.data.useFilter) {
            resultData = handleDataFilter(data.data, props.data.filters)
            setResultData(resultData)
          } else {
            setResultData(data.data)
          }
        } else {
          setResultData(resultData)
        }

      }
    }
  }, [props.data])

  const onClose = () => {

    props.onVisibleChange(false)
  }

  const updateDataContainerName = async (copyData) => {
    await updateDataContainer(copyData)
    dispatch({
      type: 'bar/updateDataContainer',
      payload: {
        containerData: {
          ...copyData
        },
      }
    })
  }

  // 更新输入容器
  const updateDataContainer = async (body) => {
    await http({
      url: '/visual/container/source',
      method: 'post',
      body,
    })
  }
  // 数据类型切换
  const handleDataTypeChange = async (value) => {
    setCopyData({...copyData, dataType: value})
    await updateDataContainer({...copyData, dataType: value})
    if (value === 'static') {
      const data = copyData.staticData.data
      if (copyData.useFilter) {
        let filterData = handleDataFilter(data, copyData.filters)
        setResultData(filterData)
      } else {
        setResultData(data)
      }
      return
    }
    try {
      const data = await http({
        method: 'post',
        url: '/visual/container/data/get',
        body: {
          id: copyData.id,
          callBackParamValues: bar.callbackArgs
        }
      })
      if (data) {
        message.success('操作成功')
        dispatch({
          type: 'bar/updateDataContainer',
          payload: {
            containerData: {...copyData, dataType: value},
          }
        })
        if (copyData.useFilter) {
          let filterData = handleDataFilter(data, copyData.filters)
          setResultData(filterData)
        } else {
          setResultData(data)
        }
      }
    } catch (err) {
      setResultData([])
    }

  }
  // 静态数据变化
  const handleStaticDataChange = async (data) => {
    setCopyData({
      ...copyData, staticData: {
        ...copyData.staticData,
        data,
      },
    })
    await updateDataContainer({
      ...copyData, staticData: {
        ...copyData.staticData,
        data,
      },
    })

    dispatch({
      type: 'bar/updateDataContainer',
      payload: {
        containerData: {
          ...copyData, staticData: {
            ...copyData.staticData,
            data,
          },
        },
        data
      }
    })
    if (copyData.useFilter) {
      let filterData = handleDataFilter(data, copyData.filters)
      setResultData(filterData)
    } else {
      setResultData(data)
    }
  }
  // 数据源变化
  const handleDataSourceChange = async (dataConfig) => {
    setCopyData({...copyData, dataConfig})
    await updateDataContainer({...copyData, data: dataConfig[copyData.dataType].data})
    try {
      const data = await http({
        method: 'post',
        url: '/visual/container/data/get',
        body: {
          id: copyData.id,
          callBackParamValues: bar.callbackArgs
        }
      })
      if (data) {
        message.success('操作成功')
        dispatch({
          type: 'bar/updateDataContainer',
          payload: {
            containerData: {...copyData, dataConfig},
            data
          }
        })
        if (copyData.useFilter) {
          let filterData = handleDataFilter(data, copyData.filters)
          setResultData(filterData)
        } else {
          setResultData(data)
        }
      }
    } catch (err) {
      setResultData([])
    }

  }
  // 数据过滤器开关
  const filterBoxChange = async (e) => {
    setCopyData({...copyData, useFilter: e.target.checked})
    await updateDataContainer({...copyData, useFilter: e.target.checked})
    dispatch({
      type: 'bar/updateDataContainer',
      payload: {
        containerData: {...copyData, useFilter: e.target.checked},
      }
    })
    let data = bar.dataContainerDataList.find(item => item.id === copyData.id).data
    if (e.target.checked) {
      data = handleDataFilter(data, copyData.filters)
    }
    setResultData(data)
  }
  // 数据过滤器变化
  const selectedFiltersChange = async (filterId, componentFilters) => {
    // 绑定/解绑过滤器
    const data = await http({
      method: 'post',
      url: '/visual/container/filter',
      body: {
        id: copyData.id,
        filterId,
        add: true
      }
    })
    setCopyData(data)
    dispatch({
      type: 'bar/updateDataContainer',
      payload: {
        containerData: data
      }
    })
    let containerData = bar.dataContainerDataList.find(item => item.id === copyData.id).data
    containerData = handleDataFilter(containerData, data.filters, componentFilters,bar.callbackArgs)
    setResultData(containerData)
  }
  // 数据过滤
  const handleDataFilter = (data, allFilters, componentFilters = null,callbackArgs) => {
    const filters = allFilters.map(item => {
      const filterDetail = (componentFilters || bar.componentFilters).find(jtem => jtem.id === item.id)
      return {
        ...filterDetail,
        enable: item.enable,
      }
    }).filter(item => item.enable)
    if (filters.length === 0) {
      return data
    }
    try {
      const functions = filters.map(item => {
        return (new Function('data', 'callbackArgs', item.content))
      })
      const resultArr = []
      functions.forEach((fn, index) => {
        const cbArgs = filters[index].callbackKeys.reduce((pre, item) => {
          return {
            ...pre,
            [item]: callbackArgs[item]
          }
        }, {})
        if (index === 0) {
          resultArr.push(fn(data,cbArgs))
        } else {
          resultArr.push(fn(resultArr[index - 1],cbArgs))
        }
      })
      return resultArr[resultArr.length - 1]
    } catch (e) {
      return []
    }
    return []
  }
  // 更新过滤器
  const updateFilters = (data) => {
    let containerData = bar.dataContainerDataList.find(item => item.id === props.data.id).data
    containerData = handleDataFilter(containerData, copyData.filters)
    setResultData(containerData)
  }
  const deleteFilters = async ({id}) => {
    // 删除过滤器
    const data = await http({
      method: 'post',
      url: '/visual/container/filter',
      body: {
        id: copyData.id,
        filterId: id,
        add: false
      }
    })
    setCopyData({
      ...copyData, filters: data.filters
    })
    dispatch({
      type: 'bar/updateDataContainer',
      payload: {
        containerData: data
      }
    })
    let containerData = bar.dataContainerDataList.find(item => item.id === copyData.id).data
    containerData = handleDataFilter(containerData, data.filters)
    setResultData(containerData)
  }
  // bindFilters
  const bindFilters = async ({id}, status) => {
    // 绑定过滤器
    const data = await http({
      method: 'post',
      url: '/visual/container/filter/trigger',
      body: {
        id: copyData.id,
        filterId: id,
        enable: status
      }
    })

    if (data) {
      message.success('操作成功')
      const filter = copyData.filters.find(item => item.id === id)
      filter.enable = status
      setCopyData({
        ...copyData, filters: copyData.filters
      })
      dispatch({
        type: 'bar/updateDataContainer',
        payload: {
          containerData: {
            ...copyData, filters: copyData.filters
          }
        }
      })
      let containerData = bar.dataContainerDataList.find(item => item.id === copyData.id).data
      containerData = handleDataFilter(containerData, copyData.filters)
      setResultData(containerData)
    }
  }
  return (
    <Drawer
      title={
        <div className="g-relative g-text-base g-px-2 g-flex g-justify-between g-items-center">
          <LeftOutlined onClick={onClose} className="g-cursor-pointer" style={{fontSize: 12}}/>
          数据容器
          <CloseOutlined onClick={onClose} className="g-cursor-pointer"/>
        </div>
      }
      closable={false}
      width={333}
      placement="right"
      onClose={onClose}
      visible={props.visible}
      className="update-data-container-drawer"
      getContainer={false}
      style={{position: 'absolute'}}
      // maskStyle={{opacity: 0, animation: 'unset'}}
      maskStyle={{ animation: 'unset'}}
    >
      <div className="loading-wrapper">
        <Input
          ref={inputRef}
          value={copyData.name}
          maxLength={30}
          onChange={(e) => setCopyData({...copyData, name: e.target.value})}
          onPressEnter={() => {
            updateDataContainerName(copyData)
          }}
          onBlur={() => {
            updateDataContainerName(copyData)
          }}

        />
        <p className="data-source">数据源</p>
        <DataSourceConfig
          type="component"
          data={copyData}
          onDataTypeChange={handleDataTypeChange}
          onStaticDataChange={handleStaticDataChange}
          onDataSourceChange={handleDataSourceChange}
        />
        <DataFilter
          data={copyData}
          type="component"
          onFilterBoxChange={filterBoxChange}
          onSelectedFiltersChange={selectedFiltersChange}
          onUpdateFilters={updateFilters}
          onDeleteFilters={deleteFilters}
          onBindFilters={bindFilters}
          resultData={resultData}
        />
        <DataResult data={copyData} resultData={resultData} type="component"/>

      </div>
    </Drawer>
  )
}

export default connect(({bar}) => ({bar}))(UpdateContainerDrawer)
