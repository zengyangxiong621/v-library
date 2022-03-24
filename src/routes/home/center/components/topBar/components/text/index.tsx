import { memo } from 'react'
import './index.less'

import EveryItem from '../everyItem/index'

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

const createComponent = () => {
  
}

const Text = (props: any) => {
  // const { data } = props
  return (
    <div className='Text-wrap'>
      {
        dataArr.map((item: any, index: number) => {
          return (
            <EveryItem data={item}  onClick={createComponent}/>
          )
        })
      }
    </div>
  )
}

export default memo(Text)