/* eslint-disable react/prop-types */
import React, { memo, useState, useEffect } from "react";
import "./index.less";
import debounce from "lodash/debounce";

import MonacoEditor from "react-monaco-editor";
import { Button, Modal } from "antd";
import { ArrowsAltOutlined } from "@ant-design/icons";

const CodeEditor = (props) => {
  const [content, setContent] = useState(props.value);
  const [fullScreen, setFullScreen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    setContent(props.value);
  }, [props.value]);

  const onChange = debounce((val) => {
    setContent(val);
    setModalContent(val);
    props.onChange(val);
  }, 300);

  const expandHandle = () => {
    console.log("ccccccccontent", content);
    setModalContent(content);
    setTimeout(() => {
      setFullScreen(true);
    }, 0);
  };

  const handleOk = () => {
    setContent(modalContent);
    setFullScreen(false);
    props.onChange(modalContent);
  };

  return (
    <div className="code-wraper">
      <MonacoEditor
        language={props.language}
        theme="vs-dark"
        value={content}
        options={{
          contextmenu: false,
        }}
        onChange={(e) => onChange(e)}
      />
      <Button
        ghost
        className="fullscreen-btn"
        icon={<ArrowsAltOutlined />}
        onClick={expandHandle}
      />
      <Modal
        width="70%"
        title="编辑"
        okText="确认"
        cancelText="取消"
        visible={fullScreen}
        onOk={handleOk}
        onCancel={() => setFullScreen(false)}
      >
        <MonacoEditor
          height="500"
          language={props.language}
          theme="vs-dark"
          value={modalContent}
          options={{
            contextmenu: false,
          }}
          onChange={(e) => setModalContent(e)}
        />
      </Modal>
    </div>
  );
};

export default memo(CodeEditor);
