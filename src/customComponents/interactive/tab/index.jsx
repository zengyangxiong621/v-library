import React, { useRef, useEffect, useState, useImperativeHandle } from 'react'
import ComponentDefaultConfig from './config'
import './index.css'
import { styleTransformFunc, deepClone } from '../../../utils'

const textAlignEnum = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
}

const Tab = ({cRef={}, ...props }) => {
  const [scrollState, setScrollState] = useState({
    isScroll: false,
    clickStayTime: 0,
    intervalTime: 0,
    isStay: false
  })
  let [activeKey, setActiveKey] = useState(0)
  const [defaultActiveKey, setDefaultActiveKey] = useState(0)
  // 全局的 tab Style
  const [allGlobalTabStyle, setAllGlobalTabStyle] = useState({
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    justifyContent: 'left',
    transition: 'all 0.3s',
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
  const [rowNums, setRowNums] = useState(1)
  const [colNums, setColNums] = useState(4)

  useImperativeHandle(cRef, () => ({
    handleEvent: (message) => {
      const index = tabList.findIndex(item => item[_fields[1]] === message.content) //
      handleTestClick(index)
    },
  }))
  const componentConfig = props.componentConfig || ComponentDefaultConfig
  const { config } = componentConfig
  const { data } = componentConfig.staticData
  // 最新字段
  const _fields = props.fields || []
  // 组件静态或者传入组件的数据
  const _data = props.comData || [{}]
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
  const handleTestClick = (index) => {
    setActiveKey(index + 1)
  }
  const allGlobalLoadFunc = () => {
    const textAlign = allGlobalConfig.find(item => item.name === 'align').value.find(item => item.name === 'textAlign').value
    const gridLayoutConfig = allGlobalConfig.find(item => item.name === 'gridLayout').value
    const defaultSelectedKey = allGlobalConfig.find(item => item.name === 'defaultSelectedKey').value
    setDefaultActiveKey(Number(defaultSelectedKey))
    const layoutConfig = gridLayoutConfig.find(item => item.name === 'layout').value
    // 行数
    const rowNums = layoutConfig.find(item => item.name === 'rowNums').value
    // 列数
    const colNums = layoutConfig.find(item => item.name === 'colNums').value
    setRowNums(rowNums)
    setColNums(colNums)
    const spacingConfig = gridLayoutConfig.find(item => item.name === 'spacing').value
    // 行距
    const rowSpacing = spacingConfig.find(item => item.name === 'rowSpacing').value
    // 列距
    const colSpacing = spacingConfig.find(item => item.name === 'colSpacing').value
    setAllGlobalTabStyle({
      ...allGlobalTabStyle,
      justifyContent: textAlignEnum[textAlign],
    })
    setAllGlobalContainerStyle({
      ...allGlobalContainerStyle,
      gridTemplate: `repeat(${ rowNums }, 1fr) / ${ new Array(colNums).fill('1fr').join(' ') }`,
      gap: `${ rowSpacing }px ${ colSpacing }px`,
    })
    const scrollConfig = allGlobalConfig.find(item => item.name === 'isScroll').value
    const isScroll = scrollConfig.find(item => item.name === 'show').value
    const intervalTime = scrollConfig.find(item => item.name === 'interval').value
    const clickStayTime = scrollConfig.find(item => item.name === 'clickStay').value
    setScrollState(({...scrollState, isScroll, intervalTime, clickStayTime}))
  }

  // 驼峰转中划线
  const toLine = (name) => {
    return name.replace(/([A-Z])/g, '-$1').toLowerCase()
  }

  // 首字母大写
  function titleCase (str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1)
  }


  const isSelectedConfigLoadFunc = (config, isSelected) => {
    let textStyle = deepClone(config.find(item => item.name === 'textStyle').value)
    const bgColor = config.find(item => item.name === 'bgColor').value
    const bgImg = config.find(item => item.name === 'bgImg').value
    const borderConfig = config.find(item => item.name === 'border')
    const borderRadiusStyle = borderConfig.range.reduce((pre, cur, index) => {
      pre[`border${ titleCase(cur) }Radius`] = `${ borderConfig.value.radius[index] }px`
      return pre
    }, {})
    const borderStyle = { border: `${ borderConfig.value.width }px ${ borderConfig.value.type } ${ borderConfig.value.color }` }
    textStyle = styleTransformFunc(textStyle)
    const finalStyle = {
      ...selectedTabStyle,
      ...textStyle,
      ...borderRadiusStyle,
      ...borderStyle,
      backgroundColor: bgColor ? bgColor : 'unset',
      backgroundImage: bgImg ? `url('${ bgImg }')` : 'unset',
      backgroundRepeat: 'no-repeat',
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
    totalOffset (value) {
      return {
        transform: `translate(${ value.find(item => item.name === 'offsetX').value }px, ${ value.find(item => item.name === 'offsetY').value }px)`,
      }
    },
    textOffset (value) {
      return {
        transform: `translate(${ value.find(item => item.name === 'offsetX').value }px, ${ value.find(item => item.name === 'offsetY').value }px)`,
      }
    },
    widthProportion (value) {
      return {}
    },
    bgColor (value) {
      return {
        backgroundColor: value,
      }
    },
    bgImg (value) {
      return {
        backgroundImage: `url(${ value })`,
      }
    },
    selectedBgColor (value) {
      return {
        backgroundColor: value,
      }
    },
    selectedBgImg (value) {
      return {
        backgroundImage: `url(${ value })`,
      }
    },
  }

  const dataSeriesConfigLoadFunc = () => {
    if (tabList.length === 0) return
    let temp = true
    // widthProportionList: {[与filed值对应的tabList集合的[_fields[0]]的下标值]: 宽度占比值}
    const widthProportionList = dataSeriesConfig.reduce((pre, series) => {
      const config = series.value
      const filed = config.find(item => item.name === 'filed').value
      const index = tabList.findIndex(item => item[_fields[0]] === filed)
      if (index === -1) {
        return pre
      }
      pre[index] = config.find(item => item.name === 'widthProportion').value
      return pre
    }, {})
    const tabColumnProportionList = new Array(colNums).fill(1)
    for (let key in widthProportionList) {
      tabColumnProportionList[key] = widthProportionList[key]
    }
    setTabsProportionStyle({
      gridTemplate: `repeat(${ rowNums }, 1fr) / ${ tabColumnProportionList.map(item => item + 'fr').join(' ') }`,
    })
    const styleList = dataSeriesConfig.reduce((totalObj, series, index) => {
      const config = series.value
      const filed = config.find(item => item.name === 'filed').value
      // 数据系列中的未选中
      const unselectedStyleConfig = config.filter(item => ['totalOffset', 'textOffset', 'widthProportion', 'bgColor', 'bgImg'].includes(item.name)).reduce((pre, cur) => {
        const style = styleFuncObj[cur.name](cur.value) || {}
        if (cur.name === 'textOffset') {
          pre.text = {
            ...(pre.text || {}),
            ...style,
          }
        } else {
          pre.container = {
            ...(pre.container || {}),
            ...style,
          }
        }
        return pre
      }, {})
      // 数据系列中的选中
      const selectedStyleConfig = config.filter(item => ['selectedBgColor', 'selectedBgImg'].includes(item.name)).reduce((pre, cur) => {
        const style = styleFuncObj[cur.name](cur.value) || {}
        pre.selected = {
          ...pre.selected,
          ...style,
        }
        return pre
      }, {})
      // unselectedStyleConfig: {text: {}, container: {}}
      // selectedStyleConfig: {selected: {}}
      totalObj[filed] = {
        ...unselectedStyleConfig,
        ...selectedStyleConfig,
      }
      return totalObj
    }, {})
    // styleList: {filed: {text:{}, container: {}, selected: {}}}
    setDataSeriesStyleList(styleList)
  }


  /*

     [
        {
            name: "选项一",
            value: "1",
        }
     ]

     */

  useEffect(() => {
    // 根据传入的fields来映射对应的值

    const fields2ValueMap = {}
    const initFields = ['s', 'content'] // _fields 里第一个对应的是 s，第二个对应的是 content
    fields2ValueMap[initFields[0]] = _fields[0]
    fields2ValueMap[initFields[1]] = _fields[1]
    const tabList = _data.map(item => {
      return {
        ...item,
        [initFields[0]]: item[fields2ValueMap[initFields[0]]],
        [initFields[1]]: item[fields2ValueMap[initFields[1]]],
      }
    })
    setTabList(tabList)
  }, [_fields, _data])

  useEffect(() => {
    if (defaultActiveKey > 0) {
      handleChange(tabList[defaultActiveKey - 1], defaultActiveKey)
    }
  }, [defaultActiveKey])

  useEffect(() => {
    let timer = null
    if (scrollState.isScroll && !scrollState.isStay) {
      timer = setInterval(() => {
        if (activeKey + 1 > tabList.length) {
          activeKey = 0
        }
        handleChange(tabList[activeKey + 1 - 1], activeKey + 1)
      },  scrollState.intervalTime)
    }
    // 如果处于停留的状态
    if (scrollState.isStay) {
      timer && clearInterval(timer)
      setTimeout(() => {
        setScrollState({...scrollState, isStay: false})
      }, scrollState.clickStayTime)
    }
    return () => {
      timer && clearInterval(timer)
    }
  }, [activeKey, scrollState])

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

  const handleChange = (data, index) => {
    console.log('index', index)
    setActiveKey(index)
    props.onChange && props.onChange(data)
  }

  const handleClick = (e) => {
    props.onClick && props.onClick(e, tabList[activeKey])
  }
  const handleMouseEnter = (e) => {
    props.onMouseEnter && props.onMouseEnter(e, tabList[activeKey])
  }
  const handleMouseLeave = (e) => {
    props.onMouseLeave && props.onMouseLeave(e, tabList[activeKey])
  }
  const handleItemClick = (item, index) => {
    console.log('index', index)
    if (scrollState.clickStayTime > 0) {
      setScrollState({...scrollState, isStay: true})
    }
    handleChange(item, index)
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
        ...tabsProportionStyle,
      } }
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {
        tabList.map((item, index) => {
          return (
            <div
              style={ {
                ...allGlobalTabStyle,
                ...(activeKey === (index + 1)
                  ? { ...selectedTabStyle, ...(dataSeriesStyleList[item[_fields[0]]]?.container || {}), ...(dataSeriesStyleList[item[_fields[0]]]?.selected || {}) }
                  : { ...unselectedTabStyle, ...(dataSeriesStyleList[item[_fields[0]]]?.container || {}) }),
                cursor: 'pointer',
              } }
              className="tab-item"
              onClick={ () => handleItemClick(item, index + 1) }
              key={ index }
            >
              <div style={ { ...(dataSeriesStyleList[item[_fields[0]]]?.text || {}) } }>
                { item[_fields[1]] }
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
