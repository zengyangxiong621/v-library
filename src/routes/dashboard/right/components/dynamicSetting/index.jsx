/* eslint-disable react/prop-types */
import React, { memo, useState, useEffect } from "react";
import { withRouter } from "dva/router";

import { connect } from "dva";
import "./index.less";
import { find } from "../../../../../utils/common";
import BackgroundColor from "../color";
import UploadImg from "../uploadImg";
import CusInputNumber from "../cusInputNumber";
import RadioGroup from "../radioGroup";
import { deepClone } from "../../../../../utils";
import { Button, Form } from "antd";
import debounce from "lodash/debounce";
import { http } from "../../../../../services/request";
import { v4 as uuidv4 } from "uuid";
import ComponentCard from "../componentCard";
import componentLib from "../index";
import { IPanel } from "@/routes/dashboard/center/components/CustomDraggable/type";

const dashboardId = window.location.pathname.split("/")[2];

let isSettingsChange = false;
const PageSetting = ({ bar, dispatch, history, ...props }) => {
  const formItemLayout = {
    labelAlign: "left",
  };
  const panelConfig = bar.panelConfig;
  const {
    left,
    top,
    width,
    height,
    hideDefault,
    isScroll,
    allowScroll,
    animationType,
    scrollTime,
    animationTime,
  } = panelConfig.config;
  const [key, setKey] = useState(uuidv4());
  const [form] = Form.useForm();
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
      config: {
        suffix: "ms",
        max: 100000000,
        min: 0,
        step: 1000,
      },
    },
    {
      displayName: "动画时长",
      name: "animationTime",
      type: "number",
      value: animationTime,
      config: {
        suffix: "ms",
        max: 24000,
        min: 0,
        step: 1000,
      },
    },
  ];

  useEffect(() => {
    if (!isSettingsChange) {
      setKey(uuidv4());
    }
  }, [bar.panelConfig]);

  const styleChange = debounce(async () => {
    const dimensionConfig = styleConfig.find((item) => item.name === "dimension").value;
    const hideDefault = styleConfig.find((item) => item.name === "hideDefault").value;
    const isScroll = styleConfig.find((item) => item.name === "isScroll").value;
    const allowScroll = styleConfig.find((item) => item.name === "allowScroll").value;
    const animationType = styleConfig.find((item) => item.name === "animationType").value;
    const scrollTime = styleConfig.find((item) => item.name === "scrollTime").value;
    const animationTime = styleConfig.find((item) => item.name === "animationTime").value;
    dimensionConfig.forEach((item) => {
      panelConfig.config[item.name] = item.value;
    });
    panelConfig.config.hideDefault = hideDefault;
    panelConfig.config.isScroll = isScroll;
    panelConfig.config.allowScroll = allowScroll;
    panelConfig.config.animationType = animationType;
    panelConfig.config.scrollTime = scrollTime;
    panelConfig.config.animationTime = animationTime;
    const {
      config: { left, top, width, height },
    } = panelConfig;
    dispatch({
      type: "bar/save",
      payload: {
        panelConfig,
        scaleDragData: {
          position: {
            x: left,
            y: top,
          },
          style: {
            width,
            height,
            display: "block",
          },
        },
      },
    });
    await http({
      url: "/visual/panel/update",
      method: "post",
      body: {
        dashboardId: bar.dashboardId,
        configs: [panelConfig],
      },
    });
  }, 300);

  // const saveStyleData = async (param) => {
  //   const params = {
  //     configs: [param],
  //     dashboardId: dashboardId
  //   }
  //   await http({
  //     url: '/visual/module/update',
  //     method: 'post',
  //     body: params
  //   })
  // }
  const handleEditDashboard = () => {
    const panel = bar.fullAmountPanels.find((panel) => panel.id === panelConfig.id);
    history.push(`/dashboard/${bar.dashboardId}/panel-${panel.id}/state-${panel.states[0].id}`);
    dispatch({
      type: "bar/save",
      payload: {
        isPanel: true,
        panelId: panel.id,
        curPanelType: 0,
      },
    });
    /*    dispatch({
      type: 'bar/getPanelDetails'
    })
    dispatch({
      type: 'bar/selectPanelState',
      payload: {
        stateId: panel.states[0].id
      }
    })*/
  };
  return (
    <div className="dynamic-wrap">
      <h3 className="dynamic-set-header">动态面板设置</h3>
      <div className="content" key={key}>
        <Form className="custom-form" form={form} {...formItemLayout} colon={false}>
          <ComponentCard
            data={panelConfig}
            allModulesConfig={bar.moduleDefaultConfig}
            dispatch={dispatch}
          >
            {styleConfig.map((item, index) => {
              if (!(item.type && componentLib[item.type])) {
                return null;
              }
              const TagName = componentLib[item.type];
              return <TagName data={item} onChange={styleChange} key={index} />;
            })}
          </ComponentCard>
          <Button
            onClick={handleEditDashboard}
            className="g-my-2"
            type="primary"
            style={{ width: "calc(100% - 24px)" }}
          >
            编辑动态面板
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default connect(({ bar }) => ({
  bar,
}))(withRouter(PageSetting));
