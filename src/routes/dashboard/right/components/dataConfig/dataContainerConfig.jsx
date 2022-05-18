import React, { useState, useEffect } from 'react'
import { connect } from 'dva'
import './index.less'
import { Select, Button, Tabs } from 'antd'
import { http } from '../../../../../services/request'
import UpdateContainerDrawer from '../../../components/dataContainer/components/updateContainerDrawer'
import CodeEditor from '../codeEditor'

const { Option } = Select
const { TabPane } = Tabs

const resultCodeData = {
  readOnly: true,
  language: 'json',
  value: ``,
  showExpand: false
}

const DataContainerConfig = ({ bar, dispatch, ...props }) => {
  const _data = props.data
  const dataContainerIds = _data.dataContainers.map(item => item.id)
  const [itemData, setItemData] = useState(null)
  const [itemVisible, setItemVisible] = useState(false)
  const [tabValue, setTabValue] = useState(_data.dataContainers[0].id)
  const [resultData, setResultData] = useState(resultCodeData)

  useEffect(() => {

  }, [])
  const handleChange = async (value) => {
    props.onDataContainerChange(value)
  }
  const handleDeSelect = async (value) => {
    console.log('取消')
    const data = await http({
      method: 'post',
      url: '/visual/module/bindContainer',
      body: {
        moduleId: _data.id,
        binding: false,
        containerId: value,
      },
    })
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
  }

  const handleAddDataContainer = () => {
    setItemVisible(true)
    setItemData({})
  }

  const handleUpdateDrawerClose = (value) => {
    setItemVisible(value)
    dispatch({
      type: 'bar/getDataContainerList',
    })
  }

  const handleTabClick = (item) => {
    console.log('tabValue', tabValue)
    setTabValue(item.id)
  }

  return (
    <div className="data-container-config">
      <div className="data-container-select g-flex g-justify-between g-mt-4"
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
                <Option value={ item.id }>
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
                  className={`data-container-tabs-item ${item.id === tabValue ? 'data-container-tabs-item-active ' :''}g-cursor-pointer g-overflow-hidden g-overflow-ellipsis g-whitespace-nowrap`}
                  onClick={() => handleTabClick(item)}
                >
                  { dataContainer.name }
                </div>
              )
            }
            return <></>

          })
        }
      </div>
      <div className="data-container-show-card">
        <CodeEditor data={resultData} onChange={()=>{}} />
      </div>
      <UpdateContainerDrawer dashboardId={ bar.dashboardId } data={ itemData } visible={ itemVisible }
                             onVisibleChange={ handleUpdateDrawerClose }/>
    </div>
  )
}
export default connect(({ bar }) => ({
  bar,
}))(DataContainerConfig)
