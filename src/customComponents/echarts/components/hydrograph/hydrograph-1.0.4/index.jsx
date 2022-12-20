import React, { memo, useEffect } from 'react';
import ComponentDefaultConfig from './config'
// import './index.css'
// import EC from '@/customComponents/echarts/EC'
import EC from '../../../EC'
import 'echarts-liquidfill' //在这里引入


const Hydrograph = (props) => {
  const componentConfig = props.componentConfig || ComponentDefaultConfig
  const { data } = componentConfig.staticData
  const { config } = componentConfig
  const fieldKey = props.fields || ['value']
  const originData = props.comData || data
  // 字段映射
  const finalData = Array.isArray(originData) ? originData.map(item => {
    return {
      value: item[fieldKey[0]],
      // color: item[fieldKey[1]]
    }
  }) : []
  const { value } = (finalData.length && finalData[0]) || {}

  /***********************主题切换************************/
  const componentThemeConfig = props.themeConfig
  // 如果 选择的了 主题风格, 着手替换config中的颜色
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


  // 获取 右侧需要 配置的项
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
  const hadFilterArr = config.filter(item => item.name !== 'dimension')
  const targetConfig = getTargetConfig(hadFilterArr)
  const { allSettings } = targetConfig
  const {
    textStyle: {
      bold, fontFamily, fontSize, themeTextColor: textColor, lineHeight, italic, letterSpacing
    },
    indicatorOffset: { offsetX, offsetY },
    indicatorSuffix: { suffixText, suffixTextStyle },
    keepDigits
  } = allSettings['指标'] || {}
  const { numericalType, capacity, chartSize,
    waveSeries,
    borderSettings: { assistColor: borderColor, borderWidth, borderGap }
  } = allSettings['图表'] || {}


  // 处理各种形式的数据
  const getTargetPercent = (str) => {
    let finalStr = str
    if ((str + '').endsWith('%')) {
      const tempStr = str.slice(0, -1)
      if (tempStr.includes('.')) {
        finalStr = (+tempStr).toFixed(keepDigits)
      } else {
        finalStr = tempStr
      }
      return finalStr / 100
    }
    return finalStr
  }
  let percent = value ? getTargetPercent(value) : 0
  if (numericalType === 'actualValue') {
    // 实际值虽然最后显示的是实际值,但是还是需要计算出 占比 来供图表显示波纹的占比
    percent = +(percent / capacity).toFixed(4)
  }


  // 动态生成每条水波的设置
  const waveSeriesValue = Object.values(waveSeries)
  const chartData = waveSeriesValue.map((item, index) => {
    const { waveAmplitude, themePureColor: waveColor, waveDirection, waveHeightSet, wavePhase, waveSpeed } = item
    return {
      value: +(+percent + waveHeightSet).toFixed(3),
      direction: waveDirection, // 波的移动方向
      amplitude: waveAmplitude, // 振幅
      period: +waveSpeed * 2000,
      phase: wavePhase, // 波的相位弧度
      itemStyle: {
        color: componentThemeConfig ? componentThemeConfig.pureColors[index % 7] : waveColor || '#87ceeb',
      }
    }
  })

  const getOption = () => (
    {
      series: [{
        type: 'liquidFill',
        radius: `${chartSize}%`,
        waveAnimation: 'true',
        waveLength: '100%',
        outline: {
          show: true,
          borderDistance: borderGap, // 边框线与图表的距离 数字
          itemStyle: {
            opacity: 0.1, // 边框的透明度   默认为 1
            borderWidth: borderWidth, // 边框的宽度
            shadowBlur: 10, // 边框的阴影范围 一旦设置了内外都有阴影
            shadowColor: componentThemeConfig ? componentThemeConfig.assistColor : borderColor || '#febb00', // 边框的阴影颜色,
            borderColor: componentThemeConfig ? componentThemeConfig.assistColor : borderColor || '#febb00', // 边框颜色
          }
        },
        // shape: 'diamond',
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
          // opacity: 0.1, // 波浪的透明度
          cursor: 'default',
          shadowBlur: 10 // 波浪的阴影范围
        },
        label: {
          position: [`${offsetX}%`, `${offsetY}%`],
          formatter: function () {
            if (numericalType === 'percent') {
              const filterZeroInTail = parseFloat((percent * 100).toFixed(keepDigits))
              return `{a| ${filterZeroInTail}%}` + `{suffixText| ${suffixText}}`
            }
            if (numericalType === 'actualValue') {
              let finalText = (+value).toFixed(keepDigits)
              if ((value + '').endsWith('%')) {
                const temp = value.slice(0, -1)
                finalText = `${(+temp).toFixed(keepDigits)}%`
              }
              return `{a| ${finalText}}` + `{suffixText| ${suffixText}}`
            }
            return ''
          },
          rich: {
            a: {
              letterSpacing: letterSpacing,
            },
            suffixText: {
              fontFamily: suffixTextStyle.fontFamily,
              fontSize: suffixTextStyle.fontSize,
              color: componentThemeConfig ? componentThemeConfig.textColor : suffixTextStyle.themeTextColor || '#fff',
              fontStyle: suffixTextStyle.italic ? 'italic' : 'normal',
              fontWeight: suffixTextStyle.bold ? 'bold' : 'normal',
              lineHeight: 50,
              // top: `${suffixOffset.suffixOffsetX}%`,
              // left: suffixOffset.suffixOffsetY,
            }
          },
          fontSize: fontSize,
          color: componentThemeConfig ? componentThemeConfig.assistColor : textColor || '#fff',
          fontStyle: italic ? 'italic' : 'normal',
          fontWeight: bold ? 'bold' : 'normal',
        },
        data: chartData
      }]
    }
  )
  const onChartReady = echarts => {
  };
  const onChartClick = (param, echarts) => {
    const { name, value } = param
    const willPostData = {
      name,
      value,
    }
    // 自定义事件部分
    if (Array.isArray(componentConfig.events) && componentConfig.events.length) {
      if(typeof props.onClick === 'function') {
        props.onClick(param.event, willPostData)
      }
    }
    if (Array.isArray(componentConfig.drillDownArr) && componentConfig.drillDownArr.length) {
      // drillDownArray长度不为零, 需要下钻
      if (typeof props.onChange === 'function') {
        props.onChange(willPostData)
      }
    } else {
      // do something
    }
  }

  // 自定义事件部分
  useEffect(() => {
    if (typeof  props.onDataChange === 'function') {
      props.onDataChange(finalData)
    }
  }, [finalData])
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

export default memo(Hydrograph)