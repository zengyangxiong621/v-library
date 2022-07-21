/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-anonymous-default-export */
import { http } from "../services/request";
import SsoSdk from '@components/sso-jssdk'
import {localStore} from "../services/LocalStoreService"

const SSO_API = (window as any).CONFIG.SSO_API || process.env.SSO_API || ""
const TICKET_KEY = (window as any).CONFIG.TICKET_KEY || process.env.TICKET_KEY || ""
const SSO_URL = (window as any).CONFIG.SSO_URL || process.env.SSO_URL || ""

const sdk = new SsoSdk({
  sso: SSO_API || `${SSO_URL}/api/v2`,
  key: TICKET_KEY,
  expires: 0,
})

export default {
  namespace: "loginManage",
  state: {
    userInfo:{}
  },
  reducers: {
    getUserInfo(state: any, { payload }: any) {
      return { ...state, rightLists: payload };
    },
  },
  effects: {
    *authorize({ payload }: any, { call, put, select }: any): any {
      const res = sdk.autoSSO();
      // localStore.set("token", res.data.Ticket)
      console.log(res,'返回数据')
    },
    *logout({ payload }: any, { call, put, select }: any): any{
        const token = localStore.getToken()

        if (token?.endsWith('x-gridsumdissector')) {
          return yield sdk.logout()
        }
        
        const res = yield http({
          url: '/visual/login/login',
          method: 'get',
          body: payload
        })

        localStore.logout()
        return res
    }
  },
};
