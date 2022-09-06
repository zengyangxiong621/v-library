import { defaultData } from "./defaultData/previewDashboard"
import { http } from "../services/request"
import { ILayerComponent, ILayerGroup, IPanel } from "../routes/dashboard/center/components/CustomDraggable/type"
import { filterEmptyGroups } from "./utils/filterEmptyGroups"
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
  duplicateDashboardConfig
} from "../utils";
import { IBarState } from "./defaultData/bar"
export default {
  namespace: "previewDashboard",
  state: JSON.parse(JSON.stringify(defaultData)),
  reducers: {
    save(state: IBarState, { payload }: any) {
      return { ...state, ...payload };
    },
  },
  effects: {
    * initDashboard({ payload: { dashboardId }, cb }: any, { call, put, select }: any): any {
      let previewDashboard: any = yield select(({ previewDashboard }: any) => previewDashboard)
      // 获取回调参数列表
      const callbackParamsList = yield http({
        url: "/visual/module/callParam/list",
        method: "GET",
        params: {
          dashboardId,
        },
      })
      // 获取所有的数据容器数据
      const data = yield yield put({
        type: "getDataContainerList",
        payload: dashboardId,
      })
      previewDashboard = yield select(({ previewDashboard }: any) => previewDashboard)
      previewDashboard.dataContainerList.forEach(async(item: any) => {
        let data: any = null
        item.enable = item.modules.length > 0
        if(item.dataType === "static") {
          data = item.staticData.data
          previewDashboard.dataContainerDataList.push({ id: item.id, data })
        } else {
          const func = async (component:any) => {
            data = await http({
              method: "post",
              url: "/visual/container/data/get",
              body: {
                id: component.id,
                callBackParamValues: dashboardId.callbackArgs,
              },
            })
            previewDashboard.dataContainerDataList.push({ id: component.id, data })
          }
          func(item)
          // 添加自动过呢更新
          if(item.autoUpdate?.isAuto){
            setInterval(() => {
              func(item)
            }, item.autoUpdate.interval*1000)
          }
        }
      })
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
      })
      yield put({
        type: "save",
        payload: {
          dataContainerDataList: previewDashboard.dataContainerDataList,
          componentFilters: filters || [],
          callbackParamsList,
          dashboardId,
        },
      })
      yield put({
        type: "getDashboardDetails",
        cb: async(data: any) => {
          await cb(data)
        },
      })
    },
    * getDataContainerList(
      { payload, cb }: any,
      { call, put, select }: any,
    ): any {
      const previewDashboard: any = yield select(({ previewDashboard }: any) => previewDashboard)
      const dashboardId = previewDashboard.dashboardId || payload
      const data = yield http({
        method: "get",
        url: `/visual/container/list/${ dashboardId }`,
      })
      yield put({
        type: "save",
        payload: {
          dataContainerList: data,
        },
      })
      return data
    },
    *getDashboardDetails(
      { cb }: any,
      { call, put, select }: any
    ): any {
      const previewDashboard: any = yield select(({ previewDashboard }: any) => previewDashboard);
      let { dashboardId } = previewDashboard
      try {
        let { layers, components, dashboardConfig, dashboardName } = yield http(
          {
            url: `/visual/application/dashboard/detail/${dashboardId}`,
            method: "get",
          }
        );
        const layerPanels: any = layersPanelsFlat(layers)
        const func = async (layerPanel: any) => {
          try {
            const panelConfig = await http({
              url: `/visual/panel/detail/${ layerPanel.id }`,
              method: 'get',
            })
            return panelConfig
          } catch(e) {
            return null
          }
        }
        const panels: Array<IPanel> = yield Promise.all(layerPanels.map((item: any) => func(item)));
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
        const previewDashboard: any = yield select(({ previewDashboard }: any) => previewDashboard);
        // @Mark 后端没有做 删除图层后 清空被删除分组的所有空父级分组,前端这儿需要自己处理一下
        const noEmptyGroupLayers = filterEmptyGroups(layers);
        const newDashboardConfig = duplicateDashboardConfig(deepClone(previewDashboard.dashboardConfig), dashboardConfig)
        yield put({
          type: "save",
          payload: {
            treeData: noEmptyGroupLayers,
            components,
            panels,
            dashboardId,
            dashboardConfig: newDashboardConfig,
            dashboardName,
          },
        });
        cb({ dashboardConfig: newDashboardConfig, dashboardName });
      } catch (e) {
        return e;
      }
    },
    *getComponentsData({ payload }: any, { call, put, select }: any): any {
      const components = payload;
      const previewDashboard: any = yield select(({ previewDashboard }: any) => previewDashboard);
      const { dashboardId, componentData, callbackArgs } = previewDashboard
      const func = async (component: any) => {
        try {
          const data = await http({
            url: "/visual/module/getData",
            method: "post",
            body: {
              moduleId: component.id,
              dataType: component.dataType,
              callBackParamValues:callbackArgs,
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
      yield Promise.all(components.map((item: any) => func(item)));
      // 设置定时器
      components.map((item:any) => {
        // 添加自动更新功能
        if(item.autoUpdate?.isAuto && item.dataFrom != 1){
          setInterval(() => {
            func(item)
          }, item.autoUpdate.interval*1000)
        }
      })
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
      const previewDashboard: any = yield select(({ previewDashboard }: any) => previewDashboard);
      dataContainerList.forEach(async (item: any) => {
        const container = previewDashboard.dataContainerList.find(
          (container: any) => container.id === item.id
        );
        let data: any = null;
        if (container.dataType === "static") {
          data = container.staticData.data;
        } else {
          data = await http({
            method: "post",
            url: "/visual/container/data/get",
            body: {
              id: container.id,
              callBackParamValues: previewDashboard.callbackArgs,
            },
          });
        }
        previewDashboard.dataContainerDataList.find(
          (data: any) => data.id === item.id
        ).data = data;
      });
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

}
