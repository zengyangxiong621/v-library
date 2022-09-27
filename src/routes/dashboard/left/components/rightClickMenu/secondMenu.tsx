import React, { memo } from "react";
import * as Icons from "@ant-design/icons";
import "./secondMenu.less";

import { IconFont } from "../../../../../utils/useIcon";

import { connect } from "dva";

const SecondMenu = ({ dispatch, bar, ...otherProps }: any) => {
  const { data } = otherProps;

  const secondMenuItemClick = (key: string) => {
    // TODO 目前的操作只用发送dispatch即可，不用动态添加payload
    // const willBeDispatch = {}
    dispatch({
      type: `bar/${key}`,
      // payload: willBeDispatch
    });
  };
  return (
    <div className='SecondMenu-wrap'>
      {
        data.map((item: any, index: string) => {
          return (
            <div
              key={index}
              className={`second-menu-item ${item.children && "li-hover"}`}
              onClickCapture={() => secondMenuItemClick(item.key)}
            >
              <IconFont style={{ fontSize: "12px" }} type={`icon-${item.icon}`} />
              <div className='second-menu-item-li'>
                {
                  item.name
                }
                {/* //TODO 递归组件样式需要隔离开 */}
                {
                  (item.children && item.children.length > 0) && <SecondMenu data={item.children}></SecondMenu>
                }
                {/* 右三角图标 */}
                {
                  item.children &&
                  <span className='right-icon'>
                    {
                      React.createElement(Icons.CaretRightOutlined)
                    }
                  </span>
                }
              </div>
            </div>
          );
        })
      }
    </div>
  );
};

export default memo(connect(
  ({ bar }: any) => ({ bar })
)(SecondMenu));