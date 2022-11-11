import React, { useState, useEffect } from "react";
import "./index.less";

import { http } from "@/services/request";

import "moment/locale/zh-cn";
import moment from "moment";
import type { Moment } from "moment";

import zhCN from "antd/es/locale/zh_CN";
import { ConfigProvider, DatePicker, Select, Button, Input, message, Badge, Tooltip, Popconfirm, Table } from "antd";
import type { TimeRangePickerProps } from "antd";
import type { TableProps } from "antd/es/table";
import { FileDoneOutlined } from "@ant-design/icons";
const { RangePicker } = DatePicker;
const { Option } = Select;
const { Search } = Input;
const { Column } = Table;


type RangeValue = [Moment | null, Moment | null] | null;


const AlarmLog: React.FC = () => {
  const [momentDates, setMomentDates] = useState<RangeValue>([moment().add(-1, "M"), moment()]); //当前Moment时间
  const [startDate, setStartDate] = useState(moment().add(-1, "M").format("YYYY-MM-DD") + " 00:00:00"); //开始日期
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD") + " 23:59:59"); //结束日期
  const [stateRead, setStateRead] = useState<string | number>(""); //当前状态
  const [pageNo, setPageNo] = useState(1); //当前页码
  const [pageSize, setPageSize] = useState(10); //当前每页数量
  const [keywords, setKeywords] = useState(""); //当前关键词
  const [map, setMap] = useState({ updated_time: false }); //时间字段排序
  const [unreadNum, setUnreadNum] = useState(0); //未读数量
  const [hackValue, setHackValue] = useState<RangeValue>(null); //选择为空的标志
  const [loading, setLoading] = useState(false); //选择为空的标志
  const [dataSource, setDataSource] = useState<any>({}); //请求的数据
  const [visible, setVisible] = useState(false); //处置方案内容的抽屉



  // 转换stateRead
  const stateReadTransform = (state: string | number) => {
    return state === "" ? "" : Boolean(state);
  };
  // 初始化和改变时间
  useEffect(() => {
    requestData();
  }, []);
  // 请求列表
  const requestData = async (obj: object = {}) => {
    const read = stateReadTransform(stateRead);
    const allParams = { startDate, endDate, pageNo, pageSize, keywords, read, map };
    // console.log({...allParams,...obj});
    requestUnreadNum(); //请求未读数量
    setLoading(true);
    try {
      const data = await http({
        url: "/visual/alarmInfo/list",
        method: "post",
        body: { ...allParams, ...obj }
      });
      setDataSource(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  // 改变时间
  const handerChangeTiem: TimeRangePickerProps["onChange"] = (val, dateStrings) => {
    const startDate = dateStrings[0] && dateStrings[0] + " 00:00:00";
    const endDate = dateStrings[1] && dateStrings[1] + " 23:59:59";
    setStartDate(startDate);
    setEndDate(endDate);
    setMomentDates(val);
    requestData({ startDate, endDate });
  };
  // 弹出日历和关闭日历的回调
  const handerOpenChange = (open: boolean) => {
    if (open) {
      setHackValue([null, null]);
    } else {
      setHackValue(null);
    }
  };
  // 改变状态
  const handleChangeState = (value: string | number) => {
    setStateRead(value);
    const read = stateReadTransform(value);
    requestData({ read });
  };
  // 重置
  const handleReset = () => {
    const startDate = moment().add(-1, "M").format("YYYY-MM-DD") + " 00:00:00";
    const endDate = moment().format("YYYY-MM-DD") + " 23:59:59";
    const read = "";
    setStartDate(startDate);
    setEndDate(endDate);
    setMomentDates([moment().add(-1, "M"), moment()]);
    setStateRead("");
    requestData({ startDate, endDate, read });
  };
  // 搜索回调
  const handleSearch = (value: string) => {
    setKeywords(value);
    requestData({ keywords: value });
  };
  // 全部告警更新已读状态请求
  const requesAllRead = async () => {
    try {
      await http({
        url: "/visual/alarmInfo/all/read",
        method: "post",
      });
      message.success("全部标记为已读成功！");
      requestData();
    } catch (error) {
      console.log(error);
    }
  };
  // 未读数量请求请求
  const requestUnreadNum = async () => {
    try {
      const data = await http({
        url: "/visual/alarmInfo/unreadNum",
        method: "post",
      });
      setUnreadNum(data);
    } catch (error) {
      console.log(error);
    }
  };
  // 更新已读状态请求
  const requestUpdateRead = async (id: string) => {
    try {
      const data = await http({
        url: `/visual/alarmInfo/${id}/read`,
        method: "post",
      });
      message.success("标记为已读成功！");
      requestData();
    } catch (error) {
      console.log(error);
    }
  };
  // 改变表格排序
  const tableOnChange: TableProps<DataType>["onChange"] = (pagination: any, filters: any, sorter: any, { action }: any) => {
    if (action === "sort") {
      const { order } = sorter;
      if (order) {
        setMap({ updated_time: order === "ascend" });
        requestData({ map: { updated_time: order === "ascend" } });
      }
    }
  };
  // 表格分页配置
  const paginationProps = {
    total: dataSource.totalElements,
    current: pageNo,
    pageSize: pageSize,
    pageSizeOptions: [10, 20, 30],
    showTotal: (val: number | string) => `共${val}条`,
    defaultCurrent: 1,
    showQuickJumper: true,
    showSizeChanger: true,
    // locale: {},
    onChange(page: number, pageSize: number) {
      setPageNo(page);
      setPageSize(pageSize);
      const finalParams: any = {
        pageNo: page,
        pageSize,
      };
      requestData(finalParams);
    },
  };
  // 一键已读确认回调
  const confirmAllRead = () => {
    requesAllRead();
    // console.log("yes");
  };
  // 点击处置方案
  const showDrawer = () => {
    setVisible(true);
  };


  interface DataType {
    object: string;
    detail: string;
    disposalSchemeName: number;
    updatedTime: string;
    read: boolean;
    operate: string;
    id: string
  }

  return (
    <ConfigProvider locale={zhCN}>
      <div className='alarmLog-warp'>
        <div className='title'>告警管理</div>
        <div className='condition'>
          <div className='time-range'>
            <span>时间范围</span>
            <RangePicker
              value={hackValue || momentDates}
              onChange={handerChangeTiem}
              onOpenChange={handerOpenChange}
            />
          </div>
          <div className='state'>
            <span>状态</span>
            <Select value={stateRead} defaultValue="" style={{ width: 170 }} onChange={handleChangeState}>
              <Option value="">全部</Option>
              <Option value={0}>未读</Option>
              <Option value={1}>已读</Option>
            </Select>
          </div>
          <div>
            <Button onClick={handleReset} type="primary">重置</Button>
          </div>
        </div>
        <div className='search-read'>
          <div className='search'>
            <Search
              placeholder="请输入异常对象搜索"
              allowClear
              onSearch={handleSearch}
              style={{ width: 300 }}
            />
          </div>
          <div className='read'>
            <Popconfirm
              placement="topRight"
              title="你确定要全部标记为已读吗？"
              onConfirm={confirmAllRead}
              okText="确定"
              cancelText="取消"
            >
              <Tooltip title="一键已读">
                <Badge count={unreadNum}>
                  <FileDoneOutlined style={{ fontSize: "30px", color: "#177ddc" }} />
                </Badge>
              </Tooltip>
            </Popconfirm>
          </div>
        </div>
        <div className='table-list table-wrap'>
          <Table
            scroll={{ y: "calc(100vh - 350px)" }}
            rowClassName='customRowClass'
            dataSource={dataSource?.content || []}
            loading={loading}
            rowKey={(record: any) => record.id}
            onChange={tableOnChange}
            pagination={paginationProps}
            showSorterTooltip={false}
          >
            <Column title="异常对象" dataIndex="object" key="object" ellipsis={true} width="150px" />
            <Column title="异常详情" dataIndex="detail" key="detail" ellipsis={true} width="500px" />
            <Column title="更新时间" dataIndex="updatedTime" key="updatedTime" ellipsis={true} width="200px"
              sorter={true}
            />
            <Column title="状态" dataIndex="read" key="read" ellipsis={true} width="100px"
              render={(_: any, { read }: any) =>
              (
                read
                  ?
                  <>
                    <span className='read'></span>
                    <span>已读</span>
                  </>
                  :
                  <>
                    <span className='unread'></span>
                    <span>未读</span>
                  </>)}
            />
            <Column title="操作" dataIndex="id" key="id" ellipsis={true} width="150px"
              render={(_: any, { id, read }: any) => (
                <Button
                  type="link"
                  className='buttonBlue'
                  disabled={read}
                  onClick={() => requestUpdateRead(id)}
                >
                  标记已读
                </Button>
              )}
            />
          </Table>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default AlarmLog;
