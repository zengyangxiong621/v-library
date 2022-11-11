import React, { memo, useState, useEffect } from "react";
import "./index.less";

import { Form, Slider, InputNumber, Row, Col } from "antd";

const ChartRadiusSetting = (props) => {
  const [form] = Form.useForm();
  const formItemLayout = {
    labelAlign: "left",
  };
  const [radius, setRadius] = useState(100);

  const radiusChange = (e) => {
    form.setFieldsValue({
      radiusInput: e,
    });
  };
  const radiusInputChange = (e) => {
    form.setFieldsValue({
      radius: e,
    });
  };

  return (
    <Form className="custom-form chart-radius" form={form} {...formItemLayout} colon={false}>
      <Form.Item name="outside" label="饼图半径">
        <Form.Item name="radius" noStyle>
          <Slider
            min={0}
            tooltipVisible={false}
            onChange={radiusChange}
            defaultValue={radius}
            style={{ width: "144px", marginRight: "8px", float: "left", marginLeft: 0 }}
          />
        </Form.Item>

        <Form.Item name="radiusInput" noStyle>
          <InputNumber
            defaultValue={radius}
            className="po-size-input input-radius"
            style={{ width: "67px" }}
            onChange={radiusInputChange}
          />
        </Form.Item>
      </Form.Item>
    </Form>
  );
};

export default memo(ChartRadiusSetting);
