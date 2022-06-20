import { memo, useState } from "react";
import "./index.less";
import { Modal } from "antd";
const PreviewModal = (props: any) => {
  const { isPreviewVisible, currentItem, changeVisible } = props;
  const handleCancelPreview = () => {
    changeVisible(false);
  };
  return (
    <Modal
      title={currentItem.name}
      width="100vw"
      style={{
        maxWidth: "100vw",
        top: 0,
        paddingBottom: 0
      }}
      bodyStyle={{
        height: "calc(100vh - 55px)"
      }}
      className="preview-modal"
      visible={isPreviewVisible}
      onCancel={handleCancelPreview}
      footer={null}
    ></Modal>
  );
};

export default memo(PreviewModal);
