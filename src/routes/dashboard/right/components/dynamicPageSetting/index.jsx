import React, { memo, useState, useEffect } from 'react';
import { connect } from 'dva'
import './index.less'
import { find } from '../../../../../utils/common'
import BackgroundColor from '../color'
import UploadImg from '../uploadImg'
import CusInputNumber from '../cusInputNumber'
import RadioGroup from '../radioGroup'
import { deepClone } from '../../../../../utils'
import { Form } from 'antd';
import debounce from 'lodash/debounce';
import { http } from '../../../../../services/request'
import { v4 as uuidv4 } from 'uuid';

let isSettingsChange = false
const DynamicPageSetting = ({ bar, dispatch, ...props }) => {
  const formItemLayout = {
    labelAlign: 'left'
  };
  const pageConfig = bar.dashboardConfig
  const styleColorConfig = find(pageConfig, 'styleColor')
  const backgroundImg = find(pageConfig, 'backgroundImg')
  const thumbImg = find(pageConfig, 'thumbImg')
  const [key, setKey] = useState(uuidv4())

  const [form] = Form.useForm();

  useEffect(() => {
    if(!isSettingsChange){
      setKey(uuidv4())
    }
  }, [bar.dashboardConfig])

  const settingsChange = debounce(() => {
    isSettingsChange = true
    console.log('pageConfig配置', find(pageConfig, 'styleColor'))
    saveData()
  }, 300)

  const saveData = async () => {
    const data = await http({
      url: '/visual/application/update',
      method: 'post',
      body: {
        config: bar.dashboardConfig.filter(item => ['backgroundImg', 'styleColor'].includes(item.name)),
        dashboardId: bar.stateId
      }
    })
  }

  return (
    <div className="reference-wrap">
      <h3 className="reference-set-header">
        页面设置
      </h3>
      <div className="content" key={key}>
        <Form
          className="custom-form"
          form={form}
          {...formItemLayout}
          colon={false}
        >
          <BackgroundColor data={styleColorConfig} onChange={settingsChange} />
          <UploadImg data={backgroundImg} onChange={settingsChange} />
          {/* <EditTable></EditTable> */}
        </Form>
      </div>
    </div>
  )
}

export default connect(({ bar }) => ({
  bar
}))(DynamicPageSetting)

