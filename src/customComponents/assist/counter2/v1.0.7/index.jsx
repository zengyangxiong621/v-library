import React, { Component, CSSProperties, Fragment } from "react";
import ComponentDefaultConfig from "./config";
import "./index.less";
import CountUp from "react-countup";

class Counter extends Component {
  constructor(Props) {
    super(Props);
  }
  // 处理所有配置项
  formatConfig = (config, exclude) => {
    if (config.length && !config[0]) {
      return {};
    }
    return config
      .filter((item) => exclude.indexOf(item.name) == -1)
      .reduce((pre, cur) => {
        if (Array.isArray(cur.value)) {
          const obj = this.formatConfig(cur.value, []);
          pre = {
            ...pre,
            ...obj,
          };
        } else {
          pre[cur.name] = cur.value;
        }
        return pre;
      }, {});
  };

  getStyleData = (config, name, data = null) => {
    config.forEach((item) => {
      if (item.name === name) {
        data = item;
      } else if (Array.isArray(item.options)) {
        let res = this.getStyleData(item.options, name);
        data = res ? res : data;
      } else if (Array.isArray(item.value)) {
        let res1 = this.getStyleData(item.value, name);
        data = res1 ? res1 : data;
      }
    });
    if (data) {
      return data;
    }
  };

  getPosition = (align, sortedBy) => {
    switch (align) {
      case "left":
        return sortedBy === "right" ? "flex-end" : "flex-start";
      case "center":
        return "center";
      case "right":
        return sortedBy === "right" ? "flex-start" : "flex-end";
      case "bothEnds":
        return ["left", "right"].indexOf(sortedBy) > -1 ? "space-between" : "center";
    }
  };

  getAllStyle = (config) => {
    const sortedBy = this.getStyleData(config, "sortedBy").value;
    const align = this.getStyleData(config, "align").value[0].value;
    let displayStyle = {};
    switch (sortedBy) {
      case "up":
      case "down":
        displayStyle.flexDirection = sortedBy === "up" ? "column" : "column-reverse";
        displayStyle.justifyContent = "center";
        displayStyle.alignItems = this.getPosition(align, sortedBy);
        break;
      case "left":
      case "right":
        displayStyle.flexDirection = sortedBy === "left" ? "row" : "row-reverse";
        displayStyle.justifyContent = this.getPosition(align, sortedBy);
        displayStyle.alignItems = "center";
        break;
    }
    return displayStyle;
  };

  componentDidMount() {}

  // 根据对应的自动来转换
  formatData = (data, fields2ValueMap) => {
    const arr = Array.isArray(data)
      ? data.map((item) => {
          let res = {};
          for (let k in item) {
            res[k] = item[fields2ValueMap[k]];
          }
          return res;
        })
      : [];
    return arr;
  };

  momenyFormat = (num) => {
    // 数字转字符串
    let result = `${num}`;
    // 校验输入值是否为数字
    const regNumber = /^\d+$|(\d+\.\d+)/g;
    // 校验小数点及右侧部分
    const regRight = /(?<=\d)(\.\d+)/g;
    // 校验小数点左侧的部分
    const regLeft = /(\d)(?=(\d{3})+$)/g;
    // 判断是否是数字
    if (regNumber.test(result)) {
      // 判断是否包含小数点
      if (/\./g.test(result)) {
        // 提取小数点和右侧部分
        const right = regRight.exec(result)[0];
        // 替换小数点和右侧部分为空白，得到小数点左侧部分
        // 对左侧部分进行千分位处理
        const left = result.replace(regRight, "").replace(regLeft, "$1,");
        // 左右两部分拼接
        result = `${left}${right}`;
      } else {
        // 不包含小数点，直接千分位处理
        result = result.replace(regLeft, "$1,");
      }
    } else {
      console.warn(`invalid number ${num}`);
    }
    return result;
  };

  formatCount = (num, splitCount, decimalCount) => {
    const reg = /^[-,+]?[0-9]+\.?[0-9]*$/;
    if (reg.test(num)) {
      if (splitCount) {
        let value = decimalCount > 0 ? Number(num).toFixed(decimalCount) : num.split(".")[0]; // 小数位长度处理
        value = this.momenyFormat(value);
        return value;
      } else {
        return num;
      }
    } else {
      return NaN;
    }
  };

  replaceThemeColor = (arr) => {
    console.log(arr, "arr");
    const componentThemeConfig = this.props.themeConfig;
    arr.map((item) => {
      let { name, value, type, options } = item;
      if (item.hasOwnProperty("value")) {
        if (Array.isArray(value)) {
          this.replaceThemeColor(value);
        } else {
          if (type === "color") {
            switch (name) {
              case "color":
                item.value = componentThemeConfig.textColor;
                break;
              case "themePureColor":
                item.value = componentThemeConfig.pureColors[0];
              default:
                break;
            }
          }
        }
      } else if (Array.isArray(options) && options.length) {
        this.replaceThemeColor(options);
      }
    });
  };

  render() {
    const { comData, fields, themeConfig } = this.props;
    const componentConfig = this.props.componentConfig || ComponentDefaultConfig;
    const { config, staticData } = componentConfig;
    // 组件静态或者传入组件的数据
    let originData = comData || staticData.data;
    const fields2ValueMap = {};
    const initColumnsName = fields;
    fields.forEach((item, index) => {
      fields2ValueMap[initColumnsName[index]] = item;
    });
    originData = this.formatData(originData, fields2ValueMap);
    originData = originData.length ? originData[0] : [];
    const configOfTheme = JSON.parse(JSON.stringify(config));
    if (themeConfig) {
      this.replaceThemeColor(configOfTheme);
      this.props.onThemeChange({
        id: componentConfig.id,
        name: componentConfig.name,
        moduleName: componentConfig.moduleName,
        moduleVersion: componentConfig.moduleVersion,
        config: configOfTheme,
      });
    }
    let copyConfig = themeConfig ? configOfTheme : config;
    // 设置文本的大小问题
    const dimension = this.formatConfig([this.getStyleData(copyConfig, "dimension")], []);
    // 获取标题样式
    const titleStyle = this.formatConfig([this.getStyleData(copyConfig, "title")], []);
    const displayStyle = this.getAllStyle(copyConfig);
    // 获取数值样式
    const dataRangConfig = this.formatConfig([this.getStyleData(copyConfig, "dataRangConfig")], []);
    // 小数位数
    const decimalCount = this.getStyleData(copyConfig, "decimalCount").value;
    // 分割数
    const splitCount = this.getStyleData(copyConfig, "splitCount").value;
    // 动画时间
    const duration = this.getStyleData(copyConfig, "duration")?.value || 2;
    // 后缀功能
    const suffixConfig = this.formatConfig([this.getStyleData(copyConfig, "后缀")], []);
    // 补充前缀功能
    const prefixConfig = this.formatConfig([this.getStyleData(copyConfig, "前缀")], []);
    // 动画功能
    const animate = this.getStyleData(copyConfig, "animate")?.value || "open";
    // 自定义符号
    const symbolsConfig = this.formatConfig([this.getStyleData(copyConfig, "symbolsConfig")], []);
    let finalValue = Number(originData[fields[1]]) || 0;
    finalValue = symbolsConfig?.show ? Math.abs(finalValue) : finalValue;
    const increase = this.formatConfig([this.getStyleData(copyConfig, "增长")], []);
    const even = this.formatConfig([this.getStyleData(copyConfig, "持平")], []);
    const reduce = this.formatConfig([this.getStyleData(copyConfig, "减少")], []);
    const currentType =
      Number(originData[fields[1]]) > 0
        ? increase
        : Number(originData[fields[1]]) === 0
        ? even
        : reduce;

    console.log(comData, fields, "comData");

    return (
      <div
        className="counter"
        style={{
          ...displayStyle,
          width: dimension.width,
          height: dimension.height,
        }}
      >
        {/* 翻牌器标题 */}
        {titleStyle.show && (
          <div
            style={{
              ...titleStyle,
              fontWeight: titleStyle.bold ? "bold" : "",
              fontStyle: titleStyle.italic ? "italic" : "",
              lineHeight: `${titleStyle.lineHeight}px`,
              transform: `translate(${titleStyle.x}px, ${titleStyle.y}px)`,
            }}
          >
            {originData[fields[0]] || titleStyle?.content}
          </div>
        )}
        {/* 数值 */}
        <div className="counter-number">
          {prefixConfig.support && (
            <span
              style={{
                ...prefixConfig,
                fontWeight: prefixConfig.bold ? "bold" : "",
                fontStyle: prefixConfig.italic ? "italic" : "",
                transform: `translate(${prefixConfig.x}px, ${prefixConfig.y}px)`,
                lineHeight: `${suffixConfig.lineHeight}px`,
              }}
            >
              {prefixConfig.content}
            </span>
          )}
          <div
            className="number-list"
            style={{
              ...dataRangConfig,
              fontWeight: dataRangConfig.bold ? "bold" : "",
              fontStyle: dataRangConfig.italic ? "italic" : "",
              lineHeight: "normal",
              flexDirection: symbolsConfig?.position === "before" ? "row" : "row-reverse",
              textShadow: dataRangConfig.show
                ? `${dataRangConfig.shadow.color} ${dataRangConfig.shadow.vShadow}px ${dataRangConfig.shadow.hShadow}px ${dataRangConfig.shadow.blur}px`
                : "",
            }}
          >
            {symbolsConfig?.show && currentType?.image ? (
              <img
                style={{
                  width: currentType?.width,
                  height: currentType?.height,
                  marginLeft: `${currentType?.x}px`,
                  marginTop: `${currentType?.y}px`,
                }}
                src={currentType?.image}
              ></img>
            ) : (
              <></>
            )}
            {animate === "open" ? (
              <CountUp
                start={0}
                separator={splitCount ? "," : ""}
                end={finalValue}
                decimals={decimalCount}
                delay={0}
                decimal="."
                duration={duration}
              ></CountUp>
            ) : (
              <span>{this.formatCount(originData[fields[1]], splitCount, decimalCount)}</span>
            )}
          </div>
          {suffixConfig.support && (
            <span
              style={{
                ...suffixConfig,
                fontWeight: suffixConfig.bold ? "bold" : "",
                fontStyle: suffixConfig.italic ? "italic" : "",
                color: suffixConfig?.themePureColor || "#0F92FF",
                transform: `translate(${suffixConfig.x}px, ${suffixConfig.y}px)`,
                lineHeight: `${suffixConfig.lineHeight}px`,
              }}
            >
              {comData&&comData[0]?.[fields[2]] || suffixConfig.content}
            </span>
          )}
        </div>
      </div>
    );
  }
}

export { Counter };
export default Counter;
