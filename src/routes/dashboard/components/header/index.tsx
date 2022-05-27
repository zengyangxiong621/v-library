/* eslint-disable react-hooks/rules-of-hooks */
import React, { memo, useEffect, useRef, useState } from 'react'
import './index.less'
import { withRouter } from 'dva/router'
import { connect } from 'dva'

import { useFetch } from '../../../../utils/useFetch'
import { Input, message, Tooltip } from 'antd'
import { IconFont } from '../../../../utils/useIcon'

import NavigationItem from '../navigationItem/index'



const Header = ({ bar, dispatch, history, showWhichBar }: any) => {
  const [appName, setAppName] = useState(bar.dashboardName)
  const [isRename, setIsRename] = useState(false)
  const [activeIcon, setActiveIcon] = useState(false)

  const appNameInputRef = useRef<any>()
  useEffect(() => {
    setAppName(bar.dashboardName)
  }, [bar.dashboardName])

  // 返回首页
  const toBack = () => {
    history.back()
  }
  // 跳转至发布预览页面
  const toPreviewOrPublish = (targetPage: string) => {
    const pageReflect: any = {
      'yulan': `/bigscreen/${bar.dashboardId}`,
      'fabu': `/publishScreen/${bar.dashboardId}`
    }
    let newTab = window.open('_blank');
    newTab!.location.href = pageReflect[targetPage]
    newTab?.history.replaceState(null, '')
  }
  // 修改应用名称
  const reNameApp = async (e: any) => {
    console.log('e', appName);
    e.stopPropagation()
    setIsRename(false)
    // 没改新名称
    if (appName === bar.dashboardName) {
      return
    }
    if (!appName) {
      setAppName(bar.dashboardName)
      return
    }
    const finalBody = {
      id: bar.dashboardId,
      name: appName
    }
    const [, data] = await useFetch('/visual/application/updateAppName', {
      body: JSON.stringify(finalBody)
    }, { onlyNeedWrapData: true })
    if (!data.data) {
      message.error({ content: data.message, duration: 2 })
    }
  }
  // 显示修改应用名称的input
  const showChangeNameInput = () => {
    setIsRename(true)
    setTimeout(() => {
      appNameInputRef.current!.focus({
        cursor: 'all'
      })
    }, 4);

  }
  // 获取当前活跃的按钮, 并执行对应逻辑
  const getActiveIcon = (icon: any) => {
    setActiveIcon(icon)
    showWhichBar(icon)
    console.log('icon', icon);
    switch (icon) {
      case 'fabu':
        toPreviewOrPublish(icon)
        break;
      case 'yulan':
        toPreviewOrPublish(icon)
        break;
    }
  }
  return (
    <div className='Header-wrap'>
      <div className='left'>
        <IconFont type='icon-fanhui' className='left-icon'
          onClick={() => toBack()} />
        {
          isRename ?
            <Input className='left-input'
              value={appName}
              ref={appNameInputRef}
              maxLength={20}
              onBlur={(e) => reNameApp(e)}
              onPressEnter={(e) => reNameApp(e)}
              onChange={(e) => setAppName(e.target.value)}
            />
            :
            <Tooltip title={appName} zIndex={9999999} color='#434343'>
              <span className='appName' onDoubleClickCapture={showChangeNameInput}>{appName}</span>
            </Tooltip>
        }
      </div>
      <div className='cdb-center'>
        {
          centerIconArr.map((item, index) => {
            return (
              <div key={index}>
                {
                  item.icon === 'line' ? <div className='line'></div>
                    :
                    <NavigationItem getActiveIcon={getActiveIcon}
                      data={item} activeIcon={activeIcon} />
                }
              </div>
            )
          })
        }
      </div>
      <div className='right'>
        {
          rightIconArr.map((item, index) => (
            <NavigationItem
              key={index}
              activeIcon={activeIcon}
              getActiveIcon={getActiveIcon}
              data={item} />
          ))
        }
      </div>
    </div>
  )
}

const centerIconArr = [
  {
    icon: 'chexiao',
    text: '撤销'
  },
  {
    icon: 'huifu',
    text: '恢复'
  },
  {
    icon: 'line',
  },
  {
    icon: 'zujian',
    text: '组件'
  },
  {
    icon: 'sucai',
    text: '素材'
  },
  {
    icon: 'dongtaimianban',
    text: '动态面板'
  },
  {
    icon: 'yinyongmianban',
    text: '引用面板'
  },
  {
    icon: 'line',
  },
  // {
  //   icon: 'xiangmuguolvqi',
  //   text: '项目过滤器'
  // },
  {
    icon: 'huitiaoguanli',
    text: '回调管理'
  },
  {
    icon: 'shujurongqi',
    text: '数据容器'
  },
]

const rightIconArr = [
  {
    icon: 'huishouzhan',
    text: '回收站'
  },
  {
    icon: 'yulan',
    text: '预览'
  },
  {
    icon: 'fabu',
    text: '发布'
  },
]
export default memo(connect(
  ({ bar }: any) => ({ bar })
)(withRouter(Header)))