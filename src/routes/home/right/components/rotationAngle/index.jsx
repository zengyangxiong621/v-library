import React, { memo, useState } from 'react'
import './index.css'

import {
  Form,
  Input,
  InputNumber,
  Tag,
} from 'antd';

const RotationAngle = props => {
  const { CheckableTag } = Tag;
  const [form] = Form.useForm();
  const formItemLayout = {
    labelAlign: 'left'
  };
  const [rotaion, setRotaion] = useState({
    angle: 0,
    vertical: true,
    horizontal: false
  })
  const angleChange = () => {
    console.log('angleChange', rotaion)
  }
  const handleDirectionChange = (key, checked) => {
    if (key === 'vertical') {
      setRotaion({
        ...rotaion,
        [key]: checked,
        horizontal: !checked
      })
      form.setFieldsValue({
        [key]: checked,
        horizontal: !checked
      })
    } else {
      setRotaion({
        ...rotaion,
        [key]: checked,
        vertical: !checked
      })
      form.setFieldsValue({
        [key]: checked,
        vertical: !checked
      })
    }
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
        label="旋转角度"
      >
        <Input.Group compact className="rotaion-angle">
          <Form.Item name="angle" noStyle>
            <InputNumber defaultValue={rotaion.angle} style={{ marginRight: '8px', width: '141px' }} className="po-size-input unit-input" onBlur={angleChange} />
          </Form.Item>
          <Form.Item name="vertical" noStyle>
            <CheckableTag
              style={{ marginRight: '8px' }}
              checked={rotaion.vertical}
              onChange={(checked) => handleDirectionChange('vertical', checked)}
            >
              <i className="iconfont icon-rotateY-fill"></i>
            </CheckableTag>
          </Form.Item>
          <Form.Item name="horizontal" noStyle>
            <CheckableTag
            style={{ marginRight: 0 }}
              checked={rotaion.horizontal}
              onChange={(checked) => handleDirectionChange('horizontal', checked)}
            >
              <i className="iconfont icon-rotateX-fill"></i>
            </CheckableTag>
          </Form.Item>
        </Input.Group>
      </Form.Item>
    </Form>
  )
}

export default memo(RotationAngle)