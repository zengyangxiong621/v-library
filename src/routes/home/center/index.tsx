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
  const draggableContainerRef = useRef(null)
  const canvasRef = useRef(null)
  // let supportLinesRef: any = useRef(null)
  const treeData = bar.treeData
  const isSupportMultiple = bar.isSupportMultiple
  let supportLinesRef = bar.supportLinesRef
  const canvasConfigData = bar.canvasConfigData
  const [ canvasSize, setCanvasSize ] = useState({
    width: 0,
    height: 0,
  })
  const calcCanvasSize = () => {
    let getCurrentDocumentWidth = document.documentElement.clientWidth
    const getCurrentDocumentHeight = document.documentElement.clientHeight
    if(getCurrentDocumentWidth < 1366) {
      getCurrentDocumentWidth = 1366
    }
    const width = getCurrentDocumentWidth - 40 - 300 - 333
    canvasConfigData.config.scale = (width / canvasConfigData.style.width).toFixed(3)
    const height = canvasConfigData.style.height * canvasConfigData.config.scale
    setCanvasSize({
      width,
      height,
    })
  }
  useEffect(() => {
    calcCanvasSize()
    window.addEventListener('resize', (ev) => {
      calcCanvasSize()
    })
    return () => {
      window.removeEventListener('resize', (ev) => {
      })
    }
  }, [])
  const filterKey = [ 'ctrl', 'shift' ]
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

  const handleClick = () => {
    // console.log('supportLinesRef',  supportLinesRef.handleSetPosition)
    supportLinesRef.handleSetPosition(100, 100)
    // dispatch({
    //   type: 'canvas/test',
    //   payload: {},
    // })
  }
  const handleDelete = () => {
    dispatch({
      type: 'bar/testDelete',
      payload: {},
    })
  }
  const handleSelect = () => {
    dispatch({
      type: 'bar/select',
      payload: 'component_7',
    })
  }
  return (
    <div className="c-canvas" ref={ canvasRef }>
      <Ruler/>
      <Ruler/>
      <div
        className="canvas-container"
        style={ {
          ...canvasSize,
          // width: canvasConfigData.style.width * canvasConfigData.config.scale,
          // height: canvasConfigData.style.height * canvasConfigData.config.scale,
        } }
      >
        <div
          className="canvas-screen"
          style={ {
            width: canvasConfigData.style.width,
            height: canvasConfigData.style.height,
            transform: `scale(${ canvasConfigData.config.scale })`,
            background: canvasConfigData.style.background,
          } }
        >
          <div className="draggable-wrapper">
            <div style={ { position: 'absolute', left: 0, top: 0 } }>
              <Button onClick={ handleClick }>刷新</Button>
              <Button onClick={ handleDelete }>删除</Button>
              <Button onClick={ handleSelect }>选中</Button>
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
            {
              // draggableItems.map(item => {
              //   return <Draggable cancel=".no-cursor" position={ item.position }
              //                     onDrag={ (ev, data) => handleDrag(item, ev, data) }
              //                     onStop={ (ev, data) => handleStop(item, ev, data) }>
              //     <div className="box">
              //       <strong className="no-cursor">
              //         <div style={ { position: 'absolute', left: -item.position.x, top: -item.position.y } }>
              //           {
              //             item.components.map(component => {
              //               return <Draggable>
              //                 <div className="box" style={ { width: '50px', height: '50px' } }>{ component.id }</div>
              //               </Draggable>
              //             })
              //           }
              //         </div>
              //       </strong>
              //       <div>Dragging here works</div>
              //     </div>
              //   </Draggable>
              // })

            }
          </div>
        </div>
      </div>
    </div>
  )
}
export default connect(({
                          bar,
                        }: any,
) => (
  {
    bar,
  }
))(Center)
