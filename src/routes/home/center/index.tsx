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
import { useClickAway, useKeyPress, useMouse } from 'ahooks'
import Ruler from './components/Ruler'
import { IScaleDragData, IStyleConfig } from './type'
import { DIMENSION } from './constant'
import RulerLines from './components/RulerLines'

const Center = ({ bar, dispatch }: any) => {
  const filterKey = [ 'ctrl', 'shift' ]
  const draggableContainerRef = useRef(null)
  const canvasRef = useRef(null)
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
    window.addEventListener('resize', calcCanvasSize)
    return () => {
      window.removeEventListener('resize', calcCanvasSize)
    }
  }, [])

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

  /**
   * @desc 缩放组件在缩放结束后的回调
   * @param IScaleDragData
   * @return void
   */
  const handleScaleEnd = ({ position: { x, y }, style: { width, height } }: IScaleDragData) => {
    if(bar.dragStatus === '一组件') {
      const component = bar.selectedComponents[0]
      const styleDimensionConfig = component.config.find((item: any) => item.name === DIMENSION)
      styleDimensionConfig.value.forEach((item: IStyleConfig) => {
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
    }
    dispatch({
      type: 'bar/save',
    })
  }


  return (
    <div className="c-canvas">
      <Ruler
        mouse={ mouse }
      />
      <div
        style={ {
          width: 'calc(100% - 22px)',
          height: '100%',
          position: 'absolute',
          overflow: 'hidden',
        } }
      >
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
