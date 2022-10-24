import React from "react";
import ReactDOM from "react-dom";
import dva from "dva";
import { BrowserRouter } from "dva/router";
import reportWebVitals from "./reportWebVitals";
import { authorize, forwardLogin, GetQueryString } from "./services/loginApi";
import { localStore } from "./services/LocalStoreService";


import "./index.css";
import "antd/dist/antd.css";
import "../src/assets/iconfont/iconfont.css";
import "./assets/fonts/iconfont.css";
import { ConfigProvider, message, Button } from "antd";

import { createRoutes } from "./utils/core";
import RoutesConfig from "./routerConfig";
message.config({
  duration: 2,
  maxCount: 1,
});

// -> 初始化
const app = dva();

// -> 注册全局模型
app.model(require("./models/global").default);

const init = () => {
  // -> 初始化路由
  app.router(({ app }: any) => (
    <div>
      <BrowserRouter>{createRoutes(app, RoutesConfig)}</BrowserRouter>
    </div>
  ));
  // -> Start
  app.start("#root");
};

const checkToken = async () => {
  // 发布的大屏不走登录校验过程
  const isPublishScreen = window.location.href.indexOf("publishScreen") > -1;
  if (isPublishScreen) {
    init();
  } else {
    const ticket = GetQueryString("ticket");
    // 入口文件中校验登录信息
    const token = localStore.getToken();
    const pn = location.origin + location.pathname;
    if (!token) {
      try {
        await authorize();
        init();
      } catch (err) {
        if (!pn.endsWith("/login")) {
          forwardLogin();
        } else {
          init();
        }
      }
    } else {
      init();
    }
  }
};
checkToken();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
