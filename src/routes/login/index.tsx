import { newDynamic, createRoute } from "@/utils/core";

const routesConfig = (app: any) => ({
  path: "/login",
  title: "登录",
  component: newDynamic(app, [], () => import("./login")),
});
const Page = (app: any) => createRoute(app, routesConfig);
export default Page;
