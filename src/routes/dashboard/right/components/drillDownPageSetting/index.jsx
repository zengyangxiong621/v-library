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
import Checkbox from "../checkBox";

const dashboardId = window.location.pathname.split("/")[2];

let isSettingsChange = false;
const PageSetting = ({ bar, dispatch, history, ...props }) => {
  const formItemLayout = {
    labelAlign: "left",
  };
  const currentLayer = bar.selectedComponentOrGroup[0];
  const hideDefault = currentLayer?.hideDefault || false;
  const panelConfig = bar.panelConfig;
  const { left, top, width, height, isScroll, allowScroll, animationType, scrollTime, animationTime } = panelConfig.config;
  const [key, setKey] = useState(uuidv4());
  const [form] = Form.useForm();
  const styleConfig = [
    {
      "displayName": "位置尺寸",
      "name": "dimension",
      "type": "dimensionGroup",
      "config": {
        "lock": false,
      },
      "value": [
        {
          "displayName": "X轴坐标",
          "name": "left",
          "value": left,
        },
        {
          "displayName": "Y轴坐标",
          "name": "top",
          "value": top,
        },
        {
          "displayName": "宽度",
          "name": "width",
          "value": width,
        },
        {
          "displayName": "高度",
          "name": "height",
          "value": height,
        },
      ],
    },
    {
      "displayName": "默认隐藏",
      "name": "hideDefault",
      "type": "checkBox",
      "value": hideDefault,
    }
  ];


  useEffect(() => {
    if (!isSettingsChange) {
      setKey(uuidv4());
    }
  }, [bar.panelConfig]);

  const styleChange = debounce(async () => {
    const dimensionConfig = styleConfig.find(item => item.name === "dimension").value;
    const hideDefault = styleConfig.find(item => item.name === "hideDefault").value;
    dimensionConfig.forEach(item => {
      panelConfig.config[item.name] = item.value;
    });
    panelConfig.config.hideDefault = hideDefault;
    const { config: { left, top, width, height } } = panelConfig;
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
        configs: [
          panelConfig,
        ],
      },
    });
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
    const panel = bar.fullAmountPanels.find((panel) => panel.id === panelConfig.id);
    history.push(`/dashboard/${bar.dashboardId}/panel-${panel.id}/state-${panel.states[0].id}`);
    dispatch({
      type: "bar/save",
      payload: {
        isPanel: true,
        panelId: panel.id,
        curPanelType: 2
      }
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
      <h3 className="dynamic-set-header">
        下钻面板设置
      </h3>
      <div className="content" key={key}>
        <Form
          className="custom-form"
          form={form}
          {...formItemLayout}
          colon={false}
        >
          <ComponentCard data={panelConfig}
            allModulesConfig={bar.moduleDefaultConfig}
            dispatch={dispatch}>
            {styleConfig.map((item, index) => {
              if (item.name === "hideDefault") {
                return <Checkbox data={ item } onChange={ hideDefaultChange }/>;
              }
              if (!(item.type && componentLib[item.type])) {
                return null;
              }
              const TagName = componentLib[item.type];
              return (
                <TagName data={item} onChange={styleChange} key={index} />
              );
            })}
          </ComponentCard>
          <Button onClick={handleEditDashboard} className="g-my-2" type="primary" style={{ width: "calc(100% - 24px)" }}>编辑下钻面板</Button>
        </Form>
      </div>
    </div>
  );
};

export default connect(({ bar }) => ({
  bar,
}))(withRouter(PageSetting));

