import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import * as DvaRouter from 'dva/router';
import dynamic from 'dva/dynamic'

const menuGlobal = [
  {
    name: '可视化平台',
    path: '/',
    indexRoute: '/dashboard',
    models: () => [],
    component: () => import('./routes/home'),
    children: []
  },

  {
    name: '工作空间',
    path: '/workspace',
    models: () => [],
    component: () => import('./routes/home'),
    children: []
  },

  {
    name: '我的数据源',
    path: '/datasource',
    models: () => [],
    component: () => import('./routes/home'),
    children: []
  },

  {
    name: '我的仪表盘',
    path: '/dashboard',
    models: () => [],
    component: () => import('./routes/home'),
    children: [{
      name: '新建仪表盘',
      path: '/dashboard/:id',
      models: () => [],
      component: () => import('./routes/home')
    }]
  },

  {
    name: '我的模板',
    path: '/template',
    models: () => [],
    component: () => import('./routes/home')
  },

  {
    name: '门户管理',
    path: '/portal',
    models: () => [],
    component: () => import('./routes/home'),
    children: [{
      name: '新建门户',
      path: '/portal/create/:id',
      models: () => [],
      component: () => import('./routes/home')
    }]
  },

  {
    name: '资源中心',
    path: '/resource',
    models: () => [],
    component: () => import('./routes/home'),
    children: []
  },

  {
    id: 'home',
    pid: '0',
    name: 'home',
    icon: 'user',
    path: '/',
    models: () => [import('./models/bar'), import('./models/operate'),import('./models/pageSetting')], //models可多个
    component: () => import('./routes/home'),
  },
  {
    id: 'dashboard',
    pid: '0',
    name: 'dashboard',
    icon: 'dashboard',
    path: '/dashboard',
    models: () => [import('./models/dashboard')], // models可多个
    component: () => import('./routes/dashboard.tsx')
  },
  {
    id: 'dataSource',
    pid: '0',
    name: 'dataSource',
    icon: 'dataSource',
    path: '/dataSource',
    models: () => [], // models可多个
    component: () => import('./routes/tempDataSource/index.tsx')
  },
  {
    id: 'test',
    pid: '0',
    name: 'test',
    icon: 'test',
    path: '/test',
    models: () => [import('./models/test')], // models可多个
    component: () => import('./routes/test.tsx')
  },
  {
    id: 'one',
    pid: '0',
    name: 'aaa页',
    icon: 'user',
    path: '/one',
    models: () => [import('./models/one')], //models可多个
    component: () => import('./routes/pageOne'),
  },
  {
    id: 'two',
    pid: '0',
    name: 'bbb页',
    icon: 'user',
    path: '/one/two',
    models: () => [import('./models/two')], //models可多个
    component: () => import('./routes/pageTwo'),
  },
  {
    id: 'three',
    pid: '0',
    name: 'ccc页',
    icon: 'user',
    path: '/three',
    models: () => [import('./models/three')], //models可多个
    component: () => import('./routes/pageThree'),
  },
];

// export interface Props {
//   history: any,
//   app: any
// }

const RouterConfig = ({ history, app }) => {
  return (
    <Router history={history}>
      <Switch>
        {
          menuGlobal.map(({ path, ...dynamics }, index) => (
            <Route
              key={index}
              path={path}
              exact
              component={dynamic({
                app,
                ...dynamics
              })}
            />
          ))
        }
      </Switch>
    </Router>
  )
}

export default RouterConfig;
