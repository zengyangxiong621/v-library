import React, { Component } from "react";
import "./index.css";
import DigitalFlop from "@jiaminghi/data-view-react/es/digitalFlop";
import ComponentDefaultConfig from "./config";
import CountUp from "react-countup";



class ChMap extends Component {
  constructor() {
    super(),
      this.state = {
        numValue: 0
      };
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
        numValue: firstData[finalFieldsArr[0]]
      });
    }, 50);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { comData, fields } = nextProps;
    let originData = comData?.length ? comData[0] : [];
    if (originData[fields[0]] !== prevState.numValue && prevState.numValue != 0) {
      return {
        numValue: originData[fields[0]]
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
      <div className='CardFlipper_22'>
        {
          numberArr1.map((item, index) => (
            <div className='bg' key={index} style={{
              width: containerSize + "px",
              height: containerSize + "px",
              color: textNumberStyle.color,
              fontSize: textNumberStyle.fontSize,
              fontFamily: textNumberStyle.fontFamily,
              fontWeight: textNumberStyle.bold ? "bold" : "normal",
              fontStyle: textNumberStyle.italic ? "italic" : "normal",
              letterSpacing: textNumberStyle.letterSpacing + "px",
              lineHeight: textNumberStyle.lineHeight + "px",
            }}>
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
                <div className="turn_box" style={{ top: (-1 * item * 100) + "px" }}>
                  <div className="turn_box_number">0</div>
                  <div className="turn_box_number">1</div>
                  <div className="turn_box_number">2</div>
                  <div className="turn_box_number">3</div>
                  <div className="turn_box_number">4</div>
                  <div className="turn_box_number">5</div>
                  <div className="turn_box_number">6</div>
                  <div className="turn_box_number">7</div>
                  <div className="turn_box_number">8</div>
                  <div className="turn_box_number">9</div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    );
  }
}

export { ComponentDefaultConfig };

export default ChMap;