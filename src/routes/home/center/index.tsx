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
    console.log('(document.querySelector(\'.left-menu\') as any).clientWidth', (document.querySelector('.left-menu') as any).clientWidth)
    const width = getCurrentDocumentWidth - 40 - (document.querySelector('.left-menu') as any).clientWidth - 333
    const height = getCurrentDocumentHeight - 64 - 35 - 40
    const canvasHeight = Number((width / recommendConfig.width).toFixed(3)) * recommendConfig.height
    console.log('canvasHeight: ', canvasHeight)
    console.log('height: ', height)
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
    // const height = recommendConfig.height * bar.canvasScaleValue
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
    // if(event.type === 'keydown') {
    //
    // }
    // if(bar.selectedComponentOrGroup.length === 0 && event.type === 'keyup') {
    //   dispatch({
    //     type: 'bar/save',
    //     payload: {
    //       isSupportMultiple: false,
    //     },
    //   })
    // }
  }, {
    events: [ 'keydown', 'keyup' ],
  })

  const mouse = useMouse(canvasRef)
    // const mouse = 0
  return (
    <div className="c-canvas">
      <Ruler/>
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
            <div style={ { position: 'absolute', left: 0, top: 0 } }>
              {/*<Button onClick={ handleClick }>刷新</Button>*/ }
              {/*<Button onClick={ handleDelete }>删除</Button>*/ }
              {/*<Button onClick={ handleSelect }>选中</Button>*/ }
            </div>
            <ScaleDragCom
              mouse={ mouse }
              cRef={ (ref: any) => {
                bar.scaleDragCompRef = ref
              } }
            />
            <SupportLines
              key="support"
              cRef={ (ref: any) => {
                bar.supportLinesRef = ref
                return bar.supportLinesRef
              } }
            />
            <div className="draggable-container" id="draggable-container" ref={ draggableContainerRef }>
              <CustomDraggable mouse={ 0 } treeData={ treeData }/>
            </div>
          </div>
        </div>
      </div>
      <div style={ {
        position: 'absolute',
        bottom: '50px',
        right: '20px',
        color: '#999',
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
