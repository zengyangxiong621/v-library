import { useEffect, useRef, useState } from 'react'

const ChooseArea = ({ onChooseEnd, chooseItemClass }) => {
  const areaRef = useRef(null)
  const [selectedItem, setSelectedItem] = useState([])
  const selectedList = useRef([])
  useEffect(() => {
    document.onmousedown = (e) => {
      console.log('onmousedown', e)
      // if (e.target.className === 'inner') {
      //   return
      // }
      // if (!e.target.className || typeof e.target.className !== 'string') {
      //   return false
      // }
      // if (!(e.target.className.indexOf('draggable-container') !== -1)) {
      //   return false
      // }
      // const chooseItems = document.querySelectorAll(`.${ chooseItemClass }`)
      // const chooseItemsPositions = [...chooseItems].map(item => {
      //   console.log('item', item.offsetParent)
      //   return {
      //     id: item.dataset.id,
      //     leftTop: {
      //       x: item.offsetLeft,
      //       y: item.offsetTop,
      //     },
      //     rightBottom: {
      //       x: item.offsetLeft + item.offsetWidth,
      //       y: item.offsetTop + item.offsetHeight,
      //     },
      //   }
      // })
      // console.log('chooseItems', chooseItemsPositions)
      // console.log('---------------------------------')
      // e.preventDefault()
      /*
        初始化
       */
      areaRef.current.style.display = 'none'
      areaRef.current.style.width = 0 + 'px'
      areaRef.current.style.height = 0 + 'px'
      areaRef.current.style.width = 0
      areaRef.current.style.height = 0
      // const pointPreX = e.clientX
      // const pointPreY = e.clientY
      const pointPreX = e.clientX
      const pointPreY = e.clientY
      const boxPreWidth = areaRef.current.offsetWidth
      const boxPreHeight = areaRef.current.offsetHeight
      let isMouseMove = false
      document.onmousemove = (ev) => {
        // 移动的时候让选区显示出来
        console.log('----------------------')
        console.log('ev', ev)
        console.log('className', ev.target.className)

        isMouseMove = true
        areaRef.current.style.display = 'block'
        // 取选区 div 的左上角、右下角坐标
        let areaPosition = {}
        // const pointCurX = ev.clientX
        // const pointCurY = ev.clientY
        const pointCurX = ev.clientX
        const pointCurY = ev.clientY
        const boxCurWidth = (pointCurX - pointPreX) // 当前盒子的大小
        const boxCurHeight = (pointCurY - pointPreY)
        if (boxCurWidth >= 0 && boxCurHeight >= 0) {
          areaRef.current.style.left = pointPreX - 300 + 'px'
          areaRef.current.style.top = pointPreY + 'px'
          areaRef.current.style.width = boxCurWidth + 'px'
          areaRef.current.style.height = boxCurHeight + 'px'
          areaPosition = {
            leftTop: {
              x: pointPreX,
              y: pointPreY,
            },
            rightBottom: {
              x: pointPreX + boxCurWidth,
              y: pointPreY + boxCurHeight,
            },
          }
        } else if (boxCurWidth < 0 && boxCurHeight > 0) {
          areaRef.current.style.left = pointCurX - 300 + 'px'
          areaRef.current.style.top = pointPreY + 'px'
          areaRef.current.style.width = ~boxCurWidth + 'px'
          areaRef.current.style.height = boxCurHeight + 'px'
          areaPosition = {
            leftTop: {
              x: pointCurX,
              y: pointPreY,
            },
            rightBottom: {
              x: pointCurX + ~boxCurWidth,
              y: pointPreY + boxCurHeight,
            },
          }
        } else if (boxCurWidth > 0 && boxCurHeight < 0) {
          areaRef.current.style.left = pointPreX - 300 + 'px'
          areaRef.current.style.top = pointCurY + 'px'
          areaRef.current.style.width = boxCurWidth + 'px'
          areaRef.current.style.height = ~boxCurHeight + 'px'
          areaPosition = {
            leftTop: {
              x: pointPreX,
              y: pointCurY,
            },
            rightBottom: {
              x: pointPreX + boxCurWidth,
              y: pointCurY + ~boxCurHeight,
            },
          }
        } else if (boxCurWidth < 0 && boxCurHeight < 0) {
          areaRef.current.style.left = pointCurX - 300 + 'px'
          areaRef.current.style.top = pointCurY + 'px'
          areaRef.current.style.width = ~boxCurWidth + 'px'
          areaRef.current.style.height = ~boxCurHeight + 'px'
          areaPosition = {
            leftTop: {
              x: pointCurX,
              y: pointCurY,
            },
            rightBottom: {
              x: pointCurX + ~boxCurWidth,
              y: pointCurY + ~boxCurHeight,
            },
          }
        }
        // console.log('areaPosition', areaPosition)
        // console.log('chooseItemsPositions', chooseItemsPositions)
        const temp = []
        // console.log('areaPosition', areaPosition)
        // chooseItemsPositions.forEach(item => {
        //   if (
        //     (
        //       item.rightBottom.x > areaPosition.leftTop.x &&
        //       item.rightBottom.x < areaPosition.rightBottom.x &&
        //       item.rightBottom.y > areaPosition.leftTop.y &&
        //       item.rightBottom.y < areaPosition.rightBottom.y
        //     ) ||
        //     (
        //       item.leftTop.x > areaPosition.leftTop.x &&
        //       item.leftTop.x < areaPosition.rightBottom.x &&
        //       item.leftTop.y > areaPosition.leftTop.y &&
        //       item.leftTop.y < areaPosition.rightBottom.y
        //     ) ||
        //     (
        //       item.rightBottom.x > areaPosition.leftTop.x &&
        //       item.rightBottom.x < areaPosition.rightBottom.x &&
        //       item.leftTop.y > areaPosition.leftTop.y &&
        //       item.leftTop.y < areaPosition.rightBottom.y
        //     ) || (
        //     item.leftTop.x > areaPosition.leftTop.x &&
        //     item.leftTop.x < areaPosition.rightBottom.x &&
        //     item.rightBottom.y > areaPosition.leftTop.y &&
        //     item.rightBottom.y < areaPosition.rightBottom.y)) {
        //     temp.push(item.id)
        //   }
        // })
        selectedList.current = temp
      }
      document.onmouseup = () => {
        console.log('起开')
        // if (isMouseMove) {
        //   onChooseEnd(selectedList.current)
        // } else {
        //   selectedList.current = []
        //   onChooseEnd(selectedList.current, isMouseMove)
        // }
        document.onmousemove = null
        document.onmouseup = null
      }
    }
    return () => {
      document.onmousedown = null
      document.onmousemove = null
      document.onmouseup = null
    }
  }, [])
  return (
    <div
      ref={ areaRef }
      className="area"
      style={ {
        position: 'absolute',
        border: '1px dashed blue',
        background: '#eaf7ff',
        useSelect: 'none',
        opacity: 0.4,
        zIndex: 10000,
      } }>
    </div>
  )
}
export default ChooseArea
