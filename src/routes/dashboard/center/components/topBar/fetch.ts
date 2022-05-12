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
  // baseUrl: string = "http://50423059pd.zicp.vip"
  baseUrl: string = "http://10.202.233.230:9572"
  // baseUrl: string = "http://10.201.83.166:31088"
) => {
  const finalOptions = {
    ...defaultOptions,
    ...options,
  }
  return fetch(`${baseUrl}${url}`, finalOptions).then((res) => res.json());
};
