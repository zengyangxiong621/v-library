import BasicLayout from './components/layouts/basicLayout';
import Components from './routes/components/text';
import DashboardManage from './routes/myDashboard';
import DashboardTemplate from './routes/dashboardTemplate';
import Dashboard from './routes/dashboard';
import DataSource from './routes/tempDataSource';
import ControlCabin from './routes/controlCabin';
import previewDashboard from './routes/previewDashboard';
import WorkSpace from './routes/workSpace'

const routesConfig = (app: any) => [
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
    model: () => {
      import('./models/global')
    },
    component: BasicLayout,
    childRoutes: [
      // {
      //   name: 'workspace',
      //   title: '工作空间',
      //   path: '/workspace',
      //   models: [],
      //   component: Dashboard,
      //   childRoutes: []
      // },

      // {
      //   name: 'resource',
      //   title: '资源中心',
      //   path: '/resource',
      //   models: [],
      //   component: Dashboard,
      //   childRoutes: []
      // },
      
      Components(app),
      DashboardManage(app),
      DashboardTemplate(app),
      Dashboard(app),
      DataSource(app),
      ControlCabin(app),
      previewDashboard(app),
      WorkSpace(app)
    ]
  }

];

export default routesConfig;
// export default app => createRoutes(app, RoutesConfig);
