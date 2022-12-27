import React, { Component } from 'react';
import ComponentDefaultConfig from './config'

class CornerBox extends Component {
  constructor(Props) {
    super(Props)
  }
  render() {
    const componentConfig = this.props.componentConfig || ComponentDefaultConfig
    const { config } = componentConfig

    const style = config.filter((item) => item.name !== 'dimension').reduce((pre, cur) => {
      if (Array.isArray(cur.value)) {
        const obj = cur.value.reduce((p, c) => {
          p[c.name] = c.value
          return p
        }, {})
        pre = {
          ...pre,
          ...obj,
        }
      } else {
        pre[cur.name] = cur.value
      }
      return pre
    }, {})

    const corner_common = {
      position: 'absolute',
      height: '5px',
      width: '5px',
      border: '2px solid #61f3ff',
      background: 'transparent',
    }

    return (
      <div style={{
        width: '100%',
        height: '100%',
        backgroundColor: style.bgColor,
        position: 'relative',
        border:'1px solid #162cff'
      }}>
        <span style={{
          ...corner_common,
          borderBottom: 0,
          borderRight: 0,
          left: 0,
          top: 0,
        }}></span>
        <span style={{
          ...corner_common,
          borderBottom: 0,
          borderLeft: 0,
          right: 0,
          top: 0,
        }}></span>
        <span style={{
          ...corner_common,
          borderTop: 0,
          borderRight: 0,
          left: 0,
          bottom: 0,
        }}></span>
        <span style={{
          ...corner_common,
          borderTop: 0,
          borderLeft: 0,
          right: 0,
          bottom: 0,
        }}></span>
      </div>
    )
  }
}

export { 
  CornerBox, 
  ComponentDefaultConfig 
}
export default CornerBox