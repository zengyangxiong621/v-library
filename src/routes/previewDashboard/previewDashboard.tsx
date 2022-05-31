import { memo, useEffect, useState } from 'react'
import './index.less'
import { withRouter } from 'dva/router'
import { Spin, message } from 'antd'

import { http } from '../../services/request'

import EveryComponent from './components/everyComponent'
import Cus from './components/CustomDraggable/index'
import { getLayerIds } from './types'


const PreViewDashboard = ({ history, location }: any) => {
  // 加载出整个大屏前，需要一个动画
  const [isLoaded, setIsLoaded] = useState(false)
  const [componentsList, setComponentsList] = useState([])
  const [dashboardConfig, setDashboardConfig] = useState([])

  const [screenWidthRatio, setScreenWidthRatio] = useState(1)
  const [screenHeightRatio, setScreenHeightRatio] = useState(1)

  const [pageStyle, setPageStyle] = useState({})
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
        case '缩放设置':
          if (options && Array.isArray(options)) {
            target = options.find(x => x.value === value)
          }
          break;
        default:
          break;
      }
      map[displayName] = target
    })
    return map
  }
  /**
   * description: 进入页面，先获取画布详情
   */
  const getDashboardDetail = async () => {
    let { components, dashboardName, layers, dashboardConfig }: any = await http({
      url: `/visual/application/dashboard/detail/${dashboardId}`,
      method: 'get',
    })

    if (Array.isArray(components)) {
      document.title = dashboardName
    }
    // 要根据layers来渲染组件，所以最终需要过滤掉某些components
    const layerIds = getLayerIds(layers)
    // 最终需要渲染的components
    // eslint-disable-next-line array-callback-return
    const hadFilterComponents = components.filter((item: any) => layerIds.includes(item.id))
    setComponentsList(hadFilterComponents)
    setDashboardConfig(dashboardConfig)

    // 获取屏幕大小、背景等参数
    const screenInfoMap: any = getScreenInfo(dashboardConfig)
    const winW = window.innerWidth
    const winH = window.innerHeight
    const { width, height } = screenInfoMap['屏幕大小']
    setScreenWidthRatio(winW / width)
    setScreenHeightRatio(winH / height)

    const finalStyle: any = {
      background: screenInfoMap['背景'],
      backgroundImage: screenInfoMap['背景图'] ? require(screenInfoMap['背景图']) : ''
    }
    setPageStyle(finalStyle)
  }
  useEffect(() => {
    const init = async () => {
      setIsLoaded(false)
      await getDashboardDetail()
      setIsLoaded(true)
    }
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    const intervalId = setInterval(() => {
      getDashboardDetail()
    }, 3600 * 1000)
    return () => {
      clearInterval(intervalId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])




  return (
    <>
      {
        isLoaded ?
          <div className='previewDashboard-wrap'
            style={pageStyle}
          >
            {
              componentsList.map((item, index) => <>
                <EveryComponent key={index}
                  componentData={item}
                  screenWidthRatio={screenWidthRatio}
                  screenHeightRatio={screenHeightRatio}
                />
                {/* <Cus mouse={0} treeData={layers} /> */}
              </>)
            }
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

export default memo(withRouter(PreViewDashboard))