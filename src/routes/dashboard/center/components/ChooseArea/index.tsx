import { useEffect, useRef, useState } from 'react'
import { connect } from 'dva'
import * as React from 'react'
import { throttle } from '../../../../../utils'

type Event = React.MouseEvent<HTMLElement | SVGElement>
  | React.TouchEvent<HTMLElement | SVGElement>
  | MouseEvent
  | TouchEvent

const ChooseArea = ({ onChooseEnd, chooseItemClass, bar, dispatch, ...props }: any) => {
  const areaRef: any = useRef(null)
  const [ selectedItem, setSelectedItem ] = useState([])
  const selectedList: any = useRef([])

  const onChooseStart = (e: any) => {

  }
  const onChoose = () => {

  }

  useEffect(() => {
    document.onmousedown = (e: any) => {
      const dom: any = (e.target as any) || null
      let temp = false
      let awayList = [ 'c-canvas', 'draggable-wrapper', 'canvas-draggable' ]
      awayList.forEach(className => {
        if (dom && dom.className && Object.prototype.toString.call(dom.className) === '[object String]' && dom.className?.indexOf(className) !== -1) {
          temp = true
        }
      })
      if(!temp) {
        return
      }
      const reactDraggableDomList: any = document.querySelectorAll('.draggable-container>.c-custom-draggable>.react-draggable')
      const reactDraggableDomPosition = [ ...reactDraggableDomList ].map(item => {
        const domInfo = item.getBoundingClientRect()
        return {
          id: item.dataset.id.indexOf('group-') !== -1 ? item.dataset.id : item.dataset.id.indexOf('panel-') !== - 1 ? item.dataset.id.replace('panel-', '')  : item.dataset.id.replace('component-', ''),
          x: Math.ceil(domInfo.x),
          y: Math.ceil(domInfo.y),
          width: Math.ceil(domInfo.width),
          height: Math.ceil(domInfo.height),
        }
      })
      /*
        初始化
       */
      hide()
      const pointPreX = e.clientX
      const pointPreY = e.clientY
      const boxPreWidth = areaRef.current.offsetWidth
      const boxPreHeight = areaRef.current.offsetHeight
      let isMouseMove = false
      selectedList.current = []
      let areaPosition: {
        [key: string]: number
      } = {}
      document.onmousemove = (ev: Event) => {
        // 移动的时候让选区显示出来
        e.preventDefault()
        isMouseMove = true
        areaRef.current.style.display = 'block'
        // 取选区 div 的左上角、右下角坐标

        // const pointCurX = ev.clientX
        // const pointCurY = ev.clientY
        if(!('clientX' in ev && 'clientY' in ev)) {
          return
        }
        const pointCurY = ev.clientY
        const pointCurX = ev.clientX
        const boxCurWidth = (pointCurX - pointPreX) // 当前盒子的大小
        const boxCurHeight = (pointCurY - pointPreY)
        if(boxCurWidth >= 0 && boxCurHeight >= 0) {
          areaRef.current.style.left = pointPreX + 'px'
          areaRef.current.style.top = pointPreY + 'px'
          areaRef.current.style.width = boxCurWidth + 'px'
          areaRef.current.style.height = boxCurHeight + 'px'
          areaPosition = {
            x: pointPreX,
            y: pointPreY,
            width: boxCurWidth,
            height: boxCurHeight,
          }
        } else if(boxCurWidth < 0 && boxCurHeight > 0) {
          areaRef.current.style.left = pointCurX + 'px'
          areaRef.current.style.top = pointPreY + 'px'
          areaRef.current.style.width = ~boxCurWidth + 'px'
          areaRef.current.style.height = boxCurHeight + 'px'
          areaPosition = {
            x: pointCurX,
            y: pointPreY,
            width: ~boxCurWidth,
            height: boxCurHeight,
          }
        } else if(boxCurWidth > 0 && boxCurHeight < 0) {
          areaRef.current.style.left = pointPreX + 'px'
          areaRef.current.style.top = pointCurY + 'px'
          areaRef.current.style.width = boxCurWidth + 'px'
          areaRef.current.style.height = ~boxCurHeight + 'px'
          areaPosition = {
            x: pointPreX,
            y: pointCurY,
            width: boxCurWidth,
            height: ~boxCurHeight,
          }
        } else if(boxCurWidth < 0 && boxCurHeight < 0) {
          areaRef.current.style.left = pointCurX + 'px'
          areaRef.current.style.top = pointCurY + 'px'
          areaRef.current.style.width = ~boxCurWidth + 'px'
          areaRef.current.style.height = ~boxCurHeight + 'px'
          areaPosition = {
            x: pointCurX,
            y: pointCurY,
            width: ~boxCurWidth,
            height: ~boxCurHeight,
          }
        }


      }
      document.onmouseup = (e) => {
        hide()
        const selectedIds: Array<string> = []
        let b1 = areaPosition.y + areaPosition.height
        let r1 = areaPosition.x + areaPosition.width
        if(Object.keys(areaPosition).length > 0) {
          reactDraggableDomPosition.forEach((item) => {
            let b2 = item.y + item.height
            let r2 = item.x + item.width
            if(!(b1 < item.y || areaPosition.y > b2 || r1 < item.x || areaPosition.x > r2)) {
              selectedIds.push(item.id)
            }
          })
          if(selectedIds.length > 0) {
            console.log('selectedIds', selectedIds)
            dispatch({
              type: 'bar/chooseLayer',
              payload: selectedIds,
            })

          }
        }
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
  const hide = () => {
    areaRef.current.style.width = 0 + 'px'
    areaRef.current.style.height = 0 + 'px'
    areaRef.current.style.display = 'none'
  }
  return (
    <div
      ref={ areaRef }
      className="area"
      style={ {
        position: 'absolute',
        border: '1px dashed blue',
        background: 'rgb(98 170 234)',
        userSelect: 'none',
        opacity: 0.4,
        zIndex: 10000,
      } }>
    </div>
  )
}
export default connect(({ bar }: any) => ({
  bar,
}))(ChooseArea)
