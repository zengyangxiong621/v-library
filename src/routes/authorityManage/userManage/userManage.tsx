/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useEffect, useState } from "react";
import "./index.less";
import { connect } from "dva";
import zhCN from 'antd/es/locale/zh_CN'
import { useFetch } from "@/utils/useFetch";
import AddOrEdit from './components/addOrEdit'
enum dataSourceType {
  RDBMS,
  RESTFUL_API,
  JSON,
  CSV,
  EXCEL,
}

export type TDataSourceParams = {
  spaceId: string | number;
  type?: keyof typeof dataSourceType | null;
  name?: string | null;
  pageNo: string | number;
  pageSize: string | number;
  map?: {
    [x: string]: boolean
  }
};


import { ConfigProvider, Table, Button, Select, Input, Tag, Space, Modal, message } from 'antd'
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

// 功能
const UserManage = (props: any) => {
  const spaceId = 1
  const [inputValue, setInputValue] = useState('')
  const [tableLoading, setTableLoading] = useState(false)
  const [tableData, setTableData] = useState([])
  const [totalElements, setTotalElements] = useState(0)
  const [dataSourceType, setDataSourceType] = useState<any>(null)
  const [pageInfo, setPageInfo] = useState({
    pageNo: 1,
    pageSize: 30,
  })
  const [tableMap, setTableMap] = useState({})
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [showAddOrEdit, setShowAddOrEdit] = useState(false);


  
  // 查询用户列表
  const getUserList = async(param?:any) => {
    let obj = {
      ...pageInfo,
      name:inputValue,
      ...param
    }
    const [,data] = await useFetch('/visual/user/list',{
      body: JSON.stringify(obj)
    })
    if(data){
      setTotalElements(data.totalElements)
      setTableData(data.content)
    }
  }

  useEffect(() => {
    getUserList()
  },[])

  const createUser = () => {
    setShowAddOrEdit(true)
  }
  const deleteUser = () => {}

  const changeInputValue = (value:any) => {
    setInputValue(value)
  }

  const searchByType = (value:any) => {
    setPageInfo({
      pageNo: 1,
      pageSize:pageInfo.pageSize
    })
    getUserList({
      pageNo: 1,
      pageSize:pageInfo.pageSize,
      name: value
    })
  }

  // 表格分页配置
  const paginationProps = {
    total: totalElements,
    current: pageInfo.pageNo,
    pageSize: pageInfo.pageSize,
    pageSizeOptions: [10, 20, 30],
    showTotal: (val: number | string) => `共${val}条`,

    defaultCurrent: 1,
    showQuickJumper: true,
    showSizeChanger: true,
    // locale: {},
    onChange(page: number, pageSize: number) {
      setPageInfo({
        pageNo: page,
        pageSize
      })
      getUserList({
        pageNo: page,
        pageSize
      })
    },
  }



  const columns = [
    {
      title: '账号',
      dataIndex: 'userName',
      key: 'userName',
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
      key: 'roles',
      ellipsis: true,
      dataIndex: 'roles',
      width: 100,
    },
    {
      title: '状态',
      key: 'status',
      width: 100,
      dataIndex: 'status',
      render: (status: any, data: any) => {
        switch (status) {
          case '0':
            return '启用'
          case '1':
            return '停用'
          case '2':
            return '锁定'
          default: '无'
        }
      }
    },
    {
      title: '用户类型',
      key: 'type',
      width: 100,
      dataIndex: 'type',
      render: (type: any, data: any) => {
        switch (type) {
          case '1':
            return 'SSO账户'
          case '2':
            return '域账号'
          case '4':
            return '内置账号'
          case '-1':
            return '管理员账号'
          case '-2':
            return '安全管理平台自身内置账号'
          default: '无'
        }
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
    },
    {
      title: '操作',
      key: 'action',
      ellipsis: true,
      width: 250,
      render: (text: any, record: any) => {
        return (
          <Space size="middle" >
            <span className='textInOperationColumn' onClickCapture={() => editClick(text)}>编辑</span>
            <span className='textInOperationColumn' onClickCapture={() => resetClick(text)}>重置密码</span>
            <span className='textInOperationColumn' onClickCapture={() => delClick(record.id)}>删除</span>
            <span className='textInOperationColumn' onClickCapture={() => stopClick(record)}>{record.status === '1' ? '启用' : '停用'}</span>
          </Space>
        )
      }

    },
  ]; 

  // 多选
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const editClick = (data:any) => {

  }
  const resetClick = (data:any) => {

  }
  const delClick = (data:any) => {

  }
  const stopClick = (data:any) => {

  }
  const tableOnChange = () => {

  }

  const closeModal = () => {
    setShowAddOrEdit(false)
  }

  return (
    <ConfigProvider locale={zhCN}>
      <div className="userManage">
        <div className="title">用户管理</div>
        <header className='header' style={{
          background: '#171a24'
        }}>
          <div>
            <Button type="primary"  className="btn" onClick={createUser}>新建</Button>
            <Button onClick={deleteUser}>批量删除</Button>
          </div>
          <div className='search'>
            <Input.Search placeholder="搜索"
              allowClear
              maxLength={40}
              value={inputValue}
              onChange={(e) => changeInputValue(e.target.value)}
              onSearch={searchByType}
            />
          </div>
        </header>
        <div className='table-wrap'>
          <Table
            scroll={{ y: '53vh' }}
            sortDirections={['ascend', 'descend']}
            rowClassName='customRowClass'
            rowSelection={rowSelection}
            loading={tableLoading}
            columns={columns}
            dataSource={tableData}
            pagination={paginationProps}
            onChange={tableOnChange}
          />
        </div>
        {/* 新建用户 */}
        <AddOrEdit showAddOrEdit={showAddOrEdit} closeModal={closeModal}></AddOrEdit>
      </div>
    </ConfigProvider>
  )
};

export default memo(
  connect(({ userManage }: any) => ({ userManage }))(UserManage)
);
