import { useState, useEffect } from "react";
import { connect } from "dva";
import "./index.less";
import {
  FullscreenOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

import * as React from "react";

const BottomBar = ({ bar, dispatch, focus$, ...props }: any) => {
  const findItem = (name: string) => {
    return bar.dashboardConfig.find((item: any) => {
      return item.name === name;
    });
  };
  const recommendConfig = findItem("recommend");
  useEffect(() => {

  }, []);
  const handleFullScreen = () => {
    focus$.emit();
  };
  const handleScreen = (type: boolean) => {
    // type: true 为放大 false 缩小
    if(bar.canvasScaleValue <= 0.1) {
      if (type) { // 可以放大
        dispatch({
          type: "bar/save",
          payload: {
            canvasScaleValue: Number((bar.canvasScaleValue + 0.1).toFixed(3)),
          },
        });
      }
    } else if (bar.canvasScaleValue >= 4) {
      if (!type) { // 可以缩小
        dispatch({
          type: "bar/save",
          payload: {
            canvasScaleValue: Number((bar.canvasScaleValue - 0.1).toFixed(3)),
          },
        });
      }
    } else {
      let canvasScaleValue =  Number((bar.canvasScaleValue + (type ? 0.1 : -0.1)).toFixed(3));
      if (canvasScaleValue <= 0.1) {
        canvasScaleValue = 0.1;
      }
      if (canvasScaleValue >= 4) {
        canvasScaleValue = 4;
      }
      dispatch({
        type: "bar/save",
        payload: {
          canvasScaleValue
        },
      });
    }
  };
  const handleMinusScreen = () => {

  };

  return (
    <div className="c-center-bottom-bar">
{/*      <section style={ {
        position: "absolute",
        bottom: "50px",
        right: "20px",
        color: "#999",
        userSelect: "none",
      } }>
        按住空格可拖拽画布 { recommendConfig.width }*{ recommendConfig.height }
        { " " + Math.ceil(bar.canvasScaleValue * 100) + "%" }
      </section>*/}
      <section className="left">
      </section>
      <section className="right g-flex g-items-center g-h-full">
        <div style={{ height: '100%', lineHeight: '32px' ,paddingRight: '22px', borderRight: "1px solid #000"}}>
          按住空格可拖拽画布 { recommendConfig.width }*{ recommendConfig.height }
          { " " + Math.ceil(bar.canvasScaleValue * 100) + "%" }
        </div>
        <MinusCircleOutlined
          className="scale-icon"
          onClick={ () => handleScreen(false) }
        />
        <PlusCircleOutlined
          className="scale-icon"
          onClick={ () => handleScreen(true) }
        />
        <FullscreenOutlined
          className="scale-icon"
          onClick={ handleFullScreen }
        />
      </section>
    </div>
  );
};
export default connect(({ bar }: any) => ({ bar }))(BottomBar);
