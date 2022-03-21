import React, { memo, useState } from 'react'
import './index.css'

import {
  Form,
  Input,
  InputNumber,
  Row,
  Col
} from 'antd';
import { SketchPicker } from 'react-color'

const isHex = (str) => {
  return str.startsWith('#')
}
const rgbToHex = (rgba) => {
  const { r, g, b } = rgba
  let hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  return hex;
}
const hexToRgb = (hexValue) => {
  const rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const hex = hexValue.replace(rgx, (m, r, g, b) => r + r + g + g + b + b);
  const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  const r = parseInt(rgb[1], 16);
  const g = parseInt(rgb[2], 16);
  const b = parseInt(rgb[3], 16);
  return {
    r,
    g,
    b
  };
}
const getRgbaNum = (rgba) => {
  let value = rgba.match(/(\d(\.\d+)?)+/g)
  return {
    r: value[0],
    g: value[1],
    b: value[2],
    a: value[3]
  }
}

const BackgroundSetting = props => {
  const [form] = Form.useForm();
  const formItemLayout = {
    labelAlign: 'left'
  };
  const _data = props.data;

  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState({
    hex: isHex(_data.value) ? _data.value : rgbToHex(getRgbaNum(_data.value)),
    rgb: isHex(_data.value) ? {
      ...hexToRgb(_data.value),
      a: 1
    } : {
      ...getRgbaNum(_data.value)
    },
    opacity: isHex(_data.value) ? 100 : getRgbaNum(_data.value).a * 100
  });
  const handleBgcChange = (e) => {
    setColor({
      hex: e.hex,
      rgb: e.rgb,
      opacity: e.rgb.a * 100
    })
    form.setFieldsValue({
      hex: e.hex,
      opacity: e.rgb.a * 100
    });
    if(e.rgb.a===1){
      props.onChange(e.hex)
    }else{
      props.onChange(`rgba(${e.rgb.r},${e.rgb.g},${e.rgb.b},${e.rgb.a})`)
    }
  }
  const handleHexChange = (e) => {
    const hexTmp = e.target.value
    const flag =
      /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(hexTmp)
    const hex = flag ? hexTmp : '#000000';
    const rgb = hexToRgb(hex)
    setColor({
      hex,
      rgb: {
        r: rgb.r,
        g: rgb.g,
        b: rgb.b,
        a: color.rgb.a
      },
      opacity: color.opacity
    })
    form.setFieldsValue({
      hex,
    });
    if(color.opacity === 100){
      props.onChange(hex)
    }else{
      props.onChange(`rgba(${rgb.r},${rgb.g},${rgb.b},${color.rgb.a})`)
    }
  }
  const handleOpacityChange = (e) => {
    const opacity = e > 100 ? 100 : e < 0 ? 0 : e
    setColor({
      hex: color.hex,
      rgb: {
        r: color.rgb.r,
        g: color.rgb.g,
        b: color.rgb.b,
        a: opacity / 100
      },
      opacity
    })
    form.setFieldsValue({
      opacity
    });
    if(opacity === 100){
      props.onChange(color.hex)
    }else{
      props.onChange(`rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${opacity / 100})`)
    }
  }
  const selectBgc = () => {
    setDisplayColorPicker(!displayColorPicker)
  }

  return (
    <Form
      className="custom-form"
      form={form}
      {...formItemLayout}
      colon={false}
    >
      <div className="color-swatch" onClick={selectBgc}>
        <div className="color-dis" style={{ background: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})` }} />
      </div>
      {displayColorPicker ? <div className="color-popover">
        <div className="color-cover" onClick={() => { setDisplayColorPicker(false) }} />
        <SketchPicker color={color.rgb} onChange={(e) => { handleBgcChange(e) }} />
      </div> : null}
      <Form.Item noStyle name="hex">
        <Input defaultValue={color.hex} className="input-hex" onBlur={(e) => { handleHexChange(e) }} />
      </Form.Item>
      <Form.Item noStyle name="opacity">
        <InputNumber defaultValue={color.opacity} className="size-input input-opacity" onChange={(e) => { handleOpacityChange(e) }} min={0}
          max={100}
          formatter={value => `${value}%`}
          parser={value => value.replace('%', '')} />
      </Form.Item>
      <Row>
        <Col span={4} className="detail-txt">颜色</Col>
        <Col span={11} className="detail-txt" style={{ textIndent: '4px' }}>Hex</Col>
        <Col span={8} className="detail-txt" style={{ textIndent: '6px' }}>不透明度</Col>
      </Row>
    </Form>
  )
}

export default memo(BackgroundSetting)