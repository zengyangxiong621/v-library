import {useRef, useEffect, useState, memo} from 'react'
import ComponentDefaultConfig from './config'
import {ScrollBoard} from '../dataV'
import ReactDOM from 'react-dom'
import {styleObjectToStr, styleTransformFunc} from '../../utils'

const getFields = (componentConfig = {}) => {
  const dataType = componentConfig.dataType
  let fields = null
  if (dataType === 'static' || !dataType) {
    fields = componentConfig.staticData?.fields || []
  } else {
    if (componentConfig.dataConfig[dataType] && componentConfig.dataConfig[dataType].fields) {
      fields = componentConfig.dataConfig[dataType].fields
    } else {
      fields = componentConfig.staticData.fields
    }
  }
  return fields
}

const ScrollTable = (props) => {
  // let comData = [{}]
  // if (Array.isArray(props.comData) && (Object.prototype.toString.call(props.comData[0]) === '[object Object]')) {
  //   comData = props.comData || ComponentDefaultConfig.staticData.data
  // }
  const comData = props.comData || [{}]
  const scale = props.scale
  const [state, setState] = useState({
    mappingConfig: [],
    columnsSettings: [
      {
        textAlign: 'left',
        overflowType: '',
        textStyle: {},
        customStyle: [
          {
            filedName: "",
            textStyle: {},
          }
        ]
      }
    ]
  })
  const [oddRowBGC, setOddRowBGC] = useState('#2a2d3c')
  const [headerBGC, setHeaderBGC] = useState('#222430')
  const [headerBGI, setHeaderBGI] = useState('unset')
  const [evenRowBGC, setEvenRowBGC] = useState('#222430')
  const [indexHeader, setIndexHeader] = useState('#')
  const [indexBgConfigs, setIndexBgConfigs] = useState([])
  const [align, setAlign] = useState([])
  const [waitTime, setWaitTime] = useState(5000)
  const [carousel, setCarousel] = useState('page')
  const [tableData, setTableData] = useState([])
  const [header, setHeader] = useState([])
  const [isHeader, setIsHeader] = useState(true)
  const [isIndex, setIsIndex] = useState(false)
  const [indexAlign ,setIndexAlign] = useState('left')
  const componentConfig = props.componentConfig || ComponentDefaultConfig
  const fields = getFields(componentConfig)
  const {config, staticData} = componentConfig

  const allGlobalConfig = config.find(item => item.name === 'allGlobal').value
  const rowNumConfig = allGlobalConfig.find(item => item.name === 'rowNums').value
  const fontFamilyConfig = allGlobalConfig.find(item => item.name === 'fontFamily').value
  const dimensionConfig = config.find(item => item.name === 'dimension').value
  const height = dimensionConfig.find(item => item.name === 'height').value
  const width = dimensionConfig.find(item => item.name === 'width').value
  // 动画
  const tableAnimationConfig = config.find(item => item.name === 'animation').value
  // 表头
  const tableHeaderConfig = config.find(item => item.name === 'tableHeader').value
  // 行
  const tableRowConfig = config.find(item => item.name === 'tableRow').value
  // 序号列
  const tableIndexConfig = config.find(item => item.name === 'tableIndex').value
  // 自定义列
  const customColumnConfig = config.find(item => item.name === 'customColumn')
  const tableRef = useRef(null)
  const tableContainerRef = useRef(null)

  const init = () => {

  }

  const tableDataLoadFunc = (mappingConfig) => {
    let tableValue = []
    let columnEnum = fields.filter(item => item.name !== 'isSticked' && item.name !== 'isSelected').reduce((pre, cur, index) => {
      pre[cur.value] = Number(cur.name.replace(/[^0-9]/ig, '')) - 1
      return pre
    }, {})
    let mappingEnum = fields.filter(item => item.name !== 'isSticked' && item.name !== 'isSelected').reduce((pre, cur, index) => {
      pre[cur.name] = cur.value
      return pre
    }, {})
    if (Array.isArray(comData) && (Object.prototype.toString.call(comData[0]) === '[object Object]')) {
      comData.forEach((data, index) => {
        let arr = []
        mappingConfig.forEach((mapp, index) => {
          let style = {
            width: '100%',
            height: '100%'
          }
          const {customStyle, overflowType, textAlign, textStyle} = mapp
          style = {
            ...style,
            ...textStyle
          }
          if (overflowType === 'ellipsis') {
            style = {
              ...style,
              'overflow': 'hidden',
              'text-overflow': 'ellipsis',
              'white-space': 'nowrap',
              'display': 'block',
              'text-align': textAlign
            }
          } else if (overflowType === 'wrap') {
            style = {
              ...style,
              'word-break': 'break-all',
              'overflow-wrap': 'break-word',
              'line-height': 'normal',
              'display': 'flex',
              'align-items': 'center',
              'justify-content': textAlign === 'left' ? 'flex-start' : textAlign === 'center' ? 'center' : textAlign === 'right' ? 'flex-end' : 'unset'
            }
          }
          if (mappingEnum[mapp.filedName]) {
            if (data[mappingEnum[mapp.filedName]]) {
              const currentCustomStyle = customStyle.find(item => item.filedValue === data[mappingEnum[mapp.filedName]]) || {}
              const styleStr = styleObjectToStr({...style, ...currentCustomStyle.textStyle})
              arr[index] = `<div style="font-family: ${fontFamilyConfig}; ${styleStr}" title="${data[mappingEnum[mapp.filedName]]}">${data[mappingEnum[mapp.filedName]]}<div>`
            } else {
              arr[index] = `<div>--<div>`
            }
          } else {
            if (data[mapp.filedName]) {
              const currentCustomStyle = customStyle.find(item => item.filedValue === data[mapp.filedName]) || {}
              const styleStr = styleObjectToStr({...style, ...currentCustomStyle.textStyle})
              arr[index] = `<div style="font-family: ${fontFamilyConfig}; ${styleStr}" title="${data[mapp.filedName]}">${data[mapp.filedName]}<div>`
            } else {
              arr[index] = `<div>--<div>`
            }
          }
        })
        tableValue.push(arr)
      })
    }
    setTableData(tableValue)
  }

  const tableHeaderLoadFunc = (mappingConfig) => {
    const isHeader = tableHeaderConfig.find(item => item.name === 'show').value
    setIsHeader(isHeader)

    const switchConfig = tableHeaderConfig.find(item => item.name === 'show').value     // boolean
    let headerConfig
    if (switchConfig) {
      headerConfig = tableHeaderConfig
      setIsHeader(true)
    } else {
      headerConfig = ComponentDefaultConfig.config.find(item => item.name === 'tableHeader').value
      setIsHeader(false)
    }

    const bgColor = headerConfig.find(item => item.name === 'bgColor').value
    setHeaderBGC(bgColor)
    const textAlign = headerConfig.find(item => item.name === 'textAlign').value.find(item => item.name === 'textAlign').value
    let textStyle = styleTransformFunc(headerConfig.find(item => item.name === 'textStyle').value, false)
    const gradientConfig = headerConfig.filter(item => item.name.indexOf('gradient') !== -1).reduce((pre, cur) => {
      pre[cur.name] = cur.value
      return pre
    }, {})
    const gradientColor = gradientConfigFunc(gradientConfig)
    setHeaderBGI(gradientColor['background-image'])
    // const textAlign = headerConfig.find(item => item.name === 'align').value.find(item => item.nafme === 'textAlign').value || 'left'
    textStyle = styleObjectToStr({
      'text-align': textAlign,
      'font-Family': fontFamilyConfig,
      'overflow': 'hidden',
      'text-overflow': 'ellipsis',
      'white-space': 'nowrap',
      ...textStyle,
    })
    const header = mappingConfig.map(item => `<div style="${textStyle}" title="${item.displayName}">${item.displayName ? item.displayName : '--'}<div>`)
    setHeader(header)
    setTimeout(() => {
      const tableDom = ReactDOM.findDOMNode(tableContainerRef.current)
      const tableHeader = tableDom.querySelector('.dv-scroll-board>.header')
      // tableHeader.style.backgroundColor = bgColor
    })
  }

  const gradientConfigFunc = ({ gradientOrigin, gradientStartColor, gradientEndColor }) => {
    let backgroundImage = ""
    if (gradientOrigin === 'center') {
      backgroundImage = `linear-gradient(to right, ${gradientStartColor}, ${gradientEndColor}, ${gradientStartColor})`
    } else {
      backgroundImage = `linear-gradient(to ${gradientOrigin}, ${gradientStartColor}, ${gradientEndColor})`
    }
    return {
      "background-image": backgroundImage
    }
  }

  const tableIndexLoadFunc = () => {
    const switchConfig = tableIndexConfig.find(item => item.name === 'show').value
    let indexConfig
    setIsIndex(switchConfig)
    if (switchConfig) {
      indexConfig = tableIndexConfig
    } else {
      return
      indexConfig = ComponentDefaultConfig.config.find(item => item.name === 'tableIndex').value
    }
    const indexTitle = indexConfig.find(item => item.name === 'title').value
    const indexAlign = indexConfig.find(item => item.name === 'textAlign').value.find(item => item.name === 'textAlign').value
    const indexColumnCustomStyle = indexConfig.find(item => item.name === 'indexColumnCustomStyle').value
    const indexBgConfigs = indexColumnCustomStyle.reduce((total, cur) => {
      const data = cur.value.reduce((pre, cu) => {
        if (cu.name === 'textStyle') {
          let textStyle = styleTransformFunc(cu.value, false)
          return { ...pre, ...textStyle }
        }
        if (cu.name === 'bgSize') {
          let width = cu.value.find(item => item.name === 'width').value
          if (width.indexOf('%') === -1) {
            width += 'px'
          }
          let height = cu.value.find(item => item.name === 'height').value
          if (height.indexOf('%') === -1) {
            height += 'px'
          }
          return { ...pre, width, height }
        }
        if (cu.name === 'bgColor') {
          return { ...pre, 'background-color': cu.value }
        }
        if (cu.name === 'bgImg') {
          return {
            ...pre,
            'background-image': `url('${cu.value}')`,
            'background-size': 'cover',
            'background-repeat': 'no-repeat',
            'background-position': 'center center',
          }
        }
      }, {})
      return total.concat(data)
    }, [])
    setIndexBgConfigs(indexBgConfigs)
    let textStyle = styleTransformFunc(tableIndexConfig.find(item => item.name === 'textStyle').value, false)
    textStyle = styleObjectToStr({'text-align': indexAlign, ...textStyle})
    setIndexAlign(indexAlign)
    setIndexHeader(`<div style="${textStyle}">${indexTitle}</div>`)
  }

  const tableRowLoadFunc = () => {
    const switchConfig = tableRowConfig.find(item => item.name === 'show').value
    let rowConfig
    if (switchConfig) {
      rowConfig = tableRowConfig
    } else {
      rowConfig = ComponentDefaultConfig.config.find(item => item.name === 'tableRow').value
    }
    const evenBgColor = rowConfig.find(item => item.name === 'evenBgColor').value
    const oddBgColor = rowConfig.find(item => item.name === 'oddBgColor').value
    setEvenRowBGC(evenBgColor)
    setOddRowBGC(oddBgColor)
  }

  const tableAllGlobalLoadFunc = () => {
    const fontFamilyConfig = allGlobalConfig.find(item => item.name === 'fontFamily').value
  }

  const tableAnimationLoadFunc = () => {
    const animationModel = tableAnimationConfig.find(item => item.name === 'animationModel').value
    const waitTimeConfig = tableAnimationConfig.find(item => item.name === 'scrollInterval').value // number
    setCarousel(animationModel)
    setWaitTime(waitTimeConfig)
  }


  useEffect(() => {
    // 重新计算大小
    // setTableWH()
    setTableWH()
  }, [dimensionConfig, height, width])

  useEffect(() => {
    setTableWH()
  }, [rowNumConfig])

  useEffect(() => {
    const mappingConfig = getMapping(customColumnConfig)
    tableHeaderLoadFunc(mappingConfig)
    setTableWH()
  }, [tableHeaderConfig])

  useEffect(() => {
    tableRowLoadFunc()
  }, [tableRowConfig])

  useEffect(() => {
    tableIndexLoadFunc()
  }, [tableIndexConfig])

  useEffect(() => {
    tableAnimationLoadFunc()
  }, [tableAnimationConfig])


  const getMapping = (customColumnConfig) => {
    return customColumnConfig.value.reduce((pre, cur) => {
      const obj = cur.value.reduce((total, config) => {
        if (config.name === 'mapping') {
          const obj = config.value.reduce((p, c) => {
            p[c.name] = c.value
            return p
          }, {})
          return {
            ...obj,
            ...total
          }
        }
        if (config.name === 'align') {
          const textAlign = config.value.find(item => item.name === 'textAlign').value
          return {
            textAlign,
            ...total
          }
        }
        if (config.name === 'overflowType') {
          const overflowType = config.value
          return {
            overflowType,
            ...total
          }
        }
        if (config.name === 'textStyle') {
          const textStyle = styleTransformFunc(config.value, false)
          return {
            textStyle,
            ...total
          }
        }
        if (config.name === 'customStyle') {
          const customStyle = config.value.reduce((columnTotal, columnConfig) => {
            const obj = columnConfig.value.reduce((t, c) => {
              if (c.name === 'filedValue') {
                t[c.name] = c.value
              }
              if (c.name === 'textStyle') {
                const textStyle = styleTransformFunc(c.value, false)
                t['textStyle'] = textStyle
              }
              return t
            }, {})
            return columnTotal.concat(obj)
          }, [])
          return {
            ...total,
            customStyle
          }
        }
        return total
      }, {})
      // const cur.value.find(item => item.name === 'mapping').value.reduce((p, c) => {
      //   p[c.name] = c.value
      //   return p
      // }, {})
      return pre.concat(
        obj
      )
    }, [])
  }

  useEffect(() => {
    setTableWH()
  }, [])

  const customColumnLoadFunc = () => {
  }

  useEffect(() => {
    console.log('轮播表格渲染')
    const mappingConfig = getMapping(customColumnConfig)
    tableHeaderLoadFunc(mappingConfig)
    tableDataLoadFunc(mappingConfig)
    setState({
      ...state,
      mappingConfig
    })
  }, [customColumnConfig, JSON.stringify(comData)])

  const setTableWH = () => {
    tableRef.current.setWH()
    // setTimeout(() => {
    //   const tableDom = ReactDOM.findDOMNode(tableContainerRef.current)
    //   const tableRowItems = tableDom.querySelectorAll('.row-item')
    //   const height = dimensionConfig.find(item => item.name === 'height').value
    //   tableRowItems.forEach(dom => {
    //     const rowHeight = (height - (isHeader ? 35 * Number(scale) : 0)) / rowNumConfig
    //     dom.style.height = rowHeight + 'px'
    //     dom.style.lineHeight = rowHeight + 'px'
    //   })
    // })
  }

  const tableConfig = {
    header: isHeader ? header : [],
    data: tableData,
    waitTime,
    index: isIndex,
    indexBgConfigs,
    hoverPause: true,
    headerBGC, // 头部背景色
    headerBGI, // 头部背景图片
    oddRowBGC, // 奇数行背景色
    evenRowBGC, // 偶数行背景色
    carousel,
    rowNum: rowNumConfig,
    indexAlign,
    indexHeader,
    align,
    height,
    width
  }
  return (
    <div style={{width: '100%', height: '100%'}} ref={tableContainerRef}>
      <ScrollBoard ref={tableRef} className="scroll-board" config={tableConfig}/>
    </div>
  )

}
export {
  ComponentDefaultConfig,
  ScrollTable,
}
export default memo(ScrollTable)
