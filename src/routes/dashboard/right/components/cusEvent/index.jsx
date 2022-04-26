import React, { memo, useState, useEffect } from 'react';
import './index.less'
import { connect } from 'dva'
import { v4 as uuidv4 } from 'uuid';
import EventDrawer from '../eventDrawer'

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
  Checkbox
} from 'antd';

import {
  PlusCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

const CusEvent = ({bar, dispatch ,...props }) => {
  const { Panel } = Collapse;
  const { TabPane } = Tabs;
  const { Option } = Select;
  const [form] = Form.useForm();
  const formItemLayout = {
    labelAlign: 'left'
  };
  const { SHOW_PARENT } = TreeSelect;

  const _data = props.data || {}
  const [customEventCollapseActiveKey,setCustomEventCollapseActiveKey]=useState([])
  const [activeTab, setActiveTab] = useState(null)
  const [tabpanes, setTabpanes] = useState(_data?.events || [])
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [activePane, setActivePane] = useState(null)
  const [activeId, setActiveId] = useState(null)
  const [activeActionTab, setActiveActionTab] = useState(null)

  const eventTypes = [
    {
      name: '当请求完成或数据变化时',
      value: 'dataChange'
    },
    {
      name: '鼠标点击',
      value: 'click'
    },
    {
      name: '鼠标移入',
      value: 'mouseEnter'
    },
    {
      name: '鼠标移出',
      value: 'mouseLeave'
    },
  ]

  const actionTypes = [
    {
      name: '显示',
      value: 'show'
    },
    {
      name: '隐藏',
      value: 'hide'
    },
  ]

  const animationType = [
    {
      name: '渐隐渐现',
      value: 'opacity'
    },
    {
      name: '向左移动',
      value: 'slideLeft'
    },
    {
      name: '向右移动',
      value: 'slideRight'
    },
    {
      name: '向上移动',
      value: 'slideTop'
    },
    {
      name: '向下移动',
      value: 'slideBottom'
    },
  ]

  const timingFunctionType = [
    {
      name: '匀速',
      value: 'linear'
    },
    {
      name: '慢快慢',
      value: 'ease'
    },
    {
      name: '低速开始',
      value: 'ease-in'
    },
    {
      name: '低速结束',
      value: 'ease-out'
    },
    {
      name: '低速开始和结束',
      value: 'ease-in-out'
    },
  ]


  const eventExtra = () => (
    <React.Fragment>
      <PlusCircleOutlined onClick={addEvent} style={{ marginRight: '8px' }} />
      <DeleteOutlined onClick={deleteEvent} />
    </React.Fragment>
  );

  const addEvent = (e) => {
    e.stopPropagation();
    setCustomEventCollapseActiveKey(['1'])
    const panes = [...tabpanes]
    const eventId = uuidv4()
    const actionId = uuidv4()
    panes.push({
      trigger: 'dataChange',
      name: `事件${panes.length + 1}`,
      id: eventId,
      conditions: [

      ],
      conditionType: 'all',
      actions: [
        {
          id: actionId,
          name: '动作1',
          action: 'show',
          component: [],
          componentScope: 'current',
          animation: {
            "type": "slideLeft",
            "timingFunction": "ease",
            "duration": 1000,
            "delay": 0
          }
        }
      ]
    });
    setTabpanes(panes)
    setActiveTab(eventId)
    const activePane = panes.find(item => { return item.id === eventId })
    setActivePane(activePane)
    setActiveActionTab(actionId)
    _data.events = panes
    props.onChange()
  }

  const deleteEvent = (e) => {
    e.stopPropagation();
    const panes = tabpanes.filter(pan => {
      return pan.id !== activeTab
    })
    panes.forEach((item, index) => {
      item.name = `事件${index + 1}`
    })
    setTabpanes(panes)
    setActiveTab(panes.length ? panes[0].id : null)
    setActivePane(panes.length ? panes[0] : null)
    _data.events = panes
    props.onChange()
  }

  const tabsChange = key => {
    setActiveTab(key)
    const activePane = tabpanes.find(item => { return item.id === key })
    setActivePane(activePane)
    setActiveActionTab(activePane.actions.length? activePane.actions[0].id : null)
  }

  // 事件类型
  const eventTypeChange = (e, pane) => {
    console.log('e', e, pane)
    pane.trigger = e
    _data.events = tabpanes
    props.onChange()
  }

  // 添加条件
  const addConditon = () => {
    setDrawerVisible(true)
  }

  const drawerClose = () => {
    setDrawerVisible(false)
    setActiveId(false)
  }

  const setCondition = (val) => {
    console.log('setCondition', val)
    const curPane = tabpanes.find(item => {
      return item.id === activeTab
    })
    curPane.conditions = val
    const activePane = tabpanes.find(item => { return item.id === activeTab })
    setActivePane(activePane)
    _data.events = tabpanes
    props.onChange()
  }

  const setConditionType = (val) => {
    const curPane = tabpanes.find(item => {
      return item.id === activeTab
    })
    curPane.conditionType = val
    const activePane = tabpanes.find(item => { return item.id === activeTab })
    setActivePane(activePane)
    _data.events = tabpanes
    props.onChange()
  }

  const showConditionDetail = (cond) => {
    setDrawerVisible(true)
    setActiveId(cond.id)
  }

  const actionExtra = () => (
    <React.Fragment>
      <PlusCircleOutlined onClick={addAction} style={{ marginRight: '8px' }} />
      <DeleteOutlined onClick={deletAction} />
    </React.Fragment>
  );

  const addAction = (e) => {
    e.stopPropagation()
    const panes = [...tabpanes]
    const pane = panes.find(item => { return item.id === activeTab })
    const id = uuidv4()
    pane.actions.push({
      id,
      name: `动作${pane.actions.length + 1}`,
      component: [],
      action: 'show',
      componentScope: "current",
      animation: {
        "type": "slideLeft",
        "timingFunction": "ease",
        "duration": 1000,
        "delay": 0
      }
    })
    setTabpanes(panes)
    setActiveActionTab(id)
    _data.events = panes
    props.onChange()
  }

  const deletAction = (e) => {
    e.stopPropagation();
    const panes = [...tabpanes]
    const pane = panes.find(item => { return item.id === activeTab })
    const actions = pane.actions.filter(item => {
      return item.id !== activeActionTab
    })
    actions.forEach((item, index) => {
      item.name = `动作${index + 1}`
    })
    pane.actions = actions
    setTabpanes(panes)
    setActiveActionTab(pane.actions.length ? pane.actions[0].id : null)
    _data.events = panes
    props.onChange()
  }

  const actionTabsChange = (key) => {
    setActiveActionTab(key)
  }

  const componentScopeChange = (val, action) => {
    action.componentScope = val
    _data.events = tabpanes
    props.onChange()
  }
  const selectComponentChange = (val, action) => {
    console.log('val',val)
    action.component = val
    _data.events = tabpanes
    props.onChange()
  }

  const actionTypeChange = (val, action) => {
    action.action = val
    _data.events = tabpanes
    props.onChange()
  }

  const animationTypeChange = (e, action) => {
    action.animation.type = e
    _data.events = tabpanes
    props.onChange()
  }
  const timingFunctionChange = (e, action) => {
    action.animation.timingFunction = e
    _data.events = tabpanes
    props.onChange()
  }
  const durationChange = (e, action) => {
    const value = parseInt(e.target.value)
    action.animation.duration = value
    _data.events = tabpanes
    props.onChange()
  }
  const delayChange = (e, action) => {
    const value = parseInt(e.target.value)
    action.animation.delay = value
    _data.events = tabpanes
    props.onChange()
  }

  const unmountChange = (e, action) => {
    const checked = e.target.checked
    action.unmount = checked
    _data.events = tabpanes
    props.onChange()
  }


  return (
    <Form
      className="custom-form event-form"
      form={form}
      {...formItemLayout}
      colon={false}
    >
      <Collapse className="custom-collapse">
        <Panel header="自定义事件" key="1" extra={eventExtra()}>
          {tabpanes.length ? <Tabs
            hideAdd
            onChange={tabsChange}
            activeKey={activeTab}
          >
            {tabpanes.map(pane => (
              <TabPane tab={pane.name} key={pane.id}>
                <Form.Item
                  name="trigger"
                  label='事件类型'
                >
                  <Select
                    className="custom-select"
                    placeholder="请选择"
                    defaultValue={pane.trigger}
                    style={{ marginBottom: 0 }}
                    onChange={e => eventTypeChange(e, pane)}
                  >
                    {eventTypes.map((item) => {
                      return <Option value={item.value} key={item.value}>{item.name}</Option>
                    })}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="conditions"
                  label='条件'
                >
                  <div className="conditon-wraper"
                    style={{ paddingLeft: (pane.conditions.length > 1) ? "36px" : "8px" }}
                  >
                    {pane.conditions.length ?
                      <div
                        className={['conditon-list', pane.conditions.length <= 1 ? 'no-before' : null].join(' ')}
                      >
                        {
                          pane.conditions.length > 1 ?
                            <div className="conditon-type">
                              {`${pane.conditionType === 'all' ? '且' : '或'}`}
                            </div>
                            : null
                        }
                        {pane.conditions.map(cond => {
                          return <div className="cond" key={cond.id} onClick={() => { showConditionDetail(cond) }}>
                            <span className="conditon-name">{cond.name}</span>
                            <span>&gt;</span>
                          </div>
                        })}
                      </div>
                      : null
                    }
                    <Button style={{ width: '100%' }} type="primary" onClick={addConditon} ghost>添加条件</Button>
                  </div>
                </Form.Item>
                <Collapse className="custom-collapse action-collapse" defaultActiveKey={['1']}>
                  <Panel header="动作" key="1" extra={actionExtra()}>
                    {pane.actions.length > 0 ?
                      <Tabs
                        hideAdd
                        onChange={actionTabsChange}
                        activeKey={activeActionTab}
                      >
                        {pane.actions.map(action => (
                          <TabPane tab={action.name} key={action.id}>
                            <Form.Item label='组件'>
                              <div className="action-component">
                                <Radio.Group
                                  defaultValue={action.componentScope}
                                  className="zoom-set"
                                  style={{ marginBottom: '8px' }}
                                  onChange={val => { componentScopeChange(val, action) }}>
                                  <Space direction='horizontal'>
                                    <Radio value='current' key='current' style={{ float: 'left' }}>当前</Radio>
                                    <Radio value='global' key='global' style={{ float: 'left' }}>全局</Radio>
                                  </Space>
                                </Radio.Group>
                                <TreeSelect
                                  treeData={bar.treeData}
                                  fieldNames={
                                    { key: 'id', children: 'modules',label:'name', value:'id' }
                                  }
                                  onChange={val => { selectComponentChange(val, action) }}
                                  treeCheckable={true}
                                  showCheckedStrategy={SHOW_PARENT}
                                  placeholder=''
                                  style={{ width: '100%' }}
                                  dropdownClassName="action-select"
                                />
                              </div>
                            </Form.Item>
                            <Form.Item label='动作'>
                              <Select
                                className="custom-select"
                                placeholder="请选择"
                                defaultValue={action.action}
                                style={{ marginBottom: 0 }}
                                onChange={e => actionTypeChange(e, action)}
                              >
                                {actionTypes.map((item) => {
                                  return <Option value={item.value} key={item.value}>{item.name}</Option>
                                })}
                              </Select>
                            </Form.Item>
                            <Form.Item label='动画类型'>
                              <Select
                                className="custom-select"
                                placeholder="请选择"
                                defaultValue={action.animation.type}
                                style={{ marginBottom: 0 }}
                                onChange={e => animationTypeChange(e, action)}
                              >
                                {animationType.map((item) => {
                                  return <Option value={item.value} key={item.value}>{item.name}</Option>
                                })}
                              </Select>
                            </Form.Item>
                            <Form.Item label='速率'>
                              <Select
                                className="custom-select"
                                placeholder="请选择"
                                defaultValue={action.animation.timingFunction}
                                style={{ marginBottom: 0 }}
                                onChange={e => timingFunctionChange(e, action)}
                              >
                                {timingFunctionType.map((item) => {
                                  return <Option value={item.value} key={item.value}>{item.name}</Option>
                                })}
                              </Select>
                            </Form.Item>
                            <Form.Item label='动画时长'>
                              <InputNumber
                                className="po-size-input"
                                min={0}
                                step={1}
                                style={{ width: '100%' }}
                                defaultValue={action.animation.duration}
                                onBlur={e => durationChange(e, action)} />
                            </Form.Item>
                            <Form.Item label='延时'>
                              <InputNumber
                                className="po-size-input"
                                min={0}
                                step={1}
                                style={{ width: '100%' }}
                                defaultValue={action.animation.delay}
                                onBlur={e => delayChange(e, action)} />
                            </Form.Item>
                            <Form.Item label="隐藏卸载">
                              <Checkbox style={{ float: 'left' }}
                                defaultChecked={action.unmount}
                                onChange={e => { unmountChange(e, action) }} />
                            </Form.Item>
                          </TabPane>
                        ))}

                      </Tabs>
                      : '列表为空'}
                  </Panel>
                </Collapse>
              </TabPane>
            ))}
          </Tabs> : '列表为空'}
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
    </Form>
  )
}

export default connect(({ bar }) => ({
  bar
}))(CusEvent)