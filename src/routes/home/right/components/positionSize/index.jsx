import React, { memo, useState } from 'react'
import './index.css'

import {
  Form,
  Input,
  InputNumber,
  Checkbox,
} from 'antd';

const PositionSize = props => {
  const formItemLayout = {
    labelAlign: 'left'
  };
  const [size, setSize] = useState(props.size || {
    x: 100,
    y: 100,
    w: 100,
    h: 100,
  });
  const [hideGlup, setHideGlup] = useState(props.hideGlup || false)
  const [sizeLock, setSizeLock] = useState(props.sizeLock || false)

  const posSizeChange = (str) => {
    props.onPosSizeChange(str, size)
  }

  const onHideGlupChange = () => {
    setHideGlup(!hideGlup)
    props.onHideGlupChange(hideGlup)
  }

  const sizeLockChange = (e) => {
    e.preventDefault()
    setSizeLock(!sizeLock)
  }

  return (
    <Form
      className="custom-form"
      name="validate_other"
      {...formItemLayout}
      colon={false}
    >
      <Form.Item label="位置尺寸">
        <Input.Group compact style={{ marginBottom: '8px' }}>
          <Form.Item name="sizeX" noStyle>
            <InputNumber defaultValue={size.x} className="po-size-input input-x" style={{ marginRight: '21px' }} onBlur={() => { posSizeChange('x') }} />
          </Form.Item>
          <Form.Item name="sizeY" noStyle>
            <InputNumber defaultValue={size.y} className="po-size-input input-y" onBlur={() => { posSizeChange('y') }} />
          </Form.Item>
        </Input.Group>
        <Input.Group compact>
          <Form.Item name="sizeW" noStyle>
            <InputNumber defaultValue={size.w} className="po-size-input input-w" style={{ marginRight: '2px' }} onBlur={() => { posSizeChange('w') }} />
          </Form.Item>
          <span className="size-lock" onClick={(e) => sizeLockChange(e)}>
            {sizeLock ? <i className="iconfont icon-lock"></i> :
              <i className="iconfont icon-unlock"></i>}
          </span>
          <Form.Item name="sizeH" noStyle>
            <InputNumber defaultValue={size.h} className="po-size-input input-h" style={{ marginLeft: '3px' }} onBlur={() => { posSizeChange('h') }} />
          </Form.Item>
        </Input.Group>
      </Form.Item>
      <Form.Item label="默认隐藏" name="hideGlup">
        <Checkbox style={{ float: 'left' }} checked={hideGlup} onChange={onHideGlupChange}></Checkbox>
      </Form.Item>
    </Form>
  )
}

export default memo(PositionSize)