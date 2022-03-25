import { useState, useEffect, useRef } from 'react'
import { connect } from 'dva'
import './index.css'

const ScaleContainer = ({ children, onScaleEnd, bar, isActive, ...props }) => {
  const handleScaleEnd = (x, y, width, height) => {
    onScaleEnd(x, y, width, height)
  }
  const handleMouseDown = (ev) => {
    const obj = ev.target
    const oEv = ev
    oEv.stopPropagation()
    const oldWidth = boxRef.current.offsetWidth
    const oldHeight = boxRef.current.offsetHeight
    const oldX = oEv.clientX
    const oldY = oEv.clientY
    const oldLeft = boxRef.current.offsetLeft
    const oldTop = boxRef.current.offsetTop

    document.onmousemove = function (ev) {
      ev.stopPropagation()
      const oEv = ev
      let disY = (oldTop + (oEv.clientY - oldY)),
        disX = (oldLeft + (oEv.clientX - oldX))
      if (disX > oldLeft + oldWidth) {
        disX = oldLeft + oldWidth
      }
      if (disY > oldTop + oldHeight) {
        disY = oldTop + oldHeight
      }
      if (obj.className === 'tl') {
        console.log('bar.canvasScaleValue', bar.canvasScaleValue)
        boxRef.current.style.width = oldWidth - (oEv.clientX - oldX) / bar.canvasScaleValue + 'px'
        boxRef.current.style.height = oldHeight - (oEv.clientY - oldY) / bar.canvasScaleValue + 'px'
        const translateArr = boxRef.current.style.transform.replace('translate(', '').replace(')', '').replaceAll('px', '').split(', ')
        const translateX = translateArr[0]
        const translateY = translateArr[1]
        // console.log('translateX', translateX)
        // console.log('translateY', translateY)
        let num = (oEv.clientX - oldX) / bar.canvasScaleValue
        // console.log('num', num)
        // console.log('translateX', translateX)
        // console.log('相加', Number(translateX) + num)
        console.log(oEv.clientX)
        const currentX = Number(translateX) + num
        console.log('oEv', oEv)
        // console.log('obj', boxRef )
        // console.log('oEv', oEv.target)
        console.log('-----------')
        // boxRef.current.style.transform = `translate(${ currentX }px, ${ Number(translateY) + (oEv.clientY - oldY) / bar.canvasScaleValue }px)`
        // console.log('oEv.clientX - oldX', )
        // props.onScale({x: disX, y: disY})
        // bar.scaleDragData.position.x = disX
        // bar.scaleDragData.position.y = disY
        // boxRef.current.style.left = disX + 'px'
        // boxRef.current.style.top = disY + 'px'

      } else if (obj.className === 'bl') {
        boxRef.current.style.width = oldWidth - (oEv.clientX - oldX) + 'px'
        boxRef.current.style.height = oldHeight + (oEv.clientY - oldY) + 'px'
        boxRef.current.style.left = disX + 'px'
        boxRef.current.style.bottom = oldTop + (oEv.clientY + oldY) + 'px'
      } else if (obj.className === 'tr') {
        boxRef.current.style.width = oldWidth + (oEv.clientX - oldX) + 'px'
        boxRef.current.style.height = oldHeight - (oEv.clientY - oldY) + 'px'
        boxRef.current.style.right = oldLeft - (oEv.clientX - oldX) + 'px'
        boxRef.current.style.top = disY + 'px'
      } else if (obj.className === 'br') {
        boxRef.current.style.width = oldWidth + (oEv.clientX - oldX) / bar.canvasScaleValue + 'px'
        boxRef.current.style.height = oldHeight + (oEv.clientY - oldY) / bar.canvasScaleValue + 'px'
        boxRef.current.style.right = oldLeft - (oEv.clientX - oldX) + 'px'
        boxRef.current.style.bottom = oldTop + (oEv.clientY + oldY) + 'px'
      } else if (obj.className === 't') {
        boxRef.current.style.height = oldHeight - (oEv.clientY - oldY) + 'px'
        boxRef.current.style.top = disY + 'px'
      } else if (obj.className === 'b') {
        boxRef.current.style.height = oldHeight + (oEv.clientY - oldY) + 'px'
        boxRef.current.style.bottom = disY + 'px'
      } else if (obj.className === 'l') {
        boxRef.current.style.height = oldHeight + 'px'
        boxRef.current.style.width = oldWidth - (oEv.clientX - oldX) + 'px'
        boxRef.current.style.left = disX + 'px'
      } else if (obj.className === 'r') {
        boxRef.current.style.height = oldHeight + 'px'
        boxRef.current.style.width = oldWidth + (oEv.clientX - oldX) + 'px'
        boxRef.current.style.right = disX + 'px'
      }
    }

    document.onmouseup = function () {
      if (['tl', 'r', 'l', 'b', 't', 'br', 'tr', 'bl', 'tl'].includes(obj.className)) {
        handleScaleEnd(boxRef.current.offsetLeft, boxRef.current.offsetTop, boxRef.current.offsetWidth, boxRef.current.offsetHeight)
      }
      document.onmousemove = null
      document.onmouseup = null

    }
    return false
  }
  const borderRefs = useRef(null)
  const boxRef = useRef(null)
  const borderArr = [
    'r', 'l', 't', 'b', 'br', 'bl', 'tr', 'tl',
  ]
  return (
    <div { ...props } ref={ boxRef }>
      <div className="box">
        {
          isActive ? borderArr.map((item, index) => {
            return (
              <span
                onMouseDown={ handleMouseDown }
                className={ item }
                style={ {
                  // border: ['br', 'bl', 'tr', 'tl'].includes(item) ? `${ 1 / bar.canvasScaleValue }px solid #2482FF` : 'unset',
                } }
              >
            </span>
            )
          }) : ''
        }
        <div className="inner">
          { children }
        </div>
      </div>
    </div>
  )
}

export default connect(({ bar }) => ({
  bar,
}))(ScaleContainer)
