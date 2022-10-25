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
import RecycleBin from "./components/recycleBin";
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
  const [recycleBinVisible, setRecycleBinVisible] = useState(false)


  const [customMenuOptions, setCustomMenuOptions] = useState(menuOptions);
  // 关闭右侧抽屉后,头部导航栏上相应的activeIcon需要取消active的状态
  const [isResetActiveIcon, setIsResetActiveIcon] = useState(false)

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
    document.addEventListener("keydown", handleStopWindowWheel);
    return () => {
      document.removeEventListener("keydown", handleStopWindowWheel);
    };
  }, []);

  /**
   * description:  是否显示中心画布上方的导航栏
   */
  const showWhichBar = (whichBar: string) => {
    const visibleReflect = {
      dataContainer: false,
      callbackArgs: false,
      moduleUpdate: false,
      dataFilters: false,
      componentTheme: false,
      recycleBin: false,
    }
    setIsResetActiveIcon(false)
    if (["zujian", "sucai"].includes(whichBar)) {
      setZujianORsucai(whichBar);
      setShowTopBar(true);
      return;
    } else {
      setShowTopBar(false);
    }
    switch (whichBar) {
      case "shujurongqi":
        visibleReflect.dataContainer = true;
        break;
      case "huitiaoguanli":
        visibleReflect.callbackArgs = true;
        break;
      case "zujiangengxin":
        visibleReflect.moduleUpdate = true;
        break;
      case "xiangmuguolvqi":
        visibleReflect.dataFilters = true;
        break;
      case "zhutifengge":
        visibleReflect.componentTheme = true;
        break;
      case "huishouzhan":
        visibleReflect.recycleBin = true;
    }
    setDataContainerVisible(visibleReflect.dataContainer);
    setCallbackArgsVisible(visibleReflect.callbackArgs);
    setModuleUpdateVisible(visibleReflect.moduleUpdate);
    setDataFiltersVisible(visibleReflect.dataFilters);
    setComponentThemeVisible(visibleReflect.componentTheme);
    setRecycleBinVisible(visibleReflect.recycleBin);
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

  // 每次
  const handleDCVisibleChange = (bool: boolean) => {
    setDataContainerVisible(bool);
    if (!bool) setIsResetActiveIcon(true)
  };
  const handleCbAvailableChange = (bool: boolean) => {
    setCallbackArgsVisible(bool);
    if (!bool) setIsResetActiveIcon(true)
  };
  const handleMUAvailableChange = (bool: boolean) => {
    setModuleUpdateVisible(bool);
    if (!bool) setIsResetActiveIcon(true)
  };
  const handleDataFilterAvailableChange = (bool: boolean) => {
    setDataFiltersVisible(bool);
    if (!bool) setIsResetActiveIcon(true)
  };
  const handleComponentThemeAvailableChange = (bool: boolean) => {
    setComponentThemeVisible(bool);
    if (!bool) setIsResetActiveIcon(true)
  };
  const handleRBvailableChange = (bool: boolean) => {
    setRecycleBinVisible(bool);
    if (!bool) setIsResetActiveIcon(true)
  }

  return (
    <Layout>
      <ChooseArea />
      <Header className="home-header">
        <CustomHeader showWhichBar={showWhichBar} isResetActiveIcon={isResetActiveIcon} />
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
          <RecycleBin visible={recycleBinVisible} onChange={handleRBvailableChange} />
        </div>
      </div>
      <div>
        {
          (bar.isShowRightMenu || bar.isCopyComponentToDashboard) &&
          <CenterRightMenu menuOptions={customMenuOptions} hideMenu={hideMenu} />
        }
      </div>
    </Layout>
  );
}

export default withRouter(connect(({ bar }: any) => (
  { bar }
))(withRouter(App)));
