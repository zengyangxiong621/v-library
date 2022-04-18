import React, { memo, useState } from 'react'
import './index.less'

import {
  Form,
  Select,
  InputNumber,
  Checkbox,
  Collapse,
} from 'antd';

const LoadAnimation = props => {
  const { Panel } = Collapse;
  const { Option } = Select;
  const formItemLayout = {
    labelAlign: 'left'
  }
  const _data = props.data || {};
  const [animationType, setAnimationType] = useState(_data?.mountAnimation?.type || null)
  const [opacityOpen, setOpacityOpen] = useState(_data?.mountAnimation?.opacityOpen || false)
  const [timingFunction, setTimingFunction] = useState(_data?.mountAnimation?.timingFunction || 'linear')
  const [direction, setDirection] = useState(_data?.mountAnimation?.direction || 'left')
  const [duration, setDuration] = useState(_data?.mountAnimation?.duration || 300)
  const [delay, setDelay] = useState(_data?.mountAnimation?.delay || 0)

  const animationTypeChange = (value) => {
    if (!animationType) {
      _data.mountAnimation = {
        "delay": 0,
        "direction": "right",
        "duration": 304,
        "opacityOpen": true,
        "timingFunction": "ease",
        "type": value
      }
    } else {
      value === 'none' ? _data.mountAnimation = null : _data.mountAnimation.type = value
    }
    setAnimationType(value === 'none' ? null : value)
    props.onChange()
  }

  const opacityOpenChange = (e) => {
    setOpacityOpen(e.target.checked)
    _data.mountAnimation.opacityOpen = e.target.checked
    props.onChange()
  }

  const timingFunctionChange = (value) => {
    setTimingFunction(value)
    _data.mountAnimation.timingFunction = value
    props.onChange()
  }

  const directionChange = (value) => {
    setDirection(value)
    _data.mountAnimation.direction = value
    props.onChange()
  }

  const durationChange = (e) => {
    console.log('duration', e)
    const value = parseInt(e.target.value)
    setDuration(value)
    _data.mountAnimation.duration = value
    props.onChange()
  }

  const delayChange = (e) => {
    console.log('delay', e)
    const value = parseInt(e.target.value)
    setDuration(value)
    _data.mountAnimation.delay = value
    props.onChange()
  }

  return (
    <Form className="custom-form" {...formItemLayout} colon={false}>
      <Collapse accordion className="custom-collapse" defaultActiveKey={['1']} >
        <Panel header="载入动画" key="1">
            <Form.Item label="动画类型" name="animationType">
              <Select className="custom-select" style={{ marginBottom: 0 }} placeholder="请选择" defaultValue={animationType} onChange={animationTypeChange}>
                <Option value="none">无</Option>
                <Option value="slide">移入</Option>
                <Option value="slideSmall">移入(小)</Option>
                <Option value="wipe">划变</Option>
              </Select>
            </Form.Item>
            {animationType ? <React.Fragment>
              <Form.Item name="opacityOpen" label="渐隐渐现">
                <Checkbox style={{ float: 'left' }} checked={opacityOpen} onChange={opacityOpenChange}></Checkbox>
              </Form.Item>
              <Form.Item label="速率" name="timingFunction">
                <Select className="custom-select" style={{ marginBottom: 0 }} placeholder="请选择" defaultValue={timingFunction} onChange={timingFunctionChange}>
                  <Option value="linear">匀速</Option>
                  <Option value="ease">慢快慢</Option>
                  <Option value="ease-in">低速开始</Option>
                  <Option value="ease-out">低速结束</Option>
                  <Option value="ease-in-out">低速开始和结束</Option>
                </Select>
              </Form.Item>
              <Form.Item label="方向" name="direction">
                <Select className="custom-select" style={{ marginBottom: 0 }} placeholder="请选择" defaultValue={direction} onChange={directionChange}>
                  <Option value="left">从左至右</Option>
                  <Option value="right">从右至左</Option>
                  <Option value="down">从上至下</Option>
                  <Option value="up">从下至上</Option>
                </Select>
              </Form.Item>
              <Form.Item label="持续时间(ms)" name="duration">
                <InputNumber className="po-size-input" min={0} style={{ width: '100%' }} defaultValue={duration} onBlur={durationChange} />
              </Form.Item>
              <Form.Item label="延时(ms)" name="delay">
                <InputNumber className="po-size-input" min={0} style={{ width: '100%' }} defaultValue={delay} onBlur={delayChange} />
              </Form.Item>
            </React.Fragment> : null}
        </Panel>
      </Collapse>
    </Form>
  )
}

export default memo(LoadAnimation)