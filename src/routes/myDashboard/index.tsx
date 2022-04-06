import { memo } from 'react'
import './index.less'
import LeftTree from './components/LeftTree';
import RightContent from './components/rightContent'
// 功能
// 点击右侧应用列表时，可拖拽至左侧树节点里
const MyApplication = (props: any) => {
  return (
    <div className='MyApplication-wrap'>
      <div className="left">
        {/* 左侧树 */}
        <LeftTree />
      </div>
      <div className="right">
        {/* 右侧 */}
        <RightContent />
      </div>
    </div>
  )
}

export default memo(MyApplication)