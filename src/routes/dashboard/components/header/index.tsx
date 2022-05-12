/* eslint-disable react-hooks/rules-of-hooks */
import React, { memo, useEffect, useRef, useState } from 'react'
import './index.less'
import { withRouter } from 'dva/router'
import { connect } from 'dva'

import { useFetch } from '../../../../utils/useFetch'
import { Input, message } from 'antd'
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

  const toBack = () => {
    // 返回首页
    history.back()
  }
  // 修改应用名称
  const reNameApp = async (e: any) => {
    console.log('e', appName);
    e.stopPropagation()
    setIsRename(false)
    // 没改新名称
    if(appName === bar.dashboardName) {
      return
    }
    if(!appName) {
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
  // 获取当前活跃的按钮
  const getActiveIcon = (icon: any) => {
    setActiveIcon(icon)
    showWhichBar(icon)
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
            <span className='appName' onDoubleClickCapture={showChangeNameInput}>{appName}</span>
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
          rightIconArr.map(item => (
            <NavigationItem activeIcon={activeIcon}
              getActiveIcon={getActiveIcon} data={item} />
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
  {
    icon: 'xiangmuguolvqi',
    text: '项目过滤器'
  },
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