import React, { memo, useState, useEffect } from 'react'
import './index.less'
import { connect } from 'dva'

import CodeEditor from '../codeEditor'
import { getComDataWithFilters } from '../../../../../utils/data'

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
    init()
  }, [bar.componentData, bar.componentConfig.filters, bar.componentFilters, bar.componentConfig.useFilter, _data.dataFrom, _data.dataContainers])

  useEffect(() => {
    if (type === 'component') {
      console.log('哈哈哈哈哈哈哈哈哈或')
      console.log('componentResultData', componentResultData)
      console.log('哈哈哈哈哈哈哈哈哈或')
      initOfComponent()
    }
  }, [componentResultData])

  const init = () => {
    if (!type && type !== 'component') {
      const resData = getComDataWithFilters(bar.componentData, bar.componentConfig, bar.componentFilters, bar.dataContainerDataList)
      const newData = Object.assign({}, resultData, {
        value: resData ? JSON.stringify(resData, null, 2) : ''
      })
      setResultData(newData)
    }
  }

  const initOfComponent = () => {
    if (type === 'component') {
      const newData = Object.assign({}, resultData, {
        value: JSON.stringify(componentResultData, null, 2)
      })
      setResultData(newData)
    }
  }

  const refresh = () => {
    if (type === 'component') {
      initOfComponent()
    } else {
      init()
    }
  }

  return (
    <React.Fragment>
      <div className="data-config">
        <div className="data-header">
          <label className="data-name">数据响应结果（只读）</label>
          <Button onClick={refresh} icon={<RedoOutlined />} style={{ border: 0, background: 'transparent' }} />
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
