import { newDynamic, createRoute } from "../../utils/core";

const routesConfig = (app: any) => ({
  path: "/bigscreen/:id",
  title: "preview-dashboard",
  component: newDynamic(app, [import("../../models/previewDashboard"), import("../../models/bar"), import("../../models/drillDown")], () => import("./previewDashboard"))
});
const Page = (app: any) => createRoute(app, routesConfig);
export default Page;
