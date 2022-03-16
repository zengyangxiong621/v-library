/* eslint-disable import/no-anonymous-default-export */
export default {
  namespace: 'pageSetting',
  state: {
    width:'1920',
    height:'1080',

  },
  subscriptions: {
    
  },

  effects: {
    
  },

  reducers: {
    sizeChange(state: any, action: any){
      return { ...state, ...action.payload }
    },
  },

};