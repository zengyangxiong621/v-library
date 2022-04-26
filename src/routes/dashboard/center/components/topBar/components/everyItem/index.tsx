import { memo } from 'react'
import { connect } from 'dva'
import './index.less'
import textDefaultConfig from '../../../../../../../components/charts/custom/text/config' // 后端部署后，需要更新
import imageDefaultConfig from '../../../../../../../components/charts/custom/image/config' // 后端部署后，需要更新

// const getCurrentModule = 'https://easyv.assets.dtstack.com/components/basicColumnV2/1.3.0/basicColumnV2.js'

   // TODO:temp
  // imageDefaultConfig.staticData.data.forEach((item: any) => {
  //   item.imageUrl = require().default
  // })

const EveryItem = (props: any) => {
  const { data, dispatch } = props
  const componentCreate = () => {
    debugger
    dispatch({
      type: 'bar/createComponent',
      payload: data.type === 'text' ? textDefaultConfig : imageDefaultConfig,
      itemData: data
    })
  }

  return (
    <div className='EveryItem-wrap' onClickCapture={componentCreate}>
      <div className='db-img'>
        <img src={data.photoPath} alt='图片加载' />
      </div>
      <span className='db-text'>{data.name}</span>
    </div>
  )
}

export default connect(({ bar }: any) => (
  { bar }
))(EveryItem)
