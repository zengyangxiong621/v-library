import React, { Component, CSSProperties, useEffect, useRef, useState, useMemo } from 'react'
import ComponentDefaultConfig from './config'
import { DatePicker } from 'antd'
import ReactDOM from 'react-dom'
import moment from 'moment'
import { styleTransformFunc } from '@/utils'
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
  const scale = props.scale
  const [dateValue, setDateValue] = useState(null)
  const [rangeValue, setRangeValue] = useState(null)
  const [isCalendarOpened, setIsCalendarOpened] = useState(false)
  const dateRef = useRef(null)
  const componentConfig = props.componentConfig
  const { config } = componentConfig
  const componentData = props.comData || [{
    'startTime': '',
    'endTime': '',
  }]

  const _fields = props.fields
  const themeConfig = props.themeConfig
  const dateData = componentData[0] || {
    'startTime': '',
    'endTime': '',
  }
  const startTime = dateData[_fields[0]] || null
  const endTime = dateData[_fields[1]] || null
  const dimensionConfig = config.find(item => item.name === 'dimension').value
  const dimensionWidth = dimensionConfig.find(item => item.name === 'width').value
  const dimensionHeight = dimensionConfig.find(item => item.name === 'height').value
  const allGlobalConfig = config.find(item => item.name === 'allGlobal').value
  const selectorConfig = config.find(item => item.name === 'selector').value
  const selectType = allGlobalConfig.find(item => item.name === 'selectType').value
  const pickerType = allGlobalConfig.find(item => item.name === 'pickerType').value
  const selectBgColor = selectorConfig.find(item => item.name === 'selectBgColor').value
  const selectBorderColor = selectorConfig.find(item => item.name === 'selectBorderColor').value
  // const calendarConfig = config.find(item => item.name === 'calendarBox').value
  // const calendarBgColor = calendarConfig.find(item => item.name === 'bgColor').value
  const dateFormat = formatEnum.find(item => item.value === allGlobalConfig.find(item => item.name === 'dateFormat').value).name
  // const textIndent = config.find(item => item.name === 'textIndent' || item.name === 'unitName').value || ''
  let textStyleConfig = selectorConfig.filter((item) => ['textStyle'].includes(item.name))
  // let calendarBoxTextStyleConfig = calendarConfig.find(item => item.name === 'textStyle').value
  let textStyle = useMemo(() => {
    return styleTransformFunc(textStyleConfig)
  }, [textStyleConfig])
  // let calendarBoxTextStyle = useMemo(() => {
  //   return styleTransformFunc(calendarBoxTextStyleConfig)
  // }, [calendarBoxTextStyleConfig])
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
  }, [])

  useEffect(() => {
    if (selectType === 'range') {
      console.log('[startTime ? moment(startTime, dateFormat) : null, endTime ? moment(endTime, dateFormat) : null]', [startTime ? moment(startTime, dateFormat) : null, endTime ? moment(endTime, dateFormat) : null])
      setRangeValue([startTime ? moment(startTime, dateFormat) : null, endTime ? moment(endTime, dateFormat) : null])
    } else {
      setDateValue(startTime ? moment(startTime, dateFormat) : null)
    }
  }, [selectType, startTime, endTime])

  useEffect(() => {
    const dom = ReactDOM.findDOMNode(dateRef.current)
    const inputDom = dom.querySelectorAll('input')
    const separatorDom = dom.querySelectorAll('.ant-picker-range-separator')
    const svgDom = dom.querySelectorAll('svg')
    ;[...inputDom, ...svgDom, ...separatorDom].forEach(item => {
      item.style.textAlign = 'center'
      Object.keys(textStyle).forEach(key => {
        item.style[key] = textStyle[key]
      })
    })
  }, [textStyle])

  // useEffect(() => {
  //   console.log('textIndent', textIndent)
  // }, [textIndent])

  const onOpenChange = (open) => {
    setTimeout(() => {
      const dom = ReactDOM.findDOMNode(dateRef.current)
      const parentDom = dom.parentNode
      console.log('parentDom', parentDom)
      const antPickerDropdownDom = parentDom.querySelector('.ant-picker-dropdown')
      const dropdownDomParentDom = antPickerDropdownDom.parentNode
      const cAntPickerRangeWrapper = antPickerDropdownDom.firstChild
      console.log('cAntPickerRangeWrapper', cAntPickerRangeWrapper)
      const dropdownArrowDom = parentDom.querySelector('.ant-picker-range-arrow')
      const panelDom = parentDom.querySelector('.ant-picker-panel-container')
      const cAntPickerCellInner = parentDom.querySelectorAll('.ant-picker-cell-in-view')
      const cAntPickerContent = parentDom.querySelectorAll('.ant-picker-content th')
      const cAntPickerHeaderButtons = parentDom.querySelectorAll('.ant-picker-header button')
      const cAntPickerHeaderViews = parentDom.querySelectorAll('.ant-picker-header-view')
      const cAntPickerTimePanelCellInners = parentDom.querySelectorAll('.ant-picker-time-panel-cell-inner')
      const allCellsBefore = parentDom.querySelectorAll('.ant-picker-cell-in-view.ant-picker-cell-in-range::before')
      // dropdownDomParentDom.style.transform = `scale(${scale})`
      // console.log('antPickerDropdownDom', antPickerDropdownDom.style.left.replace('px', ''))
      // console.log('antPickerDropdownDom', antPickerDropdownDom.style.left)
      // // 下拉面板的位置
      setTimeout(() => {
        if (dropdownArrowDom) {
          dropdownArrowDom.style.display = 'none'
        }
        cAntPickerRangeWrapper.style.position = 'absolute'
        cAntPickerRangeWrapper.style.left = -Number(antPickerDropdownDom.style.left.replace('px', '')) + 'px'
        cAntPickerRangeWrapper.style.top = -Number(antPickerDropdownDom.style.left.replace('px', '')) + 10 / scale + 'px'
        console.log('cAntPickerRangeWrapper', cAntPickerRangeWrapper)
      })
      // ;[...cAntPickerCellInner, ...cAntPickerContent].forEach(item => {
      //   Object.keys(calendarBoxTextStyle).forEach(key => {
      //     item.style[key] = calendarBoxTextStyle[key]
      //   })
      // })
      // ;[...allCellsBefore].forEach(item => {
      //   Object.keys(calendarBoxTextStyle).forEach(key => {
      //     item.style.background = 'pink'
      //   })
      // })
      // ;[...cAntPickerHeaderButtons, ...cAntPickerHeaderViews, ...cAntPickerTimePanelCellInners].forEach(item => {
      //   item.style.color = calendarBoxTextStyle.color
      //   item.style.fontStyle = calendarBoxTextStyle.fontStyle
      //   item.style.fontWeight = calendarBoxTextStyle.fontWeight
      //   item.style.fontSize = calendarBoxTextStyle.fontSize
      // })
      // panelDom.style.background = calendarBgColor
      setIsCalendarOpened(true)
    })
  }
  const handleChange = (date, dateString) => {
    console.log('date', date)
    console.log('dateString', dateString)
    const fields2ValueMap = {}
    const initFields = ['startTime', 'endTime'] // _fields 里第一个对应的是 startTime，第二个对应的是 startTime
    fields2ValueMap[initFields[0]] = _fields[0]
    fields2ValueMap[initFields[1]] = _fields[1]
    if (selectType === 'range') {
      setRangeValue(date)
      props.onChange && props.onChange({
        [_fields[0]]: dateString[0],
        [_fields[1]]: dateString[1],
        [initFields[0]]: dateString[0],
        [initFields[1]]: dateString[1],
      })
    } else {
      setDateValue(date)
      props.onChange && props.onChange({ [_fields[0]]: dateString, [initFields[0]]: dateString })
    }
  }

  useEffect(() => {
    console.log('themeConfig', themeConfig)
    if (themeConfig) {

    } else {

    }
  }, [themeConfig])

  return (
    <div
      className="time-select-wrap"
      ref={ dateRef }
      style={ { width: '100%', height: '100%' } }
    > {
      selectType === 'range' ?
        <RangePicker
          value={ rangeValue }
          picker={ pickerType }
          format={ dateFormat }
          style={ {
            width: '100%',
            height: '100%',
            background: selectBgColor,
            border: `1px solid ${ selectBorderColor }`,
          } }
          placeholder={['开始时间', '结束时间']}
          popupStyle={{transform: `scale(${scale})`, transformOrigin: 'left top'}}
          separator="至"
          showTime={ dateFormat.indexOf('HH:mm:ss') !== -1 }
          // getPopupContainer={ triggerNode => triggerNode.parentNode }
          // onOpenChange={ onOpenChange }
          // onPanelChange={ onOpenChange }
          allowClear={ false }
          dropdownClassName="date-panel"
          onChange={ handleChange }
        /> : <DatePicker
          value={ dateValue }
          picker={ pickerType }
          format={ dateFormat }
          placeholder="请选择时间"
          popupStyle={{transform: `scale(${scale})`, transformOrigin: 'left top'}}
          style={ {
            width: '100%',
            height: '100%',
            background: selectBgColor,
            border: `1px solid ${ selectBorderColor }`,
          } }
          showTime={ dateFormat.indexOf('HH:mm:ss') !== -1 }
          // getPopupContainer={ triggerNode => triggerNode.parentNode }
          // onOpenChange={ onOpenChange }
          // onPanelChange={ onOpenChange }
          allowClear={ false }
          dropdownClassName="date-panel"
          onChange={ handleChange }
        />
    }
    </div>
  )
}

export default TimeSelect
