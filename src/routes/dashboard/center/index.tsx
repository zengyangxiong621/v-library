import { useState, useEffect, useRef } from 'react'
import { connect } from 'dva'

import './index.less'
import Draggable from 'react-draggable'
import CustomDraggable from './components/CustomDraggable'
import ScaleDragCom from './components/ScaleDragCom'
import SupportLines from './components/SupportLines'
import * as React from 'react'
import { Button } from 'antd'
import { useClickAway, useKeyPress, useMouse, useThrottle } from 'ahooks'
import Ruler from './components/Ruler'
import { IScaleDragData, IStyleConfig } from './type'
import { DIMENSION, WIDTH, LEFT, TOP, HEIGHT, COMPONENTS } from './constant'
import RulerLines from './components/RulerLines'
import { DraggableData, DraggableEvent } from './components/CustomDraggable/type'
import { deepClone, deepForEach, treeDataReverse} from '../../../utils'
import RightClickMenu from '../left/components/rightClickMenu/rightClickMenu'
import { menuOptions } from '../left/Data/menuOptions'

const Center = ({ bar, dispatch, focus$, ...props }: any) => {

  const draggableContainerRef = useRef(null)
  const draggableRef: any = useRef(null)
  const rulerRef: any = useRef(null)
  const canvasRef = useRef(null)
  const [ isShowRightMenu, setIsShowRightMenu ] = useState(false)
  const [ menuInfo, setMenuInfo ] = useState({ x: 0, y: 0, id: '', isFolder: false })
  const [ customMenuOptions, setCustomMenuOptions ] = useState(menuOptions)
  const [ isCanvasDraggable, setIsCanvasDraggable ] = useState(false)// let supportLinesRef: any = useRef(// null)
  const [ rulerCanvasSpacing, setRulerCanvasSpacing ] = useState({ left: 22, top: 22 })
  const [layers, setLayers] = useState(deepClone(bar.treeData))
  useEffect(() => {
    const data = deepClone(bar.treeData)
    treeDataReverse(data)
    setLayers(data)
  }, [bar.treeData])

  let supportLinesRef = bar.supportLinesRef

  const findItem = (name: string) => {
    return bar.dashboardConfig.find((item: any) => {
      return item.name === name
    })
  }


  // const recommendConfig = findItem('recommend')
  // const styleColor = findItem('styleColor')
  // const backgroundImg = findItem('backgroundImg')
  // const gridSpacing = findItem('gridSpacing')
  // const zoomConfig = findItem('zoom')
  const recommendConfig = findItem('recommend')
  const styleColor = findItem('styleColor')
  const backgroundImg = findItem('backgroundImg')
  const gridSpacing = findItem('gridSpacing')
  const zoomConfig = findItem('zoom')

  // 计算画布的大小
  const calcCanvasSize = () => {
    let getCurrentDocumentWidth = document.documentElement.clientWidth
    // console.log('getCurrentDocumentWidth', getCurrentDocumentWidth)
    const getCurrentDocumentHeight = document.documentElement.clientHeight
    // 先计算当前窗口的大小 document.documentElement.clientHeight/Width
    if(getCurrentDocumentWidth < 1366) {
      getCurrentDocumentWidth = 1366
    }
    // width、 height 是我们希望的当前 canvas 实际宽高
    // bar.leftMenuWidth 是左侧菜单的宽度, 333 是右侧菜单的高度， 66 是 3 个尺子的宽度
    const width = getCurrentDocumentWidth - bar.leftMenuWidth - 333 - 66
    // 64 是顶部菜单的高度,  32 是底部菜单的高度, 66 是 3 个尺子的高度
    const height = getCurrentDocumentHeight - 64 - 35 - 66
    const canvasHeight = Number((width / recommendConfig.width).toFixed(3)) * recommendConfig.height
    let canvasScaleValue = 0
    if(canvasHeight > height) {
      canvasScaleValue = Number((height / recommendConfig.height).toFixed(3))
      const left = (getCurrentDocumentWidth - bar.leftMenuWidth - 333 - 22 - recommendConfig.width * canvasScaleValue) / 2
      setRulerCanvasSpacing({ top: 22, left })
    } else {
      // 如果中间区域刚好能装下画布
      // 那么尺子组件距离画布的横向距离就是 22
      canvasScaleValue = Number((width / recommendConfig.width).toFixed(3))
      const top = (getCurrentDocumentHeight - 64 - 22 - 32 - recommendConfig.height * canvasScaleValue) / 2
      setRulerCanvasSpacing({ left: 22, top })
    }
    dispatch({
      type: 'bar/save',
      payload: {
        canvasScaleValue,
        canvasDraggablePosition: { x: 0, y: 0 },
      },
    })
  }
  focus$.useSubscription(() => {
    calcCanvasSize()
  });
  // 计算画布的放大缩小
  const calcCanvasScale = (e: any) => {
    if(e.ctrlKey) {
      e.preventDefault()
      const type = e.deltaY < 0
      // type: true 为放大 false 缩小
      if(bar.canvasScaleValue <= 0.1) {
        if (type) { // 可以放大
          dispatch({
            type: 'bar/save',
            payload: {
              canvasScaleValue: Number((bar.canvasScaleValue + 0.03).toFixed(3)),
            },
          })
        }
      } else if (bar.canvasScaleValue >= 4) {
        if (!type) { // 可以缩小
          dispatch({
            type: 'bar/save',
            payload: {
              canvasScaleValue: Number((bar.canvasScaleValue - 0.03).toFixed(3)),
            },
          })
        }
      } else {
        let canvasScaleValue =  Number((bar.canvasScaleValue + (type ? 0.03 : -0.03)).toFixed(3))
        if (canvasScaleValue <= 0.1) {
          canvasScaleValue = 0.1
        }
        if (canvasScaleValue >= 4) {
          canvasScaleValue = 4
        }
        dispatch({
          type: 'bar/save',
          payload: {
            canvasScaleValue
          },
        })
      }
    }

  }

  const calcCanvasPosition = () => {

  }

  useEffect(() => {

  }, [ bar.canvasScaleValue ])

  useEffect(() => {
    if(bar.canvasScaleValue) {
      window.addEventListener('wheel', calcCanvasScale, { passive: false })
    }
    return () => {
      window.removeEventListener('wheel', calcCanvasScale)
    }
  }, [ bar.canvasScaleValue ])

  useEffect(() => {
    calcCanvasSize()
    dispatch({
      type: 'bar/save',
      payload: {
        canvasDraggablePosition: {
          x: 0,
          y: 0,
        },
      },
    })
  }, [ recommendConfig.width, recommendConfig.height ])

  useEffect(() => {
    setTimeout(() => {
      calcCanvasSize()
    }, 300)
  }, [ bar.leftMenuWidth ])


  useEffect(() => {
    calcCanvasSize()
    window.addEventListener('resize', calcCanvasSize);
    (document.querySelector('.draggable-container') as HTMLElement).addEventListener('contextmenu', handleContextMenu)
    // document.addEventListener('contextmenu', handleContextMenu)
    return () => {
      window.removeEventListener('resize', calcCanvasSize);
      (document.querySelector('.draggable-container') as HTMLElement)?.removeEventListener('contextmenu', handleContextMenu)
      // document.removeEventListener('contextmenu', handleContextMenu)
    }
  }, [bar.dashboardConfig])
  useClickAway(() => {
    // 取消右键菜单
    setIsShowRightMenu(false)
  }, [ document.querySelector('.left-wrap-tree'), document.querySelector('.left-wrap-toolbar'), document.querySelector('.left-wrap>.header'), document.querySelector('.left-menu>.footer'), document.querySelector('.right-wrap'), document.getElementById('draggable-container') ])
  const handleContextMenu = (event: MouseEvent) => {
    const dom = event.target as HTMLElement
    setIsShowRightMenu(true)
    if(dom.dataset?.id) {
      setMenuInfo({
        x: event.clientX,
        y: event.clientY,
        id: dom.dataset.id.indexOf('group-') !== -1 ? dom.dataset.id : dom.dataset.id.replace('component-', ''),
        isFolder: false,
      })
    }
    event.preventDefault()
  }

  const hideMenu = () => {
    setIsShowRightMenu(false)
  }

  // useKeyPress([ 'ctrl', 'shift' ], (event) => {
  //   if(event.type === 'keydown' && bar.isSupportMultiple) {
  //
  //   } else {
  //     dispatch({
  //       type: 'bar/save',
  //       payload: {
  //         isSupportMultiple: event.type === 'keydown',
  //       },
  //     })
  //   }
  // }, {
  //   events: [ 'keydown', 'keyup' ],
  // })

  useKeyPress([ 'space' ], (event) => {
    if(event.type === 'keydown' && isCanvasDraggable) {
      return
    }
    setIsCanvasDraggable(event.type === 'keydown')
  }, {
    events: [ 'keydown', 'keyup' ],
  })


  const mouse = useMouse(canvasRef)
  // const mouse = 0


  const calcScaleAfterComponentsConfig = () => {

  }

  /**
   * @desc 缩放组件在缩放结束后的回调
   * @param scaleDragData: IScaleDragData
   * @param lastScaleDragData: IScaleDragData
   * @return void
   */
  const handleScaleEnd = (
    { position: { x, y }, style: { width, height } }: IScaleDragData,
    { position: { x: lastX, y: lastY }, style: { width: lastWidth, height: lastHeight } }: IScaleDragData,
  ) => {
    if(bar.selectedComponentOrGroup.length === 1 && !(COMPONENTS in bar.selectedComponentOrGroup[0])) {
      const component = bar.selectedComponents[0]
      const styleDimensionConfig = component.config.find((item: any) => item.name === DIMENSION).value
      styleDimensionConfig.forEach((item: IStyleConfig) => {
        switch(item.name) {
          case LEFT:
            item.value = x
            break
          case TOP:
            item.value = y
            break
          case WIDTH:
            item.value = width
            break
          case HEIGHT:
            item.value = height
        }
      })
    } else {
      bar.selectedComponents.forEach((component: any, cIndex: number) => {
        const dimensionConfig = component.config.find((config: any) => config.name === DIMENSION).value
        const data = dimensionConfig.reduce((pre: any, cur: any) => {
          if(Array.isArray(cur.value)) {
            const obj = cur.value.reduce((p: any, c: any) => {
              p[c.name] = c.value
              return p
            }, {})
            pre = {
              ...pre,
              ...obj,
            }
          } else {
            pre[cur.name] = cur.value
          }
          return pre
        }, {})
        dimensionConfig.forEach((config: any) => {
          if(x === lastX) {
            if(config.name === LEFT) {
              if(config.value !== lastX) {
                // 因为是缩放右侧，所以缩放组件左侧的 lastX 值是不变的。然后再计算组件左侧 x 距离缩放组件左侧的 x 值的变化即可
                config.value = lastX + ((data[LEFT] - lastX) / (lastWidth / width))
                data[LEFT] = config.value
              }
            }
          } else {
            if(config.name === LEFT) {
              if(config.value === lastX) {
                config.value = x
              } else {
                // 因为是缩放左侧，所以缩放组件右侧的 x + width 的值是不变的。然后再计算组件左侧 x 距离缩放组件左侧的 x 值的变化即可
                config.value = x + ((data[LEFT] - lastX) / (lastWidth / width))
              }
            }
          }

          if(y === lastY) {
            if(config.name === TOP) {
              if(config.value !== lastY) {
                config.value = lastY + ((data[TOP] - lastY) / (lastHeight / height))
                data[TOP] = config.value
              }
            }
          } else {
            if(config.name === TOP) {
              if(config.value === lastY) {
                config.value = y
              } else {
                config.value = y + ((data[TOP] - lastY) / (lastHeight / height))
              }
            }
          }

          if(config.name === WIDTH) {
            config.value = config.value / (lastWidth / width)
            data[WIDTH] = config.value
          }
          if(config.name === HEIGHT) {
            config.value = config.value / (lastHeight / height)
            data[HEIGHT] = config.value
          }
        })
      })
    }
    dispatch({
      type: 'bar/updateComponent',
      payload: bar.selectedComponents,
    })
    dispatch({
      type: 'bar/setGroupConfig',
      payload: {
        config: { position: { x, y }, style: { width, height } },
        isCanClearAllStatus: false,
      },
    })
  }

  const handleCanvasDrag = function(event: DraggableEvent, data: DraggableData) {
    handleCalcPosition({ x: data.x, y: data.y })
  }

  const handleCanvasDragStop = (event: DraggableEvent, data: DraggableData) => {
    const { x, y } = data
    handleCalcPosition({ x, y })
    dispatch({
      type: 'bar/save',
      payload: {
        canvasDraggablePosition: { x, y },
      },
    })
  }

  const handleCalcPosition = ({ x, y }: { x: number, y: number }) => {
    const canvasDraggableDOM: any = document.querySelector('.canvas-draggable')
    if(x >= 5000) {
      x = 5000
    }
    if(y >= 5000) {
      y = 5000
    }
    canvasDraggableDOM.style.transform = `translate(${ x }px, ${ y }px)`
    draggableRef.current.props.position.x = x
    draggableRef.current.props.position.y = y
    rulerRef.current.painter()
  }
  return (
    <div className="c-canvas">
      <Ruler
        cRef={ rulerRef }
        mouse={ mouse }
      />
      {/*      {
        isShowRightMenu &&
        <RightClickMenu menuInfo={ menuInfo } menuOptions={ customMenuOptions } hideMenu={ hideMenu }/> }*/ }
      <div
        style={ {
          width: 'calc(100% - 22px)',
          height: 'calc(100% - 54px)',
          position: 'absolute',
          overflow: 'hidden',
        } }
      >
        <Draggable
          ref={ draggableRef }
          disabled={ !isCanvasDraggable }
          onDrag={ handleCanvasDrag }
          onStop={ handleCanvasDragStop }
          position={ bar.canvasDraggablePosition }
        >
          <div
            className="canvas-draggable"
            style={ {
              width: 100000,
              height: 100000,
              position: 'absolute',
              left: -5000,
              top: -5000,
              background: '#181a24'
            } }
          >

            <div>
              <div
                ref={ canvasRef }
                className="canvas-container"
                style={ {
                  width: recommendConfig.width * bar.canvasScaleValue,
                  height: recommendConfig.height * bar.canvasScaleValue,
                  position: 'absolute',
                  left: 5000 + rulerCanvasSpacing.left,
                  top: 5000 + rulerCanvasSpacing.top,
                } }
              >
                <div
                  className="canvas-screen"
                  style={ {
                    width: recommendConfig.width,
                    height: recommendConfig.height,
                    transform: `scale(${ bar.canvasScaleValue })`,
                    backgroundColor: styleColor.value,
                    background: backgroundImg.value ? `url(${ backgroundImg.value }) no-repeat 0/cover` : '',
                    backgroundSize: 'cover',
                  } }
                >
                  <div className="draggable-wrapper">
                    <ScaleDragCom
                      mouse={ mouse }
                      cRef={ (ref: any) => {
                        bar.scaleDragCompRef = ref
                      } }
                      onScaleEnd={ handleScaleEnd }
                    />
                    <SupportLines
                      cRef={ (ref: any) => {
                        bar.supportLinesRef = ref
                      } }
                    />
                    <RulerLines/>

                    <div className="draggable-container" ref={ draggableContainerRef }>
                      <CustomDraggable mouse={ 0 } treeData={ layers }/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {
              isCanvasDraggable ? <div className="canvas-mask" style={ { position: 'absolute', inset: 0 } }/> : <></>
            }
          </div>
        </Draggable>

      </div>

    </div>
  )
}
export default connect(({
                          bar,
                        }
                          : any,
) => (
  {
    bar,
  }
))(Center)
