import React, { memo, useState } from 'react'
import { connect } from 'dva'
import './index.css'
import { find } from '../../../../../utils/common'
import { deepClone } from '../../../../../utils'
import LoadAnimation from '../loadAnimation'
import { EditableTable } from '../fieldMapTable'
import ComponentCard from '../componentCard'

import componentLib from '../index'

import {
  Form,
  Collapse,
  Tabs,
  Switch
} from 'antd';


const SingleLayer = ({bar, dispatch ,...props })  => {
  const { Panel } = Collapse;
  const { TabPane } = Tabs;
  const formItemLayout = {
    labelAlign: 'left'
  };
  const componentConfig = deepClone(bar.componentConfig)

  const styleConfig = componentConfig.config
  const interactionConfig = componentConfig.interaction
  const dataConfig = componentConfig.staticData


  const settingsChange = () => {
    console.log(componentConfig)
    dispatch({
      type: 'bar/save',
      payload: {
        componentConfig
      }
    })
  }

  return (
    <div className="SingleLayer-wrap">
      <div className="content">
        <Tabs defaultActiveKey="1" type="card" className="custom-tabs">
          <TabPane tab="样式" key="1">
            <ComponentCard data={componentConfig}>
              {styleConfig.map((item,index) => {
                if (!(item.type && componentLib[item.type])) {
                  return null;
                }
                const TagName = componentLib[item.type];
                return (
                  <TagName data={item} onChange={settingsChange} key={index} />
                )
              })}
            </ComponentCard>
          </TabPane>
          <TabPane tab="数据" key="2">
            <ComponentCard data={componentConfig}>
              <EditableTable data={dataConfig} onChange={settingsChange}/>
            </ComponentCard>
          </TabPane>
          <TabPane tab="交互" key="3">
            <ComponentCard data={componentConfig}>
              <Form className="custom-form" {...formItemLayout} colon={false}>
                <Collapse accordion className="custom-collapse" defaultActiveKey={['1']} >
                  <Panel header="载入动画" key="1">
                    <LoadAnimation data={interactionConfig} onChange={settingsChange} />
                  </Panel>
                </Collapse>
              </Form>
            </ComponentCard>
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default connect(({ bar }) => ({
  bar
}))(SingleLayer)
