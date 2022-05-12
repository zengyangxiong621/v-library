import { memo, useState } from 'react'
import './index.less'

import { IconFont } from '../../../../utils/useIcon'



const NavigationIcon = (props: any) => {
  const { data, getActiveIcon, activeIcon } = props

  return (
    <div className={`${activeIcon===data.icon && 'activeIcon'} GenerateIcon-wrap`}
      onClick={() => getActiveIcon(data.icon)}
    >
      <IconFont className='icon' type={`icon-${data.icon}`} />
      <div className='cdb-text'>{data.text}</div>
    </div>
  )
}

export default memo(NavigationIcon)

