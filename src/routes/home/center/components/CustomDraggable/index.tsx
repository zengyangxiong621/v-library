import { useState, useEffect, useRef } from 'react'
import { connect } from 'dva'
import Draggable from 'react-draggable'
import SingleDraggable from '../SingleDraggable/index'
import * as React from 'react'
import './index.less'
import { ILayerGroup, ILayerComponent, IComponent, DraggableEvent, DraggableData, IConfig, IMouse } from './type'
import { deepClone, layerComponentsFlat, calcGroupPosition } from '../../../../../utils'
import { generateTreeData } from '../../../../../utils/sideBar'
import Text from '../Text'
import {
  STYLE,
  DIMENSION,
  LEFT,
  TOP,
  WIDTH,
  HEIGHT,
  HIDE_DEFAULT,
  TEXT_STYLE,
  FONT_FAMILY,
  FONT_SIZE,
  COLOR,
  BOLD,
  ITALIC,
  LETTER_SPACING,
  LINE_HEIGHT,
  ALIGN,
  TEXT_ALIGN,
  TEXT_VERTICAL,
  SHADOW,
  SHOW,
} from '../../constant'


enum STYLE_ENUM {
  BOLD = 'fontBold'
}


const CustomDraggable
  = ({
       bar,
       dispatch,
       treeData,
       mouse,
     }: { bar: any, dispatch: any, treeData: Array<ILayerGroup | ILayerComponent>, mouse: IMouse | 0 }) => {
  const components: Array<IComponent> = bar.components
  const scaleDragData = bar.scaleDragData
  const isSupportMultiple: boolean = bar.isSupportMultiple
  const allComponentRefs = bar.allComponentRefs
  let supportLinesRef = bar.supportLinesRef
  const [ startPosition, setStartPosition ] = useState({ x: 0, y: 0 })
  const nodeRef = useRef(null)

  const calcSupportLinesPosition = () => {

  }


  const handleStart = (ev: DraggableEvent, data: DraggableData, layer: ILayerGroup | ILayerComponent) => {
    setStartPosition({
      x: data.x,
      y: data.y,
    })
    bar.selectedComponents = []
    bar.dragStatus = '一组件'
    if(bar.selectedComponentOrGroup.length > 1) {
      // 注意一下
      // 选中多个组件、或者多个分组时
      bar.dragStatus = '多个'
      // bar.selectedComponentRefs
      // Object.keys(allComponentRefs).forEach(key => {
      //   if(bar.selectedComponentIds.includes(key)) {
      //     bar.selectedComponentRefs[key] = allComponentRefs[key]
      //   }
      // })
    } else {
      // 当选中了一个分组时，或者没有选中时
      if('components' in layer) {
        bar.dragStatus = '一分组'
        bar.selectedComponentIds = layerComponentsFlat((layer as any).components)
      }
    }
    bar.selectedComponents = components.filter(component => bar.selectedComponentIds.includes(component.id))
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
      },
    })
  }

  const handleDrag = (ev: DraggableEvent | any, data: DraggableData, layer: ILayerGroup | ILayerComponent, component: IComponent | undefined, config: IConfig) => {
    // 向上取整
    let aroundX = Math.ceil(data.x)
    let aroundY = Math.ceil(data.y)

    if(component && bar.dragStatus === '一组件') {
      // 单个组件移动
      if('config' in component) {
        // const style_config: any = component.config.find((item: any) => item.name === STYLE)

        // const style_dimension_config: any = component.config.find((item: any) => item.name === DIMENSION)
        // style_dimension_config.value.find((item: any) => item.name === LEFT).value = data.x
        // style_dimension_config.value.find((item: any) => item.name === TOP).value = data.y

        // component.config.position.x = data.x
        // component.config.position.y = data.y
      }
      supportLinesRef.handleSetPosition(aroundX, aroundY)
    }
    if(bar.dragStatus === '一分组') {
      // 小组移动
      supportLinesRef.handleSetPosition(aroundX, aroundY)
    }
    if(bar.dragStatus === '多个') {
      const xPositionList: number[] = []
      const yPositionList: number[] = []
      bar.selectedComponents.forEach((item: IComponent) => {
        const style_dimension_config = item.config.find((item: any) => item.name === DIMENSION)
        const config: IConfig = {
          position: {
            x: 0,
            y: 0,
          },
          style: {
            width: 0,
            height: 0,
          },
        }
        Object.values(style_dimension_config.value).forEach((obj: any) => {
          if([ TOP, LEFT ].includes(obj.name)) {
            config.position[obj.name === TOP ? 'y' : 'x'] = obj.value
          } else if([ WIDTH, HEIGHT ].includes(obj.name)) {
            config.style[obj.name === WIDTH ? 'width' : 'height'] = obj.value
          }
        })
        xPositionList.push(config.position.x, config.position.x + config.style.width)
        yPositionList.push(config.position.y, config.position.y + config.style.height)
      })
      xPositionList.sort((a, b) => a - b)
      yPositionList.sort((a, b) => a - b)
      supportLinesRef.handleSetPosition(xPositionList[0], yPositionList[0])
      const xMoveLength = data.x - data.lastX
      const yMoveLength = data.y - data.lastY
      Object.keys(bar.selectedComponentRefs).forEach(key => {
        if(key.indexOf('group') !== -1) {
          delete bar.selectedComponentRefs[key]
        }
      })
      // console.log('selectedComponentRefs', bar.selectedComponentRefs)
      // console.log('-------------------')

      if(layer.id in bar.selectedComponentRefs) {
        bar.isSupportMultiple = true
        // 当选中多个组件/小组的时候，并且当前移动的组件也在这些已经选中的 组件/小组 之中
        Object.keys(bar.selectedComponentRefs).forEach((key: any) => {
          console.log('key', key)
          console.log('-------')
          // console.log('item', key)
          // console.log('item', bar.selectedComponentRefs[key].current.dataset)
          // console.log('--------------------')
          // todo 有问题
          // console.log('item', item.position)
          // console.log('item', item.position)
          bar.selectedComponentRefs[key].handleSetPosition(xMoveLength, yMoveLength)
        })
      } else {
        bar.isSupportMultiple = false
      }
    }
  }
  const handleStop = (ev: DraggableEvent, data: DraggableData, layer: ILayerGroup | ILayerComponent, component: IComponent | undefined, config: IConfig) => {
    supportLinesRef.handleSetPosition(0, 0, 'none')
    dispatch({
      type: 'bar/selectComponentOrGroup',
      payload: {
        layer,
        config,
      },
    })

    if(component && 'config' in component && bar.selectedComponentOrGroup.length === 1) {
      // 单个组件移动
      // const style_config: any = component.config.find((item: any) => item.name === STYLE)
      const style_dimension_config: any = component.config.find((item: any) => item.name === DIMENSION)
      style_dimension_config.value.forEach((item: any) => {
        if(item.name === LEFT) {
          item.value = Math.ceil(data.x)
        } else if(item.name === TOP) {
          item.value = Math.ceil(data.y)
        }
      })
      // console.log('component', component)
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
          componentConfig: component,
        },
      })
      dispatch({
        type: 'bar/save',
        payload: {
          sizeChange: {
            change: true,
            config: {
              left: Math.trunc(data.x),
              top: Math.trunc(data.y),
              width: config.style.width,
              height: config.style.height,
            },
          },
        },
      })
    } else if('components' in layer && bar.selectedComponentOrGroup.length === 1) {
      // 单个组移动
      const xMoveLength = Math.ceil(data.x - startPosition.x)
      const yMoveLength = Math.ceil(data.y - startPosition.y)
      bar.selectedComponents.forEach((item: IComponent) => {
        // const style_config = item.config.find((item: any) => item.name === STYLE)
        const style_dimension_config = item.config.find((item: any) => item.name === DIMENSION)
        style_dimension_config.value.forEach((item: any) => {
          if(item.name === LEFT) {
            item.value += xMoveLength
          } else if(item.name === TOP) {
            item.value += yMoveLength
          }
        })
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
    } else if(bar.selectedComponentOrGroup.length >= 1) {
      const xPositionList: Array<number> = []
      const yPositionList: Array<number> = []
      bar.selectedComponents = components.filter(component => bar.selectedComponentIds.includes(component.id))
      bar.selectedComponents.forEach((item: IComponent) => {
        // const style_config = item.config.find((item: any) => item.name === STYLE)
        const style_dimension_config = item.config.find((item: any) => item.name === DIMENSION)
        const config: IConfig = {
          position: {
            x: 0,
            y: 0,
          },
          style: {
            width: 0,
            height: 0,
          },
        }
        Object.values(style_dimension_config.value).forEach((obj: any) => {
          if([ TOP, LEFT ].includes(obj.name)) {
            config.position[obj.name === TOP ? 'y' : 'x'] = obj.value
          } else if([ WIDTH, HEIGHT ].includes(obj.name)) {
            config.style[obj.name === WIDTH ? 'width' : 'height'] = obj.value
          }
        })
        xPositionList.push(config.position.x, config.position.x + config.style.width)
        yPositionList.push(config.position.y, config.position.y + config.style.height)
      })
      xPositionList.sort((a, b) => {
        return a - b
      })
      yPositionList.sort((a, b) => {
        return a - b
      })
      if(layer.id in bar.selectedComponentRefs) {
        const xMoveLength = data.x - data.lastX
        const yMoveLength = data.y - data.lastY
        // 当选中多个组件/小组的时候，并且当前移动的组件也在这些已经选中的 组件/小组 之中
        // Object.values(bar.selectedComponentRefs).forEach((item: any) => {
        //   item.handleSetPosition(Math.ceil(item.position.x + xMoveLength), Math.ceil(item.position.y + yMoveLength))
        // })
      }
      // 在dva里计算
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
    } else {
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
  }

  const handleClick = (e: DraggableEvent, layer: ILayerGroup | ILayerComponent, config: IConfig) => {
    e.stopPropagation()
    // if(layer.selected) {
    //   return
    // }
    // dispatch({
    //   type: 'bar/selectComponentOrGroup',
    //   payload: {
    //     layer,
    //     config,
    //   },
    // })
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
    // dispatch({
    //   type: 'bar/test',
    // })
  }
  const handleMouseOut = (e: DraggableEvent, component: ILayerGroup | ILayerComponent) => {
    e.stopPropagation()
    component.hover = false
    // dispatch({
    //   type: 'bar/test',
    // })
  }
  // let copyTreeData = deepClone(treeData).reverse()

  return (
    <div className="c-custom-draggable">
      {
        treeData.map((layer: ILayerGroup | ILayerComponent) => {
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
          let isGroup: boolean = ('components' in layer)
          let group: ILayerGroup | undefined
          let component: IComponent | undefined
          let style_config, staticData, style_dimension_config
          // 群组
          if(isGroup && 'components' in layer) {
            group = layer
            let [ xPositionList, yPositionList ] = calcGroupPosition(layer.components, components)
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
            // 组件
            component = components.find(item => item.id === layer.id)
            if(component) {
              staticData = component.staticData
              style_config = component.config
              // style_config = component.config.find((item: any) => item.name === STYLE)
              style_dimension_config = component.config.find((item: any) => item.name === DIMENSION)
              Object.values(style_dimension_config.value).forEach((obj: any) => {
                if([ TOP, LEFT ].includes(obj.name)) {
                  config.position[obj.name === TOP ? 'y' : 'x'] = obj.value
                } else if([ WIDTH, HEIGHT ].includes(obj.name)) {
                  config.style[obj.name === WIDTH ? 'width' : 'height'] = obj.value
                }
              })
            }
          }
          return (
            <SingleDraggable
              dimensionConfig={ style_dimension_config }
              scale={ bar.canvasScaleValue }
              nodeRef={ nodeRef }
              cRef={ (ref: any) => {
                if(layer.id in allComponentRefs) {
                } else {
                  allComponentRefs[layer.id] = ref
                }
                return allComponentRefs[layer.id]
              } }
              disabled={ layer.lock }
              cancel=".no-cancel" key={ layer.id } position={ config.position }
              onStart={ (ev: DraggableEvent, data: DraggableData) => handleStart(ev, data, layer) }
              onDrag={ (ev: DraggableEvent, data: DraggableData) => handleDrag(ev, data, layer, component, config) }
              onStop={ (ev: DraggableEvent, data: DraggableData) => handleStop(ev, data, layer, component, config) }
            >
              <div
                ref={ nodeRef }
                // onClickCapture={(ev) => handleClick(ev, layer, config)}
                data-id={ layer.id }
                onClick={ (ev) => handleClick(ev, layer, config) }
                onDoubleClick={ (ev) => handleDblClick(ev, layer) }
                onMouseOverCapture={ (ev) => handleMouseOver(ev, layer) }
                onMouseOutCapture={ (ev) => handleMouseOut(ev, layer) }
                className={ `box ${ layer.selected ? 'selected' : '' } ${ layer.hover ? 'hovered' : '' }` }
                style={ {
                  ...config.style,
                  border: '1px solid gray',
                  visibility: !layer.scan ? 'hidden' : 'unset',
                } }>
                {
                  isGroup ? <div className="no-cancel">
                    { 'components' in layer && (layer as any).components?.length > 0 ?
                      <div style={ { position: 'absolute', left: -config.position.x, top: -config.position.y } }>
                        <CustomDraggable
                          mouse={ layer.selected ? mouse : 0 }
                          bar={ bar }
                          dispatch={ dispatch }
                          treeData={ (layer as any).components }
                        />
                      </div>
                      : ''
                    }
                  </div> : <div style={ { width: '100%', height: '100%', color: 'red', fontSize: 16 } }>
                    {/*{ layer.id }*/ }
                    <Text styleConfig={ style_config } staticData={ staticData }/>
                  </div>
                }
              </div>
            </SingleDraggable>
          )
        })
      }
    </div>
  )
}
export default connect(({ bar }: any) => ({
  bar,
}))(CustomDraggable)
