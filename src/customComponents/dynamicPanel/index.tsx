import { DOMElement, useEffect, useRef, useState } from 'react'
import { connect } from 'dva'
import { Button } from 'antd'
import { useSetState } from 'ahooks'
import CustomDraggable from '../../routes/dashboard/center/components/CustomDraggable'
import { http } from '@/services/request'
import * as React from 'react'
import {
  IPanel
} from "@/routes/dashboard/center/components/CustomDraggable/type";
interface State {
  states: string[];

  [key: string]: any;
}

const DynamicPanel = ({ bar, id, dispatch }: any) => {

  const [ state, setState ] = useSetState<State>({
    states: [],
    defaultState: '',
    components: [],
    layers: [],
  })

  useEffect(() => {
    (async function() {
      const panel = bar.panels.find((item: IPanel) => item.id === id)
      // 获取面板想起接口
      const { states, config: recommendConfig, name, type } = panel
      // 默认取第一个
      const defaultStateId = states[0] || ''
      // 获取画布详情接口
      const { components, layers, dashboardConfig } = await http({
        url: `/visual/application/dashboard/detail/${ defaultStateId }`,
        method: 'get',
      })
      setState({
        states,
        components,
        layers,
        dashboardConfig,
      })
    })()

  }, [])

  return (
    <div className={`reference-panel panel-${id}`} style={{ pointerEvents: 'none' }}>
      <CustomDraggable mouse={ 0 } treeData={ state.layers } components = {state.components}/>
    </div>
  )
}

export default connect(({ bar }: any) => ({ bar }))(DynamicPanel)
