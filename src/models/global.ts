export default {
  namespace: "global",
  state: {
    menuData: [
      {
        path: "/dashboard-manage",
        title: "我的可视化"
      },
      {
        path: "/datasource",
        title: "我的数据"
      },
      {
        path: "/component-dev",
        title: "组件开发"
      },
      {
        path: "/cockpit",
        title: "驾驶舱"
      },
      {
        path: "/resource-center",
        title: "资源中心"
      },
      {
        title: "权限管理",
        children: [
          {
            title: '用户管理',
            path: '/authority-manage/user-manage'
          },
          {
            title: '角色管理',
            path: '/authority-manage/role-manage'
          }
        ]
      }
    ]
  }
};
