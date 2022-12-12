import { newDynamic, createRoute } from "../../utils/core";
import Dashboard from "./dashboard";
const routesConfig = (app: any) => {
  return {
    path: "/dashboard/:id?/:panelId?/:stateId?",
    title: "dashboard",
    component: Dashboard,
    // component: newDynamic(
    //   app,
    //   [
    //     import("../../models/dashboard"),
    //     import("../../models/bar"),
    //     import("../../models/operate"),
    //     import("../../models/pageSetting"),
    //     import("../../models/drillDown"),
    //   ],
    //   () => import("./dashboard")
    // ),
  };
};

export default (app: any) => createRoute(app, routesConfig);
