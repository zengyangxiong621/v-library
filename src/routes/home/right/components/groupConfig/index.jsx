import React, { memo, useState } from 'react'
import './index.css'
import { find } from '../../../../../utils/common'
import PositionSize from '../positionSize'
import Checkbox from '../checkBox'
import OpacitySetting from '../opacitySetting'
import LoadAnimation from '../loadAnimation'

import {
  Form,
  Collapse
} from 'antd';

const groupConfig = [
  {  
    "name": "dimension",
    "displayName": "位置尺寸",
    "config": {
      "lock":true
    },
    "value": [
      {
        "name": "left",
        "displayName": "X轴坐标",
        "value": 100
      },
      {
        "name": "top",
        "displayName": "Y轴坐标",
        "value": 100
      },
      {
        "name": "width",
        "displayName": "宽度",
        "value": 100
      },
      {
        "name": "height",
        "displayName": "高度",
        "value": 100
      }
    ]
  },
  {
    "name": "hideDefault",
    "displayName": "默认隐藏",
    "value": false
  },
  {
    "name": "opacity",
    "displayName": "透明度",
    "value": 0.7
  }
]

const GroupConfig = props => {
  const [form] = Form.useForm();
  const { Panel } = Collapse;

  const dimensionConfig = find(groupConfig, 'dimension')
  const hideDefaultConfig = find(groupConfig, 'hideDefault')
  const opacityConfig = find(groupConfig, 'opacity')

  const formItemLayout = {
    labelAlign: 'left'
  };

  const settingsChange = (val) => {
    console.log(groupConfig)
    // todo 更新数据
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
          <OpacitySetting data={opacityConfig} onChange={settingsChange} />
          <Collapse accordion className="custom-collapse">
            <Panel header="载入动画" key="1">
              <LoadAnimation/>
            </Panel>
          </Collapse>
        </Form>
      </div>
    </div>
  )
}

export default memo(GroupConfig)

