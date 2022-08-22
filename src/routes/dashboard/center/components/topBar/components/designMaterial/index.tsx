import { memo, useState, useEffect } from 'react'
import './index.less'
import { connect } from "dva";
import EveryItem from '../everyItem/index'
import { Spin } from 'antd'


const DesignMaterial = (props: any) => {
  const { bar, dispatch,title,current, index,spaceId } = props
  const origin = title === '系统素材' ? 'design' : 'myresource'
  const classList = bar.systemMaterialClass[origin]
  const [active, setActive] = useState('spsc')
  let [chartDataMap, setChartDataMap] = useState<any>({})
  const [dataLoading, setDataLoading] = useState(false)
  const liHover = (key: string) => {
    setActive(key)
    if(!chartDataMap[key]){
      getSystemMaterialList(key)
    }
  }

  useEffect(() => {
    if(current.length && current[0] === index){
      if(classList?.length){
        setActive(classList[0].groupId)
        if(!chartDataMap[classList[0].groupId]){
          getSystemMaterialList(null)
        }
      }
    }
  }, [classList])


  // 获取系统
  const getSystemMaterialList = (groupId?:any) => {
    setDataLoading(true)
    let payload:any = {
      pageNo: 1,
      pageSize: 1000,
      spaceId:origin === 'design' ? null : spaceId,
      type: [origin], // 系统素材
    }
    if(origin === 'design'){
      payload.subType = [null, 'sysMatAll'].indexOf(groupId) > -1 ? [] : [groupId]
    }else{
      payload.groupId = [null, '-1'].indexOf(groupId) > -1 ? '' : groupId
    }
    // 我的素材，全部选择的type传空数组
    if(payload.type[0] === "myresource"){
      payload.type = []
    }
    dispatch({
      type: 'bar/getSystemMaterialList',
      payload: {...payload},
      cb: (data:any) => {
        let groupIdC = groupId ? groupId : origin === 'design' ?  'sysMatAll' : '-1'
        if(!chartDataMap[groupIdC]){
          data.forEach((item: any) => {
            item.photoPath = `${(window as any).CONFIG.COMP_URL}${item.photoPath}`
          })
          let obj:any = {}
          obj[groupIdC] = data
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
              getSystemMaterialList(null)
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
            classList?.map((item: any) => {
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
        <Spin className="design-loading" spinning={dataLoading}/>
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

