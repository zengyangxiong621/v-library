/* eslint-disable import/no-anonymous-default-export */
import {
  selectSingleComponent,
  findParentNode,
  calculateGroupPosition,
  findNode,
  moveChildrenComponents,
  mergeComponentLayers,
  layerComponentsFlat,
} from '../utils'

import {
  generateTreeData,
  placeTop,
  placeBottom,
  moveUp,
  moveDown,
  remove,
  // copy,
  lock,
  singleShowLayer,
  group,
  cancelGroup,
  reName,
  showInput,
  hidden,
} from '../utils/sideBar'

interface IBarState {
  key: string[];
  isFolder: boolean;
  operate: string;
  lastRightClick: string;
  treeData: any[];
  components: any[];
  isSupportMultiple: boolean;
  selectedComponentOrGroup: any[];
  selectedComponentIds: string[];
  componentLayers: any;
  selectedComponentRefs: any;
  supportLinesRef: any;
  selectedComponents: any;
  scaleDragData: any;
}

export default {
  namespace: 'bar',
  state: {
    key: [],
    isFolder: false,
    lastRightClick: '',
    operate: '',
    treeData: [],
    selectedComponentOrGroup: [],
    isSupportMultiple: false,
    selectedComponentIds: [],
    allComponentRefs: {},
    selectedComponents: [],
    selectedComponentRefs: {},
    dragStatus: '',
    supportLinePositionInfo: {
      x: 100,
      y: 200,
    },
    supportLinesRef: null,
    scaleDragData: {
      position: {
        x: 0,
        y: 0,
      },
      style: {
        width: 100,
        height: 100,
      },
    },
    components: [
      {
        id: 'components_1-2',
        name: '组件1',
        config: {
          style: {
            width: 200,
            height: 200,
          },
          position: {
            x: 200,
            y: 200,
          },
        },
      },
      {
        id: 'components_1-3',
        name: '组件2',
        config: {
          style: {
            width: 100,
            height: 100,
          },
          position: {
            x: 100,
            y: 100,
          },
        },
      },
      {
        id: 'components_1-1-1-1-2',
        name: '组件3',
        config: {
          style: {
            width: 50,
            height: 50,
          },
          position: {
            x: 300,
            y: 300,
          },
        },
      },
      {
        id: 'components_1-1-1-1-3',
        name: '组件4',
        config: {
          style: {
            width: 100,
            height: 100,
          },
          position: {
            x: 500,
            y: 500,
          },
        },
      },
      {
        id: 'components_1-1-1-2',
        name: '组件5',
        config: {
          style: {
            width: 100,
            height: 100,
          },
          position: {
            x: 400,
            y: 400,
          },
        },
      }, {
        id: 'components_1-1-1-3',
        name: '组件6',
        config: {
          style: {
            width: 300,
            height: 300,
          },
          position: {
            x: 500,
            y: 500,
          },
        },
      }, {
        id: 'components_1-1-2',
        name: '组件7',
        config: {
          style: {
            width: 300,
            height: 300,
          },
          position: {
            x: 0,
            y: 500,
          },
        },
      }, {
        id: 'components_1-1-3',
        name: '组件8',
        config: {
          style: {
            width: 50,
            height: 50,
          },
          position: {
            x: 0,
            y: 500,
          },
        },
      },
    ],
    componentLayers: [],
    treeRef: null,
    canvasConfigData: {
      type: '',
      config: {
        scale: 0.4125,
      },
      style: {
        width: 1920,
        height: 1080,
        background: '#21232E',
      },
    },
    pageConfigData: [
      {
        name: 'recommend',
        displayName: '屏幕大小',
        value: '0',
        options: [
          {
            name: '大屏推荐尺寸1920*1080',
            value: '0',
          },
          {
            name: 'web最常见尺寸1366*768',
            value: '1',
          },
          {
            name: 'web最小尺寸1024*768',
            value: '2',
          },
          {
            name: '自定义',
            value: '4',
          },
        ],
        width: 1920,
        height: 1080,
      },
      {
        name: 'style',
        displayName: '背景',
        value: '#000', // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
      },
      {
        name: 'background',
        displayName: '背景图',
        value: 'url', // 有背景图则返回背景图的url，没有背景图返回空或者null
      },
      {
        name: 'grid',
        displayName: '栅格间距',
        value: 5,
      },
      {
        name: 'zoom',
        displayName: '缩放设置',
        value: 0,
        options: [
          {
            name: '按屏幕比例适配',
            value: '0',
          },
          {
            name: '强制铺满',
            value: '1',
          },
          {
            name: '原比例展示溢出滚动',
            value: '2',
          },
        ],
      },
    ],
  } as IBarState,
  subscriptions: {
    init({ dispatch }: any) {
      const treeData = generateTreeData()
      dispatch({
        type: 'initTreeData',
        payload: treeData,
      })
    },
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
    * fetch({ payload }: any, { call, put }: any): any {
      // eslint-disable-line
      yield put({ type: 'selectedNode', payload })
    },
  },

  reducers: {
    initTreeData(state: IBarState, { payload }: any) {
      return { ...state, treeData: payload }
    },
    selectedNode(state: IBarState, { payload }: any) {
      // const items = state.draggableItems;
      // selectSingleComponent(items, payload.key[0]);
      return { ...state, ...payload }
    },
    // 选中节点时，保存住整个node对象
    setNodeList(state: IBarState, { payload }: any) {
      state.selectedComponentOrGroup.forEach(item => {
        item.selected = false
      })
      state.selectedComponentOrGroup = payload
      state.selectedComponentOrGroup.forEach(item => {
        item.selected = true
      })
      return { ...state }
    },
    // 在已经多选的情况下，点击右键时应该是往已选择节点[]里添加，而不是上面那种替换
    pushToSelectedNode(state: IBarState, { payload }: any) {
      const { key, isFolder } = payload
      const newArr = [ ...(new Set(state.key.concat(key)) as any) ]
      return { key: newArr, isFolder }
    },
    // 点击icon或者右键菜单里的操作
    selectOperate(state: IBarState, { payload }: any) {
      return { ...state, ...payload }
    },
    findNode(state: IBarState, { payload: { id, callback } }: any) {
      callback(id)
      return { ...state }
    },
    selectSingleNode(state: IBarState, { payload: id }: any) {
      // const items = state.draggableItems;
      // selectSingleComponent(items, id);
      return { ...state }
    },
    testDrag(state: IBarState, { payload: { parentId } }: any) {
      // console.log('parentId', parentId)
      const ids = [ '1-1', '1-1-1', '1-1-1-1' ]
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
    placedTop(state: IBarState, { payload }: any) {
      const newTreeData = placeTop(state.treeData, state.key)
      return { ...state, treeData: newTreeData }
    },
    // 置底
    placeBottom(state: IBarState, { payload }: any) {
      const newTreeData = placeBottom(state.treeData, state.key)
      return { ...state, treeData: newTreeData }
    },
    // 上移
    moveUp(state: IBarState, { payload }: any) {
      const newTree = moveUp(state.treeData, state.key)
      return { ...state, treeData: newTree }
    },
    // 下移
    moveDown(state: IBarState, { payload }: any) {
      const newTree = moveDown(state.treeData, state.key)
      return { ...state, treeData: newTree }
    },
    // 成组
    group(state: IBarState, { payload }: any) {
      const newTree = group(state.treeData, state.key, state.lastRightClick)
      console.log('newTree', newTree)
      return { ...state, treeData: newTree }
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
        state.key,
        payload.singleShowLayer,
      )
      return { ...state, treeData: newTree }
    },
    // 隐藏
    hidden(state: IBarState, { payload }: any) {
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
    changeName(state: IBarState, { payload }: any) {
      const newTree = reName(state.treeData, state.key, payload.newName)
      return { ...state, treeData: newTree }
    },
    mergeComponentLayers(state: IBarState, { payload }: any) {
      state.componentLayers = mergeComponentLayers(state.components, state.treeData)
      return { ...state }
    },
    test(state: IBarState) {
      console.log('gg ')
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
    selectComponentOrGroup(state: IBarState, {
      payload: {
        layer,
        config,
      },
    }: any) {
      // 这里的 layer 代表的是 group / component
      // 是否支持多选
      // if(state.selectedComponentOrGroup.find(item => item.id === layer.id)) {
      //   state.isSupportMultiple = true
      // } else {
      //   state.isSupportMultiple = false
      // }
      if(state.isSupportMultiple) {
        // 多选
        layer.selected = true
        // 如果 selectedComponentOrGroup 里不存在当前点击的组件/分组的话，就添加
        if(!state.selectedComponentOrGroup.find(item => item.id === layer.id)) {
          (state.selectedComponentOrGroup as any).push(layer)
        }
      } else {
        // 单选
        // 单选分为单选组件、单选分组
        // 单选的话，将其他组件的 select 状态取消掉
        state.selectedComponentOrGroup.forEach(item => {
          item.selected = false
        })
        // 再将自己的 select 状态设置为 true
        layer.selected = true
        // 再重新赋值 selectedComponentOrGroup 长度为 1
        state.selectedComponentOrGroup = [ layer ]
      }
      // 将选中的 layer 中的包含的所有 component 的 id 提取出来
      state.key = state.selectedComponentOrGroup.map(item => item.id)
      state.selectedComponentIds = layerComponentsFlat(state.selectedComponentOrGroup)
      return {
        ...state,
      }
    },
    // 清除所有状态
    clearAllStatus(state: IBarState, payload: any) {
      // 先将选中的 layer 的 select 状态清除
      state.selectedComponentOrGroup.forEach(layer => {
        layer.selected = false
      })
      // 清空 selectedComponentOrGroup、selectedComponentIds、selectedComponents
      state.selectedComponentOrGroup.length = 0
      state.selectedComponentIds.length = 0
      state.selectedComponents.length = 0
      state.selectedComponentRefs = {}
      state.isSupportMultiple = false
      state.scaleDragData.style.display = 'none'
      state.key.length = 0
      state.isFolder = false
      state.supportLinesRef.handleSetPosition(0, 0, 'none')
      return { ...state }
    },
  },
}
