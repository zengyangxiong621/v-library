import React, { memo, useState, useEffect } from 'react';
import { Link } from 'dva/router';

import './index.less'
import { Layout, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const menu = (
  <Menu className="cus-dropdown-menu">
    <Menu.Item key="0">
      默认工作空间
    </Menu.Item>
    <Menu.Item key="1">
      工作空间管理
    </Menu.Item>
  </Menu>
);

const createMenu = ((menuData, props) => {  //创建菜单
  const {location, history} = props

  let menu = [];
  for (let i = 0; i < menuData.length; i++) {
    //如果没有子级菜单
    menu.push(
      <Menu.Item 
        key={menuData[i].path} 
        title={menuData[i].title}
        onClick={() => {
          history.push(menuData[i].path)
        }}
      >
        <Link to={ menuData[i].path }>
          <span>{menuData[i].title}</span>
        </Link>
      </Menu.Item>
    )
  }
  return menu;
});

const Header = props => {
  const { menuData, defaultPath, location} = props
  const { pathname } = location

  return (
    <div className="header-wraper">
      <div className="logo">
        <img src={require('@/assets/images/logo.png')} alt="" />
        <span>可视化搭建平台</span>
      </div>
      <Menu
        className="menu-nav"
        theme="dark"
        mode="horizontal"
        selectedKeys={[pathname]}
      >
        {
          createMenu(menuData, props)
        }
      </Menu>

      <div className="user-wraper">
        <div className="drop-down">
          <Dropdown overlay={menu} trigger={['click']}>
            <span className="span" onClick={e => e.preventDefault()}>
              默认工作空间 <DownOutlined />
            </span>
          </Dropdown>
        </div>
        <div className="user">
          <img src={require('@/assets/images/avatar.png')} alt="" />
          <span title="gridsumgridsumgridsum">gridsumgridsumgridsum</span>
        </div>
      </div>
    </div>
  )
}

export default memo(Header)