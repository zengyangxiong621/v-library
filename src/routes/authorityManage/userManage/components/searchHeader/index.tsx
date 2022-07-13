import { memo, useEffect, useState } from "react";
import "./index.less";
import { connect } from "dva";
import { Input, Row, Col, Modal, Form, Select, Button,message,Space } from 'antd'
import { STATUSLIST } from '@/constant/dvaModels/userManage'

const SearchHeader = (props: any) => {
  const {roleList, searchByType} = props
  const [searchForm] = Form.useForm()
  const [name,setName] = useState('')
  const [status, setStatus] = useState('')
  const [roleId, setRoleId] = useState('')

  const searchClick = async() => {
    const value = await searchForm.validateFields()
    searchByType(value)
  }

  const resetClick = () => {
    searchForm.resetFields();
    searchClick()
  }

  const changeInputValue = (value:any) => {
    setName(value)
  }

  return (
    <Form
      name="basic"
      form={searchForm}
      layout="inline"
      initialValues={{ remember: true }}
      autoComplete="off"
    >
     <Form.Item label='用户' name='name'>
        <Input  style={{ width: 200 }}  onChange={(e) => changeInputValue(e.target.value)} placeholder='请输入用户名或账户' value={name} />
     </Form.Item>
     <Form.Item label='状态' name='status'>
      <Select
        placeholder='请选择状态'
        value={status}
        style={{ width: 200 }}
      >
        {
          STATUSLIST.map((item:any) => {
            return (
              <Select.Option value={item.value}>{item.label}</Select.Option>
            )
          })
        }
      </Select>
     </Form.Item>
     <Form.Item label='角色' name='roleId'>
      <Select
          placeholder='请选择角色'
          value={roleId}
          style={{ width: 200 }}
        >
          {
            roleList.map((item:any) => {
              return (
                <Select.Option value={item.id}>{item.name}</Select.Option>
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


export default memo(
  connect(({ userManage }: any) => ({ userManage }))(SearchHeader)
);
