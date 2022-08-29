/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-anonymous-default-export */
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

import {
  COMPONENTS,
  HEIGHT,
  HIDE_DEFAULT,
  INTERACTION,
  LEFT,
  MOUNT_ANIMATION,
  OPACITY,
  TOP,
  WIDTH,
} from "../constant/home";

import {
  ILayerComponent,
  ILayerGroup,
  IPanel,
  IComponent, ILayerPanel,
} from "../routes/dashboard/center/components/CustomDraggable/type"


import {
  cancelGroup,
  group,
  hidden,
  lock,
  moveDown,
  moveUp,
  placeBottom,
  placeTop,
  remove,
  reName,
  showInput,
  singleShowLayer,
} from "../utils/sideBar";
import { DIMENSION } from "../routes/dashboard/center/constant";

import { generateLayers } from "./utils/generateLayers";
import { filterEmptyGroups } from "./utils/filterEmptyGroups";
import {
  addSomeAttrInLayers,
  clearNullGroup,
} from "./utils/addSomeAttrInLayers";
import { http } from "../services/request";

import { defaultData, IBarState } from "./defaultData/bar";

export default {
  namespace: "bar",
  state: {
    ...JSON.parse(JSON.stringify(defaultData)),
  } as IBarState,
  subscriptions: {
    setup({ dispatch, history }: { dispatch: any; history: any; }) {
      // eslint-disable-line
      history.listen((location: any) => {
        const pathName = window.location.pathname
        console.log('pathName', pathName)
        if (pathName.indexOf('dashboard/') !== -1) {
          // 应用编辑页
          const windowPathList = pathName.split('/')
          const dashboardId = windowPathList[2]
          let panelId = null, stateId = null
          if (windowPathList[3]) {
            panelId = windowPathList[3].split('-')[1]
          }
          if (windowPathList[4]) {
            stateId = windowPathList[4].split('-')[1]
          }
          let isPanel = false
          if (panelId) {
            isPanel = true
          }
          dispatch({
            type: 'save',
            payload: {
              treeData: [],
              scaleDragData: {
                position:{
                  x: 0,
                  y:0
                },
                style: {
                  width: 0,
                  height: 0,
                  display: 'none'
                }
              }
            }
          })
          dispatch({
            type: 'initDashboard',
            payload: {
              dashboardId,
              isPanel,
              panelId,
              stateId,
            },
            cb: () => { }
          })
        } else if (pathName.indexOf('dashboard-manage') !== -1) {
          // 我的可视化
          dispatch({
            type: 'clearCurrentDashboardData',
          })
        }
      });
    },
    onResize({ dispatch, history }: any) {
      window.onresize = (e) => {};
    },
    keyEvent({ dispatch, history }: any) {
      document.onkeydown = (e) => {};
    },
  },

  effects: {
    *setModuleDefaultConfig({ payload }: any, { call, put, select }: any) {
      yield put({
        type: "changeModuleDefaultConfig",
        payload,
      });
    },
    *getDashboardId({ payload }: any, { call, put, select }: any) {
      yield put({
        type: "changeDashboardId",
        payload,
      });
    },
    *initDashboard({ payload: {dashboardId, isPanel, stateId, panelId}, cb }: any, { call, put, select }: any): any {
      let bar: any = yield select(({ bar }: any) => bar);
        if (dashboardId !== bar.dashboardId) {
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
          let bar: any = yield select(({ bar }: any) => bar);
          bar.dataContainerList.forEach(async (item: any) => {
            let data: any = null;
            item.enable = item.modules.length > 0;
            if (item.dataType === "static") {
              data = item.staticData.data;
            } else {
              data = await http({
                method: "post",
                url: "/visual/container/data/get",
                body: {
                  id: item.id,
                  callBackParamValues: bar.callbackArgs,
                },
              });
            }
            bar.dataContainerDataList.push({ id: item.id, data });
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
            type: "getAllDashboardList",
          })
          yield put({
            type: 'save',
            payload: {
              dataContainerDataList: bar.dataContainerDataList,
              componentFilters: filters || [],
              callbackParamsList,
            }
          })
        }
        yield put({
          type: "save",
          payload: {
            isPanel,
            stateId,
            dashboardId,
            panelId
          },
        });
        if (isPanel) {
          yield put({
            type: 'getPanelDetails'
          })
        }
        yield put({
          type: "getDashboardDetails",
          cb: async (data: any) => {
            await cb(data);
          },
        });

    },
    *getPanelDetails({ payload }: any, { call, put, select }: any): any {
      const bar: any = yield select(({ bar }: any) => bar);
      const { panelId } = bar
      const { config, states: panelStatesList } = yield http({
        url: `/visual/panel/detail/${ panelId }`,
        method: 'get',
      })
      // const { config, states: panelStatesList } = bar.panels.find((panel: IPanel) => panel.id === panelId)
      const recommendConfig = bar.dashboardConfig.find((item: any) => item.name === 'recommend')
      recommendConfig.width = config.width
      recommendConfig.height = config.height
      yield put({
        type: "save",
        payload: {
          panelStatesList,
        }
      })
    },
    *getAllDashboardList({ payload }: any, { call, put, select }: any): any {
      const data = yield http({
        url: '/visual/application/queryAppList',
        method: 'post',
        body: {
          "pageNo": 1,
          "pageSize": 1000,
          "spaceId": 1,
          "map": {
            "updated_time": false
          },
          "groupId": null
        }
      })
      yield put(
        {
          type: 'save',
          payload: {
            allDashboardList: data.content.map((item: any) => ({name: item.name, value: item.id}))
          }
        }
      )
    },
    *deleteContainerDataById(
      { payload }: any,
      { call, put, select }: any
    ): any {
      const bar: any = yield select(({ bar }: any) => bar);
      const index = bar.dataContainerDataList.findIndex(
        (item: any) => item.id === payload
      );
      bar.dataContainerDataList.splice(index, 1);
      put({
        type: "save",
        payload: {
          dataContainerDataList: bar.dataContainerDataList,
        },
      });
    },
    *getDashboardDetails(
      { cb }: any,
      { call, put, select }: any
    ): any {
      const bar: any = yield select(({ bar }: any) => bar);
      let {dashboardId, stateId, panelId, isPanel, panelStatesList} = bar
      if (isPanel) {
        // 默认路由跳转到当前面板的第一个状态
        if (!stateId) {
          stateId = panelStatesList[0].id
        }
        window.history.replaceState('', '', `/dashboard/${dashboardId}/panel-${panelId}/state-${stateId}`);
      }
      try {
        let { layers, components, dashboardConfig, dashboardName } = yield http(
          {
            url: `/visual/application/dashboard/detail/${ isPanel ? stateId : dashboardId}`,
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
        const bar: any = yield select(({ bar }: any) => bar);
        // @Mark 后端没有做 删除图层后 清空被删除分组的所有空父级分组,前端这儿需要自己处理一下
        const noEmptyGroupLayers = filterEmptyGroups(layers);
        const newDashboardConfig = duplicateDashboardConfig(deepClone(bar.dashboardConfig), dashboardConfig)
        yield put({
          type: "save",
          payload: {
            treeData: noEmptyGroupLayers,
            components,
            panels,
            dashboardId,
            stateId,
            panelId,
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
      const bar: any = yield select(({ bar }: any) => bar);
      const componentData = bar.componentData;
      const func = async (component: any) => {
        try {
          const data = await http({
            url: "/visual/module/getData",
            method: "post",
            body: {
              moduleId: component.id,
              dataType: component.dataType,
              callBackParamValues: bar.callbackArgs,
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
      const bar: any = yield select(({ bar }: any) => bar);
      dataContainerList.forEach(async (item: any) => {
        const container = bar.dataContainerList.find(
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
              callBackParamValues: bar.callbackArgs,
            },
          });
        }
        bar.dataContainerDataList.find(
          (data: any) => data.id === item.id
        ).data = data;
      });
      yield put({
        type: "save",
        payload: {
          dataContainerDataList: bar.dataContainerDataList,
        },
      });
    },
    // 重命名
    *changeName({ payload }: any, { call, put, select }: any): any {
      const bar: any = yield select(({ bar }: any) => bar);
      // 需要改变当前画布中components中此次被重命名组件的name
      const components = bar.components;
      const state = bar.state;
      const { value, id } = payload.configs[0];
      const newComponents = components.map((item: any) => {
        if (item.id === id) {
          item.name = value;
        }
        return item;
      });
      yield put({
        type: "bar/change",
        payload,
      });
      return { ...state, components: newComponents };
    },
    *group({ payload }: any, { call, put, select }: any): any {
      const bar: any = yield select(({ bar }: any) => bar);
      const { treeDataCopy, newLayerId }: any = yield group(
        bar.treeData,
        bar.key
      );
      yield put({
        type: "update",
        payload: treeDataCopy,
      });
      yield put({
        type: "save",
        payload: {
          key: [newLayerId],
        },
      });
    },
    *cancelGroup({ payload }: any, { call, put, select }: any): any {
      const bar = yield select(({ bar }: any) => bar);
      const newTree = cancelGroup(bar.treeData, bar.key);
      yield put({
        type: "update",
        payload: newTree,
      });
    },
    *moveUp({ payload }: any, { call, put, select }: any): any {
      const bar = yield select(({ bar }: any) => bar);
      const newTree = moveUp(bar.treeData, bar.key);
      yield put({
        type: "update",
        payload: newTree,
      });
    },
    *moveDown({ payload }: any, { call, put, select }: any): any {
      const bar = yield select(({ bar }: any) => bar);
      const newTree = moveDown(bar.treeData, bar.key);
      yield put({
        type: "update",
        payload: newTree,
      });
    },
    *placedTop({ payload }: any, { call, put, select }: any): any {
      const bar = yield select(({ bar }: any) => bar);
      const newTree = placeTop(bar.treeData, bar.key);
      yield put({
        type: "update",
        payload: newTree,
      });
    },
    *placedBottom({ payload }: any, { call, put, select }: any): any {
      const bar = yield select(({ bar }: any) => bar);
      const newTree = placeBottom(bar.treeData, bar.key);
      yield put({
        type: "update",
        payload: newTree,
      });
    },
    // 更改图层组织
    *update({ payload }: any, { select, call, put }: any): any {
      const state: any = yield select((state: any) => state);
      const { stateId, isPanel, dashboardId } = state.bar
      const layers = yield http({
        url: "/visual/layer/update",
        method: "post",
        body: {
          dashboardId: isPanel ? stateId : dashboardId,
          layers: payload,
        },
      });
      yield put({
        type: "updateTree",
        payload: layers,
      });
    },
    // 修改图层属性图层
    *change({ payload }: any, { call, put }: any): any {
      const layers = yield http({
        url: "/visual/layer/change",
        method: "post",
        body: payload,
      });
      yield put({
        type: "updateTree",
        payload: layers,
      });
    },
    // 添加组件到画布
    *addComponent({ payload }: any, { call, put }: any) {
      yield put({
        type: "addLayer",
        payload: { final: payload.final, insertId: payload.insertId },
      });
    },
    // 删除图层、分组
    *delete({ payload }: any, { select, call, put }: any): any {
      const layers = yield http({
        url: "/visual/layer/delete",
        method: "delete",
        body: payload,
      });
      if(layers) {
        const filterNullLayers = clearNullGroup(layers);
        yield put({
          type: "updateTree",
          payload: filterNullLayers,
        });
      }
      yield put({
        type: "deleteComponentData",
        payload: { id: payload.id },
      });
      yield put({
        type: "updateContainersEnableAndModules",
      });
    },
    // 复制图层
    *copy({ payload }: any, { select, call, put }: any): any {
      const { layers, components, panels } = yield http({
        url: "/visual/layer/copy",
        method: "post",
        body: payload,
      });
      if (components.length > 0) {
        yield put({
          type: "updateComponents",
          payload: components,
        });
      }
      if (panels.length > 0) {
        yield put({
          type: "updatePanels",
          payload: panels,
        });
      }
      yield put({
        type: "updateTree",
        payload: layers,
      });
    },
    // 锁定
    *lock({ payload }: any, { call, put }: any): any {
      // 前端锁定
      yield put({
        type: "frontLock",
        payload: {
          value: payload.configs[0].value,
        },
      });
      yield put({
        type: "change",
        payload,
      });
    },
    // 隐藏 / 显示
    *hidden({ payload }: any, { call, put }: any): any {
      // console.log('隐藏的payload.value', payload)
      // 暂时先不启用前端隐藏
      // yield put({
      //   type: 'frontHidden',
      //   payload: {
      //     value: payload.configs[0].value,
      //   },
      // })
      yield put({
        type: "change",
        payload,
      });
    },
    *fetch({ payload }: any, { call, put }: any): any {
      // eslint-disable-line
      yield put({ type: "selectedNode", payload });
    },
    *chooseLayer({ payload }: any, { call, put, select }: any): any {
      yield put({
        type: "save",
        payload: {
          isCanClearAllStatus: false,
        },
      });
      yield put({
        type: "clearLayersSelectedStatus",
      });
      yield put({
        type: "setSelectedKeys",
        payload,
      });
      yield put({
        type: "calcDragScaleData",
      });
      const bar = yield select(({ bar }: any) => bar);
      yield put({
        type: "save",
        payload: {
          key: bar.selectedComponentOrGroup.map(
            (item: ILayerComponent) => item.id
          ),
        },
      });
    },
    *selectLayers({ payload }: any, { call, put }: any): any {
      yield put({
        type: "clearLayersSelectedStatus",
      });
      yield put({
        type: "setLayers",
        payload,
      });
      // setComponentConfig / setGroupConfig
      yield put({
        type: "setLayerConfig",
      });
      yield put({
        type: "calcDragScaleData",
      });
    },
    *createComponent(
      { payload, itemData, createType='component' }: any,
      { call, put, select }: any
    ): any {
      const state: any = yield select((state: any) => state);
      const { isPanel, stateId, dashboardId } = state.bar
      // 图层会插入到最后选中的图层或者Group上面，如果没有选中的图层，会默认添加到第一个
      const insertId =
        state.bar.key.length !== 0
          ? state.bar.key[state.bar.key.length - 1]
          : state.bar.treeData.length !== 0
          ? state.bar.treeData[0].id
          : "";
        // 新建的是组件
        const { id, children }: any = yield http({
          url: "/visual/module/add",
          method: "post",
          body: {
            dashboardId: isPanel ? stateId : dashboardId,
            component: { ...payload, moduleType: itemData.moduleType },
            insertId: insertId,
            children: [], // TODO: 需要确定children从哪里来
          },
        });
        yield put({
          type: "addComponentData",
          payload: {
            id,
            dataType: "static",
          },
        });
        yield put({
          type: "updateComponents",
          payload: [{
            ...deepClone(payload),
            id,
            moduleType: itemData.moduleType,
            children,
          }],
        });
        yield put({
          type: "addComponent",
          payload: { final: { ...itemData, id }, insertId },
        });
    },
    *createPanel({ payload: { panelType } }: {payload: {panelType: 0 | 1}}, { call, put, select }: any): any {

      const bar: any = yield select((state: any) => state.bar);
      const { isPanel, stateId, dashboardId, key, treeData } = bar
      // 图层会插入到最后选中的图层或者Group上面，如果没有选中的图层，会默认添加到第一个
      const insertId =
        key.length !== 0
          ? key[key.length - 1]
            : treeData.length !== 0
          ? treeData[0].id
            : ""
      const data: IPanel = yield http({
        url: '/visual/panel/add',
        method: 'post',
        body: {
          type: panelType,
          dashboardId: isPanel ? stateId : dashboardId,
          insertId
        }
      })
      if (data) {
        const { id, name } = data
        const layerPanel: ILayerPanel = { id, name, isLock: false, isShow: true, disabled: false, panelType }
        bar.panels.push(data)
        yield put({
          type: "addComponent",
          payload: { final: { ...layerPanel, id }, insertId },
        });
      }

    },
    *updateComponent({ payload }: any, { call, put, select }: any): any {
      if (payload.length > 0) {
        const components: Array<IComponent> = []
        const panels: Array<IPanel> = []
        payload.forEach((item: IPanel | IComponent) => {
          if ('type' in item) {
            panels.push(item)
          } else {
            components.push(item)
          }
        })
        const state: any = yield select((state: any) => state);
        if (components.length > 0) {
          yield http({
            url: "/visual/module/update",
            method: "post",
            body: {
              dashboardId: state.bar.dashboardId,
              configs: components,
            },
          });
        }
        if (panels.length > 0) {
          yield http({
            url: "/visual/panel/update",
            method: "post",
            body: {
              dashboardId: state.bar.dashboardId,
              configs: panels,
            },
          });
        }
      }
    },
    *getDataContainerList(
      { payload, cb }: any,
      { call, put, select }: any
    ): any {
      const bar: any = yield select(({ bar }: any) => bar);
      const dashboardId = bar.dashboardId || payload;
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
      // console.log('data', data)
    },
    *addDataContainer({ payload }: any, { call, put, select }: any): any {
      const bar: any = yield select(({ bar }: any) => bar);
      const data = yield http({
        method: "post",
        url: "/visual/container/add/",
        params: {
          id: "123",
        },
        body: {
          dashboardId: bar.dashboardId,
        },
      });
      payload.cb(data);
    },
    *addComponentData({ payload }: any, { call, put, select }: any): any {
      const component = payload;
      const bar: any = yield select(({ bar }: any) => bar);
      try {
        const data = yield http({
          url: "/visual/module/getData",
          method: "post",
          body: {
            moduleId: component.id,
            dataType: component.dataType,
            callBackParamValues: bar.callbackArgs,
          },
        });
        if (data) {
          bar.componentData[component.id] =
            component.dataType !== "static" ? data : data.data;
        } else {
          throw new Error("请求不到数据");
        }
      } catch (err) {
        bar.componentData[component.id] = null;
      }
      yield put({
        type: "save",
        componentData: bar.componentData,
      });
    },
    *componentsBindContainer(
      { payload }: any,
      { call, put, select }: any
    ): any {
      const { componentConfig, dataContainerIds } = payload;
      componentConfig.dataContainers = dataContainerIds.map(
        (id: string, index: number) => ({
          id,
          enable: true,
          rank: index,
        })
      );
      yield put({
        type: "setComponentConfig",
        payload: componentConfig,
      });
      yield put({
        type: "updateContainersEnableAndModules",
      });
    },
    // 获取系统素材分类的数据
    *getSystemMaterialClass({ payload }: any, { call, put }: any): any {
      let data = yield http({
        url: `/visual/resource/queryResourceTypeList?spaceId=1`,
        method: "get",
      });
      data.myTypes.map((item: any) => {
        item.groupId = item.type;
        item.origin = "myresource";
      });
      data.systemTypes.map((item: any) => {
        item.groupId = item.type;
        item.origin = "design";
        if (!item.type) item.groupId = "sysMatAll";
      });
      let result = {
        design: data.systemTypes,
        myresource: data.myTypes,
      };
      yield put({
        type: "setSystemMaterialClass",
        payload: result,
      });
    },
    // 获取系统素材数据
    *getSystemMaterialList({ payload, cb }: any, { call, put }: any): any {
      const data = yield http({
        url: "/visual/resource/queryResourceList",
        method: "post",
        body: payload,
      });
      yield put({
        type: "setSystemMaterialList",
        payload: data,
      });
      cb(data.content);
    },
    *setComponentConfigAndCalcDragScaleData({ payload, cb }: any, { call, put }: any): any {
      yield put({
        type: "setComponentConfig",
        payload,
      });
      yield put({
        type: "calcDragScaleData",
      });
    },
    *addPanelState({ payload, cb }: any, { call, put, select }: any): any {
      const bar: any = yield select(({ bar }: any) => bar);
      const data = yield http({
        url: '/visual/panel/state/create',
        method: 'post',
        body: {
          dashboardId: bar.dashboardId,
          panelId: bar.panelId
        }
      })
      yield put({
        type: 'save',
        payload: {
          panelStatesList: bar.panelStatesList.concat({
            name: data.name,
            id: data.id
          })
        }
      })
    },
    *deletePanelState({ payload, cb }: any, { call, put, select }: any): any {
      const bar: any = yield select(({ bar }: any) => bar);
      const { panelId, dashboardId, panelStatesList } = bar
      const { stateId } = payload
      try {
        const data = yield http({
          url: '/visual/panel/state/delete',
          method: 'post',
          body: {
            dashboardId,
            panelId,
            stateId
          }
        })
        const index = panelStatesList.findIndex((state: {id: string, name: string}) => state.id === stateId)
        const toStateId = panelStatesList[0].id
        panelStatesList.splice(index, 1)
        yield put({
          type: 'save',
          payload: {
            panelStatesList,
            stateId: toStateId
          }
        })
        yield put({
          type: 'getDashboardDetails'
        })
      } catch(err) {
        console.log('err', err)
      }
    },
    *copyPanelState({ payload, cb }: any, { call, put, select }: any): any {
      const bar: any = yield select(({ bar }: any) => bar);
      const { panelId, dashboardId, panelStatesList } = bar
      const { stateId } = payload
      try {
        const data = yield http({
          url: '/visual/panel/state/copy',
          method: 'post',
          body: {
            dashboardId,
            panelId,
            stateId
          }
        })
        panelStatesList.push(data)
        const toStateId = data.id
        yield put({
          type: 'save',
          payload: {
            panelStatesList,
            stateId: toStateId
          }
        })
        yield put({
          type: 'getDashboardDetails'
        })
      } catch(err) {
        console.log('err', err)
      }
      // yield put({
      //   type: 'save',
      //   payload: {
      //     panelStatesList: bar.panelStatesList.concat({
      //       name: data.name,
      //       id: data.id
      //     })
      //   }
      // })
    },
    *selectPanelState({ payload: { stateId } }: any, { call, put, select }: any): any {
      const bar: any = yield select(({ bar }: any) => bar);
      if (stateId !== bar.stateId) {
        yield put({
          type: 'save',
          payload: {
            stateId
          }
        })
        yield put({
          type: 'getDashboardDetails',
        })
        yield put({
          type: 'save',
          payload: {
            scaleDragData: {
              position: {
                x: 0,
                y: 0
              },
              style: {
                width: 0,
                height: 0,
                display: 'none',
              }
            },
            selectedComponentOrGroup: [],
            selectedComponentIds: [],
            selectedComponentRefs: {},
            selectedComponentDOMs: {},
            selectedComponents: [],
            key: [stateId]
          }
        })
      }
    },
    *createDynamicPanel({ payload: { stateId } }: any, { call, put, select }: any): any {

    }
  },

  reducers: {
    changeModuleDefaultConfig(state: IBarState, { payload }: any) {
      const isExit = state.moduleDefaultConfig.filter((item) => {
        return item.moduleName === payload.moduleName;
      });

      if (isExit.length === 0) {
        state.moduleDefaultConfig.push(payload);
      }
      return { ...state };
    },
    deleteComponentData(state: IBarState, { payload }: any) {
      // const { id } = payload
      // if (state.componentData[id]) {
      //   // delete state.componentData[id]
      // }
      return { ...state, componentData: state.componentData };
    },
    deleteDataContainer(state: IBarState, { payload }: any) {
      const { containerId, componentIds } = payload;
      let index = state.dataContainerDataList.findIndex(
        (item: any) => item.id === containerId
      );
      state.dataContainerDataList.splice(index, 1);
      index = state.dataContainerList.findIndex(
        (item: any) => item.id === containerId
      );
      state.dataContainerList.splice(index, 1);

      // 组件解绑数据容器
      componentIds.forEach((id: string) => {
        const component = state.components.find((item) => item.id === id);
        const index = component.dataContainers.findIndex(
          (item: any) => item.id === containerId
        );
        component.dataContainers.splice(index, 1);
      });

      return {
        ...state,
        dataContainerList: state.dataContainerList,
        components: state.components,
      };
    },
    copyDataContainer(state: IBarState, { payload }: any) {
      return { ...state };
    },
    updateDataContainer(state: IBarState, { payload }: any) {
      // containerData 是容器全部的数据信息, data 是 容器的数据 静态/动态数据
      const { containerData, data } = payload;
      const container = state.dataContainerDataList.find(
        (item: any) => item.id === containerData.id
      );
      const index = state.dataContainerList.findIndex(
        (item: any) => item.id === containerData.id
      );
      if (data) {
        if (container) {
          // container 存在，说明是修改
          container.data = data;
        } else {
          // 不存在则新增
          state.dataContainerDataList.unshift({ id: containerData.id, data });
        }
      }
      if (index !== -1) {
        state.dataContainerList[index] = containerData;
      } else {
        state.dataContainerList.unshift(containerData);
      }
      return {
        ...state,
        dataContainerList: state.dataContainerList,
        dataContainerDataList: state.dataContainerDataList,
      };
    }, // 设置右键菜单位置的信息
    setRightMenuInfo(state: IBarState, { payload }: any) {
      return { ...state, rightMenuInfo: payload };
    },
    changeDashboardId(state: IBarState, { payload }: any) {
      return { ...state, dashboardId: payload };
    },
    initTreeData(state: IBarState, { payload }: any) {
      payload.forEach((layer: any) => {
        layer.cancel = false;
        // layer.disabled = false
      });
      return { ...state, treeData: payload };
    },
    // 更新树
    updateTree(state: IBarState, { payload }: any) {
      const extendedSomeAttrLayers = addSomeAttrInLayers(payload);
      // TODO  涉及到后面的回收站逻辑
      /** 图层部分接口(删除图层)返回的数据结构为 { layers: [], recycleItems: []},
      部分其它接口返回的数据结构为layers数组, layers: [] */
      const targetTreeData = Array.isArray(extendedSomeAttrLayers)
        ? extendedSomeAttrLayers
        : extendedSomeAttrLayers.layers;
      const noEmptyGroupLayers = filterEmptyGroups(targetTreeData);
      return { ...state, treeData: noEmptyGroupLayers };
    },
    // 添加新的图层和组件
    addLayer(state: IBarState, { payload }: any) {
      let insertId: String;
      const { treeData } = state;
      if (payload.insertId && treeData.length) {
        insertId = payload.insertId;
      } else {
        insertId = treeData.length !== 0 ? treeData[0].id : "";
      }
      const newLayers = generateLayers(state.treeData, insertId, payload.final);
      return { ...state, treeData: newLayers };
    },
    // 添加新的图层和组件
    updateComponents(state: IBarState, { payload }: { payload: Array<any>}) {
      state.components = state.components.concat(payload);
      return { ...state };
    },
    // 添加新的图层和面板
    updatePanels(state: IBarState, { payload }: { payload: Array<any>}) {
      state.panels = state.panels.concat(payload);
      return { ...state };
    },
    clearLayersSelectedStatus(state: IBarState, { payload }: any) {
      state.selectedComponentOrGroup.forEach((item) => {
        item.selected = false;
      });
      return {
        ...state,
      };
    },
    setSelectedKeys(state: IBarState, { payload }: any) {
      state.selectedComponentOrGroup = payload
        .reduce((pre: any, cur: string) => {
          pre.push(findLayerById(state.treeData, cur));
          return pre;
        }, [])
        .filter(
          (layer: ILayerGroup | ILayerComponent) =>
            !layer?.isLock && layer?.isShow
        ); // 显示且未被锁
      state.selectedComponentOrGroup.forEach((item) => {
        item.selected = true;
      });
      // 左侧树多选
      state.isMultipleTree = true;
      state.isAreaChoose = state.selectedComponentOrGroup.length > 0;
      state.selectedComponentIds = layerComponentsFlat(
        state.selectedComponentOrGroup
      );
      state.selectedComponents = [
        ...state.components.filter((component) => state.selectedComponentIds.includes(component.id)),
        ...state.panels.filter((panel) =>state.selectedComponentIds.includes(panel.id))
      ]
      state.selectedComponentRefs = {};
      Object.keys(state.allComponentRefs).forEach((key) => {
        if (state.selectedComponentIds.includes(key)) {
          state.selectedComponentRefs[key] = state.allComponentRefs[key];
          state.selectedComponentDOMs[key] = state.allComponentDOMs[key];
        }
      });

      return { ...state };
    },
    setLayerConfig(state: IBarState, { payload }: any) {
      if (state.selectedComponentOrGroup.length === 1) {
        const layer = state.selectedComponentOrGroup[0];
        if (COMPONENTS in layer) {
          // 组
          const { x, y, width, height } = getLayerDimensionByDomId(layer.id);
          const dimensionConfig = state.groupConfig.find(
            (config: any) => config.name === DIMENSION
          ).value;
          const hideDefaultConfig = state.groupConfig.find(
            (config: any) => config.name === HIDE_DEFAULT
          );
          const opacityConfig = state.groupConfig.find(
            (config: any) => config.name === OPACITY
          );
          const interactionConfig = state.groupConfig.find(
            (config: any) => config.name === INTERACTION
          );
          hideDefaultConfig.value = layer[HIDE_DEFAULT] || false;
          opacityConfig.value = layer[OPACITY] || 100;
          interactionConfig.value = {
            ...interactionConfig.value,
            [MOUNT_ANIMATION]: layer[MOUNT_ANIMATION],
          };
          dimensionConfig.forEach((config: any) => {
            switch (config.name) {
              case LEFT:
                config.value = x;
                break;
              case TOP:
                config.value = y;
                break;
              case WIDTH:
                config.value = width;
                break;
              case HEIGHT:
                config.value = height;
                break;
            }
          });
        } else {
          if ('panelType' in layer) {
            state.panelConfig = state.selectedComponents.find(item => item.id === layer.id);
          } else {
            state.componentConfig = state.selectedComponents.find(item => item.id === layer.id);
          }
        }
      }
      return {
        ...state,
      };
    },
    updateSelectedComponents(state: IBarState, { payload, cb = function() {} }: any) {
      state.selectedComponentIds = layerComponentsFlat(
        state.selectedComponentOrGroup
      );
      // todo 这里需要添加 panel 的（来自 develop 分支）
      state.selectedComponents = [
        ...state.components.filter((component) => state.selectedComponentIds.includes(component.id)),
        ...state.panels.filter((panel) =>state.selectedComponentIds.includes(panel.id))
      ]
      console.log('state.selectedComponents', state.selectedComponents)
      cb(state.selectedComponents)
      return {
        ...state,
        selectedComponents: state.selectedComponents,
      }
    },
    calcDragScaleData(state: IBarState, { payload }: any) {
      let xPositionList: number[] = [];
      let yPositionList: number[] = [];
      let status: "分组" | "多组件" = "分组";
      if (state.selectedComponentOrGroup.length === 1) {
        const firstLayer = state.selectedComponentOrGroup[0];
        if (COMPONENTS in firstLayer) {
          // 单个组
          status = "分组";
          const positionArr = calcGroupPosition(
            firstLayer[COMPONENTS],
            state.components,
            state.panels
          );
          xPositionList = positionArr[0];
          yPositionList = positionArr[1];
        } else {
          // 单个组件
          if ('panelType' in firstLayer) {
            const panel = state.panels.find((panel: IPanel) => panel.id === firstLayer.id)
            if (panel) {
              const { config: { left, top, width, height } } = panel
              console.log('scaleDragData',  { left, top, width, height } )
              state.panelConfig = panel
              xPositionList.push(left, width)
              yPositionList.push(top, height)
            }
          } else {
            const component = state.components.find(
              (component) => component.id === firstLayer.id
            );
            const dimensionConfig: any = component.config.find(
              (item: any) => item.name === DIMENSION
            );
            dimensionConfig.value.forEach((config: any) => {
              if ([LEFT, WIDTH].includes(config.name)) {
                xPositionList.push(config.value);
              } else if ([TOP, HEIGHT].includes(config.name)) {
                yPositionList.push(config.value);
              }
            });
            state.componentConfig = component;
          }

          state.scaleDragData = {
            position: {
              x: xPositionList[0],
              y: yPositionList[0],
            },
            style: {
              display: "block",
              width: xPositionList[1],
              height: yPositionList[1],
            },
          };
          state.key = state.selectedComponentOrGroup.map(
            (item: ILayerComponent) => item.id
          );
          return { ...state };
        }
      } else if (state.selectedComponentOrGroup.length > 1) {
        status = "多组件";
        state.selectedComponentOrGroup.forEach((layer: any) => {
          const positionArr = calcGroupPosition(
            state.selectedComponentOrGroup,
            state.components,
            state.panels
          );
          xPositionList = positionArr[0];
          yPositionList = positionArr[1];
        });
      }
      xPositionList.sort((a, b) => a - b);
      yPositionList.sort((a, b) => a - b);
      const width =
        xPositionList[xPositionList.length - 1] - xPositionList[0] || 0;
      const height =
        yPositionList[yPositionList.length - 1] - yPositionList[0] || 0;
      state.scaleDragData = {
        position: {
          x: xPositionList[0] || 0,
          y: yPositionList[0] || 0,
        },
        style: {
          display: xPositionList[0] ? "block" : "none",
          width,
          height,
        },
      };
      if (status === "分组") {
        const layer = state.selectedComponentOrGroup[0];
        const { opacity, hideDefault } = layer;
        state.groupConfig.forEach((bigConfig: any, i: any) => {});
        const dimensionConfig = state.groupConfig.find(
          (config: any) => config.name === DIMENSION
        ).value;
        dimensionConfig.forEach((config: any) => {
          switch (config.name) {
            case LEFT:
              config.value = xPositionList[0];
              break;
            case TOP:
              config.value = yPositionList[0];
              break;
            case WIDTH:
              config.value = width;
              break;
            case HEIGHT:
              config.value = height;
              break;
          }
        });
      }
      return {
        ...state,
      };
    },
    // 选中节点时，保存住整个node对象
    setLayers(state: IBarState, { payload }: any) {
      state.selectedComponentOrGroup = payload;
      state.selectedComponentOrGroup.forEach((item) => {
        item.selected = true;
      });
      state.selectedComponentIds = layerComponentsFlat(
        state.selectedComponentOrGroup
      );
      state.selectedComponents = [
        ...state.components.filter((component) => state.selectedComponentIds.includes(component.id)),
        ...state.panels.filter((panel) =>state.selectedComponentIds.includes(panel.id))
      ]
      return { ...state };
    },
    // 在已经多选的情况下，点击右键时应该是往已选择节点[]里添加，而不是上面那种替换
    pushToSelectedNode(state: IBarState, { payload }: any) {
      const { key } = payload;
      const newArr = [...(new Set(state.key.concat(key)) as any)];
      return { key: newArr };
    },
    // 点击icon或者右键菜单里的操作
    selectOperate(state: IBarState, { payload }: any) {
      return { ...state, ...payload };
    },
    // 控制右键菜单的显示和隐藏
    setIsShowRightMenu(state: IBarState, { payload }: any) {
      return { ...state, isShowRightMenu: payload };
    },
    findNode(state: IBarState, { payload: { id, callback } }: any) {
      callback(id);
      return { ...state };
    },
    selectSingleNode(state: IBarState, { payload: id }: any) {
      return { ...state };
    },
    testDrag(state: IBarState, { payload: { parentId } }: any) {
      // console.log('parentId', parentId)
      const ids = ["1-1", "1-1-1", "1-1-1-1"];
      const copyState: IBarState = JSON.parse(JSON.stringify(state));
      // let childrenComponents = findParentNode(
      //   copyState.draggableItems,
      //   ids
      // ).filter((item: any) => item);
      // calculateGroupPosition(childrenComponents.reverse());
      return copyState;
    },
    moveGroupPosition(
      state: IBarState,
      { payload: { id, xMoveLength, yMoveLength } }: any
    ) {
      // const node = findNode(state.draggableItems, id);
      // moveChildrenComponents(node.components, xMoveLength, yMoveLength);
      // console.log("node", node);
      return { ...state };
    },
    // 多选时候，记录最后一次被右键点击的节点
    saveLastRightClickKey(state: IBarState, { payload }: any) {
      return { ...state, lastRightClick: payload };
    },
    // 置顶
    frontplacedTop(state: IBarState, { payload }: any) {
      const newTreeData = placeTop(state.treeData, state.key);
      return { ...state, treeData: newTreeData };
    },
    // 置底
    frontplaceBottom(state: IBarState, { payload }: any) {
      const newTreeData = placeBottom(state.treeData, state.key);
      return { ...state, treeData: newTreeData };
    },
    // 上移
    frontmoveUp(state: IBarState, { payload }: any) {
      const newTree = moveUp(state.treeData, state.key);
      return { ...state, treeData: newTree };
    },
    // 下移
    frontmoveDown(state: IBarState, { payload }: any) {
      const newTree = moveDown(state.treeData, state.key);
      return { ...state, treeData: newTree };
    },
    // 成组
    frontgroup(state: IBarState, { payload }: any) {
      const { treeDataCopy } = group(state.treeData, state.key);
      return { ...state, treeData: treeDataCopy };
    },
    // 取消成组
    cancelGroup(state: IBarState, { payload }: any) {
      const newTree = cancelGroup(state.treeData, state.key);
      return { ...state, treeData: newTree };
    },
    // TODO 粘贴
    // paste(state: IBarState, { payload }: any) {
    //   return { ...state };
    // },
    // 锁定
    lock(state: IBarState, { payload }: any) {
      const newTree = lock(state.treeData, state.key, payload.value);
      return { ...state, treeData: newTree };
    },
    // 删除
    delete(state: IBarState, { payload }: any) {
      // const newTree = remove(state.treeData, state.key);
      // const hadFilterEmptyGroupTree = filterEmptyGroups(newTree);
      // return { ...state, treeData: hadFilterEmptyGroupTree };

      // @Mark: 这儿要把state.key(存放当前被选中的图层的数组)重置为空。因为删除之前(比如用的右键选中该图层)会将选中的图层id存入key中，调用接口成功后，图层被删除了，但key中依旧会留存有这个已经被删除的图层的id,如果没有重置key,在“添加组件至画布”这一步中获取insertId处的逻辑会直接将这个已经被删除的图层id作为insertId,从而引发--删除组件后，立即添加组件会导致左侧图层被清空 的bug
      // return { ...state, treeData: newTree, key: [] };
      return {...state, key: []}
    },
    // 复制
    copy(state: IBarState, { payload }: any) {
      // const newTree = copy(state.treeData, state.key);
      // return { ...state, treeData: newTree };
      return { ...state };
    },
    //单独显示图层
    singleShowLayer(state: IBarState, { payload }: any) {
      const newTree = singleShowLayer(
        state.treeData,
        payload.keys,
        payload.singleShowLayer
      );
      return { ...state, treeData: newTree };
    },
    // 隐藏
    frontHidden(state: IBarState, { payload }: any) {
      // 此处只能用payload.key,因为eyes图标在没有任何节点被选中时也要能响应点击
      const newTree = hidden(state.treeData, payload.key, payload.value);
      return { ...state, treeData: newTree };
    },
    // 改变重命名输入框的显示状态
    reName(state: IBarState, { payload }: any) {
      const newTree = showInput(state.treeData, state.key, payload.value);
      return { ...state, treeData: newTree };
    },
    // 真正改变名字的地方
    frontchangeName(state: IBarState, { payload }: any) {
      const newTree = reName(state.treeData, state.key, payload.newName);
      return { ...state, treeData: newTree };
    },
    mergeComponentLayers(state: IBarState, { payload }: any) {
      state.componentLayers = mergeComponentLayers(
        state.components,
        state.treeData
      );
      return { ...state };
    },
    test(state: IBarState, { payload }: any) {
      return { ...state };
    },
    test2(state: IBarState) {
      return { ...state };
    },
    testDelete(state: IBarState) {
      state.components.pop();
      state.treeData.pop();
      return { ...state };
    },
    save(state: IBarState, { payload }: any) {
      return { ...state, ...payload };
    },
    selectComponentOrGroup(
      state: IBarState,
      { payload: { layer, config } }: any
    ) {
      // 这里的 layer 代表的是 group / component
      // 是否支持多选
      if (state.isSupportMultiple) {
        // 多选
        layer.selected = true;
        // 如果 selectedComponentOrGroup 里不存在当前点击的组件/分组的话，就添加
        if (
          !state.selectedComponentOrGroup.find((item) => item.id === layer.id)
        ) {
          (state.selectedComponentOrGroup as any).push(layer);
        }
      } else {
        // 单选
        // 单选分为单选组件、单选分组
        // 单选的话，将其他组件的 select 状态取消掉
        state.selectedComponentOrGroup.forEach((item) => {
          item.selected = false;
        });
        // 再将自己的 select 状态设置为 true
        layer.selected = true;
        // 再重新赋值 selectedComponentOrGroup 长度为 1
        state.selectedComponentOrGroup = [layer];
      }
      // 将选中的 layer 中的包含的所有 component 的 id 提取出来
      state.selectedComponentIds = layerComponentsFlat(
        state.selectedComponentOrGroup
      );
      state.selectedComponentRefs = {};
      Object.keys(state.allComponentRefs).forEach((key) => {
        if (state.selectedComponentIds.includes(key)) {
          state.selectedComponentRefs[key] = state.allComponentRefs[key];
          state.selectedComponentDOMs[key] = state.allComponentDOMs[key];
        }
      });
      state.selectedComponents = [
        ...state.components.filter((component) => state.selectedComponentIds.includes(component.id)),
        ...state.panels.filter((panel) =>state.selectedComponentIds.includes(panel.id))
      ]
      return {
        ...state,
      };
    },
    // 清除所有状态
    clearAllStatus(state: IBarState, payload: any) {
      if (!state.isCanClearAllStatus) {
        state.isCanClearAllStatus = true;
        return {
          ...state,
        };
      }
      // localStorage.removeItem("dblComponentTimes");
      // localStorage.removeItem("currentTimes");
      // state.currentDblTimes = 0;
      deepForEach(state.treeData, (layer: ILayerGroup | ILayerComponent) => {
        layer.selected = false;
      });
      // 清空 selectedComponentOrGroup、selectedComponentIds、selectedComponents
      state.selectedComponentOrGroup.length = 0;
      state.selectedComponentIds.length = 0;
      state.selectedComponents.length = 0;
      state.selectedComponentRefs = {};
      state.isSupportMultiple = false;
      // todo 选区的时候会点击到这里
      state.scaleDragData.style.display = "none";
      state.key = [];
      state.supportLinesRef.handleSetPosition(0, 0, "none");
      return { ...state };
    },
    updateContainersEnableAndModules(state: IBarState, { payload }: any) {
      // 更新数据容器的状态、绑定的组件数组
      const enableContainerList: any = [];
      state.components.forEach((component) => {
        const layer = findLayerById(state.treeData, component.id);
        if (layer) {
          component.dataContainers.forEach((container: any) => {
            enableContainerList.push({
              componentName: component.name,
              componentId: component.id,
              containerId: container.id,
            });
          });
        }
      });
      state.dataContainerList.forEach((container: any) => {
        container.enable = !!enableContainerList.find(
          (item: any) => item.containerId === container.id
        );
        container.modules = [];
        enableContainerList.forEach((item: any) => {
          if (item.containerId === container.id) {
            container.modules.push({
              id: item.componentId,
              name: item.componentName,
            });
          }
        });
      });
      return {
        ...state,
      };
    },
    setComponentConfig(state: IBarState, { payload }: any) {
      state.componentConfig = payload;
      // console.log('componentConfig', componentConfig)
      const index = state.components.findIndex((item: any) => {
        return item.id === payload.id;
      });
      state.components.splice(index, 1, state.componentConfig);
      // calcDragScaleData
      return { ...state };
    },
    setGroupConfig(state: IBarState, { payload }: any) {
      const {
        config: {
          position: { x, y },
          style: { width, height },
          opacity,
          hideDefault,
          interaction,
        },
        ...otherPayload
      } = payload;
      const dimensionConfig = state.groupConfig.find(
        (config: any) => config.name === DIMENSION
      ).value;
      const hideDefaultConfig = state.groupConfig.find(
        (config: any) => config.name === HIDE_DEFAULT
      );
      const opacityConfig = state.groupConfig.find(
        (config: any) => config.name === OPACITY
      );
      const interactionConfig = state.groupConfig.find(
        (config: any) => config.name === INTERACTION
      );
      hideDefaultConfig.value = hideDefault || false;
      opacityConfig.value = opacity || 100;
      interactionConfig.value = {
        ...interactionConfig.value,
        ...interaction,
      };
      dimensionConfig.forEach((config: any) => {
        switch (config.name) {
          case LEFT:
            config.value = x;
            break;
          case TOP:
            config.value = y;
            break;
          case WIDTH:
            config.value = width;
            break;
          case HEIGHT:
            config.value = height;
            break;
        }
      });
      return { ...state, ...otherPayload };
    },
    setAlignment(state: IBarState, { payload }: any) {
      const {
        position: { x, y },
        style: { width, height },
      } = state.scaleDragData;
      state.selectedComponentOrGroup.forEach((layer) => {
        if (COMPONENTS in layer) {
          // 组
          // 当前 layer 所包含的所有组件的 id 数组
          const layerDom: HTMLDivElement | any = document.querySelector(
            `.react-draggable[data-id=${layer.id}]`
          );
          let layerX: number = 0,
            layerY: number = 0,
            layerWidth: number = 0,
            layerHeight: number = 0;
          if (layerDom) {
            const translateArr = layerDom.style.transform
              .replace("translate(", "")
              .replace(")", "")
              .replaceAll("px", "")
              .split(", ");
            layerX = Number(translateArr[0]);
            layerY = Number(translateArr[1]);
            layerWidth = Number(layerDom.style.width.replace("px", ""));
            layerHeight = Number(layerDom.style.height.replace("px", ""));
          }
          const componentIds = layerComponentsFlat(layer[COMPONENTS]);
          // 通过 id 筛选出当前组的组件
          const components = state.selectedComponents.filter((component: any) =>
            componentIds.includes(component.id)
          );
          components.forEach((component: any) => {
            const dimensionConfig = component.config.find(
              (item: any) => item.name === DIMENSION
            ).value;
            if (dimensionConfig) {
              switch (payload) {
                case "top":
                  setComponentDimension(
                    dimensionConfig,
                    { y: (y - layerY) as any },
                    "add"
                  );
                  break;
                case "bottom":
                  setComponentDimension(
                    dimensionConfig,
                    { y: (y + height - (layerY + layerHeight)) as any },
                    "add"
                  );
                  break;
                case "left":
                  setComponentDimension(
                    dimensionConfig,
                    { x: (x - layerX) as any },
                    "add"
                  );
                  break;
                case "right":
                  setComponentDimension(
                    dimensionConfig,
                    { x: (x + width - (layerX + layerWidth)) as any },
                    "add"
                  );
                  break;
                case "vertical":
                  setComponentDimension(
                    dimensionConfig,
                    { y: (y + height / 2 - (layerY + layerHeight / 2)) as any },
                    "add"
                  );
                  break;
                case "horizontal":
                  setComponentDimension(
                    dimensionConfig,
                    { x: (x + width / 2 - (layerX + layerWidth / 2)) as any },
                    "add"
                  );
                  break;
              }
            }
          });
        } else {
          // 组件
          const component = state.selectedComponents.find(
            (component: any) => component.id === layer.id
          );
          if (component) {
            const dimensionConfig = component.config.find(
              (item: any) => item.name === DIMENSION
            ).value;
            if (dimensionConfig) {
              switch (payload) {
                case "top":
                  setComponentDimension(dimensionConfig, { y }, "set");
                  break;
                case "bottom":
                  setComponentDimension(
                    dimensionConfig,
                    { y: y + height },
                    "update"
                  );
                  break;
                case "left":
                  setComponentDimension(dimensionConfig, { x }, "set");
                  break;
                case "right":
                  setComponentDimension(
                    dimensionConfig,
                    { x: x + width },
                    "update"
                  );
                  break;
                case "vertical":
                  setComponentDimension(
                    dimensionConfig,
                    { y: (y + height / 2) as any },
                    "center"
                  );
                  break;
                case "horizontal":
                  setComponentDimension(
                    dimensionConfig,
                    { x: (x + width / 2) as any },
                    "center"
                  );
                  break;
              }
            }
          }
        }
      });
      return {
        ...state,
      };
    },
    setArrangement(state: IBarState, { payload }: any) {
      if (state.selectedComponentOrGroup.length <= 2) {
        return {
          ...state,
        };
      }
      const {
        position: { x, y },
        style: { width, height },
      } = state.scaleDragData;
      const xSortLayers: any = state.selectedComponentOrGroup.sort(
        (a: any, b: any) => {
          const aIsGroup = COMPONENTS in a;
          const bIsGroup = COMPONENTS in b;
          const aDom: HTMLDivElement | any = document.querySelector(
            `.react-draggable[data-id=${aIsGroup ? a.id : "component-" + a.id}]`
          );
          const bDom: HTMLDivElement | any = document.querySelector(
            `.react-draggable[data-id=${bIsGroup ? b.id : "component-" + b.id}]`
          );
          const aTranslateArr = aDom.style.transform
            .replace("translate(", "")
            .replace(")", "")
            .replaceAll("px", "")
            .split(", ");
          const aLayerX = Number(aTranslateArr[0]);
          const bTranslateArr = bDom.style.transform
            .replace("translate(", "")
            .replace(")", "")
            .replaceAll("px", "")
            .split(", ");
          const bLayerX = Number(bTranslateArr[0]);
          return aLayerX - bLayerX;
        }
      );
      const xLength = xSortLayers.length;
      //
      const xFirstLayer = xSortLayers[0]; // 第一个
      const xLastLayer = xSortLayers[xLength - 1]; // 倒数第一个
      const xLastPreLayer = xSortLayers[xLength - 2]; // 倒数第二个

      const xLastLayerData = getLayerDimensionByDomId(
        COMPONENTS in xLastLayer ? xLastLayer.id : `component-${xLastLayer.id}`
      );
      const xFirstLayerData = getLayerDimensionByDomId(
        COMPONENTS in xFirstLayer
          ? xFirstLayer.id
          : `component-${xFirstLayer.id}`
      );
      const xLastPreLayerData = getLayerDimensionByDomId(
        COMPONENTS in xLastPreLayer
          ? xLastPreLayer.id
          : `component-${xLastPreLayer.id}`
      );

      let remainingSpaceWidth =
        width - xLastPreLayerData.width - xFirstLayerData.width;

      // RemainingWidth 是除了前后两个 layer 宽度后的大小

      const remainingTotalWidth = xSortLayers.reduce(
        (width: number, layer: any, index: number) => {
          if (index === 0 || index === xSortLayers.length - 1) {
            return width;
          }
          const layerData = getLayerDimensionByDomId(
            COMPONENTS in layer ? layer.id : `component-${layer.id}`
          );
          return width + layerData.width;
        },
        0
      );
      const xSpace =
        (remainingSpaceWidth - remainingTotalWidth) / (xSortLayers.length - 1);
      // distance 是当前 scaleDragData 的 x 值，即整个选择的区域内距离画布左侧的值
      xSortLayers.reduce((distance: number, layer: any, index: any) => {
        if (index === 0) {
          const layerData = getLayerDimensionByDomId(
            COMPONENTS in layer ? layer.id : `component-${layer.id}`
          );
          return distance + layerData.width;
        }
        if (index === xSortLayers.length - 1) {
          if (
            xLastPreLayerData.x + xLastPreLayerData.width >
            xLastLayerData.x + xLastLayerData.width
          ) {
            if (COMPONENTS in layer) {
              const layerData = getLayerDimensionByDomId(
                COMPONENTS in layer ? layer.id : `component-${layer.id}`
              );
              const componentIds = layerComponentsFlat(layer[COMPONENTS]);
              // 通过 id 筛选出当前组的组件
              // 现在知道 distance + xSpace 是一个组/组件的位置, 所有 distance + xSpace - layerX， 让组里的每个组件的位置都增加这个值
              const components = state.selectedComponents.filter(
                (component: any) => componentIds.includes(component.id)
              );
              components.forEach((component: any) => {
                const dimensionConfig = component.config.find(
                  (item: any) => item.name === DIMENSION
                ).value;
                if (dimensionConfig) {
                  setComponentDimension(
                    dimensionConfig,
                    { x: (x + width - (layerData.x + layerData.width)) as any },
                    "add"
                  );
                }
              });
            } else {
              const component = state.selectedComponents.find(
                (component: any) => component.id === layer.id
              );
              const dimensionConfig = component.config.find(
                (item: any) => item.name === DIMENSION
              ).value;
              if (dimensionConfig) {
                setComponentDimension(
                  dimensionConfig,
                  { x: null },
                  "callback",
                  (data: any) => {
                    return {
                      x: x + width - (data.width + data.left),
                      type: "add",
                    };
                  }
                );
              }
            }
          }
          return distance;
        }
        if (COMPONENTS in layer) {
          const layerData = getLayerDimensionByDomId(
            COMPONENTS in layer ? layer.id : `component-${layer.id}`
          );
          const layerX = layerData.x;
          const componentIds = layerComponentsFlat(layer[COMPONENTS]);
          // 通过 id 筛选出当前组的组件
          // 现在知道 distance + xSpace 是一个组/组件的位置, 所有 distance + xSpace - layerX， 让组里的每个组件的位置都增加这个值
          const components = state.selectedComponents.filter((component: any) =>
            componentIds.includes(component.id)
          );
          components.forEach((component: any) => {
            const dimensionConfig = component.config.find(
              (item: any) => item.name === DIMENSION
            ).value;
            if (dimensionConfig) {
              setComponentDimension(
                dimensionConfig,
                { x: (distance + xSpace - layerX) as any },
                "add"
              );
            }
          });
          return distance + layerData.width + xSpace;
        } else {
          const component = state.selectedComponents.find(
            (component: any) => component.id === layer.id
          );
          const dimensionConfig = component.config.find(
            (item: any) => item.name === DIMENSION
          ).value;
          if (dimensionConfig) {
            const data: any = setComponentDimension(
              dimensionConfig,
              { x: (distance + xSpace) as any },
              "set"
            );
            return distance + data[WIDTH] + xSpace;
          }
        }
        return distance;
      }, x);
      return {
        ...state,
      };
    },
    // componentsBindContainer(state: IBarState, { payload }: any) {
    //   const {components, containerId} = payload
    //   // component: {id, name}
    //   components.forEach(async (component: any) => {
    //     await http({
    //       method: 'post',
    //       url: '/visual/module/bindContainer',
    //       body: {
    //         moduleId: component.id,
    //         binding: false,
    //         containerId
    //       },
    //     })
    //   })
    //   console.log('components', components)
    //
    //   return {
    //     ...state
    //   }
    // },
    clearCurrentDashboardData(state: IBarState, { payload }: any) {
      return {
        ...JSON.parse(JSON.stringify(defaultData)),
      };
    },
    // 获取系统素材分类数据
    setSystemMaterialClass(state: any, { payload }: any) {
      return { ...state, systemMaterialClass: payload };
    },
    // 获取系统素材数据
    setSystemMaterialList(state: any, { payload }: any) {
      return { ...state, systemMaterialList: payload };
    },
  },
};
