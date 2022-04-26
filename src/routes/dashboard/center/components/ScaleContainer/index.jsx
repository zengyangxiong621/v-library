import { useState, useEffect, useRef } from 'react'
import { connect } from 'dva'
import './index.less'
import { position } from 'tailwindcss/lib/util/dataTypes'
import { deepClone } from '../../../../../utils'

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
    const lastScaleDragData = deepClone(bar.scaleDragData)
    const obj = ev.target
    const oEv = ev
    oEv.stopPropagation()
    const oldWidth = boxRef.current.offsetWidth
    const oldHeight = boxRef.current.offsetHeight
    console.log('-----------------------')
    console.log('boxRef')

    console.log('elementX', elementX.current)
    console.log('boxRef', boxRef.current.offsetTop)
    console.log('-----------------------')
    // const oldX = boxRef.current.getBoundingClientRect().x
    // const oldY = boxRef.current.getBoundingClientRect().y
    // const oldX = oEv.clientX
    // const oldY = oEv.clientY
    const oldX = clientX.current
    const oldY = clientY.current
    const oldLeft = boxRef.current.offsetLeft
    const oldTop = boxRef.current.offsetTop
    const currentX = bar.scaleDragData.position.x
    const currentY = bar.scaleDragData.position.y

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
      const currentPositionX = elementX / bar.canvasScaleValue
      const currentPositionY = elementX / bar.canvasScaleValue


      const xBoundary = oldX + oldWidth * bar.canvasScaleValue
      const yBoundary = oldY + oldHeight * bar.canvasScaleValue
      const xBoundaryNegative = oldX - oldWidth * bar.canvasScaleValue
      const yBoundaryNegative = oldY - oldHeight * bar.canvasScaleValue


      if (obj.className === 'tl') {
        // boxRef.current.style.transform = `translate(${ elementX.current / bar.canvasScaleValue }px, ${ elementY.current / bar.canvasScaleValue }px)`
        if (clientX.current >= xBoundary) {
          clientX.current = xBoundary
        }
        if (clientY.current >= yBoundary) {
          clientY.current = yBoundary
        }
        // console.log('clientX', clientX)
        // console.log('xBoundary', xBoundary)
        // console.log('---------------------')
        console.log('clientY', clientY)
        console.log('yBoundary', yBoundary)
        const xMoveLength = Math.abs((clientX.current - oldX) / bar.canvasScaleValue)
        const yMoveLength = Math.abs((clientY.current - oldY) / bar.canvasScaleValue)
        if (clientX.current <= xBoundary) {
          if (clientX.current <= oldX) {
            bar.scaleDragData.position.x = currentX - xMoveLength
            bar.scaleDragData.style.width = xMoveLength + oldWidth
          }
          if (clientX.current >= oldX) {
            bar.scaleDragData.position.x = currentX + xMoveLength
            bar.scaleDragData.style.width = oldWidth - xMoveLength
          }
        }
        if (clientY.current <= yBoundary) {
          if (clientY.current <= oldY) {
            bar.scaleDragData.style.height = oldHeight + yMoveLength
            bar.scaleDragData.position.y = currentY - yMoveLength
          }
          if (clientY.current >= oldY) {
            bar.scaleDragData.style.height = oldHeight - yMoveLength
            bar.scaleDragData.position.y = currentY + yMoveLength
          }
        }
        console.log('height', bar.scaleDragData.style.height)
        console.log('---------------------')

      } else if (obj.className === 'bl') {
        if (clientX.current >= xBoundary) {
          clientX.current = xBoundary
        }
        if (clientY.current <= yBoundaryNegative) {
          clientY.current = yBoundaryNegative
        }
        const xMoveLength = Math.abs((clientX.current - oldX) / bar.canvasScaleValue)
        const yMoveLength = Math.abs((clientY.current - oldY) / bar.canvasScaleValue)
        if (clientX.current <= xBoundary) {
          if (clientX.current <= oldX) {
            bar.scaleDragData.position.x = currentX - xMoveLength
            bar.scaleDragData.style.width = xMoveLength + oldWidth
          }
          if (clientX.current >= oldX) {
            bar.scaleDragData.position.x = currentX + xMoveLength
            bar.scaleDragData.style.width = oldWidth - xMoveLength
          }
        }
        bar.scaleDragData.style.height = oldHeight + (clientY.current - oldY) / bar.canvasScaleValue
      } else if (obj.className === 'tr') {
        if (clientY.current >= yBoundary) {
          clientY.current = yBoundary
        }
        if (clientX.current <= xBoundaryNegative) {
          clientX.current = xBoundaryNegative
        }
        const xMoveLength = Math.abs((clientX.current - oldX) / bar.canvasScaleValue)
        const yMoveLength = Math.abs((clientY.current - oldY) / bar.canvasScaleValue)
        if (clientY.current <= yBoundary) {
          if (clientY.current <= oldY) {
            bar.scaleDragData.style.height = oldHeight + yMoveLength
            bar.scaleDragData.position.y = currentY - yMoveLength
          }
          if (clientY.current >= oldY) {
            bar.scaleDragData.style.height = oldHeight - yMoveLength
            bar.scaleDragData.position.y = currentY + yMoveLength
          }
        }
        bar.scaleDragData.style.width = oldWidth + (clientX.current - oldX) / bar.canvasScaleValue
      } else if (obj.className === 'br') {
        if (clientX.current <= xBoundaryNegative) {
          clientX.current = xBoundaryNegative
        }
        if (clientY.current <= yBoundaryNegative) {
          clientY.current = yBoundaryNegative
        }
        bar.scaleDragData.style.width = oldWidth + (clientX.current - oldX) / bar.canvasScaleValue
        bar.scaleDragData.style.height = oldHeight + (clientY.current - oldY) / bar.canvasScaleValue
      } else if (obj.className === 't' || obj.className === 'tc') {
        if (clientY.current >= yBoundary) {
          clientY.current = yBoundary
        }
        const yMoveLength = Math.abs((clientY.current - oldY) / bar.canvasScaleValue)
        if (clientY.current <= yBoundary) {
          if (clientY.current <= oldY) {
            bar.scaleDragData.style.height = oldHeight + yMoveLength
            bar.scaleDragData.position.y = currentY - yMoveLength
          }
          if (clientY.current >= oldY) {
            bar.scaleDragData.style.height = oldHeight - yMoveLength
            bar.scaleDragData.position.y = currentY + yMoveLength
          }
        }
      } else if (obj.className === 'b' || obj.className === 'bc') {
        if (clientY.current <= yBoundaryNegative) {
          clientY.current = yBoundaryNegative
        }
        bar.scaleDragData.style.height = oldHeight + (clientY.current - oldY) / bar.canvasScaleValue
      } else if (obj.className === 'l' || obj.className === 'lc') {
        if (clientX.current >= xBoundary) {
          clientX.current = xBoundary
        }
        const xMoveLength = Math.abs((clientX.current - oldX) / bar.canvasScaleValue)
        if (clientX.current <= xBoundary) {
          if (clientX.current <= oldX) {
            bar.scaleDragData.position.x = currentX - xMoveLength
            bar.scaleDragData.style.width = xMoveLength + oldWidth
          }
          if (clientX.current >= oldX) {
            bar.scaleDragData.position.x = currentX + xMoveLength
            bar.scaleDragData.style.width = oldWidth - xMoveLength
          }
        }
      } else if (obj.className === 'r' || obj.className === 'rc') {
        if (clientX.current <= xBoundaryNegative) {
          clientX.current = xBoundaryNegative
        }
        bar.scaleDragData.style.width = oldWidth + (clientX.current - oldX) / bar.canvasScaleValue
      }
    }

    document.onmouseup = function (e) {
      e.stopPropagation()
      console.log('缩放mouseUp')
      if (['tl', 'r', 'l', 'b', 't', 'br', 'tr', 'bl', 'tl', 'tc', 'bc', 'lc', 'rc'].includes(obj.className)) {
        // bar.scaleDragData.position.x = Math.ceil(bar.scaleDragData.position.x)
        // bar.scaleDragData.position.y = Math.ceil(bar.scaleDragData.position.y)
        // bar.scaleDragData.style.width = Math.ceil(bar.scaleDragData.style.width)
        // bar.scaleDragData.style.height = Math.ceil(bar.scaleDragData.style.height)
        console.log('lastScaleDragData', lastScaleDragData)
        onScaleEnd(bar.scaleDragData, lastScaleDragData)
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
            if (['r', 'l'].includes(item)) {
              return (
                <span
                  onMouseDown={ handleMouseDown }
                  className={ item }
                  style={ { width: `${ 3 / bar.canvasScaleValue }px` } }
                >
                </span>
              )
            }
            if (['t', 'b'].includes(item)) {
              return (
                <span
                  onMouseDown={ handleMouseDown }
                  className={ item }
                  style={ { height: `${ 3 / bar.canvasScaleValue }px` } }
                >
                </span>
              )
            }
            if (['br', 'bl', 'tr', 'tl', 'tc', 'bc', 'lc', 'rc'].includes(item)) {
              return (
                <span
                  onMouseDown={ handleMouseDown }
                  className={ item }
                  style={ {
                    width: `${ 7 / bar.canvasScaleValue }px`,
                    height: `${ 7 / bar.canvasScaleValue }px`,
                  } }
                >
                </span>
              )
            }
            return (
              <span
                onMouseDown={ handleMouseDown }
                className={ item }
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
