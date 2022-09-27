 import { memo, useEffect, useState } from "react";
import "./index.less";
import { SYSTEMMATERIAL, MYMATERIAL, MATERIALLIB } from "@/constant/dvaModels/resourceCenter";

import { connect } from "dva";

import Node from "../node/index";

import { Tree } from "antd";
import { DownOutlined } from "@ant-design/icons";

// 全部应用 和 未分组两项应该固定
// 后面自定义的组， 应该可以支持拖拽并且 选中右边任意一个card的拖拽图标的时候树这边的这些组应该处于被框选状态

const LeftTree = ({ resourceCenter, dispatch, clearSearchInputState,getDataDispatch,refreshGroupLists,spaceId }: any) => {
  const [currentAdd, setCurrentAdd] = useState("");
  // 添加分组
  // 创建一个占位数据
  const addGroup = (groupId: string, parentId = "") => {
    setCurrentAdd(groupId);
    const mockItem: any = {
      groupId: "aInput",
      name: "占位的input"
    };
    // 以素材库为例， ↓ === '素材库'
    const parentObj = resourceCenter.groupList.find((item: any) => item.groupId === parentId);
    // ↓ === '我的素材'
    const originArr = parentObj?.children.find((item: any) => item.groupId === groupId);
    // ↓ === 我的素材下的所有组
    const targetGroups = originArr.children;
    // 插入的输入框是在数组的倒数第二个位置(未分组上一个)
    if (targetGroups[targetGroups.length - 2].groupId === "aInput") {
      originArr.children.splice(-2,1);
      const temp = JSON.parse(JSON.stringify(resourceCenter.groupList));
      dispatch({
        type: "resourceCenter/setGroupList",
        payload: temp
      });
      return;
    }
    // 增加一个占位数据
    targetGroups.splice(-1, 0, mockItem);
    const temp = JSON.parse(JSON.stringify(resourceCenter.groupList));
    dispatch({
      type: "resourceCenter/setGroupList",
      payload: temp
    });
  };

  const selectTreeNode = (keys: any, e: any) => {
    // 如果是取消选择直接中止
    if (!e.selected) return;
    const { node } = e;
    const isCreateByOurself = node.customLevel === 1 || node.customLevel === 2;
    if (
      node.key === "aInput" ||
      node.name === "占位的input" ||
      isCreateByOurself
    ) {
      return;
    }
    dispatch({
      type: "resourceCenter/setCurSelectedGroupName",
      payload: node.name
    });
    // 应用列表作为分组树的最外层,后端数据中不存在，由前端构造的特殊id(wrap)
    const key = keys[0];
    // 每次切换分组，都要将搜索框内的值清除掉
    clearSearchInputState(); 
    // 每次变更选中的分组时，将当前分组保存至models中
    dispatch({
      type: "resourceCenter/setCurSelectedGroup",
      payload: node
    });
    getDataDispatch({
      origin: node.origin,
      groupId: key
    });

  };
  return (
    <div className="every-tree-wrap">
      {resourceCenter.groupList.length > 0 && (
        <Tree
          className="my-dashboard-tree"
          blockNode
          defaultExpandAll
          selectedKeys={[resourceCenter.curSelectedGroup.groupId]}
          treeData={resourceCenter.groupList}
          switcherIcon={<DownOutlined />}
          fieldNames={{
            title: "name",
            key: "groupId"
          }}
          onSelect={selectTreeNode}
          titleRender={(nodeData: any) => (
            <Node
              refreshGroupLists={refreshGroupLists}
              currentAdd={currentAdd}
              spaceId={spaceId}
              addGroup={addGroup}
              {...nodeData}
            ></Node>
          )}
        ></Tree>
      )}
    </div>
  );
};

export default memo(
  connect(({ resourceCenter }: any) => ({ resourceCenter }))(LeftTree)
);
