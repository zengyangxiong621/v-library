import { newDynamic, createRoute } from '../../utils/core';

const routesConfig = (app: any) => ({
    path: '/component-dev',
    title: 'componentDev',
    component: newDynamic(app, [], () => import('./componentDev'))
});

export default (app: any) => createRoute(app, routesConfig);