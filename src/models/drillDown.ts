/* eslint-disable import/no-anonymous-default-export */
export default {
  namespace: "drillDownGlobalState",
  state: {
    hasParentCompSet: [],
    drillDownReflect: {},
  },
  reducers: {
    updateComponentReflect(state: any, { payload }: any) {
      const originalReflect = state.drillDownReflect;
      const { id, childCompIdArr } = payload;
      originalReflect[id] = childCompIdArr;
      return { ...state, drillDownReflect: originalReflect };
    },
    updateHasParentCompSet(state: any, { payload }: any) {
      const { res } = payload;
      return { ...state, hasParentCompSet: res };
    },
  },
};
