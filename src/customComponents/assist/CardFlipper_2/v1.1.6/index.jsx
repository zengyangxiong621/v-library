import React, { Component } from "react";
import "./index.less";
import DigitalFlop from "@jiaminghi/data-view-react/es/digitalFlop";
import ComponentDefaultConfig from "./config";
// import CountUp from "react-countup";

class ChMap extends Component {
  constructor() {
    super(),
      (this.state = {
        numValue: 0,
      });
  }

  componentDidMount() {
    const componentConfig = this.props.componentConfig || ComponentDefaultConfig;
    const { data } = componentConfig.staticData;
    // 最新字段
    const finalFieldsArr = this.props.fields || ["value"];
    // 组件静态或者传入组件的数据
    const originData = this.props.comData || data;
    // originData中有多项数据，只取第一项
    const firstData = originData[0];
    setTimeout(() => {
      this.setState({
        numValue: firstData[finalFieldsArr[0]],
      });
    }, 50);
  }

  componentDidUpdate(prevProps){
    if(JSON.stringify(prevProps.comData) !== JSON.stringify(this.props.comData)){
      this.props.onDataChange && this.props.onDataChange(this.props.comData)
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { comData, fields } = nextProps;
    let originData = comData?.length ? comData[0] : null;
    if (originData && originData[fields[0]] !== prevState.numValue && prevState.numValue != 0) {
      return {
        numValue: originData[fields[0]],
      };
    }
    return null;
  }

  renderNumber(number, counter) {
    // 处理负数或者携带小数点的情况
    let value = parseInt(Math.abs(number)) + "";
    let valueArr = value.split("");
    let flag = counter - valueArr.length;
    if (flag > 0) {
      for (let index = 0; index < flag; index++) {
        valueArr.unshift("0");
      }
    } else if (flag < 0) {
      valueArr = valueArr.splice(-flag);
    }
    return valueArr;
  }

  handleClick = (e) => {
    this.props.onClick && this.props.onClick(e, this.props.comData);
  };
  handleMouseEnter = (e) => {
    this.props.onMouseEnter && this.props.onMouseEnter(e, this.props.comData);
  };
  handleMouseLeave = (e) => {
    this.props.onMouseEnter && this.props.onMouseLeave(e, this.props.comData);
  };


  render() {
    const componentConfig = this.props.componentConfig || ComponentDefaultConfig;
    const { config } = componentConfig;
    const { data } = componentConfig.staticData;
    const { numValue } = this.state;
    // 最新字段
    const finalFieldsArr = this.props.fields || ["value"];
    // 组件静态或者传入组件的数据
    const originData = this.props.comData || data;
    // originData中有多项数据，只取第一项
    const firstData = originData[0];
    // const numberValue = firstData[finalFieldsArr[0]]

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
            if (type === "chartText" && name === "labelTextStyle") {
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
        config: configOfTheme,
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

    const { container, numberStyles } = getTargetConfig(config);
    const { containerSize, containerCounter } = container;
    const { textNumberStyle } = numberStyles;

    const numberArr1 = this.renderNumber(numValue, containerCounter);

    return (
      <div
        className="CardFlipper_22"
        onClick={this.handleClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {numberArr1.map((item, index) => (
          <div
            className="bg"
            key={index}
            style={{
              width: containerSize + "px",
              height: containerSize + "px",
              color: componentThemeConfig
                ? componentThemeConfig.textColor
                : textNumberStyle.themeTextColor,
              fontSize: textNumberStyle.fontSize,
              fontFamily: textNumberStyle.fontFamily,
              fontWeight: textNumberStyle.bold ? "bold" : "normal",
              fontStyle: textNumberStyle.italic ? "italic" : "normal",
              letterSpacing: textNumberStyle.letterSpacing + "px",
              lineHeight: textNumberStyle.lineHeight + "px",
            }}
          >
            {/* {item} */}
            {/* <DigitalFlop config={
                {number: [Number(item)],content: '{nt}',style: {
                  fontSize: textNumberStyle.fontSize,
                  fontWeight: textNumberStyle.bold ? 'bold' : 'normal',
                  fontStyle: textNumberStyle.italic ? 'italic' : 'normal',
                  fill: textNumberStyle.color,
                }}
              } style={{width: '100%', height: '100%',marginTop: '20%' }} /> */}
            {/* <CountUp start={0} preserveValue={true} end={Number(item)} duration={1}></CountUp> */}
            <div className="turn_box_container" style={{ width: "80px", height: "100px" }}>
              <div className="turn_box" style={{ top: -1 * item * 100 + "px" }}>
                {[...new Array(10)].map((item, index) => {
                  return <div className="turn_box_number">{index}</div>;
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export { ComponentDefaultConfig };

export default ChMap;
