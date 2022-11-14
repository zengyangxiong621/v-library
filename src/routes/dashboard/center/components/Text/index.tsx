import { useState, useEffect, useMemo } from "react";
import "./index.less";
import { deepClone } from "../../../../../utils";
import { defaultStyleConfig, defaultStaticData } from "./default";
import { cssConstantList, constantList, hh } from "../../constant";

const Text = (props: any) => {
  const styleConfig = props.styleConfig || defaultStyleConfig;
  const staticData = props.staticData || defaultStaticData;
  const style_align_config: any = styleConfig.find((item: any) => item.name === "align");
  const alignStyle = style_align_config.value.reduce((pre: any, cur: any) => {
    pre[cur.name] = cur.value;
    return pre;
  }, {});

  const style = styleConfig
    .filter((item: any) => item.name !== "dimension")
    .reduce((pre: any, cur: any) => {
      if (Array.isArray(cur.value)) {
        const obj = cur.value.reduce((p: any, c: any) => {
          p[c.name] = c.value;
          return p;
        }, {});
        pre = {
          ...pre,
          ...obj,
        };
      } else {
        pre[cur.name] = cur.value;
      }
      return pre;
    }, {});
  return (
    <div className="c-text" style={{ width: "100%", height: "100%", ...style }}>
      {staticData?.data[0]?.text || "{}"}
    </div>
  );
};
export default Text;
