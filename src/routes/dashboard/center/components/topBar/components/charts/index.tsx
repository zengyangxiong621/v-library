/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { memo, useEffect, useState } from 'react'
import './index.less'

import EveryItem from '../everyItem/index'

import { http } from '@/services/request'
import { Spin } from 'antd'
import { debounce } from "lodash";


const Charts = (props: any) => {
  // const { data } = props
  const [active, setActive] = useState('all')
  const [allModules, setAllModules] = useState<any>({})
  const [dataLoading, setDataLoading] = useState(false)
  const helplessMapping: { [x in string]: string } = {
    '全部': 'all',
    '柱型图': 'bar',
    '折线图': 'line',
    '饼图': 'pie',
    '散点图': 'scatter',
    '其他': 'other'
  }
  const liHover = (key: string) => {
    setActive(key)
    if(!allModules[key]){
      getData([key])
    }
  }

  const chartTypes = ['全部', '柱型图', '折线图', '饼图', '散点图', '其他']
  useEffect(() => {
    getData = debounce(getData,200)([])
  }, [])


  // 获取组件数据
  let getData = async (subType: any) => {
    setDataLoading(true)
    const data: any = await http({
      url: '/visual/module-manage/queryModuleList',
      method: 'post',
      body: {
        type: ['chart'],
        status: 0,
        pageNo: 0,
        pageSize: 100,
        subType: subType[0] === 'all' ? [] : subType
      }
    }).catch(() => {
      setDataLoading(false)
    })
    data.content.forEach((item: any) => {
      item.photoPath = `${(window as any).CONFIG.COMP_URL}/${item.moduleType}${item.photoPath}`
    })
    let classType = subType.length ? subType[0] : 'all'
    // 如果不存在就添加
    if(!allModules[classType]){
      let obj:any = {}
      obj[classType] = data.content
      setAllModules({...allModules, ...obj})
    }
    setDataLoading(false)
  }

  return (
    <div className='Charts-wrap'>
      <ul className='text-list'>
        {
          chartType?.map((item: any) => {
            return (
              <li
                key={item.key}
                className={`${active === item.key && 'active-li'}`}
                onMouseEnter={() => liHover(item.key)}>
                {item.text}
              </li>
            )
          })
        }
      </ul>
      <Spin className="data-loading" spinning={dataLoading}/>
      {
        allModules[active] && (
          allModules[active].length ?  
            <div className='charts-list'>
            {
              allModules[active]?.map((item: any, index: number) => {
                return (
                  <EveryItem data={item} key={index} />
                )
              })
            }
          </div>: <div className="charts-list">暂无内容</div>
        )
      }
    </div>
  )
}

// const ChartDataMap: any = {
//   all: [],
//   bar: [],
//   line: [],
//   pie: [],
//   scatter: [],
//   other: []
// }

const chartType = [
  {
    text: '全部',
    key: 'all',
  },
  {
    text: '柱形图',
    key: 'bar',
  },
  {
    text: '折线图',
    key: 'line',
  },
  {
    text: '饼图',
    key: 'pie',
  },
  {
    text: '散点图',
    key: 'scatter',
  },
  {
    text: '其他',
    key: 'other',
  },
]

export default memo(Charts)
