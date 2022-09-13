/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-anonymous-default-export */
import { http } from "@/services/request";

import {
  SYSTEMMATERIAL,
  MYMATERIAL,
  MATERIALLIB,
  MYTEMPLATE,
  SYSTEMTEMPLATE,
  TEMPLATELIB
} from "@/constant/dvaModels/resourceCenter";

export default {
  namespace: "resourceCenter",
  state: {
    rightLists: [],
    groupList: [],
    curSelectedGroup: {},
    curSelectedGroupName: "",
    treeLoading: false,
    resourceLoading: false
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
    setTreeLoading(state: any, { payload }: any) {
      return { ...state, treeLoading: payload };
    },
    setResourceLoading(state: any, { payload }: any) {
      return { ...state, resourceLoading: payload };
    },
  },
  effects: {
    *getRightLists({ payload }: any, { call, put, select }: any): any {
      // 获取模板类别接口 
      const url = ["myTemp","systemTemp"].indexOf(payload.type[0]) > -1 ? "/visual/appTemplate/list"  : "/visual/resource/queryResourceList";
      yield put({
        type: "setResourceLoading",
        payload: true
      });
      // 获取素材类别接口
      try{
        const data = yield http({
          url,
          method: "post",
          body: payload,
        });
        if(["myTemp","systemTemp"].indexOf(payload.type[0]) > -1){
          data.content.map((item:any) => {
            item.moduleType = payload.type[0];
          });
        }
        if(!payload.type.length){
          // 处理我的素材
          data.content.map((item:any) => {
            item.moduleType = "myresource";
          });
        }
        yield put({
          type: "setResourceLoading",
          payload: false
        });
        yield put({
          type: "updateRightLists",
          payload: data?.content || [],
        });
      }catch(err){
        yield put({
          type: "setResourceLoading",
          payload: false
        });
        yield put({
          type: "updateRightLists",
          payload: [],
        });
      }
    },
    *getGroupTree({ payload,cb }: any, { call, put }: any): any {
      yield put({
        type: "setTreeLoading",
        payload: true
      });
      try{
        // 获取所有素材分类
        const designData:any = yield http({
          url: `/visual/resource/queryResourceTypeList?spaceId=${payload.spaceId}`,
          method: "get",
        });
        // 查询模板库分组树
        const tempData:any = yield http({
          url: `/visual/appTemplate/queryGroupList?spaceId=${payload.spaceId}`,
          method: "get",
        });
        yield put({
          type: "setTreeLoading",
          payload: false
        });
        // 因为模板和素材用的不同接口，其中每个菜单中包含全部和其他，全部和其他对应的id不是唯一的，前端要做特殊处理
        tempData.myGroup.map((item:any) => {
          item.origin = "myTemp";
          item.groupId = item.groupId === "-1" ? "myTempAll" : item.groupId === "0" ?  "myTempOhter" : item.groupId;
        });
  
        tempData.systemGroup.map((item:any) => {
          item.origin = "systemTemp";
          item.groupId = item.groupId === "-1" ? "sysTempAll" : item.groupId === "0" ?  "sysTempOhter" : item.groupId;
        });
        // 以前数据逻辑中都是用groupId作为唯一值，后来接口数据将将groupId属性名改为了type,周期紧张，为避免大部分修改引发问题，前端手动修改了数据，增加了groupId字段
        // 后台返回数据中没有明显的区分是我的素材和系统素材，前端添加属性区分
        designData.myTypes.map((item:any) => {
          item.groupId = item.type;
          item.origin = "myresource";
        });
        designData.systemTypes.map((item:any) => {
          item.groupId = !item.type ? "sysMatAll" :  item.type;
          item.origin = "design";
        });
        const resultData = [
          {
            groupId: TEMPLATELIB,
            customLevel: 1,
            name: "模板库",
            children: [
              {
                groupId: MYTEMPLATE,
                customLevel: 2,
                // 父级id, 用于判断 是哪个子节点发出的 添加分组 事件
                parentId: TEMPLATELIB,
                name: "我的模板",
                children: tempData.myGroup
              },
              {
                groupId: SYSTEMTEMPLATE,
                customLevel: 2,
                // 父级id, 用于判断 是哪个子节点发出的 添加分组 事件
                parentId: TEMPLATELIB,
                name: "系统模板",
                systemDefined: true,
                children: tempData.systemGroup
              }
            ]
          },
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
                children: designData.myTypes,
              },
              {
                groupId: SYSTEMMATERIAL,
                customLevel: 2,
                // 父级id, 用于判断 是哪个子节点发出的 添加分组 事件
                parentId: MATERIALLIB,
                name: "系统素材",
                systemDefined: true,
                children: designData.systemTypes,
              }
            ],
          },
        ];
        yield put({
          type: "setGroupList",
          payload: resultData,
        });
        cb(resultData);
      }catch(err) {
        yield put({
          type: "setTreeLoading",
          payload: false
        });
      }
    },
  },
};
