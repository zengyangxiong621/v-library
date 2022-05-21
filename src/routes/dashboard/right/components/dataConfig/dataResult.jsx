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
  const [resultData, setResultData] = useState(resultCodeData)

  useEffect(() => {
    let resData = null
    const currentData = bar.componentData[_data.id]
    if (currentData) {
      // 如果使用数据过滤器，则需要过滤数据
      if (bar.componentConfig.useFilter && bar.componentConfig.filters) {
        resData = dataFilterHandler(_data.dataType === 'static' ? _data.staticData.data : currentData)
      } else{
        resData = currentData
      }
      const newData = Object.assign({}, resultData, {
        value: _data.dataType === 'static' ? JSON.stringify(_data.staticData.data, null, 2) :
          JSON.stringify(resData, null, 2)
      })
      setResultData(newData)
    }
  }, [bar.componentData, bar.componentConfig.filters, bar.componentFilters, bar.componentConfig.useFilter])

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
