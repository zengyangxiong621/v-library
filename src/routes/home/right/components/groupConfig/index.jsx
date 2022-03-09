import React,{ memo, useState } from 'react'
import './index.css'

import {
  Form,
  Select,
  InputNumber,
  Input,
  Slider,
  Checkbox,
  Row,
  Col,
  Space,
  Collapse,
} from 'antd';

const GroupConfig = props => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const { Panel } = Collapse;
  const [size, setSize] = useState({
    x: 100,
    y: 100,
    w: 100,
    h: 100,
  });
  const [hideGlup, setHideGlup] = useState(false)
  const [opacityValue, setOpacityValue] = useState(100)
  const [animationType, setAnimationType] = useState('none')
  const [fadeOut, setFadeOut] = useState(false)
  const [rate, setRate] = useState('uniform')
  const [direction, setDirection] = useState('leftToRight')
  const [duration, setDuration] = useState(300)
  const [delay, setDelay] = useState(0)

  const posSizeChange = () => {
    console.log('位置尺寸变化')
  }

  const onHideGlupChange = () => {
    setHideGlup(!hideGlup)
  }

  const opacityChange = (e) => {
    form.setFieldsValue({
      opacityInput: e
    })
  }

  const opacityValueChange = (e) => {
    const value = e.target.value
    const flag = isNaN(value)
    const opacity = flag ? 0 : parseInt(value) > 100 ? 100 : parseInt(value) < 0 ? 0 : parseInt(value)
    setOpacityValue(opacity)
    form.setFieldsValue({
      opacity,
      opacityInput: opacity
    })
  }

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

  const formItemLayout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 14,
    },
  };

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const sizeChange = (e) => {
    console.log('e', e)
    // dispatch({
    //   type: 'pageSetting/sizeChange',
    //   payload: {
    //     width: ,
    //     height: !isLock,
    //   }
    // })
  }


  return (
    <div className="GroupConfig-wrap">
      <h3 className="header">
        组设置
      </h3>
      <div className="content">
        <Form
          className="custom-form"
          form={form}
          {...formItemLayout}
          onFinish={onFinish}
        >
          <Form.Item label="位置尺寸">
            <Space direction="vertical">
              <Input.Group compact>
                <Form.Item name="sizeX" noStyle>
                  <Input defaultValue={size.x} className="size-input" style={{ marginRight: '5px' }} suffix="X" onBlur={() => { posSizeChange('x') }} />
                </Form.Item>
                <Form.Item name="sizeY" noStyle>
                  <Input defaultValue={size.y} className="size-input" suffix="Y" onBlur={() => { posSizeChange('y') }} />
                </Form.Item>
              </Input.Group>
              <Input.Group compact>
                <Form.Item name="sizeW" noStyle>
                  <Input defaultValue={size.w} className="size-input" style={{ marginRight: '5px' }} suffix="W" onBlur={() => { posSizeChange('w') }} />
                </Form.Item>
                <Form.Item name="sizeH" noStyle>
                  <Input defaultValue={size.h} className="size-input" suffix="H" onBlur={() => { posSizeChange('H') }} />
                </Form.Item>
              </Input.Group>
            </Space>
          </Form.Item>
          <Form.Item label="默认隐藏" name="hideGlup">
            <Checkbox style={{ float: 'left' }} checked={hideGlup} onChange={onHideGlupChange}></Checkbox>
          </Form.Item>
          <Form.Item label="透明度">
            <Row>
              <Col span={16}>
                <Form.Item name="opacity" noStyle>
                  <Slider
                    min={0}
                    max={100}
                    tooltipVisible={false}
                    onChange={opacityChange}
                    defaultValue={typeof opacityValue === 'number' ? opacityValue : 0}
                  />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item name="opacityInput" noStyle>
                  <Input style={{ width: '50px' }} defaultValue={opacityValue} className="size-input" suffix="%" onBlur={opacityValueChange} />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
          <Collapse accordion className="custom-collapse">
            <Panel header="载入动画" key="1">
              <Form.Item label="动画类型" name="animationType">
                <Select placeholder="请选择" defaultValue={animationType} onChange={animationTypeChange}>
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
                  <Select placeholder="请选择"  defaultValue={rate} onChange={rateChange}>
                    <Option value="uniform">匀速</Option>
                    <Option value="mkm">慢快慢</Option>
                    <Option value="dsks">低速开始</Option>
                    <Option value="dsjs">低速结束</Option>
                  </Select>
                </Form.Item>
                <Form.Item label="方向" name="direction">
                  <Select placeholder="请选择" defaultValue={direction} onChange={directionChange}>
                    <Option value="leftToRight">从左至右</Option>
                    <Option value="rightToLeft">从右至左</Option>
                    <Option value="topToBottom">从上至下</Option>
                    <Option value="bottomToTop">从下至上</Option>
                  </Select>
                </Form.Item>
                <Form.Item label="持续时间(ms)" name="duration">
                  <InputNumber min={0} style={{ width: '100%' }}  defaultValue={duration} onChange={durationChange}/>
                </Form.Item>
                <Form.Item label="延时(ms)" name="delay">
                  <InputNumber min={0} style={{ width: '100%' }} defaultValue={delay} onChange={delayChange}/>
                </Form.Item>
              </React.Fragment> : null}
            </Panel>
          </Collapse>
        </Form>
      </div>
    </div>
  )
}

export default memo(GroupConfig)

