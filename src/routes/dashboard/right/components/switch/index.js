import { Form, Switch } from 'antd'
import React, { useEffect, useState } from 'react'
const CusSwitch = (props) => {
  const [form] = Form.useForm();
  const formItemLayout = {
    labelAlign: 'left'
  };
  const _data = props.data;
  const [hideGlup, setHideGlup] = useState(_data.value)
  useEffect(()=>{
    setHideGlup(_data.value)
  },[_data.value])

  const checkChange = () => {
    setHideGlup(!hideGlup)
    _data.value = !hideGlup
    props.onChange()
  }
  return (
    <Form
      className="custom-form"
      form={form}
      {...formItemLayout}
      colon={false}
    >
      <Form.Item label={_data.displayName} name={_data.name}>
        <Switch style={ { float: 'left' } } checked={ hideGlup } onChange={ checkChange }/>
      </Form.Item>
    </Form>
  )
}
export default CusSwitch
