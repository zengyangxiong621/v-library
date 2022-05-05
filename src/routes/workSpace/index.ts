import { newDynamic, createRoute } from '../../utils/core';

const routesConfig = (app: any) => ({
  path: '/work-space',
  title: '工作空间',
  component: newDynamic(app, [import('../../models/workspace')], () => import('./workSpace'))
});
const Page = (app: any) => createRoute(app, routesConfig);

export default Page