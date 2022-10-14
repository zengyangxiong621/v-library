import { memo, useState } from "react";
import "./index.less";
import { Modal } from "antd";
const picUrl = require("@/assets/images/模板默认背景图.png");
const PreviewModal = (props: any) => {
  const { isPreviewVisible, currentItem, changeVisible } = props;
  const isTemp = ["systemTemp", "myTemp"].indexOf(currentItem.moduleType) > -1;
  let imgUrl = isTemp
    ? currentItem.preview || currentItem.photoUrl
    : currentItem.moduleName === "image2" && currentItem.downloadUrl
    ? currentItem.downloadUrl
    : currentItem.photoPath;
  imgUrl = imgUrl
    ? !imgUrl.startsWith("http")
      ? `${(window as any).CONFIG.COMP_URL}${imgUrl}`
      : imgUrl
    : picUrl;
  const handleCancelPreview = () => {
    changeVisible(false);
  };
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
      {/* https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.jj20.com%2Fup%2Fallimg%2F711%2F031114112558%2F140311112558-1.jpg&refer=http%3A%2F%2Fpic.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658304833&t=00acf2c1e762e892e4d5a2a51450099f */}
      <img className="preview-img" src={imgUrl} alt="" />
    </Modal>
  );
};

export default memo(PreviewModal);
