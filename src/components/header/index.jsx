import React, { memo, useState, useEffect } from 'react';
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

const Header = props => {
  const menuClick = (item, key) => {
    console.log(item, key)
    // todo 页面跳转
    // props.history.push(key)
  }

  return (
    <div className="header-wraper">
      <div className="logo">
        <img src={require('@/assets/images/logo.png')} alt="" />
        <span>可视化搭建平台</span>
      </div>
      <Menu className="menu-nav" theme="dark" mode="horizontal" defaultSelectedKeys={['1']} onClick={menuClick}>
        <Menu.Item key="1">我的可视化</Menu.Item>
        <Menu.Item key="2">我的数据</Menu.Item>
        <Menu.Item key="3">门户管理</Menu.Item>
        <Menu.Item key="4">组件开发</Menu.Item>
        <Menu.Item key="5">驾驶舱</Menu.Item>
        <Menu.Item key="6">资源中心</Menu.Item>
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