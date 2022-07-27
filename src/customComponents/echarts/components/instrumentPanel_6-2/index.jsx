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
  const { axisLine:{axisLineColor},progress:{progressColor1,progressColor2} } = allSettings ? allSettings['圆环'] : {}



  const getOption = () => ({
    title:{
      show: true,
      text: titleText,
      left: '50%',
      top: '82%',
      textAlign: 'center',
      textStyle: {
        color: textStyleTitle.color,
        fontSize: textStyleTitle.fontSize,
        fontFamily: textStyleTitle.fontFamily,
        fontWeight: textStyleTitle.bold ? 'bold' : 'normal',
        fontStyle: textStyleTitle.italic ? 'italic' : 'normal',
      },
      padding:[offset.vertical,offset.horizontal],
    },
    series: [
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
          valueAnimation:true,
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
              [1, axisLineColor]
            ],
            width: outerRadius*100,
            opacity: 1
          }
        },
        axisTick: {
          show: false,
        },
        progress:{
          show:true,
          width: outerRadius*100,
          itemStyle:{
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0,
                color: progressColor1 // 0% 处的颜色
              },
              {
                offset: 1,
                color: progressColor2 // 100% 处的颜色
              }
            ])
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