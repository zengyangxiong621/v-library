import React, { memo, useState, useEffect } from "react";
import "./index.less";
import { connect } from "dva";
import { v4 as uuidv4 } from "uuid";
import debounce from "lodash/debounce";
import { deepClone, findLayerById } from "@/utils";
import EventDrawer from "../eventDrawer";
import OriginSelect from "../originSelect";

import {
  Form,
  Select,
  Tabs,
  Collapse,
  Button,
  Radio,
  TreeSelect,
  Space,
  InputNumber,
  Checkbox,
  Row,
  Col,
  Slider,
} from "antd";

import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import UpdateContainerDrawer from "../../../components/dataContainer/components/updateContainerDrawer";
import UpdateComponentConfigDrawer from "../updateComponentConfigDrawer";

const CusEvent = ({ bar, dispatch, ...props }) => {
  const { Panel } = Collapse;
  const { TabPane } = Tabs;
  const { Option } = Select;
  const [form] = Form.useForm();
  const formItemLayout = {
    labelAlign: "left",
  };
  const { SHOW_PARENT, SHOW_ALL, SHOW_CHILD } = TreeSelect;

  const _data = props.data || {};
  const [activeCollapseKey, setActiveCollapseKey] = useState(null);
  const [activeActionsCollapseKey, setActiveActionsCollapseKey] = useState(["1"]);
  const [activeTab, setActiveTab] = useState(null);
  const [tabpanes, setTabpanes] = useState(_data?.events || []);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [componentVisible, setComponentVisible] = useState(false);
  const [componentConfig, setComponentConfig] = useState({});
  const [copyComponentConfig, setCopyComponentConfig] = useState({});
  const [currentAction, setCurrentAction] = useState({});
  const [activePane, setActivePane] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [activeActionTab, setActiveActionTab] = useState(null);
  const [scaleProportion, setScaleProportion] = useState(1);
  const [isUpdateConfig, setIsUpdateConfig] = useState(false);
  const [layerType, setLayerType] = useState("component");
  const eventTypes = [
    {
      name: "当请求完成或数据变化时",
      value: "dataChange",
    },
    {
      name: "鼠标点击",
      value: "click",
    },
    {
      name: "鼠标移入",
      value: "mouseEnter",
    },
    {
      name: "鼠标移出",
      value: "mouseLeave",
    },
    {
      name: "状态变化",
      value: "statusChange",
    },
  ];

  const actionTypes = [
    {
      name: "显示",
      value: "show",
    },
    {
      name: "隐藏",
      value: "hide",
    },
    // {
    //   name: "显隐切换",
    //   value: "show/hide",
    // },
    {
      name: "移动",
      value: "translate",
    },
    {
      name: "缩放",
      value: "scale",
    },
    {
      name: "旋转",
      value: "rotate",
    },
    {
      name: "更新组件配置",
      value: "updateConfig",
    },
    {
      name: "切换组件状态",
      value: "updateStatus",
    },
  ];

  const animationType = [
    {
      name: "渐隐渐现",
      value: "opacity",
    },
    {
      name: "向左移动",
      value: "slideLeft",
    },
    {
      name: "向右移动",
      value: "slideRight",
    },
    {
      name: "向上移动",
      value: "slideTop",
    },
    {
      name: "向下移动",
      value: "slideBottom",
    },
  ];

  const timingFunctionType = [
    {
      name: "匀速",
      value: "linear",
    },
    {
      name: "慢快慢",
      value: "ease",
    },
    {
      name: "低速开始",
      value: "ease-in",
    },
    {
      name: "低速结束",
      value: "ease-out",
    },
    {
      name: "低速开始和结束",
      value: "ease-in-out",
    },
  ];

  useEffect(() => {
    setTabpanes(_data.events || []);
    if (_data?.events?.length) {
      setActiveTab(_data.events[0].id);
      setActivePane(_data.events[0]);
      if (_data.events[0].actions.length) {
        setActiveActionTab(_data.events[0].actions[0].id);
        const scale = _data.events[0].actions[0].scale;
        setScaleProportion(scale.x / scale.y);
      } else {
        setActiveActionTab(null);
        setScaleProportion(1);
      }
    } else {
      setScaleProportion(1);
    }
    //
    tabpanes.forEach((item) => {
      item.actions.forEach((action) => {
        if (action.action === "updateStatus") {
          // const panel = findLayerById(bar.fullAmountLayers, action.component[0]);
          // action.panelStates = panel.modules.map((item) => ({ name: item.name, id: item.id }));
          const currentDetails = bar.fullAmountDashboardDetails.find(
            (item) => item.id === action.component[0]
          );
          if (currentDetails) {
            action.panelStates = currentDetails.states.map((item) => ({
              name: item.name,
              id: item.id,
            }));
          } else {
            action.panelStates = [];
          }
        } else {
          action.panelStates = [];
        }
      });
    });
  }, []);

  const eventExtra = () => (
    <React.Fragment>
      <PlusOutlined onClick={addEvent} style={{ marginRight: "8px" }} />
      <DeleteOutlined onClick={deleteEvent} />
    </React.Fragment>
  );

  const addEvent = (e) => {
    e.stopPropagation();
    const panes = [...tabpanes];
    const eventId = uuidv4();
    const actionId = uuidv4();
    panes.push({
      // trigger: _data?.triggers[0]?.value || null,
      trigger: null,
      name: `事件${panes.length + 1}`,
      id: eventId,
      conditions: [],
      conditionType: "all",
      actions: [
        {
          id: actionId,
          name: "动作1",
          action: "show",
          component: [],
          componentScope: "current",
          animation: {
            type: "slideLeft",
            timingFunction: "ease",
            duration: 1000,
            delay: 0,
          },
          translate: {
            toX: 0,
            toY: 0,
          },
          scale: {
            lock: true,
            origin: "50% 50%",
            x: 1,
            y: 1,
          },
          rotate: {
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            perspective: false,
          },
        },
      ],
    });
    setScaleProportion(1);
    setTabpanes(panes);
    setActiveTab(eventId);
    const activePane = panes.find((item) => {
      return item.id === eventId;
    });
    setActivePane(activePane);
    setActiveActionTab(actionId);
    _data.events = panes;
    setActiveCollapseKey(["1"]);
    props.onChange();
  };

  const deleteEvent = (e) => {
    e.stopPropagation();
    const panes = tabpanes.filter((pan) => {
      return pan.id !== activeTab;
    });
    panes.forEach((item, index) => {
      item.name = `事件${index + 1}`;
    });
    setTabpanes(panes);
    setActiveTab(panes.length ? panes[0].id : null);
    setActivePane(panes.length ? panes[0] : null);
    if (panes.length) {
      const scale = panes[0].actions[0].scale;
      setScaleProportion(scale.x / scale.y);
      if (panes[0].actions.length) {
        setActiveActionTab(panes[0].actions[0].id);
      } else {
        setActiveActionTab(null);
      }
    } else {
      setActiveActionTab(null);
      setScaleProportion(1);
    }
    _data.events = panes;
    props.onChange();
  };

  const tabsChange = (key) => {
    setActiveTab(key);
    const activePane = tabpanes.find((item) => {
      return item.id === key;
    });
    setActivePane(activePane);
    setActiveActionTab(activePane.actions.length ? activePane.actions[0].id : null);
    if (activePane.actions.length) {
      const scale = activePane.actions[0].scale;
      setScaleProportion(scale.x / scale.y);
    } else {
      setScaleProportion(1);
    }
  };

  // 事件类型
  const eventTypeChange = (e, pane) => {
    pane.trigger = e;
    _data.events = tabpanes;
    props.onChange();
  };

  // 添加条件
  const addConditon = () => {
    setDrawerVisible(true);
  };

  const drawerClose = () => {
    setDrawerVisible(false);
    setActiveId(null);
  };

  const setCondition = (val) => {
    const curPane = tabpanes.find((item) => {
      return item.id === activeTab;
    });
    curPane.conditions = val;
    const activePane = tabpanes.find((item) => {
      return item.id === activeTab;
    });
    setActivePane(activePane);
    _data.events = tabpanes;
    props.onChange();
  };

  const setConditionType = (val) => {
    const curPane = tabpanes.find((item) => {
      return item.id === activeTab;
    });
    curPane.conditionType = val;
    const activePane = tabpanes.find((item) => {
      return item.id === activeTab;
    });
    setActivePane(activePane);
    _data.events = tabpanes;
    props.onChange();
  };

  const showConditionDetail = (cond) => {
    setDrawerVisible(true);
    setActiveId(cond.id);
  };

  const actionExtra = () => (
    <React.Fragment>
      <PlusOutlined onClick={addAction} style={{ marginRight: "8px" }} />
      <DeleteOutlined onClick={deletAction} />
    </React.Fragment>
  );

  const addAction = (e) => {
    e.stopPropagation();
    const panes = [...tabpanes];
    const pane = panes.find((item) => {
      return item.id === activeTab;
    });
    const id = uuidv4();
    pane.actions.push({
      id,
      name: `动作${pane.actions.length + 1}`,
      component: [],
      action: "show",
      componentScope: "current",
      animation: {
        type: "slideLeft",
        timingFunction: "ease",
        duration: 1000,
        delay: 0,
      },
      translate: {
        toX: 0,
        toY: 0,
      },
      scale: {
        lock: true,
        origin: "50% 50%",
        x: 1,
        y: 1,
      },
      rotate: {
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        perspective: false,
      },
    });
    setTabpanes(panes);
    setActiveActionTab(id);
    setScaleProportion(1);
    _data.events = panes;
    setActiveActionsCollapseKey(["1"]);
    props.onChange();
  };

  const deletAction = (e) => {
    e.stopPropagation();
    const panes = [...tabpanes];
    const pane = panes.find((item) => {
      return item.id === activeTab;
    });
    const actions = pane.actions.filter((item) => {
      return item.id !== activeActionTab;
    });
    actions.forEach((item, index) => {
      item.name = `动作${index + 1}`;
    });
    pane.actions = actions;
    setTabpanes(panes);
    setActiveActionTab(pane.actions.length ? pane.actions[0].id : null);
    if (pane.actions.length) {
      const scale = pane.actions[0].scale;
      setScaleProportion(scale.x / scale.y);
    } else {
      setScaleProportion(1);
    }
    _data.events = panes;
    props.onChange();
  };

  const actionTabsChange = (key) => {
    setActiveActionTab(key);
    const activeAction = activePane.actions.find((item) => item.id === key);
    setScaleProportion(activeAction.scale.x / activeAction.scale.y);
  };

  const componentScopeChange = (scopeType, action) => {
    action.componentScope = scopeType;
    if (scopeType === "current") {
      action.component = [];
    }
    _data.events = tabpanes;
    props.onChange();
  };
  const selectComponentChange = (val, option, action) => {
    val = val.map((item) => item.value);
    action.action = null;
    action.state = null;
    action.panelStates = [];
    action.componentConfig = [];
    action.component = val;
    _data.events = tabpanes;
    if (action.action === "updateConfig") {
      action.action = "show";
    }
    if (action.component.length === 1) {
      const layerId = action.component[0];
      const layer = findLayerById(
        action.componentScope === "global" ? bar.fullAmountLayers : bar.layers,
        layerId
      );
      if ("panelType" in layer) {
        if ([0, 1, 2].includes(layer.panelType)) {
          action.layerType = "panel";
        } else {
          action.layerType = "group";
        }
      } else if ("modules" in layer) {
        action.layerType = "group";
      } else {
        action.layerType = "component";
      }
    } else {
      action.layerType = "group";
    }
    props.onChange();
  };
  const selectComponentSelect = (val, option, action) => {
    // if (action.component.length === 1) {
    //   if ('panelType' in option) {
    //     if (option.panelType === 0) {
    //       setLayerType('dynamicPanel')
    //     }
    //   } else if ('modules' in option) {
    //     setLayerType('group')
    //   } else {
    //     setLayerType('component')
    //   }
    // } else {
    //   setLayerType('group')
    // }
  };

  const actionTypeChange = (val, action) => {
    action.action = val;
    if (action.action === "updateStatus") {
      // const panel = findLayerById(bar.fullAmountLayers, action.component[0]);
      // action.panelStates = panel.modules.map((item) => ({ name: item.name, id: item.id }));
      action.panelStates = bar.fullAmountDashboardDetails
        .find((item) => item.id === action.component[0])
        .states.map((item) => ({ name: item.name, id: item.id }));
    } else {
      action.panelStates = [];
    }
    _data.events = tabpanes;
    props.onChange();
  };

  const panelStatusChange = (val, action) => {
    action.state = val;
    _data.events = tabpanes;
    props.onChange();
  };

  const animationTypeChange = (e, action) => {
    action.animation.type = e;
    _data.events = tabpanes;
    props.onChange();
  };

  const translateXchange = debounce((e, action) => {
    action.translate.toX = e;
    _data.events = tabpanes;
    props.onChange();
  }, 300);

  const translateYchange = debounce((e, action) => {
    action.translate.toY = e;
    _data.events = tabpanes;
    props.onChange();
  }, 300);

  const sacleOriginChange = (e, action) => {
    action.scale.origin = e;
    _data.events = tabpanes;
    props.onChange();
  };

  const scaleXchange = debounce((e, action) => {
    action.scale.x = e / 100;
    if (action.scale.lock) {
      action.scale.y = (e / 100 / scaleProportion).toFixed(2);
      form.setFieldsValue({
        [action.id + "scaley"]: (e / 100 / scaleProportion).toFixed(2) * 100,
      });
    }
    const tabpanesNew = [...tabpanes];
    setTabpanes(tabpanesNew);
    _data.events = tabpanes;
    props.onChange();
  }, 300);

  const scaleYchange = debounce((e, action) => {
    action.scale.y = e / 100;
    if (action.scale.lock) {
      action.scale.x = ((e / 100) * scaleProportion).toFixed(2);
      form.setFieldsValue({
        [action.id + "scalex"]: ((e / 100) * scaleProportion).toFixed(2) * 100,
      });
    }
    const tabpanesNew = [...tabpanes];
    setTabpanes(tabpanesNew);
    _data.events = tabpanes;
    props.onChange();
  }, 300);

  const scaleLockChange = (e, action) => {
    e.preventDefault();
    action.scale.lock = !action.scale.lock;
    if (action.scale.lock) {
      setScaleProportion(action.scale.x / action.scale.y);
    }
    _data.events = tabpanes;
    props.onChange();
  };

  const rotateChange = debounce((e, action, direction, el) => {
    action.rotate[`rotate${direction}`] = e;
    if (el === "slider") {
      form.setFieldsValue({
        [action.id + `rotate${direction}-input`]: e,
      });
    } else {
      form.setFieldsValue({
        [action.id + `rotate${direction}-slider`]: e,
      });
    }
    _data.events = tabpanes;
    props.onChange();
  }, 300);

  const perspectiveChange = (e, action) => {
    const checked = e.target.checked;
    action.rotate.perspective = checked;
    _data.events = tabpanes;
    props.onChange();
  };

  const timingFunctionChange = (e, action) => {
    action.animation.timingFunction = e;
    _data.events = tabpanes;
    props.onChange();
  };
  const durationChange = (e, action) => {
    const value = parseInt(e.target.value);
    action.animation.duration = value;
    _data.events = tabpanes;
    props.onChange();
  };
  const delayChange = (e, action) => {
    const value = parseInt(e.target.value);
    action.animation.delay = value;
    _data.events = tabpanes;
    props.onChange();
  };

  const unmountChange = (e, action) => {
    const checked = e.target.checked;
    action.unmount = checked;
    _data.events = tabpanes;
    props.onChange();
  };

  const collapseChange = (e) => {
    setActiveCollapseKey(e);
  };

  const actionsCollapseChange = (e) => {
    setActiveActionsCollapseKey(e);
  };

  const handleUpDateConfig = (e, action) => {
    setCurrentAction(action);
    let component = bar.fullAmountComponents.find((item) => item.id === action.component[0]);
    setCopyComponentConfig(deepClone(component));
    let componentConfig = deepClone(component);
    if ("componentConfig" in action && action.componentConfig.length > 0) {
      componentConfig = {
        ...componentConfig,
        config: [
          ...componentConfig.config.filter((item) =>
            ["dimension", "hideDefault"].includes(item.name)
          ),
          ...action.componentConfig,
        ],
      };
      component.config = deepClone(componentConfig.config);
      dispatch({
        type: "bar/save",
      });
    }
    setComponentVisible(true);
    setComponentConfig(componentConfig);
  };

  const handleComponentStyleChange = (data) => {
    currentAction.componentConfig = deepClone(data);
    let component = bar.fullAmountComponents.find((item) => item.id === currentAction.component[0]);
    component.config = deepClone([
      ...component.config.filter((item) => ["dimension", "hideDefault"].includes(item.name)),
      ...currentAction.componentConfig,
    ]);
    _data.events = tabpanes;
    props.onChange(true);
    dispatch({
      type: "bar/save",
      payload: {
        componentConfig: component,
      },
    });
  };

  const handleComponentClose = () => {
    let component = bar.fullAmountComponents.find((item) => item.id === currentAction.component[0]);
    component.config = copyComponentConfig.config;
    dispatch({
      type: "bar/save",
    });
    setComponentVisible(false);
  };

  return (
    <Form className="custom-form event-form" form={form} {...formItemLayout} colon={false}>
      <Collapse activeKey={activeCollapseKey} onChange={collapseChange} className="custom-collapse">
        <Panel header="自定义事件" key="1" extra={eventExtra()}>
          {tabpanes.length ? (
            <Tabs hideAdd onChange={tabsChange} activeKey={activeTab}>
              {tabpanes.map((pane) => (
                <TabPane tab={pane.name} key={pane.id}>
                  <Form.Item name="trigger" label="事件类型">
                    <Select
                      className="custom-select"
                      placeholder="请选择"
                      defaultValue={pane.trigger}
                      style={{ marginBottom: 0 }}
                      onChange={(e) => eventTypeChange(e, pane)}
                      getPopupContainer={(triggerNode) => triggerNode.parentNode}
                    >
                      {/*{_data.triggers.map((item) => {*/}
                      {/*{eventTypes.map((item) => {*/}
                      {_data.triggers.map((item) => {
                        return (
                          <Option value={item.value} key={item.value}>
                            {item.name}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                  <Form.Item name="conditions" label="条件">
                    <div
                      className="conditon-wraper"
                      style={{ paddingLeft: pane.conditions.length > 1 ? "36px" : "8px" }}
                    >
                      {pane.conditions.length ? (
                        <div
                          className={[
                            "conditon-list",
                            pane.conditions.length <= 1 ? "no-before" : null,
                          ].join(" ")}
                        >
                          {pane.conditions.length > 1 ? (
                            <div className="conditon-type">
                              {`${pane.conditionType === "all" ? "且" : "或"}`}
                            </div>
                          ) : null}
                          {pane.conditions.map((cond) => {
                            return (
                              <div
                                className="cond"
                                key={cond.id}
                                onClick={() => {
                                  showConditionDetail(cond);
                                }}
                              >
                                <span className="conditon-name">{cond.name}</span>
                                <span>&gt;</span>
                              </div>
                            );
                          })}
                        </div>
                      ) : null}
                      <Button style={{ width: "100%" }} type="primary" onClick={addConditon} ghost>
                        添加条件
                      </Button>
                    </div>
                  </Form.Item>
                  <Collapse
                    activeKey={activeActionsCollapseKey}
                    onChange={actionsCollapseChange}
                    className="custom-collapse action-collapse"
                    defaultActiveKey={["1"]}
                  >
                    <Panel header="动作" key="1" extra={actionExtra()}>
                      {pane.actions.length > 0 ? (
                        <Tabs hideAdd onChange={actionTabsChange} activeKey={activeActionTab}>
                          {pane.actions.map((action) => (
                            <TabPane tab={action.name} key={action.id}>
                              <Form.Item label="组件">
                                <div className="action-component">
                                  <Radio.Group
                                    value={action.componentScope}
                                    className="zoom-set"
                                    style={{ marginBottom: "8px" }}
                                    onChange={(e) => {
                                      componentScopeChange(e.target.value, action);
                                    }}
                                  >
                                    <Space direction="horizontal">
                                      <Radio
                                        value="current"
                                        key="current"
                                        style={{ float: "left" }}
                                      >
                                        当前
                                      </Radio>
                                      <Radio value="global" key="global" style={{ float: "left" }}>
                                        全局
                                      </Radio>
                                    </Space>
                                  </Radio.Group>
                                  <TreeSelect
                                    treeData={
                                      action.componentScope === "global"
                                        ? bar.fullAmountLayers
                                        : bar.layers
                                    }
                                    fieldNames={{
                                      key: "id",
                                      children: "modules",
                                      label: "name",
                                      value: "id",
                                    }}
                                    onChange={(val, option) => {
                                      selectComponentChange(val, option, action);
                                    }}
                                    treeCheckable={true}
                                    treeCheckStrictly={true}
                                    labelInValue={false}
                                    showCheckedStrategy={SHOW_PARENT}
                                    value={action.component}
                                    placeholder=""
                                    style={{ width: "100%" }}
                                    dropdownClassName="action-select"
                                  />
                                </div>
                              </Form.Item>
                              <Form.Item label="动作">
                                <Select
                                  className="custom-select"
                                  placeholder="请选择"
                                  value={action.action}
                                  style={{ marginBottom: 0 }}
                                  onChange={(e) => actionTypeChange(e, action)}
                                  getPopupContainer={(triggerNode) => triggerNode.parentNode}
                                >
                                  {actionTypes
                                    .filter((item) => {
                                      if (action.component.length === 0) {
                                        return true;
                                      }
                                      if (action.layerType === "panel") {
                                        return !["updateConfig"].includes(item.value);
                                      }
                                      if (action.layerType === "component") {
                                        return !["updateStatus"].includes(item.value);
                                      }
                                      if (action.layerType === "group") {
                                        return !["updateStatus", "updateConfig"].includes(
                                          item.value
                                        );
                                      }
                                    })
                                    .map((item) => {
                                      return (
                                        <Option value={item.value} key={item.value}>
                                          {item.name}
                                        </Option>
                                      );
                                    })}
                                </Select>
                              </Form.Item>
                              {action.action === "updateConfig" ? (
                                <Form.Item label="">
                                  <Button
                                    style={{ float: "left", left: 80 }}
                                    onClick={(e) => handleUpDateConfig(e, action)}
                                  >
                                    编辑组件配置
                                  </Button>
                                </Form.Item>
                              ) : action.action === "updateStatus" ? (
                                <Form.Item label="状态">
                                  <Select
                                    className="custom-select"
                                    placeholder="请选择"
                                    value={action.state}
                                    style={{ marginBottom: 0 }}
                                    onChange={(e) => panelStatusChange(e, action)}
                                    getPopupContainer={(triggerNode) => triggerNode.parentNode}
                                  >
                                    {action.panelStates.map((state) => (
                                      <Option value={state.id} key={state.id}>
                                        {state.name}
                                      </Option>
                                    ))}
                                  </Select>
                                </Form.Item>
                              ) : action.action === "translate" ? (
                                <Form.Item label="移动">
                                  <div className="translate-x" style={{ marginRight: "8px" }}>
                                    <InputNumber
                                      step="1"
                                      max={10000}
                                      className="size-input sc-input"
                                      style={{ width: "100%" }}
                                      defaultValue={action.translate.toX}
                                      onChange={(e) => translateXchange(e, action)}
                                    />
                                    <div className="ant-input-group-addon input-num-suffix">X</div>
                                  </div>
                                  <div className="translate-y">
                                    <InputNumber
                                      step="1"
                                      max={10000}
                                      className="size-input sc-input"
                                      style={{ width: "100%" }}
                                      defaultValue={action.translate.toY}
                                      onChange={(e) => translateYchange(e, action)}
                                    />
                                    <div className="ant-input-group-addon input-num-suffix">Y</div>
                                  </div>
                                </Form.Item>
                              ) : action.action === "scale" ? (
                                <React.Fragment>
                                  <Form.Item label="缩放原点">
                                    <OriginSelect
                                      psValue={action.scale.origin}
                                      onChange={(e) => sacleOriginChange(e, action)}
                                    />
                                  </Form.Item>
                                  <Form.Item label="缩放比例">
                                    <div className="scale-x">
                                      <Form.Item
                                        name={action.id + "scalex"}
                                        style={{ marginBottom: 0 }}
                                      >
                                        <InputNumber
                                          step="1"
                                          min={-1000}
                                          max={1000}
                                          className="size-input sc-input"
                                          style={{ width: "100%" }}
                                          defaultValue={action.scale.x * 100}
                                          onChange={(e) => scaleXchange(e, action)}
                                        />
                                      </Form.Item>
                                      <div className="ant-input-group-addon input-num-suffix">
                                        %
                                      </div>
                                    </div>
                                    <span
                                      className="scale-lock"
                                      onClick={(e) => scaleLockChange(e, action)}
                                    >
                                      {action.scale.lock ? (
                                        <i className="iconfont icon-lock"></i>
                                      ) : (
                                        <i className="iconfont icon-unlock"></i>
                                      )}
                                    </span>
                                    <div className="scale-y">
                                      <Form.Item
                                        name={action.id + "scaley"}
                                        style={{ marginBottom: 0 }}
                                      >
                                        <InputNumber
                                          step="1"
                                          min={-1000}
                                          max={1000}
                                          className="size-input sc-input"
                                          style={{ width: "100%" }}
                                          defaultValue={action.scale.y * 100}
                                          onChange={(e) => scaleYchange(e, action)}
                                        />
                                      </Form.Item>
                                      <div className="ant-input-group-addon input-num-suffix">
                                        %
                                      </div>
                                    </div>
                                    <Row style={{ clear: "both" }}>
                                      <Col
                                        span={12}
                                        className="detail-txt"
                                        style={{ textIndent: "0" }}
                                      >
                                        X
                                      </Col>
                                      <Col
                                        span={12}
                                        className="detail-txt"
                                        style={{ textIndent: "10px" }}
                                      >
                                        Y
                                      </Col>
                                    </Row>
                                  </Form.Item>
                                </React.Fragment>
                              ) : action.action === "rotate" ? (
                                <React.Fragment>
                                  <Form.Item label="旋转">
                                    <div className="rotate-item">
                                      <div className="rotate-slider">
                                        <Form.Item
                                          name={action.id + "rotateX-slider"}
                                          style={{ marginBottom: 0 }}
                                        >
                                          <Slider
                                            min={-180}
                                            max={180}
                                            step={1}
                                            tooltipVisible={false}
                                            onAfterChange={(e) =>
                                              rotateChange(e, action, "X", "slider")
                                            }
                                            defaultValue={action.rotate.rotateX}
                                          />
                                        </Form.Item>
                                      </div>
                                      <div className="rotate-number">
                                        <Form.Item
                                          name={action.id + "rotateX-input"}
                                          style={{ marginBottom: 0 }}
                                        >
                                          <InputNumber
                                            min={-180}
                                            max={180}
                                            step={1}
                                            className="size-input"
                                            style={{ width: "100%" }}
                                            defaultValue={action.rotate.rotateX}
                                            onChange={(e) => rotateChange(e, action, "X", "input")}
                                          />
                                        </Form.Item>
                                        <div className="ant-input-group-addon input-num-suffix">
                                          °
                                        </div>
                                      </div>
                                      <Row style={{ clear: "both" }}>
                                        <Col
                                          span={24}
                                          className="detail-txt"
                                          style={{ textIndent: "0" }}
                                        >
                                          绕X轴
                                        </Col>
                                      </Row>
                                    </div>
                                    <div className="rotate-item">
                                      <div className="rotate-slider">
                                        <Form.Item
                                          name={action.id + "rotateY-slider"}
                                          style={{ marginBottom: 0 }}
                                        >
                                          <Slider
                                            min={-180}
                                            max={180}
                                            step={1}
                                            tooltipVisible={false}
                                            onAfterChange={(e) =>
                                              rotateChange(e, action, "Y", "slider")
                                            }
                                            defaultValue={action.rotate.rotateY}
                                          />
                                        </Form.Item>
                                      </div>
                                      <div className="rotate-number">
                                        <Form.Item
                                          name={action.id + "rotateY-input"}
                                          style={{ marginBottom: 0 }}
                                        >
                                          <InputNumber
                                            min={-180}
                                            max={180}
                                            step={1}
                                            className="size-input"
                                            style={{ width: "100%" }}
                                            defaultValue={action.rotate.rotateY}
                                            onChange={(e) => rotateChange(e, action, "Y", "input")}
                                          />
                                        </Form.Item>
                                        <div className="ant-input-group-addon input-num-suffix">
                                          °
                                        </div>
                                      </div>
                                      <Row style={{ clear: "both" }}>
                                        <Col
                                          span={24}
                                          className="detail-txt"
                                          style={{ textIndent: "0" }}
                                        >
                                          绕Y轴
                                        </Col>
                                      </Row>
                                    </div>
                                    <div className="rotate-item">
                                      <div className="rotate-slider">
                                        <Form.Item
                                          name={action.id + "rotateZ-slider"}
                                          style={{ marginBottom: 0 }}
                                        >
                                          <Slider
                                            min={-180}
                                            max={180}
                                            step={1}
                                            tooltipVisible={false}
                                            onAfterChange={(e) =>
                                              rotateChange(e, action, "Z", "slider")
                                            }
                                            defaultValue={action.rotate.rotateZ}
                                          />
                                        </Form.Item>
                                      </div>
                                      <div className="rotate-number">
                                        <Form.Item
                                          name={action.id + "rotateZ-input"}
                                          style={{ marginBottom: 0 }}
                                        >
                                          <InputNumber
                                            min={-180}
                                            max={180}
                                            step={1}
                                            className="size-input"
                                            style={{ width: "100%" }}
                                            defaultValue={action.rotate.rotateZ}
                                            onChange={(e) => rotateChange(e, action, "Z", "input")}
                                          />
                                        </Form.Item>
                                        <div className="ant-input-group-addon input-num-suffix">
                                          °
                                        </div>
                                      </div>
                                      <Row style={{ clear: "both" }}>
                                        <Col
                                          span={24}
                                          className="detail-txt"
                                          style={{ textIndent: "0" }}
                                        >
                                          绕Z轴
                                        </Col>
                                      </Row>
                                    </div>
                                  </Form.Item>
                                  {/*                                  <Form.Item label="透视">
                                    <Checkbox
                                      style={{ float: "left" }}
                                      defaultChecked={action.rotate.perspective}
                                      onChange={(e) => {
                                        perspectiveChange(e, action);
                                      }}
                                    />
                                  </Form.Item>
                                  */}
                                </React.Fragment>
                              ) : (
                                <Form.Item label="动画类型">
                                  <Select
                                    className="custom-select"
                                    placeholder="请选择"
                                    defaultValue={action.animation.type}
                                    style={{ marginBottom: 0 }}
                                    onChange={(e) => animationTypeChange(e, action)}
                                    getPopupContainer={(triggerNode) => triggerNode.parentNode}
                                  >
                                    {animationType.map((item) => (
                                      <Option value={item.value} key={item.value}>
                                        {item.name}
                                      </Option>
                                    ))}
                                  </Select>
                                </Form.Item>
                              )}

                              {action.action !== "updateStatus" ? (
                                <>
                                  <Form.Item label="速率">
                                    <Select
                                      className="custom-select"
                                      placeholder="请选择"
                                      defaultValue={action.animation.timingFunction}
                                      style={{ marginBottom: 0 }}
                                      onChange={(e) => timingFunctionChange(e, action)}
                                      getPopupContainer={(triggerNode) => triggerNode.parentNode}
                                    >
                                      {timingFunctionType.map((item) => {
                                        return (
                                          <Option value={item.value} key={item.value}>
                                            {item.name}
                                          </Option>
                                        );
                                      })}
                                    </Select>
                                  </Form.Item>
                                  <Form.Item label="动画时长">
                                    <InputNumber
                                      className="po-size-input sc-input"
                                      min={0}
                                      max={1000000}
                                      step={100}
                                      style={{ width: "100%" }}
                                      defaultValue={action.animation.duration}
                                      onBlur={(e) => durationChange(e, action)}
                                    />
                                    <div
                                      className="ant-input-group-addon input-num-suffix"
                                      style={{ fontSize: 12 }}
                                    >
                                      ms
                                    </div>
                                  </Form.Item>
                                </>
                              ) : (
                                <></>
                              )}

                              <Form.Item label="延时">
                                <InputNumber
                                  className="po-size-input  sc-input"
                                  min={0}
                                  max={1000000}
                                  step={100}
                                  style={{ width: "100%" }}
                                  defaultValue={action.animation.delay}
                                  onBlur={(e) => delayChange(e, action)}
                                />
                                <div
                                  className="ant-input-group-addon input-num-suffix"
                                  style={{ fontSize: 12 }}
                                >
                                  ms
                                </div>
                              </Form.Item>
                              {["show", "hide", "show/hide"].includes(action.action) ? (
                                <Form.Item label="隐藏卸载">
                                  <Checkbox
                                    style={{ float: "left" }}
                                    defaultChecked={action.unmount}
                                    onChange={(e) => {
                                      unmountChange(e, action);
                                    }}
                                  />
                                </Form.Item>
                              ) : null}
                            </TabPane>
                          ))}
                        </Tabs>
                      ) : (
                        "列表为空"
                      )}
                    </Panel>
                  </Collapse>
                </TabPane>
              ))}
            </Tabs>
          ) : (
            "列表为空"
          )}
        </Panel>
      </Collapse>
      <EventDrawer
        expandKey={activeId}
        visible={drawerVisible}
        onClose={drawerClose}
        data={activePane}
        confirm={setCondition}
        setConditionType={setConditionType}
      />
      <UpdateComponentConfigDrawer
        visible={componentVisible}
        onClose={(value) => handleComponentClose(value)}
        onStyleChange={(data) => handleComponentStyleChange(data)}
        componentConfig={componentConfig}
      />
    </Form>
  );
};

export default connect(({ bar }) => ({
  bar,
}))(CusEvent);
