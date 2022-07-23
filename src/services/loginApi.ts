import { http } from "./request";
// import SsoSdk from '@components/sso-jssdk'
import SsoSdk from '@/assets/js/sso-jssdk/src'
import {localStore} from "./LocalStoreService"

const SSO_API = (window as any).CONFIG.SSO_API || process.env.SSO_API || ""
const TICKET_KEY = (window as any).CONFIG.TICKET_KEY || process.env.TICKET_KEY || ""
const SSO_URL = (window as any).CONFIG.SSO_URL || process.env.SSO_URL || ""


const sdk = new SsoSdk({
  sso: SSO_API || `${SSO_URL}/api/v2`,
  key: TICKET_KEY,
  expires: 0,
})


export async function authorize () {
  const token = localStore.getToken()
  if (!token) {
    const res = await sdk.autoSSO()
    localStore.set("token", res.data.Ticket)
    // 登录成功后再调用一次登录获取用户 menu 信息
    await http({
      url: '/visual/login/ssoLogin',
      method: 'post',
      data:  {},
    })
  }
}

export async function logout() {
  return await sdk.logout()
}



export const forwardLogin = () => {
  window.onbeforeunload = null
  localStore.logout()
  const o = location.origin
  const p = location.pathname.split('login')[0]
  window.location.href = `${SSO_URL}?service=${o}${p}`
}