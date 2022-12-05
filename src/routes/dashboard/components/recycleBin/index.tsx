// 下方注释 no-unused-vars 规则的代码 不能删除
/* eslint-disable @typescript-eslint/no-unused-vars */

import { memo, useEffect, useState } from "react";
import "./index.less";

import { connect } from "dva";
import { http } from "@/services/request";

import { Drawer, Button, Card, Checkbox, Empty, Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";

import ListItem from "./components/listItem";
import { Spin } from "antd";
// import { deepClone } from "@/utils/index";

const RecycleBin = (props: any) => {
  const { bar, onChange, visible, dispatch } = props;

  const [recycleLists, setRecycleLists] = useState<any>([]);
  const [selectedLists, setSelectedLists] = useState<any>([]);
  const [updateBtnLoading] = useState<boolean>(false);
  const [recycleBinLoading, setRecycleBinLoading] = useState<boolean>(false);

  // 后端返回的回收站组件列表如果想要展示需要 处理一下
  const getTargetData = (data: any) => {
    return data.map((x: any) => {
      const { createdTime, dashboardId, detail, id, effectiveTime } = x;
      return {
        detail,
        createdTime,
        effectiveTime,
        dashboardId,
        id,
      };
    });
  };

  // 获取可回收的组件列表
  const getRecycleModuleLists = async () => {
    try {
      setRecycleBinLoading(true);
      const data = await http({
        url: `/visual/layer/recycle/list/${bar.dashboardId}`,
        method: "get",
      });
      setRecycleBinLoading(false);
      const formatArr = getTargetData(data);
      setRecycleLists(formatArr);
      // setRecycleLists([])
    } catch (error) {
      setRecycleBinLoading(false);
    }
  };
  useEffect(() => {
    if (visible) {
      getRecycleModuleLists();
    }
  }, [visible]);

  // 在下方 deleteModule函数 中调用
  const deleteModuleLogic = async () => {
    const idArrs = selectedLists.map((x: any) => {
      return x.id;
    });
    try {
      setRecycleBinLoading(true);
      const data = await http({
        url: "/visual/layer/recycle/delete",
        method: "DELETE",
        body: {
          dashboardId: bar.dashboardId,
          recycleItems: idArrs,
        },
      });
      setRecycleBinLoading(false);
      const { recycleItems } = data;
      const hadFormatArr = getTargetData(recycleItems);
      setRecycleLists(hadFormatArr);
      setSelectedLists([]);
    } catch (error) {
      setRecycleBinLoading(false);
    }
  };
  // 删除回收站中的组件
  const deleteModule = () => {
    // 二次删除确认
    Modal.confirm({
      title: "删除组件",
      style: {
        top: "40%",
      },
      getContainer: document.getElementById("root") as any,
      okButtonProps: {
        style: {
          backgroundColor: "#e9535d",
          border: "none",
        },
      },
      cancelButtonProps: {
        style: {
          backgroundColor: "#3d404d",
        },
      },
      icon: <ExclamationCircleFilled />,
      content: "此操作将彻底删除所选组件，不可恢复，是否继续？",
      okText: "确定",
      cancelText: "取消",
      bodyStyle: {
        background: "#232630",
      },
      async onOk() {
        deleteModuleLogic();
      },
      onCancel(close) {
        close();
      },
    });
  };
  //***** 恢复回收站中的组件
  const recoverModule = async () => {
    try {
      const idArrs = selectedLists.map((x: any) => {
        return x.id;
      });
      setRecycleBinLoading(true);
      const { layers, components, recycleItems, panels } = await http({
        url: "/visual/layer/recover",
        method: "post",
        body: {
          dashboardId: bar.dashboardId,
          recycleItems: idArrs,
        },
      });
      setRecycleBinLoading(false);
      const hadFormatArr = getTargetData(recycleItems);
      setRecycleLists(hadFormatArr);
      setSelectedLists([]);

      if (panels.length) {
        await dispatch({
          type: "bar/getFullAmountDashboardDetails",
          payload: {
            layers,
          },
        });
      }

      // 刷新组件中的画布
      dispatch({
        type: "bar/getDashboardDetails",
        payload: bar.dashboardId,
      });
      dispatch({
        type: "bar/updateComponents",
        payload: {
          layers,
          components,
          selected: [],
        },
      });
      //@Mark 需要最后更新layers,否则恢复组件的时候会白屏
      dispatch({
        type: "bar/updateTree",
        payload: layers,
      });

      // dispatch({
      //   type: "bar/save",
      //   payload: {},
      // });
    } catch (error) {
      console.log("恢复回收组件出错", error);
      setRecycleBinLoading(false);
    }
  };

  // 选择 逻辑
  const onCheckAllChange = (e: any) => {
    const isCheckAll = e.target.checked;
    if (isCheckAll) {
      // 将所有的项 都选中
      const checkedToTrue = recycleLists.map((item: any) => {
        return { ...item, checked: true };
      });
      setRecycleLists(checkedToTrue);
      const noCheckedArr = recycleLists.map((item: any) => {
        const { checked, ...other } = item;
        return other;
      });
      setSelectedLists(noCheckedArr);
    } else {
      // 将所有的项 都取消选中
      const checkedToTrue = recycleLists.map((item: any) => {
        return { ...item, checked: false };
      });
      setRecycleLists(checkedToTrue);
      setSelectedLists([]);
    }
  };
  const clickSingleCheckbox = (itemObj: any) => {
    const isCheck = itemObj.checked;
    // setIndeterminate()
    if (isCheck) {
      // 往已选中组件 数组中添加该项 (添加时，去掉前端加上的check属性)
      const { checked, ...noCheckObj } = itemObj;
      setSelectedLists([...selectedLists, noCheckObj]);
    } else {
      // 从已选中组件 数组中移除该项
      const { id } = itemObj;
      const newArr = selectedLists.filter((x: any) => x.id !== id);
      setSelectedLists(newArr);
    }
  };
  const onclose = () => {
    onChange(false);
    // 关闭 抽屉时，需要将已选择的数组清空
    setSelectedLists([]);
    // 关闭 抽屉，也需要清除掉可选组件列表，不然上一次关闭时复选框选中的状态会闪现出来
    setRecycleLists([]);
  };

  return (
    <div className="recycle-bin-wrap">
      <Drawer
        width={620}
        title={
          <div className="g-relative g-text-base g-px-2 g-flex g-justify-between g-items-center">
            组件回收站
          </div>
        }
        placement="right"
        closable={false}
        visible={visible}
        className="data-container-drawer"
        getContainer={false}
        onClose={() => onclose()}
        style={{ position: "absolute" }}
        maskStyle={{ animation: "unset" }}
      >
        <Spin tip="Loading..." spinning={recycleBinLoading}>
          <div className="card-wrap">
            <Card
              title={
                <div className="g-flex g-justify-between">
                  <Checkbox
                    indeterminate={
                      selectedLists.length && selectedLists.length !== recycleLists.length
                    }
                    onChange={onCheckAllChange}
                    checked={
                      selectedLists.length &&
                      recycleLists.length &&
                      selectedLists.length === recycleLists.length
                    }
                  >
                    全选 ({selectedLists.length}/{recycleLists.length})
                  </Checkbox>
                  <div>
                    <Button
                      style={{ marginRight: 10 }}
                      type="primary"
                      ghost
                      size="small"
                      // loading={updateBtnLoading}
                      disabled={selectedLists.length === 0}
                      onClick={() => deleteModule()}
                    >
                      删除
                    </Button>
                    <Button
                      type="primary"
                      size="small"
                      loading={updateBtnLoading}
                      disabled={selectedLists.length === 0}
                      onClick={() => recoverModule()}
                    >
                      恢复
                    </Button>
                  </div>
                </div>
              }
              size="small"
              headStyle={{ background: "#333641" }}
              bodyStyle={{
                background: "#171b24",
                minHeight: "165px",
                padding: 0,
              }}
            >
              <div className="card-body">
                {recycleLists.length ? (
                  recycleLists.map((item: any, index: number) => {
                    return (
                      <ListItem
                        key={index}
                        itemData={item}
                        clickCheckbox={clickSingleCheckbox}
                      ></ListItem>
                    );
                  })
                ) : (
                  <>
                    <Empty description="暂无组件" imageStyle={{ marginTop: "15px" }}></Empty>
                  </>
                )}
              </div>
            </Card>
          </div>
        </Spin>
      </Drawer>
    </div>
  );
};

export default memo(connect(({ bar }: any) => ({ bar }))(RecycleBin));
