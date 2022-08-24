import { message } from "antd";
import qs from "qs";
import { forwardLogin } from "./loginApi";
const isPlainObject = (config: any) => {
  return Object.prototype.toString.call(config) === "[object Object]";
};

export const BASEURL = (window as any).CONFIG.BASE_URL;

/* 核心方法 */
export const http = (config: any, isDownload: boolean = false, isAllurl: boolean = false): any => {
  // init config & validate
  if (!isPlainObject(config)) config = {};
  config = Object.assign(
    {
      url: "",
      method: "GET",
      credentials: "include",
      headers: null,
      body: null,
      params: null,
      responseType: "json",
      signal: null,
    },
    config
  );
  if (!isPlainObject(config.headers)) config.headers = {};
  if (config.params !== null && !isPlainObject(config.params))
    config.params = null;
  let {
    url,
    method,
    credentials,
    headers,
    body,
    params,
    responseType,
    signal,
  } = config;

  // 处理URL:params存在，我们需要把params中的每一项拼接到URL末尾
  if (params) url += `${url.includes("?") ? "&" : "?"}${qs.stringify(params)}`;
  url = isAllurl ? url : BASEURL + url;
  // 处理请求主体:只针对于POST系列请求；body是个纯粹对象，根据当前后台要求，把其变为urlencoded格式！

  if (isPlainObject(body)) {
    body = JSON.stringify(body);
    // 'Content-Type': 'application/json',
    // headers['Content-Type'] = 'application/x-www-form-urlencoded'
    headers["Content-Type"] = "application/json";
  }

  // 类似于Axios的请求拦截器，例如：把存储在客户端本地的token信息携带给服务器「根据当前后台要求处理」
  let token = localStorage.getItem("token");
  if (token) headers["token"] = token;

  // 发送请求
  method = method.toUpperCase();
  config = {
    method,
    credentials,
    headers,
    cache: "no-cache",
    mode: "cors",
  };
  // if(/^(POST|PUT|PATCH)$/i.test(method) && body) config.body = body
  config.body = body;
  if (signal) config.signal = signal;
  return fetch(url, config)
    .then((response) => {
      // 成功则返回响应主体信息
      let { status, statusText } = response,
        result;
      if (status !== 200) {
        return Promise.reject({ code: -1, status, statusText });
      }
      if (!responseType) {
        result = response.json();
      } else {
        switch (responseType.toLowerCase()) {
          case "text":
            result = response.text();
            break;
          case "arraybuffer":
            result = response.arrayBuffer();
            break;
          case "blob":
            result = response.blob();
            break;
          default:
            result = response.json();
        }
      }
      if (isDownload) {
        return result;
      }
      return result.then((response) => {
        const { code, data } = response;
        if (code === 10000) {
          return Promise.resolve(data);
        } else {
          return Promise.reject(response);
        }
      });
    })
    .catch((err) => {
      const { code, message: errMessage } = err;
      if(code !== 500){
        message.error(errMessage || '请求数据失败');
      }
      if (code === 401) {
        if (token && token.endsWith('x-gridsumdissector')) {
          forwardLogin()
        } else {
          window.history.replaceState(null, '', '/login')
          window.location.reload();
          localStorage.removeItem("token");
        }
      }
      if(code===403){
        window.history.replaceState(null,'','/404')
      }
      return Promise.reject(err);
    });
};

/* 快捷方法 */
["GET", "HEAD", "DELETE", "OPTIONS"].forEach((item) => {
  (http as any)[item.toLowerCase()] = function (url: string, config: any) {
    if (!isPlainObject(config)) config = {};
    config["url"] = url;
    config["method"] = item;
    return http(config);
  };
});
["POST", "PUT", "PATCH"].forEach((item: string) => {
  (http as any)[item.toLowerCase()] = function (
    url: string,
    body: any,
    config: any
  ) {
    if (!isPlainObject(config)) config = {};
    config["url"] = url;
    config["method"] = item;
    config["body"] = body;
    return http(config);
  };
});

export const downLoad=async (url:string , isAllurl:boolean=false, fileName?:string) => {
  const config={
    url:url,
    method:'GET',
    responseType:'blob'
  }
  const res = await http(config, true, isAllurl)
  let a = document.createElement('a');
  let downloadUrl = window.URL.createObjectURL(res);
  a.href = downloadUrl;
  a.download=(fileName || '') + '.zip';
  a.click();
  window.URL.revokeObjectURL(downloadUrl);
};
