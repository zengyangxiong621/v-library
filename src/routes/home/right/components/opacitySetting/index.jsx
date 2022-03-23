import React, { memo, useState, useEffect } from 'react';
import './index.less'

import {
  Form,
  Slider,
  InputNumber,
} from 'antd';

const OpacitySetting = props => {
  const [form] = Form.useForm();
  const formItemLayout = {
    labelAlign: 'left'
  };
  const _data = props.data
  const [opacityValue, setOpacityValue] = useState(_data.value * 100);

  const opacityChange = (e) => {
    form.setFieldsValue({
      opacityInput: e
    })
    _data.value = e / 100
    props.onChange()
  }
  const opacityInputChange = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const value = parseInt(e.currentTarget.value)
    form.setFieldsValue({
      opacity: value
    })
    _data.value = value / 100
    props.onChange()
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
        label={_data.displayName}
      >

        <Form.Item name="opacity" noStyle>
          <Slider
            min={0}
            tooltipVisible={false}
            onAfterChange={opacityChange}
            defaultValue={opacityValue}
            style={{ width: '144px', marginRight: '8px', float: 'left', marginLeft: 0 }}
          />
        </Form.Item>

        <Form.Item name="opacityInput" noStyle>
          <InputNumber defaultValue={opacityValue} className="po-size-input input-radius" style={{ width: '67px' }} onBlur={opacityInputChange} />
        </Form.Item>
      </Form.Item>
    </Form>
  )
}

export default memo(OpacitySetting)