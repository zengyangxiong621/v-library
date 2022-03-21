import React, { memo, useState } from 'react'
import './index.css'
import PositionSize from '../positionSize'
import LoadAnimation from '../loadAnimation'
import TextStyleSetting from '../textStyleSetting'
import AlignSetting from '../alignSetting'
import OutsideShadowSetting from '../outsideShadow'
import { EditableTable } from '../fieldMapTable'
import ComponentCard from '../componentCard'
import RotationAngle from '../rotationAngle'
import ChartMarginSetting from '../chartMargin'
import ChartRadiusSetting from '../chartRadius'
import ChartStrokeSetting from '../chartStroke'

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
  const [size, setSize] = useState({
    x: 100,
    y: 110,
    w: 100,
    h: 100,
  });
  const [hideGlup, setHideGlup] = useState(false)

  const onPosSizeChange = (str, size) => {
    // todo  设置到组
    console.log('onPosSizeChange', str, size)
  }

  const onHideGlupChange = (val) => {
    // todo  设置到组 
    console.log('onHideGlupChange', val)
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
              <PositionSize size={size} hideGlup={hideGlup} onPosSizeChange={onPosSizeChange} onHideGlupChange={onHideGlupChange}></PositionSize>
              <TextStyleSetting></TextStyleSetting>
              <AlignSetting></AlignSetting>
              <Collapse accordion className="custom-collapse" defaultActiveKey={['1']} >
                <Panel header="阴影" key="1" extra={<Switch defaultChecked onChange={switchChange} />}>
                  <OutsideShadowSetting></OutsideShadowSetting>
                </Panel>
              </Collapse>
              <ChartStrokeSetting />
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