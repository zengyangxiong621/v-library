import React, { memo, useState, useEffect } from 'react'
import './index.less'

const OriginSelect = props => {
  const [value,setValue] = useState(props.psValue)

  useEffect(() => {
    setValue(props.psValue)
  },[props.psValue])

  const valueChange = (value) => {
    setValue(value)
    props.onChange(value)
  }

  return (
    <div className="origin-select-container">
      <div className="origin-select-grid">
        <span onClick={()=>{valueChange("0% 0%")}} className={['origin-select-item',value==="0% 0%"?'origin-select-active':null].join(' ')}></span>
        <span onClick={()=>{valueChange("50% 0%")}}  className={['origin-select-item',value==="50% 0%"?'origin-select-active':null].join(' ')}></span>
        <span onClick={()=>{valueChange("100% 0%")}}  className={['origin-select-item',value==="100% 0%"?'origin-select-active':null].join(' ')}></span>
        <span onClick={()=>{valueChange("0% 50%")}}  className={['origin-select-item',value==="0% 50%"?'origin-select-active':null].join(' ')}></span>
        <span onClick={()=>{valueChange("50% 50%")}}  className={['origin-select-item',value==="50% 50%"?'origin-select-active':null].join(' ')}></span>
        <span onClick={()=>{valueChange("100% 50%")}}  className={['origin-select-item',value==="100% 50%"?'origin-select-active':null].join(' ')}></span>
        <span onClick={()=>{valueChange("0% 100%")}}  className={['origin-select-item',value==="0% 100%"?'origin-select-active':null].join(' ')}></span>
        <span onClick={()=>{valueChange("50% 100%")}}  className={['origin-select-item',value==="50% 100%"?'origin-select-active':null].join(' ')}></span>
        <span onClick={()=>{valueChange("100% 100%")}}  className={['origin-select-item',value==="100% 100%"?'origin-select-active':null].join(' ')}></span>
      </div>
    </div>
  )
}

export default memo(OriginSelect)
