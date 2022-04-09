import { useState, useEffect, useRef } from 'react'
import { connect } from 'dva'
import './index.css'

const ScaleContainer = ({ children, onScaleEnd, nodeRef, bar, isActive, mouse, ...props }) => {
  const elementX = useRef(mouse.elementX)
  const elementY = useRef(mouse.elementY)
  const clientX = useRef(mouse.clientX)
  const clientY = useRef(mouse.clientY)
  // const [elementX, setElementX] = useState(mouse.elementX)
  // const [elementY, setElementY] = useState(mouse.elementY)
  useEffect(() => {
    elementX.current = mouse.elementX
    elementY.current = mouse.elementY
    clientX.current = mouse.clientX
    clientY.current = mouse.clientY
    // console.log('mousemousemouse', mouse)
    // setElementX(mouse.elementX)
    // setElementY(mouse.elementY)
  }, [mouse])
  // console.log('mouse', mouse)

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
      const translateArr = boxRef.current.style.transform.replace('translate(', '').replace(')', '').replaceAll('px', '').split(', ')
      const translateX = translateArr[0]
      const translateY = translateArr[1]
      if (obj.className === 'tl') {
        console.log('---------------------')
        console.log('oEv.clientX', oEv.clientX)
        console.log('elementX', clientX.current)
        console.log('---------------------')
        let num = (oEv.clientX - oldX) / bar.canvasScaleValue
        const currentX = Number(translateX) + num
        bar.scaleDragData.position = {
          x: elementX.current / bar.canvasScaleValue,
          y: elementY.current / bar.canvasScaleValue,
        }
        // boxRef.current.style.transform = `translate(${ elementX.current / bar.canvasScaleValue }px, ${ elementY.current / bar.canvasScaleValue }px)`
        bar.scaleDragData.style.width = Math.abs(clientX.current - oldX) / bar.canvasScaleValue + oldWidth
        bar.scaleDragData.style.height = Math.abs(clientY.current - oldY) / bar.canvasScaleValue + oldHeight
      } else if (obj.className === 'bl') {
        bar.scaleDragData.position.x = elementX.current / bar.canvasScaleValue
        bar.scaleDragData.style.width = oldWidth - (clientX.current - oldX) / bar.canvasScaleValue
        bar.scaleDragData.style.height = oldHeight + (clientY.current - oldY) / bar.canvasScaleValue
      } else if (obj.className === 'tr') {
        bar.scaleDragData.position.y = elementY.current / bar.canvasScaleValue
        bar.scaleDragData.style.width = oldWidth + (clientX.current - oldX) / bar.canvasScaleValue
        bar.scaleDragData.style.height = oldHeight - (clientY.current - oldY) / bar.canvasScaleValue
      } else if (obj.className === 'br') {
        bar.scaleDragData.style.width = oldWidth + (clientX.current - oldX) / bar.canvasScaleValue
        bar.scaleDragData.style.height = oldHeight + (clientY.current - oldY) / bar.canvasScaleValue
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
    <div { ...props } ref={ (ref) => {
      boxRef.current = ref
      nodeRef.current = ref
    } }>
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
