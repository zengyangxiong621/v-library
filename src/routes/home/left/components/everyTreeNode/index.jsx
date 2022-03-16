import React, { memo, useEffect, useRef, useState } from 'react'
import './index.less'
import { connect } from 'dva'

import { Input } from 'antd'
import {
  EyeOutlined, EyeInvisibleOutlined
} from '@ant-design/icons'

const EveryTreeNode = ({ dispatch, bar, ...restPorps }) => {
  const sendDispatch = (modelName, payload, type = 'bar',) => {
    dispatch({
      type: `${type}/${modelName}`,
      payload
    })
  }
  const { name, id, children, getCurrentMenuLocation, lock, singleShowLayer, showRenameInput, scan, isExpand, hover } = restPorps
  // 需要区分是单个图层还是文件夹
  const [isFolder] = useState(!!children)
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
        key: [name],
        value: !scan
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
    console.log('name', name);
    if (inputValue === name) {
      console.log('相等的啊');
      return
    } else {
      console.log('不相等，可以更改');
    }
    // 先对前端的树进行一次修改
    sendDispatch('changeName', {
      key: bar.key,
      newName: inputValue,
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
  const oFocus = (e) => {
    e.stopPropagation()
    // inputRef.current.focus({
    //   cursor: 'all',
    // })
    console.log('聚焦');
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
        key: [name],
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
        value: !lock
      }
    })
  }
  return (
    <div className={`EveryTreeNode-wrap ${hover && 'every-tree-node-hover'}`} onContextMenu={(e) => {
      mouseRightClick(e)
    }}>
      {
        isFolder ?
          isFolderExpand ? <i className='iconfont icon-wenjianjia-zhankai set-margin' /> : <i className='iconfont icon-wenjianjiashouqi set-margin set-icon-size' />
          : <div className='frame set-margin'></div>
      }
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
          onClickCapture={(e) => oFocus(e)}
          // onFocus={(e) => oFocus(e)}
          onBlur={(e) => oBlur(e)}
        />
        <span style={{
          display: showRenameInput ? 'none' : 'block'
        }}>{name}</span>
      </div>
      <div className='icons-wrap'>
        <span className='each-icon'>
          {
            lock && <i className='iconfont icon-suoding' onClickCapture={(e) => lockIconClick(e)}></i>
          }
        </span>
        <div className={`${scan && 'eyes-icon'} each-icon`} onClick={(e) => changeEyeIconState(e)}>
          {
            scan ? <EyeOutlined /> : <EyeInvisibleOutlined />
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