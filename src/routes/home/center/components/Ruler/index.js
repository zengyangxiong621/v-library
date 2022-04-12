import { useState, useEffect, useRef, useImperativeHandle } from 'react'
import { findDOMNode } from 'react-dom'
import './index.less'
import { connect } from 'dva'
import {
  EyeOutlined,
  EyeInvisibleOutlined,

} from '@ant-design/icons'
import { throttle } from '../../../../../utils/common'


const Ruler = ({ bar, dispatch, mouse, cRef }) => {

  const recommendConfig = bar.pageConfig.find(item => item.name === 'recommend')
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
  const painter = () => {
    console.log('hhhh')
  }
  const throttlePainter = throttle(painter, 1000)
  useImperativeHandle(cRef, () => ({
    painter: () => {
      throttlePainter()
    },
  }))
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
      const canvasContainer = document.querySelector('.canvas-screen')
      const leftWrap = document.querySelector('.home-left-wrap')
      const headerWrap = document.querySelector('.Header-wrap')
      ruler.clearCanvas()
      const left = Math.ceil(canvasContainer.getBoundingClientRect().left - leftWrap.getBoundingClientRect().width)
      const right = Math.ceil(canvasContainer.getBoundingClientRect().top - headerWrap.getBoundingClientRect().height)
      ruler.painter(bar.canvasScaleValue, left, right)
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
      let ruleGrade = 10
      if (canvasScaleValue > 1) {
        ruleScale = 50
        ruleGrade = 10
      } else if (canvasScaleValue <= 1 && canvasScaleValue > 0.67) {
        ruleScale = 100
        ruleGrade = 10
      } else if (canvasScaleValue <= 0.67 && canvasScaleValue > 0.43) {
        ruleScale = 200
        ruleGrade = 20
      } else if (canvasScaleValue <= 0.43) {
        ruleScale = 400
        ruleGrade = 40
      }
      for (let i = -5000; i < 5000; i += ruleGrade) {
        contextTop.strokeStyle = 'white'
        contextTop.fillStyle = 'white'

        //顶部标尺线绘制, 比例尺
        const y = (i % ruleScale === 0) ? 0 : 12
        // contextTop.moveTo(i + left - 22, y)
        // contextTop.lineTo(i + left - 22, 20)
        contextTop.moveTo(Math.ceil(i * canvasScaleValue) + left - 22, y)
        contextTop.lineTo(Math.ceil(i * canvasScaleValue) + left - 22, 20)

        //顶部标尺数字绘制
        if (y === 0) {
          contextTop.font = `12px Arial`
          contextTop.fillText(i, Math.ceil(i * canvasScaleValue) + left - 18, 10)
          // contextTop.fillText(i, i + left - 18, 10)
        }
      }


      for (let i = -5000; i < 5000; i += ruleGrade) {
        //左侧标尺线绘制
        contextLeft.save()
        contextLeft.beginPath()
        contextLeft.strokeStyle = 'white'
        contextLeft.fillStyle = 'white'
        const x = (i % ruleScale === 0) ? 0 : 12
        contextLeft.moveTo(x, Math.ceil(i * canvasScaleValue) + top - 22)
        contextLeft.lineTo(20, Math.ceil(i * canvasScaleValue) + top - 22)

        contextLeft.stroke()
        contextLeft.closePath()

        //左侧标尺数字绘制
        if (x === 0) {
          contextLeft.beginPath()
          contextLeft.font = `12px Arial`
          contextLeft.translate(10, Math.ceil(i * canvasScaleValue) + top - 25)
          contextLeft.rotate(-90 * Math.PI / 180)
          contextLeft.fillText(i, 0, 0)
          // contextLeft.fillText(i, 0, Math.ceil(i * canvasScaleValue) + top - 18)

          // console.log('刻度尺Y', Math.ceil(i * canvasScaleValue) + top - 18)
          // contextLeft.fillText(i.toString(), -(Math.ceil(i * canvasScaleValue) + top - 18), 0)

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
      <div style={ {
        position: 'absolute',
        left: 22,
        top: 0,
      } }>
        <canvas
          onClick={ () => handleClick('horizon') }
          id="canvasTop"
          height="22"
          width="3000"
          style={ {
            position: 'absolute',
            left: 0,
            top: 0,
            background: '#151620',
            cursor: 'e-resize',
          } }>
          <p>Your browser does not support the canvas element!</p>
        </canvas>
      </div>
      <div style={ {
        position: 'absolute',
        left: 0,
        top: 22,
      } }>
        <canvas
          onClick={ () => handleClick('vertical') }
          id="canvasLeft"
          width="22"
          height="2000"
          style={ {
            position: 'absolute',
            left: 0,
            top: 0,
            background: '#151620',
            cursor: 'n-resize',
          } }>
          <p>Your browser does not support the canvas element!</p>
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
