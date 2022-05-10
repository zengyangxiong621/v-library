import React, {memo, useState, useEffect, useRef} from 'react';
import './index.less'
import {Input} from 'antd'
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined
} from '@ant-design/icons';
import {http} from '../../../../../../models/utils/request'

const DataContainerItem = props => {
  const data = props.data
  const [isEdit, setIsEdit] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const inputRef = useRef(null)

  const handleEdit = () => {
    setIsEdit(true)
    setTimeout(() => {
      inputRef.current.focus()
    })
  }

  const handleInputValueEdit = async () => {
    // 编辑
    console.log(inputValue)
    try {
      await http({
        method: 'post',
        url: '/visual/visual/container/source',
        body: {
          id: data.id,
          name: inputValue
        }
      })
      props.data.name = inputValue
      setIsEdit(false)
    } catch (e) {

    }
  }
  const handleChange = (e) => {
    setInputValue(e.target.name)
  }
  return (
    <div className="data-container-item">
      <span className={['status-light', data.enable ? 'starting' : 'stop'].join(' ')}>
        ⬤
      </span>
      <div className="edit-area">
        {
          isEdit ? <Input
            ref={inputRef}
            value={inputValue}
            allowClear
            onChange={handleChange}
            onBlur={handleInputValueEdit}
            onPressEnter={handleInputValueEdit}
            style={{width: 200}}
          /> : <>
            <span onClick={() => props.onClick(data)} className="container-name">{data.name}</span>
            <EditOutlined
              onClick={handleEdit}
            />
          </>
        }
      </div>
      <div className="handle-area">
        <CopyOutlined
        />
        <DeleteOutlined
        />
      </div>
    </div>
  )
}

export default memo(DataContainerItem)