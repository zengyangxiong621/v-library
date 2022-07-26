/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useEffect, useState } from "react";
import './index.less'
// 功能
const ErrorPage = (props: any) => {
  return (
    <div className="error-page">对不起，您没有权限访问此页面</div>
  )
};

export default ErrorPage;
