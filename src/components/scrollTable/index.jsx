import {useRef, useEffect, useState} from 'react';
import ComponentDefaultConfig from './config'
import ScrollBoard from '@jiaminghi/data-view-react/es/scrollBoard'
import ReactDOM from "react-dom";

const ScrollTable = (props) => {
  const {fields, comData} = props
  console.log('fields', fields)
  const [oddRowBGC, setOddRowBGC] = useState('#2a2d3c')
  const [evenRowBGC, setEvenRowBGC] = useState('#222430')
  const [indexHeader, setIndexHeader] = useState('#')
  const [align, setAlign] = useState([])
  const [waitTime, setWaitTime] = useState(5000)
  const [carousel, setCarousel] = useState('page')
  const componentConfig = props.componentConfig || componentDefaultConfig
  console.log('componentConfig', componentConfig)
  const {config, staticData} = componentConfig

  const allGlobalConfig = config.find(item => item.name === "allGlobal").value
  const waitTimeConfig = allGlobalConfig.find(item => item.name === "waitTime").value
  const dimensionConfig = config.find(item => item.name === "dimension").value
  const tableAnimationConfig = config.find(item => item.name === 'animation').value
  const tableHeaderConfig = config.find(item => item.name === "tableHeader").value
  const tableRowConfig = config.find(item => item.name === "tableRow").value
  const tableIndexConfig = config.find(item => item.name === "tableIndex").value
  const width = dimensionConfig.find(item => item.name === "width").value
  const height = dimensionConfig.find(item => item.name === "height").value
  // 自定义列
  const customColumnConfig = config.find(item => item.name === "customColumn")
  const tableRef = useRef(null)
  const tableContainerRef = useRef(null)

  useEffect(() => {
    // 重新计算大小
    tableRef.current.setWH()
  }, [])

  useEffect(() => {
    // 重新计算大小
    tableRef.current.setWH()
  }, [width, height])

  useEffect(() => {
    setWaitTime(waitTimeConfig)
  }, [waitTimeConfig])

  useEffect(() => {
    // boolean
    const switchConfig = tableHeaderConfig.find(item => item.name === 'show').value
    let headerConfig
    if (switchConfig) {
      headerConfig = tableHeaderConfig
    } else {
      headerConfig = componentDefaultConfig.config.find(item => item.name === "tableHeader").value
    }
    setTimeout(() => {
      const lineHeight = headerConfig.find(item => item.name === 'lineHeight').value
      const bgColor = headerConfig.find(item => item.name === 'bgColor').value
      const textAlign = headerConfig.find(item => item.name === 'textAlign').value
      const tableDom = ReactDOM.findDOMNode(tableContainerRef.current);
      const tableHeaderItemDOMs = tableDom.querySelectorAll(".dv-scroll-board>.header>.header-item")
      const tableHeader = tableDom.querySelector(".dv-scroll-board>.header")
      tableHeader.style.backgroundColor = bgColor
      tableHeaderItemDOMs.forEach(dom => {
        dom.style.lineHeight = lineHeight + 'px'
        dom.style.textAlign = textAlign
      })

      // todo 文本样式
    })
  }, [tableHeaderConfig])


  useEffect(() => {
    const switchConfig = tableRowConfig.find(item => item.name === 'show').value
    let rowConfig
    if (switchConfig) {
      rowConfig = tableRowConfig
    } else {
      rowConfig = componentDefaultConfig.config.find(item => item.name === "tableRow").value
    }
    const evenBgColor = rowConfig.find(item => item.name === "evenBgColor").value
    const oddBgColor = rowConfig.find(item => item.name === "oddBgColor").value
    setEvenRowBGC(evenBgColor)
    setOddRowBGC(oddBgColor)

  }, [tableRowConfig])

  useEffect(() => {
    const switchConfig = tableIndexConfig.find(item => item.name === 'show').value
    let indexConfig
    if (switchConfig) {
      indexConfig = tableIndexConfig
    } else {
      indexConfig = componentDefaultConfig.config.find(item => item.name === "tableIndex").value
    }
    const indexTitle = indexConfig.find(item => item.name === "title").value
    const indexAlign = indexConfig.find(item => item.name === "textAlign").value
    setIndexHeader(indexTitle)
    setAlign([indexAlign, ...align])
  }, [tableIndexConfig])

  useEffect(() => {
    const animationModel = tableAnimationConfig.find(item => item.name === "animationModel").value
    setCarousel(animationModel)
  }, [tableAnimationConfig])


  const getMapping = (customColumnConfig) => {
    return customColumnConfig.value.reduce((pre, cur) => {
      return pre.concat(cur.value.find(item => item.name === 'mapping').value.reduce((p, c) => {
        p[c.name] = c.value
        return p
      }, {}))
    }, [])
  }
  // 结构: [{fieldName: 'column1', displayName: '销售地区'}]
  const mappingConfig = getMapping(customColumnConfig)
  // 结构: ['销售地区', '完成率', '完成情况']
  const header = mappingConfig.map(item => item.displayName)
  // 结构: {column1: 0, column2: 1, column3: 2}
  const columnEnum = fields.filter(item => item.name !== "isSticked" && item.name !== "isSelected").reduce((pre, cur, index) => {
    pre[cur] = index
    return pre
  }, {})
  //结构:[['北京', '80%', '达标']]
  const tableData = comData.reduce((pre, cur) => {
    const arr = []
    Object.keys(cur).filter(key => key !== "isSticked" && key !== "isSelected").forEach(key => {
      arr[columnEnum[key]] = cur[key]
    })
    pre.push(arr)
    return pre
  }, [])

  const tableConfig = {
    header,
    data: tableData,
    waitTime,
    index: true,
    hoverPause: true,
    headerBGC: '#222430', // 头部背景色
    oddRowBGC, // 奇数行背景色
    evenRowBGC, // 偶数行背景色
    carousel,
    rowNum: 5,
    indexHeader,
    align
  }
  return (
    <div style={{width: '100%', height: '100%'}} ref={tableContainerRef}>
      <ScrollBoard ref={tableRef} className="scroll-board" config={tableConfig}/>
    </div>
  )

}
export {
  ComponentDefaultConfig,
  ScrollTable
}
export default ScrollTable
