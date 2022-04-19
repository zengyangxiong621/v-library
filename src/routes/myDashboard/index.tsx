import { newDynamic, createRoute } from '../../utils/core';

const routesConfig = (app: any) => ({
  path: '/dashboard-manage',
  title: '我的可视化',
  component: newDynamic(app, [], () => import('./myDashboard'))
});
const Page = (app: any) => createRoute(app, routesConfig);
export default Page
