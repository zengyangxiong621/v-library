import React, { memo, useEffect } from "react";

import EveryComponent from "../everyComponent";
import ReferencePanel from "@/customComponents/dashboardPublish/referencePanel";
import DynamicPanel from "@/customComponents/dashboardPublish/dynamicPanel";
import DrillDownPanel from "@/customComponents/dashboardPublish/drillDownPanel";
import { getComDataWithFilters } from "@/utils/data";
import "./index.less";

const MODULES = "modules";
const OPACITY = "opacity";

const RecursiveComponent = (props: any) => {
  const {
    layersArr,
    componentLists,
    publishDashboard,
    dispatch,
    scaleValue,
    panels,
    addDrillDownLevel,
    changeBreadcrumbData,
  } = props;
  return (
    <div className="recursive-component-wrap">
      {layersArr?.map((layer: any, ind: any) => {
        const isGroup: boolean = MODULES in layer;
        const isPanel: boolean = "panelType" in layer;
        let targetComponent, targetPanel;
        let isHideDefault = false;
        if (!isGroup) {
          if (isPanel) {
            targetPanel = panels.find((item: any) => item.id === layer.id);
          } else {
            targetComponent = componentLists.find((item: any) => item.id === layer.id);
            isHideDefault =
              targetComponent.config.find((item) => item.name === "hideDefault").value || false;
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
                    isHideDefault={isHideDefault}
                    panels={panels}
                    publishDashboard={publishDashboard}
                    dispatch={dispatch}
                  />
                ) : layer.panelType === 1 ? (
                  <ReferencePanel
                    id={layer.id}
                    isHideDefault={isHideDefault}
                    panels={panels}
                    publishDashboard={publishDashboard}
                    dispatch={dispatch}
                  />
                ) : (
                  <DrillDownPanel
                    id={layer.id}
                    isHideDefault={isHideDefault}
                    panels={panels}
                    isDrillDownPanel={true}
                    publishDashboard={publishDashboard}
                    dispatch={dispatch}
                    addDrillDownLevel={addDrillDownLevel}
                    changeBreadcrumbData={changeBreadcrumbData}
                  />
                )}
              </div>
            ) : isGroup ? (
              <div
                className="no-cancel"
                style={{
                  opacity: (layer[OPACITY] || 100) / 100,
                  display: isHideDefault ? "none" : "block",
                }}
              >
                {(layer as any)[MODULES]?.length > 0 && (
                  <div>
                    <RecursiveComponent
                      layersArr={layer[MODULES]}
                      componentLists={componentLists}
                      publishDashboard={publishDashboard}
                      dispatch={dispatch}
                      scaleValue={scaleValue}
                      panels={panels}
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
                        publishDashboard.componentData,
                        targetComponent,
                        publishDashboard.componentFilters,
                        publishDashboard.dataContainerDataList,
                        publishDashboard.dataContainerList,
                        publishDashboard.callbackArgs,
                        layer
                      )}
                      scaleValue={scaleValue}
                      layerInfo={layer}
                      addDrillDownLevel={addDrillDownLevel}
                      changeBreadcrumbData={changeBreadcrumbData}
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
