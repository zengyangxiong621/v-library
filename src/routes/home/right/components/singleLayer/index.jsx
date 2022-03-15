import React, { memo, useState } from 'react'
import './index.css'
import PositionSize from '../positionSize'
import LoadAnimation from '../loadAnimation'
import TextStyleSetting from '../textStyleSetting'
import AlignSetting from '../alignSetting'
import OutsideShadowSetting from '../outsideShadow'

import {
  Form,
  Collapse,
  Tabs,
  Table,
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

  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return (
    <div className="SingleLayer-wrap">
      <div className="content">
        <Tabs defaultActiveKey="1" type="card" className="custom-tabs">
          <TabPane tab="样式" key="1">
            <div className="component-wraper">
              <h4>组件名称</h4>
              <p>组件注释</p>
            </div>
            <div className="detail-setting">
              <PositionSize size={size} hideGlup={hideGlup} onPosSizeChange={onPosSizeChange} onHideGlupChange={onHideGlupChange}></PositionSize>
              <TextStyleSetting></TextStyleSetting>
              <AlignSetting></AlignSetting>
              <Collapse accordion className="custom-collapse" defaultActiveKey={['1']} >
                <Panel header="阴影" key="1" extra={<Switch defaultChecked />}>
                  <OutsideShadowSetting></OutsideShadowSetting>
                </Panel>
              </Collapse>
            </div>
          </TabPane>
          <TabPane tab="数据" key="2">
            <Table dataSource={dataSource} columns={columns} pagination={false} />
          </TabPane>
          <TabPane tab="交互" key="3">
            <Form className="custom-form" {...formItemLayout}>
              <Collapse accordion className="custom-collapse" defaultActiveKey={['1']} >
                <Panel header="载入动画" key="1">
                  <LoadAnimation></LoadAnimation>
                </Panel>
              </Collapse>
            </Form>
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default memo(SingleLayer)