import { newDynamic, createRoute } from "../../utils/core";

const routesConfig = (app: any) => ({
  path: "/template",
  title: "新建",
  component: newDynamic(app, [], () => import("./template"))
});

// eslint-disable-next-line import/no-anonymous-default-export
export default (app: any) => createRoute(app, routesConfig);
