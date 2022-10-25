/* eslint-disable react/prop-types */
import React, { memo, useState, useEffect } from "react";
import "./index.less";

import { Form, Input, InputNumber, Row, Col } from "antd";

const PaMargin = (props) => {
  const [form] = Form.useForm();
  const formItemLayout = {
    labelAlign: "left",
  };

  const _data = props.data;
  const [padding, setPadding] = useState({
    left: _data.value.left || 0,
    top: _data.value.top || 0,
    right: _data.value.right || 0,
    bottom: _data.value.bottom || 0,
  });

  const paddingChange = (field, e) => {
    const value = parseInt(e);
    setPadding({
      ...padding,
      [field]: value,
    });
    _data.value[field] = value;
    props.onChange();
  };

  return (
    <Form className="custom-form pama-form" form={form} {...formItemLayout} colon={false}>
      <Form.Item name="padding" label={_data.displayName}>
        <Input.Group compact className="fontBi">
          <Form.Item name="top" noStyle>
            <InputNumber
              controls={false}
              defaultValue={padding.top}
              className="po-size-input padding-input"
              onChange={(e) => paddingChange("top", e)}
            />
          </Form.Item>
          <Form.Item name="bottom" noStyle>
            <InputNumber
              controls={false}
              defaultValue={padding.bottom}
              className="po-size-input padding-input"
              onChange={(e) => paddingChange("bottom", e)}
            />
          </Form.Item>
          <Form.Item name="left" noStyle>
            <InputNumber
              controls={false}
              defaultValue={padding.left}
              className="po-size-input padding-input"
              onChange={(e) => paddingChange("left", e)}
            />
          </Form.Item>
          <Form.Item name="right" noStyle>
            <InputNumber
              controls={false}
              defaultValue={padding.right}
              className="po-size-input padding-input"
              onChange={(e) => paddingChange("right", e)}
            />
          </Form.Item>
        </Input.Group>
        <Row>
          <Col span={6} className="detail-txt">
            上
          </Col>
          <Col span={6} className="detail-txt" style={{ textIndent: "3px" }}>
            下
          </Col>
          <Col span={6} className="detail-txt" style={{ textIndent: "5px" }}>
            左
          </Col>
          <Col span={6} className="detail-txt" style={{ textIndent: "7px" }}>
            右
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default memo(PaMargin);
