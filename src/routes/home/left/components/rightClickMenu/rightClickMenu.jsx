import React, { memo, useEffect, useRef, useState } from 'react'
import './rightClickMenu.css'

import {
  getFieldStates,
} from "../../../../../utils/sideBar";

import { connect } from 'dva'
import * as Icons from '@ant-design/icons'

const RightClickMenu = ({dispatch, bar, operate, menuInfo, menuOptions, hideMenu}) => {
  const [isLock, setIsLock] = useState(false)
  const [isSingleShow, setIsSingleShow] = useState(false)
  // 每次渲染右侧菜单，都需要确定此次是锁定还是解锁
  useEffect(() => {
    // 判断所选中的各个节点是否是lock状态
    const lockInfo = getFieldStates(bar.treeData, bar.key, 'lock')
    const finalLockState = lockInfo.some(item => item===false)
    setIsLock(!finalLockState)
    // 判断所选中的各个节点是否是单独显示状态
    const singleShowLayerInfo = getFieldStates(bar.treeData, bar.key, 'singleShowLayer')
    const singleShowLayerState = singleShowLayerInfo.some(item => item === false)
    setIsSingleShow(!singleShowLayerState)
    console.log('singleShowLayerInfo', singleShowLayerInfo);
  }, [bar.treeData, bar.key])

  // 后端返回的数据里应该有 show、lock 属性
  // 这里需要拿到 所选中 的treeNode中的lock或者show属性
  const menuItemClick = (e,operateName) => {
    e.stopPropagation()
    // 先在前端改变锁定状态，再根据请求的结果来判断是否锁定成功
    // TODO 发送请求
    const customPayload = {
        key: bar.key,
    }
    switch (operateName) {
      case 'lock':
        customPayload.locked = !isLock
        break;
      case 'singleShowLayer':
        customPayload.singleShowLayer = !isSingleShow
        break;
      case 'reName':
        customPayload.newName = 'abc'
        customPayload.value = true
        break;
      default:
        break;
    }
    dispatch({
      type: `bar/${operateName}`,
      payload: customPayload
    })
    // setIsLock(!isLock)
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
            onClick={(e) => menuItemClick(e, item.key)}
            >
              { ((isLock || isSingleShow) && item.anotherIcon) ? React.createElement(Icons[item.anotherIcon]) : React.createElement(Icons[item.icon]) }
              <li className='menu-item-li'>
                {
                  ((isLock || isSingleShow) && item.anotherName) ? item.anotherName : item.name
                }</li>
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