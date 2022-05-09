import React, { memo, useState, useEffect } from 'react';
import './index.less'
import debounce from 'lodash/debounce';

import { Button, Modal } from 'antd';
import {
  ArrowsAltOutlined
} from '@ant-design/icons';

import { v4 as uuidv4 } from 'uuid';

import AceEditor from "react-ace";
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-jsx";
const languages = [
  "javascript",
  "java",
  "python",
  "xml",
  "ruby",
  "sass",
  "markdown",
  "mysql",
  "json",
  "html",
  "handlebars",
  "golang",
  "csharp",
  "elixir",
  "typescript",
  "css"
];

const themes = [
  "monokai",
  "github",
  "tomorrow",
  "kuroir",
  "twilight",
  "xcode",
  "textmate",
  "solarized_dark",
  "solarized_light",
  "terminal"
];

languages.forEach(lang => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
  require(`ace-builds/src-noconflict/snippets/${lang}`);
});

themes.forEach(theme => require(`ace-builds/src-noconflict/theme-${theme}`));

const CodeEditor = props => {
  const _data = props.data
  const [content, setContent] = useState(_data.value)
  const [fullScreen, setFullScreen] = useState(false)
  const [modalContent, setModalContent] = useState(null)
  const [hasEdit, setHasEdit] = useState(false)
  const aceName = uuidv4()

  useEffect(() => {
    setContent(_data.value)
  }, [_data.value])

  const onChange = debounce((val) => {
    setHasEdit(true)
    setContent(val)
    setModalContent(val)
    _data.value = val
    props.onChange()
  },300)

  const expandHandle = () => {
    setFullScreen(true)
    setModalContent(content)
  }

  const handleOk = () => {
    setContent(modalContent)
    setFullScreen(false)
    _data.value = modalContent
    props.onChange()
  }

  return (
    <div className="code-wraper">
      <AceEditor
        mode={_data.language}
        theme="twilight"
        onChange={onChange}
        name={aceName}
        editorProps={{ $blockScrolling: true }}
        value={content}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showGutter: true,
          readOnly: _data.readOnly
        }}
        style={{ width: '100%', height: '100%' }}
      />
      {_data.showExpand
        ? <Button
          ghost
          className="fullscreen-btn"
          icon={<ArrowsAltOutlined />}
          onClick={expandHandle}
        />
        : null}
      <Modal
        width="70%"
        title="修改数据"
        okText="确认"
        cancelText="取消"
        visible={fullScreen}
        onOk={handleOk}
        onCancel={() => setFullScreen(false)}>
        <AceEditor
          mode={_data.language}
          theme="twilight"
          onChange={(e) => setModalContent(e)}
          name={aceName}
          editorProps={{ $blockScrolling: true }}
          value={modalContent}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showGutter: true,
            readOnly: _data.readOnly
          }}
          style={{ width: '100%', height: '500px' }}
        />
      </Modal>
    </div>
  )
}

export default memo(CodeEditor)

