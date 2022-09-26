import { memo, useState, useEffect, useCallback, useMemo } from "react";
import "./index.less";
import zhCN from "antd/es/locale/zh_CN";

import { ConfigProvider, Table, Button, Select, Input, Tag, Space, Modal, message } from "antd";
import { PlusOutlined, ExclamationCircleFilled } from "@ant-design/icons";

import ImportComponent from "./components/importComponent";

import { http } from "@/services/request";

const { Option } = Select;

type TDataSourceParams = {
  status?: number | null;
  name?: string | null;
  pageNo: string | number;
  pageSize: string | number;
  map?: {
    [x: string]: boolean
  }
};

// 初始化数据
const ComponentDev = (props: any) => {
  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState(null); 
  const [isShowImportModal, setIsShowImportModal] = useState(false); 
  const [pageInfo, setPageInfo] = useState({
    pageNo: 1,
    pageSize: 10,
  });
  const [tableMap, setTableMap] = useState({});
  const [totalElements, setTotalElements] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);


  /****** 每次请求回数据后，一起设置数据和页数 *******/
  const resetTableInfo = (data: any) => {
    setTableData(data.content);
    setPageInfo({
      pageNo: data.pageNo,
      pageSize: data.pageSize,
    });
    setTotalElements(data.totalElements);
  };
  /**
   * description: 根据不同的参数请求表格数据(首次加载、搜索、换页、调整每页显示的条数)
   * params: 发送请求所需要的参数
   */
  //给个默认参数，初始化和刷新时方便一些
  const defaultParams: TDataSourceParams = {
    status: status,
    name: null,
    ...pageInfo,
    map: tableMap,
  };
  // 获取列表数据
  const getTableData = async (differentParams: TDataSourceParams = defaultParams) => {
    setTableLoading(true);
    try {
      const data = await http({
        url: "/visual/module-manage/queryModuleList",
        method: "post",
        body: differentParams
      });
      data && await resetTableInfo(data);
    } catch (error) {
      console.log(error);
    }finally{
      setTableLoading(false);
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // 请求完成，冲着表格的数据和页码信息
  };
  // 获取表格数据
  useEffect(() => {
    getTableData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // 保证每次拿到最新的status值
  useEffect(() => {
    setStatus(status);
  }, [status]);

  // 下拉框选择
  const selectChange = (value: any) => {
    setStatus(value);
  };
  // 按类型搜索
  const searchByType = async (e: any) => {
    const finalParams: TDataSourceParams = {
      status: status, 
      name: e === "" ? null : e,
      pageNo: 1,
      pageSize: pageInfo.pageSize,
      map: tableMap
    };
    getTableData(finalParams);
  };

  // 导入
  const handldImport = () => {
    setIsShowImportModal(true);
  };
  // 关闭数据源弹窗
  const changeShowState = (modalType: string) => {
    modalType === "add" 
    ? setIsShowImportModal(false)
    : ""; // 无编辑
  };
  // 刷新表格数据
  const refreshTable = () => {
    getTableData();
  };

  /**********  删除、编辑 操作 *************/
  // const handleDelete = async (moduleId: string,appName: Array<string>) => {
  const handleDelete = async (moduleId: string) => {
    // 点击删除 先调查询接口
    const appName = await http({
      url: `/visual/module-manage/usedModuleAppList/${moduleId}`, 
      method: "get"
    });
    if (appName.length > 0) {
      Modal.confirm({
        title: "删除组件",
        cancelButtonProps: {
          style: {
            display: "none"
          }
        },
        icon: <ExclamationCircleFilled />,
        content: `当前组件被 ${appName.join("、")} 应用使用，不能进行删除操作。`,
        okText: "确定",
        // cancelText: '取消',
        bodyStyle: {
          background: "#232630",
        },
      });
    
    } else {
      Modal.confirm({
        title: "删除组件",
        okButtonProps: {
          style: {
            backgroundColor: "#e9535d",
            border: "none",
          }
        },
        cancelButtonProps: {
          style: {
            backgroundColor: "#3d404d"
          }
        },
        icon: <ExclamationCircleFilled />,
        content: "删除后不可恢复，确认删除此组件吗?",
        okText: "确定",
        cancelText: "取消",
        bodyStyle: {
          background: "#232630",
        },
        async onOk(close) {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const data = await http({
            url: `/visual/module-manage/deleteModule/${moduleId}`, 
            method: "delete"
          });
          if (data) {
            close();
            refreshTable();
          } else {
            message.error({ content: "删除失败", duration: 2 });
          }
        },
        onCancel(close) {
          close();
        }
      });
    }
  };
  const handldExport = (text: any) => {
    const a = document.createElement("a");
    a.href = text.downloadUrl;
    a.download = text.name;
    a.click();
  };
  const handleExportList = (text: any) => {
    console.log("批量导出 暂无");
    
  };
  const handleOn = (record: any) => {
    console.log(record,"上架");
  };
  const handleOff = (record: any) => {
    console.log(record,"下架");
  };

  // 表格排序
  const tableOnChange = (pagination: any, filters: any, sorter: any, { action }: any) => {
    if (action === "sort") {
      const { field, order } = sorter;
      // sorter: true-asc, false-desc, 不排序-undefined
      if (order === undefined) return;
      let sortKey:any;
      if (field === "moduleVersion") {
        sortKey = "module_version";
      } else if(field === "updatedAt"){
        sortKey = "created_time";
      } else {
        sortKey = null;
      }
      // 更新 tableMap, 在别处发请求时会带上当前排序条件
      setTableMap({
        [sortKey]: order === "ascend"
      });
      // 发送请求
      const finalParams: TDataSourceParams = {
        status: status,
        name: inputValue === "" ? null : inputValue,
        ...pageInfo,
        map: tableMap,
      };
      getTableData(finalParams);
    }
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
      const finalParams: TDataSourceParams = {
        status: status,
        name: inputValue === "" ? null : inputValue,
        pageNo: page,
        pageSize,
        map: tableMap
      };
      getTableData(finalParams);
    },
  };
  // Table columns
  const columns = [
    {
      title: "组件名称",
      dataIndex: "name",
      key: "name",
      width: 250,
      className: "customHeaderColor",
      ellipsis: true,
      render: (text: any) => <span>{text}</span>,
    },
    {
      title: "组件版本",
      key: "moduleVersion",
      sorter: true,
      ellipsis: true,
      dataIndex: "moduleVersion",
    },
    // {
    //   title: '状态',
    //   dataIndex: 'status',
    //   key: 'status',
    //   ellipsis: true,
    //   render: (text:any) => {
    //     return (
    //       <>
    //       <span className='statusCircle' style={{backgroundColor: text===0?'#a1ea2b':'#c0c0c0'}}></span>
    //         {text === 0?'已上架':'未上架'}
    //       </>
    //     )
    //   }
    // },
    {
      title: "开发者",
      dataIndex: "updatedBy",
      key: "updatedBy",
      ellipsis: true,
    },
    {
      title: "导入时间",
      key: "updatedAt",
      sorter: true,
      width: 300,
      ellipsis: true,
      showSorterTooltip: false,
      dataIndex: "updatedAt",
      render: (time: any, data: any) => {
        return (
          <>
            {time}
          </>
        );
      },
    },
    {
      title: "操作",
      key: "action",
      ellipsis: true,
      width: 200,
      render: (text: any, record: any) => {
        return (
          <Space size="middle" >
            {/* {
              record.status===0 
              ? <Button type='text' className='buttonBlue' onClickCapture={() => handleOff(record)}>下架</Button>
              : <Button type='text' className='buttonBlue' onClickCapture={() => handleOn(record)}>上架</Button>
            } */}
            <Button type='text' className='buttonBlue' onClickCapture={() => handldExport(text)}>导出</Button>
            <Button type='text'  
                    className='buttonBlue'  
                    // onClickCapture={() => handleDelete(record.id,record.appName)}
                    onClickCapture={() => handleDelete(record.id)}
                    >删除</Button>      
            {/* <Button type='text' disabled={ record.appName?.length>0 } 
                className={ record.appName?.length>0 ? 'buttonGray' : 'buttonBlue' }  
                onClickCapture={() => handleDelete(record.id)}
                >删除</Button> */}
          </Space>
        );
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
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <ConfigProvider locale={zhCN}>
      <div className='ComponentDev-wrap'>
        <div className='title'>组件开发</div>
        <header className='header' style={{ background: "#171a24" }}>
          <div className='left-box'>
            <Button type="primary" className='mr-16' onClickCapture={handldImport}>导入组件</Button>
            {/* <Button type="primary" className='mr-16' onClickCapture={()=>handleExportList(selectedRowKeys)} disabled={!hasSelected}>导出</Button> */}
            {/* <Button type="primary" className='mr-16' onClickCapture={()=>handleOff(selectedRowKeys)} disabled={!hasSelected}>下架</Button>             */}
            {/* <span className='mr-16'>{hasSelected ? `已选 ${selectedRowKeys.length} 项` : ""}</span> */}
          </div>
          <div className='search'>
            {/* <Select style={{ minWidth: '140px' }} dropdownStyle={{ backgroundColor: '#232630' }} defaultValue="全部" onChange={selectChange}>
              {
                selectOptions.map((item: any) => {
                  return (
                    <Option key={item.key} value={item.key}>{item.name}</Option>
                  )
                })
              }
            </Select> */}
            <Input.Search placeholder="搜索"
              allowClear
              maxLength={40}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onSearch={searchByType}
            />
          </div>
        </header>
        <div className='table-wrap'>
          <Table
            scroll={{ y: "70vh" }}
            sortDirections={["ascend", "descend"]}
            rowClassName='customRowClass'
            loading={tableLoading}
            // rowSelection={rowSelection}
            columns={columns}
            dataSource={tableData}
            pagination={paginationProps}
            onChange={tableOnChange}
            rowKey={record=>record.id}
          />
        </div>
        {/* 导入组件的弹窗 */}
        <ImportComponent
          visible={isShowImportModal}
          changeShowState={changeShowState}
          refreshTable={refreshTable}
        />
      </div>
    </ConfigProvider>
  );
};


// SelectOptions
const selectOptions = [
  {
    name: "全部",
    key: "",
  },
  {
    name: "已上架",
    key: 0,
  },
  {
    name: "未上架",
    key: 1,
  },
];
export default memo(ComponentDev);
