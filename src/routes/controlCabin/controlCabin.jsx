import React, { memo, useState, useEffect } from 'react';
import './index.less'
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { http } from '../../services/request';

import { Spin, Empty } from 'antd';
import { CloseOutlined, ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

const picUrl = require('../../assets/images/模板默认背景图.png')
let currentFullScreenIndex = 0;
const ControlCabin = props => {
  const curWorkspace = JSON.parse(localStorage.getItem('curWorkspace'))
  const spaceId = curWorkspace?.id
  const [currnetIndex, setCurrentIndex] = useState(0)
  const [applist, setAppList] = useState([])
  const [loading, setLoading] = useState(true)
  const [isShowModal, setIsShowModal] = useState(false)
  const [appSrc, setAppSrc] = useState(null)

  useEffect(() => {
    getAppList()
  }, [spaceId])

  const getAppList = async () => {
    const data = await http({
      url: '/visual/application/cockpitAppList ',
      method: 'post',
      body: {
        spaceId,
      }
    })
    setLoading(false)
    data && data.forEach(item => {
      item.photoUrl = item.photoUrl || picUrl
    })
    if (!data || !data.length) {
      setAppList([])
    } else if (data.length <= 3) {
      const result = fillArrTo4(data)
      setAppList(result)
    } else {
      setAppList(data)
    }
  }

  const fillArrTo4 = (data) => {
    const result = data
    let len = data.length
    let i = 0
    while (4 - len > 0) {
      result.push(result[i])
      len++
      i++
    }
    return result
  }

  const settings = {
    dots: false,
    arrows: true,
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0",
    slidesToShow: 3,
    speed: 500,
    swipe: false,
    initialSlide: currnetIndex,

    afterChange: (index) => {
      setCurrentIndex(index)
      setStyle()
      currentFullScreenIndex = index
    },
    onInit: () => {
      setStyle()
    }
  };

  const setStyle = () => {
    const slickItema = document.getElementsByClassName('slick-slide')
    for (let i = 0; i < slickItema.length; i++) {
      slickItema[i].classList.remove('control-cabin-img-active-left')
      slickItema[i].classList.remove('control-cabin-img-active-center')
      slickItema[i].classList.remove('control-cabin-img-active-right')
    }
    const sliderActives = document.getElementsByClassName('slick-active')
    sliderActives[0].classList.add('control-cabin-img-active-left')
    sliderActives[1].classList.add('control-cabin-img-active-center')
    sliderActives[2].classList.add('control-cabin-img-active-right')
  }

  const onClick = (index, item) => {
    if (index === currnetIndex) {
      scanDashboard(item.id)
    }
  }

  const scanDashboard = (id) => {
    // let newTab = window.open('_blank');
    // newTab.location.href = `/bigscreen/${id}`
    // newTab?.history.replaceState(null, '')
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
                <Slider {...settings}>
                  {applist.map((item, index) => {
                    return (
                      <div key={index} title={item.name} className="control-cabin-img">
                        <div className="picture" onClick={() => onClick(index, item)}>
                          <img src={item.photoUrl} alt={item.name} />
                        </div>
                      </div>
                    )
                  })}
                </Slider>
                : <Empty description="暂无数据" />
          }
        </div>
        <div className="con-cabin-fullscreen" style={{ display: isShowModal ? 'block' : 'none' }}>
          <iframe src={appSrc} frameborder="0"></iframe>
          <div className="con-cabin-close-fullscreen" onClick={() => setIsShowModal(false)}>
            <CloseOutlined />
          </div>
          <div className="con-cabin-fullscreen-btn con-cabin-fullscreen-pre" onClick={showPreApp}>
            <ArrowLeftOutlined />
          </div>
          <div className="con-cabin-fullscreen-btn con-cabin-fullscreen-next" onClick={showNextApp}>
            <ArrowRightOutlined />
          </div>
        </div>
      </div>



    </div>
  )
}

export default memo(ControlCabin)
