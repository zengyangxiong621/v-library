import { memo, useEffect, useState } from 'react'
import './index.less'

import { http } from '../../services/request'

import EveryComponent from './components/everyComponent'


const PreViewDashboard = (props: any) => {
  const [allComponentsList, setAllComponentsList] = useState([])
  useEffect(() => {
    // 进入页面，先获取画布详情
    const dashboardId = '1518928782400880642'
    const getDashboardDetail = async () => {
      const { components }: any = await http({
        url: `/visual/application/dashboard/detail/${dashboardId}`,
        method: 'get',
      })
      console.log('预览模板画布详情数据', components);
      setAllComponentsList(components)
    }
    getDashboardDetail()
  }, [])

  return (
    <div className='PreViewDashboard-wrap'>
      {
        allComponentsList.map((item, index) => <>
          <EveryComponent allData={item} />
        </>)
      }
    </div>
  )
}

export default memo(PreViewDashboard)