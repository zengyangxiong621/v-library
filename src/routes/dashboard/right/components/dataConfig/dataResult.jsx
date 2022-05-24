import React, { memo, useState, useEffect } from 'react'
import './index.less'
import { connect } from 'dva'

import CodeEditor from '../codeEditor'

import {
  Button,
} from 'antd';
import {
  RedoOutlined
} from '@ant-design/icons';

const resultCodeData = {
  readOnly: true,
  language: 'json',
  value: ``,
  showExpand: false
}

const DataResult = ({ bar, dispatch, ...props }) => {
  const _data = props.data;
  const type = props.type
  const componentResultData = props.resultData || []
  const [resultData, setResultData] = useState(resultCodeData)

  useEffect(() => {
    console.log('type', type)
    if (!type && type !== 'component') {
      const dataFrom = _data.dataFrom
      let resData = null
      let currentData = null
      console.log('dataFrom', _data)

      if (dataFrom === 0) {
        currentData = bar.componentData[_data.id]
      } else {
        currentData = setDataContainerResult()
      }
      console.log('currentDatacurrentDatacurrentDatacurrentData', currentData)
      if (currentData) {
        // 如果使用数据过滤器，则需要过滤数据
        if (bar.componentConfig.useFilter && bar.componentConfig.filters) {
          resData = dataFilterHandler(currentData)
        } else {
          resData = currentData
        }
        console.log('resData', resData)
        const newData = Object.assign({}, resultData, {
          value: JSON.stringify(resData, null, 2)
        })
        setResultData(newData)
      }
    }
  }, [bar.componentData, bar.componentConfig.filters, bar.componentFilters, bar.componentConfig.useFilter, _data.dataFrom, _data.dataContainers])

  useEffect(() => {
    if (type === 'component') {
      const newData = Object.assign({}, resultData, {
        value: JSON.stringify(componentResultData, null, 2)
      })
      setResultData(newData)
    }
  }, [componentResultData])



  const setDataContainerResult = () => {
    // 数据容器
    if (_data?.dataContainers) {
      const dataContainerIds = _data.dataContainers.map(item => item.id)
      return bar.dataContainerDataList.reduce((pre, cur) => {
        if (dataContainerIds.includes(cur.id)) {
          pre.push(cur.data)
        }
        return pre
      }, [])
    }
  }


  const dataFilterHandler = data => {
    const filters = bar.componentConfig.filters.map(item => {
      const filterDetail = bar.componentFilters.find(jtem => jtem.id === item.id)
      return {
        ...filterDetail,
        enable: item.enable,
      }
    }).filter(item => item.enable)
    try {
      const functions = filters.map(item => {
        return (new Function('data', item.content))
      })
      const resultArr = []
      functions.forEach((fn, index) => {
        if (index === 0) {
          resultArr.push(fn(data))
        } else {
          resultArr.push(fn(resultArr[index - 1]))
        }
      })
      return resultArr[resultArr.length - 1]
    } catch (e) {
      console.error(e)
      return {}
    }
  }

  return (
    <React.Fragment>
      <div className="data-config">
        <div className="data-header">
          <label className="data-name">数据响应结果（只读）</label>
          <Button icon={<RedoOutlined />} style={{ border: 0, background: 'transparent' }} />
        </div>
        <div className="data-content">
          <div className="data-code-wraper" style={props.style}>
            <CodeEditor data={resultData} onChange={() => { }} />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default connect(({ bar }) => ({
  bar
}))(DataResult)
