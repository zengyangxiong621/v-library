/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-anonymous-default-export */
import { http } from "@/services/request";

import {
  SYSTEMMATERIAL,
  MYMATERIAL,
  MATERIALLIB,
} from "@/constant/dvaModels/resourceCenter";

export default {
  namespace: "resourceCenter",
  state: {
    rightLists: [],
    groupList: [],
    curSelectedGroup: ['-1'],
    curSelectedGroupName: "",
  },
  reducers: {
    resetModel(state: any, { payload }: any) {
      return { ...state, ...payload };
    },
    updateRightLists(state: any, { payload }: any) {
      return { ...state, rightLists: payload };
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
    *getRightLists({ payload }: any, { call, put, select }: any): any {
      const data = yield http({
        url: "/visual/resource/queryResourceList",
        method: "post",
        body: payload,
      });
      yield put({
        type: "updateRightLists",
        payload: data?.content || [],
      });
    },
    *getGroupTree({ payload }: any, { call, put }: any): any {
      // 我的素材接口
      // const data = yield http({
      //   url: `/visual/resource/queryGroupList?spaceId=${payload.spaceId}`,
      //   method: "get",
      // });
      // 系统素材接口
      let data = yield http({
        url: `/visual/resource/queryTypeList`,
        method: "get",
      });
      (data || []).map((item:any) => {
        item.groupId = item.type
        if(!item.type) item.groupId = '-1'
      })
      yield put({
        type: "setGroupList",
        payload: [
          {
            groupId: MATERIALLIB,
            // 前端创造的层--需要给个自定义的层级(从1开始), 用来判断每个节点后显示 "+" 或者是 "编辑、删除icon"
            customLevel: 1,
            name: "素材库",
            children: [
              {
                groupId: SYSTEMMATERIAL,
                customLevel: 2,
                // 父级id, 用于判断 是哪个子节点发出的 添加分组 事件
                parentId: MATERIALLIB,
                name: "系统素材",
                children: data,
              },
              // {
              //   groupId: MYMATERIAL,
              //   parentId: MATERIALLIB,
              //   customLevel: 2,
              //   name: "系统素材3",
              //   children: [],
              // },
            ],
          },
          // {
          //   groupId: "templateLib",
          //   customLevel: 1,
          //   name: "模板库",
          //   children: [
          //     {
          //       groupId: "myTemplate",
          //       parentId: "templateLib",
          //       customLevel: 2,
          //       name: "我的模板",
          //       children: [],
          //     },
          //   ],
          // },
        ],
      });
    },
  },
};
