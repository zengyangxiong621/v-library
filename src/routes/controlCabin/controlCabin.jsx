import React, { memo, useState, useEffect } from 'react';
import './index.less'
import Carousel from './components/3DCarousel'

import { http } from '../../services/request';

import { Spin, Empty } from 'antd';
import { CloseOutlined, ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

const picUrl = require('../../assets/images/模板默认背景图.png')

let currentFullScreenIndex = 0;
const ControlCabin = props => {
  const [applist, setAppList] = useState([])
  const [loading, setLoading] = useState(true)
  const [isShowModal, setIsShowModal] = useState(false)
  const [appSrc, setAppSrc] = useState(null)

  useEffect(() => {
    getAppList()
  }, [])

  const getAppList = async () => {
    const data = await http({
      url: '/visual/application/cockpitAppList ',
      method: 'post',
      body: {
        spaceId: 1,
      }
    })
    setLoading(false)
    data && data.forEach(item => {
      item.url = item.photoUrl || picUrl
      item.title = item.name
    })
    if (!data || !data.length) {
      setAppList([])
    } else if (data.length <= 2) {
      const result = fillArrTo3(data)
      setAppList(result)
    } else {
      setAppList(data)
    }
  }

  const fillArrTo3 = (data) => {
    const result = data
    let len = data.length
    let i = 0
    while (3 - len > 0) {
      result.push(result[i])
      len++
      i++
    }
    return result
  }

  const appClick = (app) => {
    scanDashboard(app.id)
  }

  const scanDashboard = (id) => {
    setAppSrc(`/bigscreen/${id}`)
    setIsShowModal(true)
  }

  const showPreApp = () => {
    const length = applist.length
    if (currentFullScreenIndex === 0) {
      currentFullScreenIndex = length - 1
    } else {
      currentFullScreenIndex -= 1
    }
    setAppSrc(`/bigscreen/${applist[currentFullScreenIndex].id}`)
  }

  const showNextApp = () => {
    const length = applist.length
    if (currentFullScreenIndex === length - 1) {
      currentFullScreenIndex = 0
    } else {
      currentFullScreenIndex += 1
    }
    setAppSrc(`/bigscreen/${applist[currentFullScreenIndex].id}`)
  }

  return (
    <div className="control-cabin-wraper">
      <div className="control-cabin-bg">
        <div className="slide-wraper">
          {
            loading ?
              <Spin tip="加载中..." />
              : applist.length ?
                <Carousel
                  imageList={applist}
                  onClick={(app) => appClick(app)}
                />
                : <Empty description="暂无数据" />
          }
        </div>
        {
          isShowModal ? <div className="con-cabin-fullscreen">
            <iframe src={appSrc} frameBorder="0"></iframe>
            <div className="con-cabin-close-fullscreen" onClick={() => setIsShowModal(false)}>
              <CloseOutlined />
            </div>
            <div className="con-cabin-fullscreen-btn con-cabin-fullscreen-pre" onClick={showPreApp}>
              <ArrowLeftOutlined />
            </div>
            <div className="con-cabin-fullscreen-btn con-cabin-fullscreen-next" onClick={showNextApp}>
              <ArrowRightOutlined />
            </div>
          </div> : null
        }
      </div>
    </div>
  )
}

export default memo(ControlCabin)
