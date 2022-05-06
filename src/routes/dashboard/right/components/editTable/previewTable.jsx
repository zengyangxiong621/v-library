
import React, { memo, useState,useEffect } from 'react'
import './index.less'
import Spreadsheet from "./spreadsheet.js";
import XLSX from 'xlsx'
import { http } from '../../../../../models/utils/request'

import { Button, Modal, Spin } from 'antd';

const data = {
  rows: {
    "0": {
      cells: {
        "0": { text: "0" },
        "1": { text: "0" },
        "2": { text: "0" }
      }
    },
    "1": {
      cells: {
        "0": { text: "0" },
        "1": { text: "0" },
        "2": { text: "0" }
      }
    },
    "2": {
      cells: {
        "0": { text: "0" },
        "1": { text: "0" },
        "2": { text: "0" }
      }
    },
    len: 50
  },
  cols: { len: 26 },
  validations: [],
  autofilter: {}
}

const PreviewTable = props => {
  const { visible, fileUrl, changeShowState } = props
  const [modalContent, setModalContent] = useState(null)
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    downloadExcel()
  },[fileUrl])

  const downloadExcel = () => {
    fetch(fileUrl, {
      method: 'get',
      responseType: 'arraybuffer'
    }).then(res => {
      return res.arraybuffer();
    }).then(res => {
      console.log(res)
      // if (res.status == 200) {
      //   var data = res.data
      //   console.log('data', data)
      //   var data = new Uint8Array(data)
      //   var workbook = XLSX.read(data, { type: 'array' });
      //   this.xs.loadData(this.stox(workbook));
      // }
    })
  }

  const modalDataChange = data => {
    console.log(data)
  }

  const handleEdit = () => {
    setIsEdit(true)
  }

  const handleCancel = () => {
    changeShowState(false)
  }

  const handleOk = () => {
    changeShowState(false)
    // TODO 调用接口保存
    // props.onChange()
  }

  return (
    <Modal
      wrapClassName="spreadsheet-modal"
      width={1000}
      title="数据预览"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button type='primary' className='modalBtn cancelBtn' onClick={handleCancel} disabled={!modalContent}>取消</Button>,
        <Button type="primary" className='modalBtn okBtn' onClick={handleEdit} disabled={!modalContent}>编辑</Button>,
        <Button type="primary" className='modalBtn okBtn' onClick={handleOk} disabled={!modalContent}>确认</Button>
      ]}
    >
      {
        modalContent ?
          <Spreadsheet
            height="100%"
            data={modalContent}
            onChange={modalDataChange}
            options={
              isEdit ? {
                mode: 'edit'
              } : {
                mode: 'read'
              }
            }
          /> :
          <Spin tip="加载中..." />
      }
    </Modal>
  )
}

export default memo(PreviewTable)