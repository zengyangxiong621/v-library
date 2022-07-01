import { newDynamic, createRoute } from "@/utils/core";

const routesConfig = (app: any) => ({
  path: "/authority-manage/user-manage",
  title: "用户管理",
  component: newDynamic(app, [import("@/models/userManage")], () =>
    import("./userManage")
  )
});
const Page = (app: any) => createRoute(app, routesConfig);
export default Page;
