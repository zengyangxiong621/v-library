import React, { useEffect, useState } from 'react'
import ComponentDefaultConfig from './config'
import './index.css'

import { Select } from 'antd';
const { Option } = Select;


const ComSelect = (props) => {
  const componentConfig = props.componentConfig || ComponentDefaultConfig
  const { config } = componentConfig
  const componentData = props.comData  // 过滤后的数据
  const fieldKey = props.fields[0]
  const [defaultValue, setDefaultValue] = useState(null)

  const getStyle = (config, isOptions = false) => {
    const result = {}
    if (Array.isArray(config)) {
      config.forEach(item => {
        if (item.hasOwnProperty("value")) {
          if (Array.isArray(item.value)) {
            result[isOptions ? item.key : item.name] = getStyle(item.value)
          } else {
            result[isOptions ? item.key : item.name] = item.value
          }
        } else if (item.hasOwnProperty("options")) {
          result[isOptions ? item.key : item.name] = getStyle(item.options, true)
        }
      })
    } else {
      return result
    }
    return result
  }

  const style = getStyle(config)
  const { input, options } = style.selectStyle

  useEffect(() => {
    // 处理默认选中
    const comDataLength = componentData?.length || 0
    if (comDataLength) {
      // 如果默认选中项大于数据的长度，则取第一项，否则取默认项
      const defaultSelect = input.defaultSelect
      const index = defaultSelect > comDataLength ? 0 : defaultSelect - 1
      setDefaultValue(componentData[index][fieldKey])
      handleChange(componentData[index][fieldKey])
    }
  }, [])

  const handleChange = value => {
    const data = componentData.filter(item => {
      return item[fieldKey] === value
    })
    setDefaultValue(value)
    props.onChange && props.onChange(data[0])
  }


  return (<Select
    style={{
      "--borderWidth": input.borderStyle.borderDefault.width + 'px',
      "--borderType": input.borderStyle.borderDefault.type,
      "--borderColor": input.borderStyle.borderDefault.color,
      "--borderRadius": input.borderStyle.borderDefault.radius + 'px',
      "--borderFocusColor": input.borderStyle.borderFocus,
      "--borderHoverWidth": input.borderStyle.borderHover.width + 'px',
      "--borderHoverType": input.borderStyle.borderHover.type,
      "--borderHoverColor": input.borderStyle.borderHover.color,
      "--borderHoverRadius": input.borderStyle.borderHover.radius + 'px',
      "--inputAlign": input.contentStyle.align.textAlign,
      "--inputBgc": input.contentStyle.bgColor,
      "--inputColor": input.contentStyle.contentFont.color,
      "--inputFontFamily": input.contentStyle.contentFont.fontFamily,
      "--inputFontSize": input.contentStyle.contentFont.fontSize + 'px',
      "--inputFontWeight": input.contentStyle.contentFont.fontWeight,
    }}
    dropdownStyle={{
      "--optionsHeight": options.select.selectHight + 'px',
      "--optionsMarginTop": options.select.marginTop + 'px',
      "--itemHeight": options.options.optionHight + 'px',
      "--itemTextIndent": options.options.textIndent + 'px',
      "--itemMarginBottom": options.options.marginBottom + 'px',
      "--itemBgc": options.defaultStyle.bgColor,
      "--itemColor": options.defaultStyle.font.color,
      "--itemFontFamily": options.defaultStyle.font.fontFamily,
      "--itemFontSize": options.defaultStyle.font.fontSize + 'px',
      "--itemFontWeight": options.defaultStyle.font.fontWeight,
      "--itemActiveBgc": options.hoverStyle.bgColor,
      "--itemActiveColor": options.hoverStyle.font.color,
      "--itemActiveFontFamily": options.hoverStyle.font.fontFamily,
      "--itemActiveFontSize": options.hoverStyle.font.fontSize + 'px',
      "--itemActiveFontWeight": options.hoverStyle.font.fontWeight,
      "--itemSelectedBgc": options.selectedStyle.bgColor,
      "--itemSelectedColor": options.selectedStyle.font.color,
      "--itemSelectedFontFamily": options.selectedStyle.font.fontFamily,
      "--itemSelectedFontSize": options.selectedStyle.font.fontSize + 'px',
      "--itemSelectedFontWeight": options.selectedStyle.font.fontWeight,
    }}
    dropdownClassName="component-select-dropdown"
    className="component-select"
    placeholder={input.contentStyle.tipsText}
    value={defaultValue}
    onChange={handleChange}>
    {componentData && componentData.map((item, index) => {
      return <Option key={index} value={item[fieldKey]}>{item[fieldKey]}</Option>
    })}
  </Select>)
}

export { ComSelect, ComponentDefaultConfig }
export default ComSelect