import { useState, useEffect, useRef, useImperativeHandle } from 'react'
import { connect } from 'dva'
import Draggable from 'react-draggable'
import ScaleContainer from '../ScaleContainer'
import * as React from 'react'
import { Button } from 'antd'

type DraggableEvent = React.MouseEvent<HTMLElement | SVGElement>
  | React.TouchEvent<HTMLElement | SVGElement>
  | MouseEvent
  | TouchEvent

type DraggableData = {
  deltaX: number
  deltaY: number
  lastX: number
  lastY: number
  x: number
  y: number
  node: any
}
const ScaleDragCom = ({ bar, dispatch, cRef, mouse }: any) => {
  const nodeRef: any = useRef(null)
  const scaleDragData = bar.scaleDragData
  useImperativeHandle(cRef, () => ({
    // changeVal 就是暴露给父组件的方法
    handleSetPosition: (x: number, y: number) => {
      const translateArr = nodeRef.current.style.transform.replace('translate(', '').replace(')', '').replaceAll('px', '').split(', ')
      const translateX = Number(translateArr[0])
      const translateY = Number(translateArr[1])
      nodeRef.current.style.transform = `translate(${ translateX + x }px, ${ translateY + y }px)`
    },
  }))
  const handleScaleEnd = () => {

  }
  const handleDrag = (event: DraggableEvent, data: DraggableData) => {
    scaleDragData.position = {
      x: data.x,
      y: data.y,
    }
  }
  const handleStop = (event: DraggableEvent, data: DraggableData) => {
    dispatch({
      type: 'bar/save',
      payload: {
        scaleDragData,
      },
    })
  }
  const scaleDragRef: any = useRef(null)
  return (
    <div style={ { position: 'absolute', left: 0, top: 0, width: 0, height: 0 } }>
      <Draggable scale={ bar.canvasScaleValue } ref={ scaleDragRef } onDrag={ handleDrag } onStop={ handleStop }
                 position={ scaleDragData.position }>
        <ScaleContainer
          nodeRef={nodeRef}
          style={ { ...scaleDragData.style } }
          isActive={ true }
          onScaleEnd={ handleScaleEnd }
          mouse={ mouse }
        >
          <div>

          </div>
        </ScaleContainer>
      </Draggable>
    </div>

  )
}
export default connect(({ bar }: any) => ({
  bar,
}))(ScaleDragCom)
