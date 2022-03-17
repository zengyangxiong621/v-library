import { useState, useEffect } from 'react'
import { connect } from 'dva'
import Draggable from 'react-draggable'
import SingleDraggable from '../SingleDraggable/index'
import * as React from 'react'
import './index.css'

import { ILayerGroup, ILayerComponent, IComponent, DraggableEvent, DraggableData, IConfig, IMouse } from './type'
import { layerComponentsFlat } from '../../../../../utils'


const CustomDraggable
  = ({
       bar,
       dispatch,
       treeData,
       mouse,
     }: { bar: any, dispatch: any, treeData: Array<ILayerGroup | ILayerComponent>, mouse: IMouse }) => {
  // console.log('components', components)
  const components: Array<IComponent> = bar.components
  const scaleDragData = bar.scaleDragData
  const isSupportMultiple: boolean = bar.isSupportMultiple
  const selectedComponentOrGroup: Array<ILayerGroup | ILayerComponent> = bar.selectedComponentOrGroup
  const allComponentRefs = bar.allComponentRefs
  let selectedComponentIds = bar.selectedComponentIds
  let selectedComponents = bar.selectedComponents
  let supportLinesRef = bar.supportLinesRef
  const [ startPosition, setStartPosition ] = useState({ x: 0, y: 0 })
  const onStart = () => {

  }
  const onStop = (ev: DraggableEvent, data: DraggableData) => {

  }
  const onDrag = (ev: DraggableEvent, data: DraggableData) => {

  }
  const judgeIsGroup = (value: ILayerComponent | ILayerGroup) => {
    return value.id.indexOf('group') !== -1
  }
  const calcGroupPosition = (arr: Array<ILayerGroup | ILayerComponent>) => {
    let xPositionList: Array<number> = []
    let yPositionList: Array<number> = []
    arr.forEach((item) => {
      if(judgeIsGroup(item)) {
        if('children' in item && item.children.length > 0) {
          const [ xArr, yArr ] = calcGroupPosition(item.children)
          xPositionList = xPositionList.concat(xArr)
          yPositionList = yPositionList.concat(yArr)
        }
      } else {
        let component = components.find(it => it.id === item.id)
        if(component) {
          xPositionList.push(component.config.position.x, component.config.position.x + component.config.style.width)
          yPositionList.push(component.config.position.y, component.config.position.y + component.config.style.height)
        } else {
          xPositionList.push(0)
          yPositionList.push(0)
        }
      }
    })
    return [ xPositionList, yPositionList ]
  }
  const handleDrag = (ev: DraggableEvent | any, data: DraggableData, component: IComponent | ILayerGroup | undefined, config: IConfig) => {
    console.log('组件位置', data.x)
    // 向上取整
    let aroundX = Math.ceil(data.x)
    let aroundY = Math.ceil(data.y)
    if(!component) {
      return
    }
    if(bar.dragStatus === '一组件') {
      // 单个组件移动
      if('config' in component) {
        component.config.position.x = data.x
        component.config.position.y = data.y
      }
      supportLinesRef.handleSetPosition(aroundX, aroundY)
    }
    if(bar.dragStatus === '一分组') {
      // 小组移动
      supportLinesRef.handleSetPosition(aroundX, aroundY)
    }
    if(bar.dragStatus === '多个') {
      if(component.id in bar.selectedComponentRefs) {
        const xMoveLength = data.x - data.lastX
        const yMoveLength = data.y - data.lastY
        // 当选中多个组件/小组的时候，并且当前移动的组件也在这些已经选中的 组件/小组 之中
        Object.values(bar.selectedComponentRefs).forEach((item: any) => {
          item.handleSetPosition(item.position.x + xMoveLength, item.position.y + yMoveLength)
        })
      }
    }
  }
  const handleStop = (ev: DraggableEvent, data: DraggableData, component: ILayerGroup | IComponent | undefined, config: IConfig) => {
    console.log('停止')
    if(!component) {
      return
    }
    supportLinesRef.handleSetPosition(0, 0, 'none')
    if('config' in component && bar.dragStatus === '一组件') {
      // 单个组件移动
      component.config.position.x = Math.ceil(data.x)
      component.config.position.y = Math.ceil(data.y)
      dispatch({
        type: 'bar/save',
        payload: {
          scaleDragData: {
            position: {
              x: data.x,
              y: data.y,
            },
            style: {
              display: 'block',
              width: config.style.width,
              height: config.style.height,
            },
          },
        },
      })
      return
    }
    if(bar.dragStatus === '一分组') {
      const xMoveLength = data.x - startPosition.x
      const yMoveLength = data.y - startPosition.y
      selectedComponents.forEach((item: IComponent) => {
        item.config.position.x = item.config.position.x + xMoveLength
        item.config.position.y = item.config.position.y + yMoveLength
      })
      dispatch({
        type: 'bar/save',
        payload: {
          scaleDragData: {
            position: {
              x: data.x,
              y: data.y,
            },
            style: {
              display: 'block',
              width: config.style.width,
              height: config.style.height,
            },
          },
        },
      })
      return
    }
    if(bar.dragStatus === '多个') {
      const xPositionList: Array<number> = []
      const yPositionList: Array<number> = []
      selectedComponents.forEach((item: IComponent) => {
        xPositionList.push(item.config.position.x, item.config.position.x + item.config.style.width)
        yPositionList.push(item.config.position.y, item.config.position.y + item.config.style.height)
      })
      xPositionList.sort((a, b) => {
        return a - b
      })
      yPositionList.sort((a, b) => {
        return a - b
      })
      dispatch({
        type: 'bar/save',
        payload: {
          scaleDragData: {
            position: {
              x: xPositionList[0],
              y: yPositionList[0],
            },
            style: {
              display: 'block',
              width: xPositionList[xPositionList.length - 1] - xPositionList[0],
              height: yPositionList[yPositionList.length - 1] - yPositionList[0],
            },
          },
        },
      })
      return
    }
    dispatch({
      type: 'bar/save',
      payload: {
        scaleDragData: {
          position: {
            x: data.x,
            y: data.y,
          },
          style: {
            display: 'block',
            width: 0,
            height: 0,
          },
        },
      },
    })
  }
  const handleStart = (ev: DraggableEvent, data: DraggableData, layer: ILayerGroup | ILayerComponent) => {
    setStartPosition({
      x: data.x,
      y: data.y,
    })
    selectedComponents = []
    bar.dragStatus = '一组件'
    if(selectedComponentOrGroup.length > 1) {
      // 注意一下
      // 选中多个组件、或者多个分组时
      bar.dragStatus = '多个'
      selectedComponents = components.filter(component => selectedComponentIds.includes(component.id))
      Object.keys(allComponentRefs).forEach(key => {
        if(selectedComponentIds.includes(key)) {
          bar.selectedComponentRefs[key] = allComponentRefs[key]
        }
      })
    } else {
      // 当选中了一个分组时，或者没有选中时
      if('children' in layer) {
        bar.dragStatus = '一分组'
        selectedComponentIds = layerComponentsFlat(layer.children)
        console.log('selectedComponentIds', selectedComponentIds)
        selectedComponents = components.filter(component => selectedComponentIds.includes(component.id))
        console.log('selectedComponents', selectedComponents)
      }
    }
    dispatch({
      type: 'bar/save',
      payload: {
        scaleDragData: {
          position: {
            x: 0,
            y: 0,
          },
          style: {
            display: 'none',
            width: 0,
            height: 0,
          },
        },
        selectedComponents: selectedComponents,
      },
    })
  }
  const handleClick = (e: DraggableEvent, layer: ILayerGroup | ILayerComponent, config: IConfig) => {
    console.log('点击')
    e.stopPropagation()
    // if (component.select === true) {
    //   return;
    // }
    dispatch({
      type: 'bar/selectComponentOrGroup',
      payload: {
        layer,
        config,
      },
    })
  }
  const handleDblClick = (e: DraggableEvent, component: ILayerGroup | ILayerComponent) => {
    e.stopPropagation()
  }
  const handleMouseOver = (e: DraggableEvent, component: ILayerGroup | ILayerComponent) => {
    e.stopPropagation()

    if(component.hover) {
      return
    }
    component.hover = true
    dispatch({
      type: 'bar/test',
    })

  }
  const handleMouseOut = (e: DraggableEvent, component: ILayerGroup | ILayerComponent) => {
    e.stopPropagation()
    component.hover = false
    dispatch({
      type: 'bar/test',
    })
  }

  return (
    <div className="c-custom-draggable">
      {
        treeData.map(layer => {
          let config: IConfig = {
            position: {
              x: 0,
              y: 0,
            },
            style: {
              width: 0,
              height: 0,
            },
          }
          let isGroup: boolean = judgeIsGroup(layer)
          let group: ILayerGroup | undefined
          let component: IComponent | undefined
          if(isGroup && 'children' in layer) {
            group = layer
            let [ xPositionList, yPositionList ] = calcGroupPosition(layer.children)
            xPositionList = xPositionList.sort((a, b) => {
              return a - b
            })
            yPositionList = yPositionList.sort((a, b) => {
              return a - b
            })
            config = {
              position: {
                x: xPositionList[0],
                y: yPositionList[0],
              },
              style: {
                width: xPositionList[xPositionList.length - 1] - xPositionList[0],
                height: yPositionList[yPositionList.length - 1] - yPositionList[0],
              },
            }
          } else {
            component = components.find(item => item.id === layer.id)
            if(component) {
              (config as any) = component.config
            }
          }
          return (
            <Draggable
              scale={ bar.canvasConfigData.config.scale }
              ref={ (ref: any) => {
                allComponentRefs[layer.id] = ref
                return allComponentRefs[layer.id]
              } }
              disabled={ layer.lock }
              cancel=".no-cancel" key={ layer.id } position={ config.position }
              onStart={ (ev: DraggableEvent, data: DraggableData) => handleStart(ev, data, layer) }
              onStop={ (ev: DraggableEvent, data: DraggableData) => handleStop(ev, data, isGroup ? group : component, config) }
              onDrag={ (ev: DraggableEvent, data: DraggableData) => handleDrag(ev, data, isGroup ? group : component, config) }
            >
              <div
                // onClickCapture={(ev) => handleClick(ev, layer, config)}
                onClick={ (ev) => handleClick(ev, layer, config) }
                onDoubleClick={ (ev) => handleDblClick(ev, layer) }
                // onMouseOverCapture={(ev) => handleMouseOver(ev, layer)}
                // onMouseOutCapture={(ev) => handleMouseOut(ev, layer)}
                className={ `box ${ layer.selected ? 'selected' : '' } ${ layer.hover ? 'hovered' : '' }` }
                style={ {
                  ...config.style,
                  border: '1px solid gray',
                  visibility: !layer.scan ? 'hidden' : 'unset',
                } }>
                {
                  isGroup ? <div className="no-cancel">
                    { 'children' in layer && layer.children?.length > 0 ?
                      <div style={ { position: 'absolute', left: -config.position.x, top: -config.position.y } }>
                        <CustomDraggable
                          mouse={ mouse }
                          bar={ bar }
                          dispatch={ dispatch }
                          treeData={ layer.children }
                        />
                      </div>
                      : ''
                    }
                  </div> : ''
                }
                <div style={ { width: '100%', height: '100%' } }>
                  { (isGroup ? group : component)?.id }
                </div>
              </div>
            </Draggable>
          )
        })
      }
      {/*      { components.map(component => {
        return (
          <Draggable cancel=".no-cursor" key={ component.id } position={ component.position }>
            <div className="box" style={ component.style }>
              <div className="no-cursor">
                <div style={ { position: 'absolute', left: -component.position.x, top: -component.position.y } }>
                  {
                    component.children?.length > 0 ? <CustomDraggable components={ component.components }/> : ''
                  }
                </div>
              </div>
              <div style={ { width: '100%', height: '100%' } }>
                { component.id }
              </div>
            </div>
          </Draggable>
        )
      }) }*/
      }
    </div>
  )
}
export default connect(({ bar }: any) => ({
  bar,
}))(CustomDraggable)
