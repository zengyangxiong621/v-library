import React, { memo, useState, useEffect } from 'react';
import './index.less'

import {
  Form,
  Upload,
  message,
} from 'antd';

import { BASE_URL } from '../../../../../utils/useFetch'


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
    const isLt2M = file.size / 1024 / 1024 < 20;
    if (!isLt2M) {
      message.error('图片大小不能超过20MB!');
    }
    return isJpgOrPng && isLt2M;
  }
  const handleBgChange = (info) => {
    const { status, response } = info.file;
    if (status === 'done' && response) {
      setBgUrl(response.data)
      _data.value = response.data
      props.onChange()
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
            name="file"
            listType="picture-card"
            className="bg-uploader"
            showUploadList={{ showRemoveIcon: true, showPreviewIcon: false }}
            action={`${BASE_URL}/visual/file/upload`}
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

