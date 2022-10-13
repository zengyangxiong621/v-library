import { memo, useState } from "react";
import "./index.less";
import { Modal } from "antd";
const picUrl = require("@/assets/images/模板默认背景图.png");
const PreviewModal = (props: any) => {
  const { isPreviewVisible, currentItem, changeVisible } = props;
  let imgUrl = currentItem.preview || currentItem.photoUrl;
  imgUrl =
    imgUrl && !imgUrl.startsWith("http") ? `${(window as any).CONFIG.COMP_URL}${imgUrl}` : picUrl;
  const handleCancelPreview = () => {
    changeVisible(false);
  };
  return (
    // title={currentItem.name}
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
