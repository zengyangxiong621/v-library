import React, { memo, useState, useEffect } from 'react';
import './index.less'
import {
  Form,
  Checkbox
} from 'antd';

const CheckBox = props => {
  const [form] = Form.useForm();
  const formItemLayout = {
    labelAlign: 'left'
  };
  const [hideGlup, setHideGlup] = useState(props.data.value)
  const onHideGlupChange = () => {
    setHideGlup(!hideGlup)
    props.onChange(!hideGlup)
  }

  return (
    <Form
      className="custom-form"
      form={form}
      {...formItemLayout}
      colon={false}
    >
      <Form.Item label="默认隐藏" name="hideGlup">
        <Checkbox style={{ float: 'left' }} checked={hideGlup} onChange={onHideGlupChange}></Checkbox>
      </Form.Item>
    </Form>
  )
}

export default memo(CheckBox)