import React, { memo, useEffect, useState } from "react";
import { connect } from "../../../../../../../utils/connect";
import "./index.less";
import { Spin } from "antd";

import { http } from "../../../../../../../services/request";

import EveryItem from "../everyItem/index";

const mapStateToProps = (state: any) => {
  return state;
};

const Text = (props: any) => {
  const { current, index } = props;
  const [dataArr, setDataArr] = useState<any>([]);
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    setDataArr(props.data || [])
  }, [props.data]);
  return (
    <>
      <Spin className="assit-loading" spinning={dataLoading} />
        <div className="Text-wrap">
          {dataArr.length ? (
            dataArr.map((item: any, index: number) => {
              return <EveryItem key={index} data={item} />;
            })
          ) : (
            <div className="Other-wrap">暂无数据</div>
          )}
        </div>
    </>
  );
};

export default memo(Text);
