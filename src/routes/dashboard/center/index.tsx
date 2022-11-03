import { useState, useEffect, useRef } from "react";
import { connect } from "dva";

import "./index.less";
import Draggable from "react-draggable";
import CustomDraggable from "./components/CustomDraggable";
import ScaleDragCom from "./components/ScaleDragCom";
import SupportLines from "./components/SupportLines";
import * as React from "react";
import { Button } from "antd";
import { useClickAway, useKeyPress, useMouse, useThrottle } from "ahooks";
import Ruler from "./components/Ruler";
import { IScaleDragData, IStyleConfig } from "./type";
import { DIMENSION, WIDTH, LEFT, TOP, HEIGHT, COMPONENTS } from "./constant";
import RulerLines from "./components/RulerLines";
import { DraggableData, DraggableEvent, IPanel, IComponent, IConfig } from "./components/CustomDraggable/type";
import { deepClone, deepForEach, layersReverse } from "../../../utils";
import RightClickMenu from "../left/components/rightClickMenu/rightClickMenu";
import { menuOptions } from "../left/Data/menuOptions";

import axios from "axios";
import { http } from "@/services/request";

const Center = ({ bar, dispatch, focus$, ...props }: any) => {

  const draggableContainerRef = useRef(null);
  const draggableRef: any = useRef(null);
  const rulerRef: any = useRef(null);
  const canvasRef = useRef(null);
  const [isShowRightMenu, setIsShowRightMenu] = useState(false);
  const [menuInfo, setMenuInfo] = useState({ x: 0, y: 0, id: "", isFolder: false });
  const [customMenuOptions, setCustomMenuOptions] = useState(menuOptions);
  const [isCanvasDraggable, setIsCanvasDraggable] = useState(false);// let supportLinesRef: any = useRef(// null)
  const [rulerCanvasSpacing, setRulerCanvasSpacing] = useState({ left: 22, top: 22 });
  const [layers, setLayers] = useState([]);
  const [components, setComponents] = useState([]);
  const [panels, setPanels] = useState([]);
  const mouse = useMouse(canvasRef);
  const isKeyForDelete = useRef(false);
  const isKeyForGroup = useRef(false);
  const isKeyForCancelGroup = useRef(false);
  const isKeyForCopy = useRef(false);
  const isKeyForStick = useRef(false);

  useEffect(() => {
    const layers = deepClone(bar.layers);
    layersReverse(layers);
    setComponents(bar.fullAmountComponents);
    setPanels(bar.fullAmountPanels);
    setLayers(layers);
  }, [bar.layers]);

  /*  useEffect(() => {
      window.addEventListener("",)
    }, [])*/

  const supportLinesRef = bar.supportLinesRef;

  const findItem = (name: string) => {
    return bar.dashboardConfig.find((item: any) => {
      return item.name === name;
    });
  };

  // const recommendConfig = findItem("recommend")
  // const styleColor = findItem("styleColor")
  // const backgroundImg = findItem("backgroundImg")
  // const gridSpacing = findItem("gridSpacing")
  // const zoomConfig = findItem("zoom")
  const recommendConfig = findItem("recommend");
  const styleColor = bar.componentThemeConfig ? {
    value: bar.componentThemeConfig.backgroundColor
  } : findItem("styleColor");
  const backgroundImg = findItem("backgroundImg");

  // 计算画布的大小
  const calcCanvasSize = () => {
    let getCurrentDocumentWidth = document.documentElement.clientWidth;
    // console.log("getCurrentDocumentWidth", getCurrentDocumentWidth)
    const getCurrentDocumentHeight = document.documentElement.clientHeight;
    // 先计算当前窗口的大小 document.documentElement.clientHeight/Width
    if (getCurrentDocumentWidth < 1280) {
      getCurrentDocumentWidth = 1280;
    }
    // width、 height 是我们希望的当前 canvas 实际宽高
    // bar.leftMenuWidth 是左侧菜单的宽度, 333 是右侧菜单的高度， 66 是 3 个尺子的宽度
    const width = getCurrentDocumentWidth - bar.leftMenuWidth - 333 - 66;
    // 64 是顶部菜单的高度,  32 是底部菜单的高度, 66 是 3 个尺子的高度
    const height = getCurrentDocumentHeight - 64 - 35 - 66;
    const canvasHeight = Number((width / recommendConfig.width).toFixed(3)) * recommendConfig.height;
    let canvasScaleValue = 0;
    if (canvasHeight > height) {
      canvasScaleValue = Number((height / recommendConfig.height).toFixed(3));
      const left = (getCurrentDocumentWidth - bar.leftMenuWidth - 333 - 22 - recommendConfig.width * canvasScaleValue) / 2;
      setRulerCanvasSpacing({ top: 22, left });
    } else {
      // 如果中间区域刚好能装下画布
      // 那么尺子组件距离画布的横向距离就是 22
      canvasScaleValue = Number((width / recommendConfig.width).toFixed(3));
      const top = (getCurrentDocumentHeight - 64 - 22 - 32 - recommendConfig.height * canvasScaleValue) / 2;
      setRulerCanvasSpacing({ left: 22, top });
    }
    dispatch({
      type: "bar/save",
      payload: {
        canvasScaleValue,
        canvasDraggablePosition: { x: 0, y: 0 },
      },
    });
  };
  focus$.useSubscription(() => {
    calcCanvasSize();
  });
  // 计算画布的放大缩小
  const calcCanvasScale = (e: any) => {
    if (e.ctrlKey) {
      e.preventDefault();
      const type = e.deltaY < 0;
      // type: true 为放大 false 缩小
      if (bar.canvasScaleValue <= 0.1) {
        if (type) { // 可以放大
          dispatch({
            type: "bar/save",
            payload: {
              canvasScaleValue: Number((bar.canvasScaleValue + 0.03).toFixed(3)),
            },
          });
        }
      } else if (bar.canvasScaleValue >= 4) {
        if (!type) { // 可以缩小
          dispatch({
            type: "bar/save",
            payload: {
              canvasScaleValue: Number((bar.canvasScaleValue - 0.03).toFixed(3)),
            },
          });
        }
      } else {
        let canvasScaleValue = Number((bar.canvasScaleValue + (type ? 0.03 : -0.03)).toFixed(3));
        if (canvasScaleValue <= 0.1) {
          canvasScaleValue = 0.1;
        }
        if (canvasScaleValue >= 4) {
          canvasScaleValue = 4;
        }
        dispatch({
          type: "bar/save",
          payload: {
            canvasScaleValue,
          },
        });
      }
    }
  };


  useEffect(() => {
    if (bar.canvasScaleValue) {
      window.addEventListener("wheel", calcCanvasScale, { passive: false });
    }
    return () => {
      window.removeEventListener("wheel", calcCanvasScale);
    };
  }, [bar.canvasScaleValue]);

  useEffect(() => {
    calcCanvasSize();
    dispatch({
      type: "bar/save",
      payload: {
        canvasDraggablePosition: {
          x: 0,
          y: 0,
        },
      },
    });
  }, [recommendConfig.width, recommendConfig.height]);

  useEffect(() => {
    setTimeout(() => {
      calcCanvasSize();
    }, 300);
  }, [bar.leftMenuWidth]);

  useEffect(() => {
    calcCanvasSize();
    window.addEventListener("resize", calcCanvasSize);
    (document.querySelector(".draggable-container") as HTMLElement).addEventListener("contextmenu", handleContextMenu);
    // document.addEventListener("contextmenu", handleContextMenu)
    return () => {
      window.removeEventListener("resize", calcCanvasSize);
      (document.querySelector(".draggable-container") as HTMLElement)?.removeEventListener("contextmenu", handleContextMenu);
      // document.removeEventListener("contextmenu", handleContextMenu)
    };
  }, [bar.dashboardConfig]);

  // 中间画布上的组件渲染完毕后，异步加载所有的组件，并将这些组件的config放入bar.moduleDefaultConfig中
  const importComponent = (data: any) => {
    return axios.get(`${(window as any).CONFIG.COMP_URL}/${data.moduleType}/${data.moduleName}/${data.moduleVersion}/${data.moduleName}.js`).then(res => res.data);
  };
  const allModuleDefaultConfigArr: any = [];
  let count = 0;
  let contentLen = 0;
  const loadComp = async (data: any) => {
    window.eval(`${await importComponent(data)}`);
    const { ComponentDefaultConfig: currentDefaultConfig } = (window as any).VComponents;
    allModuleDefaultConfigArr.push(currentDefaultConfig);
    count++;
    if (count === contentLen) {
      // 初始化时需要一次性设置到全局状态中
      dispatch({
        type: "bar/setModuleDefaultConfigByOnce",
        payload: allModuleDefaultConfigArr,
      });
    }
  };
  //@Mark 因组件更新中需要获取各个原子组件的初始config,所以需要在画布初始化时进行处理
  useEffect(() => {
    const getAllModulesConfig = async () => {
      const { content }: any = await http({
        url: "/visual/module-manage/queryModuleList",
        method: "post",
        body: {
          status: 0,
          pageNo: 0,
          pageSize: 100,
        }
      }).catch(() => { });
      contentLen = content.length;
      content.forEach((item: any) => {
        loadComp(item);
      });
    };
    getAllModulesConfig();
  }, []);



  useClickAway(() => {
    // 取消右键菜单
    setIsShowRightMenu(false);
  }, [document.querySelector(".left-wrap-tree"), document.querySelector(".left-wrap-toolbar"), document.querySelector(".left-wrap>.header"), document.querySelector(".left-menu>.footer"), document.querySelector(".right-wrap"), document.getElementById("draggable-container")]);
  const handleContextMenu = (event: MouseEvent) => {
    const dom = event.target as HTMLElement;
    setIsShowRightMenu(true);
    if (dom.dataset?.id) {
      setMenuInfo({
        x: event.clientX,
        y: event.clientY,
        id: dom.dataset.id.indexOf("group-") !== -1 ? dom.dataset.id : dom.dataset.id.replace("component-", ""),
        isFolder: false,
      });
    }
    event.preventDefault();
  };

  const hideMenu = () => {
    setIsShowRightMenu(false);
  };

  // useKeyPress([ "ctrl", "shift" ], (event) => {
  //   if(event.type === "keydown" && bar.isSupportMultiple) {
  //
  //   } else {
  //     dispatch({
  //       type: "bar/save",
  //       payload: {
  //         isSupportMultiple: event.type === "keydown",
  //       },
  //     })
  //   }
  // }, {
  //   events: [ "keydown", "keyup" ],
  // })

  /*
  leftarrow: 37,
  uparrow: 38,
  rightarrow: 39,
  downarrow: 40,
 */
  // 组件被移动
  const handleComponentDrag = (x: number, y: number) => {
    for (const key in bar.selectedComponentDOMs) {
      const translateArr = bar.selectedComponentDOMs[key].style.transform.replace("translate(", "").replace(")", "").replaceAll("px", "").split(", ");
      const translateX = Number(translateArr[0]) + x ;
      const translateY = Number(translateArr[1]) + y ;
      bar.selectedComponentDOMs[key].style.transform = `translate(${translateX}px,${translateY}px)`;
    }
  };
  // 组件移动结束
  const handleComponentDragStop = () => {
    bar.selectedComponents = [
      ...components.filter((component: IComponent) => bar.selectedComponentIds.includes(component.id)),
      ...panels.filter((panel: IPanel) => bar.selectedComponentIds.includes(panel.id))
    ];
    bar.selectedComponents.forEach((item: IComponent | IPanel) => {
      const translateArr = bar.selectedComponentDOMs[item.id].style.transform.replace("translate(", "").replace(")", "").replaceAll("px", "").split(", ");
      const translateX = Number(translateArr[0]);
      const translateY = Number(translateArr[1]);
      if ("type" in item) {
        item.config.left = translateX;
        item.config.top = translateY;
      } else {
        const styleDimensionConfig = item.config.find((item: any) => item.name === DIMENSION);
        if (styleDimensionConfig) {
          Object.values(styleDimensionConfig.value).forEach((obj: any) => {
            if (obj.name === "left") {
              obj.value = translateX;
            } else if (obj.name === "top") {
              obj.value = translateY;
            }
          });
        }
      }
    });

    dispatch({
      type: "bar/updateComponent",
      payload: bar.selectedComponents,
    });
    // 辅助线消失
    supportLinesRef.handleSetPosition(0, 0, "none");
  };

  // 辅助线移动
  const handleSupportLineDrag = () => {
    const { x, y } = bar.scaleDragCompRef.getPosition();
    supportLinesRef.handleSetPosition(x, y, "block");
  };
  // 选中框移动
  const handleScaleDragComDrag = (xMoveLength: number, yMoveLength: number) => {
    bar.scaleDragCompRef.handleMovePosition(xMoveLength, yMoveLength);
  };


  useKeyPress(["space"], (event) => {
    if (event.type === "keydown" && isCanvasDraggable) {
      return;
    }
    setIsCanvasDraggable(event.type === "keydown");
  }, {
    events: ["keydown", "keyup"],
    exactMatch: true,

  });

  useKeyPress(["leftarrow"], (event) => {
    if (bar.key.length === 0) return;
    if (event.target === document.body) {
      if (event.type === "keydown") {
        handleComponentDrag(-1, 0);
        handleScaleDragComDrag(-1, 0);
        handleSupportLineDrag();
        // 重新给 transform 赋值
      } else {
        handleComponentDragStop();
      }
    }
  }, {
    events: ["keydown", "keyup"],
    exactMatch: true,
  });

  useKeyPress(["uparrow"], (event) => {
    if (bar.key.length === 0) return;
    if (event.target === document.body) {
      if (event.type === "keydown") {
        handleComponentDrag(0, -1);
        handleScaleDragComDrag(0, -1);
        handleSupportLineDrag();
      } else {
        handleComponentDragStop();
      }
    }

  }, {
    events: ["keydown", "keyup"],
    exactMatch: true,

  });

  useKeyPress(["rightarrow"], (event) => {
    if (bar.key.length === 0) return;
    if (event.target === document.body) {
      if (event.type === "keydown") {
        handleComponentDrag(1, 0);
        handleScaleDragComDrag(1, 0);
        handleSupportLineDrag();
      } else {
        handleComponentDragStop();
      }
    }
  }, {
    events: ["keydown", "keyup"],
    exactMatch: true,
  });

  useKeyPress(["downarrow"], (event) => {
    if (bar.key.length === 0) return;
    if (event.target === document.body) {
      if (event.type === "keydown") {
        handleComponentDrag(0, 1);
        handleScaleDragComDrag(0, 1);
        handleSupportLineDrag();
      } else {
        handleComponentDragStop();
      }
    }
  }, {
    events: ["keydown", "keyup"],
    exactMatch: true,
  });

  // 删除
  useKeyPress(["Backspace"], (event) => {
    if (bar.key.length === 0) return;
    if (event.type === "keydown") {
      if (!isKeyForDelete.current) {
        if (event.target === document.body) {
          dispatch({
            type: "bar/delete",
            payload: {
              dashboardId: bar.stateId || bar.dashboardId,
              layers: bar.key.map((item: string) => ({
                id: item,
                children: []
              }))
            }
          });
        }
        isKeyForDelete.current = true;
      }
    } else {
      isKeyForDelete.current = false;
    }
  }, {
    events: ["keydown", "keyup"],
    exactMatch: true,
  });
  // 复制
  useKeyPress(["ctrl.c"], (event) => {
    if (bar.key.length === 0) return;
    if (event.type === "keydown") {
      if (!isKeyForCopy.current) {
        if (event.target === document.body) {
          dispatch({
            type: "bar/save",
            payload: {
              copyComponentConfigs: bar.selectedComponentOrGroup,
              copyComponentKey: bar.key
            }
          });
        }
        isKeyForCopy.current = true;
      }
    } else {
      isKeyForCopy.current = false;
    }
  }, {
    events: ["keydown", "keyup"],
    exactMatch: true,
  });
  // 粘贴
  useKeyPress(["ctrl.v"], (event) => {
    if (event.type === "keydown") {
      if (!isKeyForStick.current) {
        if (event.target === document.body) {
          /*          dispatch({
                      type: "bar/createComponent",
                      payload: bar.selectedComponentOrGroup
                    })*/
          if (bar.key[bar.key.length - 1] || bar.layers[bar.layers.length - 1]?.id) {
            dispatch({
              type: "bar/copy",
              payload: {
                dashboardId: bar.stateId || bar.dashboardId,
                children: [],
                targetDashboardId: bar.dashboardId,
                insertId: bar.key[bar.key.length - 1] || bar.layers[bar.layers.length - 1]?.id || "",
                originLayers: bar.layers,
                //TODO 改为modules后删除掉这行
                components: bar.copyComponentKey,
                // components: [...bar.key],
                panels: [],
                selected: bar.copyComponentKey
              }
            });
          }
        }
        isKeyForStick.current = true;
      }
    } else {
      isKeyForStick.current = false;
    }
  }, {
    events: ["keydown", "keyup"],
    exactMatch: true,
  });

  // 成组
  useKeyPress(["ctrl.g"], (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (bar.key.length === 0) return;
    if (event.type === "keydown") {
      if (!isKeyForGroup.current) {
        if (event.target === document.body) {
          dispatch({
            type: "bar/group",
          });
        }
        isKeyForGroup.current = true;
      }
    } else {
      isKeyForGroup.current = false;
    }
  }, {
    events: ["keydown", "keyup"],
    exactMatch: true,
  });
  //
  useKeyPress(["ctrl.d"], (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (bar.key.length === 0) return;
    if (event.type === "keydown") {
      if (!isKeyForCancelGroup.current) {
        if (event.target === document.body) {
          dispatch({
            type: "bar/cancelGroup",
          });
        }
        isKeyForCancelGroup.current = true;
      }
    } else {
      isKeyForCancelGroup.current = false;
    }
  }, {
    events: ["keydown", "keyup"],
    exactMatch: true,
  });




  /*  useKeyPress(["c.ctrl"], (event) => {
      if (event.type === "keydown") {
        console.log("---右下-----")
        for(const key in bar.selectedComponentDOMs) {
          const translateArr = bar.selectedComponentDOMs[key].style.transform.replace("translate(", "").replace(")", "").replaceAll("px", "").split(", ");
          const translateX = Number(translateArr[0]);
          const translateY = Number(translateArr[1]);
          bar.selectedComponentDOMs[key].style.transform = `translate(${translateX + 1}px, ${translateY + 1}px)`;
        }
      } else {
        handleComponentDragStop()
  
      }
    }, {
      events: ["keydown", "keyup"],
      exactMatch: true
    });*/

  // const mouse = 0


  /**
   * @desc 缩放组件在缩放结束后的回调
   * @param scaleDragData: IScaleDragData
   * @param lastScaleDragData: IScaleDragData
   * @return void
   */
  const handleScaleEnd = (
    { position: { x, y }, style: { width, height } }: IScaleDragData,
    { position: { x: lastX, y: lastY }, style: { width: lastWidth, height: lastHeight } }: IScaleDragData,
  ) => {
    dispatch({
      type: "bar/updateSelectedComponents"
    });
    if (bar.selectedComponentOrGroup.length === 1 && !(COMPONENTS in bar.selectedComponentOrGroup[0])) {
      const panelOrComponent: IComponent | IPanel = bar.selectedComponents[0];
      if ("type" in panelOrComponent) {
        const panel = panelOrComponent;
        panel.config = {
          ...panel.config,
          left: x,
          top: y,
          width,
          height,
        };
      } else {
        // 这里深拷贝（因为componentConfig 也是深拷贝的）并且在缩放后 setComponentConfig，为了解决在缩放完成，立马更新到components、componentConfig，及时同步最新数据
        const component = deepClone(panelOrComponent);
        const styleDimensionConfig = component.config.find((item: any) => item.name === DIMENSION).value;
        styleDimensionConfig.forEach((item: IStyleConfig) => {
          switch (item.name) {
            case LEFT:
              item.value = x;
              break;
            case TOP:
              item.value = y;
              break;
            case WIDTH:
              item.value = width;
              break;
            case HEIGHT:
              item.value = height;
              break;
          }
        });
        dispatch({
          type: "bar/setComponentConfig",
          payload: component,
        });
      }
      dispatch({
        type: "bar/save",
        payload: {
          isCanClearAllStatus: false,
        },
      });
    } else {
      bar.selectedComponents.forEach((panelOrComponent: IComponent | IPanel, cIndex: number) => {
        if ("type" in panelOrComponent) {
          const panel = panelOrComponent;
          const data = panel.config;

          panel.config.width = panel.config.width / (lastWidth / width);
          data[WIDTH] = panel.config.width;

          panel.config.height = panel.config.height / (lastHeight / height);
          data[HEIGHT] = panel.config.height;

          if (x === lastX) {
            if (panel.config.left !== lastX) {
              panel.config.left = lastX + ((data[LEFT] - lastX) / (lastWidth / width));
              data[LEFT] = panel.config.left;
            }
          } else {
            if (panel.config.left === lastX) {
              panel.config.left = x;
            } else {
              panel.config.left = x + ((data[LEFT] - lastX) / (lastWidth / width));
            }
          }

          if (y === lastY) {
            if (panel.config.top !== lastY) {
              panel.config.top = lastY + ((data[TOP] - lastY) / (lastHeight / height));
              data[TOP] = panel.config.top;
            }
          } else {
            if (panel.config.top === lastY) {
              panel.config.top = y;
            } else {
              panel.config.top = y + ((data[TOP] - lastY) / (lastHeight / height));
            }
          }
        } else {
          const dimensionConfig = panelOrComponent.config.find((config: any) => config.name === DIMENSION).value;
          const data = dimensionConfig.reduce((pre: any, cur: any) => {
            if (Array.isArray(cur.value)) {
              const obj = cur.value.reduce((p: any, c: any) => {
                p[c.name] = c.value;
                return p;
              }, {});
              pre = {
                ...pre,
                ...obj,
              };
            } else {
              pre[cur.name] = cur.value;
            }
            return pre;
          }, {});
          dimensionConfig.forEach((config: any) => {
            if (x === lastX) {
              if (config.name === LEFT) {
                if (config.value !== lastX) {
                  // 因为是缩放右侧，所以缩放组件左侧的 lastX 值是不变的。然后再计算组件左侧 x 距离缩放组件左侧的 x 值的变化即可
                  config.value = lastX + ((data[LEFT] - lastX) / (lastWidth / width));
                  data[LEFT] = config.value;
                }
              }
            } else {
              if (config.name === LEFT) {
                if (config.value === lastX) {
                  config.value = x;
                } else {
                  // 因为是缩放左侧，所以缩放组件右侧的 x + width 的值是不变的。然后再计算组件左侧 x 距离缩放组件左侧的 x 值的变化即可
                  config.value = x + ((data[LEFT] - lastX) / (lastWidth / width));
                }
              }
            }

            if (y === lastY) {
              if (config.name === TOP) {
                if (config.value !== lastY) {
                  config.value = lastY + ((data[TOP] - lastY) / (lastHeight / height));
                  data[TOP] = config.value;
                }
              }
            } else {
              if (config.name === TOP) {
                if (config.value === lastY) {
                  config.value = y;
                } else {
                  config.value = y + ((data[TOP] - lastY) / (lastHeight / height));
                }
              }
            }

            if (config.name === WIDTH) {
              config.value = config.value / (lastWidth / width);
              data[WIDTH] = config.value;
            }
            if (config.name === HEIGHT) {
              config.value = config.value / (lastHeight / height);
              data[HEIGHT] = config.value;
            }
          });
        }
      });
      dispatch({
        type: "bar/setGroupConfig",
        payload: {
          config: { position: { x, y }, style: { width, height } },
          isCanClearAllStatus: false,
        },
      });
    }
    new Promise((resolve, reject) => {
      dispatch({
        type: "bar/updateSelectedComponents",
        cb: (selectedComponents: Array<IComponent | IPanel>) => {
          resolve(selectedComponents);
        },
      });
    }).then((selectedComponents) => {
      dispatch({
        type: "bar/updateComponent",
        payload: selectedComponents,
      });
    });
  };

  const handleCanvasDrag = function (event: DraggableEvent, data: DraggableData) {
    handleCalcPosition({ x: data.x, y: data.y });
  };

  const handleCanvasDragStop = (event: DraggableEvent, data: DraggableData) => {
    const { x, y } = data;
    handleCalcPosition({ x, y });
    dispatch({
      type: "bar/save",
      payload: {
        canvasDraggablePosition: { x, y },
      },
    });
  };

  const handleCalcPosition = ({ x, y }: { x: number, y: number }) => {
    const canvasDraggableDOM: any = document.querySelector(".canvas-draggable");
    if (x >= 5000) {
      x = 5000;
    }
    if (y >= 5000) {
      y = 5000;
    }
    canvasDraggableDOM.style.transform = `translate(${x}px, ${y}px)`;
    draggableRef.current.props.position.x = x;
    draggableRef.current.props.position.y = y;
    rulerRef.current.painter();
  };
  return (
    <div className="c-canvas">
      <Ruler
        cRef={rulerRef}
        mouse={mouse}
      />
      {/*      {
        isShowRightMenu &&
        <RightClickMenu menuInfo={ menuInfo } menuOptions={ customMenuOptions } hideMenu={ hideMenu }/> }*/ }
      <div
        style={{
          width: "calc(100% - 22px)",
          height: "calc(100% - 54px)",
          position: "absolute",
          overflow: "hidden",
        }}
      >
        <Draggable
          ref={draggableRef}
          disabled={!isCanvasDraggable}
          onDrag={handleCanvasDrag}
          onStop={handleCanvasDragStop}
          position={bar.canvasDraggablePosition}
        >
          <div
            className="canvas-draggable"
            style={{
              width: 100000,
              height: 100000,
              position: "absolute",
              left: -5000,
              top: -5000,
              background: "#181a24"
            }}
          >

            <div>
              <div
                ref={canvasRef}
                className="canvas-container"
                style={{
                  width: recommendConfig.width * bar.canvasScaleValue,
                  height: recommendConfig.height * bar.canvasScaleValue,
                  position: "absolute",
                  left: 5000 + rulerCanvasSpacing.left,
                  top: 5000 + rulerCanvasSpacing.top,
                }}
              >
                {
                  bar.isPanel ? <div
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      backgroundImage: "linear-gradient(45deg,#ccc 25%,transparent 0), linear-gradient(45deg,transparent 75%,#ccc 0), linear-gradient(45deg,#ccc 25%,transparent 0), linear-gradient(45deg,transparent 75%,#ccc 0)",
                      backgroundPosition: "0 0,-15px 15px,15px -15px,30px 30px",
                      backgroundSize: "10px 10px",
                      backgroundColor: "#b5b5b5",
                    }}
                  /> : <></>
                }
                <div
                  className="canvas-screen"
                  style={{
                    width: recommendConfig.width,
                    height: recommendConfig.height,
                    transform: `scale(${bar.canvasScaleValue})`,
                    backgroundColor: styleColor.value,
                    background: backgroundImg.value ? `url(${backgroundImg.value}) no-repeat center/cover` : styleColor.value,
                    backgroundSize: "cover",
                  }}
                >
                  <div className="draggable-wrapper">
                    <ScaleDragCom
                      mouse={mouse}
                      cRef={(ref: any) => {
                        bar.scaleDragCompRef = ref;
                      }}
                      onScaleEnd={handleScaleEnd}
                    />
                    <RulerLines />

                    <div className={`draggable-container screen-${bar.dashboardId}`} ref={draggableContainerRef}>
                      <CustomDraggable mouse={0} layers={layers} components={components} panels={panels} />
                    </div>
                    <SupportLines
                      cRef={(ref: any) => {
                        bar.supportLinesRef = ref;
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            {
              isCanvasDraggable ? <div className="canvas-mask" style={{ position: "absolute", inset: 0 }} /> : <></>
            }
          </div>
        </Draggable>

      </div>

    </div>
  );
};
export default connect(({
  bar,
}
  : any,
) => (
  {
    bar,
  }
))(Center);
