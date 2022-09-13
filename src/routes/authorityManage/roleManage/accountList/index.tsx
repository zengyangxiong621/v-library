import { newDynamic, createRoute } from "@/utils/core";
const routesConfig=(app:any)=>({
  path: "/authority-manage/role-user",
  title: "角色管理-账号列表",
  component: newDynamic(app, [], () =>
    import("./accountList")
  ),
});
const Page = (app: any) => createRoute(app, routesConfig);
export default Page;