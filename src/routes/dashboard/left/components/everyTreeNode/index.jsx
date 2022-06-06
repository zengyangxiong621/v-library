import React, { memo, useEffect, useRef, useState } from 'react'
import './index.less'
import { connect } from 'dva'

import { AutoComplete, Input } from 'antd'
import {
  EyeOutlined, EyeInvisibleOutlined
} from '@ant-design/icons'

const EveryTreeNode = ({ dispatch, bar, ...restProps }) => {
  const sendDispatch = (modelName, payload, type = 'bar',) => {
    dispatch({
      type: `${type}/${modelName}`,
      payload
    })
  }
  const { name, id, modules, getCurrentMenuLocation, isLock, singleShowLayer, showRenameInput, isShow, isExpand, hover } = restProps
  // 需要区分是单个图层还是文件夹
  const [isFolder] = useState(Array.isArray(modules) && modules.length > 0)
  // 文件夹是展开了还是关闭了
  const isFolderExpand = Array.isArray(isExpand) && isExpand.includes(id)
  // const [eyeIconShow, setEyeIconShow] =useState(true)
  // TODO delete
  const [inputValue, setInputValue] = useState(name)
  // 点击小眼睛图标切换状态
  const changeEyeIconState = (e) => {
    e.stopPropagation()
    dispatch({
      type: 'bar/hidden',
      payload: {
        dashboardId: bar.dashboardId,
        configs: [
          {
            id,
            key: 'isShow',
            value: !isShow
          }
        ]
      }
    })
  }
  // 通过右键菜单打开重命名框的时候，需要给input聚焦,否则无法触发失焦事件，会导致选择了其它节点后,input框不消失的问题
  useEffect(() => {
    inputRef.current.focus({
      cursor: 'all'
    })
  }, [showRenameInput])
  // 点击鼠标右键事件
  const mouseRightClick = (e) => {
    e.persist()
    e.preventDefault()
    getCurrentMenuLocation({
      x: e.clientX,
      y: e.clientY,
      id: name,
      isFolder,
    })
    // console.log('右键', e);
  }
  const inputRef = useRef()
  // 鼠标双击事件
  const dClick = (e) => {
    e.stopPropagation()
    sendDispatch('reName', { value: true })
    // 同步的话,无法实现聚焦效果
    setTimeout(() => {
      inputRef.current.focus({
        cursor: 'all'
      })
    }, 0);
  }
  // 修改图层或者分组名字
  const commonChangeContent = () => {
    // TODO 校验
    // 比如名字一样,不发请求
    if (inputValue === name) {
      return
    } else {
    }
    // 先对前端的树进行一次修改
    const saveId = JSON.parse(JSON.stringify(bar.key[0]))
    sendDispatch('changeName', {
      dashboardId: bar.dashboardId,
      configs: [
        {
          id: saveId,
          key: "name",
          value: inputValue
        }
      ]
    })
    // 应该是发送请求改名，这里先暂时这样写
  }
  // input失焦
  const oBlur = (e) => {
    e.stopPropagation()
    dispatch({
      type: 'bar/reName',
      payload: {
        value: false,
      }
    })
    commonChangeContent()
  }
  // 输入内容改变
  const oInputContent = (e) => {
    e.stopPropagation()
    setInputValue(e.target.value)
  }
  // 回车亦可改分组名
  const oPressEnter = (e) => {
    e.stopPropagation()
    setInputValue(e.target.value)
    inputRef.current.blur()
    dispatch({
      type: 'bar/reName',
      payload: {
        value: false,
      }
    })
  }

  //点击单独显示图标
  const singleShowLayerClick = (e) => {
    e.stopPropagation()
    dispatch({
      type: 'bar/singleShowLayer',
      payload: {
        keys: [id],
        singleShowLayer: !singleShowLayer
      }
    })
  }
  // 点击锁定图标
  const lockIconClick = (e) => {
    e.stopPropagation()
    dispatch({
      type: `bar/lock`,
      payload: {
        dashboardId: bar.dashboardId,
        configs: [{
          id,
          key: "isLock",
          value: !isLock
        }]
      }
    })
  }
  useEffect(() => {
  }, [])
  const isSelected = bar.key.includes(id)
  return (
    <div className={`EveryTreeNode-wrap
        ${hover && 'every-tree-node-hover'}
        ${isSelected && 'set-back-color'}
      `}
      onContextMenu={(e) => {
        mouseRightClick(e)
      }}>
      <div>
        {
          isFolder ?
            isFolderExpand ? <i style={{
              paddingLeft: '13px'
            }} className='iconfont icon-wenjianjia-zhankai set-margin set-icon-size' /> : <i style={{
              paddingLeft: '13px'
            }} className='iconfont icon-wenjianjiashouqi set-margin set-icon-size' />
            : <div className='frame set-margin'></div>
        }
      </div>
      <div className='title' onDoubleClick={(e) => dClick(e)}>
        <Input
          value={inputValue}
          size='small'
          ref={inputRef}
          style={{
            display: showRenameInput ? 'block' : 'none'
          }}
          onChange={(e) => oInputContent(e)}
          onPressEnter={(e) => oPressEnter(e)}
          onBlur={(e) => oBlur(e)}
        />
        <span className='left-tree-title-text' style={{
          display: showRenameInput ? 'none' : 'block'
        }}>{name}</span>
      </div>
      <div className='icons-wrap'>
        <span className='each-icon'>
          {
            isLock && <i className='iconfont icon-suoding' onClickCapture={(e) => lockIconClick(e)}></i>
          }
        </span>
        <div className={`${isShow && 'eyes-icon'} each-icon`} onClick={(e) => changeEyeIconState(e)}>
          {
            isShow ? <EyeOutlined /> : <EyeInvisibleOutlined />
          }
        </div>
        <span className='each-icon'>
          {
            singleShowLayer && <i className='iconfont icon-danduxianshi' onClickCapture={(e) => singleShowLayerClick(e)}></i>
          }
        </span>
      </div>
    </div>
  )
}

export default memo(
  connect(
    ({ bar }) => ({ bar })
  )(EveryTreeNode)
)
