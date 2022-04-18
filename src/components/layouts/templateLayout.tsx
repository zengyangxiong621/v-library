import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { router } from 'dva';
import { Route } from 'dva/router';
import dynamic from 'dva/dynamic';
import { connect } from '../../utils/connect';

import { newDynamic } from '../../utils/core';
import CustomHeader from '../header/index'
import DashboardManage from '../../routes/myDashboard/myDashboard';

const { Content } = Layout;
const { Switch } = router;
interface Props {
  config?: any,
  routerData?: any,
  component?: any,
  location?: any,
  global?: any
}

interface State {}

const mapStateToProps = (state: any) => {
  return state
}

class TemplateLayout extends Component<Props, State> {
  constructor(Props: any) {
    super(Props)
  }
  render () {
    const { routerData, location, global } = this.props
    const { childRoutes } = routerData
    const { pathname } = location
    const { menuData } = global

    console.log(childRoutes, 'basic0000000000000000')

    const isDashboardPage = pathname !== '/dashboard'
    const isPathRoot = pathname === '/'
    const defaultPath = '/dashboard-manage'

    return (
      <Layout key={this.props.location.pathname}>
        { isDashboardPage && <CustomHeader {...this.props} menuData={ menuData } defaultPath={ defaultPath }></CustomHeader> }
        <Content>
          {
            isPathRoot ? <DashboardManage></DashboardManage> : <Switch location={location}>{childRoutes}</Switch>
          }
        </Content>
      </Layout>
    )
  }
}

export default connect(mapStateToProps)(TemplateLayout); 
// export default 
// connect(mapStateToProps)(
//   (props: any)=>{
//     return <BasicLayout {...props} key={props.location.pathname} />
//   }); 

