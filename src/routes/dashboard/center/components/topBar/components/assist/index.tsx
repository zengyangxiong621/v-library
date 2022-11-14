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
  const [dataLoading, setDataLoading] = useState(true);
  useEffect(() => {
    const init = () => {
      setDataLoading(true);
      http({
        url: "/visual/module-manage/queryModuleList",
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          type: ["assist"], // 0:图表 2:文本
          status: 0,
          pageNo: 0,
          pageSize: 100,
        },
      })
        .then((data: any) => {
          setDataLoading(false);
          data.content.forEach((item: any) => {
            item.photoPath = `${(window as any).CONFIG.COMP_URL}/${item.photoPath}`;
          });
          setDataArr(() => data.content);
        })
        .catch(() => {
          setDataLoading(false);
        });
    };
    if (current.length && current[0] === index) {
      init();
    }
  }, []);

  return (
    <>
      <Spin className="assit-loading" spinning={dataLoading} />
      <div className="Text-wrap">
        {dataArr?.map((item: any, index: number) => {
          return <EveryItem key={item.moduleName} data={item} />;
        })}
      </div>
    </>
  );
};

export default memo(Text);
