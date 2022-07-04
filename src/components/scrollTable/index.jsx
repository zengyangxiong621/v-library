import { useRef, useEffect, useState } from 'react'
import ComponentDefaultConfig from './config'
import ScrollBoard from '@jiaminghi/data-view-react/es/scrollBoard'
import ReactDOM from 'react-dom'
import { styleObjectToStr, styleTransformFunc } from '../../utils'

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
  const [oddRowBGC, setOddRowBGC] = useState('#2a2d3c')
  const [evenRowBGC, setEvenRowBGC] = useState('#222430')
  const [indexHeader, setIndexHeader] = useState('#')
  const [align, setAlign] = useState([])
  const [waitTime, setWaitTime] = useState(5000)
  const [carousel, setCarousel] = useState('page')
  const [tableData, setTableData] = useState([])
  const [header, setHeader] = useState([])
  const [isHeader, setIsHeader] = useState(true)
  const componentConfig = props.componentConfig || ComponentDefaultConfig
  const fields = getFields(componentConfig)
  const { config, staticData } = componentConfig

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
          if (mappingEnum[mapp.filedName]) {
            arr[index] = `<span style="font-family: ${fontFamilyConfig}" tilte="${ data[mappingEnum[mapp.filedName]] }">${ data[mappingEnum[mapp.filedName]] ? data[mappingEnum[mapp.filedName]] : '--' }<span>`
          } else {
            arr[index] = `<span style="font-family: ${fontFamilyConfig}" tilte="${ data[mapp.filedName] }">${ data[mapp.filedName] ? data[mapp.filedName] : '--' }<span>`
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

    const lineHeight = headerConfig.find(item => item.name === 'lineHeight').value
    const bgColor = headerConfig.find(item => item.name === 'bgColor').value
    const textAlign = headerConfig.find(item => item.name === 'textAlign').value
    let textStyle = styleTransformFunc(headerConfig.find(item => item.name === 'textStyle').value)
    // const textAlign = headerConfig.find(item => item.name === 'align').value.find(item => item.nafme === 'textAlign').value || 'left'
    textStyle = styleObjectToStr({ 'line-height': lineHeight + 'px', 'text-align': textAlign, 'font-Family': fontFamilyConfig, ...textStyle})
    const header = mappingConfig.map(item => `<span style="${textStyle}" tilte="${ item.displayName }">${ item.displayName ? item.displayName : '--' }<span>`)
    setHeader(header)
    setTimeout(() => {
      const tableDom = ReactDOM.findDOMNode(tableContainerRef.current)
      const tableHeader = tableDom.querySelector('.dv-scroll-board>.header')
      tableHeader.style.backgroundColor = bgColor
      tableHeader.style.height = lineHeight + 'px'
    })
  }

  const tableIndexLoadFunc = () => {
    const switchConfig = tableIndexConfig.find(item => item.name === 'show').value
    let indexConfig
    if (switchConfig) {
      indexConfig = tableIndexConfig
    } else {
      indexConfig = ComponentDefaultConfig.config.find(item => item.name === 'tableIndex').value
    }
    const indexTitle = indexConfig.find(item => item.name === 'title').value
    const indexAlign = indexConfig.find(item => item.name === 'textAlign').value
    setIndexHeader(indexTitle)
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
      return pre.concat(cur.value.find(item => item.name === 'mapping').value.reduce((p, c) => {
        p[c.name] = c.value
        return p
      }, {}))
    }, [])
  }

  useEffect(() => {
    setTableWH()
  }, [])

  useEffect(() => {
    const mappingConfig = getMapping(customColumnConfig)
    tableHeaderLoadFunc(mappingConfig)
    tableDataLoadFunc(mappingConfig)
  }, [customColumnConfig, comData])

  const setTableWH = () => {
    tableRef.current.setWH()
    setTimeout(() => {
      const tableDom = ReactDOM.findDOMNode(tableContainerRef.current)
      const tableRowItems = tableDom.querySelectorAll('.row-item')
      const height = dimensionConfig.find(item => item.name === 'height').value
      tableRowItems.forEach(dom => {
        const rowHeight =  (height - (isHeader ? 35 * Number(scale) : 0)) / rowNumConfig
        dom.style.height = rowHeight + 'px'
        dom.style.lineHeight = rowHeight + 'px'
      })
    })
  }

  const tableConfig = {
    header: isHeader ? header : [],
    data: tableData,
    waitTime,
    // index: true,
    hoverPause: true,
    headerBGC: '#222430', // 头部背景色
    oddRowBGC, // 奇数行背景色
    evenRowBGC, // 偶数行背景色
    carousel,
    rowNum: rowNumConfig,
    indexHeader,
    align,
  }
  return (
    <div style={ { width: '100%', height: '100%' } } ref={ tableContainerRef }>
      <ScrollBoard ref={ tableRef } className="scroll-board" config={ tableConfig }/>
    </div>
  )

}
export {
  ComponentDefaultConfig,
  ScrollTable,
}
export default ScrollTable
