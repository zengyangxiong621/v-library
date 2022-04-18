import React, { memo, useState, useEffect } from 'react';
import './index.less'


import {
  Form,
  Radio,
  Space,
} from 'antd';


const RadioGroup = props => {
  const formItemLayout = {
    labelAlign: 'left'
  };
  const [form] = Form.useForm();
  const _data = props.data

  // 缩放设置更新
  const selectChange = (e) => {
    _data.value = e.target.value
    props.onChange()
  }

  return (
    <Form
      className="custom-form"
      form={form}
      {...formItemLayout}
      colon={false}
    >
      <Form.Item name={_data.name} label={_data.displayName}>
        <Radio.Group defaultValue={_data.value} className="zoom-set" onChange={selectChange}>
          <Space direction={_data.direction || 'horizontal'}>
            {_data.options.map(item => {
              return <Radio value={item.value} key={item.value} style={{float: 'left'}}>{item.name}</Radio>
            })}
          </Space>
        </Radio.Group>
      </Form.Item>
    </Form>

  )
}

export default memo(RadioGroup)

