import React from 'react';
import EC from '../../EC'

import * as echarts from 'echarts';
import ComponentDefaultConfig from './config'


const RingRatio = (props) => {
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
  const percentValue = firstData[finalFieldsArr[1]]
  // 转换好后要放入 echartOptions->'gauge'项里 作为 data
  const chartData = [{
    // text: titleText,
    value: percentValue
  }]
  // 获取config中的配置
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
  const { bold, color, fontFamily, fontSize, italic, ringColor, ringWidth, textHorizontal, textVertical, percentVertical } = targetConfig

  // 自定义富文本样式
  var rich = {
    percentSymbol: {
      fontSize: fontSize,
      color: color,
      fontWeight: bold ? 'bold' : 'normal',
      fontStyle: italic ? 'italic' : 'normal',
      padding: [-percentVertical, 0, 0, 8],
    },
    percentNum: {
      fontSize: fontSize * 1.5,
      fontFamily: 'DINBold',
      color: color,
      fontWeight: bold ? 'bold' : 'normal',
      fontStyle: italic ? 'italic' : 'normal',
      padding: [-percentVertical, 0, 0, 0],
    },
  }
  // 环形宽度
  const getOption = () => ({
    title: {
      show: true,
      text: titleText,
      left: `${textHorizontal}%`,
      top: `${textVertical}%`,
      textStyle: {
        color: color,
        fontSize: fontSize,
        fontFamily: fontFamily,
        fontWeight: bold ? 'bold' : 'normal',
        fontStyle: italic ? 'italic' : 'normal',
        // width: 120,
        overflow: 'breakAll'
      },
      textAlign: 'center',
    },
    series: [
      {
        type: 'gauge',
        name: '外层',
        radius: '96%',
        startAngle: 225,
        endAngle: -45,
        min: 0,
        max: 100,
        splitNumber: 1,
        pointer: {
          show: false
        },
        detail: {
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: [
              [1, '#00236f']
            ],
            width: 20,
            opacity: 0.5
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: true,
          length: 0,
          lineStyle: {
            color: '#fff',
            width: 0,
            type: 'solid',
          },
        },
        axisLabel: {
          show: false,
          fontSize: 24,
          color: '#fff',
          z: 40
        },
      },
      {
        type: 'gauge',
        name: '仪表盘',
        radius: '90%',
        startAngle: 225,
        endAngle: -45,
        data: chartData,
        pointer: {
          show: false
        },
        detail: {
          formatter: function (value) {
            var num = Math.round(value);
            return '{percentNum|' + num + '}{percentSymbol|%}';
          },
          rich: rich,
          offsetCenter: ['5%', "15%"],
        },
        title: {
          show: true,
          color: '#fff',
          fontStyle: 'normal',
          fontWeight: '200',
          fontFamily: '微软雅黑',
          fontSize: 24,
          offsetCenter: ['0', '30%'],
          width: 200,
          overflow: 'breakAll'
        },
        // 进度条背景色
        axisLine: {
          show: true,
          lineStyle: {
            width: ringWidth,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            opacity: 0.6,
            color: [[1, '#07369c']]
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false
        },
        color: '#fff',
        progress: {
          show: true,
          overlap: true,
          width: ringWidth,
          // roundCap: true,
          itemStyle: {
            color: ringColor,
            // color: {
            //   type: 'linear',
            //   x: 0,
            //   y: 0,
            //   x2: 1,
            //   y2: 0,
            //   colorStops: [{
            //     offset: 0, color: '#654bfe' // 0% 处的颜色
            //   }, {
            //     offset: 1, color: '#29d6ea' // 100% 处的颜色
            //   }],
            //   global: false // 缺省为 false
            // },
            shadowColor: 'rgba(16,235,227,1)',
            shadowBlur: 5,
          }
        }
      },
      {
        name: '灰色内圈', //刻度背景
        type: 'gauge',
        z: 2,
        radius: '50%',
        startAngle: '225',
        endAngle: '-45',
        center: ["50%", "50%"], //整体的位置设置
        axisLine: { // 坐标轴线
          lineStyle: { // 属性lineStyle控制线条样式
            color: [
              [1, '#018DFF']
            ],
            width: 2,
            opacity: 0.3,
          }
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          show: false
        },
        pointer: {
          show: false
        },
        axisTick: {
          show: false
        },
        detail: {
          show: 0
        }
      },
      // 目前用不上
      // {
      //   name: "刻度文字",
      //   type: "gauge",
      //   radius: "94%",
      //   center: ['50%', '50%'],
      //   startAngle: 220, //刻度起始
      //   endAngle: -35, //刻度结束
      //   min: 0,
      //   max: 100,
      //   splitNumber: 1,
      //   z: 4,
      //   axisTick: {
      //     show: false
      //   },
      //   splitLine: {
      //     length: 0,
      //     lineStyle: {
      //       width: 5,
      //       color: '#018DFF'
      //     }
      //   },
      //   axisLabel: {
      //     color: '#fff',
      //     fontSize: ringTextSize,
      //     distance: 20,
      //   },
      //   pointer: {
      //     show: false
      //   },
      //   axisLine: {
      //     lineStyle: {
      //       opacity: 0
      //     }
      //   },
      //   detail: {
      //     show: false
      //   },
      // },
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
  RingRatio,
  ComponentDefaultConfig
}
export default RingRatio