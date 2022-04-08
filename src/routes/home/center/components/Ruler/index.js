import { useState, useEffect, useRef } from 'react'
import { findDOMNode } from 'react-dom'
import './index.less'
import { connect } from 'dva'
import canvas from '../../../../../models/canvas'
import {
  EyeOutlined,
  EyeInvisibleOutlined,

} from '@ant-design/icons'

const Ruler = ({ bar, dispatch, mouse }) => {
  const recommendConfig = bar.pageConfig.find(item => item.name === 'recommend')
  const [moveLength, setMoveLength] = useState({
    left: 0,
    top: 0,
  })
  let [ruler, setRuler] = useState(null)
  const [isRulerLinesShow, setIsRulerLinesShow] = useState(true)
  // useEffect(() => {
  //   const temp = new rulerCanvas()
  //   temp.painter(recommendConfig.width, recommendConfig.height)
  //   ruler = setRuler(temp)
  // }, [])
  // useEffect(() => {
  //   if (ruler) {
  //     ruler.clearCanvas()
  //     ruler.painter(recommendConfig.width, recommendConfig.height)
  //   }
  // }, [recommendConfig])
  useEffect(() => {
    const temp = new rulerCanvas()
    temp.painter(bar.canvasScaleValue)
    ruler = setRuler(temp)
    return () => {
      setRuler(null)
    }
  }, [])
  useEffect(() => {
    if (ruler) {
      const canvasContainer = document.querySelector('.canvas-container')
      const leftWrap = document.querySelector('.home-left-wrap')
      const headerWrap = document.querySelector('.Header-wrap')
      setMoveLength({
        left: Math.ceil(canvasContainer.getBoundingClientRect().left - leftWrap.getBoundingClientRect().width),
        top: Math.ceil(canvasContainer.getBoundingClientRect().top - headerWrap.getBoundingClientRect().height),
      })
      ruler.clearCanvas()
      ruler.painter(bar.canvasScaleValue, Math.ceil(canvasContainer.getBoundingClientRect().left - leftWrap.getBoundingClientRect().width), Math.ceil(canvasContainer.getBoundingClientRect().top - headerWrap.getBoundingClientRect().height))
    }
  }, [bar.canvasScaleValue])
  const rulerCanvas = function () {
    this.canvasTop = document.getElementById('canvasTop')
    this.canvasLeft = document.getElementById('canvasLeft')
    this.clearCanvas = () => {
      const contextTop = this.canvasTop.getContext('2d')
      const contextLeft = this.canvasLeft.getContext('2d')
      contextTop.clearRect(0, 0, 3000, 22)
      contextLeft.clearRect(0, 0, 22, 2000)
    }
    this.painter = (canvasScaleValue, left = 0, top = 0) => {
      const draggableWrapper = document.querySelector('.canvas-container')
      // console.log('parent', draggableWrapper.offsetParent.getBoundingClientRect())
      // console.log('offsetTop', draggableWrapper.offsetTop)
      //
      // console.log('offsetLeft', draggableWrapper.offsetLeft)
      const contextTop = this.canvasTop.getContext('2d')
      const contextLeft = this.canvasLeft.getContext('2d')
      contextTop.beginPath()
      let ruleScale = 100
      if (canvasScaleValue > 1) {
        ruleScale = 50
      } else if (canvasScaleValue <= 0.67) {
        ruleScale = 200
      } else if (canvasScaleValue <= 0.33) {
        ruleScale = 300
      }
      console.log('left', left)
      for (let i = -2000; i < 3000; i += 10) {
        contextTop.strokeStyle = 'white'
        contextTop.fillStyle = 'white'

        //顶部标尺线绘制, 比例尺
        const y = (i % 100 === 0) ? 0 : 12
        contextTop.moveTo(Math.ceil((i + left - 22) / canvasScaleValue), y)
        contextTop.lineTo(Math.ceil((i + left - 22) / canvasScaleValue), 20)
        // contextTop.moveTo(Math.ceil((i + left - 22) / canvasScaleValue), y)
        // contextTop.lineTo(Math.ceil((i + left - 22) / canvasScaleValue), 20)

        //顶部标尺数字绘制
        if (y === 0) {
          contextTop.font = `${ 7 / canvasScaleValue }px Arial`
          // contextTop.fillText(i, Math.ceil((i + left - 18) / canvasScaleValue), 8)
          contextTop.fillText(i, Math.ceil((i + left - 18) / canvasScaleValue), 10)
        }
      }


      for (let i = -1000; i < 2000; i += 10) {
        //左侧标尺线绘制
        contextLeft.save()
        contextLeft.beginPath()
        contextLeft.strokeStyle = 'white'
        contextLeft.fillStyle = 'white'
        const x = (i % 100 === 0) ? 0 : 12
        contextLeft.moveTo(x, i)
        contextLeft.lineTo(20, i)

        contextLeft.stroke()
        contextLeft.closePath()

        //左侧标尺数字绘制
        contextLeft.beginPath()
        if (x === 0) {
          contextLeft.translate(9, i + 18)
          contextLeft.rotate(270 * Math.PI / 180)
          contextLeft.font = `${ 7 / canvasScaleValue }px Arial`
          contextLeft.fillText(i.toString(), 10, 0)

          contextLeft.closePath()
          contextLeft.restore()
        }
      }
      contextTop.stroke()
    }
  }


  const drawRuler = (dom, direction = 'vertical', min = 0, max = 100) => {
    const canvas = dom.current
    const context = canvas.getContext('2d')
    // ctx.fillStyle = '#151620'
    context.fillStyle = 'white'
    context.fillRect(0, 0, direction === 'vertical' ? 10000 : 30, direction === 'vertical' ? 10000 : 30)
    context.beginPath()
    // context.moveTo(AXIS_ORIGIN.x, AXIS_MARGIN);
    // context.lineTo(AXIS_RIGHT,    AXIS_MARGIN)
    context.closePath()
    context.lineWidth = 0.5
    context.strokeStyle = 'white'
  }

  const handleClick = (direction) => {
    if (direction === 'vertical') {
      // 横
      bar.rulerLines.push({
        position: {
          x: 0,
          y: mouse.elementY / bar.canvasScaleValue,
        },
        direction,
      })
    }
    if (direction === 'horizon') {
      // 竖
      bar.rulerLines.push({
        position: {
          x: mouse.elementX / bar.canvasScaleValue,
          y: 0,
        },
        direction,
      })
    }
    dispatch({
      type: 'bar/save',
    })
  }
  const handleRulerLinerShow = () => {
    setIsRulerLinesShow(!isRulerLinesShow)
    bar.rulerLines.forEach(line => {
      line.display = !isRulerLinesShow ? 'block' : 'none'
    })
    dispatch({
      type: 'bar/save',
    })
  }
  return (
    <div style={ { position: 'absolute', left: 0, top: 0 } }>
      <div style={ { position: 'absolute', left: 22, top: 0, transform: `scaleX(${ bar.canvasScaleValue })` } }>
        <canvas
          onClick={ () => handleClick('horizon') }
          id="canvasTop"
          height="22"
          width={ 3000 }
          style={ {
            position: 'absolute',
            left: 0,
            top: 0,
            background: '#151620',
            cursor: 'e-resize',
          } }>
          <p>Your browserdoes not support the canvas element!</p>
        </canvas>
      </div>
      <div style={ {
        position: 'absolute',
        left: 0,
        top: moveLength.top,
        transform: `scaleY(${ bar.canvasScaleValue })`,
      } }>
        <canvas
          onClick={ () => handleClick('vertical') } id="canvasLeft" width="22" height="1080"
          style={ { position: 'absolute', left: 0, top: 0, background: '#151620', cursor: 'n-resize' } }>
          <p>Your browserdoes not support the canvas element!</p>
        </canvas>
      </div>
      <div
        style={ {
          width: 20,
          height: 20,
          background: '#151620',
          position: 'absolute',
          zIndex: 10000,
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        } }
        onClick={ handleRulerLinerShow }
      >
        {
          isRulerLinesShow ? <EyeOutlined style={ { fontSize: '16px', color: '#08c' } }/> :
            <EyeInvisibleOutlined style={ { fontSize: '16px', color: '#08c' } }/>
        }
      </div>
    </div>
  )
}
export default connect(({
                          bar,
                        },
) => (
  {
    bar,
  }
))(Ruler)
