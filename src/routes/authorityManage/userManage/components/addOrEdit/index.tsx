import { memo, useEffect, useState } from "react";
import "./index.less";
import { connect } from "dva";
import { Input, Row, Col, Modal, Form, Select, Button,message } from 'antd'
const { Option } = Select;
import { useFetch } from "@/utils/useFetch";
const AddOrEdit = (props: any) => {
  const {showAddOrEdit,closeModal,getUserList,formType,currentUser,roleList } = props
  const [addForm] = Form.useForm()
  // const { Option } = Select
  const [ userName, setUserName ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ name, setName ] = useState('')
  const [ roleId, setRoleId ] = useState('male')
  const [ email, setEmail ] = useState('')
  const [ tel, setTel ] = useState('')
  const [confirmLoading, SetConfirmLoading] = useState(false)
  const handleCancel = () => {
    addForm.resetFields();
    closeModal()
  }
  const handleOk = async() => {
    let value = await addForm.validateFields()
    if(value){
      value.roleIds = [value.roleId]
      value.username = value.userName
      delete value.userName
      if(formType === 'edit'){
        value.id = currentUser.id
      }
      SetConfirmLoading(true)
      let httpUrl = currentUser.type === 1 && formType === 'edit' ? '/visual/user/saveUserRole' : '/visual/user/save'
      value = currentUser.type === 1 && formType === 'edit' ? {
        userId:currentUser.id,
        roleIds: value.roleIds
      } : value
      const [,data] = await useFetch(httpUrl,{
        body: JSON.stringify(value)
      }).finally(() => {
        SetConfirmLoading(false)
      })
      if(data){
        message.success(`${formType === 'edit' ? '编辑' : '新增'}成功`);
        getUserList()
        handleCancel()
      }
    }
  }
  const handleChangeRole = () => {

  }

  useEffect(() => {
    if(showAddOrEdit){
      if(formType === 'edit'){
        let arr = ['userName', 'name', 'roleId', 'email', 'tel' ]
        arr.map((item:any) => {
          let obj:any = {}
          obj[item] = currentUser[item]
          addForm.setFieldsValue(obj)
        })
      }
    }
  },[showAddOrEdit])

  // 联系方式校验
  const ValidatePhone = (val:any) => {
    var isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/;//手机号码
    var isMob= /^0?1[3|4|5|8][0-9]\d{8}$/;// 座机格式  区号之后用'-'隔开
    if(isMob.test(val)||isPhone.test(val)){
        return true;
    }
    else{
        return false;
    }
  }

  // 处理编辑状态的禁用模式
  const handleDisabled = (type:any) => {
    if(formType === 'add') return false
    switch(type){
      case 'userName':
        return true
      case 'name':
      case 'email':
      case 'tel':
        return  [1,2].indexOf(currentUser.type) > -1
      case 'roleId':
        return false
    }
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
      confirmLoading={confirmLoading}
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
          rules={[
            {required: true, message:''},
            () => ({
              validator(_:any,value:any){
                if (!value) {
                  return Promise.reject(new Error('请输入账号'));
                }
                return Promise.resolve();
              }
            })
          ]}
        ><Input placeholder='请输入账号' disabled={handleDisabled('userName')} value={userName}  showCount maxLength={10} /></Form.Item>
        {
          formType === 'add' &&
          <Form.Item
            label='密码'
            name='password'
            rules={generateSingleRules(true, '请输入密码')}
          ><Input.Password value={password}  placeholder='请输入密码' showCount maxLength={20} /></Form.Item>
        }
        <Form.Item
          label='姓名'
          name='name'
        ><Input value={name} placeholder='请输入姓名'  disabled={handleDisabled('name')} showCount maxLength={10} /></Form.Item>
        <Form.Item
          label='角色'
          name='roleId'
          rules={generateSingleRules(true, '请选择角色')}
        >
          <Select
            placeholder='请选择角色'
            value={roleId}
            disabled={handleDisabled('roleId')}
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
          rules={[
            {required: false, message:''},
            () => ({
              validator(_:any,value:any){
                let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
                if (value && !reg.test(value)) {
                  return Promise.reject(new Error('邮箱格式有误'));
                }
                return Promise.resolve();
              }
            })
          ]}
        ><Input value={email} placeholder='请输入邮箱' disabled={handleDisabled('email')} showCount maxLength={50} /></Form.Item>
        <Form.Item
          label='联系方式'
          name='tel'
          rules={[
            {required: false, message:''},
            () => ({
              validator(_:any,value:any){
                var isPhone = /^1[3-9]\d{9}$/;//手机号码
                var isMob= /^0?1[3|4|5|8][0-9]\d{8}$/;// 座机格式  区号之后用'-'隔开
                if(value&&!isMob.test(value) && !isPhone.test(value)){
                  return Promise.reject(new Error('联系方式格式有误'));
                }
                return Promise.resolve(); 
              }
            })
          ]}
        ><Input value={tel} placeholder='请输入联系方式' disabled={handleDisabled('tel')} showCount maxLength={20} /></Form.Item>
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