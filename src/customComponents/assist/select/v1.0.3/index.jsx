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
  let scaleValue = 1;
  const scaleDivEl = document.getElementById('scaleDiv')
  if (scaleDivEl) {
    scaleValue = scaleDivEl.style.transform.replace(/[^0-9.]/ig, "")
  }

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

  const componentThemeConfig = props.themeConfig

  const replaceThemeColor = (arr, colorIndex = 0) => {
    arr.forEach((item) => {
      let index = colorIndex || 0
      let { name, value, options, flag, type, key, themeColor } = item
      if (item.hasOwnProperty('value')) {
        if (Array.isArray(value)) {
          replaceThemeColor(value, index)
        } else {
          if (themeColor) {
            switch (themeColor) {
              case 'themePureColor':
                value['color'] = componentThemeConfig.pureColors[index % 7]
                break;
              case 'themeGradientColorStart':
                value['color'] = componentThemeConfig.gradientColors[index % 7].find(item => item.offset === 0).color
                break;
              case 'themeGradientColorEnd':
                value['color'] = componentThemeConfig.gradientColors[index % 7].find(item => item.offset === 100).color
                break;
              case 'themeTextColor':
                value['color'] = componentThemeConfig.textColor
                break;
              case 'themeAssistColor':
                value['color'] = componentThemeConfig.assistColor
                break;
              case 'themeGridColor':
                value['color'] = componentThemeConfig.gridColor
                break;
              default:
                break;
            }
          }
          if (type === 'color') {
            switch (name) {
              case 'themePureColor':
                item.value = componentThemeConfig.pureColors[index % 7]
                break;
              case 'themeGradientColorStart':
                item.value = componentThemeConfig.gradientColors[index % 7].find(item => item.offset === 0).color
                break;
              case 'themeGradientColorEnd':
                item.value = componentThemeConfig.gradientColors[index % 7].find(item => item.offset === 100).color
                break;
              case 'themeTextColor':
                item.value = componentThemeConfig.textColor
                break;
              case 'themeAssistColor':
                item.value = componentThemeConfig.assistColor
                break;
              case 'themeGridColor':
                item.value = componentThemeConfig.gridColor
                break;
              default:
                break;
            }
          }
        }
      } else if (Array.isArray(options) && options.length) {
        replaceThemeColor(options, index)
      }
    })
  }
  if (componentThemeConfig) {
    const configOfTheme = JSON.parse(JSON.stringify(config))
    replaceThemeColor(configOfTheme)
    props.onThemeChange({
      id: componentConfig.id,
      name: componentConfig.name,
      moduleName: componentConfig.moduleName,
      moduleVersion: componentConfig.moduleVersion,
      config: configOfTheme
    })
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
      "--borderFocusColor": input.borderStyle.themePureColor || "#40a9ff",
      "--borderHoverWidth": input.borderStyle.borderHover.width + 'px',
      "--borderHoverType": input.borderStyle.borderHover.type,
      "--borderHoverColor": input.borderStyle.borderHover.color || '#40a9ff',
      "--borderHoverRadius": input.borderStyle.borderHover.radius + 'px',
      "--inputAlign": input.contentStyle.align.textAlign,
      "--inputBg": input.contentStyle.backgroundImg ? `url(${input.contentStyle.backgroundImg})` : input.contentStyle.bgColor,
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
      "--itemSelectedBgc": options.selectedStyle.themePureColor || '#e6f7ff',
      "--itemSelectedColor": options.selectedStyle.font.color || '#000000',
      "--itemSelectedFontFamily": options.selectedStyle.font.fontFamily,
      "--itemSelectedFontSize": options.selectedStyle.font.fontSize + 'px',
      "--itemSelectedFontWeight": options.selectedStyle.font.fontWeight,
      "--scaleValue": scaleValue,
      "--width": style.dimension.width * scaleValue + 'px',
      "--top": (style.dimension.height + style.dimension.top + options.select.marginTop) * scaleValue + 'px',
      "--scale": scaleValue,
    }}
    dropdownClassName="component-select-dropdown"
    className="component-select"
    placeholder={input.contentStyle.tipsText}
    value={defaultValue}
    onChange={handleChange}>
    {componentData && Array.isArray(componentData) && componentData.map((item, index) => {
      return <Option key={index} value={item[fieldKey]}>{item[fieldKey]}</Option>
    })}
  </Select>)
}

export { ComSelect, ComponentDefaultConfig }
export default ComSelect