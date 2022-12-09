/* eslint-disable react/prop-types */
/* eslint-disable no-case-declarations */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useCallback } from "react";
import "./index.less";
import { connect } from "dva";

/** 组件库相关 **/
import { Tree } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { IconFont } from "../../../utils/useIcon";
import { useKeyPress } from "ahooks";

/** 自定义组件 **/
import EveryTreeNode from "./components/everyTreeNode";
import ToolBar from "./components/toolBar";
// import RightClickMenu from "./components/rightClickMenu/rightClickMenu";

/** 数据 || 方法 */
// import { getTargetMenu } from "./components/rightClickMenu/getMenuNode";
import { getFieldStates } from "../../../utils/sideBar";
// import { filterEmptyGroups } from "../../../models/utils/filterEmptyGroups";

const Left = ({ dispatch, bar }) => {
  //通过右键菜单的配置项生成antD dropDown组件所需要的menu配置

  const [isExpand, setIsExpand] = useState([]);
  const [selected, setSelected] = useState([]);
  const activeIconRef = useRef();
  const [isCtrlKeyPressing, setIsCtrlKeyPressing] = useState(false);
  // const [customMenuOptions, setCustomMenuOptions] = useState(menuOptions);
  const treeRef = useRef(null);
  const topBarRef = useRef(null);
  const bottomBarRef = useRef(null);
  const headerRef = useRef(null);
  const [single, setSingle] = useState(true);
  const [toggleValue, setToggleValue] = useState(false);
  useKeyPress(
    ["ctrl", "shift"],
    (event) => {
      // eslint-disable-next-line no-empty
      if (event.type === "keydown" && bar.isMultipleTree) {
      } else {
        dispatch({
          type: "bar/save",
          payload: {
            isMultipleTree: event.type === "keydown",
          },
        });
        setIsCtrlKeyPressing(event.type === "keydown");
      }
    },
    {
      events: ["keydown", "keyup"],
    }
  );

  /**
   * 方法
   * */
  // 收起 / 展开 菜单栏
  const [w, setW] = useState(188);
  const toggle = () => {
    setToggleValue(!toggleValue);
    const el = document.querySelector(".left-menu");
    w === 188 ? setW(250) : setW(188);
    el.style.width = `${w}px`;
    dispatch({
      type: "bar/save",
      payload: {
        leftMenuWidth: w,
      },
    });
  };
  // 获取点击的icon
  const getActiveIcon = (icon) => {
    let finalPayload = {
      dashboardId: bar.dashboardId,
    };
    switch (icon) {
      case "lock":
        const everyNodeLockState = getFieldStates(bar.layers, bar.key, "isLock");
        const finalBody = bar.key.map((item, index) => ({
          id: item,
          key: "isLock",
          value: !everyNodeLockState[index],
        }));
        finalPayload.configs = finalBody;
        break;
      case "copy":
        finalPayload = {
          dashboardId: bar.dashboardId,
          children: [],
          targetDashboardId: bar.dashboardId,
          insertId: bar.key[0],
          originLayers: bar.layers,
          //TODO 改为modules后删除掉这行
          components: [...bar.key],
          // components: [...bar.key],
          panels: [],
          selected: [...bar.key],
        };
        break;
      case "singleShowLayer":
        finalPayload.keys = bar.key;
        finalPayload.singleShowLayer = single;
        setSingle(!single);
        break;
      // case 'singleShowLayer':
      //   finalPayload.singleShowLayer = 'negation'
      //   break
      case "delete":
        const l = bar.key?.map((item) => ({
          id: item,
          children: [],
        }));
        finalPayload.layers = l;
        break;
      default:
        break;
    }
    activeIconRef.current = icon;
    dispatch({
      type: `bar/${icon}`,
      payload: finalPayload,
    });
  };
  //选择的树节点
  const onSelect = (curKey, e) => {
    let temp = curKey;
    const isSelected = e.selected;
    const { key } = e.node;
    let selectedNodes = e.selectedNodes;
    if (!e.nativeEvent.ctrlKey) {
      dispatch({
        type: "bar/save",
        payload: {
          isMultipleTree: false,
        },
      });
      setIsCtrlKeyPressing(false);
      temp = [key];
      selectedNodes = [e.node];
    }
    // 当右键菜单显示时，如果用左键某个图层或者分组，需要隐藏右键菜单
    dispatch({
      type: "bar/setIsShowRightMenu",
      payload: false,
    });
    // 多选情况下，点击那个剩哪个
    if (isSelected) {
      dispatch({
        type: "bar/save",
        payload: {
          key: temp,
        },
      });
    } else {
      // 多选情况下，按住ctrl键时，应该是取消选中所点击的那项
      //           没有按住ctrl键时，应该只保留所点击的那项
      isCtrlKeyPressing ? (temp = curKey) : (temp = [key]);
      setSelected(temp);
      dispatch({
        type: "bar/save",
        payload: {
          key: temp,
        },
      });
    }
    // debugger;
    dispatch({
      type: "bar/selectLayers",
      payload: selectedNodes,
    });
  };
  // 响应右键点击
  const onRightClick = ({ event, node }) => {
    event.stopPropagation();
    event.preventDefault();
    const { key } = node;
    // dispatch({
    //   type: 'bar/save',
    //   payload: { isMultipleTree: true },
    // })
    // 如果有选中了的节点 并且 此次右击的目标是其中一个，则展开菜单，
    // 否则，重置已选中节点 并 单选中当前节点以及展开右键菜单
    let t = [];
    if (selected.length && selected.includes(key)) {
      t = selected;
      // })
    } else {
      t = [key];
    }
    setSelected(t);
    dispatch({
      type: "bar/save",
      payload: {
        key: t,
      },
    });
    // 确认分组时点击的是哪个节点
    dispatch({
      type: "bar/saveLastRightClickKey",
      payload: key,
    });
    dispatch({
      type: "bar/save",
      payload: { isMultipleTree: event.nativeEvent.ctrlKey || event.nativeEvent.shiftKey },
    });
  };
  // 图层拖拽逻辑
  const onDrop = (info) => {
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split("-");
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data, key, callback) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === key) {
          return callback(data[i], i, data);
        }
        if (data[i].modules) {
          loop(data[i].modules, key, callback);
        }
      }
    };
    const data = [...bar.layers];
    const setLayerToTop = (data, key, callback) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === key) {
          return callback(data[i].modules, i);
        }
        if (data[i].modules) {
          setLayerToTop(data[i].modules, key, callback);
        }
      }
    };
    const setLayerToParentLevel = (data, dropKey, callback) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === dropKey) {
          return callback(data, i);
        }
        if (data[i].modules) {
          setLayerToTop(data[i].modules, dropKey, callback);
        }
      }
    };
    // if (!info.dropToGap) {
    //   loop(data, dropKey, (item, index) => {
    //     console.log("树data", data);
    //     console.log("dropKey", dropKey);
    //     console.log("item+++++++++++++++", item);
    //   });
    // }
    let dragObj;
    if ((info.node.modules || []).length > 0 && info.node.props.expanded) {
      loop(data, dragKey, (item, index, arr) => {
        arr.splice(index, 1);
        dragObj = item;
      });
      if (dropPosition === -1) {
        setLayerToParentLevel(data, dropKey, (dropKeyParentArr) => {
          dropKeyParentArr.unshift(dragObj);
        });
      } else {
        setLayerToTop(data, dropKey, (item) => {
          // item.splice(index, 0, dragObj);
          item.unshift(dragObj);
        });
      }
    } else {
      loop(data, dragKey, (item, index, arr) => {
        arr.splice(index, 1);
        dragObj = item;
      });
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }
    dispatch({
      type: "bar/update",
      payload: data,
    });
  };

  // 获取子组件传过来的X，Y值
  const getCurrentMenuLocation = useCallback((menuInfo, layer) => {
    dispatch({
      type: "bar/save",
      payload: {
        rightMenuInfo: menuInfo,
        isShowRightMenu: true,
        key: [menuInfo.id],
        selectedComponentOrGroup: [layer],
      },
    });
    dispatch({
      type: "bar/calcDragScaleData",
    });
  });

  /** 画布中选择组件，左侧展开  */
  const [preSelected, setPreSelected] = useState([]);
  const [expandedKeys, setE] = useState([]);

  useEffect(() => {
    // 这个setSelected和 在画布中选中组件，左侧分组展开没有逻辑联系，单独的是
    setSelected(bar.key);
    preSelected.push(...bar.key);
    // 把选中的 “组” 图层给过滤掉
    const filterGroupsPreSelected = preSelected.filter((id) => !id.startsWith("group"));
    // 将重复选中的图层过滤一遍
    const preSelectedSet = new Set(filterGroupsPreSelected);
    // 保存本次已经选中的图层
    setPreSelected([...preSelectedSet]);
    setE([...preSelectedSet, ...bar.key]);
  }, [bar.key]);

  //******** 展开 / 收起 ********* */
  const onExpand = (keys, { expanded, node }) => {
    const { modules } = node;
    // 收起
    if (!expanded) {
      const allIds = [];
      const getAllIdByPath = (arr) => {
        for (let i = 0, len = arr.length; i < len; i++) {
          const itemId = arr[i].id;
          // 组id 就不添加了，防止最终allIds数组的长度过大导致下方循环耗时过长
          if (!itemId.startsWith("group")) {
            allIds.push(arr[i].id);
          }
          if (arr[i].modules) {
            getAllIdByPath(arr[i].modules);
          }
        }
      };
      getAllIdByPath(modules);
      const finalNeedExpandKeys = preSelected.filter((id) => !allIds.includes(id));
      setPreSelected(finalNeedExpandKeys);
      setE(finalNeedExpandKeys);
      return;
    }
    setE(keys);
    setIsExpand(keys);
  };

  // const treeLayerHoverFunc = (item) => {
  //   item.style.backgroundColor = "red";
  // };
  /*  useEffect(() => {
    console.log('expandedKeys', expandedKeys)
    setTimeout(() => {
      [...document.querySelectorAll('.ant-tree .ant-tree-list .ant-tree-treenode')].forEach(item => {
        item.addEventListener('mouseover', (e) => treeLayerHoverFunc(item))
      })
    })
    return () => {
      [...document.querySelectorAll('.ant-tree .ant-tree-list .ant-tree-treenode')].forEach(item => {
        item.removeEventListener('mouseover', (e) => treeLayerHoverFunc(item))
      })
      return () => {
        [...document.querySelectorAll('.ant-tree .ant-tree-list .ant-tree-treenode')].forEach(item => {
          item.removeEventListener('mouseover', (e) => treeLayerHoverFunc(item))
        })
      }
    }, [bar.layers, expandedKeys])*/

  return (
    <div className="left-menu">
      <div className="left-wrap">
        <div className="left-tree-header" ref={headerRef}>
          <header className="header-text">图层</header>
          <IconFont
            type="icon-tucengshouqi"
            onClickCapture={() => toggle()}
            style={{
              cursor: "pointer",
              transition: "all 0.3s",
              transformOrigin: "50% 50%",
              transform: `rotate(${toggleValue ? 180 : 0}deg)`,
            }}
          />
        </div>
        <div className="left-wrap-toolbar" ref={topBarRef}>
          <ToolBar data={topBarIcons} iconSize="12px" getActiveIcon={getActiveIcon}></ToolBar>
        </div>
        <div className="left-wrap-tree" ref={treeRef}>
          <Tree
            className="layers-tree"
            draggable
            blockNode
            fieldNames={{ key: "id", children: "modules" }}
            multiple={bar.isMultipleTree}
            switcherIcon={<DownOutlined />}
            onDrop={onDrop}
            onExpand={onExpand}
            onSelect={onSelect}
            onRightClick={onRightClick}
            autoExpandParent={true}
            treeData={bar.layers}
            selectedKeys={bar.key}
            expandedKeys={expandedKeys}
            titleRender={(nodeData) => {
              // title 置为空，覆盖antTree 默认的title
              return (
                <div title="">
                  <EveryTreeNode
                    {...nodeData}
                    isExpand={isExpand}
                    getCurrentMenuLocation={getCurrentMenuLocation}
                  />
                </div>
              );
            }}
          />
        </div>
      </div>
      <div className="footer" ref={bottomBarRef}>
        <ToolBar
          needBottomBorder={false}
          iconSize="14px"
          data={bottomBarIcons}
          getActiveIcon={getActiveIcon}
        ></ToolBar>
      </div>
    </div>
  );
};
/**
 * description:  不可变的配置
 */
const topBarIcons = [
  {
    key: "moveUp",
    text: "上移",
    icon: "icon-shangyi",
  },
  {
    key: "moveDown",
    text: "下移",
    icon: "icon-xiayi",
  },
  {
    key: "placedTop",
    text: "置顶",
    icon: "icon-zhiding",
  },
  {
    key: "placedBottom",
    text: "置底",
    icon: "icon-zhidi",
  },
  {
    key: "group",
    text: "成组",
    icon: "icon-zuhe",
  },
  {
    key: "cancelGroup",
    text: "取消成组",
    icon: "icon-quxiaozuhe",
  },
  // {
  //   key: 'spreadOrShrink',
  //   text: '展开/收起',
  //   icon: PicCenterOutlined,
  // },
];
const bottomBarIcons = [
  {
    key: "singleShowLayer",
    text: "单独显示图层",
    icon: "icon-danduxianshi",
  },
  {
    key: "copy",
    text: "复制",
    icon: "icon-fuzhi",
  },
  {
    key: "lock",
    text: "锁定",
    icon: "icon-suoding",
  },
  {
    text: "删除",
    key: "delete",
    icon: "icon-shanchuzu",
  },
];

export default connect(({ bar, operate }) => ({ bar, operate }))(Left);
