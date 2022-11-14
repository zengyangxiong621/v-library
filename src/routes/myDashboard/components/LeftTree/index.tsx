import { memo, useEffect } from "react";
import "./index.less";
import { connect } from "dva";

import Node from "../node/index";

import { Tree } from "antd";
import { DownOutlined } from "@ant-design/icons";

// 全部应用 和 未分组两项应该固定
// 后面自定义的组， 应该可以支持拖拽并且 选中右边任意一个card的拖拽图标的时候树这边的这些组应该处于被框选状态

const LeftTree = ({ dashboardManage, dispatch, clearSearchInputState, spaceId }: any) => {
  // 获取应用分组列表
  useEffect(() => {
    refreshGroupLists();
  }, [spaceId]);

  /**
   * description:  刷新左侧列表
   */
  const refreshGroupLists = () => {
    dispatch({
      type: "dashboardManage/getGroupTree",
      payload: {
        spaceId,
      },
    });
  };
  /**
   * description:  刷新右侧
   */
  const refreshRight = () => {
    const finalBody = {
      pageNo: 1,
      pageSize: 1000,
      spaceId,
      groupId: null,
    };
    dispatch({
      type: "dashboardManage/getTemplateList",
      payload: finalBody,
    });
    dispatch({
      type: "dashboardManage/resetModel",
      payload: {
        curSelectedGroup: ["-1"],
        curSelectedGroupName: "全部应用",
      },
    });
  };
  // 添加分组
  // 创建一个占位数据
  const addGroup = () => {
    const mockItem: any = {
      groupId: "aInput",
      name: "占位的input",
    };
    // 插入的输入框是在数组的倒数第二个位置
    const origin = dashboardManage.groupList[0].children;
    if (origin[origin.length - 2].groupId === "aInput") {
      dashboardManage.groupList[0].children.splice(-2, 1);
      const temp = JSON.parse(JSON.stringify(dashboardManage.groupList));
      dispatch({
        type: "dashboardManage/setGroupList",
        payload: temp,
      });
      return;
    }
    // 增加一个占位数据
    dashboardManage.groupList[0].children.splice(-1, 0, mockItem);
    const temp = JSON.parse(JSON.stringify(dashboardManage.groupList));
    dispatch({
      type: "dashboardManage/setGroupList",
      payload: temp,
    });
  };

  const selectTreeNode = (keys: any, e: any) => {
    // 如果是取消选择直接中止
    if (!e.selected) return;
    const { node } = e;
    if (
      node.key === "aInput" ||
      node.key === "wrap" ||
      node.name === "占位的input" ||
      node.name === "应用列表"
    ) {
      return;
    }
    dispatch({
      type: "dashboardManage/setCurSelectedGroupName",
      payload: node.name,
    });
    // 应用列表作为分组树的最外层,后端数据中不存在，由前端构造的特殊id(wrap)
    const key = keys[0];
    // 每次切换分组，都要将搜索框内的值清除掉
    clearSearchInputState();
    // 全部分组后端的数据里是-1, 但是要求传值时为Null
    const groupId = key === "-1" ? null : key;
    const finalBody = {
      pageNo: 1,
      pageSize: 1000,
      spaceId,
      groupId,
    };
    dispatch({
      type: "dashboardManage/getTemplateList",
      payload: finalBody,
    });
    // 每次变更选中的分组时，将当前分组保存至models中
    dispatch({
      type: "dashboardManage/setCurSelectedGroup",
      payload: keys,
    });
  };
  return (
    <div className="dashboard-leftTree-wrap">
      {dashboardManage.groupList.length > 0 && (
        <Tree
          className="my-dashboard-tree"
          blockNode
          defaultExpandedKeys={["wrap"]}
          defaultSelectedKeys={["-1"]}
          selectedKeys={dashboardManage.curSelectedGroup}
          treeData={dashboardManage.groupList}
          switcherIcon={<DownOutlined />}
          fieldNames={{
            title: "name",
            key: "groupId",
          }}
          onSelect={selectTreeNode}
          titleRender={(nodeData: any) => (
            <Node
              refreshGroupLists={refreshGroupLists}
              refreshRight={refreshRight}
              addGroup={addGroup}
              spaceId={spaceId}
              {...nodeData}
            ></Node>
          )}
        ></Tree>
      )}
    </div>
  );
};

export default memo(connect(({ dashboardManage }: any) => ({ dashboardManage }))(LeftTree));
