import React, { memo, useState, useEffect } from "react";

import EveryComponent from "../everyComponent";
import ReferencePanel from "@/customComponents/dashboardPreview/referencePanel";
import DynamicPanel from "@/customComponents/dashboardPreview/dynamicPanel";
import DrillDownPanel from "@/customComponents/dashboardPreview/drillDownPanel";
import { getComDataWithFilters } from "@/utils/data";
import "./index.less";
import { Breadcrumb } from "antd";

const MODULES = "modules";
const OPACITY = "opacity";

const RecursiveComponent = (props: any) => {
  const {
    layersArr,
    componentLists,
    previewDashboard,
    dispatch,
    scaleValue,
    panels,
    addDrillDownLevel,
    changeBreadcrumbData,
    changeReflect,
    crossCallback,
    sendMessage,
  } = props;

  // console.log('layersArr', layersArr);

  return (
    <div className="recursive-component-wrap">
      {layersArr?.map((layer: any, ind: any) => {
        const isGroup: boolean = MODULES in layer;
        const isPanel: boolean = "panelType" in layer;
        let targetComponent, targetPanel;
        if (!isGroup) {
          if (isPanel) {
            targetPanel = panels.find((item: any) => item.id === layer.id);
          } else {
            targetComponent = componentLists.find((item: any) => item.id === layer.id);
          }
        }
        return layer.isShow ? (
          <div data-id={isGroup ? layer.id : "component-" + layer.id} key={layer.id}>
            {isPanel ? (
              <div
                className={"panel-container"}
                style={{
                  position: "absolute",
                  left: targetPanel.config.left + "px",
                  top: targetPanel.config.top + "px",
                  width: targetPanel.config.width + "px",
                  height: targetPanel.config.height + "px",
                  overflow: targetPanel.config.isScroll ? "auto" : "hidden",
                }}
              >
                {layer.panelType === 0 ? (
                  <DynamicPanel
                    id={layer.id}
                    isHideDefault={layer.hideDefault}
                    panels={panels}
                    previewDashboard={previewDashboard}
                    dispatch={dispatch}
                  />
                ) : layer.panelType === 1 ? (
                  <ReferencePanel
                    id={layer.id}
                    isHideDefault={layer.hideDefault}
                    panels={panels}
                    previewDashboard={previewDashboard}
                    dispatch={dispatch}
                  />
                ) : (
                  <DrillDownPanel
                    id={layer.id}
                    isHideDefault={layer.hideDefault}
                    panels={panels}
                    isDrillDownPanel={true}
                    previewDashboard={previewDashboard}
                    dispatch={dispatch}
                    addDrillDownLevel={addDrillDownLevel}
                    changeBreadcrumbData={changeBreadcrumbData}
                  />
                )}
              </div>
            ) : isGroup ? (
              <div
                className={`event-id-${layer.id}`}
                style={{
                  opacity: (layer[OPACITY] || 100) / 100,
                  display: layer.hideDefault ? "none" : "block",
                }}
              >
                {(layer as any)[MODULES]?.length > 0 && (
                  <div>
                    <RecursiveComponent
                      layersArr={layer[MODULES]}
                      componentLists={componentLists}
                      previewDashboard={previewDashboard}
                      dispatch={dispatch}
                      scaleValue={scaleValue}
                      panels={panels}
                      crossCallback={crossCallback}
                      // sendMessage={sendMessage}
                    />
                  </div>
                )}
              </div>
            ) : (
              <>
                <div data-id={layer.id} style={{ width: "100%", height: "100%" }}>
                  {
                    <EveryComponent
                      key={ind}
                      componentData={targetComponent}
                      comData={getComDataWithFilters(
                        previewDashboard.componentData,
                        targetComponent,
                        previewDashboard.componentFilters,
                        previewDashboard.dataContainerDataList,
                        previewDashboard.dataContainerList,
                        previewDashboard.callbackArgs,
                        layer,
                        crossCallback
                      )}
                      // sendMessage={sendMessage}
                      // 跨屏 组件绑定数据操作，选择器数据容器或者数据源后，再进行过滤
                      scaleValue={scaleValue}
                      layerInfo={layer}
                      addDrillDownLevel={addDrillDownLevel}
                      changeBreadcrumbData={changeBreadcrumbData}
                      changeReflect={changeReflect}
                      isHideDefault={layer.hideDefault}
                      {...props}
                    />
                  }
                </div>
              </>
            )}
          </div>
        ) : (
          <></>
        );
      })}
    </div>
  );
};

export default RecursiveComponent;
