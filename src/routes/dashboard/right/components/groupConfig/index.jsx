import React, { memo, useState, useEffect } from 'react'
import { connect } from 'dva'
import './index.less'
import { deepClone } from '../../../../../utils'
import { find } from '../../../../../utils/common'
import { v4 as uuidv4 } from 'uuid';

import PositionSize from '../positionSize'
import Checkbox from '../checkBox'
import Range from '../range'
import LoadAnimation from '../loadAnimation'

import {
  Form,
  Collapse
} from 'antd';

import debounce from 'lodash/debounce';
import { http } from '../../../../../services/request'

const dashboardId = window.location.pathname.split('/')[2]

const GroupConfig = ({ bar, dispatch, ...props }) => {
  const [form] = Form.useForm();
  const { Panel } = Collapse;
  const [key, setKey] = useState(uuidv4())
  const groupConfig = deepClone(bar.groupConfig)
  const dimensionConfig = find(groupConfig, 'dimension')
  const hideDefaultConfig = find(groupConfig, 'hideDefault')
  const opacityConfig = find(groupConfig, 'opacity')
  const interactionConfig = find(groupConfig, 'interaction').value

  const formItemLayout = {
    labelAlign: 'left'
  };

  useEffect(() => {
    setKey(uuidv4())
  }, [bar.groupConfig])


  const positionChange = debounce(() => {
    // 位置信息变化由中间画布保存
    dispatch({
      type: 'bar/save',
      payload: {
        groupConfig
      }
    })
  }, 300)

  const saveData = async (param) => {
    const params = {
      configs: [param],
      dashboardId: bar.stateId || bar.dashboardId
    }
    const layers = await http({
      url: '/visual/layer/group/update',
      method: 'post',
      body: params,
    })
    if (layers) {
      dispatch({
        type: 'bar/updateDashboardOrStateConfig',
        payload: {
          id: bar.stateId || bar.dashboardId,
          layers
        }
      })
      dispatch({
        type: 'bar/save',
        payload: {
          layers
        }
      })
    }

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
      key: 'hideDefault',
      value: hideDefaultConfig.value
    })
  }, 300)

  const opacityChange = debounce(() => {
    dispatch({
      type: 'bar/save',
      payload: {
        groupConfig
      }
    })
    saveData({
      id: bar.key[0],
      key: 'opacity',
      value: opacityConfig.value
    })
  }, 300)

  const interactionChange = debounce(() => {
    dispatch({
      type: 'bar/save',
      payload: {
        groupConfig
      }
    })
    saveData({
      id: bar.key[0],
      key: 'mountAnimation',
      value: interactionConfig.mountAnimation
    })
  }, 300)

  return (
    <div className="GroupConfig-wrap">
      <h3 className="groupset-header">
        组设置
      </h3>
      <div className="content" key={key}>
        <Form
          className="custom-form"
          form={form}
          {...formItemLayout}
          colon={false}
        >
          <PositionSize data={dimensionConfig} onChange={positionChange} />
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
