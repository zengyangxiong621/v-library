/* eslint-disable prettier/prettier */
/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
import React, { useRef, useEffect } from "react";
import ComponentDefaultConfig from "./config";
import "./index.css";

const ListItem = (props) => {
  const { index, column1, column2, column3, dataLen } = props;
  const everyColumnHeight = 100 / dataLen;

  return (
    <div className="list-item" style={{ height: `${everyColumnHeight}%` }}>
      <div>
        <div className={["item-num", index <= 2 ? "item-num-top3" : null].join(" ")}>
          <span>{index + 1}</span>
        </div>
      </div>
      <div>{column1}</div>
      <div>{column2}</div>
      <div>{column3}</div>
    </div>
  );
};

const RankingList2 = (props) => {
  const componentConfig = props.componentConfig || ComponentDefaultConfig;
  const { config } = componentConfig;
  const { fields, data } = componentConfig.staticData;
  const componentThemeConfig = props.themeConfig;

  const replaceThemeColor = (arr, colorIndex = 0) => {
    arr.forEach((item) => {
      let index = colorIndex || 0;
      let { name, value, options, flag, type, key } = item;
      if (Object.prototype.hasOwnProperty.call(item, "value")) {
        if (Array.isArray(value)) {
          replaceThemeColor(value, index);
        } else {
          if (type === "color") {
            switch (name) {
              case "themePureColor":
                item.value = componentThemeConfig.pureColors[index % 7];
                break;
              case "themeGradientColorStart":
                item.value = componentThemeConfig.gradientColors[index % 7].find(
                  (item) => item.offset === 0
                ).color;
                break;
              case "themeGradientColorEnd":
                item.value = componentThemeConfig.gradientColors[index % 7].find(
                  (item) => item.offset === 100
                ).color;
                break;
              case "themeTextColor":
                item.value = componentThemeConfig.textColor;
                break;
              case "themeAssistColor":
                item.value = componentThemeConfig.assistColor;
                break;
              case "themeGridColor":
                item.value = componentThemeConfig.gridColor;
                break;
              default:
                break;
            }
          }
        }
      } else if (Array.isArray(options) && options.length) {
        replaceThemeColor(options, index);
      }
    });
  };
  if (componentThemeConfig) {
    const configOfTheme = JSON.parse(JSON.stringify(config));
    replaceThemeColor(configOfTheme);
    props.onThemeChange({
      id: componentConfig.id,
      name: componentConfig.name,
      moduleName: componentConfig.moduleName,
      moduleVersion: componentConfig.moduleVersion,
      config: configOfTheme,
    });
  }

  // 最新字段
  const finalFields = props.fields || ["column1", "column2", "column3"];
  // 组件静态或者传入组件的数据
  const originData = props.comData || data;
  // 根据传入的fields来映射对应的值
  const fields2ValueMap = {};
  const initColumnsName = ["column1", "column2", "column3"];
  finalFields.forEach((item, index) => {
    fields2ValueMap[initColumnsName[index]] = item;
  });
  // 根据对应的字段来转换data数据
  const finalData = Array.isArray(originData)
    ? originData.map((item) => {
      let res = {};
      for (let k in fields2ValueMap) {
        res[k] = item[fields2ValueMap[k]];
      }
      return res;
    })
    : [];

  const getTargetStyle = (Arr) => {
    const targetStyle = {};
    Arr.forEach(({ name, value }) => {
      if (Array.isArray(value)) {
        value.forEach(({ name, value }) => {
          if (name === "themeTextColor") {
            targetStyle["color"] = value;
          } else {
            targetStyle[name] = value;
          }
        });
      } else {
        if (name === "themeTextColor") {
          targetStyle["color"] = value;
        } else {
          targetStyle[name] = value;
        }
      }
    });
    return targetStyle;
  };

  const finalStyle = getTargetStyle(config);
  return (
    <div style={{ ...finalStyle, height: "inherit", width: "100%" }}>
      <div className="ranking-order-list-wrap">
        {finalData.map((item, index) => {
          return <ListItem key={index} index={index} {...item} dataLen={finalData.length} />;
        })}
      </div>
    </div>
  );
};

export { RankingList2, ComponentDefaultConfig };

export default RankingList2;
