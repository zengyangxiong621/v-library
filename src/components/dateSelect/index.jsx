import React, {Component, CSSProperties, useEffect, useRef, useState} from 'react';
import ComponentDefaultConfig from './config'
import {DatePicker} from 'antd';
import ReactDOM from 'react-dom';
import moment from 'moment';
// import './index.less'
const {RangePicker} = DatePicker;
const formatEnum = [
  {
    "name": "YYYY-MM-DD HH:mm:ss",
    "value": "1"
  },
  {
    "name": "YYYY-MM-DD",
    "value": "2"
  },
  {
    "name": "HH:mm:ss",
    "value": "3"
  },
  {
    "name": "YYYY/MM/DD HH:mm:ss",
    "value": "4"
  },
  {
    "name": "YYYY/MM/DD",
    "value": "5"
  },
]

const DateSelect = (props) => {
  const [dateValue, setDateValue] = useState(null)
  const dateRef = useRef(null)
  const componentConfig = props.componentConfig || componentDefaultConfig
  const {config} = componentConfig
  const componentData = props.comData || [{
    "startTime": "",
    "endTime": ""
  }]

  const fields = props.fields
  const dateData = componentData[0] || {
    "startTime": "",
    "endTime": ""
  }
  const startTime = dateData[fields[0]] || null
  const endTime = dateData[fields[1]] || null
  const dimensionConfig = config.find(item => item.name === 'dimension').value
  const dimensionWidth = dimensionConfig.find(item => item.name === 'width').value
  const selectType = config.find(item => item.name === 'selectType').value
  const pickerType = config.find(item => item.name === 'pickerType').value
  const selectBg = config.find(item => item.name === 'selectBgColor').value
  const calendarConfig = config.find(item => item.name === 'calendarBox').value
  const calendarBgColor = calendarConfig.find(item => item.name === 'bgColor').value
  const calendarCellsThemeColor = calendarConfig.find(item => item.name === 'themeColor').value
  const dateFormat = formatEnum.find(item => item.value === config.find(item => item.name === 'dateFormat').value).name
  // const textIndent = config.find(item => item.name === 'textIndent' || item.name === 'unitName').value || ''
  let textStyle = config.filter((item) => ['textStyle'].includes(item.name)).reduce((pre, cur) => {
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
  let calendarBoxTextStyle = calendarConfig.find(item => item.name === 'textStyle').value.reduce((pre, cur) => {
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
  const styleTransformFuncList = {
    fontFamily: (value) => ({
      fontFamily: value
    }),
    fontSize: (value) => ({
      fontSize: value + 'px'
    }),
    color: (value) => ({
      color: value
    }),
    bold: (value) => ({
      fontWeight: value ? 'bold' : 'unset'
    }),
    italic: (value) => ({
      fontStyle: value ? 'italic' : 'unset'
    }),
    letterSpacing: (value) => ({
      letterSpacing: value + 'px'
    }),
    lineHeight: (value) => ({
      lineHeight: value ? value + 'px' : 'unset'
    }),
  }
  textStyle = Object.keys(textStyle).reduce((pre, cur) => {
    return {
      ...pre,
      ...styleTransformFuncList[cur](textStyle[cur])
    }
  }, {})
  calendarBoxTextStyle = Object.keys(calendarBoxTextStyle).reduce((pre, cur) => {
    return {
      ...pre,
      ...styleTransformFuncList[cur](calendarBoxTextStyle[cur])
    }
  }, {})
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
  // console.log('calendarBoxTextStyle', calendarBoxTextStyle)
  //
  // console.log('textStyle', textStyle)
  useEffect(() => {
    if (selectType === 'range') {
      handleChange([startTime ? moment(startTime, dateFormat) : null, endTime ? moment(endTime, dateFormat) : null], [startTime || null, endTime || null])
    } else {
      handleChange(startTime ? moment(startTime, dateFormat) : null, null)
    }
    const dom = ReactDOM.findDOMNode(dateRef.current);
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
    const dom = ReactDOM.findDOMNode(dateRef.current);
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
      const dom = ReactDOM.findDOMNode(dateRef.current);
      const panelDom = dom.parentNode.querySelector('.ant-picker-panel-container');
      const cAntPickerCellInner = dom.parentNode.querySelectorAll('.ant-picker-cell-in-view');
      const cAntPickerContent = dom.parentNode.querySelectorAll('.ant-picker-content th');
      const cAntPickerHeaderButtons = dom.parentNode.querySelectorAll('.ant-picker-header button');
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
      const dom = ReactDOM.findDOMNode(dateRef.current);
      const panelDom = dom.parentNode.querySelector('.ant-picker-panel-container');
      const cAntPickerCellInner = dom.parentNode.querySelectorAll('.ant-picker-cell-in-view');
      const cAntPickerContent = dom.parentNode.querySelectorAll('.ant-picker-content th');
      const cAntPickerHeaderButtons = dom.parentNode.querySelectorAll('.ant-picker-header button');
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
      console.log('range', {[fields[0]]: dateString[0], [fields[1]]: dateString[1]})
      props.onChange({[fields[0]]: dateString[0], [fields[1]]: dateString[1]})
    } else {
      console.log('notRange', {[fields[0]]: dateString})
      props.onChange({[fields[0]]: dateString})
    }
  }

  return (
    selectType === 'range' ?
      <RangePicker
        ref={dateRef}
        value={dateValue}
        picker={pickerType}
        format={dateFormat}
        style={{width: '100%', height: '100%', background: selectBg, color: 'red'}}
        popupStyle={{dimensionWidth}}
        showTime={dateFormat.indexOf('HH:mm:ss') !== -1}
        getPopupContainer={triggerNode => triggerNode.parentNode}
        onOpenChange={onOpenChange}
        onPanelChange={onPanelChange}
        allowClear={false}
        dropdownClassName="date-panel"
        onChange={handleChange}
      /> : <DatePicker
        ref={dateRef}
        value={dateValue}
        picker={pickerType}
        format={dateFormat}
        style={{width: '100%', height: '100%', background: selectBg, color: 'red'}}
        showTime={dateFormat.indexOf('HH:mm:ss') !== -1}
        getPopupContainer={triggerNode => triggerNode.parentNode}
        onOpenChange={onOpenChange}
        onPanelChange={onPanelChange}
        allowClear={false}
        dropdownClassName="date-panel"
        onChange={handleChange}
      />
  )

}

export default DateSelect