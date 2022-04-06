import { useState, useEffect, useImperativeHandle, useRef } from 'react'
import { connect } from 'dva'
import Draggable from 'react-draggable'
import { deepClone } from '../../../../../utils'
import { Button } from 'antd'
import * as React from 'react'

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
const SingleDraggable = ({ bar, dispatch, onStop, cRef, nodeRef, dimensionConfig, ...props }: any) => {
  const draggableRef: any = useRef(null)
  useImperativeHandle(cRef, () => ({
    // changeVal 就是暴露给父组件的方法
    handleSetPosition: (xMoveLength: number, yMoveLength: number) => {
      // console.log('nodeRef', nodeRef.current.dataset)
      const x = draggableRef.current.props.position.x + xMoveLength
      const y = draggableRef.current.props.position.y + yMoveLength
      nodeRef.current.style.transform = `translate(${ x }px, ${ y }px)`

      draggableRef.current.props.position.x = x
      draggableRef.current.props.position.y = y
      // console.log('draggableRef.current.props.position', draggableRef.current.props.position)
      dimensionConfig.value.find((item: any) => item.name === 'left').value = x
      dimensionConfig.value.find((item: any) => item.name === 'top').value = y

      // props.position.x = x
      // props.position.y = y


      // dispatch({
      //   type: 'bar/test',
      // })
    },
    position: props.position,
    nodeRef: nodeRef
  }))
  const handleStop = (ev: DraggableEvent, data: DraggableData) => {
    dimensionConfig.value.find((item: any) => item.name === 'left').value = data.x
    dimensionConfig.value.find((item: any) => item.name === 'top').value = data.y
    onStop(ev, data)
  }
  return (
    <div>
      <Draggable ref={ draggableRef } onStop={ handleStop } { ...props }>
      </Draggable>
    </div>
  )
}
export default connect(({ bar }: any) => ({
  bar,
}))(SingleDraggable)
