import React, { useRef, useEffect, useState } from 'react'
import ComponentDefaultConfig from './config'
import './index.css'
import { styleTransformFunc, deepClone } from '../../utils'

const textAlignEnum = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end'
}

const findMidItem = (arr) => {
  let length = arr.length;
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
  const [activeKey, setActiveKey] = useState('4')
  // 未选中的 tab style
  const [unselectedTabStyle, setUnselectedTabStyle] = useState({})
  // 选中的 tab style
  const [selectedTabStyle, setSelectedTabStyle] = useState({})
  // 所有的 options
  const [allOptions, setAllOptions] = useState([])
  // 能够展示出的 options
  const [options, setOptions] = useState([])
  // 行数
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

  }


  // 首字母大写
  function titleCase(str) {
    return str.slice(0,1).toUpperCase() + str.slice(1)
  }


  const isSelectedConfigLoadFunc = (config, isSelected) => {
    console.log('config', config)
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
    handleChange(finalData[4])
  }, [])

  useEffect(() => {
    allGlobalLoadFunc()
  }, [allGlobalConfig])

  useEffect(() => {
    isSelectedConfigLoadFunc(unselectedConfig, false)
  }, [unselectedConfig])

  useEffect(() => {
    isSelectedConfigLoadFunc(selectedConfig, true)
  }, [selectedConfig])

  const handleChange = (data) => {
    if (data[finalFields[0]] !== activeKey) {
      console.log('value', data[finalFields[0]])
      setActiveKey(data[finalFields[0]])
      props.onChange && props.onChange({
        [finalFields[0]]: data[finalFields[0]],
        [finalFields[1]]: data[finalFields[1]],
      })
    }
  }
  return (
    <div
      className="scroll-select-wrapper"
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {
        options.map((item, index) => (
          <div
            key={ item[finalFields[0]] }
            style={{
              flexBasis: 'calc(14.2857% - 0px)',
              color: item[finalFields[0]] === activeKey ? 'red' : 'unset',
              cursor: 'pointer'
            }}
            onClick={() => handleChange(item)}
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
