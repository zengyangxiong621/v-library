/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, memo, useState } from "react";
import "./index.less";
import { useSetState } from "ahooks";
// import CustomDraggable from '../../../routes/dashboard/center/components/CustomDraggable'
import RecursiveComponent from "@/routes/previewDashboard/components/recursiveComponent";
import { http } from "@/services/request";
import { connect } from "dva";
import {
  IPanel
} from "@/routes/dashboard/center/components/CustomDraggable/type";
import { treeDataReverse, deepClone } from "@/utils/index.js";
import { layersPanelsFlat } from "@/utils";

import { Breadcrumb } from "antd";

interface State {
  states: string[];
  [key: string]: any;
}
const DrillDownPanel = ({ previewDashboard, id, dispatch, panels, isDrillDownPanel }: any) => {
  const componentData = previewDashboard.componentData;
  const panel = panels.find((item: IPanel) => item.id === id);
  // 获取面板详情接口
  const { states, config, name, type } = panel;
  const { isScroll = false, allowScroll = false, animationType = "0", scrollTime = 0, animationTime = 0 } = config;
  const [state, setState] = useSetState<State>({
    allLayers: [],
    layers: [],
    states: [],
    defaultState: "",
    AllComponents: [],
    overflow: "hidden",
    allData: [],
    activeIndex: 0,
    isLoading: false,
  });

  const changeReflect = (reflectObj: any) => {
    console.log("reflectObj", reflectObj);
    setState({

    });
  };

  const getPanelDetails = async ({ name, id }: { name: string; id: string }) => {
    const { components, layers, dashboardConfig } = await http({
      url: `/visual/application/dashboard/detail/${id}`,
      method: "get",
    });
    const layerPanels: any = layersPanelsFlat(layers);
    const panels: Array<IPanel> = await Promise.all(layerPanels.map((item: any) => getStateDetails(item)));
    await Promise.all(components.map((item: any) => getComponentData(item)));
    treeDataReverse(layers);
    return {
      components,
      layers,
      dashboardConfig,
      id,
      name,
      panels
    };
  };
  const getStateDetails = async (layerPanel: any) => {
    try {
      const panelConfig = await http({
        url: `/visual/panel/detail/${layerPanel.id}`,
        method: "get",
      });
      return panelConfig;
    } catch (e) {
      return null;
    }
  };
  const getComponentData = async (component: any) => {
    try {
      const data = await http({
        url: "/visual/module/getData",
        method: "post",
        body: {
          moduleId: component.id,
          dataType: component.dataType,
          callBackParamValues: previewDashboard.callbackArgs,
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
      if (states.length === 0) return;
      const data = await Promise.all(states.map((item: { name: string; id: string }) => getPanelDetails(item)));
      setState({
        allData: data,
        isLoading: true
      });
    })();
  }, []);


  // useEffect(() => {
  //   let activeIndex = previewDashboard.drillDownLevel - 1
  //   if (activeIndex > states.length - 1 || activeIndex < 0) {
  //     activeIndex = 0
  //   }
  //   setState({ activeIndex })
  // }, [previewDashboard.drillDownLevel])


  const breadcrumbClick = (itemData: any, stateIndex: number) => {
    setState({
      activeIndex: stateIndex,
    });
  };
  const [isInit, setIsInit] = useState<any>(true);
  const addDrillDownLevel = () => {
    let newIndex = state.activeIndex;
    if (!isInit) {
      newIndex += 1;
      if (newIndex >= states.length || newIndex < 0) {
        // newIndex = 0
        return;
      }
    }
    setIsInit(false);
    setState({ activeIndex: newIndex });
    console.log("state.allData", state.allData);
    // setState({ activeIndex: state.activeIndex + 1 })
  };
  return (
    <div className={`drill-down-panel panel-${id}`} style={{ overflow: state.overflow, width: "100%", height: "100%" }}>
      <div style={{ marginBottom: "20px", minWidth: "500px" }}>
        <Breadcrumb
        >
          {
            states.map((x: any, i: number) => {
              return (<Breadcrumb.Item
                className={"custom-breadcrumb"}
                onClick={() => breadcrumbClick(x, i)}
              >
                {x.name}
              </Breadcrumb.Item>);
            })
          }
        </Breadcrumb>
      </div>
      {
        state.allData.length === 1 ? <RecursiveComponent
          isDrillDownPanel={isDrillDownPanel}
          layersArr={state.allData[0].layers}
          previewDashboard={previewDashboard}
          dispatch={dispatch}
          componentLists={state.allData[0].components}
          panels={state.allData[0].panels}
        />
          :
          state.allData.map((item: any, index: number) =>
          (
            <div
              className="status-wrap"
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                display: state.activeIndex === index ? "block" : "none",
                transition: `transform 600ms ease 0s, opacity ${animationTime}ms ease 0s`,
              }}>
              <RecursiveComponent
                isDrillDownPanel={isDrillDownPanel}
                layersArr={item.layers}
                previewDashboard={previewDashboard}
                dispatch={dispatch}
                componentLists={item.components}
                panels={item.panels}
                addDrillDownLevel={addDrillDownLevel}
                changeReflect={changeReflect}
              />
            </div>
          )
          )
      }
    </div>
  );
};

export default memo(DrillDownPanel);
