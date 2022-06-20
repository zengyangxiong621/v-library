import React, { Component } from 'react';
import componentDefaultConfig from './config'
import './index.css'

import { Select } from 'antd';
const { Option } = Select;
class ComSelect extends Component {
  constructor(Props) {
    super(Props)
  }
  render() {
    const componentConfig = this.props.componentConfig || componentDefaultConfig
    const { config } = componentConfig
    const componentData = this.props.comData  // 过滤后的数据
    const fieldKey = this.props.fields[0]
    let defaultValue = null

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

    console.log('style', style)

    const handleChange = value => {
      const data = componentData.filter(item => {
        return item[fieldKey] === value
      })
      this.props.onChange(data[0])
    }

    // 处理默认选中
    const comDataLength = componentData?.length || 0
    if (comDataLength) {
      // 如果默认选中项大于数据的长度，则取第一项，否则取默认项
      const index = style.defaultSelect > comDataLength ? 0 : style.defaultSelect - 1
      defaultValue = componentData[index][fieldKey]
      // 初始化时向上传递当前数据
      handleChange(defaultValue)
    }

    return (
      <Select dropdownClassName="component-select-dropdown"
        className="component-select"
        defaultValue={defaultValue}
        onChange={handleChange}>
        {componentData && componentData.map((item, index) => {
          return <Option key={index} value={item[fieldKey]}>{item[fieldKey]}</Option>
        })}
      </Select>
    )
  }
}

export { ComSelect }
export default ComSelect