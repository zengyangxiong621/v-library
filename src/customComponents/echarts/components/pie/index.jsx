import ComponentDefaultConfig from './config'
import * as echarts from 'echarts';
import EC from '../../EC'
import React from 'react'

const formatNumber = (num, precision = 2, splitDesc = ',') => {
  if (typeof num === 'number') {
    precision = +precision // 这里为了处理precision传入null  +null=0
    const str = num.toFixed(precision)
    const reg = str.indexOf('.') > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g
    return str.replace(reg, '$1' + splitDesc)
  }
}

const Pie = (props) => {
  const componentConfig = props.componentConfig || ComponentDefaultConfig
  const { config } = componentConfig
  const { data } = componentConfig.staticData
  const componentData = props.comData || data // 过滤后的数据
  const fieldKey = props.fields || ['s', 'y']

  const targetConfig = config.filter((item) => item.name !== 'dimension').reduce((pre, cur) => {
    if (Array.isArray(cur.value)) {
      const obj = cur.value.reduce((p, c) => {
        p[c.name] = c.value
        return p
      }, {})
      pre = {
        ...pre,
        ...obj,
      }
    } else {
      pre[cur.name] = cur.value
    }
    return pre
  }, {})

  const { fontSize, bold, fontFamily, italic, lineHeight, letterSpacing, textColor, textVertical, textHorizontal, outerRadius, innerRadius } = targetConfig
  // 标签样式
  const { line1Length, line2Length, labelSize, lineWidth } = targetConfig
  // 标签显示字段
  const { labelSeriesName, labelDataName, labelDataValue, labelPercentage } = targetConfig

  let pieData = []
  if (componentData && componentData.length) {
    pieData = componentData.map(item => {
      return {
        name: item[fieldKey[0]],
        value: item[fieldKey[1]]
      }
    })
  }
  let total = componentData && componentData.length ? componentData.reduce((pre, item) => {
    return pre + item[fieldKey[1]]
  }, 0) : 0
  total = formatNumber(total, 0)

  const getOption = () => {
    return {
      color: ['#BAE7FF', '#01D68A', '#FFAE4B', '#5777FF', '#1CE7E7', '#1A90FF'],
      title: {
        show: targetConfig.showTotal,
        text: total,
        itemGap: 10,
        subtext: '总量',
        top: `${textVertical}%`,
        left: `${textHorizontal}%`,
        textAlign: "center",
        textVerticalAlign: "center",
        textStyle: {
          fontFamily: fontFamily,
          color: textColor,
          fontSize: fontSize,
          fontWeight: bold ? 'bold' : 'normal',
          fontStyle: italic ? 'italic' : 'normal',
        },
        subtextStyle: {
          color: "#959bba",
          fontSize: fontSize,
          fontWeight: "400",
        }
      },
      tooltip: {
        show: false
      },
      legend: {
        show: false
      },
      series: [
        {
          name: 'pieChart',
          type: 'pie',
          radius: [`${innerRadius}%`, `${outerRadius}%`],
          roseType: false,
          // roseType: targetConfig.chartType === "ringChart" ? false : 'area',
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderWidth: 2,
          },
          label: {
            show: targetConfig.showLabel,
            formatter: `${labelSeriesName ? '{a}' : ''} ${labelDataName ? '{b}' : ''} ${labelDataValue ? '{c}' : ''} ${labelPercentage ? '{d}%' : ''}`,
            fontSize: labelSize,
            color: '#fff',
          },
          labelLine: {
            length: line1Length,
            length2: line2Length,
            lineStyle: {
              width: lineWidth
            }
          },
          emphasis: {
            label: {
              show: targetConfig.showLabel,
            }
          },
          data: pieData
        }
      ]
    }
  }

  const onChartClick = (param, echarts) => {
  }
  const onChartReady = echarts => {
  }
  let onEvents = {
    click: onChartClick,
  }
  return (
    <EC
      option={getOption()}
      onChartReady={onChartReady}
      onEvents={onEvents}
    />
  );



}

export { Pie, ComponentDefaultConfig }
export default Pie