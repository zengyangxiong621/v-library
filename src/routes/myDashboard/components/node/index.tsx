import React, { memo, useEffect, useRef, useState } from 'react'
import './index.less'
import { connect } from 'dva'

import { IconFont } from '../../../../utils/useIcon'

import { Input } from 'antd'
import {
  EyeOutlined, EyeInvisibleOutlined
} from '@ant-design/icons'
import { tuple } from 'antd/lib/_util/type'

const EveryTreeNode = (props: any) => {
  const { title, counts, id } = props || {}
  // const [eyeIconShow, setEyeIconShow] =useState(true)
  // TODO delete
  const [inputValue, setInputValue] = useState('')
  const [showRenameInput, setShowRenameInput] = useState(false)
  // 通过右键菜单打开重命名框的时候，需要给input聚焦,否则无法触发失焦事件，会导致选择了其它节点后,input框不消失的问题
  useEffect(() => {
    inputRef.current.focus({
      cursor: 'all'
    })
  }, [])
  const inputRef = useRef<any>()
  // 鼠标双击事件
  const dClick = (e: any) => {
    e.stopPropagation()
    setShowRenameInput(true)
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
    if (inputValue === '') {
      console.log('相等的啊');
      return
    } else {
      console.log('不相等，可以更改');
    }
  }
  // input失焦
  const oBlur = (e: any) => {
    e.stopPropagation()
    commonChangeContent()
  }
  const oFocus = (e: any) => {
    e.stopPropagation()
    // inputRef.current.focus({
    //   cursor: 'all',
    // })
    console.log('聚焦');
  }
  // 输入内容改变
  const oInputContent = (e: any) => {
    e.stopPropagation()
    setInputValue(e.target.value)
  }
  // 回车亦可改分组名
  const oPressEnter = (e: any) => {
    e.stopPropagation()
    setInputValue(e.target.value)
    inputRef.current.blur()
  }
  // 添加新的应用分组
  const addGroups = () => {
    console.log('点击到了添加应用分组图标');
  }
  // 点击编辑图标
  const editClick = (id: string | number) => {
    console.log('点到了编辑图标');
  }
  // 点击删除图标
  const delClick = (id: string | number) => {
    console.log('点到了删除图标');
  }
  return (
    <div className={`node-wrap`}>
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
        <span className='title-text' style={{
          display: showRenameInput ? 'none' : 'block'
        }}>{title}</span>
      </div>
      <div className='icons-wrap'>
        {
          title === '应用列表' ? <IconFont type='icon-bianji' onClickCapture={() => addGroups()} />
            :
            <>
              <div className='show-icon'>
                {
                  <IconFont type='icon-bianji' style={{ marginRight: '16px' }} onClickCapture={() => editClick(id)} />
                }
                {
                  <IconFont type='icon-bianji' onClickCapture={() => delClick(id)} />
                }
              </div>
              <span className='show-nums'>{counts}</span>
            </>
        }
      </div>
    </div>
  )
}

export default memo(
  EveryTreeNode
)