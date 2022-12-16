import React, { useState, useEffect } from "react";
import { Timeline } from "antd";
import ComponentDefaultConfig from "./config";
// import "./index.css"
import "./index.less";

const spotDom = (spotType, index) => {
  const getSpotStyle = {
    position: "relative",
    display: "inline-block",
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    backgroundImage: "linear-gradient(#00D9FF,#095EFF)",
  };
  const getSpotInlineStyle = {
    position: "absolute",
    display: "inline-block",
    width: "13px",
    height: "13px",
    border: "3px solid #333",
    borderRadius: "50%",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
    backgroundColor: "#fff",
  };
  const singleStyle = {
    display: "inline-block",
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: "#fff",
  };
  const single = <span style={singleStyle}></span>;
  const double = (
    <span style={getSpotStyle}>
      <span style={getSpotInlineStyle}></span>
    </span>
  );
  return <>{spotType ? (index % 2 === 0 ? double : single) : double}</>;
};

export default function TimelineRender(props) {
  const componentConfig = props.componentConfig || ComponentDefaultConfig;
  const { config, staticData } = componentConfig;
  const componentData = props.comData ? Array.isArray(props.comData) ? props.comData  : [] :  staticData.data; // 过滤后的数据
  const _fields = props.fields;
  const componentThemeConfig = props.themeConfig;

  useEffect(() => {
    props.onDataChange && props.onDataChange(componentData);
  }, [componentData]);


  const replaceThemeConfig = (configArr) => {
    configArr.forEach((item) => {
      if (Object.prototype.hasOwnProperty.call(item, "value")) {
        const { value, type, name } = item;
        if (Array.isArray(value)) {
          replaceThemeConfig(value);
        } else {
          if (type === "color") {
            switch (name) {
              case "themeLableColor":
                item.value = componentThemeConfig.textColor;
                break;
              case "themeTitleColor":
                item.value = componentThemeConfig.pureColors[0];
                break;
              case "themeTextColor":
                item.value = componentThemeConfig.textColor;
                break;
              default:
                break;
            }
          }
        }
      } else if (Object.prototype.hasOwnProperty.call(item, "options")) {
        replaceThemeConfig(item.options);
      }
    });
  };
  if (componentThemeConfig) {
    const configOfTheme = JSON.parse(JSON.stringify(config));
    replaceThemeConfig(configOfTheme);
    props.onThemeChange({
      id: componentConfig.id,
      name: componentConfig.name,
      moduleName: componentConfig.moduleName,
      moduleVersion: componentConfig.moduleVersion,
      config: configOfTheme,
    });
  }
  const getStyle = (config) => {
    const style = {};
    if (Array.isArray(config)) {
      config.forEach((item) => {
        if (Array.isArray(item.value)) {
          style[item.name] = getStyle(item.value);
        } else if (item.options && Array.isArray(item.options)) {
          item.options.forEach((item) => {
            style[item.key] = getStyle(item.value);
          });
        } else {
          style[item.name] = item.value;
        }
      });
    }
    return style;
  };
  const style = getStyle(config);
  const { dimension, backgroundColor, labelStyle, fontStyle, spotType } = style;

  const positionStyle = dimension;

  const {
    title: { styleController: titleStyle, align, outShadow },
  } = fontStyle;
  const {
    content: { styleController: contentStyle },
  } = fontStyle;
  const {
    label: { styleController: timeStyle, show, labelOutShadow, offsetConfig },
  } = labelStyle;

  const formatPxStyle = (Obj) => {
    Object.keys(Obj).forEach((item) => {
      if (typeof Obj[item] === "number") {
        Obj[item] = Obj[item] + "px";
      }
    });
  };
  formatPxStyle(contentStyle);

  const getShadowVal = (dom) => {
    const { color, vShadow, hShadow, blur } = dom["shadow"];
    return `${hShadow}px ${vShadow}px ${blur}px ${color}`;
  };
  // 对话框尖角样式
  const getArrowStyle = (color) => {
    return {
      position: "absolute",
      right: "100%",
      top: 0,
      borderTop: `5px solid ${color}`,
      borderRight: `5px solid ${color}`,
      borderBottom: "5px solid transparent",
      borderLeft: "5px solid transparent",
    };
  };
  // 左侧标题小icon
  const getTitleLineStyle = (textStyle) => {
    return {
      position: "absolute",
      width: "8px",
      height: "60%",
      backgroundColor: textStyle.color,
      boxShadow: textStyle.textShadow,
    };
  };
  // 内容标题样式
  const getTimeLineTitleStyle = (isOutShadow) => {
    formatPxStyle(titleStyle);
    const baseStyle = {
      ...titleStyle,
      ...align,
      color: componentThemeConfig ? componentThemeConfig.pureColors[0] : titleStyle.themeTitleColor,
    };
    return isOutShadow ? { ...baseStyle, textShadow: getShadowVal(outShadow) } : baseStyle;
  };
  // 获取内容样式
  const getContentStyle = (contentStyle) => {
    return {
      ...contentStyle,
      color: componentThemeConfig ? componentThemeConfig.textColor : timeStyle.themeLableColor,
    };
  };

  // 设置时间样式
  const getLableStyleFromConfig = (isLabelOutShadow) => {
    formatPxStyle(timeStyle);
    const baseCss = {
      ...timeStyle,
      color: componentThemeConfig ? componentThemeConfig.textColor : timeStyle.themeLableColor,
      left: offsetConfig.x + "px",
      top: offsetConfig.y - 7 + "px",
    };
    return isLabelOutShadow ? { ...baseCss, textShadow: getShadowVal(labelOutShadow) } : baseCss;
  };
  const getKebabCase = (str) => {
    return str.replace(/[A-Z]/g, function(i) {
      return "-" + i.toLowerCase();
    });
  };
  const setLabelStyle = () => {
    const labelStyle = getLableStyleFromConfig(labelOutShadow.show);
    let cssText = "";
    Object.keys(labelStyle).forEach((key) => {
      cssText += `${getKebabCase(key)}:${labelStyle[key]};`;
    });
    const labelDom = document.getElementsByClassName("ant-timeline-item-label");
    for (let i = 0; i < labelDom.length; i++) {
      const item = labelDom[i];
      item.style.cssText = cssText;
    }
  };

  const handleClick = (e,item) => {
    props.onClick && props.onClick(e, item);
  };
  const handleMouseEnter = (e) => {
    props.onMouseEnter && props.onMouseEnter(e, props.comData);
  };
  const handleMouseLeave = (e) => {
    props.onMouseEnter && props.onMouseLeave(e, props.comData);
  };


  useEffect(() => {
    setLabelStyle();
  }, [labelStyle]);
  return (
    <Timeline 
      mode="left" 
      className="myTimeLine" 
      style={positionStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {componentData?.map((item, index) => {
        const timeLineTitleStyle = getTimeLineTitleStyle(outShadow.show);
        return (
          <Timeline.Item
            dot={spotDom(spotType, index)}
            label={show && item[_fields[0]]}
            key={item.time}
            onClick={(e) => handleClick(e,item)}
          >
            <div className="timeLineBox" style={{ backgroundColor, borderColor: backgroundColor }}>
              <div className="timeLineArrow" style={getArrowStyle(backgroundColor)}></div>
              <div className="timeLineTitle" style={timeLineTitleStyle}>
                <div className="titleLine" style={getTitleLineStyle(timeLineTitleStyle)}></div>
                <span className="titleVal">{item[_fields[1]]}</span>
              </div>
              <div className="timeLineContent" style={getContentStyle(contentStyle)}>
                {item[_fields[2]]}
              </div>
            </div>
          </Timeline.Item>
        );
      })}
    </Timeline>
  );
}

export { ComponentDefaultConfig };
