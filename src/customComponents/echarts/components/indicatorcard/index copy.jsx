import React, { useRef, useEffect, useState } from 'react';
import ComponentDefaultConfig from './config'

import * as echarts from 'echarts';



const Indicatorcard = (props) => {
  const componentConfig = props.componentConfig || ComponentDefaultConfig
  const { config } = componentConfig
  const { data } = componentConfig.staticData
  // debugger
  // 最新字段
  const finalFieldsArr = props.fields || ['value', 'color']

  // 根据传入的fields来映射对应的值
  const fields2ValueMap = {}
  const initColumnsName = ['value', 'color']
  finalFieldsArr.forEach((item, index) => {
    fields2ValueMap[initColumnsName[index]] = item
  })
  // 组件静态或者传入组件的数据
  const originData = props.comData || data
  // 根据对应的字段来转换data数据
  // debugger
  const finalData = Array.isArray(originData) ? originData.map((item) => {
    let res = {}
    for (let k in item) {
      res[k] = item[fields2ValueMap[k]]
    }
    return res
  }) : []


  const getTargetStyle = (Arr) => {
    const targetStyle = {};
    Arr.forEach(({ name, value }) => {
      if (Array.isArray(value)) {
        value.forEach(({ name, value }) => {
          targetStyle[name] = value
        })
      } else {
        targetStyle[name] = value
      }
    });
    return targetStyle
  }
  const wrapStyle = getTargetStyle(config)

  const chartDomRef = useRef(null)
  // const [underText, setUnderText] = useState('')
  useEffect(() => {
    var chartDom = chartDomRef.current
    var myChart = echarts.init(chartDom);
    // 即使传入的FinalData中有多组数据，只取头一个用
    const chartData = finalData[0]
    // 每个组件的颜色
    const mainColor = chartData['color']
    // 每个组件所占百分比
    const percent = chartData['value']
    // 每个组件底部文字
    // setUnderText(chartData['text'])
    
    // var option = {
    //   series: [{
    //     type: 'liquidFill',
    //     data: [
    //       {
    //         value: percent,
    //         direction: 'right', //水波移动的方向，默认right,top 和bottom时，单条水波静止
    //         itemStyle: {
    //           normal: { //正常样式
    //             color: mainColor,
    //             opacity: 0.5,
    //             // phase: 1000, // 波的相位弧度
    //             period: 150,
    //             amplitude: 3, // 波的振幅
    //           }
    //         }
    //       },
    //       {
    //         value: +percent - 0.05,
    //         direction: 'right', //水波移动的方向，默认right,top 和bottom时，单条水波静止
    //         itemStyle: {
    //           normal: { //正常样式
    //             color: mainColor,
    //             opacity: 1,
    //             // phase: 1, // 波的相位弧度
    //             period: 100,
    //             amplitude: 3, // 波的振幅
    //           }
    //         }
    //       }
    //     ],
    //     radius: '100%',
    //     waveAnimation: 'true',
    //     color: [mainColor], //对应波的颜色
    //     waveLength: '150%',
    //     outline: {
    //       show: true,
    //       borderDistance: 20, // 边框线与图表的距离 数字
    //       itemStyle: {
    //         opacity: 0.1, // 边框的透明度   默认为 1
    //         borderWidth: 5, // 边框的宽度
    //         shadowBlur: 10, // 边框的阴影范围 一旦设置了内外都有阴影
    //         shadowColor: mainColor, // 边框的阴影颜色,
    //         borderColor: mainColor // 边框颜色
    //       }
    //     },
    //     // color: ['#3EABFF', '#fff'], // 波浪颜色、、#3EABFF
    //     // shape: 'diamond',
    //     phase: 10, // 波的相位弧度
    //     // period: 1000,
    //     amplitude: 20, // 波的振幅
    //     direction: 'right', // 波动移动方向
    //     backgroundStyle: {
    //       color: '#3EABFF', // 水球未到的背景颜色
    //       opacity: 0, // 水球未到背景部分的透明度
    //       // borderWidth: 20,
    //       // borderColor: 'red',
    //       // shadowBlur: 60,
    //     },
    //     // 图形的高亮样式
    //     emphasis: {
    //       itemStyle: {
    //         cursor: 'default',
    //         opacity: 0.1 // 鼠标经过波浪颜色的透明度
    //       }
    //     },
    //     // 图形样式
    //     itemStyle: {
    //       // color: 'red', // 波浪之背景色，若有值则覆盖上一级中的color
    //       opacity: 0.7, // 波浪的透明度
    //       cursor: 'default',
    //       shadowBlur: 10 // 波浪的阴影范围
    //     },
    //     label: {
    //       position: ['50%', '50%'],
    //       formatter: function () {
    //         return `${percent * 100}%`
    //       },
    //       // fontSize: 40,
    //       color: '#fff'
    //     }
    //   }]
    // };
    var gaugeData = [
      {
        value: percent,
        name: 'Perfect',
        title: {          
          offsetCenter: ['0%', '30%'],
          color: mainColor,        
        },
        detail: {
          valueAnimation: true,
          offsetCenter: ['0%', '-20%'],
        }
      },
    ];
    var option = {
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
              borderColor: mainColor
            }
          },
          axisLine: {
            lineStyle: {
              width: 12 // 环形宽度 
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
            fontSize: 18
          },
          detail: { // 环内 25% 样式
            width: 50,
            height: 18,
            fontSize: 18,
            color: 'auto',
            borderColor: 'auto',
            borderRadius: 20,
            borderWidth: 0,
            formatter: '{value}%'
          }
        }
      ]
    };

    option && myChart.setOption(option);
  }, [])
  return (
    <div
      style={{ ...wrapStyle, height: '100%', width: '100%' }}
    >
      <div ref={chartDomRef} style={{ width: '100%', height: '100%' }}>
      </div>
    </div>
  )

}

export {
  ComponentDefaultConfig
}

export default Indicatorcard