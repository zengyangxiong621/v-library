import { memo } from "react";
import "./index.less";

import AppCard from '../appCard/index'

const RightContent = (props: any) => {
  const { listData } = props
  return <div className="RightContent-wrap">
    {
      listData.map((item: any) => (
        <AppCard {...item}/>
      )
      )
    }
  </div>;
};

export default memo(RightContent);
