import { memo, useState, useEffect } from 'react'
import './index.less'
import { connect } from "dva";
import EveryItem from '../everyItem/index'
import { Spin } from 'antd'


const DesignMaterial = (props: any) => {
  const { bar, dispatch } = props
  const [active, setActive] = useState('spsc')
  let [chartDataMap, setChartDataMap] = useState<any>({})
  const [dataLoading, setDataLoading] = useState(false)
  const liHover = (key: string) => {
    setActive(key)
    if(!chartDataMap[key]){
      getSystemMaterialList([key])
    }
  }

  useEffect(() => {
    getSystemMaterial()
  }, [])


  // 获取系统
  const getSystemMaterialList = (subType:any) => {
    setDataLoading(true)
    dispatch({
      type: 'bar/getSystemMaterialList',
      payload: {
        pageNo: 1,
        pageSize: 1000,
        spaceId:null,
        type: ['design'], // 系统素材
        subType
      },
      cb: (data:any) => {
        let groupId = subType.length  ? subType[0] : '-1'
        if(!chartDataMap[groupId]){
          data.forEach((item: any) => {
            item.photoPath = `${(window as any).CONFIG.COMP_URL}${item.photoPath}`
          })
          let obj:any = {}
          obj[groupId] = data
          setChartDataMap({...chartDataMap, ...obj})
          setDataLoading(false)
        }
      }
    })
  }

    // 获取系统素材分类
    const getSystemMaterial = () => {
      dispatch({
        type: 'bar/getSystemMaterialClass',
        cb: (data:any) => {
          if(data.length){
            setActive(data[0].groupId)
            let groupId = data[0].groupId
            if(!chartDataMap[groupId]){
              getSystemMaterialList([])
            }
          }
        }
      })
    }
  

  return (
    <div className='DesignMaterial-wrap'>
    {
      <>
        <ul className='text-list'>
          {
            bar.systemMaterialClass?.map((item: any) => {
              return (
                <li
                  key={item.groupId}
                  className={`${active === item.groupId && 'active-li'}`}
                  onMouseEnter={() => liHover(item.groupId)}>
                  {item.name}
                </li>
              )
            })
          }
        </ul>
        <Spin className="data-loading" spinning={dataLoading}/>
        {
          chartDataMap[active] && (
            chartDataMap[active].length ?
            <div className='charts-list'>
              {
                chartDataMap[active].map((item: any, index: number) => {
                  return (
                    <EveryItem data={item} key={index}/>
                  )
                })
              }
            </div> : <div className="charts-list">暂无内容</div>
          )
        }
      </>
    }
    </div>
  )
}

export default memo(
  connect(({ bar }: any) => ({ bar }))(DesignMaterial)
)

