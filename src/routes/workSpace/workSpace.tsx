/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useEffect, useState } from "react";
import "./index.less";
import { connect } from "dva";

import { TWorkSpaceParams } from "./type";
import zhCN from "antd/es/locale/zh_CN";

import { ConfigProvider, Input, Table, Space, Button, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import LeftTree from "./components/LeftTree";
import DarkModal from "../myDashboard/components/darkThemeModal";
import { http } from '@/services/request'


// 功能
const workSpace = ({ workSpace, dispatch, history }: any) => {
  // 空间id
  const addMemberForm: any = Form.useForm()
  // TODO 后端目前默认是倒排，后续可能需要更改
  // UI图上默认是按照修改时间排
  const [sortMap, setSortMap] = useState<any>({
    // updated_time: false,
  });
  // 剩余配额
  const [projectQuota, setProjectQuota] = useState<any>(0);

  // 表格 相关状态
  const [memberList, setMemberList] = useState([])
  const [pageInfo, setPageInfo] = useState({
    pageNo: 1,
    pageSize: 10,
  });
  const [tableMap, setTableMap] = useState({});
  const [totalElements, setTotalElements] = useState(0);
  const [tableLoading, setTableLoading] = useState(false);
  // Modal相关状态
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);

  const getDataDispatch = (finalBody: any, DvaEffectName: string) => {
    dispatch({
      type: `workSpace/${DvaEffectName}`,
      payload: finalBody,
    });
  };

  /**
 * description: 更新表格数据
 */
  const getTableData = async (finalBody: any) => {
    setTableLoading(true)
    const data = await http(
      {
        url: "/visual/workspace/userList",
        method: 'post',
        body: finalBody
      },
    )
    setTableLoading(false)
    if (Array.isArray(data?.content)) {
      setMemberList(data.content)
      setPageInfo({
        pageNo: data.pageNo,
        pageSize: data.pageSize
      })
      setTotalElements(data.totalElements)
    }
  }

  // 页面初始化- 获取空间列表数据 & 获取表格数据
  useEffect(() => {
    getDataDispatch({ accountId: workSpace.accountId }, 'getWorkSpaceList')
  }, []);
  useEffect(() => {
    const finalBody = {
      pageNo: 1,
      pageSize: 10,
      spaceId: workSpace.curWorkSpace[0],
      map: sortMap,
    };
    getTableData(finalBody)
  }, [workSpace.curWorkSpace])
  // 设置项目配额
  useEffect(() => setProjectQuota(workSpace.projectQuota), [workSpace.projectQuota])

  // 重新设置项目配额
  const resetQuota = async () => {
    const finalBody = {
      accountId: workSpace.accountId,
      spaceId: workSpace.curWorkSpace[0],
      projectQuota: projectQuota
    }
    const data = await http({
      url: `/visual/workspace/update`,
      method: 'post',
      body: finalBody
    })
    if (data) {
      // 更改配额成功了, 刷新页面
      getDataDispatch({ accountId: workSpace.accountId }, 'getWorkSpaceList')
    }
  }

  // 刷新右侧成员列表
  const refreshMemberList = async (workSpaceId: string) => {
    // 在点击了左侧空间后，右侧在重新刷新表格之前需要清除上一个表格的缓存信息，比如pageNo,pageSize……
    const finalBody = {
      pageNo: 1,
      pageSize: 10,
      spaceId: workSpaceId,
      map: sortMap,
    };
    getTableData(finalBody)
  }

  // 选择排序的标准
  const selectSortType = (value: any, b: any) => {
    const newSortMap = {
      [value]: false,
    };
    setSortMap(newSortMap);
    // 选择新标准后，需要发送一次请求
    const finalBody = {
      pageNo: 1,
      pageSize: 10,
      spaceId: workSpace.curWorkSpace[0],
      map: newSortMap,
    };
    dispatch({
      type: "dashboardManage/getTemplateList",
      payload: finalBody,
    });
  };
  // 添加成员
  const changeAddMemberModal = () => {
    setShowAddMemberModal(!showAddMemberModal);
  };
  // 表格中的删除事件
  const delClick = (rowId: string) => { };

  // 表格排序 (分页事件在paginationProps中已经定义)
  const tableOnChange = (
    pagination: any,
    filters: any,
    sorter: any,
    { action }: any
  ) => {
    // sorter 有两个默认值 ascend 和 descend 不排序时是undefined
    // 这里只处理排序，  分页已经在pagination的change事件种弄了，就不弄了
    const { field, order } = sorter;
    console.log("sort", order);
    if (action === "sort") {
      // setTableMap({
      //   [field]: order
      // })
      // 发送请求
      // const finalParams: TDataSourceParams = {
      //   spaceId: workSpace.curWorkSpace[0],
      //   type: dataSourceType,
      //   name: inputValue === '' ? null : inputValue,
      //   ...pageInfo,
      //   map: {
      //     [field]: order
      //   },
      // }
      // TODO 等后端做好排序，解封即可
      // getTableData(finalParams)
    }
  };

  // ****** Modal相关  *****
  const confirmAddMember = () => { };
  const cancelAddMemberModal = () => {
    setShowAddMemberModal(false);
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
      const finalParams: TWorkSpaceParams = {
        spaceId: workSpace.curWorkSpace[0],
        pageNo: page,
        pageSize,
        map: tableMap,
      };
      getTableData(finalParams)
    },
  };
  // 列配置
  const columns = [
    {
      title: "用户名",
      dataIndex: "name",
      key: "name",
      // showSorterTooltip: false,
      width: 250,
      className: "customHeaderColor",
      ellipsis: true,
      render: (text: any) => <span>{text}</span>,
    },
    {
      title: "ID",
      key: "id",
      ellipsis: true,
      dataIndex: "id",
      width: 250,
    },
    {
      title: "用户类型",
      dataIndex: "userType",
      key: "userType",
      ellipsis: true,
      width: 250,
    },
    {
      title: "添加时间",
      key: "createdTime",
      sorter: true,
      width: 300,
      ellipsis: true,
      showSorterTooltip: false,
      dataIndex: "createdTime",
      render: (time: any, data: any) => {
        // const a = new Date(time)
        return <>{time}</>;
      },
    },
    {
      title: "操作",
      key: "action",
      ellipsis: true,
      width: 200,
      render: (text: any, record: any) => {
        return (
          <Space size="middle">
            <span
              className="textInOperationColumn"
              onClickCapture={() => delClick(record.id)}
            >
              删除
            </span>
          </Space>
        );
      },
    },
  ];
  return (
    <ConfigProvider locale={zhCN}>
      <div className="workSpace-wrap">
        <div className="left">
          {/* 左侧树 */}
          <LeftTree refreshMemberList={refreshMemberList} />
        </div>
        <div className="right">
          <div className="right-one">
            <div className="set-flex">
              <div className="title">项目配额</div>
              <Input
                value={projectQuota}
                onChange={(e) => setProjectQuota(e.target.value)}
                onPressEnter={resetQuota}
                onBlur={resetQuota}
                style={{ width: "80px", marginRight: "20px" }}>
              </Input>
            </div>
            <span>剩余项目配额  {workSpace.remainQuota}  个</span>
          </div>
          <div className="right-two set-flex set-flex-sb">
            <p>成员管理</p>
            <div className="custom-btn" onClick={changeAddMemberModal}>
              <PlusOutlined style={{ fontSize: "12px", marginRight: "2px" }} />
              <span>添加成员</span>
            </div>
          </div>
          {/* 右侧表格 */}
          <div className="right-three right-table-wrap">
            <Table
              scroll={{ y: 560 }}
              rowClassName="customRowClass"
              loading={tableLoading}
              columns={columns}
              dataSource={memberList}
              pagination={paginationProps}
              onChange={tableOnChange}
            ></Table>
          </div>
        </div>
        {/* 添加成员 */}
        <DarkModal
          title="添加成员"
          className="add-member-dark-modal"
          destroyOnClose={true}
          getContainer={false}
          visible={showAddMemberModal}
          onCancel={cancelAddMemberModal}
          footer={[
            <div className="custom-btn-wrap">
              <Button
                className="my-btn cancel-btn"
                onClickCapture={cancelAddMemberModal}
              >
                取消
              </Button>
              <Button
                className="my-btn confirm-btn"
                onClickCapture={confirmAddMember}
              >
                确定
              </Button>
            </div>,
          ]}
          style={{
            top: "25%",
          }}
        >
          <Form
            ref={addMemberForm}
            labelCol={{
              span: 4,
            }}
            layout="horizontal"
            name='releaseForm'
          >
            <Form.Item
              colon={false}
              label="用户名"
              name="name"
              rules={[{ required: true, message: '请输入用户名' }]}
            ><div className="set-flex">
                <Input />
              </div>
            </Form.Item>
          </Form>
        </DarkModal>
      </div>
    </ConfigProvider>
  );
};

export default memo(
  connect(({ workSpace }: any) => ({ workSpace }))(workSpace)
);
