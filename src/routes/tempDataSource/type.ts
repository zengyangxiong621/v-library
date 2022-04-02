enum dataSourceType {
  RDBMS,
  RESTFUL_API,
  JSON,
  CSV,
  EXCEL,
}

enum MapParams {
  ascend,
  descend,
  default
}


export type TDataSourceParams = {
  spaceId: string | number;
  type?: keyof typeof dataSourceType | null;
  name?: string | null;
  pageNo: string | number;
  pageSize: string | number;
  map?: {
    [key: string]: keyof typeof MapParams
  }
};

