import dynamic from 'dva/dynamic';
import { Route, Switch, Redirect } from 'dva/router';

export const newDynamic = (app, model, component) => {
  return dynamic({
    app,
    models: () => model,
    component
  })
}

/**
 * @param {app} app
 * @param {func} routerConfig
 */
export const createRoutes = (app, routerConfig) => {
  return (
    <Switch>
      {
        routerConfig(app).map(config => createRouter(app, () => config))
      }
    </Switch>
  )
}

export const createRouter = (app, routerConfig) => {
  const {
    title,
    path,
    indexRouter,
    component: Comp,
    ...otherProps
  } = routerConfig(app);
  
  const routePorps = Object.assign({
    key: path || '/404',
    render: props => <Comp routerData={otherProps} {...props} />
  },

  path && {
    path: path
  });

  // if (indexRouter) {
  //   return [
  //     <Redirect key={path + '_redirect'} exact from={path} to={indexRouter} />,
  //     <Route {...routePorps} />
  //   ];
  // }
  return <Route {...routePorps} />;
}