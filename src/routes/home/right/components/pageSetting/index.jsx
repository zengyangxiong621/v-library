import React, { memo, useState, useEffect } from 'react';
import './index.css'

import {
  Form,
  Select,
  InputNumber,
  Input,
  Radio,
  Upload,
  Checkbox,
  Space,
  message,
  Row, Col
} from 'antd';
import { SketchPicker } from 'react-color'



const PageSetting = props => {
  const { Option } = Select;
  const formItemLayout = {
    labelAlign: 'left'
  };
  const [form] = Form.useForm();
  const [width, setWidth] = useState('1920');
  const [height, setHeight] = useState('1080');
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState({
    hex: '#232630',
    rgb: {
      r: 35,
      g: 38,
      b: 48,
      a: 1
    },
    opacity: 100
  });
  const [openBgImg, setOpenBgImg] = useState(false);
  const [bgUrl, setBgUrl] = useState(null);
  const [coverUrl, setCoverUrl] = useState(null);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  // 屏幕大小尺寸变化
  const sizeChange = (e) => {
    setWidth(e === 't1' ? '1920' : '1366')
    setHeight(e === 't1' ? '1080' : '768')
    form.setFieldsValue({
      sizeW: e === 't1' ? '1920' : '1366',
      sizeH: e === 't1' ? '1080' : '768'
    });
  }

  const handleBgcChange = (e) => {
    setColor({
      hex: e.hex,
      rgb: e.rgb,
      opacity: e.rgb.a * 100
    })
    form.setFieldsValue({
      hex: e.hex,
      opacity: e.rgb.a * 100
    });
  }
  const handleHexChange = (e) => {
    console.log('e', e)
    const hexTmp = e.target.value
    const flag =
      /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(hexTmp)
    const hex = flag ? hexTmp : '#000000';
    const rgb = hexToRgb(hex)
    setColor({
      hex,
      rgb: {
        r: rgb.r,
        g: rgb.g,
        b: rgb.b,
        a: color.rgb.a
      },
      opacity: color.opacity
    })
    form.setFieldsValue({
      hex,
    });
  }
  const hexToRgb = (hexValue) => {
    const rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const hex = hexValue.replace(rgx, (m, r, g, b) => r + r + g + g + b + b);
    const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    const r = parseInt(rgb[1], 16);
    const g = parseInt(rgb[2], 16);
    const b = parseInt(rgb[3], 16);
    return {
      r,
      g,
      b
    };
  }
  const handleOpacityChange = (e) => {
    const opacityTmp = e.target.value ? Number.parseInt(e.target.value) : 0
    const opacity = opacityTmp > 100 ? 100 : opacityTmp < 0 ? 0 : opacityTmp
    setColor({
      hex: color.hex,
      rgb: {
        r: color.rgb.r,
        g: color.rgb.g,
        b: color.rgb.b,
        a: opacity / 100
      },
      opacity
    })
    form.setFieldsValue({
      opacity
    });
  }
  const selectBgc = () => {
    setDisplayColorPicker(!displayColorPicker)
  }
  const onOpenBgImgChange = (e) => {
    setOpenBgImg(e.target.checked)
  }
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('只能选择格式为JPG/PNG的文件!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小不能超过2MB!');
    }
    return isJpgOrPng && isLt2M;
  }
  const handleBgChange = (info) => {
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl =>
        setBgUrl(imageUrl)
      );
    }
  }
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  const handleBgRemove = () => {
    setBgUrl(null)
  }
  const handleCoverChange = (info) => {
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl =>
        setCoverUrl(imageUrl)
      );
    }
  }
  const handleCoverRemove = () => {
    setCoverUrl(null)
  }
  return (
    <div className="PageSetting-wrap">
      <h3 className="header">
        页面设置
      </h3>
      <div className="content">
        <Form
          className="custom-form"
          form={form}
          {...formItemLayout}
          onFinish={onFinish}
          colon={false}
        >
          <Form.Item
            name="select"
            label="屏幕大小"
          >
            <Select className="custom-select" placeholder="请选择" defaultValue="t1" onChange={sizeChange}>
              <Option value="t1">大屏推荐尺寸1920*1080</Option>
              <Option value="t2">web最常见尺寸1366*768</Option>
              <Option value="t3">web最小尺寸1024*768</Option>
              <Option value="t4">自定义</Option>
            </Select>
            <Input.Group compact>
              <Form.Item noStyle name="sizeW">
                <InputNumber defaultValue={width} className="size-input" style={{ marginRight: '16px' }} />
              </Form.Item>
              <Form.Item noStyle name="sizeH">
                <InputNumber defaultValue={height} className="size-input" />
              </Form.Item>
            </Input.Group>
            <Row>
              <Col span={12} className="detail-txt">宽度</Col>
              <Col span={12} className="detail-txt" style={{ textIndent: '8px' }}>高度</Col>
            </Row>
          </Form.Item>
          <Form.Item label="背景">
            <div className="color-swatch" onClick={selectBgc}>
              <div className="color-dis" style={{ background: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})` }} />
            </div>
            {displayColorPicker ? <div className="color-popover">
              <div className="color-cover" onClick={() => { setDisplayColorPicker(false) }} />
              <SketchPicker color={color.rgb} onChange={(e) => { handleBgcChange(e) }} />
            </div> : null}
            <Form.Item noStyle name="hex">
              <Input defaultValue={color.hex} className="input-hex" onBlur={(e) => { handleHexChange(e) }} />
            </Form.Item>
            <Form.Item noStyle name="opacity">
              <InputNumber defaultValue={color.opacity} className="size-input input-opacity" onChange={(e) => { handleOpacityChange(e) }} min={0}
                max={100}
                formatter={value => `${value}%`}
                parser={value => value.replace('%', '')} />
            </Form.Item>
            <Row>
              <Col span={4} className="detail-txt">颜色</Col>
              <Col span={11} className="detail-txt" style={{ textIndent: '4px' }}>Hex</Col>
              <Col span={8} className="detail-txt" style={{ textIndent: '6px' }}>不透明度</Col>
            </Row>
          </Form.Item>
          {/* <Form.Item label="启用背景图">
            <Checkbox style={{ float: 'left' }} checked={openBgImg} onChange={onOpenBgImgChange}></Checkbox>
          </Form.Item> */}
          <Form.Item label="背景图">
            <Form.Item name="bgImage" valuePropName="fileList"
              getValueFromEvent={normFile} noStyle>
              <Upload
                name="bgImage"
                listType="picture-card"
                className="bg-uploader"
                showUploadList={{ showRemoveIcon: true, showPreviewIcon: false }}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleBgChange}
                onRemove={handleBgRemove}
              >
                {!bgUrl && '点击这里进行修改'}
              </Upload>
            </Form.Item>
          </Form.Item>
          <Form.Item label="栅格间距" name="spacing">
            <Form.Item name="input-number" noStyle>
              <InputNumber min={0} style={{ width: '100%' }} className="size-input" defaultValue={20} />
            </Form.Item>
          </Form.Item>
          <Form.Item name="zoom" label="缩放设置">
            <Radio.Group defaultValue="a" className="zoom-set">
              <Space direction="vertical">
                <Radio value="a" style={{
                  width: '100%',
                }}>按屏幕比例适配</Radio>
                <Radio value="b" style={{
                  width: '100%',
                }}>强制铺满</Radio>
                <Radio value="c" style={{
                  width: '100%',
                }}>原比例展示溢出滚动</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="封面">
            <Form.Item name="cover" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
              <Upload
                name="cover"
                listType="picture-card"
                className="bg-uploader"
                showUploadList={{ showRemoveIcon: true, showPreviewIcon: false }}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleCoverChange}
                onRemove={handleCoverRemove}
              >
                {!coverUrl && '点击这里进行修改'}
              </Upload>
            </Form.Item>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default memo(PageSetting)

