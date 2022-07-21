import * as React from 'react';
import { useState, useEffect,useContext,memo,useMemo } from 'react';
import { Modal,Form,Table,Checkbox } from 'antd';
import { useForm } from 'antd/es/form/Form';
import {AuthContext} from '../../roleManage'
import {authDataType,formData} from '../../interface'
import type { CheckboxValueType,CheckboxOptionType } from 'antd/es/checkbox/Group';

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
        !!hasChild && <Checkbox indeterminate={indeterminate} checked={checkAll} disabled>全部</Checkbox>
      }
      <Checkbox.Group options={options} value={checkedList} disabled />
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

export default memo(function RoleDetail(props:any) {
  const {isModalVisible,hideModel,currentData,setCurrentData}=props
  const {state,dispatch}=React.useContext(AuthContext)
  const [formContainer]= Form.useForm()
  const {authList}=state

  let permissionIds=null
  if(currentData){
    permissionIds=currentData.permissionIds
  }
  const handleCancel=()=>{
    setCurrentData(null)
    hideModel()
  }
  return (
    <Modal 
      title="查看详情"
      visible={isModalVisible}
      footer={null}
      width={1000}
      getContainer={false}
      onCancel={handleCancel}
    >
      <Form
        name="basic"
        form={formContainer}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        autoComplete="off"
      >
        <Form.Item
          label="名称"
          name="name"
          style={{ marginTop: '20px' }}
        >
          <span>{currentData?.name || '-'}</span>
        </Form.Item>
        <Form.Item
          label="描述"
          name="description"
          style={{ marginTop: '20px' }}
        >
          <span>{currentData?.description || '-'}</span>
        </Form.Item>
        <Form.Item
          label="权限"
          name="permissionsId"
          style={{ marginTop: '20px' }}
        >
          <Table
            pagination={false}
            expandable={{
              showExpandColumn:false
            }}
            size='small'
            rowKey='id'
            dataSource={authList}
            columns={tableColumns(permissionIds)}
          ></Table>
        </Form.Item>
      </Form>
    </Modal>
  )
})
