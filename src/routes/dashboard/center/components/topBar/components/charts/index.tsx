import { memo, useEffect, useState } from "react";
import "./index.less";
import EveryItem from "../everyItem/index";

import { http } from "@/services/request";
import { Spin } from "antd";


const Charts = (props: any) => {
  const [active, setActive] = useState("all");
  const {current, index} = props;
  const [allModules, setAllModules] = useState<any>({});
  const [dataLoading, setDataLoading] = useState(false);
  const liHover = (key: string) => {
    setActive(key);
    if(!allModules[key]){
      getData([key]);
    }
  };

  useEffect(() => {
    if(current.length && current[0] === index){
      getData([]);
    }
  }, []);


  // 获取组件数据
  const getData = async (subType: any) => {
    setDataLoading(true);
    const data: any = await http({
      url: "/visual/module-manage/queryModuleList",
      method: "post",
      body: {
        type: ["chart"],
        status: 0,
        pageNo: 0,
        pageSize: 100,
        subType: subType[0] === "all" ? [] : subType
      }
    }).catch(() => {
      setDataLoading(false);
    });
    data.content.forEach((item: any) => {
      item.photoPath = `${(window as any).CONFIG.COMP_URL}/${item.photoPath}`;
    });
    const classType = subType.length ? subType[0] : "all";
    // 如果不存在就添加
    if(!allModules[classType]){
      const obj:any = {};
      obj[classType] = data.content;
      const list = {...allModules, ...obj};
      setAllModules(list);
    }
    setDataLoading(false);
  };

  return (
    <div className='Charts-wrap'>
      <ul className='text-list'>
        {
          chartType?.map((item: any) => {
            return (
              <li
                key={item.key}
                className={`${active === item.key && "active-li"}`}
                onMouseEnter={() => liHover(item.key)}>
                {item.text}
              </li>
            );
          })
        }
      </ul>
      <Spin className="chart-loading" spinning={dataLoading}/>
      {
        allModules[active] && (
          allModules[active].length ? 
            <div className='charts-list'>
            {
              allModules[active]?.map((item: any, index: number) => {
                return (
                  <EveryItem data={item} key={index} />
                );
              })
            }
          </div>: <div className="charts-list">暂无内容</div>
        )
      }
    </div>
  );
};

// const ChartDataMap: any = {
//   all: [],
//   bar: [],
//   line: [],
//   pie: [],
//   scatter: [],
//   other: []
// }

const chartType = [
  {
    text: "全部",
    key: "all",
  },
  {
    text: "柱形图",
    key: "bar",
  },
  {
    text: "折线图",
    key: "line",
  },
  {
    text: "饼图",
    key: "pie",
  },
  {
    text: "散点图",
    key: "scatter",
  },
  {
    text: "其他",
    key: "other",
  },
];

export default memo(Charts);
