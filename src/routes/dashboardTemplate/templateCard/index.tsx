import { memo, useState, useRef } from 'react'
import './index.less'


const TemplateCard = (props: any) => {
  const { id, name, ratio, fenbianlv } = props


  return (
    <div className='TemplateCard-wrap'>
      <header className='head'>
        <image />
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

export default memo(TemplateCard)