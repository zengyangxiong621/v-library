/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-anonymous-default-export */
import { useFetch } from "../utils/useFetch";

export default {
  namespace: "workSpace",
  state: {
    accountId: "123", // 所有空间id都需要带上的accountId
    memberList: [],
    workSpaceList: [],
    curWorkSpace: [], // 当前所选中的空间id
    projectQuota: 0, // 项目配额
    remainQuota: 0, // 项目剩余配额
  },
  reducers: {
    // 值为基础类型的Key 更新状态的方法
    setBaseTypeKey(state: any, { payload }: { payload: TStingIndex }) {
      return { ...state, ...payload };
    },
    setMemberList(state: any, { payload }: any) {
      console.log("hhhh", payload);
      return { ...state, memberList: payload };
    },
    setWorkSpaceList(state: any, { payload }: any) {
      return { ...state, workSpaceList: payload };
    },
    // 设置当前选中的 工作空间 payload => 当前选中树节点的数组 string[]
    setCurWorkSpace(state: any, { payload }: any) {
      return { ...state, curWorkSpace: payload };
    },
  },
  effects: {
    *getMemberList({ payload }: any, { put }: any): any {
      console.log("payload", payload);
      const [, data] = yield useFetch(
        "/visual/workspace/userList",
        { body: JSON.stringify(payload) },
        { errorInfo: "空间成员列表请求失败" }
      );
      console.log("ddd", data);
      yield put({
        type: "setMemberList",
        payload: data?.content || [],
      });
    },
    *getWorkSpaceList({ payload }: any, { call, put, select }: any): any {
      const [, data] = yield useFetch(
        `/visual/workspace/list/${payload.accountId}`,
        { method: "get" },
        { errorInfo: "获取空间列表请求失败" }
      );
      yield put({
        type: "setWorkSpaceList",
        payload: [
          {
            id: "wrap",
            spaceName: "我的空间",
            children: data,
          },
        ],
      });
      // 设置 默认空间 为选中状态,
      // 选择默认工作空间时的流程需要先走一遍
      // TODO  如果当前已经选择了空间了，就不设置默认空间了
      const self: any = yield select(({ workSpace }: any) => workSpace);
      const { id, projectQuota, remainQuota } = data[0];
      const finalWorkSpace = !self.curWorkSpace.length
        ? [id]
        : self.curWorkSpace;
      const finalPayload = {
        curWorkSpace: finalWorkSpace,
        projectQuota,
        remainQuota,
      };
      yield put({
        type: "setBaseTypeKey",
        payload: finalPayload,
      });
    },
  },
};

/**
 * description: 类型
 */

type TStingIndex = {
  [K: string]: string | number;
};
