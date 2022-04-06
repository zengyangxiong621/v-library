import React, { memo, useState } from 'react'
import './index.less'
import { SketchPicker } from 'react-color'
import { isHex, rgbToHex, hexToRgb, getRgbaNum } from '../../../../../utils/color'

import {
  Form,
  Input,
  InputNumber,
  Select,
  Row, Col
} from 'antd';


const TextStyle = props => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const formItemLayout = {
    labelAlign: 'left'
  };

  const _data = props.data;
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [font, setFont] = useState({
    fontFamily: _data.value.fontFamily,
    fontSize: _data.value.fontSize,
    fontWeight: _data.value.fontWeight,
    color: isHex(_data.value.color) ? {
      ...hexToRgb(_data.value.color),
      a: 1
    } : {
      ...getRgbaNum(_data.value.color)
    },
  })

  const selectColor = () => {
    setDisplayColorPicker(!displayColorPicker)
  }

  const fontChange = (str, e) => {
    setFont({
      ...font,
      [str]: str === 'color' ? e.rgb : e,
    })
    if (str !== 'color') {
      _data.value[str] = e
    } else {
      if (e.rgb.a === 1) {
        _data.value.color = e.hex
      } else {
        _data.value.color = `rgba(${e.rgb.r},${e.rgb.g},${e.rgb.b},${e.rgb.a})`
      }
    }
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
        name="style"
        label={_data.displayName}
      >
        <Input.Group compact style={{ marginBottom: '8px' }}>
          <Form.Item name="fontFamily" noStyle>
            <Select
              className="font-select"
              defaultValue={font.fontFamily}
              style={{ width: '145px' }}
              onChange={(e) => fontChange('fontFamily', e)}
            >
              <Option value="Microsoft Yahei">微软雅黑</Option>
              <Option value="宋体">宋体</Option>
              <Option value="bolder">黑体</Option>
            </Select>
          </Form.Item>
          <Form.Item name="fontSize" noStyle>
            <InputNumber
              min={12}
              step={1}
              defaultValue={font.fontSize}
              className="po-size-input"
              style={{ width: '68px' }}
              onChange={(e) => fontChange('fontSize', e)}
            />
          </Form.Item>
        </Input.Group>
        <Input.Group compact>
          <Form.Item name="fontWeight" noStyle>
            <Select
              className="custom-select"
              defaultValue={font.fontWeight}
              style={{ width: '181px',marginBottom: 0 }}
              onChange={(e) => fontChange('fontWeight', e)}
            >
              <Option value="normal">normal</Option>
              <Option value="bold">bold</Option>
              <Option value="bolder">bolder</Option>
              <Option value="lighter">lighter</Option>
            </Select>
          </Form.Item>
          <div className="color-swatch" onClick={selectColor} style={{marginLeft:'8px',marginRight:0}}>
            <div className="color-dis" style={{ background: `rgba(${font.color.r}, ${font.color.g}, ${font.color.b}, ${font.color.a})` }} />
          </div>
          {displayColorPicker ? <div className="color-popover">
            <div className="color-cover" onClick={() => { setDisplayColorPicker(false) }} />
            <SketchPicker color={font.color} onChange={(e) => fontChange('color', e)} />
          </div> : null}
        </Input.Group>
        <Row>
          <Col span={20} className="detail-txt">文字粗细</Col>
          <Col span={4} className="detail-txt" style={{ textIndent: '8px' }}>颜色</Col>
        </Row>
      </Form.Item>
    </Form>
  )
}

export default memo(TextStyle)