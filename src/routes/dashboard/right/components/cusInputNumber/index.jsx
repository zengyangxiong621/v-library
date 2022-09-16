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
  const _min = typeof (_data?.config?.min) !== 'undefined' ? _data.config.min : Number.MIN_SAFE_INTEGER
  const _max = typeof (_data?.config?.max) !== 'undefined' ? _data?.config?.max : Number.MAX_SAFE_INTEGER


  const _step = typeof (_data?.config?.step) !== 'undefined' ? _data?.config?.step : 1
  const [value, setValue] = useState(_data.value)

  useEffect(() => {
    form.setFieldsValue({
      input: props.data.value
    })
    setValue(props.data.value)
  }, [props.data.value])

  const valueChange = (e) => {
    setValue(e)
    _data.value = e
    props.onChange()
  }

  const valueBlur = () => {
    props.onBlur &&  props.onBlur()
  }

  return (
    <Form
      className="custom-form number-form"
      form={form}
      {...formItemLayout}
      colon={false}
      style={props.formStyle}
    >
      <Form.Item label={_data.displayName} name="input">
        <Form.Item  noStyle>
          <InputNumber
            min={_min}
            max={_max}
            step={_step}
            style={{ width:'100%',...props.style }}
            className="size-input"
            value={value}
            onChange={valueChange}
            onBlur = {valueBlur}
          />
          {_data?.config?.suffix ? <div className="ant-input-group-addon input-num-suffix" >{_data.config.suffix}</div> : null}
        </Form.Item>
      </Form.Item>
    </Form>
  )
}

export default memo(CusInputNumber)

