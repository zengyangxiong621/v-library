import React, {memo, useState, useEffect, useRef} from 'react';
import './index.less'
import {Input, message} from 'antd'
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined
} from '@ant-design/icons';
import {http} from '../../../../../../models/utils/request'
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
  const handleDelete = () => {
    ModalConfirm({
      title: '删除确认',
      content: '仍有组件绑定该数据容器，删除后不可逆，确认删除？',
      desc: '', // 选填
      onCancel: () => {
        console.log('取消')
      },
      onOk: async () => {
        const data = await http({
          url: 'url'
        })
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
            <span onClick={() => props.onClick(data)} className="container-name" title={data.name}>{data.name}</span>
            <EditOutlined
              onClick={handleEdit}
            />
          </>
        }
      </div>
      <div className="handle-area g-flex g-items-center">
        <CopyOutlined
          className="g-mx-4"
        />
        <DeleteOutlined
          onClick={handleDelete}
        />
      </div>
    </div>
  )
}

export default memo(DataContainerItem)