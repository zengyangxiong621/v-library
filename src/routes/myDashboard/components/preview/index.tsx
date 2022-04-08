import { memo } from 'react'
import './index.less'


const Preview = (props: any) => {
  const {
    width, height, srcUrl, srcUrlArr
  } = props
  return (
    <div className='Preview-wrap'>
      Preview
    </div>
  )
}

export default memo(Preview)