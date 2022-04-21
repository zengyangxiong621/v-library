/* eslint-disable react-hooks/rules-of-hooks */
import React, { memo, useEffect, useRef, useState } from 'react'
import './index.less'
import { connect } from 'dva'

import { useFetch } from '../../../../utils/useFetch'

import { IconFont } from '../../../../utils/useIcon'
import { Input } from 'antd'

const EveryTreeNode = (props: any) => {
  const { groupId, name, number,
    systemDefined, addGroup, refreshList } = props || {}
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
    const finalBody = {
      spaceId: '1',
      name: newGroupName
    }
    const [, data] = await useFetch('/visual/application/addGroup', {
      body: JSON.stringify(finalBody)
    })
    // 创建成功，改变父组件传入的变量通知父组件重新获取最新分组列表
    if (data) refreshList()
  }
  const createInputChange = (e: any) => {
    setNewGroupName(e.target.value)
  }

  /** ** 编辑分组****** */
  // 修改分组名字
  const updateGroupName = async () => {
    // TODO 校验
    // 比如名字一样,不发请求
    if (inputValue === '') {
      alert('哎，怎么能为空呢')
      return
    } else if (inputValue === name) {
      alert('来点不一样的啊')
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
      refreshList()
      setShowRenameInput(false)
    }
  }
  // 输入内容改变
  const oInputContent = (e: any) => {
    e.stopPropagation()
    setInputValue(e.target.value)
  }
  // 点击编辑图标
  const editClick = (id: string | number) => {
    setShowRenameInput(true)
    setInputValue(name)
  }
  // 点击删除图标
  const delClick = async (id: string | number) => {
    const [, data] = await useFetch(`/visual/application/deleteGroup?groupId=${id}`, {
      method: 'delete'
    })
    data && refreshList()
  }
  return (
    <div className={`node-wrap`}>
      {
        groupId === 'aInput'
          ?
          <><Input
            value={newGroupName}
            onChange={(e) => createInputChange(e)}
            onPressEnter={() => createGroup()}
            onBlur={() => createGroup()}
          /></>
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
                    onChange={(e) => oInputContent(e)}
                    onPressEnter={(e) => updateGroupName()}
                    onBlur={(e) => updateGroupName()}
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
          </>
      }
    </div>
  )
}

export default memo(
  EveryTreeNode
)