import React, { memo, useState, useEffect } from 'react'
import './index.less'
import CusSelect from '../cusSelect'
import CusInput from '../cusInput'
import CodeEditor from '../codeEditor'

import {
  Checkbox
} from 'antd';

const _baseUrlDataConfig = {
  name: "xxx",
  displayName: 'BaseURL',
  type: 'input',
  value: '',
  disabled: true
}

const _selectDataConfig = {
  name: "xxx",
  displayName: '请求方式',
  type: 'select',
  value: 'GET',
  options: [
    {
      name: 'GET',
      value: 'GET'
    },
    {
      name: 'POST',
      value: 'POST'
    },
    {
      name: 'PUT',
      value: 'PUT'
    },
    {
      name: 'DELETE',
      value: 'DELETE'
    },
    {
      name: 'PATCH',
      value: 'PATCH'
    },
  ]
}

const _requestHeaderDataConfig = {
  readOnly: false,
  language: 'json',
  value: ``,
  showExpand: false
}

const _pathDataConfig = {
  name: "xxx",
  displayName: '路径',
  type: 'input',
  value: '',
}

const _paramDataConfig = {
  name: "xxx",
  displayName: '参数',
  type: 'input',
  value: '',
}

const APIDataSource = props => {
  const [requestMethods, setRequestMethods] = useState(_selectDataConfig)
  const [baseUrlData, setBaseUrlData] = useState(_baseUrlDataConfig)
  const [requestHeaderData, setRequestHeaderData] = useState(_requestHeaderDataConfig)
  const [pathData, setPathData] = useState(_pathDataConfig)
  const [paramData, setParamData] = useState(_paramDataConfig)
  const [reqFromBack, setReqFromBack] = useState(false)
  const [needCookie, setNeedCookie] = useState(false)

  useEffect(() => {
    // queryDataSource()
  }, [props.type])

  const baseUrlDataChange = () => {
    console.log('baseUrlData', baseUrlData)
  }

  const requestMethodsChange = () => {
    console.log('requestMethods', requestMethods)
  }

  const requestHeaderDataChange = () => {
    console.log('requestHeaderData', requestHeaderData)
  }

  const pathDataChange = () => {
    console.log('pathData', pathData)
  }

  const paramDataChange = () => {
    console.log('paramData', paramData)
  }

  const reqFromBackChange = () => {
    console.log('reqFromBack', reqFromBack)
  }

  const needCookieChange = () => {
    console.log('needCookie', needCookie)
  }


  return (
    <div className="api-data-source-config">
      <CusInput data={baseUrlData} onChange={baseUrlDataChange} />
      <CusSelect data={requestMethods} onChange={requestMethodsChange} style={{ width: '130px', marginLeft: '12px' }} />
      <div className="request-header">
        <label className="data-name">请求头（JSON格式）</label>
        <div style={{ width: '300px', height: '198px', marginTop: '16px' }}>
          <CodeEditor data={requestHeaderData} onChange={requestHeaderDataChange} />
        </div>
      </div>
      <CusInput data={pathData} onChange={pathDataChange} />
      <CusInput data={paramData} onChange={paramDataChange} />
      <Checkbox checked={reqFromBack} onChange={reqFromBackChange}>后端发起请求</Checkbox>
      <Checkbox checked={needCookie} onChange={needCookieChange}>需要cookie</Checkbox>
    </div>
  )
}

export default memo(APIDataSource)