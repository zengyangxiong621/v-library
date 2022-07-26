import React from 'react';
import EC from '../../EC'

import * as echarts from 'echarts';
import ComponentDefaultConfig from './config'

// 深拷贝
const deepClone =  (obj) =>  {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  const result = Array.isArray(obj) ? [] : {}
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      result[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i]
    }
  } else if (typeof obj === 'object') {
    Object.keys(obj).forEach((k) => {
      result[k] = typeof obj[k] === 'object' ? deepClone(obj[k]) : obj[k]
    })
  }
  return result
}


const RingRatio = (props) => {
  const componentConfig = props.componentConfig || ComponentDefaultConfig
  const { config } = componentConfig
  const { data } = componentConfig.staticData
  // 最新字段
  const finalFieldsArr = props.fields || ['nodes','links']
  // 组件静态或者传入组件的数据
  const originData = props.comData || data
  // originData中有多项数据，只取第一项
  const firstData = originData[0]
  const nodes = deepClone(firstData[finalFieldsArr[0]])
  const links = deepClone(firstData[finalFieldsArr[1]])

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
  const {globalStyle,margin,label,linksLineStyle,tooltip,dataSeries} = getTargetConfig(config)
  const {nodeWidth,nodeGap,emphasis,draggable} = globalStyle
  const {left,top,right,bottom} = margin
  const {labelTextStyle,numberLabel,offset:{x,y},position} = label
  const {color,opacity,curveness,customColor:{customColorShow,styleColor}} = linksLineStyle
  const {backgroundColor,tooltipTextStyle} = tooltip

  const dataSeriesValues = Object.values(dataSeries)
  const dataSeriesObj = {}
  dataSeriesValues.forEach(item => {
    dataSeriesObj[item.fieldName] = item.barColor
  })

  links.forEach(item => {
    item.lineStyle = {
      color: !customColorShow ? color : styleColor, // target 或 自定义
      opacity: '0.1', // 0.1
      curveness: '0.5'// 0-1
    }
  })
  const allSource = links.map(item => item.source)
  const surce =  [...new Set(allSource)]
  nodes.forEach(item => {
    if(surce.includes(item.name)){
      item.label = {
        position: "right"
      }
    }
    item.itemStyle = {
      color: dataSeriesObj[item.name] || 'rgb(0,0,0)'
    }
  })



  // 环形宽度
  const getOption = () => ({
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove',
    },
    series: {
      type: 'sankey',
      nodeWidth,
      nodeGap,
      draggable,
      left,
      top,
      right,
      bottom,
      emphasis: {
        focus: emphasis ? 'adjacency' : 'none',
      },
      tooltip: {
        backgroundColor,
        textStyle: {
          color: tooltipTextStyle.color,
          fontFamily: tooltipTextStyle.fontFamily,
          fontSize: tooltipTextStyle.fontSize,
          fontWeight: tooltipTextStyle.fontWeight
        }
      },
      label: {
        show: true,
        position,
        offset: [x,y],
        color: labelTextStyle.color,
        fontFamily: labelTextStyle.fontFamily,
        fontSize: labelTextStyle.fontSize,
        fontWeight: labelTextStyle.fontWeight,
      },
      nodes,
      links

    }
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
  RingRatio,
  ComponentDefaultConfig
}

export default RingRatio