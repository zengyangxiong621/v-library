import { useState, useEffect, useRef } from "react";
import { connect } from "dva";
import { withRouter } from "dva/router";

import Draggable from "react-draggable";
import SingleDraggable from "../SingleDraggable/index";
import * as React from "react";
import "./index.less";
import { ILayerGroup, ILayerComponent, IComponent, ILayerPanel, DraggableEvent, DraggableData, IConfig, IMouse, IPanel } from "./type";
import { deepClone, layerComponentsFlat, calcGroupPosition } from "../../../../../utils";
import { generateTreeData } from "../../../../../utils/sideBar";
import SingleComponent from "../singleComponent";
import RemoteBaseComponent from "@/components/RemoteBaseComponent";
import { getComDataWithFilters, getFields } from "@/utils/data";
import BasicPieChart from "@/customComponents/echarts/components/basicPie/pie-1.1.4";
import Bar from "@/customComponents/echarts/components/bar/index";
import WorldMap from "@/customComponents/echarts/components/worldMap/v1.1.2";
import ChinaMap from "@/customComponents/echarts/components/chinaMap/v1.6.3";
import IndicatorCard from "@/customComponents/echarts/components/indicatorcard/v1.0.3";
import IconText from "@/customComponents/text/iconText";
// import textConfig from  '@/customComponents/text/iconText/config'
import SwiperText from '@/customComponents/text/swiperText'
import CustomText from '@/customComponents/text/customText'
import CustomTextConfig from '@/customComponents/text/customText/config'
import textConfig from '@/customComponents/echarts/components/worldMap/v1.1.2/config'
// import textConfig from '@/customComponents/text/swiperText/config'
import Counter from "@/customComponents/assist/counter2";
// import radarChartConfig from  '@/customComponents/assist/counter2/config'
import RadarChart from "@/customComponents/echarts/components/radarChart";
import radarChartConfig from "@/customComponents/echarts/components/radarChart/config";

import ErrorCatch from "react-error-catch";
import RemoteComponentErrorRender from "@/components/RemoteComponentErrorRender";

import Timeline from "@/customComponents/assist/timeline/v1.1.6";
import NormalTable from "@/customComponents/table/normalTable/v1.0.4";
import Media from "@/customComponents/media/v1.1.1";
import PaginationComp from "@/customComponents/paginationComp/v1.1.6";

// import CardFlipper1 from '@/customComponents/assist/CardFlipper_1'
// import CardFlipper2 from '@/customComponents/assist/CardFlipper_2'
import InstrumentPanel1 from "@/customComponents/echarts/components/instrumentPanel_1/v1.3.2";
import InstrumentPanel3 from "@/customComponents/echarts/components/instrumentPanel_3/v1.2.4";
import InstrumentPanel4 from "@/customComponents/echarts/components/instrumentPanel_4/v1.2.1";
import Cascader from "@/customComponents/assist/cascader/v1.0.7";


import {
  STYLE,
  DIMENSION,
  LEFT,
  TOP,
  WIDTH,
  HEIGHT,
  HIDE_DEFAULT,
  OPACITY,
  TEXT_STYLE,
  FONT_FAMILY,
  FONT_SIZE,
  COLOR,
  BOLD,
  ITALIC,
  LETTER_SPACING,
  LINE_HEIGHT,
  ALIGN,
  TEXT_ALIGN,
  TEXT_VERTICAL,
  SHADOW,
  SHOW,
  COMPONENTS, INTERACTION, MOUNT_ANIMATION,
} from "../../../../../constant/home";
import ScrollTable from "@/customComponents/table/scrollTable/index";
import TimeSelect from "@/customComponents/interactive/timeSelect/index";
import SelectV2 from '@/customComponents/assist/select/index'
import BasicBar from '@/customComponents/echarts/components/basicBar/v1.1.0'
import ZebraColumn from '@/customComponents/echarts/components/zebraColumn/v1.1.0'
import CusImage from '@/customComponents/assist/image/index'
import RankingBar from '@/customComponents/echarts/components/rankingBar/v1.1.1'

import Tab from "@/customComponents/interactive/tab/index";
import ScrollSelect from "@/customComponents/interactive/scrollSelect/index";
import ReferencePanel from "@/customComponents/dashboardEdit/referencePanel";
import DynamicPanel from "@/customComponents/dashboardEdit/dynamicPanel";
import { cloneDeep } from "lodash";

import { setComponentThemeConfigs } from "@/utils/syncJitStorage";
import DrillDownPanel from "@/customComponents/dashboardEdit/drillDownPanel";

// import Tab from "@/components/tab";

enum STYLE_ENUM {
  BOLD = "fontBold"
}


const CustomDraggable
  = ({
    bar,
    dispatch,
    layers,
    mouse,
    history,
    components,
    panels
  }: { bar: any, dispatch: any, layers: Array<ILayerGroup | ILayerComponent>, mouse: IMouse | 0, history: any, components: Array<IComponent>, panels: Array<IPanel> }) => {
    const callbackParamsList = bar.callbackParamsList;
    const callbackArgs = bar.callbackArgs;
    const scaleDragData = bar.scaleDragData;
    const isSupportMultiple: boolean = bar.isSupportMultiple;
    const allComponentRefs = bar.allComponentRefs;
    const allComponentDOMs = bar.allComponentDOMs;
    const supportLinesRef = bar.supportLinesRef;
    const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

    const nodeRef: any = useRef(null);
    const currentTimes: any = useRef(0);

    const clickTimer: any = useRef(null);

    useEffect(() => {
      localStorage.removeItem("dblComponentTimes");
      return () => {
      };
    }, []);

    /**
     * 鼠标事件顺序： dragStart, drag, dragEnd, click
     */
    /**
     * @desc 开始拖拽
     * @return void
     */
    const handleStart = (ev: DraggableEvent, data: DraggableData, layer: ILayerGroup | ILayerComponent | ILayerPanel, component: IComponent | undefined, config: IConfig) => {
      setStartPosition({
        x: data.x,
        y: data.y,
      });
      bar.selectedComponents = [];
      bar.dragStatus = "一组件";

      // 如果当前拖拽的组件并没有选中，那么就重新计算 scaleDrag 组件的位置
      if (!bar.selectedComponentOrGroup.find((item: any) => item.id === layer.id)) {
        dispatch({
          type: "bar/save",
          payload: {
            scaleDragData: {
              position: config.position,
              style: {
                display: "block",
                ...config.style,
              },
            },
          },
        });
      }
      if ("panelType" in layer) {
        bar.dragStatus = "一面板";
      }
      if (bar.selectedComponentOrGroup.length > 1) {
        // 注意一下
        // 选中多个组件、或者多个分组时
        bar.dragStatus = "多个";
      } else {
        // 当选中了一个分组时，或者没有选中时
        if (COMPONENTS in layer) {
          bar.dragStatus = "一分组";
          bar.selectedComponentIds = layerComponentsFlat((layer as any)[COMPONENTS]);
        }
      }
      bar.selectedComponents = [...components.filter(component => bar.selectedComponentIds.includes(component.id)), ...panels.filter((panel: IPanel) => bar.selectedComponentIds.includes(panel.id))];
    };
    const handleDrag = (ev: DraggableEvent | any, data: DraggableData, layer: ILayerGroup | ILayerComponent, component: IComponent | undefined, config: IConfig) => {
      ev.stopPropagation();
      // console.log('dragging', layer)
      // 向上取整
      const aroundX = Math.ceil(data.x);
      const aroundY = Math.ceil(data.y);
      const xMoveLength = data.x - data.lastX;
      const yMoveLength = data.y - data.lastY;
      bar.scaleDragCompRef.handleSetPosition(xMoveLength, yMoveLength);
      if ((component && bar.dragStatus === "一组件") || bar.dragStatus === "一面板") {
        // 单个组件/面板移动
        supportLinesRef.handleSetPosition(aroundX, aroundY);
      }
      if (bar.dragStatus === "一分组") {
        // 小组移动
        supportLinesRef.handleSetPosition(aroundX, aroundY);
      }
      if (bar.dragStatus === "多个") {
        const xPositionList: number[] = [];
        const yPositionList: number[] = [];
        bar.selectedComponents.forEach((item: IComponent | IPanel) => {
          if ("type" in item) {
            const { config: { left, top, width, height } } = item;
            xPositionList.push(left, left + width);
            yPositionList.push(top, top + height);
          } else {
            const styleDimensionConfig = item.config.find((item: any) => item.name === DIMENSION);
            if (styleDimensionConfig) {
              const config: IConfig = {
                position: {
                  x: 0,
                  y: 0,
                },
                style: {
                  width: 0,
                  height: 0,
                },
              };
              Object.values(styleDimensionConfig.value).forEach((obj: any) => {
                if ([TOP, LEFT].includes(obj.name)) {
                  config.position[obj.name === TOP ? "y" : "x"] = obj.value;
                } else if ([WIDTH, HEIGHT].includes(obj.name)) {
                  config.style[obj.name === WIDTH ? "width" : "height"] = obj.value;
                }
              });
              xPositionList.push(config.position.x, config.position.x + config.style.width);
              yPositionList.push(config.position.y, config.position.y + config.style.height);
            }
          }

        });
        xPositionList.sort((a, b) => a - b);
        yPositionList.sort((a, b) => a - b);
        // console.log('应该处在的位置', { left: xPositionList[0], top: yPositionList[0] })
        supportLinesRef.handleSetPosition(xPositionList[0], yPositionList[0]);

        Object.keys(bar.selectedComponentRefs).forEach(key => {
          if (key.indexOf("group") !== -1) {
            delete bar.selectedComponentRefs[key];
          }
        });
        // console.log('bar.selectedComponentRefs', bar.selectedComponentRefs)
        // scaleDragCom 组件实时移动

        if (layer.id in bar.selectedComponentRefs) {
          bar.isSupportMultiple = true;
          // 当选中多个组件/小组的时候，并且当前移动的组件也在这些已经选中的 组件/小组 之中
          Object.keys(bar.selectedComponentRefs).forEach((key: any) => {
            // 取出 transform 中 translate 的 x, y 值
            const translateArr = bar.selectedComponentDOMs[key].style.transform.replace("translate(", "").replace(")", "").replaceAll("px", "").split(", ");
            const translateX = Number(translateArr[0]);
            const translateY = Number(translateArr[1]);
            // 重新给 transform 赋值
            bar.selectedComponentDOMs[key].style.transform = `translate(${translateX + xMoveLength}px, ${translateY + yMoveLength}px)`;
            bar.selectedComponentRefs[key].handleSetPosition(xMoveLength, yMoveLength);
          });
        } else {
          bar.isSupportMultiple = false;
        }
      }
    };
    const handleStop = (ev: DraggableEvent, data: DraggableData, layer: ILayerGroup | ILayerComponent | ILayerPanel, component: IComponent | undefined, config: IConfig) => {
      supportLinesRef.handleSetPosition(0, 0, "none");
      dispatch({
        type: "bar/selectComponentOrGroup",
        payload: {
          layer,
          config,
        },
      });
      dispatch({
        type: "bar/setIsShowRightMenu",
        payload: false,
      });
      if ("panelType" in layer) {
        // 说明是面板,且一定是单个
        // console.log('111111111111111111111111')
        const panel: any = panels.find((panel: IPanel) => panel.id === layer.id);
        panel.config.left = Math.ceil(data.x);
        panel.config.top = Math.ceil(data.y);
        dispatch({
          type: "bar/save",
          payload: {
            scaleDragData: {
              position: {
                x: panel.config.left,
                y: panel.config.top,
              },
              style: {
                display: "block",
                width: panel.config.width,
                height: panel.config.height,
              }
            },
            panelConfig: panel
          }
        });
      } else if (component && "config" in component && bar.selectedComponentOrGroup.length === 1) {
        // 单个组件移动
        // console.log('2222222222222222222222222')
        const styleDimensionConfig: any = component.config.find((item: any) => item.name === DIMENSION);
        if (styleDimensionConfig) {
          styleDimensionConfig.value.forEach((item: any) => {
            if (item.name === LEFT) {
              item.value = Math.ceil(data.x);
            } else if (item.name === TOP) {
              item.value = Math.ceil(data.y);
            }
          });
          dispatch({
            type: "bar/save",
            payload: {
              scaleDragData: {
                position: {
                  x: data.x,
                  y: data.y,
                },
                style: {
                  display: "block",
                  width: config.style.width,
                  height: config.style.height,
                },
              },
              componentConfig: component,
              sizeChange: {
                change: true,
                config: {
                  left: Math.ceil(data.x),
                  top: Math.ceil(data.y),
                  width: config.style.width,
                  height: config.style.height,
                },
              },
            },
          });
        }
      } else if (COMPONENTS in layer && bar.selectedComponentOrGroup.length === 1) {
        // 单个组移动
        // console.log('3333333333333333333333333333')
        // console.log('单个组', layer)
        // console.log('bar.selectedComponents', bar.selectedComponents)
        const xMoveLength = Math.ceil(data.x - startPosition.x);
        const yMoveLength = Math.ceil(data.y - startPosition.y);
        bar.selectedComponents.forEach((item: IComponent | IPanel) => {
          if ("type" in item) {
            item.config.left += xMoveLength;
            item.config.top += yMoveLength;
          } else {
            const dimensionConfig = item.config.find((item: any) => item.name === DIMENSION).value;
            if (dimensionConfig) {
              dimensionConfig.forEach((item: any) => {
                if (item.name === LEFT) {
                  item.value += xMoveLength;
                } else if (item.name === TOP) {
                  item.value += yMoveLength;
                }
              });
            }
          }
        });
        dispatch({
          type: "bar/setGroupConfig",
          payload: {
            config: {
              position: {
                x: data.x,
                y: data.y,
              },
              style: {
                width: config.style.width,
                height: config.style.height,
              },
              [OPACITY]: layer[OPACITY],
              [HIDE_DEFAULT]: layer[HIDE_DEFAULT],
              [INTERACTION]: {
                [MOUNT_ANIMATION]: layer[MOUNT_ANIMATION],
              },
            },
            scaleDragData: {
              position: {
                x: data.x,
                y: data.y,
              },
              style: {
                display: "block",
                width: config.style.width,
                height: config.style.height,
              },
            },
          },
        });
      }
      if (bar.selectedComponentOrGroup.length > 1) {
        // console.log('4444444444444444444444444')
        // console.log('selectedComponentOrGroup', bar.selectedComponentOrGroup)
        // console.log('bar.selectedComponentIds', bar.selectedComponentIds)
        const xPositionList: Array<number> = [];
        const yPositionList: Array<number> = [];
        bar.selectedComponents = [
          ...components.filter((component: IComponent) => bar.selectedComponentIds.includes(component.id)),
          ...panels.filter((panel: IPanel) => bar.selectedComponentIds.includes(panel.id))
        ];
        bar.selectedComponents.forEach((item: IComponent | IPanel) => {
          // const style_config = item.config.find((item: any) => item.name === STYLE)
          let config: IConfig = {
            position: {
              x: 0,
              y: 0,
            },
            style: {
              width: 0,
              height: 0,
            },
          };
          if ("type" in item) {
            const { config: { left, top, width, height } } = item;
            config = {
              position: {
                x: left,
                y: top
              },
              style: {
                width,
                height
              }
            };
          } else {
            const styleDimensionConfig = item.config.find((item: any) => item.name === DIMENSION);
            if (styleDimensionConfig) {
              Object.values(styleDimensionConfig.value).forEach((obj: any) => {
                if (["top", "left"].includes(obj.name)) {
                  config.position[obj.name === "top" ? "y" : "x"] = obj.value;
                } else if (["width", "height"].includes(obj.name)) {
                  config.style[obj.name === "width" ? "width" : "height"] = obj.value;
                }
              });
            }
          }
          xPositionList.push(config.position.x, config.position.x + config.style.width);
          yPositionList.push(config.position.y, config.position.y + config.style.height);
        });
        xPositionList.sort((a, b) => a - b);
        yPositionList.sort((a, b) => a - b);
        if (layer.id in bar.selectedComponentRefs) {
          const xMoveLength = data.x - data.lastX;
          const yMoveLength = data.y - data.lastY;
        }
        // console.log('----------------------------')
        // console.log('xPositionList', xPositionList)
        // console.log('yPositionList', yPositionList)
        // 在dva里计算
        dispatch({
          type: "bar/save",
          payload: {
            isMultipleTree: true,
            scaleDragData: {
              position: {
                x: xPositionList[0],
                y: yPositionList[0],
              },
              style: {
                display: "block",
                width: xPositionList[xPositionList.length - 1] - xPositionList[0],
                height: yPositionList[yPositionList.length - 1] - yPositionList[0],
              },
            },
          },
        });
      } else {
        /*        dispatch({
                  type: 'bar/save',
                  payload: {
                    scaleDragData: {
                      position: {
                        x: data.x,
                        y: data.y,
                      },
                      style: {
                        display: 'block',
                        width: 0,
                        height: 0,
                      },
                    },
                  },
                })*/
      }
      dispatch({
        type: "bar/updateComponent",
        payload: bar.selectedComponents,
      });
      // 这里要等待将 componentConfig/groupConfig 设置完之后才能个 state.key 赋值，因为右侧是 根据 key 值变化而变化，但是 componentConfig/groupConfig 比 key 更早变化
      dispatch({
        type: "bar/save",
        payload: {
          key: bar.selectedComponentOrGroup.map((item: ILayerComponent) => item.id),
        },
      });
    };
    const handleClick = (e: DraggableEvent, layer: ILayerGroup | ILayerComponent, config: IConfig) => {
      clearTimeout(clickTimer.current);
      clickTimer.current = setTimeout(() => {
      }, 400);
      localStorage.removeItem("dblComponentTimes");
      e.stopPropagation();
    };
    const handleDblClick = (e: DraggableEvent, layer: ILayerGroup | ILayerComponent | ILayerPanel, config: IConfig) => {
      clearTimeout(clickTimer.current);
      if ("panelType" in layer) {
        const panel: any = panels.find((panel: IPanel) => panel.id === layer.id);
        if (layer.panelType === 0) {
          dispatch({
            type: "bar/save",
            payload: {
              isPanel: true,
              panelId: layer.id,
              treeData: [],
              selectedComponents: [],
              selectedComponentOrGroup: [],
              selectedComponentIds: [],
              scaleDragData: {
                position: {
                  x: 0,
                  y: 0
                },
                style: {
                  width: 0,
                  height: 0,
                  display: "none"
                }
              }
            }
          });
          if (panel.states[0]?.id) {
            history.push(`/dashboard/${bar.dashboardId}/panel-${layer.id}/state-${panel.states[0].id}`);
            dispatch({
              type: "bar/getPanelDetails"
            });
            dispatch({
              type: "bar/selectPanelState",
              payload: {
                stateId: panel.states[0].id
              }
            });
          } else {
            history.push(`/dashboard/${bar.dashboardId}/panel-${layer.id}`);
          }

        } else if (layer.panelType === 1) {
          if (panel.states.length > 0) {
            history.push(`/dashboard/${panel.states[0].id}`);
            dispatch({
              type: "bar/save",
              payload: {
                isPanel: false,
                stateId: null,
                panelId: null,
                key: [],
                selectedComponentOrGroup: [],
                dashboardId: panel.states[0].id,
                scaleDragData: {
                  position: {
                    x: 0,
                    y: 0
                  },
                  style: {
                    width: 0,
                    height: 0,
                    display: "none"
                  }
                }
              }
            });
            dispatch({
              type: "bar/getDashboardDetails"
            });
          }
        } if (layer.panelType === 2) {
          // 下钻面板
          dispatch({
            type: "bar/save",
            payload: {
              isPanel: true,
              panelId: layer.id,
              treeData: [],
              selectedComponents: [],
              selectedComponentOrGroup: [],
              selectedComponentIds: [],
              scaleDragData: {
                position: {
                  x: 0,
                  y: 0
                },
                style: {
                  width: 0,
                  height: 0,
                  display: "none"
                }
              }
            }
          });
          history.push(`/dashboard/${bar.dashboardId}/panel-${layer.id}/state-${panel.states[0].id}`);
          dispatch({
            type: "bar/getPanelDetails"
          });
          dispatch({
            type: "bar/selectPanelState",
            payload: {
              stateId: panel.states[0].id
            }
          });
        }
        // 只要点击了面板，就将面板的类型保存到全局状态中
        dispatch({
          type: "bar/save",
          payload: {
            curPanelType: layer.panelType
          }
        });
      }
    };
    const handleMouseOver = (e: DraggableEvent, component: ILayerGroup | ILayerComponent) => {
      if (component.hover) {
        return;
      }
      component.hover = true;
      // dispatch({
      //   type: 'bar/save',
      // })
    };
    const handleMouseOut = (e: DraggableEvent, component: ILayerGroup | ILayerComponent) => {
      component.hover = false;
      // dispatch({
      //   type: 'bar/save',
      // })
    };
    const mouseRightClick = (e: any, layer: ILayerGroup | ILayerComponent, component: IComponent | undefined, config: IConfig) => {
      if (Object.keys(bar.selectedComponentRefs).length > 1 && layer.id in bar.selectedComponentRefs) {
        bar.isSupportMultiple = true;
      } else {
        bar.isSupportMultiple = false;
      }
      e.persist();
      e.preventDefault();
      if (layer.isLock) {
        return;
      }
      dispatch({
        type: "bar/selectComponentOrGroup",
        payload: {
          layer,
          config,
        },
      });
      dispatch({
        type: "bar/save",
        payload: {
          isShowRightMenu: true,
          rightMenuInfo: {
            x: e.clientX,
            y: e.clientY,
            id: layer.id,
            isFolder: false,
          },
          key: bar.selectedComponentOrGroup.map((item: ILayerComponent) => item.id),
        }
      });
      if (bar.selectedComponentOrGroup.length === 1) {
        if (component && "config" in component) {
          dispatch({
            type: "bar/save",
            payload: {
              componentConfig: component,
            }
          });
        }
        dispatch({
          type: "bar/save",
          payload: {
            scaleDragData: {
              position: {
                x: config.position.x,
                y: config.position.y,
              },
              style: {
                display: "block",
                width: config.style.width,
                height: config.style.height,
              },
            },
          }
        });
      }
    };
    // 数组去重，取最后一个
    const duplicateFn = (arr = []) => {
      const map: any = new Map();
      for (const item of arr.reverse()) {
        if (!map.has((item as any).target)) {
          map.set((item as any), item);
        }
      }
      return [...map.values()];
    };
    // 组件初始化时发生 handleValue 传递的值
    const handleValueChange = (data: { [key: string]: any }, component: IComponent, componentId: string) => {
      // console.log('handleValueChange')
      // console.log('value', data)
      // 编辑时回调参数生效逻辑
      const currentActiveCompoentData = bar.currentActiveCompoentData;
      currentActiveCompoentData[componentId] = data;
      dispatch({
        type: "bar/save",
        payload: {
          currentActiveCompoentData
        },
      });
      // 页面刷新或者进入画布时回调参数生效逻辑
      const compCallbackArgs = duplicateFn(cloneDeep(component.callbackArgs));
      // 回调参数列表
      // 过滤出 callbackParamsList 中的存在 sourceId === component 的 每一项
      const sourceCallbackList = callbackParamsList.filter((item: any) => item.sourceModules.find((jtem: any) => jtem.id === componentId));
      // 需要作用到哪些组件上
      let activeIds: Array<string> = [];
      let temp = false;
      sourceCallbackList.forEach((item: any) => {
        item.sourceModules.forEach((sourceItem: any) => {
          if (sourceItem.id === componentId) {
            // 回调列表中的当前数据如果有目标组件再进行下一步
            // 循环组件设置的回调参数，获取变量名和字段的对应关系
            if (item.destinationModules.length > 0) {
              compCallbackArgs.forEach((callback, index) => {
                // 判断是否为同一个源
                if (item.callbackParam === callback.target) {
                  // 翻页组件不需要配置origin
                  if (component.moduleName === 'paginationComp') {
                    temp = true
                    callbackArgs[callback.target] = data[callback.target]
                    activeIds = activeIds.concat(item.destinationModules.map((module: any) => module.id))
                    // 值是否改变
                    // data的值存在并且
                  } else if (data[callback.origin] && callbackArgs[callback.target] !== data[callback.origin]) {
                    temp = true
                    callbackArgs[callback.target] = data[callback.origin]
                    activeIds = activeIds.concat(item.destinationModules.map((module: any) => module.id))
                  }

                  dispatch({
                    type: "bar/save",
                    payload: {
                      callbackArgs
                    }
                  });
                }
              });
            }
          }
        });
      });
      // console.log('回调参数作用到的组件ID有：', activeIds)
      if (temp) {
        activeIds = [...(new Set(activeIds) as any)];
        const activeComponents = activeIds.reduce((pre, id) => pre.concat(components.find((item: IComponent) => item.id === id)), []);
        // 绑定数据容器的组件列表
        const componentsByDataContainer = activeComponents.filter((component: IComponent) => component.dataFrom === 1);
        // 绑定数据源的组件列表
        const componentsByDataSource = activeComponents.filter((component: IComponent) => component.dataFrom === 0);
        // 重新获取部分组件（绑定数据源的组件列表）的数据
        dispatch({
          type: "bar/getComponentsData",
          payload: activeComponents
        });
        // 重新获取部分数据容器的数据
        const filterComponentsByDataContainer: any = [];
        // 去重
        activeComponents.forEach((component: IComponent) => {
          component.dataContainers.forEach((container: any) => {
            if (!filterComponentsByDataContainer.find((item: any) => item.id === container.id)) {
              filterComponentsByDataContainer.push(container);
            }
          });
        });
        dispatch({
          type: "bar/getContainersData",
          payload: filterComponentsByDataContainer
        });
      }

    };

    const onThemeChange = (val: any) => {
      setComponentThemeConfigs(val.id, val);
    };
    return (
      <div className="c-custom-draggable">
        {
          layers.map((layer: ILayerGroup | ILayerComponent | any) => {

            let config: IConfig = {
              position: {
                x: 0,
                y: 0,
              },
              style: {
                width: 0,
                height: 0,
              },
            };
            const isGroup: boolean = (COMPONENTS in layer);
            const isPanel: boolean = ("panelType" in layer);
            let group: ILayerGroup | undefined;
            let component: IComponent | undefined;
            let panel: IPanel | undefined;
            let events: any;
            let style_config, staticData, styleDimensionConfig, recommendConfig;
            // 群组
            if ("panelType" in layer) {
              const panel = panels.find((panel: IPanel) => panel.id === layer.id);
              if (panel) {
                recommendConfig = panel.config;
                const { left, top, width, height } = recommendConfig;
                config = {
                  position: {
                    x: left,
                    y: top
                  },
                  style: {
                    width: width,
                    height: height
                  }
                };
              }
            } else if (COMPONENTS in layer) {
              group = layer;
              let [xPositionList, yPositionList] = calcGroupPosition(layer[COMPONENTS], components, panels);
              xPositionList = xPositionList.sort((a, b) => a - b);
              yPositionList = yPositionList.sort((a, b) => a - b);
              config = {
                position: {
                  x: xPositionList[0],
                  y: yPositionList[0],
                },
                style: {
                  width: xPositionList[xPositionList.length - 1] - xPositionList[0],
                  height: yPositionList[yPositionList.length - 1] - yPositionList[0],
                },
              };
            } else {
              // 组件
              component = components.find(item => item.id === layer.id)
              // component.config = CustomTextConfig.config

              if (component) {
                staticData = component.staticData;
                style_config = component.config;
                styleDimensionConfig = component.config.find((item: any) => item.name === DIMENSION);
                if (styleDimensionConfig) {
                  Object.values(styleDimensionConfig.value).forEach((obj: any) => {
                    if (["top", "left"].includes(obj.name)) {
                      config.position[obj.name === "top" ? "y" : "x"] = obj.value;
                    } else if (["width", "height"].includes(obj.name)) {
                      config.style[obj.name === "width" ? "width" : "height"] = obj.value;
                    }
                  });
                }
                events = component.events;
              }
            }
            /*          if ('panelType' in layer) {
                        console.log('-----------------')
                        console.log('components', components)
                        console.log('component', component)
                        console.log('layer', layer)
                        console.log('bar.componentData', bar.componentData[layer.id])
                        console.log('layers', layers)
                        console.log('-----------------')
                      }*/
            return (
              <SingleDraggable
                dimensionConfig={isPanel ? recommendConfig : styleDimensionConfig}
                isPanel={isPanel}
                scale={bar.canvasScaleValue}
                nodeRef={nodeRef}
                id={layer.id}
                cRef={(ref: any) => {
                  if (layer.id in allComponentRefs) {
                  } else {
                    allComponentRefs[layer.id] = ref;
                  }
                }}
                disabled={layer.isLock}
                cancel=".no-cancel"
                key={layer.id}
                position={config.position}
                onStart={(ev: DraggableEvent, data: DraggableData) => handleStart(ev, data, layer, component, config)}
                onDrag={(ev: DraggableEvent, data: DraggableData) => handleDrag(ev, data, layer, component, config)}
                onStop={(ev: DraggableEvent, data: DraggableData) => handleStop(ev, data, layer, component, config)}
              >
                <div
                  ref={(ref: any) => {
                    if (layer.id in allComponentDOMs) {
                    } else {
                      allComponentDOMs[layer.id] = ref;
                    }
                  }}                // onClickCapture={(ev) => handleClick(ev, layer, config)}
                  data-id={isPanel ? (layer.panelType === 0 ? `panel-${layer.id}` : `ref-${layer.id}`) : isGroup ? layer.id : `component-${layer.id}`}
                  key={layer.id}
                  onClick={(ev) => handleClick(ev, layer, config)}
                  onDoubleClickCapture={(ev) => handleDblClick(ev, layer, config)}
                  onMouseOverCapture={(ev) => handleMouseOver(ev, layer)}
                  onMouseOutCapture={(ev) => handleMouseOut(ev, layer)}
                  onContextMenu={(ev) => mouseRightClick(ev, layer, component, config)}
                  className={["box", `${layer.selected ? "selected" : ""}`, `${layer.hover ? "hovered" : ""}`].filter(item => item).join(" ")}
                  style={{
                    ...config.style,
                    transition: "width, height 0.3s",
                    // border: '1px solid gray',
                    visibility: !layer.isShow ? "hidden" : "unset",
                    cursor: "move",
                  }}>
                  {
                    layer[HIDE_DEFAULT] ?
                      <div style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(76, 255, 231, 0.15)",
                      }} /> :
                      isPanel ?
                        (layer.panelType === 0 ?
                          <div
                            className="panel-container"
                          >
                            <DynamicPanel
                              history={history}
                              id={layer.id}
                              panels={panels}
                            />
                            <div className="hovered">
                              双击编辑动态面板
                            </div>
                          </div>
                          : layer.panelType === 1 ?
                            <div
                              className="panel-container"
                            >
                              <ReferencePanel
                                history={history}
                                id={layer.id}
                                panels={panels}
                              />
                              <div className="hovered">
                                双击编辑引用面板
                              </div>
                            </div>
                            :
                            <div
                              className="panel-container"
                            >
                              <DrillDownPanel
                                history={history}
                                id={layer.id}
                                panels={panels}
                              />
                              <div className="hovered">
                                双击编辑下钻面板
                              </div>
                            </div>
                        ) :
                        isGroup ?
                          <div className="no-cancel" style={{
                            opacity: (layer[OPACITY] || 100) / 100,
                          }}>
                            {(layer as any)[COMPONENTS]?.length > 0 ?
                              <div style={{ position: "absolute", left: -config.position.x, top: -config.position.y }}>
                                <CustomDraggable
                                  mouse={layer.selected ? mouse : 0}
                                  bar={bar}
                                  dispatch={dispatch}
                                  history={history}
                                  layers={(layer as any)[COMPONENTS]}
                                  components={components}
                                  panels={panels}
                                />
                              </div>
                              : ""
                            }
                          </div> : <>
                            <div data-id={layer.id} style={{ width: "100%", height: "100%", pointerEvents: "none" }}>
                              {
                                // layer.moduleName === 'text' ? <Text componentConfig={component}/> :
                                //   <CompImage componentConfig={component}/>

                                // <Da componentConfig={component}/>
                                // <SwiperText  componentConfig={component}></SwiperText>
                                // layer.moduleName === 'swiperText' ?
                                // <CustomText  
                                //   componentConfig={component}
                                //   fields={getFields(component)}
                                //   comData={getComDataWithFilters(bar.componentData, component, bar.componentFilters, bar.dataContainerDataList, bar.dataContainerList, bar.callbackArgs)}
                                // ></CustomText> : 
                                layer.moduleName === 'counter' ?
                                  <Counter
                                    themeConfig={bar.componentThemeConfig}
                                    onThemeChange={onThemeChange}
                                    componentConfig={component}
                                    fields={getFields(component)}
                                    comData={getComDataWithFilters(bar.componentData, component, bar.componentFilters, bar.dataContainerDataList, bar.dataContainerList, bar.callbackArgs)}
                                  ></Counter> :
                                  layer.moduleName === "rankingBar" ?
                                    <RankingBar
                                      themeConfig={bar.componentThemeConfig}
                                      onThemeChange={onThemeChange}
                                      onChange={(val: any) => handleValueChange(val, component, layer.id)}
                                      scale={bar.canvasScaleValue}
                                      componentConfig={component}
                                      fields={getFields(component)}
                                      comData={getComDataWithFilters(bar.componentData, component, bar.componentFilters, bar.dataContainerDataList, bar.dataContainerList, bar.callbackArgs)}
                                    >
                                    </RankingBar> :
                                    layer.moduleName === "zebraColumn" ?
                                      <ZebraColumn
                                        themeConfig={bar.componentThemeConfig}
                                        onThemeChange={onThemeChange}
                                        onChange={(val: any) => handleValueChange(val, component, layer.id)}
                                        scale={bar.canvasScaleValue}
                                        componentConfig={component}
                                        fields={getFields(component)}
                                        comData={getComDataWithFilters(bar.componentData, component, bar.componentFilters, bar.dataContainerDataList, bar.dataContainerList, bar.callbackArgs)}
                                      >
                                      </ZebraColumn> :
                                      layer.moduleName === "basicBar" ?
                                        <BasicBar
                                          themeConfig={bar.componentThemeConfig}
                                          onThemeChange={onThemeChange}
                                          onChange={(val: any) => handleValueChange(val, component, layer.id)}
                                          scale={bar.canvasScaleValue}
                                          componentConfig={component}
                                          fields={getFields(component)}
                                          comData={getComDataWithFilters(bar.componentData, component, bar.componentFilters, bar.dataContainerDataList, bar.dataContainerList, bar.callbackArgs)}
                                        >
                                        </BasicBar> :
                                        layer.moduleName === "image2" ?
                                          <CusImage
                                            themeConfig={bar.componentThemeConfig}
                                            onThemeChange={onThemeChange}
                                            onChange={(val: any) => handleValueChange(val, component, layer.id)}
                                            scale={bar.canvasScaleValue}
                                            componentConfig={component}
                                            fields={getFields(component)}
                                            comData={getComDataWithFilters(bar.componentData, component, bar.componentFilters, bar.dataContainerDataList, bar.dataContainerList, bar.callbackArgs)}
                                          >
                                          </CusImage> :
                                          layer.moduleName === "select2" ?
                                            <SelectV2
                                              themeConfig={bar.componentThemeConfig}
                                              onThemeChange={onThemeChange}
                                              onChange={(val: any) => handleValueChange(val, component, layer.id)}
                                              scale={bar.canvasScaleValue}
                                              componentConfig={component}
                                              fields={getFields(component)}
                                              comData={getComDataWithFilters(bar.componentData, component, bar.componentFilters, bar.dataContainerDataList, bar.dataContainerList, bar.callbackArgs)}
                                            >
                                            </SelectV2> :
                                            layer.moduleName === "bar" ?
                                              <Bar
                                                themeConfig={bar.componentThemeConfig}
                                                onThemeChange={onThemeChange}
                                                onChange={(val: any) => handleValueChange(val, component, layer.id)}
                                                scale={bar.canvasScaleValue}
                                                componentConfig={component}
                                                fields={getFields(component)}
                                                comData={getComDataWithFilters(bar.componentData, component, bar.componentFilters, bar.dataContainerDataList, bar.dataContainerList, bar.callbackArgs)}
                                              >
                                              </Bar> :
                                              layer.moduleName === "scrollTable" ?
                                                <ScrollTable
                                                  themeConfig={bar.componentThemeConfig}
                                                  onThemeChange={onThemeChange}
                                                  onChange={(val: any) => handleValueChange(val, component, layer.id)}
                                                  scale={bar.canvasScaleValue}
                                                  componentConfig={component}
                                                  fields={getFields(component)}
                                                  comData={getComDataWithFilters(bar.componentData, component, bar.componentFilters, bar.dataContainerDataList, bar.dataContainerList, bar.callbackArgs)}
                                                >
                                                </ScrollTable> :
                                                layer.moduleName === "tab" ?
                                                  <Tab
                                                    themeConfig={bar.componentThemeConfig}
                                                    onThemeChange={onThemeChange}
                                                    onChange={(val: any) => handleValueChange(val, component, layer.id)}
                                                    componentConfig={component}
                                                    fields={getFields(component)}
                                                    comData={getComDataWithFilters(bar.componentData, component, bar.componentFilters, bar.dataContainerDataList, bar.dataContainerList, bar.callbackArgs)}
                                                  >
                                                  </Tab> :
                                                  layer.moduleName === "scrollSelect" ?
                                                    <ScrollSelect
                                                      themeConfig={bar.componentThemeConfig}
                                                      onThemeChange={onThemeChange}
                                                      onChange={(val: any) => handleValueChange(val, component, layer.id)}
                                                      componentConfig={component}
                                                      fields={getFields(component)}
                                                      comData={getComDataWithFilters(bar.componentData, component, bar.componentFilters, bar.dataContainerDataList, bar.dataContainerList, bar.callbackArgs)}
                                                    >
                                                    </ScrollSelect> :
                                                    layer.moduleName === "timeSelect" ?
                                                      <TimeSelect
                                                        themeConfig={bar.componentThemeConfig}
                                                        onThemeChange={onThemeChange}
                                                        onChange={(val: any) => handleValueChange(val, component, layer.id)}
                                                        componentConfig={component}
                                                        fields={getFields(component)}
                                                        comData={getComDataWithFilters(bar.componentData, component, bar.componentFilters, bar.dataContainerDataList, bar.dataContainerList, bar.callbackArgs)}
                                                      >
                                                      </TimeSelect> :
                                                      layer.moduleName === "worldMap" ?
                                                        <WorldMap
                                                          themeConfig={bar.componentThemeConfig}
                                                          onThemeChange={onThemeChange}
                                                          onChange={(val: any) => handleValueChange(val, component, layer.id)}
                                                          componentConfig={component}
                                                          fields={getFields(component)}
                                                          comData={getComDataWithFilters(bar.componentData, component, bar.componentFilters, bar.dataContainerDataList, bar.dataContainerList, bar.callbackArgs)}
                                                        ></WorldMap> :
                                                        layer.moduleName === "chinaMap" ?
                                                          <ChinaMap
                                                            themeConfig={bar.componentThemeConfig}
                                                            onThemeChange={onThemeChange}
                                                            onChange={(val: any) => handleValueChange(val, component, layer.id)}
                                                            componentConfig={component}
                                                            fields={getFields(component)}
                                                            comData={getComDataWithFilters(bar.componentData, component, bar.componentFilters, bar.dataContainerDataList, bar.dataContainerList, bar.callbackArgs)}
                                                          ></ChinaMap> :
                                                          layer.moduleName === "timeline" ?
                                                            <Timeline
                                                              themeConfig={bar.componentThemeConfig}
                                                              onThemeChange={onThemeChange}
                                                              onChange={(val: any) => handleValueChange(val, component, layer.id)}
                                                              componentConfig={component}
                                                              fields={getFields(component)}
                                                              comData={getComDataWithFilters(bar.componentData, component, bar.componentFilters, bar.dataContainerDataList, bar.dataContainerList, bar.callbackArgs)}
                                                            ></Timeline> :


                                                            // layer.moduleName === 'CardFlipper_1'?
                                                            //   <CardFlipper1
                                                            //     onChange={(val:any)=>handleValueChange(val, component, layer.id)}
                                                            //     componentConfig={ component }
                                                            //     fields={ getFields(component) }
                                                            //     comData={ getComDataWithFilters(bar.componentData, component, bar.componentFilters, bar.dataContainerDataList, bar.dataContainerList, bar.callbackArgs) }
                                                            //   ></CardFlipper1>:
                                                            // layer.moduleName === 'CardFlipper_2'?
                                                            //   <CardFlipper2
                                                            //     onChange={(val:any)=>handleValueChange(val, component, layer.id)}
                                                            //     componentConfig={ component }
                                                            //     fields={ getFields(component) }
                                                            //     comData={ getComDataWithFilters(bar.componentData, component, bar.componentFilters, bar.dataContainerDataList, bar.dataContainerList, bar.callbackArgs) }
                                                            //   ></CardFlipper2>:

                                                            layer.moduleName === "instrumentPanel_3" ?
                                                              <InstrumentPanel3
                                                                themeConfig={bar.componentThemeConfig}
                                                                onThemeChange={onThemeChange}
                                                                onChange={(val: any) => handleValueChange(val, component, layer.id)}
                                                                componentConfig={component}
                                                                fields={getFields(component)}
                                                                comData={getComDataWithFilters(bar.componentData, component, bar.componentFilters, bar.dataContainerDataList, bar.dataContainerList, bar.callbackArgs)}
                                                              ></InstrumentPanel3> :
                                                              layer.moduleName === "instrumentPanel_1" ?
                                                                <InstrumentPanel1
                                                                  themeConfig={bar.componentThemeConfig}
                                                                  onThemeChange={onThemeChange}
                                                                  onChange={(val: any) => handleValueChange(val, component, layer.id)}
                                                                  componentConfig={component}
                                                                  fields={getFields(component)}
                                                                  comData={getComDataWithFilters(bar.componentData, component, bar.componentFilters, bar.dataContainerDataList, bar.dataContainerList, bar.callbackArgs)}
                                                                ></InstrumentPanel1> :
                                                                layer.moduleName === "instrumentPanel_4" ?
                                                                  <InstrumentPanel4
                                                                    themeConfig={bar.componentThemeConfig}
                                                                    onThemeChange={onThemeChange}
                                                                    onChange={(val: any) => handleValueChange(val, component, layer.id)}
                                                                    componentConfig={component}
                                                                    fields={getFields(component)}
                                                                    comData={getComDataWithFilters(bar.componentData, component, bar.componentFilters, bar.dataContainerDataList, bar.dataContainerList, bar.callbackArgs)}
                                                                  ></InstrumentPanel4> :
                                                                  layer.moduleName === "normalTable" ?
                                                                    <NormalTable
                                                                      onChange={(val: any) => handleValueChange(val, component, layer.id)}
                                                                      componentConfig={component}
                                                                      comData={getComDataWithFilters(bar.componentData, component, bar.componentFilters, bar.dataContainerDataList, bar.dataContainerList, bar.callbackArgs)}
                                                                    >
                                                                    </NormalTable> :
                                                                    layer.moduleName === "cascader" ?
                                                                      <Cascader
                                                                        onChange={(val: any) => handleValueChange(val, component, layer.id)}
                                                                        componentConfig={component}
                                                                        fields={getFields(component)}
                                                                        comData={getComDataWithFilters(bar.componentData, component, bar.componentFilters, bar.dataContainerDataList, bar.dataContainerList, bar.callbackArgs)}
                                                                      ></Cascader> :
                                                                      layer.moduleName === "media" ?
                                                                        <Media
                                                                          onChange={(val: any) => handleValueChange(val, component, layer.id)}
                                                                          componentConfig={component}
                                                                          fields={getFields(component)}
                                                                          comData={getComDataWithFilters(bar.componentData, component, bar.componentFilters, bar.dataContainerDataList, bar.dataContainerList, bar.callbackArgs)}
                                                                        ></Media> :
                                                                        layer.moduleName === "paginationComp" ?
                                                                          <PaginationComp
                                                                            onChange={(val: any) => handleValueChange(val, component, layer.id)}
                                                                            componentConfig={component}
                                                                            fields={getFields(component)}
                                                                            comData={getComDataWithFilters(bar.componentData, component, bar.componentFilters, bar.dataContainerDataList, bar.dataContainerList, bar.callbackArgs)}
                                                                          >
                                                                          </PaginationComp> :
                                                                          <ErrorCatch
                                                                            app={component.name}
                                                                            user=""
                                                                            token=""
                                                                            max={1}
                                                                            errorRender={<RemoteComponentErrorRender errorComponent={component.name}></RemoteComponentErrorRender>}
                                                                            onCatch={(errors) => {
                                                                              console.log("组件报错信息：", errors, "组件id", layer.id);
                                                                            }}
                                                                          >
                                                                            <RemoteBaseComponent
                                                                              themeConfig={bar.componentThemeConfig}
                                                                              onThemeChange={onThemeChange}
                                                                              key={layer.id}
                                                                              componentConfig={component}
                                                                              fields={getFields(component)}
                                                                              comData={getComDataWithFilters(bar.componentData, component, bar.componentFilters, bar.dataContainerDataList, bar.dataContainerList, bar.callbackArgs, layer)}
                                                                              onChange={(val: any) => handleValueChange(val, component, layer.id)}
                                                                            ></RemoteBaseComponent>
                                                                          </ErrorCatch>
                              }
                            </div>
                          </>
                  }
                  {/* <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, right: 0 }} /> */}
                  {/*增加一个类似透明蒙版的div，防止 echarts 图表误触、img 标签拖拽问题*/}
                  <div className="component-border">
                    <span
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: 1,
                        height: "100%",
                        transform: `translate(-50%, 0px) scaleX(${1 / bar.canvasScaleValue})`,
                      }} />
                    <span
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        width: 1,
                        height: "100%",
                        transform: `translate(50%, 0px) scaleX(${1 / bar.canvasScaleValue})`,
                      }} />
                    <span
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: 1,
                        transform: `translate(0px, -50%) scaleY(${1 / bar.canvasScaleValue})`,
                      }} />
                    <span
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        height: 1,
                        transform: `translate(0px, 50%) scaleY(${1 / bar.canvasScaleValue})`,
                      }} />
                  </div>
                </div>
              </SingleDraggable>
            );
          })
        }
      </div>
    );
  };
export default connect(({ bar }: any) => ({
  bar,
}))(withRouter(CustomDraggable as any));
