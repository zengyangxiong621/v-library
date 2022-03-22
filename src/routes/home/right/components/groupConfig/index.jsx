import React, { memo, useState } from 'react'
import './index.css'
import { find } from '../../../../../utils/common'
import PositionSize from '../positionSize'
import OpacitySetting from '../opacitySetting'
import Checkbox from '../checkBox'
import LoadAnimation from '../loadAnimation'

import {
  Form,
  Collapse
} from 'antd';

const groupConfig = [
  {  // 该部分的位置尺寸设置，实际上是取得分组下第一个层的位置尺寸设置
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

  const dimensionChange = (val) => {
    console.log('dimensionChange', val)
  }

  const hideDefaultChange = (val) => {
    console.log('hideDefaultChange', val)
  }

  const opacityChange = (val) => {
    console.log('opacityChange', val)
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
          <PositionSize data={dimensionConfig} onChange={dimensionChange}></PositionSize>
          <Checkbox data={hideDefaultConfig} onChange={hideDefaultChange} />
          <OpacitySetting data={opacityConfig} onChange={opacityChange} />
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

