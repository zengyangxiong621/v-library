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
  const { history } = props

  const [inputValue, setInputValue] = useState('')

  // 新建应用
  const addDashboard = () => {
    history.push('/template')
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
        <RightContent listData={listData} />
      </div>
    </div>
  )
}
const listData: object = [
  {
    id: '1',
    name: 'xx',
    imgUrl: 'https://img1.baidu.com/it/u=3021003518,1825276686&fm=253&fmt=auto&app=138&f=JPEG?w=450&h=233',
    release: true,
  },
  {
    id: '2',
    name: 'A',
    imgUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F065f4419afd06bc98180e53711745d28f34161f8.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651990097&t=483e0024896fca43342fdd315b16c375',
    release: true,
  },
  {
    id: '3',
    name: 'B',
    imgUrl: 'https://img2.baidu.com/it/u=150520042,1822256108&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=312',
    release: false,
  },
  {
    id: '4',
    name: 'C',
    imgUrl: 'https://img2.baidu.com/it/u=836828249,4218074621&fm=253&fmt=auto&app=138&f=JPEG?w=820&h=461',
    release: false,
  },
  {
    id: '5',
    name: 'D',
    imgUrl: 'https://img1.baidu.com/it/u=1454865930,3426121759&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
    release: true,
  },
  {
    id: '6',
    name: 'E',
    imgUrl: 'https://img0.baidu.com/it/u=2651429005,3211950086&fm=253&fmt=auto&app=138&f=JPEG?w=605&h=454',
    release: false,
  },
  {
    id: '7',
    name: 'F',
    imgUrl: 'https://img0.baidu.com/it/u=2651429005,3211950086&fm=253&fmt=auto&app=138&f=JPEG?w=605&h=454',
    release: true,
  },
]

export default memo(MyApplication)