import React, { memo, useEffect, useState } from "react";
import "./index.less";
import { useSetState } from "ahooks";
// import CustomDraggable from '../../../routes/dashboard/center/components/CustomDraggable'
import RecursiveComponent from "@/routes/previewDashboard/components/recursiveComponent";
import { http } from "@/services/request";
import { IPanel } from "@/routes/dashboard/center/components/CustomDraggable/type";
import { deepClone, layersReverse } from "@/utils/index.js";
import { layersPanelsFlat } from "@/utils";

import { Breadcrumb } from "antd";

interface State {
  overflow: "none" | "auto" | "hidden"; // 面板隐藏的方式
  allData: Array<{
    layers: any[];
    components: any[];
    [key: string]: any;
  }>; // 面板内所有状态的集合
  activeIndex: number; // 当前展示的状态下标
  isLoading: boolean; // 是否请求完成
  [key: string]: any;
}

const DrillDownPanel = ({
  previewDashboard,
  id,
  dispatch,
  panels,
  isDrillDownPanel,
  isHideDefault,
}: any) => {
  const componentData = previewDashboard.componentData;
  const panel = panels.find((item: IPanel) => item.id === id);
  // 获取面板详情接口
  const { states, config } = panel;
  const { animationTime = 0 } = config;
  const [state, setState] = useSetState<State>({
    overflow: "hidden",
    allData: [],
    activeIndex: 0,
    isLoading: false,
    breadcrumbData: [],
  });
  const [activeIndex, setActiveIndex] = useState(0);

  const getPanelDetails = async ({ name, id }: { name: string; id: string }) => {
    const { components, layers, dashboardConfig } = await http({
      url: `/visual/application/dashboard/detail/${id}`,
      method: "get",
    });
    const layerPanels: any = layersPanelsFlat(layers);
    const panels: Array<IPanel> = await Promise.all(
      layerPanels.map((item: any) => getStateDetails(item))
    );
    await Promise.all(components.map((item: any) => getComponentData(item)));
    const backgroundColor = dashboardConfig.find((item) => item.name === "styleColor").value;
    const backgroundImage = dashboardConfig.find((item) => item.name === "backgroundImg").value;
    const newLayers = deepClone(layers);
    layersReverse(newLayers);
    return {
      components,
      layers: newLayers,
      dashboardConfig,
      id,
      name,
      panels,
      backgroundColor,
      backgroundImage,
    };
  };
  const getStateDetails = async (layerPanel: any) => {
    try {
      return await http({
        url: `/visual/panel/detail/${layerPanel.id}`,
        method: "get",
      });
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
        componentData[component.id] = component.dataType !== "static" ? data : data.data;
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
      const data = await Promise.all(
        states.map((item: { name: string; id: string }) => getPanelDetails(item))
      );
      setState({
        allData: data,
        isLoading: true,
      });
    })();
  }, []);
  // 将面板状态赋值给面包屑数据
  useEffect(() => {
    const breadcrumbData = states.map((item: any) => item.name);
    setState({
      breadcrumbData,
    });
  }, []);

  const breadcrumbClick = (itemData: any, stateIndex: number) => {
    // 防止 点击面包屑中的下一层级 就能直接跳转到下一层级的组件
    if (activeIndex < stateIndex) return;
    setActiveIndex(stateIndex);
  };

  const addDrillDownLevel = () => {
    const newIndex = activeIndex + 1;
    if (newIndex >= states.length || newIndex < 0) {
      return;
    }
    setActiveIndex(newIndex);
  };
  // 更改面包屑标题数据
  const changeBreadcrumbData = (newData: any) => {
    const { originalName } = newData;
    if (originalName) {
      // TODO 这儿暂时先用和addDrillDownLevel中的重复逻辑
      const newIndex = activeIndex + 1;
      if (newIndex >= states.length || newIndex < 0) {
        return;
      }
      const newArr = state.breadcrumbData;
      newArr[newIndex] = originalName;
      setState({ breadcrumbData: newArr });
    }
  };
  const breadcrumbStyle: any = {
    marginBottom: "20px",
    minWidth: "500px",
  };
  if (config.breadcrumbPositionShow) {
    breadcrumbStyle.position = "absolute";
    breadcrumbStyle.top = config.breadcrumbPositionY || 0;
    breadcrumbStyle.left = config.breadcrumbPositionX || 0;
    breadcrumbStyle.zIndex = 99999;
  }

  return (
    <div
      className={`drill-down-panel panel-${id} event-id-${id}`}
      style={{
        width: "100%",
        height: "100%",
        display: isHideDefault ? "none" : "block",
        position: "relative",
      }}
    >
      {config.breadcrumbPositionShow && (
        <div style={{ ...breadcrumbStyle }}>
          <Breadcrumb>
            {state.breadcrumbData.map((x: any, i: number) => {
              return (
                <Breadcrumb.Item
                  className={`custom-breadcrumb ${
                    activeIndex === i ? "active-breadcrumb-item" : ""
                  } `}
                  onClick={() => breadcrumbClick(x, i)}
                >
                  {x}
                </Breadcrumb.Item>
              );
            })}
          </Breadcrumb>
        </div>
      )}

      {state.allData.map((item: any, index: number) => (
        <div
          className={`status-wrap event-id-${id}`}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            display: activeIndex == index ? "block" : "none",
            transition: `transform 600ms ease 0s, opacity ${animationTime}ms ease 0s`,
            backgroundImage: item.backgroundImage ? `url('${item.backgroundImage}')` : "unset",
            backgroundColor: item.backgroundColor ? item.backgroundColor : "unset",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
          }}
        >
          <RecursiveComponent
            isDrillDownPanel={isDrillDownPanel}
            layersArr={item.layers}
            previewDashboard={previewDashboard}
            dispatch={dispatch}
            componentLists={item.components}
            panels={item.panels}
            addDrillDownLevel={addDrillDownLevel}
            changeBreadcrumbData={changeBreadcrumbData}
          />
        </div>
      ))}
    </div>
  );
};

export default memo(DrillDownPanel);
