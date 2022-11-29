import React, { memo, useState, useEffect, useMemo } from "react";
import { connect } from "dva";
import { withRouter } from "dva/router";
import "./index.less";
import { find } from "../../../../../utils/common";
import BackgroundColor from "../color";
import UploadImg from "../uploadImg";
import CusInputNumber from "../cusInputNumber";
import RadioGroup from "../radioGroup";
import { deepClone } from "../../../../../utils";
import { Form, Button, Spin } from "antd";
import debounce from "lodash/debounce";
import { http } from "../../../../../services/request";
import { v4 as uuidv4 } from "uuid";
import ComponentCard from "../componentCard";
import componentLib from "../index";
import Checkbox from "../checkBox";

const dashboardId = window.location.pathname.split("/")[2];

let isSettingsChange = false;
const ReferenceSetting = ({ bar, dispatch, history, ...props }) => {
  const [key, setKey] = useState(uuidv4());
  const [form] = Form.useForm();
  const [activeKey, setActiveKey] = useState("1");
  const [isEdit, setIsEdit] = useState(true);
  const formItemLayout = {
    labelAlign: "left",
  };
  const currentLayer = bar.selectedComponentOrGroup[0];
  const hideDefault = currentLayer?.hideDefault || false;
  const panelConfig = bar.panelConfig;
  const {
    config: {
      left,
      top,
      width,
      height,
      allowScroll,
      isScroll = false,
      animationType,
      scrollTime,
      animationTime,
    },
    states,
  } = panelConfig;

  const statesLength = useMemo(() => {
    return states.length;
  }, [states]);

  // 未发布且除去自身的应用集合
  const publishedAndExcludeSelfDashboardList = useMemo(() => {
    return bar.allDashboardList
      .map((item) => ({
        name: item.name,
        value: item.id,
        status: item.status,
      }))
      .filter((item) => item.value !== bar.dashboardId && item.status === 1);
  }, [bar.dashboardId, bar.dashboardId]);

  const styleConfig = [
    {
      displayName: "位置尺寸",
      name: "dimension",
      type: "dimensionGroup",
      config: {
        lock: false,
      },
      value: [
        {
          displayName: "X轴坐标",
          name: "left",
          value: left,
        },
        {
          displayName: "Y轴坐标",
          name: "top",
          value: top,
        },
        {
          displayName: "宽度",
          name: "width",
          value: width,
        },
        {
          displayName: "高度",
          name: "height",
          value: height,
        },
      ],
    },
    {
      displayName: "默认隐藏",
      name: "hideDefault",
      type: "checkBox",
      value: hideDefault,
    },
    {
      displayName: "启用滚轮",
      name: "isScroll",
      type: "checkBox",
      value: isScroll,
    },
    {
      displayName: "自动轮播",
      name: "allowScroll",
      type: "checkBox",
      value: allowScroll,
    },
    {
      displayName: "动画类型",
      name: "animationType",
      type: "select",
      value: animationType,
      options: [
        {
          name: "渐隐渐现",
          value: "0",
        },
      ],
    },
    {
      displayName: "更新时间",
      name: "scrollTime",
      type: "number",
      value: scrollTime,
    },
    {
      displayName: "动画时长",
      name: "animationTime",
      type: "number",
      value: animationTime,
    },
    {
      displayName: "引用列表",
      name: "referenceList",
      type: "tabArray",
      defaultActiveKey: "1",
      activeKey: "1",
      defaultExpand: true,
      loading: true,
      config: {
        template: [
          {
            key: "1",
            displayName: "应用1",
            name: "tab",
            type: "object",
            value: [
              {
                displayName: "应用选择",
                name: "dashboardSelect",
                type: "select",
                value: "",
                options: publishedAndExcludeSelfDashboardList,
              },
            ],
          },
        ],
      },
      value: states.map((item, index) => ({
        key: `${index + 1}`,
        displayName: `应用${index + 1}`,
        name: "tab",
        type: "object",
        value: [
          {
            displayName: "应用选择",
            name: "dashboardSelect",
            type: "select",
            value: item.id,
            label: item.name,
            options: publishedAndExcludeSelfDashboardList,
          },
        ],
      })),
    },

    // {
    //   "displayName": "编辑引用应用",
    //   "name": "editDashboard",
    //   "type": "button",
    //   "buttonType": "",
    //   "tooltip": {
    //     "show":
    //   },
    //   "style": {
    //
    //   }
    // }
  ];
  const tabActiveChange = (key) => {
    setActiveKey(key);
  };
  const styleChange = debounce(async (key = "1", init = false, cb = function () {}) => {
    console.log("key", key);
    if (key !== "0" && init) {
      setActiveKey(key);
      const referenceList = styleConfig.find((item) => item.name === "referenceList").value;
      if (referenceList.length === 0) return;
      const currentReference = referenceList.find((item) => item.key === key).value;
      const currentReferenceId = currentReference.find(
        (item) => item.name === "dashboardSelect"
      ).value;
      if (currentReferenceId) {
        setIsEdit(true);
      } else {
        setIsEdit(false);
      }
      return;
    }
    let dimensionConfig,
      isScroll,
      allowScroll,
      animationType,
      scrollTime,
      animationTime,
      referenceList;
    styleConfig.forEach((item) => {
      switch (item.name) {
        case "dimension":
          dimensionConfig = item.value;
          break;
        case "isScroll":
          isScroll = item.value;
          break;
        case "allowScroll":
          allowScroll = item.value;
          break;
        case "animationType":
          animationType = item.value;
          break;
        case "scrollTime":
          scrollTime = item.value;
          break;
        case "animationTime":
          animationTime = item.value;
          break;
        case "referenceList":
          referenceList = item.value;
          break;
        default:
          break;
      }
    });

    // 判断当前 active的选项值存不存在
    console.log("referenceList", referenceList);
    console.log("activeKey", activeKey);
    console.log("activeKey", key);
    if (referenceList.length > 0) {
      const currentReference = referenceList.find((item) => item.key === key).value;
      const currentReferenceId = currentReference.find(
        (item) => item.name === "dashboardSelect"
      ).value;
      if (currentReferenceId) {
        setIsEdit(true);
      } else {
        setIsEdit(false);
      }
    }

    dimensionConfig.forEach((item) => {
      panelConfig.config[item.name] = item.value;
    });
    panelConfig.config.isScroll = isScroll;
    panelConfig.config.allowScroll = allowScroll;
    panelConfig.config.animationType = animationType;
    panelConfig.config.scrollTime = scrollTime;
    panelConfig.config.animationTime = animationTime;
    panelConfig.states = referenceList.map((item) => {
      const data = item.value.find((it) => it.name === "dashboardSelect");
      return {
        id: data.value,
        name: data.label,
      };
    });
    const copyPanelConfig = deepClone(panelConfig);
    copyPanelConfig.states = copyPanelConfig.states.filter((state) => state.id);
    console.log("copyPanelConfig", copyPanelConfig);
    const {
      config: { left, top, width, height },
    } = panelConfig;

    const data = await http({
      url: "/visual/panel/update",
      method: "post",
      body: {
        dashboardId: bar.stateId || bar.dashboardId,
        configs: [copyPanelConfig],
      },
    });

    if (data) {
      cb(false);
      dispatch({
        type: "bar/updatePanels",
        payload: {
          panels: [panelConfig],
        },
      });
      dispatch({
        type: "bar/referencePanelState",
        payload: {
          panelConfig,
        },
      });
    } else {
      copyPanelConfig.states.pop();
      panelConfig.states.pop();
      dispatch({
        type: "bar/save",
        payload: {
          panelConfig,
        },
      });
    }
  }, 300);

  const hideDefaultChange = async (value) => {
    await saveLayerData({
      id: bar.key[0],
      key: "hideDefault",
      value,
    });
  };

  const saveLayerData = async (param) => {
    const params = {
      configs: [param],
      dashboardId: bar.stateId || bar.dashboardId,
    };
    const layers = await http({
      url: "/visual/layer/group/update",
      method: "post",
      body: params,
    });
    if (layers) {
      currentLayer.hideDefault = param.value;
      dispatch({
        type: "bar/updateDashboardOrStateConfig",
        payload: {
          id: bar.stateId || bar.dashboardId,
          layers,
        },
      });
      dispatch({
        type: "bar/save",
        payload: {
          layers,
        },
      });
    }
  };

  const handleEditDashboard = () => {
    const referenceList = styleConfig.find((item) => item.name === "referenceList").value;
    if (referenceList.length === 0) return;
    const currentReference = referenceList.find((item) => item.key === activeKey).value;
    const currentReferenceId = currentReference.find(
      (item) => item.name === "dashboardSelect"
    ).value;
    if (currentReferenceId) {
      history.push(`/dashboard/${currentReferenceId}`);
      dispatch({
        type: "bar/save",
        payload: {
          isPanel: false,
          key: [currentReferenceId],
          selectedComponentOrGroup: [],
          scaleDragData: {
            position: {
              x: 0,
              y: 0,
            },
            style: {
              width: 0,
              height: 0,
              display: "none",
            },
          },
        },
      });
    }
  };

  useEffect(() => {
    styleChange("1", true);
  }, []);

  return (
    <div className="dynamic-wrap">
      <h3 className="dynamic-set-header">引用面板设置</h3>
      <div className="content" key={key}>
        <Form className="custom-form" form={form} {...formItemLayout} colon={false}>
          <ComponentCard
            data={panelConfig}
            allModulesConfig={bar.moduleDefaultConfig}
            dispatch={dispatch}
          >
            {styleConfig.map((item, index) => {
              if (item.name === "hideDefault") {
                return <Checkbox data={item} onChange={hideDefaultChange} />;
              }
              if (!(item.type && componentLib[item.type])) {
                return null;
              }
              const TagName = componentLib[item.type];
              if (item.type === "tabArray") {
                return (
                  <TagName
                    data={item}
                    onChange={(key, cb) => styleChange(key, false, cb)}
                    onTabClick={tabActiveChange}
                    key={index}
                  />
                );
              }
              return (
                <TagName
                  data={item}
                  onChange={(key, cb) => styleChange(key, false, cb)}
                  key={index}
                />
              );
            })}
          </ComponentCard>
          <div className="g-text-left g-m-4">提示：所选应用必须为已发布状态</div>
          {statesLength > 0 ? (
            <Button
              disabled={!isEdit}
              onClick={handleEditDashboard}
              className="g-my-2"
              type="primary"
              style={{ width: "calc(100% - 24px)" }}
            >
              编辑引用应用
            </Button>
          ) : (
            <> </>
          )}
        </Form>
      </div>
    </div>
  );
};

export default connect(({ bar }) => ({
  bar,
}))(withRouter(ReferenceSetting));
