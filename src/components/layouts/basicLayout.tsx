import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { router } from 'dva';
import { Route } from 'dva/router';
import dynamic from 'dva/dynamic';
import { connect } from '../../utils/connect';
import { newDynamic } from '../../utils/core';

const { Header, Content } = Layout;
const { Switch } = router;

interface Props {
  config?: any,
  routerData?: any,
  component?: any,
  location?: any
}

interface State {}

const mapStateToProps = (state: any) => {
  return state
}

class BasicLayout extends Component<Props, State> {
  constructor(Props: any) {
    super(Props)
  }
  render () {
    const { routerData, location } = this.props
    const { childRoutes } = routerData

    return (
      <Layout>
        <Header>
        </Header>
        <Content>
          <Switch>{childRoutes}</Switch>
        </Content>
      </Layout>
    )
  }
}

// export default BasicLayout
export default connect(mapStateToProps)(BasicLayout); 