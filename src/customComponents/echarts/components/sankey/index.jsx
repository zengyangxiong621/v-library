import React from 'react';
import EC from '../../EC'

import * as echarts from 'echarts';
import ComponentDefaultConfig from './config'


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
  const numberValue = firstData[finalFieldsArr[0]]

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

  const {globalStyle,margin,label,linksLineStyle,tooltip,dataSeries} = getTargetConfig(config)
  const {nodeWidth,nodeGap,emphasis,draggable} = globalStyle
  const {left,top,right,bottom} = margin


  // 环形宽度
  const getOption = () => ({
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove',
    },
    nodeWidth,
    nodeGap,
    draggable,
    emphasis: {
      focus: emphasis ? 'adjacency' : 'none',
    },
    left,
    top,
    right,
    bottom,
    series: {
      type: 'sankey',
      data: [
        {
          // name: 'a',
          name: '21.3.1.3 美国',
          itemStyle: {
            color: '#8ec753'
          },
          label: {
            position: 'right',
            color: 'red',
            fontSize: '30px',
            fontStyle: 'normal',
            fontWeight: 'normal'
          },
        },
        {
          name: 'a1',
          itemStyle: {
            color: '#60d9ac'
          },
          label: {
            position: 'left',
            color: 'red',
            fontSize: '30px',
            fontStyle: 'normal',
            fontWeight: 'normal'
          },
        },
        {
          name: 'a2',
          itemStyle: {
            color: '#5b6e96'
          },
          label: {
            position: 'left',
            color: 'red',
            fontSize: '30px',
            fontStyle: 'normal',
            fontWeight: 'normal'
          },
        },
        {
          name: 'a3',
          itemStyle: {
            color: '#a9dffb'
          },
          label: {
            position: 'left',
            color: 'red',
            fontSize: '30px',
            fontStyle: 'normal',
            fontWeight: 'normal'
          },
        },
        {
          name: 'a4',
          itemStyle: {
            color: '#ffdd4c'
          },
          label: {
            position: 'left',
            color: 'red',
            fontSize: '30px',
            fontStyle: 'normal',
            fontWeight: 'normal'
          },
        },
        {
          name: 'a5', 
          itemStyle: {
            color: '#ff994d'
          },
          label: {
            position: 'left',
            color: 'red',
            fontSize: '30px',
            fontStyle: 'normal',
            fontWeight: 'normal'
          },
        },
        {
          name: 'a6',
          itemStyle: {
            color: '#e65a56'
          },
          label: {
            position: 'left',
            color: 'red',
            fontSize: '30px',
            fontStyle: 'normal',
            fontWeight: 'normal'
          },
        },
      ],
      links: [
        {
          source: '21.3.1.3 美国',
          target: 'a1',
          value: 7,
          lineStyle: {
            color: '#06196b'
          }
        },
        {
          source: '21.3.1.3 美国',
          target: 'a2',
          value: 4,
          lineStyle: {
            color: '#06196b'
          }
        },
        {
          source: '21.3.1.3 美国',
          target: 'a3',
          value: 3,
          lineStyle: {
            color: '#06196b'
          }
        },
              {
          source: '21.3.1.3 美国',
          target: 'a4',
          value: 3,
          lineStyle: {
            color: '#06196b'
          }
        },
        {
          source: '21.3.1.3 美国',
          target: 'a5',
          value: 3,
          lineStyle: {
            color: '#06196b'
          }
        },
        {
          source: '21.3.1.3 美国',
          target: 'a6',
          value: 10,
          lineStyle: {
            color: '#06196b'
          }
        },
      ],
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