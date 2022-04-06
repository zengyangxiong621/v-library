import React, { memo, useState, useEffect } from 'react';
import './index.less'
import { v4 as uuidv4 } from 'uuid';
import CusSelect from '../cusSelect'

import {
  Form,
  Select,
  Tabs,
  Slider,
  InputNumber,
  Collapse, 
  Button 
} from 'antd';


import {
  PlusCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

const CusEvent = props => {
  const { Panel } = Collapse;
  const { TabPane } = Tabs;
  const { Option } = Select;
  const [form] = Form.useForm();
  const formItemLayout = {
    labelAlign: 'left'
  };

  const _data = props.data
  const [activeTab, setActiveTab] = useState(null)
  const [tabpanes, setTabpanes] = useState([])

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


  const genExtra = () => (
    <React.Fragment>
      <PlusCircleOutlined onClick={addEvent} style={{ marginRight: '8px' }} />
      <DeleteOutlined onClick={deleteEvent} />
    </React.Fragment>
  );

  const addEvent = (e) => {
    e.stopPropagation();
    const panes = [...tabpanes]
    const key = uuidv4()
    panes.push({
      trigger: 'dataChange',
      name: `事件${panes.length + 1}`,
      id: key,
      conditions: [],
      conditionType: 'all',
      actions: [
        {
          id: uuidv4(),
          name: '动作',
          component: [],
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
    setActiveTab(key)
  }

  const deleteEvent = () => {

  }

  const tabsChange = key => {
    setActiveTab(key)
  }

  const eventTypeChange = (e, pane) => {
    console.log('e', e,pane)
    pane.trigger = e
  }


  return (
    <Form
      className="custom-form event-form"
      form={form}
      {...formItemLayout}
      colon={false}
    >
      <Collapse accordion className="custom-collapse">
        <Panel header="自定义事件" key="1" extra={genExtra()}>
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
                  <div className="conditon-wraper">
                    <Button>添加条件</Button>
                  </div>
                </Form.Item>
              </TabPane>
            ))}
          </Tabs> : '列表为空'}
        </Panel>
      </Collapse>
    </Form>
  )
}

export default memo(CusEvent)