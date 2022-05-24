/* eslint-disable react-hooks/rules-of-hooks */
import React, { memo, useState, useRef } from 'react'
import './index.less'

import { withRouter } from 'dva/router'
import { useFetch } from '../../../../utils/useFetch'
import { BASEURL } from '@/services/request'

import { IconFont } from '../../../../utils/useIcon'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { Input, Tooltip, Dropdown, Menu, message, Modal } from 'antd'

// import M from '@/components/modalConfirm/index'

const AppCard = (props: any) => {
  const { id, name, status, photoUrl, spaceId,
    openMoveGroupModal, changeFabuModal, refreshList, history } = props

  // 后端返回的photoUrl为空，则使用默认图片
  const picUrl = photoUrl || require('../../../../assets/images/模板默认背景图.png')

  const [canEdit, setCanEdit] = useState(false)
  const [appName, setAppName] = useState(name)
  const [isShowUL, setIsShowUL] = useState(false)

  const inputRef = useRef<any>()

  /** 输入框事件 */
  const bianjiClick = () => {
    setCanEdit(true)
    // 每次input框出现时，都应该是重新设置输入框里的值，不然切换到别的分组后再编辑任意应用，输入框里都将是上一次的值
    setAppName(name)
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
    if (name === appName) {
      // message.warning({ content: '新旧名称不能相同', duration: 2 })
      setCanEdit(false)
      return
    }
    const [, data] = await useFetch('/visual/application/updateAppName', {
      body: JSON.stringify({
        id,
        name: appName
      })
    }, {
      onlyNeedWrapData: true
    })
    if (data.data) {
      message.success({ content: '应用名修改成功', duration: 2 })
      refreshList()
    } else {
      message.error({ content: data.message || '应用名称修改失败', duration: 2 })
    }
    setCanEdit(false)
  }

  /** Card 中图标 和 编辑、预览按钮 事件 */
  const scanDashboard = () => {
    // TODO 通过id跳转到预览界面
    let newTab = window.open('_blank');
    newTab!.location.href = `/bigscreen/${id}`
    newTab?.history.replaceState(null, '')
  }
  const editDashboard = () => {
    //TODO 通过id跳转到主画布
    history.push(`/dashboard/${id}`)
  }
  // TODO  已确定先不做
  // 拷贝给他人
  // const copyToOthers = (e: any) => {
  // }
  const fabu = (e: any) => {
    changeFabuModal(true, id, status)
  }

  // 复制应用
  const copyApp = async (appId: string) => {
    if(name.length>15) {
      message.warning('复制后应用名称超过长度限制')
      return
    }
    const [, data] = await useFetch('/visual/application/copy', {
      body: JSON.stringify({
        appId
      })
    })
    // 返回的数据有id, 视为复制成功
    if (data && data.id) {
      refreshList()
      message.success({ content: '复制成功', duration: 2 })
    } else {
      message.error({ content: '复制失败', duration: 2 })
    }
  }
  // 删除应用
  const deleteApp = async (appIds: string[]) => {
    Modal.confirm({
      title: '删除应用',
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
      content: '确认删除此应用吗?',
      okText: '确定',
      cancelText: '取消',
      bodyStyle: {
        background: '#232630',
      },
      async onOk(close) {
        const [, data] = await useFetch('/visual/application/deleteApp', {
          method: 'delete',
          body: JSON.stringify({
            appIdList: appIds,
            spaceId
          })
        })
        if (data) {
          refreshList()
          message.success({ content: '删除成功', duration: 2 })
        } else {
          message.error({ content: '删除失败', duration: 2 })
        }
      },
      onCancel(close) {
        close()
      }
    })
  }

  // 导出应用
  const exportApp = async (appId: string) => {
    // console.log(`${BASEURL}/visual/application/export/${appId}`);
    const toolA = document.createElement('a')
    toolA.href = `${BASEURL}/visual/application/export/${appId}`
    toolA.click()
  }

  // 移动分组
  const moveGroup = (appId: string) => {
    openMoveGroupModal(appId)
  }
  // 鼠标移入更多按钮时，显示下拉菜单
  const moreIconMouseOver = () => {
    setIsShowUL(true)
  }
  // 点击更多列表下的选项
  const ulClick = (e: any) => {
    const operation = e.target.innerHTML
    switch (operation) {
      case '移入分组':
        moveGroup(id)
        break;
      case '复制':
        copyApp(id)
        break;
      case '删除':
        deleteApp([id])
        break;
      case '导出应用':
        exportApp(id)
        break;
    }
    // 点击任意菜单子项后，需要隐藏ul
    setIsShowUL(false)
  }

  return (
    <div className='AppCard-wrap'>
      <header className='head'
      >
        <div className='hoverOnImg'>
          <div className='icons-wrap'>
            {/* <Tooltip
              placement='bottom' title="拷贝给他人"
            // tooltip挂载到body下容易被影响样式
            getPopupContainer={(triggerNode) => triggerNode}
            >
              <IconFont className='each-icon' onClickCapture={(e) => {
                copyToOthers(e)
              }} type='icon-kaobei' />
            </Tooltip> */}
            <Tooltip placement='bottom'
              title="发布">
              <IconFont className='each-icon' onClickCapture={(e) => {
                fabu(e)
              }} type='icon-fabu' />
            </Tooltip>
            <div className='more-icon'>
              <IconFont onMouseOver={moreIconMouseOver} className='each-icon' type='icon-gengduo' />
              <div className="more"
              >
                <ul className='more-ul' style={{
                  display: isShowUL ? 'block' : 'none'
                }} onClick={(e) => ulClick(e)}>
                  <li key="move">移入分组</li>
                  <li>复制</li>
                  <li>删除</li>
                  <li>导出应用</li>
                </ul>
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
                maxLength={20}
                showCount={true}
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
