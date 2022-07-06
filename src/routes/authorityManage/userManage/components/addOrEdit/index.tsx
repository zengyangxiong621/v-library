import { memo, useEffect, useState } from "react";
import "./index.less";
import { connect } from "dva";
import { Input, Row, Col, Modal, Form, Select, Button } from 'antd'
const { Option } = Select;
import { useFetch } from "@/utils/useFetch";
const AddOrEdit = (props: any) => {
  const {showAddOrEdit,closeModal } = props
  const [addForm] = Form.useForm()
  // const { Option } = Select
  const [ userName, setUserName ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ name, setName ] = useState('')
  const [ roleId, setRoleId ] = useState('male')
  const [ email, setEmail ] = useState('')
  const [ tel, setTel ] = useState('')
  const [roleList, setRoleList] = useState([])
  const handleCancel = () => {
    addForm.resetFields();
    closeModal(false)
  }
  const handleOk = async() => {
    const value = await addForm.validateFields()
    console.log(value,'value')
    // closeModal(false)
    // addForm.
    // addForm.resetFields();
  }
  const handleChangeRole = () => {

  }

  useEffect(() => {
    if(showAddOrEdit){
      geRoleList()
    }
  },[showAddOrEdit])

  // 获取角色列表数据
  const geRoleList = async() => {
    const [,data] = await useFetch('/visual/role/allList',{})
    setRoleList(data)
  }


  return (
    <Modal
      visible={showAddOrEdit}
      keyboard={true}
      title="新建用户"
      getContainer={false}
      closeIcon={() => <></>} // 除去关闭按钮
      style={{
        top: '8vh'
      }}
      bodyStyle={{
        padding: '0'
      }}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        name="basic"
        form={addForm}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item
          label='账号'
          name='userName'
          style={{ marginTop: '20px' }}
          rules={generateSingleRules(true, '请输入账号')}
        ><Input placeholder='请输入账号' value={userName} showCount maxLength={10} /></Form.Item>
        <Form.Item
          label='密码'
          name='password'
          rules={generateSingleRules(true, '请输入密码')}
        ><Input.Password value={password} placeholder='请输入密码' showCount maxLength={20} /></Form.Item>
        <Form.Item
          label='姓名'
          name='name'
        ><Input value={name} placeholder='请输入姓名' showCount maxLength={10} /></Form.Item>
        <Form.Item
          label='角色'
          name='roleId'
          rules={generateSingleRules(true, '请选择角色')}
        >
          <Select
            placeholder='请选择角色'
            value={roleId}
            onChange={handleChangeRole}
          >
            {
              roleList.map((item:any) => {
                return (
                  <Option value={item.id}>{item.name}</Option>
                )
              })
            }
          </Select>
        </Form.Item>
        <Form.Item
          label='邮箱'
          name='email'
        ><Input value={email} placeholder='请输入邮箱' showCount maxLength={50} /></Form.Item>
        <Form.Item
          label='联系方式'
          name='tel'
        ><Input value={tel} placeholder='请输入联系方式' showCount maxLength={20} /></Form.Item>
      </Form>
    </Modal>
  )
}


export default memo(
  connect(({ userManage }: any) => ({ userManage }))(AddOrEdit)
);

// 生成单个校验规则
const generateSingleRules = (required: boolean, message: string | number): any[] => {
  return [
    {
      required,
      message
    }
  ]
}