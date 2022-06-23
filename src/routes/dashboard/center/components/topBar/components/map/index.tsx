import { memo, useEffect, useState } from 'react'
import './index.less'

import EveryItem from '../everyItem/index'
import { http } from '@/services/request'

const Map = (props: any) => {
  // const { data } = props
  const [dataArr, setDataArr] = useState<any>([])
  useEffect(() => {
    getData()
  }, [])
  
  
  // 获取地图组件数据
  const getData = async () => {
    const data: any = await http({
      url: '/visual/module-manage/queryModuleList',
      method: 'post',
      body: {
        type: ['map'],
        status: 0,
        pageNo: 0,
        pageSize: 100
      }
    })
    data.content.forEach((item: any) => {
      item.photoPath = `${(window as any).CONFIG.COMP_URL}${item.photoPath}`
    })
    setDataArr(data.content)
  }
  
  return (
    <div className='Map-wrap'>
      {
        dataArr.length ? 
        dataArr.map((item: any, index: number) => {
          return (
            <EveryItem key={index} data={item} />
          )
        }): <div className='Map-wrap'>暂无数据</div>
      }
    </div>
  )
}

export default memo(Map)