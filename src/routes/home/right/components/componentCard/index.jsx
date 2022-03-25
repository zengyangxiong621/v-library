import React, { memo, useState } from 'react'
import './index.css'

const ComponentCard = props => {
  const _data = props.data;

  return (
    <React.Fragment>
      <div className="component-wraper">
        <h4>{`${_data.name}_${_data.id}`}</h4>
        <p>{`V${_data.moduleVersion}`}</p>
      </div>
      <div className="detail-setting">
        {props.children}
      </div>
    </React.Fragment>
  )
}

export default memo(ComponentCard)