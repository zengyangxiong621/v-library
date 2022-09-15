import { useEffect, useState } from "react";
// react-beautiful-dnd
// ant
import { connect } from "dva";
import "./index.less";
import axios from "axios";
import { http } from "@/services/request";

import { Layout } from "antd";
import { withRouter } from "dva/router";

import CustomHeader from "./components/header/index";
import Left from "./left";
import CenterCanvas from "./center";
import Right from "./right";
import CenterHeaderBar from "./center/components/topBar/index";
import CenterBottomBar from "./center/components/BottomBar/index";
import ChooseArea from "./center/components/ChooseArea";
import CenterRightMenu from "./left/components/rightClickMenu/rightClickMenu";
import { menuOptions } from "./left/Data/menuOptions";
import DataContainer from "./components/dataContainer";
import CallbackArgs from "./components/callbackArgs";
import DataFilters from "./components/dataFilters";
import ComponentTheme from "./components/componentTheme";
import ModuleUpdate from "./components/moduleUpdate";
import useLoading from "@/components/useLoading";
import DynamicPanel from "@/routes/dashboard/left/components/dynamicPanel";
import { useEventEmitter } from "ahooks";

const { Header } = Layout;

function App({ bar, dispatch, location, history }: any) {
  const isPanel = bar.isPanel;
  const [showTopBar, setShowTopBar] = useState(false);
  const [zujianORsucai, setZujianORsucai] = useState("zujian");
  const [dataContainerVisible, setDataContainerVisible] = useState(false);
  const [callbackArgsVisible, setCallbackArgsVisible] = useState(false);
  const [dataFiltersVisible, setDataFiltersVisible] = useState(false);
  const [moduleUpdateVisible, setModuleUpdateVisible] = useState(false);
  const [componentThemeVisible, setComponentThemeVisible] = useState(false);
  const [customMenuOptions, setCustomMenuOptions] = useState(menuOptions);
  const [loading, setLoading]: any = useLoading(false, document.querySelector(".p-home"));
  // 在多个组件之间进行事件通知有时会让人非常头疼，借助 EventEmitter ，可以让这一过程变得更加简单。
  const focus$ = useEventEmitter();

  const detectZoom = () => {
    let ratio = 0,
      screen: any = window.screen,
      ua = navigator.userAgent.toLowerCase();

    if (window.devicePixelRatio !== undefined) {
      ratio = window.devicePixelRatio;
    } else if (~ua.indexOf("msie")) {
      if (screen.deviceXDPI && screen.logicalXDPI) {
        ratio = screen.deviceXDPI / screen.logicalXDPI;
      }
    } else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
      ratio = window.outerWidth / window.innerWidth;
    }

    if (ratio) {
      ratio = Math.round(ratio * 100);
    }
    return ratio;
  };
  const keyCodeMap: any = {
    // 91: true, // command
    61: true,
    107: true, // 数字键盘 +
    109: true, // 数字键盘 -
    173: true, // 火狐 - 号
    187: true, // +
    189: true, // -
  };

  const documentRightClick = (event: any) => {
    const dom: any = (event.target as any) || null;
    let temp = true;
    // 如果点击的 dom 的 className 在这个 className 数组中，那就清空
    const awayList = ["ant-layout", "draggable-wrapper", "left-wrap", "use-away", "canvas-draggable"];
    awayList.forEach(className => {
      if (dom && dom.className && Object.prototype.toString.call(dom.className) === "[object String]" && dom.className.indexOf(className) !== -1) {
        temp = false;
      }
    });
    if (!temp) {
      event.preventDefault();
    }
  };

  const clearAllStatus = (event: MouseEvent) => {
    const dom: any = (event.target as any) || null;
    let temp = true;
    // 如果点击的 dom 的 className 在这个 className 数组中，那就清空
    const awayList = ["ant-layout", "draggable-wrapper", "left-wrap", "use-away", "canvas-draggable"];
    awayList.forEach(className => {
      if (dom && dom.className && Object.prototype.toString.call(dom.className) === "[object String]" && dom.className.indexOf(className) !== -1) {
        temp = false;
      }
    });
    if (!temp) {
      dispatch({
        type: "bar/clearAllStatus",
      });
      // 取消选中节点的输入框
      dispatch({
        type: "bar/reName",
        payload: {
          value: false,
        },
      });
      // 取消右键菜单
      dispatch({
        type: "bar/save",
        payload: {
          isShowRightMenu: false,
        },
      });
    }
  };

  useEffect(() => {
    document.addEventListener("click", clearAllStatus);
    document.addEventListener("contextMenu", documentRightClick);
    document.oncontextmenu = documentRightClick;

    return () => {
      document.removeEventListener("click", clearAllStatus);
      document.oncontextmenu = null;
      document.removeEventListener("contextMenu", documentRightClick);
      dispatch({
        type: "bar/clearCurrentDashboardData"
      });
    };
  }, []);

  // 进入画布时，直接加载所有的组件，并将这些组件的config放入bar.moduleDefaultConfig中
  const importComponent = (data: any) => {
    return axios.get(`${(window as any).CONFIG.COMP_URL}/${data.moduleType}/${data.moduleName}/${data.moduleVersion}/${data.moduleName}.js`).then(res => res.data);
  };
  const loadComp = async (data: any) => {
    window.eval(`${await importComponent(data)}`);
    const { ComponentDefaultConfig } = (window as any).VComponents;
    const currentDefaultConfig = ComponentDefaultConfig;
    dispatch({
      type: "bar/setModuleDefaultConfig",
      payload: currentDefaultConfig,
      itemData: data
    });
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
      content.forEach((item: any) => {
        loadComp(item);
      });
    };
    getAllModulesConfig();
  }, []);

  // 阻止 window 缩放
  const handleStopWindowWheel = (event: any) => {
    const e = event || window.event;
    const ctrlKey = e.ctrlKey || e.metaKey;
    if (ctrlKey && keyCodeMap[e.keyCode]) {
      e.preventDefault();
    } else if (e.detail) { // Firefox
      event.returnValue = false;
    }
  };

  useEffect(() => {
    // const windowPathList = window.location.pathname.split('/')
    // const dashboardId = windowPathList[2]
    // let panelId = null, stateId = null
    // if (windowPathList[3]) {
    //   panelId = windowPathList[3].split('-')[1]
    // }
    // if (windowPathList[4]) {
    //   stateId = windowPathList[4].split('-')[1]
    // }
    // let isPanel = false
    // if (panelId) {
    //   isPanel = true
    // }
    // dispatch({
    //   type: 'bar/initDashboard',
    //   payload: {
    //     dashboardId,
    //     isPanel,
    //     panelId,
    //     stateId,
    //   },
    //   cb: () => { }
    // })

    // dispatch({
    //   type: 'bar/getDashboardDetails',
    //   payload: dashboardId,
    // })
    // dispatch({
    //   type: 'bar/getDataContainerList',
    //   payload: dashboardId,
    //   cb:async (dataContainerList: any) => {
    //
    //     console.log('dataContainerList', dataContainerList)
    //   }
    // })
    document.addEventListener("keydown", handleStopWindowWheel);
    return () => {
      document.removeEventListener("keydown", handleStopWindowWheel);
    };
  }, []);

  /**
   * description:  是否显示中心画布上方的导航栏
   */

  const showWhichBar = (whichBar: string) => {
    if (["zujian", "sucai"].includes(whichBar)) {
      setZujianORsucai(whichBar);
      setShowTopBar(true);
      return;
    } else {
      setShowTopBar(false);
    }
    switch (whichBar) {
      case "shujurongqi":
        setDataContainerVisible(true);
        setCallbackArgsVisible(false);
        setModuleUpdateVisible(false);
        setDataFiltersVisible(false);
        setComponentThemeVisible(false);
        break;
      case "huitiaoguanli":
        setCallbackArgsVisible(true);
        setDataContainerVisible(false);
        setModuleUpdateVisible(false);
        setDataFiltersVisible(false);
        setComponentThemeVisible(false);
        break;
      case "zujiangengxin":
        setModuleUpdateVisible(true);
        setCallbackArgsVisible(false);
        setDataContainerVisible(false);
        setDataFiltersVisible(false);
        setComponentThemeVisible(false);
        break;
      case "xiangmuguolvqi":
        setDataFiltersVisible(true);
        setCallbackArgsVisible(false);
        setDataContainerVisible(false);
        setModuleUpdateVisible(false);
        setComponentThemeVisible(false);
        break;
      case "zhutifengge":
        setComponentThemeVisible(true);
        setDataFiltersVisible(false);
        setCallbackArgsVisible(false);
        setDataContainerVisible(false);
        setModuleUpdateVisible(false);
        break;
    }
  };

  /**
   * description: 画布右键菜单
   */
  // 点击右键菜单后，隐藏菜单
  const hideMenu = () => {
    dispatch({
      type: "bar/setIsShowRightMenu",
      payload: false,
    });
  };
  const handleDCVisibleChange = (value: boolean) => {
    setDataContainerVisible(value);
  };
  const handleCbAvailableChange = (value: boolean) => {
    setCallbackArgsVisible(value);
  };
  const handleMUAvailableChange = (value: boolean) => {
    setModuleUpdateVisible(value);
  };
  const handleDataFilterAvailableChange = (value: boolean) => {
    setDataFiltersVisible(value);
  };
  const handleComponentThemeAvailableChange = (value: boolean) => {
    setComponentThemeVisible(value);
  };


  return (
    <Layout>
      <ChooseArea />
      <Header className="home-header">
        <CustomHeader showWhichBar={showWhichBar} />
      </Header>
      <div className="p-home">
        <div className="home-left-wrap">
          {
            isPanel ? <DynamicPanel /> : <></>
          }
          <Left />
        </div>
        <div className="center-wrap">
          {
            showTopBar && <CenterHeaderBar showTopBar={showTopBar} zujianORsucai={zujianORsucai} />
          }
          <CenterCanvas focus$={focus$} />
          <CenterBottomBar focus$={focus$} />
        </div>
        <div className="right-wrap">
          <Right />
          <DataContainer visible={dataContainerVisible} onChange={handleDCVisibleChange} />
          <CallbackArgs visible={callbackArgsVisible} onChange={handleCbAvailableChange} />
          <ModuleUpdate visible={moduleUpdateVisible} onChange={handleMUAvailableChange} />
          <DataFilters visible={dataFiltersVisible} onChange={handleDataFilterAvailableChange} />
          <ComponentTheme visible={componentThemeVisible} onChange={handleComponentThemeAvailableChange} />
        </div>
        {
          bar.isShowRightMenu &&
          <CenterRightMenu menuOptions={customMenuOptions} hideMenu={hideMenu} />
        }
      </div>
    </Layout>
  );
}

export default withRouter(connect(({ bar }: any) => (
  { bar }
))(withRouter(App)));
