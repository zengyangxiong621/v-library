/* eslint-disable react/prop-types */
import React, { memo, useState, useEffect } from "react";
import "./index.less";
import { Form, Checkbox, Space } from "antd";

const CheckBoxGroup = (props) => {
  const [form] = Form.useForm();
  const formItemLayout = {
    labelAlign: "left",
  };
  const _data = props.data;

  const selectChange = (e) => {
    _data.value = e;
    props.onChange();
  };

  return (
    <Form className="custom-form" form={form} {...formItemLayout} colon={false}>
      <Form.Item label={_data.displayName} name={_data.name}>
        <Checkbox.Group defaultValue={_data.value} className="zoom-set" onChange={selectChange}>
          <Space direction={_data.direction || "horizontal"}>
            {_data.options.map((item) => {
              return (
                <Checkbox value={item.value} key={item.value}>
                  {item.name}
                </Checkbox>
              );
            })}
          </Space>
        </Checkbox.Group>
      </Form.Item>
    </Form>
  );
};

export default memo(CheckBoxGroup);
