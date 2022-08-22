import React, { Component } from 'react';
import DigitalFlop from '@jiaminghi/data-view-react/es/digitalFlop'
import './index.css'
import ComponentDefaultConfig from './config'
import CountUp from 'react-countup'

class ProtectionRange extends Component {
  constructor() {
    super(),
    this.state = {
      numValue: 0
    }
  }
  componentDidMount(){
    const componentConfig = this.props.componentConfig || ComponentDefaultConfig
    const { data } = componentConfig.staticData
    // 最新字段
    const finalFieldsArr = this.props.fields || ['value']
    // 组件静态或者传入组件的数据
    const originData = this.props.comData || data
    // originData中有多项数据，只取第一项
    const firstData = originData[0]
    setTimeout(() => {
      this.setState({
        numValue: firstData[finalFieldsArr[0]]
      })
    }, 50)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { comData,fields } = nextProps
    let originData = comData?.length ? comData[0] : [] ;
    if(originData[fields[0]] !== prevState.numValue && prevState.numValue != 0){
        return {
          numValue: originData[fields[0]]
        }
      }
      return null
  }

  renderNumber(number,counter,showBreak) {
    let value = number + ''
    let valueArr = value.split('')
    let flag = counter - valueArr.length
    if(flag>0){
      for (let index = 0; index < flag; index++) {
        valueArr.unshift('0')
      }
    }else if(flag<0){
      valueArr = valueArr.splice(-flag)
    }

    if(showBreak){
      return valueArr.join('').replace(/(?=\B(\d{3})+$)/g,',').split('')
    }

    return valueArr
  }

  render() {
    const componentConfig = this.props.componentConfig || ComponentDefaultConfig
    const { config } = componentConfig
    const { data } = componentConfig.staticData
    const {numValue} = this.state
    // 最新字段
    const finalFieldsArr = this.props.fields || ['value']
    // 组件静态或者传入组件的数据
    const originData = this.props.comData || data
    // originData中有多项数据，只取第一项
    const firstData = originData[0]
    // const numberValue = firstData[finalFieldsArr[0]]
    // 获取config中的配置
    const getTargetConfig = (Arr) => {
      let targetConfig = {}
      Arr.forEach((item) => {
        let { name, value, options, flag, displayName } = item
        if (item.hasOwnProperty('value')) {
          // 对 系列一栏 做特殊处理
          if (flag === 'specialItem') {
            name = displayName
          }
          if (Array.isArray(value)) {
            targetConfig[name] = getTargetConfig(value)
          } else {
            targetConfig[name] = value
          }
        } else if (Array.isArray(options) && options.length) {
          targetConfig[name] = getTargetConfig(options)
        }
      })
      return targetConfig
    }


    const {numberStyles,hideDefault,dimension,container,break:breakObj } = getTargetConfig(config)
    const {containerSize,containerMarginLeft,containerCounter} = container
    const {textNumberStyle} = numberStyles
    const {showBreak,breakPadding,breakDigits} = breakObj

    // 计算动态的背景宽高
    let width ;
    let height ;
    let box_width = dimension.width;
    let box_height = dimension.height;
    const scale = 4; // 比例
    if (scale <= box_width / box_height) {
      width = `${box_height * scale}px`;
      height = `${box_height}px`;
    } else {
      width = `${box_width}px`;
      height = `${box_width / scale}px`;
    }


    const arr = this.renderNumber(numValue,containerCounter,showBreak,breakDigits)
    return (
      <div className='protection-range-container'>
        <div className="protection-range" style={{
          width,
          height,
          background: `linear-gradient(to right, #6648ff, #17c8b7)`}}
        >
          {
            arr.map((item,index) => (
              item !== ',' ?
              <div className='image' key={index} style={{
                width:containerSize+'px',
                height:125/77*containerSize+'px',
                marginLeft: index !== 0 ? containerMarginLeft+'px' : 0,
                color: textNumberStyle.color,
                fontSize: textNumberStyle.fontSize,
                fontFamily: textNumberStyle.fontFamily,
                fontWeight: textNumberStyle.bold ? 'bold' : 'normal',
                fontStyle: textNumberStyle.italic ? 'italic' : 'normal',
                letterSpacing: textNumberStyle.letterSpacing+"px",
                lineHeight: textNumberStyle.lineHeight+"px",
              }}>
                {/* {item} */}
                {/* <DigitalFlop config={this.state.Tdata[index].config} style={{width: '100%', height: '100%',marginTop: '20%' }} /> */}
                {/* <DigitalFlop config={
                  {number: [Number(item)],content: '{nt}',style: {
                    fontSize: textNumberStyle.fontSize,
                    fontWeight: textNumberStyle.bold ? 'bold' : 'normal',
                    fontStyle: textNumberStyle.italic ? 'italic' : 'normal',
                    fill: textNumberStyle.color,
                  }}
                } style={{width: '100%', height: '100%',marginTop: '20%' }} /> */}
                {/* <CountUp start={0} end={Number(item)} duration={1}></CountUp> */}
                <div className="turn_box_container" style={{width: '80px', height: '100px'}}>
                  <div className="turn_box" style={ {top:  ( -1 * item * 100) +'px'} }> 
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
              </div> :
              <div className='image' key={index} style={{
                background: 'none',
                width:0,
                marginLeft: breakPadding.left,
                marginRight: breakPadding.right,
                color: textNumberStyle.color,
                fontSize: textNumberStyle.fontSize,
                fontFamily: textNumberStyle.fontFamily,
                fontWeight: textNumberStyle.bold ? 'bold' : 'normal',
                fontStyle: textNumberStyle.italic ? 'italic' : 'normal',
                letterSpacing: textNumberStyle.letterSpacing+"px",
                lineHeight: textNumberStyle.lineHeight+"px",
              }}>
                {item}
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export { ComponentDefaultConfig }

export default ProtectionRange;

          {/* {
            arr.map((item,index) => (
              item !== ',' ?
              <div className='image'>
                <DigitalFlop config={this.state.Tdata[index].config} style={{width: '100%', height: '100%',marginTop: '20%' }} />
              </div> :
              <div className='image'>
                ,
              </div>
            ))
          } */}