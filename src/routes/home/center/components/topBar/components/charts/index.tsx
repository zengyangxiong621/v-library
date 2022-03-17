import { memo, useState } from 'react'
import './index.less'

import EveryItem from '../everyItem/index'


const Charts = (props: any) => {
  // const { data } = props
  const [whichActive, setActive] = useState('all')
  const liClick = (key: string) => {
    console.log(key);
    
    setActive(key)
  }
  return (
    <div className='Charts-wrap' style={{ width: '456px' }}>
      <ul className='text-list'>
        {
          chartType.map((item: any) => {
            return (
              <li
                // className={`${whichActive === item.key && 'active-li'}`}
                onMouseEnter={() => liClick(item.key)}>
                {item.text}
              </li>
            )
          })
        }
      </ul>
      <div className='charts-list'>
        {
          dataArr.map((item: any, index: number) => {
            return (
              <EveryItem data={item} />
            )
          })
        }
      </div>
    </div>
  )
}

const dataArr = [
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
]
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