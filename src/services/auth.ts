import SsoSdk from '@components/sso-jssdk';
import { http } from "@/services/request";

const SSO_API = (window as any).CONFIG.SSO_API || process.env.SSO_API || ""
const TICKET_KEY = (window as any).CONFIG.TICKET_KEY || process.env.TICKET_KEY || ""
const SSO_URL = (window as any).CONFIG.SSO_URL || process.env.SSO_URL || ""

const sdk = new SsoSdk({
  sso: SSO_API,
  key: TICKET_KEY
});

export function authorize() {
  return sdk.autoSSO();
}

export function logout(ticket:any) {
  // 当本地的cookie没有时，则不调用退出接口。解决多个平台部署在同一个域下的问题
  const tgt = SsoSdk.utils.getTicket(TICKET_KEY);
  return tgt ? sdk.logout(ticket) : Promise.resolve();
}

// export function validateTGT() {
//   const tgt = SsoSdk.utils.getTicket(config.TICKET_KEY);
//   return http.get(`${config.SSO_API}/validate`, { headers: { ticket: tgt } });
// }

// export function getUserInfo() {
//   return http.get(`${config.securecenter_API_PREX}/v1/account/detail`);
// }

// export function getAuth(params) {
//   return http.get(`${config.securecenter_API_PREX}/v1/menu/list`, { params });
// }