import { newDynamic, createRoute } from "../../../utils/core";

const routesConfig = (app: any) => ({
  path: "/components",
  title: "components",
  component: newDynamic(app, [import("../../../models/components")], () => import("./text"))
});

export default (app: any) => createRoute(app, routesConfig);