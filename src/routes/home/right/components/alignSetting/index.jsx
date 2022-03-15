import React, { memo, useState, useEffect } from 'react';
import './index.css'

import {
  Form,
  Input,
  InputNumber,
  Select,
  Tag,
  Row, Col
} from 'antd';

const AlignSetting = props => {
  const [form] = Form.useForm();
  const formItemLayout = {
    labelAlign: 'left'
  };
  const [align, SetAlign] = useState('left');
  const [vertical, SetVertical] = useState('vertical');


  const alignmentChange = (str) => {
    console.log('str', str)
    SetAlign(str)
  }
  const verticalChange = (str) => {
    console.log('str', str)
    SetVertical(str)
  }

  return (
    <Form
      className="custom-form"
      form={form}
      {...formItemLayout}
      colon={false}
    >
      <Form.Item
        name="style"
        label="对齐方式"
      >
        <div className="align">
          <span title="左对齐" className={align === 'left' ? 'align-active' : null} onClick={() => alignmentChange('left')}>
            <i className="iconfont icon-zuoduiqi-" ></i>
          </span>
          <span title="水平居中对齐" className={align === 'center' ? 'align-active' : null} onClick={() => alignmentChange('center')}>
            <i className="iconfont icon-shuipingjuzhongduiqi" ></i>
          </span>
          <span title="右对齐" className={align === 'right' ? 'align-active' : null} onClick={() => alignmentChange('right')}>
            <i className="iconfont icon-juyouduiqi" ></i>
          </span>
          <span title="两端对齐" className={align === 'bothEnds' ? 'align-active' : null} onClick={() => alignmentChange('bothEnds')}>
            <i className="iconfont icon-liangduanduiqi" ></i>
          </span>
        </div>
        <div className="vertical">
          <span title="底部对齐" className={vertical === 'bottom' ? 'align-active' : null} onClick={() => verticalChange('bottom')}>
            <i className="iconfont icon-juxiaduiqi" ></i>
          </span>
          <span title="垂直居中对齐" className={vertical === 'vertical' ? 'align-active' : null} onClick={() => verticalChange('vertical')}>
            <i className="iconfont icon-chuizhijuzhongduiqi" ></i>
          </span>
          <span title="顶部对齐" className={vertical === 'top' ? 'align-active' : null} onClick={() => verticalChange('top')}>
            <i className="iconfont icon-jushangduiqi"></i>
          </span>
        </div>
      </Form.Item>
    </Form>
  )
}

export default memo(AlignSetting)