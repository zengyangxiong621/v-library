import React, { memo, useState, useEffect } from 'react';
import './index.less'
import { v4 as uuidv4 } from 'uuid';
import { http } from '../../../../../models/utils/request'
import { BASE_URL } from '../../../../../utils/useFetch'
import debounce from 'lodash/debounce';

import { Button, Modal, Spin, message } from 'antd';
import AceEditor from "react-ace";
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-jsx";

const languages = ["json"]
const themes = ["twilight"]
languages.forEach(lang => {
  require(`ace-builds/src-noconflict/mode-${lang}`)
  require(`ace-builds/src-noconflict/snippets/${lang}`)
})
themes.forEach(theme => require(`ace-builds/src-noconflict/theme-${theme}`))

const PreViewJson = props => {
  const { visible, dataSourceId, fileUrl, changeShowState, changeRecordFileUrl } = props
  const [modalContent, setModalContent] = useState(null)
  const [isEdit, setIsEdit] = useState(false)
  const [hasEdit, setHasEdit] = useState(false)
  const [isError, setIsError] = useState(false)
  const aceName = uuidv4()

  useEffect(() => {
    setModalContent(null)
    if (dataSourceId) {
      getData()
    }
  }, [dataSourceId])

  const getData = async () => {
    const data = await http({
      url: `/visual/datasource/json/getData/${dataSourceId}`,
      method: 'get'
    })
    data ? setModalContent(JSON.stringify(data, null, 4)) : setModalContent(null)
  }

  const handleEdit = () => {
    setIsEdit(true)
  }

  const onChange = debounce((val) => {
    try {
      JSON.parse(val)
    } catch (err) {
      message.error("必须输入 json 格式字符串！");
      setIsError(true)
      return
    }
    setIsError(false)
    setHasEdit(true)
    setModalContent(val)
  }, 300)

  const handleCancel = () => {
    changeShowState(false)
  }

  const handleOk = () => {
    changeShowState(false)
    if (hasEdit && !isError) {
      upLoadJson()
    }
  }

  const upLoadJson = async() => {
    const fileName = fileUrl.split('/').pop()
    let blob = new Blob([modalContent], {
      type: "application/json"
    });
    let file = new File([blob], `${fileName}`, {
      type: 'application/json',
      lastModified: Date.now()
    })
    const forms = new FormData()
    forms.append('file', file)
    fetch(`${BASE_URL}/visual/file/upload`, {
      method: 'POST',
      body: forms
    }).then(res => {
      return res.json()
    }).then(res => {
      changeRecordFileUrl(res.data)
    })
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
          <AceEditor
            key={dataSourceId}
            mode="json"
            theme="twilight"
            onChange={(e) => onChange(e)}
            name={aceName}
            editorProps={{ $blockScrolling: true }}
            value={modalContent}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showGutter: true,
              readOnly: !isEdit
            }}
            style={{ width: '100%', height: '450px' }}
          /> :
          <Spin tip="加载中..." />
      }
    </Modal>
  )
}

export default memo(PreViewJson)

