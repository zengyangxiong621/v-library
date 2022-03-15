import React, { memo, useState } from 'react'
import './index.css'

import {
  Form,
  Select,
  InputNumber,
  Checkbox,
} from 'antd';

const LoadAnimation = props => {
  const { Option } = Select;

  const [animationType, setAnimationType] = useState('none')
  const [fadeOut, setFadeOut] = useState(false)
  const [rate, setRate] = useState('uniform')
  const [direction, setDirection] = useState('leftToRight')
  const [duration, setDuration] = useState(300)
  const [delay, setDelay] = useState(0)

  const animationTypeChange = (value) => {
    setAnimationType(value)
  }

  const onFadeOutChange = (e) => {
    setFadeOut(e.target.checked)
  }

  const rateChange = (value) => {
    setRate(value)
  }

  const directionChange = (value) => {
    setDirection(value)
  }

  const durationChange = () => {
    console.log('duration')
  }

  const delayChange = () => {
    console.log('delay')
  }

  return (
    <React.Fragment>
      <Form.Item label="动画类型" name="animationType">
        <Select className="custom-select" placeholder="请选择" defaultValue={animationType} onChange={animationTypeChange}>
          <Option value="none">无</Option>
          <Option value="moveIn">移入</Option>
          <Option value="miniIn">移入(小)</Option>
          <Option value="wipe">划变</Option>
        </Select>
      </Form.Item>
      {animationType !== "none" ? <React.Fragment>
        <Form.Item name="fadeOut" label="渐隐渐现">
          <Checkbox style={{ float: 'left' }} checked={fadeOut} onChange={onFadeOutChange}></Checkbox>
        </Form.Item>
        <Form.Item label="速率" name="rate">
          <Select className="custom-select" placeholder="请选择" defaultValue={rate} onChange={rateChange}>
            <Option value="uniform">匀速</Option>
            <Option value="mkm">慢快慢</Option>
            <Option value="dsks">低速开始</Option>
            <Option value="dsjs">低速结束</Option>
          </Select>
        </Form.Item>
        <Form.Item label="方向" name="direction">
          <Select className="custom-select" placeholder="请选择" defaultValue={direction} onChange={directionChange}>
            <Option value="leftToRight">从左至右</Option>
            <Option value="rightToLeft">从右至左</Option>
            <Option value="topToBottom">从上至下</Option>
            <Option value="bottomToTop">从下至上</Option>
          </Select>
        </Form.Item>
        <Form.Item label="持续时间(ms)" name="duration">
          <InputNumber className="po-size-input" min={0} style={{ width: '100%' }} defaultValue={duration} onChange={durationChange} />
        </Form.Item>
        <Form.Item label="延时(ms)" name="delay">
          <InputNumber  className="po-size-input" min={0} style={{ width: '100%' }} defaultValue={delay} onChange={delayChange} />
        </Form.Item>
      </React.Fragment> : null}
    </React.Fragment>
  )
}

export default memo(LoadAnimation)