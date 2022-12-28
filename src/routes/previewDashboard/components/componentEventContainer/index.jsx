/* eslint-disable no-useless-escape */
import RemoteBaseComponent from "@/components/RemoteBaseComponent";
import { useState, useRef, useEffect } from "react";
import BasicBar from "@/customComponents/echarts/components/basicBar/v1.1.4/index";
import { connect } from "dva";
import IndicatorCard from "@/customComponents/echarts/components/indicatorcard/v1.0.8";

import { cloneDeep } from "lodash";
import { debounce } from "@/utils/common";
import ErrorCatch from "react-error-catch";
import RemoteComponentErrorRender from "@/components/RemoteComponentErrorRender";
import useWebsocket from "@/utils/useWebsocket";

const ComponentEventContainer = ({
  previewDashboard,
  dispatch,
  events = [],
  id = 0,
  scale = 1,
  getDrillDownData,
  isHideDefault,
  ...props
}) => {
  const callbackArgs = previewDashboard.callbackArgs;
  const callbackParamsList = previewDashboard.callbackParamsList;
  const { componentConfig, componentStyle } = props;
  const { websocketConfig, drillDownArr } = componentConfig;
  // 拿到每个组件的websocketConfig，判断有无，则批量发起请求
  // 拿到type 0: 需sendMessage;  1: setSendData
  const [animationConfig] = useState({
    transition: "transform 600ms ease 0s",
  });
  const componentRef = useRef(null);
  const [opacityStyle] = useState({ opacity: 1 });
  const opacityTimeIds = useRef([]);
  const [websocketObj] = useState({});

  // 跨屏
  // 组件有关联过websocket，全部都发起连接
  if (websocketConfig.length > 0) {
    websocketConfig.map((item) => {
      websocketObj[item.id] = useWebsocket({ url: item.websocketUrl });
    });
  }

  // 点击
  const handleClick = debounce((e, data) => {
    // e.stopPropagation();
    // e.preventDefault();
    if (!data) return;
    const clickEvents = events.filter((item) => item.trigger === "click");
    const clickActions = clickEvents.reduce((pre, cur) => pre.concat(cur.actions), []);
    if (clickActions.length === 0) {
      return;
    }
    console.log("点击事件", data);
    customEventsFunction(clickEvents, data);
  }, 300);
  const handleInteractiveClick = (e, data) => {
    // e.stopPropagation();
    // e.preventDefault();
    const clickEvents = events.filter((item) => item.trigger === "click");
    const clickActions = clickEvents.reduce((pre, cur) => pre.concat(cur.actions), []);
    console.log("clickActions", clickActions);
    if (clickActions.length === 0) {
      return;
    }
    console.log("clickEvents", clickEvents);
    customEventsFunction(clickEvents, data);
  };

  const handleDataChange = (data) => {
    // console.log(data, "handleDataChange data------------------------------");
    const mouseEnterEvents = events.filter((item) => item.trigger === "dataChange");
    const mouseEnterActions = mouseEnterEvents.reduce((pre, cur) => pre.concat(cur.actions), []);
    if (mouseEnterActions.length === 0) {
      return;
    }
    console.log("数据改变", data);
    customEventsFunction(mouseEnterEvents, data);
  };

  const handleInteractiveMouseEnter = (e, data) => {
    // console.log("handleInteractiveMouseEnter------------------------------------");
    // e.stopPropagation();
    // e.preventDefault();
    const mouseEnterEvents = events.filter((item) => item.trigger === "mouseEnter");
    const mouseEnterActions = mouseEnterEvents.reduce((pre, cur) => pre.concat(cur.actions), []);
    if (mouseEnterActions.length === 0) {
      return;
    }
    console.log("鼠标移入", data);
    customEventsFunction(mouseEnterEvents, data);
  };
  const handleInteractiveMouseLeave = (e, data) => {
    // e.stopPropagation();
    // e.preventDefault();
    const mouseOutEvents = events.filter((item) => item.trigger === "mouseLeave");
    const mouseOutActions = mouseOutEvents.reduce((pre, cur) => pre.concat(cur.actions), []);
    if (mouseOutActions.length === 0) {
      return;
    }
    console.log("鼠标移出", data);
    customEventsFunction(mouseOutEvents, data);
  };
  // 移入
  const handleMouseEnter = debounce((e, data) => {
    // e.stopPropagation();
    // e.preventDefault();
    const mouseEnterEvents = events.filter((item) => item.trigger === "mouseEnter");
    const mouseEnterActions = mouseEnterEvents.reduce((pre, cur) => pre.concat(cur.actions), []);
    if (mouseEnterActions.length === 0) {
      return;
    }
    console.log("鼠标移入", data);
    customEventsFunction(mouseEnterEvents, data);
  });
  // 移出
  const handleMouseLeave = debounce((e, data) => {
    // e.stopPropagation();
    // e.preventDefault();
    const mouseOutEvents = events.filter((item) => item.trigger === "mouseLeave");
    const mouseOutActions = mouseOutEvents.reduce((pre, cur) => pre.concat(cur.actions), []);
    if (mouseOutActions.length === 0) {
      return;
    }
    console.log("鼠标移出", data);
    customEventsFunction(mouseOutEvents, data);
  });

  const customEventsFunction = (events, data) => {
    console.log("events", events);
    events.forEach((item) => {
      const conditions = item.conditions;
      const conditionType = item.conditionType;
      // const callbackArgs = {
      //   startTime: '2022-06-17',
      //   endTime: '2022-06-17'
      // }
      /*        [
              {
                "compare": "==",
                "code": "return data",
                "field": "startTime",
                "expected": "2022-06-17",
                "name": "条件",
                "id": "9346fc0b-8a99-441e-8fa9-7d5628290333",
                "type": "field"
              }
              ]*/
      const conditionJudgeFunc = (condition) => {
        // 条件值
        const field = condition.field;
        const type = condition.type;
        const code = condition.code;
        if (type === "custom") {
          return new Function("data", code)(data);
        }
        if (condition.compare === "==") {
          return data[field] == condition.expected;
        }
        if (condition.compare === "!=") {
          return data[field] !== condition.expected;
        }
        if (condition.compare === "<") {
          return Number(data[field]) < Number(condition.expected);
        }
        if (condition.compare === "<=") {
          return (
            Number(data[field]) < Number(condition.expected) || data[field] === condition.expected
          );
        }
        if (condition.compare === ">") {
          return Number(data[field]) > Number(condition.expected);
        }
        if (condition.compare === ">=") {
          return (
            Number(data[field]) > Number(condition.expected) || data[field] === condition.expected
          );
        }
        if (condition.compare === "include") {
          return data[field].indexOf(condition.expected) !== -1;
        }
        if (condition.compare === "exclude") {
          return data[field].indexOf(condition.expected) === -1;
        }
        return false;
      };
      let isAllowAction = true;
      if (conditions.length > 0) {
        isAllowAction = Array.prototype[conditionType === "all" ? "every" : "some"].call(
          conditions,
          conditionJudgeFunc
        );
      }
      console.log("isAllowAction", isAllowAction);
      if (!isAllowAction) {
        return;
      }
      console.log("item", item);
      item.actions.forEach((action) => {
        const animation = action.animation;
        const delay = animation.delay;
        setTimeout(() => {
          action.component.forEach((id) => {
            const dom = document.querySelector(`.event-id-${id}`);
            dom.style.transition = `transform ${animation.duration}ms ${animation.timingFunction} 0s`;
            Object.keys(action)
              .filter(
                (key) =>
                  ![
                    "id",
                    "name",
                    "trigger",
                    "unmount",
                    "componentScope",
                    "component",
                    "action",
                  ].includes(key)
              )
              .forEach((key) => {
                actionConfigFuncList[key] &&
                  actionConfigFuncList[key](action[key], action.action, dom, action.id, action, id);
              });
          });
        }, delay);
      });
    });
  };

  // 数组去重，取最后一个
  const duplicateFn = (arr) => {
    let map = new Map();
    for (let item of arr.reverse()) {
      if (!map.has(item.target)) {
        map.set(item.target, item);
      }
    }
    return [...map.values()];
  };

  let message = Object.keys(websocketObj).reduce((pre, cur) => {
    return {
      ...pre,
      [cur]: websocketObj[cur]?.receiveData || "",
    };
  }, {});

  // 跨屏 订阅消息处理
  for (const key in message) {
    if (Object.hasOwnProperty.call(message, key)) {
      const element = message[key];
      useEffect(() => {
        console.log(element, "element-----------");
        if (element) {
          componentRef?.current?.handleEvent &&
            componentRef?.current?.handleEvent(JSON.parse(element || ""));
        }
      }, [element]);
    }
  }

  // 拿到订阅消息的数据
  // const message = JSON.parse(websocketObj[item.id].receiveData)
  // console.log('message', message)
  // componentRef?.current?.handleEvent && componentRef?.current?.handleEvent(message)
  // 走过滤器则需添加
  // let activeId = componentConfig.id;
  // const activeComponents = [activeId].reduce((pre, id) => pre.concat(previewDashboard.components.find(item => item.id === id)), [])
  //  // 重新获取部分组件（绑定数据源的组件列表）的数据
  // dispatch({
  //   type: 'publishDashboard/getComponentsData',
  //   payload: activeComponents
  // })
  const handleStatusChange = debounce((data) => {
    // 保存当前点击的组件的下级组件
    const targetIdArr = componentConfig.drillDownArr.map((item) => item.id);
    dispatch({
      type: "previewDashboard/save",
      payload: {
        drillDownComponentIdForCurClickComponent: targetIdArr,
      },
    });
    // 下钻流程
    getDrillDownData(data);

    // 跨屏  建立websocket连接，发送数据
    // TODO 点击组件发出什么就先直接传什么
    // websocketConfig 组件内有消息且type为 0时发送
    if (websocketConfig.length > 0) {
      websocketConfig.map((item) => {
        if (item.type === 0) {
          websocketObj[item.id].sendMessage(data);
        }
      });
    }

    const componentId = props.componentConfig.id;
    const component = previewDashboard.fullAmountComponents.find((item) => item.id === componentId);
    const compCallbackArgs =
      component && component.callbackArgs ? duplicateFn(cloneDeep(component.callbackArgs)) : [];
    // 回调参数列表
    // 过滤出 callbackParamsList 中的存在 sourceId === component 的 每一项
    const sourceCallbackList = callbackParamsList.filter((item) =>
      item.sourceModules.find((jtem) => jtem.id === componentId)
    );
    // 需要作用到哪些组件上
    let activeIds = [];
    let temp = false;
    sourceCallbackList.forEach((item) => {
      item.sourceModules.forEach((sourceItem) => {
        if (sourceItem.id === componentId) {
          // 回调列表中的当前数据如果有目标组件再进行下一步
          // 循环组件设置的回调参数，获取变量名和字段的对应关系
          if (item.destinationModules.length > 0) {
            compCallbackArgs.forEach((callback) => {
              // 判断是否为同一个源
              if (item.callbackParam === callback.target) {
                // 翻页组件不需要配置origin
                if (component.moduleName === "paginationComp") {
                  temp = true;
                  callbackArgs[callback.target] = data[callback.target];
                  activeIds = activeIds.concat(item.destinationModules.map((module) => module.id));
                  // 值是否改变
                  // data的值存在并且
                } else if (
                  ["cascader", "select2"].includes(component.moduleName) ||
                  (data &&
                    ([0, false].includes(data[callback.origin]) ? true : data[callback.origin]) &&
                    callbackArgs[callback.target] !== data[callback.origin])
                ) {
                  temp = true;
                  callbackArgs[callback.target] = data ? data[callback.origin] : data;
                  activeIds = activeIds.concat(item.destinationModules.map((module) => module.id));
                }
                dispatch({
                  type: "previewDashboard/save",
                  payload: {
                    callbackArgs,
                  },
                });
              }
            });
          }
        }
      });
    });
    // console.log('activeIds1', activeIds)
    // console.log('temp', temp)
    if (temp) {
      activeIds = [...new Set(activeIds)];
      const activeComponents = activeIds.reduce(
        (pre, id) =>
          pre.concat(previewDashboard.fullAmountComponents.find((item) => item.id === id)),
        []
      );
      // 绑定数据容器的组件列表
      const componentsByDataContainer = activeComponents.filter(
        (component) => component.dataFrom === 1
      );
      // 绑定数据源的组件列表
      const componentsByDataSource = activeComponents.filter(
        (component) => component.dataFrom === 0
      );
      // 重新获取部分组件（绑定数据源的组件列表）的数据
      dispatch({
        type: "previewDashboard/getComponentsData",
        payload: activeComponents,
      });
      // 重新获取部分数据容器的数据
      const filterComponentsByDataContainer = [];
      // 去重
      activeComponents.forEach((component) => {
        component.dataContainers.forEach((container) => {
          if (!filterComponentsByDataContainer.find((item) => item.id === container.id)) {
            filterComponentsByDataContainer.push(container);
          }
        });
      });
      dispatch({
        type: "previewDashboard/getContainersData",
        payload: filterComponentsByDataContainer,
      });
    }
    // 自定义事件
    const dataChangeEvents = events.filter(
      (item) => item.trigger === "dataChange" || item.trigger === "statusChange"
    );

    const dataChangeActions = dataChangeEvents.reduce((pre, cur) => pre.concat(cur.actions), []);
    if (dataChangeActions.length === 0) {
      return;
    }
    customEventsFunction(dataChangeEvents, data);
  }, 300);

  // 这个工具对象被下方animation函数中引用, 主要用来实现<用户多次点击的情况下，让组件只触发第一次过渡效果>的功能
  // 不将其作为animation的参数传入是因为使用闭包引用的方式更利于和animation函数解耦以及animation函数入参数量的扩展
  const toolObj = {
    y: 0,
    x: 0,
  };
  const animation = (
    { duration, timingFunction, type },
    actionType,
    dom,
    actionId,
    action,
    componentId
    // toolObj = { y: 0, x: 0 }
  ) => {
    if (["show", "hide"].includes(actionType)) {
      // transform = 'translateY(200px)'
      let translate = {
        x: 0,
        y: 0,
      };
      switch (type) {
        case "slideLeft":
          translate.x = -200;
          break;
        case "slideRight":
          translate.x = 200;
          break;
        case "slideTop":
          translate.y = -200;
          break;
        case "slideBottom":
          translate.y = 200;
          break;
        default:
          break;
      }
      const translateX = /translateX\((.+?)\)/g;
      const translateY = /translateY\((.+?)\)/g;

      if (translateX.test(dom.style.transform)) {
        // let value = dom.style.transform.match(translateX);
        // 取出数字包括 - 和 . 号
        // let xLength = Number(value.replace(/[^\d|^\.|^\-]/g, ""));
        const curX = +dom.style.transform.match(/translateX\((.+?)px\)/)[1];

        // 通过toolObj来实现即使用户点击组件多次，但只改变一次curX
        //@Mark toolObj.x初始值为0, curX也为0时，会执行多次，但是赋的值始终为0,所以不影响逻辑
        if (!toolObj.x) {
          toolObj.x = curX;
        }
        // 针对 隐藏时有移动组件动作的情况（比如隐藏时向上下移动，需获取组件最新的Y值并更新）
        const curY = +dom.style.transform.match(/translateY\((.+?)px\)/)[1];
        dom.style.transform = dom.style.transform.replace(
          /translateY\((.+?)\)/g,
          `translateY(${curY}px)`
        );
        // 使用定时器将过渡效果延迟至组件显示之后，否则过渡过程无法呈现
        setTimeout(() => {
          dom.style.transform = dom.style.transform.replace(
            translateX,
            // `translateX(${translate.x}px)`
            `translateX(${toolObj.x + translate.x}px)`
          );
        }, 500);
      } else {
        dom.style.transform += `translateX(${translate.x}px)`;
      }
      if (translateY.test(dom.style.transform)) {
        // let value = dom.style.transform.match(translateY)[0];
        // let yLength = Number(value.replace(/[^\d|^\.|^\-]/g, ""));
        const curY = +dom.style.transform.match(/translateY\((.+?)px\)/)[1];

        // 通过toolObj来实现即使用户点击组件多次，但只改变一次curY
        //@Mark toolObj.y初始值为0, curY也为0时，会执行多次，但是赋的值始终为0,所以不影响逻辑
        if (!toolObj.y) {
          toolObj.y = curY;
        }
        // 针对 隐藏时有移动组件动作的情况（比如隐藏时向左右移动，需获取组件最新的X值并更新）
        const curX = +dom.style.transform.match(/translateX\((.+?)px\)/)[1];
        dom.style.transform = dom.style.transform.replace(
          /translateX\((.+?)\)/g,
          `translateX(${curX}px)`
        );
        // 使用定时器将过渡效果延迟至组件显示之后,否则过渡过程无法呈现
        setTimeout(() => {
          dom.style.transform = dom.style.transform.replace(
            translateY,
            `translateY(${toolObj.y + translate.y}px)`
            // `translateY(${translate.y}px)`
          );
        }, 500);
      } else {
        dom.style.transform += `translateY(${translate.y}px)`;
      }
      let timer = null;
      // const index = opacityTimeIds.current.indexOf(componentId);
      // if (index !== -1) {
      //   // 说明存在
      //   clearInterval(timer)
      //   console.log('清除了不')
      //   opacityTimeIds.current.splice(index, 1)
      // } else {
      //   opacityTimeIds.current.push(componentId)
      // }
      // console.log("选项卡", dom.style.display);
      // 如果本来就是显示的，并且还设置成显示，那就不执行
      // 如果本来就是隐藏的，并且还设置成隐藏，那就不执行
      if (
        (dom.style.display === "block" && actionType === "show" && dom.style.opacity !== "0") ||
        (dom.style.display === "none" && actionType === "hide")
      ) {
        return;
      }
      if (dom.style.display === "none" && actionType === "show") {
        dom.style.display = "block";
        dom.style.opacity = 0;
      }
      // 渐隐渐现
      timer = setInterval(() => {
        // 在一个时间段内，只存在一种事件
        if (actionType === "show") {
          if (dom.style.opacity >= 1) {
            dom.style.opacity = 1;
            dom.style.display = "block";
            clearInterval(timer);
            const index = opacityTimeIds.current.indexOf(componentId);
            opacityTimeIds.current.splice(index, 1);
          } else {
            dom.style.opacity = Number(dom.style.opacity) + 0.02;
          }
        }
        if (actionType === "hide") {
          if (dom.style.opacity <= 0) {
            dom.style.opacity = 0;
            dom.style.display = "none";
            clearInterval(timer);
            const index = opacityTimeIds.current.indexOf(componentId);
            opacityTimeIds.current.splice(index, 1);
          } else {
            dom.style.opacity = Number(dom.style.opacity) - 0.02;
          }
        }
      }, duration / 50);
    }
  };

  const rotate = ({ perspective, rotateX, rotateY, rotateZ }, action, dom) => {
    if (action === "rotate") {
      const rotateRegX = /rotateX\((.+?)\)/g;
      const rotateRegY = /rotateY\((.+?)\)/g;
      const rotateRegZ = /rotateZ\((.+?)\)/g;
      const perspectiveReg = /perspective\((.+?)\)/g;
      if (rotateRegX.test(dom.style.transform)) {
        dom.style.transform = dom.style.transform.replace(rotateRegX, `rotateX(${rotateX}deg)`);
      } else {
        dom.style.transform += `rotateX(${rotateX}deg)`;
      }
      if (rotateRegY.test(dom.style.transform)) {
        dom.style.transform = dom.style.transform.replace(rotateRegY, `rotateY(${rotateY}deg)`);
      } else {
        dom.style.transform += `rotateY(${rotateY}deg)`;
      }
      if (rotateRegZ.test(dom.style.transform)) {
        dom.style.transform = dom.style.transform.replace(rotateRegZ, `rotateZ(${rotateZ}deg)`);
      } else {
        dom.style.transform += `rotateZ(${rotateZ}deg)`;
      }
      if (perspective) {
        if (perspectiveReg.test(dom.style.transform)) {
          dom.style.transform = dom.style.transform.replace(
            perspectiveReg,
            `perspective(${500}px)`
          );
        } else {
          dom.style.transform += `perspective(${500}px)`;
        }
      } else {
        if (perspectiveReg.test(dom.style.transform)) {
          dom.style.transform = dom.style.transform.replace(perspectiveReg, "");
        }
      }
    }
  };

  const showOrHide = (value) => {};

  const scaleFunc = ({ origin, x, y }, action, dom) => {
    if (action === "scale") {
      const scaleRegX = /scaleX\((.+?)\)/g;
      const scaleRegY = /scaleY\((.+?)\)/g;
      if (scaleRegX.test(dom.style.transform)) {
        dom.style.transform = dom.style.transform.replace(scaleRegX, `scaleX(${x})`);
      } else {
        dom.style.transform += `scaleX(${x})`;
      }
      if (scaleRegY.test(dom.style.transform)) {
        dom.style.transform = dom.style.transform.replace(scaleRegY, `scaleY(${y})`);
      } else {
        dom.style.transform += `scaleY(${y})`;
      }
      dom.style["transform-origin"] = origin;
    }
  };

  const translate = ({ toX, toY }, action, dom) => {
    if (action === "translate") {
      const translateReg = /translate3d\((.+?)\)/g;
      if (translateReg.test(dom.style.transform)) {
        dom.style.transform = dom.style.transform.replace(
          translateReg,
          `translate3d(${toX}px, ${toY}px, 0px)`
        );
      } else {
        dom.style.transform += `translate3d(${toX}px, ${toY}px, 0px)`;
      }
    }
  };

  const stateFunc = (stateId, actionType, dom, actionId, action, componentId) => {
    console.log("actionType", actionType);
    if (actionType === "updateStatus") {
      console.log("改变状态");
      console.log("dom", dom);
      console.log("stateId", stateId);
      console.log("集合", [...dom.children]);
      dom.querySelectorAll(".status-wrap").forEach((item) => {
        if (item.dataset.id === stateId) {
          // item.style.display = "block";
          item.style.visibility = "visible";
        } else {
          // item.style.display = "none";
          item.style.visibility = "hidden";
        }
      });
    }
  };

  const componentConfigFunc = (config, actionType, dom, actionId, action, componentId) => {
    if (actionType === "updateConfig") {
      const component = previewDashboard.fullAmountComponents.find(
        (item) => item.id === componentId
      );
      if (component) {
        component.config = [
          ...component.config.filter((item) => ["dimension", "hideDefault"].includes(item.name)),
          ...config,
        ];
        dispatch({
          type: "previewDashboard/save",
        });
      }
    }
  };

  const actionConfigFuncList = {
    animation,
    rotate,
    scale: scaleFunc,
    translate,
    state: stateFunc,
    componentConfig: componentConfigFunc,
  };

  return (
    <div
      key={id}
      className={`single-component event-id-${id}  animation-id-${id}`}
      style={{
        ...componentStyle,
        ...animationConfig,
        ...opacityStyle,
        display: isHideDefault ? "none" : "block",
      }}
    >
      <ErrorCatch
        app={componentConfig.name}
        user=""
        token=""
        max={1}
        errorRender={
          <RemoteComponentErrorRender
            errorComponent={componentConfig.name}
          ></RemoteComponentErrorRender>
        }
        onCatch={(errors) => {
          console.log("组件报错信息：", errors, "组件id", componentConfig.id);
        }}
      >
        <RemoteBaseComponent
          {...props}
          scale={scale}
          onClick={handleInteractiveClick}
          onMouseEnter={handleInteractiveMouseEnter}
          onMouseLeave={handleInteractiveMouseLeave}
          onChange={handleStatusChange} // 状态变化
          onDataChange={handleDataChange} // 当请求完成/数据变化
          dashboardId={previewDashboard.dashboardId}
          cRef={componentRef}
          isPreview={true}
        ></RemoteBaseComponent>
      </ErrorCatch>
    </div>
  );
};

export default connect(({ previewDashboard }) => ({ previewDashboard }))(ComponentEventContainer);
