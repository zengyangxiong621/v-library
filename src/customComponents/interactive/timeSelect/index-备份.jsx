import React, { Component, CSSProperties, useEffect, useRef, useState } from 'react'
import ComponentDefaultConfig from './config'
import { DatePicker } from 'antd'
import ReactDOM from 'react-dom'
import moment from 'moment'
import { styleTransformFunc } from '../../utils'
// import './index.less'
const { RangePicker } = DatePicker
const formatEnum = [
  {
    'name': 'YYYY-MM-DD HH:mm:ss',
    'value': '1',
  },
  {
    'name': 'YYYY-MM-DD',
    'value': '2',
  },
  {
    'name': 'HH:mm:ss',
    'value': '3',
  },
  {
    'name': 'YYYY/MM/DD HH:mm:ss',
    'value': '4',
  },
  {
    'name': 'YYYY/MM/DD',
    'value': '5',
  },
]

const TimeSelect = (props) => {
  const [dateValue, setDateValue] = useState(null)
  const dateRef = useRef(null)
  const componentConfig = props.componentConfig
  const { config } = componentConfig
  const componentData = props.comData || [{
    'startTime': '',
    'endTime': '',
  }]

  const fields = props.fields
  const dateData = componentData[0] || {
    'startTime': '',
    'endTime': '',
  }
  const startTime = dateData[fields[0]] || null
  const endTime = dateData[fields[1]] || null
  const dimensionConfig = config.find(item => item.name === 'dimension').value
  const dimensionWidth = dimensionConfig.find(item => item.name === 'width').value
  const allGlobalConfig = config.find(item => item.name === 'allGlobal').value
  const selectorConfig = config.find(item => item.name === 'selector').value
  const selectType = allGlobalConfig.find(item => item.name === 'selectType').value
  const pickerType = allGlobalConfig.find(item => item.name === 'pickerType').value
  const selectBgColor = selectorConfig.find(item => item.name === 'selectBgColor').value
  const selectBorderColor = selectorConfig.find(item => item.name === 'selectBorderColor').value
  console.log('selectBorderColor', selectBorderColor)
  const calendarConfig = config.find(item => item.name === 'calendarBox').value
  const calendarBgColor = calendarConfig.find(item => item.name === 'bgColor').value
  const calendarCellsThemeColor = calendarConfig.find(item => item.name === 'themeColor').value
  const dateFormat = formatEnum.find(item => item.value === allGlobalConfig.find(item => item.name === 'dateFormat').value).name
  // const textIndent = config.find(item => item.name === 'textIndent' || item.name === 'unitName').value || ''
  let textStyle = selectorConfig.filter((item) => ['textStyle'].includes(item.name))
  let calendarBoxTextStyle = calendarConfig.find(item => item.name === 'textStyle').value
  textStyle = styleTransformFunc(textStyle)
  calendarBoxTextStyle = styleTransformFunc(calendarBoxTextStyle)
  /*
  {
    "fontFamily": "Microsoft Yahei",
    "fontSize": 16,
    "color": "#fff",
    "bold": false,
    "italic": false,
    "letterSpacing": 0,
    "lineHeight": 0
  }
  * */
  useEffect(() => {
    if (selectType === 'range') {
      handleChange([startTime ? moment(startTime, dateFormat) : null, endTime ? moment(endTime, dateFormat) : null], [startTime || null, endTime || null])
    } else {
      handleChange(startTime ? moment(startTime, dateFormat) : null, null)
    }
    const dom = ReactDOM.findDOMNode(dateRef.current)
    const inputDom = dom.querySelectorAll('input')
    const svgDom = dom.querySelectorAll('svg')
    setTimeout(() => {
      const cAntPickerSeparator = dom.querySelector('.ant-picker-separator')
      cAntPickerSeparator.style.height = 'unset'
      cAntPickerSeparator.style.width = 'unset'
      // console.log('cAntPickerSeparator', cAntPickerSeparator)
    })

    ;[...inputDom, ...svgDom].forEach(item => {
      Object.keys(textStyle).forEach(key => {
        item.style[key] = textStyle[key]
      })
    })
  }, [])

  useEffect(() => {
    const dom = ReactDOM.findDOMNode(dateRef.current)
    const inputDom = dom.querySelectorAll('input');
    [...inputDom].forEach(item => {
      item.style.color = textStyle.color
      item.style.fontSize = textStyle.fontSize + 'px'
    })

  }, [textStyle])

  // useEffect(() => {
  //   console.log('textIndent', textIndent)
  // }, [textIndent])

  const onOpenChange = (open) => {
    setTimeout(() => {
      const dom = ReactDOM.findDOMNode(dateRef.current)
      const panelDom = dom.parentNode.querySelector('.ant-picker-panel-container')
      const cAntPickerCellInner = dom.parentNode.querySelectorAll('.ant-picker-cell-in-view')
      const cAntPickerContent = dom.parentNode.querySelectorAll('.ant-picker-content th')
      const cAntPickerHeaderButtons = dom.parentNode.querySelectorAll('.ant-picker-header button')
      const allCellsBefore = dom.parentNode.querySelectorAll('.ant-picker-cell-in-view.ant-picker-cell-in-range')
      ;[...cAntPickerCellInner, ...cAntPickerContent].forEach(item => {
        Object.keys(calendarBoxTextStyle).forEach(key => {
          item.style[key] = calendarBoxTextStyle[key]
        })
      })
      // console.log('allCellsBefore', allCellsBefore)
      ;[...allCellsBefore].forEach(item => {
        Object.keys(calendarBoxTextStyle).forEach(key => {
          // console.log('item.before', item.attributes[1].value)
          // console.log('item.after', item.attributes[2].value)
          // console.log('item.attributes', item.attributes)
        })
      })
      ;[...cAntPickerHeaderButtons].forEach(item => {
        item.style.color = calendarBoxTextStyle.color
        item.style.fontStyle = calendarBoxTextStyle.fontStyle
        item.style.fontWeight = calendarBoxTextStyle.fontWeight
        item.style.fontSize = calendarBoxTextStyle.fontSize
      })
      panelDom.style.background = calendarBgColor
      // console.log('calendarCellsThemeColor', calendarCellsThemeColor)
    })
  }
  const onPanelChange = (open) => {
    setTimeout(() => {
      const dom = ReactDOM.findDOMNode(dateRef.current)
      const panelDom = dom.parentNode.querySelector('.ant-picker-panel-container')
      const cAntPickerCellInner = dom.parentNode.querySelectorAll('.ant-picker-cell-in-view')
      const cAntPickerContent = dom.parentNode.querySelectorAll('.ant-picker-content th')
      const cAntPickerHeaderButtons = dom.parentNode.querySelectorAll('.ant-picker-header button')
      const allCellsBefore = dom.parentNode.querySelectorAll('.ant-picker-cell-in-view.ant-picker-cell-in-range::before')
      ;[...cAntPickerCellInner, ...cAntPickerContent].forEach(item => {
        Object.keys(calendarBoxTextStyle).forEach(key => {
          item.style[key] = calendarBoxTextStyle[key]
        })
      })
      ;[...allCellsBefore].forEach(item => {
        Object.keys(calendarBoxTextStyle).forEach(key => {
          item.style.background = 'pink'
        })
      })
      ;[...cAntPickerHeaderButtons].forEach(item => {
        item.style.color = calendarBoxTextStyle.color
        item.style.fontStyle = calendarBoxTextStyle.fontStyle
        item.style.fontWeight = calendarBoxTextStyle.fontWeight
        item.style.fontSize = calendarBoxTextStyle.fontSize
      })
      panelDom.style.background = calendarBgColor
      // console.log('calendarCellsThemeColor', calendarCellsThemeColor)
    })
  }
  const handleChange = (date, dateString) => {
    setDateValue(date)
    if (selectType === 'range') {
      props.onChange && props.onChange({ [fields[0]]: dateString[0], [fields[1]]: dateString[1] })
    } else {
      props.onChange && props.onChange({ [fields[0]]: dateString })
    }
  }

  return (
    <div
      className="time-select-wrap"
      ref={ dateRef }
      style={ { width: '100%', height: '100%' } }
    > {
      selectType === 'range' ?
        <RangePicker
          value={ dateValue }
          picker={ pickerType }
          format={ dateFormat }
          style={ { width: '100%', height: '100%', background: selectBgColor, border: `1px solid ${selectBorderColor}` } }
          popupStyle={ { dimensionWidth } }
          showTime={ dateFormat.indexOf('HH:mm:ss') !== -1 }
          getPopupContainer={ triggerNode => triggerNode.parentNode }
          onOpenChange={ onOpenChange }
          onPanelChange={ onPanelChange }
          allowClear={ false }
          dropdownClassName="date-panel"
          onChange={ handleChange }
        /> : <DatePicker
          value={ dateValue }
          picker={ pickerType }
          format={ dateFormat }
          style={ { width: '100%', height: '100%', background: selectBgColor, border: `1px solid ${selectBorderColor}` } }
          showTime={ dateFormat.indexOf('HH:mm:ss') !== -1 }
          getPopupContainer={ triggerNode => triggerNode.parentNode }
          onOpenChange={ onOpenChange }
          onPanelChange={ onPanelChange }
          allowClear={ false }
          dropdownClassName="date-panel"
          onChange={ handleChange }
        />
    }
    </div>
  )
}

export default TimeSelect
