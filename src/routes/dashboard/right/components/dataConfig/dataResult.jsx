import React, { memo, useState, useEffect } from 'react'
import './index.less'

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

const DataResult = props => {
  const _data = props.data;
  const [resultData, setResultData] = useState(resultCodeData)

  useEffect(() => {
    const newData = Object.assign({}, resultData, {
      value: JSON.stringify(_data.staticData.data, null, 2) || ''
    })
    // todo 数据过滤之后再展示结果
    setResultData(newData)
  }, [_data.staticData.data])

  return (
    <React.Fragment>
      <div className="data-config">
        <div className="data-header">
          <label className="data-name">数据响应结果（只读）</label>
          <Button icon={<RedoOutlined />} style={{ border: 0, background: 'transparent' }} />
        </div>
        <div className="data-content">
          <div style={{ width: '300px', height: '198px', marginTop: '16px' }}>
            <CodeEditor data={resultData} onChange={()=>{}} />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default memo(DataResult)
