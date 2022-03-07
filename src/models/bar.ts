/* eslint-disable import/no-anonymous-default-export */
import {
  selectSingleComponent,
  findParentNode,
  calculateGroupPosition,
  findNode,
  moveChildrenComponents,
} from "../utils";

import {
  generateTreeData,
  placeTop,
  placeBottom,
  moveUp,
  moveDown,
  remove,
  lock,
  singleShowLayer,
  group,
  cancelGroup,
  reName,
  showInput,
  hidden,
} from "../utils/sideBar";
interface IBarState {
  key: string[];
  isFolder: boolean;
  operate: string;
  lastRightClick: string;
  treeData: any[];
  draggableItems: any;
}

export default {
  namespace: "bar",
  state: {
    key: [],
    isFolder: false,
    lastRightClick: "",
    operate: "",
    treeData: [],
    draggableItems: [
      {
        id: "1-1",
        parentId: "0",
        style: {
          width: "100%",
          height: "100%",
          background: "white",
          border: "1px solid gray",
        },
        displayName: "分组0",
        className: "draggable-container",
        active: false,
        disabled: true,
        isGroup: true,
        defaultPosition: {
          x: 0,
          y: 0,
        },
        components: [
          {
            id: "1-1-2",
            parentId: "1-1",
            style: {
              width: 100,
              height: 100,
              cursor: "move",
              border: "1px solid gray",
            },
            displayName: "什么",
            className: "draggable-item",
            active: false,
            disabled: false,
            isGroup: false,
            defaultPosition: {
              x: 0,
              y: 0,
            },
            components: [],
          },
          {
            id: "1-1-1",
            parentId: "1-1",
            style: {
              width: 200,
              height: 200,
              cursor: "move",
              border: "1px solid gray",
            },
            displayName: "分组1",
            className: "draggable-item",
            active: false,
            disabled: true,
            isGroup: true,
            defaultPosition: {
              x: 100,
              y: 100,
            },
            components: [
              {
                id: "1-1-1-1",
                parentId: "1-1-1",
                style: {
                  width: 0,
                  height: 0,
                  cursor: "move",
                  background: "#c4cfeb",
                },
                displayName: "分组2",
                className: "draggable-item",
                active: false,
                disabled: true,
                isGroup: true,
                defaultPosition: {
                  x: 100,
                  y: 100,
                },
                components: [
                  {
                    id: "1-1-1-1-1",
                    parentId: "1-1-1-1",
                    style: {
                      width: 50,
                      height: 50,
                      cursor: "move",
                      background: "#3c68d6",
                    },
                    className: "draggable-item",
                    active: false,
                    defaultPosition: {
                      x: 100,
                      y: 100,
                    },
                    components: [],
                  },
                  {
                    id: "1-1-1-1-2",
                    parentId: "1-1-1-1",
                    style: {
                      width: 50,
                      height: 50,
                      cursor: "move",
                      background: "#3c68d6",
                    },
                    className: "draggable-item",
                    active: false,
                    defaultPosition: {
                      x: 100,
                      y: 100,
                    },
                    components: [],
                  },
                  {
                    id: "1-1-1-1-3",
                    parentId: "1-1-1-1",
                    style: {
                      width: 50,
                      height: 50,
                      cursor: "move",
                      background: "#3c68d6",
                    },
                    className: "draggable-item",
                    active: false,
                    defaultPosition: {
                      x: 100,
                      y: 100,
                    },
                    components: [],
                  },
                ],
              },
              {
                id: "1-1-1-2",
                parentId: "1-1-1",
                style: {
                  width: 100,
                  height: 100,
                  cursor: "move",
                  background: "#aef4f4",
                },
                className: "draggable-item",
                active: false,
                defaultPosition: {
                  x: 100,
                  y: 100,
                },
                components: [],
              },
              {
                id: "1-1-1-3",
                parentId: "1-1-1",
                style: {
                  width: 100,
                  height: 100,
                  cursor: "move",
                  background: "#aef4f4",
                },
                className: "draggable-item",
                active: false,
                defaultPosition: {
                  x: 200,
                  y: 200,
                },
                components: [],
              },
            ],
          },
        ],
      },
    ],
    draggableContainer: {
      id: "parent",
      parentId: "parent",
      style: {
        width: "100%",
        height: "100%",
        background: "white",
        position: "relative",
      },
      defaultPosition: {
        x: 0,
        y: 0,
      },
      displayName: "画板本身",
      className: "draggable-parent-container",
      limit: false,
      disabled: true,
      components: [
        {
          id: "1-1",
          parentId: "parent",
          style: {
            width: "100%",
            height: "100%",
            background: "white",
          },
          displayName: "分组0",
          className: "draggable-container",
          active: false,
          disabled: true,
          isGroup: true,
          defaultPosition: {
            x: 0,
            y: 0,
          },
          components: [
            {
              id: "1-1-2",
              parentId: "1-1",
              style: {
                left: 0,
                top: 0,
                width: 100,
                height: 100,
                cursor: "move",
                border: "1px solid gray",
              },
              displayName: "什么",
              className: "draggable-item",
              active: false,
              disabled: true,
              isGroup: false,
              defaultPosition: {
                x: 0,
                y: 0,
              },
              components: [],
            },
            {
              id: "1-1-1",
              parentId: "1-1",
              style: {
                width: 200,
                height: 200,
                cursor: "move",
                border: "1px solid gray",
              },
              displayName: "分组1",
              className: "draggable-item",
              active: false,
              disabled: false,
              isGroup: true,
              defaultPosition: {
                x: 100,
                y: 100,
              },
              components: [
                {
                  id: "1-1-1-1",
                  parentId: "1-1-1",
                  style: {
                    width: 0,
                    height: 0,
                    cursor: "move",
                    background: "#c4cfeb",
                  },
                  displayName: "分组2",
                  className: "draggable-item",
                  active: false,
                  disabled: false,
                  isGroup: true,
                  defaultPosition: {
                    x: 0,
                    y: 0,
                  },
                  components: [
                    {
                      id: "1-1-1-1-1",
                      parentId: "1-1-1-1",
                      style: {
                        width: 50,
                        height: 50,
                        cursor: "move",
                        background: "#3c68d6",
                      },
                      className: "draggable-item",
                      active: false,
                      defaultPosition: {
                        x: 100,
                        y: 100,
                      },
                      components: [],
                    },
                    {
                      id: "1-1-1-1-2",
                      parentId: "1-1-1-1",
                      style: {
                        width: 50,
                        height: 50,
                        cursor: "move",
                        background: "#3c68d6",
                      },
                      className: "draggable-item",
                      active: false,
                      defaultPosition: {
                        x: 100,
                        y: 100,
                      },
                      components: [],
                    },
                    {
                      id: "1-1-1-1-3",
                      parentId: "1-1-1-1",
                      style: {
                        width: 50,
                        height: 50,
                        cursor: "move",
                        background: "#3c68d6",
                      },
                      className: "draggable-item",
                      active: false,
                      defaultPosition: {
                        x: 100,
                        y: 100,
                      },
                      components: [],
                    },
                  ],
                },
                {
                  id: "1-1-1-2",
                  parentId: "1-1-1",
                  style: {
                    width: 100,
                    height: 100,
                    cursor: "move",
                    background: "#aef4f4",
                  },
                  className: "draggable-item",
                  active: false,
                  defaultPosition: {
                    x: 100,
                    y: 100,
                  },
                  components: [],
                },
                {
                  id: "1-1-1-3",
                  parentId: "1-1-1",
                  style: {
                    width: 100,
                    height: 100,
                    cursor: "move",
                    background: "#aef4f4",
                  },
                  className: "draggable-item",
                  active: false,
                  defaultPosition: {
                    x: 200,
                    y: 200,
                  },
                  components: [],
                },
              ],
            },
          ],
        },
      ],
    },
  } as IBarState,
  subscriptions: {
    init({ dispatch }: any) {
      const treeData = generateTreeData();
      dispatch({
        type: "initTreeData",
        payload: treeData,
      });
    },
    setup({ dispatch, history }: { dispatch: any; history: any }) {
      // eslint-disable-line
      history.listen((location: any) => {
        // console.log("location", location);
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
    *fetch({ payload }: any, { call, put }: any): any {
      // eslint-disable-line
      yield put({ type: "selectedNode", payload });
    },
  },

  reducers: {
    initTreeData(state: IBarState, { payload }: any) {
      return { ...state, treeData: payload };
    },
    selectedNode(state: IBarState, { payload }: any) {
      const items = state.draggableItems;
      selectSingleComponent(items, payload.key[0]);
      return { ...state, ...payload };
    },
    // 在已经多选的情况下，点击右键时应该是往已选择节点[]里添加，而不是上面那种替换
    pushToSelectedNode(state: IBarState, { payload }: any) {
      const { key, isFolder } = payload;
      const newArr = [...(new Set(state.key.concat(key)) as any)];
      return { key: newArr, isFolder };
    },
    // 点击icon或者右键菜单里的操作
    selectOperate(state: IBarState, { payload }: any) {
      return { ...state, ...payload };
    },
    findNode(state: IBarState, { payload: { id, callback } }: any) {
      callback(id);
      return { ...state };
    },
    selectSingleNode(state: IBarState, { payload: id }: any) {
      const items = state.draggableItems;
      selectSingleComponent(items, id);
      return { ...state };
    },
    testDrag(state: IBarState, { payload: { parentId } }: any) {
      // console.log('parentId', parentId)
      const ids = ["1-1", "1-1-1", "1-1-1-1"];
      const copyState: IBarState = JSON.parse(JSON.stringify(state));
      let childrenComponents = findParentNode(
        copyState.draggableItems,
        ids
      ).filter((item: any) => item);
      calculateGroupPosition(childrenComponents.reverse());
      return copyState;
    },
    moveGroupPosition(
      state: IBarState,
      { payload: { id, xMoveLength, yMoveLength } }: any
    ) {
      const node = findNode(state.draggableItems, id);
      moveChildrenComponents(node.components, xMoveLength, yMoveLength);
      // console.log("node", node);
      return { ...state };
    },
    // 多选时候，记录最后一次被右键点击的节点
    saveLastRightClickKey(state: IBarState, { payload }: any) {
      return { ...state, lastRightClick: payload };
    },
    // 置顶
    placedTop(state: IBarState, { payload }: any) {
      const newTreeData = placeTop(state.treeData, state.key);
      return { ...state, treeData: newTreeData };
    },
    // 置底
    placeBottom(state: IBarState, { payload }: any) {
      const newTreeData = placeBottom(state.treeData, state.key);
      return { ...state, treeData: newTreeData };
    },
    // 上移
    moveUp(state: IBarState, { payload }: any) {
      const newTree = moveUp(state.treeData, state.key);
      return { ...state, treeData: newTree };
    },
    // 下移
    moveDown(state: IBarState, { payload }: any) {
      const newTree = moveDown(state.treeData, state.key);
      return { ...state, treeData: newTree };
    },
    // 成组
    group(state: IBarState, { payload }: any) {
      const newTree = group(state.treeData, payload.key, state.lastRightClick);
      return { ...state, treeData: newTree };
    },
    // 取消成组
    cancelGroup(state: IBarState, { payload }: any) {
      const newTree = cancelGroup(state.treeData, payload.key);
      return { ...state, treeData: newTree };
    },
    // TODO 粘贴
    // paste(state: IBarState, { payload }: any) {
    //   return { ...state };
    // },
    // 锁定
    lock(state: IBarState, { payload }: any) {
      const newTree = lock(state.treeData, payload.key, payload.value);
      return { ...state, treeData: newTree };
    },
    // 删除
    delete(state: IBarState, { payload }: any) {
      const newTree = remove(state.treeData, payload.key);
      return { ...state, treeData: newTree };
    },
    // 复制
    copy(state: IBarState, { payload }: any) {
      return { ...state };
    },
    //单独显示图层
    singleShowLayer(state: IBarState, { payload }: any) {
      const newTree = singleShowLayer(
        state.treeData,
        payload.key,
        payload.singleShowLayer
      );
      return { ...state, treeData: newTree };
    },
    // 隐藏
    hidden(state: IBarState, { payload }: any) {
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
    changeName(state: IBarState, { payload }: any) {
      const newTree = reName(state.treeData, state.key, payload.newName);
      return { ...state, treeData: newTree };
    },
  },
};
