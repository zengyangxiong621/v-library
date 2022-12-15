import { memo, useEffect, useState } from "react";
import "./index.less";
import { Spin } from "antd";
import EveryItem from "../everyItem/index";

import { http } from "@/services/request";

// const dataArr = []

const Interaction = (props: any) => {
  const { current, index } = props;
  const [dataArr, setDataArr] = useState<any>([]);
  const [dataLoading, setDataLoading] = useState(false);
  
  useEffect(() => {
    setDataArr(props.data || [])
  }, [props.data]);

  return (
    <>
      <Spin className="Interaction-loading" spinning={dataLoading} />
      <div className="Interaction-wrap">
        {dataArr.length ? (
          dataArr.map((item: any, index: number) => {
            return <EveryItem key={index} data={item} />;
          })
        ) : (
          <div className="Interaction-wrap">暂无数据</div>
        )}
      </div>
    </>
  );
};

export default memo(Interaction);
