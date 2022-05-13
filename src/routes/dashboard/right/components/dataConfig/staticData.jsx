import React, { memo, useState, useEffect } from 'react'
import { connect } from 'dva'
import './index.less'
import CodeEditor from '../codeEditor'
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

const StaticData = ({ bar, dispatch, ...props }) => {
  const _data = props.data
  const [staticData, setStaticData] = useState(sourceCodeData)

  useEffect(() => {
    const staticDataNew = {...staticData}
    staticDataNew.value = JSON.stringify(_data.staticData.data, null, 2) || ''
    setStaticData(staticDataNew)
  }, [_data.staticData.data])

  const staticDataChange = debounce(() => {
    const staDa = { ...staticData }
    setStaticData(staDa)
    // try {
    //   JSON.parse(staticData.value)
    // } catch (e) {
    //   message.error('格式错误')
    //   return
    // }
    // props.onChange(staticData.value)
    // dispatch({
    //   type: 'bar/save',
    //   payload: {
    //     componentData: {
    //       ...bar.componentData,
    //       [_data.id]: JSON.parse(staticData.value)
    //     }
    //   },
    // })
  }, 300)

  return (
    <div style={{ width: '300px', height: '198px', marginTop: '16px' }}>
      <CodeEditor data={staticData} onChange={staticDataChange} />
    </div>
  )
}

export default connect(({ bar }) => ({
  bar
}))(StaticData)