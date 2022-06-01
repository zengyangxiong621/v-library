import { memo, useEffect, useState } from 'react'
import './index.less'
import { withRouter } from 'dva/router'
import { Spin, message } from 'antd'

import { http } from '../../services/request'

import EveryComponent from './components/everyComponent'
import { getLayerIds } from './types'

const PublishDashboard = ({ history, location }: any) => {
  // 加载出整个大屏前，需要一个动画
  const [isLoaded, setIsLoaded] = useState(false)
  const [componentsList, setComponentsList] = useState([])
  const [dashboardConfig, setDashboardConfig] = useState([])


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
  // 进入页面，先获取画布详情
  const getDashboardDetail = async () => {
    setIsLoaded(false)
    let { components, dashboardName, layers, dashboardConfig }: any = await http({
      url: `/visual/application/dashboard/detail/${dashboardId}`,
      method: 'get',
    })
    if (Array.isArray(components)) {
      setIsLoaded(true)
      document.title = dashboardName
    }
    // 要根据layers来渲染组件，所以最终需要过滤掉某些components
    const layerIds = getLayerIds(layers)
    // 最终需要渲染的components
    const hadFilterComponents = components.filter((item: any) => layerIds.includes(item.id))
    setComponentsList(hadFilterComponents)
    setDashboardConfig(dashboardConfig)

    // 获取屏幕大小、背景等参数
    const screenInfoMap: any = getScreenInfo(dashboardConfig)
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
  useEffect(() => {
    getDashboardDetail()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      {
        isLoaded ?
          <div className='customScrollStyle' style={overflowStyle}>
            <div className='publishDashboard-wrap'
              style={pageStyle}
            >
              {
                componentsList.map((item, index) => <>
                  <EveryComponent key={index}
                    componentData={item}
                    screenWidthRatio={screenWidthRatio}
                    screenHeightRatio={screenHeightRatio}
                  />
                </>)
              }
            </div>
          </div>
          :
          <Spin
            tip='正在加载中…'
            style={{ maxHeight: '100%' }}>
            <div style={{ width: '100vw', height: '100vh', backgroundColor: '#181a24' }}></div>
          </Spin>
      }
    </>
  )
}
export default memo(withRouter(PublishDashboard))