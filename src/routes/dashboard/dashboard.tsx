import { useEffect, useRef, useState } from 'react'
// react-beautiful-dnd
// ant
import { connect } from 'dva'
import './index.less'
import { Layout } from 'antd'
import {withRouter} from 'dva/router'

import { useClickAway } from 'ahooks'

import CustomHeader from './components/header/index'
import Left from './left'
import Center from './center'
import Right from './right'
import CenterHeaderBar from './center/components/topBar/index'
import ChooseArea from './center/components/ChooseArea'
import * as React from 'react'
import { init } from 'echarts'

const { Header } = Layout

function App({ bar, dispatch }: any) {
  // const trRef: any = useRef()
  // useClickAway(() => {
  //   console.log('没点到左边的');
  //   dispatch({
  //     type: 'bar/selectedNode',
  //     payload: {
  //       key: [],
  //     },
  //   })
  // }, [trRef])
  const detectZoom = () => {
    let ratio = 0,
      screen: any = window.screen,
      ua = navigator.userAgent.toLowerCase()

    if (window.devicePixelRatio !== undefined) {
      ratio = window.devicePixelRatio
    } else if (~ua.indexOf('msie')) {
      if (screen.deviceXDPI && screen.logicalXDPI) {
        ratio = screen.deviceXDPI / screen.logicalXDPI
      }
    } else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
      ratio = window.outerWidth / window.innerWidth
    }

    if (ratio) {
      ratio = Math.round(ratio * 100)
    }
    return ratio
  }
  const isScale = () => {
    let rate = detectZoom()
    console.log('rate', rate)
    if (rate != 100) {
      //如何让页面的缩放比例自动为100,'transform':'scale(1,1)'没有用，又无法自动条用键盘事件，目前只能提示让用户如果想使用100%的比例手动去触发按ctrl+0
      // alert('当前页面不是100%显示，请按键盘ctrl+0恢复100%显示标准，以防页面显示错乱！')
    }
  }
  const keyCodeMap: any = {
    // 91: true, // command
    61: true,
    107: true, // 数字键盘 +
    109: true, // 数字键盘 -
    173: true, // 火狐 - 号
    187: true, // +
    189: true, // -
  }
  useEffect(() => {
    // 覆盖ctrl||command + ‘+’/‘-’
    document.onkeydown = function (event) {
      const e = event || window.event
      const ctrlKey = e.ctrlKey || e.metaKey
      if (ctrlKey && keyCodeMap[e.keyCode]) {
        e.preventDefault()
      } else if (e.detail) { // Firefox
        event.returnValue = false
      }
    }

    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])
  /**
   * description:  是否显示中心画布上方的导航栏
   */
  const [showTopBar, setShowTopBar] = useState(false)
  const [zujianORsucai, setZujianORsucai] = useState('zujian')
  const showWhichBar = (whichBar: string) => {
    setZujianORsucai(whichBar)
    setShowTopBar(true)
  }


  return (
    <Layout>
      <ChooseArea/>

      <Header className="home-header">
        <CustomHeader showWhichBar={showWhichBar} />
      </Header>
      <div className="p-home">
        <div className='home-left-wrap'
        >
          <Left />
        </div>
        <div className="center-wrap">
          <CenterHeaderBar showTopBar={showTopBar} zujianORsucai={zujianORsucai} />
          <Center />
        </div>
        <Right />
      </div>
    </Layout>
  )
}

export default withRouter(connect(({ bar }: any) => (
  { bar }
))(App))


/**
   * description: 左侧菜单栏拖动功能
   */
  // const dragEl: any = document.querySelector('.left-menu')
  // // 拖动右边框改变右侧菜单栏的宽度
  // const changeWidth = throttle((e: any) => {
  //   console.log('eeeeeeeee', e);
  //   console.log('dragEl', dragEl);
  //   e.stopPropagation()
  //   if (e.clientX > 180 && e.clientX < 300) {
  //     dragEl.style.width = `${e.clientX}px`
  //   }
  // }, 0)
  // const onMouseDown = (e: any) => {
  //   const isLeftClick = e.button == 0
  //   if (isLeftClick) {
  //     document.addEventListener('mousemove', changeWidth)
  //   }
  //   document.addEventListener('mouseup', () => {
  //     document.removeEventListener('mousemove', changeWidth)
  //   })
  // }
