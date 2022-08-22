import { useState, useEffect, Props, forwardRef, useImperativeHandle, useRef } from 'react'
import { connect } from 'dva'
import './index.css'

interface SupportLineProperty {
  bar?: any,
  cRef?: any
}

let SupportLines = ({ bar, cRef }: SupportLineProperty) => {
  useImperativeHandle(cRef, () => ({
    // changeVal 就是暴露给父组件的方法
    handleSetPosition: (left: number, top: number, display: string = 'block') => {
      setStyle({ left, top, display })
    }
  }))

  const [ style, setStyle ] = useState({
    left: 0,
    top: 0,
    display: 'none',
  })
  const lineRef: any = useRef(null)
  return (
    <div
      className="SupportLines"
      ref={lineRef}
      style={ { position: 'absolute', ...style } }
    >
      <div className="v-line" style={ { borderTop: `${ 1 / bar.canvasScaleValue }px dashed #b6b2b2` } }/>
      <div className="h-line" style={ { borderLeft: `${ 1 / bar.canvasScaleValue }px dashed #b6b2b2` } }/>
      <div
        className="position-info"
        style={ { position: 'absolute', bottom: 20, right: 20, color: '#b6b2b2', fontSize: 18 / bar.canvasScaleValue } }
      >
        {
          Math.ceil(style.left) + ',' + Math.ceil(style.top)
        }
      </div>
    </div>
  )
}

export default connect(({ bar }: any) => ({
  bar,
}))(SupportLines)
