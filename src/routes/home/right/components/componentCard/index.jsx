import React, { memo, useState } from 'react'
import './index.css'

const ComponentCard = props => {
  return (
    <React.Fragment>
      <div className="component-wraper">
        <h4>组件名称</h4>
        <p>组件注释</p>
      </div>
      <div className="detail-setting">
        {props.children}
      </div>
    </React.Fragment>
  )
}

export default memo(ComponentCard)