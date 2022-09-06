import React, { memo, useState, useEffect } from 'react';
import './index.less'
import { connect } from 'dva'

import { v4 as uuidv4 } from 'uuid';

import {
  Form,
  Select,
  Tabs,
  Collapse,
  Input
} from 'antd';

import {
  PlusCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

// TODO 未完成
const CallbackArgs = ({ bar, dispatch, ...props }) => {
  const { Panel } = Collapse;
  const { TabPane } = Tabs;
  const { Option } = Select;
  const [form] = Form.useForm();
  const formItemLayout = {
    labelAlign: 'left'
  };

  const _data = props.data || {}
  const [activeTab, setActiveTab] = useState(null)
  const [tabpanes, setTabpanes] = useState(_data?.callbackArgs || [])
  const [activeCollapseKey,setActiveCollapseKey] = useState(null)

  useEffect(() => {
    console.log(_data,'_data####');
    // 设置值
    setTabpanes(_data.callbackArgs || [])
    if (_data?.callbackArgs?.length) {
      setActiveTab(_data.callbackArgs[0].id)
    }
  }, [])

  const callbackExtra = () => (
    <React.Fragment>
      <PlusCircleOutlined onClick={addCallback} style={{ marginRight: '8px' }} />
      <DeleteOutlined onClick={deleteCallback} />
    </React.Fragment>
  );

  const addCallback = (e) => {
    e.stopPropagation();
    const callbackId = uuidv4()
    const panes = [...tabpanes]
    // 相关值
    panes.push(
      {
        id: callbackId,
        name: `回调${panes.length + 1}`,
        origin: '',
        target: '',
        // action:'click'
      }
    )
    setTabpanes(panes)
    setActiveTab(callbackId)
    _data.callbackArgs = panes
    setActiveCollapseKey(["1"])
    props.onChange()
  }

  const deleteCallback = (e) => {
    e.stopPropagation();
    const panes = tabpanes.filter(pan => {
      return pan.id !== activeTab
    })
    panes.forEach((item, index) => {
      item.name = `回调${index + 1}`
    })
    setTabpanes(panes)
    setActiveTab(panes.length ? panes[0].id : null)
    _data.callbackArgs = panes
    props.onChange()
  }

  const tabsChange = key => {
    setActiveTab(key)
  }

  // 匹配动作
  const actionChange = (e, pane) => {
    pane.action = e
    _data.callbackArgs = tabpanes
    props.onChange()
  }

  const originChange = (e, pane) => {
    console.log(e,pane,'some thing');
    pane.origin = e.target.value
    _data.callbackArgs = tabpanes
    props.onChange()
  }

  const targetChange = (e, pane) => {
    pane.target = e.target.value
    _data.callbackArgs = tabpanes
    props.onChange()
  }

  const collapseChange= (e) => {
    setActiveCollapseKey(e)
  }

  return (
    <Form
      className="custom-form crossCallback-form"
      form={form}
      {...formItemLayout}
      colon={false}
    >
      <Collapse activeKey={activeCollapseKey} onChange={collapseChange} className="custom-collapse">
        <Panel header="发布消息" key="1" extra={callbackExtra()}>
          {
            tabpanes.length ? <Tabs
              hideAdd
              onChange={tabsChange}
              activeKey={activeTab}>
              {tabpanes.map(pane => (
                <TabPane tab={pane.name} key={pane.id}>
                  <Form.Item
                    label='事件名'
                  >
                    <Input className="cus-input" defaultValue={pane.origin} onBlur={e => originChange(e, pane)} />
                  </Form.Item>
                  <Form.Item
                    label='变量名'
                  >
                    <Input className="cus-input" defaultValue={pane.target} onBlur={e => targetChange(e, pane)} />
                  </Form.Item>
                </TabPane>
              ))}
            </Tabs> : '列表为空'
          }
        </Panel>
        <Panel header="订阅消息" key="2" extra={callbackExtra()}>
          {
            tabpanes.length ? <Tabs
              hideAdd
              onChange={tabsChange}
              activeKey={activeTab}>
              {tabpanes.map(pane => (
                <TabPane tab={pane.name} key={pane.id}>
                  <Form.Item
                    label='字段值'
                  >
                    <Input className="cus-input" defaultValue={pane.origin} onBlur={e => originChange(e, pane)} />
                  </Form.Item>
                  <Form.Item
                    label='变量名'
                  >
                    <Input className="cus-input" defaultValue={pane.target} onBlur={e => targetChange(e, pane)} />
                  </Form.Item>
                </TabPane>
              ))}
            </Tabs> : '列表为空'
          }
        </Panel>
      </Collapse>
    </Form>
  )
}

export default connect(({ bar }) => ({
  bar
}))(CallbackArgs)