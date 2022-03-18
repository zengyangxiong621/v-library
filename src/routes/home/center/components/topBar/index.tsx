import { memo } from 'react'
import './index.less'

import Charts from './components/charts/index'
import Map from './components/map/index'
import Text from './components/text/index'
import Assist from './components/assist/index'
import Interaction from './components/interaction/index'
import Other from './components/other/index'


import { Menu } from 'antd'
const { SubMenu, Item } = Menu



const TopBar = (props: any) => {

  return (
    <div className='TopBar-wrap'>
      <Menu className='TopBar-wrap' mode="horizontal">
        <SubMenu className='TopBar-submenu' key="tb" title="图表">
          {/* <div className='self-tooltip'> */}
          <div className='hasList-self-tooltip' >
            <Charts />
          </div>
        </SubMenu>
        <SubMenu className='TopBar-submenu' key="dt" title="地图">
          <div className='self-tooltip'>
            <Map />
          </div>
        </SubMenu>
        <SubMenu className='TopBar-submenu' key="wz" title="文字">
          <div className='self-tooltip'>
            <Text />
          </div>
        </SubMenu>
        <SubMenu className='TopBar-submenu' key="fz" title="辅助">
          <div className='self-tooltip'>
            <Assist />
          </div>
        </SubMenu>
        <SubMenu className='TopBar-submenu' key="jh" title="交互">
          <div className='self-tooltip'>
            <Interaction />
          </div>
        </SubMenu>
        <SubMenu className='TopBar-submenu' key="qt" title="其它">
          <div className='self-tooltip'>
            <Other />
          </div>
        </SubMenu>
      </Menu>
    </div>
  )
}

export default memo(TopBar)