/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import React,{ Dispatch, memo, useCallback, useEffect, useReducer, useState } from "react";
import { useFetch } from "@/utils/useFetch";
import "./index.less";
import { connect } from "dva";
import zhCN from 'antd/es/locale/zh_CN'
import {ConfigProvider,Button,Table,Modal,message} from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/lib/table/interface';
import {params,dataType,authStateType,authActionType,authContextType, dispatcher} from './interface'
import AddOrEdit from './components/addOrEdit'
import RoleDetail from './components/roleDetail'
const { confirm } = Modal;

/**
 * 工具方法
 */
const handleToTree=(list:any)=>{
  return list.reduce((res:any,cur:any)=>{
    if(!cur.parentId){
      cur.children=[]
      res.push(cur)
    }else{
      const parentNode=list.find((item:any)=>item.id===cur.parentId)
      if(!parentNode.children){
        parentNode.children=[]
      }
      parentNode.children.push(cur);
    }
    return res
  },[])
}
const handleaddChecked=(list:any)=>{
  return list.map((item:any)=>{
    item.checkedList=[]
    return item
  })
}

/**
 * 配置项
 */
const baseParams:params={
  pageNo:1,
  pageSize:10
}
const columns=(handleEdit:any,handleDetail:any,handledelete:any,toAccountList:any):ColumnsType<dataType>=>{
  return [{
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
    },{
      title: '描述',
      dataIndex: 'remark',
      key: 'remark',
    },{
      title: '更新时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
    },{
      title: '操作人',
      dataIndex: 'updatedBy',
      key: 'updatedBy',
    },{
      title: '操作',
      key: 'action',
      ellipsis: true,
      width: 250,
      render:(text: any, record: any) => {
        return (
          <>
            <Button type="link" size='small' onClick={handleDetail(record)}>详情</Button>
            <Button type="link" size='small' onClick={toAccountList(record)}>查看用户</Button>
            <Button type="link" size='small' onClick={handleEdit(record)}>编辑</Button>
            <Button type="link" size='small' onClick={handledelete(record)}>删除</Button>
          </>
        )
      }
  }]
}
const paginationProps=(totalElements:number,pageInfo:params,setPageInfo:Function)=>{
  return {
    total: totalElements,
    current: pageInfo.pageNo,
    pageSize: pageInfo.pageSize,
    pageSizeOptions: [10, 20, 30],
    showTotal: (val: number | string) => `共${val}条`,

    defaultCurrent: 1,
    showQuickJumper: true,
    showSizeChanger: true,
    onChange(page: number, pageSize: number) {
      const newPage={
        pageNo: page,
        pageSize
      }
      setPageInfo(newPage)
    },
  }
}
const rowSelection = (selectedRowKeys:React.Key[],onSelectChange:any)=>{
  return {
    selectedRowKeys,
    onChange: onSelectChange,
  }
}

/**
 * store局部数据共享
 */
const authState:authStateType={
  authList:[]
}
const authReducer=(state:authStateType,action:authActionType)=>{
  switch(action.type){
    case 'updateState':
      return { ...state, ...action.update };
    default:
      return state
  }
}
const dispatchMiddle=(next:Dispatch<authActionType>):dispatcher=>{
  return async(action:authActionType)=>{
    switch(action.type){
      case 'getAuthList':
        const headers={
          'Content-Type':'application/x-www-form-urlencoded'
        }
        const [,data]=await useFetch('/visual/menu/listAll',headers);
        const treeData=handleToTree(data)
        const newData=handleaddChecked(treeData)
        next({type:'updateState',update:{authList:newData}})
        break;
      default:
        next(action)
    }
  }
}
const AuthContext= React.createContext<authContextType>({state:authState,dispatch:value=>{}})

// 页面渲染
const RoleManage = (prop: any) => {
  const [tableLoading,setTableLoading]=useState<boolean>(false)
  const [totalElements, setTotalElements] = useState(0)
  const [tableData,setTableData]=useState<Array<dataType>>([])
  const [pageInfo,setPageInfo]=useState<params>(baseParams)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [state,dispatch]=useReducer(authReducer,authState)
  const middleDispatch=dispatchMiddle(dispatch)

  const [showAddRoleModel,setShowAddRoleModel]=useState<boolean>(false)
  const [modelTitle,setModelTitle]=useState<String>('')
  const [formType, setformType] = useState<String>('');
  const [editFormData,setEditFormData]=useState(null)

  const [showDetailModel,setShowDetailModel]=useState<boolean>(false)
  const [detailFormData,setDetailFormData]=useState(null)
  // 获取表格数据
  const getTableData=useCallback(async(params?:object)=>{
    setTableLoading(true)
    const getParams={
      ...pageInfo,
      ...params
    }
    const header={
      body: JSON.stringify(getParams)
    }
    const [err,data,code]=await useFetch('/visual/role/list',header).finally(() => {
      setTableLoading(false)
    })
    if(data){
      const {content,totalElements}=data
      setTotalElements(totalElements)
      setTableData(content)
    }
  },[])
  // 获取权限列表
  const getAuthData=async ()=>{
    middleDispatch({type:'getAuthList'})
  }
  // 点击编辑获取表单数据
  const getDetailFormData=async (id:string,type:string)=>{
    const headers={
      body:JSON.stringify({id})
    }
    const [,data]=await useFetch('/visual/role/detail',headers)
    if(data){
      type==='edit' && setEditFormData(data)
      type==='detail' && setDetailFormData(data)
    }
  }
  const deleteBatchRole=()=>{
    if(selectedRowKeys.length===0){
      message.warning('请先选择角色')
      return
    }
    confirm({
      title: '此操作将删除该内容, 是否继续?',
      icon: <ExclamationCircleOutlined />,
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      async onOk() {
        const [,data]=await useFetch('/visual/role/remove',{
          body:JSON.stringify({id:selectedRowKeys})
        })
        if(data){
          message.success('删除成功')
          getTableData()
        }
      }
    });
  }
  const deleteRole=(rowData:any)=>{
    return ()=>{
      confirm({
        title: '此操作将删除该内容, 是否继续?',
        icon: <ExclamationCircleOutlined />,
        okText: '确认',
        okType: 'danger',
        cancelText: '取消',
        async onOk() {
          const {id}=rowData
          const [,data]=await useFetch('/visual/role/remove',{
            body:JSON.stringify({id})
          })
          if(data){
            message.success('删除成功')
            getTableData()
          }
        }
      });
    }
  }
  const createRole=()=>{
    setShowAddRoleModel(true)
    setModelTitle('新建角色')
    setformType('add')
  }
  const hideCreateRole=useCallback(()=>{
    setShowAddRoleModel(false)
  },[])
  const handleEdit=(rowData:any)=>{
    return ()=>{
      setModelTitle('编辑角色')
      setShowAddRoleModel(true)
      setformType('edit')
      const {id}=rowData
      getDetailFormData(id,'edit')
    }
  }
  const handleShowDetailModel=(rowData:any)=>{
    return ()=>{
      setShowDetailModel(true)
      const {id}=rowData
      getDetailFormData(id,'detail')
    }
  }
  const handleHideDetailModel=useCallback(()=>{
    setShowDetailModel(false)
  },[])
  const tableOnChange=()=>{

  }
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const toAccountList=(rowData:any)=>{
    return ()=>{
      const {history}=prop
      history.push('/authority-manage/role-user?roleId='+rowData.id)
    }
  }
  useEffect(()=>{
    getTableData()
    getAuthData()
  },[pageInfo])
  return (
    <ConfigProvider locale={zhCN}>
      <div className='roleManage'>
        <div className="title">角色管理</div>
        <header className='header' style={{
          background: '#171a24'
        }}>
        <div className="topCondition">
          <div className="opt-btn">
            <Button type="primary" className="btn" onClick={createRole}>新建角色</Button>
            <Button onClick={deleteBatchRole}>批量删除</Button>
          </div>
        </div>
        </header>
        <div className='table-wrap'>
          <Table
            scroll={{ y: '53vh' }}
            rowClassName='customRowClass'
            rowSelection={rowSelection(selectedRowKeys,onSelectChange)}
            loading={tableLoading}
            columns={columns(handleEdit,handleShowDetailModel,deleteRole,toAccountList)}
            dataSource={tableData}
            pagination={paginationProps(totalElements,pageInfo,setPageInfo)}
            onChange={tableOnChange}
            rowKey={record=>record.id}
          />
        </div>
        <AuthContext.Provider value={{state,dispatch:middleDispatch}}>
          <AddOrEdit
            isModalVisible={showAddRoleModel}
            modelTitle={modelTitle}
            formType={formType}
            hideModel={hideCreateRole}
            getRoleList={getTableData}
            setEditFormData={setEditFormData}
            editFormData={editFormData}
          >
          </AddOrEdit>
          <RoleDetail
            isModalVisible={showDetailModel}
            hideModel={handleHideDetailModel}
            currentData={detailFormData}
            setCurrentData={setDetailFormData}
          ></RoleDetail>
        </AuthContext.Provider>
      </div>
    </ConfigProvider>
  )
}

export {AuthContext}
export default memo(
  connect(({ userManage }: any) => ({ userManage }))(RoleManage)
);
