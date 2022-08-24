import { defaultData } from "./defaultData/publishDashboard"
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
  namespace: "publishDashboard",
  state: JSON.parse(JSON.stringify(defaultData)),
  reducers: {
    save(state: IBarState, { payload }: any) {
      return { ...state, ...payload };
    },
  },
  effects: {
    * initDashboard({ payload: { dashboardId,pass }, cb }: any, { call, put, select }: any): any {
      let publishDashboard: any = yield select(({ publishDashboard }: any) => publishDashboard)
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
      publishDashboard.dataContainerList.forEach(async(item: any) => {
        let data: any = null
        item.enable = item.modules.length > 0
        if(item.dataType === "static") {
          data = item.staticData.data
        } else {
          data = await http({
            method: "post",
            url: "/visual/container/screen/data/get",
            body: {
              id: item.id,
              callBackParamValues: dashboardId.callbackArgs,
              dashboardId,
              pass,
            },
          })
        }
        publishDashboard.dataContainerDataList.push({ id: item.id, data })
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
          dataContainerDataList: publishDashboard.dataContainerDataList,
          componentFilters: filters || [],
          callbackParamsList,
          dashboardId,
        },
      })
      yield put({
        type: "getDashboardDetails",
        payload:{
          pass
        },
        cb: async(data: any) => {
          await cb(data)
        },
      })
    },
    * getDataContainerList(
      { payload, cb }: any,
      { call, put, select }: any,
    ): any {
      const publishDashboard: any = yield select(({ publishDashboard }: any) => publishDashboard)
      const dashboardId = publishDashboard.dashboardId || payload
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
      { payload: {pass}, cb }: any,
      { call, put, select }: any
    ): any {
      const publishDashboard: any = yield select(({ publishDashboard }: any) => publishDashboard);
      let { dashboardId } = publishDashboard
      try {
        let { layers, components, dashboardConfig, dashboardName } = yield http(
          {
            url: `/visual/application/dashboard/show/${dashboardId}`,
            method: "post",
            body: {
              pass,
              dashboardId,
            }
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
          payload: {
            components,
            pass
          },
        });
        const publishDashboard: any = yield select(({ publishDashboard }: any) => publishDashboard);
        // @Mark 后端没有做 删除图层后 清空被删除分组的所有空父级分组,前端这儿需要自己处理一下
        const noEmptyGroupLayers = filterEmptyGroups(layers);
        const newDashboardConfig = duplicateDashboardConfig(deepClone(publishDashboard.dashboardConfig), dashboardConfig)
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
        cb(e)
        return e;
      }
    },
    *getComponentsData({ payload }: any, { call, put, select }: any): any {
      const {components, pass} = payload;
      const publishDashboard: any = yield select(({ publishDashboard }: any) => publishDashboard);
      const { dashboardId, componentData, callbackArgs } = publishDashboard
      const func = async (component: any) => {
        try {
          const data = await http({
            url: "/visual/module/getShowData",
            method: "post",
            body: {
              moduleId: component.id,
              dataType: component.dataType,
              callBackParamValues:callbackArgs,
              dashboardId,
              pass
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
      const {dashboardId, callbackArgs} = publishDashboard
      const pass = localStorage.getItem(dashboardId)
      dataContainerList.forEach(async (item: any) => {
        const container = publishDashboard.dataContainerList.find(
          (container: any) => container.id === item.id
        );
        let data: any = null;
        if (container.dataType === "static") {
          data = container.staticData.data;
        } else {
          data = await http({
            method: "post",
            url: "/visual/container/screen/data/get",
            body: {
              id: container.id,
              callBackParamValues: callbackArgs,
              dashboardId,
              pass
            },
          });
        }
        publishDashboard.dataContainerDataList.find(
          (data: any) => data.id === item.id
        ).data = data;
      });
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

}
