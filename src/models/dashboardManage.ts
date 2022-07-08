/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-anonymous-default-export */
import { http } from "@/services/request";

export default {
  namespace: "dashboardManage",
  state: {
    templateList: [],
    groupList: [],
    curSelectedGroup: [],
    curSelectedGroupName: "",
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
  },
  effects: {
    *getTemplateList({ payload }: any, { call, put, select }: any): any {
      const data = yield http(
        {
          url: "/visual/application/queryAppList",
          method: "post",
          body: payload,
        }
        // {
        //   errorInfo: "应用列表请求失败",
        // }
      );
      yield put({
        type: "updateTemplateList",
        payload: data?.content || [],
      });
    },
    *getGroupTree({ payload }: any, { call, put }: any): any {
      const data  = yield http(
        {
          url: `/visual/application/queryGroupList?spaceId=${payload.spaceId}`,
          method: "get",
        }
        // {
        //   errorInfo: "应用分组列表请求失败",
        // }
      );
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
    },
  },
};
