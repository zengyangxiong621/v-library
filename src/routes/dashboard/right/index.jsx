import React, { useEffect, useState } from 'react'
import './index.less'

import { connect } from 'dva'
import { COMPONENTS } from '../.././../constant/home/index'
import GroupConfig from './components/groupConfig'
import SingleLayer from './components/singleLayer'
import PageSetting from './components/pageSetting'
import AlignmentSetting from './components/alignmentSetting'
import ReferenceSetting from './components/referenceSetting'
import DynamicPageSetting from './components/dynamicPageSetting'
import DynamicSetting from './components/dynamicSetting'

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
    'dynamicPageSetting': DynamicPageSetting,
    'alignmentSetting': AlignmentSetting,
    'referenceSetting': ReferenceSetting,
  }
  useEffect(() => {

    if (bar.isPanel && !bar.selectedComponentOrGroup.length) {
      setWhichShow('dynamicPageSetting')
    } else if (!bar.selectedComponentOrGroup.length) {
      setWhichShow('pageSetting')
    }
    // 组件设置/组设置
    if (bar.selectedComponentOrGroup.length === 1) {
      const layer = bar.selectedComponentOrGroup[0]
      if (COMPONENTS in layer) {
        // 组设置
        setWhichShow('groupConfig')
      } else {
        // 单个设置
        if ('panelType' in layer) {
          if (layer.panelType === 0) {
            setWhichShow('dynamicSetting')
          }
          if (layer.panelType === 1) {
            setWhichShow('referenceSetting')
          }
        } else {
          setWhichShow('singleLayer')
        }
      }
    }
    // 对齐设置
    if (bar.selectedComponentOrGroup.length > 1) {
      setWhichShow('alignmentSetting')
    }
    const key = bar.key
    setKey(key.join(''))
  }, [bar.key, bar.isPanel])
  return (
    <div className="right-setting-wrap">
      {
        // reflect[whichShow].type()
        whichShow === 'groupConfig' ? <GroupConfig key={ key }/>
          : whichShow === 'singleLayer' ? <SingleLayer key={ key }/>
          : whichShow === 'pageSetting' ? <PageSetting key={ key }/>
            : whichShow === 'alignmentSetting' ? <AlignmentSetting key={ key }/>
              : whichShow === 'referenceSetting' ? <ReferenceSetting key={ key }/>
                : whichShow === 'dynamicSetting' ? <DynamicSetting key={ key }/>
                  : whichShow === 'dynamicPageSetting' ? <DynamicPageSetting key={ key }/>
                    : <></>
      }
    </div>
  )
}

export default connect((
  {
    bar,
  },
) => (
  {
    bar,
  }
))(Right)
