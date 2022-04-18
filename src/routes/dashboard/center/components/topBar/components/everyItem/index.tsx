import { memo } from 'react'
import './index.less'

const EveryItem = (props: any) => {
  const { data, onClickFunc } = props
  return (
    <div className='EveryItem-wrap' onClickCapture={onClickFunc}>
      <div className='db-img'>
        <img style={{
          paddingTop: '10px',
        }} src={data.photoPath} alt='图片加载' />
      </div>
      <span className='db-text'>{data.name}</span>
    </div>
  )
}

export default memo(EveryItem)