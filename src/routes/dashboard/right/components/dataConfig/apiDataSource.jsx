import React, { memo, useState, useEffect } from 'react'
import './index.less'
import CusSelect from '../cusSelect'
import CusInput from '../cusInput'
import CodeEditor from '../codeEditor'
import SelectDataSource from './selectDataSource'

import { http } from '../../../../../models/utils/request'
import cloneDeep from 'lodash/cloneDeep'

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

const _requestMethodConfig = {
  name: "xxx",
  displayName: '请求方式',
  type: 'select',
  value: 'get',
  options: [
    {
      name: 'GET',
      value: 'get'
    },
    {
      name: 'POST',
      value: 'post'
    },
    {
      name: 'PUT',
      value: 'put'
    },
    {
      name: 'DELETE',
      value: 'delete'
    },
    {
      name: 'PATCH',
      value: 'patch'
    },
  ]
}

const _requestHeaderDataConfig = {
  readOnly: false,
  language: 'json',
  value: ``,
  showExpand: false
}

const _requestBodyDataConfig = {
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
  const _data = props.data
  const [requestMethods, setRequestMethods] = useState(_requestMethodConfig)
  const [baseUrlData, setBaseUrlData] = useState(_baseUrlDataConfig)
  const [requestHeaderData, setRequestHeaderData] = useState(_requestHeaderDataConfig)
  const [requestBodyData, setRequestBodyData] = useState(_requestBodyDataConfig)
  const [pathData, setPathData] = useState(_pathDataConfig)
  const [paramData, setParamData] = useState(_paramDataConfig)
  const [reqFromBack, setReqFromBack] = useState(false)
  const [needCookie, setNeedCookie] = useState(false)
  const [isShowBody, setIsShowBody] = useState(false)

  useEffect(() => {
    // 参数回填
    if (_data.dataConfig?.api) {
      if (['post', 'put', 'patch'].includes(_data.dataConfig?.api?.data?.method)) {
        setIsShowBody(true)
      }
      _requestMethodConfig.value = _data.dataConfig?.api?.data?.method || 'get'
      setRequestMethods(_requestMethodConfig)
      _baseUrlDataConfig.value = _data.dataConfig?.api?.data?.baseUrl || ''
      setBaseUrlData(_baseUrlDataConfig)
      _requestHeaderDataConfig.value = _data.dataConfig?.api?.data?.headers || ''
      setRequestHeaderData(_requestHeaderDataConfig)
      _requestBodyDataConfig.value = _data.dataConfig?.api?.data?.body || ''
      setRequestBodyData(_requestBodyDataConfig)
      _pathDataConfig.value = _data.dataConfig?.api?.data?.path || ''
      setPathData(_pathDataConfig)
      _paramDataConfig.value = _data.dataConfig?.api?.data?.params || ''
      setParamData(_paramDataConfig)
      setReqFromBack(_data.dataConfig?.api?.data?.reqFromBack || false)
      setNeedCookie(_data.dataConfig?.api?.data?.needCookie || false)
    }
  }, [_data.config])

  const saveDataConfig = async (key, param) => {
    const dataConfig = cloneDeep(_data.dataConfig)
    if (dataConfig.api) {
      dataConfig.api.data[key] = param.value
      if(key==='data_id'){
        dataConfig.api.data.baseUrl = param.baseUrl
      }
    } else {
      let data
      data = {
        [key]: param.value,
        baseUrl: param.baseUrl
      }
      if(key==='data_id'){
        data = Object.assign({},data,{
          baseUrl: param.baseUrl
        })
      }
      dataConfig.api = {
        data
      }
    }
    props.onDataSourceChange(dataConfig)
    await http({
      url: '/visual/module/updateDatasource',
      method: 'post',
      body: {
        id: _data.id,
        data: dataConfig.api.data,
        dataType: 'api'
      }
    })
  }

  const dataSourceChange = async (param) => {
    console.log('param', param)
    const baseUrlDataNew = { ...baseUrlData }
    baseUrlDataNew.value = param.baseUrl
    setBaseUrlData(baseUrlDataNew)
    saveDataConfig('data_id', param)
  }

  const requestMethodsChange = () => {
    console.log('requestMethods', requestMethods)
    if (['post', 'put', 'patch'].includes(requestMethods.value)) {
      setIsShowBody(true)
    } else {
      setIsShowBody(false)
    }
    saveDataConfig('method',requestMethods)
  }

  const requestHeaderDataChange = () => {
    console.log('requestHeaderData', requestHeaderData)
    // todo 保存
  }

  const requestBodyDataChange = () => {
    console.log('requestBodyData', requestBodyData)
    // todo 保存
  }

  const pathDataChange = () => {
    console.log('pathData', pathData)
    // todo 保存
  }

  const paramDataChange = () => {
    console.log('paramData', paramData)
    // todo 保存
  }

  const reqFromBackChange = () => {
    console.log('reqFromBack', reqFromBack)
    setReqFromBack(!reqFromBack)
    // todo 保存
  }

  const needCookieChange = () => {
    console.log('needCookie', needCookie)
    setNeedCookie(!needCookie)
    // todo 保存
  }


  return (
    <div className="api-data-source-config">
      <SelectDataSource data={_data} type="api" onChange={dataSourceChange} />
      <div className="reuqest-baseurl" key={baseUrlData.value}>
        <CusInput data={baseUrlData} onChange={() => { }} />
      </div>
      <CusSelect data={requestMethods} onChange={requestMethodsChange} style={{ float: 'right' }} />
      <div className="request-header">
        <label className="data-name">请求头（JSON格式）</label>
        <div style={{ width: '300px', height: '198px', marginTop: '16px' }}>
          <CodeEditor data={requestHeaderData} onChange={requestHeaderDataChange} />
        </div>
      </div>
      <CusInput data={pathData} onChange={pathDataChange} style={{ marginTop: '16px' }} />
      <CusInput data={paramData} onChange={paramDataChange} />
      {
        isShowBody ?
          <div className="request-body">
            <label className="data-name">Body（JSON格式）</label>
            <div style={{ width: '300px', height: '198px', marginTop: '16px' }}>
              <CodeEditor data={requestBodyData} onChange={requestBodyDataChange} />
            </div>
          </div> : null
      }
      <div className="request-back">
        <Checkbox checked={reqFromBack} onChange={reqFromBackChange}>后端发起请求</Checkbox>
      </div>
      <div className="request-cookie">
        <Checkbox checked={needCookie} onChange={needCookieChange}>需要cookie</Checkbox>
      </div>
    </div>
  )
}

export default memo(APIDataSource)