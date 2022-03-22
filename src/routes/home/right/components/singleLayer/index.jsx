import React, { memo, useState } from 'react'
import './index.css'
import PositionSize from '../positionSize'
import LoadAnimation from '../loadAnimation'
import TextStyleSetting from '../textStyleSetting'
import AlignSetting from '../alignSetting'
import OutsideShadowSetting from '../outsideShadow'
import { EditableTable } from '../fieldMapTable'
import ComponentCard from '../componentCard'
import Checkbox from '../checkBox'

import {
  Form,
  Collapse,
  Tabs,
  Switch
} from 'antd';

const SingleLayer = props => {
  const { Panel } = Collapse;
  const { TabPane } = Tabs;
  const formItemLayout = {
    labelAlign: 'left'
  };

  const dimensionConfig = {
    "name": "dimension",
    "displayName": "位置尺寸",
    "type": "dimensionInputGroup",
    config: {
      lock:false
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
  }
  const hideDefaultConfig = {
    "name": "hideDefault",
    "displayName": "默认隐藏",
    "type":"hideCheckBox",
    "value": false
  }

  const dimensionChange = (val) => {
    console.log('dimensionChange', val)
  }

  const hideDefaultChange = (val) => {
    console.log('hideDefaultChange', val)
  }

  const switchChange = (checked) => {
    console.log('switchChange', checked)
  }

  return (
    <div className="SingleLayer-wrap">
      <div className="content">
        <Tabs defaultActiveKey="1" type="card" className="custom-tabs">
          <TabPane tab="样式" key="1">
            <ComponentCard>
              <PositionSize data={dimensionConfig} onChange={dimensionChange}></PositionSize>
              <Checkbox data={hideDefaultConfig} onChange={hideDefaultChange} />
              <TextStyleSetting></TextStyleSetting>
              <AlignSetting></AlignSetting>
              <Collapse accordion className="custom-collapse" defaultActiveKey={['1']} >
                <Panel header="阴影" key="1" extra={<Switch defaultChecked onChange={switchChange} />}>
                  <OutsideShadowSetting></OutsideShadowSetting>
                </Panel>
              </Collapse>
            </ComponentCard>
          </TabPane>
          <TabPane tab="数据" key="2">
            <ComponentCard>
              <EditableTable />
            </ComponentCard>
          </TabPane>
          <TabPane tab="交互" key="3">
            <ComponentCard>
              <Form className="custom-form" {...formItemLayout} colon={false}>
                <Collapse accordion className="custom-collapse" defaultActiveKey={['1']} >
                  <Panel header="载入动画" key="1">
                    <LoadAnimation></LoadAnimation>
                  </Panel>
                </Collapse>
              </Form>
            </ComponentCard>
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default memo(SingleLayer)