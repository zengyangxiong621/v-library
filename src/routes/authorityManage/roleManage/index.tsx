import { newDynamic, createRoute } from "@/utils/core";

const routesConfig = (app: any) => ({
  path: "/authority-manage/role-manage",
  title: "角色管理",
  component: newDynamic(app, [], () => import("./roleManage")),
});
const Page = (app: any) => createRoute(app, routesConfig);
export default Page;
