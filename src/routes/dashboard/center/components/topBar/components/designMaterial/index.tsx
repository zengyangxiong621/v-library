import { memo, useState } from 'react'
import './index.less'

import EveryItem from '../everyItem/index'


const DesignMaterial = (props: any) => {
  // const { data } = props
  const [active, setActive] = useState('spsc')
  const liHover = (key: string) => {
    console.log(key);
    setActive(key)
  }
  return (
    <div className='DesignMaterial-wrap'>
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
              <EveryItem data={item} key={index}/>
            )
          })
        }
      </div>
    </div>
  )
}

const ChartDataMap: any = {
  spsc: [
    {
      name: 'assssssssssssssssssddddddddddddddddss',
    },
    {
      name: 'bbbbbbbbbbbbbbbbbbbbbbbbbbb',
    }
  ],
  bjk: [
    {
      name: '柱形图6',
      key: 'y'
    },
  ],
  bp: [
    {
      name: '饼图1',
      key: 'a'
    },
  ],
  tb: [
    {
      name: '散点图',
      key: 'a'
    }
  ]
}

const chartType = [
  {
    text: '视频素材',
    key: 'spsc',
  },
  {
    text: '背景框',
    key: 'bjk',
  },
  {
    text: '标牌',
    key: 'bp',
  },
  {
    text: '图标',
    key: 'tb',
  }
]
export default memo(DesignMaterial)