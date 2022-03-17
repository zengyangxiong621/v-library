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
        <SubMenu key="tb" title="图表">
          {/* <div className='self-tooltip'> */}
          <div>
            <Charts />
          </div>
        </SubMenu>
        <SubMenu key="dt" title="地图">
          <div className='self-tooltip'>
            <Map />
          </div>
        </SubMenu>
        <SubMenu key="wz" title="文字">
          <div className='self-tooltip'>
            <Text />
          </div>
        </SubMenu>
        <SubMenu key="fz" title="辅助">
          <div className='self-tooltip'>
            <Assist />
          </div>
        </SubMenu>
        <SubMenu key="jh" title="交互">
          <div className='self-tooltip'>
            <Interaction />
          </div>
        </SubMenu>
        <SubMenu key="qt" title="其它">
          <div className='self-tooltip'>
            <Other />
          </div>
        </SubMenu>
      </Menu>
    </div>
  )
}

export default memo(TopBar)