import { memo } from 'react'
import { connect } from 'dva'
import './index.less'

const EveryItem = (props: any) => {
  const { data, dispatch } = props
  const componentCreate = () => {
    dispatch({
      type: 'bar/addComponent',
      payload: data
    })
  }

  return (
    <div className='EveryItem-wrap' onClickCapture={componentCreate}>
      <div className='db-img'>
        <img style={{
          paddingTop: '10px',
        }} src={data.photoPath} alt='图片加载' />
      </div>
      <span className='db-text'>{data.name}</span>
    </div>
  )
}

export default connect(({ bar }: any) => (
  { bar }
))(EveryItem)