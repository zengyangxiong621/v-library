import React, { memo, useEffect } from "react";

import EveryComponent from "../everyComponent";
import ReferencePanel from "@/customComponents/dashboardPublish/referencePanel";
import DynamicPanel from "@/customComponents/dashboardPublish/dynamicPanel";
import DrillDownPanel from "@/customComponents/dashboardPublish/drillDownPanel";
import { getComDataWithFilters } from "@/utils/data";

const MODULES = "modules";
const OPACITY = "opacity";

const RecursiveComponent = (props: any) => {
  const { layersArr, componentLists, publishDashboard, dispatch, scaleValue, panels, addDrillDownLevel, changeBreadcrumbData } = props;
  return (
    <div className='recursive-component-wrap'>
      {
        layersArr?.map((layer: any, ind: any) => {
          const isGroup: boolean = MODULES in layer;
          const isPanel: boolean = ("panelType" in layer);
          let targetComponent, targetPanel;
          if (!isGroup) {
            targetComponent = componentLists.find((item: any) => item.id === layer.id);
          }
          if (isPanel) {
            targetPanel = panels.find((item: any) => item.id === layer.id);
          }
          return (
            <div
              data-id={isGroup ? layer.id : "component-" + layer.id}
              key={layer.id}
              style={{
                visibility: !layer.isShow ? "hidden" : "unset",
              }}
            >
              {
                isPanel ?
                (layer.panelType === 0 ?
                  <div
                    className={`panel-container panel-${layer.id} event-id-${layer.id}`}
                    style={{
                      position: "absolute",
                      left: targetPanel.config.left + "px",
                      top: targetPanel.config.top + "px"
                    }}
                  >
                    <DynamicPanel
                      id={layer.id}
                      panels={panels}
                      publishDashboard={publishDashboard}
                      dispatch={dispatch}
                    />
                  </div>
                  : layer.panelType === 1 ?
                    <div
                      className={`panel-container panel-${layer.id} event-id-${layer.id}`}
                    >
                      <ReferencePanel
                        id={layer.id}
                        panels={panels}
                        publishDashboard={publishDashboard}
                        dispatch={dispatch}
                      />
                    </div>
                    : <div
                      className={`panel-container panel-${layer.id} event-id-${layer.id}`}
                      style={{
                        position: "absolute",
                        left: targetPanel.config.left + "px",
                        top: targetPanel.config.top + "px"
                      }}
                    >
                      <DrillDownPanel
                        id={layer.id}
                        panels={panels}
                        isDrillDownPanel={true}
                        publishDashboard={publishDashboard}
                        dispatch={dispatch}
                        addDrillDownLevel={addDrillDownLevel}
                        changeBreadcrumbData={changeBreadcrumbData}
                      />
                    </div>
                ):
                isGroup ?
                  <div className="no-cancel"
                    style={{
                      opacity: (layer[OPACITY] || 100) / 100
                    }}
                  >
                    {(layer as any)[MODULES]?.length > 0 &&
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
                    }
                  </div>
                  : <>
                    <div data-id={layer.id} style={{ width: "100%", height: "100%" }}>
                      {
                        <EveryComponent key={ind}
                          componentData={targetComponent}
                          comData={getComDataWithFilters(publishDashboard.componentData, targetComponent, publishDashboard.componentFilters, publishDashboard.dataContainerDataList, publishDashboard.dataContainerList, publishDashboard.callbackArgs, layer)}
                          scaleValue={scaleValue}
                          layerInfo={layer}
                          addDrillDownLevel={addDrillDownLevel}
                          changeBreadcrumbData={changeBreadcrumbData}
                        />
                      }
                    </div>
                  </>
              }
            </div>
          );
        })
      }

    </div>
  );
};

export default RecursiveComponent;
