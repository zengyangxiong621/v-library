import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { Route, Switch, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic';
import { connect } from '../../utils/connect';

import { newDynamic } from '../../utils/core';
import CustomHeader from '../header/index'
import DashboardManage from '../../routes/myDashboard/myDashboard';

const { Content } = Layout;
interface Props {
  config?: any,
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
  }
  render() {
    const { routerData, location, global, history } = this.props
    const { childRoutes } = routerData
    const { pathname } = location
    const { menuData } = global

    const needHeader = pathname.indexOf('/dashboard/') !== -1 || pathname === '/template' || pathname.startsWith('/bigscreen')
    const isPathRoot = pathname === '/'
    const defaultPath = '/dashboard-manage'
    return (
      <Layout>
        {!needHeader && <CustomHeader {...this.props} menuData={menuData} defaultPath={defaultPath}></CustomHeader>}
        <Content>
          {
            isPathRoot ? <Redirect to={defaultPath}></Redirect> : <Switch location={location}>{childRoutes}</Switch>
          }
        </Content>
      </Layout>
    )
  }
}

export default connect(mapStateToProps)(BasicLayout);

