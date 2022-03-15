import React, { memo, useState } from 'react'
import './index.css'
import PositionSize from '../positionSize'
import LoadAnimation from '../loadAnimation'

import {
  Form,
  Input,
  Slider,
  Row,
  Col,
  Collapse,
} from 'antd';

const GroupConfig = props => {
  const [form] = Form.useForm();

  const { Panel } = Collapse;
  const [opacityValue, setOpacityValue] = useState(100)
  const [size, setSize] = useState({
    x: 100,
    y: 110,
    w: 100,
    h: 100,
  });
  const [hideGlup, setHideGlup] = useState(false)

  const opacityChange = (e) => {
    form.setFieldsValue({
      opacityInput: e
    })
  }

  const opacityValueChange = (e) => {
    const value = e.target.value
    const flag = isNaN(value)
    const opacity = flag ? 0 : parseInt(value) > 100 ? 100 : parseInt(value) < 0 ? 0 : parseInt(value)
    setOpacityValue(opacity)
    form.setFieldsValue({
      opacity,
      opacityInput: opacity
    })
  }

  const formItemLayout = {
    labelAlign: 'left'
  };

  const onPosSizeChange = (str, size) => {
    // todo  设置到组
    console.log('onPosSizeChange', str, size)
  }

  const onHideGlupChange = (val) => {
    // todo  设置到组 
    console.log('onHideGlupChange', val)
  }

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

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
          onFinish={onFinish}
        >
          <PositionSize size={size} hideGlup={hideGlup} onPosSizeChange={onPosSizeChange} onHideGlupChange={onHideGlupChange}></PositionSize>
          <Form.Item label="透明度">
            <Row>
              <Col span={16}>
                <Form.Item name="opacity" noStyle>
                  <Slider
                    min={0}
                    max={100}
                    tooltipVisible={false}
                    onChange={opacityChange}
                    defaultValue={typeof opacityValue === 'number' ? opacityValue : 0}
                  />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item name="opacityInput" noStyle>
                  <Input style={{ width: '50px' }} defaultValue={opacityValue} className="size-input" suffix="%" onBlur={opacityValueChange} />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
          <Collapse accordion className="custom-collapse">
            <Panel header="载入动画" key="1">
              <LoadAnimation />
            </Panel>
          </Collapse>
        </Form>
      </div>
    </div>
  )
}

export default memo(GroupConfig)

