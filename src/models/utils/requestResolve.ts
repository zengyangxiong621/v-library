/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable prettier/prettier */
import { ILayerPanel, IPanel } from "../../routes/dashboard/center/components/CustomDraggable/type";
import { http } from "../../services/request";
import { layersPanelsFlat } from "@/utils";
export const allPanelStatusDetailsFunc = async (panels: Array<IPanel>): Promise<any> => {
  return await panels.reduce(async (total: any, item) => {
    const res = await total;
    const data = await Promise.all(item.states.map((status: any) => getPanelStatusDetails(status)));
    data.forEach((detail) => {
      res.push(detail);
    });
    return res;
  }, []);
};
// 获取面板+状态详情
export const getDeepPanelAndStatusDetails = async (
  layerPanels: Array<{ id: string;[key: string]: any }>,
  fullAmountDashboardDetails: any[]
) => {
  let panels: Array<IPanel> = await Promise.all(
    layerPanels.map((item: any) => getPanelConfigFunc(item))
  );
  panels = panels.filter((item) => item);
  console.log("panels", panels);
  fullAmountDashboardDetails = fullAmountDashboardDetails.concat(panels);
  const panelsStatusDetail = await allPanelStatusDetailsFunc(panels);
  fullAmountDashboardDetails = fullAmountDashboardDetails.concat(panelsStatusDetail);
  console.log("这里看看");
  console.log("panelsStatusDetail", panelsStatusDetail);
  for (const detail of panelsStatusDetail) {
    const layers = detail.layers;
    // @ts-ignore
    const layerPanels: Array<ILayerPanel> = layersPanelsFlat(layers, [0, 1, 2]);
    fullAmountDashboardDetails = await getDeepPanelAndStatusDetails(
      layerPanels,
      fullAmountDashboardDetails
    );
  }
  return fullAmountDashboardDetails;
};
// 获取面板详情
export const getPanelConfigFunc = async (layerPanel: any) => {
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

// 获取状态详情
export const getPanelStatusDetails = async (panelStatus: { name: string; id: string }) => {
  try {
    const data = await http({
      url: `/visual/application/dashboard/detail/${panelStatus.id}`,
      method: "get",
    });
    return { ...data, id: panelStatus.id };
  } catch (e) {
    return null;
  }
};
