import React, { memo, useEffect, useRef, useState } from 'react'
import './index.less'
import { connect } from 'dva'

import { Input } from 'antd'
import {
  EyeOutlined , EyeInvisibleOutlined,
  LockOutlined, CoffeeOutlined, ChromeOutlined
} from '@ant-design/icons'

class EveryTreeNode extends React.Component {
  constructor(props) {
    super(props)
    // const {
    //   // dispatch, bar,
    //   // text, components,
    //   //  getCurrentMenuLocation, lock, singleShowLayer, showRenameInput, scan
    //    } = props
    this.state = {
      isFolder: !!this.props.components,
      inputValue: this.props.text,
    }
    this.inputRef = React.createRef()
  }

  componentDidMount() {
    console.log('abc', this.inputRef);
  }
  sendDispatch(modelName, payload,type = 'bar') {
    this.props.dispatch({
      type: `${type}/${modelName}`,
      payload
    })
  }
  // 点击小眼睛图标切换状态
  changeEyeIconState(e) {
    e.stopPropagation()
    this.props.dispatch({
      type: 'bar/hidden',
      payload: {
        key: [this.state.text],
        value: !this.props.scan
      }
    })
  }

  // 点击鼠标右键事件
  mouseRightClick(e) {
    e.persist()
    e.preventDefault()
    this.props.getCurrentMenuLocation({
      x: e.clientX,
      y: e.clientY,
      id: this.state.text,
      isFolder: this.state.isFolder,
    })
    // console.log('右键', e);
  }
  // 鼠标双击事件
  dClick(e){
    e.stopPropagation()
    this.sendDispatch('reName', {value: true})
    this.inputRef.current.onFocus({
      cursor: 'all',
    })
  }
  // 修改图层或者分组名字
  commonChangeContent() {
    // TODO 校验
    // 比如名字一样,不发请求
    console.log('text', this.text);
    if(this.state.inputValue === this.text) {
      console.log('相等的啊');
      return
    } else {
      console.log('不相等，可以更改');
    }
    // 先对前端的树进行一次修改
    this.sendDispatch('changeName', {
      key: this.props.bar.key,
      newName: this.state.inputValue,
    })
    // 应该是发送请求改名，这里先暂时这样写
  }
  // input失焦
  oBlur = (e) => {
    e.stopPropagation()
    this.props.dispatch({
      type: 'bar/reName',
      payload: {
        value: false,
      }
    })
    this.commonChangeContent()
  }
  oFocus = (e) => {
    e.stopPropagation()
    console.log('input', this.inputRef);
    console.log('聚焦');
  }
  // 输入内容改变
  oInputContent = (e) => {
    e.stopPropagation()
    this.setState({
      inputValue: e.target.value
    })
  }
  // 回车亦可改分组名
  oPressEnter = (e) => {
    e.stopPropagation()
    this.setState({
      inputValue: e.target.value
    })
    this.props.dispatch({
      type: 'bar/reName',
      payload: {
        value: false,
      }
    })
  }
  render() {
    return (
      <div className='EveryTreeNode-wrap' onContextMenu={(e) => {
      this.mouseRightClick(e)
    }}>
      {
        this.state.isFolder ? <CoffeeOutlined /> : <div>图片</div>
      }
      <div className='title' onDoubleClick={(e) => this.dClick(e)}>
          <Input
            value={this.state.inputValue}
            size='small'
            style={{
              display: this.props.showRenameInput ? 'block' : 'none'
            }}
            ref={this.inputRef}
            onChange={(e) => this.oInputContent(e)}
            onPressEnter={(e) => this.oPressEnter(e)}
            onClickCapture={(e) => this.oFocus(e)}
            onFocus={(e) => this.oFocus(e)}
            onBlur={(e) => this.oBlur(e)}
          />
          <span style={{
              display: this.props.showRenameInput ? 'none' : 'block'
            }}>{ this.props.text }</span>
      </div>
      <div className='icons-wrap'>
        <span className='each-icon'>
        {
          this.props.lock && <LockOutlined />
        }
        </span>
        <div className={`${ this.props.scan && 'eyes-icon'} each-icon`} onClick={(e) => this.changeEyeIconState(e)}>
          {
            this.scan ? <EyeOutlined /> : <EyeInvisibleOutlined />
          }
        </div>
        <span className='each-icon'>
        {
          this.props.singleShowLayer && <ChromeOutlined />
        }
        </span>
      </div>
    </div>
    )
  }
}


export default memo(
  connect(
    ({bar}) => ({bar})
  )(EveryTreeNode)
)
