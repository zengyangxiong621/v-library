import React, { memo, useState, useEffect } from 'react';
import './index.css'
import { SketchPicker } from 'react-color'
import { isHex, rgbToHex, hexToRgb, getRgbaNum } from '../../../../../utils/color'

import {
  Form,
  Input,
  InputNumber,
  Row, Col
} from 'antd';

const BoxShadow = props => {
  const [form] = Form.useForm();
  const formItemLayout = {
    labelAlign: 'left'
  };

  const _data = props.data;

  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [shadow, setShadow] = useState({
    hex: isHex(_data.value.color) ? _data.value.color : rgbToHex(getRgbaNum(_data.value.color)),
    rgb: isHex(_data.value.color) ? {
      ...hexToRgb(_data.value.color),
      a: 1
    } : {
      ...getRgbaNum(_data.value.color)
    },
    hShadow: _data.value.hShadow || 0,
    vShadow: _data.value.vShadow || 0,
    blur: _data.value.blur || 0,
    extend: _data.value.extend || 0,
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
    if (e.rgb.a === 1) {
      _data.value.color = e.hex
    } else {
      _data.value.color = `rgba(${e.rgb.r},${e.rgb.g},${e.rgb.b},${e.rgb.a})`
    }
    props.onChange()
  }
  const shadowChange = (field,e) => {
    const value = parseInt(e.target.value)
    setShadow({
      ...shadow,
      [field]: value,
    })
    _data.value[field] = value
    props.onChange()
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
        label={_data.displayName}
      >
        <Input.Group compact className="fontBi">
          <div className="color-swatch" onClick={selectBgc} style={{ marginRight: '8px' }}>
            <div className="color-dis" style={{ background: `rgba(${shadow.rgb.r}, ${shadow.rgb.g}, ${shadow.rgb.b}, ${shadow.rgb.a})` }} />
          </div>
          {displayColorPicker ? <div className="color-popover">
            <div className="color-cover" onClick={() => { setDisplayColorPicker(false) }} />
            <SketchPicker color={shadow.rgb} onChange={(e) => { handleBgcChange(e) }} />
          </div> : null}
          <Form.Item name="hShadow" noStyle>
            <InputNumber controls={false} defaultValue={shadow.hShadow} className="po-size-input shadow-input" onBlur={(e)=>shadowChange('hShadow',e)} />
          </Form.Item>
          <Form.Item name="vShadow" noStyle>
            <InputNumber controls={false} defaultValue={shadow.vShadow} className="po-size-input shadow-input" onBlur={(e)=>shadowChange('vShadow',e)} />
          </Form.Item>
          <Form.Item name="blur" noStyle>
            <InputNumber controls={false} defaultValue={shadow.blur} className="po-size-input shadow-input" onBlur={(e)=>shadowChange('blur',e)} />
          </Form.Item>
          <Form.Item name="extend" noStyle>
            <InputNumber disabled controls={false} defaultValue={shadow.extend} className="po-size-input shadow-input" onBlur={(e)=>shadowChange('extend',e)} />
          </Form.Item>
        </Input.Group>
        <Row>
          <Col span={8} className="detail-txt" style={{ textIndent: '44px' }}>X</Col>
          <Col span={4} className="detail-txt" style={{ textIndent: '16px' }}>Y</Col>
          <Col span={6} className="detail-txt" style={{ textIndent: '24px' }}>模糊</Col>
          <Col span={6} className="detail-txt" style={{ textIndent: '16px' }}>扩展</Col>
        </Row>
      </Form.Item>
    </Form>
  )
}

export default memo(BoxShadow)