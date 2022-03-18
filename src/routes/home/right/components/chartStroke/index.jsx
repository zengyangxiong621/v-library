import React, { memo, useState, useEffect } from 'react';
import './index.less'

import {
  Form,
  Slider,
  InputNumber,
  Select,
  Row, Col
} from 'antd';
import { SketchPicker } from 'react-color'

const ChartStrokeSetting = props => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const formItemLayout = {
    labelAlign: 'left'
  };
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [stroke, setStroke] = useState({
    lineType: 'solid',
    thickness: 1,
    color: {
      r: 35,
      g: 38,
      b: 48,
      a: 1
    },
  });

  const radiusChange = (e) => {
    form.setFieldsValue({
      radiusInput: e
    })
  }
  const radiusInputChange = (e) => {
    form.setFieldsValue({
      radius: e
    })
  }
  const selectBgc = () => {
    setDisplayColorPicker(!displayColorPicker)
  }
  const handleBgcChange = (e) => {
    setStroke({
      ...stroke,
      color:e.rgb
    })
  }

  return (
    <Form
      className="custom-form chart-radius"
      form={form}
      {...formItemLayout}
      colon={false}
    >
      <Form.Item
        name="stroke"
        label="饼图描边"
      >
        <Form.Item name="lineType" noStyle>
          <Select className="custom-select" defaultValue={stroke.lineType} style={{ width: '86px', marginRight: '8px',float: 'left',marginBottom:0}}>
            <Option value="solid">实线</Option>
            <Option value="dotted">虚线</Option>
          </Select>
        </Form.Item>
        <Form.Item name="thickness" noStyle>
          <InputNumber defaultValue={stroke.thickness} className="po-size-input" style={{ width: '86px', marginRight: '8px',float: 'left'}} />
        </Form.Item>
        <Form.Item name="color" noStyle>
          <div className="color-swatch" onClick={selectBgc} style={{marginRight: 0}}>
            <div className="color-dis" style={{ background: `rgba(${stroke.color.r}, ${stroke.color.g}, ${stroke.color.b}, ${stroke.color.a})` }} />
          </div>
          {displayColorPicker ? <div className="color-popover">
            <div className="color-cover" onClick={() => { setDisplayColorPicker(false) }} />
            <SketchPicker color={stroke.color} onChange={(e) => { handleBgcChange(e) }} />
          </div> : null}
        </Form.Item>
      <Row style={{width: '100%'}}>
        <Col span={10} className="detail-txt">线型</Col>
        <Col span={10} className="detail-txt" style={{ textIndent: '4px' }}>粗细</Col>
        <Col span={4} className="detail-txt" style={{ textIndent: '6px' }}>颜色</Col>
      </Row>
      </Form.Item>
    </Form>
  )
}

export default memo(ChartStrokeSetting)