import React, { memo, useState, useEffect } from 'react';
import './index.css'
import { find } from '../../../../../utils/common'

import {
  Form,
} from 'antd';

const AlignSetting = props => {
  const [form] = Form.useForm();
  const formItemLayout = {
    labelAlign: 'left'
  };
  const _data = props.data
  const _align = find(_data, 'align', 'type')
  const _vertical = find(_data, 'vertical', 'type')
  const [align, SetAlign] = useState(_align.value);
  const [vertical, SetVertical] = useState(_vertical.value);


  const alignmentChange = (str) => {
    SetAlign(str)
    _align.value = str
    props.onChange()
  }
  const verticalChange = (str) => {
    SetVertical(str)
    _vertical.value = str
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
        name="style"
        label={_data.displayName}
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