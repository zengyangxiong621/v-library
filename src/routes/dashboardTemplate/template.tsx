import { memo, useState } from 'react'
import './index.less'

import { IconFont } from '../../utils/useIcon'
import { SearchOutlined } from '@ant-design/icons'
import { Input, Row, Col, Modal } from 'antd'

import TemplateCard from './templateCard/index'
import Preview from './preview/index'
import DarkModal from '../myDashboard/components/darkThemeModal/index'

const DashboardTemplate = (props: any) => {
  const { history } = props
  // 放入预览模板中的图片链接数组
  const urlArr = listData.map((item: any) => item.imgUrl)

  const [curImgIndex, setCurImgIndex] = useState(-1)
  const [inputValue, setInputValue] = useState('')

  // 搜索
  const search = (e: any) => {
    console.log('模板页面的搜索');
  }

  const backClick = () => {
    history.back()
  }

  const addTemplate = () => {
    //TODO 携带id 跳转至 新建模板 页面
    // history.push('/')
  }

  // 获取当前需要预览的模板 的index
  const getCurImgIndex = (i: number) => {
    setCurImgIndex(i)
  }

  // 关闭弹窗
  const modalCancel = () => {
    setCurImgIndex(-1)
  }

  return (
    <div key={ props.location.pathname }>
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
          <Row gutter={[26, 25]} justify='start'>
            <Col span={6}>
              <div className="blank-template" onClickCapture={() => addTemplate()}>
                <span className='text'>
                  <IconFont className='tianjia-icon' type='icon-xinjianfenzu' />
                  空白模板
                </span>
              </div>
            </Col>
            {
              listData.map((item: any, index: number) => (
                <Col span={6} >
                  <TemplateCard {...item}
                    curIndex={index}
                    getCurImgIndex={getCurImgIndex} />
                </Col>
              ))
            }
          </Row>
        </div>
      </div>
      {/* 预览模板 */}
      <Modal
        visible={curImgIndex > -1}
        width="90vw"
        footer={null}
        keyboard={true}
        closeIcon={() => <></>} // 除去关闭按钮
        style={{
          top: '8vh'
        }}
        bodyStyle={{
          padding: '0'
        }}
        onCancel={() => modalCancel()}
      >
        <Preview srcUrlArr={urlArr} curIndex={curImgIndex} />
      </Modal>
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
    imgUrl: 'https://img1.baidu.com/it/u=3021003518,1825276686&fm=253&fmt=auto&app=138&f=JPEG?w=450&h=233'
  },
  {
    id: '1',
    name: '中石油',
    ratio: '4:3',
    fenbianlv: '2048 * 1080',
    imgUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F065f4419afd06bc98180e53711745d28f34161f8.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651990097&t=483e0024896fca43342fdd315b16c375'
  },
  {
    id: '2',
    name: '网络安全综合态势',
    ratio: '2:1',
    fenbianlv: '1020 * 720',
    imgUrl: 'https://img2.baidu.com/it/u=150520042,1822256108&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=312'
  },
  {
    id: '3',
    name: '网络安全综合态势',
    ratio: '2:1',
    fenbianlv: '1020 * 720',
    imgUrl: 'https://img2.baidu.com/it/u=836828249,4218074621&fm=253&fmt=auto&app=138&f=JPEG?w=820&h=461'
  },
  {
    id: '4',
    name: '网络安全综合态势',
    ratio: '2:1',
    fenbianlv: '1020 * 720',
    imgUrl: 'https://img1.baidu.com/it/u=1454865930,3426121759&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500'
  },
  {
    id: '5',
    name: '网络安全综合态势',
    ratio: '2:1',
    fenbianlv: '1020 * 720',
    imgUrl: 'https://img0.baidu.com/it/u=2651429005,3211950086&fm=253&fmt=auto&app=138&f=JPEG?w=605&h=454'
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