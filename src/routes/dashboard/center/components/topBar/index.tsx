import React, { memo } from 'react'
import './index.less'
/**
 * description: 组件导航栏菜单
 */
import Charts from './components/charts/index'
import Map from './components/map/index'
import Text from './components/text/index'
import Assist from './components/assist/index'
import Interaction from './components/interaction/index'
import Other from './components/other/index'
/**
 * description: 素材导航栏菜单
 */
import DesignMaterial from './components/designMaterial'
import ThmemResource from './components/thmemResource'
import MyCollection from './components/myCollection'


import { Menu } from 'antd'
const { SubMenu, Item } = Menu

const TopBar = (props: any) => {
  const { showTopBar, zujianORsucai } = props
  const menuReflect: TMenuReflect<TComponentMenuItem[]> = {
    zujian: zujianMenu,
    sucai: sucaiMenu,
  }

  return (
    <div className='TopBar-wrap' style={{ display: showTopBar ? 'block' : 'none' }}>
      <Menu className='TopBar-wrap' mode="horizontal">
        {
          menuReflect[zujianORsucai].map((item: any) => {
            return (
              (<SubMenu className='TopBar-submenu' key={item.key} title={item.title} style={{ width: item.customWidth && '88px' }} >
                <div
                  className={`${item.isSpecialDropMenu ? 'hasList-self-tooltip' : 'self-tooltip'}`}
                >
                  {React.createElement(item.component)}
                </div>
              </SubMenu>)
            )
          })
        }

      </Menu>
    </div>
  )
}

/**
 * description: 组件 、 素材 导航栏选项卡配置
 */
const zujianMenu = [
  // {
  //   title: '图表',
  //   key: 'chart',
  //   // 当hover该选项卡时，显示的是带有侧边栏的下拉菜单
  //   isSpecialDropMenu: true,
  //   component: Charts,
  // },
  // {
  //   title: '地图',
  //   key: 'map',
  //   // 当hover该选项卡时，显示的是带有侧边栏的下拉菜单
  //   isSpecialDropMenu: false,
  //   component: Map
  // },
  {
    title: '文字',
    key: 'text',
    // 当hover该选项卡时，显示的是带有侧边栏的下拉菜单
    isSpecialDropMenu: false,
    component: Text
  },
  {
    title: '辅助',
    key: 'assist',
    // 当hover该选项卡时，显示的是带有侧边栏的下拉菜单
    isSpecialDropMenu: false,
    component: Assist
  },
  // {
  //   title: '交互',
  //   key: 'interaction',
  //   // 当hover该选项卡时，显示的是带有侧边栏的下拉菜单
  //   isSpecialDropMenu: false,
  //   component: Interaction
  // },
  // {
  //   title: '其他',
  //   key: 'other',
  //   // 当hover该选项卡时，显示的是带有侧边栏的下拉菜单
  //   isSpecialDropMenu: false,
  //   component: Other
  // },

]
const sucaiMenu = [
  {
    title: '设计素材',
    key: 'sujisucai',
    // 当hover该选项卡时，显示的是带有侧边栏的下拉菜单
    isSpecialDropMenu: true,
    component: DesignMaterial,
    customWidth: true,
  }, {
    title: '主题资源',
    key: 'zhutiziyuan',
    // 当hover该选项卡时，显示的是带有侧边栏的下拉菜单
    isSpecialDropMenu: true,
    component: ThmemResource,
    customWidth: true,
  }, {
    title: '我的收藏',
    key: 'wodeshoucang',
    // 当hover该选项卡时，显示的是带有侧边栏的下拉菜单
    isSpecialDropMenu: true,
    component: MyCollection,
    customWidth: true,
  },
]

/**
 * description: 类型定义
 */
type TMenuReflect<T> = {
  [K: string] : T
}
type TComponentMenuItem = {
  title: string,
  key: string,
  isSpecialDropMenu: boolean,
  component: any
}

export default memo(TopBar)
