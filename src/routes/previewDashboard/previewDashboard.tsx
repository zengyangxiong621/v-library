import { memo, useEffect, useState } from 'react'
import './index.less'
import { withRouter } from 'dva/router'
import { connect } from 'dva'

import { Spin } from 'antd'
import { http } from '../../services/request'


import { getLayerIds, MODULES } from './types'
import { getComDataWithFilters } from '@/utils/data'
import { deepClone } from '@/utils'


import EveryComponent from './components/everyComponent'
import RecursiveComponent from './components/recursiveComponent'


const PreViewDashboard = ({ dispatch, bar, history, location }: any) => {
  // 加载出整个大屏前，需要一个动画
  const [isLoaded, setIsLoaded] = useState(false)
  const [componentLists, setComponentLists] = useState(deepClone(bar.components))
  const [layersArr, setLayersArr] = useState(deepClone(bar.treeData))

  // const [dashboardConfig, setDashboardConfig] = useState([])

  const [screenWidthRatio, setScreenWidthRatio] = useState(1)
  const [screenHeightRatio, setScreenHeightRatio] = useState(1)

  const [pageStyle, setPageStyle] = useState({})
  // 如果是等比例溢出的缩放模式下，给overflowStyle赋值
  const [overflowStyle, setOverflowStyle] = useState({})
  const { pathname } = location
  const dashboardId = pathname.split('/').pop()
  /**
  * description: 获取屏幕大小、缩放设置等参数
  */
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
  const getDashboardData = async ({dashboardConfig, dashboardName }: any ) => {
    document.title = dashboardName
    // setDashboardConfig(dashboardConfig)

    // 获取屏幕大小、背景等参数
    const screenInfoMap: any = getScreenInfo(dashboardConfig)
    console.log('screenInfoMap', screenInfoMap)
    const winW = window.innerWidth
    const winH = window.innerHeight
    const { width, height } = screenInfoMap['屏幕大小']

    const finalStyle: any = {
      background: screenInfoMap['背景'],
      backgroundImage: screenInfoMap['背景图'] ? require(screenInfoMap['背景图']) : ''
    }
    // 根据缩放模式来展示
    const scaleMode = screenInfoMap['缩放设置']
    switch (scaleMode) {
      case '0':
        finalStyle.width = '100vw'
        finalStyle.height = '100vh'
        const wRatio = winW / width
        const hRatio = winH / height
        let unifyRatio
        if (wRatio > hRatio) {
          unifyRatio = Math.max(wRatio, hRatio)
        } else {
          unifyRatio = Math.min(wRatio, hRatio)
        }
        setScreenWidthRatio(unifyRatio)
        setScreenHeightRatio(unifyRatio)
        break;
      case '1':
        finalStyle.width = '100vw'
        finalStyle.height = '100vh'
        setScreenWidthRatio(winW / width)
        setScreenHeightRatio(winH / height)
        break;
      case '2':
        const finalW = winW > width ? width : '100vw'
        const finalH = winH > height ? height : '100vh'
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
      const {dashboardConfig, dashboardName } : any = await initDashboard()
      await getDashboardData({dashboardConfig, dashboardName } )
      setIsLoaded(true)
    }
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // 定时刷新页面
  useEffect(() => {
    const intervalId = setInterval(async () => {
      const {dashboardConfig, dashboardName } : any = await initDashboard()
      await getDashboardData({dashboardConfig, dashboardName } )
    }, 3600 * 1000)
    return () => {
      clearInterval(intervalId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const initDashboard = (cb=function (){}) => {
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

  return (
    <>
      {
        isLoaded ?
          <div className='customScrollStyle' style={overflowStyle}>
            <div className='previewDashboard-wrap'
              style={pageStyle}
            >
              {
                <RecursiveComponent
                  layersArr={layersArr}
                  componentLists={componentLists}
                  bar={bar}
                  dispatch={dispatch}
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
