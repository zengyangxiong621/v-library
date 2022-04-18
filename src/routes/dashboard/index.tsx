import { newDynamic, createRoute } from '../../utils/core';

const routesConfig = (app: any) => ({
  path: '/dashboard',
  title: 'dashboard',
  component: newDynamic(app, [import("../../models/dashboardGlobal"), import("../../models/bar"), import("../../models/operate"), import("../../models/pageSetting"),
], () => import('./dashboard'))
});

export default (app: any) => createRoute(app, routesConfig);

