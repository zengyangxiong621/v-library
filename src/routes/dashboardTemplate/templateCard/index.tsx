import { memo, useState, useRef } from 'react'
import './index.less'

import { withRouter } from 'dva/router'

const TemplateCard = (props: any) => {

  const { id, name, ratio, fenbianlv,
    imgUrl, getCurImgIndex, curIndex,
    history
  } = props
  // 没有图片链接，使用自定义的图片
  const finalPicUrl = imgUrl || ''

  const scanDashboard = () => {
    getCurImgIndex(curIndex)
  }
  const createProject = () => {
    history.push('/')
  }
  return (
    <div className='TemplateCard-wrap'>
      <header className='head'>
        <div className="hover-on-template">
          <div className='btns-wrap'>
            <span className='div-as-btns scan-btn' onClickCapture={() => scanDashboard()}>预览模板</span>
            <span className='div-as-btns create-btn' onClickCapture={() => createProject()}>创建项目</span>
          </div>
        </div>
        <div className="img-wrap">
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <img className='my-img' src={finalPicUrl} />
        </div>
      </header>
      <div className="foot">
        <div className="name">
          {name}
        </div>
        <div className="info">
          <span>比例：{ratio}</span> /&nbsp;
          <span>分辨率: {fenbianlv}</span>
        </div>
      </div>
    </div>
  )
}

export default memo(withRouter(TemplateCard))