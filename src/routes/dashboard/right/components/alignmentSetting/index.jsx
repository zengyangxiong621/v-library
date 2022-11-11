import React from "react";
import "./index.less";
import { connect } from "dva";

// eslint-disable-next-line react/prop-types
const AlignmentSetting = ({ bar, dispatch, ...props }) => {
  const alignmentChange = (type) => {
    dispatch({
      type: "bar/setAlignment",
      payload: type,
    });
    dispatch({
      type: "bar/updateComponent",
      // eslint-disable-next-line react/prop-types
      payload: bar.selectedComponents,
    });
    dispatch({
      type: "bar/calcDragScaleData",
    });
  };

  // const arrangementChange = (type) => {
  //   dispatch({
  //     type: "bar/setArrangement",
  //     payload: type,
  //   });
  // };

  return (
    <div className="AlignmentSetting-wrap">
      <h3 className="alignment-header">对齐设置</h3>
      <div className="content">
        <h4 className="pan-title">
          <label>对齐</label>
        </h4>
        <div className="pan-content">
          <span title="顶部对齐">
            <i className="iconfont icon-jushangduiqi" onClick={() => alignmentChange("top")} />
          </span>
          <span title="垂直居中对齐">
            <i
              className="iconfont icon-chuizhijuzhongduiqi"
              onClick={() => alignmentChange("vertical")}
            ></i>
          </span>
          <span title="底部对齐">
            <i className="iconfont icon-juxiaduiqi" onClick={() => alignmentChange("bottom")}></i>
          </span>
          <span title="左对齐">
            <i className="iconfont icon-zuoduiqi-" onClick={() => alignmentChange("left")}></i>
          </span>
          <span title="水平居中对齐">
            <i
              className="iconfont icon-shuipingjuzhongduiqi"
              onClick={() => alignmentChange("horizontal")}
            ></i>
          </span>
          <span title="右对齐">
            <i className="iconfont icon-juyouduiqi" onClick={() => alignmentChange("right")}></i>
          </span>
        </div>
        {/*<h4 className="pan-title">
          <label>排列</label>
        </h4>
        <div className="pan-content">
          <span title="水平分布">
            <i className="iconfont icon-horizontal" onClick={ () => arrangementChange('arrange-horizontal') }></i>
          </span>
          <span title="垂直分布">
            <i className="iconfont icon-vertical" onClick={ () => arrangementChange('arrange-vertical') }></i>
          </span>
        </div>*/}
      </div>
    </div>
  );
};

export default connect(({ bar }) => ({
  bar,
}))(AlignmentSetting);
