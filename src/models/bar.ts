/* eslint-disable import/no-anonymous-default-export */
interface IBarState {
  key: string[];
  isFolder: boolean;
  operate: string;
}
export default {
  namespace: "bar",
  state: {
    key: [],
    isFolder: false,
    operate: "",
  } as IBarState,

  subscriptions: {
    setup({ dispatch, history }: { dispatch: any; history: any }) {
      // eslint-disable-line
      history.listen((location: any) => {
        // console.log("location", location);
      });
    },
    onResize({ dispatch, history }: any) {
      window.onresize = (e) => {};
    },
    keyEvent({ dispatch, history }: any) {
      document.onkeydown = (e) => {};
    },
  },

  effects: {
    *fetch({ payload }: any, { call, put }: any): any {
      // eslint-disable-line
      console.log("ssss", payload);
      yield put({ type: "selectedNode", payload });
    },
  },

  reducers: {
    save(state: IBarState, action: any) {
      return { ...state, ...action.payload };
    },
    selectedNode(state: IBarState, { payload }: any) {
      return { ...state, ...payload };
    },
    // 在已经多选的情况下，点击右键时应该是往已选择节点[]里添加，而不是上面那种替换
    pushToSelectedNode(state: IBarState, { payload }: any) {
      const { key, isFolder } = payload;
      const newArr = [...(new Set(state.key.concat(key)) as any)];
      return { key: newArr, isFolder };
    },
    // 点击icon或者右键菜单里的操作
    selectOperate(state: IBarState, { payload }: any) {
      console.log('iconname', payload)
      return { ...state, ...payload }
    }
  },
};
