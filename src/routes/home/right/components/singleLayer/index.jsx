import {memo} from 'react'
import './index.css'


const SingleLayer = props => {

  return (
  <div className='SingleLayer-wrap'>
    单个图层配置 -- 选中普通图层时(不包括多选)
  </div>
  )
}

export default memo(SingleLayer)