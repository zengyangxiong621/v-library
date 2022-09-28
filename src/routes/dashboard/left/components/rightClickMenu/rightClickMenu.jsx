import React, { memo, useEffect, useRef, useState } from 'react'
import './rightClickMenu.less'

import {
  getFieldStates,
} from "../../../../../utils/sideBar";
import { IconFont } from '../../../../../utils/useIcon'
import SecondMenu from './secondMenu'

import { connect } from 'dva'
import * as Icons from '@ant-design/icons'
const RightClickMenu = ({ dispatch, bar, operate, menuOptions, hideMenu }) => {
  const [isLock, setIsLock] = useState(false)
  const [isSingleShow, setIsSingleShow] = useState(false)
  const [isShowOrHidden, setIsShowOrHidden] = useState(true)
  // 每次渲染右侧菜单，都需要确定此次是锁定还是解锁
  useEffect(() => {
    // 判断所选中的各个节点是否是lock状态
    const lockInfo = getFieldStates(bar.treeData, bar.key, 'isLock')
    const finalLockState = lockInfo.some(item => item === false)
    setIsLock(!finalLockState)

    // 判断所选中的各个节点是否是单独显示状态
    const singleShowLayerInfo = getFieldStates(bar.treeData, bar.key, 'singleShowLayer')
    const singleShowLayerState = singleShowLayerInfo.some(item => item === false)
    setIsSingleShow(!singleShowLayerState)

    // 判断所选中的各个节点是否是显示状态
    // 只要有一个隐藏了就显示
    const showOrHiddenInfo = getFieldStates(bar.treeData, bar.key, 'isShow')
    const showOrHiddenState = showOrHiddenInfo.some(item => item === false)
    setIsShowOrHidden(!showOrHiddenState)
  }, [bar.treeData, bar.key])

  // 后端返回的数据里应该有 show、lock 属性
  // 这里需要拿到 所选中 的treeNode中的lock或者show属性
  const menuItemClick = (e, operateName) => {
    e.stopPropagation()
    // 先在前端改变锁定状态，再根据请求的结果来判断是否锁定成功
    // TODO 发送请求
    let customPayload = {
      // key: bar.key,
      dashboardId: bar.dashboardId,
    }
    // 如果是动态面板里,这时候的dashboardId应该改为状态id
    if(bar.isPanel) {
      customPayload.dashboardId = bar.stateId
    }
    switch (operateName) {
      case 'lock':
        const finalBody = bar.key.map(item => ({
          id: item,
          key: "isLock",
          value: !isLock
        }))
        customPayload.configs = finalBody
        break;
      case 'singleShowLayer':
        customPayload.keys = bar.key
        customPayload.singleShowLayer = !isSingleShow
        break;
      case 'reName':
        // customPayload.newName = 'abc'
        customPayload.value = true
        break;
      case 'hidden':
        const finalHiddenConfigs = bar.key.map(item => ({
          id: item,
          key: "isShow",
          value: !isShowOrHidden
        }))
        customPayload.configs = finalHiddenConfigs
        break;
      case 'delete':
        const l = bar.key?.map(item => ({
          id: item,
          children: []
        }))
        customPayload.layers = l
        break;
      case 'copy':
        customPayload = {
          dashboardId: bar.stateId || bar.dashboardId,
          children: [],
          targetDashboardId: bar.dashboardId,
          insertId: bar.key[0],
          originLayers: bar.treeData,
          //TODO 改为modules后删除掉这行
          components: [...bar.key],
          // components: [...bar.key],
          panels: [],
          selected: [...bar.key]
        }
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
  const { x, y } = bar.rightMenuInfo
  // console.log('x y id isFolders', x, y, id, isFolder);
  const menuRef = useRef(null)
  useEffect(() => {
    // 在光标与菜单之间加点距离，方便用户点击
    let recalculateX = x
    let recalculateY = y
    // 因为右侧菜单第一次渲染，因为首次渲染的元素在Tree的最底部，所以有一个默认的offsetTop（这里打印出来是521）
    // so,这里需要将鼠标的y轴坐标作为offsetTop
    const visualHeight = document.body.clientHeight
    const menuHeight = menuRef.current.clientHeight
    // 如果offsetTop + 元素本身高度 > 浏览器可视区域高度，将菜单上移
    const isOverflowAtUnder = menuHeight + recalculateY > visualHeight
    if (isOverflowAtUnder) {
      const a = menuHeight + recalculateY - visualHeight
      recalculateY = y - (menuHeight + recalculateY - visualHeight) - 20
    }
    menuRef.current.style.position = 'fixed'
    menuRef.current.style.top = `${recalculateY}px`
    menuRef.current.style.left = `${recalculateX}px`
  }, [x, y])
  return (
    <div className='RightClickMenu-wrap' ref={menuRef}>
      {
        menuOptions.map((item, index) => {
          const hasLevel = item.children && item.children.length && Array.isArray(item.children)
          return (
            <div
              key={index}
              className={
                `menu-item
            ${item.disabled && 'disabled-menu-item'}
            ${hasLevel && 'li-hover'}`
              }
              onClick={(e) => menuItemClick(e, item.key)}
            >
              {
                // TODO 目前是三种双重状态，如果后续双重状态的选项太多,再封装一个组件
                (item.key === 'lock' && isLock) ||
                  (item.key === 'singleShowLayer' && isSingleShow) ||
                  (item.key === 'hidden' && !isShowOrHidden)
                  ? <IconFont style={{ fontSize: '10px' }} type={`icon-${item.anotherIcon}`} />
                  : <IconFont style={{ fontSize: '10px' }} type={`icon-${item.icon}`} />
              }
              <li className={`menu-item-li`}>
                {
                  (item.key === 'lock' && isLock) ||
                    (item.key === 'singleShowLayer' && isSingleShow) ||
                    (item.key === 'hidden' && !isShowOrHidden)
                    ? item.anotherName
                    : item.name
                }
                {
                  hasLevel && <SecondMenu data={item.children} />
                }
              </li>
              {/* 右三角图标 */}
              {
                hasLevel && <span className='right-icon'>
                  {
                    React.createElement(Icons.CaretRightOutlined)
                  }</span>
              }
            </div>
          )
        })
      }
    </div>
  )
}

export default memo(connect(
  ({ bar, operate }) => ({ bar, operate })
)(RightClickMenu))
