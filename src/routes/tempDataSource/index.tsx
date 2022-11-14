import { newDynamic, createRoute } from "../../utils/core";

const routesConfig = (app: any) => ({
  path: "/datasource",
  title: "datasource",
  component: newDynamic(app, [], () => import("./datasource")),
});

export default (app: any) => createRoute(app, routesConfig);
