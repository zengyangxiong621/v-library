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
import { http } from '../../../../../services/request'

const dashboardId = window.location.pathname.split('/')[2]

const SingleLayer = ({ bar, dispatch, ...props }) => {
  const { TabPane } = Tabs;
  const formItemLayout = {
    labelAlign: 'left'
  };
  const componentConfig = deepClone(bar.componentConfig)
  componentConfig.interaction = componentConfig.interaction || {
    mountAnimation: bar.treeData.find(item => item.id === componentConfig.id)?.mountAnimation,
    events: componentConfig.events
  }
  // console.log('--------------------')
  // console.log('componentConfig', bar.componentConfig)
  const styleConfig = componentConfig.config
  // console.log('styleConfig', styleConfig)
  // console.log('--------------------')
  const interactionConfig = componentConfig.interaction

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
      url: '/visual/module/update',
      method: 'post',
      body: params
    })
  }

  const filedsChange = (fields, type) => {
    if (type === 'static') {
      componentConfig.staticData.fields = fields
    } else {
      componentConfig.dataConfig[type].fields = fields
    }
    dispatch({
      type: 'bar/setComponentConfig',
      payload: componentConfig
    })
  }

  const dataContainerChange = (dataContainerIds) => {
    componentConfig.dataContainers = dataContainerIds.map((id, index) => ({
      id,
      enable: true,
      rank: index
    }))
    dispatch({
      type: 'bar/setComponentConfig',
      payload: componentConfig
    })
  }
  const staticDataChange = (data) => {
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

  const dataTypeChange = type => {
    componentConfig.dataType = type
    dispatch({
      type: 'bar/setComponentConfig',
      payload: componentConfig
    })
  }

  const dataSourceChange = dataSource => {
    componentConfig.dataConfig = dataSource
    dispatch({
      type: 'bar/setComponentConfig',
      payload: componentConfig
    })
  }

  const dataFromChange = dataFrom => {
    componentConfig.dataFrom = dataFrom
    dispatch({
      type: 'bar/setComponentConfig',
      payload: componentConfig
    })
  }

  const saveDataHandle = async (param) => {
    await http({
      url: '/visual/module/data/update',
      method: 'post',
      body: param
    })
  }

  const interactionChange = debounce(() => {
    console.log('interaction change', interactionConfig)
    componentConfig.interaction.mountAnimation = interactionConfig.mountAnimation
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
      url: '/visual/layer/group/update',
      method: 'post',
      body: params
    })
  }

  const eventChange = debounce(() => {
    componentConfig.interaction.events = interactionConfig.events
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
      url: '/visual/module/defineEvent',
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
              <DataConfig
                data={componentConfig}
                onDataContainerChange={dataContainerChange}
                onFiledsChange={filedsChange}
                onStaticDataChange={staticDataChange}
                onDataTypeChange={dataTypeChange}
                onDataSourceChange={dataSourceChange}
                onDataFromChange={dataFromChange}
              />
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
