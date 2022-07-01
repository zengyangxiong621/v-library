/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useEffect, useState } from "react";
import "./index.less";
import { connect } from "dva";

import { Input, Select, Upload, message } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

// 功能
const UserManage = (props: any) => {

  return (
    <div className="userManage">用户管理</div>
  )
};

export default memo(
  connect(({ userManage }: any) => ({ userManage }))(UserManage)
);
