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

const actionTypes = [
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

  useEffect(() => {
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
    console.log('e', e, pane)
    pane.action = e
    _data.callbackArgs = tabpanes
    props.onChange()
  }

  const originChange = (e, pane) => {
    console.log('e', e)
    pane.origin = e.target.value
    _data.callbackArgs = tabpanes
    props.onChange()
  }

  const targetChange = (e, pane) => {
    pane.target = e.target.value
    _data.callbackArgs = tabpanes
    props.onChange()
  }

  return (
    <Form
      className="custom-form callbackArgs-form"
      form={form}
      {...formItemLayout}
      colon={false}
    >
      <Collapse className="custom-collapse">
        <Panel header="回调参数" key="1" extra={callbackExtra()}>
          {
            tabpanes.length ? <Tabs
              hideAdd
              onChange={tabsChange}
              activeKey={activeTab}>
              {tabpanes.map(pane => (
                <TabPane tab={pane.name} key={pane.id}>
                  {/* <Form.Item
                    name="action"
                    label='匹配动作'
                  >
                    <Select
                      className="custom-select"
                      placeholder="请选择"
                      defaultValue={pane.action}
                      style={{ marginBottom: 0 }}
                      onChange={e => actionChange(e, pane)}
                    >
                      {actionTypes.map((item) => {
                        return <Option value={item.value} key={item.value}>{item.name}</Option>
                      })}
                    </Select>
                  </Form.Item> */}
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