/* eslint-disable no-case-declarations */
import React, { memo, useEffect, useRef, useState } from "react";
import "./rightClickMenu.less";

import {
  getFieldStates,
} from "../../../../../utils/sideBar";
import { IconFont } from "../../../../../utils/useIcon";
import SecondMenu from "./secondMenu";
import { http } from "@/services/request";
import { filterEmptyGroups } from "@/models/utils/filterEmptyGroups";

import { connect } from "dva";
import { Button, message, Form, Select, Modal } from "antd";
import * as Icons from "@ant-design/icons";
import { cloneDeep } from "lodash";
import { setComponentCopyConfig, getComponentCopyConfig } from "@/utils/syncJitStorage";

const RightClickMenu = ({ dispatch, bar, operate, menuOptions, hideMenu }) => {
  const { Option } = Select;

  const [isLock, setIsLock] = useState(false);
  const [isSingleShow, setIsSingleShow] = useState(false);
  const [isShowOrHidden, setIsShowOrHidden] = useState(true);
  const [showCorssCopyModal, setShowCorssCopyModal] = useState(false);
  const [copyDashboardId, setCopyDashboardId] = useState(null);
  const [dashboardList, setDashboardList] = useState([]);
  // 每次渲染右侧菜单，都需要确定此次是锁定还是解锁
  useEffect(() => {
    // 判断所选中的各个节点是否是lock状态
    const lockInfo = getFieldStates(bar.layers, bar.key, "isLock");
    const finalLockState = lockInfo.some(item => item === false);
    setIsLock(!finalLockState);

    // 判断所选中的各个节点是否是单独显示状态
    const singleShowLayerInfo = getFieldStates(bar.layers, bar.key, "singleShowLayer");
    const singleShowLayerState = singleShowLayerInfo.some(item => item === false);
    setIsSingleShow(!singleShowLayerState);

    // 判断所选中的各个节点是否是显示状态
    // 只要有一个隐藏了就显示
    const showOrHiddenInfo = getFieldStates(bar.layers, bar.key, "isShow");
    const showOrHiddenState = showOrHiddenInfo.some(item => item === false);
    setIsShowOrHidden(!showOrHiddenState);
  }, [bar.layers, bar.key]);

  // 后端返回的数据里应该有 show、lock 属性
  // 这里需要拿到 所选中 的treeNode中的lock或者show属性
  const menuItemClick = (e, operateName) => {
    e.stopPropagation();
    // 先在前端改变锁定状态，再根据请求的结果来判断是否锁定成功
    // TODO 发送请求
    let customPayload = {
      // key: bar.key,
      dashboardId: bar.dashboardId,
    };
    // 如果是动态面板里,这时候的dashboardId应该改为状态id
    if (bar.isPanel) {
      customPayload.dashboardId = bar.stateId;
    }
    switch (operateName) {
      case "lock":
        const finalBody = bar.key.map(item => ({
          id: item,
          key: "isLock",
          value: !isLock
        }));
        customPayload.configs = finalBody;
        break;
      case "singleShowLayer":
        customPayload.keys = bar.key;
        customPayload.singleShowLayer = !isSingleShow;
        break;
      case "reName":
        // customPayload.newName = 'abc'
        customPayload.value = true;
        break;
      case "hidden":
        const finalHiddenConfigs = bar.key.map(item => ({
          id: item,
          key: "isShow",
          value: !isShowOrHidden
        }));
        customPayload.configs = finalHiddenConfigs;
        break;
      case "delete":
        const l = bar.key?.map(item => ({
          id: item,
          children: []
        }));
        customPayload.layers = l;
        break;
      case "copy":
        customPayload = {
          dashboardId: bar.stateId || bar.dashboardId,
          children: [],
          targetDashboardId: bar.dashboardId,
          insertId: bar.key[0],
          originLayers: bar.layers,
          //TODO 改为modules后删除掉这行
          components: [...bar.key],
          // components: [...bar.key],
          panels: [],
          selected: [...bar.key]
        };
        break;
      case "corssCopy":
        dispatch({
          type: "bar/save",
          payload: {
            isCopyComponentToDashboard: true,
          },
        });
        setShowCorssCopyModal(true);
        break;
      case "styleCopy":
        const currentComponent = cloneDeep(bar.componentConfig);
        const surceIds = bar.key;
        if (!currentComponent.id) {
          message.warning("请重新点选该组件进行样式复制");
        } else {
          if (surceIds.length > 1) {
            return message.warning("请选择单一组件进行样式复制");
          }
          setComponentCopyConfig({
            moduleVersion: currentComponent.moduleVersion,
            moduleName: currentComponent.moduleName,
            config: currentComponent.config
          });
        }
        break;
      case "stylePaste":
        const targetComponent = cloneDeep(bar.componentConfig);
        const sourceStyleConfig = cloneDeep(getComponentCopyConfig());
        const targetIds = bar.key;
        if (!sourceStyleConfig.moduleName) {
          message.warning("您没有可用于粘贴的样式，请先复制样式");
        } else {
          if (!targetComponent.id) {
            message.warning("请重新点选该组件进行样式粘贴");
          } else {
            if (targetIds.length > 1) {
              return message.warning("请选择单一组件进行样式粘贴");
            }
            if (targetComponent.moduleName !== sourceStyleConfig.moduleName) {
              message.warning("该组件与复制源组件的类型不同，不能粘贴样式");
            } else if (targetComponent.moduleVersion !== sourceStyleConfig.moduleVersion) {
              message.warning("该组件与复制源组件的版本不同，不能粘贴样式");
            } else {
              saveStyleData({
                id: targetComponent.id,
                name: targetComponent.name,
                moduleName: targetComponent.moduleName,
                moduleVersion: targetComponent.moduleVersion,
                config: sourceStyleConfig.config.map(conf => {
                  if (conf.name === "dimension") {
                    return targetComponent.config.find(item => item.name === "dimension");
                  } else {
                    return conf;
                  }
                }),
              }, targetComponent);
            }
          }
        }
        break;
      default:
        break;
    }
    dispatch({
      type: `bar/${operateName}`,
      payload: customPayload
    });
    // setIsLock(!isLock)
    // 点击后隐藏菜单
    hideMenu();
  };

  // 粘贴样式保存
  const saveStyleData = async (param, targetComponent) => {
    const params = {
      configs: [param],
      dashboardId: bar.dashboardId
    };
    await http({
      url: "/visual/module/update",
      method: "post",
      body: params
    });
    message.success("样式粘贴成功");
    // 更新bar中组件样式
    bar.fullAmountComponents.find(item => item.id === param.id).config = param.config;
    const componentConfig = cloneDeep(targetComponent);
    componentConfig.config = param.config;
    dispatch({
      type: "bar/setComponentConfigAndCalcDragScaleData",
      payload: componentConfig
    });
    // 重新渲染右侧设置面板
    await dispatch({
      type: "bar/save",
      payload: {
        key: ["copyStyle"]
      }
    });
    dispatch({
      type: "bar/save",
      payload: {
        key: [param.id]
      }
    });
  };
  const { x, y } = bar.rightMenuInfo;
  // console.log('x y id isFolders', x, y, id, isFolder);
  const menuRef = useRef(null);
  useEffect(() => {
    // 在光标与菜单之间加点距离，方便用户点击
    let recalculateX = x;
    let recalculateY = y;
    // 因为右侧菜单第一次渲染，因为首次渲染的元素在Tree的最底部，所以有一个默认的offsetTop（这里打印出来是521）
    // so,这里需要将鼠标的y轴坐标作为offsetTop
    const visualHeight = document.body.clientHeight;
    const menuHeight = menuRef.current?.clientHeight || 0;
    // 如果offsetTop + 元素本身高度 > 浏览器可视区域高度，将菜单上移
    const isOverflowAtUnder = menuHeight + recalculateY > visualHeight;
    if (isOverflowAtUnder) {
      const a = menuHeight + recalculateY - visualHeight;
      recalculateY = y - (menuHeight + recalculateY - visualHeight) - 20;
    }
    if (menuRef.current) {
      menuRef.current.style.position = "fixed";
      menuRef.current.style.top = `${recalculateY}px`;
      menuRef.current.style.left = `${recalculateX}px`;
    }
  }, [x, y]);

  useEffect(() => {
    getAllDashboards();
  }, []);
  // 获取当前空间下的所有大屏
  const getAllDashboards = () => {
    const allDashboardList = JSON.parse(JSON.stringify(bar.allDashboardList));
    const dashboardListTmp = allDashboardList.filter(dashboard => dashboard.id !== bar.dashboardId);
    setDashboardList(dashboardListTmp);
  };
  // 关闭复制到大屏弹窗
  const cancelCorssCopyModal = () => {
    setShowCorssCopyModal(false);
    dispatch({
      type: "bar/save",
      payload: {
        isCopyComponentToDashboard: false,
      },
    });
  };
  // 复制到大屏确认
  const confirmCorssCopy = async () => {
    if (!copyDashboardId) {
      return message.warning({ content: "请选择大屏", duration: 2 });
    }
    // 获取目标大屏的组件layers
    let { layers } = await http({
      url: `/visual/application/dashboard/detail/${copyDashboardId}`,
      method: "get",
    });
    const noEmptyGroupLayers = filterEmptyGroups(layers);
    // 保存
    const params = {
      dashboardId: bar.stateId || bar.dashboardId,
      children: [],
      targetDashboardId: copyDashboardId,
      originLayers: noEmptyGroupLayers,
      //TODO 改为modules后删除掉这行
      components: [...bar.key],
      panels: [],
      selected: [...bar.key]
    };
    await http({
      url: "/visual/layer/copyToNew",
      method: "post",
      body: params,
    });
    message.success({ content: "复制成功", duration: 2 });
    cancelCorssCopyModal();
    setCopyDashboardId(null);
  };

  // 选择大屏
  const selectDashboard = (id) => {
    setCopyDashboardId(id);
  };
  return (
    <React.Fragment>
      {
        !bar.isCopyComponentToDashboard ?
          <div className='RightClickMenu-wrap' ref={menuRef}>
            {
              menuOptions.map((item, index) => {
                const hasLevel = item.children && item.children.length && Array.isArray(item.children);
                return (
                  <div
                    key={index}
                    className={
                      `menu-item
            ${item.disabled && "disabled-menu-item"}
            ${hasLevel && "li-hover"}`
                    }
                    onClick={(e) => menuItemClick(e, item.key)}
                  >
                    {
                      // TODO 目前是三种双重状态，如果后续双重状态的选项太多,再封装一个组件
                      (item.key === "lock" && isLock) ||
                        (item.key === "singleShowLayer" && isSingleShow) ||
                        (item.key === "hidden" && !isShowOrHidden)
                        ? <IconFont style={{ fontSize: "10px" }} type={`icon-${item.anotherIcon}`} />
                        : <IconFont style={{ fontSize: "10px" }} type={`icon-${item.icon}`} />
                    }
                    <li className={"menu-item-li"}>
                      {
                        (item.key === "lock" && isLock) ||
                          (item.key === "singleShowLayer" && isSingleShow) ||
                          (item.key === "hidden" && !isShowOrHidden)
                          ? item.anotherName
                          : item.name
                      }
                      {
                        hasLevel && <SecondMenu data={item.children} />
                      }
                    </li>
                    {/* 右三角图标 */}
                    {
                      hasLevel && <span className='right-icon'>
                        {
                          React.createElement(Icons.CaretRightOutlined)
                        }</span>
                    }
                  </div>
                );
              })
            }
          </div>
          : null
      }
      <Modal
        title='复制到大屏'
        className="corss-copy-modal"
        destroyOnClose={true}
        visible={showCorssCopyModal}
        onCancel={cancelCorssCopyModal}
        footer={[
          // eslint-disable-next-line react/jsx-key
          <div className='custom-btn-wrap'>
            <Button className='my-btn cancel-btn' onClickCapture={cancelCorssCopyModal}>取消</Button>
            <Button className='my-btn confirm-btn' type="primary" onClickCapture={confirmCorssCopy}>确定</Button>
          </div>
        ]}
        style={{
          top: "30%"
        }}
      >
        <Form
          labelCol={{
            span: 5,
          }}
          layout="horizontal"
          name='releaseForm'
          className="move-from"
        >
          <Form.Item
          >
            <Select onSelect={selectDashboard} placeholder="请选择">
              {
                dashboardList.map((item) =>
                (<Option key={item.id} value={item.id}>      {item.name}
                </Option>)
                )
              }
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default memo(connect(
  ({ bar, operate }) => ({ bar, operate })
)(RightClickMenu));
