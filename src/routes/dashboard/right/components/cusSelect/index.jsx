import React, { memo, useState, useEffect } from 'react';
import './index.less'

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

  // 下拉框选择
  const selectChange = (e) => {
    setSelect(e)
    _data.value = e;
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
        name="select"
        label={_data.displayName}
      >
        <Select
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
      </Form.Item>
    </Form>
  )
}

export default memo(CusSelect)