import React, { memo, useState, useEffect } from 'react';
import {Modal, Button} from 'antd'
import './modal.less'
import {
  ExclamationCircleOutlined,
  CloseOutlined
} from '@ant-design/icons';
export const CustomModal = ({onCancel, onOk, content, cancelText, okText,title, desc="描述", ...props}) => {
  const [loading, setLoading] = useState(false)
  const close = () => {
    onCancel()
  }
  const confirm = async () => {
    setLoading(true)
    await onOk()
    setLoading(false)
    close()
  }
  return (
      <Modal
        title={<div className="g-flex g-justify-between">
          {title}
          <CloseOutlined className="g-cursor-pointer" onClick={close} />
        </div>}
        {...props}
        className="custom-confirm-modal"
      >
        <div className="modal-body g-flex g-pl-4 g-pt-2" style={{height: 80}}>
          <div>
            <ExclamationCircleOutlined style={{fontSize: 24, color: '#FFBF00' }} />
          </div>
          <div className="modal-body-content g-pl-4">
            <div style={{color: '#fff', fontSize: '14px'}}>{content}</div>
            <div style={{color: '#ccc', fontSize: '12px'}}>{desc}</div>
          </div>
        </div>
        <div className="modal-footer g-flex g-justify-end">
          <Button className="g-mr-4" onClick={close}>{cancelText}</Button>
          <Button onClick={confirm} loading={loading}  type="primary" >{okText}</Button>
        </div>
      </Modal>
  )
}

export default memo(CustomModal)