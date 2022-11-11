import { newDynamic, createRoute } from "../../utils/core";

const routesConfig = (app: any) => ({
  path: "/template",
  title: "新建",
  component: newDynamic(app, [], () => import("./template"))
});

export default (app: any) => createRoute(app, routesConfig);
