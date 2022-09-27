/* eslint-disable import/no-anonymous-default-export */
import { defaultData } from "./defaultData/previewDashboard";
import { http } from "../services/request";
import {
  ILayerComponent,
  ILayerGroup, ILayerPanel,
  IPanel,
} from "../routes/dashboard/center/components/CustomDraggable/type"
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
  duplicateDashboardConfig, deepForEachBeforeCallBack,
} from "../utils"
import { IBarState, IFullAmountDashboardDetail, IPanelState } from "./defaultData/bar"
import { log } from "util"
export default {
  namespace: "previewDashboard",
  state: JSON.parse(JSON.stringify(defaultData)),
  effects: {
    *initDashboard(
      { payload: { dashboardId }, cb }: any,
      { call, put, select }: any
    ): any {
      let previewDashboard: any = yield select(
        ({ previewDashboard }: any) => previewDashboard
      );
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
      const func = async (component: any) => {
        let data = await http({
          method: "post",
          url: "/visual/container/data/get",
          body: {
            id: component.id,
            callBackParamValues: previewDashboard.callbackArgs,
          },
        });
        const index = previewDashboard.dataContainerDataList.findIndex((item: any) => item.id === component.id);
        if (component.dataType === "static") {
          data = data.data;
        }
        if (index !== -1) {
          previewDashboard.dataContainerDataList.splice(index, 1, { id: component.id, data });
        } else {
          previewDashboard.dataContainerDataList.push({ id: component.id, data });
        }
      };
      previewDashboard = yield select(({ previewDashboard }: any) => previewDashboard);
      previewDashboard.dataContainerList.forEach(async (item: any) => {
        let data: any = null;
        item.enable = item.modules.length > 0;
        if (item.dataType === "static") {
          data = item.staticData.data;
          previewDashboard.dataContainerDataList.push({ id: item.id, data });
        } else {
          await func(item);
        }
        // // 添加自动过呢更新
        // if(item.autoUpdate?.isAuto){
        //   setInterval(async () => {
        //     await func(item)
        //     await put({
        //       type: 'save'
        //     })
        //   }, item.autoUpdate.interval*1000)
        // }
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
          dataContainerDataList: previewDashboard.dataContainerDataList,
          componentFilters: filters || [],
          callbackParamsList,
          dashboardId,
        },
      });

      yield yield put({
        type: "getDashboardDetails",
        cb: async (data: any) => {
          await cb(data);
        },
      });

      if (!previewDashboard.isDashboardInit) {
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
    *getDataContainerList(
      { payload, cb }: any,
      { call, put, select }: any
    ): any {
      const previewDashboard: any = yield select(
        ({ previewDashboard }: any) => previewDashboard
      );
      const dashboardId = previewDashboard.dashboardId || payload;
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
      const previewDashboard: any = yield select(({ previewDashboard }: any) => previewDashboard);
      const layers = previewDashboard.treeData;
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
            url: `/visual/application/dashboard/detail/${panelStatus.id}`,
            method: "get",
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
        previewDashboard.fullAmountDashboardDetails = previewDashboard.fullAmountDashboardDetails.concat(panels);
        const panelsStatusDetail = await allPanelStatusDetailsFunc(panels);
        previewDashboard.fullAmountDashboardDetails = previewDashboard.fullAmountDashboardDetails.concat(panelsStatusDetail);
        for (const detail of panelsStatusDetail) {
          const layers = detail.layers;
          // @ts-ignore
          const layerPanels: Array<ILayerPanel> = layersPanelsFlat(layers, [0, 1, 2]);
          await getDeepPanelAndStatusDetails(layerPanels);
        }
      };
      yield getDeepPanelAndStatusDetails(layerPanels);
      let fullAmountDynamicAndDrillDownPanels: any = previewDashboard.fullAmountDashboardDetails.filter(
        (item: IFullAmountDashboardDetail) => "type" in item && [0, 2].includes(item.type)
      );
      fullAmountDynamicAndDrillDownPanels = fullAmountDynamicAndDrillDownPanels.map(
        ({ id, type, name, states }: IFullAmountDashboardDetail) => ({
          id,
          panelType: type,
          name,
          modules: (states as Array<IPanelState>).map(({ id, name }) => ({
            id,
            modules: previewDashboard.fullAmountDashboardDetails.find(
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
            console.log('layer', layer)
              ; (layer as any).modules =
                (findLayerById(fullAmountDynamicAndDrillDownPanels, layer.id) as any)?.modules || []
            /*              fullAmountDynamicAndDrillDownPanels.find((item: any) => item.id === layer.id)
                            ?.modules || [];*/
          }
        }
      );
      const fullAmountComponents = previewDashboard.fullAmountDashboardDetails.reduce(
        (pre: Array<any>, cur: any) => pre.concat(cur?.components || []),
        []
      );
      const panels = previewDashboard.fullAmountDashboardDetails.filter((item: any) =>
        layerPanels.find((panel: any) => panel.id === item.id)
      );

      console.log('--------------------')
      console.log('fullAmountDynamicAndDrillDownPanels', fullAmountDynamicAndDrillDownPanels)
      console.log("fullAmountDashboardDetails", previewDashboard.fullAmountDashboardDetails);
      console.log("fullAmountLayers", fullAmountLayers);
      console.log("fullAmountComponents", fullAmountComponents);
      console.log('--------------------')

      yield put({
        type: "save",
        payload: {
          fullAmountDashboardDetails: previewDashboard.fullAmountDashboardDetails,
          fullAmountLayers,
          panels,
          fullAmountComponents,
          fullAmountDynamicAndDrillDownPanels,
        },
      });
    },
    *getDashboardDetails({ cb }: any, { call, put, select }: any): any {
      const previewDashboard: any = yield select(
        ({ previewDashboard }: any) => previewDashboard
      );
      const { dashboardId, fullAmountDashboardDetails } = previewDashboard;
      try {
        let { layers, components, dashboardConfig, dashboardName } = yield http(
          {
            url: `/visual/application/dashboard/detail/${dashboardId}`,
            method: "get",
          }
        );
        fullAmountDashboardDetails.push({
          layers,
          components,
          dashboardConfig,
          dashboardName,
          dashboardId,
          id: dashboardId,
        });
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
        const panels: Array<IPanel> = yield Promise.all(
          layerPanels.map((item: any) => func(item))
        );
        yield (layers = deepForEach(
          layers,
          (layer: ILayerGroup | ILayerComponent) => {
            layer.singleShowLayer = false;
            delete layer.selected;
            delete layer.hover;
          }
        ));
        yield yield put({
          type: "getComponentsData",
          payload: components,
        });
        const previewDashboard: any = yield select(
          ({ previewDashboard }: any) => previewDashboard
        );
        // @Mark 后端没有做 删除图层后 清空被删除分组的所有空父级分组,前端这儿需要自己处理一下
        const noEmptyGroupLayers = filterEmptyGroups(layers);
        const newDashboardConfig = duplicateDashboardConfig(
          deepClone(previewDashboard.dashboardConfig),
          dashboardConfig
        );
        yield put({
          type: "save",
          payload: {
            treeData: noEmptyGroupLayers,
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
        return e;
      }
    },
    *getComponentsData({ payload }: any, { call, put, select }: any): any {
      let getCompoentDataFlag = false;
      const components = payload;
      const previewDashboard: any = yield select(
        ({ previewDashboard }: any) => previewDashboard
      );
      const { dashboardId, componentData, callbackArgs } = previewDashboard;

      const func = async (component: any) => {
        if (!component.dataFrom || component.dataFrom === 0) {
          getCompoentDataFlag = true;
          try {
            const data = await http({
              url: "/visual/module/getData",
              method: "post",
              body: {
                moduleId: component.id,
                dataType: component.dataType,
                callBackParamValues: callbackArgs,
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
        }
        return componentData[component.id];
      };
      yield Promise.all(components.map((item: any) => func(item)));
      // 先获取数据，再生成画布中的组件树，这样避免组件渲染一次后又拿到数据再渲染一次
      if (getCompoentDataFlag) {
        yield put({
          type: "save",
          payload: {
            componentData,
          },
        });
      }
    },
    *getContainersData({ payload }: any, { call, put, select }: any): any {
      const dataContainerList = payload;
      const previewDashboard: any = yield select(
        ({ previewDashboard }: any) => previewDashboard
      );
/*      dataContainerList.forEach(async (item: any) => {

      });*/
      const func = async (item: any) => {
        const container = previewDashboard.dataContainerList.find(
          (container: any) => container.id === item.id
        );
        let data: any = null;
        if (container.dataType === "static") {
          data = container.staticData.data;
        } else {
          try {
            data = await http({
              method: "post",
              url: "/visual/container/data/get",
              body: {
                id: container.id,
                callBackParamValues: previewDashboard.callbackArgs,
              },
            });
          } catch(e) {
            data = []
          }
        }
        previewDashboard.dataContainerDataList.find(
          (data: any) => data.id === item.id
        ).data = data;
        return data
      }
      yield Promise.all(dataContainerList.map((item: any) => func(item)));
      console.log('gggg', previewDashboard.dataContainerDataList)
      yield put({
        type: "save",
        payload: {
          dataContainerDataList: previewDashboard.dataContainerDataList,
        },
      });
    },
    clearCurrentDashboardData(state: IBarState, { payload }: any) {
      return {
        ...JSON.parse(JSON.stringify(defaultData)),
      };
    },
  },
  reducers: {
    save(state: IBarState, { payload }: any) {
      return { ...state, ...payload };
    },
    updateChildCompData(state: IBarState, { payload }: any) {
      const { childCompIdArr, componentData } = payload;
      childCompIdArr.forEach((id: any) => {
        state.componentData[id] = componentData;
      });
      return { ...state };
    },
  },
};
