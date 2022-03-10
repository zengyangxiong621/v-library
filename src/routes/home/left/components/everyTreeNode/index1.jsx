import React, { memo, useEffect, useRef, useState } from 'react'
import './index.css'
import { connect } from 'dva'

import { Input } from 'antd'
import {
  EyeOutlined , EyeInvisibleOutlined,
  LockOutlined, CoffeeOutlined, ChromeOutlined
} from '@ant-design/icons'

const EveryTreeNode = ({ dispatch, bar, ...restPorps}) => {
  const sendDispatch = (modelName, payload,type = 'bar',) => {
    dispatch({
      type: `${type}/${modelName}`,
      payload
    })
  }
  const { text, children, getCurrentMenuLocation, lock, singleShowLayer, showRenameInput, scan } = restPorps
  // 需要区分是单个图层还是文件夹
  const [isFolder] = useState(!!children)
  // const [eyeIconShow, setEyeIconShow] =useState(true)
  // TODO delete
  const [ inputValue, setInputValue ] = useState(text)
  // 点击小眼睛图标切换状态
  const changeEyeIconState = (e) => {
    e.stopPropagation()
    dispatch({
      type: 'bar/hidden',
      payload: {
        key: [text],
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
      id: text,
      isFolder,
    })
    // console.log('右键', e);
  }
  const inputRef = useRef()
  // 鼠标双击事件
  const dClick = (e) => {
    e.stopPropagation()
    sendDispatch('reName', {value: true})
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
    console.log('text', text);
    if(inputValue === text) {
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


  return (
    <div className='EveryTreeNode-wrap' onContextMenu={(e) => {
    mouseRightClick(e)
  }}>
    {
      isFolder ? <CoffeeOutlined /> : <div>图片</div>
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
          display: showRenameInput ?  'none': 'block'
        }}>{ text }</span>
    </div>
    <div className='icons-wrap'>
      <span className='each-icon'>
      {
        lock && <LockOutlined />
      }
      </span>
      <div className={`${ scan && 'eyes-icon'} each-icon`} onClick={(e) => changeEyeIconState(e)}>
        {
          scan ? <EyeOutlined /> : <EyeInvisibleOutlined />
        }
      </div>
      <span className='each-icon'>
      {
        singleShowLayer && <ChromeOutlined />
      }
      </span>
    </div>
  </div>
  )
}

export default memo(
  connect(
    ({bar}) => ({bar})
  )(EveryTreeNode)
)