import { newDynamic, createRoute } from '../../utils/core';

const routesConfig = (app: any) => ({
    path: '/alarm-log',
    title: '告警管理',
    component: newDynamic(app, [], () => import('./alarmLog'))
});

export default (app: any) => createRoute(app, routesConfig);