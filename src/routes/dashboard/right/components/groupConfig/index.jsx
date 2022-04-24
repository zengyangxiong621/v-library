import React, { memo, useState } from 'react'
import { connect } from 'dva'
import './index.less'
import { deepClone } from '../../../../../utils'
import { find } from '../../../../../utils/common'

import PositionSize from '../positionSize'
import Checkbox from '../checkBox'
import Range from '../range'
import LoadAnimation from '../loadAnimation'

import {
  Form,
  Collapse
} from 'antd';

import debounce from 'lodash/debounce';
import { useFetch } from '../../../../../utils/useFetch'

const dashboardId = window.location.pathname.split('/')[2]

const GroupConfig = ({ bar, dispatch, ...props }) => {
  const [form] = Form.useForm();
  const { Panel } = Collapse;
  const groupConfig = deepClone(bar.groupConfig)
  const dimensionConfig = find(groupConfig, 'dimension')
  const hideDefaultConfig = find(groupConfig, 'hideDefault')
  const opacityConfig = find(groupConfig, 'opacity')
  const interactionConfig = find(groupConfig, 'interaction').value

  const formItemLayout = {
    labelAlign: 'left'
  };

  const positionChange = debounce(() => {
    console.log(groupConfig)
    // 位置信息变化由中间画布保存
    dispatch({
      type: 'bar/save',
      payload: {
        groupConfig
      }
    })
  }, 300)

  const saveData = async (param) => {
    // todo 替换假数据
    const params = {
      configs: [param],
      dashboardId: dashboardId
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const data = await useFetch('/visual/layer/group/update', {
      body: JSON.stringify(params)
    })
    console.log('layers', data[1])
    dispatch({
      type: 'bar/save',
      payload: {
        treeData: data[1]
      }
    })
  }

  const hideDefaultChange = debounce(() => {
    dispatch({
      type: 'bar/save',
      payload: {
        groupConfig
      }
    })
    saveData({
      id: bar.key[0],
      key:'hideDefault',
      value:hideDefaultConfig.value
    })
  }, 300)

  const opacityChange = debounce(() => {
    console.log(opacityConfig)
    dispatch({
      type: 'bar/save',
      payload: {
        groupConfig
      }
    })
    saveData({
      id: bar.key[0],
      key:'opacity',
      value:opacityConfig.value
    })
  }, 300)

  const interactionChange = debounce(() => {
    console.log(interactionConfig)
    dispatch({
      type: 'bar/save',
      payload: {
        groupConfig
      }
    })
    saveData({
      id: bar.key[0],
      key:'mountAnimation',
      value:interactionConfig.mountAnimation
    })
  }, 300)

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
          colon={false}
        >
          <PositionSize data={dimensionConfig} onChange={positionChange}/>
          <Checkbox data={hideDefaultConfig} onChange={hideDefaultChange} />
          <Range data={opacityConfig} onChange={opacityChange} />
          <LoadAnimation data={interactionConfig} onChange={interactionChange} />
        </Form>
      </div>
    </div>
  )
}

export default connect(({ bar }) => ({
  bar
}))(GroupConfig)
