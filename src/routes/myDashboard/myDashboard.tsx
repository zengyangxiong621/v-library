import React, { memo, useEffect, useState } from "react";
import "./index.less";
import { BASEURL } from "@/services/request";
import { connect } from "dva";

import { Input, Select, Upload, message, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";

import LeftTree from "./components/LeftTree";
import RightContent from "./components/rightContent";

const { Option } = Select;
// 功能
const MyApplication = ({ dashboardManage, dispatch, history }: any) => {
  // 空间id
  const curWorkspace: any = localStorage.getItem("curWorkspace");
  const spaceId = JSON.parse(curWorkspace)?.id;
  // TODO 后端目前默认是倒排，后续可能需要更改
  // UI图上默认是按照修改时间排
  const [sortMap, setSortMap] = useState<any>({
    updated_time: false,
  });
  const [inputValue, setInputValue] = useState("");
  // const [uploadFileUrl, setUploadFileUrl] = useState("");
  // 获取模板列表数据的方法
  const getDataDispatch = (finalBody: any) => {
    dispatch({
      type: "dashboardManage/getTemplateList",
      payload: finalBody,
    });
  };

  // 页面初始化- 请求模板列表数据
  useEffect(() => {
    // 第一次进入”我的可视化页面时“ curSelectedGroup是[],给他设置为['-1']
    let curSelectedGroup: string[] = dashboardManage.curSelectedGroup;
    if (!curSelectedGroup.length) curSelectedGroup = ["-1"];
    dispatch({
      type: "dashboardManage/resetModel",
      payload: {
        curSelectedGroup,
        curSelectedGroupName: "全部应用",
      },
    });
    const groupId =
      dashboardManage.curSelectedGroup[0] === "-1" ? null : dashboardManage.curSelectedGroup[0];
    const finalBody = {
      pageNo: 1,
      pageSize: 1000,
      spaceId: spaceId,
      map: sortMap,
      groupId,
    };
    getDataDispatch(finalBody);
  }, [spaceId]);

  // 新建应用
  const addDashboard = () => {
    history.push("/template");
  };

  // 搜索框的值改变
  const changeSearchValue = (e: any) => {
    setInputValue(e.target.value);
  };
  // 当切换任意分组时，都需要清除输入框里的值
  const clearSearchInputState = () => {
    setInputValue("");
  };
  // 搜索应用
  const search = (value: string) => {
    const groupId =
      dashboardManage.curSelectedGroup[0] === "-1" ? null : dashboardManage.curSelectedGroup[0];
    const finalBody = {
      pageNo: 1,
      pageSize: 1000,
      spaceId,
      name: value,
      map: sortMap,
      groupId,
    };
    getDataDispatch(finalBody);
  };
  // 选择排序的标准
  const selectSortType = (value: any) => {
    const newSortMap = {
      [value]: false,
    };
    setSortMap(newSortMap);
    // 选择新标准后，需要发送一次请求
    // 全部应用分组的groupId('-1')是前端自己构造出来的, 选中全部应用分组时后端要求传 null
    const curGroupId = dashboardManage.curSelectedGroup[0];
    const groupId = curGroupId === "-1" ? null : curGroupId;
    const finalBody = {
      pageNo: 1,
      pageSize: 1000,
      spaceId,
      map: newSortMap,
      groupId,
    };
    dispatch({
      type: "dashboardManage/getTemplateList",
      payload: finalBody,
    });
  };
  /**
   * description:  刷新左侧分组列表和右侧应用列表
   */
  const refreshList = () => {
    const transformId =
      dashboardManage.curSelectedGroup[0] === "-1" ? null : dashboardManage.curSelectedGroup[0];
    const finalBody = {
      pageNo: 1,
      pageSize: 1000,
      spaceId,
      groupId: transformId,
    };
    dispatch({
      type: "dashboardManage/getTemplateList",
      payload: finalBody,
    });
    dispatch({
      type: "dashboardManage/getGroupTree",
      payload: {
        spaceId,
      },
    });
  };
  // 导入应用
  const importAppUploadprops: UploadProps = {
    name: "file",
    multiple: false,
    maxCount: 1,
    accept: "application/zip",
    action: `${BASEURL}/visual/application/import/${spaceId}`,
    headers: {
      "Response-Type": "application/json",
      authorization: localStorage.getItem("token") || "",
    },
    // data: {
    // },
    beforeUpload(file: any) {
      const { name }: { name: string } = file;
      // 考虑 cdb.la...yer.json 这个文件名
      const lastPointIndex = name.lastIndexOf(".");
      const nameSuffix = name.slice(lastPointIndex);
      if (![".zip"].includes(nameSuffix)) {
        message.error({
          content: "请上传符合格式的文件",
          duration: 2,
        });
        file.status = "error";
        return false;
      }
    },
    async onChange(info: any) {
      const { status, response } = info.file;
      // - 开始导入应用
      // - 刷新列表(必须保证后端数据更新)
      if (status === "done") {
        message[response.data === null ? "error" : "success"](response.message);
        refreshList();
        // setUploadFileUrl(response.data)
      } else if (status === "error") {
        message.error("应用上传失败");
      }
    },
  };
  return (
    <div className="MyApplication-wrap" id="myApplicationPage">
      <div className="left">
        <Spin spinning={dashboardManage.groupTreeLoading}>
          {/* 左侧树 */}
          <LeftTree clearSearchInputState={clearSearchInputState} spaceId={spaceId} />
        </Spin>
      </div>
      <div className="right">
        <div className="right-header">
          <div className="set-flex">
            <p className="title">{dashboardManage.curSelectedGroupName || "全部应用"}</p>
            <Upload {...importAppUploadprops} showUploadList={false}>
              <div className="custom-btn set-mr">
                <span>导入应用</span>
              </div>
            </Upload>
          </div>
          <div className="add-search">
            <div className="custom-btn" onClick={addDashboard}>
              <PlusOutlined style={{ fontSize: "12px", marginRight: "2px" }} />
              <span>新建应用</span>
            </div>
            <div className="search-wrap">
              <Input.Search
                value={inputValue}
                onChange={changeSearchValue}
                placeholder="搜索"
                className="search"
                allowClear
                maxLength={40}
                onSearch={search}
              ></Input.Search>
              <Select className="db-select" defaultValue="按修改时间排序" onChange={selectSortType}>
                <Option value="updated_time">按修改时间排序</Option>
                <Option value="created_time">按新建时间排序</Option>
              </Select>
            </div>
          </div>
        </div>
        {/* 右侧 */}
        <Spin spinning={dashboardManage.appListLoading}>
          <RightContent spaceId={spaceId} listData={dashboardManage.templateList} />
        </Spin>
      </div>
    </div>
  );
};

export default memo(connect(({ dashboardManage }: any) => ({ dashboardManage }))(MyApplication));
