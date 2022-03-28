import { useState, useEffect, useRef } from 'react'
import './index.less'
// import { ruler } from './dist/ruler'
// import './dist/ruler.min.css'

const Ruler = (props) => {
  const direction = props.direction
  const rulerRef = useRef(null)
  useEffect(() => {
    // drawRuler(rulerRef)
    painter()

  }, [])
  const painter = () => {

    var canvasTop = document.getElementById('canvasTop')
    var canvasLeft = document.getElementById('canvasLeft')

    var contextTop = canvasTop.getContext('2d')
    var contextLeft = canvasLeft.getContext('2d')

    contextTop.beginPath()
    for (var i = -100; i < 1920; i += 10) {

      //顶部标尺线绘制
      var y = (i % 50 == 0) ? 0 : 10
      contextTop.moveTo(i + 20, y)
      contextTop.lineTo(i + 20, 15)

      //顶部标尺数字绘制
      if (y == 0) {
        contextTop.fillText(i.toString(), i + 22, 8)
      }

      //左侧标尺线绘制
      contextLeft.save()
      contextLeft.beginPath()

      var x = (i % 50 == 0) ? 0 : 10
      contextLeft.moveTo(x, i + 20)
      contextLeft.lineTo(15, i + 20)

      contextLeft.stroke()
      contextLeft.closePath()

      //左侧标尺数字绘制
      contextLeft.beginPath()
      if (x == 0) {
        contextLeft.translate(9, i + 18)
        contextLeft.rotate(270 * Math.PI / 180)
        contextLeft.fillText(i.toString(), 0, 0)

        contextLeft.closePath()
        contextLeft.restore()
      }
    }
    contextTop.stroke()
  }


  const drawRuler = (dom, direction = 'vertical', min = 0, max = 100) => {
    const canvas = dom.current
    const context = canvas.getContext('2d')
    // ctx.fillStyle = '#151620'
    context.fillStyle = 'pink'
    context.fillRect(0, 0, direction === 'vertical' ? 10000 : 30, direction === 'vertical' ? 10000 : 30)
    context.beginPath()
    // context.moveTo(AXIS_ORIGIN.x, AXIS_MARGIN);
    // context.lineTo(AXIS_RIGHT,    AXIS_MARGIN)
    context.closePath()
    context.lineWidth = 0.5
    context.strokeStyle = 'black'
  }


  return (
    <>

      <canvas id="canvasTop" height="20" width="1920" style={ { position: 'absolute', left: 0, top: 0, background: 'white' } }>
        <p>Your browserdoes not support the canvas element!</p>
      </canvas>
      <canvas id="canvasLeft" width="20" height="1080" style={ { position: 'absolute', left: 0, top: 0, background: 'white' } }>
        <p>Your browserdoes not support the canvas element!</p>
      </canvas>
    </>
  )
}
export default Ruler
