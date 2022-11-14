/* eslint-disable no-case-declarations */
import React, { Dispatch, memo, useCallback, useEffect, useReducer, useState } from "react";
import { useFetch } from "@/utils/useFetch";
import { handleToTree, handleAddChecked } from "@/utils";
import "./index.less";
import { connect } from "dva";
import zhCN from "antd/es/locale/zh_CN";
import { ConfigProvider, Button, Table, message } from "antd";
import type { ColumnsType } from "antd/lib/table/interface";
import {
  params,
  dataType,
  authStateType,
  authActionType,
  authContextType,
  dispatcher,
} from "./interface";
import AddOrEdit from "./components/addOrEdit";
import RoleDetail from "./components/roleDetail";
import TipModal from "@/components/tipModal";
// const { confirm } = Modal;

/**
 * 配置项
 */
const baseParams: params = {
  pageNo: 1,
  pageSize: 10,
};
const columns = (
  handleEdit: any,
  handleDetail: any,
  handledelete: any,
  toAccountList: any
): ColumnsType<dataType> => {
  return [
    {
      title: "角色名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "描述",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "更新时间",
      dataIndex: "updatedTime",
      key: "updatedTime",
    },
    {
      title: "操作人",
      dataIndex: "updatedUserAccount",
      key: "updatedUserAccount",
    },
    {
      title: "操作",
      key: "action",
      ellipsis: true,
      width: 250,
      render: (text: any, record: any) => {
        return (
          <>
            <Button type="link" size="small" onClick={handleDetail(record)}>
              详情
            </Button>
            <Button type="link" size="small" onClick={toAccountList(record)}>
              查看用户
            </Button>
            <Button type="link" size="small" onClick={handleEdit(record)}>
              编辑
            </Button>
            <Button type="link" size="small" onClick={handledelete(record)}>
              删除
            </Button>
          </>
        );
      },
    },
  ];
};
const paginationProps = (totalElements: number, pageInfo: params, setPageInfo: any) => {
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
      const newPage = {
        pageNo: page,
        pageSize,
      };
      setPageInfo(newPage);
    },
  };
};
const rowSelection = (selectedRowKeys: React.Key[], onSelectChange: any) => {
  return {
    selectedRowKeys,
    onChange: onSelectChange,
  };
};

/**
 * store局部数据共享
 */
const authState: authStateType = {
  authList: [],
};
const authReducer = (state: authStateType, action: authActionType) => {
  switch (action.type) {
    case "updateState":
      return { ...state, ...action.update };
    default:
      return state;
  }
};
const dispatchMiddle = (next: Dispatch<authActionType>): dispatcher => {
  return async (action: authActionType) => {
    switch (action.type) {
      case "getAuthList":
        const headers = {
          "Content-Type": "application/x-www-form-urlencoded",
        };
        const [, data] = await useFetch("/visual/menu/listAll", headers);
        const treeData = handleToTree(data);
        const newData = handleAddChecked(treeData);
        next({ type: "updateState", update: { authList: newData } });
        break;
      default:
        next(action);
    }
  };
};
const AuthContext = React.createContext<authContextType>({
  state: authState,
  dispatch: (value) => {
    console.log("value", value);
  },
});

// 页面渲染
const RoleManage = (prop: any) => {
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  const [totalElements, setTotalElements] = useState(0);
  const [tableData, setTableData] = useState<Array<dataType>>([]);
  const [pageInfo, setPageInfo] = useState<params>(baseParams);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [state, dispatch] = useReducer(authReducer, authState);
  const middleDispatch = dispatchMiddle(dispatch);

  const [showAddRoleModel, setShowAddRoleModel] = useState<boolean>(false);
  const [modelTitle, setModelTitle] = useState<string>("");
  const [formType, setformType] = useState<string>("");
  const [editFormData, setEditFormData] = useState(null);

  const [showDetailModel, setShowDetailModel] = useState<boolean>(false);
  const [detailFormData, setDetailFormData] = useState(null);

  const [delVisible, setDelVisible] = useState<boolean>(false); //删除框的visible
  const [rowData, setRowData] = useState<any>(null); //选中删除的rowData
  const [batchFlag, setBatchFlag] = useState<boolean>(false); //是否批量删除标识

  // 获取表格数据
  const getTableData = useCallback(async (params?: object) => {
    setTableLoading(true);
    const getParams = {
      ...pageInfo,
      ...params,
    };
    const header = {
      body: JSON.stringify(getParams),
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [err, data, code] = await useFetch("/visual/role/list", header).finally(() => {
      setTableLoading(false);
    });
    if (data) {
      const { content, totalElements } = data;
      setTotalElements(totalElements);
      setTableData(content);
    }
  }, []);
  // 获取权限列表
  const getAuthData = async () => {
    middleDispatch({ type: "getAuthList" });
  };
  // 点击编辑获取表单数据
  const getDetailFormData = async (id: string, type: string) => {
    const headers = {
      method: "GET",
    };
    const [, data] = await useFetch(`/visual/role/detail/${id}`, headers);
    if (data) {
      type === "edit" && setEditFormData(data);
      type === "detail" && setDetailFormData(data);
    }
  };
  const deleteBatchRole = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("请先选择角色");
      return;
    }
    setDelVisible(true);
    setBatchFlag(true);
    // confirm({
    //   title: "此操作将删除该内容, 是否继续?",
    //   icon: <ExclamationCircleOutlined />,
    //   okText: "确认",
    //   okType: "danger",
    //   cancelText: "取消",
    //   async onOk() {
    //     const [,data]=await useFetch("/visual/role/remove",{
    //       body:JSON.stringify(selectedRowKeys)
    //     });
    //     if(data){
    //       message.success("删除成功");
    //       getTableData();
    //     }
    //   }
    // });
  };
  const deleteRole = (rowData: any) => {
    return () => {
      setDelVisible(true);
      setRowData(rowData);
      // confirm({
      //   title: "此操作将删除该内容, 是否继续?",
      //   icon: <ExclamationCircleOutlined />,
      //   okText: "确认",
      //   okType: "danger",
      //   cancelText: "取消",
      //   async onOk() {
      //     const {id}=rowData;
      //     const parmas=[id];
      //     const [,data]=await useFetch("/visual/role/remove",{
      //       body:JSON.stringify(parmas)
      //     });
      //     if(data){
      //       message.success("删除成功");
      //       getTableData();
      //     }
      //   }
      // });
    };
  };
  // 取消删除（关闭删除提示框）
  const closeTipModal = () => {
    setDelVisible(false);
    setBatchFlag(false);
  };
  const handleDelOk = async () => {
    if (!batchFlag) {
      const { id } = rowData;
      const parmas = [id];
      const [, data] = await useFetch("/visual/role/remove", {
        body: JSON.stringify(parmas),
      });
      if (data) {
        message.success("删除成功");
        getTableData();
      }
    } else {
      const [, data] = await useFetch("/visual/role/remove", {
        body: JSON.stringify(selectedRowKeys),
      });
      if (data) {
        message.success("删除成功");
        getTableData();
      }
    }
    closeTipModal();
  };
  const createRole = () => {
    setShowAddRoleModel(true);
    setModelTitle("新建角色");
    setformType("add");
  };
  const hideCreateRole = useCallback(() => {
    setShowAddRoleModel(false);
  }, []);
  const handleEdit = (rowData: any) => {
    return () => {
      setModelTitle("编辑角色");
      setShowAddRoleModel(true);
      setformType("edit");
      const { id } = rowData;
      getDetailFormData(id, "edit");
    };
  };
  const handleShowDetailModel = (rowData: any) => {
    return () => {
      setShowDetailModel(true);
      const { id } = rowData;
      getDetailFormData(id, "detail");
    };
  };
  const handleHideDetailModel = useCallback(() => {
    setShowDetailModel(false);
  }, []);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const toAccountList = (rowData: any) => {
    return () => {
      const { history } = prop;
      history.push("/authority-manage/role-user?roleId=" + rowData.id);
    };
  };
  useEffect(() => {
    getTableData();
    getAuthData();
  }, [pageInfo]);
  return (
    <ConfigProvider locale={zhCN}>
      <div className="roleManage">
        <div className="title">角色管理</div>
        <header
          className="header"
          style={{
            background: "#171a24",
          }}
        >
          <div className="topCondition">
            <div className="opt-btn">
              <Button type="primary" className="btn" onClick={createRole}>
                新建角色
              </Button>
              <Button onClick={deleteBatchRole}>批量删除</Button>
            </div>
          </div>
        </header>
        <div className="table-wrap">
          <Table
            scroll={{ y: "calc(100vh - 300px)" }}
            rowClassName="customRowClass"
            rowSelection={rowSelection(selectedRowKeys, onSelectChange)}
            loading={tableLoading}
            columns={columns(handleEdit, handleShowDetailModel, deleteRole, toAccountList)}
            dataSource={tableData}
            pagination={paginationProps(totalElements, pageInfo, setPageInfo)}
            // onChange={tableOnChange}
            rowKey={(record) => record.id}
          />
        </div>
        <AuthContext.Provider value={{ state, dispatch: middleDispatch }}>
          <AddOrEdit
            isModalVisible={showAddRoleModel}
            modelTitle={modelTitle}
            formType={formType}
            hideModel={hideCreateRole}
            getRoleList={getTableData}
            setEditFormData={setEditFormData}
            editFormData={editFormData}
          ></AddOrEdit>
          <RoleDetail
            isModalVisible={showDetailModel}
            hideModel={handleHideDetailModel}
            currentData={detailFormData}
            setCurrentData={setDetailFormData}
          ></RoleDetail>
        </AuthContext.Provider>
      </div>
      <TipModal
        visible={delVisible}
        text="此操作将删除该内容，是否继续?"
        onOk={handleDelOk}
        onCancel={closeTipModal}
      />
    </ConfigProvider>
  );
};

export { AuthContext };
export default memo(connect(({ userManage }: any) => ({ userManage }))(RoleManage));
