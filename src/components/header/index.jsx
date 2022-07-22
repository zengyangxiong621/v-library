import React, { memo, useState, useEffect } from 'react';
import { Link } from 'dva/router';

import './index.less'
import { Layout, Menu, Dropdown,Modal,Form, Input } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import logo from '@/assets/images/logo.svg';
import { useFetch } from "@/utils/useFetch";
import {localStore} from "@/services/LocalStoreService"
import { logout, forwardLogin } from '@/services/loginApi'


const userInfo = JSON.parse(localStore.getUserInfo())
const createMenu = ((menuData, props) => {  //创建菜单
  const { location, history } = props
  let menu = [];
  for (let i = 0; i < menuData.length; i++) {
    const menuItem = menuData[i]
    if(menuItem?.children){
      // 存在子菜单
      menu.push(
        <Menu.SubMenu key={menuItem.title} title={menuItem.title}>
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

  const [isModalVisible, setModalVisible] = useState(false);
  // 选择工作空间
  const selectWorkspace = ({ key }) => {
    if (key == 1) {
      history.push('/work-space')
    }
  }
  const handleLogout=async ()=>{
    const token=localStorage.getItem('token')
    const params={
      token
    }
    const [,data]=await useFetch('/visual/login/logout',{
      body:JSON.stringify(params)
    })
    return !!data
  }
  const handleUserMenuClick=async ({key}) => {
    if(key==='1'){
      const token=localStorage.getItem('token')
      if (token && token.endsWith('x-gridsumdissector')) {
        logout()
        forwardLogin()
      }else{
        const isLogoutSuccess=await handleLogout()
        if(isLogoutSuccess){
          localStore.clearAll()
          history.replace('/login')
        }
      }
    }else{
      setModalVisible(true)
    }
  }
  const handleConfirm=()=>{

  }
  const handleCancel=()=>{
    setModalVisible(false)
  }
  const workSpaceMenu = (
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
  const userMenu=(
    <Menu
      className="cus-dropdown-menu"
      onClick={handleUserMenuClick}
    >
     {
       userInfo && userInfo.type === -2 &&
      <Menu.Item key="0">
        修改密码
      </Menu.Item>
     }
      <Menu.Item key="1">
        退出登录
      </Menu.Item>
    </Menu>
  )
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
          <Dropdown overlay={workSpaceMenu} trigger={['click']}>
            <span className="span" onClick={e => e.preventDefault()}>
              默认工作空间 <DownOutlined />
            </span>
          </Dropdown>
        </div>
        <div className="user">
          {/* <img src={require('@/assets/images/avatar.png')} alt="" /> */}
          <Dropdown overlay={userMenu} trigger={['click']}>
            <div className='curUser'>
              <i className="iconfont icon-yonghu" style={{ color: '#2482FF', fontSize: '18px' }}></i>
              <span title="admin">admin</span>
            </div>
          </Dropdown>
        </div>
      </div>

      <Modal title="修改密码" visible={isModalVisible} getContainer={false} onOk={handleConfirm} onCancel={handleCancel} okText='确认' cancelText='取消'>
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          autoComplete="off"
        >
          <Form.Item
            label="旧密码"
            name="oldpsd"
            rules={[{ required: true, message: '请输入旧密码!' }]}
          >
            <Input placeholder='请输入旧密码' />
          </Form.Item>

          <Form.Item
            label="新密码"
            name="newpsd"
            rules={[{ required: true, message: '请输入新密码!' }]}
          >
            <Input.Password placeholder='请输入新密码' />
          </Form.Item>

          <Form.Item
            label="新密码"
            name="newpsd"
          >
            <Input.Password placeholder='请再次输入新密码' />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default memo(Header)