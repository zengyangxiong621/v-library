import React, { useEffect, useState } from 'react';
import ComponentDefaultConfig from './config'
import './index.less'

const ButtonGroup = (props) => {
  const componentConfig = props.componentConfig || ComponentDefaultConfig
  const { config } = componentConfig
  const componentData = props.comData  // 过滤后的数据
  const fieldKey = props.fields[0]
  const [active, setActive] = useState(1)
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

  const handleChange = value => {
    const data = componentData.filter(item => {
      return item[fieldKey] === value
    })
    props.onChange && props.onChange(data[0])
  }

  useEffect(() => {
    // 处理默认选中
    const comDataLength = componentData?.length || 0
    if (comDataLength) {
      // 如果默认选中项大于数据的长度，则取第一项，否则取默认项
      const index = style.defaultSelect > comDataLength ? 0 : style.defaultSelect - 1
      setActive(index + 1)
      handleChange(componentData[index][fieldKey])
    }
  }, [])

  const handleClick = (index) => {
    setActive(index + 1)
    props.onChange && props.onChange(componentData[index])
  }

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      "--defaultBorder": `${style.defaultBorder.width}px ${style.defaultBorder.type} ${style.defaultBorder.color}`,
      "--defalutBgc": style.defaultBgImg ? `url(${style.defaultBgImg})` : style.defaultBgColor,
      "--defalutColor": style.defaultFont.color,
      "--defalutFontFamily": style.defaultFont.fontFamily,
      "--defalutFontSize": style.defaultFont.fontSize + 'px',
      "--defalutFontWeight": style.defaultFont.fontWeight,
      "--selectedBorder": `${style.selectedBorder.width}px ${style.selectedBorder.type} ${style.selectedBorder.color}`,
      "--selectedBgc": style.selectedBgImg ? `url(${style.selectedBgImg})` : style.themePureColor || "#fff",
      "--selectedColor": style.selectedFont.color,
      "--selectedFontFamily": style.selectedFont.fontFamily,
      "--selectedFontSize": style.selectedFont.fontSize + 'px',
      "--selectedFontWeight": style.selectedFont.fontWeight,
    }}>
      {componentData && Array.isArray(componentData) && componentData.map((item, index) => {
        return <button
          style={{ flex: (1 / componentData.length).toFixed(2) }}
          onClick={() => handleClick(index)}
          className={["cus-component-button-group-btn", index + 1 === active ? "active" : null].join(' ')}
        >{item[fieldKey]}</button>
      })
      }
    </div>
  )
}

export { ButtonGroup, ComponentDefaultConfig }
export default ButtonGroup