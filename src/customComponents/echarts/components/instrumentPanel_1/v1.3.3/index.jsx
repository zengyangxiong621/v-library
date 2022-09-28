import React from 'react';
import EC from '../../../EC'

import * as echarts from 'echarts';
import ComponentDefaultConfig from './config'

import './index.less'
import ipMapping6 from './ipMapping6.png'
import ipMapping7 from './ipMapping7.png'

const InstrumentPanel = (props) => {
  const componentConfig = props.componentConfig || ComponentDefaultConfig
  const { config } = componentConfig
  const { data } = componentConfig.staticData
  // 最新字段
  const finalFieldsArr = props.fields || ['text', 'value']

  // 组件静态或者传入组件的数据
  const originData = props.comData || data
  // originData中有多项数据，只取第一项
  const firstData = originData[0]
  const titleText = firstData[finalFieldsArr[0]]
  const numberValue = firstData[finalFieldsArr[1]]
  const chartData = [{
    value: numberValue
  }]

  // 主题颜色配置
  const componentThemeConfig = props.themeConfig
  const replaceThemeColor = (arr, colorIndex = 0) => {
    arr.forEach((item) => {
      let index = colorIndex || 0
      let { name, value, options, flag, type, key } = item
      if (item.hasOwnProperty('value')) {
        // 对 系列一栏 做特殊处理
        if (flag === 'specialItem') {
          try {
            index = key ? parseInt(key) - 1 : 0
          } catch (e) {
            index = 0
          }
        }
        if (Array.isArray(value)) {
          replaceThemeColor(value, index)
        } else {
          if (type === 'color') {
            switch (name) {
              case 'themePureColors':
                item.value = componentThemeConfig.pureColors[0]
                break;
              case 'themeGradientColorStart':
                item.value = componentThemeConfig.gradientColors[index % 7].find(item => item.offset === 0).color
                break;
              case 'themeGradientColorEnd':
                item.value = componentThemeConfig.gradientColors[index % 7].find(item => item.offset === 100).color
                break;
              case 'themeTextColor':
                item.value = componentThemeConfig.textColor
                break;
              case 'themeAssistColor':
                item.value = componentThemeConfig.assistColor
                break;
              case 'themeGridColor':
                item.value = componentThemeConfig.gridColor
                break;
              default:
                break;
            }
          }
          if(type === 'chartText' && name === 'labelTextStyle'){
            item.value.color = componentThemeConfig.textColor
          }
        }
      } else if (Array.isArray(options) && options.length) {
        replaceThemeColor(options, index)
      }
    })
  }
  if (componentThemeConfig) {
    const configOfTheme = JSON.parse(JSON.stringify(config))
    replaceThemeColor(configOfTheme)
    props.onThemeChange({
      id: componentConfig.id,
      name: componentConfig.name,
      moduleName: componentConfig.moduleName,
      moduleVersion: componentConfig.moduleVersion,
      config: configOfTheme
    })
  }


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
  const { innerRadius,outerRadius } = allSettings ? allSettings['表盘'] : {}
  const { numberRange,numberStyles:{textStylerNumbe,offset:numberOffset}} = allSettings ? allSettings['指标'] : {}
  const { titleStyles:{showTitleStyles,offset,textStyleTitle} } = allSettings ? allSettings['标题'] : {}
  const { axisLine,ringColor } = allSettings ? allSettings['圆环'] : {}


  const getOption = () => ({
    title:{
      show: true,
      text: titleText,
      left: '50%',
      top: '82%',
      textAlign: 'center',
      textStyle: {
        color: componentThemeConfig
        ? componentThemeConfig.textColor
        : textStyleTitle.themeTextColor,
        fontSize: textStyleTitle.fontSize,
        fontFamily: textStyleTitle.fontFamily,
        fontWeight: textStyleTitle.bold ? 'bold' : 'normal',
        fontStyle: textStyleTitle.italic ? 'italic' : 'normal',
      },
      padding:[offset.vertical,offset.horizontal],
    },
    series: [
      //内圆1
      {
        type: 'pie',
        radius: '85%',
        center: ['50%', '50%'],
        z: -10,
        itemStyle: {
          normal: {
            color: '#02004d',
            label: {
              show: false
            },
            labelLine: {
              show: false
            }
          }
        },
        hoverAnimation: false,
        data: [100],
        animation: false
      },
      //内圆1
      {
        type: 'pie',
        radius: innerRadius*100+'%',
        center: ['50%', '50%'],
        z: 2,
        itemStyle: {
          normal: {
            color: new echarts.graphic.RadialGradient(
              0.5,
              0.5,
              0.85,
              [
                {
                  offset: 0.5,
                  color: '#0c098b'
                },
                {
                  offset: 1,
                  color: '#ffffff'
                },
              ],
              false
            ),
            label: {
              show: false
            },
            labelLine: {
              show: false
            }
          }
        },
        hoverAnimation: false,
        data: [100],
        animation: false
      },
      //内圆2
      {
        type: 'pie',
        radius: innerRadius*100+7+'%',
        center: ['50%', '50%'],
        z: 1,
        itemStyle: {
          normal: {
            color: '#0e1c74',
            label: {
              show: false
            },
            labelLine: {
              show: false
            }
          }
        },
        hoverAnimation: false,
        animation: false,
        data: [100]
      },
      //外线1(渐变线)
      {
        type: 'gauge',
        radius: '84%',
        startAngle: '225',
        endAngle: '-45',
        pointer: {
          show: false
        },
        detail: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: [
              [1, new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: 'rgba(108, 229, 246, 0.2)' // 0% 处的颜色
                },
                {
                  offset: 0.5,
                  color: 'rgba(108, 229, 246, 1)' // 100% 处的颜色
                },
                {
                  offset: 1,
                  color: 'rgba(108, 229, 246, 0.2)' // 100% 处的颜色
                }
              ])],
            ],
            width: 2,
            opacity: 0.3
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        splitLine: {
          show: false,
        },
      },
      //外线2(断线)
      {
        type: 'gauge',
        radius: '76%',
        startAngle: '225',
        endAngle: '-45',
        axisLine: {
          show: true,
          lineStyle: {
            color: [
              [0.1, '#75dcf5'],
              //...
              [0.11, 'rgba(1,1,1,0)'],
              [0.12, '#75dcf5'],
              [0.13, 'rgba(1,1,1,0)'],
              [0.14, '#75dcf5'],
              [0.15, 'rgba(1,1,1,0)'],
              [0.16, '#75dcf5'],
              [0.17, 'rgba(1,1,1,0)'],
              [0.18, '#75dcf5'],
              //...
              [0.28, '#75dcf5'],
              //...
              [0.29, 'rgba(1,1,1,0)'],
              [0.30, '#75dcf5'],
              [0.31, 'rgba(1,1,1,0)'],
              [0.32, '#75dcf5'],
              [0.33, 'rgba(1,1,1,0)'],
              [0.34, '#75dcf5'],
              [0.35, 'rgba(1,1,1,0)'],
              [0.36, '#75dcf5'],
              //...
              [0.46, '#75dcf5'],
              //...
              [0.47, 'rgba(1,1,1,0)'],
              [0.48, '#75dcf5'],
              [0.49, 'rgba(1,1,1,0)'],
              [0.5, '#75dcf5'],
              [0.51, 'rgba(1,1,1,0)'],
              [0.52, '#75dcf5'],
              [0.53, 'rgba(1,1,1,0)'],
              [0.54, '#75dcf5'],
              //...
              [0.64, '#75dcf5'],
              //...
              [0.65, 'rgba(1,1,1,0)'],
              [0.66, '#75dcf5'],
              [0.67, 'rgba(1,1,1,0)'],
              [0.68, '#75dcf5'],
              [0.69, 'rgba(1,1,1,0)'],
              [0.7, '#75dcf5'],
              [0.71, 'rgba(1,1,1,0)'],
              [0.72, '#75dcf5'],
              //...
              [0.82, '#75dcf5'],
              //...
              [0.83, 'rgba(1,1,1,0)'],
              [0.84, '#75dcf5'],
              [0.85, 'rgba(1,1,1,0)'],
              [0.86, '#75dcf5'],
              [0.87, 'rgba(1,1,1,0)'],
              [0.88, '#75dcf5'],
              [0.89, 'rgba(1,1,1,0)'],
              [0.9, '#75dcf5'],
              //...
              [1, '#75dcf5'],

            ],
            width: 2,
            opacity: 0.8
          }
        },
        splitLine: {
          show: true,
          length: 20,
          lineStyle: {
            color: '#051932',
            width: 0,
            type: 'solid'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        }
      },
      //外线3(粗线)
      {
        type: 'gauge',
        radius: '70%',
        startAngle: '225',
        endAngle: '-45',
        z: 3,
        min:0,
        max:numberValue*1.5,
        detail: {
          valueAnimation: true,
          formatter: function (value) {
            const string = value +""
            const number = string.replace(/(?=\B(\d{3})+$)/g,',')
            return '{num|'+number+'}';
          },
          rich: {
            num: {
              color:  componentThemeConfig
              ? componentThemeConfig.textColor
              : textStylerNumbe.themeTextColor,
              fontSize: textStylerNumbe.fontSize,
              fontFamily: textStylerNumbe.fontFamily,
              fontWeight: textStylerNumbe.bold ? 'bold' : 'normal',
              fontStyle: textStylerNumbe.italic ? 'italic' : 'normal',
            },
          },
          offsetCenter: [numberOffset.horizontal, numberOffset.vertical],
        },
        data: chartData,
        axisLine: {
          show: true,
          lineStyle: {
            color: [
              [1, axisLine?.axisLineColor || ringColor]
              // [1, "#150c71"]
            ],
            width: outerRadius*100,
            opacity: 1
          }
        },
        axisTick: {
          show: true,
          splitNumber: 8,
          length: '1%',
          distance: 10,
          lineStyle:{
            color: '#00FFFF',
          }
        },
        progress:{
          show:true,
          width: outerRadius*100,
          itemStyle:{
            // color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            //   {
            //     offset: 0,
            //     color: progressColor1 // 0% 处的颜色
            //   },
            //   {
            //     offset: 1,
            //     color: progressColor2 // 100% 处的颜色
            //   }
            // ])
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                    offset: 0,
                    color: '#6648FF' // 0% 处的颜色
                },
                {
                    offset: 0.17,
                    color: '#6648FF' // 100% 处的颜色
                },
                {
                    offset: 0.9,
                    color: '#18FFE5' // 100% 处的颜色
                },
                {
                    offset: 1,
                    color: '#18FFE5' // 100% 处的颜色
                }
                ],
              global: false // 缺省为 false
            }
          }
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false
        },
        pointer: {
          show: false
        },
      },
    ]
  })

  const onChartReady = echarts => {
  };
  const onChartClick = (param, echarts) => {
  }
  let onEvents = {
    click: onChartClick
  }
  return (
    <div className='ip-mapping_1'>
      <img className='bg-one' src={ipMapping6} alt="背景图片" />
      <img className='bg-two' src={ipMapping7} alt="背景图片" />
      <EC
        option={getOption()}
        onChartReady={onChartReady}
        onEvents={onEvents}
      />
    </div>
  )

}

export {
  InstrumentPanel,
  ComponentDefaultConfig
}

export default InstrumentPanel
