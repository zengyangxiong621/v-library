import { memo, useEffect, useState, useRef } from "react";
import "./index.less";

import { IconFont } from "../../../utils/useIcon";

interface IProps {
  width?: string | number;
  height?: string | number;
  srcUrlArr: string[];
  curIndex: number;
}
const picUrl = require("@/assets/images/模板默认背景图.png");
const Preview = (props: IProps) => {
  const { srcUrlArr, curIndex } = props;

  const [index, setIndex] = useState(curIndex);
  useEffect(() => {
    setIndex(index);
  }, [index]);

  const viewPreImg = () => {
    if (index >= 1) setIndex(index - 1);
  };
  const viewNextImg = () => {
    if (index < srcUrlArr.length - 1) setIndex(index + 1);
  };
  return (
    <div className="Preview-wrap">
      <div className={`icon-wrap ${index === 0 && "iconDisable"}`}>
        <IconFont type="icon-fanhui" style={{ fontSize: "28px" }} onClickCapture={viewPreImg} />
      </div>
      <div className="img-wrap">
        <img
          className="redefined-img"
          src={srcUrlArr[index as any] || picUrl}
          alt="将被预览的图片正在赶来的路上…"
        ></img>
      </div>
      <div className={`icon-wrap ${index === srcUrlArr.length - 1 && "iconDisable"}`}>
        <IconFont
          rotate={180}
          type="icon-fanhui"
          style={{ fontSize: "28px" }}
          onClickCapture={() => viewNextImg()}
        />
      </div>
    </div>
  );
};

export default memo(Preview);
