import { useState, useEffect, useRef } from 'react'
import { connect } from 'dva'
import './index.less'

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
    console.log('缩放mouseDown')
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
      console.log('缩放mouseMove')
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
      const currentPositionX = elementX.current / bar.canvasScaleValue
      const currentPositionY = elementY.current / bar.canvasScaleValue
      const xMoveLength = (clientX.current - oldX) / bar.canvasScaleValue
      const yMoveLength = (clientY.current - oldY) / bar.canvasScaleValue
      if (obj.className === 'tl') {
        let num = (oEv.clientX - oldX) / bar.canvasScaleValue
        const currentX = Number(translateX) + num
        // boxRef.current.style.transform = `translate(${ elementX.current / bar.canvasScaleValue }px, ${ elementY.current / bar.canvasScaleValue }px)`
        if (clientX.current <= oldX + oldWidth - 20) {
          bar.scaleDragData.position.x = currentPositionX
          if (clientX.current <= oldX) {
            bar.scaleDragData.style.width = Math.abs(xMoveLength) + oldWidth
          }
          if (clientX.current >= oldX) {
            bar.scaleDragData.style.width = oldWidth - Math.abs(xMoveLength) / bar.canvasScaleValue
          }
        }
        if (clientY.current <= oldY + oldHeight - 20) {
          bar.scaleDragData.position.y = currentPositionY
          if (clientY.current <= oldY) {
            bar.scaleDragData.style.height = Math.abs(yMoveLength) + oldHeight
          }
          if (clientY.current >= oldY) {
            bar.scaleDragData.style.height = oldHeight - Math.abs(yMoveLength)
          }
        }
      } else if (obj.className === 'bl') {
        if (clientX.current <= oldX + oldWidth - 20) {
          bar.scaleDragData.position.x = currentPositionX
          bar.scaleDragData.style.width = oldWidth - xMoveLength
        }
        bar.scaleDragData.style.height = oldHeight + yMoveLength
      } else if (obj.className === 'tr') {
        if (clientY.current <= oldY + oldHeight - 20) {
          bar.scaleDragData.position.y = currentPositionY
          bar.scaleDragData.style.height = oldHeight - yMoveLength
        }
        bar.scaleDragData.style.width = oldWidth + xMoveLength
      } else if (obj.className === 'br') {
        bar.scaleDragData.style.width = oldWidth + xMoveLength
        bar.scaleDragData.style.height = oldHeight + yMoveLength
      } else if (obj.className === 't' || obj.className === 'tc') {
        if (clientY.current <= oldY + oldHeight - 20) {
          bar.scaleDragData.position.y = currentPositionY
          if (clientY.current <= oldY) {
            bar.scaleDragData.style.height = Math.abs(yMoveLength) + oldHeight
          }
          if (clientY.current >= oldY) {
            bar.scaleDragData.style.height = oldHeight - Math.abs(yMoveLength)
          }
        }
      } else if (obj.className === 'b' || obj.className === 'bc') {
        bar.scaleDragData.style.height = oldHeight + yMoveLength
      } else if (obj.className === 'l' || obj.className === 'lc') {
        if (clientX.current <= oldX + oldWidth - 20) {
          bar.scaleDragData.position.x = currentPositionX
          if (clientX.current <= oldX) {
            bar.scaleDragData.style.width = Math.abs(xMoveLength) + oldWidth
          }
          if (clientX.current >= oldX) {
            bar.scaleDragData.style.width = oldWidth - Math.abs(xMoveLength) / bar.canvasScaleValue
          }
        }
      } else if (obj.className === 'r' || obj.className === 'rc') {
        bar.scaleDragData.style.width = oldWidth + xMoveLength
      }
    }

    document.onmouseup = function (e) {
      e.stopPropagation()
      console.log('缩放mouseUp')
      if (['tl', 'r', 'l', 'b', 't', 'br', 'tr', 'bl', 'tl', 'tc', 'bc', 'lc', 'rc'].includes(obj.className)) {
        bar.scaleDragData.position.x = Math.ceil(bar.scaleDragData.position.x)
        bar.scaleDragData.position.y = Math.ceil(bar.scaleDragData.position.y)
        bar.scaleDragData.style.width = Math.ceil(bar.scaleDragData.style.width)
        bar.scaleDragData.style.height = Math.ceil(bar.scaleDragData.style.height)
        onScaleEnd(bar.scaleDragData)
        // handleScaleEnd(boxRef.current.offsetLeft, boxRef.current.offsetTop, boxRef.current.offsetWidth, boxRef.current.offsetHeight)
      }
      document.onmousemove = null
      document.onmouseup = null

    }
    return false
  }
  const borderRefs = useRef(null)
  const boxRef = useRef(null)

  const borderArr = [
    'r', 'l', 't', 'b', 'br', 'bl', 'tr', 'tl', 'tc', 'bc', 'lc', 'rc',
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
