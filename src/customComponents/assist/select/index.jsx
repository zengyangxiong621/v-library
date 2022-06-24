import React, { useEffect, useState } from 'react'
import componentDefaultConfig from './config'
import './index.css'

import { Select } from 'antd';
const { Option } = Select;


const ComSelect = (props) => {
  const componentConfig = props.componentConfig || componentDefaultConfig
  const { config } = componentConfig
  const componentData = props.comData  // 过滤后的数据
  const fieldKey = props.fields[0]
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
  const [defaultValue, setDefaultValue] = useState(null)

  useEffect(() => {
    // 处理默认选中
    const comDataLength = componentData?.length || 0
    if (comDataLength) {
      // 如果默认选中项大于数据的长度，则取第一项，否则取默认项
      const index = style.defaultSelect > comDataLength ? 0 : style.defaultSelect - 1
      setDefaultValue(componentData[index][fieldKey])
      handleChange(componentData[index][fieldKey])
    }
  }, [])

  const handleChange = value => {
    const data = componentData.filter(item => {
      return item[fieldKey] === value
    })
    props.onChange && props.onChange(data[0])
  }


  return (<Select dropdownClassName="component-select-dropdown"
                  className="component-select"
                  defaultValue={defaultValue}
                  onChange={handleChange}>
    {componentData && componentData.map((item, index) => {
      return <Option key={index} value={item[fieldKey]}>{item[fieldKey]}</Option>
    })}
  </Select>)
}

export { ComSelect, componentDefaultConfig }
export default ComSelect