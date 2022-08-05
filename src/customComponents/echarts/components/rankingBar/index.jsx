import ComponentDefaultConfig from './config'
import * as echarts from 'echarts'
import EC from '../../EC'
import React from 'react'

const RankingBar = (props) => {
  const componentConfig = props.componentConfig || ComponentDefaultConfig
  const { config } = componentConfig
  const { data } = componentConfig.staticData
  const componentData = props.comData || data // 过滤后的数据
  const fieldKey = props.fields || ['classify', 'numerical']

  // 获取样式配置信息
  const getTargetConfig = (Arr) => {
    let targetConfig = {}
    Arr.forEach((item) => {
      let { name, value, options } = item
      if (item.hasOwnProperty('value')) {
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
  // config中位置尺寸这项不需要,提取出来
  const hadFilterArr = config.filter((item) => item.name !== 'dimension')
  const { allSettings } = getTargetConfig(hadFilterArr)
  console.log('allSettings', allSettings)
  const { autoSort, sortOrder, maxBars, spacing, batteryStyle } = allSettings['图表']
  const { classify, numerical } = allSettings['文本']
  const { barWidth, colorSetting, isRadius, highLight } = allSettings['柱状']

  let resultTempData = Array.isArray(componentData) ? componentData.reduce((pre, cur) => {
    return pre.concat({
      classify: cur[fieldKey[0]],
      numerical: cur[fieldKey[1]],
    })
  }, []) : []

  // 数据升降序排序
  const sortFn = (arr, sortOrder = "DESC") => {
    return arr.sort((a, b) => {
      return a.numerical > b.numerical ?
        sortOrder === "DESC" ? -1 : 1
        :
        sortOrder === "DESC" ? 1 : -1
    })
  }
  if (autoSort) {
    resultTempData = sortFn(resultTempData, sortOrder)
  }
  const resultData = resultTempData.slice(0, maxBars)
  console.log('resultData', resultData)

  const salvProName = resultData.map(item => item.classify)
  const salvProValue = resultData.map(item => item.numerical)
  const salvProMax = new Array(resultData.length).fill(Math.max(...salvProValue))

  const getSymbolData = (data) => {
    let arr = [];
    for (var i = 0; i < data.length; i++) {
      arr.push({
        value: data[i],
        symbolPosition: "end",
      });
    }
    return arr;
  };

  /**
   ** description: 整合之前所得到的所有参数以生成最终的 echarts Option
   */
  const getOption = () => {
    const res = {
      grid: {
        left: `${+spacing.left}`,
        right: `${+spacing.right}`,
        bottom: `${+spacing.bottom}`,
        top: `${+spacing.top}`,
        containLabel: true,
      },
      xAxis: {
        show: false,
        type: "value",
      },
      yAxis: [
        {
          type: "category",
          inverse: true,
          axisLabel: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          data: salvProName,
        },
      ],
      series: [
        !batteryStyle && {
          name: "值",
          type: "bar",
          zlevel: 1,
          label: {
            normal: {
              show: true,
              position: [`${classify.offset.offsetX}px`, `${classify.offset.offsetY}px`],
              formatter: "{b}",
              textStyle: {
                color: classify.font.color,
                fontSize: classify.font.fontSize,
                fontFamily: classify.font.fontFamily,
                fontWeight: classify.font.bold ? 'bold' : 'normal',
                fontStyle: classify.font.italic ? 'italic' : 'normal',
              },
            }
          },
          itemStyle: {
            normal: {
              barBorderRadius: isRadius ? 30 : 0,
              color: function (params) {
                var colorList = ['rgba(72,255,156,1)', 'rgba(72,168,255, 1)', 'rgba(255,251,116, 1)', 'rgba(255,115,104, 1)', 'rgba(113,129,226, 1)'];
                return colorSetting?.bySystem ?
                  colorList[params?.dataIndex % 5]
                  : colorSetting?.barColor?.type === 'pure' ?
                    colorSetting?.barColor?.pureColor :
                    new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                      offset: 0,
                      color: colorSetting?.barColor?.gradientStart
                    },
                    {
                      offset: 1,
                      color: colorSetting?.barColor?.gradientEnd
                    }
                    ])
                  ;
              },
            },
          },
          barWidth: barWidth?.unit === '%' ? `${barWidth?.width}%` : barWidth?.width,
          data: salvProValue,
        },
        {
          name: "背景",
          type: "bar",
          barWidth: barWidth?.unit === '%' ? `${barWidth?.width}%` : barWidth?.width,
          barGap: "-100%",
          data: salvProMax,
          label: {
            normal: {
              show: true,
              position: [`${numerical.offset.offsetX}%`, `${numerical.offset.offsetY}px`],
              formatter: data => salvProValue[data.dataIndex],
              textStyle: {
                color: numerical.font.color,
                fontSize: numerical.font.fontSize,
                fontFamily: numerical.font.fontFamily,
                fontWeight: numerical.font.bold ? 'bold' : 'normal',
                fontStyle: numerical.font.italic ? 'italic' : 'normal',
              },
            }
          },
          itemStyle: {
            normal: {
              color: function (params) {
                var colorList = ['rgba(72,255,156, .4)', 'rgba(72,168,255, .4)', 'rgba(255,251,116, .4)', 'rgba(255,115,104, .4)', 'rgba(113,129,226, .4)'];
                return colorSetting?.bySystem ? colorList[params.dataIndex % 5] : colorSetting?.bgColor;
              },
              barBorderRadius: isRadius ? 30 : 0,
            },
          },
        },
        highLight.show && {
          name: "外圆",
          type: "pictorialBar",
          hoverAnimation: false,
          data: getSymbolData(salvProValue),
          symbol: `image://${highLight.icon}`,
          symbolSize: [highLight.radius, highLight.radius],
          symbolOffset: [highLight.offset, 0],
          zlevel: 2,
        },
        batteryStyle && {
          type: "pictorialBar",
          itemStyle: {
            color: function (params) {
              var colorList = ['rgba(72,255,156, 1)', 'rgba(72,168,255, 1)', 'rgba(255,251,116, 1)', 'rgba(255,115,104, 1)', 'rgba(113,129,226, 1)'];
              return colorSetting?.bySystem ? colorList[params.dataIndex % 5]
                : colorSetting?.barColor?.type === 'pure' ?
                  colorSetting?.barColor?.pureColor :
                  new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: colorSetting?.barColor?.gradientStart
                  },
                  {
                    offset: 1,
                    color: colorSetting?.barColor?.gradientEnd
                  }
                  ])
                ;
            },
          },
          label: {
            normal: {
              show: true,
              position: [`${classify.offset.offsetX}px`, `${classify.offset.offsetY}px`],
              formatter: "{b}",
              textStyle: {
                color: classify.font.color,
                fontSize: classify.font.fontSize,
                fontFamily: classify.font.fontFamily,
                fontWeight: classify.font.bold ? 'bold' : 'normal',
                fontStyle: classify.font.italic ? 'italic' : 'normal',
              },
            }
          },
          symbolRepeat: "fixed",
          symbolMargin: 4,
          symbol: "roundRect",
          symbolClip: true,
          symbolSize: [6, '20%'],
          symbolPosition: "start",
          symbolOffset: [6, 0],
          data: salvProValue,
          zlevel: 2,
        },
      ],
    }
    return res
  }

  const onChartClick = (param, echarts) => { }
  const onChartReady = (echarts) => { }
  let onEvents = {
    click: onChartClick,
  }
  return (
    <EC option={getOption()} onChartReady={onChartReady} onEvents={onEvents} />
  )
}

export { RankingBar, ComponentDefaultConfig }
export default RankingBar
