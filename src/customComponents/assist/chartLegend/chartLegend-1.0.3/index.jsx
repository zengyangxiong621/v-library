import React, { Component, CSSProperties } from 'react';
import ComponentDefaultConfig from './config'

const ChartLegend = (props) => {
  const componentConfig = props.componentConfig || ComponentDefaultConfig
  const { data } = componentConfig.staticData
  const { config } = componentConfig
  const fieldKeys = props.fields || ['text', 'value']
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
  const { themeTextColor: textColor, bold, italic, fontFamily, fontSize, themePureColor: legendColor, legendShape, legendSize, letterSpacing, lineHeight, legendGap, textGap1, textGap2 } = getTargetConfig(config)


  /***********************主题切换************************/
  const componentThemeConfig = props.themeConfig
  // 如果 选择的了 主题风格, 着手替换config中的颜色
  const replaceThemeColor = (arr, colorIndex = 0) => {
    arr.forEach((item) => {
      let index = colorIndex || 0
      let { name, value, options, type } = item
      if (item.hasOwnProperty('value')) {
        if (Array.isArray(value)) {
          replaceThemeColor(value, index)
        } else {
          if (type === 'color') {
            switch (name) {
              case 'themePureColor':
                item.value = componentThemeConfig.pureColors[index % 7]
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

  // 图例样式
  const legendStyle = {
    display: 'inline-block',
    width: `${legendSize}px`,
    height: `${legendSize}px`,
    background: componentThemeConfig ? componentThemeConfig.pureColors[0] : legendColor || '#87ceeb',
    borderRadius: legendShape === 'circle' ? '50%' : '0',
    margin: `0 ${legendGap}px`
  }
  // text、value 文字公用样式
  const commonTextStyle = {
    fontFamily,
    fontSize,
    color: componentThemeConfig ? componentThemeConfig.textColor : textColor || '#fff',
    fontWeight: bold ? 'bold' : 'normal',
    fontStyle: italic ? 'italic' : 'normal',
  }
  const textGapStyle = {
    margin: `0 ${textGap1}px`,
    letterSpacing: `${letterSpacing}px`
  }
  const valueGapStyle = {
    margin: `0 ${textGap2}px`,
    letterSpacing: `${letterSpacing}px`
  }
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div style={{ height: lineHeight ? `${lineHeight}px` : '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginLeft: '14px' }}>
        {/* 此处必须套一层div,不然设置字距的时候会影响图例的大小 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={legendStyle}></span></div>
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
