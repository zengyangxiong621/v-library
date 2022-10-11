import { defaultData } from "./defaultData/publishDashboard";
import { http } from "../services/request";
import {
  ILayerComponent,
  ILayerGroup, ILayerPanel,
  IPanel,
} from "../routes/dashboard/center/components/CustomDraggable/type";
import { filterEmptyGroups } from "./utils/filterEmptyGroups";
import {
  calcGroupPosition,
  deepClone,
  deepForEach,
  findLayerById,
  getLayerDimensionByDomId,
  layerComponentsFlat,
  mergeComponentLayers,
  setComponentDimension,
  layersPanelsFlat,
  duplicateDashboardConfig,
  getQueryVariable,
  deepForEachBeforeCallBack
} from "../utils";
import {IBarState, IFullAmountDashboardDetail, IPanelState} from "./defaultData/bar";
export default {
  namespace: "publishDashboard",
  state: JSON.parse(JSON.stringify(defaultData)),
  reducers: {
    save(state: IBarState, { payload }: any) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *initDashboard({ payload: { dashboardId, pass }, cb }: any, { call, put, select }: any): any {
      let publishDashboard: any = yield select(({ publishDashboard }: any) => publishDashboard);
      // 获取回调参数列表
      const callbackParamsList = yield http({
        url: "/visual/module/callParam/list",
        method: "GET",
        params: {
          dashboardId,
        },
      });
      // 获取所有的数据容器数据
      const data = yield yield put({
        type: "getDataContainerList",
        payload: dashboardId,
      });
      publishDashboard = yield select(({ publishDashboard }: any) => publishDashboard);
      const func = async (component: any) => {
        const params: any = getQueryVariable();
        let callBackParamValues = {
          ...publishDashboard.callbackArgs,
        };
        if (params?.Ticket) {
          callBackParamValues.Ticket = params.Ticket;
          callBackParamValues["X-Authenticated-Userid"] = params["X-Authenticated-Userid"];
        }
        let data = await http({
          method: "post",
          url: "/visual/container/screen/data/get",
          body: {
            id: component.id,
            callBackParamValues: callBackParamValues,
            dashboardId,
            pass,
          },
        });
        
        const index = publishDashboard.dataContainerDataList.findIndex(
          (item: any) => item.id === component.id
        );
        if (component.dataType === "static") {
          data = data.data;
        }
        if (index !== -1) {
          publishDashboard.dataContainerDataList.splice(index, 1, { id: component.id, data });
        } else {
          publishDashboard.dataContainerDataList.push({ id: component.id, data });
        }
      };
      // 后端要求必须先请求完application/dashboard/show接口再请求func里面的接口
      publishDashboard.dataContainerList.forEach(async (item: any) => {
        let data: any = null;
        item.enable = item.modules.length > 0;
        if (item.dataType === "static") {
          data = item.staticData.data;
          publishDashboard.dataContainerDataList.push({ id: item.id, data });
        } else {
          await func(item);
        }
      });
      // 获取当前画布所有的数据过滤器
      const filters = yield http({
        url: "/visual/module/filter/list",
        method: "GET",
        params: {
          id: dashboardId,
          type: "screen",
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      yield put({
        type: "save",
        payload: {
          dataContainerDataList: publishDashboard.dataContainerDataList,
          componentFilters: filters || [],
          callbackParamsList,
          dashboardId,
        },
      });
      yield yield put({
        type: "getDashboardDetails",
        payload: {
          pass,
        },
        cb: async (data: any) => {
          await cb(data);
        },
      });
      if (!publishDashboard.isDashboardInit) {
        yield put({
          type: "getFullAmountDashboardDetails",
        });
      }
      yield put({
        type: "save",
        payload: {
          isDashboardInit: true,
        },
      });
    },
    *getDataContainerList({ payload, cb }: any, { call, put, select }: any): any {
      const publishDashboard: any = yield select(({ publishDashboard }: any) => publishDashboard);
      const dashboardId = publishDashboard.dashboardId || payload;
      const data = yield http({
        method: "get",
        url: `/visual/container/list/${dashboardId}`,
      });
      yield put({
        type: "save",
        payload: {
          dataContainerList: data,
        },
      });
      return data;
    },
    *getFullAmountDashboardDetails({ payload }: any, { call, put, select }: any): any {
      const publishDashboard: any = yield select(({ publishDashboard }: any) => publishDashboard);
      const { pass, dashboardId, layers } = publishDashboard
      // @ts-ignore
      const layerPanels: Array<ILayerPanel> = layersPanelsFlat(layers, [0, 1, 2]); // 0 动态面板；1 引用面板；2 下钻面板
      // 获取面板详情
      const getPanelConfigFunc = async (layerPanel: any) => {
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
      const getPanelStatusDetails = async (panelStatus: { name: string; id: string }) => {
        try {
          const data = await http({
            url: `/visual/application/dashboard/show/${panelStatus.id}`,
            method: "post",
            body: {
              pass,
              dashboardId,
            },
          });
          return { ...data, id: panelStatus.id };
        } catch (e) {
          return null;
        }
      };
      const allPanelStatusDetailsFunc = async (panels: Array<IPanel>): Promise<any> => {
        return await panels.reduce(async (total: any, item) => {
          const res = await total;
          const data = await Promise.all(
            item.states.map((status: any) => getPanelStatusDetails(status))
          );
          data.forEach((detail) => {
            res.push(detail);
          });
          return res;
        }, []);
      };
      // 获取面板+状态详情
      const getDeepPanelAndStatusDetails = async (layerPanels: Array<ILayerPanel>) => {
        let panels: Array<IPanel> = await Promise.all(
          layerPanels.map((item: any) => getPanelConfigFunc(item))
        );
        panels = panels.filter((item) => item);
        publishDashboard.fullAmountDashboardDetails = publishDashboard.fullAmountDashboardDetails.concat(panels);
        const panelsStatusDetail = await allPanelStatusDetailsFunc(panels);
        publishDashboard.fullAmountDashboardDetails = publishDashboard.fullAmountDashboardDetails.concat(panelsStatusDetail);
        for (const detail of panelsStatusDetail) {
          const layers = detail.layers;
          // @ts-ignore
          const layerPanels: Array<ILayerPanel> = layersPanelsFlat(layers, [0, 1, 2]);
          await getDeepPanelAndStatusDetails(layerPanels);
        }
      };
      yield getDeepPanelAndStatusDetails(layerPanels);
      let fullAmountDynamicAndDrillDownPanels: any = publishDashboard.fullAmountDashboardDetails.filter(
        (item: IFullAmountDashboardDetail) => "type" in item && [0, 2].includes(item.type)
      );
      fullAmountDynamicAndDrillDownPanels = fullAmountDynamicAndDrillDownPanels.map(
        ({ id, type, name, states }: IFullAmountDashboardDetail) => ({
          id,
          panelType: type,
          name,
          modules: (states as Array<IPanelState>).map(({ id, name }) => ({
            id,
            modules: publishDashboard.fullAmountDashboardDetails.find(
              (item: IFullAmountDashboardDetail) => item.id === id
            ).layers,
            name,
            stateId: id,
          })),
        })
      );

      const fullAmountLayers = deepForEachBeforeCallBack(
        deepClone(layers),
        (
          layer:
            | ILayerPanel
            | (Pick<ILayerPanel, "name" | "id" | "panelType"> & { modules: any })
            | ILayerGroup
            | ILayerComponent,
          index: number
        ) => {
          if ("panelType" in layer && (layer.panelType === 0 || layer.panelType === 2)) {
            ; (layer as any).modules =
              (findLayerById(fullAmountDynamicAndDrillDownPanels, layer.id) as any)?.modules || []
          }
        }
      );
      const fullAmountComponents = publishDashboard.fullAmountDashboardDetails.reduce(
        (pre: Array<any>, cur: any) => pre.concat(cur?.components || []),
        []
      );
      console.log('fullAmountComponents', fullAmountComponents)
      const panels = publishDashboard.fullAmountDashboardDetails.filter((item: any) =>
        layerPanels.find((panel: any) => panel.id === item.id)
      );

      yield put({
        type: "save",
        payload: {
          fullAmountDashboardDetails: publishDashboard.fullAmountDashboardDetails,
          fullAmountLayers,
          panels,
          fullAmountComponents,
          fullAmountDynamicAndDrillDownPanels,
        },
      });
    },
    *getDashboardDetails({ payload: { pass }, cb }: any, { call, put, select }: any): any {
      const publishDashboard: any = yield select(({ publishDashboard }: any) => publishDashboard);
      const { dashboardId, fullAmountDashboardDetails } = publishDashboard;
      try {
        let { layers, components, dashboardConfig, dashboardName } = yield http({
          url: `/visual/application/dashboard/show/${dashboardId}`,
          method: "post",
          body: {
            pass,
            dashboardId,
          },
        });
        fullAmountDashboardDetails.push({
          layers,
          components,
          dashboardConfig,
          dashboardName,
          dashboardId,
          id: dashboardId,
        });
        console.log('fullAmountDashboardDetailsfullAmountDashboardDetails', fullAmountDashboardDetails)
        const layerPanels: any = layersPanelsFlat(layers);
        const func = async (layerPanel: any) => {
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
        const panels: Array<IPanel> = yield Promise.all(layerPanels.map((item: any) => func(item)));
        yield (layers = deepForEach(layers, (layer: ILayerGroup | ILayerComponent) => {
          layer.singleShowLayer = false;
          delete layer.selected;
          delete layer.hover;
        }));
        yield yield put({
          type: "getComponentsData",
          payload: components,
        });
        const publishDashboard: any = yield select(({ publishDashboard }: any) => publishDashboard);
        // @Mark 后端没有做 删除图层后 清空被删除分组的所有空父级分组,前端这儿需要自己处理一下
        const noEmptyGroupLayers = filterEmptyGroups(layers);
        const newDashboardConfig = duplicateDashboardConfig(
          deepClone(publishDashboard.dashboardConfig),
          dashboardConfig
        );
        yield put({
          type: "save",
          payload: {
            layers: noEmptyGroupLayers,
            components,
            panels,
            dashboardId,
            dashboardConfig: newDashboardConfig,
            dashboardName,
            fullAmountDashboardDetails
          },
        });
        cb({ dashboardConfig: newDashboardConfig, dashboardName });
      } catch (e) {
        cb(e);
        return e;
      }
    },
    *getComponentsData({ payload }: any, { call, put, select }: any): any {
      const components = payload;
      const publishDashboard: any = yield select(({ publishDashboard }: any) => publishDashboard);
      const { dashboardId, componentData, callbackArgs } = publishDashboard;
      const pass = localStorage.getItem(dashboardId);
      const func = async (component: any) => {
        try {
          const params: any = getQueryVariable();
          let callBackParamValues = {
            ...callbackArgs,
          };
          if (params?.Ticket) {
            callBackParamValues.Ticket = params.Ticket;
            callBackParamValues["X-Authenticated-Userid"] = params["X-Authenticated-Userid"];
          }
          const data = await http({
            url: "/visual/module/getShowData",
            method: "post",
            body: {
              moduleId: component.id,
              dataType: component.dataType,
              callBackParamValues: callBackParamValues,
              dashboardId,
              pass,
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
      yield Promise.all((components || []).map((item: any) => func(item)));
      // 先获取数据，再生成画布中的组件树，这样避免组件渲染一次后又拿到数据再渲染一次
      yield put({
        type: "save",
        payload: {
          componentData,
        },
      });
    },
    *getContainersData({ payload }: any, { call, put, select }: any): any {
      const dataContainerList = payload;
      const publishDashboard: any = yield select(({ publishDashboard }: any) => publishDashboard);
      const { dashboardId, callbackArgs } = publishDashboard;
      const pass = localStorage.getItem(dashboardId);

      const func = async (item: any) => {
        const container = publishDashboard.dataContainerList.find(
          (container: any) => container.id === item.id
        );
        let data: any = null;
        if (container.dataType === "static") {
          data = container.staticData.data;
        } else {
          const params: any = getQueryVariable();
          let callBackParamValues = {
            ...callbackArgs,
          };
          if (params?.Ticket) {
            callBackParamValues.Ticket = params.Ticket;
            callBackParamValues["X-Authenticated-Userid"] = params["X-Authenticated-Userid"];
          }
          data = await http({
            method: "post",
            url: "/visual/container/screen/data/get",
            body: {
              id: container.id,
              callBackParamValues: callBackParamValues,
              dashboardId,
              pass,
            },
          });
        }
        publishDashboard.dataContainerDataList.find((data: any) => data.id === item.id).data = data;
      }
      yield Promise.all(dataContainerList.map((item: any) => func(item)));

      yield put({
        type: "save",
        payload: {
          dataContainerDataList: publishDashboard.dataContainerDataList,
        },
      });
    },
    clearCurrentDashboardData(state: IBarState, { payload }: any) {
      return {
        ...JSON.parse(JSON.stringify(defaultData)),
      };
    },
  },
};
