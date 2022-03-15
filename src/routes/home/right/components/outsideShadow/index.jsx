import React, { memo, useState, useEffect } from 'react';
import './index.css'
import { SketchPicker } from 'react-color'

import {
  Form,
  Input,
  InputNumber,
  Row, Col
} from 'antd';

const OutsideShadowSetting = props => {
  const [form] = Form.useForm();
  const formItemLayout = {
    labelAlign: 'left'
  };
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [shadow, setShadow] = useState({
    hex: '#232630',
    rgb: {
      r: 35,
      g: 38,
      b: 48,
      a: 1
    },
    x:0,
    y:0,
    dim:0,
    extend:0,
  });

  const selectBgc = () => {
    setDisplayColorPicker(!displayColorPicker)
  }
  const handleBgcChange = (e) => {
    setShadow({
      ...shadow,
      hex: e.hex,
      rgb: e.rgb,
    })
  }
  const shadowChange = ()=>{

  }


  return (
    <Form
      className="custom-form"
      form={form}
      {...formItemLayout}
      colon={false}
    >
      <Form.Item
        name="outside"
        label="外阴影"
      >
        <Input.Group compact style={{ marginTop: '8px' }} className="fontBi">
          <div className="color-swatch" onClick={selectBgc} style={{ marginRight: '8px' }}>
            <div className="color-dis" style={{ background: `rgba(${shadow.rgb.r}, ${shadow.rgb.g}, ${shadow.rgb.b}, ${shadow.rgb.a})` }} />
          </div>
          {displayColorPicker ? <div className="color-popover">
            <div className="color-cover" onClick={() => { setDisplayColorPicker(false) }} />
            <SketchPicker color={shadow.rgb} onChange={(e) => { handleBgcChange(e) }} />
          </div> : null}
          <Form.Item name="x" noStyle>
            <InputNumber  controls={false} defaultValue={shadow.x} className="po-size-input shadow-input" onBlur={shadowChange} />
          </Form.Item>
          <Form.Item name="y" noStyle>
            <InputNumber  controls={false} defaultValue={shadow.y} className="po-size-input shadow-input" onBlur={shadowChange} />
          </Form.Item>
          <Form.Item name="dim" noStyle>
            <InputNumber  controls={false} defaultValue={shadow.dim} className="po-size-input shadow-input" onBlur={shadowChange} />
          </Form.Item>
          <Form.Item name="extend" noStyle>
            <InputNumber  controls={false} defaultValue={shadow.extend} className="po-size-input shadow-input" onBlur={shadowChange} />
          </Form.Item>
        </Input.Group>
        <Row>
          <Col span={8} className="detail-txt" style={{ textIndent: '40px' }}>X</Col>
          <Col span={4} className="detail-txt" style={{ textIndent: '12px' }}>Y</Col>
          <Col span={6} className="detail-txt" style={{ textIndent: '22px' }}>模糊</Col>
          <Col span={6} className="detail-txt" style={{ textIndent: '14px' }}>扩展</Col>
        </Row>
      </Form.Item>
    </Form>
  )
}

export default memo(OutsideShadowSetting)