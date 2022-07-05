import React, { useMemo } from 'react';
import ComponentDefaultConfig from './config'
// import './index.css'
import EC from '../../EC'
import 'echarts-liquidfill' //在这里引入


const Hydrograph = (props) => {
  const componentConfig = props.componentConfig || ComponentDefaultConfig
  const { data } = componentConfig.staticData
  const { config } = componentConfig
  const fieldKey = props.fields || ['value', 'color']
  const originData = props.comData || data

  const finalData = Array.isArray(originData) ? originData.map(item => {
    return {
      value: item[fieldKey[0]],
      // color: item[fieldKey[1]]
    }
  }) : []
  const { value, } = (finalData.length && finalData[0]) || {}
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
  const { waveColor, waveAmplitude, waveDirection, fontSize, italic, letterSpacing, bold, lineHeight, textColor } = getConfig(config)
  const getOption = () => (
    {
      series: [{
        type: 'liquidFill',
        data: [
          {
            value: percent,
            direction: 'left', //水波移动的方向
            itemStyle: {
              normal: { //正常样式
                color: waveColor,
                opacity: 0.6,
              }
            }
          },
          {
            value: +percent - 0.05,
            direction: waveDirection, //水波移动的方向
            itemStyle: {
              normal: { //正常样式
                color: waveColor,
                opacity: 1,
                // period: 100,
              }
            }
          }
        ],
        radius: '100%',
        waveAnimation: 'true',
        color: [waveColor], //对应波的颜色
        waveLength: '100%',
        outline: {
          show: true,
          borderDistance: 20, // 边框线与图表的距离 数字
          itemStyle: {
            opacity: 0.1, // 边框的透明度   默认为 1
            borderWidth: 5, // 边框的宽度
            shadowBlur: 10, // 边框的阴影范围 一旦设置了内外都有阴影
            shadowColor: waveColor, // 边框的阴影颜色,
            borderColor: waveColor // 边框颜色
          }
        },
        // shape: 'diamond',
        phase: 2, // 波的相位弧度
        amplitude: waveAmplitude, // 波的振幅
        // direction: 'right', // 波动移动方向
        backgroundStyle: {
          color: '#3EABFF', // 水球未到的背景颜色
          opacity: 0, // 水球未到背景部分的透明度
          // borderWidth: 20,
          // borderColor: 'red',
          // shadowBlur: 60,
        },
        // 图形的高亮样式
        emphasis: {
          itemStyle: {
            cursor: 'default',
            opacity: 0.1 // 鼠标经过波浪颜色的透明度
          }
        },
        // 图形样式
        itemStyle: {
          // color: 'red', // 波浪之背景色，若有值则覆盖上一级中的color
          opacity: 0.7, // 波浪的透明度
          cursor: 'default',
          shadowBlur: 10 // 波浪的阴影范围
        },
        label: {
          position: ['50%', '50%'],
          formatter: function () {
            return `${percent * 100}%`
          },
          fontSize: fontSize,
          color: textColor,
          fontStyle: italic ? 'italic' : 'normal',
          fontWeight: bold ? 'bold' : 'normal',
        }
      }]
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
  Hydrograph,
  ComponentDefaultConfig
}

export default Hydrograph