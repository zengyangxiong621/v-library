import React, { memo, useEffect, useRef, useState } from 'react'
import './index.less'
import { connect } from 'dva'

import { IconFont } from '../../../../utils/useIcon'

import { Input } from 'antd'

const EveryTreeNode = (props: any) => {
  const { groupId, name, number, systemDefined, addGroup } = props || {}
  // const [eyeIconShow, setEyeIconShow] =useState(true)
  // TODO delete
  const [inputValue, setInputValue] = useState('')
  const [showRenameInput, setShowRenameInput] = useState(false)

  const inputRef = useRef<any>()
  useEffect(() => {
    inputRef.current?.focus({
      cursor: 'all'
    })
  }, [showRenameInput])
  // 修改分组名字
  const commonChangeContent = () => {
    // TODO 校验
    // 比如名字一样,不发请求
    // if (inputValue === '') {
    //   console.log('相等的啊');
    //   return
    // } else {
    //   console.log('不相等，可以更改');
    // }
    setShowRenameInput(false)
  }
  // input失焦
  const oBlur = (e: any) => {
    e.stopPropagation()
    commonChangeContent()
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
  // const addGroups = () => {
  //   console.log('点击到了添加应用分组图标');
  // }
  // 点击编辑图标
  const editClick = (id: string | number) => {
    console.log('点到了编辑图标');
    setShowRenameInput(true)
    setInputValue(name)
  }
  // 点击删除图标
  const delClick = (id: string | number) => {
    console.log('点到了删除图标');
  }
  return (
    <div className={`node-wrap`}>
      <div className='title'>
        {
          showRenameInput
            ?
            <Input
              style={{ width: '120px' }}
              value={inputValue}
              ref={inputRef}
              onChange={(e) => oInputContent(e)}
              onPressEnter={(e) => oPressEnter(e)}
              onBlur={(e) => oBlur(e)}
            />
            : <>{name}</>
        }
      </div>
      <div className='icons-wrap'>
        {
          name === '应用列表'
            ? <IconFont type='icon-xinjianfenzu' onClickCapture={addGroup} />
            :
            (name === '全部应用' || name === '未分组')
              ? <>{number}</>
              :
              <>
                <div className='show-icon'>
                  {
                    <IconFont type='icon-bianji' style={{ marginRight: '16px' }} onClickCapture={() => editClick(groupId)} />
                  }
                  {
                    <IconFont type='icon-shanchuzu' onClickCapture={() => delClick(groupId)} />
                  }
                </div>
                <span className='show-nums'>{number}</span>
              </>
        }
      </div>
    </div>
  )
}

export default memo(
  EveryTreeNode
)