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
  component?: any
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
    const { routerData } = this.props
    const { childRoutes } = routerData

    return (
      <Layout>
        <Header>
        </Header>
        <Content>
            {
              childRoutes.map((route: any, index: number) => {
                const {path, models, component} =  route
                console.log(route, '-----------------')
                { 
                  // <Route
                  //   exact
                  //   key={ index }
                  //   path={ path }
                  //   component={ newDynamic() }
                  // /> 
                }
              })
            }
        </Content>
      </Layout>
    )
  }
}

// export default BasicLayout
export default connect(mapStateToProps)(BasicLayout); 