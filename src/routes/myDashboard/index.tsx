import { newDynamic, createRoute } from "../../utils/core";
import myDashboard from "./myDashboard";
const routesConfig = (app: any) => {
  app.model(require("../../models/dashboardManage.ts").default);
  app.model(require("../../models/bar.ts").default);

  return {
    path: "/dashboard-manage",
    title: "我的可视化",
    component: myDashboard,
    // component: newDynamic(
    //   app,
    //   [import("../../models/dashboardManage"), import("../../models/bar")],
    //   () => import("./myDashboard")
    // ),
  };
};
const Page = (app: any) => createRoute(app, routesConfig);
export default Page;
