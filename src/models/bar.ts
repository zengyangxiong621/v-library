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
} from '../utils'

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
} from '../constant/home'

import { ILayerComponent, ILayerGroup, } from '../routes/dashboard/center/components/CustomDraggable/type'

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
} from '../utils/sideBar'
import { DIMENSION } from '../routes/dashboard/center/constant'

import { generateLayers } from './utils/generateLayers'
import { addSomeAttrInLayers, clearNullGroup } from './utils/addSomeAttrInLayers'
import { http } from '../services/request'

import { defaultData, IBarState } from './defaultData/bar'

export default {
  namespace: 'bar',
  state: {
    ...defaultData
  } as IBarState,
  subscriptions: {
    setup({ dispatch, history }: { dispatch: any; history: any }) {
      // eslint-disable-line
      history.listen((location: any) => {
        // console.log("location", location);
      })
    },
    onResize({ dispatch, history }: any) {
      window.onresize = (e) => {
      }
    },
    keyEvent({ dispatch, history }: any) {
      document.onkeydown = (e) => {
      }
    },
  },

  effects: {
    * setModuleDefaultConfig({ payload }: any, { call, put, select }: any) {
      yield put({
        type: 'changeModuleDefaultConfig',
        payload,
      })
    },
    * getDashboardId({ payload }: any, { call, put, select }: any) {
      yield put({
        type: 'changeDashboardId',
        payload,
      })
    },
    * initDashboard({ payload, cb }: any, { call, put, select }: any): any {
      // 获取回调参数列表
      const callbackParamsList = yield http({
        url: '/visual/module/callParam/list',
        method: 'GET',
        params: {
          dashboardId: payload,
        }
      })
      // TODO 怎么造成的
      // 获取所有的数据容器数据
      const data = yield (yield put({
        type: 'getDataContainerList',
        payload,
      }))
      const bar: any = yield select(({ bar }: any) => bar)
      bar.dataContainerList.forEach(async (item: any) => {
        let data: any = null
        item.enable = (item.modules.length > 0)
        if (item.dataType === 'static') {
          data = item.staticData.data
        } else {
          data = await http({
            url: '/visual/container/data/get',
            params: {
              id: item.id
            }
          })
        }
        bar.dataContainerDataList.push({ id: item.id, data })
      })
      // 获取当前画布所有的数据过滤器

      const filters = yield http({
        url: '/visual/module/filter/list',
        method: 'GET',
        params: {
          id: payload,
          type: 'screen'
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })

      yield put({
        type: 'save',
        payload: {
          dataContainerDataList: bar.dataContainerDataList,
          componentFilters: filters || [],
          callbackParamsList
        }
      })
      yield put({
        type: 'getDashboardDetails',
        payload,
        cb: async (data: any) => {
          await cb(data)
        }
      })
    },
    * deleteContainerDataById({ payload }: any, { call, put, select }: any): any {
      const bar: any = yield select(({ bar }: any) => bar)
      const index = bar.dataContainerDataList.findIndex((item: any) => item.id === payload)
      bar.dataContainerDataList.splice(index, 1)
      put({
        type: 'save',
        payload: {
          dataContainerDataList: bar.dataContainerDataList
        }
      })
    },
    * getDashboardDetails({ payload, cb }: any, { call, put, select }: any): any {
      try {
        let { layers, components, dashboardConfig, dashboardName } = yield http({
          url: `/visual/application/dashboard/detail/${payload}`,
          method: 'get',
        })
        // let extendedSomeAttrLayers = addSomeAttrInLayers(layers)
        // extendedSomeAttrLayers = deepFilterAttrs(extendedSomeAttrLayers, [ 'selected' ])
        yield layers = deepForEach(layers, (layer: ILayerGroup | ILayerComponent) => {
          layer.singleShowLayer = false
          delete layer.selected
          delete layer.hover
        })
        yield yield (put({
          type: 'getComponentsData',
          payload: components
        }))
        yield put({
          type: 'save',
          payload: {
            treeData: layers,
            components,
            dashboardId: payload,
            dashboardConfig,
            dashboardName
          },
        })
        cb({ dashboardConfig, dashboardName })
      } catch (e) {
        return e
      }
    },
    * getComponentsData({ payload }: any, { call, put, select }: any): any {
      const components = payload
      const bar: any = yield select(({ bar }: any) => bar)
      const componentData = bar.componentData
      const func = async (component: any) => {
        try {
          const data = await http({
            url: '/visual/module/getData',
            method: 'post',
            body: {
              moduleId: component.id,
              dataType: component.dataType,
              callBackParamValues:bar.callbackArgs
            }
          })

          if (data) {
            componentData[component.id] = component.dataType !== 'static' ? data : data.data
          } else {
            throw new Error('请求不到数据')
          }
        } catch (err) {
          componentData[component.id] = null
        }
        return componentData[component.id]
      }
      yield Promise.all(components.map((item: any) => func(item)))
      // 先获取数据，再生成画布中的组件树，这样避免组件渲染一次后又拿到数据再渲染一次
      yield put({
        type: 'save',
        payload: {
          componentData
        }
      })
    },
    // 重命名
    * changeName({ payload }: any, { call, put, select }: any): any {
      const bar: any = yield select(({ bar }: any) => bar)
      const newTree = reName(bar.treeData, bar.key, payload.newName)
      yield put({
        type: 'bar/change',
        payload,
      })
    },
    * group({ payload }: any, { call, put, select }: any): any {
      const bar: any = yield select(({ bar }: any) => bar)
      const { treeDataCopy, newLayerId }: any = yield group(bar.treeData, bar.key)
      yield put({
        type: 'update',
        payload: treeDataCopy,
      })
      yield put({
        type: 'save',
        payload: {
          key: [newLayerId],
        },
      })
    },
    * cancelGroup({ payload }: any, { call, put, select }: any): any {
      const bar = yield select(({ bar }: any) => bar)
      const newTree = cancelGroup(bar.treeData, bar.key)
      yield put({
        type: 'update',
        payload: newTree,
      })
    },
    * moveUp({ payload }: any, { call, put, select }: any): any {
      const bar = yield select(({ bar }: any) => bar)
      const newTree = moveUp(bar.treeData, bar.key)
      yield put({
        type: 'update',
        payload: newTree,
      })
    },
    * moveDown({ payload }: any, { call, put, select }: any): any {
      const bar = yield select(({ bar }: any) => bar)
      const newTree = moveDown(bar.treeData, bar.key)
      yield put({
        type: 'update',
        payload: newTree,
      })
    },
    * placedTop({ payload }: any, { call, put, select }: any): any {
      const bar = yield select(({ bar }: any) => bar)
      const newTree = placeTop(bar.treeData, bar.key)
      yield put({
        type: 'update',
        payload: newTree,
      })
    },
    * placedBottom({ payload }: any, { call, put, select }: any): any {
      const bar = yield select(({ bar }: any) => bar)
      const newTree = placeBottom(bar.treeData, bar.key)
      yield put({
        type: 'update',
        payload: newTree,
      })
    },
    // 更改图层组织
    * update({ payload }: any, { select, call, put }: any): any {
      const state: any = yield select((state: any) => state)
      const layers = yield http({
        url: '/visual/layer/update',
        method: 'post',
        body: {
          dashboardId: state.bar.dashboardId,
          layers: payload,
        },
      })
      yield put({
        type: 'updateTree',
        payload: layers,
      })
    },
    // 修改图层属性图层
    * change({ payload }: any, { call, put }: any): any {
      const layers = yield http({
        url: '/visual/layer/change',
        method: 'post',
        body: payload,
      })
      yield put({
        type: 'updateTree',
        payload: layers,
      })
    },
    // 添加组件到画布
    * addComponent({ payload }: any, { call, put }: any) {
      yield put({
        type: 'addLayer',
        payload: { final: payload.final, insertId: payload.insertId },
      })
    },
    // 删除图层、分组
    * delete({ payload }: any, { select, call, put }: any): any {
      const layers = yield http({
        url: '/visual/layer/delete',
        method: 'delete',
        body: payload,
      })
      yield put({
        type: 'deleteComponentData',
        payload: { id: payload.id }
      })
      const filterNullLayers = clearNullGroup(layers)
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
              display: 'none'
            }
          }
        }
      })
      yield put({
        type: 'updateTree',
        payload: filterNullLayers,
      })
      yield put({
        type: 'updateContainersEnableAndModules'
      })
    },
    // 复制图层
    * copy({ payload }: any, { select, call, put }: any): any {
      const { layers, components } = yield http({
        url: '/visual/layer/copy',
        method: 'post',
        body: payload,
      })
      yield put({
        type: 'updateComponents',
        payload: components,
      })
      yield put({
        type: 'updateTree',
        payload: layers,
      })
    },
    // 锁定
    * lock({ payload }: any, { call, put }: any): any {
      // 前端锁定
      yield put({
        type: 'frontLock',
        payload: {
          value: payload.configs[0].value,
        },
      })
      yield put({
        type: 'change',
        payload,
      })
    },
    // 隐藏 / 显示
    * hidden({ payload }: any, { call, put }: any): any {
      // console.log('隐藏的payload.value', payload)
      // 暂时先不启用前端隐藏
      // yield put({
      //   type: 'frontHidden',
      //   payload: {
      //     value: payload.configs[0].value,
      //   },
      // })
      yield put({
        type: 'change',
        payload,
      })
    },
    * fetch({ payload }: any, { call, put }: any): any {
      // eslint-disable-line
      yield put({ type: 'selectedNode', payload })
    },
    * chooseLayer({ payload }: any, { call, put, select }: any): any {
      yield put({
        type: 'save',
        payload: {
          isCanClearAllStatus: false,
        },
      })
      yield put({
        type: 'clearLayersSelectedStatus',
      })
      yield put({
        type: 'setSelectedKeys',
        payload,
      })
      yield put({
        type: 'calcDragScaleData',
      })
      const bar = yield select(({ bar }: any) => bar)
      yield put({
        type: 'save',
        payload: {
          key: bar.selectedComponentOrGroup.map((item: ILayerComponent) => item.id),
        },
      })
    },
    * selectLayers({ payload }: any, { call, put }: any): any {
      yield put({
        type: 'clearLayersSelectedStatus',
      })
      yield put({
        type: 'setLayers',
        payload,
      })
      // setComponentConfig / setGroupConfig
      yield put({
        type: 'setLayerConfig',
      })
      yield put({
        type: 'calcDragScaleData',
      })
    },
    * createComponent(
      { payload, itemData }: any,
      { call, put, select }: any,
    ): any {
      const state: any = yield select((state: any) => state)
      // 图层会插入到最后选中的图层或者Group上面，如果没有选中的图层，会默认添加到第一个
      const insertId =
        state.bar.key.length !== 0
          ? state.bar.key[state.bar.key.length - 1]
          : state.bar.treeData.length !== 0 ? state.bar.treeData[0].id : ''

      const { id, children }: any = yield http({
        url: '/visual/module/add',
        method: 'post',
        body: {
          dashboardId: state.bar.dashboardId,
          component: { ...payload, moduleType: itemData.moduleType},
          insertId: insertId,
          children: [], // TODO: 需要确定children从哪里来
        },
      })
      yield put({
        type: 'addComponentData',
        payload: {
          id,
          dataType: 'static'
        }
      })
      yield put({
        type: 'updateComponents',
        payload: { ...deepClone(payload), id: id, moduleType: itemData.moduleType, children: children },
      })
      // itemData.id = id

      yield put({
        type: 'addComponent',
        payload: { final: { ...itemData, id: id }, insertId: insertId },
      })
    },
    * updateComponent({ payload }: any, { call, put, select }: any): any {
      const state: any = yield select((state: any) => state)
      yield http({
        url: '/visual/module/update',
        method: 'post',
        body: {
          dashboardId: state.bar.dashboardId,
          configs: payload,
        },
      })
    },
    * getDataContainerList({ payload, cb }: any, { call, put, select }: any): any {
      const bar: any = yield select(({ bar }: any) => bar)
      const dashboardId = bar.dashboardId || payload
      console.log('bar', bar)
      const data = yield http({
        method: 'get',
        url: `/visual/container/list/${dashboardId}`
      })
      yield put({
        type: 'save',
        payload: {
          dataContainerList: data
        }
      })
      return data
      // console.log('data', data)
    },
    * addDataContainer({ payload }: any, { call, put, select }: any): any {
      const bar: any = yield select(({ bar }: any) => bar)
      const data = yield http({
        method: 'post',
        url: '/visual/container/add/',
        params: {
          id: '123'
        },
        body: {
          dashboardId: bar.dashboardId
        }
      })
      payload.cb(data)
    },
    * addComponentData({ payload }: any, { call, put, select }: any): any {
      const component = payload
      const bar: any = yield select(({ bar }: any) => bar)
      try {
        const data = yield http({
          url: '/visual/module/getData',
          method: 'post',
          body: {
            moduleId: component.id,
            dataType: component.dataType,
            callBackParamValues:bar.callbackArgs
          }
        })
        if (data) {
          bar.componentData[component.id] = component.dataType !== 'static' ? data : data.data
        } else {
          throw new Error('请求不到数据')
        }
      } catch (err) {
        bar.componentData[component.id] = null
      }
      yield put({
        type: 'save',
        componentData: bar.componentData
      })
    },
    * componentsBindContainer({ payload }: any, { call, put, select }: any): any {
      const { componentConfig, dataContainerIds } = payload
      componentConfig.dataContainers = dataContainerIds.map((id: string, index: number) => ({
        id,
        enable: true,
        rank: index
      }))
      yield put({
        type: 'setComponentConfig',
        payload: componentConfig
      })
      yield put({
        type: 'updateContainersEnableAndModules'
      })
    },
    // 获取系统素材分类的数据
    * getSystemMaterialClass({payload}:any,{ call, put }: any):any{
      let data = yield http({
        url: `/visual/resource/queryResourceTypeList?spaceId=1`,
        method: "get",
      })
      data.myTypes.map((item:any) => {
        item.groupId = item.type
        item.origin = 'myresource'
      })
      data.systemTypes.map((item:any) => {
        item.groupId = item.type
        item.origin = 'design'
        if(!item.type) item.groupId = 'sysAll'
      })
      let result = {
        design : data.systemTypes,
        myresource: data.myTypes
      }
      yield put({
        type: 'setSystemMaterialClass',
        payload: result
      })
    },
    // 获取系统素材数据
    * getSystemMaterialList({payload, cb}:any,{ call, put }: any):any{
      console.log('调用接口')
        const data = yield http({
          url: "/visual/resource/queryResourceList",
          method: "post",
          body: payload,
        });
        yield put({
          type: 'setSystemMaterialList',
          payload: data
        })
        cb(data.content)
    }
  },

  reducers: {
    changeModuleDefaultConfig(state: IBarState, { payload }: any) {
      const isExit = state.moduleDefaultConfig.filter((item) => {
        return item.moduleName === payload.moduleName
      })

      if (isExit.length === 0) {
        state.moduleDefaultConfig.push(payload)
      }
      return { ...state }
    },
    deleteComponentData(state: IBarState, { payload }: any) {
      // const { id } = payload
      // if (state.componentData[id]) {
      //   // delete state.componentData[id]
      // }
      return { ...state, componentData: state.componentData }
    },
    deleteDataContainer(state: IBarState, { payload }: any) {
      const { containerId, componentIds } = payload
      let index = state.dataContainerDataList.findIndex((item: any) => item.id === containerId)
      state.dataContainerDataList.splice(index, 1)
      index = state.dataContainerList.findIndex((item: any) => item.id === containerId)
      state.dataContainerList.splice(index, 1)



      // 组件解绑数据容器
      componentIds.forEach((id: string) => {
        const component = state.components.find(item => item.id === id)
        const index = component.dataContainers.findIndex((item: any) => item.id === containerId)
        component.dataContainers.splice(index, 1)
      })

      return { ...state, dataContainerList: state.dataContainerList, components: state.components }
    },
    copyDataContainer(state: IBarState, { payload }: any) {

      return { ...state }
    },
    updateDataContainer(state: IBarState, { payload }: any) {
      // containerData 是容器全部的数据信息, data 是 容器的数据 静态/动态数据
      const { containerData, data } = payload
      const container = state.dataContainerDataList.find((item: any) => item.id === containerData.id);
      const index = state.dataContainerList.findIndex((item: any) => item.id === containerData.id);
      console.log('-----------containerData', containerData)
      console.log('data', data)
      console.log('-------------')
      if (data) {
        if (container) {
          // container 存在，说明是修改
          container.data = data
        } else {
          // 不存在则新增
          state.dataContainerDataList.unshift({ id: containerData.id, data })
        }
      }
      if (index !== -1) {
        state.dataContainerList[index] = containerData
        console.log('state.dataContainerList[index]', state.dataContainerList[index])
      } else {
        state.dataContainerList.unshift(containerData)
      }
      return { ...state, dataContainerList: state.dataContainerList, dataContainerDataList: state.dataContainerDataList }
    }, // 设置右键菜单位置的信息
    setRightMenuInfo(state: IBarState, { payload }: any) {
      return { ...state, rightMenuInfo: payload }
    },
    changeDashboardId(state: IBarState, { payload }: any) {
      return { ...state, dashboardId: payload }
    },
    initTreeData(state: IBarState, { payload }: any) {
      payload.forEach((layer: any) => {
        layer.cancel = false
        // layer.disabled = false
      })
      return { ...state, treeData: payload }
    },
    // 更新树
    updateTree(state: IBarState, { payload }: any) {
      const extendedSomeAttrLayers = addSomeAttrInLayers(payload)
      return { ...state, treeData: extendedSomeAttrLayers.layers }
    },
    // 添加新的图层和组件
    addLayer(state: IBarState, { payload }: any) {
      let insertId: String
      const { treeData } = state
      if (payload.insertId && treeData.length) {
        insertId = payload.insertId
      } else {
        insertId = treeData.length !== 0 ? treeData[0].id : ''
      }
      const newLayers = generateLayers(state.treeData, insertId, payload.final)
      return { ...state, treeData: newLayers }
    },
    // 添加新的图层和组件
    updateComponents(state: IBarState, { payload }: any) {
      state.components = state.components.concat(payload)
      return { ...state }
    },
    clearLayersSelectedStatus(state: IBarState, { payload }: any) {
      state.selectedComponentOrGroup.forEach((item) => {
        item.selected = false
      })
      return {
        ...state,
      }
    },
    setSelectedKeys(state: IBarState, { payload }: any) {
      state.selectedComponentOrGroup = payload.reduce(
        (pre: any, cur: string) => {
          pre.push(findLayerById(state.treeData, cur))
          return pre
        },
        [],
      ).filter((layer: ILayerGroup | ILayerComponent) => (!layer.isLock && layer.isShow)) // 显示且未被锁
      state.selectedComponentOrGroup.forEach((item) => {
        item.selected = true
      })
      // 左侧树多选
      state.isMultipleTree = true
      state.isAreaChoose = state.selectedComponentOrGroup.length > 0
      state.selectedComponentIds = layerComponentsFlat(
        state.selectedComponentOrGroup,
      )
      state.selectedComponents = state.components.filter((component) => state.selectedComponentIds.includes(component.id))
      state.selectedComponentRefs = {}
      Object.keys(state.allComponentRefs).forEach((key) => {
        if (state.selectedComponentIds.includes(key)) {
          state.selectedComponentRefs[key] = state.allComponentRefs[key]
          state.selectedComponentDOMs[key] = state.allComponentDOMs[key]
        }
      })

      return { ...state }
    },
    setLayerConfig(state: IBarState, { payload }: any) {
      if (state.selectedComponentOrGroup.length === 1) {
        const layer = state.selectedComponentOrGroup[0]
        if (COMPONENTS in layer) {
          // 组
          const { x, y, width, height } = getLayerDimensionByDomId(layer.id)
          const dimensionConfig = state.groupConfig.find((config: any) => config.name === DIMENSION).value
          const hideDefaultConfig = state.groupConfig.find((config: any) => config.name === HIDE_DEFAULT)
          const opacityConfig = state.groupConfig.find((config: any) => config.name === OPACITY)
          const interactionConfig = state.groupConfig.find((config: any) => config.name === INTERACTION)
          hideDefaultConfig.value = layer[HIDE_DEFAULT] || false
          opacityConfig.value = layer[OPACITY] || 100
          interactionConfig.value = {
            ...interactionConfig.value,
            [MOUNT_ANIMATION]: layer[MOUNT_ANIMATION],
          }
          dimensionConfig.forEach((config: any) => {
            switch (config.name) {
              case LEFT:
                config.value = x
                break
              case TOP:
                config.value = y
                break
              case WIDTH:
                config.value = width
                break
              case HEIGHT:
                config.value = height
                break
            }
          })
        } else {
          // 组件
          state.componentConfig = layer
        }
      }
      return {
        ...state,
      }
    },
    calcDragScaleData(state: IBarState, { payload }: any) {
      let xPositionList: number[] = []
      let yPositionList: number[] = []
      let status: '分组' | '多组件' = '分组'
      if (state.selectedComponentOrGroup.length === 1) {
        const firstLayer = state.selectedComponentOrGroup[0]
        if (COMPONENTS in firstLayer) {
          // 单个组
          status = '分组'
          const positionArr = calcGroupPosition(
            firstLayer[COMPONENTS],
            state.components,
          )
          xPositionList = positionArr[0]
          yPositionList = positionArr[1]
        } else {
          // 单个组件
          const component = state.components.find(
            component => component.id === firstLayer.id,
          )
          const dimensionConfig: any = component.config.find(
            (item: any) => item.name === DIMENSION,
          )
          dimensionConfig.value.forEach((config: any) => {
            if ([LEFT, WIDTH].includes(config.name)) {
              xPositionList.push(config.value)
            } else if ([TOP, HEIGHT].includes(config.name)) {
              yPositionList.push(config.value)
            }
          })
          state.scaleDragData = {
            position: {
              x: xPositionList[0],
              y: yPositionList[0],
            },
            style: {
              display: 'block',
              width: xPositionList[1],
              height: yPositionList[1],
            },
          }
          state.componentConfig = component
          state.key = state.selectedComponentOrGroup.map((item: ILayerComponent) => item.id)

          return { ...state }
        }
      } else if (state.selectedComponentOrGroup.length > 1) {
        status = '多组件'
        state.selectedComponentOrGroup.forEach((layer: any) => {
          const positionArr = calcGroupPosition(
            state.selectedComponentOrGroup,
            state.components,
          )
          xPositionList = positionArr[0]
          yPositionList = positionArr[1]
        })
      }
      xPositionList.sort((a, b) => a - b)
      yPositionList.sort((a, b) => a - b)
      const width = xPositionList[xPositionList.length - 1] - xPositionList[0] || 0
      const height = yPositionList[yPositionList.length - 1] - yPositionList[0] || 0
      state.scaleDragData = {
        position: {
          x: xPositionList[0] || 0,
          y: yPositionList[0] || 0,
        },
        style: {
          display: xPositionList[0] ? 'block' : 'none',
          width,
          height,
        },
      }
      if (status === '分组') {
        const layer = state.selectedComponentOrGroup[0]
        const { opacity, hideDefault } = layer
        state.groupConfig.forEach((bigConfig: any, i: any) => {

        })
        const dimensionConfig = state.groupConfig.find((config: any) => config.name === DIMENSION).value
        dimensionConfig.forEach((config: any) => {
          switch (config.name) {
            case LEFT:
              config.value = xPositionList[0]
              break
            case TOP:
              config.value = yPositionList[0]
              break
            case WIDTH:
              config.value = width
              break
            case HEIGHT:
              config.value = height
              break
          }
        })
      }
      return {
        ...state,
      }
    },
    // 选中节点时，保存住整个node对象
    setLayers(state: IBarState, { payload }: any) {
      state.selectedComponentOrGroup = payload
      state.selectedComponentOrGroup.forEach((item) => {
        item.selected = true
      })
      state.selectedComponentIds = layerComponentsFlat(
        state.selectedComponentOrGroup,
      )
      state.selectedComponents = state.components.filter((component) => state.selectedComponentIds.includes(component.id))
      return { ...state }
    },
    // 在已经多选的情况下，点击右键时应该是往已选择节点[]里添加，而不是上面那种替换
    pushToSelectedNode(state: IBarState, { payload }: any) {
      const { key } = payload
      const newArr = [...(new Set(state.key.concat(key)) as any)]
      return { key: newArr }
    },
    // 点击icon或者右键菜单里的操作
    selectOperate(state: IBarState, { payload }: any) {
      return { ...state, ...payload }
    },
    // 控制右键菜单的显示和隐藏
    setIsShowRightMenu(state: IBarState, { payload }: any) {
      return { ...state, isShowRightMenu: payload }
    },
    findNode(state: IBarState, { payload: { id, callback } }: any) {
      callback(id)
      return { ...state }
    },
    selectSingleNode(state: IBarState, { payload: id }: any) {
      return { ...state }
    },
    testDrag(state: IBarState, { payload: { parentId } }: any) {
      // console.log('parentId', parentId)
      const ids = ['1-1', '1-1-1', '1-1-1-1']
      const copyState: IBarState = JSON.parse(JSON.stringify(state))
      // let childrenComponents = findParentNode(
      //   copyState.draggableItems,
      //   ids
      // ).filter((item: any) => item);
      // calculateGroupPosition(childrenComponents.reverse());
      return copyState
    },
    moveGroupPosition(
      state: IBarState,
      { payload: { id, xMoveLength, yMoveLength } }: any,
    ) {
      // const node = findNode(state.draggableItems, id);
      // moveChildrenComponents(node.components, xMoveLength, yMoveLength);
      // console.log("node", node);
      return { ...state }
    },
    // 多选时候，记录最后一次被右键点击的节点
    saveLastRightClickKey(state: IBarState, { payload }: any) {
      return { ...state, lastRightClick: payload }
    },
    // 置顶
    frontplacedTop(state: IBarState, { payload }: any) {
      const newTreeData = placeTop(state.treeData, state.key)
      return { ...state, treeData: newTreeData }
    },
    // 置底
    frontplaceBottom(state: IBarState, { payload }: any) {
      const newTreeData = placeBottom(state.treeData, state.key)
      return { ...state, treeData: newTreeData }
    },
    // 上移
    frontmoveUp(state: IBarState, { payload }: any) {
      const newTree = moveUp(state.treeData, state.key)
      return { ...state, treeData: newTree }
    },
    // 下移
    frontmoveDown(state: IBarState, { payload }: any) {
      const newTree = moveDown(state.treeData, state.key)
      return { ...state, treeData: newTree }
    },
    // 成组
    frontgroup(state: IBarState, { payload }: any) {
      const { treeDataCopy } = group(state.treeData, state.key)
      return { ...state, treeData: treeDataCopy }
    },
    // 取消成组
    cancelGroup(state: IBarState, { payload }: any) {
      const newTree = cancelGroup(state.treeData, state.key)
      return { ...state, treeData: newTree }
    },
    // TODO 粘贴
    // paste(state: IBarState, { payload }: any) {
    //   return { ...state };
    // },
    // 锁定
    lock(state: IBarState, { payload }: any) {
      const newTree = lock(state.treeData, state.key, payload.value)
      return { ...state, treeData: newTree }
    },
    // 删除
    delete(state: IBarState, { payload }: any) {
      const newTree = remove(state.treeData, state.key)
      return { ...state, treeData: newTree }
    },
    // 复制
    copy(state: IBarState, { payload }: any) {
      // const newTree = copy(state.treeData, state.key);
      // return { ...state, treeData: newTree };
      return { ...state }
    },
    //单独显示图层
    singleShowLayer(state: IBarState, { payload }: any) {
      const newTree = singleShowLayer(
        state.treeData,
        payload.keys,
        payload.singleShowLayer,
      )
      return { ...state, treeData: newTree }
    },
    // 隐藏
    frontHidden(state: IBarState, { payload }: any) {
      // 此处只能用payload.key,因为eyes图标在没有任何节点被选中时也要能响应点击
      const newTree = hidden(state.treeData, payload.key, payload.value)
      return { ...state, treeData: newTree }
    },
    // 改变重命名输入框的显示状态
    reName(state: IBarState, { payload }: any) {
      const newTree = showInput(state.treeData, state.key, payload.value)
      return { ...state, treeData: newTree }
    },
    // 真正改变名字的地方
    frontchangeName(state: IBarState, { payload }: any) {
      const newTree = reName(state.treeData, state.key, payload.newName)
      return { ...state, treeData: newTree }
    },
    mergeComponentLayers(state: IBarState, { payload }: any) {
      state.componentLayers = mergeComponentLayers(
        state.components,
        state.treeData,
      )
      return { ...state }
    },
    test(state: IBarState, { payload }: any) {
      return { ...state }
    },
    test2(state: IBarState) {
      return { ...state }
    },
    testDelete(state: IBarState) {
      state.components.pop()
      state.treeData.pop()
      return { ...state }
    },
    save(state: IBarState, { payload }: any) {
      return { ...state, ...payload }
    },
    selectComponentOrGroup(
      state: IBarState,
      { payload: { layer, config } }: any,
    ) {
      // 这里的 layer 代表的是 group / component
      // 是否支持多选
      if (state.isSupportMultiple) {
        // 多选
        layer.selected = true
        // 如果 selectedComponentOrGroup 里不存在当前点击的组件/分组的话，就添加
        if (
          !state.selectedComponentOrGroup.find((item) => item.id === layer.id)
        ) {
          (state.selectedComponentOrGroup as any).push(layer)
        }
      } else {
        // 单选
        // 单选分为单选组件、单选分组
        // 单选的话，将其他组件的 select 状态取消掉
        state.selectedComponentOrGroup.forEach((item) => {
          item.selected = false
        })
        // 再将自己的 select 状态设置为 true
        layer.selected = true
        // 再重新赋值 selectedComponentOrGroup 长度为 1
        state.selectedComponentOrGroup = [layer]
      }
      // 将选中的 layer 中的包含的所有 component 的 id 提取出来
      state.selectedComponentIds = layerComponentsFlat(
        state.selectedComponentOrGroup,
      )
      state.selectedComponentRefs = {}
      Object.keys(state.allComponentRefs).forEach((key) => {
        if (state.selectedComponentIds.includes(key)) {
          state.selectedComponentRefs[key] = state.allComponentRefs[key]
          state.selectedComponentDOMs[key] = state.allComponentDOMs[key]
        }
      })
      state.selectedComponents =
        state.components.filter((component) =>
          state.selectedComponentIds.includes(component.id),
        )
      return {
        ...state,
      }
    },
    // 清除所有状态
    clearAllStatus(state: IBarState, payload: any) {
      if (!state.isCanClearAllStatus) {
        state.isCanClearAllStatus = true
        return {
          ...state,
        }
      }
      localStorage.removeItem('dblComponentTimes')
      localStorage.removeItem('currentTimes')
      state.currentDblTimes = 0
      deepForEach(state.treeData, (layer: ILayerGroup | ILayerComponent) => {
        layer.selected = false
      })
      // 清空 selectedComponentOrGroup、selectedComponentIds、selectedComponents
      state.selectedComponentOrGroup.length = 0
      state.selectedComponentIds.length = 0
      state.selectedComponents.length = 0
      state.selectedComponentRefs = {}
      state.isSupportMultiple = false
      // todo 选区的时候会点击到这里
      state.scaleDragData.style.display = 'none'
      state.key = []
      state.supportLinesRef.handleSetPosition(0, 0, 'none')
      return { ...state }
    },
    updateContainersEnableAndModules(state: IBarState, { payload }: any) {
      // 更新数据容器的状态、绑定的组件数组
      const enableContainerList: any = []
      state.components.forEach((component) => {
        const layer = findLayerById(state.treeData, component.id)
        if (layer) {
          component.dataContainers.forEach((container: any) => {
            enableContainerList.push({
              componentName: component.name,
              componentId: component.id,
              containerId: container.id,
            })
          })
        }
      })
      state.dataContainerList.forEach((container: any) => {
        container.enable = !!enableContainerList.find((item: any) => item.containerId === container.id)
        container.modules = []
        enableContainerList.forEach((item: any) => {
          if (item.containerId === container.id) {
            container.modules.push({
              id: item.componentId,
              name: item.componentName
            })
          }
        })
      })
      return {
        ...state
      }
    },
    setComponentConfig(state: IBarState, { payload }: any) {
      state.componentConfig = payload
      // console.log('componentConfig', componentConfig)
      const index = state.components.findIndex((item: any) => {
        return item.id === payload.id
      })
      state.components.splice(index, 1, state.componentConfig)
      return { ...state }
    },
    setGroupConfig(state: IBarState, { payload }: any) {
      const {
        config: { position: { x, y }, style: { width, height }, opacity, hideDefault, interaction },
        ...otherPayload
      } = payload
      const dimensionConfig = state.groupConfig.find((config: any) => config.name === DIMENSION).value
      const hideDefaultConfig = state.groupConfig.find((config: any) => config.name === HIDE_DEFAULT)
      const opacityConfig = state.groupConfig.find((config: any) => config.name === OPACITY)
      const interactionConfig = state.groupConfig.find((config: any) => config.name === INTERACTION)
      hideDefaultConfig.value = (hideDefault || false)
      opacityConfig.value = (opacity || 100)
      interactionConfig.value = {
        ...interactionConfig.value,
        ...interaction,
      }
      dimensionConfig.forEach((config: any) => {
        switch (config.name) {
          case LEFT:
            config.value = x
            break
          case TOP:
            config.value = y
            break
          case WIDTH:
            config.value = width
            break
          case HEIGHT:
            config.value = height
            break
        }
      })
      return { ...state, ...otherPayload }
    },
    setAlignment(state: IBarState, { payload }: any) {
      const { position: { x, y }, style: { width, height } } = state.scaleDragData
      state.selectedComponentOrGroup.forEach((layer) => {
        if (COMPONENTS in layer) {
          // 组
          // 当前 layer 所包含的所有组件的 id 数组
          const layerDom: HTMLDivElement | any = document.querySelector(`.react-draggable[data-id=${layer.id}]`)
          let layerX: number = 0, layerY: number = 0, layerWidth: number = 0, layerHeight: number = 0
          if (layerDom) {
            const translateArr = layerDom.style.transform.replace('translate(', '').replace(')', '').replaceAll('px', '').split(', ')
            layerX = Number(translateArr[0])
            layerY = Number(translateArr[1])
            layerWidth = Number(layerDom.style.width.replace('px', ''))
            layerHeight = Number(layerDom.style.height.replace('px', ''))
          }
          const componentIds = layerComponentsFlat(layer[COMPONENTS])
          // 通过 id 筛选出当前组的组件
          const components = state.selectedComponents.filter((component: any) =>
            componentIds.includes(component.id),
          )
          components.forEach((component: any) => {
            const dimensionConfig = component.config.find((item: any) => item.name === DIMENSION).value
            if (dimensionConfig) {
              switch (payload) {
                case 'top':
                  setComponentDimension(dimensionConfig, { y: (y - layerY as any) }, 'add')
                  break
                case 'bottom':
                  setComponentDimension(dimensionConfig, { y: ((y + height) - (layerY + layerHeight) as any) }, 'add')
                  break
                case 'left':
                  setComponentDimension(dimensionConfig, { x: (x - layerX as any) }, 'add')
                  break
                case 'right':
                  setComponentDimension(dimensionConfig, { x: ((x + width) - (layerX + layerWidth) as any) }, 'add')
                  break
                case 'vertical':
                  setComponentDimension(dimensionConfig, { y: ((y + height / 2) - (layerY + layerHeight / 2) as any) }, 'add')
                  break
                case 'horizontal':
                  setComponentDimension(dimensionConfig, { x: ((x + width / 2) - (layerX + layerWidth / 2) as any) }, 'add')
                  break
              }
            }
          })
        } else {
          // 组件
          const component = state.selectedComponents.find((component: any) => component.id === layer.id)
          if (component) {
            const dimensionConfig = component.config.find((item: any) => item.name === DIMENSION).value
            if (dimensionConfig) {
              switch (payload) {
                case 'top':
                  setComponentDimension(dimensionConfig, { y }, 'set')
                  break
                case 'bottom':
                  setComponentDimension(dimensionConfig, { y: y + height }, 'update')
                  break
                case 'left':
                  setComponentDimension(dimensionConfig, { x }, 'set')
                  break
                case 'right':
                  setComponentDimension(dimensionConfig, { x: x + width }, 'update')
                  break
                case 'vertical':
                  setComponentDimension(dimensionConfig, { y: (y + height / 2 as any) }, 'center')
                  break
                case 'horizontal':
                  setComponentDimension(dimensionConfig, { x: (x + width / 2 as any) }, 'center')
                  break
              }
            }
          }
        }
      })
      return {
        ...state,
      }
    },
    setArrangement(state: IBarState, { payload }: any) {
      if (state.selectedComponentOrGroup.length <= 2) {
        return {
          ...state,
        }
      }
      const { position: { x, y }, style: { width, height } } = state.scaleDragData
      const xSortLayers: any = state.selectedComponentOrGroup.sort((a: any, b: any) => {
        const aIsGroup = (COMPONENTS in a)
        const bIsGroup = (COMPONENTS in b)
        const aDom: HTMLDivElement | any = document.querySelector(`.react-draggable[data-id=${aIsGroup ? a.id : 'component-' + a.id}]`)
        const bDom: HTMLDivElement | any = document.querySelector(`.react-draggable[data-id=${bIsGroup ? b.id : 'component-' + b.id}]`)
        const aTranslateArr = aDom.style.transform.replace('translate(', '').replace(')', '').replaceAll('px', '').split(', ')
        const aLayerX = Number(aTranslateArr[0])
        const bTranslateArr = bDom.style.transform.replace('translate(', '').replace(')', '').replaceAll('px', '').split(', ')
        const bLayerX = Number(bTranslateArr[0])
        return aLayerX - bLayerX
      })
      const xLength = xSortLayers.length
      //
      const xFirstLayer = xSortLayers[0] // 第一个
      const xLastLayer = xSortLayers[xLength - 1] // 倒数第一个
      const xLastPreLayer = xSortLayers[xLength - 2] // 倒数第二个

      const xLastLayerData = getLayerDimensionByDomId(COMPONENTS in xLastLayer ? xLastLayer.id : `component-${xLastLayer.id}`)
      const xFirstLayerData = getLayerDimensionByDomId(COMPONENTS in xFirstLayer ? xFirstLayer.id : `component-${xFirstLayer.id}`)
      const xLastPreLayerData = getLayerDimensionByDomId(COMPONENTS in xLastPreLayer ? xLastPreLayer.id : `component-${xLastPreLayer.id}`)


      let remainingSpaceWidth = width - xLastPreLayerData.width - xFirstLayerData.width

      // RemainingWidth 是除了前后两个 layer 宽度后的大小

      const remainingTotalWidth = xSortLayers.reduce((width: number, layer: any, index: number) => {
        if (index === 0 || index === xSortLayers.length - 1) {
          return width
        }
        const layerData = getLayerDimensionByDomId(COMPONENTS in layer ? layer.id : `component-${layer.id}`)
        return width + layerData.width
      }, 0)
      const xSpace = (remainingSpaceWidth - remainingTotalWidth) / (xSortLayers.length - 1)
      // distance 是当前 scaleDragData 的 x 值，即整个选择的区域内距离画布左侧的值
      xSortLayers.reduce((distance: number, layer: any, index: any) => {
        if (index === 0) {
          const layerData = getLayerDimensionByDomId(COMPONENTS in layer ? layer.id : `component-${layer.id}`)
          return distance + layerData.width
        }
        if (index === xSortLayers.length - 1) {
          if (xLastPreLayerData.x + xLastPreLayerData.width > xLastLayerData.x + xLastLayerData.width) {
            if (COMPONENTS in layer) {
              const layerData = getLayerDimensionByDomId(COMPONENTS in layer ? layer.id : `component-${layer.id}`)
              const componentIds = layerComponentsFlat(layer[COMPONENTS])
              // 通过 id 筛选出当前组的组件
              // 现在知道 distance + xSpace 是一个组/组件的位置, 所有 distance + xSpace - layerX， 让组里的每个组件的位置都增加这个值
              const components = state.selectedComponents.filter((component: any) => componentIds.includes(component.id))
              components.forEach((component: any) => {
                const dimensionConfig = component.config.find((item: any) => item.name === DIMENSION).value
                if (dimensionConfig) {
                  setComponentDimension(dimensionConfig, { x: (x + width) - (layerData.x + layerData.width) as any }, 'add')
                }
              })
            } else {
              const component = state.selectedComponents.find((component: any) => component.id === layer.id)
              const dimensionConfig = component.config.find((item: any) => item.name === DIMENSION).value
              if (dimensionConfig) {
                setComponentDimension(dimensionConfig, { x: null }, 'callback', (data: any) => {
                  return { x: (x + width) - (data.width + data.left), type: 'add' }
                })
              }
            }
          }
          return distance
        }
        if (COMPONENTS in layer) {
          const layerData = getLayerDimensionByDomId(COMPONENTS in layer ? layer.id : `component-${layer.id}`)
          const layerX = layerData.x
          const componentIds = layerComponentsFlat(layer[COMPONENTS])
          // 通过 id 筛选出当前组的组件
          // 现在知道 distance + xSpace 是一个组/组件的位置, 所有 distance + xSpace - layerX， 让组里的每个组件的位置都增加这个值
          const components = state.selectedComponents.filter((component: any) => componentIds.includes(component.id))
          components.forEach((component: any) => {
            const dimensionConfig = component.config.find((item: any) => item.name === DIMENSION).value
            if (dimensionConfig) {
              setComponentDimension(dimensionConfig, { x: (distance + xSpace - layerX as any) }, 'add')
            }
          })
          return distance + layerData.width + xSpace
        } else {
          const component = state.selectedComponents.find((component: any) => component.id === layer.id)
          const dimensionConfig = component.config.find((item: any) => item.name === DIMENSION).value
          if (dimensionConfig) {
            const data: any = setComponentDimension(dimensionConfig, { x: distance + xSpace as any }, 'set')
            return distance + data[WIDTH] + xSpace
          }
        }
        return distance
      }, x)
      return {
        ...state,
      }
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
        ...defaultData
      }
    },
    // 获取系统素材分类数据
    setSystemMaterialClass(state: any, { payload }: any){
      return {...state, systemMaterialClass: payload}
    },
    // 获取系统素材数据
    setSystemMaterialList(state: any, { payload }: any){
      return {...state, systemMaterialList: payload}
    }
  },
}
