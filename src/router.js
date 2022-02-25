import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import * as DvaRouter from 'dva/router';
import dynamic from 'dva/dynamic'

const menuGlobal = [
  {
    id: 'home',
    pid: '0',
    name: 'home',
    icon: 'user',
    path: '/',
    models: () => [import('./models/bar')], //models可多个
    component: () => import('./routes/home'),
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
