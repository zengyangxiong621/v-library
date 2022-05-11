import React, { memo, useState, useEffect } from 'react';
import './index.less'
import debounce from 'lodash/debounce';

import {
  Form,
  Input ,
} from 'antd';

const CusInput = props => {
  const formItemLayout = {
    labelAlign: 'left'
  };
  const [form] = Form.useForm();
  const _data = props.data
  const [value, setValue] = useState(_data.value)

  const valueChange = debounce((e) => {
    setValue(e.target.value)
    _data.value = e.target.value
    props.onChange()
  }, 300)

  useEffect(()=>{
    form.setFieldsValue({
      [_data.name]: _data.value,
    });
  },[_data.value])

  return (
    <Form
      className="custom-form"
      form={form}
      {...formItemLayout}
      colon={false}
    >
      <Form.Item label={_data.displayName}>
        <Form.Item  name={_data.name} noStyle>
          <Input style={{ width: '100%' }} disabled={_data.disabled} className="cus-input" defaultValue={value} onChange={valueChange} />
        </Form.Item>
      </Form.Item>
    </Form>
  )
}

export default memo(CusInput)

