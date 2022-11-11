/* eslint-disable react/prop-types */
import React, { memo, useState } from "react";
import "./index.less";
import Spreadsheet from "./spreadsheet.js";

import { Button, Modal } from "antd";
import { ArrowsAltOutlined } from "@ant-design/icons";

const data = {
  rows: {
    0: {
      cells: {
        0: { text: "0" },
        1: { text: "0" },
        2: { text: "0" },
      },
    },
    1: {
      cells: {
        0: { text: "0" },
        1: { text: "0" },
        2: { text: "0" },
      },
    },
    2: {
      cells: {
        0: { text: "0" },
        1: { text: "0" },
        2: { text: "0" },
      },
    },
    len: 50,
  },
  cols: { len: 26 },
  validations: [],
  autofilter: {},
};

const EditTable = (props) => {
  const _data = props.data || data;
  const [content, setContent] = useState(_data);
  const [fullScreen, setFullScreen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const expandHandle = () => {
    setFullScreen(true);
    setModalContent(content);
  };

  const modalDataChange = (data) => {
    // todo
  };

  const handleOk = () => {
    setFullScreen(false);
    // TODO 调用接口保存
    // props.onChange()
  };

  return (
    <div className="edit-table-wraper" style={props.style}>
      <Spreadsheet
        height="100%"
        data={content}
        options={{
          mode: "read",
        }}
      />
      <Button
        ghost
        className="fullscreen-btn"
        icon={<ArrowsAltOutlined />}
        onClick={expandHandle}
      />
      <Modal
        wrapClassName="spreadsheet-modal"
        width={1000}
        title="修改数据"
        visible={fullScreen}
        onOk={handleOk}
        onCancel={() => setFullScreen(false)}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            确认
          </Button>,
        ]}
      >
        <Spreadsheet height="100%" data={modalContent} onChange={modalDataChange} />
      </Modal>
    </div>
  );
};

export default memo(EditTable);
