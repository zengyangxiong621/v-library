import { memo, useState } from 'react'
import './index.less'

import { IconFont } from '../../../../utils/useIcon'



const NavigationIcon = (props: any) => {
  const { data, getActiveIcon, activeIcon } = props
  // @mark 后来添加的 “数据容器”，ui给的icon名不叫shujurongqi
  let icon = data.icon
  if (data.icon === 'shujurongqi') {
    icon = 'moxing-zidingyishujurongqi'
  }
  if (data.icon === 'zujiangengxin') {
    icon = 'shujuxiangyingjieguo-shuaxin'
  }
  return (
    <div className={`${activeIcon === data.icon && 'activeIcon'} GenerateIcon-wrap`}
      onClick={() => getActiveIcon(data.icon)}
    >
      <IconFont className='icon' type={`icon-${icon}`} />
      <div className='cdb-text'>{data.text}</div>
    </div>
  )
}

export default memo(NavigationIcon)

