import React from 'react'
import { Menu } from 'antd'

import * as Icons from '@ant-design/icons'

const { SubMenu, Item } = Menu

const generateSubMenu = (arr) => {
  return arr.map((item) => {
    return (
      item.children
        ?
        <SubMenu
          theme='dark'
          icon={React.createElement(Icons[item.icon])}
          title={item.name}>
          {
            generateSubMenu(item.children)
          }
        </SubMenu>
        :
        <Item icon={React.createElement(Icons[item.icon])}>{item.name}</Item>
    )
  })
}

export const getTargetMenu = (menuData) => {
  return (
    <Menu theme='dark'>
      {
        generateSubMenu(menuData)
      }
    </Menu>
  )
}
