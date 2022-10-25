/* eslint-disable react/prop-types */
import React, { memo, useState, useEffect } from "react";
import OriginSelect from "../originSelect";

import { Form } from "antd";

const Origin = (props) => {
  const formItemLayout = {
    labelAlign: "left",
  };
  const [form] = Form.useForm();
  const _data = props.data;
  const _type = _data?.config?.type || "normal";
  const valueChange = (e) => {
    _data.value = e;
    props.onChange();
  };

  return (
    <Form className="custom-form" form={form} {...formItemLayout} colon={false}>
      <Form.Item label={_data.displayName}>
        <Form.Item name={_data.name} noStyle>
          <OriginSelect type={_type} psValue={_data.value} onChange={valueChange} />
        </Form.Item>
      </Form.Item>
    </Form>
  );
};

export default memo(Origin);
