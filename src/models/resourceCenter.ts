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
    curSelectedGroup: {},
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
    *getGroupTree({ payload,cb }: any, { call, put }: any): any {
      // 我的素材接口
      // const data = yield http({
      //   url: `/visual/resource/queryGroupList?spaceId=${payload.spaceId}`,
      //   method: "get",
      // });
      // 获取所有素材分类
      let data:any = yield http({
        url: `/visual/resource/queryResourceTypeList?spaceId=1`,
        method: "get",
      });
      // 以前数据逻辑中都是用groupId作为唯一值，后来接口数据将将groupId属性名改为了type,周期紧张，为避免大部分修改引发问题，前端手动修改了数据，增加了groupId字段
      // 后台返回数据中没有明显的区分是我的素材和系统素材，前端添加属性区分
      data.myTypes.map((item:any) => {
        item.groupId = item.type
        item.origin = 'myresource'
      })
      data.systemTypes.map((item:any) => {
        item.groupId = item.type
        item.origin = 'design'
        if(!item.type) item.groupId = 'sysAll'
      })
      const resultData = [
        {
          groupId: MATERIALLIB,
          // 前端创造的层--需要给个自定义的层级(从1开始), 用来判断每个节点后显示 "+" 或者是 "编辑、删除icon"
          customLevel: 1,
          name: "素材库",
          children: [
            {
              groupId: MYMATERIAL,
              customLevel: 2,
              // 父级id, 用于判断 是哪个子节点发出的 添加分组 事件
              parentId: MATERIALLIB,
              name: "我的素材",
              children: data.myTypes,
            },
            {
              groupId: SYSTEMMATERIAL,
              customLevel: 2,
              // 父级id, 用于判断 是哪个子节点发出的 添加分组 事件
              parentId: MATERIALLIB,
              name: "系统素材",
              children: data.systemTypes,
            }
          ],
        },
      ]
      yield put({
        type: "setGroupList",
        payload: resultData,
      });
      cb(resultData)
    },
  },
};
