import React, { memo, useState, useEffect } from 'react';
import { Link } from 'dva/router';

import './index.less'
import { Layout, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import logo from '@/assets/images/logo.svg';


const createMenu = ((menuData, props) => {  //创建菜单
  const { location, history } = props

  let menu = [];
  for (let i = 0; i < menuData.length; i++) {
    const menuItem = menuData[i]
    if(menuItem?.children){
      // 存在子菜单
      menu.push(
        <Menu.SubMenu title={menuItem.title}>
          {
            menuItem.children.map(subItem => {
              return (
                <Menu.Item
                  key={subItem.path}
                  title={subItem.title}
                  onClick={() => {
                    history.push(subItem.path)
                  }}
                >
                  <Link to={subItem.path}>
                    <span>{subItem.title}</span>
                  </Link>
                </Menu.Item>
              )
            })
          }
        </Menu.SubMenu>
      )
    }else{
      //如果没有子级菜单
      menu.push(
        <Menu.Item
          key={menuData[i].path}
          title={menuData[i].title}
          onClick={() => {
            history.push(menuData[i].path)
          }}
        >
          <Link to={menuData[i].path}>
            <span>{menuData[i].title}</span>
          </Link>
        </Menu.Item>
      )
    }
  }
  return menu;
});

const Header = props => {
  const { menuData, defaultPath, location, history } = props
  const { pathname } = location
  let currentPathname = pathname
  if (pathname === '/') {
    currentPathname = '/dashboard-manage'
  }
  // 选择工作空间
  const selectWorkspace = ({ key }) => {
    if (key == 1) {
      history.push('/work-space')
    }
  }
  const menu = (
    <Menu
      className="cus-dropdown-menu"
      onClick={selectWorkspace}
    >
      <Menu.Item key="0">
        默认工作空间
      </Menu.Item>
      <Menu.Item key="1">
        工作空间管理
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="header-wraper">
      <div className="logo">
        <img src={logo} alt="" />
        <span>可视化搭建平台</span>
      </div>
      <Menu
        className="menu-nav"
        theme="dark"
        mode="horizontal"
        selectedKeys={[currentPathname]}
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
          {/* <img src={require('@/assets/images/avatar.png')} alt="" /> */}
          <i className="iconfont icon-yonghu" style={{ color: '#2482FF', fontSize: '18px' }}></i>
          <span title="admin">admin</span>
        </div>
      </div>
    </div>
  )
}

export default memo(Header)