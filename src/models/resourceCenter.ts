/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-anonymous-default-export */
import { http } from '@/services/request'

export default {
  namespace: 'resourceCenter',
  state: {
    templateList: [],
    groupList: [],
    curSelectedGroup: [],
    curSelectedGroupName: '',
  },
  reducers: {
    resetModel(state: any, { payload }: any) {
      return { ...state, ...payload }
    },
    updateTemplateList(state: any, { payload }: any) {
      return { ...state, templateList: payload }
    },
    setGroupList(state: any, { payload }: any) {
      return { ...state, groupList: payload }
    },
    updateGroupList(state: any, { payload }: any) {
      return { ...state, groupList: payload }
    },
    // 设置当前选中的 应用分组 payload => 当前选中树节点的数组 string[]
    setCurSelectedGroup(state: any, { payload }: any) {
      return { ...state, curSelectedGroup: payload }
    },
    setCurSelectedGroupName(state: any, { payload }: any) {
      return { ...state, curSelectedGroupName: payload }
    },
  },
  effects: {
    *getTemplateList({ payload }: any, { call, put, select }: any): any {
      const data = yield http({
        url: '/visual/application/queryAppList',
        method: 'post',
        body: payload,
      })
      yield put({
        type: 'updateTemplateList',
        payload: data?.content || [],
      })
    },
    *getGroupTree({ payload }: any, { call, put }: any): any {
      const data = yield http({
        url: `/visual/resource/queryGroupList?spaceId=1`,
        method: 'get',
      })
      console.log('data', data)

      yield put({
        type: 'setGroupList',
        payload: [
          {
            groupId: 'myMaterial',
            name: '素材库',
            children: [
              {
                groupId: 'wrap',
                name: '系统素材',
                children: data,
              },
            ],
          },
        ],
      })
    },
  },
}
