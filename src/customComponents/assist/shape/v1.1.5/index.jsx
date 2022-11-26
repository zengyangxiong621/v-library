import React from "react";
import ComponentDefaultConfig from "./config";

const Shape = (props) => {
  const componentConfig = props.componentConfig || ComponentDefaultConfig;
  const { config } = componentConfig;
  const getConfig = (config) => {
    const style = {};
    if (Array.isArray(config)) {
      config.forEach(item => {
        if (Array.isArray(item.value)) {
          style[item.name] = getConfig(item.value);
        } else {
          style[item.name] = item.value;
        }
      });
    }
    return style;
  };
  const { dimension, bgColor, border, shadow, shapeType, gradientOrigin, gradientStart, gradientEnd } = getConfig(config);

  const getShapeStyle = () => {
    const getRadius = (radiusArr) => {
      return radiusArr.map(item => item + "px").join(" ");
    };
    const getRadientStyle = () => {
      let backgroundImage = "";
      if (gradientOrigin === "center") {
        backgroundImage = `linear-gradient(to right, ${gradientStart}, ${gradientEnd}, ${gradientStart})`;
      } else {
        backgroundImage = `linear-gradient(to ${gradientOrigin}, ${gradientStart}, ${gradientEnd})`;
      }
      return {
        "background-image": backgroundImage
      };
    };
    const getShadowStyle = (shadowConfig) => {
      const { hShadow, vShadow, blur, color } = shadowConfig;
      return {
        "boxShadow": `${hShadow}px ${vShadow}px ${blur}px ${color}`
      };
    };
    const { height, width } = dimension;
    const { color, type, width: borderWidth, radius } = border;
    const { show, shadowConfig } = shadow;
    const borderRadius = getRadius(radius);
    const shadowStyle = show ? getShadowStyle(shadowConfig) : {};
    return {
      "width": width,
      "height": height,
      "backgroundColor": bgColor,
      "borderWidth": borderWidth,
      "borderStyle": type,
      "borderColor": color,
      "borderRadius": shapeType === "rectangle" ? borderRadius : "50%",
      ...shadowStyle,
      ...getRadientStyle()
    };
  };
  return (
    <div style={{ ...getShapeStyle() }}></div>
  );
};

export {
  Shape,
  ComponentDefaultConfig
};
export default Shape;
