import React, { useRef, useEffect, useState } from 'react'
import ComponentDefaultConfig from './config'
import './index.css'
import { styleTransformFunc, deepClone } from '../../utils'
import { Link } from 'dva/router'

const textAlignEnum = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
}

const findMidItem = (arr) => {
  let length = arr.length
  if (length === 0) return -1
  if (length % 2 === 0) {
    return arr[length / 2 - 1]
  }
  if (length % 2 === 1) {
    return arr[(length - 1) / 2]
  }
  return -1
}

// 将rgb颜色转成hex  输入(24,12,255)
function rgb2hex(arr){
  return '#' + arr.map(v=> parseInt(v,10).toString(16)).join('');
}
function rgbaToRgb(color) {
  console.log('color', color)
  let rgbaAttr = color.match(/[\d.]+/g);
  if (rgbaAttr.length >= 3) {
    var r, g, b;
    r = rgbaAttr[0];
    g = rgbaAttr[1];
    b = rgbaAttr[2];
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }
  return '';
}
function gradientColor (startColor, endColor, step) {
  let color = ''
  if (startColor.indexOf('rgb') !== -1) {
    color = rgb2hex(rgbaToRgb(startColor).replace('rgb(', '').replace(')', '').split(','))
  } else {
    color = startColor
  }
  let startRGB = this.colorRgb(color)
  // console.log('startRGB', startRGB)
  let startR = startRGB[0]
  let startG = startRGB[1]
  let startB = startRGB[2]
  let endRGB = this.colorRgb(endColor)
  // let endR = startRGB[0] + 10 >  255 ? 255 : startRGB[0] + 10
  // let endG = startRGB[1] + 90 >  255 ? 255 : startRGB[1] + 90
  // let endB = startRGB[2] + 90 >  255 ? 255 : startRGB[2] + 90
  // let endR = 255
  // let endG = 255
  // let endB = 255
  let endR = endRGB[0]
  let endG = endRGB[1]
  let endB = endRGB[2]
  let sR = (endR - startR) / step
  let sG = (endG - startG) / step
  let sB = (endB - startB) / step
  const colorArr = []
  for (let i = 0; i < step; i++) {
    //计算每一步的hex值
    const hex = this.colorHex('rgb(' + parseInt((sR * i + startR)) + ',' + parseInt((sG * i + startG)) + ',' + parseInt((sB * i + startB)) + ')')
    colorArr.push(hex)
  }
  return colorArr
}

gradientColor.prototype.colorRgb = function (sColor) {
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  sColor = sColor.toLowerCase()
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = '#'
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
      }
      sColor = sColorNew
    }
    //处理六位的颜色值
    let sColorChange = []
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
    }
    return sColorChange
  } else {
    return sColor
  }
}
gradientColor.prototype.colorHex = function (rgb) {
  let _this = rgb
  let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  if (/^(rgb|RGB)/.test(_this)) {
    let aColor = _this.replace(/(?:(|)|rgb|RGB)*/g, '').split(',')
    let strHex = '#'
    for (let i = 0; i < aColor.length; i++) {
      let hex = Number(aColor[i]).toString(16)
      hex = hex < 10 ? 0 + '' + hex : hex// 保证每个rgb的值为2位
      if (hex === '0') {
        hex += hex
      }
      strHex += hex
    }
    if (strHex.length !== 7) {
      strHex = _this
    }
    return strHex
  } else if (reg.test(_this)) {
    let aNum = _this.replace(/#/, '').split('')
    if (aNum.length === 6) {
      return _this
    } else if (aNum.length === 3) {
      let numHex = '#'
      for (let i = 0; i < aNum.length; i += 1) {
        numHex += (aNum[i] + aNum[i])
      }
      return numHex
    }
  } else {
    return _this
  }
}

const ScrollSelect = (props) => {
  const [activeKey, setActiveKey] = useState(7)
  // 公共的 tab style
  const [commonTabStyle, setCommonTabStyle] = useState({
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  })
  // 未选中的 tab style
  const [unselectedTabStyle, setUnselectedTabStyle] = useState({ color: '#fff' })
  // 选中的 tab style
  const [selectedTabStyle, setSelectedTabStyle] = useState({ color: 'blue' })
  // 所有的 options
  const [allOptions, setAllOptions] = useState([])
  // 能够展示出的 options
  const [options, setOptions] = useState([])
  // 行/列数
  const [optionsLength, setOptionsLength] = useState(0)
  // activeKey 之前有多少个, 之后有多少个
  const [beforeNums, setBeforeNums] = useState(0)
  const [afterNums, setAfterNums] = useState(0)
  // fontSizeRange, 字号范围
  const [fontSizeRange, setFontSizeRange] = useState([0, 0])
  // 排列方式
  const [flexDirection, setFlexDirection] = useState('column')
  // 颜色梯度
  const [colorStepGradient, setColorStepGradient] = useState([])
  const componentConfig = props.componentConfig || ComponentDefaultConfig
  const { config } = componentConfig
  const { data } = componentConfig.staticData
  // 最新字段
  const _fields = props.fields || []
  // 组件静态或者传入组件的数据
  const _data = props.comData || data
  // 全局
  const allGlobalConfig = config.find(item => item.name === 'allGlobal').value
  // 未选中 tab 样式
  const unselectedConfig = config.find(item => item.name === 'style').value.find(item => item.name === 'styleTabs').options.find(item => item.name === '未选中').value
  // 已选中 tab 样式
  const selectedConfig = config.find(item => item.name === 'style').value.find(item => item.name === 'styleTabs').options.find(item => item.name === '选中').value
  const getTargetStyle = (Arr) => {
    const targetStyle = {}
    Arr.forEach(({ name, value }) => {
      if (Array.isArray(value)) {
        value.forEach(({ name, value }) => {
          targetStyle[name] = value
        })
      } else {
        targetStyle[name] = value
      }
    })
    return targetStyle
  }

  const allGlobalLoadFunc = () => {
    if (allOptions.length === 0) {
      return
    }
    const defaultSelectedKey = allGlobalConfig.find(item => item.name === 'defaultSelectedKey').value
    let optionsLength = allGlobalConfig.find(item => item.name === 'displayNums').value
    const spacing = allGlobalConfig.find(item => item.name === 'spacing').value
    const directionType = allGlobalConfig.find(item => item.name === 'directionType').value
    setFlexDirection(directionType === 'horizontal' ? 'column' : 'row')
    optionsLength = optionsLength > allOptions.length ? allOptions.length : optionsLength
    setOptionsLength(optionsLength)
    setCommonTabStyle({
      ...commonTabStyle,
      flexBasis: `calc(${ (100 / optionsLength).toFixed(4) }% - ${ spacing }px)`,
    })
    handleChange(allOptions[defaultSelectedKey - 1] || allOptions[0], allOptions, optionsLength)
  }


  // 首字母大写
  function titleCase (str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1)
  }


  const isSelectedConfigLoadFunc = (config, isSelected) => {
    if (optionsLength === 0) {
      return
    }
    if (isSelected) {
      // 选中
      let textStyle = deepClone(config.find(item => item.name === 'textStyle').value)
      let textShadow = config.find(item => item.name === 'shadow')
      let style = styleTransformFunc([...textStyle, { ...textShadow, name: 'textShadow' }])
      setSelectedTabStyle({
        ...selectedTabStyle,
        ...style,
      })
    } else {
      let fontFamily = config.find(item => item.name === 'fontFamily')
      let textShadow = config.find(item => item.name === 'shadow')
      let style = styleTransformFunc([{ ...textShadow, name: 'textShadow' }, fontFamily])
      const fontSizeRange = config.find(item => item.name === 'fontSizeRange').value.map(item => item.value)
      const colorStep = config.find(item => item.name === 'colorStep').value
      let activeIndex = 0, beforeNums = 0, afterNums = 0
      if (optionsLength % 2 === 0) {
        activeIndex = optionsLength / 2
        afterNums = optionsLength - activeIndex
      } else {
        activeIndex = (optionsLength + 1) / 2
        afterNums = optionsLength - activeIndex
      }
      const gradient = new gradientColor(colorStep, '#fff', afterNums)
      setColorStepGradient(gradient)
      setFontSizeRange(fontSizeRange)
      setUnselectedTabStyle({
        ...unselectedTabStyle,
        ...style,
      })
    }
  }


  useEffect(() => {
    // 根据传入的fields来映射对应的值
    const fields2ValueMap = {}
    const initFields = ['s', 'content'] // _fields 里第一个对应的是 s，第二个对应的是 content
    fields2ValueMap[initFields[0]] = _fields[0]
    fields2ValueMap[initFields[1]] = _fields[1]
    const allOptions = _data.map(item => {
      return {
        ...item,
        [initFields[0]]: item[fields2ValueMap[initFields[0]]],
        [initFields[1]]: item[fields2ValueMap[initFields[1]]],
      }
    })
    setAllOptions(allOptions)
    const { newArr } = filterActiveOptions(data, allOptions, optionsLength, _fields)
    setOptions(newArr)
  }, [_fields, _data, optionsLength])

  useEffect(() => {
    allGlobalLoadFunc()
  }, [allGlobalConfig, allOptions, _data])

  useEffect(() => {
    isSelectedConfigLoadFunc(unselectedConfig, false)
  }, [unselectedConfig, optionsLength])

  useEffect(() => {
    isSelectedConfigLoadFunc(selectedConfig, true)
  }, [selectedConfig, optionsLength])

  const handleChange = (data, _allOptions, _optionsLength) => {
    if (!_allOptions) {
      _allOptions = allOptions
    }
    if (!_optionsLength) {
      _optionsLength = optionsLength
    }
    if (data[_fields[0]] !== activeKey) {
      const { newArr, activeIndex } = filterActiveOptions(data, _allOptions, _optionsLength, _fields)
      setOptions(newArr)
      setActiveKey(activeIndex)
      props.onChange && props.onChange({
        [_fields[0]]: data[_fields[0]],
        [_fields[1]]: data[_fields[1]],
      })
    }
  }

  const handleScroll = (e) => {
    let data = {}
    if (e.deltaY > 0) {
      // 下滚
      data = options[activeKey + 1]
    }
    if (e.deltaY < 0) {
      // 上滚
      data = options[activeKey - 1]
    }
    handleChange(data)
  }

  const filterActiveOptions = (data, arr, optionsLength, _fields) => {
    const index = arr.findIndex(item => item[_fields[0]] === data[_fields[0]])
    let activeIndex = 0, beforeNums = 0, afterNums = 0
    if (optionsLength % 2 === 0) {
      activeIndex = optionsLength / 2
      beforeNums = optionsLength - activeIndex - 1
      afterNums = optionsLength - activeIndex
    } else {
      activeIndex = (optionsLength + 1) / 2
      beforeNums = optionsLength - activeIndex
      afterNums = optionsLength - activeIndex
    }
    let frontArr = []
    let backArr = []
    let beforeIndex = index - beforeNums
    let afterIndex = index + afterNums + 1
    if (afterIndex >= arr.length) {
      frontArr = arr.slice(beforeIndex)
      backArr = arr.slice(0, afterIndex - arr.length)
    } else if (beforeIndex < 0) {
      frontArr = arr.slice(beforeIndex)
      backArr = arr.slice(0, afterIndex)
    } else {
      frontArr = arr.slice(beforeIndex, index)
      backArr = arr.slice(index, afterIndex)
    }
    return {
      activeIndex: activeIndex - 1,
      newArr: [...frontArr, ...backArr],
      beforeNums,
      afterNums,
    }
  }

  const fontSizeCalc = (index) => {
    const gapValue = (fontSizeRange[1] - fontSizeRange[0]) / optionsLength
    if (index < activeKey) {
      return fontSizeRange[1] + gapValue * index
    } else {
      return fontSizeRange[1] + gapValue * (optionsLength - (index + 1))
    }
  }

  const colorCalc = (index) => {
    if (index < activeKey) {
      return colorStepGradient[index]
    } else {
      return colorStepGradient[optionsLength - (index + 1)]
    }
  }
  return (
    <div
      className="scroll-select-wrapper"
      style={ {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection,
      } }
      onWheel={ handleScroll }
    >
      {
        options.map((item, index) => (
          <div
            key={ index }
            style={ {
              ...commonTabStyle,
              ...(index === activeKey ? selectedTabStyle : { ...unselectedTabStyle, fontSize: fontSizeCalc(index), color: colorCalc(index) }),
            } }
            onClick={ () => handleChange(item) }
          >
            { item[_fields[1]] }
          </div>
        ))
      }
    </div>
  )
}

export {
  ComponentDefaultConfig,
}

export default ScrollSelect
