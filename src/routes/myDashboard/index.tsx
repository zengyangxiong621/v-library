import { memo, useState } from 'react'
import './index.less'

import { Input, Select } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'


import LeftTree from './components/LeftTree';
import RightContent from './components/rightContent'

const { Option } = Select
// 功能
// 点击右侧应用列表时，可拖拽至左侧树节点里
const MyApplication = (props: any) => {

  const [inputValue, setInputValue] = useState('')

  // 新建应用
  const addDashboard = () => {

  }
  // 搜索应用
  const search = () => {

  }
  // 选择排序的标准
  const selectSortType = () => {

  }
  return (
    <div className='MyApplication-wrap'>
      <div className="left">
        {/* 左侧树 */}
        <LeftTree />
      </div>
      <div className="right">
        <div className="right-header">
          <p className='title'>全部应用</p>
          <div className="add-search">
            <div className='custom-btn' onClick={addDashboard}>
              <PlusOutlined style={{ fontSize: '12px', marginRight: '2px' }} />
              <span>新建应用</span>
            </div>
            <div className="search-wrap">
              <Input placeholder="搜索"
                className='search'
                allowClear
                maxLength={40}
                suffix={<SearchOutlined />}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onPressEnter={search}
              />
              <Select className='db-select' defaultValue="按修改时间排序" onChange={selectSortType}>
                <Option value="jack">按修改时间排序</Option>
                <Option value="lucy">按新建时间排序</Option>
              </Select>
            </div>
          </div>
        </div>
        {/* 右侧 */}
        <RightContent />
      </div>
    </div>
  )
}

export default memo(MyApplication)