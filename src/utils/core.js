import dynamic from 'dva/dynamic';
import { Route, Switch } from 'dva/router';

export const newDynamic = (app, models, component) => {
  return dynamic({
    app,
    models: () => models,
    component
  })
}

/**
 * @param {app} app
 * @param {func} routesConfig
 */
export const createRoutes = (app, routesConfig) => {
  const routes = routesConfig(app)
  .map(config => createRoute(app, () => config))
  .reduce((p, n) => {
    if (n.length) {
      return [...p, ...n];
    } else {
      return p.concat(n);
    }
  }, []);
  return (<Switch> { routes } </Switch>)

}

// 路由映射表
window.dva_router_pathMap = {};

export const createRoute = (app, routerConfig) => {
  const currentRoute = routerConfig(app);
  const {
    title,
    path,
    indexRouter,
    component: Comp,
    ...otherProps
  } = currentRoute

  if (path && path !== '/') {
    window.dva_router_pathMap[path] = { path, title, ...otherProps };
    // 为子路由增加parentPath
    if (otherProps.childRoutes && otherProps.childRoutes.length) {
      otherProps.childRoutes.forEach(item => {
        if (window.dva_router_pathMap[item.key]) {
          window.dva_router_pathMap[item.key].parentPath = path;
        }
      });
    }
  }

  const routeProps = Object.assign({
    key: path || '/404',
    render: props => {
      return <Comp routerData={otherProps} {...props} />
    }
  },
  path && {
    path: path
  });

  return <Route {...routeProps} />;
}
