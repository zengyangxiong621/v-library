import React, { memo, useState } from 'react'
import './index.less'
import Color from '../color';
import { find } from '../../../../../utils/common'
import { fontCollection } from './fontCollection';

import {
  Form,
  Input,
  InputNumber,
  Select,
  Tag,
  Row, Col
} from 'antd';

const TextStyle = props => {
  const { Option } = Select;
  const { CheckableTag } = Tag;
  const [form] = Form.useForm();
  const formItemLayout = {
    labelAlign: 'left'
  };

  const _data = props.data;
  const _fontFamily = find(_data, 'fontFamily');
  const _fontSize = find(_data, 'fontSize');
  const _bold = find(_data, 'bold');
  const _italic = find(_data, 'italic');
  const _letterSpacing = find(_data, 'letterSpacing');
  const _lineHeight = find(_data, 'lineHeight');
  const _colorConfig = find(_data, 'color', 'type')

  const [fontSetting, setFontSetting] = useState({
    fontFamily: _fontFamily.value,
    fontSize: _fontSize.value,
    blod: _bold.value,
    italic: _italic.value,
    letterSpacing: _letterSpacing.value,
    lineHeight: _lineHeight.value
  })

  const handleFontFamilyChange = (v) => {
    _fontFamily.value = v
    props.onChange()
  }
  const fontSizeChange = (e) => {
    const val = parseInt(e.target.value)
    _fontSize.value = val
    props.onChange()
  }
  const handleFontChange = (key, checked) => {
    setFontSetting({
      ...fontSetting,
      [key]: checked
    })
    key === "blod" ?
      _bold.value = checked :
      _italic.value = checked;
    props.onChange()
  }
  const letterSpacingChange = (e) => {
    const val = parseInt(e.target.value)
    _letterSpacing.value = val
    props.onChange()
  }
  const lineHeightChange = (e) => {
    const val = parseInt(e.target.value)
    _lineHeight.value = val
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
              defaultValue={fontSetting.fontFamily}
              style={{ width: 120 }}
              onChange={handleFontFamilyChange}
              getPopupContainer={(triggerNode) => triggerNode.parentNode}
            >
              {
                fontCollection.map(({ name, value }) => {
                  return <>
                    <Option value={value}>{name}</Option>
                  </>
                })
              }
            </Select>
          </Form.Item>
          <Form.Item name="fontSize" noStyle>
            <InputNumber defaultValue={fontSetting.fontSize} className="po-size-input" style={{ width: '68px' }} onBlur={fontSizeChange} />
          </Form.Item>
        </Input.Group>
        <Color data={_colorConfig} onChange={props.onChange} style={{ marginBottom: '-8px' }} />
        <Input.Group compact className="fontBi">
          <Form.Item name="blod" noStyle>
            <CheckableTag
              checked={fontSetting.blod}
              onChange={(checked) => handleFontChange('blod', checked)}
            >
              B
            </CheckableTag>
          </Form.Item>
          <Form.Item name="italic" noStyle>
            <CheckableTag
              checked={fontSetting.italic}
              onChange={(checked) => handleFontChange('italic', checked)}
              style={{ fontStyle: 'italic' }}
            >
              I
            </CheckableTag>
          </Form.Item>
          <Form.Item name="letterSpacing" noStyle>
            <InputNumber defaultValue={fontSetting.letterSpacing} style={{ marginRight: '8px' }} className="po-size-input unit-input" onBlur={letterSpacingChange} />
          </Form.Item>
          <Form.Item name="lineHeight" noStyle>
            <InputNumber disabled={_lineHeight?.config?.disabled || false} defaultValue={fontSetting.lineHeight} className="po-size-input unit-input" onBlur={lineHeightChange} />
          </Form.Item>
        </Input.Group>
        <Row>
          <Col span={16} className="detail-txt" style={{ textIndent: '82px' }}>字距</Col>
          <Col span={8} className="detail-txt" style={{ textIndent: '8px' }}>行距</Col>
        </Row>
      </Form.Item>
    </Form>
  )
}

export default memo(TextStyle)
