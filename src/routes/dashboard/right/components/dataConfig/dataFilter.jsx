import { Button, Checkbox } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import DataConfigDrawer from '../dataConfigDrawer'
import { http } from '../../../../../services/request'
import './index.less'

const DataFilter = (props) => {
  const _data = props.data
  const [filterFlag, setFilterFlag] = useState(_data.useFilter)
  const [drawerVisible, setDrawerVisible] = useState(false)

  const filterBoxChange =async(e)=> {
    setFilterFlag(e.target.checked)
    props.onFilterBoxChange(e)
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
    <div className="data-filter">
      <Checkbox defaultChecked={filterFlag} onChange={filterBoxChange}>数据过滤器</Checkbox>
      {_data.filters.length
        ?
        <span disabled={!filterFlag} className="filter-num" onClick={showFilterDrawer}>已添加{_data.filters.length}个过滤器</span>
        :
        <Button disabled={!filterFlag} onClick={showFilterDrawer} icon={<PlusOutlined />}>添加过滤器</Button>
      }
      <DataConfigDrawer
        visible={drawerVisible}
        onClose={drawerClose}
        onSave={drawerSave}
      />
    </div>
  )
}
export default DataFilter
