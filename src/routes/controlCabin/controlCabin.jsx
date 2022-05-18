import React, { memo, useState, useEffect } from 'react';
import './index.less'
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { http } from '../../services/request';

import { Spin, Empty } from 'antd';

const picUrl = require('../../assets/images/模板默认背景图.png')

const ControlCabin = props => {
  const [currnetIndex, setCurrentIndex] = useState(0)
  const [applist, setAppList] = useState([])
  const [loading, setLoading] = useState(true)

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
    dots: true,
    arrows: true,
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "8rem",
    slidesToShow: 3,
    speed: 500,
    swipe: false,
    initialSlide: currnetIndex,

    afterChange: (index) => {
      console.log(index)
      setCurrentIndex(index)
    }
  };

  const onClick = (index, item) => {
    if (index === currnetIndex) {
      scanDashboard(item.id)
    }
  }

  const scanDashboard = (id) => {
    let newTab = window.open('_blank');
    newTab.location.href = `/bigscreen/${id}`
    newTab?.history.replaceState(null, '')
  }

  return (
    <div className="control-cabin-wraper">
      {
        loading ?
          <Spin tip="加载中..." />
          : applist.length ?
            <Slider {...settings}>
              {applist.map((item, index) => {
                return (
                  <div key={index} title={item.name}>
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
  )
}

export default memo(ControlCabin)
