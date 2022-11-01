import { useState, useEffect, useRef, useImperativeHandle } from "react";
import { findDOMNode } from "react-dom";
import "./index.less";
import { connect } from "dva";
import {
  EyeOutlined,
  EyeInvisibleOutlined,

} from "@ant-design/icons";
import { throttle } from "../../../../../utils/common";


const Ruler = ({ bar, dispatch, mouse, cRef }) => {

  const MARGIN_LENGTH = 22;

  const recommendConfig = bar.dashboardConfig.find(item => item.name === "recommend");
  let [ruler, setRuler] = useState(null);
  const [isRulerLinesShow, setIsRulerLinesShow] = useState(true);
  // 横
  const [horizonRulerWidth, setHorizonRulerWidth] = useState(2550);
  // 竖
  const [verticalRulerHeight, setVerticalRulerHeight] = useState(1440);

  const canvasContainer = document.querySelector(".canvas-screen");

  const headerWrap = document.querySelector(".header-wrap");


  const painter = () => {
    if (ruler) {
      ruler.clear();
      const leftWrap = document.querySelector(".home-left-wrap");
      const left = Math.ceil(canvasContainer.getBoundingClientRect().left - leftWrap.getBoundingClientRect().width);
      const right = Math.ceil(canvasContainer.getBoundingClientRect().top - headerWrap.getBoundingClientRect().height);
      const centerWrap = document.querySelector(".center-wrap");
      ruler.painter(bar.canvasScaleValue, left, right);
      // 下面两个需要先执行，因为是异步的，需要在重新渲染画布之前

      // setHorizonRulerWidth(centerWrap.getBoundingClientRect().width)
      // setVerticalRulerHeight(centerWrap.getBoundingClientRect().height)
    }
  };
  useImperativeHandle(cRef, () => ({
    painter: () => {
      painter();
    },
  }));

  useEffect(() => {
    const temp = new rulerCanvas();
    temp.painter(bar.canvasScaleValue);
    ruler = setRuler(temp);
    const centerWrap = document.querySelector(".center-wrap");
    // setHorizonRulerWidth(centerWrap.getBoundingClientRect().width)
    // setVerticalRulerHeight(centerWrap.getBoundingClientRect().height)
    return () => {
      setRuler(null);
    };
  }, []);

  useEffect(() => {
    if (ruler) {
      painter();
    }
  }, [bar.canvasScaleValue]);

  const rulerCanvas = function () {
    this.canvasTop = document.querySelector("#h-ruler-canvas");
    this.canvasLeft = document.querySelector("#v-ruler-canvas");
    this.clear = () => {
      const contextTop = this.canvasTop.getContext("2d");
      const contextLeft = this.canvasLeft.getContext("2d");
      contextTop.clearRect(0, 0, this.canvasTop.getBoundingClientRect().width, MARGIN_LENGTH);
      contextLeft.clearRect(0, 0, MARGIN_LENGTH, this.canvasLeft.getBoundingClientRect().height);
    };
    this.painter = (canvasScaleValue, left = 0, top = 0) => {
      const draggableWrapper = document.querySelector(".canvas-container");
      // console.log('parent', draggableWrapper.offsetParent.getBoundingClientRect())
      // console.log('offsetTop', draggableWrapper.offsetTop)
      //
      // console.log('offsetLeft', draggableWrapper.offsetLeft)
      const contextTop = this.canvasTop.getContext("2d");
      const contextLeft = this.canvasLeft.getContext("2d");

      contextTop.beginPath();
      contextLeft.beginPath();

      let rulerScale = 100;
      let rulerGrade = 10;

      let hRulerScaleMaximum = 20000;
      let vRulerScaleMaximum = 10000;

      if (canvasScaleValue > 1) {
        rulerScale = 50;
        rulerGrade = 10;
      } else if (canvasScaleValue <= 1 && canvasScaleValue > 0.67) {
        rulerScale = 100;
        rulerGrade = 10;
      } else if (canvasScaleValue <= 0.67 && canvasScaleValue > 0.43) {
        rulerScale = 200;
        rulerGrade = 20;
      } else if (canvasScaleValue <= 0.43 && canvasScaleValue > 0.19) {
        rulerScale = 400;
        rulerGrade = 40;
      } else if (canvasScaleValue <= 0.19 && canvasScaleValue > 0.13) {
        rulerScale = 500;
        rulerGrade = 50;
      } else if (canvasScaleValue <= 0.13 && canvasScaleValue > 0.03) {
        rulerScale = 1000;
        rulerGrade = 100;
      } else {
        rulerScale = 2000;
        rulerGrade = 200;
      }
      for (let i = -hRulerScaleMaximum; i < hRulerScaleMaximum; i += rulerGrade) {
        contextTop.strokeStyle = "white";
        contextTop.fillStyle = "white";

        //顶部标尺线绘制, 比例尺
        const y = (i % rulerScale === 0) ? 0 : 12;
        contextTop.moveTo(Math.ceil(i * canvasScaleValue) + left - MARGIN_LENGTH, y);
        contextTop.lineTo(Math.ceil(i * canvasScaleValue) + left - MARGIN_LENGTH, 20);

        //顶部标尺数字绘制
        if (y === 0) {
          contextTop.font = "12px Arial";
          contextTop.fillText(i, Math.ceil(i * canvasScaleValue) + left - 18, 10);
        }
      }

      for (let i = -vRulerScaleMaximum; i < vRulerScaleMaximum; i += rulerGrade) {
        //左侧标尺线绘制
        contextLeft.strokeStyle = "white";
        contextLeft.fillStyle = "white";
        const x = (i % rulerScale === 0) ? 0 : 12;
        contextLeft.moveTo(x, Math.ceil(i * canvasScaleValue) + top - MARGIN_LENGTH);
        contextLeft.lineTo(20, Math.ceil(i * canvasScaleValue) + top - MARGIN_LENGTH);

        //左侧标尺数字绘制
        if (x === 0) {
          contextLeft.save();
          contextLeft.translate(10, Math.ceil(i * canvasScaleValue) + top - 25);
          contextLeft.font = "12px Arial";
          contextLeft.rotate(-90 * Math.PI / 180);
          contextLeft.fillText(i, 0, 0);
          contextLeft.restore();
        }

      }
      contextLeft.stroke();
      contextLeft.closePath();
      contextTop.stroke();
      contextTop.closePath();
    };
  };


  const drawRuler = (dom, direction = "vertical", min = 0, max = 100) => {
    const canvas = dom.current;
    const context = canvas.getContext("2d");
    // ctx.fillStyle = '#151620'
    context.fillStyle = "white";
    context.fillRect(0, 0, direction === "vertical" ? 10000 : 30, direction === "vertical" ? 10000 : 30);
    context.beginPath();
    // context.moveTo(AXIS_ORIGIN.x, AXIS_MARGIN);
    // context.lineTo(AXIS_RIGHT,    AXIS_MARGIN)
    context.closePath();
    context.lineWidth = 0.5;
    context.strokeStyle = "white";
  };

  const handleClick = (direction) => {
    if (direction === "vertical") {
      // 竖
      bar.rulerLines.push({
        position: {
          x: 0,
          y: mouse.elementY / bar.canvasScaleValue,
        },
        direction,
      });
    }
    if (direction === "horizon") {
      // 横
      bar.rulerLines.push({
        position: {
          x: mouse.elementX / bar.canvasScaleValue,
          y: 0,
        },
        direction,
      });
    }
    dispatch({
      type: "bar/save",
    });
  };
  const handleRulerLinerShow = () => {
    setIsRulerLinesShow(!isRulerLinesShow);
    bar.rulerLines.forEach(line => {
      line.display = !isRulerLinesShow ? "block" : "none";
    });
    dispatch({
      type: "bar/save",
    });
  };
  return (
    <div className="c-ruler-container" style={ { position: "absolute", inset: 0 } }>
      <div className="h-container" style={ {
        position: "absolute",
        width: "100%",
        height: MARGIN_LENGTH,
        left: MARGIN_LENGTH,
        top: 0,
      } }>
        <canvas
          onClick={ () => handleClick("horizon") }
          id="h-ruler-canvas"
          height={ MARGIN_LENGTH }
          width={ horizonRulerWidth }
          style={ {
            position: "absolute",
            left: 0,
            top: 0,
            background: "#151620",
            cursor: "e-resize",
          } }>
          <p>Your browser does not support the canvas element!</p>
        </canvas>
      </div>
      <div className="v-container" style={ {
        position: "absolute",
        height: "100%",
        width: MARGIN_LENGTH,
        left: 0,
        top: MARGIN_LENGTH,
      } }>
        <canvas
          onClick={ () => handleClick("vertical") }
          id="v-ruler-canvas"
          width={ MARGIN_LENGTH }
          height={ verticalRulerHeight }
          style={ {
            position: "absolute",
            left: 0,
            top: 0,
            right: 0,
            background: "#151620",
            cursor: "n-resize",
          } }>
          <p>Your browser does not support the canvas element!</p>
        </canvas>
      </div>


      <div
        style={ {
          width: 20,
          height: 20,
          background: "#151620",
          position: "absolute",
          zIndex: 10000,
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        } }
        onClick={ handleRulerLinerShow }
      >
        {
          isRulerLinesShow ? <EyeOutlined style={ { fontSize: "16px", color: "#08c" } }/> :
            <EyeInvisibleOutlined style={ { fontSize: "16px", color: "#08c" } }/>
        }
      </div>
    </div>
  );
};
export default connect(({
                          bar,
                        },
) => (
  {
    bar,
  }
))(Ruler);
