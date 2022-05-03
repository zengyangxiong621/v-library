/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-anonymous-default-export */
import { useFetch } from "../utils/useFetch";

export default {
  namespace: "workSpace",
  state: {
    memberList: [],
    workSpaceList: [],
    curWorkSpace: [],
  },
  reducers: {
    // resetTheModels(state: any) {
    //   return { ...state }
    // },
    setMemberList(state: any, { payload }: any) {
      return { ...state, memberList: payload };
    },
    setWorkSpaceList(state: any, { payload }: any) {
      return { ...state, groupList: payload };
    },
    // 设置当前选中的 工作空间 payload => 当前选中树节点的数组 string[]
    setCurSelectedGroup(state: any, { payload }: any) {
      return { ...state, curWorkSpace: payload };
    },
  },
  effects: {
    *getMemberList({ payload }: any, { call, put, select }: any): any {
      console.log('hhh', payload)
      // const [, data] = yield useFetch(
      //   "/visual/application/queryAppList",
      //   {
      //     body: JSON.stringify(payload),
      //   },
      //   {
      //     errorInfo: "成员列表请求失败",
      //   }
      // );
      const mockData = [
        {
          name: 'kamier',
          id: 'ajielaqi',
          userType: 'top',
          updatedTime: '2022/5/3'
        },
        {
          name: 'kamier',
          id: 'ajielaqi',
          userType: 'top',
          updatedTime: '2022/5/3'
        },
        {
          name: 'kamier',
          id: 'ajielaqi',
          userType: 'top',
          updatedTime: '2022/5/3'
        }
      ]
      const data = {
        content: mockData,
        totalElements: 100,
        pageNo: 1,
        pageSize: 10,
      }
      yield put({
        type: "setMemberList",
        payload: data?.content || [],
      });
    },
    *getWorkSpaceList({ payload }: any, { call, put }: any): any {
      const [, data] = yield useFetch(
        `/visual/application/queryGroupList?spaceId=${payload.spaceId}`,
        {
          method: "get",
        },
        {
          errorInfo: "获取空间列表请求失败",
        }
      );
      yield put({
        type: "setWorkSpaceList",
        payload: [
          {
            groupId: "wrap",
            name: "我的空间",
            children: data,
          },
        ],
      });
    },
  },
};
