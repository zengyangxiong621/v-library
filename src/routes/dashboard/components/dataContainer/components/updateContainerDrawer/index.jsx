import React, {memo, useState, useEffect, useRef} from 'react';
import './index.less'
import {Drawer, Input} from 'antd'

import {http} from '../../../../../../models/utils/request'

const UpdateContainerDrawer = props => {
  const data = props.data
  useEffect(() => {
    if (Object.keys(data).length === 0) {
      // 新增
      data.name = '数据容器随机'
      console.log('新增')
    } else {
      // 编辑
      console.log('编辑')
    }
  }, [data])
  const onClose = () => {
    props.onVisibleChange(false)
  };
  return (
    <Drawer
      title={
        <div>数据容器</div>
      }
      closeIcon={null}
      width={400}
      placement='right'
      closable={true}
      onClose={onClose}
      visible={props.visible}
      className='single-data-container-drawer'
      getContainer={false}
      maskStyle={null}
      style={{position: 'absolute'}}
    >
      <div>
        <Input defaultValue={data.name} onChange={(e) => data.name = e.target.name}></Input>
        <p className="data-source">数据源</p>
        {data.name}
      </div>

    </Drawer>
  )
}

export default memo(UpdateContainerDrawer)