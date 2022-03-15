import { mergeComponentLayers } from '../utils'
import { layerComponentsFlat } from '../utils'
import * as React from 'react'

type dragStatus = '多个' | '一分组' | '一组件' | ''

interface IState {
  name?: string;
  components: Array<IComponent>;
  layers: Array<ILayerGroup | ILayerComponent>;
  componentLayers: any;
  scaleDragData: {
    position: {
      x: number,
      y: number
    },
    style: {
      width: number,
      height: number
    }
  },
  selectedComponentOrGroup: Array<ILayerGroup | ILayerComponent> | [],
  isSupportMultiple: boolean,
  selectedComponentIds: Array<string> | [],
  allComponentRefs: {
    [keys: string]: React.RefObject<HTMLDivElement>
  } | {},
  selectedComponents: Array<IComponent> | [],
  selectedComponentRefs: {
    [keys: string]: React.RefObject<HTMLDivElement>
  } | {},
  dragStatus: dragStatus,
  supportLinePositionInfo: {
    x: number,
    y: number
  },
  supportLinesRef: any,
}

interface IComponent {
  id: string;
  name: string;
  staticData?: any;
  config: {
    style?: any,
    className?: string,
    position: {
      x: number,
      y: number
    }
  },
}

interface ILayerComponent {
  id: string,
  groupId: string,
  name: string,
  lock: boolean, // 是否锁定
  show: boolean, // 是否展示
  selected?: boolean, // 是否选中
  hover?: boolean, // 是否hover
  isFolder: boolean, // 是否为文件夹
}

interface ILayerGroup {
  id: string,
  name: string,
  lock: boolean, // 是否锁定
  show: boolean, // 是否展示
  collapse: boolean, // 是否展开
  selected?: boolean, // 是否选中
  hover?: boolean, // 是否hover
  components: Array<ILayerComponent>,
}

export default {
  namespace: 'canvas',
  state: {
    name: 'canvas',
    components: [
      {
        id: 'component_1',
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
        id: 'component_2',
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
        id: 'component_3',
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
        id: 'component_4',
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
        id: 'component_5',
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
        id: 'component_6',
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
        id: 'component_7',
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
        id: 'component_8',
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
    layers: [ {
      id: 'group_1',
      name: '分组1',
      lock: false, // 锁定
      show: true, // 展示
      collapse: true, // 收缩
      selected: false,
      hover: false,
      components: [
        {
          id: 'group_1-1',
          name: '分组1-1',
          lock: false,
          show: true,
          collapse: true,
          selected: false,
          hover: false,
          components: [
            {
              id: 'group_1-1-1',
              name: '分组1-1-1',
              lock: false,
              show: true,
              collapse: true,
              selected: false,
              hover: false,
              components: [
                {
                  id: 'group_1-1-1-1',
                  name: '分组1-1-1-1',
                  lock: false,
                  show: true,
                  collapse: true,
                  selected: false,
                  hover: false,
                  components: [
                    {
                      id: 'component_3',
                      name: '组件3',
                      lock: false,
                      show: true,
                      selected: false,
                      hover: false,
                    },
                    {
                      id: 'component_4',
                      name: '组件4',
                      lock: true,
                      show: true,
                      selected: false,
                      hover: false,
                    },
                  ],
                },
              ],
            },
            {
              id: 'component_2',
              name: '组件2',
              lock: false,
              show: true,
              selected: false,
              hover: false,
            },
          ],
        },
        {
          id: 'component_1',
          name: '组件1',
          lock: false,
          show: true,
          selected: false,
          hover: false,
        },
      ],
    }, {
      id: 'group_2',
      name: '分组2',
      lock: false, // 锁定
      show: true, // 展示
      collapse: true, // 收缩
      selected: false,
      hover: false,
      components: [
        {
          id: 'component_5',
          name: '组件5',
          lock: false,
          show: true,
          selected: false,
          hover: false,
        },
      ],
    },
      {
        id: 'group_3',
        name: '分组3',
        lock: false, // 锁定
        show: true, // 展示
        collapse: true, // 收缩
        selected: false,
        hover: false,
        components: [
          {
            id: 'component_6',
            name: '组件6',
            lock: false,
            show: true,
            selected: false,
            hover: false,
          }, {
            id: 'component_7',
            name: '组件7',
            lock: false,
            show: true,
            selected: false,
            hover: false,
          },
        ],
      },
      {
        id: 'component_8',
        name: '组件8',
        lock: false,
        show: true,
        selected: false,
        hover: false,
      } ],
    componentLayers: [],
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
  } as IState,
  subscriptions: {},

  effects: {},

  reducers: {
    mergeComponentLayers(state: IState, { payload }: any) {
      state.componentLayers = mergeComponentLayers(state.components, state.layers)
      return { ...state }
    },
    test(state: IState) {
      const layers = state.layers
      // const components = state.components;
      // const fn = (arr: any) => {
      //   let xPosition: Array<number> = [];
      //   let yPosition: Array<number> = [];
      //   arr.forEach((item: any) => {
      //     if (item.id.indexOf('group') !== -1) {
      //       if (item.components.length > 0) {
      //         const [xArr, yArr] = fn(item.components);
      //         xArr.sort();
      //         yArr.sort();
      //         item.conifg = {
      //           position: {
      //             x: xArr[0] || 0,
      //             y: yArr[0] || 0,
      //           },
      //           style: {
      //             width: (xArr[xArr.length - 1] - xArr[0]) || 0,
      //             height: (yArr[yArr.length - 1] - yArr[0]) || 0,
      //           },
      //         };
      //         xPosition = xPosition.concat(xArr);
      //         yPosition = yPosition.concat(yArr);
      //       }
      //     } else {
      //       item.config = components.find(it => it.id === item.id)?.config;
      //       xPosition.push(item.config.position.x, item.config.position.x + item.config.style.width);
      //       yPosition.push(item.config.position.y, item.config.position.y + item.config.style.height);
      //     }
      //   });
      //   return [xPosition, yPosition];
      // };
      // fn(layers);
      return { ...state }
    },
    test2(state: IState) {

      return { ...state }
    },
    testDelete(state: IState) {
      state.components.pop()
      state.layers.pop()
      return { ...state }
    },
    save(state: IState, { payload }: any) {
      return { ...state, ...payload }
    },
    selectComponentOrGroup(state: IState, {
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
      state.selectedComponentIds = layerComponentsFlat(state.selectedComponentOrGroup)
      return {
        ...state,
      }
    },
    // 清除所有状态
    clearAllStatus(state: IState, payload: any) {
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
      state.supportLinesRef.handleSetPosition(0, 0)
      return { ...state }
    },
  },

}
