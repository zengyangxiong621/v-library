import { memo } from "react";
import "./index.less";

import { Modal } from "antd";

const DarkThemeModal = (props: any) => {
  return (
    <div className="DarkThemeModal-wrap">
      <Modal {...props} />
    </div>
  );
};

export default memo(DarkThemeModal);
