import React, { memo, useEffect, useRef, useState } from "react";
import "./index.less";

import { http } from "@/services/request";
import { connect } from "dva";
import { IconFont } from "../../../../utils/useIcon";
import { Input, message, Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";

const EveryTreeNode = (props: any) => {
  const { id, spaceName, addWorkSpace,
    refreshWorkSpaceLists, accountId, dispatch } = props || {};
  const inputRef = useRef<any>();
  // 点击已有分组时 显现的输入框
  const [inputValue, setInputValue] = useState("");
  const [showRenameInput, setShowRenameInput] = useState(false);

  // 点击新建分组时 记录最终输入框的值
  const [newSpacename, setNewSpacename] = useState("");
  useEffect(() => {
    inputRef.current?.focus({
      cursor: "all"
    });
  }, [showRenameInput]);

  /** ** 新建分组****** */
  const createGroup = async () => {
    // 前端校验一遍
    //比如名字一样,不发请求
    if (newSpacename === "") {
      // message.warning({ content: '分组名不能为空', duration: 2 })
      addWorkSpace();
      return;
    }
    const finalBody = {
      accountId,
      name: newSpacename,
      // 配额默认是50个
      projectQuota: 50
    };
    const data = await http({
      url: "/visual/workspace/add",
      method: "post",
      body: finalBody
    });
    // 创建成功，改变父组件传入的变量通知父组件重新获取最新分组列表
    if (data) refreshWorkSpaceLists();
  };
  const createInputChange = (e: any) => {
    setNewSpacename(e.target.value);
  };
  const createInputFocus = (e: any) => {
    console.log("eeee", e);
  };

  /** ** 编辑分组****** */
  // 修改分组名字
  const updateWorkSpaceName = async (e: any) => {
    e.stopPropagation();
    // 名字一样,不发请求
    if (inputValue === "") {
      // message.warning({ content: '分组名不能为空', duration: 2 })
      setShowRenameInput(false);
      return;
    } else if (inputValue === spaceName) {
      // message.warning({ content: '新旧分组名不能相同', duration: 2 })
      setShowRenameInput(false);
      return;
    }
    const finalBody = {
      accountId,
      name: inputValue,
      spaceId: id,
    };
    const data = await http({
      url: "/visual/workspace/update",
      method: "post",
      body: finalBody
    });
    if (data) {
      inputRef.current.blur();
      refreshWorkSpaceLists();
      setShowRenameInput(false);
    }
  };
  // 输入内容改变
  const oInputContent = (e: any) => {
    e.stopPropagation();
    setInputValue(e.target.value);
  };
  // 点击编辑图标
  const editClick = (e: any) => {
    e.stopPropagation();
    setShowRenameInput(true);
    setInputValue(spaceName);
  };
  // 点击删除图标
  const delClick = async (id: string | number) => {
    Modal.confirm({
      title: "删除空间",
      // centered: true,
      style: {
        // 调整浮层位置
        top: "30%"
      },
      okButtonProps: {
        style: {
          backgroundColor: "#e9535d",
          border: "none",
          // marginLeft: '8px',
        }
      },
      cancelButtonProps: {
        style: {
          backgroundColor: "#3d404d"
        }
      },
      icon: <ExclamationCircleFilled />,
      content: "删除后不可恢复，确认删除此空间吗?",
      okText: "确定",
      cancelText: "取消",
      bodyStyle: {
        background: "#232630",
      },
      async onOk(close:any) {
        const data = await http({
          url: `/visual/workspace/delete/${id}`,
          method: "delete"
        });
        if (data) {
          dispatch({
            type: "workSpace/setCurWorkSpace",
            payload: []
          });
          refreshWorkSpaceLists();
        } else {
          message.error({ content: "删除失败", duration: 2 });
        }
        close();
      },
      onCancel(close:any) {
        close();
      }
    });
  };
  const inputWrapClick = (e: any) => {
    console.log(e);
    // e.stopPropagation()
  };
  return (
    <div className={"workspace-node-wrap"} title=''>
      {
        id === "aInput"
          ?
          <div onClick={(e) => inputWrapClick(e)}><Input
            value={newSpacename}
            onFocus={(e) => createInputFocus(e)}
            onChange={(e) => createInputChange(e)}
            onPressEnter={() => createGroup()}
            onBlur={() => createGroup()}
          /></div>
          :
          <>
            <div className='title'>
              {
                showRenameInput
                  ?
                  <Input
                    style={{ width: "120px" }}
                    value={inputValue}
                    ref={inputRef}
                    onChange={(e) => oInputContent(e)}
                    onPressEnter={(e) => updateWorkSpaceName(e)}
                    onBlur={(e) => updateWorkSpaceName(e)}
                  />
                  : <>{spaceName}</>
              }
            </div>
            <div className='icons-wrap'>
              {
                spaceName === "我的空间"
                  ? <IconFont type='icon-xinjianfenzu' onClickCapture={addWorkSpace} />
                  : id === "1" ?
                    <></> :
                    <div className='show-icon'>
                      {
                        <IconFont type='icon-bianji' style={{ marginRight: "16px" }} onClickCapture={(e) => editClick(e)} />
                      }
                      {
                        <IconFont type='icon-shanchuzu' onClickCapture={() => delClick(id)} />
                      }
                    </div>
              }
            </div>
          </>
      }
    </div>
  );
};

export default memo(connect(
  ({ workSpace }: any) => ({ workSpace })
)(EveryTreeNode));