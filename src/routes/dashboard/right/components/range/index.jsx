import React, { memo, useState, useEffect } from 'react';
import './index.less'
import CusInputNumber from '../cusInputNumber'

import {
  Form,
  Slider,
  InputNumber,
} from 'antd';

const Range = props => {
  const [form] = Form.useForm();
  const formItemLayout = {
    labelAlign: 'left'
  };
  const _data = props.data
  const [range, setRange] = useState(_data.value);
  // const _min = typeof (_data?.config?.min) !== 'undefined' ? _data.config.min : Number.MIN_SAFE_INTEGER
  // const _max = typeof (_data?.config?.max) !== 'undefined' ? _data?.config?.max : Number.MAX_SAFE_INTEGER
  const _min = typeof (_data?.config?.min) !== 'undefined' ? _data.config.min : 0
  const _max = typeof (_data?.config?.max) !== 'undefined' ? _data?.config?.max : 100
  const _step = typeof (_data?.config?.step) !== 'undefined' ? _data?.config?.step : 1

  const _inputData = Object.assign(
    {},
    _data,
    {
      displayName: ''
    }
  )

  const rangeChange = (e) => {
    console.log('eeeeee',e)
    setRange(e)
    _data.value = e || 100
    _inputData.value = e || 100
    props.onChange()
  }
  const rangeInputChange = () => {
    form.setFieldsValue({
      range: _inputData.value
    })
    _data.value = _inputData.value
    props.onChange()
  }

  return (
    <Form
      className="custom-form range-form"
      form={form}
      {...formItemLayout}
      colon={false}
    >
      <Form.Item
        name="outside"
        label={_data.displayName}
      >

        <Form.Item name="range" noStyle>
          <Slider
            min={_min}
            max={_max}
            step={_step}
            tooltipVisible={false}
            onAfterChange={rangeChange}
            defaultValue={range}
            style={{ width: '144px', marginRight: '8px', float: 'left', marginLeft: 0 }}
          />
        </Form.Item>
        <CusInputNumber data={_inputData} onChange={rangeInputChange} style={{width:'67px'}}/>
      </Form.Item>
    </Form>
  )
}

export default memo(Range)
