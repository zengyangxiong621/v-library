import { newDynamic, createRoute } from "../../utils/core";

const routesConfig = (app: any) => ({
  path: "/cockpit",
  title: "我的驾驶舱",
  component: newDynamic(app, [], () => import("./controlCabin")),
});

export default (app: any) => createRoute(app, routesConfig);
