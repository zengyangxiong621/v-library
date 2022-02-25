import React, { memo, useEffect, useRef, useState } from 'react'
import './rightClickMenu.css'

import { connect } from 'dva'
import * as Icons from '@ant-design/icons'

const RightClickMenu = ({dispatch, bar, operate, menuInfo, menuOptions, hideMenu}) => {

  const generateIcon = (name) => (
    React.createElement(Icons[name], {
      style: {
      }
    })
  )
  const [isLock, setIsLock] = useState(operate.operateValue)
  // useEffect(() => {
  //   setIsLock(operate.operateValue)
  // }, [operate.operateValue])

  // 后端返回的数据里应该有 show、lock 属性
  // 这里需要拿到 所选中 的treeNode中的lock或者show属性
  const menuItemClick = (e,operateName) => {
    e.stopPropagation()
    dispatch({
      type: 'operate/selectOperate',
      payload: {
        operateKey: operateName,
        operateValue: !isLock,
        ids: bar.key
      }
    })
    setIsLock(!isLock)
    // 点击后隐藏菜单
    hideMenu()
  }
  const { x, y, id, isFolder } = menuInfo
  // console.log('x y id isFolders', x, y, id, isFolder);
  const menuRef = useRef(null)
  useEffect(() => {
    // 在光标与菜单之间加点距离，方便用户点击
    let recalculateX = x + 30
    let recalculateY = y
    // 因为右侧菜单第一次渲染，因为首次渲染的元素在Tree的最底部，所以有一个默认的offsetTop（这里打印出来是521）
    // so,这里需要将鼠标的y轴坐标作为offsetTop
    const visualHeight = document.body.clientHeight
    const top = recalculateY
    const menuHeight = menuRef.current.clientHeight
    // 如果offsetTop + 元素本身高度 > 浏览器可视区域高度，将菜单上移
    // const isOverflow = visualHeight - top > menuHeight
    const isOverflow = menuHeight + top > visualHeight
    if(isOverflow) {
      recalculateY = y - menuHeight
    }
    menuRef.current.style.position = 'fixed'
    menuRef.current.style.top = `${recalculateY}px`
    menuRef.current.style.left = `${recalculateX}px`
  }, [x, y])
  return (
  <div className='RightClickMenu-wrap' ref={menuRef}>
      {
        menuOptions.map((item, index) => {
          return (
            <div
            key={index}
            className={`menu-item ${item.disabled ? 'disabled-menu-item' : ''}`}
            onClick={(e) => menuItemClick(e, item.name)}
            >
              { isLock && item.anotherIcon ? generateIcon(item.anotherIcon) : generateIcon(item.icon) }
              <li className='menu-item-li'>{ (isLock && item.anotherName) ? item.anotherName : item.name}</li>
            </div>
          )
        })
      }
  </div>
  )
}

export default memo(connect(
  ({bar, operate}) => ({bar, operate})
)(RightClickMenu))