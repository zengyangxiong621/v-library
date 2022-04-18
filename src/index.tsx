import React from 'react';
import ReactDOM from 'react-dom';
import dva, { router } from 'dva';
import { createBrowserHistory } from 'history'
import reportWebVitals from './reportWebVitals';

import './index.css';
import "antd/dist/antd.css";
import '../src/assets/iconfont/iconfont.css';
import './assets/fonts/iconfont.css'
import { ConfigProvider } from 'antd';

import { createRoutes } from './utils/core';
import RoutesConfig from './routerConfig';

const { Router } = router;

// -> 初始化
const app = dva({
  history: createBrowserHistory()
})

// -> 注册全局模型
app.model(require('./models/global').default);

// -> 初始化路由
app.router(({ history, app }: any) => (
  <div>
    <Router history={history}>{createRoutes(app, RoutesConfig)}</Router>
  </div>
));

// -> Start
app.start('#root');

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
