/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { Component } from "react";
import ComponentDefaultConfig from "./config";
import "./index.css";
class ComImage extends Component {
  constructor(Props) {
    super(Props);
  }
  render() {
    const componentConfig = this.props.componentConfig || ComponentDefaultConfig;
    const { config } = componentConfig;
    const componentData = this.props.comData; // 过滤后的数据
    const fieldKey = this.props.fields[0];

    const style = config
      .filter((item) => item.name !== "dimension")
      .reduce((pre, cur) => {
        if (Array.isArray(cur.value)) {
          const obj = cur.value.reduce((p, c) => {
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

    const animationSettings = style.showAnimation
      ? {
        animationDuration: `${style.duration}s`,
        animationIterationCount: style.infinite.length ? "infinite" : 1,
        animationTimingFunction: style.timingFunction,
        animationName: style.type === "opacity" ? "opacityAnimate" : "scaleAnimate",
      }
      : {};

    const finalStyle = {
      opacity: style.opacity / 100,
      transform:
        style.rotate.direction === "horizontal"
          ? `rotateX(${style.rotate.angle}deg)`
          : `rotateY(${style.rotate.angle}deg)`,
      ...animationSettings,
    };

    let bgUrl = "";
    if (componentData && componentData.length) {
      bgUrl = componentData[0][fieldKey]
        ? componentData[0][fieldKey]
        : style.backgroundImg
          ? style.backgroundImg
          : "";
    } else if (style.backgroundImg) {
      bgUrl = style.backgroundImg;
    }

    return (
      <div
        style={{
          ...finalStyle,
          width: "100%",
          height: "100%",
        }}
      >
        {bgUrl ? (
          <img
            alt={bgUrl}
            src={bgUrl}
            style={{
              width: "100%",
              height: "100%",
            }}
          ></img>
        ) : null}
      </div>
    );
  }
}

export { ComImage, ComponentDefaultConfig };
export default ComImage;
