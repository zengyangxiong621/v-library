import React, { memo, useState, useEffect } from 'react';
import './index.less'
import { isHex, rgbToHex, hexToRgb, getRgbaNum } from '../../../../../utils/color'
import CusInputNumber from '../cusInputNumber'

import {
  Form,
  Input,
  InputNumber,
  Select,
  Row, Col
} from 'antd';
import { SketchPicker } from 'react-color'

const rangDirectionEnum = {
  topLeft: '左上',
  topRight: '右上',
  bottomRight: '右下',
  bottomLeft: '左下'
}

const BorderRadius = props => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const formItemLayout = {
    labelAlign: 'left'
  };
  const _data = props.data
  const _width = { value: _data.value.width, config: { min: 0, suffix: 'px' } }
  const _range = _data.range || ['all']
  let _radius = []
  if (_range[0] === 'all') {
    _radius = { value: _data.value.radius, config: { min: 0, suffix: 'px' } }
  } else {
    _radius = _range.map((item, index) => ({ value: _data.value.radius[index], config: { min: 0, suffix: 'px' } }))
  }
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [border, setBorder] = useState({
    type: _data.value.type,
    color: isHex(_data.value.color) ? {
      ...hexToRgb(_data.value.color),
      a: 1
    } : {
      ...getRgbaNum(_data.value.color)
    },
    radius: _data.value.radius
  });
  const [popStyle, setPopStyle] = useState({})

  const handleHexChange = (e) => {
    const hexTmp = e.target.value
    const flag =
      /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(hexTmp)
    const hex = flag ? hexTmp : '#000000';
    const rgb = hexToRgb(hex)
    setBorder({
      ...border,
      color: {
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

  const selectColor = (e) => {
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

  const radiusChange = () => {
    _data.value.radius = _radius.value
    props.onChange()
  }

  const rangeRadiusChange = (item, index) => {
    _data.value.radius = _radius.map(item => item.value)
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
        <Form.Item name="width" noStyle>
          <CusInputNumber
            data={_width}
            onChange={widthChange}
            formStyle={{ marginRight: '7px', float: 'left', marginBottom: '-16px' }}
            style={{ width: '107px' }}
          />
        </Form.Item>
        <Form.Item name="type" noStyle>
          <Select
            className="custom-select"
            defaultValue={border.type}
            style={{ width: '107px', float: 'left', marginBottom: 0 }}
            onChange={typeChange}
            getPopupContainer={(triggerNode) => triggerNode.parentNode}
          >
            <Option value="solid">实线</Option>
            <Option value="dotted">虚线</Option>
          </Select>
        </Form.Item>
        <Row style={{ width: '100%', marginBottom: '8px' }}>
          <Col span={12} className="detail-txt" style={{ textIndent: '4px' }}>粗细</Col>
          <Col span={10} className="detail-txt" style={{ textIndent: '4px' }}>线型</Col>
        </Row>
        <Form.Item>
          <Form.Item name="color" noStyle>
            <div className="color-swatch" onClick={e => selectColor(e)} style={{ float: _range[0] !== 'all' ? 'left' : 'unset' }}>
              <div className="color-dis" style={{ background: `rgba(${border.color.r}, ${border.color.g}, ${border.color.b}, ${border.color.a})` }} />
            </div>
            {displayColorPicker ? <div className="color-popover" style={{ ...popStyle }}>
              <div className="color-cover" onClick={() => { setDisplayColorPicker(false) }} />
              <SketchPicker color={border.color} onChange={(e) => { colorChange(e) }} />
            </div> : null}
            <Form.Item noStyle name="hex">
              <Input defaultValue={rgbToHex(border.color)} className="input-hex" style={{ marginRight: '8px', float: _range[0] !== 'all' ? 'left' : 'unset' }} onBlur={(e) => { handleHexChange(e) }} />
            </Form.Item>
          </Form.Item>
          {
            _range[0] === 'all' ? <Form.Item name="radius" noStyle>
              <CusInputNumber
                data={_radius}
                onChange={radiusChange}
                formStyle={{ float: 'right', marginBottom: '-16px', marginRight: 0 }}
                style={{ width: '78px' }}
              />
            </Form.Item> : <></>
          }

          <Row style={{ width: '100%' }}>
            <Col span={4} className="detail-txt" style={{ textIndent: '4px' }}>颜色</Col>
            <Col span={10} className="detail-txt" style={{ textIndent: '6px' }}>Hex</Col>
            {
              _range[0] === 'all' ? <Col span={10} className="detail-txt" style={{ textIndent: '16px' }}>圆角</Col> : <></>
            }
          </Row>
          {
            _range[0] !== 'all' ? <>
              <Row style={{ width: '100%' }} gutter={4}>
                {
                  _range.map((item, index) => (
                    <Col span={24 / _range.length} className="range-item" style={{ marginTop: 4 }}>
                      <CusInputNumber onChange={() => rangeRadiusChange(item, index)} data={_radius[index]} />
                    </Col>
                  ))
                }
              </Row>
              <Row style={{ width: '100%' }} gutter={4}>
                {
                  _range.map((item, index) => (
                    <Col span={24 / _range.length} className="detail-txt" style={{ textAlign: 'right' }}>
                      {index === 0 ? '圆角:' + rangDirectionEnum[item] : rangDirectionEnum[item]}
                    </Col>
                  ))
                }
                < /Row>
              </> : <></>
          }
            </Form.Item>
      </Form.Item>
    </Form>
  )
}

export default memo(BorderRadius)
