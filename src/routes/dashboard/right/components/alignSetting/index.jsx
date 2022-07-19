import React, { memo, useState, useEffect } from 'react';
import './index.less'
import { find } from '../../../../../utils/common'
import { deepClone } from '@/utils/index.js'
import {
  Form,
} from 'antd';

const AlignSetting = props => {
  const [form] = Form.useForm();
  const formItemLayout = {
    labelAlign: 'left'
  };
  const _data = props.data
  // const _align = find(_data, 'align', 'type')
  const _align = find(_data, 'align', 'type')
  const _alignRange = _align ? _align?.range?.length > 0 ? deepClone(_align.range) : ['left', 'center', 'right', 'bothEnds'] : []
  const _vertical = find(_data, 'vertical', 'type')
  const _verticalRange = _vertical ? _vertical?.range?.length > 0 ? deepClone(_vertical.range) : ['bottom', 'vertical', 'top'] : []
  const [align, SetAlign] = useState(_align?.value || null);
  const [vertical, SetVertical] = useState(_vertical?.value || null);

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

  const _alignList = {
    left: {
      title: '左对齐',
      icon: 'icon-zuoduiqi-'
    },
    center: {
      title: '水平居中对齐',
      icon: 'icon-shuipingjuzhongduiqi'
    },
    right: {
      title: '右对齐',
      icon: 'icon-juyouduiqi'
    },
    bothEnds: {
      title: '两端对齐',
      icon: 'icon-liangduanduiqi'
    }
  }

  const _verticalList = {
    bottom: {
      title: '底部对齐',
      icon: 'icon-juxiaduiqi'
    },
    vertical: {
      title: '垂直居中对齐',
      icon: 'icon-chuizhijuzhongduiqi'
    },
    top: {
      title: '顶部对齐',
      icon: 'icon-jushangduiqi'
    }
  }




  return (
    <Form
      className="custom-form align-form"
      form={form}
      {...formItemLayout}
      colon={false}
    >
      <Form.Item
        name="style"
        label={_data.displayName}
      >
        {
          _alignRange.length > 0 ?
            <div className="align">
              {
                _alignRange.map(item => (<span key={item} title={_alignList[item].title} className={align === item ? 'align-active' : null} onClick={() => alignmentChange(item)}>
              <i className={["iconfont", _alignList[item].icon].join(" ")} />
            </span>))
              }
            </div> : <></>
        }
        {
          _verticalRange.length > 0 ?
            <div className="vertical">
              {
                _verticalRange.map(item => (<span key={item} title={_verticalList[item].title} className={vertical === item ? 'align-active' : null} onClick={() => verticalChange(item)}>
              <i className={["iconfont", _verticalList[item].icon].join(" ")} />
            </span>))
              }
            </div> : <></>
        }

      </Form.Item>
    </Form>
  )
}

export default memo(AlignSetting)
