import React, { Component, CSSProperties } from 'react';
import ComponentDefaultConfig from './config'
import * as echarts from 'echarts';

class BasicAreaChart extends Component {
  constructor(Props) {
    super(Props)
    this.echartsContainer = React.createRef();
  }
  componentDidMount() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(this.echartsContainer.current);

    // 指定图表的配置项和数据
    var option = {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          areaStyle: {}
        }
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }
  render() {
    const componentConfig = this.props.componentConfig || componentDefaultConfig
    const { config } = componentConfig
    const componentData = this.props.comData  // 过滤后的数据
    const key = this.props.fields[0]
    
    const style = config.filter((item) => item.name !== 'dimension').reduce((pre, cur) => {
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

    return (
      <div ref={this.echartsContainer} id="main" style={{width: '100%',height: '100%', ...style}}></div>
    )

  }
}

export { 
  BasicAreaChart, 
  ComponentDefaultConfig
}
export default BasicAreaChart