/* eslint-disable import/no-anonymous-default-export */
import { selectSingleComponent, findParentNode, calculateGroupPosition } from '../utils';

interface IBarState {
  key: string[];
  isFolder: boolean;
  operate: string;
  draggableItems: any;
}

export default {
  namespace: 'bar',
  state: {
    key: [],
    isFolder: false,
    operate: '',
    draggableItems: [
      {
        id: '1-1',
        parentId: 'parent',
        style: {
          width: '100%',
          height: '100%',
          cursor: 'move',
          border: '1px solid gray',
          background: 'white',
        },
        displayName: '分组0',
        className: 'draggable-item',
        active: false,
        disabled: true,
        isGroup: true,
        defaultPosition: {
          x: 0,
          y: 0,
        },
        components: [
          {
            id: '1-1-2',
            parentId: '1-1',
            style: {
              left: 0,
              top: 0,
              width: 100,
              height: 100,
              cursor: 'move',
              border: '1px solid gray',
            },
            displayName: '什么',
            className: 'draggable-item',
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
            id: '1-1-1',
            parentId: '1-1',
            style: {
              width: 0,
              height: 0,
              cursor: 'move',
              border: '1px solid gray',
            },
            displayName: '分组1',
            className: 'draggable-item',
            active: false,
            disabled: true,
            isGroup: true,
            defaultPosition: {
              x: 0,
              y: 0,
            },
            components: [
              {
                id: '1-1-1-1',
                parentId: '1-1-1',
                style: {
                  width: 0,
                  height: 0,
                  cursor: 'move',
                  background: '#c4cfeb',
                },
                displayName: '分组2',
                className: 'draggable-item',
                active: false,
                disabled: true,
                isGroup: true,
                defaultPosition: {
                  x: 0,
                  y: 0,
                },
                components: [
                  {
                    id: '1-1-1-1-1',
                    parentId: '1-1-1-1',
                    style: {
                      width: 50,
                      height: 50,
                      cursor: 'move',
                      background: '#3c68d6',
                    },
                    className: 'draggable-item',
                    active: false,
                    defaultPosition: {
                      x: 100,
                      y: 100,
                    },
                    components: [],
                  }, {
                    id: '1-1-1-1-2',
                    parentId: '1-1-1-1',
                    style: {
                      width: 50,
                      height: 50,
                      cursor: 'move',
                      background: '#3c68d6',
                    },
                    className: 'draggable-item',
                    active: false,
                    defaultPosition: {
                      x: 100,
                      y: 100,
                    },
                    components: [],
                  }, {
                    id: '1-1-1-1-3',
                    parentId: '1-1-1-1',
                    style: {
                      width: 50,
                      height: 50,
                      cursor: 'move',
                      background: '#3c68d6',
                    },
                    className: 'draggable-item',
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
                id: '1-1-1-2',
                parentId: '1-1-1',
                style: {
                  width: 100,
                  height: 100,
                  cursor: 'move',
                  background: '#aef4f4',
                },
                className: 'draggable-item',
                active: false,
                defaultPosition: {
                  x: 100,
                  y: 100,
                },
                components: [],
              }, {
                id: '1-1-1-3',
                parentId: '1-1-1',
                style: {
                  width: 100,
                  height: 100,
                  cursor: 'move',
                  background: '#aef4f4',
                },
                className: 'draggable-item',
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
  } as IBarState,
  subscriptions: {
    setup ({ dispatch, history }: { dispatch: any; history: any }) {
      // eslint-disable-line
      history.listen((location: any) => {
        // console.log("location", location);
      });
    },
    onResize ({ dispatch, history }: any) {
      window.onresize = (e) => {
      };
    },
    keyEvent ({ dispatch, history }: any) {
      document.onkeydown = (e) => {
      };
    },
  },

  effects: {
    * fetch ({ payload }: any, { call, put }: any): any {
      // eslint-disable-line
      console.log('ssss', payload);
      yield put({ type: 'selectedNode', payload });
    },

  },

  reducers: {
    save (state: IBarState, action: any) {
      return { ...state, ...action.payload };
    },
    selectedNode (state: IBarState, { payload }: any) {
      return { ...state, ...payload };
    },
    // 在已经多选的情况下，点击右键时应该是往已选择节点[]里添加，而不是上面那种替换
    pushToSelectedNode (state: IBarState, { payload }: any) {
      const { key, isFolder } = payload;
      const newArr = [...(new Set(state.key.concat(key)) as any)];
      return { key: newArr, isFolder };
    },
    // 点击icon或者右键菜单里的操作
    selectOperate (state: IBarState, { payload }: any) {
      return { ...state, ...payload };
    },
    findNode (state: IBarState, { payload: { id, callback } }: any) {
      callback(id);
      return { ...state };
    },
    selectSingleNode (state: IBarState, { payload: id }: any) {
      const items = state.draggableItems;
      selectSingleComponent(items, id);
      return { ...state };
    },
    testDrag (state: IBarState, { payload: { parentId } }: any) {
      // console.log('parentId', parentId)
      const ids = ['1-1', '1-1-1', '1-1-1-1'];
      const copyState: IBarState = JSON.parse(JSON.stringify(state));
      let childrenComponents = findParentNode(copyState.draggableItems, ids).filter((item: any) => item);
      calculateGroupPosition(childrenComponents.reverse());
      return copyState;
    },
  },
};
