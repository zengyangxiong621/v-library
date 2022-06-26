import { useEffect, useState } from 'react'
// react-beautiful-dnd
// ant
import { connect } from 'dva'
import './index.less'
import { Layout } from 'antd'
import { withRouter } from 'dva/router'

import CustomHeader from './components/header/index'
import Left from './left'
import CenterCanvas from './center'
import Right from './right'
import CenterHeaderBar from './center/components/topBar/index'
import CenterBottomBar from './center/components/BottomBar/index'
import ChooseArea from './center/components/ChooseArea'
import CenterRightMenu from './left/components/rightClickMenu/rightClickMenu'
import { menuOptions } from './left/Data/menuOptions'
import DataContainer from './components/dataContainer'
import CallbackArgs from './components/callbackArgs'
import useLoading from '@/components/useLoading'
import { useEventEmitter } from 'ahooks';

const { Header } = Layout

function App({ bar, dispatch, location }: any) {
  const [showTopBar, setShowTopBar] = useState(false)
  const [zujianORsucai, setZujianORsucai] = useState('zujian')
  const [dataContainerVisible, setDataContainerVisible] = useState(false)
  const [callbackArgsVisible, setCallbackArgsVisible] = useState(false)
  const [customMenuOptions, setCustomMenuOptions] = useState(menuOptions)
  const [loading, setLoading]: any = useLoading(false, document.querySelector('.p-home'))
  // 在多个组件之间进行事件通知有时会让人非常头疼，借助 EventEmitter ，可以让这一过程变得更加简单。
  const focus$ = useEventEmitter();

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
  const clearAllStatus = (event: MouseEvent) => {
    const dom: any = (event.target as any) || null
    let temp = true
    // 如果点击的 dom 的 className 在这个 className 数组中，那就清空
    let awayList = ['ant-layout', 'draggable-wrapper', 'left-wrap', 'use-away', 'canvas-draggable']
    awayList.forEach(className => {
      if (dom && dom.className && Object.prototype.toString.call(dom.className) === '[object String]' && dom.className.indexOf(className) !== -1) {
        temp = false
      }
    })
    if (!temp) {
      dispatch({
        type: 'bar/clearAllStatus',
      })
      // 取消选中节点的输入框
      dispatch({
        type: 'bar/reName',
        payload: {
          value: false,
        },
      })
      // 取消右键菜单
      dispatch({
        type: 'bar/save',
        payload: {
          isShowRightMenu: false,
        },
      })
    }
  }

  useEffect(() => {
    document.addEventListener('click', clearAllStatus)
    return () => {
      document.removeEventListener('click', clearAllStatus)
      dispatch({
        type: 'bar/clearCurrentDashboardData'
      })
      console.log('清除了嘛', bar)
    }
  }, [])

  // 阻止 window 缩放
  const handleStopWindowWheel = (event: any) => {
    const e = event || window.event
    const ctrlKey = e.ctrlKey || e.metaKey
    if (ctrlKey && keyCodeMap[e.keyCode]) {
      e.preventDefault()
    } else if (e.detail) { // Firefox
      event.returnValue = false
    }
  }

  useEffect(() => {
    const dashboardId = window.location.pathname.split('/')[2]

    dispatch({
      type: 'bar/initDashboard',
      payload: dashboardId,
      cb: () => { }
    })

    // dispatch({
    //   type: 'bar/getDashboardDetails',
    //   payload: dashboardId,
    // })
    // dispatch({
    //   type: 'bar/getDataContainerList',
    //   payload: dashboardId,
    //   cb:async (dataContainerList: any) => {
    //
    //     console.log('dataContainerList', dataContainerList)
    //   }
    // })
    document.addEventListener('keydown', handleStopWindowWheel)
    return () => {
      document.removeEventListener('keydown', handleStopWindowWheel)
    }
  }, [])

  /**
   * description:  是否显示中心画布上方的导航栏
   */

  const showWhichBar = (whichBar: string) => {
    if (['zujian', 'sucai'].includes(whichBar)) {
      setZujianORsucai(whichBar)
      setShowTopBar(true)
      return
    } else {
      setShowTopBar(false)
    }
    if (whichBar === 'shujurongqi') {
      setDataContainerVisible(true)
      setCallbackArgsVisible(false)
    } else if (whichBar === 'huitiaoguanli') {
      setCallbackArgsVisible(true)
      setDataContainerVisible(false)
    }
  }

  /**
   * description: 画布右键菜单
   */
  // 点击右键菜单后，隐藏菜单
  const hideMenu = () => {
    dispatch({
      type: 'bar/setIsShowRightMenu',
      payload: false,
    })
  }
  const handleDCVisibleChange = (value: boolean) => {
    setDataContainerVisible(value)
  }
  const handleCbAvailableChange = (value: boolean) => {
    setCallbackArgsVisible(value)
  }
  return (
    <Layout>
      <ChooseArea />
      <Header className="home-header">
        <CustomHeader showWhichBar={showWhichBar} />
      </Header>
      <div className="p-home">
        <div className="home-left-wrap">
          <Left />
        </div>
        <div className="center-wrap">
          <CenterHeaderBar showTopBar={showTopBar} zujianORsucai={zujianORsucai} />
          <CenterCanvas focus$={focus$} />
          <CenterBottomBar focus$={focus$} />
        </div>
        <div className="right-wrap">
          <Right />
          <DataContainer visible={dataContainerVisible} onChange={handleDCVisibleChange} />
          <CallbackArgs visible={callbackArgsVisible} onChange={handleCbAvailableChange} />
        </div>
        {
          bar.isShowRightMenu &&
          <CenterRightMenu menuOptions={customMenuOptions} hideMenu={hideMenu} />
        }
      </div>
    </Layout>
  )
}

export default withRouter(connect(({ bar }: any) => (
  { bar }
))(App))
