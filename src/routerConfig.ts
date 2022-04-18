import BasicLayout from './components/layouts/basicLayout';
import Components from './routes/components';
import DashboardManage from './routes/myDashboard';
import DashboardTemplate from './routes/dashboardTemplate';
import Dashboard from './routes/dashboard';
import DataSource from './routes/tempDataSource';
import ControlCabin from './routes/controlCabin';

import Test from './routes/test';

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
      // Test(app)
    ]
  },

        {
        name: 'test',
        title: 'test',
        path: '/test',
        models: [],
        component: Test,
        childRoutes: []
      },

];

export default routesConfig;
// export default app => createRoutes(app, RoutesConfig);
