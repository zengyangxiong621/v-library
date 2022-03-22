import React, { memo, useState, useEffect } from 'react';
import './index.less'

import {
  Form,
  Slider,
  InputNumber,
  Row, Col
} from 'antd';

const OpacitySetting = props => {
  const [form] = Form.useForm();
  const formItemLayout = {
    labelAlign: 'left'
  };
  const [opacityValue, setOpacityValue] = useState(props.data.value*100);

  const opacityChange = (e) => {
    form.setFieldsValue({
      opacity: e
    })
    props.onChange(e/100)
  }
  const opacityInputChange = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const value = parseInt(e.currentTarget.value)
    form.setFieldsValue({
      opacity: value
    })
    props.onChange(value/100)
  }

  return (
    <Form
      className="custom-form opacity-form"
      form={form}
      {...formItemLayout}
      colon={false}
    >
      <Form.Item
        name="outside"
        label="透明度"
      >

        <Form.Item name="opacity" noStyle>
          <Slider
            min={0}
            tooltipVisible={false}
            onAfterChange={opacityChange}
            defaultValue={opacityValue}
            style={{ width: '144px', marginRight: '8px',float:'left',marginLeft:0 }}
          />
        </Form.Item>

        <Form.Item name="opacity" noStyle>
          <InputNumber defaultValue={opacityValue} className="po-size-input input-radius" style={{ width: '67px' }} onBlur={opacityInputChange} />
        </Form.Item>
      </Form.Item>
    </Form>
  )
}

export default memo(OpacitySetting)