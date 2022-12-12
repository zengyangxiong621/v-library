import { newDynamic, createRoute } from "../../utils/core";
import myDashboard from "./myDashboard";
const routesConfig = (app: any) => {
  return {
    path: "/dashboard-manage",
    title: "我的可视化",
    component: newDynamic(
      app,
      [import("../../models/dashboardManage"), import("../../models/bar")],
      () => import("./myDashboard")
    ),
  };
};
const Page = (app: any) => createRoute(app, routesConfig);
export default Page;
