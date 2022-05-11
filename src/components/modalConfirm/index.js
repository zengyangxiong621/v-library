import {CustomModal} from './modal'
import ReactDOM from 'react-dom';
import {useState} from 'react'
export default function ({title, content, cancelText = '取消', okText = '确定', onCancel, onOk}) {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const close = () => {
    ReactDOM.unmountComponentAtNode(div);
    if (div && div.parentNode) {
      div.parentNode.removeChild(div);
      onCancel()
    }
  }
  const confirm = async () => {
    await onOk()
  }
  ReactDOM.render(
    <CustomModal
      visible
      transparent
      title={title}
      content={content}
      cancelText={cancelText}
      okText={okText}
      transitionName="am-zoom"
      closable={false}
      maskClosable={false}
      onCancel={close}
      onOk={confirm}
      confirmLoading={false}
      maskTransitionName="am-fade"
      footer={null}
    >
    </CustomModal>,
    div,
  );
}
