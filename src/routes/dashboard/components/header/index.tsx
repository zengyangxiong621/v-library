import React, { memo, useRef, useState } from 'react'
import './index.less'
import { withRouter } from 'dva/router'

import { Input } from 'antd'
import { IconFont } from '../../../../utils/useIcon'

import NavigationItem from '../navigationItem/index'



const Header = (props: any) => {

  // console.log(history);
  // console.log(location);

  // const { showWhichBar } = props
  const [isRename, setIsRename] = useState(false)
  const [activeIcon, setActiveIcon] = useState(false)

  const appNameInputRef = useRef<any>()


  const toBack = () => {
    // 返回首页
    props.history.back()
  }
  // 修改应用名称
  const changeAppName = (e: any) => {
    e.stopPropagation()
    setIsRename(false)
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
    props.showWhichBar(icon)

  }
  return (
    <div className='Header-wrap'>
      <div className='left'>
        <IconFont type='icon-fanhui' className='left-icon'
          onClick={() => toBack()} />
        {
          isRename ?
            <Input className='left-input'
              // value={}
              ref={appNameInputRef}
              onBlur={(e) => changeAppName(e)}
            />
            :
            <span className='appName' onDoubleClickCapture={showChangeNameInput}>未命名</span>
        }
      </div>
      <div className='center'>
        {
          centerIconArr.map(item => {
            return (
              <div>
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
export default memo(withRouter(Header))