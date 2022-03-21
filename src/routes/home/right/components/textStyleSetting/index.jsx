import React, { memo, useState } from 'react'
import './index.css'
import BackgroundSetting from '../backgroundSetting';

import {
  Form,
  Input,
  InputNumber,
  Select,
  Tag,
  Row, Col
} from 'antd';

const styleColor = {
  "name": "styleColor",
  "displayName": "背景",
  "value": "#000" // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
}

const TextStyleSetting = props => {
  const { Option } = Select;
  const { CheckableTag } = Tag;
  const [form] = Form.useForm();
  const formItemLayout = {
    labelAlign: 'left'
  };
  const [fontSetting, setFontSetting] = useState({
    fontFamily: 'a',
    fontSize: 24,
    blod: false,
    italics: false,
    wordSpace:100,
    rowSpace:48
  })
  const handleFontFamilyChange = (v) => {
    console.log('handleFontFamilyChange', v)
  }
  const fontSizeChange = () => {
    console.log('fontSizeChange')
  }
  const handleFontChange = (key, checked) => {
    setFontSetting({
      ...fontSetting,
      [key]: checked
    })
  }
  const wordSpaceChange = ()=>{
    console.log('wordSpaceChange')
  }
  const rowSpaceChange = ()=>{
    console.log('rowSpaceChange')
  }

  // 背景色变化
  const styleColorChange = (val) => {
    console.log(val)
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
        label="文本样式"
      >
        <Input.Group compact style={{marginBottom:'8px'}}>
          <Form.Item name="fontFamily" noStyle>
            <Select className="font-select" defaultValue={fontSetting.fontFamily} style={{ width: 120 }} onChange={handleFontFamilyChange}>
              <Option value="a">微软雅黑</Option>
              <Option value="b">宋体</Option>
              <Option value="c">黑体</Option>
            </Select>
          </Form.Item>
          <Form.Item name="fontSize" noStyle>
            <InputNumber defaultValue={fontSetting.fontSize} className="po-size-input" style={{width:'68px'}} onBlur={fontSizeChange} />
          </Form.Item>
        </Input.Group>
        <BackgroundSetting data={styleColor} onChange={styleColorChange}/>
        <Input.Group compact style={{marginTop:'8px'}} className="fontBi">
          <Form.Item name="blod" noStyle>
            <CheckableTag
              checked={fontSetting.blod}
              onChange={(checked) => handleFontChange('blod', checked)}
            >
              B
            </CheckableTag>
          </Form.Item>
          <Form.Item name="italics" noStyle>
            <CheckableTag
              checked={fontSetting.italics}
              onChange={(checked) => handleFontChange('italics', checked)}
              style={{fontStyle: 'italic'}}
            >
              I
            </CheckableTag>
          </Form.Item>
          <Form.Item name="wordSpace" noStyle>
            <InputNumber defaultValue={fontSetting.wordSpace} style={{marginRight:'8px'}} className="po-size-input unit-input" onBlur={wordSpaceChange} />
          </Form.Item>
          <Form.Item name="rowSpace" noStyle>
            <InputNumber defaultValue={fontSetting.rowSpace} className="po-size-input unit-input" onBlur={rowSpaceChange} />
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

export default memo(TextStyleSetting)