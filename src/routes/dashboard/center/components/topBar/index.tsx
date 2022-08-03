import React, { memo,useEffect,useState,useRef } from 'react'
import './index.less'
import { connect } from "dva";
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
import { deepClone} from '@/utils'

import { Menu } from 'antd'
const { SubMenu, Item } = Menu



const TopBar = (props: any) => {
  /**
 * description: 组件 、 素材 导航栏选项卡配置
 */
const componentMenu = [
  {
    title: '图表',
    key: 'chart',
    childRef: useRef(),
    // 当hover该选项卡时，显示的是带有侧边栏的下拉菜单
    isSpecialDropMenu: true,
    component: Charts,
  },
  // {
  //   title: '地图',
  //   key: 'map',
  //   // 当hover该选项卡时，显示的是带有侧边栏的下拉菜单
  //   isSpecialDropMenu: false,
  //   component: Map
  // },
  // {
  //   title: '文字',
  //   key: 'text',
  //   // 当hover该选项卡时，显示的是带有侧边栏的下拉菜单
  //   isSpecialDropMenu: false,
  //   component: Text
  // },
  // {
  //   title: '辅助',
  //   key: 'assist',
  //   // 当hover该选项卡时，显示的是带有侧边栏的下拉菜单
  //   isSpecialDropMenu: false,
  //   component: Assist
  // },
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
  const { showTopBar, zujianORsucai, dispatch } = props
  const [current, setCurrent] = useState<any>([])
  const menuReflect: TMenuReflect<TComponentMenuItem[]> = {
    zujian: componentMenu,
    sucai: MaterialMenu,
  }


  useEffect(() => {
    if(zujianORsucai === 'sucai'){
      getSystemMaterial()
    }
  }, [zujianORsucai])

  // 获取所有素材分类
  const getSystemMaterial = () => {
    dispatch({
      type: 'bar/getSystemMaterialClass'
    })
  }
  
  const menuSelect = (data:any) => {
    if(data.length){
      let dataList = deepClone(componentMenu)
      let dom = dataList.find((item:any) => item.key === data[0])
      if(dom){
        console.log(dom,'dom')
        dom.childRef.current.initPage()
      }
    }
  }

  return (
  <div className='TopBar-wrap' style={{ display: showTopBar ? 'block' : 'none' }}>
    <Menu className='TopBar-wrap' triggerSubMenuAction='click' mode="horizontal" onOpenChange={menuSelect}>
      {
        menuReflect[zujianORsucai].map((item: any) => {
          return (
            (<SubMenu popupOffset={[0, 0]} className='TopBar-submenu' key={item.key} title={item.title} style={{ width: item.customWidth && '88px'}} >
              <div
                className={`${item.isSpecialDropMenu ? 'hasList-self-tooltip' : 'self-tooltip'}`}
              >
              {
                // React.createElement(item.component,{...item,index: item.key, current})
                React.createElement(item.component,item)
              }
              </div>
            </SubMenu>)
          )
        })
      }
    </Menu>
  </div>

  )
}


const MaterialMenu = [
  {
    title: '系统素材',
    key: 'systemMaterial',
    // 当hover该选项卡时，显示的是带有侧边栏的下拉菜单
    isSpecialDropMenu: true,
    component: DesignMaterial,
    // customWidth: true,
  }, 
  {
    title: '我的素材',
    key: 'myMaterial',
    // 当hover该选项卡时，显示的是带有侧边栏的下拉菜单
    isSpecialDropMenu: true,
    component: DesignMaterial,
    // customWidth: true,
  }
  // {
  //   title: '主题资源',
  //   key: 'zhutiziyuan',
  //   // 当hover该选项卡时，显示的是带有侧边栏的下拉菜单
  //   isSpecialDropMenu: true,
  //   component: ThmemResource,
  //   customWidth: true,
  // }, {
  //   title: '我的收藏',
  //   key: 'wodeshoucang',
  //   // 当hover该选项卡时，显示的是带有侧边栏的下拉菜单
  //   isSpecialDropMenu: true,
  //   component: MyCollection,
  //   customWidth: true,
  // },
]

/**
 * description: 类型定义
 */
type TMenuReflect<T> = {
  [K: string]: T
}
type TComponentMenuItem = {
  title: string,
  key: string,
  isSpecialDropMenu: boolean,
  component: any
}

export default memo( connect(({ bar }: any) => ({ bar }))(TopBar))
