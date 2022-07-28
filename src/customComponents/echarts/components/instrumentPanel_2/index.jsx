import React from 'react';
import EC from '../../EC'

import * as echarts from 'echarts';
import ComponentDefaultConfig from './config'


const InstrumentPanel = (props) => {
  const componentConfig = props.componentConfig || ComponentDefaultConfig
  const { config } = componentConfig
  const { data } = componentConfig.staticData
  // 最新字段
  const finalFieldsArr = props.fields || ['text', 'value','name']

  // 组件静态或者传入组件的数据
  const originData = props.comData || data
  // originData中有多项数据，只取第一项
  const firstData = originData[0]
  const titleText = firstData[finalFieldsArr[0]]
  const numberValue = firstData[finalFieldsArr[1]]
  const unitText = firstData[finalFieldsArr[2]]
  // 转换好后要放入 echartOptions->'gauge'项里 作为 data
  const chartData = [{
    value: numberValue,
    name: unitText
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
  const { 
    numberRange,
    numberStyles:{textStylerNumber,offset:numberOffset},
    unitStyles:{textStylerUnit,offset:unitOffset}
  } = allSettings ? allSettings['指标'] : {}
  const { titleStyles:{showTitleStyles,offset,textStyleTitle} } = allSettings ? allSettings['标题'] : {}
  const { axisLine:{axisLineColor} } = allSettings ? allSettings['圆环'] : {}


  const getOption1 = () => ({
    title:{
      show: true,
      text: titleText,
      left: '50%',
      top: '90%',
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
      // 基本仪表盘
      {
        type: 'gauge',
        radius: '60%',
        z:2,
        startAngle: 245,
        endAngle: -65,
        center: ['50%', '50%'],
        min:0,
        max:numberValue*3,
        // splitNumber: 10,
        detail: {
          valueAnimation:true,
          formatter: function (value) {
            return '{num|'+value+'}';
          },
          rich: {
            num: {
              color: textStylerNumber.color,
              fontSize: textStylerNumber.fontSize,
              fontFamily: textStylerNumber.fontFamily,
              fontWeight: textStylerNumber.bold ? 'bold' : 'normal',
              fontStyle: textStylerNumber.italic ? 'italic' : 'normal',
            },
          },
          offsetCenter: [numberOffset.horizontal, numberOffset.vertical],
        },
        title:{
          color: textStylerUnit.color,
          fontSize: textStylerUnit.fontSize,
          fontFamily: textStylerUnit.fontFamily,
          fontWeight: textStylerUnit.bold ? 'bold' : 'normal',
          fontStyle: textStylerUnit.italic ? 'italic' : 'normal',
          offsetCenter: [unitOffset.horizontal, unitOffset.vertical],
        },
        data: chartData,
        axisLine: {
          show:true,
          lineStyle:{
            color: [
              [1, axisLineColor]
            ],
            width: outerRadius*100
          }
        },
        progress:{
          show:true,
          width: outerRadius*100,
          itemStyle:{
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                    offset: 0,
                    color: '#6648FF' // 0% 处的颜色
                },
                {
                    offset: 0.17,
                    color: '#6648FF' // 100% 处的颜色
                },
                {
                    offset: 0.9,
                    color: '#18FFE5' // 100% 处的颜色
                },
                {
                    offset: 1,
                    color: '#18FFE5' // 100% 处的颜色
                }
                ],
              global: false // 缺省为 false
            }
          }
        },
        pointer: {
          show: true,
          length: '110%',
          width: 6,
          itemStyle:{
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              {
                offset: 0,
                color: 'rgba(0, 102, 255,0)' // 0% 处的颜色
              },
              {
                offset: 0.5,
                color: 'rgba(0, 102, 255,0)' 
              },
              {
                offset: 0.7,
                color: 'rgba(115, 250, 246,0.3)'
              },
              {
                offset: 1,
                color: '#73faf6'
              }
            ]),
            
          }
        },
        axisTick:{
          show: false
        },
        splitLine:{
          show: false
        },
        axisLabel:{
          show: false
        },
      },
      // // 刻度的线
      // {
      //   type: 'gauge',
      //   radius: '66%',
      //   z:2,
      //   startAngle: 245,
      //   endAngle: -65,
      //   detail: {
      //     show: false
      //   },
      //   axisLine: {
      //     show: true,
      //     lineStyle: {
      //       color: [[1, '#4796fd']],
      //       width: 2,
      //       opacity: 0.3
      //     }
      //   },
      //   splitLine: {
      //     show: true,
      //     length: '20%',
      //     distance: -20,
      //     lineStyle:{
      //       color: '#4796fd',
      //       width: 2,
      //       opacity: 0.3
      //     }
      //   },
      //   axisTick: {
      //     show: true,
      //     splitNumber: 10,
      //     length:10,
      //     distance: -10,
      //     lineStyle:{
      //       color: '#4796fd',
      //       width: 2,
      //       opacity: 0.3
      //     }
      //   },
      //   pointer: {
      //     show: false
      //   },
      //   axisLabel: {
      //     show: false
      //   },
      // },
      // // 最外面的刻度线
      // {
      //   type: 'gauge',
      //   radius: '85%',
      //   z:2,
      //   startAngle: 245,
      //   endAngle: -65,
      //   axisLine: {
      //     show: true,
      //     lineStyle:{
      //       width: 5,
      //       color:[
      //         [1, new echarts.graphic.LinearGradient(0, 0, 1, 0, [
      //           {
      //             offset: 0,
      //             color: '#4796fd'
      //           },
      //           {
      //             offset: 0.1,
      //             color: 'rgba(108, 229, 246, 0.2)'
      //           },
      //           {
      //             offset: 0.2,
      //             color: 'rgba(108, 229, 246, 0)', 
      //           },
      //           {
      //             offset: 0.8,
      //             color: 'rgba(108, 229, 246, 0)',
      //           },
      //           {
      //             offset: 0.9,
      //             color: 'rgba(108, 229, 246, 0.2)'
      //           },
      //           {
      //             offset: 1,
      //             color: '#4796fd', 
      //           }
      //         ])],
      //       ],
      //       opacity: 1
      //     }
      //   },
      //   axisTick: {
      //     show: false,
      //     splitNumber: 40,
      //     length: 10,
      //     lineStyle:{
      //       color: {
      //         type: 'linear',
      //         x: 0,
      //         y: 0,
      //         x2: 0.5,
      //         y2: 0.9,
      //         colorStops: [
      //           // {
      //           //   offset: 0,
      //           //   color: '#4796fd' // 0% 处的颜色
      //           // },
      //           // {
      //           //   offset: 0.2,
      //           //   color: 'rgba(108, 229, 246, 0)', 
      //           // },
      //           // {
      //           //   offset: 0.8,
      //           //   color: 'rgba(108, 229, 246, 0)', 
      //           // },
      //           // {
      //           //   offset: 1,
      //           //   color: '#4796fd',
      //           // }
      //           {
      //               offset: 0, color: 'red' // 0% 处的颜色
      //           }, {
      //               offset: 1, color: 'blue' // 100% 处的颜色
      //           }
      //         ],
      //         global: false // 缺省为 false
      //       }
      //     }
      //   },
      //   pointer: {
      //     show: false
      //   },
      //   detail: {
      //     show: false
      //   },
      //   axisLabel: {
      //     show: false
      //   },
      //   splitLine: {
      //     show: false,
      //   },
      // },
      // // 最里面的饼图样式
      // {
      //   type: 'pie',
      //   radius: innerRadius*100+'%',
      //   center: ['50%', '50%'],
      //   z: 1,
      //   itemStyle: {
      //     normal: {
      //       color: new echarts.graphic.RadialGradient(
      //         0.5,
      //         0.5,
      //         0.85,
      //         [
      //           {
      //             offset: 0.5,
      //             color: '#02004d'
      //           },
      //           {
      //             offset: 1,
      //             color: '#ffffff'
      //           },
      //         ],
      //         false
      //       ),
      //       label: {
      //         show: false
      //       },
      //       labelLine: {
      //         show: false
      //       }
      //     }
      //   },
      //   hoverAnimation: false,
      //   data: [100],
      //   animation: false
      // },
      // // 最里面的仪表盘样式
      // {
      //   type: 'gauge',
      //   radius: innerRadius*100+'%',
      //   z:2,
      //   startAngle: 270,
      //   endAngle: -90,
      //   splitNumber: 4,
      //   detail: {
      //     show: false
      //   },
      //   axisLine: {
      //     show: true,
      //     lineStyle: {
      //       color: [[1, '#73faf6']],
      //       width: 2,
      //       shadowBlur: 10,
      //       opacity: 0.5
      //     }
      //   },
      //   pointer: {
      //     show: false
      //   },
      //   axisTick: {
      //     show: false
      //   },
      //   axisLabel: {
      //     show: false,
      //   },
      //   splitLine: {
      //     show: true,
      //     distance: 0,
      //     length: 17,
      //     lineStyle:{
      //       color: '#73faf6'
      //     }
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
      option={getOption1()}
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