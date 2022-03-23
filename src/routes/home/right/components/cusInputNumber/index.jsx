import React, { memo, useState, useEffect } from 'react';
import './index.less'

import {
  Form,
  InputNumber,
} from 'antd';

const CusInputNumber = props => {
  const formItemLayout = {
    labelAlign: 'left'
  };
  const [form] = Form.useForm();
  const _data = props.data
  const [spacing, setSpacing] = useState(_data.value)

  const gridChange = (e) => {
    setSpacing(e)
    _data.value = e
    props.onChange()
  }

  return (
    <Form
      className="custom-form"
      form={form}
      {...formItemLayout}
      colon={false}
    >
      <Form.Item label={_data.displayName}>
        <Form.Item  name={_data.name} noStyle>
          <InputNumber min={0} style={{ width: '100%' }} className="size-input" defaultValue={spacing} onChange={gridChange} />
        </Form.Item>
      </Form.Item>
    </Form>
  )
}

export default memo(CusInputNumber)

