import React, { memo, useState, useEffect } from "react";
import { Modal, Button } from "antd";
import "./modal.less";
import { ExclamationCircleFilled, CloseOutlined } from "@ant-design/icons";

export const CustomModal = ({
  onCancel,
  onOk,
  onClose,
  content,
  cancelText,
  okText,
  title,
  desc,
  ...props
}) => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(true);
  const handleCancel = async () => {
    await onCancel();
    setVisible(false);
    handleClose();
  };
  const handleConfirm = async () => {
    setLoading(true);
    await onOk();
    setVisible(false);
    handleClose();
  };
  const handleClose = () => {
    setTimeout(() => {
      onClose();
    }, 200);
  };
  return (
    <Modal
      visible={visible}
      title={
        <div className="g-flex g-justify-between">
          {title}
          <CloseOutlined className="g-cursor-pointer" onClick={handleCancel} />
        </div>
      }
      {...props}
      className="custom-confirm-modal"
    >
      <div className="modal-body g-flex g-pl-4 g-pt-2" style={{ height: 80 }}>
        <div>
          <ExclamationCircleFilled style={{ fontSize: 24, color: "#FFBF00" }} />
        </div>
        <div className="modal-body-content g-pl-4 g-mt-px">
          <div style={{ color: "#fff", fontSize: "14px" }}>{content}</div>
          <div style={{ color: "#ccc", fontSize: "12px" }}>{desc}</div>
        </div>
      </div>
      <div className="modal-footer g-flex g-justify-end">
        <Button className="g-mr-4" onClick={handleCancel}>
          {cancelText}
        </Button>
        <Button onClick={handleConfirm} loading={loading} type="primary">
          {okText}
        </Button>
      </div>
    </Modal>
  );
};

export default memo(CustomModal);
