import React, { memo, useState, useEffect } from 'react';
import './index.less'

import { v4 as uuidv4 } from 'uuid';

import {
  Form,
  Select,
} from 'antd';

const CusSelect = props => {
  const { Option } = Select;
  const formItemLayout = {
    labelAlign: 'left'
  };
  const [form] = Form.useForm();
  const _data = props.data
  const [select, setSelect] = useState(_data.value)
  const [key,setKey] = useState(uuidv4())

  useEffect(() => {
    setKey(uuidv4())
  },[_data.options])

  useEffect(() => {
    setKey(uuidv4())
    setSelect(_data.value)
  },[_data.value])

  // 下拉框选择
  const selectChange = (e) => {
    setSelect(e)
    _data.value = e;
    _data.label = _data.options.find(item => item.value === e).name;
    props.onChange()
  }


  return (
    <Form
      className="custom-form"
      form={form}
      {...formItemLayout}
      colon={false}
      style={props.formStyle}
    >
      <Form.Item
        name="select"
        label={_data.displayName}
      >
        <Select
          key={key}
          className="custom-select"
          placeholder="请选择"
          defaultValue={select}
          style={{ marginBottom: 0,...props.style }}
          onChange={selectChange}
        >
          {_data.options.map((item) => {
            return <Option value={item.value} key={item.value}>{item.name}</Option>
          })}
        </Select>
        {props.children}
      </Form.Item>
    </Form>
  )
}

export default memo(CusSelect)