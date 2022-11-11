import React, { memo, useState } from "react";
import { withRouter } from "dva/router";
import "./index.less";
import { IconFont } from "@/utils/useIcon";
import { connect } from "dva";

import { useClickAway } from "ahooks";

import StateItem from "./stateItem/stateItem";



const DynamicPanel: React.FC = (props: any) => {
  const { bar, dispatch, history } = props;
  const [open, setOpen] = useState(true);
  const [isShowRMenu, setIsShowRMenu] = useState(false);
  const [RMenuLocation, setRMenuLocation] = useState({ x: 0, y: 0 });
  // 右键选中的项不一定是当前的active项，所以单独作为一个状态保存下来
  const [rightClickTargetItem, setRightClickTargetItem] = useState({});

  const stateId = bar.stateId;
  const panelStatesList = bar.panelStatesList;
  // 如果是下钻面板，这儿就前端自己将状态名更改为层级名

  // if (bar.isPanel && bar.curPanelType === 2) {
  //   panelStatesList = panelStatesList.map((item: any, index: number) => (
  //     {
  //       name: `层级${++index}`,
  //       id: item.id
  //     }
  //   ))
  // }

  useClickAway(() => {
    if (isShowRMenu) {
      setIsShowRMenu(false);
    }
  }, [() => document.getElementById("db-right-menu")]);


  // 展开/收起 状态面板
  const showCollapse = () => {
    setOpen(!open);
  };
  /**
   * description: 点击每一项状态
   */
  const selectItem = ({ name, id }: { name: string, id: string }) => {
    if (id !== bar.stateId) {
      history.push(`/dashboard/${bar.dashboardId}/panel-${bar.panelId}/state-${id}`);
    }
  };
  /**
   * description: 右键点击每一项
   */
  const rightClick = (e: any, item: any) => {
    e.preventDefault();
    setIsShowRMenu(true);
    const { clientX, clientY } = e;
    // 保存当前右键选择的状态项
    setRightClickTargetItem(item);
    setRMenuLocation({
      x: clientX,
      y: clientY
    });

  };
  /**
   * description: 在动态面板中添加一个状态
   */
  const addPanel = async () => {
    dispatch({
      type: "bar/addPanelState"
    });
  };

  // 右键菜单中的复制、删除
  const copyClick = () => {
    console.log("当前右键选择的项", rightClickTargetItem);
    dispatch({
      type: "bar/copyPanelState",
      payload: {
        stateId: (rightClickTargetItem as { id: string, name: string }).id
      }
    });
    setIsShowRMenu(false);
  };
  const delClick = () => {
    dispatch({
      type: "bar/deletePanelState",
      payload: {
        stateId: (rightClickTargetItem as { id: string, name: string }).id
      }
    });
    setIsShowRMenu(false);
  };

  // 判断当前面板类型是否是下钻面板
  const curPanelId = bar.panelId
  const panelsList = bar.fullAmountPanels
  const targetPanelInfo = panelsList.find(item => item.id === curPanelId)
  const isDrillDownPanel = targetPanelInfo ? targetPanelInfo.type == 2 : false

  return (
    <div className='dynamic-panel-wrap'>
      <div className='panel-top'>
        <div style={{ color: "#ccc" }}>{isDrillDownPanel ? "下钻层级" : "状态"}</div>
        <div className='panel-icons'>
          <IconFont className="db-icon" type='icon-xinjianfenzu'
            onClick={() => addPanel()}
          />
          {
            open ?
              <IconFont className="db-icon" type='icon-zhankai'
                onClick={showCollapse}
              />
              :
              <IconFont className="db-icon" type='icon-shouqi'
                onClick={showCollapse}
              />
          }

        </div>
      </div>
      <div className='panel-body' style={{ display: open ? "block" : "none" }}>
        {
          panelStatesList.map((item: { id: string, name: string }, index: number) => {
            return (
              <StateItem
                key={item.id}
                item={item}
                activeItem={stateId}
                rightClick={rightClick}
                selectItem={selectItem}
              />
            );
          })
        }
      </div>
      {
        isShowRMenu && <RMenu
          menuLocation={RMenuLocation}
          copyClick={copyClick}
          delClick={delClick}
        />
      }
    </div>
  );
};




// 右键菜单
const RMenu = ({ menuLocation, copyClick, delClick }: any) => {
  const { x, y } = menuLocation;

  const finalStyle: any = {
    position: "fixed",
    width: "110px",
    zIndex: 999999,
  };

  return (
    <div
      className='RMenu-wrap' id='db-right-menu' style={{
        ...finalStyle,
        top: y,
        left: x
      }}>
      <div className='panel-menu-item'
        onClick={() => copyClick()}
      >
        <IconFont style={{ marginRight: "8px" }} type='icon-fuzhi' />
        <span>复制</span>
      </div>
      <div className='panel-menu-item'
        onClickCapture={() => delClick()}
      >
        <IconFont style={{ marginRight: "8px" }} type='icon-shanchuzu' />
        <span>删除</span>
      </div>
    </div>
  );
};




export default memo(connect(
  ({ bar }: any) => ({ bar }),
)(withRouter(DynamicPanel)));
