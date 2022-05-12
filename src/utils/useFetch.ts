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
    .then<[null, T]>((res: T) => {
      return [null, res];
    })
    .catch<[U, null]>((err: U) => {
      if (customErrInfo) {
        const mergeErrObj = { ...err, customErrInfo };
        return [mergeErrObj, null];
      }
      return [err, null];
    });
};

export const BASE_URL = "http://10.202.233.230:9572"; // HFF 本地
// export const BASE_URL = "http://10.202.233.230:9572"; // HFF 本地
// export const BASE_URL = "http://50423059pd.zicp.vip"; // FJJ 本地
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
 *          @fetchOptions -- 优先级更高的自定义fetchAPI请求配置
 *          @customOptions -- 添加自定义的错误信息
 *            {
 *              errorInfo: '请求发送失败时自定义的提示信息',
 *              onlyNeedWrapData: '是否只需要最外层的data',
 *              errHandleFn: '发送请求失败时自定义的处理回调'
 *            }
 * return: Promise<Pending>
 */
export const useFetch = async (
  path: string,
  fetchOptions: any,
  customOptions: any = {
    errorInfo: "请求发送失败",
    onlyNeedWrapData: false,
    errHandleFn: () => {},
  }
): Promise<[Error | null, any, any]> => {
  // 最终路径 & 最终配置、参数
  const finalPath = `${BASE_URL}${path}`;
  const finalParams = { ...DEFAULT_OPTIONS, ...fetchOptions };

  // 格式由fetchOptions中的responseType来决定，默认是json
  const finalFetch = fetch(finalPath, finalParams)
    .then((response: any) => {
      const { responseType }: { responseType: string } = fetchOptions;
      return responseType !== undefined ? response[responseType]() : response.json();
    })
    .catch((err) => {
      console.log("err", err);
    });

  let [err, data]: any = await catchErr(finalFetch, customOptions);
  /**** 根据返回数据进行统一的处理 *****/
  // 捕获发送请求时的错误
  if (err) {
    if (
      !customOptions.errHandleFn &&
      typeof customOptions.errHandleFn !== "function"
    ) {
      message.error({ content: customOptions.errorInfo, duration: 2 });
    } else {
      customOptions.errHandleFn(err);
    }
    // 出错了需要终止程序的执行吗
    // throw Error('终止程序')
  }
  // 后端的返回码
  let code: string | number = data?.code ?? "errorCode";
  // 请求成功发送出去，但是接口错误
  // TODO 外部传入 对应状态码的处理逻辑
  if (code === 500) {
    message.error({
      content: "请求数据失败",
      duration: 4,
    });
  }
  if (data) {
    // data = data.data.content
    data = customOptions.onlyNeedWrapData ? data : data.data;
  }
  // 返回code,便于针对单个接口的特定code做处理
  return [err, data, code];
};
