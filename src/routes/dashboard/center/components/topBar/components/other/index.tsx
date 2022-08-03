import { memo, useEffect, useState } from 'react'
import './index.less'
import { Spin } from 'antd'
import EveryItem from '../everyItem/index'
import { http } from '@/services/request'

const Other = (props: any) => {
  // const { data } = props
  const {current, index} = props
  const [dataArr, setDataArr] = useState<any>([])
  const [dataLoading, setDataLoading] = useState(false)
  useEffect(() => {
    if(current.length && current[0] === index){
      getData()
    }
  }, [])
  // 获取地图组件数据
  const getData = async () => {
    setDataLoading(true)
    const data: any = await http({
      url: '/visual/module-manage/queryModuleList',
      method: 'post',
      body: {
        type: ['other'],
        status: 0,
        pageNo: 0,
        pageSize: 100
      }
    }).catch(() => {
      setDataLoading(false)
    })
    data.content.forEach((item: any) => {
      item.photoPath = `${(window as any).CONFIG.COMP_URL}${item.photoPath}`
    })
    setDataArr(data.content)
    setDataLoading(false)
  }
  return (
    <>
      <Spin className="data-loading" spinning={dataLoading}/>
      <div className='Other-wrap'>
        {
          dataArr.length ? 
          dataArr.map((item: any, index: number) => {
            return (
              <EveryItem key={index} data={item} />
            )
          }): <div className='Other-wrap'>暂无数据</div>
        }
      </div>
    </>
  )
}

export default memo(Other)