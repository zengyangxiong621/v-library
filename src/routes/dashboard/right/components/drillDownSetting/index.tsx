/* eslint-disable react/react-in-jsx-scope */
import { memo, useEffect, useState } from "react";
import "./index.less";

import { connect } from "dva";
import { http } from "@/services/request";

import { TreeSelect } from "antd";
import { useSetState } from "ahooks";

import CodeEditor from "../codeEditor";

const DrillDownSetting = ({ bar, drillDownGlobalState, dispatch, componentConfig }: any) => {
  const { panelStatesList, stateId } = bar;
  const { id, name } = componentConfig;
  const [state, setState] = useSetState({
    layersInNextState: [],
    parentDataSample: null, // 父级组件的结构示例
    isLastState: false, // 最后一个状态不用选择下层组件
  });
  // 已选中的组件
  const [echoDrillDownComponents, setEchoDrillDownComponents] = useState([]);

  // 选取下一个状态中的组件并放入下钻组件列表
  useEffect(() => {
    try {
      const curStateIndex = panelStatesList.findIndex((x: any) => x.id === stateId);
      const nextStateIndex = curStateIndex + 1;
      if (nextStateIndex > panelStatesList.length - 1) {
        setState({
          layersInNextState: [],
          isLastState: true,
        });
      } else {
        const { id: nextStateId } = panelStatesList[nextStateIndex];
        const getLayersInPanelState = async () => {
          const { layers } = await http({
            url: `/visual/application/dashboard/detail/${nextStateId}`,
            method: "get",
          });
          const formatterLayers = layers.map((item: any) => ({
            id: item.id,
            name: item.name,
          }));
          setState({
            layersInNextState: formatterLayers,
          });
        };
        getLayersInPanelState();
      }
    } catch (err) {
      console.log("err", err);
    }
    showHadSelectComp();
    showParentDataSample();
  }, []);

  const localStorageCopy: any = localStorage;
  let finalCompData = componentConfig.staticData.data;
  if (componentConfig.dataFrom == 1) {
    const dataContainerIds = componentConfig.dataContainers.map((x: any) => x.id);
    const dataFromDataContainer = bar.dataContainerDataList.filter((item: any) =>
      dataContainerIds.includes(item.id)
    );
    finalCompData = dataFromDataContainer
      .map((o: any) => {
        return o.data;
      })
      .flat();
  }
  // console.log('finalCompDatafinalCompData', finalCompData);
  // console.log('barbar', bar);
  // console.log('当前组件数据', componentConfig)

  const showHadSelectComp = () => {
    // 之前已经选中了的组件
    let hadSelectComp: any = [];
    const temp: any = {};
    if (Array.isArray(componentConfig.drillDownArr)) {
      hadSelectComp = componentConfig.drillDownArr.map((item: any) => item.id);
      componentConfig.drillDownArr.forEach((item: any) => {
        const o = {
          parentId: id,
          parentData: item.parentData,
        };
        temp[item.id] = o;
      });
    }
    setEchoDrillDownComponents(hadSelectComp);
    // 进入下钻面板后，需要根据已经选择的组件将相关组件信息存放至localStorage中
    const originReflect = JSON.parse(localStorageCopy.getItem("allHasParentReflect"));
    const finalReflect = {
      ...originReflect,
      ...temp,
    };
    localStorageCopy.setItem("allHasParentReflect", JSON.stringify(finalReflect));
  };

  const showParentDataSample = () => {
    try {
      const allParentComps = JSON.parse(localStorageCopy.getItem("allHasParentReflect"));
      if (allParentComps) {
        const targetParentComp = allParentComps[id];
        const parentDataSample = targetParentComp?.parentData[0];
        setState({
          parentDataSample: parentDataSample,
        });
      }
    } catch (error) {
      console.log("err", error);
    }
  };

  // 添加下钻组件
  const selectNextLevelComponent = (val: any, label: any, extra: any) => {
    setEchoDrillDownComponents(val);
    const extendVal = val.map((item: string, index: number) => {
      return {
        id: item,
        name: label[index],
        parentData: finalCompData,
        // parent:
      };
    });
    componentConfig.drillDownArr = extendVal;

    // 添加了下钻组件的同时需要将这两个组件的映射保存起来
    const allDrillDownPathReflect = JSON.parse(localStorageCopy.getItem("allDrillDownPathReflect"));
    if (!allDrillDownPathReflect) {
      localStorageCopy.setItem("allDrillDownPathReflect", JSON.stringify({ [id]: extendVal }));
    } else {
      const temp = {
        ...allDrillDownPathReflect,
        [id]: extendVal,
      };
      localStorageCopy.setItem("allDrillDownPathReflect", JSON.stringify(temp));
    }
    // 当前被作为下钻组件的组件应当被放入“有父组件”的组件集合中
    const curComps: any = {};
    val.forEach((valId: string) => {
      curComps[valId] = {
        parentData: finalCompData,
        parentId: id,
      };
    });
    const preAllHasParentReflect = JSON.parse(localStorageCopy.getItem("allHasParentReflect"));
    const finalReflect = {
      ...curComps,
      ...preAllHasParentReflect,
    };
    localStorageCopy.setItem("allHasParentReflect", JSON.stringify(finalReflect));

    // 需要改变 全局状态中的 componentConfig, 不然其它触发module/update接口时(比如移动一下组件),会覆盖这个带有drillDownArr的componentConfig
    console.log("cccccccccccc", componentConfig);
    dispatch({
      type: "bar/setComponentConfig",
      payload: componentConfig,
    });
    // 更改后端存储的 componentConfig
    http({
      url: "/visual/module/update",
      method: "post",
      body: {
        dashboardId: bar.dashboardId,
        // dashboardId: bar.stateId,
        configs: [componentConfig],
      },
    });
  };

  const resultData = Object.assign(
    {},
    {
      value: JSON.stringify([state.parentDataSample], null, 2),
    }
  );

  return (
    <div className="DrillDownSetting-wrap">
      {/* {state.parentDataSample && (
        <>
          <div className="tip-text">父级数据示例：</div>
          <div className="data-code-wraper">
            <CodeEditor
              data={resultData}
              onChange={() => {
                // todo
              }}
            />
          </div>
        </>
      )} */}
      {!state.isLastState && (
        <div className="level">
          <div className="level-title">下层组件：</div>
          <div className="treeSelect-wrap">
            <TreeSelect
              treeData={state.layersInNextState}
              fieldNames={{ label: "name", value: "id", children: "children" }}
              onChange={selectNextLevelComponent}
              treeCheckable={true}
              showCheckedStrategy={TreeSelect.SHOW_PARENT}
              // value={state.layersInNextState[0]}
              value={echoDrillDownComponents}
              style={{ width: "100%" }}
              dropdownClassName="action-select"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(
  connect(({ bar, drillDownGlobalState }: any) => ({ bar, drillDownGlobalState }))(DrillDownSetting)
);
