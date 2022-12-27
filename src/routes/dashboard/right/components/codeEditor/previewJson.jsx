/* eslint-disable react/prop-types */
import React, { memo, useState, useEffect } from "react";
import "./index.less";
import { http } from "../../../../../services/request";
import { BASEURL } from "@/services/request";
import debounce from "lodash/debounce";

import { Button, Modal, Spin, message } from "antd";
import MonacoEditor from "react-monaco-editor";

const PreViewJson = (props) => {
  const { visible, dataSourceId, fileUrl, changeShowState, changeRecordFileUrl } = props;
  const [modalContent, setModalContent] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [hasEdit, setHasEdit] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setModalContent(null);
    if (visible) {
      if (dataSourceId) {
        getData();
      }
    }
  }, [dataSourceId, visible]);

  const getData = async () => {
    const data = await http({
      url: `/visual/datasource/json/getData/${dataSourceId}`,
      method: "get",
    });
    data ? setModalContent(JSON.stringify(data, null, 2)) : setModalContent(null);
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  const onChange = debounce((val) => {
    setModalContent(val);
    try {
      JSON.parse(val);
    } catch (err) {
      message.error("必须输入 json 格式字符串！");
      setIsError(true);
      return;
    }
    setIsError(false);
    setHasEdit(true);
  }, 300);

  const handleCancel = () => {
    changeShowState(false);
    setIsEdit(false);
  };

  const handleOk = () => {
    changeShowState(false);
    setIsEdit(false);
    if (hasEdit && !isError) {
      upLoadJson();
    }
  };

  const upLoadJson = async () => {
    const token = localStorage.getItem("token");
    const fileName = fileUrl.split("/").pop();
    let blob = new Blob([modalContent], {
      type: "application/json",
    });
    let file = new File([blob], `${fileName}`, {
      type: "application/json",
      lastModified: Date.now(),
    });
    const forms = new FormData();
    forms.append("file", file);
    fetch(`${BASEURL}/visual/file/upload`, {
      method: "POST",
      body: forms,
      credentials: "include",
      headers: {
        token: token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        changeRecordFileUrl(res.data);
      });
  };

  return (
    <Modal
      wrapClassName="spreadsheet-modal"
      width={1000}
      title="数据预览"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button
          key="1"
          type="primary"
          className="modalBtn cancelBtn"
          onClick={handleCancel}
          disabled={!modalContent}
        >
          取消
        </Button>,
        <Button
          key="2"
          type="primary"
          className="modalBtn okBtn"
          onClick={handleEdit}
          disabled={!modalContent}
        >
          编辑
        </Button>,
        <Button
          key="3"
          type="primary"
          className="modalBtn okBtn"
          onClick={handleOk}
          disabled={!modalContent}
        >
          确认
        </Button>,
      ]}
    >
      {modalContent ? (
        <MonacoEditor
          key={dataSourceId}
          height="450"
          language="json"
          theme="vs-dark"
          value={modalContent}
          options={{
            contextmenu: false,
            readOnly: !isEdit,
          }}
          onChange={(e) => onChange(e)}
        />
      ) : (
        <Spin tip="加载中..." />
      )}
    </Modal>
  );
};

export default memo(PreViewJson);
