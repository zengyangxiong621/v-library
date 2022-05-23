import { memo, useEffect, useState } from 'react'
import './index.less'
import { withRouter } from 'dva/router'
import { Spin, message } from 'antd'

import { http } from '../../services/request'

import EveryComponent from './components/everyComponent'


const PublishDashboard = ({ history, location }: any) => {
  // 加载出整个大屏前，需要一个动画
  const [isLoaded, setIsLoaded] = useState(false)
  const [allComponentsList, setAllComponentsList] = useState([])
  const { pathname } = location
  const dashboardId = pathname.split('/').pop()
  // 进入页面，先获取画布详情
  const getDashboardDetail = async () => {
    setIsLoaded(false)
    let { components, dashboardName }: any = await http({
      url: `/visual/application/dashboard/detail/${dashboardId}`,
      method: 'get',
    })
    if (Array.isArray(components)) {
      setIsLoaded(true)
      document.title = dashboardName
    } else {
      message.error('出错了，请稍后重试');
    }
    // console.log('预览模板画布详情数据', components);
    setAllComponentsList(components)
  }
  useEffect(() => {
    getDashboardDetail()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      {
        isLoaded ?
          <div className='PublishDashboard-wrap'>
            {
              allComponentsList.map((item, index) => <>
                <EveryComponent key={index} allData={item} />
              </>)
            }
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