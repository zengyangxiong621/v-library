export default {
  namespace: 'dashboardGlobal',
  state: {
    test: '00000'
  },
  reducers: {
    componentCreate(state: any, action: any) {
      return state
    },
    componentUpdate() {

    },
    componentDelete() {

    },
  },
  effects: {
    *create(action: any, { call, put, select}: any) {
      yield put({
        type: 'componentCreate',
        payload: action.payload
      })
    }
  }
};