import { http } from "@/services/request";
const globalStroe={
  namespace: "global",
  state: {
    userInfo:null,
    workspaceList: [],
    curWorkspace: {},
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
  },
  subscriptions:{
    setup({ dispatch, history }: { dispatch: any; history: any }){
      history.listen((location: any) => {
        const pathName=location.pathname || location.location.pathname
        if(pathName==='/login'){
          dispatch({
            type:'global/setUserInfo',
            payload:null
          })
          return
        }
        const token=localStorage.getItem('token')
        if(!token){
          history.replace('/login')
        }
      });
    }
  },
  reducers: {
    setUserInfo(state:any,{payload}:any){
      return {
        ...state,
        userInfo:payload
      }
    },
    setWorkspaceList(state:any,{payload}:any){
      return {
        ...state,
        workspaceList:payload
      }
    },
    setCurWorkspace(state:any,{payload}:any){
      return {
        ...state,
        curWorkspace:payload
      }
    }
  },
  effects: {
    *getCurUserInfo({ payload }: any, { put }: any):any {
      try {
        const data=yield http({
          url:'/visual/user/getAccountInfo',
          method:'post'
        })
        if(data){
          yield put({
            type: "setUserInfo",
            payload: data,
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 获取所有工作空间
    *getWorkspaceList({ payload }: any, { put }: any):any{
      try {
        const data=yield http({
          url: `/visual/workspace/list`,
          method: "get",
        })
        if(data.length){
          // 设置工作空间
          yield put({
            type: "setWorkspaceList",
            payload: data,
          });
          yield put({
            type: "setCurWorkspace",
            payload: data[0],
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
};
export default globalStroe
