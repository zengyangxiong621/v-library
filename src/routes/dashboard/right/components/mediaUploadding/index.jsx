import React, { memo, useState, useEffect } from 'react';
import './index.less'

import {
  Form,
  Upload,
  message,
} from 'antd';

import { BASEURL } from '@/services/request'


const UploadMedia = props => {
  const formItemLayout = {
    labelAlign: 'left'
  };
  const [form] = Form.useForm();
  const _data = props.data
  const [videoUrl, setVideoUrl] = useState(_data.value);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const beforeUpload = (file) => {
    const fileLimit=['video/mp4','video/x-ms-wmv','audio/x-m4a','audio/mpeg','audio/ogg','audio/mp3','audio/wav','audio/flac']
    const isJpgOrPng = fileLimit.includes(file.type)
    if (!isJpgOrPng) {
      message.error('请导入正确的文件格式!');
    }
    return isJpgOrPng;
  }
  const handleBgChange = (info) => {
    const { status, response } = info.file;
    if (status === 'done' && response) {
      setVideoUrl(response.data)
      _data.value = response.data
      props.onChange()
    }
  }
  const handleBgRemove = () => {
    setVideoUrl('')
    _data.value = ''
    props.onChange()
  }

  const removeHandle = e => {
    e.stopPropagation()
    setVideoUrl('')
    _data.value = ''
    props.onChange()
  }

  return (
    <Form
      className="custom-form custom-upload-form"
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
            action={`${BASEURL}/visual/file/upload`}
            beforeUpload={beforeUpload}
            onChange={handleBgChange}
            onRemove={handleBgRemove}
            headers={{
              authorization:localStorage.getItem('token')
            }}
          >
            {!videoUrl ? '点击这里进行修改' : <div style={{ width: '100%' }} className="ant-upload-list-item ant-upload-list-item-done ant-upload-list-item-list-type-picture-card">
              <div className="ant-upload-list-item-info">
                <span className="ant-upload-span">
                  <img src={require('../../../../../assets/images/video_upload.png')}></img>
                </span>
              </div>
              <span className="ant-upload-list-item-actions">
                <button title="删除文件" type="button"
                  onClick={removeHandle}
                  className="ant-btn ant-btn-text ant-btn-sm ant-btn-icon-only ant-upload-list-item-card-actions-btn">
                  <span role="img" aria-label="delete" tabindex="-1" className="anticon anticon-delete">
                    <svg viewBox="64 64 896 896" focusable="false" data-icon="delete" width="1em" height="1em" fill="currentColor"
                      aria-hidden="true">
                      <path
                        d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z">
                      </path>
                    </svg>
                  </span>
                </button>
              </span>
            </div>}
          </Upload>
        </Form.Item>
      </Form.Item>
    </Form>
  )
}

export default memo(UploadMedia)

