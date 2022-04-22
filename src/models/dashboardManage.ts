/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-anonymous-default-export */
import { useFetch } from "../utils/useFetch";

export default {
  namespace: "dashboardManage",
  state: {
    templateList: [],
  },
  reducers: {
    updateTemplateList(state: any, { payload }: any) {
      return { ...state, templateList: payload };
    },
  },
  effects: {
    *getTemplateList({ payload }: any, { call, put, select }: any): any {
      const [, data] = yield useFetch("/visual/application/queryAppList", {
        body: JSON.stringify(payload),
      });
      yield put({
        type: "updateTemplateList",
        payload: data.content ?? [],
      });
    },
  },
};
