import { memo, useEffect, useState } from 'react'
import './index.less'
import { withRouter } from 'dva/router'
import { connect } from 'dva'
import { deepClone, treeDataReverse } from '@/utils'

import { Spin } from 'antd'


import RecursiveComponent from './components/recursiveComponent'
import { calcCanvasSize } from '../../utils'

const PublishedDashBoard = ({ dispatch, publishDashboard, history, location }: any) => {
  // 加载出整个大屏前，需要一个动画
  const [isLoaded, setIsLoaded] = useState(false)
  // 接口中返回的 当前屏幕设置信息
  const [dashboardConfig, setDashboardConfig] = useState([])
  const [scaleMode, setScaleMode] = useState<string>('')
  const [absolutePosition, setAbsolutePosition] = useState({ left: 0, top: 0 })
  const [pageStyle, setPageStyle]: any = useState({})
  const [scaleStyle, setScaleStyle] = useState({})
  // 如果是 “按屏幕比例适配” 的情况下
  const [previewDashboardStyle, setPreviewDashboardStyle] = useState({})
  // 如果是等比例溢出的缩放模式下，给overflowStyle赋值
  const [overflowStyle, setOverflowStyle] = useState({})
  const [scaleValue, setScaleValue] = useState(1)
/**
  * description: 获取屏幕大小、缩放设置等参数
  */
 const [layers, setLayers] = useState([])
 const [panels, setPanels] = useState([])
 const [components, setComponents] = useState([])
  /**
   * description: 根据缩放模式来配置页面
   */
  const previewByScaleMode = async ({ dashboardConfig, dashboardName }: any) => {
    document.title = dashboardName
    // 获取屏幕大小、背景等参数
    const configInfo: any = getScreenInfo(dashboardConfig)
    const winW = document.documentElement.clientWidth
    const winH = document.documentElement.clientHeight
    const { width, height } = configInfo['屏幕大小']

    let finalStyle: any = {
      background: configInfo['背景'],
      backgroundImage: `url(${configInfo['背景图']})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      position: 'absolute',
      transformOrigin: 'left top',
      width: width,
      height: height,
    }

    // 根据缩放模式来展示
    const scaleMode = configInfo['缩放设置']
    setScaleMode(scaleMode)
    switch (scaleMode) {
      // 按屏幕比例适配
      case '0':
        // 只有在这种预览模式下 才需要执行 setCanvasSize()
        setCanvasSize(dashboardConfig)
        // finalStyle.width = width // recommandConfig.width
        // finalStyle.height = height
        // finalStyle.position = 'absolute'
        // finalStyle.transformOrigin = 'left top'
        const { scaleValue, absolutePosition } = calcCanvasSize({ width, height })
        setAbsolutePosition(absolutePosition)
        // setScaleValue(scaleValue)
        const tempStyle = {
          position: 'absolute',
          width: pageStyle.width * scaleValue,
          height: pageStyle.height * scaleValue,
        }
        setPreviewDashboardStyle(tempStyle)
        const originScale = {
          transform: `scale(${scaleValue})`
        }
        setScaleStyle(originScale)
        break;
      // 强制铺满
      case '1':
        const wRatio = winW / width
        const hRatio = winH / height
        const forceCovered = {
          transform: `scaleX(${wRatio}) scaleY(${hRatio})`
        }
        setScaleStyle(forceCovered)

        break;
      // 原比例展示溢出滚动
      case '2':
        const wRatio2 = winW / width
        const hRatio2 = winH / height
        // 在 宽高比中找一个大的
        let finalOverflowStyle: any = {
          width: 0,
          height: 0,
        }
        if(hRatio2 > wRatio2) {
          finalOverflowStyle.width = '100vw'
          finalOverflowStyle.height = `${winH}px`
          finalOverflowStyle.overflowX = 'auto'
          setScaleStyle({transform: `scale(${hRatio2})`})
        } else {
          finalOverflowStyle.height = '100vh'
          finalOverflowStyle.width = `${winW}px}`
          finalOverflowStyle.overflowY = 'auto'
          setScaleStyle({transform: `scale(${wRatio2})`})
        }
        setOverflowStyle(finalOverflowStyle)
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
  // @Mark --  hooks顺序不能打乱
  // 初入页面 - 获取数据
  useEffect(() => {
    const init = async () => {
      setIsLoaded(false)
      const { dashboardConfig, dashboardName }: any = await initDashboard()
      setDashboardConfig(dashboardConfig)
      await previewByScaleMode({ dashboardConfig, dashboardName })
      setIsLoaded(true)
    }
    init()
    return () => {
      dispatch({
        type: 'publishDashboard/clearCurrentDashboardData'
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (scaleMode === '0') {
      if (dashboardConfig.length > 0) {
        window.addEventListener('resize', setCanvasSize)
      }
      return () => {
        window.addEventListener('resize', setCanvasSize)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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


  // 定时刷新页面
  useEffect(() => {
    const intervalId = setInterval(async () => {
      const { dashboardConfig, dashboardName }: any = await initDashboard()
      await previewByScaleMode({ dashboardConfig, dashboardName })
    }, 3600 * 1000)
    return () => {
      clearInterval(intervalId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 画布上的 Layer 渲染顺序 和此页面相反，所以先将layers里的顺序反转
  useEffect(() => {
    const data = deepClone(publishDashboard.treeData)
    treeDataReverse(data)
    setLayers(data)
    setComponents(publishDashboard.components)
    setPanels(publishDashboard.panels)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publishDashboard.treeData])

  // 调用 dispatch,完成数据的请求 以及 接口数据中各项 设置到指定位置
  const initDashboard = (cb = function () { }) => {
    return new Promise((resolve, reject) => {
      const dashboardId = window.location.pathname.split('/')[2]
      dispatch({
        type: 'publishDashboard/initDashboard',
        payload: {
          dashboardId,
        },
        cb: (data: any) => {
          resolve(data)
        }
      })
    })
  }

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
          <div className='customScrollStyle' style={{ ...overflowStyle }}>
            <div className='publishDashboard-wrap'
              style={{
                ...previewDashboardStyle,
                ...absolutePosition,
              }}
            >
              <div id="scaleDiv"
                style={{
                  ...pageStyle,
                  ...scaleStyle,
                  overflow: 'hidden'
                }}
              >
                {
                  <RecursiveComponent
                  layersArr={layers}
                  componentLists={components}
                  panels={panels}
                  publishDashboard={publishDashboard}
                  dispatch={dispatch}
                  scaleValue={scaleValue}
                  scaleMode={scaleMode}
                />
                }
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
  ({ publishDashboard }: any) => ({ publishDashboard })
)(withRouter(PublishedDashBoard)))
