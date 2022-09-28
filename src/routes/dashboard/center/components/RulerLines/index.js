import { useState, useEffect, useRef } from "react";
import { connect } from "dva";
import "./index.less";
import SingleLine from "./components/index";

const RulerLines = ({ bar, dispatch }) => {
  const rulerLines = bar.rulerLines;
  useEffect(() => {

  }, []);
  const handleDragStop = (event, line, index) => {
    if (line.direction === "horizon") {
      // 竖
      if (event.clientX < document.querySelector(".home-left-wrap").getBoundingClientRect().width + 22) {
        bar.rulerLines.splice(index, 1);
        dispatch({
          type: "bar/save",
        });
      }
    }
    if (line.direction === "vertical") {
      // 横
      if (event.clientY < document.querySelector(".header-wrap").getBoundingClientRect().height + 22) {
        bar.rulerLines.splice(index, 1);
        dispatch({
          type: "bar/save",
        });
      }
    }

  };
  return (
    <div className="RulerLines" style={ { position: "absolute", left: 0, top: 0, width: 0, height: 0 } }>
      {
        rulerLines.map((line, index) => {
          return <SingleLine onStop={ handleDragStop } index={ index } scale={ bar.canvasScaleValue } line={ line }/>;
        })
      }
    </div>
  );
};
export default connect(({
                          bar,
                        }
  ,
  ) =>
    (
      {
        bar,
      }
    ),
)
(RulerLines);
