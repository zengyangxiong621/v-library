import React, { memo, useState,useEffect } from 'react'
import { connect } from 'dva'
import './index.css'
import { find } from '../../../../../utils/common'

import {
  Form,
  Input,
  InputNumber,
  Checkbox,
} from 'antd';

const PositionSize = ({bar, dispatch ,...props })  => {
  const [form] = Form.useForm();
  const formItemLayout = {
    labelAlign: 'left'
  };
  const _data = props.data;
  const _left = find(_data, 'left')
  const _top = find(_data, 'top')
  const _width = find(_data, 'width')
  const _height = find(_data, 'height')
  const [size, setSize] = useState({
    left: _left.value,
    top: _top.value,
    width: _width.value,
    height: _height.value,
  });
  const [sizeLock, setSizeLock] = useState(_data.config.lock)

  useEffect(() => {
    if( bar.sizeChange.change) {
      setSize(bar.sizeChange.config)
      form.setFieldsValue({
        ...bar.sizeChange.config
      })
    }
    return () => {
      dispatch({
        type: 'bar/save',
        payload: {
          sizeChange: {
            ...bar.sizeChange,
            change: false
          }
        },
      })
    }
  }, [ bar.sizeChange.change ])

  const posSizeChange = (str, e) => {
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
        setSize(sizeTmp)
        form.setFieldsValue({
          height,
          width: value
        })
        _width.value = value
        _height.value = height
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
          height: value
        })
        _width.value = width
        _height.value = value
      }
    } else {
      const sizeTmp = {
        ...size,
        [str]: value,
      }
      setSize(sizeTmp)
      form.setFieldsValue({
        [str]: value
      })
      str === 'width' ? _width.value = value :
        str === 'height' ? _height.value = value :
          str === 'top' ? _top.value = value :
            _left.value = value
    }
    props.onChange()
  }

  const sizeLockChange = (e) => {
    e.preventDefault()
    setSizeLock(!sizeLock)
    _data.config.lock = !sizeLock
    props.onChange()
  }

  return (
    <Form
      className="custom-form"
      name="validate_other"
      form={form}
      {...formItemLayout}
      colon={false}
    >
      <Form.Item label={_data.displayName}>
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

// export default memo(PositionSize)
export default connect(({ bar }) => ({
  bar
}))(PositionSize)
