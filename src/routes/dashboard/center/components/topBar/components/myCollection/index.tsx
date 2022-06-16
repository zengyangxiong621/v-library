import { memo, useState } from 'react'
import './index.less'

import EveryItem from '../everyItem/index'


const Charts = (props: any) => {
  // const { data } = props
  const [active, setActive] = useState('sjsc')
  const liHover = (key: string) => {
    console.log(key);
    setActive(key)
  }
  return (
    <div className='Charts-wrap'>
      <ul className='text-list'>
        {
          chartType.map((item: any) => {
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
          ChartDataMap[active].map((item: any, index: number) => {
            return (
              <EveryItem key={index} data={item} />
            )
          })
        }
      </div>
    </div>
  )
}

const ChartDataMap: any = {
  sjsc: [
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
  ],
  ztzy: [
    {
      name: '折线图3',
      key: 'c'
    }
  ],
}

const chartType = [
  {
    text: '设计素材',
    key: 'sjsc',
  },
  {
    text: '主题资源',
    key: 'ztzy',
  }
]
export default memo(Charts)