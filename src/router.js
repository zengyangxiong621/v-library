import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic'
import { createRoutes } from './utils/core';

import BasicLayout from './components/layouts/basicLayout';
import Components from './routes/components';
import Dashboard from './routes/components';

const routesConfig = app => [
  // {
  //   path: '/sign',
  //   name: '登录',
  //   indexRoute: '/sign/login',
  //   component: UserLayout,
  //   children: [
  //     Login(app),
  //     Register(app)
  //   ]
  // },
  {
    name: '可视化平台',
    path: '/',
    models: [],
    component: BasicLayout,
    childRoutes: [
      {
        name: 'workspace',
        title: '工作空间',
        path: '/workspace',
        models: [],
        component: Dashboard,
        childRoutes: []
      },

      // {
      //   name: 'datasource',
      //   title: '我的数据源',
      //   path: '/datasource',
      //   models: () => [],
      //   component: () => import('./routes/tempDataSource/index'),
      //   childRoutes: []
      // },

      {
        name: 'dashboardManage',
        title: '我的仪表盘',
        path: '/dashboard-manage',
        models: [],
        component: () => import('./routes/dashboardManage')
      },

      {
        name: 'template',
        title: '我的模板',
        path: '/template',
        models: [],
        component: Dashboard
      },

      {
        name: 'portal',
        title: '门户管理',
        path: '/portal',
        models: [],
        component: Dashboard,
        childRoutes: [{
          name: 'portalCreate',
          title: '新建门户',
          path: '/portal/create/:id',
          models: [],
          component: Dashboard
        }]
      },

      {
        name: 'resource',
        title: '资源中心',
        path: '/resource',
        models: [],
        component: Dashboard,
        childRoutes: []
      },

      {
        name: 'components',
        title: '自定义组件',
        path: '/components',
        exact: true,
        models: Components,
        component: Components
      }
    ]
  },

  {
    name: 'dashboard',
    title: '仪表盘',
    // path: '/dashboard/:dashboardId',
    path: '/dashboard',
    exact: true,
    models: [],
    component: Dashboard
  },

  {
    name: 'test',
    title: '自定义组件',
    path: '/test',
    exact: true,
    models: [import('./models/components')],
    component: BasicLayout
  }

];

// export default app => createRoutes(app, routesConfig);
export default routesConfig
