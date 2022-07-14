import React, { Component, CSSProperties } from 'react';
import componentDefaultConfig from './config'
import './index.css'


class Counter extends Component {
  constructor(Props) {
    super(Props)
  }
  render () {
    const { comData,fields } = this.props
    const componentConfig = this.props.componentConfig || componentDefaultConfig
    const {config, staticData} = componentConfig
    // 组件静态或者传入组件的数据
    // let originData = comData || staticData.data
    let originData = staticData.data

    return (
      <div>
        数据内容
      </div>
    )

  }
}

export { Counter }
export default Counter