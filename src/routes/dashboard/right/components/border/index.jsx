import React, { memo, useState, useEffect } from 'react';
import './index.less'
import { isHex, rgbToHex, hexToRgb, getRgbaNum } from '../../../../../utils/color'
import CusInputNumber from '../cusInputNumber'

import {
  Form,
  InputNumber,
  Select,
  Row, Col
} from 'antd';
import { SketchPicker } from 'react-color'

const Border = props => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const formItemLayout = {
    labelAlign: 'left'
  };
  const _data = props.data
  const _width = { value: _data.value.width, config: { min: 0 } }
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [border, setBorder] = useState({
    type: _data.value.type,
    color: isHex(_data.value.color) ? {
      ...hexToRgb(_data.value.color),
      a: 1
    } : {
      ...getRgbaNum(_data.value.color)
    },
  });
  const [popStyle, setPopStyle] = useState({})

  const selectBgc = (e) => {
    let style
    // 判断弹出的颜色选择器应该放在上面或者下面
    if (e.view.innerHeight - e.clientY < 350) {
      style = {
        left: `${e.clientX - 80}px`,
        bottom: `${(e.view.innerHeight - e.clientY) + 20}px`
      }
    } else {
      style = {
        left: `${e.clientX - 80}px`,
        top: `${e.clientY + 20}px`
      }
    }
    setPopStyle(style)
    setDisplayColorPicker(!displayColorPicker)
  }
  const colorChange = (e) => {
    setBorder({
      ...border,
      color: e.rgb
    })
    if (e.rgb.a === 1) {
      _data.value.color = e.hex
    } else {
      _data.value.color = `rgba(${e.rgb.r},${e.rgb.g},${e.rgb.b},${e.rgb.a})`
    }
    props.onChange()
  }

  const typeChange = (val) => {
    setBorder({
      ...border,
      type: val
    })
    _data.value.type = val
    props.onChange()
  }

  const widthChange = () => {
    _data.value.width = _width.value
    props.onChange()
  }

  return (
    <Form
      className="custom-form chart-radius"
      form={form}
      {...formItemLayout}
      colon={false}
    >
      <Form.Item
        name="border"
        label={_data.displayName}
      >
        <Form.Item name="type" noStyle>
          <Select
            className="custom-select"
            defaultValue={border.type}
            style={{ width: '86px', marginRight: '8px', float: 'left', marginBottom: 0 }}
            onChange={typeChange}
          >
            <Option value="solid">实线</Option>
            <Option value="dotted">虚线</Option>
          </Select>
        </Form.Item>
        <Form.Item name="width" noStyle>
          <CusInputNumber
            data={_width}
            onChange={widthChange}
            formStyle={{ marginRight: '8px', float: 'left', marginBottom: '-16px' }}
            style={{ width: '86px' }}
          />
        </Form.Item>
        <Form.Item name="color" noStyle>
          <div className="color-swatch"
            onClick={e => selectBgc(e)}
            style={{ marginRight: 0 }}
          >
            <div
              className="color-dis"
              style={{ background: `rgba(${border.color.r}, ${border.color.g}, ${border.color.b}, ${border.color.a})` }}
            />
          </div>
          {displayColorPicker ? <div className="color-popover" style={{ ...popStyle }}>
            <div className="color-cover" onClick={() => { setDisplayColorPicker(false) }} />
            <SketchPicker color={border.color} onChange={(e) => { colorChange(e) }} />
          </div> : null}
        </Form.Item>
        <Row style={{ width: '100%' }}>
          <Col span={10} className="detail-txt">线型</Col>
          <Col span={10} className="detail-txt" style={{ textIndent: '4px' }}>粗细</Col>
          <Col span={4} className="detail-txt" style={{ textIndent: '6px' }}>颜色</Col>
        </Row>
      </Form.Item>
    </Form>
  )
}

export default memo(Border)