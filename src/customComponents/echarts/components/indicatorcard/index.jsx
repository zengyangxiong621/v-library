import React, { useRef, useEffect, useState } from 'react';
import ComponentDefaultConfig from './config'
import EC from '../../EC'

const Indicatorcard = (props) => {
  const componentConfig = props.componentConfig || ComponentDefaultConfig
  const { config } = componentConfig
  const { data } = componentConfig.staticData

  const fieldKey = props.fields || ['value', 'color']
  // 组件静态或者传入组件的数据
  const originData = props.comData || data
  // 根据对应的字段来转换data数据
  const finalData = Array.isArray(originData) ? originData.map(item => {
    return {
      value: item[fieldKey[0]],
      // color: item[fieldKey[1]]
    }
  }) : []

  const { value } = (finalData.length && finalData[0]) || {}
  const percent = value || 0
  // 获取 右侧需要 配置的项
  const getConfig = (Arr) => {
    const targetConfig = {};
    Arr.filter(item => item.name !== 'dimension').forEach(({ name, value }) => {
      if (Array.isArray(value)) {
        value.forEach(({ name, value }) => {
          targetConfig[name] = value
        })
      } else {
        targetConfig[name] = value
      }
    });
    return targetConfig
  }
  const { circleColor, fontSize, italic, letterSpacing, bold, lineHeight, textColor, circleWidth, dangerLevel } = getConfig(config)

  const gaugeData = [
    {
      value: percent,
      name: dangerLevel,
      title: {          
        offsetCenter: ['0%', '30%'],
        color: circleColor,        
      },
      detail: {
        valueAnimation: true,
        offsetCenter: ['0%', '-20%'],
      }
    },
  ];

  const getOption = () => (
    {
      series: [
        {
          type: 'gauge',
          startAngle: 90,
          endAngle: -270,
          pointer: {
            show: false
          },
          progress: {
            show: true,
            overlap: false,
            roundCap: true,
            clip: false,
            itemStyle: {
              borderWidth: 1,
              borderColor: circleColor,
            }
          },
          axisLine: {
            lineStyle: {
              width: circleWidth // 环形宽度 
            }
          },
          splitLine: {
            show: false,
            distance: 0,
            length: 10
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false,
            distance: 50
          },
          data: gaugeData,
          title: {
            fontSize: fontSize,
            fontStyle: italic ? 'italic' : 'normal',
            fontWeight: bold ? 'bold' : 'normal',
            letterSpacing: letterSpacing,
            color: '#fff'
          },
          detail: { // 环内百分比样式
            width: 50,
            height: 18,
            color: textColor,
            borderColor: 'auto',
            borderRadius: 20,
            borderWidth: 0,
            formatter: '{value}%'
          }
        }
      ]
    }
  )

  const onChartReady = echarts => {
    // console.log('echart is ready', echarts);
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
  Indicatorcard,
  ComponentDefaultConfig
}

export default Indicatorcard