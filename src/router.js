import React from "react";
import { Router, Route, Switch } from "dva/router";
import * as DvaRouter from "dva/router";
import dynamic from "dva/dynamic";

const menuGlobal = [
  {
    name: "可视化平台",
    path: "/",
    indexRoute: "/dashboard",
    models: () => [
      import("./models/dashboardGlobal"),
      import("./models/bar"),
      import("./models/operate"),
      import("./models/pageSetting"),
    ], //models可多个
    component: () => import("./routes/dashboard"),
    children: [],
  },

  {
    name: "工作空间",
    path: "/workspace",
    models: () => [],
    component: () => import("./routes/dashboard"),
    children: [],
  },

  {
    name: "我的数据源",
    path: "/datasource",
    models: () => [],
    component: () => import("./routes/tempDataSource/index.tsx"),
    children: [],
  },

  {
    name: "我的仪表盘",
    path: "/dashboard",
    models: () => [],
    component: () => import("./routes/myDashboard"),
    children: [
      {
        name: "新建仪表盘",
        path: "/id",
        models: () => [],
        component: () => import("./routes/tempDataSource/index.tsx"),
      },
    ],
  },
  {
    name: "仪表盘模板",
    path: "/template",
    models: () => [],
    component: () => import("./routes/dashboardTemplate"),
  },
  {
    name: "预览模板",
    path: "/bigscreen:id",
    models: () => [],
    component: () => import("./routes/dashboard"),
  },
  {
    name: "门户管理",
    path: "/portal",
    models: () => [],
    component: () => import("./routes/dashboard"),
    children: [
      {
        name: "新建门户",
        path: "/portal/create/:id",
        models: () => [],
        component: () => import("./routes/dashboard"),
      },
    ],
  },

  {
    name: "资源中心",
    path: "/resource",
    models: () => [],
    component: () => import("./routes/dashboard"),
    children: [],
  },

  // {
  //   name: "自定义组件",
  //   path: "/components",
  //   models: () => [import("./models/components")], // models可多个
  //   component: () => import("./routes/components.tsx"),
  // },
  {
    name: "header",
    path: "/header",
    models: () => [],
    component: () => import("./routes/controlCabin"),
    children: [],
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
        {menuGlobal.map(({ path, ...dynamics }, index) => (
          <Route
            key={index}
            path={path}
            exact
            component={dynamic({
              app,
              ...dynamics,
            })}
          />
        ))}
      </Switch>
    </Router>
  );
};

export default RouterConfig;
