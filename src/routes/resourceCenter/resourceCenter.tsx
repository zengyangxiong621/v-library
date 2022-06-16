/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useEffect, useState } from "react";
import "./index.less";
import { connect } from "dva";
// 功能
const ResourceCenter = ({ dispatch, history }: any) => {
  return (
    <div className="resourceCenter-wrap" id="resourceCenterPage">
      资源中心页面
    </div>
  );
};

export default memo(connect(({  }: any) => ({}))(ResourceCenter));
