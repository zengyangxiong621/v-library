import { memo, useState } from 'react'
import './index.less'

import { IconFont } from '../../utils/useIcon'
import { SearchOutlined } from '@ant-design/icons'
import { Input, Row, Col } from 'antd'

import TemplateCard from './templateCard/index'

const DashboardTemplate = (props: any) => {
  const [inputValue, setInputValue] = useState('')

  // 搜索
  const search = (e: any) => {
    console.log('模板页面的搜索');
  }

  const backClick = () => {
    //TODO 返回上一级页面
    console.log('back');
  }

  const addTemplate = () => {
    //TODO 携带id 跳转至 新建模板 页面
  }
  return (
    <div className='DashboardTemplate-wrap'>
      <header className='back-bar'>
        <IconFont onClick={() => backClick()} className='back-icon' type='icon-fanhui' />
        <span className='text'>取消创建</span>
      </header>
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
      </div>
      {/* 模板列表 */}
      <div className="list-wrap">

        <Row gutter={[0, 0]} justify='start'>
          <Col span={6} md={4} lg={6}>
            <div className="blank-template" onClickCapture={() => addTemplate()}>
              <span className='text'>
                <IconFont className='tianjia-icon' type='icon-bianji' />
                空白模板
              </span>
            </div>
          </Col>
          {
            listData.map((item: any) => (
              <Col span={6} md={4} lg={6} ><TemplateCard {...item} /></Col>
            ))
          }
        </Row>
        {/* {
            listData.map((item: any) => (
              <Row gutter={[24, 24]} justify='space-between'>
                <Col span={8}><TemplateCard {...item} /></Col>
              </Row>
            ))
          } */}
      </div>
    </div>
  )
}

export default memo(DashboardTemplate)

const listData: unknown[] = [
  {
    id: '0',
    name: '如果很长需要用...代替如果很长需要用...代替如果很长需要用...代替',
    ratio: '16:9',
    fenbianlv: '1920 * 1080',
  },
  {
    id: '1',
    name: '中石油',
    ratio: '4:3',
    fenbianlv: '2048 * 1080',
  },
  {
    id: '2',
    name: '网络安全综合态势',
    ratio: '2:1',
    fenbianlv: '1020 * 720',
  },
  {
    id: '3',
    name: '网络安全综合态势',
    ratio: '2:1',
    fenbianlv: '1020 * 720',
  },
  {
    id: '4',
    name: '网络安全综合态势',
    ratio: '2:1',
    fenbianlv: '1020 * 720',
  },
  {
    id: '5',
    name: '网络安全综合态势',
    ratio: '2:1',
    fenbianlv: '1020 * 720',
  },
  // {
  //   id: '6',
  //   name: '网络安全综合态势',
  //   ratio: '2:1',
  //   fenbianlv: '1020 * 720',
  // },
  // {
  //   id: '7',
  //   name: '777777的意志',
  //   ratio: '9:6',
  //   fenbianlv: '1080 * 720',
  // },
  // {
  //   id: '6',
  //   name: '网络安全综合态势',
  //   ratio: '2:1',
  //   fenbianlv: '1020 * 720',
  // },
  // {
  //   id: '6',
  //   name: '网络安全综合态势',
  //   ratio: '2:1',
  //   fenbianlv: '1020 * 720',
  // },
  // {
  //   id: '6',
  //   name: '网络安全综合态势',
  //   ratio: '2:1',
  //   fenbianlv: '1020 * 720',
  // },
  // {
  //   id: '6',
  //   name: '网络安全综合态势',
  //   ratio: '2:1',
  //   fenbianlv: '1020 * 720',
  // },
  // {
  //   id: '6',
  //   name: '网络安全综合态势',
  //   ratio: '2:1',
  //   fenbianlv: '1020 * 720',
  // },
  // {
  //   id: '6',
  //   name: '网络安全综合态势',
  //   ratio: '2:1',
  //   fenbianlv: '1020 * 720',
  // }
]