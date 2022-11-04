import React, { memo, useState, useEffect } from 'react';
import './index.less'
import { connect } from 'dva'

import { v4 as uuidv4 } from 'uuid';
import { http } from '@/services/request.ts'
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
  const [activeKey, setActiveKey] = useState(null)
  const [tabpanes, setTabpanes] = useState(_data.websocketConfig || [])
  const [activeCollapseKey, setActiveCollapseKey] = useState(null)

  useEffect(() => {
    // 设置值
    setTabpanes(_data.websocketConfig || [])
    if (_data.websocketConfig?.length > 0) {
      setActiveKey(_data.websocketConfig[0].id)
      console.log('_data.websocketConfig[0].id', _data.websocketConfig[0].id)
    }
  }, [])

  const callbackExtra = () => (
    <React.Fragment>
      <PlusCircleOutlined onClick={addCallback} style={{ marginRight: '8px' }} />
      <DeleteOutlined onClick={deleteCallback} />
    </React.Fragment>
  );

  const addCallback = async (e) => {
    e.stopPropagation();
    const callbackId = uuidv4()
    const panes = tabpanes
    const data = await http({
      method: 'post',
      url: '/visual/websocket-module/add',
      body: {
        websocketUrl: `ws://${callbackId}`,
        moduleId: _data.id,
        type: 0,
        dashboardId: bar.dashboardId,
      }
    })
    // 相关值
    if (data) {
      panes.push(
        {
          id: data,
          websocketUrl: `ws://${callbackId}`,
          moduleId: _data.id,
          type: 0,
          dashboardId: bar.dashboardId,
        }
      )
      setTabpanes(panes)
      _data.websocketConfig = panes
      props.onChange(_data.websocketConfig)
    }
  }

  const deleteCallback = async (e) => {
    e.stopPropagation();
    const currentPane = tabpanes.find(item => item.id == activeKey)
    const data = await http({
      method: 'delete',
      url: `/visual/websocket-module/delete/${currentPane.id}`,
    })
    if (data) {
      const currentPaneIndex = tabpanes.findIndex(item => item.id === activeKey)
      tabpanes.splice(currentPaneIndex, 1)
      setTabpanes(tabpanes)
      setActiveKey(tabpanes[tabpanes.length - 1].id)
      _data.websocketConfig = tabpanes
      props.onChange(_data.websocketConfig)
    }

  }

  const tabsChange = key => {
    console.log('key', key)
    setActiveKey(key)
  }



  const collapseChange = (e) => {
    setActiveCollapseKey(e)
  }

  const handleChangeType = async (config, pane) => {
    pane = { ...pane, ...config }
    const data = await http({
      method: 'post',
      url: '/visual/websocket-module/update',
      body: {
        ...pane,
        dashboardId: bar.dashboardId
      }
    })
    if (data) {
      _data.websocketConfig = tabpanes
      setTabpanes(tabpanes)
      props.onChange(_data.websocketConfig)
    }
  }
  console.log('activeKey', activeKey)
  return (
    <Form
      className="custom-form crossCallback-form"
      form={form}
      {...formItemLayout}
      colon={false}
    >
      <Collapse accordion defaultActiveKey={['1']} onChange={collapseChange} className="custom-collapse">
        <Panel header="跨屏回调" key="1" extra={callbackExtra()}>
          {
            tabpanes.length ? <Tabs
              hideAdd
              onChange={tabsChange}
              activeKey={activeKey}>
              {tabpanes.map((pane, index) => (
                <TabPane tab={`回调${index + 1}`} key={pane.id}>
                  <Form.Item
                    label='url地址'
                  >
                    <Input className="cus-input" value={pane.websocketUrl} onBlur={e => handleChangeType({ websocketUrl: e, pane })} onChange={e => pane.websocketUrl = e.target.value} />
                  </Form.Item>
                  <Form.Item
                    label='类型'
                  >
                    <Select
                      className="custom-select"
                      placeholder="请选择"
                      value={pane.type}
                      style={{ marginBottom: 0 }}
                      onChange={e => handleChangeType({ type: e }, pane)}
                      getPopupContainer={(triggerNode) => triggerNode.parentNode}
                    >
                      {[{ label: '发起方', value: 0 }, { label: '接收方', value: 1 }].map((item) => {
                        return <Option value={item.value} key={item.value}>{item.label}</Option>
                      })}
                    </Select>                  </Form.Item>
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
