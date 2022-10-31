import { memo, useEffect, useState } from "react";
import "./index.less";
import { mergeSameAndAddDiff } from "./methods/mergeModuleConfig";

import { connect } from "dva";
import { http } from "@/services/request";

import { Drawer, Button, Card, Checkbox, Empty } from "antd";

import ListItem from "./components/listItem";
import { deepClone } from "@/utils/index";
import importComponent from "./methods/fetchComponentJsFile";



const ModuleUpdate = (props: any) => {
  const { bar, onChange, visible, dispatch } = props;

  const [updatableModuleLists, setUpdatableModuleLists] = useState<any>([]);
  const [selectedLists, setSelectedLists] = useState<any>([]);
  const [updateBtnLoading, setUpdateBtnLoading] = useState<boolean>(false);
  const [moduleNameToConfigMap, setModuleNameToConfigMap] = useState<Record<string, any>>(new Map());
  const [componentsCopy, setComponentsCopy] = useState<any>([]);


  useEffect(() => {
    if (visible) {
      const componentsCopy = deepClone(bar.fullAmountComponents);
      setComponentsCopy(componentsCopy);
    }
  }, [visible]);

  // 获取所有原子组件的完整信息，并从中抽取出 moduleName 和 config组成一个map
  useEffect(() => {
    const toolMap = new Map<string, any>();
    if (visible) {
      const allNativeModules = bar.moduleDefaultConfig;
      allNativeModules.forEach((item: any) => {
        const { moduleName, config } = item;
        toolMap.set(moduleName, config);
      });
      setModuleNameToConfigMap(toolMap);
      getUpdatableModules();
    }
  }, [visible]);
  // 获取可更新的组件列表
  const getUpdatableModules = async () => {
    const data = await http({
      url: "/visual/module/queryCanUpdateModuleList",
      method: "get",
      params: {
        screenId: bar.dashboardId,
      },
    });
    const addCheckStateArr = data.map((item: any) => {
      return {
        ...item,
        checked: false,
      };
    });
    setUpdatableModuleLists(addCheckStateArr);
  };
  // 升级所选中的组件
  const updateSelectedModules = async () => {
    // 从bar.fullAmountComponents的副本中拿到当前画布中所有组件的<原始config>并用其id组成映射
    const id2configReflect: any = {};
    componentsCopy.forEach(({ id, config }: any) => {
      id2configReflect[id] = config;
    });
    // 根据id拿到选中的要更新的组件的老版本config，
    const oldComponentConfig: any = [];
    selectedLists.forEach(({ id }: any) => {
      const targetItem = id2configReflect[id];
      oldComponentConfig.push(targetItem);
    });
    // 遍历 本次所选中的待更新组件，依次添加config
    const hasNewConfigArr = selectedLists.map((item: any, index: any) => {
      const { moduleLastVersion, ...targetOptions } = item;
      targetOptions.moduleVersion = moduleLastVersion;
      // 拿到组件新版本的config
      const newModuleConfig = moduleNameToConfigMap.get(item.moduleName);
      // 拿到组件旧版本的config
      const oldModuleConfig = oldComponentConfig[index];
      targetOptions.config = mergeSameAndAddDiff(oldModuleConfig, newModuleConfig);
      return targetOptions;
    });
    const dashboardId = bar.dashboardId;
    setUpdateBtnLoading(true);
    const data = await http({
      url: "/visual/module/update",
      method: "post",
      body: {
        configs: hasNewConfigArr,
        dashboardId,
      },
    }).catch((err: Error) => { console.log("组件更新接口错误", err); });
    if (data) {
      // 刷新可更新组件列表
      getUpdatableModules();
      // 重置复选框等状态
      setSelectedLists([]);
      // 重新请求最新版本组件的 js 文件
      selectedLists.forEach(async (item: any) => {
        window.eval(`${await importComponent(item)}`);
        const { ComponentDefaultConfig } = (window as any).VComponents;
        // const currentDefaultConfig = ComponentDefaultConfig
        const index = bar.fullAmountComponents.findIndex((x: any) => x.id === item.id);
        bar.fullAmountComponents.splice(index, 1, { ...ComponentDefaultConfig, id: item.id });
      }
      );
    }
    // alert('batch update')
    dispatch({
      type: "bar/save"
    });
    // 刷新组件中的画布
    dispatch({
      type: "bar/getDashboardDetails",
      payload: bar.dashboardId
    });
    setUpdateBtnLoading(false);
  };
  const onCheckAllChange = (e: any) => {
    const isCheckAll = e.target.checked;
    if (isCheckAll) {
      // 将所有的项 都选中
      const checkedToTrue = updatableModuleLists.map((item: any) => {
        return { ...item, checked: true };
      });
      setUpdatableModuleLists(checkedToTrue);
      const noCheckedArr = updatableModuleLists.map((item: any) => {
        // @Mark 要剔除掉前端添加的checked属性，所以只能注释一下@typescript-eslint/no-unused-vars
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { checked, ...other } = item;
        return other;
      });
      setSelectedLists(noCheckedArr);
    } else {
      // 将所有的项 都取消选中
      const checkedToTrue = updatableModuleLists.map((item: any) => {
        return { ...item, checked: false };
      });
      setUpdatableModuleLists(checkedToTrue);
      setSelectedLists([]);
    }
  };
  const clickSingleCheckbox = (itemObj: any) => {
    const isCheck = itemObj.checked;
    // setIndeterminate()
    if (isCheck) {
      // @Mark 要剔除掉前端添加的checked属性，所以只能注释一下@typescript-eslint/no-unused-vars
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { checked, ...noCheckObj } = itemObj;
      setSelectedLists([...selectedLists, noCheckObj]);
    } else {
      // 从已选中组件 数组中移除该项
      const { id } = itemObj;
      const newArr = selectedLists.filter((x: any) => x.id !== id);
      setSelectedLists(newArr);
    }
  };
  const onclose = () => {
    onChange(false);
    // 关闭 抽屉时，需要将已选择的数组清空
    setSelectedLists([]);
    // 关闭 抽屉，也需要清除掉可选组件列表，不然上一次关闭时复选框选中的状态会闪现出来
    setUpdatableModuleLists([]);
  };

  return (
    <div className="module-update-wrap">
      <Drawer
        width={333}
        title={
          <div className="g-relative g-text-base g-px-2 g-flex g-justify-between g-items-center">
            组件更新
          </div>
        }
        placement="right"
        closable={false}
        visible={visible}
        className="data-container-drawer"
        getContainer={false}
        onClose={() => onclose()}
        style={{ position: "absolute" }}
        maskStyle={{ animation: "unset" }}
      >
        <div className="card-wrap">
          <Card
            title={
              <div className="card-title g-flex g-justify-between">
                <Checkbox
                  indeterminate={
                    selectedLists.length &&
                    selectedLists.length !== updatableModuleLists.length
                  }
                  onChange={onCheckAllChange}
                  checked={
                    selectedLists.length &&
                    updatableModuleLists.length &&
                    selectedLists.length === updatableModuleLists.length
                  }
                >
                  可更新组件({selectedLists.length}/
                  {updatableModuleLists.length})
                </Checkbox>
                <Button
                  type="primary"
                  size="small"
                  loading={updateBtnLoading}
                  disabled={selectedLists.length === 0}
                  onClick={() => updateSelectedModules()}
                >
                  更新
                </Button>
              </div>
            }
            size="small"
            headStyle={{ background: "#333641" }}
            bodyStyle={{
              background: "#171b24",
              minHeight: "165px",
              padding: 0,
            }}
          >
            <div className="card-body">
              {updatableModuleLists.length ? (
                updatableModuleLists.map((item: any) => {
                  return (
                    <ListItem
                      itemData={item}
                      clickCheckbox={clickSingleCheckbox}
                    ></ListItem>
                  );
                })
              ) : (
                <>
                  <Empty
                    description="没有可更新的组件…"
                    imageStyle={{ marginTop: "15px" }}
                  ></Empty>
                </>
              )}
            </div>
          </Card>
        </div>
      </Drawer>
    </div>
  );
};

export default memo(connect(({ bar }: any) => ({ bar }))(ModuleUpdate));
