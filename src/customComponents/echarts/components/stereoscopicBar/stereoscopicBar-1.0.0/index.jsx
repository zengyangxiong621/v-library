import ComponentDefaultConfig from './config'
import * as echarts from 'echarts'
import EC from '@/customComponents/echarts/EC'
import React from 'react'

const StereoscopicBar = (props) => {
  const componentConfig = props.componentConfig || ComponentDefaultConfig
  const { config } = componentConfig
  const { data } = componentConfig.staticData
  const componentData = props.comData || data // 过滤后的数据
  const fieldKey = props.fields || ['x', 'y', 's']
  // <<<获取X轴数据>>>
  //传入的数据的每个对象中都有x, 当有多个系列时，x会重复
  // {x:'01/11', y:'2', s:'系列一'}、{x:'01/11', y:'20', s:'系列二'}
  const axisArr = componentData.map((item) => item[fieldKey[0]])
  let xAxisData = [...new Set(axisArr)]
  // y轴数据
  const yAxisData = componentData.map((item) => item[fieldKey[1]])

  // <<<获取每条折线的 数据 的map>>>
  // 此时的 seriesMap <===> {'系列一' => {data:[1,2,3]}, '系列二' => {data:[4,5,6]}}
  // @Mark 后面还需要根据用户在“系列设置”中定义的<映射字段>再处理一次seriesMap
  let seriesMap = new Map()
  componentData.forEach((item) => {
    const seriesKey = item[fieldKey[2]]
    const newValue = item[fieldKey[1]]
    if (!seriesMap.has(seriesKey)) {
      seriesMap.set(seriesKey, { data: [newValue] })
    } else {
      //@Mark newValue 需要放在后面，不然最后的得到的每条折线的data会颠倒
      const val = seriesMap.get(seriesKey)
      const lineData = val.data || []
      seriesMap.set(seriesKey, { data: [...lineData, newValue] })
    }
  })
  /**
   ** description: 获取组件右侧可供用户操作的配置项
   */
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
  // config中位置尺寸这项不需要,提取出来
  const hadFilterArr = config.filter((item) => item.name !== 'dimension')
  const { allSettings } = getTargetConfig(hadFilterArr)
  // 四个 tab, 分别是 图表、坐标轴、系列、辅助
  const { legendSettings, outerMargin, spacing } = allSettings
    ? allSettings['图表']
    : {}
  const { axisSettings } = allSettings ? allSettings['坐标轴'] : {}
  // const { dataSeries } = allSettings ? allSettings['系列'] : {}
  const { indicator, tooltip } = allSettings ? allSettings['辅助'] : {}
  console.log('eneneneneenen', allSettings['图表']);
  // ----------------OOOOOOOOOOOOOOOOOO------------------------- //
  // 图例配置
  const {
    gap,
    legendTextStyle,
    offset,
    iconSize,
    show: isUseLegend,
  } = legendSettings || {}
  // 系列--比较特殊
  // const dataSeriesValues = dataSeries ? Object.values(dataSeries) : []
  const dataSeriesValues = []
  // 拿到seriesMap里的所有key,每个key对应着一根折线(一个系列),
  const seriesMapKeys = seriesMap.keys()
  // 用数组保存这些key，便于下一步用索引取值
  const seriesMapKeysArr = []
  for (const value of seriesMapKeys) {
    seriesMapKeysArr.push(value)
  }
  // 替换掉 默认config里的映射关系(mapping), 因为默认的是‘系列一对系列一’，‘系列二对系列二’，但真实数据可能是别的系列名
  dataSeriesValues.forEach(({ mapping }, index) => {
    const customSeriesName = seriesMapKeysArr[index]
    // @Mark 首次根据真实数据设置成功系列名后，后续就不可再走这个逻辑，否则即使右侧设置变更了，图表中也不会产生相应的变化
    if (mapping.fieldName !== customSeriesName) {
      mapping.fieldName = customSeriesName
      mapping.displayName = customSeriesName
    }
  })
  // 指示器
  const { indicatorWidth, indicatorStyleColor } = indicator || {}
  // 提示框
  const { tooltipShow, tooltipBackColor, tooltipOffset, tooltipBorderColor } = tooltip || {}
  // 轴
  const {
    xAxisLabel: {
      // 暂时不做隐藏
      // show: xAxisLabelShow = false,
      xAxisLabelRotate = 0,
      xAxisLabelTextStyle = {},
    },
    xAxisLine: { show: xAxisLineShow = true, xAxisLineColor, xAxisLineWeight },
    xGridLine: {
      showXGridLine,
      xGridLineType,
      xGridLineColor,
      xGridLineWeight,
    },
    blankOfSides
  } = axisSettings ? axisSettings['X轴'] : {}
  const {
    yAxisLabel: {
      // show: yAxisLabelShow = false,
      yAxisLabelRotate = 0,
      yAxisLabelTextStyle = {},
    },
    yAxisLine: { show: yAxisLineShow = true, yAxisLineColor, yAxisLineWeight },
    yAxisUnit: {
      yAxisUnitShow,
      yAxisUnitOffset = {},
      yAxisUnitText,
      yAxisUnitTextStyle = {},
    },
    yGridLine: {
      showYGridLine,
      yGridLineType,
      yGridLineColor,
      yGridLineWeight,
    },
  } = axisSettings ? axisSettings['Y轴'] : {}
  // ----------------OOOOOOOOOOOOOOOOOO------------------------- //

  /**
   ** description: 通过不同的配置来获取不同的折线的渲染配置
   */
  // const getSingleSeriesData = (options) => {
  //   const {
  //     isShowSymbolWhileHover,
  //     symbolShape,
  //     symbolSize,
  //     isSmooth,
  //     lineColor,
  //     lineWeight,
  //     areaShow,
  //     areaColor
  //   } = options || {}
  //   const everyLineOptions = {
  //     name: 'basicLine',
  //     type: 'bar',
  //     // 如果 false 则只有在 tooltip hover 的时候显示每条折线上的小标记图形
  //     showSymbol: !isShowSymbolWhileHover,
  //     // 折线上每个标记的形状
  //     symbol: symbolShape,
  //     symbolSize: symbolSize,
  //     smooth: isSmooth,
  //     data: [],
  //     itemStyle: {
  //       color: lineColor,
  //     },
  //     lineStyle: {
  //       width: lineWeight,
  //     },
  //     [areaShow && 'areaStyle']: {
  //       color: areaColor
  //     }
  //   }
  //   return everyLineOptions
  // }
  // @Mark 需要动态的计算折线图的数量, 最终将使用dynamicSeries来作为折线图的series属性的值
  const dynamicSeries = []
  // @Mark 图例文本的映射 {'系列一': '我是图例文本silieyi' }
  const legendTextReflect = {}
  // description: 从已经处理好的seriesMap中拿到对应的<每条折线的最终渲染配置>和<图例文本的映射>

  // seriesMap.forEach((value, key) => {
  //   // 假如：系列设置中用户设置了多个'系列一'
  //   // 利用find只返回第一个 key为'系列一'的特性即可实现“先设置者先生效”
  //   const targetObj = dataSeriesValues.find((k) => {
  //     return k.mapping.fieldName === key
  //   })
  //   let singleSeriesData = {}
  //   // 假如：数据中只有“系列一、二”，但是用户可以定义出“系列三、s系列……”，所以此时targetObj一定不存在
  //   if (targetObj) {
  //     // 获取 面积区域/折线 相关设置
  //     const singleAreaSettings = targetObj.areaStyle || {}
  //     const singleLineSettings = targetObj.lineSettings || {}
  //     const isShowArea = singleAreaSettings.areaShow

  //     // 整合 最终折线绘制的配置
  //     const singleSeriesOptions = isShowArea ? { ...singleLineSettings, ...singleAreaSettings } : singleLineSettings
  //     singleSeriesData = getSingleSeriesData(singleSeriesOptions)
  //     // 获取 最终每个图例应该展示的文本
  //     const { displayName } = targetObj.mapping || { displayName: key }
  //     legendTextReflect[key] = displayName
  //   } else {
  //     legendTextReflect[key] = key
  //   }

  //   const lineData = value.data
  //   const composeObj = { ...singleSeriesData, name: key, data: lineData }
  //   dynamicSeries.push(composeObj)
  // })
  /**
   ** description: 整合之前所得到的所有参数以生成最终的 echarts Option
   */
  const getOption = () => {

    // console.log('componentData', componentData);

    // 绘制左侧面
    const CubeLeft = echarts.graphic.extendShape({
      shape: {
        x: 0,
        y: 0
      },
      buildPath: function (ctx, shape) {
        // 会canvas的应该都能看得懂，shape是从custom传入的
        const xAxisPoint = shape.xAxisPoint
        const c0 = [shape.x, shape.y]
        const c1 = [shape.x - 13, shape.y - 13]
        const c2 = [xAxisPoint[0] - 13, xAxisPoint[1] - 13]
        const c3 = [xAxisPoint[0], xAxisPoint[1]]
        ctx.moveTo(c0[0], c0[1]).lineTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).closePath()
      }
    })
    // 绘制右侧面
    const CubeRight = echarts.graphic.extendShape({
      shape: {
        x: 0,
        y: 0
      },
      buildPath: function (ctx, shape) {
        const xAxisPoint = shape.xAxisPoint
        const c1 = [shape.x, shape.y]
        const c2 = [xAxisPoint[0], xAxisPoint[1]]
        const c3 = [xAxisPoint[0] + 18, xAxisPoint[1] - 9]
        const c4 = [shape.x + 18, shape.y - 9]
        ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
      }
    })
    // 绘制顶面
    const CubeTop = echarts.graphic.extendShape({
      shape: {
        x: 0,
        y: 0,
      },
      buildPath: function (ctx, shape) {
        const c1 = [shape.x, shape.y]
        const c2 = [shape.x + 18, shape.y - 9]
        const c3 = [shape.x + 5, shape.y - 22]
        const c4 = [shape.x - 13, shape.y - 13]
        ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
      }
    })
    // 注册三个面图形
    echarts.graphic.registerShape('CubeLeft', CubeLeft)
    echarts.graphic.registerShape('CubeRight', CubeRight)
    echarts.graphic.registerShape('CubeTop', CubeTop)

    const fillTo200 = (num) => {
      const rest = 200 - (num % 200)
      return num + rest
    }
    const maxValue = fillTo200(Math.max(...yAxisData))
    const shadowBarMaxValue = maxValue - 20
    const MAX = Array.from({ length: 6 }, (item) => item = shadowBarMaxValue)
    const option = {
      // backgroundColor: "#012366",
      tooltip: {
        show: tooltipShow,
        backgroundColor: tooltipBackColor,
        borderColor: tooltipBorderColor,
        trigger: 'axis',
        formatter: (params, ticket, callback) => {
          const { axisValue, value } = params[1]
          const htmlStr = `<div>
            <span>${axisValue}</span>
            <div style="display: 'flex'">
              <span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:#91cc75;"></span>
              <span>${value}</span>
            </div>
          </div>`
          return htmlStr
        },
        axisPointer: {
          type: 'line',
          lineStyle: {
            width: indicatorWidth,
            color: indicatorStyleColor,
            type: 'solid',
          },
        },
      },
      grid: {
        left: `${+spacing.left}`,
        right: `${+spacing.right}`,
        top: `${+spacing.top}`,
        bottom: `${+spacing.bottom}`,
        containLabel: true
      },
      xAxis: {
        // x轴上暂时不加单位
        // name: '年/月',
        type: 'category',
        data: xAxisData,
        axisLine: {
          show: xAxisLineShow,
          lineStyle: {
            width: xAxisLineWeight,
            color: xAxisLineColor,
          },
        },
        axisLabel: {
          show: true,
          color: xAxisLabelTextStyle.color,
          rotate: xAxisLabelRotate,
          fontSize: xAxisLabelTextStyle.fontSize,
          fontStyle: xAxisLabelTextStyle.italic ? 'italic' : 'normal',
          fontWeight: xAxisLabelTextStyle.bold ? 'bold' : 'normal',
        },
        splitLine: {
          show: showXGridLine,
          lineStyle: {
            type: xGridLineType,
            color: xGridLineColor,
            width: xGridLineWeight,
          },
        },
        boundaryGap: blankOfSides
      },
      yAxis: {
        min: 0,
        max: maxValue,
        interval: 200,
        type: 'value',
        [yAxisUnitShow && 'name']: yAxisUnitText,
        [yAxisUnitShow && 'nameGap']: yAxisUnitOffset.yAxisUnitOffsetY,
        [yAxisUnitShow && 'nameTextStyle']: {
          padding: [0, 0, 0, yAxisUnitOffset.yAxisUnitOffsetX],
          color: yAxisUnitTextStyle.color,
          fontSize: yAxisUnitTextStyle.fontSize,
          fontStyle: yAxisUnitTextStyle.italic ? 'italic' : 'normal',
          fontWeight: yAxisUnitTextStyle.bold ? 'bold' : 'normal',
          fontFamily: yAxisUnitTextStyle.fontFamily,
        },
        axisLine: {
          show: yAxisLineShow,
          lineStyle: {
            width: yAxisLineWeight,
            color: yAxisLineColor,
          },
        },
        axisLabel: {
          show: true,
          color: yAxisLabelTextStyle.color,
          rotate: yAxisLabelRotate,
          fontSize: yAxisLabelTextStyle.fontSize,
          fontStyle: yAxisLabelTextStyle.italic ? 'italic' : 'normal',
          fontWeight: yAxisLabelTextStyle.bold ? 'bold' : 'normal',
        },
        splitLine: {
          show: showYGridLine,
          lineStyle: {
            type: yGridLineType,
            color: yGridLineColor,
            width: yGridLineWeight,
          },
        },
        axisTick: {
          show: false
        },
        boundaryGap: ['20%', '20%']
      },
      series: [
        {
          type: 'custom',
          renderItem: function (params, api) {
            const location = api.coord([api.value(0), api.value(1)])
            return {
              type: 'group',
              children: [{
                type: 'CubeLeft',
                shape: {
                  api,
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0])
                },
                style: {
                  fill: 'rgba(47,102,192,.27)'
                }
              },
              {
                type: 'CubeRight',
                shape: {
                  api,
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0])
                },
                style: {
                  fill: 'rgba(59,128,226,.27)'
                }
              },
              {
                type: 'CubeTop',
                shape: {
                  api,
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0])
                },
                style: {
                  fill: 'rgba(72,156,221,.27)'
                }
              }]
            }
          },
          data: MAX
        },
        {
          type: 'custom',
          renderItem: (params, api) => {
            const location = api.coord([api.value(0), api.value(1)])
            // var color = api.value(1) > 800 ? 'red' : new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            //   offset: 0.2,
            //   // color: 'rgba(37,170,254,1)'
            //   color: 'rgba(46, 131, 253, 1)'
            // },
            // {
            //   offset: 0.8,
            //   // color: 'rgba(37,170,254,0.1)'
            //   color: 'rgba( 75, 205, 255,1)'
            // }
            // ])
            var color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0.2,
              // color: 'rgba(37,170,254,1)'
              color: 'rgba(46, 131, 253, 1)'
            },
            {
              offset: 0.8,
              // color: 'rgba(37,170,254,0.1)'
              color: 'rgba( 75, 205, 255,1)'
            }
            ])
            return {
              type: 'group',
              children: [{
                type: 'CubeLeft',
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0])
                },
                style: {
                  fill: color
                }
              }, {
                type: 'CubeRight',
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0])
                },
                style: {
                  fill: color
                }
              }, {
                type: 'CubeTop',
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0])
                },
                style: {
                  fill: color
                }
              }]
            }
          },
          // data: VALUE
          data: yAxisData
        },
        {
          type: 'bar',
          label: {
            normal: {
              show: true,
              position: 'top',

              fontSize: 16,
              color: '#fff',
              offset: [2, 0]
            }
          },
          itemStyle: {
            color: 'transparent',
          },
          tooltip: {

          },
          data: []
        },
      ]
    }














    return option
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

export { StereoscopicBar, ComponentDefaultConfig }
export default StereoscopicBar
