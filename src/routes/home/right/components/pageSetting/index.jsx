import React, { memo, useState, useEffect } from 'react';
import './index.css'
import BackgroundSetting from '../backgroundSetting'
import { find } from '../../../../../utils/common'

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

const pageConfig = [
  {
    "name": "recommend",
    "displayName": "屏幕大小",
    "value": "0",
    "options": [
      {
        "name": "大屏推荐尺寸1920*1080",
        "value": "0"
      },
      {
        "name": "web最常见尺寸1366*768",
        "value": "1"
      },
      {
        "name": "web最小尺寸1024*768",
        "value": "2"
      },
      {
        "name": "自定义",
        "value": "4"
      }
    ],
    "width": 1920,
    "height": 1080
  },
  {
    "name": "styleColor",
    "displayName": "背景",
    "value": "#000" // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
  },
  {
    "name": "backgroundImg",
    "displayName": "背景图",
    "value": "" // 有背景图则返回背景图的url，没有背景图返回空或者null
  },
  {
    "name": "gridSpacing",
    "displayName": "栅格间距",
    "value": 5
  },
  {
    "name": "zoom",
    "displayName": "缩放设置",
    "value": "0",
    "options": [
      {
        "name": "按屏幕比例适配",
        "value": "0"
      },
      {
        "name": "强制铺满",
        "value": "1"
      },
      {
        "name": "原比例展示溢出滚动",
        "value": "2"
      }
    ]
  }
]

const PageSetting = props => {
  const { Option } = Select;
  const formItemLayout = {
    labelAlign: 'left'
  };
  const recommendConfig = find(pageConfig,'recommend')
  const styleColor = find(pageConfig,'styleColor')
  const backgroundImg = find(pageConfig,'backgroundImg')
  const gridSpacing = find(pageConfig,'gridSpacing')
  const zoomConfig = find(pageConfig,'zoom')

  const [form] = Form.useForm();
  const [recommend, setRecommend] = useState(recommendConfig.value)
  const [width, setWidth] = useState(recommendConfig.width);
  const [height, setHeight] = useState(recommendConfig.height);
  const [bgUrl, setBgUrl] = useState(backgroundImg.value);
  const [spacing, setSpacing] = useState(gridSpacing.value)
  const [coverUrl, setCoverUrl] = useState(null);

  // 下拉框选择
  const recommendChange = (e) => {
    let _width = width;
    let _height = height;
    switch (e) {
      case '0':
        _width = 1920
        _height = 1080
        break;
      case '1':
        _width = 1366
        _height = 768
        break;
      case '2':
        _width = 1024
        _height = 768
        break;
      case '4':
        break;
    }
    setWidth(_width);
    setHeight(_height);
    setRecommend(e)
    form.setFieldsValue({
      width: _width,
      height: _height
    });
    // todo 更新数据
    recommendConfig.width = _width;
    recommendConfig.height = _height;
  }
  // 屏幕大小尺寸变化
  const sizeChange = (str, val) => {
    if (str === 'width') {
      setWidth(val);
    } else {
      setHeight(val);
    }
    setRecommend('4')
    form.setFieldsValue({
      recommend: '4',
    });
    // todo 更新数据
    recommendConfig.width = width;
    recommendConfig.height = height;
  }

  // 背景色变化
  const styleColorChange = (val) => {
    console.log(val)
    // todo 更新数据
    styleColor.value = val
  }

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

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
      getBase64(info.file.originFileObj, imageUrl => {
        setBgUrl(imageUrl)
        // todo 更新数据
        backgroundImg.value = imageUrl
      });
    }
  }
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  const handleBgRemove = () => {
    setBgUrl('')
    // todo 更新数据
    backgroundImg.value = ''
  }

  // 栅格间距更新
  const gridChange = (e) => {
    setSpacing(e)
    // todo 更新数据
    gridSpacing.value = e
  }

  // 缩放设置更新
  const zoomChange = (e) => {
    // todo 更新数据
    zoomConfig.value = e.target.value
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
          colon={false}
        >
          <Form.Item
            name="recommend"
            label="屏幕大小"
          >
            <Select className="custom-select" placeholder="请选择" value={recommend} onChange={recommendChange}>
              {recommendConfig.options.map((item) => {
                return <Option value={item.value} key={item.value}>{item.name}</Option>
              })}
            </Select>
            <Input.Group compact>
              <Form.Item noStyle name="width">
                <InputNumber defaultValue={width} className="size-input" style={{ marginRight: '16px' }} onChange={(value) => sizeChange('width', value)} />
              </Form.Item>
              <Form.Item noStyle name="height">
                <InputNumber defaultValue={height} className="size-input" />
              </Form.Item>
            </Input.Group>
            <Row>
              <Col span={12} className="detail-txt">宽度</Col>
              <Col span={12} className="detail-txt" style={{ textIndent: '8px' }}>高度</Col>
            </Row>
          </Form.Item>
          <Form.Item label="背景">
            <BackgroundSetting data={styleColor} onChange={styleColorChange}></BackgroundSetting>
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
              <InputNumber min={0} style={{ width: '100%' }} className="size-input" defaultValue={spacing} onChange={gridChange} />
            </Form.Item>
          </Form.Item>
          <Form.Item name="zoom" label="缩放设置">
            <Radio.Group defaultValue={zoomConfig.value} className="zoom-set" onChange={zoomChange}>
              <Space direction="vertical">
                {zoomConfig.options.map(item => {
                  return <Radio value={item.value} key={item.value} style={{
                    width: '100%',
                  }}>{item.name}</Radio>
                })}
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

