import React, { useEffect, useState } from 'react';
import { Cascader } from 'antd';
import ComponentDefaultConfig from './config'
import './index.less'

const CascaderComponent = (props) => {
  const [defaultValue, setDefaultValue] = useState(null)
  useEffect(() => {
    setDefaultValue(defaultSelect.split(','))
  }, []);
  /* 获取数据 */
  const componentConfig = props.componentConfig || ComponentDefaultConfig
  const { config } = componentConfig
  const { data } = componentConfig.staticData
  const finalFieldsArr = props.fields || ['value','label','children']   // 最新字段
  let originData =  props.comData || data   // 组件静态或者传入组件的数据
  if(!Array.isArray(props.comData)){
    originData=[]
  }
  const firstData = originData   // originData中有多项数据，只取第一项
  // const options = firstData[finalFieldsArr[0]]
  const fieldNames = {
    value:finalFieldsArr[0],
    label:finalFieldsArr[1],
    children:finalFieldsArr[2]
  }

  // 配置主题配置
  const componentThemeConfig = props.themeConfig
  const replaceThemeColor = (arr, colorIndex = 0) => {
    arr.forEach((item) => {
      let index = colorIndex || 0
      let { name, value, options, flag, type, key } = item
      if (item.hasOwnProperty('value')) {
        // 对 系列一栏 做特殊处理
        if (flag === 'specialItem') {
          try {
            index = key ? parseInt(key) - 1 : 0
          } catch (e) {
            index = 0
          }
        }
        if (Array.isArray(value)) {
          replaceThemeColor(value, index)
        } else {
          if (type === 'color') {
            switch (name) {
              case 'barColor':
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
          if(type === 'borderRadius' && name === 'borderHover'){
            item.value.color = componentThemeConfig.pureColors[0]
          }
          if(type === 'borderRadius' && name === 'borderFocus'){
            item.value.color = componentThemeConfig.pureColors[0]
          }
          if(type === 'chartText' && name === 'contentFont'){
            item.value.color = componentThemeConfig.textColor
          }
          if(type === 'chartText' && name === 'chartTextFont'){
            item.value.color = componentThemeConfig.textColor
          }
          if(type === 'chartText' && name === 'hoverStyleFont'){
            item.value.color = componentThemeConfig.textColor
          }
          if(type === 'chartText' && name === 'selectedStyleFont'){
            item.value.color = componentThemeConfig.pureColors[0]
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

  /* 获取config中的配置 */
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

  const {dimension,cascaderStyle} = getTargetConfig(config)
  const {
    borderStyle:{borderDefault,borderFocus,borderHover},
    contentStyle:{align:{textAlign},backgroundImg,bgColor,contentFont,tipsText},
    defaultSelect
  } = cascaderStyle['输入框']
  const {defaultStyle,hoverStyle,selectedStyle,select} = cascaderStyle['下拉框']



  const onChange = (value,selectedOptions) => {
    setDefaultValue(value)
    const data=selectedOptions.length===1 ? {
      parent:value[0],
      [fieldNames.value]:''
    }:{
      parent:value[0],
      ...selectedOptions[selectedOptions.length-1]
    }
    props.onChange&& props.onChange(data)
  };
  useEffect(() => {
    setDefaultValue(defaultSelect.split(','))
    props.onChange({
      parent:'all',
      [fieldNames.value]:''
    })
  }, []);

  return (
    <Cascader style={{
      "--borderDefaultWidth": borderDefault.width + "px",
      "--borderDefaultType": borderDefault.type,
      "--borderDefaultColor": borderDefault.color,
      "--borderDefaultRadius": borderDefault.radius + "px",
      "--borderFocusWidth": borderFocus.width + "px",
      "--borderFocusType": borderFocus.type,
      "--borderFocusColor": componentThemeConfig ? componentThemeConfig.pureColors[0] : borderFocus.color,
      "--borderFocusRadius": borderFocus.radius + "px",
      "--borderHoverWidth": borderHover.width + "px",
      "--borderHoverType": borderHover.type,
      "--borderHoverColor": componentThemeConfig ? componentThemeConfig.pureColors[0] : borderHover.color,
      "--borderHoverRadius": borderHover.radius + "px",
      "--contentStyleAlign": textAlign,
      "--contentStylebgBackground": backgroundImg ? `url(${backgroundImg})` : bgColor,
      "--contentStylebgFontFamily": contentFont.fontFamily,
      "--contentStylebgFontSize": contentFont.fontSize + "px",
      "--contentStylebgColor": componentThemeConfig ? componentThemeConfig.textColor : contentFont.color,
      "--contentStylebgFontWeight": contentFont.fontWeight,
    }}
    dropdownMenuColumnStyle={{
      "--defaultStyleBgColor": defaultStyle.bgColor,
      "--defaultStyleFontFamily": defaultStyle.chartTextFont.fontWeight,
      "--defaultStyleFontSize": defaultStyle.chartTextFont.fontSize + "px",
      "--defaultStyleFontWeight": defaultStyle.chartTextFont.fontFamily,
      "--defaultStyleColor": componentThemeConfig ? componentThemeConfig.textColor : defaultStyle.chartTextFont.color,
      "--hoverStyleBgColor": hoverStyle.bgColor,
      "--hoverStyleFontFamily": hoverStyle.hoverStyleFont.fontWeight,
      "--hoverStyleFontSize": hoverStyle.hoverStyleFont.fontSize + "px",
      "--hoverStyleFontWeight": hoverStyle.hoverStyleFont.fontFamily,
      "--hoverStyleColor": componentThemeConfig ? componentThemeConfig.textColor : hoverStyle.hoverStyleFont.color,
      "--selectedStyleBgColor": selectedStyle.bgColor,
      "--selectedStyleFontFamily": selectedStyle.selectedStyleFont.fontWeight,
      "--selectedStyleFontSize": selectedStyle.selectedStyleFont.fontSize + "px",
      "--selectedStyleFontWeight": selectedStyle.selectedStyleFont.fontFamily,
      "--selectedStyleColor": componentThemeConfig ? componentThemeConfig.pureColors[0] : selectedStyle.selectedStyleFont.color,
      "--selectWidth": select.selectWidth + "px",
      "--selectHight": select.selectHight + "px",
    }}
    options={originData}
    onChange={onChange}
    className="component-cascader"
    dropdownClassName="component-cascader-dropdown"
    placeholder={tipsText}
    allowClear={false}
    value={defaultValue}
    fieldNames={fieldNames} />
  )
}

export { CascaderComponent, ComponentDefaultConfig }
export default CascaderComponent

