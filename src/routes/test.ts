import { newDynamic, createRoute } from '../utils/core';

const routesConfig = (app: any) => ({
  path: '/test',
  title: 'test',
  component: newDynamic(app, [import('../models/components')], () => import('../components/testCom.js'))
});

export default (app: any) => createRoute(app, routesConfig);