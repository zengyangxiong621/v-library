import React, { memo, useState } from 'react'
import './index.css'

import {
  Form,
  Input,
  Checkbox,
  Space,
} from 'antd';

const PositionSize = props => {
  const [size, setSize] = useState(props.size || {
    x: 100,
    y: 100,
    w: 100,
    h: 100,
  });
  const [hideGlup, setHideGlup] = useState(props.hideGlup || false)

  const posSizeChange = (str) => {
    props.onPosSizeChange(str, size)
  }

  const onHideGlupChange = () => {
    setHideGlup(!hideGlup)
    props.onHideGlupChange(hideGlup)
  }

  return (
    <React.Fragment>
      <Form.Item label="位置尺寸">
        <Space direction="vertical">
          <Input.Group compact>
            <Form.Item name="sizeX" noStyle>
              <Input defaultValue={size.x} className="po-size-input" style={{ marginRight: '5px' }} suffix="X" onBlur={() => { posSizeChange('x') }} />
            </Form.Item>
            <Form.Item name="sizeY" noStyle>
              <Input defaultValue={size.y} className="po-size-input" suffix="Y" onBlur={() => { posSizeChange('y') }} />
            </Form.Item>
          </Input.Group>
          <Input.Group compact>
            <Form.Item name="sizeW" noStyle>
              <Input defaultValue={size.w} className="po-size-input" style={{ marginRight: '5px' }} suffix="W" onBlur={() => { posSizeChange('w') }} />
            </Form.Item>
            <Form.Item name="sizeH" noStyle>
              <Input defaultValue={size.h} className="po-size-input" suffix="H" onBlur={() => { posSizeChange('h') }} />
            </Form.Item>
          </Input.Group>
        </Space>
      </Form.Item>
      <Form.Item label="默认隐藏" name="hideGlup">
        <Checkbox style={{ float: 'left' }} checked={hideGlup} onChange={onHideGlupChange}></Checkbox>
      </Form.Item>
    </React.Fragment>
  )
}

export default memo(PositionSize)