import React, { memo, useState } from 'react'
import './index.css'
import PositionSize from '../positionSize'
import LoadAnimation from '../loadAnimation'

import {
  Form,
  Collapse,
  Tabs,
  Table
} from 'antd';


const SingleLayer = props => {
  const { Panel } = Collapse;
  const { TabPane } = Tabs;
  const formItemLayout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 14,
    },
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
      <h3 className="header">
        组件设置
      </h3>
      <div className="content">
        <Tabs defaultActiveKey="1" type="card">
          <TabPane tab="样式" key="1">
            <Form
              className="custom-form"
              name="validate_other"
              {...formItemLayout}
            >
              <PositionSize size={size} hideGlup={hideGlup} onPosSizeChange={onPosSizeChange} onHideGlupChange={onHideGlupChange}></PositionSize>
            </Form>
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