/* eslint-disable react/prop-types */
import React, { Component } from "react";
import ComponentDefaultConfig from "./config";

class BgBorder extends Component {
  constructor(Props) {
    super(Props);
  }
  render() {
    const componentConfig = this.props.componentConfig || ComponentDefaultConfig;
    const { config } = componentConfig;

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

    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: style.bgColor,
          border: `${style.border.width}px ${style.border.type} ${style.border.color}`,
        }}
      ></div>
    );
  }
}

export { BgBorder, ComponentDefaultConfig };
export default BgBorder;
