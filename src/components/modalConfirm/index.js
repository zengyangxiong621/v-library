import { CustomModal } from "./modal";
import ReactDOM from "react-dom";
export default function ({
  title,
  content,
  cancelText = "取消",
  okText = "确定",
  desc = "",
  onCancel,
  onOk,
}) {
  const div = document.createElement("div");
  document.body.appendChild(div);

  const close = () => {
    ReactDOM.unmountComponentAtNode(div);
    if (div && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  };
  const cancel = async () => {
    await onCancel();
  };
  const ok = async () => {
    await onOk();
  };
  ReactDOM.render(
    <CustomModal
      title={title}
      content={content}
      desc={desc}
      cancelText={cancelText}
      okText={okText}
      closable={false}
      onCancel={cancel}
      onOk={ok}
      onClose={close}
      confirmLoading={false}
      footer={null}
    ></CustomModal>,
    div
  );
}
