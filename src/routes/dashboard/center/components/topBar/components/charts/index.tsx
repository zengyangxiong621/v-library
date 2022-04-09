import { memo, useState } from 'react'
import './index.less'

import EveryItem from '../everyItem/index'


const Charts = (props: any) => {
  // const { data } = props
  const [active, setActive] = useState('all')
  const liHover = (key: string) => {
    setActive(key)
  }
  return (
    <div className='Charts-wrap'>
      <ul className='text-list'>
        {
          chartType.map((item: any) => {
            return (
              <li
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
          ChartDataMap[active].map((item: any, index: number) => {
            return (
              <EveryItem data={item} />
            )
          })
        }
      </div>
    </div>
  )
}

const ChartDataMap: any = {
  all: [
    {
      name: 'assssssssssssssssssddddddddddddddddss',
    },
    {
      name: 'bbbbbbbbbbbbbbbbbbbbbbbbbbb',
    },
    {
      name: 'c',
    },
    {
      name: 'd',
    },
    {
      name: 'e',
    },
    {
      name: 'f',
    },
    {
      name: 'g',
    },
    {
      name: 'h',
    },
    {
      name: 'i',
    },
    {
      name: 'j',
    },
    {
      name: 'k',
    },
    {
      name: 'l',
    },
    {
      name: 'm',
    },
  ],
  bar: [
    {
      name: '柱形图1',
      key: 'a'
    },
    {
      name: '柱形图2',
      key: 'b'
    },
    {
      name: '柱形图3',
      key: 'c'
    },
    {
      name: '柱形图4',
      key: 'd'
    },
    {
      name: '柱形图5',
      key: 'e'
    },
    {
      name: '柱形图6',
      key: 'y'
    },
  ],
  line: [
    {
      name: '折线图1',
      key: 'a'
    },
    {
      name: '折线图2',
      key: 'b'
    },
    {
      name: '折线图3',
      key: 'c'
    }
  ],
  pie: [
    {
      name: '饼图1',
      key: 'a'
    },
  ],
  scatter: [
    {
      name: '散点图',
      key: 'a'
    }
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