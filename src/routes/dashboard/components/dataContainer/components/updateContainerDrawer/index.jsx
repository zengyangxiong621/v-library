import React, {memo, useState, useEffect, useRef} from 'react';
import './index.less'
import {Drawer, Input} from 'antd'

import {http} from '../../../../../../models/utils/request'
import DataSourceConfig from "../../../../right/components/dataConfig/dataSourceConfig";
import DataResult from "../../../../right/components/dataConfig/dataResult";
import {CloseOutlined, LeftOutlined} from "@ant-design/icons";
const testData = {
  "id": "1524414033550970881", // 容器 id
  "name": "二二", // 容器名字
  "dataConfig": {}, // 数据源配置
  "dataType": "static", // 数据类型
  "autoUpdate": {}, // 更新配置
  "staticData": {
    "data": [
      {
        "text": "测试文本"
      }
    ],
    "fields": [
      {
        "name": "text",
        "value": "text",
        "desc": "文本",
        "status": true
      }
    ]
  }, // 静态数据
  "data":{}, // 非静态数据
  "events": [],
  "triggers": [],
  "useFilter": false, // 是否启用过滤器
  "filters": [],
}
const UpdateContainerDrawer = props => {
  const data = props.data
  useEffect(() => {
    if (Object.keys(data).length === 0) {
      // 新增
      console.log('新增')
    } else {
      // 编辑
      console.log('编辑')
    }
  }, [data])
  const onClose = () => {

    props.onVisibleChange(false)
  };
  const handleDataTypeChange = (value) => {
    testData.dataType = value
    console.log('handleDataTypeChange', value)
    console.log('testData', testData)

  }
  const handleStaticDataChange = (value) => {
    testData.staticData.data = value
    console.log('handleStaticDataChange', value)
    console.log('testData', testData)

  }
  const handleDataSourceChange = (value) => {
    testData.dataConfig = value
    console.log('handleDataSourceChange', value)
    console.log('testData', testData)

  }
  return (
    <Drawer
      title={
        <div className="g-relative g-text-base g-px-2 g-flex g-justify-between g-items-center">
          <LeftOutlined onClick={onClose} className="g-cursor-pointer" style={{fontSize: 12}}/>
          数据容器
          <CloseOutlined onClick={onClose} className="g-cursor-pointer" style={{}}/>
        </div>
      }
      closable={false}
      width={333}
      placement='right'
      onClose={onClose}
      visible={props.visible}
      className='update-data-container-drawer'
      getContainer={false}
      maskStyle={null}
      style={{position: 'absolute'}}
    >
      <div>
        <Input defaultValue={data.name} onChange={(e) => data.name = e.target.name}></Input>
        <p className="data-source">数据源</p>
        <DataSourceConfig
          data={testData}
          onDataTypeChange={handleDataTypeChange}
          onStaticDataChange={handleStaticDataChange}
          onDataSourceChange={handleDataSourceChange}
        />
        <DataResult data={testData}/>

      </div>

    </Drawer>
  )
}

export default memo(UpdateContainerDrawer)