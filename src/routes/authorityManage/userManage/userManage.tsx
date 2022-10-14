/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useEffect, useState } from "react";
import "./index.less";
import { connect } from "dva";
import zhCN from "antd/es/locale/zh_CN";
import { useFetch } from "@/utils/useFetch";
import AddOrEdit from "./components/addOrEdit";
import UpdatePassword from "./components/updatePassword";
import SearchHeader from "./components/searchHeader";
import { http } from "@/services/request";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { STATUSLIST, ACCOUNTLIST } from "@/constant/dvaModels/userManage";
import type { TableRowSelection } from "antd/lib/table/interface";
import TipModal from "@/components/tipModal"


import { ConfigProvider, Table, Button, Select, Input, Tag, Space, Modal, message, Form } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

const mapStateToProps = (state: any) => {
  return state;
};
// 功能
const UserManage = (props: any) => {
  const [tableLoading, setTableLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [pageInfo, setPageInfo] = useState({
    pageNo: 1,
    pageSize: 10,
  });
  const [searchParams,setSearchParams]=useState({});
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [showAddOrEdit, setShowAddOrEdit] = useState(false);
  const [showUpdateMode, setShowUpdateMode] = useState(false);
  const [formType, setformType] = useState("");
  const [currentUser, setCurrentUser] = useState<any>({});

  const [roleList, setRoleList] = useState([]);
  const userInfo = props.global.userInfo || {};

  const [delVisible,setDelVisible]=useState<boolean>(false);//删除框的visible
  const [rowData,setRowData]=useState<any>(null);//选中删除的rowData
  const [batchFlag,setBatchFlag]=useState<boolean>(false);//是否批量删除标识


  
  // 查询用户列表
  const getUserList = async(param?:any) => {
    const obj = {
      ...pageInfo,
      ...searchParams,
      ...param
    };
    setTableLoading(true);
    const [,data] = await useFetch("/visual/user/list",{
      body: JSON.stringify(obj)
    }).finally(() => {
      setTableLoading(false);
    });
    if(data){
      setTotalElements(data.totalElements);
      setTableData(data.content);
    }
  };
  useEffect(() => {
    getUserList();
    geRoleList();
  },[]);

  const createUser = () => {
    setformType("add");
    setShowAddOrEdit(true);
  };
  const resetPageInfo=()=>{
    const newPageInfo={
      pageNo: 1,
      pageSize: pageInfo.pageSize,
    };
    setPageInfo(newPageInfo);
    return newPageInfo;
  };
  const searchByType = (value:any) => {
    const newSearchParams={
      ...searchParams,
      ...value
    };
    setSearchParams(newSearchParams);
    const newPageInfo=resetPageInfo();
    getUserList({...newPageInfo,...newSearchParams});
  };

  // 获取角色列表数据
  const geRoleList = async() => {
    const [,data] = await useFetch("/visual/role/allList",{});
    setRoleList(data);
  };

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
      });
      getUserList({
        pageNo: page,
        pageSize
      });
    },
  };

  const columns = [
    {
      title: "账号",
      dataIndex: "userName",
      key: "userName",
      className: "customHeaderColor",
      ellipsis: true,
      render: (text: any) => <span>{text}</span>,
    },
    {
      title: "姓名",
      key: "name",
      ellipsis: true,
      dataIndex: "name",
    },
    {
      title: "角色",
      key: "roleName",
      ellipsis: true,
      dataIndex: "roleName",
      width: 100,
    },
    {
      title: "状态",
      key: "status",
      width: 100,
      dataIndex: "status",
      render: (status: any, data: any) => {
        const itemData = STATUSLIST.filter((item:any) => item.value === status);
        const spotMap:{
          [key:string]:string
        }={
          '0':'openning',
          '1':'closing',
          '-1':'none',
          '2':'locking'
        }
        return itemData ? (
          <div className="tableStatus">
            <span className={`${spotMap[itemData[0].value]} statusMark`}></span>
            <span>{itemData[0].label}</span>
          </div>
        ) : "";
      }
    },
    {
      title: "用户类型",
      key: "type",
      dataIndex: "type",
      ellipsis: true,
      render: (type: any, data: any) => {
        const index = type.toString();
        return ACCOUNTLIST[index];
      }
    },
    {
      title: "工号",
      dataIndex: "code",
      key: "code",
      ellipsis: true,
    },
    {
      title: "邮箱",
      dataIndex: "email",
      key: "email",
      width: 150,
      ellipsis: true,
    },
    {
      title: "联系方式",
      dataIndex: "tel",
      key: "tel",
      width: 150,
      ellipsis: true,
    },
    {
      title: "操作",
      key: "action",
      ellipsis: true,
      width: 250,
      render: (text: any, record: any) => {
        return (
          <>
            <Button type="link" size='small' disabled={getDisabled(text,"edit")} onClickCapture={() => editClick(text)}>编辑</Button>
            <Button type="link" size='small' disabled={getDisabled(text,"password")} onClickCapture={() => resetClick(text)}>重置密码</Button>
            <Button type="link" size='small' disabled={getDisabled(text,"del")} onClickCapture={() => delClick([text.id])}>删除</Button>
            <Button type="link" size='small' disabled={getDisabled(text,"status")} onClickCapture={() => changeStatusClick(text)}>{record.status === "1" ? "启用" : "停用"}</Button>
          </>
        );
      }

    },
  ]; 

  // 多选
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection:TableRowSelection<any> = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (row:any) => {
      const isSupAdmin = row.sysDef; // true 系统自带的内部超级管理员，账号不能被删除、启动、停用
      const isStatusOk = row.status !== "0" && row.status !== "2";  // 非启用状态和锁定状态，可操作
      const isTypeOk = row.type === -2;
      const curIsSupAdmin = userInfo.sysDef;
      let disable = true;
      if (isTypeOk && isStatusOk && !isSupAdmin) { // 超管账号不能删除
        if (row.id === userInfo.id) { // 当前用户可修改密码
          disable = false;
        }
        if (curIsSupAdmin) { // 当前用户是管理员可修改密码，不用是否停用
          disable = false;
        }
      }
      // 选用的antd版本不对，antd 2.0版本不需要props
      return {
        disabled: disable
      };
    }
  };

  const editClick = (data:any) => {
    setCurrentUser(data);
    setformType("edit");
    setShowAddOrEdit(true);
  };
  const resetClick = (data:any) => {
    setCurrentUser(data);
    setShowUpdateMode(true);
  };
  const delClick = (data:any) => {
    setDelVisible(true)
    setRowData(data)
    // Modal.confirm({
    //   title: "提示",
    //   okButtonProps: {
    //     style: {
    //       backgroundColor: "#e9535d",
    //       border: "none",
    //       // marginLeft: '8px',
    //     }
    //   },
    //   cancelButtonProps: {
    //     style: {
    //       backgroundColor: "#3d404d"
    //     }
    //   },
    //   icon: <ExclamationCircleFilled />,
    //   content: "此操作将删除该内容，是否继续?",
    //   okText: "确定",
    //   cancelText: "取消",
    //   bodyStyle: {
    //     background: "#232630",
    //   },
    //   async onOk(close:any) {
    //     const result = await http({
    //       url: "/visual/user/remove",
    //       method: "post",
    //       body: {
    //         ids: data
    //       }
    //     });
    //     if (result) {
    //       close();
    //       getUserList();
    //       message.success({ content: "删除成功", duration: 2 });
    //     } else {
    //       message.error({ content: "删除失败", duration: 2 });
    //     }
    //   },
    //   onCancel(close:any) {
    //     close();
    //   }
    // });
  };
  // 批量删除处理
  const deleteBatchUser = () => {
    if(!selectedRowKeys.length) {
      message.warning("请选择待删除的账号");
    }else{
      // delClick(selectedRowKeys);
      setDelVisible(true)
      setBatchFlag(true)
      setRowData(selectedRowKeys)
    }
  };
  // 取消删除（关闭删除提示框）
  const closeTipModal = ()=> {
    setDelVisible(false)
    setBatchFlag(false)
  }
  const handleDelOk = async () => {
    const result = await http({
      url: "/visual/user/remove",
      method: "post",
      body: {
        ids: rowData
      }
    });
    if (result) {
      close();
      getUserList();
      message.success({ content: "删除成功", duration: 2 });
    } else {
      message.error({ content: "删除失败", duration: 2 });
    }
    closeTipModal()
  }
  const changeStatusClick = async(data:any) => {
    const result = await http({
      url: "/visual/user/updateStatus",
      method: "post",
      body: {
        status: data.status === "0" ? "1" : "0",
        id: data.id
      }
    });
    if(result){
      message.success(`${data.status === "0" ? "停用" : "启用"}成功`);
      getUserList();
    }
  };
  const tableOnChange = () => {

  };

  const closeModal = () => {
    setShowAddOrEdit(false);
    setShowUpdateMode(false);
  };

  const getDisabled = (row:any, type:any) => {
    const isSupAdmin = row.sysDef; // true 系统自带的内部超级管理员，账号不能被删除、启动、停用
    const isStatusOk = row.status !== "0" && row.status !== "2";  // 非启用状态和锁定状态，可操作
    const isTypeOk = row.type === -2;
    const curIsSupAdmin = userInfo.sysDef;
    // 单独处理suadmin账户 
    if(isTypeOk && row.userName === "suadmin"){
      return type !== "password";
    }
    if (type === "password" && isTypeOk) { // 修改系统用户的密码
      if (row.id === userInfo.id) { // 当前用户可修改密码
        return false;
      }

      if (curIsSupAdmin) { // 当前用户是管理员可修改密码，不用是否停用
        return false;
      }
    }

    if (type === "status") { // 停用、启用状态下可编辑，包括管理员工账号
      if (row.id === userInfo.id) { // 当前用户可编辑
        return false;
      }

      if (curIsSupAdmin) { // 当前用户是管理员可编辑
        return false;
      }

      if(!isSupAdmin) { // 当前被编辑的是超管的话，普通人不能编辑
        return false;
      }
    }

    if (type === "del" && isTypeOk && isStatusOk && !isSupAdmin) { // 超管账号不能删除
      if (row.id === userInfo.id) { // 当前用户可修改密码
        return false;
      }

      if (curIsSupAdmin) { // 当前用户是管理员可修改密码，不用是否停用
        return false;
      }
    }

    if(type === "edit"){
      return false;
    }

    return true;
  };

  return (
    <ConfigProvider locale={zhCN}>
      <div className="userManage">
        <div className="title">用户管理</div>
        <header className='header' style={{
          background: "#171a24"
        }}>
          <SearchHeader roleList={roleList} searchByType={searchByType}></SearchHeader>
          <div className="opt-btn">
            <Button type="primary"  className="btn" onClick={createUser}>新建用户</Button>
            <Button onClick={deleteBatchUser}>批量删除</Button>
          </div>
        </header>
        <div className='table-wrap'>
          <Table
            scroll={{ y: "calc(100vh - 350px)" }}
            rowClassName='customRowClass'
            rowSelection={rowSelection}
            loading={tableLoading}
            columns={columns}
            dataSource={tableData}
            pagination={paginationProps}
            onChange={tableOnChange}
            rowKey={record=>record.id}
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
        {/* 修改密码 */}
        <UpdatePassword  
          showUpdateMode={showUpdateMode} 
          currentUser={currentUser} 
          closeModal={closeModal} 
        ></UpdatePassword>
      </div>
      <TipModal 
        visible={delVisible}
        text="此操作将删除该账号，是否继续?"
        onOk={handleDelOk} 
        onCancel={closeTipModal}
      />
    </ConfigProvider>
  );
};

export default connect(mapStateToProps)(UserManage);

// export default memo(
//   UserManage
// );
