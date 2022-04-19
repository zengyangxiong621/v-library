/*
 * @Author: your name
 * @Date: 2022-04-19 11:27:47
 * @LastEditTime: 2022-04-19 18:17:58
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \v-library\src\models\utils\request.ts
 */
const defaultOptions: any = {
  method: 'post',
  mode: "cors",
  headers: {
    "Content-Type": "application/json",
  },
};
export const myFetch = (
  url: string,
  options: object,
  baseUrl: string = "http://10.200.252.109:9572"
  // baseUrl: string = "http://50423059pd.zicp.vip"
) => {
  const finalOptions = {
    ...defaultOptions,
    ...options,
  }
  return fetch(`${baseUrl}${url}`, finalOptions).then((res) => res.json());
};
