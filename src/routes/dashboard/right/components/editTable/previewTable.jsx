
import React, { memo, useState, useEffect } from 'react'
import './index.less'
import Spreadsheet from "./spreadsheet.js";
import * as XLSX from 'xlsx'
import { http1 } from '../../../../../models/utils/request'
import { BASE_URL } from '../../../../../utils/useFetch'
import debounce from 'lodash/debounce';

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
  const { visible, fileUrl, changeShowState,changeRecordFileUrl } = props
  const [modalContent, setModalContent] = useState(null)
  const [isEdit, setIsEdit] = useState(false)
  const [isTableChange, setIsTableChange] = useState(false)
  const [currentSheetData, setCurrentSheetData] = useState(null)

  useEffect(() => {
    if (fileUrl) {
      downloadExcel()
    }
  }, [fileUrl])

  const downloadExcel = async () => {
    const data = await http1({
      url: "/visual/file/download",
      method: 'post',
      credentials: 'omit',
      responseType: 'arraybuffer',
      body: {
        fileUrl
      }
    })
    console.log('data', data)
    const dataNew = new Uint8Array(data)
    const workbook = XLSX.read(dataNew, { type: 'array' });
    const workbookNew = stox(workbook)
    setModalContent(workbookNew)
  }

  /** 将xlsx中的workbook中的数据格式转为x-data-spreadsheet所需的数据格式 */
  const stox = (wb) => {
    const out = [];
    wb.SheetNames.forEach((name) => {
      const o = { name: name, rows: {}, merges: [] };
      const ws = wb.Sheets[name];
      const aoa = XLSX.utils.sheet_to_json(ws, { raw: false, header: 1 });
      aoa.forEach((r, i) => {
        const cells = {};
        r.forEach((c, j) => {
          cells[j] = ({ text: c });
        });
        o.rows[i] = { cells: cells };
      })
      // 设置合并单元格
      if(ws['!merges']){
        ws['!merges'].forEach(merge => {
          /** merge = {
           *  s: {c: 0, r: 15}
           *  e: {c: 15, r: 15} 
           * }
           */
          // 修改 cell 中 merge [合并行数,合并列数]
          let cell = o.rows[merge.s.r].cells[merge.s.c]
  
          //无内容单元格处理
          if (!cell) {
            cell = { text: "" }
          }
          cell.merge = [merge.e.r - merge.s.r, merge.e.c - merge.s.c]
          o.rows[merge.s.r].cells[merge.s.c] = cell
  
          // 修改 merges
          o.merges.push(XLSX.utils.encode_range(merge))
        })
      }
      out.push(o);
    });
    return out;
  }

  /** 上传excel */
  const uploadExcel = () => {
    const new_wb = xtos(currentSheetData);
    const wbout = XLSX.write(new_wb, { type: 'binary' })
    console.log('new_wb', new_wb)
    const file = new Blob([s2ab(wbout)]);
    console.log('file',file)
    const forms = new FormData()
    forms.append('file', file)
    fetch(`${BASE_URL}/visual/file/upload`,{
      method:'POST',
      body:forms
    }).then(res=>{
      return res.json()
    }).then(res=>{
      console.log(res)
      changeShowState(false)
      changeRecordFileUrl(res.data)
    })
  }

  /** 将x-data-spreadsheet中的数据格式转为xlsx中的workbook */
  const xtos = sdata => {
    console.log(sdata)
    var out = XLSX.utils.book_new();
    sdata.forEach(function (xws) {
      var aoa = [[]];
      var rowobj = xws.rows;
      for (var ri = 0; ri < rowobj.len; ++ri) {
        var row = rowobj[ri];
        if (!row) continue;
        aoa[ri] = [];
        Object.keys(row.cells).forEach(function (k) {
          var idx = +k;
          if (isNaN(idx)) return;
          aoa[ri][idx] = row.cells[k].text;
        });
      }
      var ws = XLSX.utils.aoa_to_sheet(aoa);

      /** 读取在线中的合并单元格，并写入导出的数据中
       * merges: Array(19)
          0: "A16:P16"
          1: "A17:P17"
          2: "O2:P2"
          3: "F2:G2"
       */
      ws['!merges'] = []
      xws.merges.forEach(merge => {
        ws['!merges'].push(XLSX.utils.decode_range(merge))
      })

      XLSX.utils.book_append_sheet(out, ws, xws.name);
    });
    return out;
  }

  const s2ab = (s) => {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  }

  const modalDataChange = debounce(data => {
    console.log(data)
    setIsTableChange(true)
    setCurrentSheetData(data)
  },300)

  const handleEdit = () => {
    setIsEdit(true)
  }

  const handleCancel = () => {
    changeShowState(false)
  }

  const handleOk = () => {
    if (isTableChange) {
      uploadExcel()
    }
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