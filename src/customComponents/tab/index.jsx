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
  // 全局的 tab Style
  const [allGlobalTabStyle, setAllGlobalTabStyle] = useState({
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    justifyContent: 'left'
    // border: '4px solid #373f4e'
  })
  // 全局的 tab 容器 style
  const [allGlobalContainerStyle, setAllGlobalContainerStyle] = useState({})
  // 各项 tab 的宽度权重比 style
  const [tabsProportionStyle, setTabsProportionStyle] = useState({})
  // 未选中的 tab style
  const [unselectedTabStyle, setUnselectedTabStyle] = useState({})
  // 选中的 tab style
  const [selectedTabStyle, setSelectedTabStyle] = useState({})
  // 数据系列的 tab style
  const [dataSeriesStyleList, setDataSeriesStyleList] = useState({})
  const [tabList, setTabList] = useState([])
  // 行数
  const [rowNums, setRowNums ] = useState(1)
  const [colNums, setColNums]  = useState(4)

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
  // 数据系列
  const dataSeriesConfig = config.find(item => item.name === 'dataSeries').value
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
    const textAlign = allGlobalConfig.find(item => item.name === 'align').value.find(item => item.name === 'textAlign').value
    const gridLayoutConfig = allGlobalConfig.find(item => item.name === 'gridLayout').value
    const layoutConfig = gridLayoutConfig.find(item => item.name === "layout").value
    // 行数
    const rowNums = layoutConfig.find(item => item.name === "rowNums").value
    // 列数
    const colNums = layoutConfig.find(item => item.name === "colNums").value
    setRowNums(rowNums)
    setColNums(colNums)
    const spacingConfig = gridLayoutConfig.find(item => item.name === "spacing").value
    // 行距
    const rowSpacing = spacingConfig.find(item => item.name === "rowSpacing").value
    // 列距
    const colSpacing = spacingConfig.find(item => item.name === "colSpacing").value
    setAllGlobalTabStyle({
      ...allGlobalTabStyle,
      justifyContent: textAlignEnum[textAlign],
    })
    setAllGlobalContainerStyle({
      ...allGlobalContainerStyle,
      gridTemplate: `repeat(${rowNums}, 1fr) / ${new Array(colNums).fill('1fr').join(' ')}`,
      gap: `${rowSpacing}px ${colSpacing}px`
    })
  }

  // 驼峰转中划线
  const toLine = (name) => {
    return name.replace(/([A-Z])/g,"-$1").toLowerCase();
  }

  // 首字母大写
  function titleCase(str) {
    return str.slice(0,1).toUpperCase() + str.slice(1)
  }


  const isSelectedConfigLoadFunc = (config, isSelected) => {
    let textStyle = deepClone(config.find(item => item.name === 'textStyle').value)
    const bgColor = config.find(item => item.name === 'bgColor').value
    const bgImg = config.find(item => item.name === 'bgImg').value
    const borderConfig = config.find(item => item.name === 'border')
    const borderRadiusStyle = borderConfig.range.reduce((pre, cur, index) => {
      pre[`border${titleCase(cur)}Radius`] = `${borderConfig.value.radius[index]}px`
      return pre
    }, {})
    const borderStyle = {border:  `${borderConfig.value.width}px ${borderConfig.value.type} ${borderConfig.value.color}` }
    textStyle = styleTransformFunc(textStyle)
    const finalStyle = {
      ...selectedTabStyle,
      ...textStyle,
      ...borderRadiusStyle,
      ...borderStyle,
      backgroundColor: bgColor ?  bgColor : 'unset',
      backgroundImage: bgImg ? `url(${bgImg})` : 'unset',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
    }
    if (isSelected) {
      setSelectedTabStyle(finalStyle)
    } else {
      setUnselectedTabStyle(finalStyle)
    }
  }


  const styleFuncObj = {
    totalOffset(value) {
      return {
        transform: `translate(${value.find(item => item.name === 'offsetX').value}px, ${value.find(item => item.name === 'offsetY').value}px)`
      }
    },
    textOffset(value) {
      return {
        transform: `translate(${value.find(item => item.name === 'offsetX').value}px, ${value.find(item => item.name === 'offsetY').value}px)`
      }
    },
    widthProportion(value) {
      return {}
    },
    bgColor(value) {
      return {
        backgroundColor: value
      }
    },
    bgImg(value) {
      return {
        backgroundImage: `url(${value})`
      }
    },
    selectedBgColor(value) {
      return {
        backgroundColor: value
      }
    },
    selectedBgImg(value) {
      return {
        backgroundImage: `url(${value})`
      }
    }
  }

  const dataSeriesConfigLoadFunc = () => {
    if (tabList.length === 0) return
    let temp = true
    // widthProportionList: {[与filed值对应的tabList集合的[finalFields[0]]的下标值]: 宽度占比值}
    const widthProportionList = dataSeriesConfig.reduce((pre, series) => {
      const config = series.value
      const filed = config.find(item => item.name === 'filed').value
      const index = tabList.findIndex(item => item[finalFields[0]] === filed)
      if (index === -1) {
        return pre
      }
      pre[index] = config.find(item => item.name === "widthProportion").value
      return pre
    }, {})
    const tabColumnProportionList = new Array(colNums).fill(1)
    for(let key in widthProportionList) {
      tabColumnProportionList[key] = widthProportionList[key]
    }
    setTabsProportionStyle({
      gridTemplate: `repeat(${rowNums}, 1fr) / ${tabColumnProportionList.map(item => item + 'fr').join(' ')}`,
    })
    const styleList = dataSeriesConfig.reduce((totalObj, series, index) => {
      const config = series.value
      const filed = config.find(item => item.name === 'filed').value
      // 数据系列中的未选中
      const unselectedStyleConfig = config.filter(item => ['totalOffset', "textOffset", "widthProportion", "bgColor", "bgImg"].includes(item.name)).reduce((pre, cur) => {
        const style = styleFuncObj[cur.name](cur.value) || {}
        if (cur.name === 'textOffset') {
          pre.text = {
            ...(pre.text || {}),
            ...style
          }
        } else {
          pre.container = {
            ...(pre.container || {}),
            ...style
          }
        }
        return pre
      }, {})
      // 数据系列中的选中
      const selectedStyleConfig = config.filter(item => ["selectedBgColor", "selectedBgImg"].includes(item.name)).reduce((pre, cur) => {
        const style = styleFuncObj[cur.name](cur.value) || {}
        pre.selected = {
          ...pre.selected,
          ...style
        }
        return pre
      }, {})
      // unselectedStyleConfig: {text: {}, container: {}}
      // selectedStyleConfig: {selected: {}}
      totalObj[filed] = {
        ...unselectedStyleConfig,
        ...selectedStyleConfig
      }
      return totalObj
    }, {})
    // styleList: {filed: {text:{}, container: {}, selected: {}}}
    setDataSeriesStyleList(styleList)
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
    setTabList(finalData)
    handleTabChange(finalData[0])
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

  useEffect(() => {
    dataSeriesConfigLoadFunc()
  }, [dataSeriesConfig, tabList, rowNums, colNums])

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
      style={ {
        height: '100%',
        width: '100%',
        background: 'unset',
        display: 'grid',
        ...allGlobalContainerStyle,
        ...tabsProportionStyle
      } }
    >
      {
        tabList.map((item, index) => {
          return (
            <div
              style={ {
                ...allGlobalTabStyle,
                ...(activeKey === item[finalFields[0]]
                  ? { ...selectedTabStyle, ...(dataSeriesStyleList[item[finalFields[0]]]?.container || {}),...(dataSeriesStyleList[item[finalFields[0]]]?.selected || {})}
                  : { ...unselectedTabStyle, ...(dataSeriesStyleList[item[finalFields[0]]]?.container || {}) } ),
                cursor: 'pointer'
              } }
              className="tab-item"
              onClick={ () => handleTabChange(item) }
              key={ item[finalFields[0]] }
            >
              <div style={{...(dataSeriesStyleList[item[finalFields[0]]]?.text || {})}}>
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
