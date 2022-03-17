import React, { memo, useState } from 'react'
import './index.less'

import { Input } from 'antd'
import { IconFont } from '../../../../utils/useIcon'

import NavigationItem from '../navigationItem/index'



const Header = props => {
  const [isRename, setIsRename] = useState(false)
  const [activeIcon, setActiveIcon] = useState(false)
  const toBack = () => {
    // 返回首页
  }
  // 获取当前活跃的按钮
  const getActiveIcon = (icon) => {
    console.log('当前的icon', icon);
    setActiveIcon(icon)
    if(icon === 'zujian') {
      console.log('zujian');
    }
    if(icon === 'sucai') {
      console.log('sucai');
    }
  }
  return (
    <div className='Header-wrap'>
      <div className='left'>
        <IconFont type='icon-fanhui' className='left-icon'
          onClick={() => toBack()} />
        {
          isRename ?
            <Input className='left-input' />
            : isRename || '未命名'
        }
      </div>
      <div className='center'>
        {
          centerIconArr.map(item => {
            return (
              <NavigationItem getActiveIcon={getActiveIcon}
                data={item} activeIcon={activeIcon} />
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
    icon: 'xiangmuguolvqi',
    text: '项目过滤器'
  },
  {
    icon: 'huitiaoguanli',
    text: '回调管理'
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
export default memo(Header)