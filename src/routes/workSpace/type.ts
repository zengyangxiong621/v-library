enum MapParams {
  ascend,
  descend,
  default,
}
export type TWorkSpaceParams = {
  spaceId: string | number;
  name?: string | null;
  pageNo: string | number;
  pageSize: string | number;
  map?: {
    [key: string]: keyof typeof MapParams;
  };
};
