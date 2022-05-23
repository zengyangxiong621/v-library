/* eslint-disable react-hooks/rules-of-hooks */
import React, { memo, useEffect, useRef, useState } from 'react'
import './index.less'

import { http } from '@/services/request'

import { IconFont } from '../../../../utils/useIcon'
import { Input, message, Modal } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'

const EveryTreeNode = (props: any) => {
  const { groupId, name, number, systemDefined,
    addGroup, refreshGroupLists, refreshRight } = props || {}
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
      // message.warning({ content: '分组名不能为空', duration: 2 })
      addGroup()
      return
    }
    const finalBody = {
      spaceId: '1',
      name: newGroupName
    }
    const data = await http({
      method: 'post',
      url: '/visual/application/addGroup',
      body: finalBody
    })
    // 创建成功，改变父组件传入的变量通知父组件重新获取最新分组列表
    if (data) refreshGroupLists()
  }
  const createInputChange = (e: any) => {
    setNewGroupName(e.target.value)
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
    const data = await http({
      method: 'post',
      url: '/visual/application/updateGroup',
      body: finalBody
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
    Modal.confirm({
      title: '删除分组',
      style: {
        top: '30%'
      },
      okButtonProps: {
        style: {
          backgroundColor: '#e9535d',
          border: 'none',
          // marginLeft: '8px',
        }
      },
      cancelButtonProps: {
        style: {
          backgroundColor: '#3d404d'
        }
      },
      icon: <ExclamationCircleFilled />,
      content: '删除后不可恢复，确认删除此分组吗?',
      okText: '确定',
      cancelText: '取消',
      bodyStyle: {
        background: '#232630',
      },
      async onOk(close) {
        const data = await http({
          url: `/visual/application/deleteGroup?groupId=${id}`,
          method: 'delete'
        })
        if (data) {
          // 删除成功，需要刷新左侧树列表、和整个列表
          close()
          refreshGroupLists()
          refreshRight()
        } else {
          close()
          message.error({ content: '删除失败', duration: 2 })
        }
      },
      onCancel(close) {
        close()
      }
    })
  }
  const inputWrapClick = (e: any) => {
    // e.stopPropagation()
  }
  return (
    <div className={`dashboard-node-wrap`}>
      {
        groupId === 'aInput'
          ?
          <div onClick={(e) => inputWrapClick(e)}>
            <Input
              value={newGroupName}
              maxLength={20}
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
                    maxLength={20}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => oInputContent(e)}
                    onPressEnter={(e) => updateGroupName(e)}
                    onBlur={(e) => updateGroupName(e)}
                  />
                  : <div className='text'>{name}</div>
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