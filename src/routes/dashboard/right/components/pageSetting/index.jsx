import React, { memo, useState, useEffect } from 'react';
import { connect } from 'dva'
import './index.less'
import { find } from '../../../../../utils/common'
import BackgroundColor from '../color'
import PageSize from '../pageSize'
import UploadImg from '../uploadImg'
import CusInputNumber from '../cusInputNumber'
import RadioGroup from '../radioGroup'
import { deepClone } from '../../../../../utils'
import { Form } from 'antd';
import EditTable from '../editTable'
import debounce from 'lodash/debounce';
import { useFetch } from '../../../../tempDataSource/tool/useFetch'

const PageSetting = ({ bar, dispatch, ...props }) => {
  const formItemLayout = {
    labelAlign: 'left'
  };
  const pageConfig = deepClone(bar.pageConfig)
  const recommendConfig = find(pageConfig, 'recommend')
  const styleColorConfig = find(pageConfig, 'styleColor')
  const backgroundImg = find(pageConfig, 'backgroundImg')
  const gridSpacing = find(pageConfig, 'gridSpacing')
  const zoomConfig = find(pageConfig, 'zoom')
  const thumbImg = find(pageConfig, 'thumbImg')

  const [form] = Form.useForm();

  const settingsChange = debounce(() => {
    console.log('pageConfig changed')
    dispatch({
      type: 'bar/save',
      payload: {
        pageConfig
      }
    })
    saveData()
  }, 300)

  const saveData = async () => {
    // todo 替换假数据
    const params = {
      config: pageConfig,
      thumb: thumbImg.value,
      dashboardId: '1513702962304577537'
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await useFetch('/visual/application/update', {
      body: JSON.stringify(params)
    })
  }

  return (
    <div className="PageSetting-wrap">
      <h3 className="header">
        页面设置
      </h3>
      <div className="content">
        <Form
          className="custom-form"
          form={form}
          {...formItemLayout}
          colon={false}
        >
          <PageSize data={recommendConfig} onChange={settingsChange} />
          <BackgroundColor data={styleColorConfig} onChange={settingsChange} />
          <UploadImg data={backgroundImg} onChange={settingsChange} />
          <CusInputNumber data={gridSpacing} onChange={settingsChange} style={{ width: '100%' }} />
          <RadioGroup data={zoomConfig} onChange={settingsChange} />
          <UploadImg data={thumbImg} onChange={settingsChange} />
          {/* <EditTable></EditTable> */}
        </Form>
      </div>
    </div>
  )
}

export default connect(({ bar }) => ({
  bar
}))(PageSetting)

