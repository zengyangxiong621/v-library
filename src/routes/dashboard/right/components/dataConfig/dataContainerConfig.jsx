import React, { useState, useEffect } from 'react'
import { connect } from 'dva'
import './index.less'
import { Select, Button, Tabs, Tooltip } from 'antd'
import { http } from '../../../../../services/request'
import UpdateContainerDrawer from '../../../components/dataContainer/components/updateContainerDrawer'
import CodeEditor from '../codeEditor'

const { Option } = Select
const { TabPane } = Tabs

const resultCodeData = {
  readOnly: true,
  language: 'json',
  value: '{}',
  showExpand: false,
}

const DataContainerConfig = ({ bar, dispatch, ...props }) => {
  const _data = props.data
  const dataContainerIds = _data.dataContainers.map(item => item.id)
  const [itemData, setItemData] = useState(null)
  const [itemVisible, setItemVisible] = useState(false)
  const [tabValue, setTabValue] = useState(null)
  const [resultData, setResultData] = useState(resultCodeData)

  useEffect(() => {
    handleChoose(dataContainerIds.length > 0 ? dataContainerIds[0] : null)
  }, [])

  const handleChoose = (id) => {
    // 默认设置选中第一个
    handleTabClick({ id })
  }

  const handleChange = async (value) => {
    // props.onDataContainerChange(value)
  }
  const handleDeSelect = async (value) => {
    const data = await http({
      method: 'post',
      url: '/visual/module/bindContainer',
      body: {
        moduleId: _data.id,
        binding: false,
        containerId: value,
      },
    })
    if (data) {
      const index = dataContainerIds.indexOf(value)
      dataContainerIds.splice(index, 1)
      props.onDataContainerChange(dataContainerIds)
      if (dataContainerIds.length > 0) {
        if (value === tabValue) {
          handleChoose(dataContainerIds.length > 0 ? dataContainerIds[0] : null)
        }
      } else {
        handleChoose(null)
      }
    }
  }
  const handleSelect = async (value) => {
    const data = await http({
      method: 'post',
      url: '/visual/module/bindContainer',
      body: {
        moduleId: _data.id,
        binding: true,
        containerId: value,
      },
    })
    if (data) {
      dataContainerIds.push(value)
      props.onDataContainerChange(dataContainerIds)
      handleChoose(value)
    }
  }

  const handleAddDataContainer = () => {
    setItemVisible(true)
    setItemData({})
  }

  const handleUpdateDrawerClose = (value) => {
    setItemVisible(value)
  }
  // item: {id?: string}
  const handleTabClick = async (item) => {
    if (item.id) {
      const dataContainer = bar.dataContainerList.find(it => it.id === item.id)
      let data = {}
      if (dataContainer.dataType === 'static') {
        data = dataContainer.staticData.data || {}
      } else {
        data = bar.dataContainerDataList.find(it => it.id === item.id).data
        // data = await http({
        //   method: 'get',
        //   url: '/visual/container/data/get',
        //   params: {
        //     id: dataContainer.id,
        //   },
        // })
      }
      setResultData({ ...resultData, value: JSON.stringify(data, null, 2) })
      setTabValue(item.id)
    } else {
      setResultData(resultCodeData)
    }
  }

  return (
    <div className="data-container-config">
      <div className="data-container-select g-flex g-justify-between g-mt-4 g-mb-9"
           style={ { display: 'flex' } }>
        <span style={ { minWidth: '73px', lineHeight: '32px' } } className="g-text-left">数据容器</span>
        <Select
          value={ dataContainerIds }
          mode="multiple"
          className="g-flex-1 g-mr-2"
          onChange={ handleChange }
          onDeselect={ handleDeSelect }
          onSelect={ handleSelect }
          style={ { flex: 1, minWidth: 150 } }
        >
          {
            bar.dataContainerList.map(item => (
                <Option key={ item.id } value={ item.id }>
                  { item.name }
                </Option>
              ),
            )
          }
        </Select>
        <Button className="g-ml-2" onClick={ handleAddDataContainer }>+新建</Button>
      </div>
      <div className="data-container-tabs g-flex g-flex-wrap">
        {
          _data.dataContainers.map((item) => {
            const dataContainer = bar.dataContainerList.find(it => it.id === item.id)
            if (dataContainer) {
              return (
                <div
                  key={ item.id }
                  title={ dataContainer.name }
                  className={ `data-container-tabs-item ${ item.id === tabValue ? 'data-container-tabs-item-active ' : '' }g-cursor-pointer g-overflow-hidden g-overflow-ellipsis g-whitespace-nowrap` }
                  onClick={ () => handleTabClick(item) }
                >
                  { dataContainer.name }
                </div>
              )
            }
            return <></>

          })
        }
      </div>
      <div
        className="data-container-show-card"
        style={ { width: '100%', height: '198px' } }
      >
        <CodeEditor data={ resultData } onChange={ () => {
        } }/>
      </div>
      <UpdateContainerDrawer dashboardId={ bar.dashboardId } data={ itemData } visible={ itemVisible }
                             onVisibleChange={ handleUpdateDrawerClose }/>
    </div>
  )
}
export default connect(({ bar }) => ({
  bar,
}))(DataContainerConfig)
