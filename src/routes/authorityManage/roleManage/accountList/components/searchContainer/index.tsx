import { Input, Row, Col, Modal, Form, Select, Button,message,Space } from 'antd'
import * as React from 'react';
import { useState, useEffect } from 'react';
// import { STATUSLIST } from '@/constant/dvaModels/userManage'

const  STATUSLIST = [
  { label: '无', value: null },
  { label: '启用', value: 0 },
  { label: '停用', value: 1 },
  { label: '锁定', value: 2 },
]


const SearchContainer=(props:any)=>{
  const {searchByType} = props
  const [searchForm] = Form.useForm()
  // const [name,setName] = useState('')
  // const [status, setStatus] = useState('')

  const searchClick = async() => {
    const value = await searchForm.validateFields()
    searchByType(value)
  }

  const resetClick = () => {
    searchForm.resetFields();
    searchClick()
  }

  // const changeInputValue = (value:any) => {
  //   setName(value)
  // }
  return (
    <Form
      name="basic"
      form={searchForm}
      layout="inline"
      initialValues={{ remember: true }}
      autoComplete="off"
    >
    <Form.Item label='用户' name='userName'>
      <Input  style={{ width: 200 }} placeholder='请输入用户名或账户' />
    </Form.Item>
    <Form.Item label='状态' name='status'>
      <Select
        placeholder='请选择状态'
        style={{ width: 200 }}
      >
        {
          STATUSLIST.map((item:any) => {
            return (
              <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
            )
          })
        }
      </Select>
    </Form.Item>
    <Form.Item>
      <Space>
        <Button type="primary" onClickCapture={() => searchClick()}>查询</Button>
        <Button  onClickCapture={() => resetClick()}>重置</Button>
      </Space>
    </Form.Item>
    </Form>
  )
}
export default SearchContainer
