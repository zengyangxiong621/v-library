import { memo, useEffect, useState } from 'react'
import './index.less'
import { withRouter } from 'dva/router'
import { connect } from 'dva'
import { deepClone, treeDataReverse } from '@/utils'

import { Spin } from 'antd'


import RecursiveComponent from './components/recursiveComponent'
import { calcCanvasSize } from '../../utils'

const PreViewDashboard = ({ dispatch, bar, history, location }: any) => {
  // 加载出整个大屏前，需要一个动画
  const [isLoaded, setIsLoaded] = useState(false)
  const [screenWidthRatio, setScreenWidthRatio] = useState(1)
  const [screenHeightRatio, setScreenHeightRatio] = useState(1)
  const [dashboardConfig, setDashboardConfig] = useState([])
  const [pageStyle, setPageStyle] = useState({})
  const [screenInfoMap, setScreenInfoMap] = useState<any>({})
  // 如果是等比例溢出的缩放模式下，给overflowStyle赋值
  const [overflowStyle, setOverflowStyle] = useState({})
  const [scaleValue, setScaleValue] = useState(1)
  /**
  * description: 获取屏幕大小、缩放设置等参数
  */
  const [layers, setLayers] = useState(deepClone(bar.treeData))
  useEffect(() => {
    const data = deepClone(bar.treeData)
    treeDataReverse(data)
    setLayers(data)
  }, [bar.treeData])

  const setCanvasSize = (config: any) => {
    config = config || dashboardConfig
    const screenInfoMap: any = getScreenInfo(config)
    const { width, height } = screenInfoMap['屏幕大小']
    const scaleValue = calcCanvasSize({ width, height })
    setScaleValue(scaleValue)
  }

  useEffect(() => {
    if (!dashboardConfig.length) {
      window.addEventListener('resize', setCanvasSize)
      return () => {
        window.addEventListener('resize', setCanvasSize)
      }
    }
  }, [dashboardConfig])
  const calcCanvasScale = (e: any) => {
    if (e.ctrlKey) {
      e.preventDefault()
    }
  }

  useEffect(() => {
    if (scaleValue) {
      window.addEventListener('wheel', calcCanvasScale, { passive: false })
    }
    return () => {
      window.removeEventListener('wheel', calcCanvasScale)
    }
  }, [scaleValue])

  const getScreenInfo = (config: any) => {
    let map: any = {}
    config.forEach(({ displayName, value, options, width, height }: any) => {
      let target = value
      switch (displayName) {
        case '屏幕大小':
          target = { width, height }
          break;
      }
      map[displayName] = target
    })
    return map
  }

  /**
   * description: 进入页面，先获取画布详情
   */
  const getDashboardData = async ({ dashboardConfig, dashboardName }: any) => {
    document.title = dashboardName
    // setDashboardConfig(dashboardConfig)
    // 获取屏幕大小、背景等参数
    const configInfo: any = getScreenInfo(dashboardConfig)
    setScreenInfoMap(configInfo)
    const winW = window.innerWidth
    const winH = window.innerHeight
    const { width, height } = configInfo['屏幕大小']
    console.log('相关配置++++++++', configInfo);
    const finalStyle: any = {
      background: configInfo['背景'],
      // backgroundImage: screenInfoMap['背景图']
    }
    // 根据缩放模式来展示
    const scaleMode = configInfo['缩放设置']
    switch (scaleMode) {
      case '0':
        finalStyle.width = '100vw'
        finalStyle.height = '100vh'
        const wRatio = winW / width
        const hRatio = winH / height
        setScreenWidthRatio(wRatio)
        setScreenHeightRatio(hRatio)
        finalStyle.transform = `scale(${scaleValue})`
        break;
      case '1':
        finalStyle.width = '100vw'
        finalStyle.height = '100vh'
        const wRatio2 =  winW / width
        const hRatio2 =  winH / height
        setScreenWidthRatio(wRatio2)
        setScreenHeightRatio(hRatio2)
        // finalStyle.transform = `scale(${scaleValue})`
        finalStyle.overflow = 'hidden'
        break;
      case '2':
        // const finalW = winW > width ? width : '100vw'
        // const finalH = winH > height ? height : '100vh'
        const finalW = '100vw'
        const finalH = '100vh'
        setScreenWidthRatio(width / winW)
        setScreenHeightRatio(height / winH)
        setOverflowStyle({
          width: finalW,
          height: finalH,
          overflow: 'auto',
          ...finalStyle
        })
        break;
    }
    setPageStyle(finalStyle)
  }
  // 初入页面 - 获取数据
  useEffect(() => {
    const init = async () => {
      setIsLoaded(false)
      const { dashboardConfig, dashboardName }: any = await initDashboard()
      setDashboardConfig(dashboardConfig)
      setCanvasSize(dashboardConfig)

      await getDashboardData({ dashboardConfig, dashboardName })
      setIsLoaded(true)
    }
    init()
    return () => {
      dispatch({
        type: 'bar/clearCurrentDashboardData'
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // 定时刷新页面
  useEffect(() => {
    const intervalId = setInterval(async () => {
      const { dashboardConfig, dashboardName }: any = await initDashboard()
      await getDashboardData({ dashboardConfig, dashboardName })
    }, 3600 * 1000)
    return () => {
      clearInterval(intervalId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // 调用 dispatch,完成数据的请求 以及 接口数据中各项 设置到指定位置
  const initDashboard = (cb = function () { }) => {
    return new Promise((resolve, reject) => {
      const dashboardId = window.location.pathname.split('/')[2]
      dispatch({
        type: 'bar/initDashboard',
        payload: dashboardId,
        cb: (data: any) => {
          resolve(data)
        }
      })
    })

  }
  console.log('pageStylepageStylepageStylepageStyle', pageStyle);
  return (
    <>
      {
        isLoaded ?
          <div className='customScrollStyle' style={overflowStyle}>
            <div className='previewDashboard-wrap'
              style={{
                ...pageStyle,
              }}
            >
              <img style={{ position: 'absolute', width: '100%', height: '100%' }} src={screenInfoMap['背景图']} alt="" />
              {
                <RecursiveComponent
                  layersArr={layers}
                  componentLists={bar.components}
                  bar={bar}
                  dispatch={dispatch}
                  scaleValue={scaleValue}
                  screenWidthRatio={screenWidthRatio}
                  screenHeightRatio={screenHeightRatio}
                />
              }
            </div>
          </div>
          :
          <Spin
            tip='正在生成中…'
            style={{ maxHeight: '100%' }}>
            <div style={{ width: '100vw', height: '100vh', backgroundColor: '#181a24' }}></div>
          </Spin>
      }
    </>
  )
}

export default memo(connect(
  ({ bar }: any) => ({ bar })
)(withRouter(PreViewDashboard)))
