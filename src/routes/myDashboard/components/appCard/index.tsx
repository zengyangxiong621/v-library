/* eslint-disable react-hooks/rules-of-hooks */
import React, { memo, useState, useRef } from 'react'
import './index.less'

import { withRouter } from 'dva/router'
import { connect } from 'dva'
import { useFetch } from '../../../../utils/useFetch'

import { IconFont } from '../../../../utils/useIcon'
import { Input, Tooltip, Dropdown, Menu, message } from 'antd'

const AppCard = (props: any) => {
  const { id, name, status, photoUrl, changeFabuModal, refreshList, history } = props

  // 后端返回的photoUrl为空，则使用默认图片
  const picUrl = photoUrl ?? require('../../../../assets/images/模板默认背景图.png')


  const [canEdit, setCanEdit] = useState(false)
  const [appName, setAppName] = useState(name)
  // TODO 更多菜单点完不消失
  const [showMenu, setShowMenu] = useState(false)

  const inputRef = useRef<any>()


  /** 输入框事件 */
  const bianjiClick = () => {
    setCanEdit(true)
    Promise.resolve().then(() => {
      inputRef.current.focus({
        cursor: 'all'
      })
    })
  }
  const nameInputChange = (e: any) => {
    setAppName(e.target.value)
  }
  const changAppName = async (e: any) => {
    // 校验： 如果两次修改的名称一样，那就不发请求了
    if(name === appName) {
      message.warning({content: '新旧名称不能相同', duration: 2})
      return
    }
    const [err, data] = await useFetch('/application/updateAppName', {
      body: JSON.stringify({
        id,
        name: appName
      })
    })
    console.log('应用名称修改成功', data);
    if(data) {
      message.success({content: '应用名修改成功', duration: 2})
      refreshList()
    } else {
      message.error({content: '应用名称修改失败', duration: 2})
    }
    setCanEdit(false)
  }

  /** Card 中图标 和 编辑、预览按钮 事件 */
  const scanDashboard = () => {
    // TODO 通过id跳转到预览界面
    history.push(`/bigscreen/${id}`)
  }
  const editDashboard = () => {
    //TODO 通过id跳转到主画布
    history.push(`/dashboard/${id}`)
  }
  // 拷贝给他人
  const copyToOthers = (e: any) => {

  }
  const fabu = (e: any) => {
    changeFabuModal(true, id)
  }

  // 复制应用
  const copyApp = async (appId: string) => {
    const [, data] = await useFetch('/visual/application/copy', {
      body: JSON.stringify({
        appId
      })
    })
    // 有id, 视为复制成功
    if (data && data.id) {
      refreshList()
      message.success({ content: '复制成功', duration: 2 })
    } else {
      message.error({ content: '复制失败', duration: 2 })
    }
  }
  // 删除应用
  const deleteApp = async (appIds: string[]) => {
    const [, data] = await useFetch('/visual/application/deleteApp', {
      method: 'delete',
      body: JSON.stringify({
        appIdList: appIds
      })
    })
    if (data) {
      refreshList()
      message.success({ content: '删除成功', duration: 2 })
    } else {
      message.error({ content: '删除失败', duration: 2 })
    }
  }
  const refreshAppList = () => {

  }
  const menuClick = ({ item, key }: any) => {
    console.log('iteml', item);
    console.log('key', key);
    switch (key) {
      case 'move':
        break;
      case 'copy':
        copyApp(id)
        setShowMenu(false)
        break;
      case 'delete':
        deleteApp([id])
        break;
    }
    // 刷新应用列表
    refreshAppList()
  }

  return (
    <div className='AppCard-wrap'>
      <header className='head'
      >
        <div className='hoverOnImg'>
          <div className='icons-wrap'>
            <Tooltip
              placement='bottom' title="拷贝给他人">
              <IconFont className='each-icon' onClickCapture={(e) => {
                copyToOthers(e)
              }} type='icon-kaobei' />
            </Tooltip>
            <Tooltip placement='bottom' title="发布">
              <IconFont className='each-icon' onClickCapture={(e) => {
                fabu(e)
              }} type='icon-fabu' />
            </Tooltip>
            <div className='more-icon'>
              <IconFont className='each-icon' type='icon-gengduo' />
              <div className="more"
              >
                <Menu mode="vertical" onSelect={(menuClick as any)}>
                  <Menu.Item key='move'>
                    <span>移入分组</span>
                  </Menu.Item>
                  <Menu.Item key='copy'>
                    <span>复制</span>
                  </Menu.Item>
                  <Menu.Item key='delete'>
                    <span>删除</span>
                  </Menu.Item>
                </Menu>
              </div>
            </div>
          </div>
          <div className='btns-wrap'>
            <span className='div-to-btns scan-btn' onClickCapture={() => scanDashboard()}>预览</span>
            <span className='div-to-btns edit-btn' onClickCapture={() => editDashboard()}>编辑</span>
          </div>
        </div>
        <div className="img-wrap">
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <img className='img-limit' src={picUrl} />
        </div>
      </header>
      <div className="foot">
        <div className="front">
          {
            canEdit ?
              <Input
                className='my-input'
                ref={inputRef}
                maxLength={30}
                value={appName}
                onChange={nameInputChange}
                onPressEnter={changAppName}
                onBlur={changAppName}
              />
              : <div className='icon-and-text'>
                <IconFont className='bianjiIcon'
                  type="icon-bianji"
                  onClickCapture={() => bianjiClick()}
                />
                <div className='card-name'>{name}</div>
              </div>
          }
        </div>
        <div className="releaseState">
          <div className='customCircle' style={{
            backgroundColor: status ? '#00FF3D' : '#535353',
          }}></div>
          <span className='text'>{status ? '已' : '未'}发布</span>
        </div>

      </div>
    </div>
  )
}

export default memo(withRouter(AppCard))
