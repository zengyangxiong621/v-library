import React, { memo, useState, useEffect, useRef } from 'react'
import './index.less'

const ThemeItem = props => {
  const [activeId, setActiveId] = useState(null)

  useEffect(() => {
    setActiveId(props.activeId)
  }, [props.activeId])

  const selectedTheme = (id) => {
    setActiveId(id)
    props.onActiveIdChange(id)
  }

  return (
    <div className="theme-item-wraper">
      <h2 className="theme-item-title">{props.detail.title}</h2>
      <div
        className={["theme-item-color ", props.detail.id === activeId ? 'theme-item-color-active' : ''].join('')}
        style={{ background: props.detail.backgroundColor }}
        onClick={() => { selectedTheme(props.detail.id) }}
      >
        {
          props.detail.pureColors.map((color, index) => {
            return <div
              key={index}
              className="theme-pick-color"
              style={{ background: color }}
            ></div>
          })
        }

      </div>
    </div>
  )
}

export default memo(ThemeItem)

