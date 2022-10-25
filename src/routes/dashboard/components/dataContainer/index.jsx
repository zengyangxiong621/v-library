/* eslint-disable react/prop-types */
import React, { memo, useState, useEffect, useRef } from "react";
import { connect } from "dva";
import "./index.less";
import { Form, Drawer, Select, Button, Input, Modal, message, Spin, ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import { CloseOutlined, LeftOutlined, AudioOutlined, SearchOutlined } from "@ant-design/icons";
import DataContainerItem from "./components/dataContainerItem";
import UpdateContainerDrawer from "./components/updateContainerDrawer";
import ManageContainerDrawer from "./components/manageContainerDrawer";
import ModalConfirm from "../../../../components/modalConfirm";
import { http } from "../../../../services/request";

const { Search } = Input;

import useLoading from "@/components/useLoading";

const DataContainer = ({ bar, dispatch, ...props }) => {
  const drawerRef = useRef(null);
  const [itemVisible, setItemVisible] = useState(false);
  const [manageVisible, setManageVisible] = useState(false);
  const [itemData, setItemData] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [filterDataList, setFilterDataList] = useState(bar.dataContainerList);
  useEffect(() => {
    setFilterDataList(bar.dataContainerList);
  }, [bar.dataContainerList.length, bar.dataContainerList]);
  const showDrawer = () => {
    props.onChange(true);
  };

  const onClose = () => {
    setInputValue("");
    handleSearch("");
    props.onChange(false);
  };
  const handleSearchValueChange = (e) => {
    // todo
  };
  const handleSearch = (value) => {
    setFilterDataList(
      bar.dataContainerList.filter((item) => {
        return item.name.indexOf(value) !== -1;
      })
    );
  };
  const handleContainerClick = (containerData) => {
    // Modal.success()
    setItemVisible(true);
    setItemData(containerData);
  };
  const handleContainerDelete = async (id, components) => {
    const data = await http({
      method: "delete",
      url: `/visual/container/delete/${id}`,
      body: {
        dashboardId: bar.dashboardId,
      },
    });

    if (data) {
      message.success("操作成功");
      dispatch({
        type: "bar/deleteDataContainer",
        payload: {
          containerId: id,
          componentIds: components.map((item) => item.id),
        },
      });
    }
  };
  const handleContainerCopy = async (id) => {
    const containerData = await http({
      method: "put",
      url: `/visual/container/copy/${id}`,
    });
    if (containerData) {
      message.success("操作成功");
      let data = null;
      if (containerData.dataType === "static") {
        data = containerData.staticData.data;
      } else {
        data = await http({
          method: "post",
          url: "/visual/container/data/get",
          body: {
            id: containerData.id,
            callBackParamValues: bar.callbackArgs,
          },
        });
      }
      dispatch({
        type: "bar/updateDataContainer",
        payload: {
          containerData,
          data,
        },
      });
    }
  };
  const handleContainerChange = async (data, cb) => {
    const { name } = data;
    if (!name) {
      message.error("容器名称不能为空");
      cb();
      return;
    }
    let temp = bar.dataContainerList.find((item) => item.name === name);
    if (temp) {
      // 命名重复
      message.error("容器名称重复");
    } else {
      const containerData = await http({
        method: "post",
        url: "/visual/container/source",
        body: data,
      });
      if (containerData) {
        message.success("操作成功");
        dispatch({
          type: "bar/updateDataContainer",
          payload: {
            containerData,
          },
        });
      }
    }
  };
  const handleUpdateDrawerClose = (value) => {
    setItemVisible(value);
  };
  return (
    <ConfigProvider locale={zhCN} autoInsertSpaceInButton={false}>
      <div className="data-container-wrap">
        <Drawer
          title={
            <div className="g-relative g-text-base g-px-2 g-flex g-justify-between g-items-center">
              <span />
              数据容器
              <CloseOutlined onClick={onClose} className="g-cursor-pointer" />
            </div>
          }
          placement="right"
          closable={false}
          onClose={onClose}
          visible={props.visible}
          ref={drawerRef}
          className="data-container-drawer"
          getContainer={false}
          style={{ position: "absolute" }}
          width={333}
          // maskStyle={ { opacity: 0, animation: null } }
          maskStyle={{ animation: "unset" }}
        >
          <div className="data-container-body-wrapper">
            <div className="data-container-handle">
              <Input
                placeholder="请输入"
                maxLength={30}
                suffix={
                  <SearchOutlined
                    className="input-search-icon"
                    onClick={() => handleSearch(inputValue)}
                  />
                }
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                allowClear
                onSearch={(e) => handleSearch(e.target.value)}
                onPressEnter={(e) => handleSearch(e.target.value)}
              />
              <Button className="g-mx-2" onClick={() => handleContainerClick({})}>
                +新增
              </Button>
              <Button onClick={() => setManageVisible(true)}>
                <span>管理</span>
              </Button>
            </div>
            {filterDataList.map((container) => (
              <DataContainerItem
                onChoose={handleContainerClick}
                onDelete={handleContainerDelete}
                onCopy={handleContainerCopy}
                onChange={handleContainerChange}
                key={container.id}
                data={container}
              />
            ))}
          </div>
        </Drawer>
        <ManageContainerDrawer
          data={bar.dataContainerList}
          visible={manageVisible}
          onVisibleChange={(value) => setManageVisible(value)}
          onChoose={(data) => handleContainerClick(data)}
        />
        <UpdateContainerDrawer
          dashboardId={bar.dashboardId}
          data={itemData}
          visible={itemVisible}
          onVisibleChange={handleUpdateDrawerClose}
        />
      </div>
    </ConfigProvider>
  );
};

export default connect(({ bar }) => ({
  bar,
}))(DataContainer);
