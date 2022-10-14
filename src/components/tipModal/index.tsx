import React, { useState } from "react";
import { Button, Modal } from "antd";
import "./index.less";
import { ExclamationCircleFilled } from "@ant-design/icons";

interface ITipModalProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
  title?: string;
  text?: string;
  confirmLoading?: boolean;
}

const TipModal: React.FC<ITipModalProps> = ({
  visible,
  title,
  onOk,
  onCancel,
  text,
  confirmLoading,
  ...restProps
}) => {
  return (
    <>
      <Modal
        title={title || "提示"}
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
        getContainer={false}
        confirmLoading={confirmLoading || false}
        maskClosable={false}
        wrapClassName="wrapClassName"
        {...restProps}
      >
        <div className="bodyContent">
          <div className="icon">
            <ExclamationCircleFilled style={{ fontSize: "22px", color: "#ffbd00" }} />
          </div>
          <div className="text">{text || "确定要删除吗？"}</div>
        </div>
      </Modal>
    </>
  );
};

export default TipModal;
