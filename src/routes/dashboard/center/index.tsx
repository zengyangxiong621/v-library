/*
 * @Author: your name
 * @Date: 2022-04-19 11:44:40
 * @LastEditTime: 2022-04-19 18:52:22
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \v-library\src\routes\dashboard\center\index.tsx
 */
import { useState, useEffect, useRef } from 'react'
import { connect } from 'dva'

import './index.less'
import Draggable from 'react-draggable'
import CustomDraggable from './components/CustomDraggable'
import ScaleDragCom from './components/ScaleDragCom'
import SupportLines from './components/SupportLines'
import ChooseArea from './components/ChooseArea'
import * as React from 'react'
import { Button } from 'antd'
import { useClickAway, useKeyPress, useMouse, useThrottle } from 'ahooks'
import Ruler from './components/Ruler'
import { IScaleDragData, IStyleConfig } from './type'
import { DIMENSION, WIDTH, LEFT, TOP, HEIGHT } from './constant'
import RulerLines from './components/RulerLines'
import { DraggableData, DraggableEvent } from './components/CustomDraggable/type'
import { throttle } from '../../../utils/common'
import RightClickMenu from '../left/components/rightClickMenu/rightClickMenu'
import { menuOptions } from '../left/Data/menuOptions'

const Center = ({ bar, dispatch }: any) => {

  const filterKey = [ 'ctrl', 'shift' ]
  const draggableContainerRef = useRef(null)
  const rulerRef: any = useRef(null)
  const canvasRef = useRef(null)
  const [ isShowRightMenu, setIsShowRightMenu ] = useState(false)
  const [ menuInfo, setMenuInfo ] = useState({ x: 0, y: 0, id: '', isFolder: false })
  const [ customMenuOptions, setCustomMenuOptions ] = useState(menuOptions)

  // let supportLinesRef: any = useRef(null)
  const treeData = bar.treeData
  let supportLinesRef = bar.supportLinesRef

  const findItem = (name: string) => {
    return bar.pageConfig.find((item: any) => {
      return item.name === name
    })
  }
  const recommendConfig = findItem('recommend')
  const styleColor = findItem('styleColor')
  const backgroundImg = findItem('backgroundImg')
  const gridSpacing = findItem('gridSpacing')
  const zoomConfig = findItem('zoom')
  // 计算画布的大小
  const calcCanvasSize = () => {
    let getCurrentDocumentWidth = document.documentElement.clientWidth
    const getCurrentDocumentHeight = document.documentElement.clientHeight
    if(getCurrentDocumentWidth < 1366) {
      getCurrentDocumentWidth = 1366
    }
    const width = getCurrentDocumentWidth - 40 - (document.querySelector('.left-menu') as any).clientWidth - 333
    const height = getCurrentDocumentHeight - 64 - 35 - 40
    const canvasHeight = Number((width / recommendConfig.width).toFixed(3)) * recommendConfig.height
    if(canvasHeight > height) {
      dispatch({
        type: 'bar/save',
        payload: {
          canvasScaleValue: Number((height / recommendConfig.height).toFixed(3)),
        },
      })
      return
    }
    dispatch({
      type: 'bar/save',
      payload: {
        canvasScaleValue: Number((width / recommendConfig.width).toFixed(3)),
      },
    })
  }
  // 计算画布的放大缩小
  const calcCanvasScale = (e: any) => {
    if(e.ctrlKey) {
      e.preventDefault()
      if(e.deltaY > 0 && bar.canvasScaleValue < 0.19) {
        return false
      }
      dispatch({
        type: 'bar/save',
        payload: {
          canvasScaleValue: Number((bar.canvasScaleValue + (e.deltaY > 0 ? -0.03 : 0.03)).toFixed(3)),
        },
      })
    }
  }

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
  }, [ recommendConfig.value ])

  useEffect(() => {
    calcCanvasSize()
    window.addEventListener('resize', calcCanvasSize);
    (document.querySelector('#draggable-container') as HTMLElement).addEventListener('contextmenu', handleContextMenu)
    // document.addEventListener('contextmenu', handleContextMenu)
    return () => {
      window.removeEventListener('resize', calcCanvasSize);
      (document.querySelector('#draggable-container') as HTMLElement).removeEventListener('contextmenu', handleContextMenu)
      // document.removeEventListener('contextmenu', handleContextMenu)
    }
  }, [])
  useClickAway(() => {
    // 取消右键菜单
    setIsShowRightMenu(false)
  }, [ document.querySelector('.left-wrap-tree'), document.querySelector('.left-wrap-toolbar'), document.querySelector('.left-wrap>.header'), document.querySelector('.left-menu>.footer'), document.getElementById('right-wrap'), document.getElementById('draggable-container') ])
  const handleContextMenu = (event: MouseEvent) => {
    console.log('event', event.target)
    const dom = event.target as HTMLElement
    setIsShowRightMenu(true)
    if(dom.dataset?.id) {
      setMenuInfo({
        x: event.clientX,
        y: event.clientY,
        id: dom.dataset.id,
        isFolder: false,
      })
    }
    event.preventDefault()
  }

  const hideMenu = () => {
    setIsShowRightMenu(false)
  }

  useKeyPress(filterKey, (event) => {
    if(event.type === 'keydown' && bar.isSupportMultiple) {
      return
    }
    dispatch({
      type: 'bar/save',
      payload: {
        isSupportMultiple: event.type === 'keydown',
      },
    })
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
    // const { position, style } = lastScaleDragData
    console.log('x', x, ',lastX', lastX)
    console.log('y', y, ',lastY', lastY)
    console.log('width', width, ',lastWidth', lastWidth)
    console.log('height', height, ',lastHeight', lastHeight)
    if(bar.selectedComponentOrGroup.length === 1) {
      const component = bar.selectedComponents[0]
      const styleDimensionConfig = component.config.find((item: any) => item.name === DIMENSION).value
      styleDimensionConfig.forEach((item: IStyleConfig) => {
        switch(item.name) {
          case 'left':
            item.value = x
            break
          case 'top':
            item.value = y
            break
          case 'width':
            item.value = width
            break
          case 'height':
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
          if (x === lastX) {
            if(config.name === LEFT) {
              if(config.value !== lastX) {
                config.value = lastX + ((data[LEFT] - lastX) / (lastWidth / width))
                data[LEFT] = config.value
              } 
            }
          } else {
            if(config.name === LEFT) {
              if(config.value === lastX) {
  
              } else {
                config.value = config.value - (width - lastWidth)
                data[LEFT] = config.value
              }
            }
          }


          if (y === lastY) {
            if(config.name === TOP) {
              if(config.value !== lastY) {
                config.value = lastY + ((data[TOP] - lastY) / (lastHeight / height))
                data[TOP] = config.value
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
      calcScaleAfterComponentsConfig()
    }
    dispatch({
      type: 'bar/updateComponent',
      payload: bar.selectedComponents,
    })
    dispatch({
      type: 'bar/save',
      payload: {
        isCanClearAllStatus: false,
      },
    })
  }

  const handleDrag = function(event: DraggableEvent, data: DraggableData) {
    // rulerRef.current.painter()
    // console.log('hhhh')
  }

  const throttledFunc = throttle(handleDrag, 1000)

  return (
    <div className="c-canvas">
      <Ruler
        cRef={ rulerRef }
        mouse={ mouse }
      />
      {
        isShowRightMenu &&
        <RightClickMenu menuInfo={ menuInfo } menuOptions={ customMenuOptions } hideMenu={ hideMenu }/> }
      <div
        style={ {
          width: 'calc(100% - 22px)',
          height: 'calc(100% - 22px)',
          position: 'absolute',
          overflow: 'hidden',
        } }
      >
        <Draggable
          disabled={ true }
          onDrag={ handleDrag }
        >
          <div
            style={ { width: '100%', height: '100%' } }
          >
            <div
              style={ {
                width: '100%',
                height: '100%',
                position: 'absolute',
              } }
            >
              <div>
                <div
                  ref={ canvasRef }
                  className="canvas-container"
                  style={ {
                    width: recommendConfig.width * bar.canvasScaleValue,
                    height: recommendConfig.height * bar.canvasScaleValue,
                  } }
                >
                  <div
                    className="canvas-screen"
                    style={ {
                      width: recommendConfig.width,
                      height: recommendConfig.height,
                      transform: `scale(${ bar.canvasScaleValue })`,
                      backgroundColor: styleColor.value,
                      background: backgroundImg.value ? `url(${ backgroundImg.value })` : styleColor.value,
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

                      <div className="draggable-container" id="draggable-container" ref={ draggableContainerRef }>
                        <CustomDraggable mouse={ 0 } treeData={ treeData }/>
                      </div>
                    </div>
                  </div>
                </div>
                {/*                蒙版*/ }
                {/*                <div
                  className="mengban"
                  style={ {
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    background: 'gray',
                    opacity: 0,
                  } }
                >

                </div>*/ }
              </div>
            </div>
            <div style={ {
              position: 'absolute',
              bottom: '50px',
              right: '20px',
              color: '#999',
              userSelect: 'none',
            } }>
              按住空格可拖拽画布 { recommendConfig.width }*{ recommendConfig.height }
              { ' ' + Math.ceil(bar.canvasScaleValue * 100) + '%' }
            </div>
          </div>
        </Draggable>
        <div className="mengban">

        </div>
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
