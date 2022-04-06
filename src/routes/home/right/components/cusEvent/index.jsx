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
  Collapse
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

  const eventTypes = {
    name:"eventTypes",
    displayName:'事件类型',
    type:'select',
    value:'click',
    options:[
        {
            name:'当请求完成或数据变化时',
            value:'dataChange'
        },
        {
            name:'鼠标点击',
            value:'click'
        },
        {
            name:'鼠标移入',
            value:'mouseEnter'
        },
        {
            name:'鼠标移出',
            value:'mouseLeave'
        },
    ]
}


  const genExtra = () => (
    <React.Fragment>
      <PlusCircleOutlined onClick={addEvent} style={{marginRight:'8px'}}/>
      <DeleteOutlined onClick={deleteEvent} />
    </React.Fragment>
  );

  const addEvent = (e) => {
    e.stopPropagation();
    const panes = [...tabpanes]
    const key = uuidv4()
    panes.push({
      title: `事件${panes.length+1}`,
      content: 'New Tab Pane',
      key
    });
    setTabpanes(panes)
    setActiveTab(key)
  }

  const deleteEvent = () => {

  }

  const tabsChange = key => {
    setActiveTab(key)
  }

  const setTrigger = () => {
    console.log('eventTypes',eventTypes)
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
              <TabPane tab={pane.title} key={pane.key}>
                <CusSelect data={eventTypes} onChange={setTrigger}/>
              </TabPane>
            ))}
          </Tabs> : '列表为空'}
        </Panel>
      </Collapse>
    </Form>
  )
}

export default memo(CusEvent)