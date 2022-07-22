import React, { Component, Fragment } from 'react';
import { Layout, Menu } from 'antd';
import { Route, Switch, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic';
import { connect } from '../../utils/connect';

import { newDynamic } from '../../utils/core';
import CustomHeader from '../header/index'
import DashboardManage from '../../routes/myDashboard/myDashboard';
import { Spin,Empty } from 'antd'
import './index.less'

const { Content } = Layout;
interface Props {
  config?: any,
  dispatch?:any,
  routerData?: any,
  component?: any,
  location?: any,
  global?: any,
  history?: any
}

interface State { }

const mapStateToProps = (state: any) => {
  return state
}
class BasicLayout extends Component<Props, State> {

  constructor(Props: any) {
    super(Props)
    this.state={
      loading: false
    }
  }

  handleGetAccountInfo=()=>{
    const {global,dispatch}=this.props
    const {userInfo}=global
    const token=localStorage.getItem('token')
    if(token && !userInfo){
      dispatch({
        type:'global/getCurUserInfo'
      })
    }
  }
  filterMenu=(menuData:any,menusNameArr:any)=>{
    return menuData.filter((item:any)=>{
      if(menusNameArr.includes(item.title)){
        if(Array.isArray(item.children)){
          item.children=this.filterMenu(item.children,menusNameArr)
        }
        return true
      }else{
        return false
      }
    })
  }

  componentDidMount(): void {
    this.handleGetAccountInfo()
  }
  render() {
    const { routerData, location, global, history } = this.props
    const { childRoutes } = routerData
    const { pathname } = location
    const { menuData,userInfo } = global
    let _menuData:any = []
    if(userInfo){
      const menusNameArr = (userInfo.menus || []).map((item:any)=>item.name)
       _menuData=this.filterMenu(menuData,menusNameArr) || []
    }

    const needHeader = pathname.indexOf('/dashboard/') !== -1 || pathname === '/template' || pathname.startsWith('/bigscreen') || pathname.startsWith('/publishScreen')
    const isPathRoot = pathname === '/'
    // const defaultPath =  '/dashboard-manage'
    const defaultPath = _menuData.length ? _menuData[0].children ? _menuData[0].children[0].path : _menuData[0].path : '/'
    return (
      <Fragment>
        {
          !userInfo ? 
          <Spin className='full-spin' tip="Loading..."></Spin> :
          <Layout>
            {!needHeader && <CustomHeader {...this.props} menuData={_menuData} defaultPath={defaultPath}></CustomHeader>}
            {
              _menuData && _menuData.length ? (
                <Fragment>
                  <Content>
                    {
                      isPathRoot ? <Redirect to={defaultPath}></Redirect> : <Switch location={location}>{childRoutes}</Switch>
                    }
                  </Content>
                </Fragment>
              ) : <Empty className="content-empty" description={<span>请添加菜单权限</span>} />
            }
          </Layout>
        }
      </Fragment>
    )
  }
}

export default connect(mapStateToProps)(BasicLayout);

