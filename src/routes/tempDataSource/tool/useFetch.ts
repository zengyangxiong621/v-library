import { message } from "antd";

/**
 * description: 执行请求、获取数据、捕获异常
 * params: Promise<pending>
 * return: [ null, data ] | [ err, null ]
 */
const catchErr = <T, U = Error>(
  promise: Promise<T>,
  customErrInfo?: object
): Promise<[null, T] | [U, null]> => {
  return promise
    .then<[null, T]>((res: T) => [null, res])
    .catch<[U, null]>((err: U) => {
      if (customErrInfo) {
        const mergeErrObj = { ...err, customErrInfo };
        return [mergeErrObj, null];
      }
      return [err, null];
    });
};
export const BASE_URL = "http://10.202.226.250:9572"; // 本地
// export const BASE_URL = "http://10.201.80.52:9572"; // 线上
const DEFAULT_OPTIONS = {
  method: "POST",
  mode: "cors",
  headers: {
    "Content-Type": "application/json",
  },
};

/**
 * description: 处理数据，对请求成功或者失败做统一处理
 * params:  @path -- 请求路径
 *          @options -- 优先级更高的自定义fetchAPI请求配置
 * return: Promise<Pending>
 */
export const useFetch = async (
  path: string,
  options: any
): Promise<[Error | null, any]> => {
  const finalPath = `${BASE_URL}${path}`;
  const finalParams = { ...DEFAULT_OPTIONS, ...options };
  // Fetch API 需要先转换一次格式
  const finalFetch = fetch(finalPath, finalParams).then((response) =>
    response.json()
  );

  let [err, data] = await catchErr(finalFetch);
  /**** 根据返回数据进行统一的处理(小拦截器) *****/
  if (err) {
    message.error({ content: "请求错误", duration: 2 });
    // 出错了需要终止程序的执行吗
    // throw Error('终止程序')
  }
  if (data) {
    // data = data.data.content
    data = data.data;
  }
  return [err, data];
};
