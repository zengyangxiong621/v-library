/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { memo, useEffect, useState } from 'react'
import './index.less'

import EveryItem from '../everyItem/index'

import { http } from '@/services/request'


const Charts = (props: any) => {
  // const { data } = props
  const [active, setActive] = useState('all')
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
  }

  const chartTypes = ['全部', '柱型图', '折线图', '饼图', '散点图', '其他']

  // useEffect(() => {
    // const init = async () => {
  //     const getData = async (type?: string) => {
  //       const data: any = await http({
  //         url: '/visual/module-manage/queryModuleList',
  //         method: 'post',
  //         body: {
  //           type: [0],
  //           // subType: type,
  //           status: 0,
  //           pageNo: 1,
  //           pageSize: 100,
  //         }
  //       })
        // ChartDataMap[helplessMapping[type]] = data?.content
        // }
  //       console.log('data', data);
        // for await (let item of chartTypes) {
          //   await getData(item)
          // }
  //       }
  //       getData()
    // init()
  // }, [])
  useEffect(() => {
      const getData = async () => {
        const data: any = await http({
          url: '/visual/module-manage/queryModuleList',
          method: 'post',
          body: {
            type: [0],
            status: 0,
            pageNo: 1,
            pageSize: 100,
          }
        })
        // ChartDataMap[helplessMapping[type]] = data?.content
        // }
        console.log('data', data);
        // TODO  把data里的数据按照组件种类放入chartDataMap中
        }
        getData()
    // init()
  }, [])

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
      <div className='charts-list'>
        {
          ChartDataMap[active]?.map((item: any, index: number) => {
            return (
              <EveryItem data={item} key={index} />
            )
          })
        }
      </div>
    </div>
  )
}

const ChartDataMap: any = {
  all: [
  ],
  bar: [
  ],
  line: [
  ],
  pie: [
  ],
  scatter: [
  ],
  other: []
}

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
