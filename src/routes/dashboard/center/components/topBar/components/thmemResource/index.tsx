import { memo, useState } from "react";
import "./index.less";

import EveryItem from "../everyItem/index";

const Charts = (props: any) => {
  // const { data } = props
  const [active, setActive] = useState("jdl");
  const liHover = (key: string) => {
    setActive(key);
  };
  return (
    <div className="Charts-wrap">
      <ul className="text-list">
        {chartType.map((item: any) => {
          return (
            <li
              key={item.key}
              className={`${active === item.key && "active-li"}`}
              onMouseEnter={() => liHover(item.key)}
            >
              {item.text}
            </li>
          );
        })}
      </ul>
      <div className="charts-list">
        {ChartDataMap[active].map((item: any, index: number) => {
          return <EveryItem key={index} data={item} />;
        })}
      </div>
    </div>
  );
};

const ChartDataMap: any = {
  jdl: [
    {
      name: "assssssssssssssssssddddddddddddddddss",
    },
  ],
  xxmb: [
    {
      name: "柱形图1",
      key: "a",
    },
  ],
  dtl: [
    {
      name: "折线图3",
      key: "c",
    },
  ],
  anz: [
    {
      name: "饼图1",
      key: "a",
    },
  ],
  zsxj: [
    {
      name: "散点图",
      key: "a",
    },
  ],
  btzy: [],
};

const chartType = [
  {
    text: "节点类",
    key: "jdl",
  },
  {
    text: "信息面板",
    key: "xxmb",
  },
  {
    text: "地图类",
    key: "dtl",
  },
  {
    text: "按钮组",
    key: "anz",
  },
  {
    text: "装饰细节",
    key: "zsxj",
  },
  {
    text: "标题资源",
    key: "btzy",
  },
];
export default memo(Charts);
