import React, { Component } from 'react';
import ComponentDefaultConfig from './config'
import './index.css'
import protectionLevel1 from './protectionLevel1.png'
import protectionLevel2 from './protectionLevel2.png'
import CountUp from 'react-countup'


class ProtectionLevel extends Component {
    constructor(Props) {
        super(Props)
    }
    render() {
      const componentConfig = this.props.componentConfig || ComponentDefaultConfig
      const { config } = componentConfig
      const { data } = componentConfig.staticData
      // 最新字段
      const finalFieldsArr = this.props.fields || ['text', 'value','title','level']

      // 组件静态或者传入组件的数据
      const originData = this.props.comData || data
      // originData中有多项数据，只取第一项
      const firstData = originData[0]
      const textValue = firstData[finalFieldsArr[0]]
      const numberValue = firstData[finalFieldsArr[1]]
      const titleValue = firstData[finalFieldsArr[2]]
      const levelValue = firstData[finalFieldsArr[3]]


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
      const hadFilterArr = config.filter((item) => item.name !== 'dimension')
      const { allSettings } = getTargetConfig(hadFilterArr)
      const { innerSpeed,outerSpeed } = allSettings ? allSettings['表盘'] : {}
      const {
        numberStyles:{textStylerNumber,offsetNumber},
        unitStyles:{textStylerUnit,offsetUnit},
      } = allSettings ? allSettings['指标'] : {}
      const { textStyleTitle,levelStyleTitle,offsetTitle } = allSettings ? allSettings['标题'] : {}


      return (
        <div className='protection-level'>
          <div className="bg">
            <img className='circle1' src={protectionLevel1} alt="bg1" style={{animation: `circle1 ${1/outerSpeed}s linear infinite`}}/>
            <img className='circle2' src={protectionLevel2} alt="bg2" style={{animation: `circle2 ${1/innerSpeed}s linear infinite`}}/>
            <div className='bottom'></div>
          </div>
          <div className='score'>
              <div className='number' style={{
                color: textStylerNumber.color,
                fontSize: textStylerNumber.fontSize,
                fontFamily: textStylerNumber.fontFamily,
                fontWeight: textStylerNumber.bold ? 'bold' : 'normal',
                fontStyle: textStylerNumber.italic ? 'italic' : 'normal',
                letterSpacing: textStylerNumber.letterSpacing+"px",
                lineHeight: textStylerNumber.lineHeight+"px",
                top: offsetNumber.vertical +'px',
                left: offsetNumber.horizontal + 'px',
              }}>
                {/* {numberValue} */}
                <CountUp start={0} end={numberValue} duration={1}></CountUp>
              </div>
              <div className='title'  style={{
                color: textStylerUnit.color,
                fontSize: textStylerUnit.fontSize,
                fontFamily: textStylerUnit.fontFamily,
                fontWeight: textStylerUnit.bold ? 'bold' : 'normal',
                fontStyle: textStylerUnit.italic ? 'italic' : 'normal',
                letterSpacing: textStylerUnit.letterSpacing+"px",
                lineHeight: textStylerUnit.lineHeight+"px",
                top: offsetUnit.vertical +'px',
                left: offsetUnit.horizontal + 'px',
              }}>{textValue}</div>
          </div>
          <div className='result'>
            <div className='result1' style={{
              top: offsetTitle.vertical +'px',
              left: offsetTitle.horizontal + 'px',
            }}>
              <div className='label' style={{
                  color: textStyleTitle.color,
                  fontSize: textStyleTitle.fontSize,
                  fontFamily: textStyleTitle.fontFamily,
                  fontWeight: textStyleTitle.bold ? 'bold' : 'normal',
                  fontStyle: textStyleTitle.italic ? 'italic' : 'normal',
                  letterSpacing: textStyleTitle.letterSpacing+"px",
                  lineHeight: textStyleTitle.lineHeight+"px",
                }}>{titleValue}：</div>
                <div className='value' style={{
                  color: levelStyleTitle.color,
                  fontSize: levelStyleTitle.fontSize,
                  fontFamily: levelStyleTitle.fontFamily,
                  fontWeight: levelStyleTitle.fontWeight,
                  fontStyle: textStyleTitle.italic ? 'italic' : 'normal',
                  letterSpacing: textStyleTitle.letterSpacing+"px",
                  lineHeight: textStyleTitle.lineHeight+"px",
                }}>{levelValue}</div>
            </div>
          </div>
        </div>
      )
    }
}

export {ComponentDefaultConfig,ProtectionLevel}

export default ProtectionLevel;