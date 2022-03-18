import { memo } from 'react'
import './index.less'

const EveryItem = (props: any) => {
  const { data } = props
  console.log('da', data);

  return (
    <div className='EveryItem-wrap'>
      <div className='db-img'></div>
      <span className='db-text'>{data.name}</span>
    </div>
  )
}

export default memo(EveryItem)