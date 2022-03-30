import React, { memo, useState } from 'react'
import './index.css'
import CusInputNumber from '../cusInputNumber'

import {
  Form,
  Input,
  InputNumber,
  Tag,
} from 'antd';

const Rotate = props => {
  const { CheckableTag } = Tag;
  const [form] = Form.useForm();
  const formItemLayout = {
    labelAlign: 'left'
  };
  const _data = props.data
  const _angle = {
    value: _data.value.angle
  }
  const [rotaion, setRotaion] = useState({
    vertical: _data.value.direction === 'vertical',
    horizontal: _data.value.direction === 'horizontal'
  })
  const angleChange = () => {
    _data.value.angle = _angle.value
    props.onChange()
  }
  const handleDirectionChange = (key, checked) => {
    _data.value.direction = key
    if (key === 'vertical') {
      setRotaion({
        [key]: checked,
        horizontal: !checked
      })
      form.setFieldsValue({
        [key]: checked,
        horizontal: !checked
      })
    } else {
      setRotaion({
        [key]: checked,
        vertical: !checked
      })
      form.setFieldsValue({
        [key]: checked,
        vertical: !checked
      })
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
        <Input.Group compact className="rotaion-angle">
          <Form.Item name="angle" noStyle>
            <CusInputNumber data={_angle} onChange={angleChange} formStyle={{marginBottom:'-16px'}} style={{ marginRight: '8px', width: '141px' }} />
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

export default memo(Rotate)