import { memo, useEffect, useState } from "react";
import "./index.less";
import { Spin } from "antd";
import EveryItem from "../everyItem/index";
import { http } from "@/services/request";

const Map = (props: any) => {
  // const { data } = props
  const { current, index } = props;
  const [dataArr, setDataArr] = useState<any>([]);
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    setDataArr(props.data || [])
  }, [props.data]);


  return (
    <>
      <Spin className="map-loading" spinning={dataLoading} />
      <div className="Map-wrap">
        {dataArr.length ? (
          dataArr.map((item: any, index: number) => {
            return <EveryItem key={index} data={item} />;
          })
        ) : (
          <div className="Map-wrap">暂无数据</div>
        )}
      </div>
    </>
  );
};

export default memo(Map);
