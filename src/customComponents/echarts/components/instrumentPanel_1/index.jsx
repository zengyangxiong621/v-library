import React from 'react';
import EC from '../../EC'

import * as echarts from 'echarts';
import ComponentDefaultConfig from './config'


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
  console.log('allSettings',allSettings)
  const { innerRadius,outerRadius } = allSettings ? allSettings['表盘'] : {}
  const { numberRange:{min,max},numberStyles:{textStylerNumbe,offset:numberOffset}} = allSettings ? allSettings['指标'] : {}
  const { titleStyles:{showTitleStyles,offset,textStyleTitle} } = allSettings ? allSettings['标题'] : {}
  const { ringColor } = allSettings ? allSettings['圆环'] : {}



  const getOption = () => ({
    title:{
      show: true,
      text: titleText,
      left: '50%',
      top: '85%',
      textAlign: 'center',
      textStyle: {
        color: textStyleTitle.color,
        fontSize: textStyleTitle.fontSize,
        fontFamily: textStyleTitle.fontFamily,
        fontWeight: textStyleTitle.bold ? 'bold' : 'normal',
        fontStyle: textStyleTitle.italic ? 'italic' : 'normal',
        overflow: 'breakAll'
      },
      padding:[offset.vertical,offset.horizontal],
    },
  
    series: [
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
        data: [100]
      },
      //内圆2
      {
        type: 'pie',
        radius: innerRadius*100+5+'%',
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
              [0.1, '#00FFFF'],
              //...
              [0.11, 'rgba(1,1,1,0)'],
              [0.12, '#00FFFF'],
              [0.13, 'rgba(1,1,1,0)'],
              [0.14, '#00FFFF'],
              [0.15, 'rgba(1,1,1,0)'],
              [0.16, '#00FFFF'],
              [0.17, 'rgba(1,1,1,0)'],
              [0.18, '#00FFFF'],
              //...
              [0.28, '#00FFFF'],
              //...
              [0.29, 'rgba(1,1,1,0)'],
              [0.30, '#00FFFF'],
              [0.31, 'rgba(1,1,1,0)'],
              [0.32, '#00FFFF'],
              [0.33, 'rgba(1,1,1,0)'],
              [0.34, '#00FFFF'],
              [0.35, 'rgba(1,1,1,0)'],
              [0.36, '#00FFFF'],
              //...
              [0.46, '#00FFFF'],
              //...
              [0.47, 'rgba(1,1,1,0)'],
              [0.48, '#00FFFF'],
              [0.49, 'rgba(1,1,1,0)'],
              [0.5, '#00FFFF'],
              [0.51, 'rgba(1,1,1,0)'],
              [0.52, '#00FFFF'],
              [0.53, 'rgba(1,1,1,0)'],
              [0.54, '#00FFFF'],
              //...
              [0.64, '#00FFFF'],
              //...
              [0.65, 'rgba(1,1,1,0)'],
              [0.66, '#00FFFF'],
              [0.67, 'rgba(1,1,1,0)'],
              [0.68, '#00FFFF'],
              [0.69, 'rgba(1,1,1,0)'],
              [0.7, '#00FFFF'],
              [0.71, 'rgba(1,1,1,0)'],
              [0.72, '#00FFFF'],
              //...
              [0.82, '#00FFFF'],
              //...
              [0.83, 'rgba(1,1,1,0)'],
              [0.84, '#00FFFF'],
              [0.85, 'rgba(1,1,1,0)'],
              [0.86, '#00FFFF'],
              [0.87, 'rgba(1,1,1,0)'],
              [0.88, '#00FFFF'],
              [0.89, 'rgba(1,1,1,0)'],
              [0.9, '#00FFFF'],
              //...
              [1, '#00FFFF'],
              
            ],
            width: 2,
            opacity: 0.6
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
        min,
        max,
        detail: {
          formatter: function (value) {
            return '{num|'+value+'}';
          },
          rich: {
            num: {
              color: textStylerNumbe.color,
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
              [1, '#171871']
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
            color: ringColor
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
    <EC
      option={getOption()}
      onChartReady={onChartReady}
      onEvents={onEvents}
    />
  )

}

export {
  InstrumentPanel,
  ComponentDefaultConfig
}

export default InstrumentPanel