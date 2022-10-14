import { memo, useState } from "react";
import "./index.less";
import { Modal } from "antd";
import ReactPlayer from "react-player";
const picUrl = require("@/assets/images/模板默认背景图.png");
const PreviewModal = (props: any) => {
  const { isPreviewVisible, currentItem, changeVisible } = props;
  const isTemp = ["systemTemp", "myTemp"].indexOf(currentItem.moduleType) > -1;
  let imgUrl = isTemp ? currentItem.preview || currentItem.photoUrl : currentItem.downloadUrl;
  imgUrl = imgUrl
    ? !imgUrl.startsWith("http")
      ? `${(window as any).CONFIG.COMP_URL}${imgUrl}`
      : imgUrl
    : picUrl;
  const handleCancelPreview = () => {
    changeVisible(false);
  };
  console.log(currentItem.moduleName, "moduleName");
  return (
    <Modal
      width="100vw"
      style={{
        maxWidth: "100vw",
        top: 0,
        paddingBottom: 0,
      }}
      bodyStyle={{
        height: "100vh",
      }}
      className="preview-modal"
      getContainer={false}
      visible={isPreviewVisible}
      onCancel={handleCancelPreview}
      footer={null}
    >
      {currentItem.moduleName === "media" ? (
        <ReactPlayer url={imgUrl}  playing={true}   muted={true}/>
      ) : (
        <img className="preview-img" src={imgUrl} alt="" />
      )}
    </Modal>
  );
};

export default memo(PreviewModal);
