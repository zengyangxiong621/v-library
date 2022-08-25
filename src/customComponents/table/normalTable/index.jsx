import React from 'react'
import {useRef, useEffect, useState, memo} from 'react'
import ComponentDefaultConfig from './config'
import {styleObjectToStr, styleTransformFunc} from '../../../utils'
import './index.less'
import { Table,Button, Input, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
const { Column } = Table;

const filterSearchApp=(dataIndex)=>{
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  return getColumnSearchProps(dataIndex)
}

const NormalTable=(props)=>{
  const componentConfig = props.componentConfig || ComponentDefaultConfig
  const comData = props.comData || [{}]
  // const fields = getFields(componentConfig)
  const {config, staticData} = componentConfig
  const {data}=staticData
  console.log(config);

  const dimiensionConfig=config.find(item=>item.name==='dimension')
  const customColumnConfig = config.find(item => item.name === 'customColumn')
  const allGlobalConfig=config.find(item => item.name === 'allGlobal')
  const expand=config.find(item=>item.name==='expand')
  const tableHeader=config.find(item=>item.name==="tableHeader")
  const tableRow=config.find(item=>item.name==='tableRow')
  // const summary=config.find(item=>item.name==='summary')

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
        if(config.name==='width'){
          const width=config.value
          return {
            width,
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
        if(config.name==='fixedColumn'){
          const isFixed=config.value.find(item => item.name === 'show').value
          const fixedAlignList=config.value.find(item=>item.name==='align').value
          const fixedAlign=fixedAlignList.reduce((p,c)=>{
            p[c.name]=c.value
            return p
          },{isFixed})
          return {
            ...fixedAlign,
            ...total
          }
        }
        if(config.name==='sortable'){
          const sortConfig=config.value.reduce((p,c)=>{
            if(c.name==='show'){
              p['isSortable']=c.value
            }else{
              p[c.name]=c.value
            }
            return p
          },{})
          return {
            ...sortConfig,
            ...total
          }
        }
        if(config.name ==="filter"){
          const isFilter=config.value
          return {
            isFilter,
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
        if (config.name === 'width') {
          const width = config.value
          return {
            width,
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
      return pre.concat(
        obj
      )
    }, [])
  }
  const getOtherConfig=(config)=>{
    const style={}
    if(Array.isArray(config)){
      config.forEach(item=>{
        if(Array.isArray(item.value)){
          style[item.name]=getOtherConfig(item.value)
        }else{
          style[item.name]=item.value
        }
      })
    }
    return style
  }

  const mappingConfig=getMapping(customColumnConfig)
  const postionConfig=getOtherConfig(dimiensionConfig.value)
  const globalConfig=getOtherConfig(allGlobalConfig.value)
  const expandConfig=getOtherConfig(expand.value)
  const headerConfig=getOtherConfig(tableHeader.value)
  const tableRowConfig=getOtherConfig(tableRow.value)
  // const summaryConfig=getOtherConfig(summary.value)
  console.log(tableRowConfig);

  const {tableSize,fontFamily}=globalConfig
  const {show,bgColor,textStyle}=headerConfig
  const {bold,color,fontFamily:headerFontFamily,fontSize,italic,letterSpacing,lineHeight}=textStyle
  const {show:rowConfig,oddBgColor,evenBgColor}=tableRowConfig
  const getRowStyle=()=>{
    if(!rowConfig){
      return
    }
    return {
      '--oddBgColor':oddBgColor,
      '--evenBgColor':evenBgColor
    }
  }
  const getColumnWidth=(columnConfig)=>{
    const columnWidth=postionConfig.width / mappingConfig.length
    const {width}=columnConfig
    if(width==='auto'){
      return columnWidth+'px'
    }
    return width+'px'
  }
  const isExpand=expandConfig.show?{
    expandable:{
      expandedRowRender: (record) => {
        const {expandField}=expandConfig
        if(expandField==='none'){
          return
        }
        return (
          <p
            style={{
              margin: 0,
            }}
          >
            {record[expandField]}
          </p>
        )
      },
    }
  }:{}

  return (
    <Table
      className='normalTable'
      dataSource={data}
      rowKey='id'
      pagination={false}
      size={tableSize}
      showHeader={show}
      style={{
        'font-family':fontFamily,
        '--headerBgColor':bgColor,
        '--headerFontColor':color,
        '--headerFontBold':bold ? 'bold':'',
        '--headerFontFamily':headerFontFamily,
        '--headerFontSize':fontSize,
        '--headerFontStyle':italic ? 'italic':'',
        '--headerLetterSpacing':letterSpacing,
        '--headerLineHeight':lineHeight,
        ...getRowStyle()
      }}
      scroll={{
        x:postionConfig.width,
        y:postionConfig.height
      }}
      {...isExpand}
    >
      {
        mappingConfig.map(item=>{
          const sortConfig={}
          let filterConfig=null
          if(item.isSortable){
            sortConfig.sortDirections=item.sortType
            sortConfig.defaultSortOrder=item.defaultSortType
            sortConfig.sorter=(a,b)=>a[item.filedName]-b[item.filedName]
          }
          if(item.isFilter){
            filterConfig=filterSearchApp(item.filedName)
          }
          return (
            <Column
              title={(
                <div className='tableHeader'>{item.displayName}</div>
              )}
              dataIndex={item.filedName}
              key={item.filedName} align={item.textAlign}
              ellipsis={item.overflowType==="ellipsis"}
              width={getColumnWidth(item)}
              fixed={item.isFixed ? item.fixedAlign : false}
              {...sortConfig}
              {...filterConfig}
            />
          )
        })
      }
    </Table>
  )
}
export {
  ComponentDefaultConfig,
  NormalTable
}
export default memo(NormalTable)
