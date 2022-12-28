import React, { memo, useState, useEffect } from "react";
import "./index.less";
import debounce from "lodash/debounce";

import MonacoEditor from "react-monaco-editor";
import { Button, Modal } from "antd";
import { ArrowsAltOutlined } from "@ant-design/icons";

let hasEditFlag = false;

const CodeEditor = (props) => {
  const _data = props.data;
  const [content, setContent] = useState(_data.value);
  const [fullScreen, setFullScreen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    setContent(_data.value);
  }, [_data.value]);

  const onChange = debounce((val) => {
    hasEditFlag = true;
    setContent(val);
    setModalContent(val);
  }, 300);

  const onBlur = (e) => {
    if (hasEditFlag) {
      _data.value = content;
      props.onChange(_data);
    }
  };

  const expandHandle = () => {
    setModalContent(content);
    setTimeout(() => {
      setFullScreen(true);
    }, 0);
  };

  const handleOk = () => {
    setTimeout(() => {
      setContent(modalContent);
      setFullScreen(false);
      _data.value = modalContent;
      props.onChange(_data);
    }, 300);
  };

  return (
    <div className="code-wraper" onBlur={onBlur}>
      <MonacoEditor
        key="normal"
        language={_data.language}
        theme="vs-dark"
        value={content}
        options={{
          contextmenu: false,
          readOnly: _data.readOnly,
        }}
        onChange={(e) => onChange(e)}
      />
      {_data.showExpand ? (
        <Button
          ghost
          className="fullscreen-btn"
          icon={<ArrowsAltOutlined />}
          onClick={expandHandle}
        />
      ) : null}
      <Modal
        className="code_edit"
        width="70%"
        title="修改数据"
        okText="确认"
        cancelText="取消"
        visible={fullScreen}
        onOk={handleOk}
        onCancel={() => setFullScreen(false)}
      >
        <MonacoEditor
          key="expand"
          height="500"
          language={_data.language}
          theme="vs-dark"
          value={modalContent}
          options={{
            contextmenu: false,
            readOnly: _data.readOnly,
          }}
          onChange={(e) => setModalContent(e)}
        />
      </Modal>
    </div>
  );
};

export default memo(CodeEditor);
