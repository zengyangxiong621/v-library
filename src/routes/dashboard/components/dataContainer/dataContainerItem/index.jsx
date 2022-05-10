import React, {memo, useState, useEffect, useRef} from 'react';
import './index.less'
import {Input} from 'antd'
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined
} from '@ant-design/icons';
import {http} from '../../../../../models/utils/request'

const DataContainerItem = props => {
  const data = props.data
  const [isEdit, setIsEdit] = useState(false)
  const inputRef = useRef(null)
  const handleEdit = () => {
    setIsEdit(true)
    setTimeout(() => {
      inputRef.current.focus()
    })
  }

  const handleInputValueEdit = async () => {
    // 编辑
    const data = await http({
      method: 'post',
      url: ''
    })
    setIsEdit(false)
  }
  return (
    <div className="data-container-item">
      <span className="status-light" style={{color: data.enable ? 'green' : 'red'}}>
        ⬤
      </span>
      <div className="edit-area">
        {
          isEdit ? <Input ref={inputRef} allowClear onBlur={handleInputValueEdit} onPressEnter={handleInputValueEdit} /> : <div>
            {data.name}
            <EditOutlined
              onClick={handleEdit}
              style={{ fontSize: '16px', color: '#08c' }}
            />
          </div>
        }
      </div>
      <div className="handle-area">
        <CopyOutlined
          style={{ fontSize: '16px', color: '#08c' }}
        />
        <DeleteOutlined
          style={{ fontSize: '16px', color: '#08c' }}
        />
      </div>
    </div>
  )
}

export default memo(DataContainerItem)