import { newDynamic, createRoute } from '../../utils/core';

const routesConfig = (app: any) => ({
    path: '/componentDev',
    title: 'componentDev',
    component: newDynamic(app, [], () => import('./componentDev'))
});

export default (app: any) => createRoute(app, routesConfig);