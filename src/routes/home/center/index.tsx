import { useState, useEffect, useRef } from 'react'
import { connect } from 'dva'

import './index.less'
import Draggable from 'react-draggable'
import CustomDraggable from './components/CustomDraggable'
import ScaleDragCom from './components/ScaleDragCom'
import SupportLines from './components/SupportLines'
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
  const isSupportMultiple = bar.isSupportMultiple
  let supportLinesRef = bar.supportLinesRef
  const canvasConfigData = bar.canvasConfigData

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

  const calcCanvasSize = () => {
    let getCurrentDocumentWidth = document.documentElement.clientWidth
    const getCurrentDocumentHeight = document.documentElement.clientHeight
    if(getCurrentDocumentWidth < 1366) {
      getCurrentDocumentWidth = 1366
    }
    const width = getCurrentDocumentWidth - 40 - 250 - 333
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
  const setCanvasScale = (e: any) => {
    if(e.ctrlKey) {
      if(e.deltaY < 0) {
        console.log('滚', bar.canvasScaleValue)
        e.preventDefault()
        dispatch({
          type: 'bar/save',
          payload: {
            canvasScaleValue: Number((bar.canvasScaleValue + 0.03).toFixed(3)),
          },
        })
        return false
      }
      if(e.deltaY > 0) {
        console.log('滚', bar.canvasScaleValue)

        e.preventDefault()
        dispatch({
          type: 'bar/save',
          payload: {
            canvasScaleValue: Number((bar.canvasScaleValue - 0.03).toFixed(3)),
          },
        })
        return false
      }
    }
  }
  useEffect(() => {
    if(bar.canvasScaleValue) {
      window.addEventListener('wheel', setCanvasScale, { passive: false })
    }
    return () => {
      window.removeEventListener('wheel', setCanvasScale)
    }
  }, [ bar.canvasScaleValue ])

  useEffect(() => {
    console.log('recommendConfig.value', recommendConfig)
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
    if(event.type === 'keydown') {
      // 按下
      if(isSupportMultiple) {
        return
      }
      dispatch({
        type: 'bar/save',
        payload: {
          isSupportMultiple: true,
        },
      })
      return
    }
    // 抬起
    dispatch({
      type: 'bar/save',
      payload: {
        isSupportMultiple: false,
      },
    })
    return
  }, {
    events: [ 'keydown', 'keyup' ],
  })

  useClickAway(() => {
    dispatch({
      type: 'bar/clearAllStatus',
    })
  }, [ draggableContainerRef, bar.treeRef ])
  // const mouse = useMouse(canvasRef);
  const mouse = 0

  return (
    <div className="c-canvas" ref={ canvasRef }>
      <Ruler/>
      <Ruler/>
      <div
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
            background: backgroundImg.value ? `url(${backgroundImg.value})` : styleColor.value
          } }
        >
          <div className="draggable-wrapper">
            <div style={ { position: 'absolute', left: 0, top: 0 } }>
              {/*<Button onClick={ handleClick }>刷新</Button>*/ }
              {/*<Button onClick={ handleDelete }>删除</Button>*/ }
              {/*<Button onClick={ handleSelect }>选中</Button>*/ }
            </div>
            <ScaleDragCom/>
            <SupportLines
              key="support"
              cRef={ (ref: any) => {
                bar.supportLinesRef = ref
                return bar.supportLinesRef
              } }
            />
            <div className="draggable-container" ref={ draggableContainerRef }>
              <CustomDraggable mouse={ mouse } treeData={ treeData }/>
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
