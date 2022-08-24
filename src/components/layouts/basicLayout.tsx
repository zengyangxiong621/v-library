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
      loading: false,
      isPublishScreen: window.location.href.indexOf('publishScreen') > -1
    }
  }

  handleGetAccountInfo=()=>{
    const {global,dispatch}=this.props
    const { isPublishScreen }:any = this.state
    const {userInfo}=global
    const token=localStorage.getItem('token')
    if(token && !userInfo && !isPublishScreen){
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
    const {dispatch}=this.props
    this.handleGetAccountInfo()
    const { isPublishScreen }:any = this.state
    if(!isPublishScreen){
      dispatch({
        type:'global/getWorkspaceList'
      })
    }
  }

  render() {
    const { routerData, location, global, history } = this.props
    const { isPublishScreen }:any = this.state
    const { childRoutes } = routerData
    const { pathname } = location
    const { menuData,userInfo, workspaceList } = global
    const isWorkspace = window.location.href.indexOf('work-space') > -1
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
          (!userInfo && !isPublishScreen) || (isPublishScreen && false) ? 
          <Spin size="large" className='full-spin' tip="Loading..."></Spin> :
          <Layout>
            {!needHeader && <CustomHeader {...this.props} menuData={_menuData} defaultPath={defaultPath}></CustomHeader>}
            {
              workspaceList.length || isWorkspace || isPublishScreen  ?
              <Content>
                {
                  _menuData && _menuData.length || isPublishScreen ? 
                  isPathRoot ? <Redirect to={defaultPath}></Redirect> : <Switch location={location}>{childRoutes}</Switch> :
                  <Empty className="content-empty" description={<span>请添加菜单权限</span>} />
                }
              </Content> : <Empty className="content-empty" description={<span>请为当前用户分配空间</span>} />
            }
          </Layout>
        }
      </Fragment>
    )
  }
}

export default connect(mapStateToProps)(BasicLayout);

