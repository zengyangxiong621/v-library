/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-anonymous-default-export */
import { useFetch } from "../utils/useFetch";

export default {
  namespace: "dashboardManage",
  state: {
    templateList: [],
    groupList: [],
  },
  reducers: {
    updateTemplateList(state: any, { payload }: any) {
      return { ...state, templateList: payload };
    },
    setGroupList(state: any, { payload }: any) {
      return { ...state, groupList: payload };
    },
    updateGroupList(state: any, { payload }: any) {
      return { ...state, groupList: payload };
    },
  },
  effects: {
    *getTemplateList({ payload }: any, { call, put, select }: any): any {
      const [, data] = yield useFetch("/visual/application/queryAppList", {
        body: JSON.stringify(payload),
      });
      yield put({
        type: "updateTemplateList",
        payload: data?.content || [],
      });
    },
    *getGroupTree({ payload }: any, { call, put }: any): any {
      const [, data] = yield useFetch(
        `/visual/application/queryGroupList?spaceId=${payload.spaceId}`,
        {
          method: "get",
        }
      );
      const finalGroupTree: any = [
        {
          groupId: "wrap",
          name: "应用列表",
          children: data,
        },
      ];
      yield put({
        type: "dashboardManage/setGroupList",
        payload: finalGroupTree,
      });
    },
  },
};
