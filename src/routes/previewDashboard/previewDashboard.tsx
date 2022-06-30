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
  const [absolutePosition, setAbsolutePosition] = useState({left: 0, top: 0})
  const [pageStyle, setPageStyle]: any = useState({})
  // 如果是等比例溢出的缩放模式下，给overflowStyle赋值
  const [overflowStyle, setOverflowStyle] = useState({})
  const [scaleValue, setScaleValue] = useState(1)
  /**
  * description: 获取屏幕大小、缩放设置等参数
  */
  const [layers, setLayers] = useState(deepClone(bar.treeData))

  /**
   * description: 进入页面，先获取画布详情
   */
  const getDashboardData = async ({ dashboardConfig, dashboardName }: any) => {
    document.title = dashboardName
    setDashboardConfig(dashboardConfig)
    // 获取屏幕大小、背景等参数
    const configInfo: any = getScreenInfo(dashboardConfig)
    // const winW = window.innerWidth
    // const winH = window.innerHeight
    const winW = document.documentElement.clientWidth
    const winH = document.documentElement.clientHeight
    const { width, height } = configInfo['屏幕大小']


    let finalStyle: any = {
      background: configInfo['背景'],
      backgroundImage: configInfo['背景图'],
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      pointerEvents: 'none',
      overflow: 'hidden',
      filter: 'unset',
    }

    // 根据缩放模式来展示
    const scaleMode = configInfo['缩放设置']
    switch (scaleMode) {
      case '0':
        // widthRatio
        finalStyle.width = width // recommandConfig.width
        finalStyle.height = height
        finalStyle.position = 'absolute'
        const { scaleValue, absolutePosition } = calcCanvasSize({ width, height })
        setAbsolutePosition(absolutePosition)
        finalStyle.transformOrigin = 'left top'
        setScaleValue(scaleValue)
        finalStyle.backgroundImage = `url(${configInfo['背景图']})`
        break;
      case '1':
        finalStyle.width = '100vw'
        finalStyle.height = '100vh'
        const wRatio2 = winW / width
        const hRatio2 = winH / height
        setScreenWidthRatio(wRatio2)
        setScreenHeightRatio(hRatio2)
        finalStyle.overflow = 'hidden'
        break;
      case '2':
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


  const setCanvasSize = (config?: any) => {
    if (config instanceof Event) {
      config = dashboardConfig
    } else {
      config = config || dashboardConfig
    }
    if (config.length > 0) {
      const screenInfoMap: any = getScreenInfo(config)
      const { width, height } = screenInfoMap['屏幕大小']
      const { scaleValue, absolutePosition } = calcCanvasSize({ width, height })
      setScaleValue(scaleValue)
      setAbsolutePosition(absolutePosition)
    }
  }

  useEffect(() => {
    if (dashboardConfig.length > 0) {
      console.log('1', dashboardConfig)
      window.addEventListener('resize', setCanvasSize)
    }
    return () => {
      window.addEventListener('resize', setCanvasSize)
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
  useEffect(() => {
    const data = deepClone(bar.treeData)
    treeDataReverse(data)
    setLayers(data)
  }, [bar.treeData])


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
  return (
    <div id="gs-v-library-app">
      {
        isLoaded ?
          <div id='bigscreen-container'>
            <div className='customScrollStyle' style={{ ...overflowStyle }}>
              <div className='previewDashboard-wrap'
                   style={{
                     position: 'absolute',
                     width: pageStyle.width * scaleValue,
                     height: pageStyle.height * scaleValue,
                     ...absolutePosition,
                   }}
              >
                <div id="scaleDiv"
                  style={{
                    ...pageStyle,
                    transform: `scale(${scaleValue})`
                  }}
                >
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
            </div>

          </div>
          :
          <Spin
            tip='正在生成中…'
            style={{ maxHeight: '100%' }}>
            <div style={{ width: '100vw', height: '100vh', backgroundColor: '#181a24' }}></div>
          </Spin>
      }
    </div>
  )
}

export default memo(connect(
  ({ bar }: any) => ({ bar })
)(withRouter(PreViewDashboard)))
