import { useState, useEffect } from 'react'
import { connect } from 'dva'
import { DraggableContainer, DraggableChild } from '../draggable-comp'
import ScaleContainer from '../ScaleContainer'
import { message } from 'antd'

const CustomDraggable = ({ bar, dispatch, components, style, disabled }) => {

  const onScaleEnd = (component, x, y, width, height) => {
    console.log('component', component)
    component.defaultPosition = {
      x, y,
    }
    component.style.width = width
    component.style.height = height
    dispatch({
      type: 'bar/testDrag',
      payload: {
        parentId: component.parentId,
      },
    })
    // message.info(`x: ${ x }, y: ${ y }, width: ${ width }, height: ${ height }`)
  }
  let timer = null

  const singleClick = ({ component, e }) => {
    e.stopPropagation()
    clearTimeout(timer)
    timer = setTimeout(() => {
      // 防止冒泡
      if (component.parentId === 'parent' || !component.isGroup) {
        return
      }
      dispatch({
        type: 'bar/selectSingleNode',
        payload: component.id,
      })
    }, 150)
  }
  const doubleClick = ({ component, e }) => {
    e.stopPropagation()
    clearTimeout(timer)
    if (component.parentId === 'parent' || component.isGroup) {
      return
    }
    dispatch({
      type: 'bar/selectSingleNode',
      payload: component.id,
    })
    console.log('双击')
  }
  const onDragEnd = (component, ev, data) => {

    component.defaultPosition = {
      x: data.x,
      y: data.y,
    }
    dispatch({
      type: 'bar/testDrag',
      payload: {
        parentId: component.parentId,
      },
    })
    // 移动的距离
    // const xMoveLength = data.x - data.originX
    // const yMoveLength = data.y - data.originY
    // dispatch({
    //   type: 'bar/moveGroupPosition',
    //   payload: {
    //     id: component.id,
    //     xMoveLength,
    //     yMoveLength,
    //   },
    // })
  }
  return (
    // <DraggableContainer className="father" style={ style } limit={ false }>
    <DraggableContainer className="draggable-container" limit={ false }>
      {
        components.map(component => {
            return (
              <DraggableChild
                onStop={ (ev, data) => onDragEnd(component, ev, data) } disabled={ component.disabled }
                key={ component.id }
                defaultPosition={ component.defaultPosition }
                position={ component.defaultPosition }
              >
                <ScaleContainer
                  key={ component.id }
                  className={ component.className }
                  data-id={ component.id }
                  onScaleEnd={ (x, y, width, height) => onScaleEnd(component, x, y, width, height) }
                  style={ { ...component.style, background: component.active ? '#a6c5db' : component.style.background } }
                  onClick={ (e) => singleClick({ component, e }) }
                  onDoubleClick={ (e) => doubleClick({ component, e }) }
                  isActive={ component.active }
                >
                  <div style={ { color: 'red', userSelect: 'none' } }>
                    {
                      component.id
                    }
                  </div>
                  <div className="reversePosition" style={ {
                    position: 'absolute',
                    left: -component.defaultPosition.x,
                    top: -component.defaultPosition.y,
                    width: 0,
                    height: 0,
                  } }>
                    {
                      component.components.length > 0 ?
                        <CustomDraggable
                          components={ component.components }
                          style={ component.style }
                          disabled={ component.disabled }
                          dispatch={ dispatch }/> : ''
                    }
                  </div>
                </ScaleContainer>
              </DraggableChild>
            )
          },
        )
      }
    </DraggableContainer>
  )
}
export default connect(({ bar }) => ({
  bar,
}))(CustomDraggable)
