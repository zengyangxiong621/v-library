import { useState, useEffect, Props, forwardRef, useImperativeHandle, useRef } from "react";
import ReactDOM from 'react-dom'
import { connect } from "dva";
import "./index.less";

interface SupportLineProperty {
  bar?: any,
  cRef?: any
}

const SupportLines = ({ bar, cRef }: SupportLineProperty) => {
  const [ style, setStyle ] = useState({
    left: 0,
    top: 0,
    display: "none",
  });
  const [compBorderStyle, setCompBorderStyle] = useState({
    width: 100,
    height: 100,
  })
  const borderRef: any = useRef(null);

  useImperativeHandle(cRef, () => ({
    // changeVal 就是暴露给父组件的方法
    handleSetPosition: (left: number, top: number, display = "block") => {
      setStyle({ left, top, display });
      lineRef.current.style.left = left + 'px'
      lineRef.current.style.top = top + 'px'
      lineRef.current.style.display = display
    },
    handleSetCompBorderStyle: ({width, height}: {width: number, height: number}) => {
      setCompBorderStyle({width, height})
      borderRef.current.style.width = width + 'px'
      borderRef.current.style.height = height + 'px'
    }
  }));


  const lineRef: any = useRef(null);
  return (
    <div
      className="SupportLines"
      ref={lineRef}
      style={ {
        position: "absolute",
        zIndex: "1000000" ,
        ...style,
      } }
    >
      <div className="border"
        ref={borderRef}
        style={ {
          // ...style,
          position: "absolute",
          border: `${ 1 / bar.canvasScaleValue }px solid #2482FF`,
          ...compBorderStyle,
        } }
      >

      </div>
      <div className="v-line" style={ { borderTop: `${ 1 / bar.canvasScaleValue }px dashed #b6b2b2` } }/>
      <div className="h-line" style={ { borderLeft: `${ 1 / bar.canvasScaleValue }px dashed #b6b2b2` } }/>
      <div
        className="position-info"
        style={ { position: "absolute", bottom: 20, right: 20, color: "#b6b2b2", fontSize: 18 / bar.canvasScaleValue } }
      >
        {
          Math.ceil(style.left) + "," + Math.ceil(style.top)
        }
      </div>
    </div>
  );
};

export default connect(({ bar }: any) => ({
  bar,
}))(SupportLines);
