import React, { useRef, useEffect, useState } from 'react'
import ComponentDefaultConfig from './config'
import './index.css'
import { styleTransformFunc, deepClone } from '../../utils'

const textAlignEnum = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end'
}

const Tab = (props) => {
  const [activeKey, setActiveKey] = useState('')
  const [textAlign, setTextAlign] = useState('left')
  // 默认的 tab Style
  const [defaultTabStyle, setDefaultTabStyle] = useState({
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    justifyContent: textAlignEnum[textAlign]
    // border: '4px solid #373f4e'
  })
  // 未选中的 tab style
  const [unselectedTabStyle, setUnselectedTabStyle] = useState(defaultTabStyle)
  // 选中的 tab style
  const [selectedTabStyle, setSelectedTabStyle] = useState(defaultTabStyle)
  const [tabList, setTabList] = useState([])
  const componentConfig = props.componentConfig || ComponentDefaultConfig
  const { config } = componentConfig
  const { data } = componentConfig.staticData
  // 最新字段
  const finalFields = props.fields || ['s', 'content']
  // 组件静态或者传入组件的数据
  const originData = props.comData || data
  // 全局
  const allGlobalConfig = config.find(item => item.name === 'allGlobal').value
  // 未选中
  const unselectedConfig = config.find(item => item.name === 'style').value.find(item => item.name === 'styleTabs').options.find(item => item.name === '未选中').value
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

  const finalStyle = getTargetStyle(config)




  const allGlobalLoadFunc = () => {
    const textAlign = allGlobalConfig.find(item => item.name === 'align').value.find(item => item.name === 'textAlign').value
    setTextAlign(textAlign)
  }

  const unselectedConfigLoadFunc = () => {
    let textStyle = deepClone(unselectedConfig.find(item => item.name === 'textStyle').value)
    const bgColor = unselectedConfig.find(item => item.name === 'bgColor').value
    const bgImg = unselectedConfig.find(item => item.name === 'bgImg').value
    const border = unselectedConfig.find(item => item.name === 'border').value
    console.log('bgColor', bgColor, bgImg, border)
    textStyle = styleTransformFunc(textStyle)
    setUnselectedTabStyle({
      ...unselectedTabStyle,
      ...textStyle
    })
  }


  useEffect(() => {
    // 根据传入的fields来映射对应的值
    const fields2ValueMap = {}
    const initColumnsName = finalFields
    finalFields.forEach((item, index) => {
      fields2ValueMap[initColumnsName[index]] = item
    })
    // 根据对应的字段来转换data数据
    const finalData = Array.isArray(originData) ? originData.map((item) => {
      let res = {}
      for (let k in item) {
        res[k] = item[fields2ValueMap[k]]
      }
      return res
    }) : []
    setTabList(finalData)
    handleTabChange(finalData[0])
  }, [])

  useEffect(() => {
    allGlobalLoadFunc()
  }, [allGlobalConfig])

  useEffect(() => {
    unselectedConfigLoadFunc()
  }, [unselectedConfig])

  const handleTabChange = (data) => {
    if (data[finalFields[0]] !== activeKey) {
      setActiveKey(data[finalFields[0]])
      props.onChange && props.onChange({
        [finalFields[0]]: data[finalFields[0]],
        [finalFields[1]]: data[finalFields[1]],
      })
    }
  }

  return (
    <div
      className="tab-wrap"
      style={ { height: '100%', width: '100%', background: 'unset' } }
    >
      {
        tabList.map((item, index) => {
          return (
            <div
              style={ activeKey === item[finalFields[0]] ? selectedTabStyle : unselectedTabStyle }
              className="tab-item"
              onClick={ () => handleTabChange(item) }
              key={ item[finalFields[0]] }
            ><div>
              { item[finalFields[1]] }
            </div>
            </div>
          )
        })
      }
    </div>
  )

}

export {
  ComponentDefaultConfig,
}

export default Tab
