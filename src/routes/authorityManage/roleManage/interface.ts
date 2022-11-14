import React from "react";
export interface params {
  pageNo: number;
  pageSize: number;
}
export interface dataType {
  id: React.Key;
  name: null | string;
  remark: null | string;
  updatedAt: null | string;
  updatedBy: null | string;
}
export interface authDataType {
  id: React.Key;
  createdTime: null | string;
  createdUserAccount: null | string;
  deleted: null | boolean;
  description: null | string;
  name: null | string;
  parentId: null | string;
  perms: null | string;
  sort: null | string;
  type: null | string;
  updatedTime: null | string;
  updatedUserAccount: null | string;
  url: null | string;
  version: null | string;
  children?: Array<authDataType>;
  checkedList?: Array<string>;
}
export interface formData {
  name: string;
  description: string;
  remark: Array<string>;
}
export interface authStateType {
  authList: Array<authDataType>;
}
export type authActionType =
  | { type: "updateState"; update: Partial<authStateType> }
  | { type: "getAuthList" };
export type dispatcher = (action: authActionType) => any;

export interface authContextType {
  state: authStateType;
  dispatch: dispatcher;
}
