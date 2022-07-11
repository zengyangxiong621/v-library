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

const ScrollSelect = (props) => {
  const [activeKey, setActiveKey] = useState(7)
  // 公共的 tab style
  const [commonTabStyle, setCommonTabStyle] = useState({})
  // 未选中的 tab style
  const [unselectedTabStyle, setUnselectedTabStyle] = useState({ color: '#fff' })
  // 选中的 tab style
  const [selectedTabStyle, setSelectedTabStyle] = useState({ color: 'blue' })
  // 所有的 options
  const [allOptions, setAllOptions] = useState([])
  // 能够展示出的 options
  const [options, setOptions] = useState([])
  // 行/列数
  const [optionsLength, setOptionsLength] = useState(8)
  // activeKey 之前有多少个, 之后有多少个
  const [beforeNums, setBeforeNums] = useState(3)
  const [afterNums, setAfterNums] = useState(4)
  // fontSizeRange, 字号范围
  const [fontSizeRange, setFontSizeRange] = useState([12, 36])
  const componentConfig = props.componentConfig || ComponentDefaultConfig
  const { config } = componentConfig
  const { data } = componentConfig.staticData
  // 最新字段
  const finalFields = props.fields || ['s', 'content']
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
    const textAlign = allGlobalConfig.find(item => item.name === 'align').value.find(item => item.name === 'textAlign').value
    const defaultSelectedKey = allGlobalConfig.find(item => item.name === "defaultSelectedKey").value
    const displayNums = allGlobalConfig.find(item => item.name === "defaultSelectedKey").value
    console.log('allOptions', allOptions)
    console.log('allOptions[defaultSelectedKey - 1]',allOptions[defaultSelectedKey - 1] )
    handleChange(allOptions[defaultSelectedKey - 1] || allOptions[0], allOptions)
  }


  // 首字母大写
  function titleCase (str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1)
  }


  const isSelectedConfigLoadFunc = (config, isSelected) => {
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
      setUnselectedTabStyle({
        ...unselectedTabStyle,
        ...style,
      })
    }
  }


  useEffect(() => {
    // 根据传入的fields来映射对应的值
    const fields2ValueMap = {}
    const initColumnsName = finalFields
    finalFields.forEach((item, index) => {
      fields2ValueMap[initColumnsName[index]] = item
    })
    // 根据对应的字段来转换data数据
    const finalData = Array.isArray(_data) ? _data.map((item) => {
      let res = {}
      for (let k in item) {
        res[k] = item[fields2ValueMap[k]]
      }
      return res
    }) : []
    setAllOptions(finalData)
    setOptions(finalData.slice(1, 8))
    // setActiveKey(findMidItem(finalData.slice(1, 8).map(item => item[finalFields[0]])))
    // console.log('value', findMidItem(finalData.slice(1, 8).map(item => item[finalFields[0]])))
  }, [])

  useEffect(() => {
    allGlobalLoadFunc()
  }, [allGlobalConfig, allOptions])

  useEffect(() => {
    isSelectedConfigLoadFunc(unselectedConfig, false)
  }, [unselectedConfig])

  useEffect(() => {
    isSelectedConfigLoadFunc(selectedConfig, true)
  }, [selectedConfig])

  const handleChange = (data, _allOptions) => {
    if (!_allOptions) {
      _allOptions = allOptions
    }
    if (data[finalFields[0]] !== activeKey) {
      const { activeIndex, newArr } = filterActiveOptions(data, _allOptions, optionsLength, finalFields)
      setOptions(newArr)
      setActiveKey(activeIndex)
      props.onChange && props.onChange({
        [finalFields[0]]: data[finalFields[0]],
        [finalFields[1]]: data[finalFields[1]],
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
    const { activeIndex, newArr } = filterActiveOptions(data, allOptions, optionsLength, finalFields)
    setOptions(newArr)
    setActiveKey(activeIndex)
  }

  const filterActiveOptions = (data, arr, optionsLength, finalFields) => {
    const index = arr.findIndex(item => item[finalFields[0]] === data[finalFields[0]])
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
    if (afterIndex > arr.length) {
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
      afterNums
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
  return (
    <div
      className="scroll-select-wrapper"
      style={ {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
      } }
      onWheel={ handleScroll }
    >
      {
        options.map((item, index) => (
          <div
            key={ index }
            style={ {
              // flexBasis: 1,
              flexBasis: 'calc(14.2857% - 0px)',
              color: index === activeKey ? 'red' : 'unset',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              ...commonTabStyle,
              ...(index === activeKey ? selectedTabStyle : { ...unselectedTabStyle, fontSize: fontSizeCalc(index)}),
            } }
            onClick={ () => handleChange(item) }
          >
            { item[finalFields[1]] }
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
