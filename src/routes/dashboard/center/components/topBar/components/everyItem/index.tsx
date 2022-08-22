import { memo, useCallback, useEffect } from 'react'
import { connect } from 'dva'
import axios from 'axios'
import './index.less'

const EveryItem = (props: any) => {
  const { data, dispatch, bar } = props
  const componentCreate = () => {
    const { moduleDefaultConfig } = bar
    const currentDefaultConfig = moduleDefaultConfig.find((item: any) => {
      return item.moduleName === data.moduleName
    })
    dispatch({
      type: 'bar/createComponent',
      payload: currentDefaultConfig,
      itemData: data
    })
  }

  return (
    <div className='EveryItem-wrap' onClickCapture={componentCreate}>
      <div className='db-img'>
        <img src={data.photoPath} alt='' />
      </div>
      <span className='db-text'>{data.name}</span>
    </div>
  )
}

export default connect(({ bar }: any) => (
  { bar }
))(EveryItem)
