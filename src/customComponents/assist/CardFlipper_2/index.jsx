import React, { Component } from 'react';
import './index.css'
import DigitalFlop from '@jiaminghi/data-view-react/es/digitalFlop'
import ComponentDefaultConfig from './config'
import CountUp from 'react-countup'



class ChMap extends Component {
  constructor() {
    super()
  }

  renderNumber(number,counter) {
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
    return valueArr
  }

  render() {
    const componentConfig = this.props.componentConfig || ComponentDefaultConfig
    const { config } = componentConfig
    const { data } = componentConfig.staticData
    // 最新字段
    const finalFieldsArr = this.props.fields || ['value']
    // 组件静态或者传入组件的数据
    const originData = this.props.comData || data
    // originData中有多项数据，只取第一项
    const firstData = originData[0]
    const numberValue = firstData[finalFieldsArr[0]]
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

    // console.log(getTargetConfig(config));
    const {container,numberStyles } = getTargetConfig(config)
    const {containerSize,containerCounter} = container
    const {textNumberStyle} = numberStyles

    const numberArr1 = this.renderNumber(numberValue,containerCounter)

    return (
      <div className='CardFlipper_22'>
        {
          numberArr1.map((item,index) => (
            <div className='bg' key={index} style={{
              width: containerSize + 'px',
              height: containerSize + 'px',
              color: textNumberStyle.color,
              fontSize: textNumberStyle.fontSize,
              fontFamily: textNumberStyle.fontFamily,
              fontWeight: textNumberStyle.bold ? 'bold' : 'normal',
              fontStyle: textNumberStyle.italic ? 'italic' : 'normal',
              letterSpacing: textNumberStyle.letterSpacing+"px",
              lineHeight: textNumberStyle.lineHeight+"px",
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
              <CountUp start={0} end={Number(item)} duration={1}></CountUp>
            </div>
          ))
        }
      </div>
    )
  }
}

export {ComponentDefaultConfig}

export default ChMap;