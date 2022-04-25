import { useState, useEffect, useRef } from 'react'
import { connect } from 'dva'
import Draggable from 'react-draggable'
import SingleDraggable from '../SingleDraggable/index'
import * as React from 'react'
import './index.less'
import { ILayerGroup, ILayerComponent, IComponent, DraggableEvent, DraggableData, IConfig, IMouse } from './type'
import { deepClone, layerComponentsFlat, calcGroupPosition } from '../../../../../utils'
import { generateTreeData } from '../../../../../utils/sideBar'
// import Text from '../Text'
import Text from '../../../../../components/charts/custom/text'
import {
  STYLE,
  DIMENSION,
  LEFT,
  TOP,
  WIDTH,
  HEIGHT,
  HIDE_DEFAULT,
  OPACITY,
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
  COMPONENTS, INTERACTION, MOUNT_ANIMATION,
} from '../../../../../constant/home'


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
  const allComponentDOMs = bar.allComponentDOMs
  let supportLinesRef = bar.supportLinesRef
  const [ startPosition, setStartPosition ] = useState({ x: 0, y: 0 })
  const [ copyTreeData, setCopyTreeData ] = useState(deepClone(treeData))

  const nodeRef: any = useRef(null)
  const currentTimes: any = useRef(0)

  const clickTimer: any = useRef(null)

  useEffect(() => {
    localStorage.removeItem('dblComponentTimes')
    return () => {
    }
  }, [])
  useEffect(() => {
    setCopyTreeData(deepClone(treeData).reverse())
  }, [ treeData ])
  /**
   * 鼠标事件顺序： dragStart, drag, dragEnd, click
   */
  /**
   * @desc 开始拖拽
   * @return void
   */
  const handleStart = (ev: DraggableEvent, data: DraggableData, layer: ILayerGroup | ILayerComponent, component: IComponent | undefined, config: IConfig) => {
    console.log('dragStart', layer)
    setStartPosition({
      x: data.x,
      y: data.y,
    })
    bar.selectedComponents = []
    bar.dragStatus = '一组件'
    // 如果当前拖拽的组件并没有选中，那么就重新计算 scaleDrag 组件的位置
    if(!bar.selectedComponentOrGroup.find((item: any) => item.id === layer.id)) {
      dispatch({
        type: 'bar/save',
        payload: {
          scaleDragData: {
            position: config.position,
            style: {
              display: 'block',
              ...config.style,
            },
          },
        },
      })
    }

    if(bar.selectedComponentOrGroup.length > 1) {
      // 注意一下
      // 选中多个组件、或者多个分组时
      bar.dragStatus = '多个'
    } else {
      // 当选中了一个分组时，或者没有选中时
      if(COMPONENTS in layer) {
        bar.dragStatus = '一分组'
        bar.selectedComponentIds = layerComponentsFlat((layer as any)[COMPONENTS])

      } else {

      }
    }
    bar.selectedComponents = components.filter(component => bar.selectedComponentIds.includes(component.id))
  }
  const handleDrag = (ev: DraggableEvent | any, data: DraggableData, layer: ILayerGroup | ILayerComponent, component: IComponent | undefined, config: IConfig) => {
    ev.stopPropagation()
    // console.log('dragging', layer)
    // 向上取整
    let aroundX = Math.ceil(data.x)
    let aroundY = Math.ceil(data.y)
    const xMoveLength = data.x - data.lastX
    const yMoveLength = data.y - data.lastY
    bar.scaleDragCompRef.handleSetPosition(xMoveLength, yMoveLength)

    if(component && bar.dragStatus === '一组件') {
      // 单个组件移动
      if('config' in component) {

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
        if(style_dimension_config) {
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
        }
      })
      xPositionList.sort((a, b) => a - b)
      yPositionList.sort((a, b) => a - b)
      supportLinesRef.handleSetPosition(xPositionList[0], yPositionList[0])

      Object.keys(bar.selectedComponentRefs).forEach(key => {
        if(key.indexOf('group') !== -1) {
          delete bar.selectedComponentRefs[key]
        }
      })
      // scaleDragCom 组件实时移动

      if(layer.id in bar.selectedComponentRefs) {
        bar.isSupportMultiple = true
        // 当选中多个组件/小组的时候，并且当前移动的组件也在这些已经选中的 组件/小组 之中
        Object.keys(bar.selectedComponentRefs).forEach((key: any) => {
          // 取出 transform 中 translate 的 x, y 值
          const translateArr = bar.selectedComponentDOMs[key].style.transform.replace('translate(', '').replace(')', '').replaceAll('px', '').split(', ')
          const translateX = Number(translateArr[0])
          const translateY = Number(translateArr[1])
          // 重新给 transform 赋值
          bar.selectedComponentDOMs[key].style.transform = `translate(${ translateX + xMoveLength }px, ${ translateY + yMoveLength }px)`
          bar.selectedComponentRefs[key].handleSetPosition(xMoveLength, yMoveLength)
        })
      } else {
        bar.isSupportMultiple = false
      }
    }
  }
  const handleStop = (ev: DraggableEvent, data: DraggableData, layer: ILayerGroup | ILayerComponent, component: IComponent | undefined, config: IConfig) => {
    console.log('dragStop')
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
      const style_dimension_config: any = component.config.find((item: any) => item.name === DIMENSION)
      if(style_dimension_config) {
        style_dimension_config.value.forEach((item: any) => {
          if(item.name === LEFT) {
            item.value = Math.ceil(data.x)
          } else if(item.name === TOP) {
            item.value = Math.ceil(data.y)
          }
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
            componentConfig: component,
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
      }
    } else if(COMPONENTS in layer && bar.selectedComponentOrGroup.length === 1) {
      // 单个组移动
      const xMoveLength = Math.ceil(data.x - startPosition.x)
      const yMoveLength = Math.ceil(data.y - startPosition.y)
      bar.selectedComponents.forEach((item: IComponent) => {
        const dimensionConfig = item.config.find((item: any) => item.name === DIMENSION).value
        if(dimensionConfig) {
          dimensionConfig.forEach((item: any) => {
            if(item.name === LEFT) {
              item.value += xMoveLength
            } else if(item.name === TOP) {
              item.value += yMoveLength
            }
          })
        }
      })
      console.log('------------')
      console.log('layer', layer)
      console.log('------------')
      dispatch({
        type: 'bar/setGroupConfig',
        payload: {
          config: {
            position: {
              x: data.x,
              y: data.y,
            },
            style: {
              width: config.style.width,
              height: config.style.height,
            },
            [OPACITY]: layer[OPACITY],
            [HIDE_DEFAULT]: layer[HIDE_DEFAULT],
            [INTERACTION]: {
              [MOUNT_ANIMATION]: layer[MOUNT_ANIMATION],
            },
          },
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
        if(style_dimension_config) {
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
        }
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
    dispatch({
      type: 'bar/updateComponent',
      payload: bar.selectedComponents,
    })
  }
  const handleClick = (e: DraggableEvent, layer: ILayerGroup | ILayerComponent, config: IConfig) => {
    clearTimeout(clickTimer.current)
    clickTimer.current = setTimeout(() => {
      console.log('单击')
    }, 400)
    localStorage.removeItem('dblComponentTimes')
    e.stopPropagation()
  }
  const handleDblClick = (e: DraggableEvent, layer: ILayerGroup | ILayerComponent, config: IConfig) => {
    console.log('当前的次数', currentTimes.current)
    clearTimeout(clickTimer.current)
    console.log('双击')
    const dblComponentTimes = localStorage.getItem('dblComponentTimes')
    if(!currentTimes) {
      currentTimes.current = 1
    } else {
      currentTimes.current++
    }
    if(Number(dblComponentTimes) === currentTimes.current) {
      // layer.cancel = false
      // layer.disabled = false
      // e.stopPropagation()
    }
    // 1    2
    if(Number(dblComponentTimes) < currentTimes.current) {
      layer.cancel = true
      layer.disabled = true
      if(COMPONENTS in layer) {
        (layer[COMPONENTS] as any).forEach((item: any) => {
          item.cancel = false
          item.disabled = false
        })
      }
    }
    if(!dblComponentTimes) {
      layer.cancel = true
      layer.disabled = true
      if(COMPONENTS in layer) {
        (layer[COMPONENTS] as any).forEach((item: any) => {
          item.cancel = false
          item.disabled = false
        })
      }
      localStorage.setItem('dblComponentTimes', '1')
    } else {
      localStorage.setItem('dblComponentTimes', (Number(dblComponentTimes) + 1).toString())
    }
    // dispatch({
    //   type: 'bar/save',
    // })
  }
  const handleMouseOver = (e: DraggableEvent, component: ILayerGroup | ILayerComponent) => {
    if(component.hover) {
      return
    }
    component.hover = true
    // dispatch({
    //   type: 'bar/save',
    // })
  }
  const handleMouseOut = (e: DraggableEvent, component: ILayerGroup | ILayerComponent) => {
    component.hover = false
    // dispatch({
    //   type: 'bar/save',
    // })
  }
  // let copyTreeData = deepClone(treeData).reverse()
  return (
    <div className="c-custom-draggable">
      {
        treeData.map((layer: ILayerGroup | ILayerComponent | any) => {
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
          let isGroup: boolean = (COMPONENTS in layer)
          let group: ILayerGroup | undefined
          let component: IComponent | undefined
          let style_config, staticData, style_dimension_config
          // 群组
          if(COMPONENTS in layer) {
            group = layer
            let [ xPositionList, yPositionList ] = calcGroupPosition(layer[COMPONENTS], components)
            xPositionList = xPositionList.sort((a, b) => a - b)
            yPositionList = yPositionList.sort((a, b) => a - b)
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
            // console.log('组件 layer id', layer.id)
            // console.log('组件', component)

            if(component) {
              staticData = component.staticData
              style_config = component.config
              style_dimension_config = component.config.find((item: any) => item.name === DIMENSION)
              if(style_dimension_config) {
                Object.values(style_dimension_config.value).forEach((obj: any) => {
                  if([ TOP, LEFT ].includes(obj.name)) {
                    config.position[obj.name === TOP ? 'y' : 'x'] = obj.value
                  } else if([ WIDTH, HEIGHT ].includes(obj.name)) {
                    config.style[obj.name === WIDTH ? 'width' : 'height'] = obj.value
                  }
                })
              }
            }
          }
          return (
            <SingleDraggable
              dimensionConfig={ style_dimension_config }
              scale={ bar.canvasScaleValue }
              nodeRef={ nodeRef }
              id={ layer.id }
              cRef={ (ref: any) => {
                if(layer.id in allComponentRefs) {
                } else {
                  allComponentRefs[layer.id] = ref
                }
              } }
              disabled={ layer.isLock }
              cancel=".no-cancel" key={ layer.id } position={ config.position }
              onStart={ (ev: DraggableEvent, data: DraggableData) => handleStart(ev, data, layer, component, config) }
              onDrag={ (ev: DraggableEvent, data: DraggableData) => handleDrag(ev, data, layer, component, config) }
              onStop={ (ev: DraggableEvent, data: DraggableData) => handleStop(ev, data, layer, component, config) }
            >
              <div
                ref={ (ref: any) => {
                  if(layer.id in allComponentDOMs) {
                  } else {
                    allComponentDOMs[layer.id] = ref
                  }
                } }                // onClickCapture={(ev) => handleClick(ev, layer, config)}
                data-id={ isGroup ? layer.id : 'component-' + layer.id }
                key={ layer.id }
                onClick={ (ev) => handleClick(ev, layer, config) }
                onDoubleClickCapture={ (ev) => handleDblClick(ev, layer, config) }
                onMouseOverCapture={ (ev) => handleMouseOver(ev, layer) }
                onMouseOutCapture={ (ev) => handleMouseOut(ev, layer) }
                className={ `box ${ layer.selected ? 'selected' : '' } ${ layer.hover ? 'hovered' : '' }` }
                style={ {
                  ...config.style,
                  // border: '1px solid gray',
                  visibility: !layer.isShow ? 'hidden' : 'unset',
                } }>
                {
                  layer[HIDE_DEFAULT] ?
                    <div style={ {
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'rgba(76, 255, 231, 0.15)',
                    } }/> : isGroup ? <div className="no-cancel" style={ {
                      opacity: (layer[OPACITY] || 100) / 100,
                    } }>
                      { (layer as any)[COMPONENTS]?.length > 0 ?
                        <div style={ { position: 'absolute', left: -config.position.x, top: -config.position.y } }>
                          <CustomDraggable
                            mouse={ layer.selected ? mouse : 0 }
                            bar={ bar }
                            dispatch={ dispatch }
                            treeData={ (layer as any)[COMPONENTS] }
                          />
                        </div>
                        : ''
                      }
                    </div> : <>
                      <div data-id={ layer.id } style={ { width: '100%', height: '100%' } }>
                        <Text componentConfig={ component }/>
                      </div>
                    </>
                }
                <div className="component-border">
                      <span
                        style={ {
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: 1,
                          height: '100%',
                          transform: `translate(-50%, 0px) scaleX(${ 1 / bar.canvasScaleValue })`,
                        } }/>
                  <span
                    style={ {
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: 1,
                      height: '100%',
                      transform: `translate(50%, 0px) scaleX(${ 1 / bar.canvasScaleValue })`,
                    } }/>
                  <span
                    style={ {
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: 1,
                      transform: `translate(0px, -50%) scaleY(${ 1 / bar.canvasScaleValue })`,
                    } }/>
                  <span
                    style={ {
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      height: 1,
                      transform: `translate(0px, 50%) scaleY(${ 1 / bar.canvasScaleValue })`,
                    } }/>
                </div>
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
