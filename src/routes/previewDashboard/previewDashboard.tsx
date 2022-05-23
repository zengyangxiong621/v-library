import { memo, useEffect, useState } from 'react'
import './index.less'
import { withRouter } from 'dva/router'
import { Spin, message } from 'antd'

import { http } from '../../services/request'

import EveryComponent from './components/everyComponent'


const PreViewDashboard = ({ history, location }: any) => {
  // 加载出整个大屏前，需要一个动画
  const [isLoaded, setIsLoaded] = useState(false)
  const [allComponentsList, setAllComponentsList] = useState([])
  const { pathname } = location
  const dashboardId = pathname.split('/').pop()
  /**
   * description: 进入页面，先获取画布详情
   */
  const getDashboardDetail = async () => {
    let { components, dashboardName }: any = await http({
      url: `/visual/application/dashboard/detail/${dashboardId}`,
      method: 'get',
    })
    if (Array.isArray(components)) {
      document.title = dashboardName
    }
    setAllComponentsList(components)
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
          <div className='previewDashboard-wrap'>
            {
              allComponentsList.map((item, index) => <>
                <EveryComponent key={index} allData={item} />
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