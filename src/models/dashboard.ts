export default {
  namespace: 'dashboard',
  state: {
    modules: {}
  },
  reducers: {
    componentCreate(state: any, action: any) {
      return state
    },
    componentUpdate() {},
    componentDelete() {},
  },
  effects: {
    *create(action: any, { call, put, select}: any) {
      console.log(action, 'action=============================')
      yield put({
        type: 'componentCreate',
        payload: action.payload
      })
    }
  }
};