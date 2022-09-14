import React, { memo, useState, useEffect } from 'react'
import { connect } from 'dva'
import './index.less'
import { deepClone } from '../../../../../utils'
import LoadAnimation from '../loadAnimation'

import ComponentCard from '../componentCard'
import DataConfig from '../dataConfig'
import CusEvent from '../cusEvent'
import componentLib from '../index'
import CallbackArgs from '../callbackArgs'
import DrillDownSetting from '../drillDownSetting'

import {
  Tabs,
} from 'antd';
import debounce from 'lodash/debounce';
import { http } from '../../../../../services/request'
import { getCallbackParams } from '@/utils/data.js'

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
  const styleConfig = componentConfig.config
  const interactionConfig = componentConfig.interaction

  const styleChange = debounce(() => {
    dispatch({
      type: 'bar/setComponentConfigAndCalcDragScaleData',
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
      dashboardId: bar.dashboardId
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
    dispatch({
      type: 'bar/componentsBindContainer',
      payload: {
        componentConfig,
        dataContainerIds
      }
    })
    // componentConfig.dataContainers = dataContainerIds.map((id, index) => ({
    //   id,
    //   enable: true,
    //   rank: index
    // }))
    // dispatch({
    //   type: 'bar/setComponentConfig',
    //   payload: componentConfig
    // })
    // dispatch({
    //   type: 'bar/updateContainersEnableAndModules'
    // })
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

  const autoUpdateChange = autoUpdate => {
    componentConfig.autoUpdate = autoUpdate
    dispatch({
      type: 'bar/setComponentConfig',
      payload: componentConfig
    })
  }

  const useFilterChange = flag => {
    componentConfig.useFilter = flag
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
      dashboardId: bar.dashboardId
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
      dashboardId: bar.dashboardId
    }
    await http({
      url: '/visual/module/defineEvent',
      method: 'post',
      body: params
    })
  }

  const callbackArgChange = () => {
    dispatch({
      type: 'bar/setComponentConfig',
      payload: componentConfig
    })
    saveCallbackArg(componentConfig)
  }

  const saveCallbackArg = async (componentConfig) => {
    const params = {
      callbackArgs: componentConfig.callbackArgs,
      dashboardId: bar.dashboardId,
      moduleId: componentConfig.id
    }
    await http({
      url: '/visual/module/callbackParam',
      method: 'post',
      body: params
    })
    // 把组件定义的回调参数键值对写入callbackArgs中
    if (componentConfig.callbackArgs.length) {
      const currentActiveCompoentData = bar.currentActiveCompoentData
      const callbackParams = getCallbackParams(componentConfig.callbackArgs, currentActiveCompoentData[componentConfig.id])
      const callbackArgs = bar.callbackArgs
      dispatch({
        type: 'bar/save',
        payload: {
          callbackArgs: {
            ...callbackArgs,
            ...callbackParams
          }
        }
      })
    }
  }

  const selectedNextLevelComponent = (hasDrillDownArrConfig) => {
    // console.log('hasDrillDownArrConfig', hasDrillDownArrConfig)
  }
  // 通过全局变量 panelId 和 panels 来查找包含当前面板信息的对象，通过对象里的name来判断
  const curPanelType = bar.curPanelType

  return (
    <div className="SingleLayer-wrap">
      <div className="content">
        <Tabs defaultActiveKey="1" type="card" className="custom-tabs">
          <TabPane tab="样式" key="1">
            <ComponentCard data={componentConfig}
              allModulesConfig={bar.moduleDefaultConfig}
              bar={bar}
              dispatch={dispatch}>
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
                onAutoUpdateChange={autoUpdateChange}
                onDataFromChange={dataFromChange}
                onUseFilterChange={useFilterChange}
              />
            </ComponentCard>
          </TabPane>
          <TabPane tab="交互" key="3">
            <ComponentCard data={componentConfig}>
              <LoadAnimation data={interactionConfig} onChange={interactionChange} />
              <CallbackArgs data={componentConfig} onChange={callbackArgChange} />
              <CusEvent data={interactionConfig} onChange={eventChange} />
            </ComponentCard>
          </TabPane>
          {
            bar.isPanel && curPanelType === 2 && <TabPane tab="下钻" key="4">
              <DrillDownSetting
                componentConfig={componentConfig}
                selectedNextLevelComponent={selectedNextLevelComponent}
              ></DrillDownSetting>
            </TabPane>
          }
        </Tabs>
      </div>
    </div>
  )
}

export default connect(({ bar }) => ({
  bar
}))(SingleLayer)
