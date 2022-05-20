import React, {memo, useState, useEffect, useRef} from 'react';
import './index.less'
import {Input, message} from 'antd'
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined
} from '@ant-design/icons';
import ModalConfirm from "../../../../../../components/modalConfirm";

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

  useEffect(() => {
    setInputValue(data.name)
  }, [data])

  const handleInputValueEdit = async () => {
    // 编辑
    if (data.name !== inputValue) {
      props.onChange({
        ...data,
        name: inputValue
      }, () => {
        setInputValue(data.name)
      })
    }
    setIsEdit(false)
  }
  const handleChange = (e) => {
    console.log('清空')
    setInputValue(e.target.value)
  }
  const handleDelete = () => {
    ModalConfirm({
      title: '删除确认',
      content: '仍有组件绑定该数据容器，删除后不可逆，确认删除？',
      desc: '', // 选填
      onCancel: () => {
        console.log('取消')
      },
      onOk: () => {
        props.onDelete(data.id)
      }
    })
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
            <span onClick={() => props.onChoose(data)} className="container-name" title={data.name}>{data.name}</span>
            <EditOutlined
              onClick={handleEdit}
            />
          </>
        }
      </div>
      <div className="handle-area g-flex g-items-center">
        <CopyOutlined
          className="g-mx-4"
          onClick={() => props.onCopy(data.id)}
        />
        <DeleteOutlined
          onClick={handleDelete}
        />
      </div>
    </div>
  )
}

export default memo(DataContainerItem)
