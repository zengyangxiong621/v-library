/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-anonymous-default-export */
import { http } from "@/services/request";

export default {
  namespace: "workSpace",
  state: {
    accountId: "123", // 所有空间id都需要带上的accountId
    memberList: [],
    workSpaceList: [],
    curWorkSpace: [], // 当前所选中的空间id
    projectQuota: 0, // 项目配额
    remainQuota: 0, // 项目剩余配额
    minQuota: 0, // 项目配额最小数量 <==> 当前空间里所有的应用总数
  },
  reducers: {
    // 值为基础类型的Key 更新状态的方法
    setBaseTypeKey(state: any, { payload }: { payload: TStingIndex }) {
      return { ...state, ...payload };
    },
    setMemberList(state: any, { payload }: any) {
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
      const { data } = yield http({
        url: "/visual/workspace/userList",
        method: "post",
        body: payload,
      });
      yield put({
        type: "setMemberList",
        payload: data?.content || [],
      });
    },
    *getWorkSpaceList({ payload }: any, { call, put, select }: any): any {
      const data = yield http({
        url: `/visual/workspace/list`,
        method: "get",
      });
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
      // 1、设置 默认空间 为选中状态,
      // 2、选择默认工作空间时的流程需要先走一遍
      // 3、如果当前已经选择了空间了，就不设置默认空间了
      const self: any = yield select(({ workSpace }: any) => workSpace);
      let finalPayload: any = {};
      if (!self.curWorkSpace.length) {
        const { id, projectQuota, remainQuota } = data[0];
        finalPayload = {
          curWorkSpace: [id],
          projectQuota,
          remainQuota,
          minQuota: projectQuota - remainQuota,
        };
      } else {
        /**
         * @Mark: 由于后端将每个空间的信息(id,projectQuota,remainQuota)全部放在了空间列表中(即此处的data), 所以，每次更新配额之后都要重新刷新左侧空间列表
         */
        const id = self.curWorkSpace[0];
        const { remainQuota, projectQuota } = data.find((item: any) => {
          return item.id === id;
        });
        finalPayload = {
          projectQuota,
          remainQuota,
          minQuota: projectQuota - remainQuota,
        };
      }
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
