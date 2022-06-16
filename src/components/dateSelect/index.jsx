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
  // const calendarConfig = config.find(item => item.name === 'calendarConfig').value
  // const calendarBgColor = calendarConfig.find(item => item.name === 'styleColor').value || {}
  const dateFormat = formatEnum.find(item => item.value === config.find(item => item.name === 'dateFormat').value).name
  // const textIndent = config.find(item => item.name === 'textIndent' || item.name === 'unitName').value || ''
  const textStyle = config.filter((item) => ['textStyle'].includes(item.name)).reduce((pre, cur) => {
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
  useEffect(() => {
    if (selectType === 'range') {
      handleChange([startTime ? moment(startTime, dateFormat) : null, endTime ? moment(endTime, dateFormat) : null], [startTime || null, endTime || null])
    } else {
      handleChange(startTime ? moment(startTime, dateFormat) : null, null)
    }
    const dom = ReactDOM.findDOMNode(dateRef.current);
    const inputDom = dom.querySelectorAll('input')
    inputDom.forEach(item => {
      item.style.color = textStyle.color
      item.style.fontSize = textStyle.fontSize + 'px'
    })
  }, [])

  useEffect(() => {
    const dom = ReactDOM.findDOMNode(dateRef.current);
    const inputDom = dom.querySelectorAll('input');
    const panelDom = dom.parentNode.querySelector('.ant-picker-panel-container');
    // const iconDom = dom.querySelectorAll('.ant-picker-suffix');
    [...inputDom].forEach(item => {
      item.style.color = textStyle.color
      item.style.fontSize = textStyle.fontSize + 'px'
    })
    // panelDom.style.background = calendarBgColor
  }, [textStyle])

  // useEffect(() => {
  //   console.log('textIndent', textIndent)
  // }, [textIndent])

  const onOpenChange = (open) => {
    // setTimeout(() => {
    //   const dom = ReactDOM.findDOMNode(dateRef.current);
    //   const panelDom = dom.parentNode.querySelector('.ant-picker-panel-container');
    //   panelDom.style.background = calendarBgColor
    // })
  }
  const handleChange = (date, dateString) => {
    setDateValue(date)
    if (selectType === 'range') {
      props.onChange({[fields[0]]: dateString[0], [fields[1]]: dateString[1]})
    } else {
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
        popupStyle={{ dimensionWidth}}
        showTime={dateFormat.indexOf('HH:mm:ss') !== -1}
        getPopupContainer={triggerNode => triggerNode.parentNode}
        onOpenChange={onOpenChange}
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
        allowClear={false}
        dropdownClassName="date-panel"
        onChange={handleChange}
      />
  )

}

export default DateSelect