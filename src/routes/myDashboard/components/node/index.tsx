/* eslint-disable react-hooks/rules-of-hooks */
import React, { memo, useEffect, useRef, useState } from 'react'
import './index.less'
import { connect } from 'dva'

import { useFetch } from '../../../../utils/useFetch'

import { IconFont } from '../../../../utils/useIcon'
import { Input, message } from 'antd'

const EveryTreeNode = (props: any) => {
  const { groupId, name, number, systemDefined,
    addGroup,
    refreshGroupLists } = props || {}
  const inputRef = useRef<any>()
  // 点击已有分组时 显现的输入框
  const [inputValue, setInputValue] = useState('')
  const [showRenameInput, setShowRenameInput] = useState(false)

  // 点击新建分组时 记录最终输入框的值
  const [newGroupName, setNewGroupName] = useState('')
  useEffect(() => {
    inputRef.current?.focus({
      cursor: 'all'
    })
  }, [showRenameInput])

  /** ** 新建分组****** */
  const createGroup = async () => {
    // 前端校验一遍
    //比如名字一样,不发请求
    if (newGroupName === '') {
      message.warning({ content: '分组名不能为空', duration: 2 })
      addGroup()
      return
    }
    const finalBody = {
      spaceId: '1',
      name: newGroupName
    }
    const [, data] = await useFetch('/visual/application/addGroup', {
      body: JSON.stringify(finalBody)
    })
    // 创建成功，改变父组件传入的变量通知父组件重新获取最新分组列表
    if (data) refreshGroupLists()
  }
  const createInputChange = (e: any) => {
    setNewGroupName(e.target.value)
  }
  const createInputFocus = (e: any) => {
    console.log('eeee', e);
  }

  /** ** 编辑分组****** */
  // 修改分组名字
  const updateGroupName = async (e: any) => {
    e.stopPropagation()
    // TODO 校验
    // 比如名字一样,不发请求
    if (inputValue === '') {
      // message.warning({ content: '分组名不能为空', duration: 2 })
      setShowRenameInput(false)
      return
    } else if (inputValue === name) {
      // message.warning({ content: '新旧分组名不能相同', duration: 2 })
      setShowRenameInput(false)
      return
    }
    const finalBody = {
      id: groupId,
      name: inputValue,
      spaceId: 1
    }
    const [, data] = await useFetch('/visual/application/updateGroup', {
      body: JSON.stringify(finalBody)
    })
    if (data) {
      inputRef.current.blur()
      refreshGroupLists()
      setShowRenameInput(false)
    }
  }
  // 输入内容改变
  const oInputContent = (e: any) => {
    e.stopPropagation()
    setInputValue(e.target.value)
  }
  // 点击编辑图标
  const editClick = (e: any, id: string | number) => {
    e.stopPropagation()
    setShowRenameInput(true)
    setInputValue(name)
  }
  // 点击删除图标
  const delClick = async (id: string | number) => {
    const [, data] = await useFetch(`/visual/application/deleteGroup?groupId=${id}`, {
      method: 'delete'
    })
    data && refreshGroupLists()
  }
  const inputWrapClick = (e: any) => {
    // e.stopPropagation()
  }
  return (
    <div className={`node-wrap`}>
      {
        groupId === 'aInput'
          ?
          <div onClick={(e) => inputWrapClick(e)}><Input
            value={newGroupName}
            onFocus={(e) => createInputFocus(e)}
            onChange={(e) => createInputChange(e)}
            onPressEnter={() => createGroup()}
            onBlur={() => createGroup()}
          /></div>
          :
          <>
            <div className='title'>
              {
                showRenameInput
                  ?
                  <Input
                    style={{ width: '120px' }}
                    value={inputValue}
                    ref={inputRef}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => oInputContent(e)}
                    onPressEnter={(e) => updateGroupName(e)}
                    onBlur={(e) => updateGroupName(e)}
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
                          <IconFont type='icon-bianji' style={{ marginRight: '16px' }} onClickCapture={(e) => editClick(e, groupId)} />
                        }
                        {
                          <IconFont type='icon-shanchuzu' onClickCapture={() => delClick(groupId)} />
                        }
                      </div>
                      <span className='show-nums'>{number}</span>
                    </>
              }
            </div>
          </>
      }
    </div>
  )
}

export default memo(
  EveryTreeNode
)