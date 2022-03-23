import React, { memo, useState, useEffect } from 'react';
import './index.css'
import { find } from '../../../../../utils/common'
import BackgroundColor from '../backgroundColor'
import PageSize from '../pageSize'
import UploadImg from '../uploadImg'
import CusInputNumber from '../cusInputNumber'
import RadioGroup from '../radioGroup'

import { Form } from 'antd';

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
  const formItemLayout = {
    labelAlign: 'left'
  };
  const recommendConfig = find(pageConfig, 'recommend')
  const styleColorConfig = find(pageConfig, 'styleColor')
  const backgroundImg = find(pageConfig, 'backgroundImg')
  const gridSpacing = find(pageConfig, 'gridSpacing')
  const zoomConfig = find(pageConfig, 'zoom')

  const [form] = Form.useForm();

  const settingsChange = () => {
    console.log(pageConfig)
    // todo 更新数据
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
          <PageSize data={recommendConfig} onChange={settingsChange} />
          <BackgroundColor data={styleColorConfig} onChange={settingsChange} />
          <UploadImg data={backgroundImg} onChange={settingsChange} />
          <CusInputNumber data={gridSpacing} onChange={settingsChange} />
          <RadioGroup data={zoomConfig} onChange={settingsChange} />
        </Form>
      </div>
    </div>
  )
}

export default memo(PageSetting)

