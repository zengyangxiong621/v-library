import { useState, useEffect, useRef } from 'react'
import './index.less'
import { connect } from 'dva'

const Ruler = ({ bar }) => {
  const recommendConfig = bar.pageConfig.find(item => item.name === 'recommend')
  let [ruler, setRuler] = useState(null)

  useEffect(() => {
    const temp = new rulerCanvas()
    temp.painter(recommendConfig.width, recommendConfig.height)
    ruler = setRuler(temp)
  }, [])
  useEffect(() => {
    if (ruler) {
      ruler.clearCanvas()
      ruler.painter(recommendConfig.width, recommendConfig.height)
    }
  }, [recommendConfig])
  const rulerCanvas = function () {
    this.canvasTop = document.getElementById('canvasTop')
    this.canvasLeft = document.getElementById('canvasLeft')
    this.clearCanvas = () => {
      const contextTop = this.canvasTop.getContext('2d')
      const contextLeft = this.canvasLeft.getContext('2d')
      contextTop.clearRect(0, 0, 1920 , 20)
      contextLeft.clearRect(0, 0, 20, 1147)
    }
    this.painter = (width, height) => {
      const draggableWrapper = document.querySelector('.canvas-container')
      console.log('draggableWrapper', draggableWrapper)
      console.log('draggableWrapper', draggableWrapper.getBoundingClientRect())
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
        const y = (i % 50 === 0) ? 0 : 10
        contextTop.moveTo(i + 50, y + 5)
        contextTop.lineTo(i + 50, 20)

        //顶部标尺数字绘制
        if (y === 0) {
          contextTop.fillText(i.toString(), i + 52, 8)
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


  return (
    <>

      <canvas id="canvasTop" height="20" width="1920"
              style={ { position: 'absolute', left: 0, top: 0, background: '#151620' } }>
        <p>Your browserdoes not support the canvas element!</p>
      </canvas>
      <canvas id="canvasLeft" width="20" height="1080"
              style={ { position: 'absolute', left: 0, top: 0, background: '#151620' } }>
        <p>Your browserdoes not support the canvas element!</p>
      </canvas>
    </>
  )
}
export default connect(({ bar }) => ({
  bar,
}))(Ruler)
