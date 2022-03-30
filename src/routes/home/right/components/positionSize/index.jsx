import React, { memo, useState, useEffect } from 'react'
import { connect } from 'dva'
import './index.less'
import { find } from '../../../../../utils/common'
import CusInputNumber from "../cusInputNumber"

import {
  Form,
  Input,
  InputNumber,
  Checkbox,
} from 'antd';

const PositionSize = ({ bar, dispatch, ...props }) => {
  const [form] = Form.useForm();
  const formItemLayout = {
    labelAlign: 'left'
  };
  const _data = props.data;
  const _left = find(_data, 'left')
  const _top = find(_data, 'top')
  const _width = find(_data, 'width')
  const _height = find(_data, 'height')

  const _leftCopy = Object.assign({}, _left, { displayName: '' })
  const _topCopy = Object.assign({}, _top, { displayName: '' })
  const _widthCopy = Object.assign({}, _width, { displayName: '' })
  const _heightCopy = Object.assign({}, _height, { displayName: '' })

  const [sizeLock, setSizeLock] = useState(_data.config.lock)

  const [proportion,setProportion] = useState(_width.value / _height.value)

  useEffect(() => {
    if (bar.sizeChange.change) {
      _left.value = bar.sizeChange.config.left
      _leftCopy.value = bar.sizeChange.config.left

      _top.value = bar.sizeChange.config.top
      _topCopy.value = bar.sizeChange.config.top

      _width.value = bar.sizeChange.config.width
      _widthCopy.value = bar.sizeChange.config.width

      _height.value = bar.sizeChange.config.height
      _heightCopy.value = bar.sizeChange.config.height
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
  }, [bar.sizeChange.change])


  const leftChange = () => {
    _left.value = _leftCopy.value
    props.onChange()
  }

  const topChange = () => {
    _top.value = _topCopy.value
    props.onChange()
  }

  const widthChange = () => {
    if (sizeLock) {
      const temp = parseInt(_widthCopy.value / proportion)
      _heightCopy.value = temp
      _height.value = temp
    }
    _width.value = _widthCopy.value
    props.onChange()
  }

  const heightChange = () => {
    if (sizeLock) {
      const temp = parseInt(_heightCopy.value * proportion)
      _widthCopy.value = temp
      _width.value = temp
    }
    _height.value = _heightCopy.value
    props.onChange()
  }

  const sizeLockChange = (e) => {
    e.preventDefault()
    setSizeLock(!sizeLock)
    _data.config.lock = !sizeLock
    if(!sizeLock){
      setProportion(_width.value / _height.value)
    }
    props.onChange()
  }

  return (
    <Form
      className="custom-form position-form"
      name="validate_other"
      form={form}
      {...formItemLayout}
      colon={false}
    >
      <Form.Item label={_data.displayName}>
        <Input.Group compact>
          <Form.Item name="left" noStyle style={{ marginRight: '21px' }}>
            {/* <InputNumber defaultValue={size.left} className="po-size-input input-x" style={{ marginRight: '21px' }} onBlur={(e) => { posSizeChange('left', e) }} /> */}
            <CusInputNumber data={_leftCopy} onChange={leftChange} formStyle={{ float: 'left' }} />
          </Form.Item>
          <Form.Item name="top" noStyle>
            {/* <InputNumber defaultValue={size.top} className="po-size-input input-y" onBlur={(e) => { posSizeChange('top', e) }} /> */}
            <CusInputNumber data={_topCopy} onChange={topChange} formStyle={{ float: 'right' }} />
          </Form.Item>
        </Input.Group>
        <Input.Group compact>
          <Form.Item name="width" noStyle>
            {/* <InputNumber defaultValue={size.width} className="po-size-input input-w" style={{ marginRight: '2px' }} onBlur={(e) => { posSizeChange('width', e) }} /> */}
            <CusInputNumber data={_widthCopy} onChange={widthChange} formStyle={{ float: 'left' }} />
          </Form.Item>
          <span className="size-lock" onClick={(e) => sizeLockChange(e)}>
            {sizeLock ? <i className="iconfont icon-lock"></i> :
              <i className="iconfont icon-unlock"></i>}
          </span>
          <Form.Item name="height" noStyle>
            {/* <InputNumber defaultValue={size.height} className="po-size-input input-h" style={{ marginLeft: '3px' }} onBlur={(e) => { posSizeChange('height', e) }} /> */}
            <CusInputNumber data={_heightCopy} onChange={heightChange} formStyle={{ float: 'right' }} />
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
