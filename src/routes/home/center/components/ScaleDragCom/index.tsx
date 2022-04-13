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
const ScaleDragCom = ({ bar, dispatch, cRef, mouse, onScaleEnd }: any) => {
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


  /**
   *  scaleDrag 组件是可放大并且是能拖拽的组件，但是不具备主动拖拽的功能，只能通过设置 position / 真实 dom 的 transform 的数据去主动移动它
   */

  /**
   * @desc 开始拖拽, 如果进行多个拖拽的时候，拖拽的是当前的这个 scaleDrag 组件，那么就等于是点击了空白画布，清空了
   * @return void
   */

  const handleStart = () => {
    dispatch({
      type: 'bar/clearAllStatus',
    })
  }

  const handleDrag = (event: DraggableEvent, data: DraggableData) => {
    // scaleDragData.position = {
    //   x: data.x,
    //   y: data.y,
    // }
  }
  const handleStop = (event: DraggableEvent, data: DraggableData) => {
    dispatch({
      type: 'bar/save',
      payload: {
        scaleDragData,
      },
    })
  }
  const handleScaleEnd = (data: any) => {
    onScaleEnd(data)
  }
  const handleScale = () => {

  }
  const scaleDragRef: any = useRef(null)
  return (
    <div style={ { position: 'absolute', left: 0, top: 0, width: 0, height: 0 } }>
      <Draggable
        scale={ bar.canvasScaleValue }
        ref={ scaleDragRef }
        onStart={ handleStart }
        onDrag={ handleDrag }
        onStop={ handleStop }
        position={ bar.scaleDragData.position }>
        <ScaleContainer
          nodeRef={ nodeRef }
          style={ { ...bar.scaleDragData.style } }
          isActive={ true }
          onScaleEnd={ handleScaleEnd }
          onScale={handleScale}
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
