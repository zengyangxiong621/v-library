import React, { memo, useState } from 'react'
import './index.less'

import {
  Form,
  Input,
  Row,
  Col
} from 'antd';
import { SketchPicker } from 'react-color'
import { isHex, rgbToHex, hexToRgb, getRgbaNum } from '../../../../../utils/color'
import CusInputNumber from '../cusInputNumber'

const TextStroke = props => {
  const [form] = Form.useForm();
  const formItemLayout = {
    labelAlign: 'left'
  };
  const _data = props.data;
  const _width = {
    value: _data.value.width,
    config: {
      suffix: 'px',
      min: 0
    }
  }

  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [stroke, setStroke] = useState({
    color: _data.value.color,
    rgb: {
      ...hexToRgb(_data.value.color),
      a: 1
    }
  });

  const colorChange = (e) => {
    setStroke({
      color: e.hex,
      rgb: e.rgb
    })
    form.setFieldsValue({
      hex: e.hex,
    });
    _data.value.color = e.hex
    props.onChange()
  }
  const handleHexChange = (e) => {
    const hexTmp = e.target.value
    const flag =
      /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(hexTmp)
    const hex = flag ? hexTmp : '#000000';
    const rgb = hexToRgb(hex)
    setStroke({
      color: hex,
      rgb: {
        r: rgb.r,
        g: rgb.g,
        b: rgb.b,
        a: 1
      }
    })
    form.setFieldsValue({
      hex,
    });
    _data.value.color = hex
    props.onChange()
  }
  const selectColor = () => {
    setDisplayColorPicker(!displayColorPicker)
  }

  const widthChange = () => {
    _data.value.width = _width.value
    props.onChange()
  }

  return (
    <Form
      className="custom-form"
      form={form}
      {...formItemLayout}
      colon={false}
    >
      <Form.Item label={_data.displayName}>
        <Form.Item name="width" noStyle>
          <CusInputNumber
            data={_width}
            onChange={widthChange}
            formStyle={{ float: 'left',marginBottom: '-16px',marginRight: '8px'}}
            style={{ width: '78px' }}
          />
        </Form.Item>
        <div className="color-swatch" onClick={selectColor}>
          <div className="color-dis" style={{ background: `rgba(${stroke.rgb.r}, ${stroke.rgb.g}, ${stroke.rgb.b}, ${stroke.rgb.a})` }} />
        </div>
        {displayColorPicker ? <div className="color-popover">
          <div className="color-cover" onClick={() => { setDisplayColorPicker(false) }} />
          <SketchPicker color={stroke.rgb} onChange={(e) => { colorChange(e) }} />
        </div> : null}
        <Form.Item noStyle name="hex">
          <Input defaultValue={stroke.color} className="input-hex" style={{marginRight: 0}} onBlur={(e) => { handleHexChange(e) }} />
        </Form.Item>
        <Row>
          <Col span={8} className="detail-txt">粗细</Col>
          <Col span={6} className="detail-txt" style={{ textIndent: '13px' }}>颜色</Col>
          <Col span={8} className="detail-txt" >Hex</Col>
        </Row>
      </Form.Item>
    </Form>
  )

}

export default memo(TextStroke)