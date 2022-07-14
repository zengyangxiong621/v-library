import * as React from 'react';
import { useState, useEffect } from 'react';
import zhCN from 'antd/es/locale/zh_CN'
import queryString from 'query-string';
import {ConfigProvider,Button,Table,Modal,message} from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import type { TableRowSelection,ColumnsType } from 'antd/lib/table/interface';
import './index.less'
import { useFetch } from "@/utils/useFetch";
import SearchContainer from './components/searchContainer'
import {params} from '../interface'
import { STATUSLIST, ACCOUNTLIST } from '@/constant/dvaModels/userManage'
const { confirm } = Modal;

const paginationProps=(totalElements:number,pageInfo:params,setPageInfo:Function,getTableData:Function)=>{
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
      getTableData(newPage)
    },
  }
}
const tableColumns=(handleDel:any):ColumnsType<any>=>{
  return [{
    title: '账号',
    dataIndex: 'username',
    key: 'username',
    className: 'customHeaderColor',
    ellipsis: true,
    render: (text: any) => <span>{text}</span>,
  },
  {
    title: '姓名',
    key: 'name',
    ellipsis: true,
    dataIndex: 'name',
  },
  {
    title: '角色',
    key: 'roleName',
    ellipsis: true,
    dataIndex: 'roleName',
    width: 100,
  },
  {
    title: '状态',
    key: 'status',
    width: 100,
    dataIndex: 'status',
    render: (status: any, data: any) => {
      const itemData = STATUSLIST.filter((item:any) => item.value === status.toString())
      return itemData ? itemData[0].label : ''
    }
  },
  {
    title: '用户类型',
    key: 'type',
    dataIndex: 'type',
    ellipsis: true,
    render: (type: any, data: any) => {
      let index = type.toString()
      return ACCOUNTLIST[index]
    }
  },
  {
    title: '工号',
    dataIndex: 'code',
    key: 'code',
    ellipsis: true,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
    width: 150,
    ellipsis: true,
  },
  {
    title: '联系方式',
    dataIndex: 'tel',
    key: 'tel',
    width: 150,
    ellipsis: true,
  },{
    title: '操作',
    key: 'action',
    ellipsis: true,
    width: 100,
    render: (text: any, record: any) => {
      return (
        <>
          <Button type="link" size='small' onClickCapture={() => handleDel(text)}>删除</Button>
        </>
      )
    }
  }]
}



export default function AccountList(props:any) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [tableData, setTableData] = useState([])
  const [tableLoading, setTableLoading] = useState(false)
  const [totalElements, setTotalElements] = useState(0)
  const [pageInfo, setPageInfo] = useState({
    pageNo: 1,
    pageSize: 30,
  })
  const [searchParams,setSearchParams]=useState<any>(null)

  // 多选
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection:TableRowSelection<any> = {
    selectedRowKeys,
    onChange: onSelectChange
  };

  const resetPageInfo=()=>{
    const newPageInfo={
      pageNo: 1,
      pageSize: pageInfo.pageSize,
    }
    setPageInfo(newPageInfo)
    return newPageInfo
  }
  const handleSearch=(value:any)=>{
    const newSearchParams={
      ...searchParams,
      ...value
    }
    setSearchParams(newSearchParams)
    const newPageInfo=resetPageInfo()
    getTableData({...newPageInfo,...newSearchParams})
  }
  const getTableData=async(params?:any)=>{
    const getParams={
      ...pageInfo,
      ...searchParams,
      ...params
    }
    setTableLoading(true)
    const [,data] = await useFetch(`/visual/role/viewUsers`,{
      body: JSON.stringify(getParams)
    }).finally(() => {
      setTableLoading(false)
    })
    if(data){
      const {content,totalElements}=data
      setTotalElements(totalElements)
      setTableData(content)
    }
  }
  const handleDel=(rowData:any)=>{
    confirm({
      title: '此操作将删除该内容, 是否继续?',
      icon: <ExclamationCircleOutlined />,
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      async onOk() {
        const {roleUserId}=rowData
        const [,data]=await useFetch('/visual/role/removeRoleUsers',{
          body:JSON.stringify([roleUserId])
        })
        if(data){
          message.success('删除成功')
          getTableData()
        }
      }
    });
  }

  useEffect(()=>{
    const query=queryString.parse(props.location.search)
    const searchParams={
      roleId:query.roleId,
      name:'',
      status:''
    }
    setSearchParams(searchParams)
    getTableData(searchParams)
  },[])

  return (
    <ConfigProvider locale={zhCN}>
      <div className='roleUser'>
        <div className="title">角色管理/账号列表</div>
        <header className='header' style={{
          background: '#171a24'
        }}>
          <SearchContainer searchByType={handleSearch}></SearchContainer>
        </header>
        <div className='table-wrap'>
          <Table
            scroll={{ y: '53vh' }}
            rowClassName='customRowClass'
            rowSelection={rowSelection}
            loading={tableLoading}
            columns={tableColumns(handleDel)}
            dataSource={tableData}
            pagination={paginationProps(totalElements,pageInfo,setPageInfo,getTableData)}
            rowKey={record=>record.id}
          />
        </div>
      </div>
    </ConfigProvider>
  )
}
