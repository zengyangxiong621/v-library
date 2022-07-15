/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useEffect, useState } from "react";
import "./index.less";
import { connect } from "dva";


// 功能
const RoleManage = (prop: any) => {
  return (
    <div className='roleManage'>角色管理</div>
  )
}

export default memo(
  connect(({ userManage }: any) => ({ userManage }))(RoleManage)
);
