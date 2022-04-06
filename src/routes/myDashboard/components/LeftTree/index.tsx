import { memo } from 'react'
import './index.less'

// 全部应用 和 未分组两项应该固定
// 后面自定义的组， 应该可以支持拖拽并且 选中右边任意一个card的拖拽图标的时候树这边的这些组应该处于被框选状态

const LeftTree = (props: any) => {
  return (
    <div className='LeftTree-wrap'>

    </div>
  )
}

export default memo(LeftTree)