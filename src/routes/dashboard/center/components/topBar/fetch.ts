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
  baseUrl: string = (window as any).CONFIG.BASE_URL
) => {
  const finalOptions = {
    ...defaultOptions,
    ...options,
  }
  return fetch(`${baseUrl}${url}`, finalOptions).then((res) => res.json());
};
