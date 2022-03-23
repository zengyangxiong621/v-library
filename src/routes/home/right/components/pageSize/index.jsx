import React, { memo, useState, useEffect } from 'react';
import './index.less'

import {
  Form,
  Select,
  InputNumber,
  Input,
  Row, Col
} from 'antd';

const PageSize = props => {
  const { Option } = Select;
  const formItemLayout = {
    labelAlign: 'left'
  };
  const [form] = Form.useForm();
  const _data = props.data
  const [recommend, setRecommend] = useState(_data.value)
  const [width, setWidth] = useState(_data.width);
  const [height, setHeight] = useState(_data.height);


  // 下拉框选择
  const recommendChange = (e) => {
    let _width = width;
    let _height = height;
    switch (e) {
      case '0':
        _width = 1920
        _height = 1080
        break;
      case '1':
        _width = 1366
        _height = 768
        break;
      case '2':
        _width = 1024
        _height = 768
        break;
      case '4':
        break;
    }
    setWidth(_width);
    setHeight(_height);
    setRecommend(e)
    form.setFieldsValue({
      width: _width,
      height: _height
    });
    _data.width = _width;
    _data.height = _height;
    _data.value = e;
    props.onChange()
  }
  // 屏幕大小尺寸变化
  const sizeChange = (str, val) => {
    if (str === 'width') {
      setWidth(val);
      _data.width = val;
    } else {
      setHeight(val);
      _data.height = val;
    }
    setRecommend('4')
    form.setFieldsValue({
      recommend: '4',
    });
    _data.value = '4';
    props.onChange()
  }

  return (
    <Form
      className="custom-form"
      form={form}
      {...formItemLayout}
      colon={false}
    >
      <Form.Item
        name="recommend"
        label={_data.displayName}
      >
        <Select className="custom-select" placeholder="请选择" value={recommend} onChange={recommendChange}>
          {_data.options.map((item) => {
            return <Option value={item.value} key={item.value}>{item.name}</Option>
          })}
        </Select>
        <Input.Group compact>
          <Form.Item noStyle name="width">
            <InputNumber defaultValue={width} className="size-input" style={{ marginRight: '16px' }} onChange={(value) => sizeChange('width', value)} />
          </Form.Item>
          <Form.Item noStyle name="height">
            <InputNumber defaultValue={height} className="size-input" />
          </Form.Item>
        </Input.Group>
        <Row>
          <Col span={12} className="detail-txt">宽度</Col>
          <Col span={12} className="detail-txt" style={{ textIndent: '8px' }}>高度</Col>
        </Row>
      </Form.Item>
    </Form>
  )
}

export default memo(PageSize)