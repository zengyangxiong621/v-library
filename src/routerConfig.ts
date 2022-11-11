import BasicLayout from "./components/layouts/basicLayout";
import Components from "./routes/components/text";
import ComponentDev from "./routes/componentDev";
import DashboardManage from "./routes/myDashboard";
import DashboardTemplate from "./routes/dashboardTemplate";
import Dashboard from "./routes/dashboard";
import DataSource from "./routes/tempDataSource";
import ControlCabin from "./routes/controlCabin";
import PreviewDashboard from "./routes/previewDashboard";
import PublishDashboard from "./routes/publishDashboard";
import ResourceCenter from "./routes/resourceCenter";
import WorkSpace from "./routes/workSpace";
import UserManage from "./routes/authorityManage/userManage";
import RoleManage from "./routes/authorityManage/roleManage";
import AccountList from "./routes/authorityManage/roleManage/accountList";
import Login from "./routes/login";
import NoFound from "./routes/ErrorPage/404";
import AlarmLog from "./routes/alarmLog";

const routesConfig = (app: any) => [
  {
    name:"登录",
    path:"/login",
    component:Login,
  },
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
    name: "可视化平台",
    path: "/",
    model: () => {
      import("./models/global");
    },
    component: BasicLayout,
    childRoutes: [
      Components(app),
      ComponentDev(app),
      DashboardManage(app),
      DashboardTemplate(app),
      Dashboard(app),
      DataSource(app),
      ControlCabin(app),
      PreviewDashboard(app),
      PublishDashboard(app),
      WorkSpace(app),
      ResourceCenter(app),
      UserManage(app),
      RoleManage(app),
      AlarmLog(app),
      AccountList(app),
      NoFound()
    ]
  }
];

export default routesConfig;
// export default app => createRoutes(app, RoutesConfig);
