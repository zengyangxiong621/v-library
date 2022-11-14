import { newDynamic, createRoute } from "../../utils/core";

const routesConfig = (app: any) => ({
  path: "/resource-center",
  title: "资源中心",
  component: newDynamic(
    app,
    [import("../../models/resourceCenter")],
    () => import("./resourceCenter")
  ),
});
const Page = (app: any) => createRoute(app, routesConfig);
export default Page;
