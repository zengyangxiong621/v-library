import React, { memo, useState } from 'react'
import './index.css'
import { find } from '../../../../../utils/common'

import {
  Form,
  Input,
  InputNumber,
  Checkbox,
} from 'antd';

const PositionSize = props => {
  const [form] = Form.useForm();
  const formItemLayout = {
    labelAlign: 'left'
  };
  const config = props.data;
  const [size, setSize] = useState({
    left: find(config, 'left').value,
    top: find(config, 'top').value,
    width: find(config, 'width').value,
    height: find(config, 'height').value,
  });
  const [sizeLock, setSizeLock] = useState(config.config.lock)

  const posSizeChange = (str, e) => {
    console.log(str, e)
    const value = parseInt(e.target.value)
    if (sizeLock && ['width', 'height'].includes(str)) {
      const proportion = size.width / size.height
      if (str === "width") {
        const height = parseInt(value / proportion)
        const sizeTmp = {
          ...size,
          width: value,
          height
        }
        setSize(size)
        form.setFieldsValue({
          height,
          width:value
        })
        props.onChange({
          size:sizeTmp,
          lock: sizeLock
        })
      } else {
        const width = parseInt(value * proportion)
        const sizeTmp = {
          ...size,
          height: value,
          width
        }
        setSize(sizeTmp)
        form.setFieldsValue({
          width,
          height:value
        })
        props.onChange({
          size:sizeTmp,
          lock: sizeLock
        })
      }
    }else{
      const sizeTmp ={
        ...size,
        [str]: value,
      }
      setSize(sizeTmp)
      form.setFieldsValue({
        [str]: value
      })
      props.onChange({
        size:sizeTmp,
        lock: sizeLock
      })
    }
  }

  const sizeLockChange = (e) => {
    e.preventDefault()
    setSizeLock(!sizeLock)
    props.onChange({
      size,
      lock: !sizeLock
    })
  }

  return (
    <Form
      className="custom-form"
      name="validate_other"
      form={form}
      {...formItemLayout}
      colon={false}
    >
      <Form.Item label="位置尺寸">
        <Input.Group compact style={{ marginBottom: '8px' }}>
          <Form.Item name="left" noStyle>
            <InputNumber defaultValue={size.left} className="po-size-input input-x" style={{ marginRight: '21px' }} onBlur={(e) => { posSizeChange('left', e) }} />
          </Form.Item>
          <Form.Item name="top" noStyle>
            <InputNumber defaultValue={size.top} className="po-size-input input-y" onBlur={(e) => { posSizeChange('top', e) }} />
          </Form.Item>
        </Input.Group>
        <Input.Group compact>
          <Form.Item name="width" noStyle>
            <InputNumber defaultValue={size.width} className="po-size-input input-w" style={{ marginRight: '2px' }} onBlur={(e) => { posSizeChange('width', e) }} />
          </Form.Item>
          <span className="size-lock" onClick={(e) => sizeLockChange(e)}>
            {sizeLock ? <i className="iconfont icon-lock"></i> :
              <i className="iconfont icon-unlock"></i>}
          </span>
          <Form.Item name="height" noStyle>
            <InputNumber defaultValue={size.height} className="po-size-input input-h" style={{ marginLeft: '3px' }} onBlur={(e) => { posSizeChange('height', e) }} />
          </Form.Item>
        </Input.Group>
      </Form.Item>
    </Form>
  )
}

export default memo(PositionSize)