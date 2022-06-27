import React, {useRef, useEffect, useState} from 'react';
import ComponentDefaultConfig from './config'
import './index.css'


const Tab = (props) => {
  const [activeKey, setActiveKey] = useState('')
  const componentConfig = props.componentConfig || ComponentDefaultConfig
  const { config } = componentConfig
  const {  data } = componentConfig.staticData
  // 最新字段
  const finalFields = props.fields || ['s', 'content']
  // 组件静态或者传入组件的数据
  const originData = props.comData || data
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

  const getTargetStyle = (Arr) => {
    const targetStyle = {};
    Arr.forEach(({ name, value }) => {
      if (Array.isArray(value)) {
        value.forEach(({ name, value }) => {
          targetStyle[name] = value
        })
      } else {
        targetStyle[name] = value
      }
    });
    return targetStyle
  }

  const finalStyle = getTargetStyle(config)

  // 每个选项卡的样式，后面需要改变描边颜色
  const tabItemStyle = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(255, 255, 255, 0)',
    color: 'white',
    borderBottom: '1px solid #1E8EFF',
    marginRight: 0
    // border: '4px solid #373f4e'
  }

  const activeStyle = {
    background: 'linear-gradient(to bottom, #3EE6FF, rgba(29,129,255,0.97))',
    color: 'black'

  }

  useEffect(() => {
    handleTabChange(finalData[0])
  }, [])


  const handleTabChange = (data) => {
    if (data[finalFields[0]] !== activeKey) {
      setActiveKey(data[finalFields[0]])
      // props.onChange({[finalFields[0]]: data[finalFields[0]], [finalFields[1]]: data[finalFields[1]]})
    }
  }
  return (
    <div
      className='tab-wrap'
      style={{ height: '100%', width: '100%' , background: 'unset'}}
    >
      {
        finalData.map((item, index) => {
          return (
            <div
              style={{...tabItemStyle, background: activeKey === item[finalFields[0]] ? activeStyle.background : tabItemStyle.background, color: activeKey === item[finalFields[0]] ? activeStyle.color: tabItemStyle.color }}
              className='tab-item'
              onClick={() => handleTabChange(item)}
            >{item[finalFields[1]]}</div>
          )
        })
      }
    </div>
  )

}

export {
  ComponentDefaultConfig
}

export default Tab