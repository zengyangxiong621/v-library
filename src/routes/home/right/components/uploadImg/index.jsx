import React, { memo, useState, useEffect } from 'react';
import './index.less'

import {
  Form,
  Upload,
  message,
} from 'antd';


const UploadImg = props => {
  const formItemLayout = {
    labelAlign: 'left'
  };
  const [form] = Form.useForm();
  const _data = props.data
  const [bgUrl, setBgUrl] = useState(_data.value);

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
        _data.value = imageUrl
        props.onChange()
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
    _data.value = ''
    props.onChange()
  }

  return (
    <Form
      className="custom-form"
      form={form}
      {...formItemLayout}
      colon={false}
    >
      {/* <Form.Item label="启用背景图">
            <Checkbox style={{ float: 'left' }} checked={openBgImg} onChange={onOpenBgImgChange}></Checkbox>
          </Form.Item> */}
      <Form.Item label={_data.displayName}>
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
    </Form>
  )
}

export default memo(UploadImg)

