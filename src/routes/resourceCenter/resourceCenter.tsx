/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useEffect, useState } from "react";
import "./index.less";
import { connect } from "dva";
import LeftTree from "./components/LeftTree";
// 功能
const ResourceCenter = ({ dispatch, history }: any) => {
  const [inputValue, setInputValue] = useState("");
  // 当切换任意分组时，都需要清除输入框里的值
  const clearSearchInputState = () => {
    setInputValue("");
  };

  // 页面初始化
  useEffect(() => {
    dispatch({
      type: "resourceCenter/resetModel",
      payload: {
        curSelectedGroup: ["-1"],
        curSelectedGroupName: "全部应用"
      }
    });
    // const finalBody = {
    //   pageNo: 1,
    //   pageSize: 1000,
    //   spaceId: spaceId,
    //   map: sortMap,
    //   groupId: null
    // };
    // getDataDispatch(finalBody);
  }, []);

  return (
    <div className="resourceCenter-wrap" id="resourceCenterPage">
      <div className="left">
        <LeftTree clearSearchInputState={clearSearchInputState} />
      </div>
      <div className="right"></div>
    </div>
  );
};

export default memo(
  connect(({ resourceCenter }: any) => ({ resourceCenter }))(ResourceCenter)
);
