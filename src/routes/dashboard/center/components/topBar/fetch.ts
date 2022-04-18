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
  baseUrl: string = "http://50423059pd.zicp.vip"
) => {
  const finalOptions = {
    ...defaultOptions,
    ...options,
  }
  return fetch(`${baseUrl}${url}`, finalOptions).then((res) => res.json());
};