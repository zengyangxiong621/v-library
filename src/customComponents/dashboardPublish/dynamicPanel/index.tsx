import { DOMElement, useEffect, useRef, useState, RefObject } from "react"
import { connect } from "dva"
import { Button } from "antd"
import { useSetState } from "ahooks"
import CustomDraggable from "../../../routes/dashboard/center/components/CustomDraggable"
import RecursiveComponent from "@/routes/publishDashboard/components/recursiveComponent"
import { http } from "@/services/request"
import * as React from "react"
import {
  IPanel,
} from "@/routes/dashboard/center/components/CustomDraggable/type"
import { layersReverse, deepClone } from "@/utils/index.js"

interface State {
  overflow: "none" | "auto" | "hidden" // 面板隐藏的方式
  allData: Array<{
    layers: any[]
    components: any[],
    [key: string]: any;
  }>; // 面板内所有状态的集合
  activeIndex: number; // 当前展示的状态下标
  isLoading: boolean; // 是否请求完成
  [key: string]: any;
}

import { layersPanelsFlat } from "@/utils"

const DynamicPanel = ({ publishDashboard, id, dispatch, panels }: any) => {
  const componentData = publishDashboard.componentData
  const panel = panels.find((item: IPanel) => item.id === id)
  const pass = window.localStorage.getItem(panel.dashboard)
  // 获取面板想起接口
  const { states, config, name, type } = panel
  const { isScroll = false, allowScroll = false, animationType = "0", scrollTime = 0, animationTime = 0 } = config
  const [ state, setState ] = useSetState<State>({
    overflow: "hidden",
    allData: [],
    activeIndex: 0,
    isLoading: false,
  })
  const getPanelDetails = async({ name, id }: { name: string; id: string }) => {
    const { components, layers, dashboardConfig } = await http({
      url: `/visual/application/dashboard/show/${ id }`,
      method: "post",
      body: {
        pass,
        dashboardId: panel.dashboardId,
      },
    })
    const layerPanels: any = layersPanelsFlat(layers)
    const panels: Array<IPanel> = await Promise.all(layerPanels.map((item: any) => getStateDetails(item)))
    await Promise.all(components.map((item: any) => getComponentData(item)))
    const backgroundColor = dashboardConfig.find(item => item.name === "styleColor").value
    const backgroundImage = dashboardConfig.find(item => item.name === "backgroundImg").value
    const newLayers = deepClone(layers)
    layersReverse(newLayers)
    return {
      components,
      layers: newLayers,
      dashboardConfig,
      id,
      name,
      panels,
      backgroundColor,
      backgroundImage,
    }
  }
  const getStateDetails = async(layerPanel: any) => {
    try {
      const panelConfig = await http({
        url: `/visual/panel/detail/${ layerPanel.id }`,
        method: "get",
      })
      return panelConfig
    } catch(e) {
      return null
    }
  }
  const getComponentData = async(component: any) => {
    try {
      const data = await http({
        url: "/visual/module/getShowData",
        method: "post",
        body: {
          moduleId: component.id,
          dataType: component.dataType,
          callBackParamValues: publishDashboard.callbackArgs,
          dashboardId: publishDashboard.dashboardId,
          pass: localStorage.getItem(publishDashboard.dashboardId),
        },
      })

      if(data) {
        componentData[component.id] =
          component.dataType !== "static" ? data : data.data
      } else {
        throw new Error("请求不到数据")
      }
    } catch(err) {
      componentData[component.id] = null
    }
    return componentData[component.id]
  }
  useEffect(() => {
    (async function() {
      if(states.length === 0) return
      const data = await Promise.all(states.map((item: { name: string; id: string }) => getPanelDetails(item)))
      setState({
        allData: data,
        isLoading: true,
      })
    })()

  }, [])

  useEffect(() => {
    setState({ overflow: isScroll ? "auto" : "none" })
  }, [ isScroll ])

  // 0
  // length 2
  // 0 1
  //
  useEffect(() => {
    let timer: any = null
    if(state.isLoading && allowScroll && state.allData.length > 1) {
      timer = setInterval(() => {
        let currentIndex = state.activeIndex + 1
        if(currentIndex === state.allData.length) {
          currentIndex = 0
        }
        if(animationTime === 0) {
          setState({ activeIndex: currentIndex })
        } else if(animationTime > 0) {
          const opacityTimer = setInterval(() => {
            const statusWrapDOMs: any = document.querySelectorAll(`.panel-${ id } .status-wrap`)
            if(statusWrapDOMs.length === 0) return
            if(!statusWrapDOMs[0].style.opacity) {
              statusWrapDOMs.forEach((dom: HTMLElement, index: number) => {
                if(index === currentIndex) {
                  dom.style.opacity = "0"
                } else {
                  dom.style.opacity = "1"
                }
              })
            } else {
              statusWrapDOMs.forEach((dom: HTMLElement, index: number) => {
                if(index === currentIndex) {
                  dom.style.opacity = `${ Number(dom.style.opacity) + 0.5 }`
                  dom.style.display = "block"
                  if(Number(dom.style.opacity) >= 1) {
                    dom.style.opacity = ""
                  }
                } else {
                  dom.style.opacity = `${ Number(dom.style.opacity) - 0.5 }`
                  dom.style.display = "block"
                  if(Number(dom.style.opacity) <= 0) {
                    dom.style.opacity = ""
                    setState({ activeIndex: currentIndex })
                    clearInterval(opacityTimer)
                  }
                }
              })
            }
          }, 500)
        }

      }, scrollTime)
    }
    return () => {
      if(timer) {
        clearInterval(timer)
      }
    }
  }, [ state.isLoading, state.activeIndex, state.allData.length ])

  return (
    <div className={ `dynamic-panel panel-${ id } event-id-${ id }` } style={ { width: "100%", height: "100%" } }>
      {
        state.allData.map((item: any, index: number) =>
          (
            <div
              className={ `status-wrap event-id-${ id }` }
              style={ {
                position: "absolute",
                width: "100%",
                height: "100%",
                display: state.activeIndex === index ? "block" : "none",
                transition: `transform 600ms ease 0s, opacity ${ animationTime }ms ease 0s`,
                backgroundImage: item.backgroundImage ? `url('${ item.backgroundImage }')` : "unset",
                backgroundColor: item.backgroundColor ? item.backgroundColor : "unset",
              } }>
              <RecursiveComponent
                layersArr={ item.layers }
                publishDashboard={ publishDashboard }
                dispatch={ dispatch }
                componentLists={ item.components }
                panels={ item.panels }/>
            </div>
          ),
        )
      }
    </div>
  )
}

export default DynamicPanel
