import React, { memo, useEffect, useRef, useState } from 'react'
import './index.css'
import { connect } from 'dva'

import { Input } from 'antd'
import {
  EyeOutlined , EyeInvisibleOutlined,
  LockOutlined, UnlockOutlined,
  HeatMapOutlined
} from '@ant-design/icons'


const EveryTreeNode = ({ bar, ...restPorps}) => {
  const { text, children, getCurrentMenuLocation, lock } = restPorps
  // 需要区分是单个图层还是文件夹
  const [isFolder] = useState(!!children)
  const [eyeIconShow, setEyeIconShow] =useState(true)
  // TODO delete
  const [ inputValue, setInputValue ] = useState(text)
  // 点击小眼睛图标切换状态
  const changeEyeIconState = (e) => {
    e.stopPropagation()
    setEyeIconShow(!eyeIconShow)
  }

  // 点击鼠标右键事件
  const mouseRightClick = (e) => {
    e.persist()
    e.preventDefault()
    getCurrentMenuLocation({
      x: e.clientX,
      y: e.clientY,
      id: text,
      isFolder,
    })
    // console.log('右键', e);
  }
  // 鼠标双击事件
  const [ showInput, setShowInput ] = useState(false)
  const inputRef = useRef(null)
  const dClick = async(e) => {
    e.stopPropagation()
    await setShowInput(true)
    inputRef.current.focus({
      cursor: 'all',
    })
  }
  // 修改图层或者分组名字
  const commonChangeContent = () => {
    // TODO 校验
    // 比如名字一样,不发请求
    console.log('text', text);
    if(inputValue === text) {
      console.log('相等的啊');
      return
    } else {
      console.log('不相等，可以更改');
    }
    // 应该是发送请求改名，这里先暂时这样写
  }
  // input失焦
  const oBlur = () => {
    setShowInput(false)
    commonChangeContent()
  }
  const oFocus = () => {
    console.log('聚焦');
  }
  // 输入内容改变
  const oInputContent = (e) => {
    setInputValue(e.target.value)
  }
  // 回车亦可改分组名
  const oPressEnter = (e) => {
    setInputValue(e.target.value)
    inputRef.current.blur()
  }



  return (
    <div className='EveryTreeNode-wrap' onContextMenu={(e) => {
    mouseRightClick(e)
  }}>
    <div>图片</div>
    <div className='title' onDoubleClick={(e) => dClick(e)}>
      {
        showInput
        ?
        <Input
          value={inputValue}
          size='small'
          ref={inputRef}
          onChange={(e) => oInputContent(e)}
          onPressEnter={(e) => oPressEnter(e)}
          onFocus={() => oFocus()}
          onBlur={() => oBlur()}
        />
        : <span>{ text }</span>
      }
    </div>
    <div className='icon-wrap'>
      <div className='eyes-icon' onClick={(e) => changeEyeIconState(e)}>
        {
          eyeIconShow ? <EyeOutlined /> : <EyeInvisibleOutlined />
        }
      </div>
    </div>
    <div className='lock-icon'>
      {
        lock && <LockOutlined />
      }
    </div>
  </div>
  )
}

export default memo(
  connect(
    ({bar}) => ({bar})
  )(EveryTreeNode)
)