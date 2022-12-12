import { useState, useImperativeHandle, useRef } from "react";
import { connect } from "dva";
import "./index.less";

interface SupportLineProperty {
  bar?: any;
  cRef?: any;
}

const SupportLines = ({ bar, cRef }: SupportLineProperty) => {
  const [style, setStyle] = useState({
    left: 0,
    top: 0,
    display: "none",
  });

  const lineRef: any = useRef(null);

  useImperativeHandle(cRef, () => ({
    // changeVal 就是暴露给父组件的方法
    handleSetPosition: (left: number, top: number, display = "block") => {
      setStyle({ left, top, display });
      lineRef.current.style.left = left + "px";
      lineRef.current.style.top = top + "px";
      lineRef.current.style.display = display;
    },
    handleMovePosition: (x: number, y: number) => {
      const dom = lineRef.current;
      const left = Number(dom.style.left.replace("px", ""));
      const top = Number(dom.style.top.replace("px", ""));
      dom.style.left = left + x + "px";
      dom.style.top = top + y + "px";
      setStyle({
        left: left + x,
        top: top + y,
        display: "block",
      });
    },
  }));

  return (
    <div
      className="SupportLines"
      ref={lineRef}
      style={{
        position: "absolute",
        zIndex: "1000000",
        ...style,
      }}
    >
      <div
        className="v-line"
        style={{ borderTop: `${1 / bar.canvasScaleValue}px dashed #b6b2b2` }}
      />
      <div
        className="h-line"
        style={{ borderLeft: `${1 / bar.canvasScaleValue}px dashed #b6b2b2` }}
      />
      <div
        className="position-info"
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          color: "#b6b2b2",
          fontSize: 18 / (bar.canvasScaleValue || 1),
        }}
      >
        {Math.ceil(style.left) + "," + Math.ceil(style.top)}
      </div>
    </div>
  );
};

export default connect(({ bar }: any) => ({
  bar,
}))(SupportLines);
