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
  const { bySystem,isRadius, barColor, bgColor, highLight } = allSettings['柱状']

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
        {
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
              barBorderRadius: isRadius?30:0,
              color: function (params) {
                var colorList = ['rgba(72,255,156,1)', 'rgba(72,168,255, 1)', 'rgba(255,251,116, 1)', 'rgba(255,115,104, 1)', 'rgba(113,129,226, 1)'];
                return bySystem ? colorList[params.dataIndex % 5] : barColor;
              },
            },
          },
          barWidth: "30%",
          data: salvProValue,
        },
        {
          name: "背景",
          type: "bar",
          barWidth: "30%",
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
                return bySystem ? colorList[params.dataIndex % 5] : bgColor;
              },
              barBorderRadius: isRadius?30:0,
            },
          },
        },
        highLight.show && {
          name: "外圆",
          type: "pictorialBar",
          hoverAnimation: false,
          data: getSymbolData(salvProValue),
          symbol:
              "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAMAAADWZboaAAAAZlBMVEUAAABe3uVe3+Vf3uVf3+Zf3uVg3+Zg3+Zf3+Vi4OZh4OZg3+Z86/Bh3+Zi4Odj4Odi4OZ86/B76/B86/Bj4ed56+9x5+xn4umB7/N87PB36e+A7/N+7fF/7vJ/7vJ+7fGA7/OB7/PReX+lAAAAIXRSTlMABQkVDREmIhk3MR10LEFFPHh7cUprXE35h2XnqMLAp+mHAG9cAAAB5ElEQVRIx83WjU7CMBQFYIoiKMqU/XUboHv/l/Tce7t2XamDNSacETEmX86tlK2rx4py150o+MstMBLwWRfHKo6JCVxLnvmFGBjFQ58oF1//sUZhGy/ClSTWObgnL4O+bkeN4nY2okfNMbkRt9/vtxz8InoTsWplJSCzFxPmO8+GpSIByX3YQAuGDWtRKhKjCnxDXhF6Z4yxnZ20Wgko7BMRDmxtSGVaI4kdTIgb+zTYoJQlIMlDlmUFgrcDWWC201qSayqlTkiCddWWeV62VU0YlnpRi9VOKaSUsiyq/N0krwq2Ugt7lVpZl5BfHNiytjagMi+XYp0kCR45hMlivVQrE/uU5pXSrCB5bM6d1t2lOZItMqmliT3q5uVxqxzyW/ccfYLNKx7ZTeykMvNyac2yt2Fbc61MHLSC0rwoxbiNdlQ3GBm1NLHQsHUrtEXppR/ljNpW6DbSCoqlFiVoN6YdaFlgsSFVPs1BdT8OaB5QyQzVcaqWDows/zepxR8ObLglTrdtCRVuRNj4Rrxh+//0ke2f8KVL+Kon3GCSbmsJN9OUW3j6g0Ns+LgCij2u0h+Sghc8mlMPBMgdx5DFh59VmOVHrvmDnoNxCz3J7MFWsMuaLyR089xz/xhlfijvwutR8gv3zk6BLUUeCgAAAABJRU5ErkJggg==",
          symbolSize: [highLight.radius,highLight.radius],
          symbolOffset: [highLight.offset, 0],
          zlevel: 2,
        },
        batteryStyle && {
          type: "pictorialBar",
          itemStyle: {
            color: bySystem? '#':bgColor,
          },
          symbolRepeat: "fixed",
          symbolMargin: 4,
          symbol: "roundRect",
          symbolClip: true,
          symbolSize: [3, '30%'],
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
