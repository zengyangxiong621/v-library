/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useEffect, useState } from "react";
import "./index.less";
import { connect } from "dva";
import zhCN from 'antd/es/locale/zh_CN'
import { useFetch } from "@/utils/useFetch";
import AddOrEdit from './components/addOrEdit'
import SearchHeader from './components/searchHeader'
import { http } from "@/services/request";
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


import { ConfigProvider, Table, Button, Select, Input, Tag, Space, Modal, message, Form } from 'antd'
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

// 功能
const UserManage = (props: any) => {
  const spaceId = 1
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
  const [formType, setformType] = useState('');
  const [currentUser, setCurrentUser] = useState<any>({});

  const [roleList, setRoleList] = useState([])


  
  // 查询用户列表
  const getUserList = async(param?:any) => {
    let obj = {
      ...pageInfo,
      ...param
    }
    setTableLoading(true)
    const [,data] = await useFetch('/visual/user/list',{
      body: JSON.stringify(obj)
    }).finally(() => {
      setTableLoading(false)
    })
    if(data){
      setTotalElements(data.totalElements)
      setTableData(data.content)
    }
  }

  // 获取登录用户的信息

  useEffect(() => {
    getUserList()
    geRoleList()
  },[])

  const createUser = () => {
    setformType('add')
    setShowAddOrEdit(true)
  }
  const deleteUser = () => {}

  const searchByType = (value:any) => {
    setPageInfo({
      pageNo: 1,
      pageSize:pageInfo.pageSize
    })
    getUserList({
      pageNo: 1,
      pageSize:pageInfo.pageSize,
      ...value
    })
  }

  // 获取角色列表数据
  const geRoleList = async() => {
    const [,data] = await useFetch('/visual/role/allList',{})
    setRoleList(data)
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
      dataIndex: 'type',
      ellipsis: true,
      render: (type: any, data: any) => {
        switch (type) {
          case 1:
            return 'SSO账户'
          case 2:
            return '域账号'
          case 4:
            return '内置账号'
          case -1:
            return '管理员账号'
          case -2:
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
          <>
            <Button type="link" size='small' onClickCapture={() => editClick(text)}>编辑</Button>
            <Button type="link" size='small' disabled={handleBtnDisabled(text,'password')} onClickCapture={() => resetClick(text)}>重置密码</Button>
            <Button type="link" size='small' disabled={handleBtnDisabled(text,'delete')} onClickCapture={() => delClick(text)}>删除</Button>
            <Button type="link" size='small' disabled={handleBtnDisabled(text,'status')} onClickCapture={() => changeStatusClick(text)}>{record.status === '1' ? '启用' : '停用'}</Button>
          </>
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
    setCurrentUser(data)
    setformType('edit')
    setShowAddOrEdit(true)
  }
  const resetClick = (data:any) => {

  }
  const delClick = (data:any) => {

  }
  const changeStatusClick = async(data:any) => {
    const result = await http({
      url: '/visual/user/updateStatus',
      method: 'post',
      body: {
        status: data.status === '0' ? '1' : '0',
        id: data.id
      }
    })
    if(result){
      message.success(`${data.status === '0' ? '停用' : '启用'}成功`)
      getUserList()
    }
  }
  const tableOnChange = () => {

  }

  const closeModal = () => {
    setShowAddOrEdit(false)
  }

  // table按钮禁用问题
  const handleBtnDisabled = (data:any,type:any) => {
    switch(type){
      case 'password':
      case 'delete':
        return true;
      case 'status':
        return data.type === 1
    }
  }

  return (
    <ConfigProvider locale={zhCN}>
      <div className="userManage">
        <div className="title">用户管理</div>
        <header className='header' style={{
          background: '#171a24'
        }}>
          <SearchHeader roleList={roleList} searchByType={searchByType}></SearchHeader>
          <div className="opt-btn">
            <Button type="primary"  className="btn" onClick={createUser}>新建用户</Button>
            <Button onClick={deleteUser}>批量删除</Button>
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
        <AddOrEdit
          formType={formType}
          roleList={roleList}
          currentUser={currentUser}
          showAddOrEdit={showAddOrEdit} 
          closeModal={closeModal} 
          getUserList={getUserList}
        ></AddOrEdit>
      </div>
    </ConfigProvider>
  )
};

export default memo(
  connect(({ userManage }: any) => ({ userManage }))(UserManage)
);
