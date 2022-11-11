// 工具栏上的icon、右键菜单触发的操作
interface IOperateState {
  ids: any[];
  isLock?: boolean;
  show?: boolean;
  operateValue: boolean;
  operateKey: string;
  // layers: any[];
}
// 最后发送请求的格式是 { id: '', key:'执行的操作', value: 'true or false 描述key'}
// 发送完请求后，用最新的layers重新渲染一遍
export default {
  namespace: "operate",
  state: {
    ids: [],
    operateKey: "",
    operateValue: false,
    // isLock: false,
    // show: false,
    // layers: [],
  } as IOperateState,

  reducers: {
    update(state: IOperateState, action: any) {
      return { ...state, ...action.payload };
    },
    // 点击icon或者右键菜单里的操作
    selectOperate(state: IOperateState, { payload }: any) {
      return { ...state, ...payload };
    },
  },
  subscriptions: {},

  effects: {},
};
