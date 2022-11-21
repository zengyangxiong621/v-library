import * as React from "react";
import { useEffect } from "react";
import { connect } from "dva";
import { useSetState } from "ahooks";
import CustomDraggable from "@/routes/dashboard/center/components/CustomDraggable";
import { http } from "@/services/request";
import { IPanel } from "@/routes/dashboard/center/components/CustomDraggable/type";
import { layersPanelsFlat, layersReverse, deepClone } from "@/utils/index.js";

interface State {
  overflow: "none" | "auto" | "hidden"; // 面板隐藏的方式
  allData: Array<{
    layers: any[];
    components: any[];
    [key: string]: any;
  }>; // 面板内所有状态的集合
  activeIndex: number; // 当前展示的状态下标
  isLoading: boolean; // 是否请求完成
  [key: string]: any;
}

const ReferencePanel = ({ bar, id, dispatch, panel, isDashboard = true }: any) => {
  const componentData = bar.componentData;
  // console.log('panel', panel)
  const { states, config: recommendConfig, name, type } = panel;
  console.log("panelpanelpanel", panel);
  const {
    isScroll = false,
    allowScroll = false,
    animationType = "0",
    scrollTime = 0,
    animationTime = 0,
  } = recommendConfig;
  const defaultStateId = (states.length > 0 && states[0].id) || "";
  const [state, setState] = useSetState<State>({
    overflow: "hidden",
    allData: [],
    activeIndex: 0,
    isLoading: false,
  });

  const getComponentData = async (component: any) => {
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
        componentData[component.id] = component.dataType !== "static" ? data : data.data;
      } else {
        throw new Error("请求不到数据");
      }
    } catch (err) {
      componentData[component.id] = null;
    }
    return componentData[component.id];
  };
  const getStateDetails = async ({ id }: any) => {
    try {
      return bar.fullAmountDashboardDetails.find((item: any) => item.id === id);
    } catch (e) {
      return null;
    }
  };
  const getReferenceDetails = async ({ name, id }: { name: string; id: string }) => {
    const { components, layers, dashboardConfig } = bar.fullAmountDashboardDetails.find(
      (item: any) => item.id === id
    );
    const layerPanels: any = layersPanelsFlat(layers);
    const panels: Array<IPanel> = await Promise.all(
      layerPanels.map((item: any) => getStateDetails(item))
    );
    // await Promise.all(components.map((item: any) => getComponentData(item)));
    dispatch({
      type: "save",
      payload: {
        componentData,
      },
    });
    const backgroundColor = dashboardConfig.find((item) => item.name === "styleColor").value;
    const backgroundImage = dashboardConfig.find((item) => item.name === "backgroundImg").value;
    const newLayers = deepClone(layers);
    layersReverse(newLayers);
    return {
      components,
      layers: newLayers,
      dashboardConfig,
      id,
      name,
      panels,
      backgroundColor,
      backgroundImage,
    };
  };

  useEffect(() => {
    (async function () {
      if (states.length === 0) return;
      const data = await Promise.all(
        states.map((item: { name: string; id: string }) => getReferenceDetails(item))
      );
      console.log("引用面板所有的data", data);
      setState({
        allData: data,
        isLoading: true,
      });
    })();
  }, []);

  useEffect(() => {
    let timer: any = null;
    if (!isDashboard && state.isLoading && allowScroll) {
      timer = setInterval(() => {
        let currentIndex = state.activeIndex + 1;
        if (currentIndex === state.allData.length) {
          currentIndex = 0;
        }
        if (animationTime === 0) {
          setState({ activeIndex: currentIndex });
        } else if (animationTime > 0) {
          const opacityTimer = setInterval(() => {
            const statusWrapDOMs: any = document.querySelectorAll(`.panel-${id} .status-wrap`);
            if (statusWrapDOMs.length === 0) return;
            if (!statusWrapDOMs[0].style.opacity) {
              statusWrapDOMs.forEach((dom: HTMLElement, index: number) => {
                if (index === currentIndex) {
                  dom.style.opacity = "0";
                } else {
                  dom.style.opacity = "1";
                }
              });
            } else {
              statusWrapDOMs.forEach((dom: HTMLElement, index: number) => {
                if (index === currentIndex) {
                  dom.style.opacity = `${Number(dom.style.opacity) + 0.5}`;
                  dom.style.display = "block";
                  if (Number(dom.style.opacity) >= 1) {
                    dom.style.opacity = "";
                  }
                } else {
                  dom.style.opacity = `${Number(dom.style.opacity) - 0.5}`;
                  dom.style.display = "block";
                  if (Number(dom.style.opacity) <= 0) {
                    dom.style.opacity = "";
                    setState({ activeIndex: currentIndex });
                    clearInterval(opacityTimer);
                  }
                }
              });
            }
          }, 500);
        }
      }, scrollTime);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [state.isLoading, state.activeIndex]);

  useEffect(() => {
    (async function () {
      console.log("panel.states[0].id", panel.states);
      if (panel?.states[0]?.id) {
        const data = await getReferenceDetails(panel.states[0]);
        setState({
          allData: [data],
        });
      } else {
        setState({
          allData: [],
        });
      }
    })();
  }, [panel.states]);
  return (
    <div
      className={`reference-panel panel-${id}`}
      style={{ pointerEvents: "none", overflow: state.overflow, width: "100%", height: "100%" }}
    >
      {state.allData.map((item: any, index: number) => {
        return (
          <div
            className="status-wrap"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              display: state.activeIndex === index ? "block" : "none",
              transition: `transform 600ms ease 0s, opacity ${animationTime}ms ease 0s`,
              backgroundImage: item.backgroundImage ? `url('${item.backgroundImage}')` : "unset",
              backgroundColor: item.backgroundColor ? item.backgroundColor : "unset",
              backgroundRepeat: "no-repeat",
              // backgroundSize: "contain",
              // backgroundPosition: "center center",
            }}
          >
            <CustomDraggable
              mouse={0}
              layers={item.layers}
              components={item.components}
              panels={item.panels}
            />
          </div>
        );
      })}
    </div>
  );
};

export default connect(({ bar }: any) => ({ bar }))(ReferencePanel);
