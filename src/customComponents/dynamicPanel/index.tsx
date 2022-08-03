import {DOMElement, useEffect, useRef, useState} from 'react'
import {connect} from 'dva'
import {Button} from 'antd'
import {useSetState} from 'ahooks'
import CustomDraggable from '../../routes/dashboard/center/components/CustomDraggable'
import {http} from '@/services/request'
import * as React from 'react'
import {
  IPanel
} from "@/routes/dashboard/center/components/CustomDraggable/type";
import {treeDataReverse, deepClone} from '@/utils/index.js'
interface State {
  states: string[];

  [key: string]: any;
}

const DynamicPanel = ({bar, id, dispatch, isDashboard = true, panels}: any) => {
  const componentData = bar.componentData;
  const panel = panels.find((item: IPanel) => item.id === id)
  // 获取面板想起接口
  const {states, config, name, type} = panel
  const {isScroll = false, allowScroll = false, animationType = "0", scrollTime = 0, animationTime = 0} = config
  const [state, setState] = useSetState<State>({
    allLayers: [],
    layers: [],
    states: [],
    defaultState: '',
    AllComponents: [],
    overflow: 'hidden',
    allData: [],
    activeIndex: 0,
    isLoading: false
  })

  const getPanelDetails = async ({name, id}: { name: string; id: string }) => {
    const {components, layers, dashboardConfig, panels} = await http({
      url: `/visual/application/dashboard/detail/${id}`,
      method: "get",
    });
    await Promise.all(components.map((item: any) => getComponentData(item)));
    return {
      components,
      layers,
      dashboardConfig,
      id,
      name,
      panels
    }
  }
  const getComponentData = async (component: any) => {
    try {
      const data = await http({
        url: "/visual/module/getData",
        method: "post",
        body: {
          moduleId: component.id,
          dataType: component.dataType,
          callBackParamValues: bar.callbackArgs,
        },
      });

      if (data) {
        componentData[component.id] =
          component.dataType !== "static" ? data : data.data;
      } else {
        throw new Error("请求不到数据");
      }
    } catch (err) {
      componentData[component.id] = null;
    }
    return componentData[component.id];
  };
  useEffect(() => {
    (async function () {
      // 默认取第一个
      if (states.length === 0) return
      const data = await Promise.all(states.map((item: { name: string; id: string }) => getPanelDetails(item)));
      const allComponents = data.map(item => item.components)
      const allLayers = data.map(item => item.layers)
      setState({
        allData: data,
        isLoading: true
      })

      console.log('动态面板', data)
    })()

  }, [])

  useEffect(() => {
    setState({overflow: isScroll ? 'auto' : 'none'})
  }, [isScroll])

  useEffect(() => {
    console.log('变化', {
      allowScroll, animationType, scrollTime, animationTime
    })
  }, [allowScroll, animationType, scrollTime, animationTime])

  // 0
  // length 2
  // 0 1
  //
  useEffect(() => {
    let timer: any = null
    if (!isDashboard && state.isLoading && allowScroll) {
      timer = setInterval(() => {
        let currentIndex = state.activeIndex + 1
        if (currentIndex === state.allData.length) {
          currentIndex = 0
        }
        setState({activeIndex: currentIndex})
      }, scrollTime)
    }
    return () => {
      if (timer) {
        clearInterval(timer)
      }
    }
  }, [state.isLoading, state.activeIndex])

  return (
    <div className={`reference-panel panel-${id}`} style={{pointerEvents: 'none', overflow: state.overflow, width: '100%', height: '100%'}}>
      {
        (isDashboard && state.allData.length) >
        0 ? <CustomDraggable mouse={0} treeData={state.allData[0].layers} components={state.allData[0].components} panels={state.allData[0].panels}/>
          :
          state.allData.map((item: any, index: number) =>
            (
              <div style={{width: '100%', height: '100%', display: state.activeIndex === index ? 'block' : 'none', transition: 'all 3s' }}>
                <CustomDraggable mouse={0} treeData={item.layers} components={item.components} panels={item.panels}/>
              </div>
            )
          )
      }
    </div>
  )
}

export default connect(({bar}: any) => ({bar}))(DynamicPanel)
