import React, { Component } from "react";
// import DigitalFlop from "@jiaminghi/data-view-react/es/digitalFlop"
import "./index.less";
import ComponentDefaultConfig from "./config";
import CountUp from "react-countup";

class ThreatWarning extends Component {
  constructor(Props) {
    super(Props);
  };
  render() {
    const componentConfig = this.props.componentConfig || ComponentDefaultConfig;
    const { config } = componentConfig;
    const { data } = componentConfig.staticData;
    // 最新字段
    const finalFieldsArr = this.props.fields || ["value","unit", "title"];
    // 组件静态或者传入组件的数据
    const originData = this.props.comData || data;
    // originData中有多项数据，只取第一项
    const firstData = originData[0];
    const numberValue = firstData[finalFieldsArr[0]];
    const unitValue = firstData[finalFieldsArr[1]];
    const titleValue = firstData[finalFieldsArr[2]];

    const componentThemeConfig = this.props.themeConfig;
    const replaceThemeColor = (arr, colorIndex = 0) => {
      arr.forEach((item) => {
        let index = colorIndex || 0;
        let { name, value, options, flag, type, key } = item;
        if (Object.prototype.hasOwnProperty.call(item, "value")) {
          // 对 系列一栏 做特殊处理
          if (flag === "specialItem") {
            try {
              index = key ? parseInt(key) - 1 : 0;
            } catch (e) {
              index = 0;
            }
          }
          if (Array.isArray(value)) {
            replaceThemeColor(value, index);
          } else {
            if (type === "color") {
              switch (name) {
                case "themePureColors":
                  item.value = componentThemeConfig.pureColors[0];
                  break;
                case "themeGradientColorStart":
                  item.value = componentThemeConfig.gradientColors[index % 7].find(item => item.offset === 0).color;
                  break;
                case "themeGradientColorEnd":
                  item.value = componentThemeConfig.gradientColors[index % 7].find(item => item.offset === 100).color;
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
            if(type === "chartText" && name === "labelTextStyle"){
              item.value.color = componentThemeConfig.textColor;
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
      this.props.onThemeChange({
        id: componentConfig.id,
        name: componentConfig.name,
        moduleName: componentConfig.moduleName,
        moduleVersion: componentConfig.moduleVersion,
        config: configOfTheme
      });
    }

    // 获取config中的配置
    const getTargetConfig = (Arr) => {
      let targetConfig = {};
      Arr.forEach((item) => {
        let { name, value, options, flag, displayName } = item;
        if (Object.prototype.hasOwnProperty.call(item, "value")) {
          // 对 系列一栏 做特殊处理
          if (flag === "specialItem") {
            name = displayName;
          }
          if (Array.isArray(value)) {
            targetConfig[name] = getTargetConfig(value);
          } else {
            targetConfig[name] = value;
          }
        } else if (Array.isArray(options) && options.length) {
          targetConfig[name] = getTargetConfig(options);
        }
      });
      return targetConfig;
    };
    const hadFilterArr = config.filter((item) => item.name !== "dimension");
    const { numberStyles,unitStyles,titleStyles } = getTargetConfig(hadFilterArr);
    const { showNumberStyles,textNumberStyle,offsetNumber } = numberStyles;
    const { showUnitStyles,textUnitStyle,offsetUnit } = unitStyles;
    const { showTitlerStyles,textTitleStyle,offsetTitle } = titleStyles;

    return (
      <div className="threat-warning1">
        <div className="left">
          <div className="l-num">
            <div className="number" style={{
              color: componentThemeConfig
              ? componentThemeConfig.pureColors[0]
              : textNumberStyle.themePureColors,
              fontSize: textNumberStyle.fontSize,
              fontFamily: textNumberStyle.fontFamily,
              fontWeight: textNumberStyle.bold ? "bold" : "normal",
              fontStyle: textNumberStyle.italic ? "italic" : "normal",
              letterSpacing: textNumberStyle.letterSpacing+"px",
              lineHeight: textNumberStyle.lineHeight+"px",
              top: offsetNumber.vertical + "px",
              left: offsetNumber.horizontal + "px",
            }}>
              {/* {numberValue} */}
              <CountUp start={0} end={numberValue} separator={","} duration={1}></CountUp>
            </div>
            <div className="unit" style={{
              color: componentThemeConfig
              ? componentThemeConfig.pureColors[0]
              : textUnitStyle.themePureColors,
              fontSize: textUnitStyle.fontSize,
              fontFamily: textUnitStyle.fontFamily,
              fontWeight: textUnitStyle.bold ? "bold" : "normal",
              fontStyle: textUnitStyle.italic ? "italic" : "normal",
              letterSpacing: textUnitStyle.letterSpacing+"px",
              lineHeight: textUnitStyle.lineHeight+"px",
              top: offsetUnit.vertical  + "px",
              left: offsetUnit.horizontal + "px",
            }}>{unitValue}</div>
            <div className="title" style={{
              color: componentThemeConfig
              ? componentThemeConfig.textColor
              : textTitleStyle.themeTextColor,
              fontSize: textTitleStyle.fontSize,
              fontFamily: textTitleStyle.fontFamily,
              fontWeight: textTitleStyle.bold ? "bold" : "normal",
              fontStyle: textTitleStyle.italic ? "italic" : "normal",
              letterSpacing: textTitleStyle.letterSpacing+"px",
              lineHeight: textTitleStyle.lineHeight+"px",
              top: offsetTitle.vertical + "px",
              left: offsetTitle.horizontal + "px",
            }}>{titleValue}</div>
          </div>
        </div>
      </div>
    );
  }
};

export {
  ComponentDefaultConfig,
  ThreatWarning
};

export default ThreatWarning;