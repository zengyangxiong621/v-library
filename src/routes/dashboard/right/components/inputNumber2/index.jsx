import React, { memo, useState, useEffect } from 'react'
import './index.less'
import CusInputNumber from "../cusInputNumber"

import {
  Form,
  Input,
  Row, Col
} from 'antd';

const InputNumber2 = ({ bar, dispatch, ...props }) => {
  const [form] = Form.useForm();
  const formItemLayout = {
    labelAlign: 'left'
  };
  const _data = props.data;
  const _firstEl = _data.value[0]
  const _secondEl = _data.value[1]

  const _firstElCopy = {
    ..._firstEl,
    displayName: ''
  }
  const _secondElCopy = {
    ..._secondEl,
    displayName: ''
  }

  const firstChange = () => {
    _firstEl.value = _firstElCopy.value
    props.onChange()
  }
  const secondChange = () => {
    _secondEl.value = _secondElCopy.value
    props.onChange()
  }

  return (
    <Form
      className="custom-form input-number-form2"
      name="validate_other"
      form={form}
      {...formItemLayout}
      colon={false}
    >
      <Form.Item label={_data.displayName}>
        <Input.Group compact>
          <Form.Item name="left" noStyle>
            <CusInputNumber
              data={_firstElCopy}
              onChange={firstChange}
              formStyle={{ float: 'left', marginBottom: '-8px' }}
              style={{ width: '107px' }}
            />
          </Form.Item>
          <Form.Item name="top" noStyle>
            <CusInputNumber
              data={_secondElCopy}
              onChange={secondChange}
              formStyle={{ float: 'right', marginBottom: '-8px' }}
              style={{ width: '107px' }}
            />
          </Form.Item>
        </Input.Group>
        {_data.showDetail ?
          <Row>
            <Col span={12} className="detail-txt" style={{ textIndent: '0' }}>{_firstEl.displayName}</Col>
            <Col span={12} className="detail-txt" style={{ textIndent: '8px' }}>{_secondEl.displayName}</Col>
          </Row>
          : null}
      </Form.Item>
    </Form>
  )
}

export default memo(InputNumber2)
