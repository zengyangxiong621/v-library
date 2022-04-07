import { useState, useEffect, useRef } from 'react'
import './index.less'
import { connect } from 'dva'
import canvas from '../../../../../models/canvas'
import {
  EyeOutlined,
  EyeInvisibleOutlined,

} from '@ant-design/icons'

const Ruler = ({ bar, dispatch, mouse }) => {
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
  useEffect(() => {
    const temp = new rulerCanvas()
    temp.painter(1920, 1080)
    ruler = setRuler(temp)
  }, [])
  useEffect(() => {
    if (ruler) {
      ruler.clearCanvas()
      ruler.painter(1000, 1000)
    }
  }, [recommendConfig])
  const rulerCanvas = function () {
    this.canvasTop = document.getElementById('canvasTop')
    this.canvasLeft = document.getElementById('canvasLeft')
    this.clearCanvas = () => {
      const contextTop = this.canvasTop.getContext('2d')
      const contextLeft = this.canvasLeft.getContext('2d')
      contextTop.clearRect(0, 0, 1920, 20)
      contextLeft.clearRect(0, 0, 20, 1147)
    }
    this.painter = (width, height) => {
      const draggableWrapper = document.querySelector('.canvas-container')
      // console.log('parent', draggableWrapper.offsetParent.getBoundingClientRect())
      // console.log('offsetTop', draggableWrapper.offsetTop)
      //
      // console.log('offsetLeft', draggableWrapper.offsetLeft)
      const contextTop = this.canvasTop.getContext('2d')
      const contextLeft = this.canvasLeft.getContext('2d')
      contextTop.beginPath()
      for (let i = -100; i < width; i += 10) {
        contextTop.strokeStyle = 'white'
        contextTop.fillStyle = 'white'

        //顶部标尺线绘制, 比例尺
        // 50是尺度
        console.log('i / 0.71', i / 0.71)
        const y = (Math.ceil(i / 0.5) % 100 === 0) ? 0 : 15
        // 开始的坐标
        contextTop.moveTo(i + 50, y)
        // 结束的坐标
        contextTop.lineTo(i + 50, 20)

        //顶部标尺数字绘制
        if (y === 0) {
          contextTop.fillText(Math.ceil(i / 0.5), i + 52, 8)
        }
      }

      for (let i = -100; i < height; i += 10) {
        //左侧标尺线绘制
        contextLeft.save()
        contextLeft.beginPath()
        contextLeft.strokeStyle = 'white'
        contextLeft.fillStyle = 'white'
        const x = (i % 50 === 0) ? 0 : 10
        contextLeft.moveTo(x + 5, i + 20)
        contextLeft.lineTo(20, i + 20)

        contextLeft.stroke()
        contextLeft.closePath()

        //左侧标尺数字绘制
        contextLeft.beginPath()
        if (x === 0) {
          contextLeft.translate(9, i + 18)
          contextLeft.rotate(270 * Math.PI / 180)
          contextLeft.fillText(i.toString(), 0, 0)

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
      <canvas onClick={ () => handleClick('horizon') } id="canvasTop" height="20" width="1920"
              style={ { position: 'absolute', left: 0, top: 0, background: '#151620', cursor: 'e-resize' } }>
        <p>Your browserdoes not support the canvas element!</p>
      </canvas>
      <canvas onClick={ () => handleClick('vertical') } id="canvasLeft" width="20" height="1080"
              style={ { position: 'absolute', left: 0, top: 0, background: '#151620', cursor: 'n-resize' } }>
        <p>Your browserdoes not support the canvas element!</p>
      </canvas>
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
