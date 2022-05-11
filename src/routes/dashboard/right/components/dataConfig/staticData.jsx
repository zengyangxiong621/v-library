import React, { memo, useState, useEffect } from 'react'
import './index.less'
import CodeEditor from '../codeEditor'
import { v4 as uuidv4 } from 'uuid'
import {
  message
} from 'antd';
import debounce from 'lodash/debounce';

const sourceCodeData = {
  readOnly: false,
  language: 'json',
  value: ``,
  showExpand: false
};

const StaticData = props => {
  const [staticData, setStaticData] = useState(sourceCodeData)
  const [key, setKey] = useState(uuidv4())

  useEffect(() => {
    console.log('props.data', props.data)
    sourceCodeData.value = JSON.stringify(props.data, null, 2) || ''
    setStaticData(sourceCodeData)
    setKey(uuidv4())
  }, [props.data])

  const staticDataChange = debounce(() => {
    const staDa = { ...staticData }
    setStaticData(staDa)
    try {
      JSON.parse(staticData.value)
      props.onChange(staticData.value)
    } catch (e) {
      message.error('格式错误')
    }
  }, 300)

  return (
    <div style={{ width: '300px', height: '198px', marginTop: '16px' }}>
      <CodeEditor data={staticData} onChange={staticDataChange} />
    </div>
  )
}

export default memo(StaticData)