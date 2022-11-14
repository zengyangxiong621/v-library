import { useState, useEffect } from "react";
import "./index.less";
import Draggable from "react-draggable";

const SingleLine = (props) => {
  const line = props.line;
  const scale = props.scale;
  const index = props.index;
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {}, []);
  const handleDragStart = () => {
    setIsShow(true);
  };
  const handleDragStop = (event, data, line) => {
    setIsShow(false);
    if (line.direction === "horizon") {
      line.position.x = Math.ceil(data.x);
    }
    if (line.direction === "vertical") {
      line.position.y = Math.ceil(data.y);
    }
    props.onStop(event, line, index);
  };
  const handleDrag = (event, data, line) => {
    if (line.direction === "horizon") {
      setPosition({
        x: data.x,
        y: 0,
      });
    }
    if (line.direction === "vertical") {
      setPosition({
        x: 0,
        y: data.y,
      });
    }
  };
  return (
    <Draggable
      axis={line.direction === "horizon" ? "x" : "y"}
      scale={scale}
      position={line.position}
      onStart={handleDragStart}
      onDrag={(event, data) => handleDrag(event, data, line)}
      onStop={(event, data) => handleDragStop(event, data, line)}
    >
      {line.direction === "horizon" ? (
        <div
          style={{
            borderLeft: `${(1 / scale).toFixed(2)}px solid #EB5648`,
            padding: "2px",
            height: "1000000px",
            position: "absolute",
            top: "-50000px",
            cursor: "ew-resize",
            display: line.display,
            zIndex: 10000000,
            opacity: 1,
          }}
        >
          {isShow ? (
            <div
              style={{
                position: "absolute",
                top: "50000px",
                width: 60,
                height: "30px",
                fontSize: Math.ceil(20 / scale),
                lineHeight: "30px",
              }}
            >
              X:{Math.ceil(position.x)}
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div
          style={{
            borderTop: `${(1 / scale).toFixed(2)}px solid #EB5648`,
            padding: "2px",
            width: "1000000px",
            position: "absolute",
            left: "-50000px",
            cursor: "n-resize",
            display: line.display,
            zIndex: 10000000,
            opacity: 1,
          }}
        >
          {isShow ? (
            <div
              style={{
                position: "absolute",
                left: "50000px",
                width: 60,
                height: "30px",
                fontSize: Math.ceil(20 / scale),
                lineHeight: "30px",
              }}
            >
              Y:{Math.ceil(position.y)}
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </Draggable>
  );
};
export default SingleLine;
