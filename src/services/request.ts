import { message } from 'antd'
import qs from 'qs'

const defaultOptions: any = {
  method: 'post',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
  },
}
export const myFetch = (
  url: string,
  options: object,
  // baseUrl: string = 'http://10.202.233.230:9572',
  baseUrl: string = "http://50423059pd.zicp.vip"
) => {
  const finalOptions = {
    ...defaultOptions,
    ...options,
  }
  return fetch(`${ baseUrl }${ url }`, finalOptions).then((res) => res.json())
}
const isPlainObject = (config: any) => {
  return Object.prototype.toString.call(config) === '[object Object]'
}
/* 核心方法 */
export const http = (config: any): any => {
  // init config & validate
  if(!isPlainObject(config)) config = {}
  config = Object.assign({
    url: '',
    method: 'GET',
    credentials: 'include',
    headers: null,
    body: null,
    params: null,
    responseType: 'json',
    signal: null,
  }, config)
  if(!isPlainObject(config.headers)) config.headers = {}
  if(config.params !== null && !isPlainObject(config.params)) config.params = null
  let { url, method, credentials, headers, body, params, responseType, signal } = config
  // let baseUrl = 'http://10.202.233.230:9572'
  let baseUrl = 'http://10.202.226.250:9572'
  // let baseUrl = 'http://50423059pd.zicp.vip'
  // 处理URL:params存在，我们需要把params中的每一项拼接到URL末尾
  if(params) url += `${ url.includes('?') ? '&' : '?' }${ qs.stringify(params) }`
  url = baseUrl + url
  // 处理请求主体:只针对于POST系列请求；body是个纯粹对象，根据当前后台要求，把其变为urlencoded格式！
  console.log('---------------------')
  console.log('body', body)

  if(isPlainObject(body)) {
    body = JSON.stringify(body)
    // 'Content-Type': 'application/json',
    // headers['Content-Type'] = 'application/x-www-form-urlencoded'
    headers['Content-Type'] = 'application/json'
  }

  // 类似于Axios的请求拦截器，例如：把存储在客户端本地的token信息携带给服务器「根据当前后台要求处理」
  let token = localStorage.getItem('token')
  if(token) headers['Authorization'] = token

  // 发送请求
  method = method.toUpperCase()
  config = {
    method,
    credentials,
    headers,
    cache: 'no-cache',
    mode: 'cors',
  }
  // if(/^(POST|PUT|PATCH)$/i.test(method) && body) config.body = body
  config.body = body
  if(signal) config.signal = signal
  return fetch(url, config).then(response => {
    // 成功则返回响应主体信息
    let { status, statusText } = response,
      result
    if(status !== 200) {
      return Promise.reject({ code: -1, status, statusText })
    }
    if(!responseType) {
      result = response.json()
    } else {
      switch(responseType.toLowerCase()) {
        case 'text':
          result = response.text()
          break
        case 'arraybuffer':
          result = response.arrayBuffer()
          break
        case 'blob':
          result = response.blob()
          break
        default:
          result = response.json()
      }
    }
    return result.then((response) => {
      const { code, data } = response
      if(code === 10000) {
        console.log('data', data)
        return Promise.resolve(data)
      } else {
        return Promise.reject(response)
      }
    })
  }).catch(err => {
    const { code, message: errMessage } = err
    message.error(errMessage)
    return Promise.reject(err)
  })
}

/* 快捷方法 */
[ 'GET', 'HEAD', 'DELETE', 'OPTIONS' ].forEach(item => {
  (http as any)[item.toLowerCase()] = function(url: string, config: any) {
    if(!isPlainObject(config)) config = {}
    config['url'] = url
    config['method'] = item
    return http(config)
  }
});
[ 'POST', 'PUT', 'PATCH' ].forEach((item: string) => {
  (http as any)[item.toLowerCase()] = function(url: string, body: any, config: any) {
    if(!isPlainObject(config)) config = {}
    config['url'] = url
    config['method'] = item
    config['body'] = body
    return http(config)
  }
})











