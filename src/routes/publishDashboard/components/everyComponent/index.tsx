import { memo, useEffect, useState } from "react";
import "./index.less";
import { WEIZHICHICUN } from "./type";

import { getTargetStyle } from "./type";
import ComponentEventContainer from "@/routes/publishDashboard/components/componentEventContainer";
import { connect } from "dva";
// import RemoteBaseComponent from '@/components/RemoteBaseComponent';
import { getFields } from "@/utils/data";

// 按屏幕比例适配", value: "0"}
// 1: {name: "强制铺满", value: "1"}
// 2: {name: "原比例展示溢出滚动

const EveryComponent = ({
  componentData,
  comData,
  scaleValue,
  layerInfo,
  addDrillDownLevel,
  changeBreadcrumbData,
  publishDashboard,
  isDrillDownPanel,
  dispatch,
  stateId,
  ...props
}: any) => {
  const { moduleName, events, id, config } = componentData;
  const { mountAnimation } = layerInfo;
  const { delay, direction, duration, opacityOpen, timingFunction, type } = mountAnimation || {};

  // 将所有的组件配置(位置尺寸、默认隐藏、文本样式、对齐方式、阴影)整合进Map中
  const allConfigMap = new Map();
  config.forEach(({ displayName, value }: any) => {
    allConfigMap.set(displayName, value);
  });
  const weizhichicunArr = allConfigMap.get(WEIZHICHICUN);
  const componentStyle = getTargetStyle(weizhichicunArr, {
    position: "absolute",
  });
  // 交互-动画
  useEffect(() => {
    // 如果没有 设置“载入动画”, 那么后端不会返回mountAnimation字段
    if (mountAnimation) {
      const curCmpContainerEl: any = document.querySelector(`.animation-id-${id}`);
      const { clientWidth, clientHeight } = curCmpContainerEl;
      //*****  移入模式
      let translateDirection = "";
      // 移入模式 1、移入 2、小移入 区别就是动画开始时起始的位置不同
      // let moveDistance = type === 'slide' ? 3000 : +(pageWrapElInfo.left.toFixed(2))
      // 移入和划变不同,这个moveDistance可以写死
      const moveDistance = type === "slide" ? 3000 : 200;

      let startKeyframe: any = {};
      let endKeyframe: any = {};

      if (type === "slide" || type === "slideSmall") {
        //@tip: endKeyframe 需放在 switch() 上方
        endKeyframe = {
          transform: "translate(0,0)",
        };
        switch (direction) {
          // 从下至上
          case "up":
            translateDirection = `translate(0, ${moveDistance}px)`;
            break;
          // 从上至下
          case "down":
            translateDirection = `translate(0, -${moveDistance}px)`;
            break;
          // 从左至右
          case "left":
            translateDirection = `translate(-${moveDistance}px, 0)`;
            break;
          // 从右至左
          case "right":
            translateDirection = `translate(${moveDistance}px,0)`;
            break;
          // 左上->右下
          case "rightDown":
            translateDirection = `translate3d(-${moveDistance}px, -${moveDistance}px, 0)`;
            endKeyframe.transform = "translateZ(0)";
            break;
          // 右上 -> 左下
          case "leftDown":
            translateDirection = `translate3d(${moveDistance}px, -${moveDistance}px, 0)`;
            endKeyframe.transform = "translateZ(0)";
            break;
          // 左下 -> 右上
          case "rightUp":
            translateDirection = `translate3d(-${moveDistance}px, ${moveDistance}px, 0)`;
            endKeyframe.transform = "translateZ(0)";
            break;
          // 右下 -> 左上
          case "leftUp":
            translateDirection = `translate3d(${moveDistance}px, ${moveDistance}px, 0)`;
            endKeyframe.transform = "translateZ(0)";
            break;
        }
        startKeyframe = {
          transform: `${translateDirection}`,
        };
      }

      if (type === "wipe") {
        // 选 宽高中大的 作为边来构建 最终裁剪区域的正方形
        const squareWidth = clientWidth > clientHeight ? clientWidth : clientHeight;
        switch (direction) {
          // 从下至上
          case "up":
            startKeyframe = {
              clipPath: `polygon(0 ${squareWidth}px, ${squareWidth}px ${squareWidth}px, ${squareWidth}px ${squareWidth}px, 0 ${squareWidth}px)`,
            };
            break;
          // 从上至下
          case "down":
            // alert('down')
            startKeyframe = {
              clipPath: `polygon(0 0, ${squareWidth}px 0, ${squareWidth}px 0, 0 0)`,
            };
            break;
          // 从左至右
          case "left":
            startKeyframe = {
              clipPath: `polygon(0 0, 0 0, 0 ${squareWidth}px, 0 ${squareWidth}px)`,
            };
            break;
          // 从右至左
          case "right":
            startKeyframe = {
              clipPath: `polygon(${squareWidth}px 0, ${squareWidth}px 0, ${squareWidth}px ${squareWidth}px, ${squareWidth}px ${squareWidth}px)`,
            };
            break;
          // 左上->右下
          case "rightDown":
            startKeyframe = { clipPath: "polygon(0 0, 0 0, 0 0, 0 0)" };
            break;
          // 右上 -> 左下
          case "leftDown":
            startKeyframe = {
              clipPath: `polygon(${squareWidth}px 0, ${squareWidth}px 0, ${squareWidth}px 0, ${squareWidth}px 0)`,
            };
            break;
          // 左下 -> 右上
          case "rightUp":
            startKeyframe = {
              clipPath: `polygon(0 ${squareWidth}px, 0 ${squareWidth}px, 0 ${squareWidth}px, 0 ${squareWidth}px)`,
            };
            break;
          // 右下 -> 左上
          case "leftUp":
            startKeyframe = {
              clipPath: `polygon(${squareWidth}px ${squareWidth}px,${squareWidth}px ${squareWidth}px,${squareWidth}px ${squareWidth}px,${squareWidth}px ${squareWidth}px)`,
            };
            break;
        }
        endKeyframe = {
          clipPath: `polygon(0 0, ${squareWidth}px 0, ${squareWidth}px ${squareWidth}px, 0 ${squareWidth}px)`,
        };
      }

      // 页面渲染完成之时,组件也会一同挂载到页面中,但此时动画还未开始,所以要让组件不可见(为了营造组件是在用户设定的延迟时间后进入页面的错觉)
      curCmpContainerEl.style.opacity = 0;
      // 如果有选择了 “渐隐渐显” 就加上透明度
      let timeoutId: any = null;
      if (opacityOpen) {
        startKeyframe.opacity = 0;
        endKeyframe.opacity = 1;
      } else {
        // 没有选择 “渐隐渐显”, 需要手动在延迟时间后把组件显现出来, 否则组件就一直是透明的状态
        timeoutId = setTimeout(() => (curCmpContainerEl.style.opacity = 1), delay);
      }
      // 最终应用的动画
      curCmpContainerEl.animate([startKeyframe, endKeyframe], {
        duration: duration,
        delay: delay,
        fill: "both",
        easing: timingFunction,
        // easing: 'steps(8, end)',
        iterations: 1,
      });
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, []);
  //@Mark (状态A -> 状态B)点击状态A中某个组件下钻到状态B的时候，只需要在状态B中渲染点击组件的下一层级的组件，并保留当前状态(A)中存在的所有组件id；点击面包屑返回上一级状态(A)时需要根据上一次下钻时保存的组件id来决定渲染哪些组件至状态A中
  const [isRenderWhileDrill, setIsRenderWhileDrill] = useState(true);
  const [isRenderWhileBack, setIsRenderWhileBack] = useState(true);
  useEffect(() => {
    //@Prevent Bug: 这里应该只对下钻面板中的组件做处理，否则在大屏中任意一个下钻面板下钻的时候，其它的除该面板之外的组件会被屏蔽
    if (isDrillDownPanel) {
      const targetIdArr = publishDashboard.drillDownComponentIdForCurClickComponent;
      const tempObj = publishDashboard.willSaveComponentInEveryDrillDownState;
      if (targetIdArr.length) {
        const temp = targetIdArr.includes(id);
        setIsRenderWhileDrill(temp);
        if (temp) {
          tempObj[stateId] = [];
          tempObj[stateId].push(id);

          dispatch({
            type: "publishDashboard/save",
            payload: {
              willSaveComponentInEveryDrillDownState: tempObj,
            },
          });
        }
        const preRenderCompInCurState = tempObj[stateId];
        if (preRenderCompInCurState) {
          const tempRes = preRenderCompInCurState.includes(id);
          setIsRenderWhileBack(tempRes);
        }
      } else {
        const preRenderCompInCurState = tempObj[stateId];
        if (preRenderCompInCurState) {
          const tempRes = preRenderCompInCurState.includes(id);
          setIsRenderWhileBack(tempRes);
        } else {
          setIsRenderWhileBack(true);
        }
        setIsRenderWhileDrill(true);
      }
    }
  }, [publishDashboard.drillDownComponentIdForCurClickComponent]);

  const getDrillDownData = (chartData: any) => {
    if (addDrillDownLevel) {
      addDrillDownLevel();
      changeBreadcrumbData(chartData);
    }
  };
  return (
    <>
      {isRenderWhileDrill && isRenderWhileBack ? (
        <div className={"preview-component-wrap"}>
          <ComponentEventContainer
            {...props}
            componentStyle={componentStyle}
            key={id}
            id={id}
            events={events}
            version={"1.0.0"}
            scale={scaleValue}
            name={moduleName}
            componentConfig={componentData}
            fields={getFields(componentData)}
            // comData={moduleData}
            comData={comData}
            getDrillDownData={getDrillDownData}
          ></ComponentEventContainer>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default memo(connect(({ publishDashboard }: any) => ({ publishDashboard }))(EveryComponent));
