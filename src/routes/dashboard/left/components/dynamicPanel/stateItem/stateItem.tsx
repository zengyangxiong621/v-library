import { memo, useState, useRef } from "react";
import "./stateItem.less";
import { connect } from "dva";
import { IconFont } from "@/utils/useIcon";
import { http } from "@/services/request";
import { Input } from "antd";

//
const StateItem = (props: any) => {

  const { rightClick, item, selectItem, activeItem, dispatch } = props;
  const inputRef: any = useRef(null);
  const [inputValue, setInputValue] = useState(item.name);
  // 双击编辑状态名
  const showEditInput = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    setTimeout(() => {
      inputRef.current.focus({
        cursor: "all"
      });
    }, 0);
    setEditState(true);
  };
  // 失焦、回车 更改状态名字
  const changeStateName = async (val: any) => {
    const data = await http({
      url: "/visual/application/updateAppName",
      method: "post",
      body: {
        id: item.id,
        name: inputValue
      }
    });
    if (data) {
      item.name = inputValue;
      dispatch({
        type: "bar/save",
        payload: {
          dashboardName: inputValue
        }
      });
    }
    setEditState(false);
  };
  const [editState, setEditState] = useState(false);
  return (
    <div
      onClick={() => selectItem(item)}
      onContextMenu={(e) => rightClick(e, item)}
      className={`panel-item ${activeItem === item.id ? "active-item" : ""}`}
    >
      <IconFont style={{ marginRight: "8px" }} type='icon-fuzhi' />
      <div>
        {
          editState ?
            <div>
              <Input
                style={{ background: '#232630' }}
                value={inputValue}
                ref={inputRef}
                onChange={e => setInputValue(e.target.value)}
                onBlur={changeStateName}
                onPressEnter={changeStateName}
              />
            </div>
            :
            <div onDoubleClick={(e) => showEditInput(e)}>
              {item.name}
            </div>
        }
      </div>
    </div>
  );
};

export default memo(connect(({ bar }: any) => ({ bar }))(StateItem));
