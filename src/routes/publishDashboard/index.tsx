import { newDynamic, createRoute } from '../../utils/core';

const routesConfig = (app: any) => ({
  path: '/publishScreen/:id',
  // path: '/visual/application/dashboard/show/:id',
  title: 'publish-dashboard',
  component: newDynamic(app, [import('../../models/publishDashboard')], () => import('./publishDashboard'))
});
const Page = (app: any) => createRoute(app, routesConfig);
export default Page
