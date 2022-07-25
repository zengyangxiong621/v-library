import React, { useState, useEffect,memo, useMemo,useContext } from 'react';
import { useFetch } from "@/utils/useFetch";
import PropTypes from 'prop-types';
import { Modal,Form,Input,Table,Checkbox,message } from 'antd';
import {authDataType,formData} from '../../interface'
import type { CheckboxValueType,CheckboxOptionType } from 'antd/es/checkbox/Group';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import {AuthContext} from '../../roleManage'
const {TextArea}=Input

// 表格权限多选框
const AuthCheckBox=memo((props:any)=>{
  const {rowData,editPermission}=props
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);
  const [checkAll, setCheckAll] = useState(false);

  const subAuth:Array<authDataType>=rowData.children
  const hasChild:Boolean=!!(subAuth && subAuth.length)

  const options:CheckboxOptionType[]=useMemo(()=>{
    return hasChild?subAuth.map((item:authDataType)=>{
      return {
        label:item.name,
        value:item.id
      }
    }):[{
      label:rowData.name,
      value:rowData.id
    }]
  },[rowData,subAuth,hasChild])

  const handleChange=(list:CheckboxValueType[])=>{
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < subAuth.length);
    setCheckAll(list.length === subAuth.length);
    rowData.checkedList=list
    console.log(rowData);
  }
  const onCheckAllChange=(e: CheckboxChangeEvent) => {
    const checkList=options.map((item:any)=>item.value)
    if(e.target.checked){
      setCheckedList(checkList);
      rowData.checkedList=checkList
    }else{
      setCheckedList([]);
      rowData.checkedList=[]
    }
    setIndeterminate(false);
    setCheckAll(e.target.checked);
    console.log(rowData);
  };
  useEffect(()=>{
    if(!editPermission){
      setCheckedList([])
      setCheckAll(false)
      setIndeterminate(false)
      return
    }
    const newCheckedList:CheckboxValueType[] = options
      .filter((item:CheckboxOptionType)=>editPermission.includes(item.value))
      .map((item:CheckboxOptionType)=>item.value)
    setCheckedList(newCheckedList)
    rowData.checkedList=newCheckedList

    if(hasChild){
      if(newCheckedList.length===options.length){
        setCheckAll(true)
      }else if(newCheckedList.length!==0){
        setIndeterminate(true)
      }
    }
  },[editPermission,options,rowData,hasChild])
  return (
    <>
      {
        !!hasChild && <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>全部</Checkbox>
      }
      <Checkbox.Group options={options} value={checkedList} onChange={handleChange} />
    </>
  )
})
// 权限表格配置项
const tableColumns=(permissionList:Array<string>)=>[{
  title:'功能模块',
  dataIndex: 'name',
  width:100,
  key: 'name',
},{
  title:'权限',
  dataIndex: 'children',
  key: 'children',
  render:(text:string, record:authDataType, index:number)=>{
    return (
      <AuthCheckBox rowData={record} editPermission={permissionList}></AuthCheckBox>
    )
  }
}]
// 表单初始值
const initialFormData={
  name:'',
  description:'',
  permissionIds:[]
}

/**
 * 校验方法
 */
const validRoleName=(isEdit:boolean)=>{
  return async (rule:any, value:any)=>{
    if(!value){
      return Promise.reject(new Error('请输入角色名'))
    }
    if(isEdit){
      return Promise.resolve()
    }
    const params={
      name:value
    }
    const options={
      body:JSON.stringify(params)
    }
    const [,data]=await useFetch('/visual/role/validName',options)
    if(!data){
      return Promise.reject(new Error('该角色名已存在'))
    }
    return Promise.resolve()
  }
}
const permissionValidator= async (rule:any, value:any)=>{
  if(!(value && value.length)){
    return Promise.reject(new Error('请选择权限'))
  }
  return Promise.resolve()
}

const AddOrEdit=(props:any)=>{
  const {isModalVisible,hideModel,getRoleList,modelTitle,formType,editFormData,setEditFormData}=props
  const { state, dispatch } = useContext(AuthContext);
  const {authList:menuData}=state
  const [addForm] = Form.useForm()
  const [confirmLoading, SetConfirmLoading] = useState(false)

  let permissionIds=null
  const isEdit=formType==='edit'
  if(editFormData){
    permissionIds=editFormData.permissionIds
  }

  const handleFormPermission=()=>{
    const allChecked=menuData.map((item:any)=>{
      return item.checkedList
    }).flat()
    const formData=addForm.getFieldsValue(true)
    const newFormData:formData={
      ...formData,
      permissionIds:allChecked
    }
    addForm.setFieldsValue(newFormData)
  }
  const handleOk=async ()=>{
    handleFormPermission()
    let value = await addForm.validateFields()
    if(!value){
      return
    }
    const params=isEdit ? {
      ...value,
      id:editFormData.id
    }:{...value}
    SetConfirmLoading(true)
    const [,data] = await useFetch('/visual/role/save',{
      body: JSON.stringify(params)
    }).finally(() => {
      SetConfirmLoading(false)
    })
    if(data){
      message.success(`${isEdit ? '编辑' : '新增'}成功`);
      getRoleList()
      handleCancel()
    }
    // console.log(addForm.getFieldsValue(true));
  }
  const resetForm=()=>{
    setEditFormData(null)
    addForm.resetFields(['name','description','permissionIds'])
    const newMenuData=menuData.map((item:authDataType)=>{
      item.checkedList=[]
      return item
    })
    dispatch({type:'updateState',update:{authList:newMenuData}})
    // setMenuData(newMenuData)
  }
  const handleCancel=()=>{
    resetForm()
    hideModel()
  }
  useEffect(()=>{
    if(!editFormData){
      return
    }
    const {name,description,permissionIds}=editFormData
    const newFormData={
      name,
      description,
      permissionIds
    }
    addForm.setFieldsValue(newFormData)
  },[editFormData])
  return (
    <Modal
      className='roleModal'
      title={modelTitle}
      visible={isModalVisible}
      width={1000}
      onOk={handleOk}
      onCancel={handleCancel}
      getContainer={false}
      confirmLoading={confirmLoading}
      style={{
        top: '8vh'
      }}
      bodyStyle={{
        padding: '0'
      }}
    >
      <Form
        name="basic"
        form={addForm}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        initialValues={initialFormData}
        autoComplete="off"
      >
        <Form.Item
          label="名称"
          name="name"
          style={{ marginTop: '20px' }}
          validateTrigger='onBlur'
          rules={[
            {required: true,validator:validRoleName(isEdit)}
          ]}
        >
          <Input placeholder='请输入名称' disabled={isEdit} />
        </Form.Item>
        <Form.Item
          label="描述"
          name="description"
          style={{ marginTop: '20px' }}
        >
          <TextArea placeholder='请输入描述' />
        </Form.Item>
        <Form.Item
          label="权限管理"
          name="permissionIds"
          style={{ marginTop: '20px' }}
          rules={[{ required: true, message: '',validator:permissionValidator }]}
        >
          <Table
            pagination={false}
            expandable={{
              showExpandColumn:false
            }}
            size='small'
            rowKey='id'
            dataSource={menuData}
            columns={tableColumns(permissionIds)}
          ></Table>
        </Form.Item>
      </Form>
    </Modal>
  )
}
AddOrEdit.propsType={
  modelTitle:PropTypes.string.isRequired,
  isModalVisible:PropTypes.string.isRequired,
  hideModel:PropTypes.func,
  getRoleList:PropTypes.func,
  formType:PropTypes.string.isRequired,
  setEditFormData:PropTypes.func,
  editFormData:PropTypes.object
}
export default memo(AddOrEdit)
