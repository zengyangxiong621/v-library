import React, { memo, useState, useEffect } from "react";
import "./index.less";

import { Form, Input, InputNumber, Row, Col } from "antd";

const ChartMarginSetting = (props) => {
  const [form] = Form.useForm();
  const formItemLayout = {
    labelAlign: "left",
  };
  const [margin, setMargin] = useState({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  });

  const marginChange = () => {
    // todo
  };

  return (
    <Form className="custom-form" form={form} {...formItemLayout} colon={false}>
      <Form.Item name="outside" label="图表边距">
        <Input.Group compact className="fontBi">
          <Form.Item name="top" noStyle>
            <InputNumber
              controls={false}
              defaultValue={margin.top}
              className="po-size-input margin-input"
              onBlur={marginChange}
            />
          </Form.Item>
          <Form.Item name="bottom" noStyle>
            <InputNumber
              controls={false}
              defaultValue={margin.bottom}
              className="po-size-input margin-input"
              onBlur={marginChange}
            />
          </Form.Item>
          <Form.Item name="left" noStyle>
            <InputNumber
              controls={false}
              defaultValue={margin.left}
              className="po-size-input margin-input"
              onBlur={marginChange}
            />
          </Form.Item>
          <Form.Item name="right" noStyle>
            <InputNumber
              controls={false}
              defaultValue={margin.right}
              className="po-size-input margin-input"
              onBlur={marginChange}
            />
          </Form.Item>
        </Input.Group>
        <Row>
          <Col span={6} className="detail-txt" style={{ textIndent: "0px" }}>
            上
          </Col>
          <Col span={6} className="detail-txt" style={{ textIndent: "6px" }}>
            下
          </Col>
          <Col span={6} className="detail-txt" style={{ textIndent: "8px" }}>
            左
          </Col>
          <Col span={6} className="detail-txt" style={{ textIndent: "8px" }}>
            右
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default memo(ChartMarginSetting);
