import React, { memo, useState } from 'react'
import { connect } from 'dva'
import './index.css'
import { deepClone } from '../../../../../utils'
import { find } from '../../../../../utils/common'

import PositionSize from '../positionSize'
import Checkbox from '../checkBox'
import Range from '../range'
import LoadAnimation from '../loadAnimation'

import {
  Form,
  Collapse
} from 'antd';



const GroupConfig = ({bar, dispatch ,...props }) => {
  const [form] = Form.useForm();
  const { Panel } = Collapse;
  const groupConfig = deepClone(bar.groupConfig)
  const dimensionConfig = find(groupConfig, 'dimension')
  const hideDefaultConfig = find(groupConfig, 'hideDefault')
  const opacityConfig = find(groupConfig, 'opacity')
  const interactionConfig = find(groupConfig, 'interaction').value

  const formItemLayout = {
    labelAlign: 'left'
  };

  const settingsChange = () => {
    console.log(groupConfig)
    dispatch({
      type: 'bar/save',
      payload: {
        groupConfig
      }
    })
  }

  return (
    <div className="GroupConfig-wrap">
      <h3 className="header">
        组设置
      </h3>
      <div className="content">
        <Form
          className="custom-form"
          form={form}
          {...formItemLayout}
          colon={false}
        >
          <PositionSize data={dimensionConfig} onChange={settingsChange}></PositionSize>
          <Checkbox data={hideDefaultConfig} onChange={settingsChange} />
          <Range data={opacityConfig} onChange={settingsChange} />
          <Collapse accordion className="custom-collapse">
            <Panel header="载入动画" key="1">
              <LoadAnimation data={interactionConfig} onChange={settingsChange}/>
            </Panel>
          </Collapse>
        </Form>
      </div>
    </div>
  )
}

export default connect(({ bar }) => ({
  bar
}))(GroupConfig)