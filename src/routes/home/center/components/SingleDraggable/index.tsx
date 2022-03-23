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
const SingleDraggable = ({ bar, dispatch, onStop, cRef, ...props }: any) => {
  const draggableRef: any = useRef(null)
  useImperativeHandle(cRef, () => ({
    // changeVal 就是暴露给父组件的方法
    handleSetPosition: (x: number, y: number) => {
      // console.log('draggableRef', draggableRef.current)
      draggableRef.current.props.position.x = x
      draggableRef.current.props.position.y = y
      // props.position.x = x
      // props.position.y = y
    },
    position: props.position,
  }))
  const handleStop = (ev: DraggableEvent, data: DraggableData) => {
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
