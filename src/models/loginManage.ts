/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-anonymous-default-export */
import { http } from "@/services/request";
import SsoSdk from '@components/sso-jssdk'
// import {localStore} from "@/service/LocalStoreService"

// const SSO_API = (window as any).CONFIG.SSO_API || process.env.SSO_API || ""
// const TICKET_KEY = (window as any).CONFIG.TICKET_KEY || process.env.TICKET_KEY || ""
// const SSO_URL = (window as any).CONFIG.SSO_URL || process.env.SSO_URL || ""

// const sdk = new SsoSdk({
//   sso: SSO_API || `${SSO_URL}/api/v2`,
//   key: TICKET_KEY,
//   expires: 0,
// })

export default {
  namespace: "loginManage",
  state: {
  },
  reducers: {
  },
  effects: {
  },
};
