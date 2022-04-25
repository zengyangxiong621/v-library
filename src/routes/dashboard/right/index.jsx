import React, { useEffect, useState } from 'react'
import './index.less'

import { connect } from 'dva'
import { COMPONENTS } from '../.././../constant/home/index'
import GroupConfig from './components/groupConfig'
import SingleLayer from './components/singleLayer'
import PageSetting from './components/pageSetting'
import AlignmentSetting from './components/alignmentSetting'

/**
 * 1. 组配置、单个图层配置、页面设置、多选时对齐设置
 *
 */



const Right = ({ dispatch, bar }) => {
  const [whichShow, setWhichShow] = useState('pageSetting')
  const [key, setKey] = useState(bar.key.join(''))
  const reflect = {
    'groupConfig': GroupConfig,
    'singleLayer': SingleLayer,
    'pageSetting': PageSetting,
    'alignmentSetting': AlignmentSetting,
  }
  useEffect(() => {
    if (!bar.selectedComponentOrGroup.length) {
      setWhichShow('pageSetting')
    }
    // 组件设置/组设置
    if (bar.selectedComponentOrGroup.length === 1) {
      const layer = bar.selectedComponentOrGroup[0]
      if (COMPONENTS in layer) {
        // 组设置
        setWhichShow('groupConfig')
      } else {
        // 组件设置
        setWhichShow('singleLayer')
      }
    }
    // 对齐设置
    if (bar.selectedComponentOrGroup.length > 1) {
      setWhichShow('alignmentSetting')
    }
    const key = bar.key
    setKey(key.join(''))
  }, [bar.key])
  return (
    <div className="right-wrap">
      {
        // reflect[whichShow].type()
        whichShow === 'groupConfig' ? <GroupConfig key={ key }/>
          : whichShow === 'singleLayer' ? <SingleLayer key={ key }/>
          : whichShow === 'pageSetting' ? <PageSetting key={ key }/>
            : <AlignmentSetting key={ key }/>
      }
    </div>
  )
}

export default connect(({ bar }) => ({ bar }))(Right)
