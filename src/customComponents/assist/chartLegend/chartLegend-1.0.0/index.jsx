import React, { Component, CSSProperties } from 'react';
import ComponentDefaultConfig from './config'

const ChartLegend = (props) => {
  const componentConfig = props.componentConfig || ComponentDefaultConfig
  const { data } = componentConfig.staticData
  const { config } = componentConfig

  const fieldKeys = props.fields || ['text','value']
  const originData = props.comData || data

  const fields2ValueMap = {}
  const initColumnsArr = ['text', 'value']
  fieldKeys.forEach((x, index) => {
    fields2ValueMap[initColumnsArr[index]] = x
  })
  const finalData = Array.isArray(originData) ? originData.map(item => {
    return {
      text: item[fields2ValueMap['text']],
      value: item[fields2ValueMap['value']]
    }
  }) : []
  const { value, text } = (finalData.length && finalData[0]) || {}
  // 获取 右侧需要 配置的项
  const getTargetConfig = (Arr) => {
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
  const { color, bold, italic, fontFamily, fontSize, legendColor, legendShape, legendSize, letterSpacing, lineHeight, legendGap, textGap1, textGap2 } = getTargetConfig(config)

  // 图例样式
  const legendStyle = {
    display: 'inline-block',
    width: `${legendSize}px`,
    height: `${legendSize}px`,
    background: legendColor,
    borderRadius: legendShape === 'circle' ? '50%' : '0',
    margin: `0 ${legendGap}px`
  }
  // text、value 文字公用样式
  const commonTextStyle = {
    fontFamily,
    fontSize,
    color,
    fontWeight: bold ? 'bold' : 'normal',
    fontStyle: italic ? 'italic' : 'normal',
  }
  const textGapStyle = {
    margin: `0 ${textGap1}px`
  }
  const valueGapStyle = {
    margin: `0 ${textGap2}px`
  }
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div style={{ height: '100%', lineHeight: `${lineHeight}px`, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginLeft: '14px'}}>
        <span style={legendStyle}></span>
        <span style={{ ...commonTextStyle, ...textGapStyle }}>{text}</span>
        <span style={{ ...commonTextStyle, ...valueGapStyle }}>{value}</span>
      </div>
    </div>
  )

}

export {
  ComponentDefaultConfig
}

export default ChartLegend
