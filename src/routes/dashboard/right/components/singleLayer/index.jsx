import React, { memo, useState, useEffect } from 'react'
import { connect } from 'dva'
import './index.less'
import { deepClone } from '../../../../../utils'
import LoadAnimation from '../loadAnimation'

import ComponentCard from '../componentCard'
import DataConfig from '../dataConfig'
import CusEvent from '../cusEvent'
import componentLib from '../index'

import {
  Tabs,
  
} from 'antd';
import debounce from 'lodash/debounce';
import { http } from '../../../../../models/utils/request'

const dashboardId = window.location.pathname.split('/')[2]

const SingleLayer = ({ bar, dispatch, ...props }) => {
  const { TabPane } = Tabs;
  const formItemLayout = {
    labelAlign: 'left'
  };
  const componentConfig = deepClone(bar.componentConfig)
  const styleConfig = componentConfig.config
  const interactionConfig = componentConfig.interaction || {
    mountAnimation:{},
    events:[]
  }

  const styleChange = debounce(() => {
    console.log('style change', componentConfig)
    dispatch({
      type: 'bar/setComponentConfig',
      payload: componentConfig
    })
    saveStyleData({
      id: componentConfig.id,
      name: componentConfig.name,
      moduleName: componentConfig.moduleName,
      moduleVersion: componentConfig.moduleVersion,
      config: componentConfig.config,
    })
  }, 300)

  const saveStyleData = async (param) => {
    const params = {
      configs: [param],
      dashboardId: dashboardId
    }
    await http({
      url:'/visual/module/update',
      method: 'post',
      body: params
    })
  }

  const dataChange = (data) => {
    componentConfig.staticData.data = data
    dispatch({
      type: 'bar/setComponentConfig',
      payload: componentConfig
    })
    saveDataHandle({
      id: componentConfig.id,
      data
    })
  }

  const saveDataHandle = async (param) => {
    await http({
      url:'/visual/module/data/update',
      method: 'post',
      body: param
    })
  }

  const interactionChange = debounce(() => {
    console.log('interaction change', interactionConfig)
    dispatch({
      type: 'bar/setComponentConfig',
      payload: componentConfig
    })
    saveAnimationData({
      id: componentConfig.id,
      key: 'mountAnimation',
      value: interactionConfig.mountAnimation
    })
  }, 300)

  const saveAnimationData = async (param) => {
    const params = {
      configs: [param],
      dashboardId: dashboardId
    }
    await http({
      url:'/visual/layer/group/update',
      method: 'post',
      body: params
    })
  }

  const eventChange = debounce(() => {
    dispatch({
      type: 'bar/setComponentConfig',
      payload: componentConfig
    })
    saveEventsData({
      id: componentConfig.id,
      events: interactionConfig.events
    })
  }, 300)

  const saveEventsData = async (param) => {
    const params = {
      configs: [param],
      dashboardId: dashboardId
    }
    await http({
      url:'/visual/module/defineEvent',
      method: 'post',
      body: params
    })
  }

  return (
    <div className="SingleLayer-wrap">
      <div className="content">
        <Tabs defaultActiveKey="1" type="card" className="custom-tabs">
          <TabPane tab="样式" key="1">
            <ComponentCard data={componentConfig}>
              {styleConfig.map((item, index) => {
                if (!(item.type && componentLib[item.type])) {
                  return null;
                }
                const TagName = componentLib[item.type];
                return (
                  <TagName data={item} onChange={styleChange} key={index} />
                )
              })}
            </ComponentCard>
          </TabPane>
          <TabPane tab="数据" key="2">
            <ComponentCard data={componentConfig}>
              <DataConfig data={componentConfig} onDataChange={dataChange}/>
            </ComponentCard>
          </TabPane>
          <TabPane tab="交互" key="3">
            <ComponentCard data={componentConfig}>
              <LoadAnimation data={interactionConfig} onChange={interactionChange} />
              <CusEvent data={interactionConfig} onChange={eventChange} />
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
