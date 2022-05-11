import { memo } from 'react'
import './index.less'

import EveryItem from '../everyItem/index'

const dataArr = [
  {
    name: 'axaxaxax',
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

const Interaction = (props: any) => {
  // const { data } = props
  return (
    <div className='Interaction-wrap'>
      {
        dataArr.map((item: any, index: number) => {
          return (
            <EveryItem key={index} data={item} />
          )
        })
      }
    </div>
  )
}

export default memo(Interaction)