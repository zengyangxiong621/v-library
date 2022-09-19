import React, { useEffect, useState } from 'react';
import { Cascader } from 'antd';
import ComponentDefaultConfig from './config'
import './index.css'

const CascaderComponent = (props) => {
  const [defaultValue, setDefaultValue] = useState(null)
  useEffect(() => {
    setDefaultValue(defaultSelect.split(','))
  }, []);
  /* 获取数据 */
  const componentConfig = props.componentConfig || ComponentDefaultConfig
  const { config } = componentConfig
  const { data } = componentConfig.staticData
  const finalFieldsArr = props.fields || ['value1','label1','children1']   // 最新字段
  const originData = props.comData || data   // 组件静态或者传入组件的数据
  const firstData = originData   // originData中有多项数据，只取第一项
  // const options = firstData[finalFieldsArr[0]]
  const fieldNames = {
    value:finalFieldsArr[0],
    label:finalFieldsArr[1],
    children:finalFieldsArr[2]
  }
  console.log(originData)
  console.log(fieldNames)
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



  const onChange = (value) => {
    setDefaultValue(value)
  };

  return (
    <Cascader style={{
      "--borderDefaultWidth": borderDefault.width + "px",
      "--borderDefaultType": borderDefault.type,
      "--borderDefaultColor": borderDefault.color,
      "--borderDefaultRadius": borderDefault.radius + "px",
      "--borderFocusWidth": borderFocus.width + "px",
      "--borderFocusType": borderFocus.type,
      "--borderFocusColor": borderFocus.color,
      "--borderFocusRadius": borderFocus.radius + "px",
      "--borderHoverWidth": borderHover.width + "px",
      "--borderHoverType": borderHover.type,
      "--borderHoverColor": borderHover.color,
      "--borderHoverRadius": borderHover.radius + "px",
      "--contentStyleAlign": textAlign,
      "--contentStylebgBackground": backgroundImg ? `url(${backgroundImg})` : bgColor,
      "--contentStylebgFontFamily": contentFont.fontFamily,
      "--contentStylebgFontSize": contentFont.fontSize + "px",
      "--contentStylebgColor": contentFont.color,
      "--contentStylebgFontWeight": contentFont.fontWeight,
    }}
    dropdownMenuColumnStyle={{
      "--defaultStyleBgColor": defaultStyle.bgColor,
      "--defaultStyleFontFamily": defaultStyle.font.fontWeight,
      "--defaultStyleFontSize": defaultStyle.font.fontSize + "px",
      "--defaultStyleFontWeight": defaultStyle.font.fontFamily,
      "--defaultStyleColor": defaultStyle.font.color,
      "--hoverStyleBgColor": hoverStyle.bgColor,
      "--hoverStyleFontFamily": hoverStyle.font.fontWeight,
      "--hoverStyleFontSize": hoverStyle.font.fontSize + "px",
      "--hoverStyleFontWeight": hoverStyle.font.fontFamily,
      "--hoverStyleColor": hoverStyle.font.color,
      "--selectedStyleBgColor": selectedStyle.bgColor,
      "--selectedStyleFontFamily": selectedStyle.font.fontWeight,
      "--selectedStyleFontSize": selectedStyle.font.fontSize + "px",
      "--selectedStyleFontWeight": selectedStyle.font.fontFamily,
      "--selectedStyleColor": selectedStyle.font.color,
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

