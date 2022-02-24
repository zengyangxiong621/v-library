import React, { useEffect, useState } from 'react'
import './index.css'

// import Bus from '../../utils/events.js'
import { connect } from 'dva'

import GroupConfig from './components/groupConfig'
import SingleLayer  from './components/singleLayer'
import PageSetting  from './components/pageSetting'
import AlignmentSetting from './components/alignmentSetting'
/**
 * 1. 组配置、单个图层配置、页面设置、多选时对齐设置
 *
 */



const Right = ({ dispatch, bar }) => {
  const [whichShow, setWhichShow] = useState('pageSetting')
  const reflect = {
    'groupConfig': GroupConfig,
    'singleLayer': SingleLayer,
    'pageSetting': PageSetting,
    'alignmentSetting': AlignmentSetting,
  }
  useEffect(() => {
    //文件夹 -> 组配置           //多选 -> 对齐设置
    // 普通图层 -> 单个图层配置   // 什么都没选 -> 页面设置
    // const { isFolder, key } = bar
    const isFolder = bar.isFolder
    const key = bar.key
    if(isFolder) {
      setWhichShow('groupConfig')
    } else {
      setWhichShow('singleLayer')
    }

    (Array.isArray(key) && key.length === 0) && setWhichShow('pageSetting')

  }, [ bar.isFolder, bar.key ])
  return (
  <div className='right-wrap'>
    {
      reflect[whichShow].type()
      // whichShow === 'groupConfig' ? <GroupConfig />
      // : whichShow === 'singleLayer' ? <singleLayer />
      // : <PageSetting />
    }
  </div>
  )
}

export default connect(({bar}) => ({bar}))(Right)