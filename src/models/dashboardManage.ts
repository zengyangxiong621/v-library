import { http } from "@/services/request";

export default {
  namespace: "dashboardManage",
  state: {
    templateList: [],
    groupList: [],
    curSelectedGroup: [],
    curSelectedGroupName: "",
    appListLoading: false,
    groupTreeLoading: false,
  },
  reducers: {
    // resetTheModels(state: any) {
    //   return { ...state }
    // },
    resetModel(state: any, { payload }: any) {
      return { ...state, ...payload };
    },
    updateTemplateList(state: any, { payload }: any) {
      return { ...state, templateList: payload };
    },
    setGroupList(state: any, { payload }: any) {
      return { ...state, groupList: payload };
    },
    updateGroupList(state: any, { payload }: any) {
      return { ...state, groupList: payload };
    },
    // 设置当前选中的 应用分组 payload => 当前选中树节点的数组 string[]
    setCurSelectedGroup(state: any, { payload }: any) {
      return { ...state, curSelectedGroup: payload };
    },
    setCurSelectedGroupName(state: any, { payload }: any) {
      return { ...state, curSelectedGroupName: payload };
    },
    setAppListLoading(state: any, { payload }: any) {
      return { ...state, appListLoading: payload };
    },
    setGroupTreeLoading(state: any, { payload }: any) {
      return { ...state, groupTreeLoading: payload };
    },
  },
  effects: {
    *getTemplateList({ payload }: any, { put }: any): any {
      try {
        yield put({
          type: "setAppListLoading",
          payload: true,
        });
        const data = yield http({
          url: "/visual/application/queryAppList",
          method: "post",
          body: payload,
        });
        yield put({
          type: "setAppListLoading",
          payload: false,
        });
        yield put({
          type: "updateTemplateList",
          payload: data?.content || [],
        });
      } catch (error) {
        console.log("获取应用列表失败", error);
      }
    },
    *getGroupTree({ payload }: any, { put }: any): any {
      try {
        yield put({
          type: "setGroupTreeLoading",
          payload: true,
        });
        const data = yield http({
          url: `/visual/application/queryGroupList?spaceId=${payload.spaceId}`,
          method: "get",
        });
        yield put({
          type: "setGroupTreeLoading",
          payload: false,
        });
        yield put({
          type: "setGroupList",
          payload: [
            {
              groupId: "wrap",
              name: "应用列表",
              children: data,
            },
          ],
        });
      } catch (error) {
        console.log("获取左侧分组列表失败", error);
      }
    },
  },
};
